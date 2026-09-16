import type { Lead, LeadStatus } from '@/types';

// ── Lead Score Rules ──────────────────────────────────────────
export const LEAD_SCORE_RULES = {
  quiz_completed: 20,
  bootcamp_registered: 30,
  email_verified: 10,
  whatsapp_opt_in: 10,
  premium_report_clicked: 15,
  multiple_sessions: 5,
  high_intent_cta: 10,
  result_viewed: 5,
  report_viewed: 5,
} as const;

// ── Lead Status Thresholds ────────────────────────────────────
export const LEAD_STATUS_THRESHOLDS = {
  HOT: 70,
  WARM: 40,
  NURTURE: 0,
} as const;

export function calculateLeadStatus(score: number): LeadStatus {
  if (score >= LEAD_STATUS_THRESHOLDS.HOT) return 'HOT';
  if (score >= LEAD_STATUS_THRESHOLDS.WARM) return 'WARM';
  return 'NURTURE';
}

export function getLeadStatusColor(status: LeadStatus): string {
  const colors: Record<LeadStatus, string> = {
    HOT: '#dc2626',
    WARM: '#d97706',
    NURTURE: '#2563eb',
  };
  return colors[status];
}

export function getLeadStatusBg(status: LeadStatus): string {
  const bg: Record<LeadStatus, string> = {
    HOT: '#fee2e2',
    WARM: '#fef3c7',
    NURTURE: '#dbeafe',
  };
  return bg[status];
}

export function buildQualificationReason(lead: Partial<Lead>): string {
  const status = lead.lead_status || 'NURTURE';
  const parts: string[] = [`${status}:`];

  if (lead.has_completed_quiz) parts.push('completed assessment');
  if (lead.has_viewed_result) parts.push('viewed result');
  if (lead.has_viewed_report) parts.push('viewed skill report');
  if (lead.has_clicked_premium_report) parts.push('interested in premium report');
  if (lead.has_registered_bootcamp) parts.push('registered for bootcamp');
  if (lead.has_verified_email) parts.push('email verified');
  if (lead.has_whatsapp_opt_in) parts.push('WhatsApp opted in');
  if (lead.has_multiple_sessions) parts.push(`${lead.session_count || 1} sessions`);

  if (parts.length === 1) parts.push('initial registration');

  return parts.join(', ').replace(':', ': ').replace(/,([^,]*)$/, ' and$1');
}
