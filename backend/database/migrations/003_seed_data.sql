-- ============================================================
-- STUDENT SKILL ASSESSMENT PLATFORM
-- Migration 003: Seed Data (Domains, Questions, Options, Bootcamps, Campaigns)
-- ============================================================

-- 1. SEED DOMAINS
INSERT INTO domains (id, name, slug, description, icon, color, difficulty, question_count, estimated_minutes, active, display_order)
VALUES
  ('d0000000-0000-0000-0000-000000000001', 'Python Development', 'python-programming', 'Core Python, OOP, decorators, data structures, concurrency, and ecosystem best practices.', '/domains/python.png', '#3b82f6', 'beginner', 10, 15, true, 1),
  ('d0000000-0000-0000-0000-000000000002', 'Full-Stack Web Dev', 'full-stack-web-development', 'Modern React, TypeScript, Node.js, REST APIs, state management, and web performance.', '/domains/web-dev.png', '#10b981', 'intermediate', 10, 20, true, 2),
  ('d0000000-0000-0000-0000-000000000003', 'Data Science & AI', 'data-science-machine-learning', 'Pandas, NumPy, Scikit-learn, statistical modeling, neural networks, and feature engineering.', '/domains/data-science.png', '#8b5cf6', 'intermediate', 10, 20, true, 3),
  ('d0000000-0000-0000-0000-000000000004', 'Java & Spring Boot', 'java-backend-architecture', 'Java 17+, JVM internals, Spring Boot REST microservices, concurrency, and JPA/Hibernate.', '/domains/java.png', '#f59e0b', 'intermediate', 10, 20, true, 4),
  ('d0000000-0000-0000-0000-000000000005', 'Cloud & DevOps', 'cloud-devops', 'Docker containerization, Kubernetes, CI/CD pipelines, AWS fundamentals, and Linux administration.', '/domains/cloud.png', '#06b6d4', 'advanced', 10, 25, true, 5),
  ('d0000000-0000-0000-0000-000000000006', 'Cybersecurity', 'cybersecurity-ethical-hacking', 'Network security protocols, OWASP Top 10 web vulnerabilities, cryptography, and penetration testing.', '/domains/cybersecurity.png', '#ef4444', 'advanced', 10, 25, true, 6)
ON CONFLICT (id) DO NOTHING;

-- 2. SEED QUESTIONS & OPTIONS (PYTHON)
INSERT INTO questions (id, domain_id, question_text, explanation, difficulty, marks, active, display_order)
VALUES
  ('e1000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000001', 'What is the output of print(type(5 / 2)) in Python 3?', 'In Python 3, the / operator always performs floating-point division and returns a float, even if both operands are integers.', 'easy', 1, true, 1),
  ('e1000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000001', 'Which of the following data structures in Python is immutable?', 'Tuples in Python cannot have their elements modified, added, or removed once created, making them immutable.', 'easy', 1, true, 2),
  ('e1000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000001', 'How does Python handle memory management and unused objects?', 'Python uses automatic reference counting combined with a cyclic garbage collector to detect and reclaim unreachable object reference cycles.', 'medium', 2, true, 3),
  ('e1000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000001', 'What does the Global Interpreter Lock (GIL) in CPython primarily prevent?', 'CPython GIL is a mutex that prevents multiple native threads from executing Python bytecode simultaneously, ensuring thread-safe memory management.', 'medium', 2, true, 4),
  ('e1000000-0000-0000-0000-000000000005', 'd0000000-0000-0000-0000-000000000001', 'What is the purpose of the "yield" keyword in a Python function?', 'The yield keyword turns a regular function into a generator function, pausing execution and saving its state between successive next() calls.', 'medium', 2, true, 5),
  ('e1000000-0000-0000-0000-000000000006', 'd0000000-0000-0000-0000-000000000001', 'What is the time complexity of looking up a key in a standard Python dictionary in the average case?', 'Python dictionaries are implemented using open addressing hash tables with perturbation, yielding O(1) average lookup time.', 'hard', 3, true, 6),
  ('e1000000-0000-0000-0000-000000000007', 'd0000000-0000-0000-0000-000000000001', 'In Python, what is the key difference between deepcopy() and copy() in the copy module?', 'copy() creates a shallow copy where compound objects contain references to original inner objects; deepcopy() recursively clones all nested objects.', 'medium', 2, true, 7),
  ('e1000000-0000-0000-0000-000000000008', 'd0000000-0000-0000-0000-000000000001', 'What does the functools.wraps decorator do when writing custom Python decorators?', 'functools.wraps copies original function metadata (such as __name__, __doc__, and annotations) onto the decorator wrapper function.', 'hard', 3, true, 8)
