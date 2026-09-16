# Backend Layer — Supabase Edge Functions

This directory contains the serverless TypeScript edge functions that power server-side quiz scoring, lead scoring updates, transactional emails, and WhatsApp messaging for the **SkillProbe Platform**.

---

## Directory Structure

```
backend/
├── functions/
│   ├── calculate-score/
│   │   └── index.ts        # Server-side quiz evaluation & lead score bump
│   ├── send-email/
│   │   └── index.ts        # Dispatches quiz reports & logs to email_logs
│   └── send-whatsapp/
│       └── index.ts        # WhatsApp invitations & logs to whatsapp_logs
├── config.toml             # Supabase CLI Edge runtime configuration
├── .env.example            # Environment variables and secrets template
└── README.md               # Backend documentation (this file)
```

---

## Edge Functions Overview

### 1. `calculate-score`
- **Trigger**: Called by frontend upon quiz submission or timer expiration.
- **Behavior**:
  - Securely matches student answers against `question_options.is_correct` in PostgreSQL.
  - Calculates accuracy percentage, total marks, and assigns a skill tier (Foundation, Beginner, Intermediate, Advanced, Expert).
  - Inserts the evaluated result into `quiz_results`.
  - Recalculates the student's lead score in `leads` table and automatically bumps their pipeline status (`HOT`, `WARM`, `NURTURE`).

### 2. `send-email`
- **Trigger**: Dispatches transactional confirmation emails, quiz result summary reports, and bootcamp onboarding packages.
- **Provider**: Integrates with [Resend](https://resend.com) via API key, falling back to simulated database logging in development mode.
- **Audit**: Every outbound attempt is recorded in `email_logs`.

### 3. `send-whatsapp`
- **Trigger**: Instant WhatsApp confirmation upon bootcamp registration or high score achievement.
- **Audit**: Every message is recorded in `whatsapp_logs`.

---

## Deployment to Supabase

1. Install Supabase CLI:
   ```bash
   npm install -g supabase
   ```

2. Link CLI to your remote Supabase project:
   ```bash
   supabase link --project-ref <your-project-ref>
   ```

3. Set your backend secrets:
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key
   ```

4. Deploy the functions:
   ```bash
   supabase functions deploy calculate-score
   supabase functions deploy send-email
   supabase functions deploy send-whatsapp
   ```
