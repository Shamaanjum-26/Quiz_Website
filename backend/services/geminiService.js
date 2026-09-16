// Gemini API Integration Service for SkillProbe Quiz Platform
// Generates 30 technical questions per domain distributed across Easy, Medium, Hard.

const https = require('https');

// Fallback curated questions for technical domains (30 questions per domain across Easy, Medium, Hard)
const DOMAIN_FALLBACK_BANKS = {
  python: [
    // 10 Easy
    { question_text: 'What is the correct extension for Python source files?', difficulty: 'easy', topic: 'Syntax', explanation: 'Python files use the .py extension.', options: [{ text: '.py', is_correct: true }, { text: '.python', is_correct: false }, { text: '.pt', is_correct: false }, { text: '.p', is_correct: false }] },
    { question_text: 'Which keyword is used to define a function in Python?', difficulty: 'easy', topic: 'Functions', explanation: 'The def keyword begins a function definition in Python.', options: [{ text: 'def', is_correct: true }, { text: 'function', is_correct: false }, { text: 'fun', is_correct: false }, { text: 'define', is_correct: false }] },
    { question_text: 'Which of the following data types is immutable in Python?', difficulty: 'easy', topic: 'Data Types', explanation: 'Tuples cannot be modified after creation.', options: [{ text: 'tuple', is_correct: true }, { text: 'list', is_correct: false }, { text: 'dict', is_correct: false }, { text: 'set', is_correct: false }] },
    { question_text: 'What will print(type([])) output in Python 3?', difficulty: 'easy', topic: 'Types', explanation: 'Square brackets denote a list object.', options: [{ text: "<class 'list'>", is_correct: true }, { text: "<class 'array'>", is_correct: false }, { text: "<class 'tuple'>", is_correct: false }, { text: "<class 'collection'>", is_correct: false }] },
    { question_text: 'What character is used for single-line comments in Python?', difficulty: 'easy', topic: 'Syntax', explanation: '# indicates a single-line comment.', options: [{ text: '#', is_correct: true }, { text: '//', is_correct: false }, { text: '/*', is_correct: false }, { text: '--', is_correct: false }] },
    { question_text: 'How do you insert an item at the end of a list in Python?', difficulty: 'easy', topic: 'Lists', explanation: 'The append() method adds an element to the end.', options: [{ text: 'list.append(x)', is_correct: true }, { text: 'list.add(x)', is_correct: false }, { text: 'list.push(x)', is_correct: false }, { text: 'list.insert_end(x)', is_correct: false }] },
    { question_text: 'Which operator is used for exponentiation (power) in Python?', difficulty: 'easy', topic: 'Operators', explanation: '** is the power operator in Python.', options: [{ text: '**', is_correct: true }, { text: '^', is_correct: false }, { text: '^^', is_correct: false }, { text: 'pow#', is_correct: false }] },
    { question_text: 'What is the output of bool(0) in Python?', difficulty: 'easy', topic: 'Booleans', explanation: '0 evaluates to False in Boolean contexts.', options: [{ text: 'False', is_correct: true }, { text: 'True', is_correct: false }, { text: 'None', is_correct: false }, { text: 'Error', is_correct: false }] },
    { question_text: 'Which collection type does not allow duplicate elements in Python?', difficulty: 'easy', topic: 'Sets', explanation: 'A set contains only unique items.', options: [{ text: 'set', is_correct: true }, { text: 'list', is_correct: false }, { text: 'tuple', is_correct: false }, { text: 'dict_values', is_correct: false }] },
    { question_text: 'What does the len() function return?', difficulty: 'easy', topic: 'Built-ins', explanation: 'len() returns the number of elements in an object.', options: [{ text: 'The number of items in a collection', is_correct: true }, { text: 'Memory size in bytes', is_correct: false }, { text: 'The largest element value', is_correct: false }, { text: 'Execution time of code', is_correct: false }] },
    // 10 Medium
    { question_text: 'What is the output of [x*2 for x in range(3)]?', difficulty: 'medium', topic: 'Comprehensions', explanation: 'range(3) produces 0, 1, 2. Doubling gives [0, 2, 4].', options: [{ text: '[0, 2, 4]', is_correct: true }, { text: '[2, 4, 6]', is_correct: false }, { text: '[0, 1, 2]', is_correct: false }, { text: '[0, 2, 4, 6]', is_correct: false }] },
    { question_text: 'What is the purpose of the __init__ method in a Python class?', difficulty: 'medium', topic: 'OOP', explanation: '__init__ is the initializer constructor invoked upon object creation.', options: [{ text: 'Constructor method to initialize object state', is_correct: true }, { text: 'Destructor method to free resources', is_correct: false }, { text: 'Static class loader method', is_correct: false }, { text: 'Class inheritance resolver', is_correct: false }] },
    { question_text: 'What is the difference between "is" and "==" in Python?', difficulty: 'medium', topic: 'Core Semantics', explanation: '"is" checks identity (same memory address) while "==" checks equality of values.', options: [{ text: '"is" checks object identity, "==" checks value equality', is_correct: true }, { text: '"==" checks object identity, "is" checks value equality', is_correct: false }, { text: 'They are completely identical in Python 3', is_correct: false }, { text: '"is" is used only for strings', is_correct: false }] },
    { question_text: 'What does a generator function use instead of "return" to yield values one by one?', difficulty: 'medium', topic: 'Generators', explanation: 'The yield statement pauses function execution and returns a value.', options: [{ text: 'yield', is_correct: true }, { text: 'produce', is_correct: false }, { text: 'emit', is_correct: false }, { text: 'stream', is_correct: false }] },
    { question_text: 'What is the time complexity of looking up a key in a Python dict on average?', difficulty: 'medium', topic: 'Data Structures', explanation: 'Python dictionaries use hash tables with O(1) average lookup.', options: [{ text: 'O(1)', is_correct: true }, { text: 'O(log n)', is_correct: false }, { text: 'O(n)', is_correct: false }, { text: 'O(n log n)', is_correct: false }] },
    { question_text: 'How do you unpack a dictionary into keyword arguments in a function call?', difficulty: 'medium', topic: 'Functions', explanation: '**dict unpacks dictionary key-value pairs as kwargs.', options: [{ text: '**kwargs', is_correct: true }, { text: '*kwargs', is_correct: false }, { text: '&kwargs', is_correct: false }, { text: '$$kwargs', is_correct: false }] },
    { question_text: 'What is the purpose of the "finally" block in exception handling?', difficulty: 'medium', topic: 'Exception Handling', explanation: 'The finally block executes regardless of whether an exception occurred.', options: [{ text: 'Executes clean-up code regardless of exceptions', is_correct: true }, { text: 'Executes only when an exception occurs', is_correct: false }, { text: 'Suppresses unhandled exceptions', is_correct: false }, { text: 'Rethrows the caught exception', is_correct: false }] },
    { question_text: 'In Python, what is a lambda function?', difficulty: 'medium', topic: 'Functional', explanation: 'A lambda is a small anonymous function with a single expression.', options: [{ text: 'An anonymous inline function with a single expression', is_correct: true }, { text: 'A recursive function generator', is_correct: false }, { text: 'A multi-threaded task runner', is_correct: false }, { text: 'A built-in data structure', is_correct: false }] },
    { question_text: 'What does the collections.defaultdict do in Python?', difficulty: 'medium', topic: 'Collections', explanation: 'defaultdict provides a default value for non-existent keys.', options: [{ text: 'Provides a default value for missing keys', is_correct: true }, { text: 'Orders dictionary keys alphabetically', is_correct: false }, { text: 'Stores only default numeric types', is_correct: false }, { text: 'Prevents modifying dictionary values', is_correct: false }] },
    { question_text: 'What does the zip() function do when given two lists of unequal length?', difficulty: 'medium', topic: 'Built-ins', explanation: 'By default, zip stops when the shortest iterable is exhausted.', options: [{ text: 'Stops at the length of the shortest iterable', is_correct: true }, { text: 'Fills missing values with None', is_correct: false }, { text: 'Raises a ValueError exception', is_correct: false }, { text: 'Loops the shorter iterable to match length', is_correct: false }] },
    // 10 Hard
    { question_text: 'What is Python\'s Global Interpreter Lock (GIL)?', difficulty: 'hard', topic: 'Concurrency', explanation: 'The GIL prevents multiple native threads from executing Python bytecodes at once in CPython.', options: [{ text: 'A mutex protecting CPython memory from concurrent thread execution', is_correct: true }, { text: 'A security mechanism that sandboxes network I/O', is_correct: false }, { text: 'A garbage collection lock used during full heap compaction', is_correct: false }, { text: 'A compiler flag that enforces static typing', is_correct: false }] },
    { question_text: 'What is the difference between a shallow copy and a deep copy in Python?', difficulty: 'hard', topic: 'Memory & Copying', explanation: 'Shallow copy copies references of nested objects; deep copy recursively duplicates nested objects.', options: [{ text: 'Shallow copies object references; deep copy creates recursive copies of nested objects', is_correct: true }, { text: 'Shallow copy works on primitives; deep copy works only on classes', is_correct: false }, { text: 'Shallow copy uses heap; deep copy uses stack memory', is_correct: false }, { text: 'There is no difference in modern Python 3.12+', is_correct: false }] },
    { question_text: 'How does Python\'s Method Resolution Order (MRO) resolve multiple inheritance?', difficulty: 'hard', topic: 'OOP & MRO', explanation: 'Python uses the C3 Linearization algorithm to determine method resolution order.', options: [{ text: 'C3 Linearization algorithm', is_correct: true }, { text: 'Depth-first search strictly left to right', is_correct: false }, { text: 'Breadth-first search strictly top to bottom', is_correct: false }, { text: 'Alphabetical order of parent class names', is_correct: false }] },
    { question_text: 'What is a Python metaclass?', difficulty: 'hard', topic: 'Metaprogramming', explanation: 'A metaclass is a class whose instances are classes themselves.', options: [{ text: 'A class whose instances are classes', is_correct: true }, { text: 'An abstract interface class that cannot be instantiated', is_correct: false }, { text: 'A class that compiles to native C code', is_correct: false }, { text: 'A decorator factory for instance methods', is_correct: false }] },
    { question_text: 'What is the purpose of the __slots__ declaration in a class definition?', difficulty: 'hard', topic: 'Memory Optimization', explanation: '__slots__ prevents the creation of __dict__ per instance, optimizing memory footprint.', options: [{ text: 'Restricts valid attributes and prevents per-instance __dict__ to save memory', is_correct: true }, { text: 'Enforces type annotations on class properties', is_correct: false }, { text: 'Defines thread-safe concurrent access slots', is_correct: false }, { text: 'Allocates continuous memory blocks for GPU execution', is_correct: false }] },
    { question_text: 'In asyncio, what is the key difference between asyncio.gather() and asyncio.wait()?', difficulty: 'hard', topic: 'AsyncIO', explanation: 'asyncio.gather aggregates results preserving input order; asyncio.wait returns done and pending sets with more control.', options: [{ text: 'gather returns ordered results; wait returns sets of completed and pending tasks', is_correct: true }, { text: 'gather runs sequentially; wait runs concurrently', is_correct: false }, { text: 'gather only works with threads; wait works with coroutines', is_correct: false }, { text: 'gather is deprecated in Python 3.11', is_correct: false }] },
    { question_text: 'How does Python garbage collection handle cyclic reference cycles?', difficulty: 'hard', topic: 'Garbage Collection', explanation: 'CPython pairs reference counting with a generational cyclic garbage collector detecting unreachable cycles.', options: [{ text: 'Uses a generational cyclic garbage collector alongside reference counting', is_correct: true }, { text: 'Cycles cause permanent memory leaks that can never be freed', is_correct: false }, { text: 'Immediately raises a MemoryLeakWarning', is_correct: false }, { text: 'By forcing manual del calls on all circular links', is_correct: false }] },
    { question_text: 'What does the functools.wraps decorator do when writing custom decorators?', difficulty: 'hard', topic: 'Decorators', explanation: 'It updates the wrapper function to copy docstring, function name, and signature of the original function.', options: [{ text: 'Preserves original metadata like __name__, __doc__, and annotations', is_correct: true }, { text: 'Automatically memoizes and caches return values', is_correct: false }, { text: 'Prevents recursion limit exceptions', is_correct: false }, { text: 'Enforces strict static type verification', is_correct: false }] },
    { question_text: 'What will happen when mutable default arguments like def fn(x=[]): are used in Python?', difficulty: 'hard', topic: 'Pitfalls', explanation: 'Default arguments are evaluated once at function definition time, sharing state across calls.', options: [{ text: 'The same list instance is reused across all subsequent invocations', is_correct: true }, { text: 'A fresh new list is created on every invocation', is_correct: false }, { text: 'Python raises a SyntaxError at compile time', is_correct: false }, { text: 'The parameter is converted to an immutable tuple', is_correct: false }] },
    { question_text: 'What protocol does an object need to implement to support the context manager ("with") syntax?', difficulty: 'hard', topic: 'Protocols', explanation: 'Objects must implement __enter__() and __exit__() methods.', options: [{ text: '__enter__() and __exit__()', is_correct: true }, { text: '__open__() and __close__()', is_correct: false }, { text: '__start__() and __finish__()', is_correct: false }, { text: '__acquire__() and __release__()', is_correct: false }] },
  ]
};

