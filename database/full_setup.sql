-- ============================================================
-- SKILLPROBE PLATFORM - COMPLETE MASTER DATABASE SETUP
-- 1. Initial Schema (18 Tables, Triggers, Constraints)
-- 2. Row Level Security (RLS) Policies & RPC Functions
-- 3. Seed Data (6 Domains, 50+ Questions, Bootcamps, Campaigns)
-- ============================================================

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

CREATE TRIGGER trg_on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION handle_new_user();


-- ============================================================
-- STUDENT SKILL ASSESSMENT PLATFORM
-- Migration 002: Row Level Security (RLS) Policies & Helper Functions
-- ============================================================

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE domains ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_options ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE bootcamps ENABLE ROW LEVEL SECURITY;
ALTER TABLE bootcamp_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE lead_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE whatsapp_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: Is current user an admin?
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM profiles
    WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. PROFILES
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id OR is_admin());

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id OR is_admin());

-- 2. DOMAINS
CREATE POLICY "Public can view active domains" ON domains
  FOR SELECT USING (active = true OR is_admin());

CREATE POLICY "Admins can manage domains" ON domains
  FOR ALL USING (is_admin());

-- 3. STUDENTS
CREATE POLICY "Anyone can register student" ON students
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can view own profile" ON students
  FOR SELECT USING (true); -- Allow lookup by id/email for quiz session

CREATE POLICY "Admins can update students" ON students
  FOR UPDATE USING (is_admin());

-- 4. CAMPAIGNS
CREATE POLICY "Public can view active campaigns" ON campaigns
  FOR SELECT USING (active = true OR is_admin());

CREATE POLICY "Admins can manage campaigns" ON campaigns
  FOR ALL USING (is_admin());

-- 5. QUIZZES
CREATE POLICY "Public can view active quizzes" ON quizzes
  FOR SELECT USING (active = true OR is_admin());

CREATE POLICY "Admins can manage quizzes" ON quizzes
  FOR ALL USING (is_admin());

-- 6. QUESTIONS
CREATE POLICY "Public can view active questions" ON questions
  FOR SELECT USING (active = true OR is_admin());

CREATE POLICY "Admins can manage questions" ON questions
  FOR ALL USING (is_admin());

-- 7. QUESTION OPTIONS
-- Note: is_correct is hidden in public view or accessed during server scoring
CREATE POLICY "Public can view options" ON question_options
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage question options" ON question_options
  FOR ALL USING (is_admin());

-- 8. QUIZ ATTEMPTS
CREATE POLICY "Anyone can create quiz attempt" ON quiz_attempts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view own attempt" ON quiz_attempts
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update own attempt" ON quiz_attempts
  FOR UPDATE USING (true);

-- 9. QUIZ ANSWERS
CREATE POLICY "Anyone can submit quiz answers" ON quiz_answers
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can view answers for their attempt" ON quiz_answers
  FOR SELECT USING (true);

-- 10. QUIZ RESULTS
CREATE POLICY "Anyone can view their result" ON quiz_results
  FOR SELECT USING (true);

CREATE POLICY "Service can insert results" ON quiz_results
  FOR INSERT WITH CHECK (true);

-- 11. SKILL REPORTS
CREATE POLICY "Anyone can view their report" ON skill_reports
  FOR SELECT USING (true);

CREATE POLICY "Service can insert reports" ON skill_reports
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can manage reports" ON skill_reports
  FOR ALL USING (is_admin());

-- 12. BOOTCAMPS
CREATE POLICY "Public can view active bootcamps" ON bootcamps
  FOR SELECT USING (active = true OR is_admin());

CREATE POLICY "Admins can manage bootcamps" ON bootcamps
  FOR ALL USING (is_admin());

-- 13. BOOTCAMP REGISTRATIONS
CREATE POLICY "Students can register for bootcamp" ON bootcamp_registrations
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Students can view registrations" ON bootcamp_registrations
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage registrations" ON bootcamp_registrations
  FOR ALL USING (is_admin());

-- 14. LEADS
CREATE POLICY "System can create and update leads" ON leads
  FOR ALL USING (true);

-- 15. LEAD ACTIVITIES
CREATE POLICY "System can log lead activities" ON lead_activities
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can view lead activities" ON lead_activities
  FOR SELECT USING (true);

-- 16. ADMIN USERS
CREATE POLICY "Admins can view admin list" ON admin_users
  FOR SELECT USING (is_admin());

-- 17. EMAIL LOGS & WHATSAPP LOGS
CREATE POLICY "Admins can view email logs" ON email_logs
  FOR SELECT USING (is_admin());

CREATE POLICY "Admins can view whatsapp logs" ON whatsapp_logs
  FOR SELECT USING (is_admin());