ON CONFLICT (id) DO NOTHING;

-- Options for Question 1
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000001', '<class ''int''>', 0, false),
  ('e1000000-0000-0000-0000-000000000001', '<class ''float''>', 1, true),
  ('e1000000-0000-0000-0000-000000000001', '<class ''double''>', 2, false),
  ('e1000000-0000-0000-0000-000000000001', '<class ''number''>', 3, false);

-- Options for Question 2
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000002', 'List', 0, false),
  ('e1000000-0000-0000-0000-000000000002', 'Dictionary', 1, false),
  ('e1000000-0000-0000-0000-000000000002', 'Tuple', 2, true),
  ('e1000000-0000-0000-0000-000000000002', 'Set', 3, false);

-- Options for Question 3
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000003', 'Manual memory deallocation using free()', 0, false),
  ('e1000000-0000-0000-0000-000000000003', 'Reference counting combined with a generational cyclic garbage collector', 1, true),
  ('e1000000-0000-0000-0000-000000000003', 'Stop-the-world tracing collector only', 2, false),
  ('e1000000-0000-0000-0000-000000000003', 'Static heap compaction during file execution', 3, false);

-- Options for Question 4
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000004', 'Multiple processes from communicating', 0, false),
  ('e1000000-0000-0000-0000-000000000004', 'Concurrent execution of native threads on multiple CPU cores in CPython', 1, true),
  ('e1000000-0000-0000-0000-000000000004', 'Asyncio event loops from handling network I/O', 2, false),
  ('e1000000-0000-0000-0000-000000000004', 'Recursive function calls from exceeding stack limit', 3, false);

-- Options for Question 5
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000005', 'Terminates the program immediately', 0, false),
  ('e1000000-0000-0000-0000-000000000005', 'Pauses function execution and produces a generator value to caller', 1, true),
  ('e1000000-0000-0000-0000-000000000005', 'Spawns a background thread', 2, false),
  ('e1000000-0000-0000-0000-000000000005', 'Forces garbage collection immediately', 3, false);

-- Options for Question 6
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000006', 'O(n)', 0, false),
  ('e1000000-0000-0000-0000-000000000006', 'O(log n)', 1, false),
  ('e1000000-0000-0000-0000-000000000006', 'O(1)', 2, true),
  ('e1000000-0000-0000-0000-000000000006', 'O(n log n)', 3, false);

-- Options for Question 7
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000007', 'deepcopy() only copies primitive types; copy() copies objects', 0, false),
  ('e1000000-0000-0000-0000-000000000007', 'copy() shares nested references while deepcopy() duplicates all nested objects recursively', 1, true),
  ('e1000000-0000-0000-0000-000000000007', 'deepcopy() is faster than copy() for large arrays', 2, false),
  ('e1000000-0000-0000-0000-000000000007', 'There is no difference in modern Python versions', 3, false);

-- Options for Question 8
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e1000000-0000-0000-0000-000000000008', 'Encrypts the source code of the wrapped function', 0, false),
  ('e1000000-0000-0000-0000-000000000008', 'Preserves original metadata such as __name__ and docstrings on wrapper functions', 1, true),
  ('e1000000-0000-0000-0000-000000000008', 'Limits function runtime to prevent infinite loops', 2, false),
  ('e1000000-0000-0000-0000-000000000008', 'Automatically converts sync functions to async', 3, false);

