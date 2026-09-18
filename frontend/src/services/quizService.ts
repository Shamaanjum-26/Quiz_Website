import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import { persistQuizState, clearQuizState } from '@/lib/analytics';
import { notifyDataChange } from '@/lib/sync';
import { getBackendUrl } from '@/lib/apiConfig';
import type { Domain, Question, QuizAttempt, QuizAnswer, QuizResult } from '@/types';

// ── Get all active domains ────────────────────────────────────
export async function getDomains(): Promise<Domain[]> {
  if (!isSupabaseConfigured) return [];
  try {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true });

    if (error) return [];
    return (data || []) as Domain[];
  } catch {
    return [];
  }
}

// ── Get domain by slug ────────────────────────────────────────
export async function getDomainBySlug(slug: string): Promise<Domain | null> {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('domains')
      .select('*')
      .eq('slug', slug)
      .eq('active', true)
      .maybeSingle();

    if (error) return null;
    return data as Domain | null;
  } catch {
    return null;
  }
}

// ── Get questions for a domain (WITHOUT correct answers) ──
export async function getQuestionsForQuiz(domainId: string, limit?: number): Promise<Question[]> {
  const quizConfig = getStoredQuizConfig();
  const targetLimit = limit || quizConfig.questions_per_quiz || 10;

  // Get questions
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id, domain_id, question_text, difficulty, marks, display_order')
    .eq('domain_id', domainId)
    .eq('active', true);

  if (qError) throw qError;

  const allQ = (questions || []) as Question[];
  const easyPool = allQ.filter((q) => q.difficulty === 'easy').sort(() => Math.random() - 0.5);
  const medPool = allQ.filter((q) => q.difficulty === 'medium').sort(() => Math.random() - 0.5);
  const hardPool = allQ.filter((q) => q.difficulty === 'hard').sort(() => Math.random() - 0.5);

  const easyCount = Math.max(1, Math.ceil(targetLimit * 0.33));
  const medCount = Math.max(1, Math.ceil(targetLimit * 0.33));
  const hardCount = Math.max(0, targetLimit - easyCount - medCount);

  const selectedEasy = easyPool.slice(0, easyCount);
  const selectedMed = medPool.slice(0, medCount);
  const selectedHard = hardPool.slice(0, hardCount);

  let ordered = [...selectedEasy, ...selectedMed, ...selectedHard];

  // If some tiers had fewer than requested, fill from remaining pool up to targetLimit
  if (ordered.length < targetLimit) {
    const selectedIds = new Set(ordered.map((q) => q.id));
    const leftovers = allQ.filter((q) => !selectedIds.has(q.id)).sort(() => Math.random() - 0.5);
    ordered.push(...leftovers.slice(0, targetLimit - ordered.length));
  }

  // Final trim to exact target limit
  if (ordered.length > targetLimit) {
    ordered = ordered.slice(0, targetLimit);
  }

  const questionIds = ordered.map((q) => q.id);

  // Get options WITHOUT is_correct
  const { data: options, error: oError } = await supabase
    .from('question_options')
    .select('id, question_id, option_text, option_order')
    .in('question_id', questionIds);

  if (oError) throw oError;

  // Merge options into questions, randomize option order
  return ordered.map((q, idx) => ({
    ...q,
    question_number: idx + 1,
    tier_number: idx < 10 ? 1 : idx < 20 ? 2 : 3,
    tier_label: idx < 10 ? 'Easy' : idx < 20 ? 'Medium' : 'Advanced',
    options: (options || [])
      .filter((o) => o.question_id === q.id)
      .sort(() => Math.random() - 0.5),
  })) as Question[];
}

// ── Attempt counting & limit tracking (Max 3 attempts) ─────────
export async function getStudentAttemptsCount(
  studentId: string,
  domainId: string
): Promise<number> {
  const localKey = `attempts_${studentId}_${domainId}`;
  const localCount = parseInt(localStorage.getItem(localKey) || '0', 10);

  if (!isSupabaseConfigured) {
    return localCount;
  }
  try {
    const { count, error } = await supabase
      .from('quiz_attempts')
      .select('*', { count: 'exact', head: true })
      .eq('student_id', studentId)
      .eq('domain_id', domainId);

    if (error || count === null) return localCount;
    return Math.max(count, localCount);
  } catch {
    return localCount;
  }
}

const BACKEND_URL = getBackendUrl();

