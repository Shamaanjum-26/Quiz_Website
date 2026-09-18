import type { Question } from '@/types';

// Curated questions for major tech domains
const DOMAIN_QUESTIONS: Record<string, any[]> = {
  python: [
    {
      id: 'py-1',
      question_text: 'What is the output of print(type(5 / 2)) in Python 3?',
      difficulty: 'easy',
      marks: 1,
      options: [
        { id: 'py-1-a', option_text: "<class 'float'>", is_correct: true },
        { id: 'py-1-b', option_text: "<class 'int'>", is_correct: false },
        { id: 'py-1-c', option_text: "<class 'double'>", is_correct: false },
        { id: 'py-1-d', option_text: "<class 'number'>", is_correct: false },
      ],
    },
    {
      id: 'py-2',
      question_text: 'Which of the following data types in Python is immutable?',
      difficulty: 'easy',
      marks: 1,
      options: [
        { id: 'py-2-a', option_text: 'Tuple', is_correct: true },
        { id: 'py-2-b', option_text: 'List', is_correct: false },
        { id: 'py-2-c', option_text: 'Dictionary', is_correct: false },
        { id: 'py-2-d', option_text: 'Set', is_correct: false },
      ],
    },
    {
      id: 'py-3',
      question_text: 'What keyword is used to define an anonymous function in Python?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'py-3-a', option_text: 'lambda', is_correct: true },
        { id: 'py-3-b', option_text: 'def', is_correct: false },
        { id: 'py-3-c', option_text: 'func', is_correct: false },
        { id: 'py-3-d', option_text: 'inline', is_correct: false },
      ],
    },
    {
      id: 'py-4',
      question_text: 'What does the *args parameter represent in a Python function definition?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'py-4-a', option_text: 'Variable length non-keyword positional arguments', is_correct: true },
        { id: 'py-4-b', option_text: 'Keyword arguments dictionary', is_correct: false },
        { id: 'py-4-c', option_text: 'Default arguments list', is_correct: false },
        { id: 'py-4-d', option_text: 'Pointer to a tuple', is_correct: false },
      ],
    },
    {
      id: 'py-5',
      question_text: 'What is the time complexity of looking up a key in a standard Python dictionary on average?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'py-5-a', option_text: 'O(1)', is_correct: true },
        { id: 'py-5-b', option_text: 'O(n)', is_correct: false },
        { id: 'py-5-c', option_text: 'O(log n)', is_correct: false },
        { id: 'py-5-d', option_text: 'O(n log n)', is_correct: false },
      ],
    },
  ],

  javascript: [
    {
      id: 'js-1',
      question_text: 'What is the result of typeof NaN in JavaScript?',
      difficulty: 'easy',
      marks: 1,
      options: [
        { id: 'js-1-a', option_text: '"number"', is_correct: true },
        { id: 'js-1-b', option_text: '"nan"', is_correct: false },
        { id: 'js-1-c', option_text: '"undefined"', is_correct: false },
        { id: 'js-1-d', option_text: '"object"', is_correct: false },
      ],
    },
    {
      id: 'js-2',
      question_text: 'Which statement accurately describes JavaScript closures?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'js-2-a', option_text: 'A function that remembers its lexical environment and variables from outer scope', is_correct: true },
        { id: 'js-2-b', option_text: 'A function that executes immediately upon creation', is_correct: false },
        { id: 'js-2-c', option_text: 'A method to close open network sockets in Node.js', is_correct: false },
        { id: 'js-2-d', option_text: 'A strict mode compiler optimization', is_correct: false },
      ],
    },
    {
      id: 'js-3',
      question_text: 'What does Promise.all() do when one of the passed promises rejects?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'js-3-a', option_text: 'Immediately rejects with the reason of the first rejected promise', is_correct: true },
        { id: 'js-3-b', option_text: 'Waits for all other promises to resolve first', is_correct: false },
        { id: 'js-3-c', option_text: 'Ignores the error and resolves remaining values', is_correct: false },
        { id: 'js-3-d', option_text: 'Returns undefined', is_correct: false },
      ],
    },
  ],

  react: [
    {
      id: 'react-1',
      question_text: 'What hook is primarily used to perform side effects in functional React components?',
      difficulty: 'easy',
      marks: 1,
      options: [
        { id: 'react-1-a', option_text: 'useEffect', is_correct: true },
        { id: 'react-1-b', option_text: 'useState', is_correct: false },
        { id: 'react-1-c', option_text: 'useSideEffect', is_correct: false },
        { id: 'react-1-d', option_text: 'useAction', is_correct: false },
      ],
    },
    {
      id: 'react-2',
      question_text: 'Why do we need unique "key" props when rendering lists in React?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'react-2-a', option_text: 'To help React identify which items have changed, added, or removed for reconciliation', is_correct: true },
        { id: 'react-2-b', option_text: 'To apply CSS styling dynamically', is_correct: false },
        { id: 'react-2-c', option_text: 'To bind onClick events properly', is_correct: false },
        { id: 'react-2-d', option_text: 'To encrypt DOM nodes in memory', is_correct: false },
      ],
    },
    {
      id: 'react-3',
      question_text: 'What does React.useMemo() primarily achieve?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'react-3-a', option_text: 'Memoizes expensive computed values across re-renders', is_correct: true },
        { id: 'react-3-b', option_text: 'Persists component state into localStorage', is_correct: false },
        { id: 'react-3-c', option_text: 'Memoizes callback functions only', is_correct: false },
        { id: 'react-3-d', option_text: 'Fetches cached HTTP API responses', is_correct: false },
      ],
    },
  ],

  java: [
    {
      id: 'java-1',
      question_text: 'Which memory area in the JVM stores objects and instance variables?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'java-1-a', option_text: 'Heap Memory', is_correct: true },
        { id: 'java-1-b', option_text: 'Stack Memory', is_correct: false },
        { id: 'java-1-c', option_text: 'Method Area', is_correct: false },
        { id: 'java-1-d', option_text: 'Native Memory', is_correct: false },
      ],
    },
    {
      id: 'java-2',
      question_text: 'Which of the following is true regarding Java Interfaces starting from Java 8?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'java-2-a', option_text: 'They can contain default and static method implementations', is_correct: true },
        { id: 'java-2-b', option_text: 'They can instantiate objects directly', is_correct: false },
        { id: 'java-2-c', option_text: 'They cannot contain constants', is_correct: false },
        { id: 'java-2-d', option_text: 'They allow multiple class inheritance of state', is_correct: false },
      ],
    },
  ],

  cpp: [
    {
      id: 'cpp-1',
      question_text: 'What is the difference between a pointer and a reference in C++?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'cpp-1-a', option_text: 'A pointer can be null and reassigned; a reference cannot be null and binds once', is_correct: true },
        { id: 'cpp-1-b', option_text: 'A reference requires dereferencing with * operator', is_correct: false },
        { id: 'cpp-1-c', option_text: 'Pointers use no stack memory', is_correct: false },
        { id: 'cpp-1-d', option_text: 'References allocate heap memory automatically', is_correct: false },
      ],
    },
  ],

  dsa: [
    {
      id: 'dsa-1',
      question_text: 'What is the worst-case time complexity of QuickSort?',
      difficulty: 'medium',
      marks: 1,
      options: [
        { id: 'dsa-1-a', option_text: 'O(n²)', is_correct: true },
        { id: 'dsa-1-b', option_text: 'O(n log n)', is_correct: false },
        { id: 'dsa-1-c', option_text: 'O(n)', is_correct: false },
        { id: 'dsa-1-d', option_text: 'O(log n)', is_correct: false },
      ],
    },
    {
      id: 'dsa-2',
      question_text: 'Which data structure follows the LIFO (Last In First Out) principle?',
      difficulty: 'easy',
      marks: 1,
      options: [
        { id: 'dsa-2-a', option_text: 'Stack', is_correct: true },
        { id: 'dsa-2-b', option_text: 'Queue', is_correct: false },
        { id: 'dsa-2-c', option_text: 'Binary Heap', is_correct: false },
        { id: 'dsa-2-d', option_text: 'Linked List', is_correct: false },
      ],
    },
  ],
};

