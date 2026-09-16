import supabase from '@/lib/supabase';

// ── WhatsApp service abstraction ──────────────────────────────
// Integrates with Meta WhatsApp Business Cloud API via Edge Function
// No WhatsApp tokens are exposed to the frontend

export interface WhatsAppPayload {
  to: string;
  studentId?: string;
  templateName: string;
  templateData: Record<string, string>;
}

export async function sendWhatsApp(payload: WhatsAppPayload): Promise<void> {
  try {
    const { error } = await supabase.functions.invoke('send-whatsapp', { body: payload });
    if (error) {
      console.warn('[WhatsApp] Failed to send via Edge Function:', error.message);
    }
  } catch (err) {
    console.warn('[WhatsApp] Edge Function unavailable (dev mode):', err);
  }
}

// ── Template helpers ──────────────────────────────────────────
// Template: "Hi {{1}}, your skill assessment is ready. Take it now!"
export async function sendRegistrationWhatsApp(
  mobile: string,
  name: string,
  studentId: string
): Promise<void> {
  await sendWhatsApp({
    to: `91${mobile}`,
    studentId,
    templateName: 'registration_confirmation',
    templateData: { name },
  });
}

// Template: "Hi {{1}}, your {{2}} assessment is complete. You scored {{3}}%."
export async function sendQuizCompletionWhatsApp(
  mobile: string,
  name: string,
  domain: string,
  percentage: number,
  studentId: string
): Promise<void> {
  await sendWhatsApp({
    to: `91${mobile}`,
    studentId,
    templateName: 'quiz_completion',
    templateData: { name, domain, percentage: percentage.toString() },
  });
}

// Template: "Hi {{1}}, you're registered for our FREE {{2}} bootcamp on {{3}}!"
export async function sendBootcampWhatsApp(
  mobile: string,
  name: string,
  bootcampName: string,
  startDate: string,
  studentId: string
): Promise<void> {
  await sendWhatsApp({
    to: `91${mobile}`,
    studentId,
    templateName: 'bootcamp_confirmation',
    templateData: { name, bootcampName, startDate },
  });
}
