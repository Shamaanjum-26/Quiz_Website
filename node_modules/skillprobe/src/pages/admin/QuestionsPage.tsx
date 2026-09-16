import { useState, useEffect, useCallback } from 'react';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Loader2,
  X,
  CheckCircle2,
  HelpCircle,
  Sparkles,
  BrainCircuit,
  RefreshCw,
  Cpu,
  Layers,
  CheckCircle,
  Filter,
  Check,
} from 'lucide-react';
import { AdminLayout } from '@/components/layout/AdminLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { AdminTableSkeleton } from '@/components/admin/AdminTableSkeleton';
import { AdminEmptyState } from '@/components/admin/AdminEmptyState';
import { adminGetQuestions, adminGetDomains, adminCreateQuestion, adminDeleteQuestion } from '@/services/adminService';
import { fetchDomainBankStats, generateDomainQuestionBank, type DomainBankStat } from '@/services/quizService';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/useToast';

const SAMPLE_QUESTIONS = [
  {
    id: 'q1',
    question_text: 'What is the output of print(type(5)) in Python 3?',
    difficulty: 'easy',
    marks: 1,
    active: true,
    domain: { name: 'Python' },
    options: [
      { option_text: "<class 'int'>", is_correct: true },
      { option_text: 'int', is_correct: false },
      { option_text: '<type int>', is_correct: false },
      { option_text: 'Number', is_correct: false },
    ],
  },
  {
    id: 'q2',
    question_text: 'Which HTML5 semantic element is intended to encapsulate self-contained syndicated composition?',
    difficulty: 'medium',
    marks: 1,
    active: true,
    domain: { name: 'Web Dev' },
    options: [
      { option_text: '<article>', is_correct: true },
      { option_text: '<section>', is_correct: false },
      { option_text: '<aside>', is_correct: false },
      { option_text: '<div>', is_correct: false },
    ],
  },
  {
    id: 'q3',
    question_text: 'In supervised machine learning, which loss function is standard for multi-class classification?',
    difficulty: 'hard',
    marks: 2,
    active: true,
    domain: { name: 'AI / ML' },
    options: [
      { option_text: 'Categorical Cross-Entropy', is_correct: true },
      { option_text: 'Mean Squared Error (MSE)', is_correct: false },
      { option_text: 'Hinge Loss', is_correct: false },
      { option_text: 'Binary Cross-Entropy', is_correct: false },
    ],
  },
];

