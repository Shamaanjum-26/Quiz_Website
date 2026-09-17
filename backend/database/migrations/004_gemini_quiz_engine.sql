-- ============================================================
-- Migration 004: Gemini AI Quiz Engine & Configuration
-- ============================================================

-- 1. Add topic column to questions table
ALTER TABLE IF EXISTS questions ADD COLUMN IF NOT EXISTS topic TEXT;

-- 2. Add question_ids column to quiz_attempts to record exact question sequence
ALTER TABLE IF EXISTS quiz_attempts ADD COLUMN IF NOT EXISTS question_ids UUID[];

-- 3. Create quiz_configurations table for dynamic admin settings
CREATE TABLE IF NOT EXISTS quiz_configurations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default configurations if not present
INSERT INTO quiz_configurations (key, value, description)
VALUES 
  ('quiz_settings', '{
    "question_bank_target": 30,
    "questions_per_quiz": 10,
    "max_attempts": 3,
    "passing_percentage": 50,
    "timer_minutes": 15
  }'::jsonb, 'Global quiz rules and question bank parameters')
ON CONFLICT (key) DO NOTHING;

INSERT INTO quiz_configurations (key, value, description)
VALUES 
  ('gemini_config', '{
    "model": "gemini-2.5-flash",
    "temperature": 0.3,
    "auto_generate_on_demand": true
  }'::jsonb, 'Gemini AI question generation parameters')
ON CONFLICT (key) DO NOTHING;

-- Index for fast lookup
CREATE INDEX IF NOT EXISTS idx_questions_domain_active ON questions (domain_id, active);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_student_domain ON quiz_attempts (student_id, domain_id);
