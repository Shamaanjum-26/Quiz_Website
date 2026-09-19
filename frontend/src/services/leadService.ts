import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import type { Lead, LeadActivity, LeadFilters, PaginatedResult } from '@/types';
import { calculateLeadStatus, buildQualificationReason } from '@/lib/leadScoring';
import { LOCAL_STUDENTS_KEY, DELETED_STUDENTS_KEY, deleteStudent, deleteAllStudents } from '@/services/studentService';
import { getBackendUrl } from '@/lib/apiConfig';
import { notifyDataChange } from '@/lib/sync';
import { getStudentDomainDisplay } from '@/lib/domainHelper';

export const LOCAL_LEADS_KEY = 'hadescore_local_leads';
export const DELETED_LEADS_KEY = 'hadescore_deleted_leads';
export const LEADS_SEEDED_KEY = 'hadescore_leads_seeded_v3';

export const INITIAL_SAMPLE_LEADS: Lead[] = [
  {
    id: 'sample-lead-1',
    student_id: 'sample-student-1',
    lead_score: 85,
    lead_status: 'HOT',
    qualification_reason: 'High Intent: completed assessment (85%), registered for bootcamp, WhatsApp opted in',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: true,
    has_registered_bootcamp: true,
    has_verified_email: false,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: true,
    session_count: 3,
    quiz_correct_answers: 9,
    quiz_total_questions: 10,
    last_activity_at: new Date(Date.now() - 4 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 24 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      id: 'sample-student-1',
      full_name: 'Priya Sharma',
      email: 'priya@example.com',
      mobile: '9876543210',
      college: 'VIT Vellore',
      branch: 'CSE',
      academic_year: '3rd Year',
      utm_source: 'whatsapp',
      utm_medium: 'community',
      utm_campaign: 'campus26',
      preferred_domain: { name: 'Python' },
    } as any,
  },
  {
    id: 'sample-lead-2',
    student_id: 'sample-student-2',
    lead_score: 55,
    lead_status: 'WARM',
    qualification_reason: 'Engaged: scored 65% on Web Dev and viewed comprehensive diagnostic report',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: false,
    has_registered_bootcamp: false,
    has_verified_email: true,
    has_whatsapp_opt_in: false,
    has_multiple_sessions: false,
    session_count: 1,
    quiz_correct_answers: 6,
    quiz_total_questions: 10,
    last_activity_at: new Date(Date.now() - 36 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 48 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      id: 'sample-student-2',
      full_name: 'Rahul Mehta',
      email: 'rahul@example.com',
      mobile: '9765432109',
      college: 'SRM University',
      branch: 'IT',
      academic_year: '2nd Year',
      utm_source: 'instagram',
      utm_medium: 'organic_reel',
      utm_campaign: 'instaskill',
      preferred_domain: { name: 'Web Dev' },
    } as any,
  },
  {
    id: 'sample-lead-3',
    student_id: 'sample-student-3',
    lead_score: 92,
    lead_status: 'HOT',
    qualification_reason: 'High Intent: scored 92% in Data Science & AI, registered for bootcamp, clicked report',
    has_completed_quiz: true,
    has_viewed_result: true,
    has_viewed_report: true,
    has_clicked_premium_report: true,
    has_registered_bootcamp: true,
    has_verified_email: true,
    has_whatsapp_opt_in: true,
    has_multiple_sessions: true,
    session_count: 2,
    quiz_correct_answers: 9,
    quiz_total_questions: 10,
    last_activity_at: new Date(Date.now() - 2 * 3600000).toISOString(),
    created_at: new Date(Date.now() - 12 * 3600000).toISOString(),
    updated_at: new Date().toISOString(),
    student: {
      id: 'sample-student-3',
      full_name: 'Ananya Reddy',
      email: 'ananya@example.com',
      mobile: '9654321098',
      college: 'Osmania University',
      branch: 'Data Science',
      academic_year: '4th Year',
      utm_source: 'linkedin',
      utm_medium: 'cpc',
      utm_campaign: 'licareer',
      preferred_domain: { name: 'Data Science' },
    } as any,
  },
];

function getDeletedLeadIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_LEADS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function getDeletedStudentIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_STUDENTS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function getLocalLeads(): Lead[] {
  if (typeof window === 'undefined') return [];
  try {
    const deletedLeadIds = getDeletedLeadIds();
    const deletedStudentIds = getDeletedStudentIds();
    const allDeleted = localStorage.getItem('hadescore_all_leads_deleted') === 'true';

    if (allDeleted) {
      return [];
    }

    const isSeeded = localStorage.getItem(LEADS_SEEDED_KEY);
    if (!isSeeded && !localStorage.getItem(LOCAL_LEADS_KEY)) {
      // First time seed
      localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(INITIAL_SAMPLE_LEADS));
      localStorage.setItem(LEADS_SEEDED_KEY, 'true');
      return INITIAL_SAMPLE_LEADS.filter(
        (l) => !deletedLeadIds.has(l.id) && !deletedStudentIds.has(l.student_id)
      );
    }

    const raw = localStorage.getItem(LOCAL_LEADS_KEY);
    const list: Lead[] = raw ? JSON.parse(raw) : [];
    return list
      .map((l) => {
        if (l.has_completed_quiz || (l as any).quiz_correct_answers !== undefined) {
          const total = Math.max(10, (l as any).quiz_total_questions || 10);
          const correct = (l as any).quiz_correct_answers !== undefined
            ? Math.min((l as any).quiz_correct_answers, total)
            : Math.round(((l.lead_score || 50) / 100) * total);
          (l as any).quiz_total_questions = total;
          (l as any).quiz_correct_answers = correct;
          (l as any).quiz_percentage = Math.round((correct / total) * 100);
        }
        return l;
      })
      .filter(
        (l) => !deletedLeadIds.has(l.id) && !deletedStudentIds.has(l.student_id)
      );
  } catch {
    return [];
  }
}

export function deleteLeadLocally(leadId: string): void {
  try {
    const deleted = getDeletedLeadIds();
    deleted.add(leadId);
    localStorage.setItem(DELETED_LEADS_KEY, JSON.stringify(Array.from(deleted)));

    const remaining = getLocalLeads().filter((l) => l.id !== leadId);
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(remaining));
  } catch (e) {
    console.error('deleteLeadLocally error:', e);
  }
}

export function deleteAllLeadsLocally(ids?: string[]): void {
  try {
    const deleted = getDeletedLeadIds();
    if (ids && ids.length > 0) {
      ids.forEach((id) => deleted.add(id));
    } else {
      getLocalLeads().forEach((l) => deleted.add(l.id));
    }
    localStorage.setItem(DELETED_LEADS_KEY, JSON.stringify(Array.from(deleted)));
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify([]));
    localStorage.setItem('hadescore_all_leads_deleted', 'true');
  } catch (e) {
    console.error('deleteAllLeadsLocally error:', e);
  }
}

// ── Get lead for student ──────────────────────────────────────
export async function getLeadForStudent(studentId: string): Promise<Lead | null> {
  if (!isSupabaseConfigured) {
    const lead = getLocalLeads().find((l) => l.student_id === studentId);
    return lead || null;
  }
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
  if (!isSupabaseConfigured) return;

  try {
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
  } catch (err) {
    console.warn('trackLeadActivity offline note:', err);
  }
}

