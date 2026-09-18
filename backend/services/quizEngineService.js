// Quiz Engine Service for SkillProbe
// Handles Level 1 & Level 2 Deduplication, Randomization, Option Shuffling, Server-Side Scoring, and Quiz Configurations.

const { supabaseFetch, SUPABASE_URL } = require('../lib/supabaseAdmin');
const { generateDomainQuestionsWithGemini } = require('./geminiService');

// In-memory default config fallback
let memoryConfig = {
  question_bank_size: 30,
  questions_per_quiz: 30,
  quiz_duration_minutes: 30,
  max_attempts: 999,
  passing_percentage: 50,
  gemini_api_key: process.env.GEMINI_API_KEY || ''
};

/**
 * Get Platform Quiz Configuration
 */
async function getQuizConfig() {
  try {
    const configs = await supabaseFetch('quiz_configurations?select=*&limit=1');
    if (Array.isArray(configs) && configs.length > 0) {
      const dbConfig = configs[0];
      return {
        ...memoryConfig,
        ...dbConfig,
        gemini_api_key: dbConfig.gemini_api_key || memoryConfig.gemini_api_key || process.env.GEMINI_API_KEY || ''
      };
    }
  } catch (err) {
    console.warn('[QuizEngine] Note: quiz_configurations table not ready, using memory configuration:', err.message);
  }
  return { ...memoryConfig };
}

/**
 * Update Platform Quiz Configuration
 */
async function updateQuizConfig(newConfig) {
  memoryConfig = { ...memoryConfig, ...newConfig };
  if (newConfig.gemini_api_key) {
    process.env.GEMINI_API_KEY = newConfig.gemini_api_key;
  }

  try {
    const existing = await supabaseFetch('quiz_configurations?select=id&limit=1');
    if (Array.isArray(existing) && existing.length > 0) {
      const id = existing[0].id;
      await supabaseFetch(`quiz_configurations?id=eq.${id}`, {
        method: 'PATCH',
        body: {
          question_bank_size: memoryConfig.question_bank_size,
          questions_per_quiz: memoryConfig.questions_per_quiz,
          max_attempts: memoryConfig.max_attempts,
          passing_percentage: memoryConfig.passing_percentage,
          gemini_api_key: memoryConfig.gemini_api_key,
          updated_at: new Date().toISOString()
        }
      });
    } else {
      await supabaseFetch('quiz_configurations', {
        method: 'POST',
        body: [{
          question_bank_size: memoryConfig.question_bank_size,
          questions_per_quiz: memoryConfig.questions_per_quiz,
          max_attempts: memoryConfig.max_attempts,
          passing_percentage: memoryConfig.passing_percentage,
          gemini_api_key: memoryConfig.gemini_api_key
        }]
      });
    }
  } catch (err) {
    console.warn('[QuizEngine] Note: unable to persist configuration to DB table:', err.message);
  }

  return memoryConfig;
}

/**
 * Fetch domain bank statistics (total questions, difficulty breakdown)
 */
async function getDomainBankStats() {
  try {
    const [domains, questions] = await Promise.all([
      supabaseFetch('domains?select=id,name,slug,question_count&order=name.asc'),
      supabaseFetch('questions?select=id,domain_id,difficulty,active')
    ]);

    if (!Array.isArray(domains)) return [];

    const statsMap = {};
    (domains || []).forEach(d => {
      statsMap[d.id] = {
        domainId: d.id,
        domainName: d.name,
        domainSlug: d.slug,
        total: 0,
        easy: 0,
        medium: 0,
        hard: 0,
        isReady: false
      };
    });

    if (Array.isArray(questions)) {
      questions.forEach(q => {
        if (statsMap[q.domain_id] && q.active) {
          statsMap[q.domain_id].total += 1;
          const diff = String(q.difficulty).toLowerCase();
          if (diff === 'easy') statsMap[q.domain_id].easy += 1;
          else if (diff === 'medium') statsMap[q.domain_id].medium += 1;
          else if (diff === 'hard') statsMap[q.domain_id].hard += 1;
        }
      });
    }

    const config = await getQuizConfig();
    return Object.values(statsMap).map(s => ({
      ...s,
      isReady: s.total >= config.questions_per_quiz,
      targetBankSize: config.question_bank_size
    }));
  } catch (err) {
    console.error('[QuizEngine] getDomainBankStats error:', err.message);
    return [];
  }
}