// ── Start a quiz attempt (Backend Engine with Level 2 Deduplication) ───
export async function startQuizAttempt(
  studentId: string,
  domainId: string,
  targetCount?: number
): Promise<QuizAttempt & { questions?: Question[] }> {
  const qConfig = getStoredQuizConfig();
  const totalQ = targetCount || qConfig.questions_per_quiz || 10;

  // 1. Try Hadescore Backend Quiz Engine (Randomized, unseen questions, shuffled options)
  try {
    const res = await fetch(`${BACKEND_URL}/api/quiz/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ studentId, domainId, targetQuestionsCount: totalQ }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data && data.attemptId) {
        const localKey = `attempts_${studentId}_${domainId}`;
        localStorage.setItem(localKey, String(data.attemptNumber || 1));

        return {
          id: data.attemptId,
          student_id: studentId,
          domain_id: domainId,
          quiz_id: undefined,
          status: 'started',
          total_questions: data.totalQuestions || totalQ,
          started_at: data.startedAt || new Date().toISOString(),
          submitted_at: undefined,
          expires_at: data.expiresAt || new Date(Date.now() + 45 * 60 * 1000).toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          attempt_number: data.attemptNumber || 1,
          questions: data.questions, // Pre-randomized & sanitized questions
        };
      }
    } else {
      const errJson = await res.json().catch(() => ({}));
      console.warn('[quizService] Backend engine start issue:', errJson);
    }
  } catch (err: any) {
    console.warn('[quizService] Backend engine start notice, falling back to direct Supabase:', err);
  }

  // 2. Direct Supabase Fallback (unlimited attempts supported)
  const currentAttempts = await getStudentAttemptsCount(studentId, domainId);

  const attemptNumber = currentAttempts + 1;
  const localKey = `attempts_${studentId}_${domainId}`;
  localStorage.setItem(localKey, String(attemptNumber));

  const expiresAt = new Date(Date.now() + 45 * 60 * 1000).toISOString();

  const { data, error } = await supabase
    .from('quiz_attempts')
    .insert({
      student_id: studentId,
      domain_id: domainId,
      status: 'started',
      total_questions: totalQ,
      started_at: new Date().toISOString(),
      expires_at: expiresAt,
    })
    .select()
    .single();

  if (error) throw error;

  await supabase.from('lead_activities').insert({
    student_id: studentId,
    activity_type: 'quiz_started',
    activity_data: { domain_id: domainId, attempt_number: attemptNumber },
    score_change: 0,
  });

  return { ...(data as QuizAttempt), attempt_number: attemptNumber };
}

// ── Save answer locally (call this on each answer change) ─────
export function saveAnswerLocally(
  attemptId: string,
  domainSlug: string,
  studentId: string,
  answers: Record<string, string | null>,
  currentQuestion: number
): void {
  persistQuizState({
    attemptId,
    domainSlug,
    studentId,
    answers,
    startedAt: new Date().toISOString(),
    currentQuestion,
  });
}

// ── Submit quiz (answers go to Edge Function with resilient fallback) ─────
export async function submitQuiz(
  attemptId: string,
  studentId: string,
  answers: Record<string, string | null>
): Promise<QuizResult> {
  const answersArray: QuizAnswer[] = Object.entries(answers).map(([questionId, optionId]) => ({
    question_id: questionId,
    selected_option_id: optionId,
  }));

  // 1. Try Hadescore Backend Quiz Engine with fast 2.5s timeout (Server-Side Grading & Anti-Cheat)
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${BACKEND_URL}/api/quiz/submit`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ attemptId, studentId, answers }),
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data && data.result) {
        const pct = data.result.percentage ?? 0;
        const skill = data.result.skillLevel || 'Proficient';

        // Guaranteed frontend upsert to leads table in Supabase
        if (isSupabaseConfigured) {
          try {
            await supabase.from('leads').upsert({
              student_id: studentId,
              has_completed_quiz: true,
              has_viewed_result: true,
              lead_score: Math.min(100, Math.max(50, pct + 20)),
              lead_status: pct >= 50 ? 'HOT' : 'WARM',
              qualification_reason: `High Intent: completed assessment (${pct}%), scored ${skill} level`,
              last_activity_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            }, { onConflict: 'student_id' });
          } catch (leadSyncErr) {
            console.warn('[quizService] Direct lead upsert note:', leadSyncErr);
          }
        }

        // Also update local leads cache
        try {
          const raw = localStorage.getItem('hadescore_local_leads');
          if (raw) {
            const leads = JSON.parse(raw);
            const idx = leads.findIndex((l: any) => l.student_id === studentId);
            if (idx >= 0) {
              leads[idx].has_completed_quiz = true;
              leads[idx].has_viewed_result = true;
              leads[idx].lead_score = Math.min(100, Math.max(50, pct + 20));
              leads[idx].lead_status = pct >= 50 ? 'HOT' : 'WARM';
              leads[idx].qualification_reason = `High Intent: completed assessment (${pct}%), scored ${skill} level`;
              leads[idx].last_activity_at = new Date().toISOString();
              localStorage.setItem('hadescore_local_leads', JSON.stringify(leads));
            }
          }
        } catch {}

        clearQuizState();
        notifyDataChange('quiz_submitted');
        return {
          id: data.result.attemptId,
          attempt_id: data.result.attemptId,
          student_id: studentId,
          domain_id: '',
          total_questions: data.result.totalQuestions,
          correct_answers: data.result.correctAnswers,
          incorrect_answers: data.result.incorrectAnswers,
          unanswered: data.result.unanswered,
          total_marks: data.result.totalQuestions,
          obtained_marks: data.result.correctAnswers,
          percentage: data.result.percentage,
          skill_level: data.result.skillLevel,
          calculated_at: data.result.submittedAt,
          created_at: data.result.submittedAt,
        } as QuizResult;
      }
    }
  } catch (srvErr) {
    console.warn('[quizService] Backend submit notice, trying fast local/supabase fallback:', srvErr);
  }

  // 2. Resilient instant scoring directly with Supabase
  const questionIds = Object.keys(answers);
  let correctMap = new Map<string, string>();

  if (questionIds.length > 0) {
    try {
      const { data: options } = await supabase
        .from('question_options')
        .select('id, question_id, is_correct')
        .in('question_id', questionIds);

      (options || []).forEach((opt) => {
        if (opt.is_correct) correctMap.set(opt.question_id, opt.id);
      });
    } catch {}
  }

  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;

  for (const [qId, optId] of Object.entries(answers)) {
    if (!optId) {
      unansweredCount++;
    } else if (correctMap.get(qId) === optId) {
      correctCount++;
    } else {
      incorrectCount++;
    }
  }

  const totalQuestions = questionIds.length || 1;
  const percentage = Math.round((correctCount / totalQuestions) * 100);

  let skillLevel: 'Foundation' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' = 'Foundation';
  if (percentage >= 85) skillLevel = 'Expert';
  else if (percentage >= 70) skillLevel = 'Advanced';
  else if (percentage >= 50) skillLevel = 'Intermediate';
  else if (percentage >= 30) skillLevel = 'Beginner';

  const isPassed = percentage >= 50;
  const passFail: 'PASSED' | 'FAILED' = isPassed ? 'PASSED' : 'FAILED';

  const strengths = isPassed
    ? [
        'Strong grasp of core technical principles & syntax',
        'Accurately solved conceptual and problem-solving questions',
        'Solid foundation ready for hands-on project implementation',
      ]
    : [
        'Good attempt on basic introductory questions',
        'Completed assessment within the timed proctoring window',
      ];

  const weakAreas = isPassed
    ? [
        'Advanced architecture patterns and edge-case handling',
        'System performance profiling & scalability nuances',
      ]
    : [
        'Fundamental syntax, operations & standard libraries',
        'Algorithmic problem-solving & debugging tricky scenarios',
        'Speed and confidence under timed conditions',
      ];

  const recommendations = isPassed
    ? [
        'Join the Free Bootcamp to build real-world, industry-standard portfolio projects.',
        'Collaborate with mentors to prepare for tech internships & placement interviews.',
      ]
    : [
        'Review recommended study materials to sharpen core concepts.',
        'Join the Free Bootcamp to master the domain from scratch with live mentor guidance.',
      ];

  // Run DB writes & automations concurrently in the background so submission is instantaneous!
  Promise.allSettled([
    supabase.from('quiz_attempts').update({ status: 'submitted', completed_at: new Date().toISOString() }).eq('id', attemptId),
    supabase.from('quiz_results').upsert({
      attempt_id: attemptId,
      student_id: studentId,
      total_questions: totalQuestions,
      correct_answers: correctCount,
      incorrect_answers: incorrectCount,
      unanswered: unansweredCount,
      total_marks: totalQuestions,
      obtained_marks: correctCount,
      percentage,
      skill_level: skillLevel,
      personalized_message: isPassed
        ? `Congratulations! You scored ${percentage}% and successfully passed the quiz.`
        : `You scored ${percentage}%. Keep learning and sharpening your fundamentals!`,
      strengths,
      weak_areas: weakAreas,
      recommendations,
      calculated_at: new Date().toISOString(),
    }),
    supabase.from('leads').upsert({
      student_id: studentId,
      has_completed_quiz: true,
      has_viewed_result: true,
      lead_score: Math.min(100, Math.max(50, percentage + 20)),
      lead_status: percentage >= 50 ? 'HOT' : 'WARM',
      qualification_reason: `High Intent: completed assessment (${percentage}%), scored ${skillLevel} level`,
      last_activity_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }, { onConflict: 'student_id' }),
  ]).catch(() => {});

  // Update local leads sync as well
  try {
    const raw = localStorage.getItem('hadescore_local_leads');
    if (raw) {
      const leads = JSON.parse(raw);
      const idx = leads.findIndex((l: any) => l.student_id === studentId);
      if (idx >= 0) {
        leads[idx].has_completed_quiz = true;
        leads[idx].has_viewed_result = true;
        leads[idx].lead_score = Math.min(100, Math.max(50, percentage + 20));
        leads[idx].lead_status = percentage >= 50 ? 'HOT' : 'WARM';
        leads[idx].qualification_reason = `High Intent: completed assessment (${percentage}%), scored ${skillLevel} level`;
        leads[idx].last_activity_at = new Date().toISOString();
        localStorage.setItem('hadescore_local_leads', JSON.stringify(leads));
      }
    }
  } catch {}

  // Upsert into quiz_results
  const { data: result } = await supabase
    .from('quiz_results')
    .upsert({
      attempt_id: attemptId,
      student_id: studentId,
      total_questions: totalQuestions,
      correct_answers: correctCount,
      incorrect_answers: incorrectCount,
      unanswered: unansweredCount,
      total_marks: totalQuestions,
      obtained_marks: correctCount,
      percentage,
      skill_level: skillLevel,
      personalized_message: isPassed
        ? `Congratulations! You scored ${percentage}% and successfully passed the quiz.`
        : `You scored ${percentage}%. Keep learning and sharpening your fundamentals!`,
      strengths,
      weak_areas: weakAreas,
      recommendations,
      calculated_at: new Date().toISOString(),
    })
    .select('*, domain:domains(*)')
    .maybeSingle();

  clearQuizState();
  notifyDataChange('quiz_submitted');

  const finalResult: QuizResult = {
    id: result?.id || 'res-' + attemptId,
    attempt_id: attemptId,
    student_id: studentId,
    domain_id: result?.domain_id || '',
    total_questions: totalQuestions,
    correct_answers: correctCount,
    incorrect_answers: incorrectCount,
    unanswered: unansweredCount,
    total_marks: totalQuestions,
    obtained_marks: correctCount,
    percentage,
    skill_level: skillLevel,
    is_passed: isPassed,
    pass_fail: passFail,
    personalized_message: isPassed
      ? `Congratulations! You scored ${percentage}% and passed.`
      : `Keep Learning! You scored ${percentage}%.`,
    strengths,
    weak_areas: weakAreas,
    recommendations,
    calculated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    domain: result?.domain,
  };

  return finalResult;
}