// ── Get lead activities (timeline) ───────────────────────────
export async function getLeadActivities(studentId: string): Promise<LeadActivity[]> {
  if (!isSupabaseConfigured) return [];
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
  pageSize = 200
): Promise<PaginatedResult<Lead>> {
  if (!isSupabaseConfigured) {
    let list = getLocalLeads();

    if (filters.status && filters.status !== ('ALL' as any)) {
      list = list.filter((l) => l.lead_status === filters.status);
    }
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((l) => {
        const s = l.student as any;
        return (
          s?.full_name?.toLowerCase().includes(q) ||
          s?.email?.toLowerCase().includes(q) ||
          s?.college?.toLowerCase().includes(q) ||
          s?.mobile?.includes(q)
        );
      });
    }

    return {
      data: list,
      total: list.length,
      page: 1,
      pageSize,
      totalPages: Math.max(1, Math.ceil(list.length / pageSize)),
    };
  }

  try {
    let query = supabase
      .from('leads')
      .select(
        `*, student:students(
          id, full_name, email, mobile, college, branch, academic_year, state,
          utm_source, utm_medium, utm_campaign, referral_code, created_at,
          preferred_domain:domains(name, slug)
        )`,
        { count: 'exact' }
      );

    if (filters.status && filters.status !== ('ALL' as any)) {
      query = query.eq('lead_status', filters.status);
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

    let leads = (data || []) as Lead[];


    // Filter by search safely client-side
    if (filters.search && filters.search.trim()) {
      const q = filters.search.toLowerCase().trim();
      leads = leads.filter((l) => {
        const s = l.student as any;
        return (
          s?.full_name?.toLowerCase().includes(q) ||
          s?.email?.toLowerCase().includes(q) ||
          s?.college?.toLowerCase().includes(q) ||
          s?.mobile?.includes(q) ||
          s?.preferred_domain?.name?.toLowerCase().includes(q)
        );
      });
    }

    // If DB returned active records, remove stale local deletion flag
    if (leads.length > 0) {
      try {
        localStorage.removeItem('hadescore_all_leads_deleted');
      } catch {}
    }

    // ── Enrich leads with actual quiz result scores ──────────────
    try {
      const completedStudentIds = leads
        .map((l) => l.student_id)
        .filter(Boolean);

      if (completedStudentIds.length > 0) {
        const { data: quizResults } = await supabase
          .from('quiz_results')
          .select('student_id, correct_answers, total_questions, percentage')
          .in('student_id', completedStudentIds)
          .order('created_at', { ascending: false });

        if (quizResults && quizResults.length > 0) {
          const resultMap = new Map<string, { correct: number; total: number; pct: number }>();
          for (const r of quizResults) {
            if (!resultMap.has(r.student_id)) {
              // Ensure total questions reflects full assessment (minimum 10 questions)
              const total = Math.max(10, r.total_questions || 10);
              const correct = Math.min(r.correct_answers ?? 0, total);
              const pct = Math.round((correct / total) * 100);
              resultMap.set(r.student_id, {
                correct,
                total,
                pct,
              });
            }
          }

          for (const lead of leads) {
            const res = resultMap.get(lead.student_id);
            if (res) {
              lead.has_completed_quiz = true;
              (lead as any).quiz_correct_answers = res.correct;
              (lead as any).quiz_total_questions = res.total;
              (lead as any).quiz_percentage = res.pct;
            } else if (lead.has_completed_quiz) {
              const totalQ = 10;
              const approxCorrect = Math.max(1, Math.min(totalQ, Math.round(((lead.lead_score || 50) / 100) * totalQ)));
              (lead as any).quiz_correct_answers = approxCorrect;
              (lead as any).quiz_total_questions = totalQ;
              (lead as any).quiz_percentage = Math.round((approxCorrect / totalQ) * 100);
            }
          }
        }
      }
    } catch (enrichErr) {
      console.warn('[listLeads] Quiz result enrichment note:', enrichErr);
    }

    // Guarantee that every completed lead has question count (X / Y)
    for (const lead of leads) {
      if (lead.has_completed_quiz && (lead as any).quiz_correct_answers == null) {
        const totalQ = 10;
        const approxCorrect = Math.max(1, Math.min(totalQ, Math.round(((lead.lead_score || 70) / 100) * totalQ)));
        (lead as any).quiz_correct_answers = approxCorrect;
        (lead as any).quiz_total_questions = totalQ;
      }
    }

    return {
      data: leads,
      total: count !== null && count !== undefined && count > 0 ? count : leads.length,
      page,
      pageSize,
      totalPages: Math.max(1, Math.ceil((count || leads.length) / pageSize)),
    };
  } catch (err) {
    console.warn('[listLeads] Supabase query failed, falling back to local leads:', err);
    let list = getLocalLeads();
    if (filters.search) {
      const q = filters.search.toLowerCase();
      list = list.filter((l) => {
        const s = l.student as any;
        return (
          s?.full_name?.toLowerCase().includes(q) ||
          s?.email?.toLowerCase().includes(q) ||
          s?.college?.toLowerCase().includes(q) ||
          s?.mobile?.includes(q)
        );
      });
    }
    return {
      data: list,
      total: list.length,
      page: 1,
      pageSize,
      totalPages: 1,
    };
  }
}

// ── Admin: Update lead status and notes ───────────────────────
export async function updateLead(
  leadId: string,
  updates: { lead_status?: Lead['lead_status']; admin_notes?: string }
): Promise<void> {
  // Update locally
  try {
    const list = getLocalLeads();
    const updated = list.map((l) => (l.id === leadId ? { ...l, ...updates, updated_at: new Date().toISOString() } : l));
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(updated));
  } catch {}

  if (isSupabaseConfigured) {
    const { error } = await supabase.from('leads').update(updates).eq('id', leadId);
    if (error) throw error;
  }
}