// Generate tailored dynamic questions for ANY domain or custom topic matching exact admin setting
export function getDomainQuestions(
  domainSlug: string,
  domainName?: string,
  targetCount: number = 10
): Question[] {
  const cleanSlug = (domainSlug || '').toLowerCase().trim();
  const title = domainName || cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const count = Math.max(1, Math.min(50, targetCount || 10));

  const questions: Question[] = [];

  // 1. Check direct curated match first
  for (const [key, qList] of Object.entries(DOMAIN_QUESTIONS)) {
    if (cleanSlug.includes(key) || key.includes(cleanSlug)) {
      (qList as any[]).forEach((q, idx) => {
        const diff: 'easy' | 'medium' | 'hard' = q.difficulty || 'medium';
        const qId = `${cleanSlug}-curated-${idx + 1}`;
        questions.push({
          ...q,
          id: qId,
          tier_label: q.tier_label || (diff === 'easy' ? 'Foundational' : diff === 'medium' ? 'Core Applied' : 'Advanced Architecture'),
          domain_id: domainSlug,
          active: true,
          display_order: idx + 1,
          created_at: '',
          updated_at: '',
          options: (q.options || []).map((o: any, oIdx: number) => ({
            id: o.id || `${qId}-${String.fromCharCode(97 + oIdx)}`,
            question_id: qId,
            option_text: o.option_text,
            option_order: o.option_order || oIdx + 1,
            is_correct: !!o.is_correct,
          })),
        });
      });
      break;
    }
  }

  // If we already have enough questions from curated list, return exact slice
  if (questions.length >= count) {
    return questions.slice(0, count);
  }

  // Is this a core engineering / non-tech / management subject?
  const isNonTech = /mech|civil|eee|ece|electric|chem|biotech|aero|industr|mba|mgmt|manage|finan|acc|hr|market|supply|sales|design|ui|ux|graphic|writing/i.test(cleanSlug);

  const techTemplates = [
    {
      q: `What is the core paradigm and primary operational model of ${title}?`,
      correct: `Efficient, modular architecture and industry-standard computational execution in ${title}`,
      distractors: [
        `Exclusive low-level firmware binary patching without abstraction`,
        `Uncompiled runtime RAM buffering exclusively without state`,
        `Monolithic unversioned storage procedures only`,
      ],
      diff: 'easy' as const,
    },
    {
      q: `Which best practice is crucial when structuring production systems in ${title}?`,
      correct: `Clean separation of concerns, defensive error handling, and automated unit testing`,
      distractors: [
        `Consistently relying on global mutable state variables across modules`,
        `Disabling type checks and suppression of runtime exceptions`,
        `Embedding unencrypted API keys and connection secrets in client code`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `How are concurrency and asynchronous workloads safely handled in ${title}?`,
      correct: `Via event loops, promises/futures, or managed worker thread pools with mutex locking`,
      distractors: [
        `By deliberately blocking the main execution thread during long I/O operations`,
        `Through continuous busy-wait while-true loops without sleep intervals`,
        `By bypassing operating system scheduling entirely`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `What is a critical cybersecurity consideration when building services with ${title}?`,
      correct: `Rigorous input validation, least-privilege access control, and rapid CVE patch adoption`,
      distractors: [
        `Directly concatenating unvalidated raw client input into database queries`,
        `Disabling HTTPS encryption and cross-origin security headers for convenience`,
        `Storing plain-text passwords without salt or cryptographic hashing`,
      ],
      diff: 'hard' as const,
    },
    {
      q: `Which performance optimization technique yields the greatest impact in ${title}?`,
      correct: `Minimizing time complexity (Big-O), optimizing memory allocations, and leveraging cache tiers`,
      distractors: [
        `Reducing the length of descriptive variable and function names in source files`,
        `Adding excessive logging statements inside high-frequency inner loops`,
        `Increasing thread count indefinitely beyond physical hardware CPU core limits`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `How should exception handling and error resilience be implemented in ${title}?`,
      correct: `Using structured try-catch blocks with granular error categorization and graceful degradation`,
      distractors: [
        `Silently swallowing all runtime errors with empty catch handlers`,
        `Terminating the entire application process immediately on any warning`,
        `Allowing uncaught exceptions to expose raw internal stack traces to end users`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `When integrating persistent storage or database transactions in ${title}, what principle ensures consistency?`,
      correct: `Adherence to ACID transactions or eventual consistency patterns with atomic commit operations`,
      distractors: [
        `Writing records directly to disk cache without write-ahead logging`,
        `Ignoring database foreign key constraints to increase write throughput`,
        `Performing multi-table mutations without rollback mechanisms on failure`,
      ],
      diff: 'hard' as const,
    },
    {
      q: `What role does automated unit and integration testing play in ${title} development lifecycle?`,
      correct: `Guarantees regression safety, validates business requirements, and accelerates CI/CD pipelines`,
      distractors: [
        `Slows down deployment velocity with no tangible benefit to code stability`,
        `Eliminates the requirement for code review and production telemetry`,
        `Guarantees that software will never encounter runtime hardware bottlenecks`,
      ],
      diff: 'easy' as const,
    },
    {
      q: `Which approach is considered standard for managing dependencies and libraries in ${title}?`,
      correct: `Locking exact package versions via dependency manifests to ensure reproducible builds`,
      distractors: [
        `Manually copying third-party library files into arbitrary system paths without tracking`,
        `Always using wildcards to pull unstable latest nightly releases in production`,
        `Disabling checksum verification during package installation`,
      ],
      diff: 'easy' as const,
    },
    {
      q: `How does memory management and resource reclamation function within ${title} runtimes?`,
      correct: `Through automatic generational garbage collection, reference counting, or deterministic RAII scopes`,
      distractors: [
        `Allocating memory indefinitely without reclaiming unreferenced objects`,
        `Forcing manual byte-level heap manipulation on every variable assignment`,
        `Operating systems completely prohibit dynamic heap memory allocations in ${title}`,
      ],
      diff: 'hard' as const,
    },
  ];

  const nonTechTemplates = [
    {
      q: `What is the primary objective and fundamental methodology of ${title}?`,
      correct: `Systematic problem-solving, quality optimization, and industry standard execution in ${title}`,
      distractors: [
        `Ad-hoc manual estimation without adhering to safety or regulatory frameworks`,
        `Elimination of documentation, peer review, and verification protocols`,
        `Relying solely on outdated legacy techniques without analytical tools`,
      ],
      diff: 'easy' as const,
    },
    {
      q: `Which core principle is essential for maintaining high quality and efficiency in ${title}?`,
      correct: `Standardized workflows, thorough risk assessment, and continuous iteration`,
      distractors: [
        `Operating without tolerance limits or measurable performance metrics`,
        `Ignoring safety margins and international compliance guidelines`,
        `Maximizing short-term speed by skipping critical inspection steps`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `How do professionals in ${title} effectively evaluate and mitigate operational risks?`,
      correct: `By conducting failure mode analysis, stress testing, and structured audits`,
      distractors: [
        `By assuming optimal conditions and disregarding environmental variables`,
        `Through reactive measures only after catastrophic system failure occurs`,
        `By delegating all responsibility without documented guidelines`,
      ],
      diff: 'medium' as const,
    },
    {
      q: `Which metric is most vital when evaluating project success and productivity in ${title}?`,
      correct: `Yield accuracy, resource efficiency, safety compliance, and measurable ROI`,
      distractors: [
        `Number of theoretical meetings conducted per week`,
        `Physical weight of printed paper documentation`,
        `Arbitrary subjective opinions without empirical validation`,
      ],
      diff: 'hard' as const,
    },
    {
      q: `What modern technological advancement is having the greatest transformative impact on ${title}?`,
      correct: `Digital simulations, AI-driven predictive modeling, and automated workflows`,
      distractors: [
        `Manual drafting with pencil and tracing paper exclusively`,
        `Elimination of computing devices from professional practice`,
        `Unregulated decentralized paper registries`,
      ],
      diff: 'medium' as const,
    },
  ];

  const templates = isNonTech ? nonTechTemplates : techTemplates;

  let templateIndex = 0;
  while (questions.length < count) {
    const tmpl = templates[templateIndex % templates.length];
    const qNum = questions.length + 1;
    const cycle = Math.floor(templateIndex / templates.length);
    const suffix = cycle > 0 ? ` (Advanced Concept Part ${cycle + 1})` : '';

    const qId = `${cleanSlug}-q${qNum}`;

    const rawOptions = [
      { text: tmpl.correct, isCorrect: true },
      ...tmpl.distractors.map((d) => ({ text: d, isCorrect: false })),
    ];
    const shuffled = [...rawOptions].sort((a, b) => {
      const hA = (a.text.charCodeAt(0) * (qNum + 1)) % 7;
      const hB = (b.text.charCodeAt(0) * (qNum + 1)) % 7;
      return hA - hB;
    });

    questions.push({
      id: qId,
      tier_label: tmpl.diff === 'easy' ? 'Foundational' : tmpl.diff === 'medium' ? 'Core Applied' : 'Advanced Architecture',
      question_text: tmpl.q + suffix,
      difficulty: tmpl.diff,
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: qNum,
      created_at: '',
      updated_at: '',
      options: shuffled.map((opt, oIdx) => ({
        id: `${qId}-${String.fromCharCode(97 + oIdx)}`,
        question_id: qId,
        option_text: opt.text,
        option_order: oIdx + 1,
        is_correct: opt.isCorrect,
      })),
    });

    templateIndex++;
  }

  return questions.slice(0, count);
}