/**
 * Generate and store 30 questions for a domain using Gemini API with Level 1 Deduplication
 */
async function generateAndStoreDomainBank(domainId, domainNameOverride = null, apiKeyOverride = null) {
  // 1. Resolve domain
  let domainName = domainNameOverride;
  if (!domainName) {
    const domainData = await supabaseFetch(`domains?id=eq.${domainId}&select=name`);
    if (Array.isArray(domainData) && domainData.length > 0) {
      domainName = domainData[0].name;
    } else {
      domainName = 'Technical Domain';
    }
  }

  // 2. Query existing questions for Level 1 deduplication
  const existingQuestions = await supabaseFetch(`questions?domain_id=eq.${domainId}&select=question_text`);
  const existingTexts = Array.isArray(existingQuestions) ? existingQuestions.map(q => q.question_text) : [];

  console.log(`[QuizEngine] Generating 30 questions for "${domainName}" (current DB count: ${existingTexts.length})...`);

  // 3. Call Gemini
  const config = await getQuizConfig();
  const apiKey = apiKeyOverride || config.gemini_api_key;
  const newQuestions = await generateDomainQuestionsWithGemini(domainName, existingTexts, apiKey);

  if (newQuestions.length === 0) {
    throw new Error(`Failed to generate any new unique questions for domain "${domainName}".`);
  }

  // 4. Save new questions & options to Supabase
  let savedCount = 0;
  for (const q of newQuestions) {
    try {
      // Insert Question with schema compatibility
      const explanationText = q.topic
        ? `[Topic: ${q.topic}] ${q.explanation || ''}`.trim()
        : (q.explanation || null);

      const questionPayload = {
        domain_id: domainId,
        question_text: q.question_text,
        difficulty: q.difficulty,
        marks: 1,
        active: true,
        explanation: explanationText
      };

      const insertedQ = await supabaseFetch('questions', {
        method: 'POST',
        body: [questionPayload]
      });

      if (Array.isArray(insertedQ) && insertedQ.length > 0) {
        const questionId = insertedQ[0].id;

        // Insert Options
        const optionsPayload = q.options.map((opt, idx) => ({
          question_id: questionId,
          option_text: opt.text,
          option_order: idx,
          is_correct: !!opt.is_correct
        }));

        await supabaseFetch('question_options', {
          method: 'POST',
          body: optionsPayload
        });

        savedCount++;
      }
    } catch (insertErr) {
      console.warn(`[QuizEngine] Error inserting question "${q.question_text.substring(0, 30)}...":`, insertErr.message);
    }
  }

  // Update question_count on domain
  try {
    const allQ = await supabaseFetch(`questions?domain_id=eq.${domainId}&active=eq.true&select=id`);
    const totalCount = Array.isArray(allQ) ? allQ.length : savedCount;
    await supabaseFetch(`domains?id=eq.${domainId}`, {
      method: 'PATCH',
      body: { question_count: totalCount, updated_at: new Date().toISOString() }
    });
  } catch {}

  return {
    success: true,
    domainId,
    domainName,
    generated: newQuestions.length,
    saved: savedCount,
    totalExisting: existingTexts.length + savedCount
  };
}

function isValidUuid(id) {
  return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id);
}

function cleanQuestionText(text) {
  if (!text) return '';
  return text
    .replace(/^\[[^\]]+\]\s*/g, '')
    .replace(/^(Fundamental|Practical|Advanced|Technical)\s+question\s+\d+:\s*/i, '')
    .trim();
}

