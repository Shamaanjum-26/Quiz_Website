import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import { persistStudentId } from '@/lib/analytics';
import type { Student, StudentRegistrationData, PaginatedResult, StudentFilters } from '@/types';

export const LOCAL_STUDENTS_KEY = 'hadescore_local_students';
export const LOCAL_LEADS_KEY = 'hadescore_local_leads';
export const DELETED_STUDENTS_KEY = 'hadescore_deleted_students';
export const DELETED_LEADS_KEY = 'hadescore_deleted_leads';
export const DB_SEEDED_KEY = 'hadescore_db_seeded_v3';

// Initial sample data seeded only once if not previously seeded or cleared
export const INITIAL_SAMPLE_STUDENTS: Student[] = [
  {
    id: 'sample-student-1',
    full_name: 'Priya Sharma',
    email: 'priya@example.com',
    mobile: '9876543210',
    college: 'VIT Vellore',
    branch: 'Computer Science (CSE)',
    academic_year: '3rd Year',
    state: 'Tamil Nadu',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: {
      id: 'd1',
      name: 'Python Development',
      slug: 'python',
      icon: '🐍',
      color: '#059669',
      difficulty: 'intermediate',
      question_count: 30,
      estimated_minutes: 30,
      active: true,
      display_order: 1,
      created_at: '',
      updated_at: '',
    },
    created_at: new Date(Date.now() - 3600000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-student-2',
    full_name: 'Rahul Mehta',
    email: 'rahul@example.com',
    mobile: '9765432109',
    college: 'SRM University',
    branch: 'Information Technology (IT)',
    academic_year: '2nd Year',
    state: 'Tamil Nadu',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: {
      id: 'd2',
      name: 'Full-Stack Web Dev',
      slug: 'web-development',
      icon: '🌐',
      color: '#10b981',
      difficulty: 'intermediate',
      question_count: 30,
      estimated_minutes: 30,
      active: true,
      display_order: 2,
      created_at: '',
      updated_at: '',
    },
    created_at: new Date(Date.now() - 7200000).toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: 'sample-student-3',
    full_name: 'Ananya Reddy',
    email: 'ananya@example.com',
    mobile: '9654321098',
    college: 'Osmania University',
    branch: 'Data Science & AI',
    academic_year: 'Final Year',
    state: 'Telangana',
    consent: true,
    is_verified: true,
    whatsapp_opt_in: true,
    preferred_domain: {
      id: 'd3',
      name: 'Data Science & AI',
      slug: 'data-science',
      icon: '📊',
      color: '#0284c7',
      difficulty: 'intermediate',
      question_count: 30,
      estimated_minutes: 30,
      active: true,
      display_order: 3,
      created_at: '',
      updated_at: '',
    },
    created_at: new Date(Date.now() - 86400000).toISOString(),
    updated_at: new Date().toISOString(),
  },
];

function getDeletedStudentIds(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(DELETED_STUDENTS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

export function getLocalStudents(): Student[] {
  if (typeof window === 'undefined') return [];
  try {
    const deletedIds = getDeletedStudentIds();
    const isSeeded = localStorage.getItem(DB_SEEDED_KEY);
    const allDeleted = localStorage.getItem('hadescore_all_students_deleted') === 'true';

    if (allDeleted) {
      return [];
    }

    if (!isSeeded && !localStorage.getItem(LOCAL_STUDENTS_KEY)) {
      // First-time seed
      localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(INITIAL_SAMPLE_STUDENTS));
      localStorage.setItem(DB_SEEDED_KEY, 'true');
      return INITIAL_SAMPLE_STUDENTS.filter((s) => !deletedIds.has(s.id));
    }

    const raw = localStorage.getItem(LOCAL_STUDENTS_KEY);
    const list: Student[] = raw ? JSON.parse(raw) : [];
    return list.filter((s) => !deletedIds.has(s.id) && !deletedIds.has(s.email?.toLowerCase()));
  } catch {
    return [];
  }
}

export function saveLocalStudent(data: StudentRegistrationData): { student: Student; isNew: boolean } {
  const students = getLocalStudents();
  const emailNorm = data.email?.toLowerCase().trim();
  const existingIdx = students.findIndex((s) => s.email?.toLowerCase().trim() === emailNorm);

  if (existingIdx >= 0) {
    const updated: Student = {
      ...students[existingIdx],
      full_name: data.full_name || students[existingIdx].full_name,
      mobile: data.mobile || students[existingIdx].mobile,
      college: data.college || students[existingIdx].college,
      branch: data.branch || students[existingIdx].branch,
      academic_year: data.academic_year || students[existingIdx].academic_year,
      state: data.state || students[existingIdx].state,
      preferred_domain_id: data.preferred_domain_id || students[existingIdx].preferred_domain_id,
      updated_at: new Date().toISOString(),
    };
    students[existingIdx] = updated;
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));
    localStorage.removeItem('hadescore_all_students_deleted');
    persistStudentId(updated.id);
    return { student: updated, isNew: false };
  }

  const domainTitle = data.preferred_domain_id
    ? data.preferred_domain_id.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
    : 'Technical Assessment';

  const newStudent: Student = {
    id: 'student-' + Date.now(),
    full_name: data.full_name,
    email: emailNorm,
    mobile: data.mobile,
    college: data.college,
    branch: data.branch,
    academic_year: data.academic_year,
    state: data.state,
    preferred_domain_id: data.preferred_domain_id,
    preferred_domain: data.preferred_domain_id
      ? {
          id: data.preferred_domain_id,
          name: domainTitle,
          slug: data.preferred_domain_id,
          icon: '⚡',
          color: '#06b6d4',
          difficulty: 'intermediate',
          question_count: 30,
          estimated_minutes: 20,
          active: true,
          display_order: 1,
          created_at: '',
          updated_at: '',
        }
      : undefined,
    consent: data.consent ?? true,
    is_verified: true,
    whatsapp_opt_in: (data as any).whatsapp_opt_in ?? true,
    utm_source: data.utm_source,
    utm_medium: data.utm_medium,
    utm_campaign: data.utm_campaign,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  students.unshift(newStudent);
  localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));
  localStorage.removeItem('hadescore_all_students_deleted');
  localStorage.setItem(DB_SEEDED_KEY, 'true');
  persistStudentId(newStudent.id);

  // Sync to local leads list as well
  try {
    const rawLeads = localStorage.getItem(LOCAL_LEADS_KEY);
    const leads = rawLeads ? JSON.parse(rawLeads) : [];
    leads.unshift({
      id: 'lead-' + newStudent.id,
      student_id: newStudent.id,
      lead_score: 25,
      lead_status: 'HOT',
      qualification_reason: 'Direct Portal Registration',
      has_completed_quiz: false,
      has_viewed_result: false,
      has_viewed_report: false,
      has_registered_bootcamp: false,
      has_verified_email: true,
      has_whatsapp_opt_in: newStudent.whatsapp_opt_in,
      session_count: 1,
      last_activity_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      student: newStudent,
    });
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(leads));
    localStorage.removeItem('hadescore_all_leads_deleted');
  } catch {}

  return { student: newStudent, isNew: true };
}