// ── Get quiz result ───────────────────────────────────────────
export async function getQuizResult(attemptId: string): Promise<QuizResult | null> {
  const { data, error } = await supabase
    .from('quiz_results')
    .select(`*, domain:domains(*), attempt:quiz_attempts(started_at, time_taken_seconds)`)
    .eq('attempt_id', attemptId)
    .maybeSingle();

  if (error) throw error;
  return data as QuizResult | null;
}

// ── Get skill report for a result ────────────────────────────
export async function getSkillReport(resultId: string) {
  const { data, error } = await supabase
    .from('skill_reports')
    .select(`*, result:quiz_results(*, domain:domains(*))`)
    .eq('result_id', resultId)
    .maybeSingle();

  if (error) throw error;
  return data;
}

// ── Get student's quiz history ────────────────────────────────
export async function getStudentQuizHistory(studentId: string) {
  const { data, error } = await supabase
    .from('quiz_results')
    .select(`*, domain:domains(name, slug, icon, color)`)
    .eq('student_id', studentId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return (data || []) as QuizResult[];
}

// ── Admin: Get all quiz attempts ──────────────────────────────
export async function getQuizAttempts(page = 1, pageSize = 20) {
  const from = (page - 1) * pageSize;

  const { data, error, count } = await supabase
    .from('quiz_results')
    .select(
      `*, domain:domains(name), student:students(full_name, email, college)`,
      { count: 'exact' }
    )
    .order('created_at', { ascending: false })
    .range(from, from + pageSize - 1);

  if (error) throw error;

  return {
    data: data || [],
    total: count || 0,
    page,
    pageSize,
    totalPages: Math.ceil((count || 0) / pageSize),
  };
}

// ── Admin: Gemini AI & Quiz Engine Configuration ───────────────
export interface QuizEngineConfig {
  question_bank_size: number;
  questions_per_quiz: number;
  passing_questions_count: number;
  passing_percentage: number;
  max_attempts: number;
  quiz_timer_minutes: number;
  gemini_api_key?: string;
  gemini_api_key_masked?: string;
}

export const QUIZ_CONFIG_KEY = 'hadescore_quiz_config';

export const DEFAULT_QUIZ_CONFIG: QuizEngineConfig = {
  question_bank_size: 30,
  questions_per_quiz: 10,
  passing_questions_count: 5,
  passing_percentage: 50,
  max_attempts: 1, // 1 Attempt per candidate email ID
  quiz_timer_minutes: 15,
};

export function getStoredQuizConfig(): QuizEngineConfig {
  if (typeof window === 'undefined') return DEFAULT_QUIZ_CONFIG;
  try {
    const raw = localStorage.getItem(QUIZ_CONFIG_KEY);
    if (!raw) return DEFAULT_QUIZ_CONFIG;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_QUIZ_CONFIG,
      ...parsed,
      passing_questions_count: parsed.passing_questions_count || Math.ceil(((parsed.passing_percentage || 50) / 100) * (parsed.questions_per_quiz || 10)),
    };
  } catch {
    return DEFAULT_QUIZ_CONFIG;
  }
}

