const { supabaseFetch } = require('../lib/supabaseAdmin');
const { DOMAIN_QUESTIONS } = require('../data/domainQuestionBank');

const DOMAIN_MAP = {
  'python-programming': { id: 'd0000000-0000-0000-0000-000000000001', prefix: 'e1' },
  'full-stack-web-development': { id: 'd0000000-0000-0000-0000-000000000002', prefix: 'e2' },
  'ai-ml': { id: 'd0000000-0000-0000-0000-000000000003', prefix: 'e3' },
  'java-backend-architecture': { id: 'd0000000-0000-0000-0000-000000000004', prefix: 'e4' },
  'cloud-devops': { id: 'd0000000-0000-0000-0000-000000000005', prefix: 'e5' },
  'cybersecurity-ethical-hacking': { id: 'd0000000-0000-0000-0000-000000000006', prefix: 'e6' }
};

async function seedDatabase() {
  console.log('[Seed] Seeding all 6 domain question banks into Supabase...');

  for (const [key, mapping] of Object.entries(DOMAIN_MAP)) {
    const questions = DOMAIN_QUESTIONS[key];
    if (!questions || questions.length === 0) {
      console.warn(`[Seed] No questions found for ${key}`);
      continue;
    }

    console.log(`[Seed] Uploading ${questions.length} questions for ${key} (Domain: ${mapping.id})...`);

    // First delete any previous questions for this domain to avoid duplicates
    try {
      await supabaseFetch(`questions?domain_id=eq.${mapping.id}`, {
        method: 'DELETE'
      });
    } catch (delErr) {
      console.warn(`[Seed] Warning on delete old questions for ${key}:`, delErr.message);
    }

    const questionRecords = [];
    const optionRecords = [];

    questions.forEach((qItem, idx) => {
      const qNum = idx + 1;
      const qId = `${mapping.prefix}000000-0000-0000-0000-${String(qNum).padStart(12, '0')}`;
      const diff = qNum <= 10 ? 'easy' : qNum <= 20 ? 'medium' : 'hard';

      questionRecords.push({
        id: qId,
        domain_id: mapping.id,
        question_text: qItem.q,
        explanation: `Comprehensive solution and explanation for question ${qNum}.`,
        difficulty: diff,
        marks: 1,
        active: true,
        display_order: qNum
      });

      qItem.opts.forEach((optText, oIdx) => {
        const oNum = qNum * 10 + oIdx;
        const optId = `${mapping.prefix}000000-0000-0000-0001-${String(oNum).padStart(12, '0')}`;
        optionRecords.push({
          id: optId,
          question_id: qId,
          option_text: optText,
          option_order: oIdx + 1,
          is_correct: oIdx === qItem.ans
        });
      });
    });

    // Insert questions in batches
    try {
      await supabaseFetch('questions', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: questionRecords
      });
      console.log(`[Seed] Inserted ${questionRecords.length} questions for ${key}`);
    } catch (qErr) {
      console.error(`[Seed] Error inserting questions for ${key}:`, qErr.message);
      continue;
    }

    // Insert options in batches of 50
    for (let i = 0; i < optionRecords.length; i += 50) {
      const chunk = optionRecords.slice(i, i + 50);
      try {
        await supabaseFetch('question_options', {
          method: 'POST',
          headers: { 'Prefer': 'resolution=merge-duplicates' },
          body: chunk
        });
      } catch (oErr) {
        console.error(`[Seed] Error inserting options chunk for ${key}:`, oErr.message);
      }
    }
    console.log(`[Seed] Inserted ${optionRecords.length} options for ${key}`);
  }

  console.log('[Seed] Database question banks successfully synchronized!');
}

seedDatabase().catch(err => {
  console.error('[Seed] Fatal error during question seeding:', err);
  process.exit(1);
});