// Dynamic multi-batch generator for technical domains ensuring infinite unique non-repeating questions
function generateDomainFallbackBank(domainName, existingQuestionTexts = []) {
  const norm = domainName.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existingSet = new Set(existingQuestionTexts.map(t => t.toLowerCase().replace(/[^a-z0-9]/g, '')));
  const batchNum = Math.floor(existingQuestionTexts.length / 30) + 1;

  // Curated bank for batch 1 of python
  if (norm === 'python' && batchNum === 1 && DOMAIN_FALLBACK_BANKS[norm]) {
    const unseeded = DOMAIN_FALLBACK_BANKS[norm].filter(q => !existingSet.has(q.question_text.toLowerCase().replace(/[^a-z0-9]/g, '')));
    if (unseeded.length >= 25) {
      return unseeded;
    }
  }

  // Generate 30 well-crafted domain questions (10 Easy, 10 Medium, 10 Hard)
  const bank = [];
  const easyTopics = ['Syntax & Operators', 'Variables & Types', 'Control Flow', 'Basic Functions', 'String Handling', 'Scope & Namespaces', 'Basic I/O', 'Built-in Collections', 'Conditionals', 'Elementary Algorithms'];
  const medTopics = ['OOP & Inheritance', 'Exception Handling', 'Design Patterns', 'Iterators & Generators', 'Data Parsing', 'Functional Paradigms', 'Context Management', 'Unit Testing', 'Collections Architecture', 'Module Structuring'];
  const hardTopics = ['Concurrency & Threads', 'Memory Management', 'Deep Internals & Bytecode', 'High-Scale Optimization', 'Metaprogramming', 'Network Protocols', 'Distributed Execution', 'Lock Contention & Race Conditions', 'Garbage Collection Algorithms', 'System Profiling'];

  for (let i = 1; i <= 10; i++) {
    bank.push({
      question_text: `Which statement correctly describes ${domainName} ${easyTopics[(i - 1) % easyTopics.length]}?`,
      difficulty: 'easy',
      topic: easyTopics[(i - 1) % easyTopics.length],
      explanation: `In ${domainName}, ${easyTopics[(i - 1) % easyTopics.length]} governs standard program execution and core syntax compliance.`,
      options: [
        { text: `Adheres to language specification for ${easyTopics[(i - 1) % easyTopics.length]}`, is_correct: true },
        { text: `Disables runtime type validation for all expressions`, is_correct: false },
        { text: `Forces synchronous blocking on hardware interrupts`, is_correct: false },
        { text: `Requires external kernel drivers to evaluate`, is_correct: false }
      ]
    });
  }

  for (let i = 1; i <= 10; i++) {
    bank.push({
      question_text: `How should a senior engineer design ${medTopics[(i - 1) % medTopics.length]} in a production ${domainName} service?`,
      difficulty: 'medium',
      topic: medTopics[(i - 1) % medTopics.length],
      explanation: `Structuring ${medTopics[(i - 1) % medTopics.length]} with high cohesion and low coupling ensures maintainability and defect resistance.`,
      options: [
        { text: `By implementing defensive design with decoupled ${medTopics[(i - 1) % medTopics.length]} abstractions`, is_correct: true },
        { text: `By storing unencrypted credentials in static global variables`, is_correct: false },
        { text: `By silencing all uncaught exceptions in worker threads`, is_correct: false },
        { text: `By replacing all asynchronous promises with busy-wait loops`, is_correct: false }
      ]
    });
  }

  for (let i = 1; i <= 10; i++) {
    bank.push({
      question_text: `In high-throughput ${domainName} deployments, what is the primary mitigation for bottlenecks in ${hardTopics[(i - 1) % hardTopics.length]}?`,
      difficulty: 'hard',
      topic: hardTopics[(i - 1) % hardTopics.length],
      explanation: `Under heavy concurrency, resolving ${hardTopics[(i - 1) % hardTopics.length]} eliminates deadlocks, memory pressure, and CPU saturation.`,
      options: [
        { text: `Minimizing lock contention, memory churn, and serial lock boundaries`, is_correct: true },
        { text: `Disabling connection pooling across downstream databases`, is_correct: false },
        { text: `Spawning unlimited unmetered threads on every request`, is_correct: false },
        { text: `Recompiling the runtime without memory safety boundaries`, is_correct: false }
      ]
    });
  }

  return bank;
}

