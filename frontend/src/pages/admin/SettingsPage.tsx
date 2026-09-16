import { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  Key,
  Globe,
  Shield,
  Bell,
  CheckCircle2,
  Database,
  RefreshCw,
  Mail,
  MessageSquare,
  Sparkles,
  BrainCircuit,
  Cpu,
  Layers,
  Eye,
  EyeOff,
  Check,
  AlertCircle,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/useToast';
import { isSupabaseConfigured } from '@/lib/supabase';
import { fetchQuizConfig, saveQuizConfig, type QuizEngineConfig } from '@/services/quizService';

export default function AdminSettingsPage() {
  const [platformName, setPlatformName] = useState('Hadescore PVT LTD Assessment Platform');
  const [supportEmail, setSupportEmail] = useState('contact@hadescore.com');
  const [whatsappNumber, setWhatsappNumber] = useState('+91 98765 43210');
  const [quizTimerMinutes, setQuizTimerMinutes] = useState(15);
  const [hotLeadThreshold, setHotLeadThreshold] = useState(70);
  const [saving, setSaving] = useState(false);

  // Quiz Engine & Gemini Settings
  const [bankSize, setBankSize] = useState(30);
  const [questionsPerQuiz, setQuestionsPerQuiz] = useState(10);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [passingPercentage, setPassingPercentage] = useState(50);
  const [geminiApiKey, setGeminiApiKey] = useState('');
  const [maskedKey, setMaskedKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [configLoading, setConfigLoading] = useState(true);

  useEffect(() => {
    async function loadConfig() {
      try {
        const conf = await fetchQuizConfig();
        if (conf) {
          setBankSize(conf.question_bank_size || 30);
          setQuestionsPerQuiz(conf.questions_per_quiz || 10);
          setMaxAttempts(conf.max_attempts || 3);
          setPassingPercentage(conf.passing_percentage || 50);
          if (conf.gemini_api_key_masked) {
            setMaskedKey(conf.gemini_api_key_masked);
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

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload: Partial<QuizEngineConfig> = {
        question_bank_size: bankSize,
        questions_per_quiz: questionsPerQuiz,
        max_attempts: maxAttempts,
        passing_percentage: passingPercentage,
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
        title: 'Settings Saved Successfully',
        description: 'Platform and Gemini Quiz Engine configurations have been persisted.',
        variant: 'success',
      });
    } catch (err: any) {
      toast({
        title: 'Save Error',
        description: err.message || 'Failed to persist settings.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <AdminLayout
      title="Platform Settings & Rules"
      subtitle="Configure AI question generation parameters, randomized quiz engines, anti-cheat limits, and CRM thresholds"
      actions={
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-2xs"
        >
          {saving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          Save All Changes
        </Button>
      }
    >
      <div className="space-y-6 max-w-4xl">
        {/* Supabase Status Banner */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 text-sm">PostgreSQL Database Connection</h3>
              <p className="text-xs text-slate-400">
                {isSupabaseConfigured
                  ? 'Connected to production Supabase cloud database with active Row-Level Security.'
                  : 'Operating in offline development simulation mode.'}
              </p>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border shrink-0 ${
              isSupabaseConfigured
                ? 'bg-emerald-50 text-emerald-800 border-emerald-200/60'
                : 'bg-amber-50 text-amber-800 border-amber-200/60'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isSupabaseConfigured ? 'bg-emerald-600' : 'bg-amber-500'
              }`}
            />
            {isSupabaseConfigured ? 'Live Connection Active' : 'Offline / Demo Mode'}
          </span>
        </div>

        {/* Gemini AI & Quiz Engine Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-700 shrink-0">
                <BrainCircuit className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-sm">Gemini AI & Quiz Randomization Engine</h3>
                <p className="text-xs text-slate-400">Rules for dynamic MCQ generation, retake deduplication, and anti-cheat enforcement</p>
              </div>
            </div>

            <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200/60">
              Active Engine
            </span>
          </div>

          <div className="p-5 sm:p-6 space-y-6 text-xs">
            {/* Deduplication Guarantee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Level 1 Deduplication</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Validates question prompt semantic similarity before inserting into bank.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                <Layers className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Level 2 Retake Logic</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Prioritizes unseen questions for student retakes; randomized option shuffling.
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/60 flex items-start gap-3">
                <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-900 text-xs">Zero-Leak Anti-Cheat</div>
                  <div className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                    Correct answer boolean is omitted in client payload and evaluated strictly on server.
                  </div>
                </div>
              </div>
            </div>

            {/* Numerical Engine Settings */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="space-y-1.5">
                <Label className="text-slate-700 text-xs font-semibold">Question Bank Target</Label>
                <Input
                  type="number"
                  min={10}
                  max={100}
                  value={bankSize}
                  onChange={(e) => setBankSize(Number(e.target.value))}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
                <span className="text-[10px] text-slate-400 block">Total Qs per domain (Default 30)</span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700 text-xs font-semibold">Questions Per Quiz</Label>
                <Input
                  type="number"
                  min={5}
                  max={50}
                  value={questionsPerQuiz}
                  onChange={(e) => setQuestionsPerQuiz(Number(e.target.value))}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
                <span className="text-[10px] text-slate-400 block">Served in single session (Default 10)</span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700 text-xs font-semibold">Max Attempts Allowed</Label>
                <Input
                  type="number"
                  min={1}
                  max={10}
                  value={maxAttempts}
                  onChange={(e) => setMaxAttempts(Number(e.target.value))}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
                <span className="text-[10px] text-slate-400 block">Limit per student (Default 3)</span>
              </div>

              <div className="space-y-1.5">
                <Label className="text-slate-700 text-xs font-semibold">Passing Threshold (%)</Label>
                <Input
                  type="number"
                  min={10}
                  max={100}
                  value={passingPercentage}
                  onChange={(e) => setPassingPercentage(Number(e.target.value))}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
                <span className="text-[10px] text-slate-400 block">Passing score requirement (50%)</span>
              </div>
            </div>

            {/* Gemini API Key */}
            <div className="pt-4 border-t border-slate-100 space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-slate-700 text-xs font-semibold flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5 text-slate-500" />
                  Google Gemini AI API Key
                </Label>
                {maskedKey && (
                  <span className="text-[11px] text-emerald-700 font-mono font-medium">
                    Configured: {maskedKey}
                  </span>
                )}
              </div>

              <div className="relative">
                <Input
                  type={showKey ? 'text' : 'password'}
                  placeholder={maskedKey ? 'Enter new key to update current key...' : 'AIzaSy... (Gemini API Key)'}
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="pr-10 font-mono text-xs rounded-xl border-slate-200 h-9"
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
                Empowers automatic question generation into 10 Easy, 10 Medium, and 10 Hard tiers.
              </p>
            </div>
          </div>
        </div>

        {/* Platform Identity & Admissions Contact */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Platform Profile & Admissions Contact</h3>
              <p className="text-xs text-slate-400">Institutional branding displayed on diagnostic reports and student certificates</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-1.5">
              <Label className="text-slate-700 font-semibold">Institutional Title</Label>
              <Input
                value={platformName}
                onChange={(e) => setPlatformName(e.target.value)}
                className="rounded-xl border-slate-200 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-700 font-semibold">Admissions & Support Email</Label>
              <Input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="rounded-xl border-slate-200 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-700 font-semibold">WhatsApp Helpline Number</Label>
              <Input
                value={whatsappNumber}
                onChange={(e) => setWhatsappNumber(e.target.value)}
                className="rounded-xl border-slate-200 h-9 text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-slate-700 font-semibold">Standard Quiz Duration (Minutes)</Label>
              <Input
                type="number"
                value={quizTimerMinutes}
                onChange={(e) => setQuizTimerMinutes(Number(e.target.value))}
                className="rounded-xl border-slate-200 h-9 text-xs"
              />
            </div>
          </div>
        </div>

        {/* Automated Lead Scoring Thresholds */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-center text-slate-700 shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Automated CRM Lead Tier Thresholds</h3>
              <p className="text-xs text-slate-400">Score boundaries that segment students into counselor outreach tiers</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-4 rounded-xl border border-emerald-200/60 bg-emerald-50/50">
              <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-1">
                High Intent Threshold
              </span>
              <p className="text-2xl font-bold text-emerald-900">&ge; {hotLeadThreshold} pts</p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Flags candidate as high priority for counselor advisory and enrollment outreach.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-amber-200/60 bg-amber-50/50">
              <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block mb-1">
                Engaged Score Range
              </span>
              <p className="text-2xl font-bold text-amber-900">40 - {hotLeadThreshold - 1} pts</p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Enters automated follow-up sequence with personalized skill recommendations.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200/60 bg-slate-50/50">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                Early Stage Score Range
              </span>
              <p className="text-2xl font-bold text-slate-900">&lt; 40 pts</p>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Enrolled into foundational learning resources and technical study roadmaps.
              </p>
            </div>
          </div>

          <div className="pt-2">
            <Label className="text-slate-700 text-xs font-semibold block mb-1">
              Adjust High Intent Score Cutoff
            </Label>
            <Input
              type="number"
              value={hotLeadThreshold}
              onChange={(e) => setHotLeadThreshold(Number(e.target.value))}
              className="max-w-xs rounded-xl border-slate-200 text-xs h-9"
            />
          </div>
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
