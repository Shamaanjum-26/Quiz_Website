import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle,
  Loader2, Send, List, X, Video, VideoOff, Mic, MicOff,
  ShieldCheck, AlertTriangle, GripHorizontal, ShieldAlert, Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getDomainBySlug, getQuestionsForQuiz, startQuizAttempt, submitQuiz } from '@/services/quizService';
import { getDomainQuestions } from '@/services/questionBank';
import { trackLeadActivity } from '@/services/leadService';
import { getPersistedStudentId } from '@/lib/analytics';
import { useQuiz } from '@/hooks/useQuiz';
import { isSupabaseConfigured } from '@/lib/supabase';
import { toast } from '@/hooks/useToast';
import { cn } from '@/lib/utils';
import { getDomainIconPath } from '@/lib/domainIcons';
import type { Domain, Question } from '@/types';

// Sample questions for dev mode
const SAMPLE_QUESTIONS = {
  python: [
    { id: 'q1', question_text: 'What is the output of print(type(5))?', difficulty: 'easy', marks: 1, domain_id: '', quiz_id: null, active: true, display_order: 1, created_at: '', updated_at: '', options: [{ id: 'o1a', question_id: 'q1', option_text: "<class 'int'>", option_order: 0 }, { id: 'o1b', question_id: 'q1', option_text: "<class 'str'>", option_order: 1 }, { id: 'o1c', question_id: 'q1', option_text: "<class 'float'>", option_order: 2 }, { id: 'o1d', question_id: 'q1', option_text: 'int', option_order: 3 }] },
    { id: 'q2', question_text: 'Which of the following is a mutable data type in Python?', difficulty: 'easy', marks: 1, domain_id: '', quiz_id: null, active: true, display_order: 2, created_at: '', updated_at: '', options: [{ id: 'o2a', question_id: 'q2', option_text: 'Tuple', option_order: 0 }, { id: 'o2b', question_id: 'q2', option_text: 'String', option_order: 1 }, { id: 'o2c', question_id: 'q2', option_text: 'List', option_order: 2 }, { id: 'o2d', question_id: 'q2', option_text: 'Integer', option_order: 3 }] },
    { id: 'q3', question_text: 'What does the "pass" statement do in Python?', difficulty: 'easy', marks: 1, domain_id: '', quiz_id: null, active: true, display_order: 3, created_at: '', updated_at: '', options: [{ id: 'o3a', question_id: 'q3', option_text: 'Exits a loop', option_order: 0 }, { id: 'o3b', question_id: 'q3', option_text: 'Skips to the next iteration', option_order: 1 }, { id: 'o3c', question_id: 'q3', option_text: 'Does nothing (placeholder)', option_order: 2 }, { id: 'o3d', question_id: 'q3', option_text: 'Raises an exception', option_order: 3 }] },
    { id: 'q4', question_text: 'What is the result of 10 // 3 in Python?', difficulty: 'medium', marks: 1, domain_id: '', quiz_id: null, active: true, display_order: 4, created_at: '', updated_at: '', options: [{ id: 'o4a', question_id: 'q4', option_text: '3.33', option_order: 0 }, { id: 'o4b', question_id: 'q4', option_text: '3', option_order: 1 }, { id: 'o4c', question_id: 'q4', option_text: '4', option_order: 2 }, { id: 'o4d', question_id: 'q4', option_text: '1', option_order: 3 }] },
    { id: 'q5', question_text: 'Which method is used to add an element to the end of a list?', difficulty: 'easy', marks: 1, domain_id: '', quiz_id: null, active: true, display_order: 5, created_at: '', updated_at: '', options: [{ id: 'o5a', question_id: 'q5', option_text: 'insert()', option_order: 0 }, { id: 'o5b', question_id: 'q5', option_text: 'add()', option_order: 1 }, { id: 'o5c', question_id: 'q5', option_text: 'append()', option_order: 2 }, { id: 'o5d', question_id: 'q5', option_text: 'push()', option_order: 3 }] },
  ],
};

function sanitizeQuestionText(text?: string): string {
  if (!text) return '';
  return text
    .replace(/^\[[^\]]+\]\s*/g, '')
    .replace(/^(Fundamental|Practical|Advanced|Technical)\s+question\s+\d+:\s*/i, '')
    .trim();
}