/**
 * Start a Quiz Attempt:
 * - Level 2 Deduplication (retakes prioritize unseen questions for this student)
 * - Randomizes questions (configured number, default 10)
 * - Shuffles options per question
 * - CRITICAL SECURITY: Strips `is_correct` before returning to client
 */
async function startQuizAttempt(studentId, domainId) {
  const config = await getQuizConfig();
  const maxAttempts = config.max_attempts || 3;

  // UUID validation: ensure studentId is valid hex UUID for DB
  const validStudentId = isValidUuid(studentId) ? studentId : '9bf23b8a-9669-4070-9871-1fdf9f84ca15';

  // Resolve domainId if non-UUID (e.g. "dyn-python" or slug like "python")
  let validDomainId = domainId;
  if (!isValidUuid(domainId)) {
    const cleanSlug = String(domainId).replace(/^dyn-/, '').toLowerCase();
    try {
      const foundDomain = await supabaseFetch(`domains?slug=eq.${cleanSlug}&select=id&limit=1`);
      if (Array.isArray(foundDomain) && foundDomain.length > 0) {
        validDomainId = foundDomain[0].id;
      } else {
        const foundList = await supabaseFetch('domains?select=id,slug&limit=10');
        const match = (foundList || []).find(d => d.slug.includes(cleanSlug) || cleanSlug.includes(d.slug));
        validDomainId = match?.id || 'd0000000-0000-0000-0000-000000000001';
      }
    } catch {
      validDomainId = 'd0000000-0000-0000-0000-000000000001';
    }
  }

  // 1. Check student attempt count
  let attempts = [];
  if (isValidUuid(studentId)) {
    try {
      attempts = await supabaseFetch(`quiz_attempts?student_id=eq.${validStudentId}&domain_id=eq.${validDomainId}&select=id,status`);
    } catch {}
  }
  const attemptCount = Array.isArray(attempts) ? attempts.length : 0;
  // Note: Attempt cap disabled to allow unlimited practice and assessment retakes.

  // 2. Fetch questions previously seen by this student in this domain (Level 2 Deduplication)
  const seenQuestionIds = new Set();
  try {
    if (attemptCount > 0) {
      const attemptIds = attempts.map(a => a.id);
      const pastAnswers = await supabaseFetch(`quiz_answers?attempt_id=in.(${attemptIds.join(',')})&select=question_id`);
      if (Array.isArray(pastAnswers)) {
        pastAnswers.forEach(a => seenQuestionIds.add(a.question_id));
      }
    }
  } catch (historyErr) {
    console.warn('[QuizEngine] Note reading past attempt history:', historyErr.message);
  }

  // 3. Fetch all active questions for this domain
  let allQuestions = await supabaseFetch(`questions?domain_id=eq.${validDomainId}&active=eq.true&select=id,question_text,difficulty,marks,explanation,display_order`);

  const shuffleArray = (arr) => [...arr].sort(() => Math.random() - 0.5);

  const getTierPools = (qList) => {
    const easy = (qList || []).filter(q => String(q.difficulty).toLowerCase() === 'easy');
    const medium = (qList || []).filter(q => String(q.difficulty).toLowerCase() === 'medium');
    const hard = (qList || []).filter(q => ['hard', 'advanced'].includes(String(q.difficulty).toLowerCase()));
    return { easy, medium, hard };
  };

  let { easy: easyPool, medium: mediumPool, hard: hardPool } = getTierPools(allQuestions);

  let unseenEasy = easyPool.filter(q => !seenQuestionIds.has(q.id));
  let unseenMedium = mediumPool.filter(q => !seenQuestionIds.has(q.id));
  let unseenHard = hardPool.filter(q => !seenQuestionIds.has(q.id));

  // Auto-generation requirement:
  // If questions are below 20, wait for generation so student has questions.
  // If questions are 20-29 or unseen pool is low, trigger background generation asynchronously without delaying student!
  const hasEnoughForQuiz = Array.isArray(allQuestions) && allQuestions.length >= 20;

  if (!hasEnoughForQuiz) {
    console.log(`[QuizEngine] Question pool low (${allQuestions?.length || 0} questions). Generating fresh 30-question bank with Gemini...`);
    try {
      await generateAndStoreDomainBank(validDomainId);
      allQuestions = await supabaseFetch(`questions?domain_id=eq.${validDomainId}&active=eq.true&select=id,question_text,difficulty,marks,explanation,display_order`);
      const updatedPools = getTierPools(allQuestions);
      easyPool = updatedPools.easy;
      mediumPool = updatedPools.medium;
      hardPool = updatedPools.hard;

      unseenEasy = easyPool.filter(q => !seenQuestionIds.has(q.id));
      unseenMedium = mediumPool.filter(q => !seenQuestionIds.has(q.id));
      unseenHard = hardPool.filter(q => !seenQuestionIds.has(q.id));
    } catch (genErr) {
      console.warn('[QuizEngine] Auto-generation error:', genErr.message);
    }
  } else if (allQuestions.length < 30 || unseenEasy.length < 10 || unseenMedium.length < 10 || unseenHard.length < 10) {
    // Non-blocking background refill so student starts quiz instantly
    console.log(`[QuizEngine] Background auto-refill triggered for domain ${validDomainId} (Current: ${allQuestions.length} questions)...`);
    generateAndStoreDomainBank(validDomainId).catch(err => {
      console.warn('[QuizEngine] Background auto-refill warning:', err.message);
    });
  }

  if (!Array.isArray(allQuestions) || allQuestions.length === 0) {
    throw new Error('No questions available for this domain. Please contact admin.');
  }

  // Helper to select exactly N questions prioritizing unseen, then supplementing from pool without duplicates
  const selectTierQuestions = (unseenList, fullPool, count = 10) => {
    const shuffledUnseen = shuffleArray(unseenList);
    const selected = shuffledUnseen.slice(0, count);

    if (selected.length < count) {
      const selectedIdSet = new Set(selected.map(q => q.id));
      const remainingPool = shuffleArray(fullPool.filter(q => !selectedIdSet.has(q.id)));
      const needed = count - selected.length;
      selected.push(...remainingPool.slice(0, needed));
    }
    return selected;
  };

  // 4. Dynamic difficulty sequence based on configured questions_per_quiz:
  const targetTotal = config.questions_per_quiz || 10;
  const easyCount = Math.max(1, Math.round(targetTotal * 0.34));
  const medCount = Math.max(1, Math.round(targetTotal * 0.33));
  const hardCount = Math.max(0, targetTotal - easyCount - medCount);

  const selectedEasy = selectTierQuestions(unseenEasy, easyPool, easyCount);
  const selectedMedium = selectTierQuestions(unseenMedium, mediumPool, medCount);
  const selectedHard = selectTierQuestions(unseenHard, hardPool, hardCount);

  let selectedQuestions = [...selectedEasy, ...selectedMedium, ...selectedHard];
  if (selectedQuestions.length > targetTotal) {
    selectedQuestions = selectedQuestions.slice(0, targetTotal);
  }
  const selectedQuestionIds = selectedQuestions.map(q => q.id);

  // 5. Fetch options for selected questions
  const options = await supabaseFetch(`question_options?question_id=in.(${selectedQuestionIds.join(',')})&select=id,question_id,option_text,option_order`);

  const optionsMap = {};
  if (Array.isArray(options)) {
    options.forEach(opt => {
      if (!optionsMap[opt.question_id]) optionsMap[opt.question_id] = [];
      // SECURITY: Strip is_correct completely
      optionsMap[opt.question_id].push({
        id: opt.id,
        question_id: opt.question_id,
        option_text: opt.option_text,
        option_order: opt.option_order
      });
    });
  }

  // Assemble sanitized questions in sequential difficulty order with shuffled options
  const sanitizedQuestions = selectedQuestions.map((q, idx) => {
    const qOpts = optionsMap[q.id] || [];
    const tierNum = idx < easyCount ? 1 : idx < (easyCount + medCount) ? 2 : 3;
    const tierLabel = idx < easyCount ? 'Easy' : idx < (easyCount + medCount) ? 'Medium' : 'Advanced';
    return {
      id: q.id,
      question_number: idx + 1,
      tier_number: tierNum,
      tier_label: tierLabel,
      question_text: cleanQuestionText(q.question_text),
      difficulty: q.difficulty || (tierNum === 1 ? 'easy' : tierNum === 2 ? 'medium' : 'hard'),
      marks: q.marks || 1,
      topic: q.topic || 'General',
      options: shuffleArray(qOpts) // Shuffle options for this attempt
    };
  });

  // 6. Create attempt record with 30-minute duration limit
  const quizDurationMinutes = 30;
  const expiresAt = new Date(Date.now() + quizDurationMinutes * 60 * 1000).toISOString();
  const attemptPayload = {
    student_id: validStudentId,
    domain_id: validDomainId,
    status: 'started',
    total_questions: sanitizedQuestions.length,
    started_at: new Date().toISOString(),
    expires_at: expiresAt
  };

  const newAttemptArr = await supabaseFetch('quiz_attempts', {
    method: 'POST',
    body: [attemptPayload]
  });

  const createdAttempt = Array.isArray(newAttemptArr) && newAttemptArr.length > 0 ? newAttemptArr[0] : {
    id: 'att-' + Date.now(),
    ...attemptPayload
  };

  return {
    attemptId: createdAttempt.id,
    attemptNumber: attemptCount + 1,
    maxAttempts,
    totalQuestions: sanitizedQuestions.length,
    durationMinutes: quizDurationMinutes,
    durationSeconds: quizDurationMinutes * 60,
    difficultyBreakdown: {
      easy: selectedEasy.length,
      medium: selectedMedium.length,
      hard: selectedHard.length
    },
    questions: sanitizedQuestions,
    startedAt: createdAttempt.started_at,
    expiresAt: createdAttempt.expires_at
  };
}

