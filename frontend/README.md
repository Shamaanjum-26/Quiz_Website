
# Frontend Layer — React + TypeScript + Vite SPA

The client-side single-page application (SPA) for the **SkillProbe Student Assessment & Lead Generation Platform**.

---

## Directory Structure

```
frontend/
├── public/
│   └── .htaccess         # Hostinger Apache SPA routing, GZIP & caching rules
├── src/
│   ├── components/       # UI components, layout, cards, score gauge, etc.
│   ├── hooks/            # useAuth, useQuiz, useUTM, useToast
│   ├── lib/              # Supabase client, scoring algorithms, analytics utils
│   ├── pages/            # Public pages & Admin management portal pages
│   ├── services/         # API services (student, quiz, lead, bootcamp, admin)
│   ├── types/            # Complete TypeScript interfaces and types
│   ├── App.tsx           # React Router route definitions
│   ├── main.tsx          # Application entry point
│   └── index.css         # Tailwind directives & design tokens
├── index.html            # SPA HTML entry point
├── package.json          # Frontend dependencies and npm scripts
├── vite.config.ts        # Vite config with manual chunking for optimal production sizes
├── tailwind.config.js    # Tailwind theme configuration
├── tsconfig.json         # TypeScript compiler configuration
├── .env.example          # Client environment variables
└── README.md             # Frontend documentation (this file)
```

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Create `.env` inside `frontend/`:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOi...
VITE_APP_URL=https://yourdomain.com
```
*(If left empty, the application runs in offline demo mode with built-in mock data.)*

### 3. Start Development Server
```bash
npm run dev
```

### 4. Build for Production
```bash
npm run build
```
This produces an optimized `dist/` directory containing the bundled assets and `.htaccess`.

---

## Deploy to Hostinger
Upload all contents of `frontend/dist/` directly into Hostinger's `public_html/`. See root [DEPLOYMENT.md](../DEPLOYMENT.md) for full details.
