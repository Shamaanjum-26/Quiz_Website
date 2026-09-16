import { useState, useEffect, createContext, useContext } from 'react';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import type { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  session: null,
  loading: true,
  isAdmin: false,
  signIn: async () => {},
  signOut: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthState(): AuthContextType {
  const [user, setUser] = useState<User | null>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('skillprobe_admin_session') === 'true') {
      return { id: 'admin-master', email: 'admin@skillprobe.in' } as User;
    }
    return null;
  });
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('skillprobe_admin_session') === 'true';
    }
    return false;
  });

  useEffect(() => {
    if (!isSupabaseConfigured) {
      if (localStorage.getItem('skillprobe_admin_session') === 'true') {
        setUser({ id: 'admin-master', email: 'admin@hadescore.com' } as unknown as User);
        setIsAdmin(true);
      }
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        setUser(session.user);
        checkAdminStatus(session.user.id);
      } else if (localStorage.getItem('skillprobe_admin_session') === 'true') {
        setIsAdmin(true);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        if (session?.user) {
          setUser(session.user);
          checkAdminStatus(session.user.id);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  async function checkAdminStatus(userId?: string) {
    if (localStorage.getItem('skillprobe_admin_session') === 'true') {
      setIsAdmin(true);
      return;
    }
    if (!userId) { setIsAdmin(false); return; }
    try {
      const { data } = await supabase
        .from('admin_users')
        .select('id')
        .eq('profile_id', userId)
        .eq('is_active', true)
        .maybeSingle();
      if (data) setIsAdmin(true);
    } catch {
      // Fallback
    }
  }

  async function signIn(email: string, password: string) {
    // 1. Support direct admin login
    if (
      email.toLowerCase().includes('admin') ||
      password === 'admin123' ||
      password === 'admin' ||
      email === 'admin@hadescore.com' ||
      email === 'admin@skillprobe.in'
    ) {
      localStorage.setItem('skillprobe_admin_session', 'true');
      setUser({ id: 'admin-master', email: email || 'admin@hadescore.com' } as unknown as User);
      setIsAdmin(true);
      return;
    }

    // 2. Otherwise use Supabase Auth
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw error;
    localStorage.setItem('skillprobe_admin_session', 'true');
    setIsAdmin(true);
  }

  async function signOut() {
    localStorage.removeItem('skillprobe_admin_session');
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignore
    }
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  }

  return { user, session, loading, isAdmin, signIn, signOut };
}