export function deleteStudentLocally(studentId: string): void {
  try {
    // 1. Mark as deleted ID
    const deletedIds = getDeletedStudentIds();
    deletedIds.add(studentId);
    localStorage.setItem(DELETED_STUDENTS_KEY, JSON.stringify(Array.from(deletedIds)));

    // 2. Remove from students store
    const students = getLocalStudents().filter((s) => s.id !== studentId);
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify(students));

    // 3. Remove linked lead
    const rawLeads = localStorage.getItem(LOCAL_LEADS_KEY);
    if (rawLeads) {
      const leads = JSON.parse(rawLeads);
      const remainingLeads = leads.filter((l: any) => l.student_id !== studentId && l.id !== studentId && l.id !== `lead-${studentId}`);
      localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify(remainingLeads));
    }
  } catch (e) {
    console.error('deleteStudentLocally error:', e);
  }
}

export function deleteAllStudentsLocally(ids?: string[]): void {
  try {
    const deletedIds = getDeletedStudentIds();
    if (ids && ids.length > 0) {
      ids.forEach((id) => deletedIds.add(id));
    } else {
      getLocalStudents().forEach((s) => deletedIds.add(s.id));
    }
    localStorage.setItem(DELETED_STUDENTS_KEY, JSON.stringify(Array.from(deletedIds)));
    localStorage.setItem(LOCAL_STUDENTS_KEY, JSON.stringify([]));
    localStorage.setItem(LOCAL_LEADS_KEY, JSON.stringify([]));
    localStorage.setItem('hadescore_all_students_deleted', 'true');
    localStorage.setItem('hadescore_all_leads_deleted', 'true');
  } catch (e) {
    console.error('deleteAllStudentsLocally error:', e);
  }
}

// ── Create or retrieve student ────────────────────────────────
export async function createOrGetStudent(
  data: StudentRegistrationData
): Promise<{ student: Student; isNew: boolean }> {
  if (!isSupabaseConfigured) {
    return saveLocalStudent(data);
  }
  try {
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
      lead_score: 5,
      lead_status: 'NURTURE',
      qualification_reason: 'NURTURE: initial registration',
    });

    return { student: created as Student, isNew: true };
  } catch (err) {
    console.warn('[studentService] Supabase offline, saving student locally:', err);
    return saveLocalStudent(data);
  }
}

// ── Get student by ID ─────────────────────────────────────────
export async function getStudentById(id: string): Promise<Student | null> {
  if (!isSupabaseConfigured) {
    const s = getLocalStudents().find((st) => st.id === id);
    return s || null;
  }
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
  if (!isSupabaseConfigured) {
    const s = getLocalStudents().find((st) => st.email?.toLowerCase().trim() === email.toLowerCase().trim());
    return s || null;
  }
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
  if (!isSupabaseConfigured) {
    const all = getLocalStudents();
    return {
      data: all as any,
      total: all.length,
      page: 1,
      pageSize: 200,
      totalPages: 1,
    };
  }

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

  const deletedIds = getDeletedStudentIds();
  const allDeleted = localStorage.getItem('hadescore_all_students_deleted') === 'true';

  let rawList = (data || []) as (Student & { lead?: { lead_score: number; lead_status: string } })[];
  if (allDeleted) {
    rawList = [];
  } else if (deletedIds.size > 0) {
    rawList = rawList.filter((s) => !deletedIds.has(s.id) && !deletedIds.has(s.email?.toLowerCase()));
  }

  return {
    data: rawList,
    total: allDeleted ? 0 : rawList.length,
    page,
    pageSize,
    totalPages: Math.max(1, Math.ceil(rawList.length / pageSize)),
  };
}

