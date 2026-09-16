// Supabase Edge Function: send-email
// Dispatches transactional email (quiz results report, bootcamp confirmation, welcome email)
// and logs email status to email_logs.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL") ?? "";
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "";
    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { toEmail, studentName, subject, templateName, templateData, studentId } = await req.json();

    if (!toEmail || !subject) {
      return new Response(
        JSON.stringify({ error: "Missing toEmail or subject" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    let status = "sent";
    let errorMsg = null;

    if (resendApiKey) {
      // Production email dispatch via Resend
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "SkillProbe <admissions@skillprobe.edu>",
          to: [toEmail],
          subject: subject,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #4f46e5;">Hi ${studentName || 'Student'},</h2>
              <p>${templateData?.message || 'Thank you for participating in the SkillProbe Technical Assessment.'}</p>
              ${templateData?.reportUrl ? `<p><a href="${templateData.reportUrl}" style="display:inline-block;padding:10px 20px;background:#4f46e5;color:white;border-radius:6px;text-decoration:none;">View Your Skill Report</a></p>` : ''}
              ${templateData?.bootcampName ? `<p><strong>Bootcamp:</strong> ${templateData.bootcampName}<br/><strong>Start Date:</strong> ${templateData.startDate}</p>` : ''}
              <hr style="border:none;border-top:1px solid #eee;margin:20px 0;"/>
              <p style="color:#666;font-size:12px;">Team SkillProbe — Empowering Student Careers</p>
            </div>
          `,
        }),
      });
      if (!res.ok) {
        status = "failed";
        errorMsg = await res.text();
      }
    }

    // Log to email_logs table
    await supabase.from("email_logs").insert({
      student_id: studentId || null,
      to_email: toEmail,
      from_email: "admissions@skillprobe.edu",
      subject: subject,
      template_name: templateName || "general",
      template_data: templateData || {},
      status: status,
      provider: resendApiKey ? "resend" : "simulated",
      error_message: errorMsg,
      sent_at: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({ success: true, status }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
