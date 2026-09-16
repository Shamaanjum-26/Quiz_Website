import { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Key,
  Shield,
  CheckCircle2,
  Database,
  RefreshCw,
  BrainCircuit,
  Lock,
  Sparkles,
  HelpCircle,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
  UserCheck,
  Clock,
  Award,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/useToast';
import supabase, { isSupabaseConfigured } from '@/lib/supabase';
import {
  fetchQuizConfig,
  saveQuizConfig,
  type QuizEngineConfig,
  DEFAULT_QUIZ_CONFIG,
} from '@/services/quizService';

export default function AdminSettingsPage() {
  // Quiz Rules & Parameters (Applies to All Domains)
  const [questionsPerQuizStr, setQuestionsPerQuizStr] = useState<string>('10');
  const [passingQuestionsStr, setPassingQuestionsStr] = useState<string>('5');
  const [quizTimerStr, setQuizTimerStr] = useState<string>('15');
  const [maxAttemptsStr, setMaxAttemptsStr] = useState<string>('1');

  // Gemini AI Key
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [maskedKey, setMaskedKey] = useState('');
  const [showKey, setShowKey] = useState(false);

  // Admin Account & Password Change
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updatingPassword, setUpdatingPassword] = useState(false);
  const [showAdminPass, setShowAdminPass] = useState(false);

  const [saving, setSaving] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const conf = await fetchQuizConfig();
        if (conf) {
          const qCount = conf.questions_per_quiz || 10;
          setQuestionsPerQuizStr(String(qCount));
          const pCount = conf.passing_questions_count || Math.ceil(((conf.passing_percentage || 50) / 100) * qCount);
          setPassingQuestionsStr(String(pCount));
          setQuizTimerStr(String(conf.quiz_timer_minutes || 15));
          setMaxAttemptsStr(String(conf.max_attempts || 1));

          if (conf.gemini_api_key_masked) {
            setMaskedKey(conf.gemini_api_key_masked);
          } else if (import.meta.env.VITE_GEMINI_API_KEY) {
            const envKey = import.meta.env.VITE_GEMINI_API_KEY;
            setMaskedKey(`••••••••••••${envKey.slice(-4)}`);
          }
        }
      } catch (err) {
        console.warn('Config load note:', err);
      } finally {
        setConfigLoading(false);
      }
    }
    loadConfig();
  }, []);

  // Calculate parsed numerical numbers safely
  const parsedQuestionsCount = Math.max(1, Math.min(100, parseInt(questionsPerQuizStr, 10) || 10));
  const parsedPassingCount = Math.max(1, Math.min(parsedQuestionsCount, parseInt(passingQuestionsStr, 10) || 5));
  const parsedTimerMinutes = Math.max(1, Math.min(180, parseInt(quizTimerStr, 10) || 15));
  const parsedMaxAttempts = Math.max(1, Math.min(50, parseInt(maxAttemptsStr, 10) || 1));
  const currentPassingPercentage = Math.round((parsedPassingCount / parsedQuestionsCount) * 100);

  const handleSave = async () => {
    setSaving(true);
    try {
      const qCount = parsedQuestionsCount;
      const pCount = Math.min(qCount, parsedPassingCount);
      const timerMins = parsedTimerMinutes;
      const attemptsLimit = parsedMaxAttempts;
      const calculatedPercentage = Math.round((pCount / qCount) * 100);

      // Sanitize inputs
      setQuestionsPerQuizStr(String(qCount));
      setPassingQuestionsStr(String(pCount));
      setQuizTimerStr(String(timerMins));
      setMaxAttemptsStr(String(attemptsLimit));

      const payload: Partial<QuizEngineConfig> = {
        questions_per_quiz: qCount,
        passing_questions_count: pCount,
        passing_percentage: calculatedPercentage,
        quiz_timer_minutes: timerMins,
        max_attempts: attemptsLimit,
      };

      if (geminiApiKey.trim()) {
        payload.gemini_api_key = geminiApiKey.trim();
      }

      await saveQuizConfig(payload);

      if (geminiApiKey.trim()) {
        setMaskedKey(`••••••••••••${geminiApiKey.slice(-4)}`);
        setGeminiApiKey('');
      }

      toast({
        title: 'Settings Saved & Synced Globally',
        description: `Updated all domains: ${qCount} Questions per quiz, ${pCount}/${qCount} Correct to Pass (${calculatedPercentage}%), ${timerMins} mins timer, ${attemptsLimit} Attempt(s) per email.`,
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Save Error',
        description: err.message || 'Failed to save settings.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      toast({
        title: 'Password Too Short',
        description: 'New password must be at least 6 characters long.',
        variant: 'destructive',
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirm password do not match.',
        variant: 'destructive',
      });
      return;
    }

    setUpdatingPassword(true);
    try {
      if (isSupabaseConfigured) {
        const { error } = await supabase.auth.updateUser({ password: newPassword });
        if (error) throw error;
      }
      // Update local storage admin credentials as fallback
      localStorage.setItem('hadescore_admin_pass', newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');

      toast({
        title: 'Admin Password Updated',
        description: 'Your administrator account password has been updated securely.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Password Update Failed',
        description: err.message || 'Could not update admin password.',
        variant: 'destructive',
      });
    } finally {
      setUpdatingPassword(false);
    }
  };

  return (
    <AdminLayout
      title="Platform Settings & Quiz Rules"
      subtitle="Configure global question counts, passing marks, attempt limits, and AI parameters across all assessment domains"
      actions={
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-2xs"
        >
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save All Settings
        </Button>
      }
    >
      <div className="space-y-6 max-w-4xl">
        {/* Supabase Status Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">Database & Storage Status</h3>
              <p className="text-xs text-slate-400">
                {isSupabaseConfigured
                  ? 'Connected to live Supabase Cloud Database with active RLS Security.'
                  : 'Connected to Local Persistent Database & Demo Sync Engine.'}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
                : 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
            {isSupabaseConfigured ? 'Supabase Live Connected' : 'Local Database Active'}
          </span>
        </div>

        {/* 1. SECTION 1: GLOBAL QUIZ & ASSESSMENT RULES */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Global Quiz & Assessment Rules</h3>
                <p className="text-xs text-slate-400">Settings below apply automatically across ALL assessment domains</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              All Domains Sync
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6 text-xs">
            {/* Form Fields Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Question Count Per Quiz */}
              <div className="space-y-2">
                <Label className="text-slate-800 text-xs font-bold flex items-center justify-between">
                  <span>Questions Per Quiz</span>
                  <span className="text-[10px] text-emerald-600 font-normal">All Domains</span>
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    max={100}
                    value={questionsPerQuizStr}
                    onChange={(e) => setQuestionsPerQuizStr(e.target.value)}
                    className="rounded-xl border-slate-200 text-sm font-semibold h-10 pl-3 pr-12 text-slate-900 focus-visible:border-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    Questions
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Total questions served in 1 test session.
                </p>
              </div>

              {/* Passing Question Requirement */}
              <div className="space-y-2">
                <Label className="text-slate-800 text-xs font-bold flex items-center justify-between">
                  <span>Passing Score Needed</span>
                  <span className="text-[10px] text-emerald-600 font-semibold">{currentPassingPercentage}%</span>
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    max={parsedQuestionsCount}
                    value={passingQuestionsStr}
                    onChange={(e) => setPassingQuestionsStr(e.target.value)}
                    className="rounded-xl border-slate-200 text-sm font-semibold h-10 pl-3 pr-14 text-slate-900 focus-visible:border-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    / {parsedQuestionsCount} Correct
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Minimum correct answers to PASS.
                </p>
              </div>

              {/* Standard Quiz Duration */}
              <div className="space-y-2">
                <Label className="text-slate-800 text-xs font-bold flex items-center justify-between">
                  <span>Test Timer Limit</span>
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    max={180}
                    value={quizTimerStr}
                    onChange={(e) => setQuizTimerStr(e.target.value)}
                    className="rounded-xl border-slate-200 text-sm font-semibold h-10 pl-3 pr-14 text-slate-900 focus-visible:border-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    Minutes
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-tight">
                  Countdown duration per test.
                </p>
              </div>

              {/* Strict Attempt Limit per Email */}
              <div className="space-y-2">
                <Label className="text-slate-800 text-xs font-bold flex items-center justify-between">
                  <span>Attempts Per Email</span>
                  <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                </Label>
                <div className="relative">
                  <Input
                    type="number"
                    min={1}
                    max={50}
                    value={maxAttemptsStr}
                    onChange={(e) => setMaxAttemptsStr(e.target.value)}
                    className="rounded-xl border-slate-200 text-sm font-semibold h-10 pl-3 pr-14 text-slate-900 focus-visible:border-emerald-500"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs font-medium">
                    Attempt(s)
                  </span>
                </div>
                <p className="text-[11px] text-emerald-700 font-medium leading-tight">
                  {parsedMaxAttempts === 1 ? '🔒 1 Attempt Per Email ID (Locked)' : `${parsedMaxAttempts} attempts allowed per email`}
                </p>
              </div>
            </div>

            {/* Live Summary Banner */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">
                    Current Global Rule Summary:
                  </div>
                  <div className="text-[11px] text-slate-600 mt-0.5">
                    Each test serves <strong>{parsedQuestionsCount} questions</strong> ({parsedTimerMinutes} mins timer). Student must score at least <strong>{parsedPassingCount} out of {parsedQuestionsCount} correct ({currentPassingPercentage}%)</strong> to Pass. Candidates get <strong>{parsedMaxAttempts} attempt max per email ID</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SECTION 2: GOOGLE GEMINI AI QUESTION ENGINE */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-100 flex items-center justify-center text-cyan-700 shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Google Gemini AI Question Generator</h3>
                <p className="text-xs text-slate-400">Generates fresh multiple-choice questions dynamically for any technical domain</p>
              </div>
            </div>
            <span className="text-[11px] font-semibold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-full border border-cyan-200/60">
              AI Connected
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between">
              <Label className="text-slate-800 text-xs font-bold flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-slate-500" />
                Google Gemini API Key
              </Label>
              {maskedKey && (
                <span className="text-[11px] text-emerald-700 font-mono font-semibold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  ✓ Active: {maskedKey}
                </span>
              )}
            </div>

            <div className="relative">
              <Input
                type={showKey ? 'text' : 'password'}
                placeholder={maskedKey ? 'Enter new key to update...' : 'AQ... / AIzaSy... (Gemini API Key)'}
                value={geminiApiKey}
                onChange={(e) => setGeminiApiKey(e.target.value)}
                className="pr-10 font-mono text-xs rounded-xl border-slate-200 h-10"
              />
              <button
                type="button"
                onClick={() => setShowKey(!showKey)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              When students select any domain or type a custom domain, Gemini AI automatically generates tailored assessment questions with explanations.
            </p>
          </div>
        </div>

        {/* 3. SECTION 3: ADMIN ACCOUNT SECURITY & PASSWORD CHANGE */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Administrator Password & Security</h3>
              <p className="text-xs text-slate-400">Update your admin login password and portal access security</p>
            </div>
          </div>

          <form onSubmit={handlePasswordChange} className="p-5 sm:p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-700 font-semibold">New Admin Password</Label>
                <div className="relative">
                  <Input
                    type={showAdminPass ? 'text' : 'password'}
                    placeholder="Minimum 6 characters"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="rounded-xl border-slate-200 h-9 text-xs pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowAdminPass(!showAdminPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showAdminPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700 font-semibold">Confirm New Password</Label>
                <Input
                  type={showAdminPass ? 'text' : 'password'}
                  placeholder="Re-enter new password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="rounded-xl border-slate-200 h-9 text-xs"
                />
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <Button
                type="submit"
                disabled={updatingPassword || !newPassword}
                className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl gap-2 h-9 text-xs font-semibold"
              >
                {updatingPassword ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Shield className="w-3.5 h-3.5" />}
                Update Password
              </Button>
            </div>
          </form>
        </div>

        {/* Bottom Save Action */}
        <div className="flex justify-end pt-2">
          <Button
            onClick={handleSave}
            disabled={saving}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-10 px-6 text-xs font-semibold shadow-xs"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save All Settings
          </Button>
        </div>
      </div>
    </AdminLayout>
  );
}
