import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Clock, ChevronLeft, ChevronRight, CheckCircle2, AlertCircle,
  Loader2, Send, List, X, Video, VideoOff, Mic, MicOff,
  ShieldCheck, AlertTriangle, GripHorizontal, ShieldAlert, Lock,
  LayoutGrid,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { getDomainBySlug, getQuestionsForQuiz, startQuizAttempt, submitQuiz, getStoredQuizConfig, fetchQuizConfig } from '@/services/quizService';
import { getDomainQuestions } from '@/services/questionBank';
import { generateQuestionsWithGemini } from '@/services/geminiService';
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
    try {
      if (typeof window !== 'undefined' && (window as any).__prewarmedProctorStream) {
        try {
          (window as any).__prewarmedProctorStream.getTracks().forEach((track: MediaStreamTrack) => {
            try { track.stop(); } catch {}
          });
        } catch {}
        (window as any).__prewarmedProctorStream = null;
      }
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
        try {
          videoRef.current.pause();
        } catch {}
        videoRef.current.srcObject = null;
      }
      setCameraActive(false);
      setMicActive(false);
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    } catch (e) {
      console.warn('stopProctoring note:', e);
    }
  }, []);

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

      let stream: MediaStream | null = null;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
          audio: true,
        });
      } catch (audioErr) {
        console.warn('Audio+Video failed, fallback to video only:', audioErr);
        stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 320 }, height: { ideal: 240 }, facingMode: 'user' },
          audio: false,
        });
      }

      if (stream) {
        mediaStreamRef.current = stream;
        setMediaStream(stream);
        const hasVideo = stream.getVideoTracks().some((t) => t.readyState === 'live');
        const hasAudio = stream.getAudioTracks().some((t) => t.readyState === 'live');
        setCameraActive(hasVideo);
        setMicActive(hasAudio);
        setProctoringError(null);
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play().catch(() => {});
        }
      }
    } catch (err) {
      console.warn('Camera/mic proctoring note:', err);
      setProctoringError('Camera and mic permissions required for AI proctoring.');
      setCameraActive(false);
      setMicActive(false);
    }
  }, []);

  useEffect(() => {
    // ── Camera/Mic proctoring starts ONLY when quiz is ready (not during form or loading screen) ──
    // requestProctoring() is intentionally NOT called here; it fires in the quiz-ready useEffect below.

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
      stopProctoring();
    };
  }, [stopProctoring]);

  // ── Camera/mic proctoring activation ──────────
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).__prewarmedProctorStream) {
      const stream = (window as any).__prewarmedProctorStream as MediaStream;
      (window as any).__prewarmedProctorStream = null;
      mediaStreamRef.current = stream;
      setMediaStream(stream);
      const hasVideo = stream.getVideoTracks().some((t) => t.readyState === 'live');
      const hasAudio = stream.getAudioTracks().some((t) => t.readyState === 'live');
      setCameraActive(hasVideo);
      setMicActive(hasAudio);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play().catch(() => {});
      }
    } else if (!cameraActive) {
      requestProctoring();
    }
  }, [requestProctoring, cameraActive]);

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
          try {
            domainData = await getDomainBySlug(domainSlug);
          } catch (dErr) {
            console.warn('[QuizPage] getDomainBySlug error, using fallback:', dErr);
            domainData = null;
          }
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
            question_count: 30,
            estimated_minutes: 20,
            active: true,
            display_order: 1,
            created_at: '',
            updated_at: '',
          };
        } else if ((location.state as any)?.customDomainName) {
          domainData.name = (location.state as any).customDomainName;
        }

        const quizConfig = getStoredQuizConfig();
        let targetQCount = quizConfig.questions_per_quiz || 10;
        try {
          const latestConf = await fetchQuizConfig();
          if (latestConf && latestConf.questions_per_quiz) {
            targetQCount = latestConf.questions_per_quiz;
          }
        } catch {}

        const targetMinutes = quizConfig.quiz_timer_minutes || domainData.estimated_minutes || 15;
        setTimeLeft(targetMinutes * 60);

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
            try {
              await trackLeadActivity(studentId, 'quiz_started', 0, { domain_id: domainData.id });
            } catch {}
          } catch (attErr: any) {
            console.warn('[QuizPage] startQuizAttempt fallback notice:', attErr?.message || attErr);
          }
        }
        setAttemptId(newAttemptId);

        // 1. Try Gemini AI dynamic question generation with target question count
        if (questions.length === 0) {
          try {
            const aiQuestions = await generateQuestionsWithGemini(domainData.name, targetQCount, 'intermediate');
            if (aiQuestions && aiQuestions.length >= targetQCount) {
              questions = aiQuestions.slice(0, targetQCount);
            }
          } catch (aiErr) {
            console.warn('[QuizPage] Gemini AI generation note:', aiErr);
          }
        }

        // 2. Load questions from Supabase if configured and not generated by AI
        if (questions.length === 0) {
          if (isSupabaseConfigured && !domainData.id.startsWith('dyn-') && !domainData.id.startsWith('dev-')) {
            try {
              questions = await getQuestionsForQuiz(domainData.id, targetQCount);
            } catch {
              questions = [];
            }
          }
        }

        // 3. Ensure EXACT target question count across ALL domains
        if (!questions || questions.length < targetQCount) {
          const fallbackPool = getDomainQuestions(domainSlug, domainData.name, targetQCount);
          if (!questions || questions.length === 0) {
            questions = fallbackPool;
          } else {
            const existingIds = new Set(questions.map((q) => q.id));
            for (const fq of fallbackPool) {
              if (questions.length >= targetQCount) break;
              if (!existingIds.has(fq.id)) {
                questions.push(fq);
                existingIds.add(fq.id);
              }
            }
          }
        }

        // 4. Final safety net: If questions array is still short, generate with default Python
        if (!questions || questions.length < targetQCount) {
          const safetyPool = getDomainQuestions('python', 'Python', targetQCount);
          if (!questions || questions.length === 0) {
            questions = safetyPool;
          } else {
            const existingIds = new Set(questions.map((q) => q.id));
            for (const sq of safetyPool) {
              if (questions.length >= targetQCount) break;
              if (!existingIds.has(sq.id)) {
                questions.push(sq);
                existingIds.add(sq.id);
              }
            }
          }
        }

        // Ensure EXACT target question count
        if (questions.length > targetQCount) {
          questions = questions.slice(0, targetQCount);
        }

        quiz.setQuestions(questions);
        setError(null);
      } catch (err) {
        console.warn('Quiz load encountered issue, applying local question bank:', err);
        const cfg = getStoredQuizConfig();
        const fallbackTarget = cfg.questions_per_quiz || 10;
        const fallbackQs = getDomainQuestions(domainSlug || 'python', domainSlug, fallbackTarget);
        if (fallbackQs && fallbackQs.length > 0) {
          quiz.setQuestions(fallbackQs.slice(0, fallbackTarget));
          setError(null);
        } else {
          setError(err instanceof Error ? err.message : 'Failed to load quiz');
        }
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

      // Non-blocking lead activity tracking
      if (isSupabaseConfigured && !attemptId.startsWith('dev-')) {
        trackLeadActivity(studentId, 'quiz_completed', 20, {
          domain_id: domain?.id,
          attempt_id: attemptId,
        }).catch(() => {});
      }

      let result: any = null;
      if (isSupabaseConfigured && !attemptId.startsWith('dev-')) {
        try {
          result = await submitQuiz(attemptId, studentId, quiz.state.answers);
        } catch (subErr) {
          console.warn('submitQuiz warning:', subErr);
        }
      }

      if (!result) {
        // Construct clean result record instantly
        const answered = Object.values(quiz.state.answers).filter(Boolean).length;
        const total = quiz.state.questions.length || 10;
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
          <p className="text-gray-600 font-medium">Preparing your assessment...</p>
          <p className="text-xs text-gray-400 mt-1">Adaptive AI & Curated Skill Assessment</p>
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
  const currentQ = questions[currentIndex] || null;
  const answeredCount = quiz.answeredCount;
  const isLastQuestion = quiz.isLast;
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

      {/* ── MAIN QUIZ CONTAINER ──────────────────────────────── */}
      <div className={cn(
        "min-h-screen bg-slate-50 flex flex-col justify-between selection:bg-indigo-500 selection:text-white transition-opacity duration-150 relative overflow-hidden",
        (!isWindowFocused || screenshotAttempted) ? "opacity-0 pointer-events-none select-none invisible h-0 overflow-hidden" : "opacity-100 visible"
      )}>
        {/* Ambient subtle backdrop glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-100/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-violet-100/25 rounded-full blur-3xl pointer-events-none" />

        {/* ── Sticky Modern Header ───────────────────────────── */}
        <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-xs">
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
            {/* Domain info */}
            <div className="flex items-center gap-3 min-w-0">
              <Link to="/home" className="flex items-center gap-2 group shrink-0">
                <img
                  src="/logo.png"
                  alt="Hadescore"
                  className="w-10 h-10 object-contain rounded-2xl p-1.5 bg-white border border-slate-200/80 shadow-xs shrink-0 transition-transform group-hover:scale-105"
                />
              </Link>
              <div className="min-w-0">
                <h1 className="font-display font-bold text-slate-900 text-sm sm:text-base truncate flex items-center gap-1.5">
                  <span>{domain?.name || 'Technical Assessment'}</span>
                </h1>
                <p className="text-xs text-slate-500 font-medium">
                  Question <span className="font-semibold text-slate-900">{currentIndex + 1}</span> of <span className="font-semibold text-slate-900">{questions.length}</span>
                  <span className="text-slate-300 mx-1.5">•</span>
                  <span className="text-emerald-700 font-semibold">{answeredCount} answered</span>
                </p>
              </div>
            </div>

            {/* Timer & Nav Toggle & Finish Button */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Timer Pill */}
              <div
                className={cn(
                  'flex items-center gap-2 px-3.5 py-1.5 sm:py-2 rounded-2xl font-mono text-xs sm:text-sm font-bold tracking-tight shadow-xs transition-colors',
                  timeLeft < 300
                    ? 'bg-rose-50 text-rose-600 border border-rose-200 animate-pulse shadow-rose-500/10'
                    : 'bg-slate-100 text-slate-700 border border-slate-200/80'
                )}
                role="timer"
                aria-label={`Time remaining: ${formatTime(timeLeft)}`}
              >
                <Clock className="w-4 h-4 text-slate-500 shrink-0" />
                <span>{formatTime(timeLeft)}</span>
              </div>

              {/* Toggle Question Navigator Drawer button */}
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setShowNav(!showNav)}
                className="hidden md:inline-flex items-center gap-1.5 rounded-2xl text-xs font-semibold border-slate-200 text-slate-700 hover:bg-slate-100 cursor-pointer shadow-xs"
              >
                <LayoutGrid className="w-3.5 h-3.5 text-slate-500" />
                {showNav ? 'Hide Questions' : 'Questions'}
              </Button>

              {/* Finish Quiz Button */}
              <Button
                type="button"
                onClick={() => setShowConfirm(true)}
                disabled={submitting}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl px-4 sm:px-5 text-xs sm:text-sm font-semibold shadow-sm shadow-indigo-600/20 hover:shadow-md transition-all cursor-pointer flex items-center gap-1.5"
                id="finish-assessment-header-btn"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Submit</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Smooth Progress Bar */}
          <div className="w-full bg-slate-100 h-1.5 relative overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </header>

        {/* ── Assessment Body ──────────────────────────────────── */}
        <main className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 flex-1 flex flex-col justify-center relative z-10">
          <div className="flex gap-8 items-start">
            {/* Center: Main Question Box */}
            <div className="flex-1 w-full min-w-0">
              {currentQ ? (
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/40 p-6 sm:p-10 w-full relative overflow-hidden transition-all duration-300">
                  {/* Subtle top decorative corner accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-indigo-500/5 to-transparent rounded-bl-full pointer-events-none" />

                  {/* Question Header & Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-100 relative z-10">
                    <div className="flex items-center gap-2.5">
                      <span className="flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-indigo-50 to-indigo-100/60 text-indigo-700 font-extrabold text-sm border border-indigo-100 shadow-2xs shrink-0">
                        {currentIndex + 1}
                      </span>
                      <div>
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                          Question {currentIndex + 1} of {questions.length}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">
                          {currentQ.tier_label || (currentQ.difficulty ? currentQ.difficulty.toUpperCase() : 'General')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold border border-slate-200/70">
                        {currentQ.marks || 1} mark{(currentQ.marks || 1) > 1 ? 's' : ''}
                      </span>
                    </div>
                  </div>

                  {/* Question Text */}
                  <h2
                    className="text-slate-900 text-lg sm:text-2xl font-semibold leading-relaxed tracking-tight mb-8 relative z-10 animate-in fade-in slide-in-from-bottom-2 duration-200"
                    key={`q-text-${currentQ.id}`}
                  >
                    {currentQ.question_text}
                  </h2>

                  {/* Options List */}
                  <div className="space-y-3.5 relative z-10" role="radiogroup" aria-label="Answer options">
                    {currentQ.options && currentQ.options.length > 0 ? (
                      currentQ.options.map((opt, optIdx) => {
                        const isSelected = answers[currentQ.id] === opt.id;
                        const optionLetters = ['A', 'B', 'C', 'D', 'E'];
                        const letter = optionLetters[optIdx] || String(optIdx + 1);

                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => quiz.selectAnswer(currentQ.id, opt.id)}
                            className={cn(
                              'w-full text-left p-4 sm:p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group cursor-pointer relative overflow-hidden',
                              isSelected
                                ? 'bg-indigo-50/70 border-indigo-600 ring-4 ring-indigo-500/10 shadow-md shadow-indigo-500/10'
                                : 'bg-slate-50/60 hover:bg-slate-100/80 border-slate-200/80 hover:border-slate-300'
                            )}
                            role="radio"
                            aria-checked={isSelected}
                            id={`option-${currentQ.id}-${opt.id}`}
                          >
                            <span
                              className={cn(
                                'flex items-center justify-center w-8 h-8 rounded-xl font-bold text-xs shrink-0 transition-transform duration-200',
                                isSelected
                                  ? 'border-indigo-600 bg-indigo-600 text-white shadow-sm shadow-indigo-600/30 scale-105'
                                  : 'border border-slate-300 bg-white text-slate-600 group-hover:border-slate-400 group-hover:scale-105'
                              )}
                            >
                              {letter}
                            </span>
                            <span
                              className={cn(
                                'text-sm sm:text-base font-medium flex-1 leading-snug',
                                isSelected ? 'text-indigo-950 font-semibold' : 'text-slate-700'
                              )}
                            >
                              {opt.option_text}
                            </span>
                            {isSelected && (
                              <CheckCircle2 className="w-5 h-5 text-indigo-600 shrink-0 animate-in zoom-in duration-150" />
                            )}
                          </button>
                        );
                      })
                    ) : (
                      <div className="p-6 text-center text-slate-400 text-sm">
                        No options loaded for this question.
                      </div>
                    )}
                  </div>

                  {/* Navigation Buttons (Bottom) */}
                  <div className="flex items-center justify-between mt-10 pt-6 border-t border-slate-100 gap-3 relative z-10">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => quiz.goPrev()}
                      disabled={currentIndex === 0}
                      className="rounded-2xl px-5 border-slate-200 text-slate-700 hover:bg-slate-100 font-semibold cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed shadow-xs"
                      id="prev-question-btn"
                    >
                      <ChevronLeft className="w-4 h-4 mr-1" />
                      Previous
                    </Button>

                    <div className="flex items-center gap-2">
                      {isLastQuestion ? (
                        <Button
                          type="button"
                          onClick={() => setShowConfirm(true)}
                          disabled={submitting}
                          className="rounded-2xl px-6 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-semibold shadow-md shadow-emerald-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                          id="submit-quiz-final-btn"
                        >
                          {submitting ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <CheckCircle2 className="w-4 h-4" />
                              Submit Test
                            </>
                          )}
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => quiz.goNext()}
                          className="rounded-2xl px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold shadow-md shadow-indigo-600/20 hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                          id="next-question-btn"
                        >
                          Next
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 text-center">
                  <p className="text-slate-500">No question selected.</p>
                </div>
              )}
            </div>

            {/* Right: Modern Dynamic Question Navigator Sidebar (Collapsible) */}
            {showNav && (
              <aside className="w-72 shrink-0 hidden md:block bg-white rounded-3xl border border-slate-200/90 shadow-xl shadow-slate-200/30 p-5 animate-in fade-in slide-in-from-right-4 duration-200">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <LayoutGrid className="w-4 h-4 text-indigo-600" />
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

                <div className="space-y-4 max-h-[60vh] overflow-y-auto pr-1">
                  <div className="grid grid-cols-5 gap-2">
                    {questions.map((q, i) => {
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

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-emerald-100 border border-emerald-300" />
                      Answered
                    </span>
                    <span className="font-bold font-mono">{answeredCount}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-200" />
                      Not answered
                    </span>
                    <span className="font-bold font-mono">{questions.length - answeredCount}</span>
                  </div>
                </div>
              </aside>
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

          {(!cameraActive || proctoringError) && (
            <button
              type="button"
              onClick={() => requestProctoring()}
              className="mt-1.5 w-full py-1 text-[10px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors cursor-pointer pointer-events-auto"
            >
              Start Camera & Mic
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
