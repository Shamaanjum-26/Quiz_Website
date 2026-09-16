# Database Layer — Supabase PostgreSQL

This directory contains the complete database migration scripts, Row-Level Security (RLS) policies, and seed data for the **SkillProbe Student Assessment & Lead Generation Platform**.

---

## Directory Structure

```
database/
├── migrations/
│   ├── 001_initial_schema.sql    # 18 relational tables, foreign keys, triggers
│   ├── 002_rls_policies.sql      # Row Level Security (RLS) & RPC helper functions
│   └── 003_seed_data.sql         # 6 Domains, 50+ questions, bootcamps, campaigns
├── schema.md                     # Data dictionary & Entity Relationship mapping
└── README.md                     # Setup instructions (this file)
```

---

## Setup & Migration Instructions

### Option 1: Via Supabase Web Dashboard (Recommended)

1. Go to your project on [supabase.com](https://supabase.com).
2. Open the **SQL Editor** from the left navigation.
3. Execute the migrations **in numerical order**:
   - **Step 1**: Open `migrations/001_initial_schema.sql`, copy and paste the entire script, then click **Run**.
   - **Step 2**: Open `migrations/002_rls_policies.sql`, paste, and click **Run**.
   - **Step 3**: Open `migrations/003_seed_data.sql`, paste, and click **Run**.
4. Verify by checking the **Table Editor** — you should see all 18 tables populated with domain tracks, question banks, and live bootcamps.

---

### Option 2: Via Supabase CLI

```bash
# Link your local CLI to the Supabase remote project
supabase link --project-ref <your-project-ref>

# Apply the migrations
supabase db push
```

---

## Database Tables Summary

1. `profiles`: Supabase Auth user profiles (student, admin, super_admin).
2. `domains`: Assessment skill tracks (Python, Full-Stack, AI, Java, DevOps, Cybersecurity).
3. `students`: Prospect records with college, branch, state, graduation year, and UTM attribution.
4. `campaigns`: Marketing attribution tracking with visitor and conversion counts.
5. `quizzes`: Quiz configuration per domain (time limit, pass criteria).
6. `questions`: Question bank categorized by domain and difficulty (easy, medium, hard).
7. `question_options`: 4 options per question with `is_correct` boolean.
8. `quiz_attempts`: Active student attempt sessions and timers.
9. `quiz_answers`: Individual student answers per question.
10. `quiz_results`: Computed scores, percentage, and skill classification.
11. `skill_reports`: Comprehensive recommendations, strengths, and weaknesses.
12. `bootcamps`: Live bootcamp cohorts, mentors, dates, and seat caps.
13. `bootcamp_registrations`: Student enrollment in bootcamps (auto-qualifies HOT leads).
14. `leads`: Lead scoring pipeline (HOT, WARM, NURTURE) and activity flags.
15. `lead_activities`: Audit log of prospect interactions and score changes.
16. `admin_users`: Administrative team directory.
17. `email_logs`: Transactional email delivery logs.
18. `whatsapp_logs`: WhatsApp message delivery logs.