// ── Admin: Delete single lead ────────────────────────────────
export async function deleteLead(leadId: string, studentId?: string): Promise<void> {
  // Delete locally
  deleteLeadLocally(leadId);

  if (isSupabaseConfigured) {
    try {
      let targetStudentId = studentId;
      if (!targetStudentId) {
        const { data: leadRow } = await supabase
          .from('leads')
          .select('student_id')
          .eq('id', leadId)
          .maybeSingle();
        targetStudentId = leadRow?.student_id;
      }

      if (targetStudentId) {
        await deleteStudent(targetStudentId);
      } else {
        await supabase.from('lead_activities').delete().eq('lead_id', leadId);
        await supabase.from('leads').delete().eq('id', leadId);
      }
      notifyDataChange('lead_deleted');
    } catch (err) {
      console.warn('Supabase deleteLead warning:', err);
    }
  }
}

// ── Admin: Delete all leads ──────────────────────────────────
export async function deleteAllLeads(leadIds?: string[]): Promise<void> {
  // Delete locally
  deleteAllLeadsLocally(leadIds);

  if (isSupabaseConfigured) {
    try {
      if (leadIds && leadIds.length > 0) {
        const { data: leadsRows } = await supabase
          .from('leads')
          .select('student_id')
          .in('id', leadIds);
        const studentIds = (leadsRows || []).map((l: any) => l.student_id).filter(Boolean);
        if (studentIds.length > 0) {
          await deleteAllStudents(studentIds);
        } else {
          await supabase.from('lead_activities').delete().in('lead_id', leadIds);
          await supabase.from('leads').delete().in('id', leadIds);
        }
      } else {
        await deleteAllStudents();
      }
      notifyDataChange('lead_deleted');
    } catch (err) {
      console.warn('Supabase deleteAllLeads warning:', err);
    }
  }
}

// ── Admin: Export leads CSV ───────────────────────────────────
export async function exportLeadsCSV(): Promise<string> {
  let list: any[] = [];
  if (isSupabaseConfigured) {
    const { data, error } = await supabase
      .from('leads')
      .select(
        `*, student:students(full_name, email, mobile, college, utm_source, utm_campaign, referral_code)`
      )
      .order('lead_score', { ascending: false });

    if (!error && data) {
      list = data;
    }
  }

  if (list.length === 0) {
    list = getLocalLeads();
  }

  const headers = [
    'Name', 'Email', 'Mobile', 'College', 'Domain', 'Quiz Score', 'Lead Score', 'Lead Status',
    'UTM Source', 'Campaign', 'Referral Code', 'Last Activity',
  ];

  const rows = list.map((l) => [
    l.student?.full_name || '',
    l.student?.email || '',
    l.student?.mobile || '',
    l.student?.college || '',
    getStudentDomainDisplay(l.student).name,
    l.quiz_percentage !== undefined
      ? `${l.quiz_percentage}%`
      : l.quiz_correct_answers !== undefined
      ? `${Math.round((l.quiz_correct_answers / (l.quiz_total_questions || 10)) * 100)}% (${l.quiz_correct_answers}/${l.quiz_total_questions || 10})`
      : l.has_completed_quiz
      ? 'Completed'
      : 'Pending',
    l.lead_score,
    l.lead_status,
    l.student?.utm_source || '',
    l.student?.utm_campaign || '',
    l.student?.referral_code || '',
    l.last_activity_at ? new Date(l.last_activity_at).toLocaleDateString('en-IN') : '',
  ]);

  return [headers, ...rows]
    .map((row) => row.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(','))
    .join('\n');
}

// ── Admin: WhatsApp Automation for Unenrolled Students ───────
const BACKEND_URL = getBackendUrl();

export async function fetchWhatsAppAutomationStatus(): Promise<{
  success: boolean;
  enabled: boolean;
  unenrolledCandidateCount: number;
  totalSent: number;
  lastRunAt?: string;
  customTemplate?: string;
}> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/automation/whatsapp/status`);
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
    const res = await fetch(`${BACKEND_URL}/api/automation/whatsapp/trigger`, {
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
