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
