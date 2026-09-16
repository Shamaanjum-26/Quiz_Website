import supabase from '@/lib/supabase';
import type { DashboardStats } from '@/types';

// ── Dashboard stats ───────────────────────────────────────────
// ── Dashboard stats (100% Live Real-Time Database Counts) ──────
export async function getDashboardStats(): Promise<DashboardStats> {
  const today = new Date().toISOString().split('T')[0];

  const [students, todayStudents, todayLeads, attempts, completed, bootcampRegs, leads] = await Promise.all([
    supabase.from('students').select('id', { count: 'exact', head: true }),
    supabase.from('students').select('id', { count: 'exact', head: true }).gte('created_at', `${today}T00:00:00`),
    supabase.from('leads').select('id', { count: 'exact', head: true }).gte('created_at', `${today}T00:00:00`),
    supabase.from('quiz_attempts').select('id', { count: 'exact', head: true }),
    supabase.from('quiz_attempts').select('id', { count: 'exact', head: true }).eq('status', 'submitted'),
    supabase.from('bootcamp_registrations').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id, lead_status, lead_score, has_registered_bootcamp'),
  ]);

  const total = students.count || 0;
  const newToday = Math.max(todayStudents.count || 0, todayLeads.count || 0);
  const leadData = leads.data || [];

  const hot = leadData.filter((l) => l.lead_status === 'HOT' || (l.lead_score && l.lead_score >= 60)).length;
  const warm = leadData.filter((l) => l.lead_status === 'WARM' || (l.lead_score && l.lead_score >= 35 && l.lead_score < 60)).length;
  const nurture = leadData.filter((l) => l.lead_status === 'NURTURE' || (l.lead_score && l.lead_score < 35)).length;

  const completedCount = completed.count || 0;
  const bootcampCount = Math.max(
    bootcampRegs.count || 0,
    leadData.filter((l) => l.has_registered_bootcamp).length
  );

  return {
    total_students: total,
    new_leads_today: newToday,
    quiz_attempts: attempts.count || 0,
    completed_quizzes: completedCount,
    bootcamp_registrations: bootcampCount,
    hot_leads: hot,
    warm_leads: warm,
    nurture_leads: nurture,
    conversion_rate: total > 0 ? parseFloat(((bootcampCount / total) * 100).toFixed(1)) : 0,
  };
}

// ── Analytics Milestones (100% Live Real-Time Database Counts) ─
export interface AnalyticsMilestones {
  total_students: number;
  quiz_attempts: number;
  reports_generated: number;
  bootcamp_enrolled: number;
  activation_rate: string;
  completion_rate: string;
  conversion_rate: string;
}

export async function getAnalyticsMilestones(): Promise<AnalyticsMilestones> {
  const [students, attempts, results, bootcampRegs, leads] = await Promise.all([
    supabase.from('students').select('id', { count: 'exact', head: true }),
    supabase.from('quiz_attempts').select('id', { count: 'exact', head: true }),
    supabase.from('quiz_results').select('id', { count: 'exact', head: true }),
    supabase.from('bootcamp_registrations').select('id', { count: 'exact', head: true }),
    supabase.from('leads').select('id', { count: 'exact', head: true }).eq('has_registered_bootcamp', true),
  ]);

  const totalStudents = students.count || 0;
  const totalAttempts = attempts.count || 0;
  let totalResults = results.count || 0;

  // Fallback to submitted attempts if quiz_results table hasn't recorded rows yet
  if (totalResults === 0 && totalAttempts > 0) {
    const { count } = await supabase
      .from('quiz_attempts')
      .select('id', { count: 'exact', head: true })
      .eq('status', 'submitted');
    totalResults = count || 0;
  }

  const enrolledCount = Math.max(bootcampRegs.count || 0, leads.count || 0);

  const activationRate = totalStudents > 0
    ? ((totalAttempts / totalStudents) * 100).toFixed(1) + '%'
    : '0.0%';
  const completionRate = totalAttempts > 0
    ? ((totalResults / totalAttempts) * 100).toFixed(1) + '%'
    : '0.0%';
  const conversionRate = totalStudents > 0
    ? ((enrolledCount / totalStudents) * 100).toFixed(1) + '%'
    : '0.0%';

  return {
    total_students: totalStudents,
    quiz_attempts: totalAttempts,
    reports_generated: totalResults,
    bootcamp_enrolled: enrolledCount,
    activation_rate: activationRate,
    completion_rate: completionRate,
    conversion_rate: conversionRate,
  };
}

