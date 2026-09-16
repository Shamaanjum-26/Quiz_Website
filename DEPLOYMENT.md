# Production Deployment Guide: Hostinger Shared Hosting & Supabase

Complete step-by-step deployment guide for the separated **Frontend**, **Backend**, and **Database** layers of the **SkillProbe Platform**.

---

## 3-Tier Architecture

```
                 Students & Prospects (Web Browsers)
                                  │
                                  ▼ (HTTPS)
                 Hostinger Shared Web Hosting (Apache)
                       ├── frontend/dist/
                       │    ├── index.html
                       │    ├── assets/*.js (Code-Split)
                       │    ├── assets/*.css
                       │    └── .htaccess (SPA Rewrite, GZIP, Caching)
                                  │
                                  ▼ (REST / WebSockets)
                 Supabase Cloud (PostgreSQL + Auth + Edge)
                       ├── Database: 18 Tables, RLS Policies, Seed Data
                       └── Backend: Edge Functions (calculate-score, etc.)
```

---

## Part 1: Database Setup (Supabase PostgreSQL)

1. Open your project on [supabase.com](https://supabase.com).
2. Go to **SQL Editor** from the left panel.
3. Run the migration scripts found in `database/migrations/` sequentially:
   - **Step 1**: Execute [`database/migrations/001_initial_schema.sql`](database/migrations/001_initial_schema.sql) (Creates 18 tables, triggers, and automated seat counters).
   - **Step 2**: Execute [`database/migrations/002_rls_policies.sql`](database/migrations/002_rls_policies.sql) (Enables Row-Level Security, access rules, and RPC aggregation functions).
   - **Step 3**: Execute [`database/migrations/003_seed_data.sql`](database/migrations/003_seed_data.sql) (Populates 6 domain tracks, 50+ questions with explanations, live bootcamps, and campaigns).
4. Go to **Project Settings -> API** and copy:
   - **Project URL** (`https://<project-ref>.supabase.co`)
   - **anon / public key** (`eyJ...`)

---

## Part 2: Backend Edge Functions Setup (Supabase)

1. Open a terminal and navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Link your Supabase CLI to your project:
   ```bash
   supabase link --project-ref <your-project-ref>
   ```
3. Set secrets for email dispatch:
   ```bash
   supabase secrets set RESEND_API_KEY=re_your_api_key
   ```
4. Deploy the functions:
   ```bash
   supabase functions deploy calculate-score
   supabase functions deploy send-email
   supabase functions deploy send-whatsapp
   ```

---

## Part 3: Frontend Build & Hostinger Deployment

1. Configure client environment variables in `frontend/.env`:
   ```env
   VITE_SUPABASE_URL=https://<your-project-ref>.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
   VITE_APP_URL=https://yourdomain.com
   ```

2. Compile the production build from the repository root:
   ```bash
   npm run build
   ```
   *(Or navigate into `frontend/` and run `npm run build`)*

3. This creates the production bundle inside `frontend/dist/`:
   - `frontend/dist/index.html`
   - `frontend/dist/assets/`
   - `frontend/dist/.htaccess`

4. Deploy to Hostinger:
   - Log into **Hostinger hPanel** -> **Websites** -> **File Manager** (or connect via SFTP/FileZilla).
   - Navigate to `public_html` (for primary domain) or `domains/yourdomain.com/public_html`.
   - Upload all contents from `frontend/dist/` directly into `public_html/`.
   - **Important**: Ensure `public_html/.htaccess` is uploaded (enable "Show Hidden Files" in Hostinger File Manager to verify).

---

## Part 4: Create Admin User

1. In Supabase Dashboard -> **Authentication** -> **Users**, click **Add User** -> **Create user** (e.g. `admin@skillprobe.edu`).
2. Run this query in Supabase SQL Editor to grant admin privileges:
   ```sql
   UPDATE profiles
   SET role = 'admin'
   WHERE email = 'admin@skillprobe.edu';
   ```
3. Visit `https://yourdomain.com/admin/login` to access the full administrative CRM portal!