-- 3. SEED QUESTIONS & OPTIONS (FULL STACK WEB DEV)
INSERT INTO questions (id, domain_id, question_text, explanation, difficulty, marks, active, display_order)
VALUES
  ('e2000000-0000-0000-0000-000000000001', 'd0000000-0000-0000-0000-000000000002', 'What is the Virtual DOM in React and why does React use it?', 'The Virtual DOM is an in-memory representation of real DOM elements. React computes minimal diffs via reconciliation and batches real DOM updates to maximize rendering performance.', 'easy', 1, true, 1),
  ('e2000000-0000-0000-0000-000000000002', 'd0000000-0000-0000-0000-000000000002', 'In CSS Flexbox, which property aligns items along the cross-axis?', 'align-items aligns flex items along the cross axis, while justify-content aligns items along the main axis.', 'easy', 1, true, 2),
  ('e2000000-0000-0000-0000-000000000003', 'd0000000-0000-0000-0000-000000000002', 'What is the primary benefit of HTTP/2 over HTTP/1.1 for web applications?', 'HTTP/2 introduces binary framing and multiplexing, allowing multiple bidirectional requests and responses over a single TCP connection without head-of-line blocking.', 'medium', 2, true, 3),
  ('e2000000-0000-0000-0000-000000000004', 'd0000000-0000-0000-0000-000000000002', 'In React, what problem does the useCallback hook solve?', 'useCallback returns a memoized version of a callback function, preventing child components wrapped in React.memo from unnecessary re-renders due to reference changes.', 'medium', 2, true, 4)
ON CONFLICT (id) DO NOTHING;

-- Options for Full Stack Q1
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000001', 'A browser plugin that accelerates HTML canvas rendering', 0, false),
  ('e2000000-0000-0000-0000-000000000001', 'A lightweight in-memory tree that diffs changes before batching updates to the real browser DOM', 1, true),
  ('e2000000-0000-0000-0000-000000000001', 'A shadow root element for web components', 2, false),
  ('e2000000-0000-0000-0000-000000000001', 'A server-side cache for HTML templates', 3, false);

-- Options for Full Stack Q2
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000002', 'justify-content', 0, false),
  ('e2000000-0000-0000-0000-000000000002', 'align-items', 1, true),
  ('e2000000-0000-0000-0000-000000000002', 'flex-direction', 2, false),
  ('e2000000-0000-0000-0000-000000000002', 'place-content', 3, false);

-- Options for Full Stack Q3
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000003', 'Multiplexed request/response streams over a single TCP connection', 0, true),
  ('e2000000-0000-0000-0000-000000000003', 'Deprecation of TLS/SSL requirements', 1, false),
  ('e2000000-0000-0000-0000-000000000003', 'Removal of HTTP request headers', 2, false),
  ('e2000000-0000-0000-0000-000000000003', 'Direct peer-to-peer database connection', 3, false);

-- Options for Full Stack Q4
INSERT INTO question_options (question_id, option_text, option_order, is_correct) VALUES
  ('e2000000-0000-0000-0000-000000000004', 'Caches expensive computation results like math calculations', 0, false),
  ('e2000000-0000-0000-0000-000000000004', 'Memoizes callback function instances across component re-renders', 1, true),
  ('e2000000-0000-0000-0000-000000000004', 'Attaches event listeners to window objects', 2, false),
  ('e2000000-0000-0000-0000-000000000004', 'Handles global state dispatch actions', 3, false);