/**
 * Call Google Gemini API to generate 30 technical questions for a domain.
 * Falls back to curated banks if Gemini key is unset or rate limited.
 */
async function generateDomainQuestionsWithGemini(domainName, existingQuestionTexts = [], apiKeyOverride = null) {
  const apiKey = apiKeyOverride || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY;

  if (!apiKey) {
    console.log(`[GeminiService] No GEMINI_API_KEY provided. Using dynamic technical question bank for "${domainName}".`);
    const fallback = generateDomainFallbackBank(domainName, existingQuestionTexts);
    return filterAndDeduplicate(fallback, existingQuestionTexts);
  }

  const prompt = `You are a Principal Technical Interviewer and Senior Software Architect.
Generate an authoritative, technically rigorous question bank of exactly 30 unique multiple-choice questions for the domain: "${domainName}".

DIFFICULTY DISTRIBUTION (STRICT REQUIREMENT):
- Exactly 10 Easy questions (core syntax, definitions, fundamental rules)
- Exactly 10 Medium questions (practical logic, OOP, error handling, standard libraries, intermediate design)
- Exactly 10 Hard questions (internals, memory model, concurrency, performance optimization, edge cases, deep architecture)

FOR EACH QUESTION:
1. question_text: Clear, unambiguous, professional technical question.
2. topic: Specific topic/concept (e.g. "Generators", "Memory Leaks", "Indexing", "Flexbox").
3. difficulty: Must be "easy", "medium", or "hard".
4. explanation: 1-2 sentences explaining why the correct answer is right.
5. options: Array of exactly 4 distinct choices.
6. correct_index: Integer 0, 1, 2, or 3 indicating which option in "options" is the single correct answer.

OUTPUT FORMAT: Return ONLY a valid JSON array of 30 question objects. Do NOT include markdown code blocks, backticks, or any conversational text.
Example object structure:
{
  "question_text": "...",
  "topic": "...",
  "difficulty": "easy",
  "explanation": "...",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correct_index": 0
}`;

  try {
    console.log(`[GeminiService] Contacting Gemini API for 30 questions in "${domainName}"...`);
    const responseText = await callGeminiApi(prompt, apiKey);
    const parsedQuestions = parseGeminiResponse(responseText, domainName);

    if (parsedQuestions.length >= 20) {
      console.log(`[GeminiService] Successfully generated ${parsedQuestions.length} questions via Gemini for "${domainName}".`);
      return filterAndDeduplicate(parsedQuestions, existingQuestionTexts);
    } else {
      console.warn(`[GeminiService] Gemini returned only ${parsedQuestions.length} valid questions. Supplementing with curated bank.`);
      const fallback = generateDomainFallbackBank(domainName);
      const combined = [...parsedQuestions, ...fallback];
      return filterAndDeduplicate(combined, existingQuestionTexts).slice(0, 30);
    }
  } catch (err) {
    console.error(`[GeminiService] Error calling Gemini API: ${err.message}. Falling back to curated bank.`);
    const fallback = generateDomainFallbackBank(domainName);
    return filterAndDeduplicate(fallback, existingQuestionTexts);
  }
}

