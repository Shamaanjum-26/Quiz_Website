import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Clock,
  Loader2, AlertCircle,
  Sparkles, ArrowRight
} from 'lucide-react';
import { getQuizResult } from '@/services/quizService';
import { getBootcampForDomain } from '@/services/bootcampService';
import { trackLeadActivity } from '@/services/leadService';
import { getPersistedStudentId } from '@/lib/analytics';
import { formatTimeTaken } from '@/lib/scoring';
import { isSupabaseConfigured } from '@/lib/supabase';
import supabase from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/useToast';
import { getDomainIconPath } from '@/lib/domainIcons';
import type { QuizResult, SkillLevel, Bootcamp } from '@/types';

export default function ResultPage() {
  const { attemptId } = useParams<{ attemptId: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState<string>('');
  const [bootcamp, setBootcamp] = useState<Bootcamp | null>(null);

  const studentId = getPersistedStudentId();
  const stateResult = (location.state as any)?.result || (location.state as any)?.devResult;
  const devResult = stateResult;

  const targetDomainSlug =
    (location.state as any)?.domainSlug ||
    (stateResult as any)?.domain?.slug ||
    (stateResult as any)?.domain_slug ||
    (result as any)?.domain?.slug ||
    (result as any)?.domain_slug ||
    'python';

  const targetDomainId =
    (location.state as any)?.domainId ||
    (stateResult as any)?.domain_id ||
    (stateResult as any)?.domain?.id ||
    (result as any)?.domain_id ||
    (result as any)?.domain?.id ||
    'dev-domain';

  const targetStudentId =
    (location.state as any)?.studentId ||
    studentId ||
    (stateResult as any)?.student_id ||
    (result as any)?.student_id ||
    'student-' + Date.now();

  useEffect(() => {
    const load = async () => {
      try {
        let loadedResult: QuizResult | null = null;

        if (stateResult) {
          loadedResult = stateResult as unknown as QuizResult;
          setResult(loadedResult);
        }

        if (isSupabaseConfigured && attemptId && !attemptId.startsWith('dev-')) {
          try {
            const data = await getQuizResult(attemptId);
            if (data) {
              loadedResult = data;
              setResult(data);
            }
          } catch (fetchErr) {
            console.warn('Could not fetch quiz result from Supabase:', fetchErr);
          }

          if (studentId) {
            try {
              await trackLeadActivity(studentId, 'result_viewed', 5, { attempt_id: attemptId });
            } catch {}
          }
        }

        if (!loadedResult) {
          const fallbackResult: any = {
            id: attemptId || 'res-' + Date.now(),
            attempt_id: attemptId || 'att-' + Date.now(),
            student_id: targetStudentId,
            domain_id: targetDomainId,
            total_questions: 30,
            correct_answers: 0,
            incorrect_answers: 0,
            unanswered: 0,
            score: 0,
            percentage: 0,
            is_passed: true,
            skill_level: 'Intermediate',
            strengths: ['Assessment Completed Successfully'],
            weak_areas: [],
            recommendations: [],
            calculated_at: new Date().toISOString(),
            created_at: new Date().toISOString(),
            domain: {
              name: (location.state as any)?.customDomainName || (targetDomainSlug ? targetDomainSlug.charAt(0).toUpperCase() + targetDomainSlug.slice(1) : 'Technical'),
              slug: targetDomainSlug,
            },
            attempt: {
              time_taken_seconds: (location.state as any)?.timeTakenSeconds || 600,
            },
          };
          loadedResult = fallbackResult;
          setResult(fallbackResult);
        }

        // Fetch student name
        const storedName = localStorage.getItem('student_name');
        if (storedName) {
          setStudentName(storedName);
        } else if (targetStudentId && isSupabaseConfigured && !targetStudentId.startsWith('student-')) {
          try {
            const { data: sData } = await supabase
              .from('students')
              .select('full_name')
              .eq('id', targetStudentId)
              .maybeSingle();
            if (sData?.full_name) {
              setStudentName(sData.full_name);
              localStorage.setItem('student_name', sData.full_name);
            }
          } catch {}
        }



        // Fetch bootcamp info for domain
        try {
          const bc = await getBootcampForDomain(targetDomainId);
          if (bc) setBootcamp(bc);
        } catch {}

      } catch (err) {
        console.error('Failed to load result:', err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [attemptId]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-brand-600 animate-spin mx-auto mb-4" />
          <p className="text-gray-700 font-semibold text-lg">Submitting your assessment...</p>
          <p className="text-gray-400 text-sm mt-1">Recording your responses securely</p>
        </div>
      </div>
    );
  }

  // If result is still somehow null, generate a safe fallback so the thank-you screen is always shown
  const activeResult: QuizResult = result || {
    id: attemptId || 'res-' + Date.now(),
    attempt_id: attemptId || 'att-' + Date.now(),
    student_id: targetStudentId,
    domain_id: targetDomainId,
    total_questions: 30,
    correct_answers: 0,
    incorrect_answers: 0,
    unanswered: 0,
    total_marks: 30,
    obtained_marks: 0,
    percentage: 0,
    skill_level: 'Intermediate',
    is_passed: true,
    pass_fail: 'PASSED',
    personalized_message: 'Thanks for submitting your assessment.',
    strengths: ['Assessment Completed'],
    weak_areas: [],
    recommendations: [],
    calculated_at: new Date().toISOString(),
    created_at: new Date().toISOString(),
    domain: {
      name: (location.state as any)?.customDomainName || (targetDomainSlug ? targetDomainSlug.charAt(0).toUpperCase() + targetDomainSlug.slice(1) : 'Technical'),
      slug: targetDomainSlug,
    } as any,
    attempt: {
      time_taken_seconds: (location.state as any)?.timeTakenSeconds || 600,
    } as any,
  };

  const percentage = typeof activeResult.percentage === 'number' ? activeResult.percentage : parseFloat(String(activeResult.percentage || 0));
  const isPassed = typeof activeResult.is_passed === 'boolean' ? activeResult.is_passed : percentage >= 50;
  const passFail = isPassed ? 'PASSED' : 'FAILED';
  const skillLevel = (activeResult.skill_level || (percentage >= 85 ? 'Expert' : percentage >= 70 ? 'Advanced' : percentage >= 50 ? 'Intermediate' : percentage >= 30 ? 'Beginner' : 'Foundation')) as SkillLevel;
  
  const domainName = (activeResult as any).domain?.name ||
    (devResult as any)?.domain_name ||
    (location.state as any)?.customDomainName ||
    (targetDomainSlug ? targetDomainSlug.charAt(0).toUpperCase() + targetDomainSlug.slice(1) : 'Technical');

  const timeTaken = (activeResult as any).attempt?.time_taken_seconds || (location.state as any)?.timeTakenSeconds || (devResult as any)?.attempt?.time_taken_seconds || 600;


  const handleJoinBootcamp = () => {
    navigate('/bootcamp/register', {
      state: {
        studentId: targetStudentId,
        studentName,
        domainId: targetDomainId,
        domainName,
        domainSlug: targetDomainSlug,
        quizResultId: activeResult.id,
        scorePercentage: percentage,
        bootcampId: bootcamp?.id,
        bootcampName: bootcamp?.name || `${domainName} Fast-Track Bootcamp`,
      },
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-20">
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">

        {/* ── 1. SUBMISSION CONFIRMATION SECTION (NO SCORES/REMARKS) ── */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 mb-8">
          
          {/* Header Row: Domain & Status */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2.5 flex items-center justify-center shrink-0">
                <img
                  src={getDomainIconPath(targetDomainSlug, undefined)}
                  alt={domainName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/domains/default.svg';
                  }}
                />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-brand-600">{domainName} Assessment</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Quiz Submitted!
                </h1>
              </div>
            </div>

            {/* Status Pill */}
            <div className="self-start sm:self-center">
              <div
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-xs"
                id="submission-status-badge"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Response Recorded</span>
              </div>
            </div>
          </div>

          {/* Submission Feedback & Time Taken Display */}
          <div className="py-6 space-y-6">
            
            {/* Thank you & Results announcement banner */}
            <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-teal-50/50 to-indigo-50/60 border border-emerald-100/90 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-emerald-500/20">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                  Thanks for submitting the quiz!
                </h2>
                <p className="text-slate-600 text-sm mt-1">
                  Your assessment has been securely received. <strong className="text-slate-800 font-bold">Results will be declared soon</strong> after evaluation by our technical team.
                </p>
              </div>
            </div>

            {/* Overview Cards (Time Taken & Status Details) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              {/* Time Taken */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Time Taken</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5">
                    {timeTaken ? formatTimeTaken(timeTaken) : '10m'}
                  </div>
                </div>
              </div>

              {/* Assessment Domain */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Domain</div>
                  <div className="text-lg font-extrabold text-slate-900 mt-0.5 truncate">
                    {domainName}
                  </div>
                </div>
              </div>

              {/* Result Declaration Status */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                  <AlertCircle className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-semibold text-slate-500">Result Status</div>
                  <div className="text-sm font-bold text-amber-800 mt-1">
                    Declaring Soon
                  </div>
                </div>
              </div>

            </div>


          </div>



        </div>

        {/* ── 2. MAIN HIGHLIGHT: HADESCORE FREE BOOTCAMP (MAN-MADE, HIGH-CONVERTING SHOWCASE) ── */}
        <div className="bg-[#0B132B] text-white rounded-3xl p-6 sm:p-10 shadow-2xl border border-sky-900/50 mb-10 relative overflow-hidden">
          
          {/* Top Brand Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/15 p-1.5 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Hadescore" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="text-xs font-extrabold text-sky-300 uppercase tracking-wider">
                  Hadescore Pvt Ltd
                </div>
                <div className="text-[11px] text-white/60 tracking-wider">
                  Learn | Build | Grow • Official Student Initiative
                </div>
              </div>
            </div>

            <div className="inline-flex items-center gap-2 bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-1.5 rounded-full shadow-md">
              <Sparkles className="w-3.5 h-3.5 fill-current" />
              <span>100% Free Registration</span>
            </div>
          </div>

          {/* Main Title & Invitation */}
          <div className="my-6">
            <h2 className="text-2xl sm:text-4xl font-black tracking-tight text-white leading-tight">
              Join the Free <span className="text-amber-400">{domainName}</span> Certified Bootcamp
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-2xl leading-relaxed">
              Upskill with live mentor-led sessions, build 2+ real-world portfolio projects, and qualify for our student cash prize pool and placement guidance webinar.
            </p>
          </div>

          {/* HIGH IMPACT CTA BUTTON */}
          <div className="flex items-center justify-center pt-2">
            <Button
              size="lg"
              onClick={handleJoinBootcamp}
              className="w-full sm:w-auto h-14 px-12 text-base sm:text-lg font-black bg-amber-400 hover:bg-amber-300 active:bg-amber-500 text-slate-950 rounded-2xl shadow-xl shadow-amber-400/20 hover:shadow-amber-400/30 gap-3 cursor-pointer transition-all transform hover:-translate-y-0.5 shrink-0 border-0"
              id="join-free-bootcamp-btn"
            >
              <span>Join Free Bootcamp Now</span>
              <ArrowRight className="w-5 h-5 text-slate-950" />
            </Button>
          </div>

        </div>

        {/* ── FOOTER NAVIGATION ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <Link to="/home" className="hover:text-slate-800 font-semibold transition-colors flex items-center gap-1">
            ← Explore other domains & quizzes
          </Link>
          <span>Hadescore Pvt Ltd • All Rights Reserved</span>
        </div>

      </main>
    </div>
  );
}
