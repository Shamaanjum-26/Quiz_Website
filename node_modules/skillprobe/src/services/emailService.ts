import supabase from '@/lib/supabase';

// ── Email service abstraction ─────────────────────────────────
// Uses Supabase Edge Function which handles real email via Resend/SendGrid
// Falls back to mock/dev mode if EMAIL_API_KEY is not configured

export interface EmailPayload {
  to: string;
  studentId?: string;
  templateName: string;
  templateData: Record<string, unknown>;
}

export async function sendEmail(payload: EmailPayload): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('send-email', { body: payload });
    if (error) {
      console.warn('[Email] Failed to send via Edge Function:', error.message);
    }
  } catch (err) {
    console.warn('[Email] Edge Function unavailable (dev mode):', err);
  }
}

// ── Template helpers ──────────────────────────────────────────
export async function sendRegistrationConfirmation(
  to: string,
  name: string,
  studentId: string
): Promise<void> {
  await sendEmail({
    to,
    studentId,
    templateName: 'registration_confirmation',
    templateData: { name },
  });
}

export async function sendQuizCompletionEmail(
  to: string,
  name: string,
  domain: string,
  percentage: number,
  skillLevel: string,
  resultUrl: string,
  studentId: string
): Promise<void> {
  await sendEmail({
    to,
    studentId,
    templateName: 'quiz_completion',
    templateData: { name, domain, percentage, skillLevel, resultUrl },
  });
}

export async function sendBootcampConfirmation(
  to: string,
  name: string,
  bootcampName: string,
  startDate: string,
  mode: string,
  studentId: string
): Promise<void> {
  await sendEmail({
    to,
    studentId,
    templateName: 'bootcamp_confirmation',
    templateData: { name, bootcampName, startDate, mode },
  });
}
