# Database Schema & Data Dictionary

Comprehensive data dictionary for all tables in the **SkillProbe Platform**.

---

## Entity Relationship Overview

```
auth.users (Supabase Auth)
    │
    ▼ (1:1)
 profiles ───┬── (1:N) ── admin_users
             │
             └── (1:N) ── students ──┬── (1:1) ── leads ── (1:N) ── lead_activities
                                      │
                                      ├── (1:N) ── quiz_attempts ── (1:N) ── quiz_answers
                                      │                   │
                                      │                   ▼ (1:1)
                                      │              quiz_results ── (1:1) ── skill_reports
                                      │
                                      ├── (1:N) ── bootcamp_registrations
                                      ├── (1:N) ── email_logs
                                      └── (1:N) ── whatsapp_logs

 domains ──┬── (1:N) ── quizzes ── (1:N) ── questions ── (1:N) ── question_options
           ├── (1:N) ── bootcamps ── (1:N) ── bootcamp_registrations
           └── (1:N) ── campaigns
```

---

## Tables & Columns

### 1. `domains`
| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Unique domain identifier |
| `name` | TEXT | Display name (e.g., "Python Development") |
| `slug` | TEXT (Unique) | URL slug (e.g., "python-programming") |
| `description`| TEXT | Description of track coverage |
| `icon` | TEXT | Lucide icon name |
| `color` | TEXT | Hex theme color |
| `difficulty` | TEXT | 'beginner', 'intermediate', 'advanced' |
| `question_count` | INTEGER | Synced automatically by trigger |
| `estimated_minutes` | INTEGER | Suggested quiz duration |
| `active` | BOOLEAN | Track visibility flag |
| `display_order` | INTEGER | Sorting order on frontend |

### 2. `students`
| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Unique student identifier |
| `full_name` | TEXT | Full name of student |
| `email` | TEXT (Unique) | Email address |
| `mobile` | TEXT | Mobile phone / WhatsApp number |
| `college` | TEXT | College or university name |
| `branch` | TEXT | Branch of study (CSE, IT, ECE, etc.) |
| `academic_year` | TEXT | Academic year (1st, 2nd, 3rd, 4th, Graduate) |
| `state` | TEXT | Indian State / Province |
| `graduation_year`| INTEGER | Expected year of graduation |
| `preferred_domain_id` | UUID (FK) | Reference to `domains.id` |
| `utm_source` | TEXT | First-touch marketing source |
| `utm_campaign` | TEXT | Marketing campaign identifier |

### 3. `leads`
| Column | Type | Description |
|---|---|---|
| `id` | UUID (PK) | Unique lead identifier |
| `student_id` | UUID (FK) | Reference to `students.id` |
| `lead_score` | INTEGER | Calculated engagement score (0-100+) |
| `lead_status`| TEXT | 'HOT' (&ge;70), 'WARM' (40-69), 'NURTURE' (&lt;40) |
| `has_completed_quiz` | BOOLEAN | Quiz completion indicator |
| `has_registered_bootcamp` | BOOLEAN | Bootcamp conversion flag |
| `admin_notes` | TEXT | Internal counselor notes |
| `last_activity_at` | TIMESTAMPTZ | Timestamp of last user event |

### 4. `questions` & `question_options`
- Questions belong to a domain with difficulty level (`easy`, `medium`, `hard`) and marks.
- Options contain 4 choices with `is_correct` boolean (hidden from unauthenticated students via RLS).

### 5. `bootcamps` & `bootcamp_registrations`
- Bootcamps feature mentors, schedules, syllabus benefits, and seat caps.
- Triggers automatically keep `registered_seats` in sync as students enroll.
