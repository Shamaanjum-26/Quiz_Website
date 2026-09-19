import { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Clock,
  Loader2,
  Sparkles, ArrowRight
} from 'lucide-react';
import { getQuizResult, getStoredQuizConfig } from '@/services/quizService';
import { getBootcampForDomain, registerForBootcamp } from '@/services/bootcampService';
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
  const [imgError, setImgError] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  const studentId = getPersistedStudentId();
  const stateResult = (location.state as any)?.result || (location.state as any)?.devResult;
  const devResult = stateResult;

  const storedDomainSlug = typeof window !== 'undefined' && attemptId ? sessionStorage.getItem(`quiz_domain_slug_${attemptId}`) : null;
  const storedDomainName = typeof window !== 'undefined' && attemptId ? sessionStorage.getItem(`quiz_domain_name_${attemptId}`) : null;

  const targetDomainSlug =
    (location.state as any)?.domainSlug ||
    storedDomainSlug ||
    (stateResult as any)?.domain?.slug ||
    (stateResult as any)?.domain_slug ||
    (result as any)?.domain?.slug ||
    (result as any)?.domain_slug ||
    'ui-ux-design';

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

  // Prevent back navigation to quiz assessment & ensure fullscreen is exited
  useEffect(() => {
    // Ensure fullscreen is closed on result page
    try {
      if (document.fullscreenElement) {
        const doc = document as any;
        if (doc.exitFullscreen) {
          doc.exitFullscreen().catch(() => {});
        } else if (doc.webkitExitFullscreen) {
          doc.webkitExitFullscreen();
        } else if (doc.msExitFullscreen) {
          doc.msExitFullscreen();
        }
      }
    } catch {}

    // Trap the back button to remain on the result page
    window.history.pushState(null, '', window.location.href);

    const handlePopState = () => {
      // Re-push history state to keep the user on the result page
      window.history.pushState(null, '', window.location.href);
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

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

  const quizConfig = getStoredQuizConfig();
  const percentage = typeof activeResult.percentage === 'number' ? activeResult.percentage : parseFloat(String(activeResult.percentage || 0));
  const isPassed = typeof activeResult.is_passed === 'boolean' ? activeResult.is_passed : percentage >= (quizConfig.passing_percentage || 50);
  const passFail = isPassed ? 'PASSED' : 'FAILED';
  const skillLevel = (activeResult.skill_level || (percentage >= 85 ? 'Expert' : percentage >= 70 ? 'Advanced' : percentage >= 50 ? 'Intermediate' : percentage >= 30 ? 'Beginner' : 'Foundation')) as SkillLevel;
  
  const rawDomainName =
    (location.state as any)?.customDomainName ||
    (location.state as any)?.domainName ||
    storedDomainName ||
    (activeResult as any).domain?.name ||
    (devResult as any)?.domain_name ||
    (targetDomainSlug ? targetDomainSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase()) : 'Assessment');

  // Guard against stale Python default if targetDomainSlug is not Python
  const domainName = (targetDomainSlug && !targetDomainSlug.includes('python') && rawDomainName.toLowerCase().includes('python'))
    ? targetDomainSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase())
    : rawDomainName;

  const timeTaken = (activeResult as any).attempt?.time_taken_seconds || (location.state as any)?.timeTakenSeconds || (devResult as any)?.attempt?.time_taken_seconds || 600;


  const WHATSAPP_COMMUNITY_URL = 'https://chat.whatsapp.com/E3OZRJip3Gx1y0XXNmKXvo';

  const handleJoinBootcamp = () => {
    // Attempt non-blocking background registration in Supabase
    try {
      if (isSupabaseConfigured && targetStudentId && bootcamp?.id) {
        registerForBootcamp(
          bootcamp.id,
          targetStudentId,
          activeResult.id,
          '06:00 PM - 07:00 PM',
          'Upskilling & Placement Preparation',
          {
            preferredBatch: 'Upcoming Certified Batch',
            mode: 'online',
            whatsappOptIn: true,
          }
        ).catch((err) => console.warn('Background registration note:', err));
      }
    } catch {}

    // Non-blocking local leads update
    try {
      const rawLeads = localStorage.getItem('hadescore_local_leads');
      if (rawLeads) {
        const leads = JSON.parse(rawLeads);
        const found = leads.find((l: any) => l.student_id === targetStudentId);
        if (found) {
          found.has_registered_bootcamp = true;
          found.lead_score = Math.max(found.lead_score, 85);
          found.lead_status = 'HOT';
          localStorage.setItem('hadescore_local_leads', JSON.stringify(leads));
        }
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 pb-16 sm:pb-20">
      <main className="max-w-4xl mx-auto px-3.5 sm:px-6 pt-6 sm:pt-12">

        {/* ── 1. SUBMISSION CONFIRMATION SECTION (NO SCORES/REMARKS) ── */}
        <div className="relative z-10 bg-white rounded-3xl border border-indigo-100/90 shadow-[0_15px_45px_-12px_rgba(79,70,229,0.12)] hover:shadow-[0_20px_55px_-12px_rgba(79,70,229,0.16)] transition-all duration-300 p-5 sm:p-8 md:p-9 mb-6 sm:mb-8 overflow-hidden">
          {/* Top Gradient Accent Strip */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-violet-600 via-indigo-600 to-emerald-400" />
          
          {/* Subtle Ambient Background Aura */}
          <div className="absolute -top-20 -right-20 w-52 h-52 bg-gradient-to-br from-indigo-500/8 to-emerald-500/8 rounded-full blur-2xl pointer-events-none" />

          {/* Header Row: Domain & Time Taken */}
          <div className="pb-5 sm:pb-6 border-b border-slate-100/90 relative z-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4.5 min-w-0">
                <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-50 via-white to-violet-50/80 border border-indigo-100 p-1.5 sm:p-2 flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/5">
                  {imgError ? (
                    <Sparkles className="w-7 h-7 text-indigo-600" />
                  ) : (
                    <img
                      src={getDomainIconPath(targetDomainSlug, undefined, domainName)}
                      alt={domainName}
                      className="w-full h-full object-cover rounded-xl"
                      onError={() => setImgError(true)}
                    />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                    {domainName} Assessment
                  </h1>
                  
                  {/* Clean Meta Tag: Time Taken */}
                  <div className="flex items-center gap-2 mt-2">
                    <div
                      className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200/80 shadow-2xs"
                      id="time-taken-badge"
                    >
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <Clock className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                      <span>Time Taken: <strong className="font-extrabold text-slate-900">{timeTaken ? formatTimeTaken(timeTaken) : '10m'}</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submission Feedback & Results announcement banner */}
          <div className="pt-5 sm:pt-6 relative z-10">
            <div className="p-4 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-teal-500/5 to-cyan-500/10 border border-emerald-500/20 shadow-xs flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-tr from-emerald-600 via-emerald-500 to-teal-400 text-white flex items-center justify-center shrink-0 shadow-lg shadow-emerald-500/25">
                <CheckCircle2 className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.5]" />
              </div>
              <div className="flex-1 min-w-0">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                  Thanks for submitting the quiz!
                </h2>
                <p className="text-slate-600 text-xs sm:text-sm mt-1 sm:mt-1.5 leading-relaxed font-medium">
                  For the results, join the bootcamp! <strong className="text-slate-900 font-bold">The announcement of the results will take place during the bootcamp only.</strong>
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* ── 2. MAIN HIGHLIGHT: HADESCORE FREE BOOTCAMP SHOWCASE ── */}
        <div className="bg-[#0B132B] text-white rounded-2xl sm:rounded-3xl p-5 sm:p-8 md:p-10 shadow-2xl border border-sky-900/50 mb-8 sm:mb-10 relative overflow-hidden">
          
          {/* Top Brand Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-5 border-b border-white/10">
            <div className="flex items-center gap-2.5 sm:gap-3">
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-white/10 border border-white/15 p-1 sm:p-1.5 flex items-center justify-center shrink-0">
                <img src="/logo.png" alt="Hadescore" className="w-full h-full object-contain" />
              </div>
              <div>
                <div className="flex items-center">
                  <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#00D8F6]">HADES</span>
                  <span className="font-display font-black text-sm sm:text-base tracking-tight text-white">CORE</span>
                  <span className="font-display font-black text-sm sm:text-base tracking-tight text-[#00D8F6] ml-1">PVT LTD</span>
                </div>
                <div className="text-[10px] sm:text-[11px] text-white/60 tracking-wider">
                  Learn | Build | Grow • Official Student Initiative
                </div>
              </div>
            </div>
          </div>

          {/* Main Title & Invitation */}
          <div className="my-5 sm:my-6">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black tracking-tight text-white leading-tight">
              Join the <span className="text-amber-400">{domainName}</span> Certified Bootcamp
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
              Upskill with live mentor-led sessions, build 2+ real-world portfolio projects, and qualify for our student cash prize pool and placement guidance webinar.
            </p>
          </div>

          {/* HIGH IMPACT CTA BUTTON - Direct WhatsApp Community Link */}
          <div className="flex items-center justify-center pt-2">
            <a
              href={WHATSAPP_COMMUNITY_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleJoinBootcamp}
              className="inline-flex items-center justify-center w-full sm:w-auto h-12 sm:h-14 px-8 sm:px-12 text-sm sm:text-base md:text-lg font-bold bg-[#4F46E5] hover:bg-[#4338CA] active:bg-[#3730A3] text-white rounded-xl sm:rounded-2xl shadow-xl shadow-indigo-600/30 hover:shadow-indigo-600/50 gap-2 sm:gap-3 cursor-pointer transition-all transform hover:-translate-y-0.5 shrink-0 border-0 no-underline"
              id="join-bootcamp-btn"
            >
              <span>Join Bootcamp Now</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
            </a>
          </div>

        </div>

        {/* ── FOOTER NAVIGATION ───────────────────────────────── */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-slate-200 text-xs text-slate-500">
          <Link to="/home" className="hover:text-slate-800 font-semibold transition-colors flex items-center gap-1">
            ← Explore other domains & quizzes
          </Link>
          <span>HADESCORE PVT LTD • All Rights Reserved</span>
        </div>

      </main>
    </div>
  );
}
