import type { UTMData } from '@/types';

const UTM_STORAGE_KEY = 'skillprobe_utm';
const STUDENT_ID_KEY = 'skillprobe_student_id';
const QUIZ_STATE_KEY = 'skillprobe_quiz_state';

// ── UTM Capture & Persist ─────────────────────────────────────
export function captureUTMFromURL(): UTMData {
  const params = new URLSearchParams(window.location.search);

  const utm: UTMData = {
    utm_source: params.get('utm_source') || undefined,
    utm_medium: params.get('utm_medium') || undefined,
    utm_campaign: params.get('utm_campaign') || undefined,
    utm_content: params.get('utm_content') || undefined,
    utm_term: params.get('utm_term') || undefined,
    referral_code: params.get('ref') || params.get('referral') || undefined,
    campaign_code: params.get('cc') || params.get('code') || undefined,
  };

  // Remove undefined keys
  const cleaned = Object.fromEntries(
    Object.entries(utm).filter(([, v]) => v !== undefined)
  ) as UTMData;

  // Only persist if we found UTM data
  if (Object.keys(cleaned).length > 0) {
    persistUTM(cleaned);
  }

  return cleaned;
}

export function persistUTM(utm: UTMData): void {
  try {
    const existing = getPersistedUTM();
    // Don't overwrite existing UTM — first-touch attribution
    if (Object.keys(existing).length === 0) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
      localStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utm));
    }
  } catch {
    // Storage not available
  }
}

export function getPersistedUTM(): UTMData {
  try {
    const session = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (session) return JSON.parse(session) as UTMData;
    const local = localStorage.getItem(UTM_STORAGE_KEY);
    if (local) return JSON.parse(local) as UTMData;
  } catch {
    // ignore
  }
  return {};
}

export function clearUTM(): void {
  try {
    sessionStorage.removeItem(UTM_STORAGE_KEY);
    localStorage.removeItem(UTM_STORAGE_KEY);
  } catch {
    // ignore
  }
}

// ── Student ID Persistence ────────────────────────────────────
export function persistStudentId(studentId: string): void {
  try {
    localStorage.setItem(STUDENT_ID_KEY, studentId);
    sessionStorage.setItem(STUDENT_ID_KEY, studentId);
  } catch {
    // ignore
  }
}

export function getPersistedStudentId(): string | null {
  try {
    return sessionStorage.getItem(STUDENT_ID_KEY) || localStorage.getItem(STUDENT_ID_KEY);
  } catch {
    return null;
  }
}

export function clearStudentId(): void {
  try {
    localStorage.removeItem(STUDENT_ID_KEY);
    sessionStorage.removeItem(STUDENT_ID_KEY);
  } catch {
    // ignore
  }
}

// ── Quiz State Persistence ────────────────────────────────────
export function persistQuizState(state: Record<string, unknown>): void {
  try {
    localStorage.setItem(QUIZ_STATE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function getPersistedQuizState(): Record<string, unknown> | null {
  try {
    const stored = localStorage.getItem(QUIZ_STATE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // ignore
  }
  return null;
}

export function clearQuizState(): void {
  try {
    localStorage.removeItem(QUIZ_STATE_KEY);
  } catch {
    // ignore
  }
}

// ── Format helpers ────────────────────────────────────────────
export function formatDate(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return dateStr;
  }
}

export function formatDateTime(dateStr: string): string {
  try {
    return new Date(dateStr).toLocaleString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return dateStr;
  }
}

export function formatRelativeTime(dateStr: string): string {
  try {
    const diff = Date.now() - new Date(dateStr).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    return formatDate(dateStr);
  } catch {
    return dateStr;
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