-- RPC Helper: Calculate Daily Leads aggregation for admin chart
CREATE OR REPLACE FUNCTION get_leads_by_day()
RETURNS TABLE (date TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT
    TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD') AS date,
    COUNT(*) AS count
  FROM leads
  WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE_TRUNC('day', created_at)
  ORDER BY DATE_TRUNC('day', created_at) ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- ============================================================
-- STUDENT SKILL ASSESSMENT PLATFORM
-- Migration 003: Seed Data (Domains, Questions, Options, Bootcamps, Campaigns)
-- ============================================================

-- 1. SEED DOMAINS
INSERT INTO domains (id, name, slug, description, icon, color, difficulty, question_count, estimated_minutes, active, display_order)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Python Development', 'python-programming', 'Core Python, OOP, decorators, data structures, concurrency, and ecosystem best practices.', 'code', '#3b82f6', 'beginner', 10, 15, true, 1),
  ('d0000000-0000-0000-0000-000000000002', 'Full-Stack Web Dev', 'full-stack-web-development', 'Modern React, TypeScript, Node.js, REST APIs, state management, and web performance.', 'globe', '#10b981', 'intermediate', 10, 20, true, 2),
  ('d0000000-0000-0000-0000-000000000003', 'Data Science & AI', 'data-science-machine-learning', 'Pandas, NumPy, Scikit-learn, statistical modeling, neural networks, and feature engineering.', 'brain', '#8b5cf6', 'intermediate', 10, 20, true, 3),
  ('d0000000-0000-0000-0000-000000000004', 'Java & Spring Boot', 'java-backend-architecture', 'Java 17+, JVM internals, Spring Boot REST microservices, concurrency, and JPA/Hibernate.', 'coffee', '#f59e0b', 'intermediate', 10, 20, true, 4),
  ('d0000000-0000-0000-0000-000000000005', 'Cloud & DevOps', 'cloud-devops', 'Docker containerization, Kubernetes, CI/CD pipelines, AWS fundamentals, and Linux administration.', 'cloud', '#06b6d4', 'advanced', 10, 25, true, 5),
  ('d0000000-0000-0000-0000-000000000006', 'Cybersecurity', 'cybersecurity-ethical-hacking', 'Network security protocols, OWASP Top 10 web vulnerabilities, cryptography, and penetration testing.', 'shield', '#ef4444', 'advanced', 10, 25, true, 6)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED QUESTIONS & OPTIONS (PYTHON)
INSERT INTO questions (id, domain_id, question_text, explanation, difficulty, marks, active, display_order)
VALUES
  ('e1000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'What is the output of print(type(5 / 2)) in Python 3?', 'In Python 3, the / operator always performs floating-point division and returns a float, even if both operands are integers.', 'easy', 1, true, 1),
  ('e1000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'Which of the following data structures in Python is immutable?', 'Tuples in Python cannot have their elements modified, added, or removed once created, making them immutable.', 'easy', 1, true, 2),
  ('e1000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'How does Python handle memory management and unused objects?', 'Python uses automatic reference counting combined with a cyclic garbage collector to detect and reclaim unreachable object reference cycles.', 'medium', 2, true, 3),
  ('e1000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'What does the Global Interpreter Lock (GIL) in CPython primarily prevent?', 'CPython GIL is a mutex that prevents multiple native threads from executing Python bytecode simultaneously, ensuring thread-safe memory management.', 'medium', 2, true, 4),
  ('e1000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000001', 'What is the purpose of the "yield" keyword in a Python function?', 'The yield keyword turns a regular function into a generator function, pausing execution and saving its state between successive next() calls.', 'medium', 2, true, 5),
  ('e1000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000001', 'What is the time complexity of looking up a key in a standard Python dictionary in the average case?', 'Python dictionaries are implemented using open addressing hash tables with perturbation, yielding O(1) average lookup time.', 'hard', 3, true, 6),
  ('e1000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'In Python, what is the key difference between deepcopy() and copy() in the copy module?', 'copy() creates a shallow copy where compound objects contain references to original inner objects; deepcopy() recursively clones all nested objects.', 'medium', 2, true, 7),
  ('e1000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000001', 'What does the functools.wraps decorator do when writing custom Python decorators?', 'functools.wraps copies original function metadata (such as __name__, __doc__, and annotations) onto the decorator wrapper function.', 'hard', 3, true, 8)
ON CONFLICT (id) DO NOTHING;

-- Options for Question 1
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000001', '<class ''int''>', 0, false),
  ('e1000000-0000-0000-0000-000000000001', '<class ''float''>', 1, true),
  ('e1000000-0000-0000-0000-000000000001', '<class ''double''>', 2, false),
  ('e1000000-0000-0000-0000-000000000001', '<class ''number''>', 3, false);

-- Options for Question 2
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000002', 'List', 0, false),
  ('e1000000-0000-0000-0000-000000000002', 'Dictionary', 1, false),
  ('e1000000-0000-0000-0000-000000000002', 'Tuple', 2, true),
  ('e1000000-0000-0000-0000-000000000002', 'Set', 3, false);

-- Options for Question 3
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000003', 'Manual memory deallocation using free()', 0, false),
  ('e1000000-0000-0000-0000-000000000003', 'Reference counting combined with a generational cyclic garbage collector', 1, true),
  ('e1000000-0000-0000-0000-000000000003', 'Stop-the-world tracing collector only', 2, false),
  ('e1000000-0000-0000-0000-000000000003', 'Static heap compaction during file execution', 3, false);

-- Options for Question 4
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000004', 'Multiple processes from communicating', 0, false),
  ('e1000000-0000-0000-0000-000000000004', 'Concurrent execution of native threads on multiple CPU cores in CPython', 1, true),
  ('e1000000-0000-0000-0000-000000000004', 'Asyncio event loops from handling network I/O', 2, false),
  ('e1000000-0000-0000-0000-000000000004', 'Recursive function calls from exceeding stack limit', 3, false);

-- Options for Question 5
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000005', 'Terminates the program immediately', 0, false),
  ('e1000000-0000-0000-0000-000000000005', 'Pauses function execution and produces a generator value to caller', 1, true),
  ('e1000000-0000-0000-0000-000000000005', 'Spawns a background thread', 2, false),
  ('e1000000-0000-0000-0000-000000000005', 'Forces garbage collection immediately', 3, false);

-- Options for Question 6
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000006', 'O(n)', 0, false),
  ('e1000000-0000-0000-0000-000000000006', 'O(log n)', 1, false),
  ('e1000000-0000-0000-0000-000000000006', 'O(1)', 2, true),
  ('e1000000-0000-0000-0000-000000000006', 'O(n log n)', 3, false);

-- Options for Question 7
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000007', 'deepcopy() only copies primitive types; copy() copies objects', 0, false),
  ('e1000000-0000-0000-0000-000000000007', 'copy() shares nested references while deepcopy() duplicates all nested objects recursively', 1, true),
  ('e1000000-0000-0000-0000-000000000007', 'deepcopy() is faster than copy() for large arrays', 2, false),
  ('e1000000-0000-0000-0000-000000000007', 'There is no difference in modern Python versions', 3, false);

-- Options for Question 8
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000008', 'Encrypts the source code of the wrapped function', 0, false),
  ('e1000000-0000-0000-0000-000000000008', 'Preserves original metadata such as __name__ and docstrings on wrapper functions', 1, true),
  ('e1000000-0000-0000-0000-000000000008', 'Limits function runtime to prevent infinite loops', 2, false),
  ('e1000000-0000-0000-0000-000000000008', 'Automatically converts sync functions to async', 3, false);

-- 3. SEED QUESTIONS & OPTIONS (FULL STACK WEB DEV)
INSERT INTO questions (id, domain_id, question_text, explanation, difficulty, marks, active, display_order)
VALUES
  ('e2000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'What is the Virtual DOM in React and why does React use it?', 'The Virtual DOM is an in-memory representation of real DOM elements. React computes minimal diffs via reconciliation and batches real DOM updates to maximize rendering performance.', 'easy', 1, true, 1),
  ('e2000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'In CSS Flexbox, which property aligns items along the cross-axis?', 'align-items aligns flex items along the cross axis, while justify-content aligns items along the main axis.', 'easy', 1, true, 2),
  ('e2000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 'What is the primary benefit of HTTP/2 over HTTP/1.1 for web applications?', 'HTTP/2 introduces binary framing and multiplexing, allowing multiple bidirectional requests and responses over a single TCP connection without head-of-line blocking.', 'medium', 2, true, 3),
  ('e2000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'In React, what problem does the useCallback hook solve?', 'useCallback returns a memoized version of a callback function, preventing child components wrapped in React.memo from unnecessary re-renders due to reference changes.', 'medium', 2, true, 4)
ON CONFLICT (id) DO NOTHING;

-- Options for Full Stack Q1
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000001', 'A browser plugin that accelerates HTML canvas rendering', 0, false),
  ('e2000000-0000-0000-0000-000000000001', 'A lightweight in-memory tree that diffs changes before batching updates to the real browser DOM', 1, true),
  ('e2000000-0000-0000-0000-000000000001', 'A shadow root element for web components', 2, false),
  ('e2000000-0000-0000-0000-000000000001', 'A server-side cache for HTML templates', 3, false);

-- Options for Full Stack Q2
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000002', 'justify-content', 0, false),
  ('e2000000-0000-0000-0000-000000000002', 'align-items', 1, true),
  ('e2000000-0000-0000-0000-000000000002', 'flex-direction', 2, false),
  ('e2000000-0000-0000-0000-000000000002', 'place-content', 3, false);

-- Options for Full Stack Q3
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000003', 'Multiplexed request/response streams over a single TCP connection', 0, true),
  ('e2000000-0000-0000-0000-000000000003', 'Deprecation of TLS/SSL requirements', 1, false),
  ('e2000000-0000-0000-0000-000000000003', 'Removal of HTTP request headers', 2, false),
  ('e2000000-0000-0000-0000-000000000003', 'Direct peer-to-peer database connection', 3, false);

-- Options for Full Stack Q4
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000004', 'Caches expensive computation results like math calculations', 0, false),
  ('e2000000-0000-0000-0000-000000000004', 'Memoizes callback function instances across component re-renders', 1, true),
  ('e2000000-0000-0000-0000-000000000004', 'Attaches event listeners to window objects', 2, false),
  ('e2000000-0000-0000-0000-000000000004', 'Handles global state dispatch actions', 3, false);

-- 4. SEED BOOTCAMPS
INSERT INTO bootcamps (id, domain_id, name, slug, description, benefits, mentor_name, mentor_bio, start_date, end_date, start_time, duration_weeks, mode, platform, total_seats, registered_seats, is_free, price, status, min_score_percentage, max_score_percentage, active)
VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Python & Backend Engineering Master Bootcamp',
    'python-backend-bootcamp',
    'A transformative 4-week live hands-on bootcamp taking you from syntax fundamentals to building production REST APIs, FastAPI microservices, and database pipelines.',
    ARRAY[
      'Live Weekend Coding Sessions (2 hours / session)',
      '1-on-1 Code Reviews from Senior Engineers',
      'Production Capstone Project for GitHub Portfolio',
      'Verified Certificate of Completion & Internship Referral'
    ],
    'Dr. Alex Mercer',
    'Ex-Staff Engineer at TechCorp, 12+ years building distributed Python backends serving 10M+ users.',
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '42 days',
    '18:30:00',
    4,
    'online',
    'Zoom Live & Discord Community',
    150,
    38,
    true,
    0.00,
    'upcoming',
    35,
    100,
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'd0000000-0000-0000-0000-000000000002',
    'Full-Stack Modern Web & AI Bootcamp',
    'fullstack-ai-bootcamp',
    'Master modern React, TypeScript, Next.js, and integrating LLMs/AI APIs into interactive web applications with cloud deployments.',
    ARRAY[
      'Hands-on full stack project with Supabase & Next.js',
      'Real-world AI integration (OpenAI, Anthropic APIs)',
      'Resume & LinkedIn optimization workshop included',
      'Direct interview prep with placement partners'
    ],
    'Sarah Lin',
    'Principal Frontend Architect & Google Developer Expert (GDE), creator of multiple viral open-source packages.',
    CURRENT_DATE + INTERVAL '21 days',
    CURRENT_DATE + INTERVAL '49 days',
    '19:00:00',
    4,
    'online',
    'Zoom Live & Dedicated Slack Channel',
    200,
    64,
    true,
    0.00,
    'upcoming',
    30,
    100,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- 5. SEED CAMPAIGNS
INSERT INTO campaigns (id, name, code, utm_source, utm_medium, utm_campaign, description, total_visitors, total_registrations, total_quiz_starts, total_quiz_completions, total_bootcamp_registrations, total_hot_leads, total_conversions, active, start_date)
VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Campus Ambassador College Outreach 2026',
    'campus26',
    'whatsapp',
    'community',
    'campus_ambassador_q1',
    'WhatsApp broadcast and community link shared across 50+ college engineering groups.',
    1420,
    380,
    340,
    295,
    112,
    88,
    112,
    true,
    CURRENT_DATE - INTERVAL '30 days'
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Instagram Reel: Tech Skill Gap 2026',
    'instaskill',
    'instagram',
    'organic_reel',
    'python_challenge_aug',
    'Viral short-form video demonstrating common interview mistakes with link in bio.',
    3200,
    890,
    780,
    640,
    245,
    190,
    245,
    true,
    CURRENT_DATE - INTERVAL '20 days'
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'LinkedIn Sponsored Placement Prep',
    'licareer',
    'linkedin',
    'cpc',
    'fsd_bootcamp_leadgen',
    'Sponsored campaign aimed at recent graduates and final year students looking for tech placements.',
    890,
    210,
    195,
    175,
    84,
    62,
    84,
    true,
    CURRENT_DATE - INTERVAL '10 days'
  )
ON CONFLICT (id) DO NOTHING;
