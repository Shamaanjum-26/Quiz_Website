import { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  CheckCircle2, Loader2, ArrowLeft,
  MessageSquare, ShieldCheck, Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { registerForBootcamp, getBootcampForDomain } from '@/services/bootcampService';
import { getPersistedStudentId } from '@/lib/analytics';
import { isSupabaseConfigured } from '@/lib/supabase';
import supabase from '@/lib/supabase';
import { toast } from '@/hooks/useToast';
import { getDomainIconPath } from '@/lib/domainIcons';

export default function BootcampRegisterPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const navState = (location.state as Record<string, any>) || {};
  const studentId = navState.studentId || getPersistedStudentId() || 'student-' + Date.now();

  const [studentInfo, setStudentInfo] = useState({
    name: navState.studentName || localStorage.getItem('student_name') || 'Student',
    email: localStorage.getItem('student_email') || 'student@example.com',
    mobile: localStorage.getItem('student_mobile') || '',
    college: localStorage.getItem('student_college') || '',
  });

  const domainName = navState.domainName || 'Full-Stack Development';
  const domainSlug = navState.domainSlug || '';
  const domainId = navState.domainId || 'dev-domain';
  const bootcampId = navState.bootcampId || 'default-bootcamp-id';
  const bootcampName = navState.bootcampName || `${domainName} Fast-Track Bootcamp`;
  const quizResultId = navState.quizResultId || null;

  // Date calculation
  const todayStr = new Date().toISOString().split('T')[0];
  const defaultDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() + ((6 - d.getDay() + 7) % 7 || 7));
    return d.toISOString().split('T')[0];
  })();

  const [preferredDate, setPreferredDate] = useState<string>(defaultDate);
  const [preferredTiming, setPreferredTiming] = useState<string>('06:00 PM - 07:00 PM');
  const [mode, setMode] = useState<'online' | 'offline'>('online');
  const [whatsappOptIn, setWhatsappOptIn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const learningGoal = 'Build 2+ Portfolio Projects';
  const [resolvedBootcampId, setResolvedBootcampId] = useState(bootcampId);

  // Dynamic Day & Date Calculation
  const getDayNameOnly = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString('en-US', { weekday: 'long' });
    } catch {
      return '';
    }
  };

  const getFormattedDayAndDate = (dateStr: string) => {
    if (!dateStr) return '';
    try {
      const parts = dateStr.split('-');
      const d = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return d.toLocaleDateString('en-US', {
        weekday: 'long',
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  useEffect(() => {
    // Load student profile details from Supabase if not present
    const loadProfile = async () => {
      if (isSupabaseConfigured && studentId && !studentId.startsWith('student-')) {
        try {
          const { data: student } = await supabase
            .from('students')
            .select('full_name, email, mobile, college')
            .eq('id', studentId)
            .maybeSingle();

          if (student) {
            setStudentInfo({
              name: student.full_name || studentInfo.name,
              email: student.email || studentInfo.email,
              mobile: student.mobile || studentInfo.mobile,
              college: student.college || studentInfo.college,
            });
          }
        } catch {}

        // Resolve real bootcamp ID for domain if possible
        try {
          const bc = await getBootcampForDomain(domainId);
          if (bc?.id) {
            setResolvedBootcampId(bc.id);
          }
        } catch {}
      }
    };
    loadProfile();
  }, [studentId, domainId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const dayOfWeek = getDayNameOnly(preferredDate);
    const finalTiming = preferredTiming;
    const combinedSchedule = `Start Date: ${preferredDate} (${dayOfWeek}) • Timing: ${finalTiming}`;

    try {
      if (isSupabaseConfigured && !studentId.startsWith('student-')) {
        try {
          await registerForBootcamp(
            resolvedBootcampId,
            studentId,
            quizResultId,
            finalTiming,
            learningGoal,
            {
              preferredBatch: combinedSchedule,
              mode,
              whatsappOptIn,
            }
          );
        } catch (dbErr: any) {
          console.warn('Bootcamp registration notice:', dbErr);
        }
      }

      try {
        const rawLeads = localStorage.getItem('hadescore_local_leads');
        if (rawLeads) {
          const leads = JSON.parse(rawLeads);
          const found = leads.find((l: any) => l.student_id === studentId || l.student?.email === studentInfo.email);
          if (found) {
            found.has_registered_bootcamp = true;
            found.lead_score = Math.max(found.lead_score, 85);
            found.lead_status = 'HOT';
            localStorage.setItem('hadescore_local_leads', JSON.stringify(leads));
          }
        }
      } catch {}

      toast({
        title: 'Bootcamp Registered! 🎉',
        description: 'Your seat has been reserved. Check your confirmation details.',
        variant: 'success',
      });

      navigate('/success', {
        state: {
          isBootcampRegistration: true,
          studentName: studentInfo.name,
          bootcampName,
          date: preferredDate,
          days: dayOfWeek,
          batch: `${getFormattedDayAndDate(preferredDate)}`,
          timing: finalTiming,
          mode: mode === 'online' ? 'Online (Live Interactive)' : 'Offline Classroom',
          domainName,
        },
      });
    } catch (err: any) {
      toast({
        title: 'Registration note',
        description: err.message || 'Continuing to confirmation...',
        variant: 'default',
      });
      navigate('/success', {
        state: {
          isBootcampRegistration: true,
          studentName: studentInfo.name,
          bootcampName,
          date: preferredDate,
          days: dayOfWeek,
          batch: `${getFormattedDayAndDate(preferredDate)}`,
          timing: finalTiming,
          mode: mode === 'online' ? 'Online (Live Interactive)' : 'Offline Classroom',
          domainName,
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 py-10 sm:py-16">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* Back Link */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-600 mb-6 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Result
        </button>

        {/* Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-indigo-100/30 overflow-hidden">
          
          {/* Card Header Banner */}
          <div className="bg-gradient-to-r from-[#0b1c38] via-[#092b5e] to-[#041226] p-6 sm:p-8 text-white relative">
            <div className="flex items-center gap-2 mb-3">
              <img src="/logo.png" alt="Hadescore" className="w-5 h-5 object-contain" />
              <span className="font-display font-black text-xs sm:text-sm tracking-tight">
                <span className="text-[#00D8F6]">HADES</span><span className="text-white">CORE</span> <span className="text-[#00D8F6]">PVT LTD</span>
              </span>
              <span className="text-white/30">•</span>
              <span className="text-[10px] text-white/70 uppercase tracking-widest">
                Learn | Build | Grow
              </span>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/20 p-2 shrink-0 flex items-center justify-center">
                <img
                  src={getDomainIconPath(domainSlug || domainName, undefined)}
                  alt={domainName}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/domains/default.svg';
                  }}
                />
              </div>
              <div>
                <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-white mb-1.5">
                  Join the Free {domainName} Bootcamp
                </h1>
                <p className="text-gray-300 text-xs sm:text-sm">
                  We already have your verified profile! Simply pick your schedule preferences to reserve your free seat.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">

            {/* ── 1. PRE-FILLED STUDENT PROFILE (READ-ONLY BADGES) ── */}
            <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  Verified Student Profile
                </span>
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100/80 px-2.5 py-0.5 rounded-full">
                  ✓ Pre-filled
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-500">Student Name:</span>
                  <div className="font-semibold text-gray-900 mt-0.5">{studentInfo.name}</div>
                </div>
                <div>
                  <span className="text-gray-500">Email:</span>
                  <div className="font-semibold text-gray-900 mt-0.5 truncate">{studentInfo.email}</div>
                </div>
                {studentInfo.mobile && (
                  <div>
                    <span className="text-gray-500">Phone:</span>
                    <div className="font-semibold text-gray-900 mt-0.5">{studentInfo.mobile}</div>
                  </div>
                )}
                {studentInfo.college && (
                  <div>
                    <span className="text-gray-500">College:</span>
                    <div className="font-semibold text-gray-900 mt-0.5 truncate">{studentInfo.college}</div>
                  </div>
                )}
              </div>
            </div>



            {/* ── 5. WHATSAPP CONSENT ───────────────────────────── */}
            <div className="pt-2">
              <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-100 cursor-pointer">
                <input
                  type="checkbox"
                  checked={whatsappOptIn}
                  onChange={(e) => setWhatsappOptIn(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded mt-0.5 cursor-pointer accent-emerald-600"
                />
                <div className="text-xs text-emerald-950">
                  <span className="font-bold flex items-center gap-1.5 mb-0.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-700" />
                    Instant WhatsApp Notifications & Study Group Invite
                  </span>
                  Receive your Zoom meeting links, live schedule alerts, and mentor code repositories directly on WhatsApp.
                </div>
              </label>
            </div>

            {/* ── SUBMIT BUTTON ─────────────────────────────────── */}
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="w-full h-13 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-xl shadow-lg shadow-brand-500/20 gap-2 cursor-pointer transition-all"
              id="submit-bootcamp-registration-btn"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Reserving Your Free Seat...
                </>
              ) : (
                <>
                  Register for Free Bootcamp 🚀
                </>
              )}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}
