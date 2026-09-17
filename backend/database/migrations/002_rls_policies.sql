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

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role IN ('admin', 'super_admin'));
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 1. Profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can manage profiles" ON profiles;
CREATE POLICY "Admins can manage profiles" ON profiles FOR ALL USING (true);

-- 2. Domains
DROP POLICY IF EXISTS "Public can view active domains" ON domains;
DROP POLICY IF EXISTS "Admins can manage domains" ON domains;
CREATE POLICY "Admins can manage domains" ON domains FOR ALL USING (true);

-- 3. Students (Full CRUD: Insert, Select, Update, Delete)
DROP POLICY IF EXISTS "Anyone can register student" ON students;
DROP POLICY IF EXISTS "Students can view own profile" ON students;
DROP POLICY IF EXISTS "Admins can update students" ON students;
DROP POLICY IF EXISTS "Anyone can manage students" ON students;
CREATE POLICY "Anyone can manage students" ON students FOR ALL USING (true);

-- 4. Campaigns
DROP POLICY IF EXISTS "Public can view active campaigns" ON campaigns;
DROP POLICY IF EXISTS "Admins can manage campaigns" ON campaigns;
CREATE POLICY "Admins can manage campaigns" ON campaigns FOR ALL USING (true);

-- 5. Quizzes
DROP POLICY IF EXISTS "Public can view active quizzes" ON quizzes;
DROP POLICY IF EXISTS "Admins can manage quizzes" ON quizzes;
CREATE POLICY "Admins can manage quizzes" ON quizzes FOR ALL USING (true);

-- 6. Questions
DROP POLICY IF EXISTS "Public can view active questions" ON questions;
DROP POLICY IF EXISTS "Admins can manage questions" ON questions;
CREATE POLICY "Admins can manage questions" ON questions FOR ALL USING (true);

-- 7. Question Options
DROP POLICY IF EXISTS "Public can view options" ON question_options;
DROP POLICY IF EXISTS "Admins can manage question options" ON question_options;
CREATE POLICY "Admins can manage question options" ON question_options FOR ALL USING (true);

-- 8. Quiz Attempts (Full CRUD including Delete)
DROP POLICY IF EXISTS "Anyone can create quiz attempt" ON quiz_attempts;
DROP POLICY IF EXISTS "Anyone can view own attempt" ON quiz_attempts;
DROP POLICY IF EXISTS "Anyone can update own attempt" ON quiz_attempts;
DROP POLICY IF EXISTS "Anyone can manage quiz attempts" ON quiz_attempts;
CREATE POLICY "Anyone can manage quiz attempts" ON quiz_attempts FOR ALL USING (true);

-- 9. Quiz Answers (Full CRUD including Delete)
DROP POLICY IF EXISTS "Anyone can submit quiz answers" ON quiz_answers;
DROP POLICY IF EXISTS "Anyone can view answers for their attempt" ON quiz_answers;
DROP POLICY IF EXISTS "Anyone can manage quiz answers" ON quiz_answers;
CREATE POLICY "Anyone can manage quiz answers" ON quiz_answers FOR ALL USING (true);

-- 10. Quiz Results (Full CRUD including Delete)
DROP POLICY IF EXISTS "Anyone can view their result" ON quiz_results;
DROP POLICY IF EXISTS "Service can insert results" ON quiz_results;
DROP POLICY IF EXISTS "Anyone can manage quiz results" ON quiz_results;
CREATE POLICY "Anyone can manage quiz results" ON quiz_results FOR ALL USING (true);

-- 11. Skill Reports (Full CRUD including Delete)
DROP POLICY IF EXISTS "Anyone can view their report" ON skill_reports;
DROP POLICY IF EXISTS "Service can insert reports" ON skill_reports;
DROP POLICY IF EXISTS "Admins can manage reports" ON skill_reports;
DROP POLICY IF EXISTS "Anyone can manage skill reports" ON skill_reports;
CREATE POLICY "Anyone can manage skill reports" ON skill_reports FOR ALL USING (true);

-- 12. Bootcamps
DROP POLICY IF EXISTS "Public can view active bootcamps" ON bootcamps;
DROP POLICY IF EXISTS "Admins can manage bootcamps" ON bootcamps;
CREATE POLICY "Admins can manage bootcamps" ON bootcamps FOR ALL USING (true);

-- 13. Bootcamp Registrations (Full CRUD including Delete)
DROP POLICY IF EXISTS "Students can register for bootcamp" ON bootcamp_registrations;
DROP POLICY IF EXISTS "Students can view registrations" ON bootcamp_registrations;
DROP POLICY IF EXISTS "Admins can manage registrations" ON bootcamp_registrations;
DROP POLICY IF EXISTS "Anyone can manage bootcamp registrations" ON bootcamp_registrations;
CREATE POLICY "Anyone can manage bootcamp registrations" ON bootcamp_registrations FOR ALL USING (true);

-- 14. Leads (Full CRUD including Delete)
DROP POLICY IF EXISTS "System can create and update leads" ON leads;
DROP POLICY IF EXISTS "Anyone can manage leads" ON leads;
CREATE POLICY "Anyone can manage leads" ON leads FOR ALL USING (true);

-- 15. Lead Activities (Full CRUD including Delete)
DROP POLICY IF EXISTS "System can log lead activities" ON lead_activities;
DROP POLICY IF EXISTS "Admins can view lead activities" ON lead_activities;
DROP POLICY IF EXISTS "Anyone can manage lead activities" ON lead_activities;
CREATE POLICY "Anyone can manage lead activities" ON lead_activities FOR ALL USING (true);

-- 16. Admin Users
DROP POLICY IF EXISTS "Admins can view admin list" ON admin_users;
CREATE POLICY "Admins can view admin list" ON admin_users FOR ALL USING (true);

-- 17. Logs
DROP POLICY IF EXISTS "Admins can view email logs" ON email_logs;
DROP POLICY IF EXISTS "Service can log email" ON email_logs;
CREATE POLICY "Anyone can manage email logs" ON email_logs FOR ALL USING (true);

DROP POLICY IF EXISTS "Admins can view whatsapp logs" ON whatsapp_logs;
DROP POLICY IF EXISTS "Service can log whatsapp" ON whatsapp_logs;
CREATE POLICY "Anyone can manage whatsapp logs" ON whatsapp_logs FOR ALL USING (true);

CREATE OR REPLACE FUNCTION get_leads_by_day()
RETURNS TABLE (date TEXT, count BIGINT) AS $$
BEGIN
  RETURN QUERY
  SELECT TO_CHAR(DATE_TRUNC('day', created_at), 'YYYY-MM-DD') AS date, COUNT(*) AS count
  FROM leads WHERE created_at >= NOW() - INTERVAL '30 days'
  GROUP BY DATE_TRUNC('day', created_at)
  ORDER BY DATE_TRUNC('day', created_at) ASC;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