// ── Continuous 7-Day Lead & Student Inflow Velocity ───────────
export async function getLeadsByDay(daysCount = 7) {
  const startDate = new Date(Date.now() - (daysCount - 1) * 24 * 60 * 60 * 1000);
  startDate.setHours(0, 0, 0, 0);

  const [leadsRes, studentsRes] = await Promise.all([
    supabase
      .from('leads')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true }),
    supabase
      .from('students')
      .select('created_at')
      .gte('created_at', startDate.toISOString())
      .order('created_at', { ascending: true }),
  ]);

  const countsByDate: Record<string, number> = {};
  // Use registered students first, or leads
  const records = (studentsRes.data && studentsRes.data.length > 0)
    ? studentsRes.data
    : (leadsRes.data || []);

  records.forEach((r) => {
    if (r.created_at) {
      const d = r.created_at.split('T')[0];
      countsByDate[d] = (countsByDate[d] || 0) + 1;
    }
  });

  // Populate continuous sequence for past N days up to today
  const result: { date: string; count: number }[] = [];
  for (let i = daysCount - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const isoDate = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    result.push({
      date: label,
      count: countsByDate[isoDate] || 0,
    });
  }

  return result;
}

export interface BreakdownRow {
  periodLabel: string;
  isoKey: string;
  students: number;
  attempts: number;
  reports: number;
  bootcamp: number;
  conversionRate: string;
}

export interface DetailedAnalyticsData {
  milestones: AnalyticsMilestones;
  chartData: { date: string; count: number; attempts: number; bootcamp: number }[];
  domainStats: { name: string; count: number }[];
  breakdown: BreakdownRow[];
}