export default function AdminQuestionsPage() {
  const [questions, setQuestions] = useState<any[]>(SAMPLE_QUESTIONS);
  const [domains, setDomains] = useState<{ id: string; name: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(SAMPLE_QUESTIONS.length);
  const [page, setPage] = useState(1);
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  // Gemini AI Generation States
  const [bankStats, setBankStats] = useState<DomainBankStat[]>([]);
  const [statsLoading, setStatsLoading] = useState(false);
  const [isGeminiModalOpen, setIsGeminiModalOpen] = useState(false);
  const [geminiDomainId, setGeminiDomainId] = useState<string>('');
  const [geminiApiKey, setGeminiApiKey] = useState<string>('');
  const [generatingGemini, setGeneratingGemini] = useState(false);
  const [geminiProgress, setGeminiProgress] = useState<string>('');

  // New Question Form State
  const [form, setForm] = useState({
    domain_id: '',
    question_text: '',
    difficulty: 'easy' as 'easy' | 'medium' | 'hard',
    marks: 1,
    active: true,
  });

  const [options, setOptions] = useState([
    { option_text: '', is_correct: true },
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false },
    { option_text: '', is_correct: false },
  ]);

  const loadBankStats = useCallback(async () => {
    setStatsLoading(true);
    try {
      const stats = await fetchDomainBankStats();
      if (stats && stats.length) setBankStats(stats);
    } catch {} finally {
      setStatsLoading(false);
    }
  }, []);

  const load = useCallback(async () => {
    if (!isSupabaseConfigured) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const domainFilter = selectedDomain === 'all' ? undefined : selectedDomain;
      const [qResult, domList] = await Promise.all([
        adminGetQuestions(domainFilter, page),
        adminGetDomains(),
      ]);
      if (qResult && qResult.data) {
        setQuestions(qResult.data);
        setTotal(qResult.total);
      }
      if (domList) {
        setDomains(domList);
        if (!form.domain_id && domList.length > 0) {
          setForm((prev) => ({ ...prev, domain_id: domList[0].id }));
        }
        if (!geminiDomainId && domList.length > 0) {
          setGeminiDomainId(domList[0].id);
        }
      }
    } catch {
      // use sample
    } finally {
      setLoading(false);
    }
  }, [selectedDomain, page]);

  useEffect(() => {
    load();
    loadBankStats();
  }, [load, loadBankStats]);

  const handleGenerateWithGemini = async (targetId?: string, targetName?: string) => {
    const domainIdToUse = targetId || geminiDomainId || (domains[0]?.id || '');
    const domObj = domains.find((d) => d.id === domainIdToUse);
    const domainNameToUse = targetName || domObj?.name || 'Technical Domain';

    if (!domainIdToUse) {
      toast({
        title: 'Select Domain',
        description: 'Please select a domain to generate questions for.',
        variant: 'destructive',
      });
      return;
    }

    setGeneratingGemini(true);
    setGeminiProgress(`Synthesizing 30 unique MCQs via Gemini AI for ${domainNameToUse}...`);
    try {
      const res = await generateDomainQuestionBank(domainIdToUse, domainNameToUse, geminiApiKey || undefined);
      toast({
        title: '✨ Question Bank Generated!',
        description: `Successfully added ${res.saved} unique questions (${res.generated} generated) for ${domainNameToUse}. Total bank: ${res.totalExisting}.`,
        variant: 'success',
      });
      setIsGeminiModalOpen(false);
      load();
      loadBankStats();
    } catch (err: any) {
      toast({
        title: 'Generation Notice',
        description: err.message || 'Failed to generate question bank.',
        variant: 'destructive',
      });
    } finally {
      setGeneratingGemini(false);
      setGeminiProgress('');
    }
  };

  const openCreateModal = () => {
    setForm({
      domain_id: domains[0]?.id || '',
      question_text: '',
      difficulty: 'easy',
      marks: 1,
      active: true,
    });
    setOptions([
      { option_text: '', is_correct: true },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
      { option_text: '', is_correct: false },
    ]);
    setIsModalOpen(true);
  };

  const handleOptionTextChange = (index: number, text: string) => {
    setOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, option_text: text } : opt))
    );
  };

  const handleSetCorrectOption = (index: number) => {
    setOptions((prev) =>
      prev.map((opt, i) => ({ ...opt, is_correct: i === index }))
    );
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.question_text.trim()) {
      toast({
        title: 'Question text required',
        description: 'Please write out the question prompt.',
        variant: 'destructive',
      });
      return;
    }

    const validOptions = options.filter((o) => o.option_text.trim().length > 0);
    if (validOptions.length < 2) {
      toast({
        title: 'Options required',
        description: 'Please provide at least 2 distinct answer options.',
        variant: 'destructive',
      });
      return;
    }

    const hasCorrect = validOptions.some((o) => o.is_correct);
    if (!hasCorrect) {
      toast({
        title: 'Correct answer required',
        description: 'Please select which option is correct.',
        variant: 'destructive',
      });
      return;
    }

    setSaving(true);
    try {
      if (isSupabaseConfigured) {
        await adminCreateQuestion(
          {
            domain_id: form.domain_id,
            question_text: form.question_text,
            difficulty: form.difficulty,
            marks: form.marks,
            active: form.active,
          },
          validOptions.map((o, idx) => ({
            option_text: o.option_text,
            option_order: idx,
            is_correct: o.is_correct,
          }))
        );
      } else {
        const newQ = {
          id: 'dev-q-' + Date.now(),
          ...form,
          domain: domains.find((d) => d.id === form.domain_id) || { name: 'General' },
          options: validOptions,
        };
        setQuestions((prev) => [newQ, ...prev]);
      }

      toast({
        title: 'Question Saved',
        description: 'Question was added to the assessment bank.',
        variant: 'success',
      });
      setIsModalOpen(false);
      load();
    } catch (err: any) {
      toast({
        title: 'Failed to save',
        description: err.message || 'Error occurred',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Remove this question from question bank?')) return;
    setQuestions((prev) => prev.filter((q) => q.id !== id));
    if (isSupabaseConfigured) {
      await adminDeleteQuestion(id);
    }
    toast({
      title: 'Question Deleted',
      description: 'Removed from active question bank.',
    });
  };

  const filteredQ = search
    ? questions.filter((q) =>
        q.question_text.toLowerCase().includes(search.toLowerCase())
      )
    : questions;

  return (
    <AdminLayout
      title="Question Bank CMS"
      actions={
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsGeminiModalOpen(true)}
            className="rounded-xl border-slate-200 hover:bg-slate-50 text-slate-700 gap-1.5 h-9 text-xs font-semibold shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Manual AI Refill
          </Button>
          <Button
            size="sm"
            onClick={openCreateModal}
            className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl gap-2 h-9 text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Question
          </Button>
        </div>
      }
    >
      {/* Filter & Search Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <div className="relative flex-1 sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <Input
              placeholder="Search question text..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-white border-slate-200/80 rounded-xl text-xs h-9 shadow-2xs focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          {domains.length > 0 && (
            <select
              value={selectedDomain}
              onChange={(e) => {
                setSelectedDomain(e.target.value);
                setPage(1);
              }}
              className="border border-slate-200/80 bg-white rounded-xl text-xs px-3 h-9 text-slate-700 shadow-2xs focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="all">All Tech Domains</option>
              {domains.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <span className="text-xs text-slate-500 font-medium">
          Showing <strong className="text-slate-800">{filteredQ.length}</strong> questions
        </span>
      </div>

      {/* Questions List Container */}
      <div className="space-y-3">
        {loading ? (
          <div className="bg-white rounded-2xl border border-slate-200/80 p-6">
            <AdminTableSkeleton rows={4} columns={4} />
          </div>
        ) : filteredQ.length === 0 ? (
          <AdminEmptyState
            title="No questions found"
            description="Try changing the domain filter or search query, or generate new questions via Gemini AI."
            actionLabel="Generate with Gemini"
            onAction={() => setIsGeminiModalOpen(true)}
          />
        ) : (
          filteredQ.map((q, qIndex) => (
            <div
              key={q.id || qIndex}
              className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_1px_3px_0_rgba(0,0,0,0.02)] hover:border-slate-300 transition-all duration-150"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">#{(page - 1) * 20 + qIndex + 1}</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {q.domain?.name || 'General Tech'}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${
                      q.difficulty === 'easy'
                        ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60'
                        : q.difficulty === 'hard'
                        ? 'bg-rose-50 text-rose-700 border-rose-200/60'
                        : 'bg-amber-50 text-amber-700 border-amber-200/60'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {q.marks || 1} mark
                  </span>
                </div>

                <button
                  onClick={() => handleDelete(q.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  title="Delete question"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <h4 className="font-semibold text-slate-900 text-sm mb-4 leading-relaxed">
                {q.question_text}
              </h4>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options?.map((opt: any, optIdx: number) => (
                  <div
                    key={optIdx}
                    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs border transition-colors ${
                      opt.is_correct
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900 font-semibold'
                        : 'bg-slate-50/70 border-slate-200/60 text-slate-600'
                    }`}
                  >
                    <span
                      className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                        opt.is_correct
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {String.fromCharCode(65 + optIdx)}
                    </span>
                    <span className="truncate">{opt.option_text}</span>
                    {opt.is_correct && (
                      <Check className="w-3.5 h-3.5 text-emerald-600 ml-auto shrink-0" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Gemini AI Modal */}
      {isGeminiModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 text-base">Generate 30 MCQs with Gemini AI</h3>
              </div>
              <button
                onClick={() => setIsGeminiModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <p className="text-slate-500 leading-relaxed">
                Gemini AI will generate 30 high-quality technical questions partitioned into 10 Easy, 10 Medium, and 10 Hard tiers.
              </p>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">Target Tech Domain</Label>
                <select
                  value={geminiDomainId}
                  onChange={(e) => setGeminiDomainId(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-3 h-9 text-xs bg-white text-slate-700 focus:ring-1 focus:ring-emerald-500"
                >
                  {domains.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">
                  Gemini API Key (Optional override)
                </Label>
                <Input
                  type="password"
                  placeholder="Uses server-side configured key if blank"
                  value={geminiApiKey}
                  onChange={(e) => setGeminiApiKey(e.target.value)}
                  className="rounded-xl border-slate-200 text-xs h-9"
                />
              </div>

              {generatingGemini && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center space-y-2">
                  <Loader2 className="w-5 h-5 text-emerald-600 animate-spin mx-auto" />
                  <p className="text-slate-600 font-medium">{geminiProgress}</p>
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <Button
                  onClick={() => handleGenerateWithGemini()}
                  disabled={generatingGemini}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-9 font-semibold gap-2"
                >
                  {generatingGemini ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" /> Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-3.5 h-3.5" /> Start Generation
                    </>
                  )}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsGeminiModalOpen(false)}
                  disabled={generatingGemini}
                  className="flex-1 rounded-xl text-xs h-9"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Question Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h3 className="font-bold text-slate-900 text-base">Add New Question</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Domain</Label>
                  <select
                    value={form.domain_id}
                    onChange={(e) => setForm({ ...form, domain_id: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-2.5 h-9 text-xs bg-white text-slate-700"
                  >
                    {domains.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label className="text-slate-700 text-xs font-semibold mb-1 block">Difficulty</Label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm({ ...form, difficulty: e.target.value as any })}
                    className="w-full border border-slate-200 rounded-xl px-2.5 h-9 text-xs bg-white text-slate-700"
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-1 block">Question Text</Label>
                <textarea
                  rows={3}
                  placeholder="Enter the question prompt..."
                  value={form.question_text}
                  onChange={(e) => setForm({ ...form, question_text: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-emerald-500 resize-none"
                  required
                />
              </div>

              <div>
                <Label className="text-slate-700 text-xs font-semibold mb-2 block">
                  Options (Select radio for correct option)
                </Label>
                <div className="space-y-2">
                  {options.map((opt, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="correct_option"
                        checked={opt.is_correct}
                        onChange={() => handleSetCorrectOption(i)}
                        className="accent-emerald-600 w-4 h-4 cursor-pointer"
                        title="Mark as correct answer"
                      />
                      <Input
                        placeholder={`Option ${String.fromCharCode(65 + i)}`}
                        value={opt.option_text}
                        onChange={(e) => handleOptionTextChange(i, e.target.value)}
                        className="rounded-xl border-slate-200 text-xs h-8 flex-1"
                        required={i < 2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 flex gap-2">
                <Button
                  type="submit"
                  disabled={saving}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs h-9 font-semibold"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Save Question'}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 rounded-xl text-xs h-9"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