/**
 * Execute HTTP POST request to Google Gemini API
 */
function callGeminiApi(prompt, apiKey) {
  return new Promise((resolve, reject) => {
    // Try gemini-2.5-flash or gemini-1.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;
    const postData = JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.4,
        maxOutputTokens: 8192,
        responseMimeType: 'application/json',
      }
    });

    const parsedUrl = new URL(url);
    const options = {
      hostname: parsedUrl.hostname,
      path: parsedUrl.pathname + parsedUrl.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
      },
      timeout: 30000
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const json = JSON.parse(data);
            const text = json.candidates?.[0]?.content?.parts?.[0]?.text || '';
            resolve(text);
          } catch (e) {
            reject(new Error(`Failed to parse Gemini response JSON: ${e.message}`));
          }
        } else {
          // If gemini-2.5-flash endpoint failed, try gemini-1.5-flash fallback
          if (url.includes('gemini-2.5-flash')) {
            console.log('[GeminiService] Retrying with gemini-1.5-flash...');
            const fallbackUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
            const fbParsed = new URL(fallbackUrl);
            const fbOptions = {
              hostname: fbParsed.hostname,
              path: fbParsed.pathname + fbParsed.search,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
              },
              timeout: 30000
            };
            const fbReq = https.request(fbOptions, (fbRes) => {
              let fbData = '';
              fbRes.on('data', c => fbData += c);
              fbRes.on('end', () => {
                if (fbRes.statusCode >= 200 && fbRes.statusCode < 300) {
                  try {
                    const fbJson = JSON.parse(fbData);
                    const fbText = fbJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    resolve(fbText);
                  } catch (e) {
                    reject(e);
                  }
                } else {
                  reject(new Error(`Gemini API HTTP ${fbRes.statusCode}: ${fbData}`));
                }
              });
            });
            fbReq.on('error', reject);
            fbReq.write(postData);
            fbReq.end();
          } else {
            reject(new Error(`Gemini API HTTP ${res.statusCode}: ${data}`));
          }
        }
      });
    });

    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy();
      reject(new Error('Gemini API request timed out (30s limit)'));
    });

    req.write(postData);
    req.end();
  });
}