-- 4. SEED BOOTCAMPS
INSERT INTO bootcamps (id, domain_id, name, slug, description, benefits, mentor_name, mentor_bio, start_date, end_date, start_time, duration_weeks, mode, platform, total_seats, registered_seats, is_free, price, status, min_score_percentage, max_score_percentage, active)
VALUES
  (
    'b0000000-0000-0000-0000-000000000001',
    'd0000000-0000-0000-0000-000000000001',
    'Python & Backend Engineering Master Bootcamp',
    'python-backend-bootcamp',
    'A transformative 4-week live hands-on bootcamp taking you from syntax fundamentals to building production REST APIs, FastAPI microservices, and database pipelines.',
    ARRAY[
      'Live Weekend Coding Sessions (2 hours / session)',
      '1-on-1 Code Reviews from Senior Engineers',
      'Production Capstone Project for GitHub Portfolio',
      'Verified Certificate of Completion & Internship Referral'
    ],
    'Dr. Alex Mercer',
    'Ex-Staff Engineer at TechCorp, 12+ years building distributed Python backends serving 10M+ users.',
    CURRENT_DATE + INTERVAL '14 days',
    CURRENT_DATE + INTERVAL '42 days',
    '18:30:00',
    4,
    'online',
    'Zoom Live & Discord Community',
    150,
    38,
    true,
    0.00,
    'upcoming',
    35,
    100,
    true
  ),
  (
    'b0000000-0000-0000-0000-000000000002',
    'd0000000-0000-0000-0000-000000000002',
    'Full-Stack Modern Web & AI Bootcamp',
    'fullstack-ai-bootcamp',
    'Master modern React, TypeScript, Next.js, and integrating LLMs/AI APIs into interactive web applications with cloud deployments.',
    ARRAY[
      'Hands-on full stack project with Supabase & Next.js',
      'Real-world AI integration (OpenAI, Anthropic APIs)',
      'Resume & LinkedIn optimization workshop included',
      'Direct interview prep with placement partners'
    ],
    'Sarah Lin',
    'Principal Frontend Architect & Google Developer Expert (GDE), creator of multiple viral open-source packages.',
    CURRENT_DATE + INTERVAL '21 days',
    CURRENT_DATE + INTERVAL '49 days',
    '19:00:00',
    4,
    'online',
    'Zoom Live & Dedicated Slack Channel',
    200,
    64,
    true,
    0.00,
    'upcoming',
    30,
    100,
    true
  )
ON CONFLICT (id) DO NOTHING;

-- 5. SEED CAMPAIGNS
INSERT INTO campaigns (id, name, code, utm_source, utm_medium, utm_campaign, description, total_visitors, total_registrations, total_quiz_starts, total_quiz_completions, total_bootcamp_registrations, total_hot_leads, total_conversions, active, start_date)
VALUES
  (
    'c0000000-0000-0000-0000-000000000001',
    'Campus Ambassador College Outreach 2026',
    'campus26',
    'whatsapp',
    'community',
    'campus_ambassador_q1',
    'WhatsApp broadcast and community link shared across 50+ college engineering groups.',
    1420,
    380,
    340,
    295,
    112,
    88,
    112,
    true,
    CURRENT_DATE - INTERVAL '30 days'
  ),
  (
    'c0000000-0000-0000-0000-000000000002',
    'Instagram Reel: Tech Skill Gap 2026',
    'instaskill',
    'instagram',
    'organic_reel',
    'python_challenge_aug',
    'Viral short-form video demonstrating common interview mistakes with link in bio.',
    3200,
    890,
    780,
    640,
    245,
    190,
    245,
    true,
    CURRENT_DATE - INTERVAL '20 days'
  ),
  (
    'c0000000-0000-0000-0000-000000000003',
    'LinkedIn Sponsored Placement Prep',
    'licareer',
    'linkedin',
    'cpc',
    'fsd_bootcamp_leadgen',
    'Sponsored campaign aimed at recent graduates and final year students looking for tech placements.',
    890,
    210,
    195,
    175,
    84,
    62,
    84,
    true,
    CURRENT_DATE - INTERVAL '10 days'
  )
ON CONFLICT (id) DO NOTHING;
