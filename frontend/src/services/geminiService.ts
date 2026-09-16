import type { Question } from '@/types';

export const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY || '';

interface RawGeminiQuestion {
  question_text: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  marks?: number;
  options: Array<{
    option_text: string;
    is_correct: boolean;
  }>;
  explanation?: string;
}

/**
 * Generate technical assessment multiple-choice questions using Google Gemini AI
 */
export async function generateQuestionsWithGemini(
  domainName: string,
  count = 10,
  difficulty = 'intermediate'
): Promise<Question[] | null> {
  const apiKey = (import.meta.env.VITE_GEMINI_API_KEY || '').trim();
  if (!apiKey || apiKey.length < 10) {
    return null;
  }

  const prompt = `You are a Principal Technical Interviewer and Assessment Engine for ${domainName}.
Generate exactly ${count} unique, high-quality multiple choice assessment questions for candidates evaluated in ${domainName}.
Target difficulty: ${difficulty} (mix of 30% easy concepts, 40% medium practical code/architecture, 30% hard edge-cases/optimization).

Strict Requirements:
1. Each question must have EXACTLY 4 options.
2. EXACTLY ONE option must have is_correct = true, and the other 3 must have is_correct = false.
3. Realistic and plausible distractors (no silly or obviously fake options).
4. Include a concise 1-2 sentence explanation of why the correct option is right.

Return ONLY a valid JSON array matching this exact schema without any markdown formatting or surrounding conversational text:
[
  {
    "question_text": "Clear technical question or snippet here?",
    "difficulty": "easy" | "medium" | "hard",
    "marks": 1,
    "options": [
      { "option_text": "Correct explanation or snippet", "is_correct": true },
      { "option_text": "Plausible distractor 1", "is_correct": false },
      { "option_text": "Plausible distractor 2", "is_correct": false },
      { "option_text": "Plausible distractor 3", "is_correct": false }
    ],
    "explanation": "Brief explanation"
  }
]`;

  const models = ['gemini-1.5-flash', 'gemini-2.0-flash', 'gemini-1.5-pro'];

  for (const model of models) {
    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 3000,
          },
        }),
      });

      if (!response.ok) {
        const errText = await response.text();
        console.warn(`[Gemini AI] ${model} HTTP ${response.status}:`, errText);
        continue;
      }

      const json = await response.json();
      const rawText = json?.candidates?.[0]?.content?.parts?.[0]?.text || '';
      if (!rawText) continue;

      // Extract JSON array from text
      const cleanJsonStr = rawText
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/\s*```$/i, '')
        .trim();

      const parsed: RawGeminiQuestion[] = JSON.parse(cleanJsonStr);
      if (!Array.isArray(parsed) || parsed.length === 0) continue;

      // Format questions to standard Question type
      const cleanSlug = domainName.toLowerCase().replace(/[^a-z0-9]/g, '-');
      const questions: Question[] = parsed.map((item, qIdx) => {
        const qId = `ai-${cleanSlug}-${Date.now()}-${qIdx + 1}`;
        // Shuffle options so correct answer is not always index 0
        const shuffledOptions = [...item.options]
          .sort(() => Math.random() - 0.5)
          .map((opt, optIdx) => ({
            id: `${qId}-opt-${optIdx + 1}`,
            question_id: qId,
            option_text: opt.option_text,
            is_correct: opt.is_correct,
            option_order: optIdx + 1,
          }));

        return {
          id: qId,
          domain_id: cleanSlug,
          question_text: item.question_text,
          difficulty: item.difficulty || (qIdx < 3 ? 'easy' : qIdx < 7 ? 'medium' : 'hard'),
          marks: item.marks || 1,
          question_number: qIdx + 1,
          tier_number: qIdx < 3 ? 1 : qIdx < 7 ? 2 : 3,
          tier_label: qIdx < 3 ? 'Easy' : qIdx < 7 ? 'Medium' : 'Advanced',
          active: true,
          display_order: qIdx + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          options: shuffledOptions,
        } as Question;
      });

      console.log(`[Gemini AI] Successfully generated ${questions.length} questions for ${domainName} using ${model}!`);
      return questions;
    } catch (e) {
      console.warn(`[Gemini AI] Failed with ${model}:`, e);
    }
  }

  return null;
}