export async function fetchQuizConfig(): Promise<QuizEngineConfig> {
  const localConfig = getStoredQuizConfig();
  try {
    const res = await fetch(`${BACKEND_URL}/api/quiz/config`);
    if (res.ok) {
      const serverConfig = await res.json();
      const merged = { ...localConfig, ...serverConfig };
      localStorage.setItem(QUIZ_CONFIG_KEY, JSON.stringify(merged));
      return merged;
    }
  } catch (err) {
    console.warn('Backend quiz config fetch notice:', err);
  }
  return localConfig;
}

export async function saveQuizConfig(config: Partial<QuizEngineConfig>): Promise<QuizEngineConfig> {
  const current = getStoredQuizConfig();
  const updated: QuizEngineConfig = {
    ...current,
    ...config,
  };

  // Ensure passing_questions_count and passing_percentage stay in sync
  if (config.questions_per_quiz || config.passing_questions_count) {
    const qCount = updated.questions_per_quiz || 10;
    const pCount = Math.min(qCount, Math.max(1, updated.passing_questions_count || 5));
    updated.passing_questions_count = pCount;
    updated.passing_percentage = Math.round((pCount / qCount) * 100);
  } else if (config.passing_percentage) {
    const qCount = updated.questions_per_quiz || 10;
    updated.passing_questions_count = Math.ceil(((config.passing_percentage || 50) / 100) * qCount);
  }

  localStorage.setItem(QUIZ_CONFIG_KEY, JSON.stringify(updated));

  try {
    await fetch(`${BACKEND_URL}/api/quiz/config`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updated),
    });
  } catch (err) {
    console.warn('Backend quiz config save notice:', err);
  }

  return updated;
}

export interface DomainBankStat {
  domainId: string;
  domainName: string;
  domainSlug: string;
  total: number;
  easy: number;
  medium: number;
  hard: number;
  isReady: boolean;
  targetBankSize: number;
}

export async function fetchDomainBankStats(): Promise<DomainBankStat[]> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/quiz/domain-stats`);
    if (res.ok) {
      const data = await res.json();
      return data.stats || [];
    }
  } catch (err) {
    console.warn('Failed to fetch domain bank stats from backend:', err);
  }
  return [];
}

export async function generateDomainQuestionBank(
  domainId: string,
  domainName: string,
  apiKey?: string
): Promise<{ success: boolean; generated: number; saved: number; totalExisting: number }> {
  const res = await fetch(`${BACKEND_URL}/api/quiz/generate-bank`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ domainId, domainName, apiKey }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Failed to generate question bank for ${domainName}`);
  }
  return await res.json();
}