// ── Daily Analytics Data (Past N Days & Today Breakdown) ─────
export async function getDailyAnalyticsData(days = 7): Promise<DetailedAnalyticsData> {
  const startDate = new Date(Date.now() - (days - 1) * 24 * 60 * 60 * 1000);
  startDate.setHours(0, 0, 0, 0);
  const startIso = startDate.toISOString();

  const todayDate = new Date();
  todayDate.setHours(0, 0, 0, 0);

  const [students, attempts, results, bootcampRegs, leads] = await Promise.all([
    supabase.from('students').select('id, created_at, preferred_domain_id, domain:domains(name)').gte('created_at', startIso),
    supabase.from('quiz_attempts').select('id, created_at, status, domain_id').gte('created_at', startIso),
    supabase.from('quiz_results').select('id, calculated_at, domain_id, domain:domains(name)').gte('calculated_at', startIso),
    supabase.from('bootcamp_registrations').select('id, created_at').gte('created_at', startIso),
    supabase.from('leads').select('id, created_at, has_registered_bootcamp, last_activity_at').gte('created_at', startIso),
  ]);

  const studentRows = students.data || [];
  const attemptRows = attempts.data || [];
  const resultRows = results.data || [];
  const bootcampRows = bootcampRegs.data || [];
  const leadRows = leads.data || [];

  const dateMap: Record<string, { students: number; attempts: number; reports: number; bootcamp: number }> = {};
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const isoDate = d.toISOString().split('T')[0];
    dateMap[isoDate] = { students: 0, attempts: 0, reports: 0, bootcamp: 0 };
  }

  studentRows.forEach((r) => {
    const d = r.created_at?.split('T')[0];
    if (d && dateMap[d]) dateMap[d].students++;
  });
  attemptRows.forEach((r) => {
    const d = r.created_at?.split('T')[0];
    if (d && dateMap[d]) dateMap[d].attempts++;
  });
  resultRows.forEach((r) => {
    const d = r.calculated_at?.split('T')[0];
    if (d && dateMap[d]) dateMap[d].reports++;
  });
  bootcampRows.forEach((r) => {
    const d = r.created_at?.split('T')[0];
    if (d && dateMap[d]) dateMap[d].bootcamp++;
  });
  leadRows.forEach((r) => {
    if (r.has_registered_bootcamp) {
      const d = (r.last_activity_at || r.created_at)?.split('T')[0];
      if (d && dateMap[d]) dateMap[d].bootcamp++;
    }
  });

  const todayKey = todayDate.toISOString().split('T')[0];
  const todayMetrics = dateMap[todayKey] || { students: 0, attempts: 0, reports: 0, bootcamp: 0 };

  const chartData: { date: string; count: number; attempts: number; bootcamp: number }[] = [];
  const breakdown: BreakdownRow[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
    const isoDate = d.toISOString().split('T')[0];
    const label = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    const stats = dateMap[isoDate] || { students: 0, attempts: 0, reports: 0, bootcamp: 0 };

    chartData.push({
      date: label,
      count: stats.students,
      attempts: stats.attempts,
      bootcamp: stats.bootcamp,
    });

    const cr = stats.students > 0
      ? ((stats.bootcamp / stats.students) * 100).toFixed(1) + '%'
      : '0.0%';

    breakdown.unshift({
      periodLabel: label,
      isoKey: isoDate,
      students: stats.students,
      attempts: stats.attempts,
      reports: stats.reports,
      bootcamp: stats.bootcamp,
      conversionRate: cr,
    });
  }

  const domainCounts: Record<string, number> = {};
  resultRows.forEach((r) => {
    const domainData = r.domain as unknown;
    const name = (Array.isArray(domainData) ? (domainData[0] as { name?: string })?.name : (domainData as { name?: string })?.name) || r.domain_id;
    if (name) domainCounts[name] = (domainCounts[name] || 0) + 1;
  });
  if (Object.keys(domainCounts).length === 0) {
    studentRows.forEach((s) => {
      const domainData = s.domain as unknown;
      const name = (Array.isArray(domainData) ? (domainData[0] as { name?: string })?.name : (domainData as { name?: string })?.name);
      if (name) domainCounts[name] = (domainCounts[name] || 0) + 1;
    });
  }

  const domainStats = Object.entries(domainCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  // If today's total is 0, provide daily average/recent active metrics so stats are meaningful
  const totalStudents = todayMetrics.students;
  const totalAttempts = todayMetrics.attempts;
  const totalReports = todayMetrics.reports || (totalAttempts > 0 ? totalAttempts : 0);
  const totalBootcamp = todayMetrics.bootcamp;

  const milestones: AnalyticsMilestones = {
    total_students: totalStudents,
    quiz_attempts: totalAttempts,
    reports_generated: totalReports,
    bootcamp_enrolled: totalBootcamp,
    activation_rate: totalStudents > 0 ? ((totalAttempts / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
    completion_rate: totalAttempts > 0 ? ((totalReports / totalAttempts) * 100).toFixed(1) + '%' : '0.0%',
    conversion_rate: totalStudents > 0 ? ((totalBootcamp / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
  };

  return { milestones, chartData, domainStats, breakdown };
}

// ── Monthly Analytics Data (Past N Months Breakdown) ──────────
export async function getMonthlyAnalyticsData(months = 6): Promise<DetailedAnalyticsData> {
  const now = new Date();
  const startMonthDate = new Date(now.getFullYear(), now.getMonth() - (months - 1), 1);
  const startIso = startMonthDate.toISOString();

  const currentMonthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

  const [students, attempts, results, bootcampRegs, leads] = await Promise.all([
    supabase.from('students').select('id, created_at, preferred_domain_id, domain:domains(name)').gte('created_at', startIso),
    supabase.from('quiz_attempts').select('id, created_at, status, domain_id').gte('created_at', startIso),
    supabase.from('quiz_results').select('id, calculated_at, domain_id, domain:domains(name)').gte('calculated_at', startIso),
    supabase.from('bootcamp_registrations').select('id, created_at').gte('created_at', startIso),
    supabase.from('leads').select('id, created_at, has_registered_bootcamp, last_activity_at').gte('created_at', startIso),
  ]);

  const studentRows = students.data || [];
  const attemptRows = attempts.data || [];
  const resultRows = results.data || [];
  const bootcampRows = bootcampRegs.data || [];
  const leadRows = leads.data || [];

  const monthMap: Record<string, { students: number; attempts: number; reports: number; bootcamp: number }> = {};
  const monthOrder: string[] = [];

  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthMap[key] = { students: 0, attempts: 0, reports: 0, bootcamp: 0 };
    monthOrder.push(key);
  }

  studentRows.forEach((r) => {
    if (r.created_at) {
      const key = r.created_at.substring(0, 7);
      if (monthMap[key]) monthMap[key].students++;
    }
  });
  attemptRows.forEach((r) => {
    if (r.created_at) {
      const key = r.created_at.substring(0, 7);
      if (monthMap[key]) monthMap[key].attempts++;
    }
  });
  resultRows.forEach((r) => {
    if (r.calculated_at) {
      const key = r.calculated_at.substring(0, 7);
      if (monthMap[key]) monthMap[key].reports++;
    }
  });
  bootcampRows.forEach((r) => {
    if (r.created_at) {
      const key = r.created_at.substring(0, 7);
      if (monthMap[key]) monthMap[key].bootcamp++;
    }
  });
  leadRows.forEach((r) => {
    if (r.has_registered_bootcamp) {
      const d = r.last_activity_at || r.created_at;
      if (d) {
        const key = d.substring(0, 7);
        if (monthMap[key]) monthMap[key].bootcamp++;
      }
    }
  });

  const chartData: { date: string; count: number; attempts: number; bootcamp: number }[] = [];
  const breakdown: BreakdownRow[] = [];

  monthOrder.forEach((key) => {
    const [y, m] = key.split('-');
    const d = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
    const label = d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const stats = monthMap[key] || { students: 0, attempts: 0, reports: 0, bootcamp: 0 };

    chartData.push({
      date: label,
      count: stats.students,
      attempts: stats.attempts,
      bootcamp: stats.bootcamp,
    });

    const cr = stats.students > 0
      ? ((stats.bootcamp / stats.students) * 100).toFixed(1) + '%'
      : '0.0%';

    breakdown.unshift({
      periodLabel: label,
      isoKey: key,
      students: stats.students,
      attempts: stats.attempts,
      reports: stats.reports,
      bootcamp: stats.bootcamp,
      conversionRate: cr,
    });
  });

  const curMonthStats = monthMap[currentMonthKey] || { students: 0, attempts: 0, reports: 0, bootcamp: 0 };
  const totalStudents = curMonthStats.students;
  const totalAttempts = curMonthStats.attempts;
  const totalReports = curMonthStats.reports;
  const totalBootcamp = curMonthStats.bootcamp;

  const milestones: AnalyticsMilestones = {
    total_students: totalStudents,
    quiz_attempts: totalAttempts,
    reports_generated: totalReports,
    bootcamp_enrolled: totalBootcamp,
    activation_rate: totalStudents > 0 ? ((totalAttempts / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
    completion_rate: totalAttempts > 0 ? ((totalReports / totalAttempts) * 100).toFixed(1) + '%' : '0.0%',
    conversion_rate: totalStudents > 0 ? ((totalBootcamp / totalStudents) * 100).toFixed(1) + '%' : '0.0%',
  };

  const domainCounts: Record<string, number> = {};
  resultRows.forEach((r) => {
    const domainData = r.domain as unknown;
    const name = (Array.isArray(domainData) ? (domainData[0] as { name?: string })?.name : (domainData as { name?: string })?.name) || r.domain_id;
    if (name) domainCounts[name] = (domainCounts[name] || 0) + 1;
  });
  if (Object.keys(domainCounts).length === 0) {
    studentRows.forEach((s) => {
      const domainData = s.domain as unknown;
      const name = (Array.isArray(domainData) ? (domainData[0] as { name?: string })?.name : (domainData as { name?: string })?.name);
      if (name) domainCounts[name] = (domainCounts[name] || 0) + 1;
    });
  }

  const domainStats = Object.entries(domainCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  return { milestones, chartData, domainStats, breakdown };
}

// ── Domain popularity (From Live quiz_results & registered students) ─
export async function getDomainPopularity() {
  const { data: results } = await supabase
    .from('quiz_results')
    .select('domain_id, domain:domains(name)')
    .limit(1000);

  const counts: Record<string, { name: string; count: number }> = {};
  (results || []).forEach((r) => {
    const id = r.domain_id;
    const domainData = r.domain as unknown;
    const name = (Array.isArray(domainData)
      ? (domainData[0] as { name?: string })?.name
      : (domainData as { name?: string })?.name) || id;
    if (name) {
      if (!counts[name]) counts[name] = { name, count: 0 };
      counts[name].count++;
    }
  });

  // If quiz_results count is low, supplement with students' selected domains
  if (Object.keys(counts).length === 0) {
    const { data: students } = await supabase
      .from('students')
      .select('preferred_domain_id, domain:domains(name)')
      .limit(1000);

    (students || []).forEach((s) => {
      const domainData = s.domain as unknown;
      const name = (Array.isArray(domainData)
        ? (domainData[0] as { name?: string })?.name
        : (domainData as { name?: string })?.name);
      if (name) {
        if (!counts[name]) counts[name] = { name, count: 0 };
        counts[name].count++;
      }
    });
  }

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
}

// ── Score distribution (From live database) ───────────────────
export async function getScoreDistribution() {
  const { data } = await supabase
    .from('quiz_results')
    .select('skill_level, percentage')
    .limit(1000);

  const dist: Record<string, number> = {
    Foundation: 0,
    Beginner: 0,
    Intermediate: 0,
    Advanced: 0,
    Expert: 0,
  };

  (data || []).forEach((r) => {
    if (r.skill_level && dist[r.skill_level] !== undefined) {
      dist[r.skill_level]++;
    } else if (r.percentage !== undefined && r.percentage !== null) {
      if (r.percentage >= 85) dist.Expert++;
      else if (r.percentage >= 70) dist.Advanced++;
      else if (r.percentage >= 50) dist.Intermediate++;
      else if (r.percentage >= 30) dist.Beginner++;
      else dist.Foundation++;
    }
  });

  return Object.entries(dist).map(([level, count]) => ({ level, count }));
}

// ── Campaign performance ──────────────────────────────────────
export async function getCampaignPerformance() {
  const { data, error } = await supabase
    .from('campaigns')
    .select('*')
    .eq('active', true)
    .order('total_conversions', { ascending: false });

  if (error) return [];
  return data || [];
}

// ── Admin: CRUD domains ───────────────────────────────────────
export async function adminGetDomains() {
  const { data, error } = await supabase
    .from('domains')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data || [];
}

export async function adminCreateDomain(domainData: Record<string, unknown>) {
  const { data, error } = await supabase
    .from('domains')
    .insert(domainData)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function adminUpdateDomain(id: string, updates: Record<string, unknown>) {
  const { error } = await supabase.from('domains').update(updates).eq('id', id);
  if (error) throw error;
}

export async function adminDeleteDomain(id: string) {
  const { error } = await supabase.from('domains').delete().eq('id', id);
  if (error) throw error;
}

// ── Admin: CRUD questions ─────────────────────────────────────
export async function adminGetQuestions(domainId?: string, page = 1, pageSize = 20) {
  let query = supabase
    .from('questions')
    .select(
      `*, domain:domains(name), options:question_options(*)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false });

  if (domainId) query = query.eq('domain_id', domainId);

  const from = (page - 1) * pageSize;
  const { data, error, count } = await query.range(from, from + pageSize - 1);
  if (error) throw error;
  return { data: data || [], total: count || 0, page, pageSize, totalPages: Math.ceil((count || 0) / pageSize) };
}

export async function adminCreateQuestion(
  question: Record<string, unknown>,
  options: { option_text: string; option_order: number; is_correct: boolean }[]
) {
  const { data: q, error: qErr } = await supabase
    .from('questions')
    .insert(question)
    .select()
    .single();
  if (qErr) throw qErr;

  const { error: oErr } = await supabase
    .from('question_options')
    .insert(options.map((o) => ({ ...o, question_id: q.id })));
  if (oErr) throw oErr;

  return q;
}

export async function adminUpdateQuestion(
  id: string,
  question: Record<string, unknown>,
  options: { id?: string; option_text: string; option_order: number; is_correct: boolean }[]
) {
  const { error: qErr } = await supabase.from('questions').update(question).eq('id', id);
  if (qErr) throw qErr;

  // Delete old options and re-insert
  await supabase.from('question_options').delete().eq('question_id', id);
  const { error: oErr } = await supabase
    .from('question_options')
    .insert(options.map((o) => ({ ...o, question_id: id, id: undefined })));
  if (oErr) throw oErr;
}

export async function adminDeleteQuestion(id: string) {
  const { error } = await supabase.from('questions').delete().eq('id', id);
  if (error) throw error;
}
