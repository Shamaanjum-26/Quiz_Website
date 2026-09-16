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

// Generate tailored dynamic questions for ANY domain or custom topic
export function getDomainQuestions(domainSlug: string, domainName?: string): Question[] {
  const cleanSlug = (domainSlug || '').toLowerCase().trim();
  const title = domainName || cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  // Check direct match
  for (const [key, qList] of Object.entries(DOMAIN_QUESTIONS)) {
    if (cleanSlug.includes(key) || key.includes(cleanSlug)) {
      return (qList as Question[]).map((q) => ({
        ...q,
        domain_id: domainSlug,
        active: true,
        display_order: 1,
        created_at: '',
        updated_at: '',
        options: (q.options || []).map((o: any) => ({ ...o, question_id: q.id })),
      }));
    }
  }

  // Is this a core engineering / non-tech / management subject?
  const isNonTech = /mech|civil|eee|ece|electric|chem|biotech|aero|industr|mba|mgmt|manage|finan|acc|hr|market|supply|sales|design|ui|ux|graphic|writing/i.test(cleanSlug);

  if (isNonTech) {
    return [
      {
        id: `${cleanSlug}-q1`,
        question_text: `What is the primary objective and fundamental methodology of ${title}?`,
        difficulty: 'easy',
        marks: 1,
        domain_id: domainSlug,
        active: true,
        display_order: 1,
        created_at: '',
        updated_at: '',
        options: [
          { id: `${cleanSlug}-q1-a`, question_id: `${cleanSlug}-q1`, option_text: `Systematic problem-solving, quality optimization, and industry standard execution in ${title}`, is_correct: true },
          { id: `${cleanSlug}-q1-b`, question_id: `${cleanSlug}-q1`, option_text: `Ad-hoc manual estimation without adhering to safety or regulatory frameworks`, is_correct: false },
          { id: `${cleanSlug}-q1-c`, question_id: `${cleanSlug}-q1`, option_text: `Elimination of documentation, peer review, and verification protocols`, is_correct: false },
          { id: `${cleanSlug}-q1-d`, question_id: `${cleanSlug}-q1`, option_text: `Relying solely on outdated legacy techniques without analytical tools`, is_correct: false },
        ],
      },
      {
        id: `${cleanSlug}-q2`,
        question_text: `Which core principle is essential for maintaining high quality and efficiency in ${title}?`,
        difficulty: 'medium',
        marks: 1,
        domain_id: domainSlug,
        active: true,
        display_order: 2,
        created_at: '',
        updated_at: '',
        options: [
          { id: `${cleanSlug}-q2-a`, question_id: `${cleanSlug}-q2`, option_text: `Standardized workflows, thorough risk assessment, and continuous iteration`, is_correct: true },
          { id: `${cleanSlug}-q2-b`, question_id: `${cleanSlug}-q2`, option_text: `Operating without tolerance limits or measurable performance metrics`, is_correct: false },
          { id: `${cleanSlug}-q2-c`, question_id: `${cleanSlug}-q2`, option_text: `Ignoring safety margins and international compliance guidelines`, is_correct: false },
          { id: `${cleanSlug}-q2-d`, question_id: `${cleanSlug}-q2`, option_text: `Maximizing short-term speed by skipping critical inspection steps`, is_correct: false },
        ],
      },
      {
        id: `${cleanSlug}-q3`,
        question_text: `How do professionals in ${title} effectively evaluate and mitigate operational risks?`,
        difficulty: 'medium',
        marks: 1,
        domain_id: domainSlug,
        active: true,
        display_order: 3,
        created_at: '',
        updated_at: '',
        options: [
          { id: `${cleanSlug}-q3-a`, question_id: `${cleanSlug}-q3`, option_text: `By conducting failure mode analysis, stress testing, and structured audits`, is_correct: true },
          { id: `${cleanSlug}-q3-b`, question_id: `${cleanSlug}-q3`, option_text: `By assuming optimal conditions and disregarding environmental variables`, is_correct: false },
          { id: `${cleanSlug}-q3-c`, question_id: `${cleanSlug}-q3`, option_text: `Through reactive measures only after catastrophic system failure occurs`, is_correct: false },
          { id: `${cleanSlug}-q3-d`, question_id: `${cleanSlug}-q3`, option_text: `By delegating all responsibility without documented guidelines`, is_correct: false },
        ],
      },
      {
        id: `${cleanSlug}-q4`,
        question_text: `Which metric is most vital when evaluating project success and productivity in ${title}?`,
        difficulty: 'hard',
        marks: 1,
        domain_id: domainSlug,
        active: true,
        display_order: 4,
        created_at: '',
        updated_at: '',
        options: [
          { id: `${cleanSlug}-q4-a`, question_id: `${cleanSlug}-q4`, option_text: `Yield accuracy, resource efficiency, safety compliance, and measurable ROI`, is_correct: true },
          { id: `${cleanSlug}-q4-b`, question_id: `${cleanSlug}-q4`, option_text: `Number of theoretical meetings conducted per week`, is_correct: false },
          { id: `${cleanSlug}-q4-c`, question_id: `${cleanSlug}-q4`, option_text: `Physical weight of printed paper documentation`, is_correct: false },
          { id: `${cleanSlug}-q4-d`, question_id: `${cleanSlug}-q4`, option_text: `Arbitrary subjective opinions without empirical validation`, is_correct: false },
        ],
      },
      {
        id: `${cleanSlug}-q5`,
        question_text: `What modern technological advancement is having the greatest transformative impact on ${title}?`,
        difficulty: 'medium',
        marks: 1,
        domain_id: domainSlug,
        active: true,
        display_order: 5,
        created_at: '',
        updated_at: '',
        options: [
          { id: `${cleanSlug}-q5-a`, question_id: `${cleanSlug}-q5`, option_text: `Digital simulations, AI-driven predictive modeling, and automated workflows`, is_correct: true },
          { id: `${cleanSlug}-q5-b`, question_id: `${cleanSlug}-q5`, option_text: `Manual drafting with pencil and tracing paper exclusively`, is_correct: false },
          { id: `${cleanSlug}-q5-c`, question_id: `${cleanSlug}-q5`, option_text: `Elimination of computing devices from professional practice`, is_correct: false },
          { id: `${cleanSlug}-q5-d`, question_id: `${cleanSlug}-q5`, option_text: `Unregulated decentralized paper registries`, is_correct: false },
        ],
      },
    ] as Question[];
  }

  // Tech / Software questions (default)
  return [
    {
      id: `${cleanSlug}-q1`,
      question_text: `What is the core paradigm and primary use case of ${title}?`,
      difficulty: 'easy',
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: 1,
      created_at: '',
      updated_at: '',
      options: [
        { id: `${cleanSlug}-q1-a`, question_id: `${cleanSlug}-q1`, option_text: `Efficient, modular development and industry standard problem-solving in ${title}`, is_correct: true },
        { id: `${cleanSlug}-q1-b`, question_id: `${cleanSlug}-q1`, option_text: `Exclusive legacy hardware firmware replacement without abstraction`, is_correct: false },
        { id: `${cleanSlug}-q1-c`, question_id: `${cleanSlug}-q1`, option_text: `Uncompiled runtime memory buffering exclusively`, is_correct: false },
        { id: `${cleanSlug}-q1-d`, question_id: `${cleanSlug}-q1`, option_text: `Static linear database indexing mechanism only`, is_correct: false },
      ],
    },
    {
      id: `${cleanSlug}-q2`,
      question_text: `Which of the following best practices is recommended when writing production-grade ${title} code?`,
      difficulty: 'medium',
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: 2,
      created_at: '',
      updated_at: '',
      options: [
        { id: `${cleanSlug}-q2-a`, question_id: `${cleanSlug}-q2`, option_text: `Clean separation of concerns, robust error handling, and unit test coverage`, is_correct: true },
        { id: `${cleanSlug}-q2-b`, question_id: `${cleanSlug}-q2`, option_text: `Relying entirely on global mutable state variables`, is_correct: false },
        { id: `${cleanSlug}-q2-c`, question_id: `${cleanSlug}-q2`, option_text: `Disabling type checks and exception catching blocks`, is_correct: false },
        { id: `${cleanSlug}-q2-d`, question_id: `${cleanSlug}-q2`, option_text: `Hardcoding sensitive credentials and API tokens inside codebase`, is_correct: false },
      ],
    },
    {
      id: `${cleanSlug}-q3`,
      question_text: `In modern ${title} architecture, how are concurrency and asynchronous execution typically handled?`,
      difficulty: 'medium',
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: 3,
      created_at: '',
      updated_at: '',
      options: [
        { id: `${cleanSlug}-q3-a`, question_id: `${cleanSlug}-q3`, option_text: `Through event-driven loops, promises/futures, or managed thread workers`, is_correct: true },
        { id: `${cleanSlug}-q3-b`, question_id: `${cleanSlug}-q3`, option_text: `By freezing the main thread until synchronous I/O completes`, is_correct: false },
        { id: `${cleanSlug}-q3-c`, question_id: `${cleanSlug}-q3`, option_text: `Concurrency is not supported in modern computing`, is_correct: false },
        { id: `${cleanSlug}-q3-d`, question_id: `${cleanSlug}-q3`, option_text: `Through infinite while-true polling loops without delay`, is_correct: false },
      ],
    },
    {
      id: `${cleanSlug}-q4`,
      question_text: `What is a key security consideration when deploying applications built with ${title}?`,
      difficulty: 'hard',
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: 4,
      created_at: '',
      updated_at: '',
      options: [
        { id: `${cleanSlug}-q4-a`, question_id: `${cleanSlug}-q4`, option_text: `Sanitizing all user inputs, enforcing least privilege, and patching dependency vulnerabilities`, is_correct: true },
        { id: `${cleanSlug}-q4-b`, question_id: `${cleanSlug}-q4`, option_text: `Exposing database connection strings to client-side code`, is_correct: false },
        { id: `${cleanSlug}-q4-c`, question_id: `${cleanSlug}-q4`, option_text: `Disabling HTTPS and CORS validation headers`, is_correct: false },
        { id: `${cleanSlug}-q4-d`, question_id: `${cleanSlug}-q4`, option_text: `Storing plain-text passwords without salt or hashing`, is_correct: false },
      ],
    },
    {
      id: `${cleanSlug}-q5`,
      question_text: `Which metric is most crucial when optimizing runtime performance in ${title}?`,
      difficulty: 'medium',
      marks: 1,
      domain_id: domainSlug,
      active: true,
      display_order: 5,
      created_at: '',
      updated_at: '',
      options: [
        { id: `${cleanSlug}-q5-a`, question_id: `${cleanSlug}-q5`, option_text: `Algorithmic time complexity (Big-O) and efficient memory footprint`, is_correct: true },
        { id: `${cleanSlug}-q5-b`, question_id: `${cleanSlug}-q5`, option_text: `Number of characters in the variable names`, is_correct: false },
        { id: `${cleanSlug}-q5-c`, question_id: `${cleanSlug}-q5`, option_text: `Color palette of the user terminal`, is_correct: false },
        { id: `${cleanSlug}-q5-d`, question_id: `${cleanSlug}-q5`, option_text: `The file size of static comment lines`, is_correct: false },
      ],
    },
  ] as Question[];
}