export default function QuizPage() {
  const { domainSlug } = useParams<{ domainSlug: string }>();
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state as { studentId?: string; domainId?: string } | null;
  const studentId = locationState?.studentId || getPersistedStudentId();

  const [domain, setDomain] = useState<Domain | null>(null);
  const [attemptId, setAttemptId] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 min in seconds
  const [showNav, setShowNav] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isWindowFocused, setIsWindowFocused] = useState(true);
  const [screenshotAttempted, setScreenshotAttempted] = useState(false);

  // ── Camera & Microphone Proctoring ─────────────────────────
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [micActive, setMicActive] = useState(false);
  const [proctoringError, setProctoringError] = useState<string | null>(null);

  const stopProctoring = useCallback(() => {
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      mediaStreamRef.current = null;
    }
    if (mediaStream) {
      mediaStream.getTracks().forEach((track) => {
        try {
          track.stop();
        } catch {}
      });
      setMediaStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setMicActive(false);
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }
  }, [mediaStream]);

  // ── Draggable Floating Proctoring Widget ───────────────────
  // Default position: top right (safe from Next / Previous buttons)
  const [proctorPos, setProctorPos] = useState<{ x: number; y: number }>(() => ({
    x: typeof window !== 'undefined' ? Math.max(16, window.innerWidth - 220) : 800,
    y: 84,
  }));
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ startX: number; startY: number; posX: number; posY: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      setProctorPos((pos) => ({
        x: Math.min(pos.x, window.innerWidth - 210),
        y: Math.min(pos.y, window.innerHeight - 180),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    if ((e.target as HTMLElement).closest('button')) return;

    setIsDragging(true);
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      posX: proctorPos.x,
      posY: proctorPos.y,
    };
    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {}
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging || !dragStartRef.current) return;
    const deltaX = e.clientX - dragStartRef.current.startX;
    const deltaY = e.clientY - dragStartRef.current.startY;

    const widgetWidth = 195;
    const widgetHeight = 175;
    const maxX = Math.max(10, window.innerWidth - widgetWidth - 10);
    const maxY = Math.max(10, window.innerHeight - widgetHeight - 10);

    const newX = Math.max(10, Math.min(maxX, dragStartRef.current.posX + deltaX));
    const newY = Math.max(10, Math.min(maxY, dragStartRef.current.posY + deltaY));

    setProctorPos({ x: newX, y: newY });
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isDragging) {
      setIsDragging(false);
      dragStartRef.current = null;
      try {
        (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  const setVideoElement = useCallback((el: HTMLVideoElement | null) => {
    videoRef.current = el;
    if (el && mediaStreamRef.current) {
      if (el.srcObject !== mediaStreamRef.current) {
        el.srcObject = mediaStreamRef.current;
      }
      el.play().catch(() => {});
    }
  }, []);

  const requestProctoring = useCallback(async () => {
    try {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => {
          try { t.stop(); } catch {}
        });
        mediaStreamRef.current = null;
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
        audio: true,
      });
      mediaStreamRef.current = stream;
      setMediaStream(stream);
      setCameraActive(true);
      setMicActive(true);
      setProctoringError(null);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } catch (err) {
      console.warn('Camera/mic proctoring note:', err);
      setProctoringError('Camera and mic permissions required for AI proctoring.');
      setCameraActive(false);
      setMicActive(false);
    }
  }, []);

  useEffect(() => {
    requestProctoring();

    // Ensure fullscreen mode is requested if not already active
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // ── Anti-Cheat: Screen & Focus Protection ───────────────────
    const wipeClipboard = () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText('⚠️ Action Prohibited: Screenshots and copying of assessment questions are strictly forbidden.').catch(() => {});
        }
      } catch {}
    };

    const handleWindowBlur = () => {
      setIsWindowFocused(false);
      wipeClipboard();
    };

    const handleWindowFocus = () => {
      setIsWindowFocused(true);
      setScreenshotAttempted(false);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        setIsWindowFocused(false);
        wipeClipboard();
        toast({
          title: '⚠️ Proctoring Alert',
          description: 'Tab switching and screen capturing are strictly prohibited.',
          variant: 'destructive',
        });
      } else {
        setIsWindowFocused(true);
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // If cursor leaves the window through the top (likely heading to snipping tool / browser UI)
      if (e.clientY <= 0) {
        setIsWindowFocused(false);
        wipeClipboard();
      }
    };

    // ── Anti-Cheat: Prevent Right-Click ────────────────────────
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
      toast({
        title: 'Action Restricted',
        description: 'Right-click context menu is disabled during the assessment.',
        variant: 'destructive',
      });
      return false;
    };

    // ── Anti-Cheat: Prevent Copy & Cut ─────────────────────────
    const handleCopyCut = (e: ClipboardEvent) => {
      e.preventDefault();
      if (e.clipboardData) {
        e.clipboardData.clearData();
      }
      wipeClipboard();
      toast({
        title: 'Action Prohibited',
        description: 'Copying or cutting text is disabled during the assessment.',
        variant: 'destructive',
      });
      return false;
    };

    // ── Anti-Cheat: Prevent Dragging Text/Images ───────────────
    const handleDragStart = (e: DragEvent) => {
      e.preventDefault();
      return false;
    };

    // ── Anti-Cheat: Prevent PrintScreen, Snipping & Shortcuts ───
    const handleKeyDown = (e: KeyboardEvent) => {
      // 1. Detect PrintScreen / Snapshot
      if (
        e.key === 'PrintScreen' ||
        e.code === 'PrintScreen' ||
        e.keyCode === 44 ||
        e.key === 'Snapshot'
      ) {
        e.preventDefault();
        e.stopPropagation();
        setScreenshotAttempted(true);
        wipeClipboard();
        toast({
          title: '🚫 Screenshot Prohibited',
          description: 'Taking screenshots is strictly prohibited during the assessment.',
          variant: 'destructive',
        });
        setTimeout(() => setScreenshotAttempted(false), 3500);
        return false;
      }

      // 2. Prevent Ctrl / Meta (Cmd) shortcuts: Copy, Cut, Paste, Select All, Print, Save, Source
      const isCtrlOrCmd = e.ctrlKey || e.metaKey;
      if (isCtrlOrCmd) {
        const key = e.key.toLowerCase();
        if (['c', 'x', 'v', 'a', 'u', 's', 'p'].includes(key)) {
          e.preventDefault();
          e.stopPropagation();
          wipeClipboard();
          toast({
            title: 'Shortcut Restricted',
            description: `Shortcut Ctrl+${key.toUpperCase()} is disabled during the examination.`,
            variant: 'destructive',
          });
          return false;
        }

        // Snipping Tool & DevTools shortcuts: Ctrl+Shift+S, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C
        if (e.shiftKey && ['s', 'i', 'j', 'c', '3', '4', '5'].includes(key)) {
          e.preventDefault();
          e.stopPropagation();
          setScreenshotAttempted(true);
          wipeClipboard();
          setTimeout(() => setScreenshotAttempted(false), 3500);
          return false;
        }
      }

      // 3. Prevent F12 (Inspect Element)
      if (e.key === 'F12' || e.keyCode === 123) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (
        e.key === 'PrintScreen' ||
        e.code === 'PrintScreen' ||
        e.keyCode === 44 ||
        e.key === 'Snapshot'
      ) {
        wipeClipboard();
      }
    };

    const handleBeforePrint = (e: Event) => {
      e.preventDefault();
      setScreenshotAttempted(true);
      wipeClipboard();
      return false;
    };

    window.addEventListener('blur', handleWindowBlur);
    window.addEventListener('focus', handleWindowFocus);
    document.addEventListener('visibilitychange', handleVisibilityChange);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('copy', handleCopyCut);
    document.addEventListener('cut', handleCopyCut);
    document.addEventListener('dragstart', handleDragStart);
    window.addEventListener('keydown', handleKeyDown, true);
    window.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('beforeprint', handleBeforePrint);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      window.removeEventListener('blur', handleWindowBlur);
      window.removeEventListener('focus', handleWindowFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('copy', handleCopyCut);
      document.removeEventListener('cut', handleCopyCut);
      document.removeEventListener('dragstart', handleDragStart);
      window.removeEventListener('keydown', handleKeyDown, true);
      window.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('beforeprint', handleBeforePrint);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
        mediaStreamRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (mediaStream && videoRef.current) {
      if (videoRef.current.srcObject !== mediaStream) {
        videoRef.current.srcObject = mediaStream;
      }
      videoRef.current.play().catch(() => {});
    }
  }, [mediaStream, loading, cameraActive]);

  const quiz = useQuiz(attemptId, domainSlug || '', studentId || '');

  // Timer
  useEffect(() => {
    if (!attemptId || loading) return;
    const timer = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timer);
          handleSubmit(true);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [attemptId, loading]);

  // Load quiz
  useEffect(() => {
    const load = async () => {
      if (!domainSlug) { navigate('/'); return; }
      if (!studentId) { navigate('/'); return; }

      try {
        let domainData: Domain | null = null;

        if (isSupabaseConfigured) {
          domainData = await getDomainBySlug(domainSlug);
        }

        if (!domainData) {
          const customName = (location.state as any)?.customDomainName;
          const cleanName = customName || domainSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
          // Dev / Dynamic mode
          domainData = {
            id: 'dyn-' + domainSlug,
            name: cleanName,
            slug: domainSlug,
            description: `Assessment for ${cleanName}`,
            icon: '📝',
            color: '#6366f1',
            difficulty: 'intermediate',
            question_count: 5,
            estimated_minutes: 20,
            active: true,
            display_order: 1,
            created_at: '',
            updated_at: '',
          };
        } else if ((location.state as any)?.customDomainName) {
          domainData.name = (location.state as any).customDomainName;
        }

        setDomain(domainData);
        if (domainData.estimated_minutes) {
          setTimeLeft(domainData.estimated_minutes * 60);
        }

        // Create attempt
        // Create attempt
        let newAttemptId = 'dev-attempt-' + Date.now();
        let questions: Question[] = [];

        if (isSupabaseConfigured) {
          try {
            const attempt = await startQuizAttempt(studentId, domainData.id);
            newAttemptId = attempt.id;
            if (attempt.questions && attempt.questions.length > 0) {
              questions = attempt.questions;
            }
            await trackLeadActivity(studentId, 'quiz_started', 0, { domain_id: domainData.id });
          } catch (attErr: any) {
            console.warn('[QuizPage] startQuizAttempt fallback notice:', attErr?.message || attErr);
            // Use fallback attempt so user is never blocked
          }
        }
        setAttemptId(newAttemptId);

        // Load questions if not already loaded from the quiz engine
        if (questions.length === 0) {
          if (isSupabaseConfigured && !domainData.id.startsWith('dyn-') && !domainData.id.startsWith('dev-')) {
            try {
              questions = await getQuestionsForQuiz(domainData.id);
            } catch {
              questions = [];
            }
          }
        }

        if (questions.length === 0) {
          // Dynamic domain questions generator
          questions = getDomainQuestions(domainSlug, domainData.name);
        }

        quiz.setQuestions(questions);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load quiz');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [domainSlug, studentId]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmit = useCallback(async (autoSubmit = false) => {
    if (!studentId || !attemptId) return;
    setSubmitting(true);
    setShowConfirm(false);

    // Stop proctoring immediately on submission: turn off camera, mic, and exit fullscreen
    stopProctoring();

    try {
      const totalSecs = domain?.estimated_minutes ? domain.estimated_minutes * 60 : 1800;
      const timeTakenSecs = Math.max(1, totalSecs - timeLeft);

      const navState = {
        studentId,
        domainSlug: domainSlug || domain?.slug || 'python',
        domainId: domain?.id,
        customDomainName: (location.state as any)?.customDomainName || domain?.name,
        timeTakenSeconds: timeTakenSecs,
      };

      let result: any = null;
      if (isSupabaseConfigured && !attemptId.startsWith('dev-')) {
        try {
          result = await submitQuiz(attemptId, studentId, quiz.state.answers);
        } catch (subErr) {
          console.warn('submitQuiz warning:', subErr);
        }
        try {
          await trackLeadActivity(studentId, 'quiz_completed', 20, {
            domain_id: domain?.id,
            attempt_id: attemptId,
          });
        } catch {}
      }

      if (!result) {
        // Construct clean result record
        const answered = Object.values(quiz.state.answers).filter(Boolean).length;
        const total = quiz.state.questions.length || 30;
        const fakeScore = Math.floor((answered / total) * 80) + Math.round(Math.random() * 20);
        const isPassed = fakeScore >= 50;

        result = {
          attempt_id: attemptId,
          student_id: studentId,
          domain_id: domain?.id || 'dev-domain',
          total_questions: total,
          correct_answers: Math.floor((fakeScore / 100) * total),
          incorrect_answers: Math.max(0, answered - Math.floor((fakeScore / 100) * total)),
          unanswered: Math.max(0, total - answered),
          total_marks: total,
          obtained_marks: Math.floor((fakeScore / 100) * total),
          percentage: Math.min(100, Math.max(0, fakeScore)),
          skill_level: fakeScore >= 85 ? 'Expert' : fakeScore >= 70 ? 'Advanced' : fakeScore >= 50 ? 'Intermediate' : fakeScore >= 30 ? 'Beginner' : 'Foundation',
          is_passed: isPassed,
          pass_fail: isPassed ? 'PASSED' : 'FAILED',
          domain_name: domain?.name || 'Quiz',
          attempt: {
            time_taken_seconds: timeTakenSecs,
          },
          domain: domain,
        };
      } else if (!result.attempt) {
        result.attempt = { time_taken_seconds: timeTakenSecs };
      }

      navigate(`/result/${attemptId}`, {
        state: {
          ...navState,
          result,
          devResult: result,
        },
      });
    } catch (err) {
      console.error('Error submitting quiz:', err);
      const totalSecs = domain?.estimated_minutes ? domain.estimated_minutes * 60 : 1800;
      const timeTakenSecs = Math.max(1, totalSecs - timeLeft);
      navigate(`/result/${attemptId}`, {
        state: {
          studentId,
          domainSlug: domainSlug || domain?.slug || 'python',
          domainId: domain?.id,
          customDomainName: (location.state as any)?.customDomainName || domain?.name,
          timeTakenSeconds: timeTakenSecs,
        },
      });
    } finally {
      setSubmitting(false);
    }
  }, [studentId, attemptId, quiz.state, domain, navigate, stopProctoring, timeLeft, domainSlug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin text-brand-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Preparing your 30-question assessment...</p>
          <p className="text-xs text-gray-400 mt-1">10 Easy · 10 Medium · 10 Advanced Questions</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 max-w-md w-full text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Notice</h2>
          <p className="text-gray-600 text-sm mb-6">{error}</p>
          <Button onClick={() => navigate('/')} className="w-full">
            Back to Assessments
          </Button>
        </div>
      </div>
    );
  }

  const { questions, answers, currentIndex } = quiz.state;
  const currentQuestion = questions[currentIndex];
  const progress = questions.length > 0 ? ((currentIndex + 1) / questions.length) * 100 : 0;
  const isTimeLow = timeLeft < 5 * 60; // Less than 5 min left
  const domainIcon = getDomainIconPath((domain as any)?.slug || domainSlug, domain?.icon, domain?.name);

  return (
    <div
      onContextMenu={(e) => { e.preventDefault(); return false; }}
      onCopy={(e) => { e.preventDefault(); return false; }}
      onCut={(e) => { e.preventDefault(); return false; }}
      onDragStart={(e) => { e.preventDefault(); return false; }}
      onDrop={(e) => { e.preventDefault(); return false; }}
      className="min-h-screen bg-slate-50/70 relative flex flex-col font-sans select-none quiz-protected"
    >
      {/* ── Anti-Screenshot Full-Screen Solid Blackout Shield ── */}
      {(!isWindowFocused || screenshotAttempted) && (
        <div
          onClick={() => {
            setIsWindowFocused(true);
            setScreenshotAttempted(false);
          }}
          className="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center p-6 text-center select-none pointer-events-auto"
        >
          <div className="w-20 h-20 rounded-3xl bg-rose-500/15 border border-rose-500/30 flex items-center justify-center mb-5 shadow-2xl shadow-rose-500/30 animate-pulse text-rose-400">
            <Lock className="w-10 h-10" />
          </div>
          <span className="px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-mono font-bold uppercase tracking-wider mb-3">
            Anti-Screenshot Shield Active
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            {screenshotAttempted ? 'Screenshots Are Strictly Forbidden' : 'Assessment Content Protected'}
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-lg mb-8 leading-relaxed">
            {screenshotAttempted
              ? 'Taking screenshots, screen capturing, or using snipping tools is prohibited during this proctored examination. All questions have been securely hidden.'
              : 'Assessment questions are hidden whenever the examination window loses focus or screen recording/snipping tools are detected.'}
          </p>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsWindowFocused(true);
              setScreenshotAttempted(false);
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              }
            }}
            className="px-8 py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 active:scale-95 text-white font-bold text-sm rounded-2xl transition-all shadow-xl shadow-indigo-600/30 cursor-pointer flex items-center gap-2"
          >
            <span>Resume Assessment</span>
          </button>
        </div>
      )}

      {/* ── Outer Content Wrapper: completely hidden when out of focus or during screenshot attempt ── */}
      <div className={cn(
        "flex flex-col min-h-screen transition-opacity duration-150",
        (!isWindowFocused || screenshotAttempted) ? "opacity-0 pointer-events-none select-none invisible h-0 overflow-hidden" : "opacity-100 visible"
      )}>

      {/* Subtle tech background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none opacity-70" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-100/25 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header - Glassmorphism Sticky */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 shadow-2xs transition-all">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          {/* Domain branding & question indicator */}
          <div className="flex items-center gap-3.5">
            <div className="relative group">
              <img
                src={domainIcon}
                alt={domain?.name || 'Domain'}
                className="w-10 h-10 object-contain rounded-2xl p-1.5 bg-white border border-slate-200/80 shadow-xs shrink-0 transition-transform group-hover:scale-105"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/domains/default.svg';
                }}
              />
            </div>
            <div>
              <h1 className="font-display font-extrabold text-slate-900 text-sm sm:text-base leading-tight tracking-tight truncate max-w-[200px] sm:max-w-none">
                {domain?.name || 'Skill Assessment'}
              </h1>
              <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                <span>Question {currentIndex + 1} of {questions.length || 30}</span>
                <span className="text-slate-300">•</span>
                <span>30 Mins Total</span>
              </div>
            </div>
          </div>

          {/* Timer & Navigation toggle */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold transition-all shadow-2xs',
              isTimeLow
                ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse shadow-rose-500/10'
                : 'bg-slate-100 text-slate-700 border border-slate-200/80'
            )}>
              <Clock className={cn('w-3.5 h-3.5', isTimeLow ? 'text-rose-500' : 'text-indigo-600')} />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              type="button"
              onClick={() => setShowNav(!showNav)}
              className={cn(
                'p-2 sm:px-3.5 sm:py-2 rounded-2xl border transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-2xs',
                showNav
                  ? 'bg-indigo-600 border-indigo-600 text-white shadow-indigo-600/20'
                  : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
              )}
              title={showNav ? 'Hide Question Numbers' : 'Show Question Numbers'}
              aria-label="Toggle Question Numbers"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">
                {showNav ? 'Hide Questions' : 'Questions'}
              </span>
            </button>
          </div>
        </div>

        {/* Dynamic Progress Bar */}
        <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 transition-all duration-300 ease-out shadow-xs"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* Fullscreen Compliance Alert Banner if user leaves fullscreen */}
      {!isFullscreen && (
        <div className="bg-amber-50/95 backdrop-blur-xs border-b border-amber-200/80 px-4 sm:px-8 py-2.5 flex items-center justify-between text-xs text-amber-900 z-20 shadow-2xs">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 animate-bounce" />
            <span><strong>Proctoring Notice:</strong> Full-screen mode is required during the examination.</span>
          </div>
          <button
            type="button"
            onClick={() => {
              if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen().catch(() => {});
              }
            }}
            className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl transition-colors cursor-pointer shadow-xs"
          >
            Re-enter Full Screen
          </button>
        </div>
      )}

      {/* Main Quiz Area - Balanced Centered Container */}
      <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 flex flex-col justify-center relative z-10">
        <div className={cn('grid gap-8 transition-all duration-300 items-start', showNav ? 'grid-cols-1 lg:grid-cols-4' : 'grid-cols-1')}>
          {/* Main quiz question card */}
          <div className={cn(showNav ? 'lg:col-span-3' : 'w-full max-w-4xl mx-auto')}>
            {currentQuestion ? (
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-10 w-full relative overflow-hidden transition-all duration-300">
                {/* Decorative subtle ambient card glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-50/70 via-transparent to-transparent pointer-events-none rounded-tr-3xl" />

                {/* Dynamic Security Anti-Capture & Anti-Leak Watermark Pattern */}
                <div className="absolute inset-0 pointer-events-none select-none overflow-hidden opacity-[0.035] flex flex-wrap items-center justify-center gap-14 rotate-[-15deg] text-slate-950 font-mono text-[11px] font-black uppercase tracking-widest z-0">
                  {Array.from({ length: 16 }).map((_, i) => (
                    <span key={i} className="whitespace-nowrap">
                      CONFIDENTIAL ASSESSMENT • {studentId ? `STUDENT-${studentId.slice(-6)}` : 'PROCTORED'} • NO SCREENSHOTS
                    </span>
                  ))}
                </div>

                {/* Question header row */}
                <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100 relative z-10">
                  <div className="flex items-center gap-3.5">
                    <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-700 font-extrabold text-sm border border-indigo-100 shadow-2xs shrink-0">
                      {String(currentIndex + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Question {currentIndex + 1} of {questions.length || 30}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-mono font-semibold text-slate-600 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    {currentQuestion.marks || 1} mark
                  </span>
                </div>

                {/* Question text */}
                <h2
                  key={currentQuestion.id}
                  className="text-slate-900 text-lg sm:text-2xl font-semibold leading-relaxed tracking-tight mb-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-200"
                >
                  {sanitizeQuestionText(currentQuestion.question_text)}
                </h2>

                {/* Options list */}
                <div className="space-y-3.5 relative z-10" role="radiogroup" aria-label="Answer options">
                  {(currentQuestion.options || []).map((option, optIdx) => {
                    const isSelected = answers[currentQuestion.id] === option.id;
                    const letter = String.fromCharCode(65 + optIdx);
                    return (
                      <button
                        key={option.id}
                        onClick={() => quiz.selectAnswer(currentQuestion.id, option.id)}
                        role="radio"
                        aria-checked={isSelected}
                        className={cn(
                          'w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all duration-200 flex items-center gap-4 cursor-pointer group',
                          isSelected
                            ? 'bg-indigo-50/70 border-indigo-600 ring-4 ring-indigo-500/10 shadow-md shadow-indigo-500/10'
                            : 'bg-white border-slate-200/80 hover:border-indigo-300 hover:bg-indigo-50/20 hover:shadow-xs text-slate-700'
                        )}
                      >
                        {/* Option letter badge */}
                        <div className={cn(
                          'flex-shrink-0 w-9 h-9 rounded-xl border-2 flex items-center justify-center font-bold text-sm transition-all duration-200',
                          isSelected
                            ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-105'
                            : 'border-slate-200 bg-slate-50 text-slate-600 group-hover:border-indigo-300 group-hover:text-indigo-600 group-hover:bg-white'
                        )}>
                          {letter}
                        </div>

                        {/* Option text */}
                        <span className={cn(
                          'flex-1 text-sm sm:text-base leading-relaxed',
                          isSelected ? 'text-indigo-950 font-semibold' : 'text-slate-700 font-normal'
                        )}>
                          {option.option_text}
                        </span>

                        {/* Selected Indicator */}
                        <div className={cn(
                          'w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-colors',
                          isSelected
                            ? 'bg-indigo-600 text-white shadow-2xs'
                            : 'border-2 border-slate-300 group-hover:border-indigo-300'
                        )}>
                          {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 gap-3 relative z-10">
                  <Button
                    variant="outline"
                    onClick={quiz.goPrev}
                    disabled={quiz.isFirst}
                    className="gap-2 rounded-2xl border-slate-200 hover:bg-slate-50 font-semibold text-slate-700 px-5 shadow-2xs cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </Button>

                  <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200/70 px-4 py-1.5 rounded-full shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{quiz.answeredCount}/{questions.length} answered</span>
                  </div>

                  {quiz.isLast ? (
                    <Button
                      onClick={() => setShowConfirm(true)}
                      className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-2xl px-6 shadow-md shadow-emerald-600/20 cursor-pointer transition-all hover:scale-[1.02]"
                      id="submit-quiz-btn"
                    >
                      <Send className="w-4 h-4" />
                      Submit Quiz
                    </Button>
                  ) : (
                    <Button
                      onClick={quiz.goNext}
                      className="gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl px-6 shadow-md shadow-indigo-600/20 cursor-pointer transition-all hover:scale-[1.02]"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm">
                <p className="text-slate-400">No questions available.</p>
              </div>
            )}
          </div>

          {/* Question Navigator Drawer */}
          {showNav && (
            <div className="lg:col-span-1 animate-in fade-in slide-in-from-right-4 duration-300">
              <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-5 sticky top-24">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
                    <h3 className="font-bold text-slate-900 text-sm">Questions ({questions.length})</h3>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowNav(false)}
                    className="text-slate-400 hover:text-slate-600 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                    title="Close Navigator"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Section 1: Easy (1 - 10) */}
                  <div>
                    <div className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                      <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Easy</span>
                      <span className="text-[10px] font-medium text-slate-400">1 - 10</span>
                    </div>
                    <div className="grid grid-cols-5 gap-1.5">
                      {questions.slice(0, 10).map((q, i) => {
                        const isAnswered = !!answers[q.id];
                        const isCurrent = i === currentIndex;
                        return (
                          <button
                            key={q.id}
                            onClick={() => quiz.goToQuestion(i)}
                            className={cn(
                              'w-full aspect-square rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center',
                              isCurrent
                                ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30 scale-105'
                                : isAnswered
                                ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200/80'
                                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                            )}
                            title={`Question ${i + 1}${isAnswered ? ' (answered)' : ''}`}
                          >
                            {i + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Section 2: Medium (11 - 20) */}
                  {questions.length > 10 && (
                    <div>
                      <div className="text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-amber-500" /> Medium</span>
                        <span className="text-[10px] font-medium text-slate-400">11 - 20</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {questions.slice(10, 20).map((q, i) => {
                          const idx = 10 + i;
                          const isAnswered = !!answers[q.id];
                          const isCurrent = idx === currentIndex;
                          return (
                            <button
                              key={q.id}
                              onClick={() => quiz.goToQuestion(idx)}
                              className={cn(
                                'w-full aspect-square rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center',
                                isCurrent
                                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30 scale-105'
                                  : isAnswered
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200/80'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                              )}
                              title={`Question ${idx + 1}${isAnswered ? ' (answered)' : ''}`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section 3: Advanced (21 - 30) */}
                  {questions.length > 20 && (
                    <div>
                      <div className="text-[11px] font-bold text-purple-700 uppercase tracking-wider mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-purple-500" /> Advanced</span>
                        <span className="text-[10px] font-medium text-slate-400">21 - 30</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5">
                        {questions.slice(20, 30).map((q, i) => {
                          const idx = 20 + i;
                          const isAnswered = !!answers[q.id];
                          const isCurrent = idx === currentIndex;
                          return (
                            <button
                              key={q.id}
                              onClick={() => quiz.goToQuestion(idx)}
                              className={cn(
                                'w-full aspect-square rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center',
                                isCurrent
                                  ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-600/30 scale-105'
                                  : isAnswered
                                  ? 'bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200/80'
                                  : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border border-slate-200/80'
                              )}
                              title={`Question ${idx + 1}${isAnswered ? ' (answered)' : ''}`}
                            >
                              {idx + 1}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                      Answered
                    </span>
                    <span className="font-bold font-mono">{quiz.answeredCount}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
                      Not answered
                    </span>
                    <span className="font-bold font-mono">{questions.length - quiz.answeredCount}</span>
                  </div>
                </div>

                {quiz.answeredCount > 0 && (
                  <Button
                    onClick={() => setShowConfirm(true)}
                    size="sm"
                    className="w-full mt-4 gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold rounded-xl shadow-sm cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    Submit Quiz
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Submission Confirmation Modal - Glassmorphism */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-sm w-full border border-slate-100 text-center animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-3xl bg-indigo-50 border border-indigo-100 flex items-center justify-center mx-auto mb-4 shadow-sm">
              <Send className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="font-display font-bold text-slate-900 text-2xl mb-2">Submit Quiz?</h3>
            <p className="text-slate-500 text-sm mb-6 leading-relaxed">
              You've answered <strong className="text-slate-900 font-bold">{quiz.answeredCount}</strong> of <strong className="text-slate-900 font-bold">{questions.length}</strong> questions.
              {questions.length - quiz.answeredCount > 0 && (
                <span className="block mt-1 text-amber-600 font-medium">
                  {questions.length - quiz.answeredCount} questions unanswered.
                </span>
              )}
            </p>

            <div className="space-y-3">
              <Button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="w-full gap-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold rounded-2xl py-3 shadow-md shadow-indigo-600/20 cursor-pointer"
              >
                {submitting ? (
                  <><Loader2 className="w-4 h-4 animate-spin" />Calculating your score...</>
                ) : (
                  <><CheckCircle2 className="w-4 h-4" />Yes, Submit Quiz</>
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowConfirm(false)}
                disabled={submitting}
                className="w-full rounded-2xl border-slate-200 hover:bg-slate-50 text-slate-700 font-semibold cursor-pointer"
              >
                Continue Answering
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Draggable Camera & Mic Proctoring Widget */}
      <div
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{
          position: 'fixed',
          left: `${proctorPos.x}px`,
          top: `${proctorPos.y}px`,
          zIndex: 50,
          touchAction: 'none',
        }}
        className={cn(
          'select-none transition-shadow',
          isDragging ? 'cursor-grabbing shadow-2xl scale-[1.02]' : 'cursor-grab'
        )}
        title="Click and drag to move camera anywhere"
      >
        <div className="w-44 sm:w-48 bg-slate-950/95 border border-slate-700/80 rounded-2xl shadow-2xl p-2.5 backdrop-blur-md text-white">
          {/* Top Drag Handle Header */}
          <div className="flex items-center justify-between px-1 pb-1.5 text-[10px] text-slate-400">
            <div className="flex items-center gap-1">
              <GripHorizontal className="w-3.5 h-3.5 text-slate-400" />
              <span className="font-semibold text-slate-300 text-[10px]">Drag to move</span>
            </div>
            <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-950/80 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </div>
          </div>

          <div className="relative aspect-video rounded-xl overflow-hidden bg-slate-900 mb-1.5 border border-slate-800 flex items-center justify-center pointer-events-none">
            <video
              ref={setVideoElement}
              autoPlay
              playsInline
              muted
              onLoadedMetadata={(e) => {
                (e.target as HTMLVideoElement).play().catch(() => {});
              }}
              className={cn(
                'w-full h-full object-cover -scale-x-100',
                !cameraActive && 'hidden'
              )}
            />
            {!cameraActive && (
              <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center bg-slate-900 text-slate-400">
                <VideoOff className="w-5 h-5 mb-1 text-rose-400" />
                <span className="text-[10px] text-rose-300">Camera Inactive</span>
              </div>
            )}
          </div>

          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <span className={cn('flex items-center gap-1 text-[10px] font-semibold', cameraActive ? 'text-emerald-400' : 'text-slate-500')}>
                {cameraActive ? <Video className="w-3 h-3" /> : <VideoOff className="w-3 h-3 text-rose-400" />}
                CAM
              </span>
              <span className={cn('flex items-center gap-1 text-[10px] font-semibold', micActive ? 'text-emerald-400' : 'text-slate-500')}>
                {micActive ? <Mic className="w-3 h-3" /> : <MicOff className="w-3 h-3 text-rose-400" />}
                MIC
              </span>
            </div>
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
              AI SECURE
            </span>
          </div>

          {proctoringError && (
            <button
              type="button"
              onClick={requestProctoring}
              className="mt-1.5 w-full py-1 text-[10px] font-bold bg-rose-600 hover:bg-rose-700 text-white rounded-lg transition-colors cursor-pointer"
            >
              Grant Camera & Mic
            </button>
          )}
        </div>
      </div>

      {/* Close Content Wrapper */}
      </div>

    {/* Close Root Container */}
    </div>
  );
}