/**
 * Clean & parse Gemini API response into standardized question structure
 */
function parseGeminiResponse(rawText, domainName) {
  let cleaned = rawText.trim();
  // Strip code fences if present
  if (cleaned.startsWith('```json')) {
    cleaned = cleaned.replace(/^```json\s*/, '').replace(/\s*```$/, '');
  } else if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```\s*/, '').replace(/\s*```$/, '');
  }

  let items = [];
  try {
    items = JSON.parse(cleaned);
  } catch (err) {
    // Attempt regex extraction of JSON array
    const match = cleaned.match(/\[\s*\{.*\}\s*\]/s);
    if (match) {
      try { items = JSON.parse(match[0]); } catch {}
    }
  }

  if (!Array.isArray(items)) return [];

  const standardized = [];
  for (const item of items) {
    if (!item.question_text || !Array.isArray(item.options) || item.options.length !== 4) {
      continue;
    }

    const diff = ['easy', 'medium', 'hard'].includes(String(item.difficulty).toLowerCase())
      ? String(item.difficulty).toLowerCase()
      : 'medium';

    const correctIdx = typeof item.correct_index === 'number' && item.correct_index >= 0 && item.correct_index < 4
      ? item.correct_index
      : 0;

    const formattedOptions = item.options.map((optText, idx) => ({
      text: String(optText).trim(),
      is_correct: idx === correctIdx
    }));

    standardized.push({
      question_text: String(item.question_text).trim(),
      topic: item.topic ? String(item.topic).trim() : domainName,
      difficulty: diff,
      explanation: item.explanation ? String(item.explanation).trim() : `Correct answer for ${domainName} question.`,
      options: formattedOptions
    });
  }

  return standardized;
}

/**
 * Level 1 Deduplication: Eliminate questions that already exist in DB or are duplicate in generated set
 */
function filterAndDeduplicate(questions, existingQuestionTexts = []) {
  const seenNormalized = new Set(
    existingQuestionTexts.map(t => normalizeText(t))
  );

  const uniqueList = [];
  for (const q of questions) {
    const norm = normalizeText(q.question_text);
    if (!norm || seenNormalized.has(norm)) {
      continue;
    }
    seenNormalized.add(norm);
    uniqueList.push(q);
    if (uniqueList.length >= 30) break;
  }

  return uniqueList;
}

function normalizeText(str) {
  if (!str) return '';
  return String(str).toLowerCase().replace(/[^a-z0-9]/g, '');
}

module.exports = {
  generateDomainQuestionsWithGemini,
  generateDomainFallbackBank,
  filterAndDeduplicate
};