// ── Admin: Export students CSV ────────────────────────────────
export async function exportStudentsCSV(filters: StudentFilters): Promise<string> {
  let list: any[] = [];
  if (isSupabaseConfigured) {
    let query = supabase
      .from('students')
      .select(`*, preferred_domain:domains(name), lead:leads(lead_score, lead_status)`);

    if (filters.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (!error && data) {
      const deletedIds = getDeletedStudentIds();
      list = (data as any[]).filter((s) => !deletedIds.has(s.id) && !deletedIds.has(s.email?.toLowerCase()));
    }
  }

  if (list.length === 0) {
    list = getLocalStudents();
  }

  const headers = [
    'Name', 'Email', 'Mobile', 'College', 'Branch', 'Year', 'State',
    'Domain', 'Lead Score', 'Lead Status', 'UTM Source', 'Referral Code', 'Registered At',
  ];

  const rows = list.map((s) => [
    s.full_name, s.email, s.mobile, s.college, s.branch, s.academic_year, s.state,
    s.preferred_domain?.name || '',
    s.lead?.lead_score || 0,
    s.lead?.lead_status || 'NURTURE',
    s.utm_source || '', s.referral_code || '',
    s.created_at ? new Date(s.created_at).toLocaleDateString('en-IN') : '',
  ]);

  const csv = [headers, ...rows]
    .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    .join('\n');

  return csv;
}

// ── Admin: Cascade delete single student ──────────────────────
export async function deleteStudent(studentId: string): Promise<void> {
  // Always remove locally first so UI is immediately and permanently clean
  deleteStudentLocally(studentId);

  if (isSupabaseConfigured) {
    try {
      // 1. Delete quiz_answers for any attempts by this student
      const { data: attempts } = await supabase
        .from('quiz_attempts')
        .select('id')
        .eq('student_id', studentId);

      if (attempts && attempts.length > 0) {
        const attemptIds = attempts.map((a: any) => a.id);
        await supabase.from('quiz_answers').delete().in('attempt_id', attemptIds);
      }

      // 2. Cascade delete in strict foreign key order
      await supabase.from('email_logs').delete().eq('student_id', studentId);
      await supabase.from('whatsapp_logs').delete().eq('student_id', studentId);
      await supabase.from('bootcamp_registrations').delete().eq('student_id', studentId);
      await supabase.from('skill_reports').delete().eq('student_id', studentId);
      await supabase.from('quiz_results').delete().eq('student_id', studentId);
      await supabase.from('quiz_attempts').delete().eq('student_id', studentId);
      await supabase.from('lead_activities').delete().eq('student_id', studentId);
      await supabase.from('leads').delete().eq('student_id', studentId);
      await supabase.from('students').delete().eq('id', studentId);
    } catch (err) {
      console.warn('Supabase deleteStudent cascade note:', err);
    }
  }
}

// ── Admin: Cascade delete all students ────────────────────────
export async function deleteAllStudents(studentIds?: string[]): Promise<void> {
  // Clear locally
  deleteAllStudentsLocally(studentIds);

  if (isSupabaseConfigured) {
    try {
      if (studentIds && studentIds.length > 0) {
        const { data: attempts } = await supabase
          .from('quiz_attempts')
          .select('id')
          .in('student_id', studentIds);

        if (attempts && attempts.length > 0) {
          const attemptIds = attempts.map((a: any) => a.id);
          await supabase.from('quiz_answers').delete().in('attempt_id', attemptIds);
        }

        await supabase.from('email_logs').delete().in('student_id', studentIds);
        await supabase.from('whatsapp_logs').delete().in('student_id', studentIds);
        await supabase.from('bootcamp_registrations').delete().in('student_id', studentIds);
        await supabase.from('skill_reports').delete().in('student_id', studentIds);
        await supabase.from('quiz_results').delete().in('student_id', studentIds);
        await supabase.from('quiz_attempts').delete().in('student_id', studentIds);
        await supabase.from('lead_activities').delete().in('student_id', studentIds);
        await supabase.from('leads').delete().in('student_id', studentIds);
        await supabase.from('students').delete().in('id', studentIds);
      } else {
        await supabase.from('quiz_answers').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('email_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('whatsapp_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('bootcamp_registrations').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('skill_reports').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('quiz_results').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('quiz_attempts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('lead_activities').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('leads').delete().neq('id', '00000000-0000-0000-0000-000000000000');
        await supabase.from('students').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      }
    } catch (err) {
      console.warn('Supabase deleteAllStudents cascade note:', err);
    }
  }
}
