import supabase from '@/lib/supabase';
import { persistStudentId } from '@/lib/analytics';
import type { Student, StudentRegistrationData, PaginatedResult, StudentFilters } from '@/types';

// ── Create or retrieve student ────────────────────────────────
export async function createOrGetStudent(
  data: StudentRegistrationData
): Promise<{ student: Student; isNew: boolean }> {
  // Check if student exists by email
  const { data: existing, error: fetchError } = await supabase
    .from('students')
    .select('*')
    .eq('email', data.email.toLowerCase().trim())
    .maybeSingle();

  if (fetchError) throw fetchError;

  if (existing) {
    // Update existing student with their latest registration details
    const { data: updated } = await supabase
      .from('students')
      .update({
        full_name: data.full_name || existing.full_name,
        mobile: data.mobile || existing.mobile,
        college: data.college || existing.college,
        branch: data.branch || existing.branch,
        academic_year: data.academic_year || existing.academic_year,
        state: data.state || existing.state,
        preferred_domain_id: data.preferred_domain_id || existing.preferred_domain_id,
        updated_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
      .select(`*, preferred_domain:domains(*)`)
      .maybeSingle();

    persistStudentId(existing.id);
    return { student: (updated || existing) as Student, isNew: false };
  }

  // Create new student
  const { data: created, error: createError } = await supabase
    .from('students')
    .insert({
      ...data,
      email: data.email.toLowerCase().trim(),
      preferred_domain_id: data.preferred_domain_id || null,
      linkedin_url: data.linkedin_url || null,
      city: data.city || null,
      graduation_year: data.graduation_year || null,
      referral_code: data.referral_code || null,
    })
    .select()
    .single();

  if (createError) throw createError;

  persistStudentId(created.id);

  // Create initial lead record
  await supabase.from('leads').insert({
    student_id: created.id,
    lead_score: 5, // Base score for registration
    lead_status: 'NURTURE',
    qualification_reason: 'NURTURE: initial registration',
  });

  // Log lead activity
  await supabase.from('lead_activities').insert({
    student_id: created.id,
    activity_type: 'registration_completed',
    activity_data: { utm_source: data.utm_source, utm_campaign: data.utm_campaign },
    score_change: 5,
  });

  return { student: created as Student, isNew: true };
}

// ── Get student by ID ─────────────────────────────────────────
export async function getStudentById(id: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select(`*, preferred_domain:domains(*)`)
    .eq('id', id)
    .maybeSingle();

  if (error) throw error;
  return data as Student | null;
}

// ── Get student by email ──────────────────────────────────────
export async function getStudentByEmail(email: string): Promise<Student | null> {
  const { data, error } = await supabase
    .from('students')
    .select(`*, preferred_domain:domains(*)`)
    .eq('email', email.toLowerCase().trim())
    .maybeSingle();

  if (error) throw error;
  return data as Student | null;
}

// ── Admin: List students ──────────────────────────────────────
export async function listStudents(
  filters: StudentFilters,
  page = 1,
  pageSize = 20
): Promise<PaginatedResult<Student & {
  lead?: { lead_score: number; lead_status: string; has_registered_bootcamp?: boolean; last_activity_at?: string };
  quiz_results?: { percentage: number; calculated_at: string }[];
  quiz_attempts?: { id: string }[];
}>> {
  let query = supabase
    .from('students')
    .select(
      `*, 
      preferred_domain:domains(name, slug),
      lead:leads(lead_score, lead_status, has_registered_bootcamp, last_activity_at),
      quiz_results(percentage, calculated_at),
      quiz_attempts(id)`,
      { count: 'exact' }
    );

  if (filters.search) {
    query = query.or(
      `full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,college.ilike.%${filters.search}%,mobile.ilike.%${filters.search}%`
    );
  }
  if (filters.domain_id) query = query.eq('preferred_domain_id', filters.domain_id);
  if (filters.state) query = query.eq('state', filters.state);
  if (filters.academic_year) query = query.eq('academic_year', filters.academic_year);
  if (filters.utm_source) query = query.eq('utm_source', filters.utm_source);

  const sortBy = filters.sort_by || 'created_at';
  const sortOrder = filters.sort_order === 'asc' ? false : true;
  query = query.order(sortBy, { ascending: !sortOrder });

  const from = (page - 1) * pageSize;
  query = query.range(from, from + pageSize - 1);

  const { data, error, count } = await query;
  if (error) throw error;

  return {
    data: (data || []) as (Student & { lead?: { lead_score: number; lead_status: string } })[],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

// ── Admin: Export students CSV ────────────────────────────────
export async function exportStudentsCSV(filters: StudentFilters): Promise<string> {
  let query = supabase
    .from('students')
    .select(`*, preferred_domain:domains(name), lead:leads(lead_score, lead_status)`);

  if (filters.search) {
    query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  const headers = [
    'Name', 'Email', 'Mobile', 'College', 'Branch', 'Year', 'State',
    'Domain', 'Lead Score', 'Lead Status', 'UTM Source', 'Referral Code', 'Registered At',
  ];

  const rows = (data || []).map((s) => [
    s.full_name, s.email, s.mobile, s.college, s.branch, s.academic_year, s.state,
    s.preferred_domain?.name || '',
    s.lead?.lead_score || 0,
    s.lead?.lead_status || 'NURTURE',
    s.utm_source || '', s.referral_code || '',
    new Date(s.created_at).toLocaleDateString('en-IN'),
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csv;
}

// ── Admin: Delete single student ─────────────────────────────
export async function deleteStudent(studentId: string): Promise<void> {
  const { error } = await supabase.from('students').delete().eq('id', studentId);
  if (error) throw error;
}

// ── Admin: Delete all students ───────────────────────────────
export async function deleteAllStudents(studentIds?: string[]): Promise<void> {
  if (studentIds && studentIds.length > 0) {
    const { error } = await supabase.from('students').delete().in('id', studentIds);
    if (error) throw error;
  } else {
    const { error } = await supabase.from('students').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    if (error) throw error;
  }
}