/**
 * Submit Quiz Attempt:
 * - Server-side grading (evaluates against true is_correct from DB)
 * - Calculates percentage and skill level
 * - Saves quiz_answers and quiz_results
 */
async function submitQuizAttempt(attemptId, studentId, answers) {
  // answers is an object of { [question_id]: selected_option_id }
  const answerEntries = Object.entries(answers || {});
  const questionIds = answerEntries.map(([qId]) => qId);

  // 1 & 2. Fetch attempt and authoritative correct options in PARALLEL
  let attempt = null;
  let correctOptions = [];

  const [attemptRes, optionsRes] = await Promise.allSettled([
    supabaseFetch(`quiz_attempts?id=eq.${attemptId}&select=*`),
    questionIds.length > 0
      ? supabaseFetch(`question_options?question_id=in.(${questionIds.join(',')})&select=id,question_id,is_correct`)
      : Promise.resolve([])
  ]);

  if (attemptRes.status === 'fulfilled' && Array.isArray(attemptRes.value) && attemptRes.value.length > 0) {
    attempt = attemptRes.value[0];
  }
  if (optionsRes.status === 'fulfilled' && Array.isArray(optionsRes.value)) {
    correctOptions = optionsRes.value;
  }

  const domainId = attempt?.domain_id || null;
  const correctOptionMap = new Map();
  correctOptions.forEach(opt => {
    if (opt.is_correct) {
      correctOptionMap.set(opt.question_id, opt.id);
    }
  });

  // 3. Evaluate answers in-memory
  let correctAnswers = 0;
  let incorrectAnswers = 0;
  let unanswered = 0;
  const totalQuestions = questionIds.length || 10;

  for (const [qId, selectedOptId] of answerEntries) {
    if (!selectedOptId) {
      unanswered++;
    } else if (correctOptionMap.get(qId) === selectedOptId) {
      correctAnswers++;
    } else {
      incorrectAnswers++;
    }
  }

  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  let skillLevel = 'Foundation';
  if (percentage >= 90) skillLevel = 'Expert';
  else if (percentage >= 75) skillLevel = 'Advanced';
  else if (percentage >= 60) skillLevel = 'Intermediate';
  else if (percentage >= 40) skillLevel = 'Beginner';
  else skillLevel = 'Foundation';

  const passingScore = 50;
  const passed = percentage >= passingScore;

  // 4. Calculate time taken
  const startedAt = attempt?.started_at ? new Date(attempt.started_at) : new Date(Date.now() - 15 * 60 * 1000);
  const now = new Date();
  const timeTakenSeconds = Math.max(1, Math.round((now.getTime() - startedAt.getTime()) / 1000));

  // 5, 6, 7. Persist answers, attempt status, and results in PARALLEL non-blocking
  const answersToInsert = answerEntries.map(([qId, optId]) => ({
    attempt_id: attemptId,
    question_id: qId,
    selected_option_id: optId || null,
    answered_at: now.toISOString()
  }));

  const resultPayload = {
    attempt_id: attemptId,
    student_id: studentId,
    domain_id: domainId,
    total_questions: totalQuestions,
    correct_answers: correctAnswers,
    incorrect_answers: incorrectAnswers,
    unanswered: unanswered,
    total_marks: totalQuestions,
    obtained_marks: correctAnswers,
    percentage: percentage,
    skill_level: skillLevel,
    personalized_message: `Assessment completed with ${percentage}% score. Skill level: ${skillLevel}.`,
    calculated_at: now.toISOString(),
    created_at: now.toISOString()
  };

  const persistTasks = [
    // Update quiz_attempts status
    supabaseFetch(`quiz_attempts?id=eq.${attemptId}`, {
      method: 'PATCH',
      body: {
        status: 'submitted',
        submitted_at: now.toISOString(),
        time_taken_seconds: timeTakenSeconds,
        updated_at: now.toISOString()
      }
    }),
    // Insert quiz_results
    supabaseFetch('quiz_results', {
      method: 'POST',
      headers: { 'Prefer': 'resolution=merge-duplicates' },
      body: [resultPayload]
    }),
    // Update leads table with quiz completion status and high intent score
    supabaseFetch(`leads?student_id=eq.${studentId}`, {
      method: 'PATCH',
      body: {
        has_completed_quiz: true,
        has_viewed_result: true,
        lead_score: Math.min(100, Math.max(50, percentage + 20)),
        lead_status: percentage >= 50 ? 'HOT' : 'WARM',
        qualification_reason: `High Intent: completed assessment (${percentage}%), scored ${skillLevel} level`,
        last_activity_at: now.toISOString(),
        updated_at: now.toISOString()
      }
    })
  ];

  if (answersToInsert.length > 0) {
    persistTasks.push(
      supabaseFetch('quiz_answers', {
        method: 'POST',
        headers: { 'Prefer': 'resolution=merge-duplicates' },
        body: answersToInsert
      })
    );
  }

  // Fire DB persistence concurrently
  Promise.allSettled(persistTasks).catch((err) => {
    console.warn('[QuizEngine] Background persist warning:', err.message);
  });

  return {
    attemptId,
    studentId,
    totalQuestions,
    correctAnswers,
    incorrectAnswers,
    unanswered,
    percentage,
    skillLevel,
    passed,
    timeTakenSeconds,
    submittedAt: now.toISOString()
  };
}

module.exports = {
  getQuizConfig,
  updateQuizConfig,
  getDomainBankStats,
  generateAndStoreDomainBank,
  startQuizAttempt,
  submitQuizAttempt
};
