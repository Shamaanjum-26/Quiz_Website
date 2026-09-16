// Supabase Edge Function: calculate-score
// Evaluates quiz answers securely on the server, calculates score, determines skill level,
// logs lead activity, and updates lead score.

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
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { attemptId, answers } = await req.json();

    if (!attemptId || !Array.isArray(answers)) {
      return new Response(
        JSON.stringify({ error: "Missing attemptId or answers" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 1. Fetch attempt and questions with correct options
    const { data: attempt, error: attemptError } = await supabase
      .from("quiz_attempts")
      .select("*, domain:domains(*), student:students(*)")
      .eq("id", attemptId)
      .single();

    if (attemptError || !attempt) {
      return new Response(
        JSON.stringify({ error: "Attempt not found" }),
        { status: 404, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const questionIds = answers.map((a: { questionId: string }) => a.questionId);
    const { data: options } = await supabase
      .from("question_options")
      .select("id, question_id, is_correct")
      .in("question_id", questionIds);

    const correctMap = new Map<string, string>();
    (options || []).forEach((opt: { id: string; question_id: string; is_correct: boolean }) => {
      if (opt.is_correct) {
        correctMap.set(opt.question_id, opt.id);
      }
    });

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    for (const ans of answers) {
      if (!ans.selectedOptionId) {
        unansweredCount++;
      } else if (correctMap.get(ans.questionId) === ans.selectedOptionId) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    }

    const totalQuestions = answers.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    let skillLevel = "Foundation";
    if (percentage >= 85) skillLevel = "Expert";
    else if (percentage >= 70) skillLevel = "Advanced";
    else if (percentage >= 50) skillLevel = "Intermediate";
    else if (percentage >= 30) skillLevel = "Beginner";

    // 2. Insert or update quiz_results
    const { data: result, error: resultError } = await supabase
      .from("quiz_results")
      .upsert({
        attempt_id: attemptId,
        student_id: attempt.student_id,
        domain_id: attempt.domain_id,
        total_questions: totalQuestions,
        correct_answers: correctCount,
        incorrect_answers: incorrectCount,
        unanswered: unansweredCount,
        total_marks: totalQuestions,
        obtained_marks: correctCount,
        percentage,
        skill_level: skillLevel,
        personalized_message: `You scored ${percentage}% in ${attempt.domain?.name || "the assessment"}. Keep up the great momentum!`,
        calculated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (resultError) throw resultError;

    // 3. Mark attempt as submitted
    await supabase
      .from("quiz_attempts")
      .update({
        status: "submitted",
        submitted_at: new Date().toISOString(),
      })
      .eq("id", attemptId);

    // 4. Update lead status and score
    const leadScoreBump = percentage >= 70 ? 30 : percentage >= 40 ? 20 : 10;
    const { data: currentLead } = await supabase
      .from("leads")
      .select("lead_score")
      .eq("student_id", attempt.student_id)
      .single();

    const newScore = (currentLead?.lead_score || 0) + leadScoreBump;
    const newStatus = newScore >= 70 ? "HOT" : newScore >= 40 ? "WARM" : "NURTURE";

    await supabase
      .from("leads")
      .upsert({
        student_id: attempt.student_id,
        lead_score: newScore,
        lead_status: newStatus,
        has_completed_quiz: true,
        last_activity_at: new Date().toISOString(),
      });

    return new Response(
      JSON.stringify({
        success: true,
        resultId: result.id,
        score: correctCount,
        total: totalQuestions,
        percentage,
        skillLevel,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
