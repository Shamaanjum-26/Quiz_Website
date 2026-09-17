// ============================================================
// GLOBAL TYPE DEFINITIONS
// Student Skill Assessment Platform
// ============================================================

// ── Supabase Auth ────────────────────────────────────────────
export interface Profile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  role: 'student' | 'admin' | 'super_admin';
  created_at: string;
  updated_at: string;
}

// ── Domains ──────────────────────────────────────────────────
export interface Domain {
  id: string;
  name: string;
  slug: string;
  description?: string;
  icon: string;
  color: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question_count: number;
  estimated_minutes: number;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

// ── Students ─────────────────────────────────────────────────
export interface Student {
  id: string;
  profile_id?: string;
  full_name: string;
  email: string;
  mobile: string;
  college: string;
  branch: string;
  academic_year: string;
  state: string;
  city?: string;
  graduation_year?: number;
  preferred_domain_id?: string;
  linkedin_url?: string;
  consent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referral_code?: string;
  campaign_code?: string;
  is_verified: boolean;
  whatsapp_opt_in: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  preferred_domain?: Domain;
}

export interface StudentRegistrationData {
  full_name: string;
  email: string;
  mobile: string;
  college: string;
  branch: string;
  academic_year: string;
  state: string;
  city?: string;
  graduation_year?: number;
  preferred_domain_id?: string;
  linkedin_url?: string;
  consent: boolean;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referral_code?: string;
}

// ── Questions ─────────────────────────────────────────────────
export interface Question {
  tier_label: string;
  id: string;
  domain_id: string;
  quiz_id?: string;
  question_text: string;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  marks: number;
  active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
  // Joined (options without is_correct exposed publicly)
  options?: QuestionOption[];
}

export interface QuestionOption {
  id: string;
  question_id: string;
  option_text: string;
  option_order: number;
  // is_correct is NOT exposed to students
  is_correct?: boolean; // Only available in admin context
}

// ── Quiz Attempts ─────────────────────────────────────────────
export type QuizAttemptStatus = 'started' | 'submitted' | 'expired' | 'abandoned';

export interface QuizAttempt {
  id: string;
  student_id: string;
  domain_id: string;
  quiz_id?: string;
  status: QuizAttemptStatus;
  total_questions: number;
  attempt_number?: number;
  started_at: string;
  submitted_at?: string;
  expires_at?: string;
  time_taken_seconds?: number;
  created_at: string;
  updated_at: string;
  // Joined
  domain?: Domain;
  student?: Student;
}

export interface QuizAnswer {
  question_id: string;
  selected_option_id: string | null;
}

// ── Quiz Results ──────────────────────────────────────────────
export type SkillLevel = 'Foundation' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';

export interface QuizResult {
  id: string;
  attempt_id: string;
  student_id: string;
  domain_id: string;
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unanswered: number;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  skill_level: SkillLevel;
  pass_fail?: 'PASSED' | 'FAILED';
  is_passed?: boolean;
  attempt_number?: number;
  personalized_message?: string;
  strengths?: string[];
  weak_areas?: string[];
  recommendations?: string[];
  calculated_at: string;
  created_at: string;
  // Joined
  domain?: Domain;
  student?: Student;
  attempt?: QuizAttempt;
}

// ── Skill Reports ─────────────────────────────────────────────
export interface SkillReport {
  id: string;
  result_id: string;
  student_id: string;
  domain_id: string;
  preview_strengths?: string[];
  preview_weak_areas?: string[];
  preview_recommendations?: string[];
  is_premium_unlocked: boolean;
  payment_id?: string;
  payment_amount?: number;
  unlocked_at?: string;
  created_at: string;
  updated_at: string;
  // Joined
  result?: QuizResult;
  domain?: Domain;
}

// ── Bootcamps ─────────────────────────────────────────────────
export type BootcampStatus = 'draft' | 'upcoming' | 'live' | 'completed' | 'cancelled';

export interface Bootcamp {
  id: string;
  domain_id?: string;
  name: string;
  slug?: string;
  description?: string;
  benefits?: string[];
  mentor_name?: string;
  mentor_bio?: string;
  mentor_avatar_url?: string;
  start_date?: string;
  end_date?: string;
  start_time?: string;
  duration_weeks: number;
  mode: 'online' | 'offline' | 'hybrid';
  platform?: string;
  total_seats: number;
  registered_seats: number;
  is_free: boolean;
  price: number;
  status: BootcampStatus;
  min_score_percentage: number;
  max_score_percentage: number;
  active: boolean;
  created_at: string;
  updated_at: string;
  // Joined
  domain?: Domain;
}

export interface BootcampRegistration {
  id: string;
  bootcamp_id: string;
  student_id: string;
  quiz_result_id?: string;
  preferred_batch?: string;
  preferred_timing?: string;
  learning_goal?: string;
  mode?: 'online' | 'offline';
  whatsapp_opt_in?: boolean;
  status: 'registered' | 'confirmed' | 'attended' | 'completed' | 'cancelled' | 'no_show';
  registered_at: string;
  confirmed_at?: string;
  created_at: string;
  updated_at: string;
  // Joined
  bootcamp?: Bootcamp;
  student?: Student;
}

// ── Leads ─────────────────────────────────────────────────────
export type LeadStatus = 'HOT' | 'WARM' | 'NURTURE';

export interface Lead {
  id: string;
  student_id: string;
  lead_score: number;
  lead_status: LeadStatus;
  qualification_reason?: string;
  has_completed_quiz: boolean;
  has_viewed_result: boolean;
  has_viewed_report: boolean;
  has_clicked_premium_report: boolean;
  has_registered_bootcamp: boolean;
  has_verified_email: boolean;
  has_whatsapp_opt_in: boolean;
  has_multiple_sessions: boolean;
  session_count: number;
  admin_notes?: string;
  last_activity_at: string;
  created_at: string;
  updated_at: string;
  // Optional quiz result fields (joined from quiz_results)
  quiz_total_questions?: number;
  quiz_correct_answers?: number;
  quiz_percentage?: number;
  // Joined
  student?: Student;
}

export type LeadActivityType =
  | 'landing_page_visit'
  | 'registration_started'
  | 'registration_completed'
  | 'domain_selected'
  | 'quiz_started'
  | 'quiz_completed'
  | 'result_viewed'
  | 'premium_report_clicked'
  | 'bootcamp_cta_clicked'
  | 'bootcamp_registered'
  | 'email_sent'
  | 'whatsapp_sent'
  | 'lead_status_changed'
  | 'admin_note_added'
  | 'session_started';

export interface LeadActivity {
  id: string;
  student_id: string;
  lead_id?: string;
  activity_type: LeadActivityType;
  activity_data?: Record<string, unknown>;
  score_change: number;
  created_at: string;
}

// ── Campaigns ─────────────────────────────────────────────────
export interface Campaign {
  id: string;
  name: string;
  code?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  description?: string;
  target_domain_id?: string;
  total_visitors: number;
  total_registrations: number;
  total_quiz_starts: number;
  total_quiz_completions: number;
  total_bootcamp_registrations: number;
  total_hot_leads: number;
  total_conversions: number;
  active: boolean;
  start_date?: string;
  end_date?: string;
  created_at: string;
  updated_at: string;
  // Computed
  registration_rate?: number;
  quiz_completion_rate?: number;
  conversion_rate?: number;
  // Joined
  domain?: Domain;
}

// ── Email & WhatsApp ──────────────────────────────────────────
export type EmailStatus = 'queued' | 'sent' | 'delivered' | 'failed' | 'bounced';
export type WhatsAppStatus = 'queued' | 'sent' | 'delivered' | 'read' | 'failed';

export interface EmailLog {
  id: string;
  student_id?: string;
  to_email: string;
  from_email?: string;
  subject: string;
  template_name?: string;
  template_data?: Record<string, unknown>;
  status: EmailStatus;
  provider?: string;
  provider_message_id?: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  created_at: string;
}

export interface WhatsAppLog {
  id: string;
  student_id?: string;
  to_mobile: string;
  template_name: string;
  template_data?: Record<string, unknown>;
  status: WhatsAppStatus;
  provider_message_id?: string;
  error_message?: string;
  sent_at?: string;
  delivered_at?: string;
  read_at?: string;
  created_at: string;
}

// ── UTM / Tracking ────────────────────────────────────────────
export interface UTMData {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  referral_code?: string;
  campaign_code?: string;
}

// ── Admin Dashboard ───────────────────────────────────────────
export interface DashboardStats {
  total_students: number;
  new_leads_today: number;
  quiz_attempts: number;
  completed_quizzes: number;
  bootcamp_registrations: number;
  hot_leads: number;
  warm_leads: number;
  nurture_leads: number;
  conversion_rate: number;
}

export interface ChartDataPoint {
  date: string;
  value: number;
  label?: string;
}

// ── Pagination ────────────────────────────────────────────────
export interface PaginationParams {
  page: number;
  pageSize: number;
}

export interface PaginatedResult<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// ── Filter ────────────────────────────────────────────────────
export interface StudentFilters {
  search?: string;
  domain_id?: string;
  state?: string;
  academic_year?: string;
  lead_status?: LeadStatus;
  utm_source?: string;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

export interface LeadFilters {
  search?: string;
  status?: LeadStatus;
  domain_id?: string;
  utm_source?: string;
  college?: string;
  min_score?: number;
  max_score?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// ── Local Quiz State ──────────────────────────────────────────
export interface LocalQuizState {
  attemptId: string;
  domainSlug: string;
  studentId: string;
  answers: Record<string, string | null>; // questionId -> optionId
  startedAt: string;
  currentQuestion: number;
}

// ── Score Calculation ─────────────────────────────────────────
export interface ScoreCalculationResult {
  total_questions: number;
  correct_answers: number;
  incorrect_answers: number;
  unanswered: number;
  total_marks: number;
  obtained_marks: number;
  percentage: number;
  skill_level: SkillLevel;
  personalized_message: string;
  strengths: string[];
  weak_areas: string[];
  recommendations: string[];
}
