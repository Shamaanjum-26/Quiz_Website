-- ============================================================
-- STUDENT SKILL ASSESSMENT PLATFORM
-- Migration 001: Initial Schema
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. PROFILES (Supabase Auth linked)
-- ============================================================
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL DEFAULT 'student' CHECK (role IN ('student', 'admin', 'super_admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. DOMAINS
-- ============================================================
CREATE TABLE IF NOT EXISTS domains (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'code',
  color TEXT DEFAULT '#6366f1',
  difficulty TEXT DEFAULT 'beginner' CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
  question_count INTEGER DEFAULT 0,
  estimated_minutes INTEGER DEFAULT 20,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. STUDENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  mobile TEXT NOT NULL,
  college TEXT NOT NULL,
  branch TEXT NOT NULL,
  academic_year TEXT NOT NULL,
  state TEXT NOT NULL,
  city TEXT,
  graduation_year INTEGER,
  preferred_domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
  linkedin_url TEXT,
  consent BOOLEAN NOT NULL DEFAULT false,
  -- Marketing / UTM
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  referral_code TEXT,
  campaign_code TEXT,
  -- Meta
  is_verified BOOLEAN DEFAULT false,
  whatsapp_opt_in BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. CAMPAIGNS
-- ============================================================
CREATE TABLE IF NOT EXISTS campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT UNIQUE,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  description TEXT,
  target_domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
  -- Stats (denormalized for performance)
  total_visitors INTEGER DEFAULT 0,
  total_registrations INTEGER DEFAULT 0,
  total_quiz_starts INTEGER DEFAULT 0,
  total_quiz_completions INTEGER DEFAULT 0,
  total_bootcamp_registrations INTEGER DEFAULT 0,
  total_hot_leads INTEGER DEFAULT 0,
  total_conversions INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 5. QUIZZES (Domain-level quiz configuration)
-- ============================================================
CREATE TABLE IF NOT EXISTS quizzes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  total_questions INTEGER DEFAULT 20,
  time_limit_minutes INTEGER DEFAULT 30,
  passing_percentage INTEGER DEFAULT 50,
  randomize_questions BOOLEAN DEFAULT true,
  randomize_options BOOLEAN DEFAULT true,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. QUESTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE SET NULL,
  question_text TEXT NOT NULL,
  explanation TEXT,
  difficulty TEXT DEFAULT 'medium' CHECK (difficulty IN ('easy', 'medium', 'hard')),
  marks INTEGER DEFAULT 1,
  active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. QUESTION OPTIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS question_options (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  option_text TEXT NOT NULL,
  option_order INTEGER NOT NULL DEFAULT 0,
  is_correct BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 8. QUIZ ATTEMPTS
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  quiz_id UUID REFERENCES quizzes(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'started' CHECK (status IN ('started', 'submitted', 'expired', 'abandoned')),
  total_questions INTEGER DEFAULT 0,
  started_at TIMESTAMPTZ DEFAULT NOW(),
  submitted_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  time_taken_seconds INTEGER,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. QUIZ ANSWERS (student responses, no correct answer stored here)
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID NOT NULL REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_id UUID NOT NULL REFERENCES questions(id) ON DELETE CASCADE,
  selected_option_id UUID REFERENCES question_options(id) ON DELETE SET NULL,
  answered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(attempt_id, question_id)
);

-- ============================================================
-- 10. QUIZ RESULTS (computed server-side)
-- ============================================================
CREATE TABLE IF NOT EXISTS quiz_results (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  attempt_id UUID NOT NULL UNIQUE REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  total_questions INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  incorrect_answers INTEGER NOT NULL DEFAULT 0,
  unanswered INTEGER NOT NULL DEFAULT 0,
  total_marks INTEGER NOT NULL DEFAULT 0,
  obtained_marks INTEGER NOT NULL DEFAULT 0,
  percentage NUMERIC(5,2) NOT NULL DEFAULT 0,
  skill_level TEXT NOT NULL DEFAULT 'Foundation' CHECK (
    skill_level IN ('Foundation', 'Beginner', 'Intermediate', 'Advanced', 'Expert')
  ),
  personalized_message TEXT,
  strengths TEXT[],
  weak_areas TEXT[],
  recommendations TEXT[],
  calculated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 11. SKILL REPORTS
-- ============================================================
CREATE TABLE IF NOT EXISTS skill_reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  result_id UUID NOT NULL UNIQUE REFERENCES quiz_results(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  domain_id UUID NOT NULL REFERENCES domains(id) ON DELETE CASCADE,
  -- Free preview data
  preview_strengths TEXT[],
  preview_weak_areas TEXT[],
  preview_recommendations TEXT[],
  -- Premium data (locked)
  detailed_strengths JSONB,
  topic_performance JSONB,
  difficulty_performance JSONB,
  learning_roadmap JSONB,
  recommended_projects TEXT[],
  career_recommendations TEXT[],
  -- Payment
  is_premium_unlocked BOOLEAN DEFAULT false,
  payment_id TEXT,
  payment_amount NUMERIC(10,2),
  unlocked_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 12. BOOTCAMPS
-- ============================================================
CREATE TABLE IF NOT EXISTS bootcamps (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  domain_id UUID REFERENCES domains(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  benefits TEXT[],
  mentor_name TEXT,
  mentor_bio TEXT,
  mentor_avatar_url TEXT,
  start_date DATE,
  end_date DATE,
  start_time TIME,
  duration_weeks INTEGER DEFAULT 4,
  mode TEXT DEFAULT 'online' CHECK (mode IN ('online', 'offline', 'hybrid')),
  platform TEXT,
  total_seats INTEGER DEFAULT 100,
  registered_seats INTEGER DEFAULT 0,
  is_free BOOLEAN DEFAULT true,
  price NUMERIC(10,2) DEFAULT 0,
  status TEXT DEFAULT 'draft' CHECK (
    status IN ('draft', 'upcoming', 'live', 'completed', 'cancelled')
  ),
  min_score_percentage INTEGER DEFAULT 0,
  max_score_percentage INTEGER DEFAULT 100,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 13. BOOTCAMP REGISTRATIONS
-- ============================================================
CREATE TABLE IF NOT EXISTS bootcamp_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  bootcamp_id UUID NOT NULL REFERENCES bootcamps(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  quiz_result_id UUID REFERENCES quiz_results(id) ON DELETE SET NULL,
  preferred_timing TEXT,
  learning_goal TEXT,
  status TEXT DEFAULT 'registered' CHECK (
    status IN ('registered', 'confirmed', 'attended', 'completed', 'cancelled', 'no_show')
  ),
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  confirmed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(bootcamp_id, student_id)
);

-- ============================================================
-- 14. LEADS
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL UNIQUE REFERENCES students(id) ON DELETE CASCADE,
  lead_score INTEGER NOT NULL DEFAULT 0,
  lead_status TEXT NOT NULL DEFAULT 'NURTURE' CHECK (lead_status IN ('HOT', 'WARM', 'NURTURE')),
  qualification_reason TEXT,
  -- Action flags
  has_completed_quiz BOOLEAN DEFAULT false,
  has_viewed_result BOOLEAN DEFAULT false,
  has_viewed_report BOOLEAN DEFAULT false,
  has_clicked_premium_report BOOLEAN DEFAULT false,
  has_registered_bootcamp BOOLEAN DEFAULT false,
  has_verified_email BOOLEAN DEFAULT false,
  has_whatsapp_opt_in BOOLEAN DEFAULT false,
  has_multiple_sessions BOOLEAN DEFAULT false,
  session_count INTEGER DEFAULT 1,
  -- Notes
  admin_notes TEXT,
  last_activity_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 15. LEAD ACTIVITIES
-- ============================================================
CREATE TABLE IF NOT EXISTS lead_activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL CHECK (activity_type IN (
    'landing_page_visit',
    'registration_started',
    'registration_completed',
    'domain_selected',
    'quiz_started',
    'quiz_completed',
    'result_viewed',
    'premium_report_clicked',
    'bootcamp_cta_clicked',
    'bootcamp_registered',
    'email_sent',
    'whatsapp_sent',
    'lead_status_changed',
    'admin_note_added',
    'session_started'
  )),
  activity_data JSONB,
  score_change INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 16. ADMIN USERS
-- ============================================================
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
  is_active BOOLEAN DEFAULT true,
  last_login_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 17. EMAIL LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS email_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  to_email TEXT NOT NULL,
  from_email TEXT,
  subject TEXT NOT NULL,
  template_name TEXT,
  template_data JSONB,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'failed', 'bounced')),
  provider TEXT,
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 18. WHATSAPP LOGS
-- ============================================================
CREATE TABLE IF NOT EXISTS whatsapp_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES students(id) ON DELETE SET NULL,
  to_mobile TEXT NOT NULL,
  template_name TEXT NOT NULL,
  template_data JSONB,
  status TEXT DEFAULT 'queued' CHECK (status IN ('queued', 'sent', 'delivered', 'read', 'failed')),
  provider_message_id TEXT,
  error_message TEXT,
  sent_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- TRIGGERS: updated_at
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at
DO $$
DECLARE
  tbl TEXT;
BEGIN
  FOREACH tbl IN ARRAY ARRAY[
    'profiles', 'domains', 'students', 'campaigns', 'quizzes',
    'questions', 'quiz_attempts', 'quiz_results', 'skill_reports',
    'bootcamps', 'bootcamp_registrations', 'leads', 'admin_users'
  ]
  LOOP
    EXECUTE format('DROP TRIGGER IF EXISTS trg_%s_updated_at ON %s', tbl, tbl);
    EXECUTE format(
      'CREATE TRIGGER trg_%s_updated_at BEFORE UPDATE ON %s FOR EACH ROW EXECUTE FUNCTION update_updated_at()',
      tbl, tbl
    );
  END LOOP;
END;
$$;

-- ============================================================
-- TRIGGER: Update domain question_count when question inserted/deleted
-- ============================================================
CREATE OR REPLACE FUNCTION sync_domain_question_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE domains SET question_count = question_count + 1 WHERE id = NEW.domain_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE domains SET question_count = question_count - 1 WHERE id = OLD.domain_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_questions_count ON questions;
CREATE TRIGGER trg_questions_count
AFTER INSERT OR DELETE ON questions
FOR EACH ROW EXECUTE FUNCTION sync_domain_question_count();

-- ============================================================
-- TRIGGER: Update bootcamp registered_seats
-- ============================================================
CREATE OR REPLACE FUNCTION sync_bootcamp_seat_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE bootcamps SET registered_seats = registered_seats + 1 WHERE id = NEW.bootcamp_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE bootcamps SET registered_seats = registered_seats - 1 WHERE id = OLD.bootcamp_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_bootcamp_seats ON bootcamp_registrations;
CREATE TRIGGER trg_bootcamp_seats
AFTER INSERT OR DELETE ON bootcamp_registrations
FOR EACH ROW EXECUTE FUNCTION sync_bootcamp_seat_count();

-- ============================================================
-- TRIGGER: Auto-create profile on user signup
-- ============================================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trg_on_auth_user_created ON auth.users;
CREATE TRIGGER trg_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();
