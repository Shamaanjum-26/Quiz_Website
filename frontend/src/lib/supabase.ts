import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Graceful degradation: show config error if credentials not set or contain dummy placeholders
export const isSupabaseConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl !== 'YOUR_SUPABASE_URL' &&
  supabaseAnonKey !== 'YOUR_SUPABASE_ANON_KEY' &&
  !supabaseUrl?.includes('your-project.supabase.co') &&
  !supabaseUrl?.includes('placeholder.supabase.co') &&
  !supabaseAnonKey?.includes('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');

// Safe dummy fetch to prevent ERR_NAME_NOT_RESOLVED in browser console when offline
const dummyFetch: typeof fetch = async () => {
  return new Response(JSON.stringify([]), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : createClient('https://localhost.localdomain', 'placeholder-key', {
      auth: { persistSession: false },
      global: { fetch: dummyFetch },
    });

export default supabase;
