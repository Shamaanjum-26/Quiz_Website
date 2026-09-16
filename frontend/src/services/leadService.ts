import supabase from '@/lib/supabase';
import type { Lead, LeadActivity, LeadFilters, PaginatedResult } from '@/types';
import { calculateLeadStatus, buildQualificationReason } from '@/lib/leadScoring';

// ── Get lead for student ──────────────────────────────────────
export async function getLeadForStudent(studentId: string): Promise<Lead | null> {
  const { data, error } = await supabase
    .from('leads')
    .select(`*, student:students(full_name, email, mobile, college, preferred_domain:domains(name))`)
    .eq('student_id', studentId)
    .maybeSingle();

  if (error) throw error;
  return data as Lead | null;
}

// ── Track activity and update lead score ──────────────────────
export async function trackLeadActivity(
  studentId: string,
  activityType: LeadActivity['activity_type'],
  scoreChange: number,
  activityData?: Record<string, unknown>
): Promise<void> {
  // Insert activity
  await supabase.from('lead_activities').insert({
    student_id: studentId,
    activity_type: activityType,
    activity_data: activityData || {},
    score_change: scoreChange,
  });

  if (scoreChange === 0) return;

  // Get current lead
  const { data: lead } = await supabase
    .from('leads')
    .select('*')
    .eq('student_id', studentId)
    .maybeSingle();

  if (!lead) return;

  const newScore = Math.max(0, (lead.lead_score || 0) + scoreChange);

  // Update flags based on activity type
  const updates: Record<string, unknown> = {
    lead_score: newScore,
    lead_status: calculateLeadStatus(newScore),
    last_activity_at: new Date().toISOString(),
  };

  const flagMap: Record<string, string> = {
    quiz_completed: 'has_completed_quiz',
    result_viewed: 'has_viewed_result',
    report_viewed: 'has_viewed_report',
    premium_report_clicked: 'has_clicked_premium_report',
    bootcamp_registered: 'has_registered_bootcamp',
  };

  if (flagMap[activityType]) {
    updates[flagMap[activityType]] = true;
  }

  const updatedLead = { ...lead, ...updates };
  updates.qualification_reason = buildQualificationReason(updatedLead as Lead);

  await supabase.from('leads').update(updates).eq('student_id', studentId);
}

// ── Get lead activities (timeline) ───────────────────────────
export async function getLeadActivities(studentId: string): Promise<LeadActivity[]> {
  const { data, error } = await supabase
    .from('lead_activities')
    .select('*')
    .eq('student_id', studentId)
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) throw error;
  return (data || []) as LeadActivity[];
}

// ── Admin: List leads with filters ───────────────────────────
export async function listLeads(
  filters: LeadFilters,
  page = 1,
  pageSize = 20
): Promise<PaginatedResult<Lead>> {
  let query = supabase
    .from('leads')
    .select(
      `*, student:students(
        full_name, email, mobile, college, branch, academic_year, state,
        utm_source, utm_medium, utm_campaign, referral_code, created_at,
        preferred_domain:domains(name, slug)
      )`,
      { count: 'exact' }
    );

  if (filters.status) query = query.eq('lead_status', filters.status);

  if (filters.search) {
    // Filter via related student fields via subquery
    query = query.or(`student.full_name.ilike.%${filters.search}%,student.email.ilike.%${filters.search}%`);
  }

  if (filters.min_score !== undefined) query = query.gte('lead_score', filters.min_score);
  if (filters.max_score !== undefined) query = query.lte('lead_score', filters.max_score);

  const sortBy = filters.sort_by || 'lead_score';
  const ascending = filters.sort_order === 'asc';
  query = query.order(sortBy, { ascending });

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    data: (data || []) as Lead[],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

// ── Admin: Update lead status and notes ───────────────────────
export async function updateLead(
  leadId: string,
  updates: { lead_status?: Lead['lead_status']; admin_notes?: string }
): Promise<void> {
  const { error } = await supabase.from('leads').update(updates).eq('id', leadId);
  if (error) throw error;
}

// ── Admin: Delete single lead ────────────────────────────────
export async function deleteLead(leadId: string): Promise<void> {
  const { error } = await supabase.from('leads').delete().eq('id', leadId);
  if (error) throw error;
}

// ── Admin: Delete all leads ──────────────────────────────────
export async function deleteAllLeads(leadIds?: string[]): Promise<void> {
  if (leadIds && leadIds.length > 0) {
    const { error } = await supabase.from('leads').delete().in('id', leadIds);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}

// ── Admin: Export leads CSV ───────────────────────────────────
export async function exportLeadsCSV(): Promise<string> {
  const { data, error } = await supabase
    .from('leads')
    .select(
      `*, student:students(full_name, email, mobile, college, utm_source, utm_campaign, referral_code)`
    )
    .order('lead_score', { ascending: false });

  if (error) throw error;

  const headers = [
    'Name', 'Email', 'Mobile', 'College', 'Lead Score', 'Lead Status',
    'UTM Source', 'Campaign', 'Referral Code', 'Last Activity',
  ];

  const rows = (data || []).map((l) => [
    l.student?.full_name || '',
    l.student?.email || '',
    l.student?.mobile || '',
    l.student?.college || '',
    l.lead_score,
    l.lead_status,
    l.student?.utm_source || '',
    l.student?.utm_campaign || '',
    l.student?.referral_code || '',
    new Date(l.last_activity_at).toLocaleDateString('en-IN'),
  ]);

  return [headers, ...rows]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

// ── Admin: WhatsApp Automation for Unenrolled Students ───────
export async function fetchWhatsAppAutomationStatus(): Promise<{
  success: boolean;
  enabled: boolean;
  unenrolledCandidateCount: number;
  totalSent: number;
  lastRunAt?: string;
  customTemplate?: string;
}> {
  try {
    const res = await fetch('http://localhost:5000/api/automation/whatsapp/status');
    if (res.ok) {
      return await res.json();
    }
  } catch {}
  return {
    success: true,
    enabled: true,
    unenrolledCandidateCount: 0,
    totalSent: 0,
  };
}

export async function triggerAutomatedWhatsAppForUnenrolled(): Promise<{
  success: boolean;
  sentCount: number;
  recipients?: Array<{ name: string; mobile: string; domain: string }>;
}> {
  try {
    const res = await fetch('http://localhost:5000/api/automation/whatsapp/trigger', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ force: true }),
    });
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn('Backend automation trigger note:', err);
  }
  return { success: true, sentCount: 0 };
}
