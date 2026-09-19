const fs = require('fs');
const path = require('path');
const { supabaseFetch } = require('../lib/supabaseAdmin');

const DOMAIN_QUESTIONS = {
  'ai-ml': [
    {
      q: 'Which learning paradigm relies on labeled training datasets consisting of input-output pairs?',
      opts: ['Supervised Learning', 'Unsupervised Learning', 'Reinforcement Learning', 'Self-Supervised Clustering'],
      ans: 0
    },
    {
      q: 'In Machine Learning, what does a model with "high variance" typically suffer from?',
      opts: ['Overfitting to training data', 'Underfitting the underlying trend', 'Inability to learn simple linear relationships', 'Excessive training regularization'],
      ans: 0
    },
    {
      q: 'Which activation function is defined as f(x) = max(0, x) and helps prevent vanishing gradients?',
      opts: ['ReLU (Rectified Linear Unit)', 'Sigmoid', 'Hyperbolic Tangent (Tanh)', 'Softmax'],
      ans: 0
    },
    {
      q: 'What is the primary objective of L1 Regularization (Lasso) compared to L2 Regularization (Ridge)?',
      opts: ['Promoting feature sparsity by driving irrelevant weights to exactly zero', 'Penalizing large weights proportionally to their square without zeroing', 'Accelerating learning rate decay in stochastic gradient descent', 'Normalizing input feature distributions across min-max bounds'],
      ans: 0
    },
    {
      q: 'In classification metrics, how is Recall (Sensitivity) mathematically formulated?',
      opts: ['TP / (TP + FN)', 'TP / (TP + FP)', '(TP + TN) / Total', '2 * (Precision * Recall) / (Precision + Recall)'],
      ans: 0
    },
    {
      q: 'Which metric represents the harmonic mean of Precision and Recall?',
      opts: ['F1-Score', 'ROC-AUC', 'Mean Absolute Error (MAE)', 'Cohen Kappa'],
      ans: 0
    },
    {
      q: 'What happens in Gradient Descent if the learning rate (alpha) is configured excessively high?',
      opts: ['The optimization algorithm can overshoot the global minimum and diverge', 'The model takes an excessively long time to converge to the local minimum', 'The gradients will permanently shrink to zero', 'The loss function will instantly evaluate to negative infinity'],
      ans: 0
    },
    {
      q: 'Which splitting criterion is commonly utilized in CART Decision Trees to evaluate node purity?',
      opts: ['Gini Impurity', 'Root Mean Squared Log Error', 'Cosine Similarity', 'Hamming Distance'],
      ans: 0
    },
    {
      q: 'How does Random Forest reduce model variance compared to individual decision trees?',
      opts: ['By aggregating predictions across decorrelated trees trained on bootstrap samples (Bagging)', 'By sequentially fitting trees to the residuals of previous trees (Boosting)', 'By pruning leaf nodes with high depth penalties', 'By enforcing linear boundaries across all feature dimensions'],
      ans: 0
    },
    {
      q: 'Which ensemble method trains sequential weak learners where each subsequent tree corrects the residual errors of its predecessor?',
      opts: ['Gradient Boosting (e.g. XGBoost, LightGBM)', 'Random Forest', 'Extra Trees Classifier', 'Voting Classifier with soft voting'],
      ans: 0
    },
    {
      q: 'What is the purpose of the "Kernel Trick" in Support Vector Machines (SVM)?',
      opts: ['Implicitly mapping non-linear data into higher-dimensional space where it becomes linearly separable', 'Accelerating disk I/O when loading large image datasets', 'Encrypting support vector coordinates for privacy-preserving computation', 'Normalizing feature matrices using fast GPU kernels'],
      ans: 0
    },
    {
      q: 'In K-Means clustering, what does the algorithm iteratively minimize?',
      opts: ['Inertia (Within-Cluster Sum of Squares)', 'Mutual Information between clusters', 'Silhouette coefficient across inter-cluster distances', 'Kullback-Leibler divergence between sample distributions'],
      ans: 0
    },
    {
      q: 'Which clustering algorithm is capable of finding arbitrary shaped clusters and detecting outliers/noise points based on spatial density?',
      opts: ['DBSCAN', 'K-Means', 'Gaussian Mixture Models with spherical covariance', 'Agglomerative Ward Hierarchical Clustering'],
      ans: 0
    },
    {
      q: 'What is the primary mathematical principle behind Principal Component Analysis (PCA)?',
      opts: ['Eigenvalue decomposition of the covariance matrix to project data along axes of maximum variance', 'Minimizing cross-entropy loss using backpropagation through time', 'Maximizing class separation margin using Lagrange multipliers', 'Clustering nearest neighbors using Euclidean distance metrics'],
      ans: 0
    },
    {
      q: 'Which fundamental calculus rule is used by the backpropagation algorithm to compute loss gradients with respect to neural network weights?',
      opts: ['The Chain Rule', 'L\'Hopital\'s Rule', 'Taylor Series Expansion', 'Integration by Parts'],
      ans: 0
    },
    {
      q: 'Why does the Vanishing Gradient Problem predominantly occur in deep networks utilizing Sigmoid or Tanh activation functions?',
      opts: ['Their derivatives saturate and are bounded between 0 and 0.25, causing gradient products to diminish exponentially', 'They produce discontinuous output jumps that disrupt numerical differentiation', 'They require excessive matrix inversion steps on backward passes', 'They prevent weights from taking negative values'],
      ans: 0
    },
    {
      q: 'In Convolutional Neural Networks (CNNs), what is the primary role of a Max Pooling layer?',
      opts: ['Downsampling feature map dimensions while preserving dominant spatial features and translation invariance', 'Multiplying feature maps by learnable convolution kernels', 'Normalizing activations to zero mean and unit variance', 'Flattening multi-channel tensors into single dense vectors'],
      ans: 0
    },
    {
      q: 'What architectural innovation enables LSTMs and GRUs to model long-term sequential dependencies better than vanilla RNNs?',
      opts: ['Gating mechanisms (e.g. forget, input, and output gates) controlling information flow', 'Replacing recurrent feedback loops with multi-head self-attention', 'Using 2D spatial convolution filters over temporal tokens', 'Enforcing orthogonal weight matrices on hidden states'],
      ans: 0
    },
    {
      q: 'In the Transformer architecture, what is the mathematical formula for Scaled Dot-Product Attention?',
      opts: ['softmax((Q * K^T) / sqrt(d_k)) * V', 'sigmoid(Q * K) + V', 'tanh((Q + K) / d_k) * V', 'softmax(Q * V^T) / sqrt(d_k) * K'],
      ans: 0
    },
    {
      q: 'Which loss function is optimal when training a multi-class neural network classifier with mutually exclusive classes?',
      opts: ['Categorical Cross-Entropy', 'Binary Cross-Entropy', 'Mean Squared Error (MSE)', 'Hinge Loss'],
      ans: 0
    },
    {
      q: 'What technique synthetically generates minority class examples along the line segments joining k-nearest neighbors to address class imbalance?',
      opts: ['SMOTE (Synthetic Minority Over-sampling Technique)', 'Random Under-Sampling', 'Stratified K-Fold Splitting', 'Min-Max Normalization'],
      ans: 0
    },
    {
      q: 'How does Standard Scaling (Z-Score Standardization) transform a numerical feature?',
      opts: ['Scales feature to have a mean of 0 and standard deviation of 1', 'Bounds all values strictly between [0, 1]', 'Transforms feature values into discrete quantiles', 'Converts numerical continuous values into one-hot binary vectors'],
      ans: 0
    },
    {
      q: 'Why is One-Hot Encoding preferred over Label Encoding for nominal categorical variables (e.g. Country: India, USA, Germany)?',
      opts: ['It prevents machine learning algorithms from inferring false ordinal/numerical hierarchy (e.g. 2 > 1)', 'It reduces the dimensionality of the feature matrix', 'It guarantees zero missing values in downstream models', 'It forces all categorical probabilities to sum to 1.0'],
      ans: 0
    },
    {
      q: 'What does the Area Under the ROC Curve (ROC-AUC) measure across varying classification thresholds?',
      opts: ['The model\'s capability to discriminate between positive and negative classes (TPR vs FPR)', 'The exact accuracy of the model on the test split', 'The average training loss across all epochs', 'The harmonic balance between precision and calibration'],
      ans: 0
    },
    {
      q: 'What does the "Early Stopping" regularization technique monitor to prevent neural network overfitting?',
      opts: ['Validation loss, halting training when validation performance ceases to improve', 'GPU temperature and memory bandwidth limits', 'Gradient norms, stopping when learning rates fall below threshold', 'Training accuracy, terminating as soon as training error hits zero'],
      ans: 0
    },
    {
      q: 'What is the role of Batch Normalization in training deep neural networks?',
      opts: ['Stabilizing and accelerating training by normalizing layer inputs per mini-batch', 'Converting floating point weights to 8-bit integers for mobile deployment', 'Shuffling training data batches before each epoch', 'Enforcing strict dropout on hidden layer activations'],
      ans: 0
    },
    {
      q: 'In Natural Language Processing, how do Word2Vec and GloVe represent words?',
      opts: ['As dense, low-dimensional continuous numerical vectors capturing semantic relationships', 'As sparse high-dimensional bag-of-words boolean matrices', 'As phonetic transcription strings based on IPA rules', 'As encrypted hash tokens to ensure text privacy'],
      ans: 0
    },
    {
      q: 'In Reinforcement Learning, what equation expresses the value of a state as the immediate reward plus discounted future returns?',
      opts: ['Bellman Equation', 'Euler-Lagrange Equation', 'Navier-Stokes Equation', 'Markov Transition Formula'],
      ans: 0
    },
    {
      q: 'What is the "Curse of Dimensionality" in machine learning?',
      opts: ['As feature dimensions increase, data becomes exponentially sparse and distances lose discriminative power', 'Models become incapable of running on single CPU architectures', 'Data storage requirements surpass standard database limits', 'Feature correlations will always become perfectly collinear'],
      ans: 0
    },
    {
      q: 'Which technique randomly drops neurons and their connections during neural network training to prevent feature co-adaptation?',
      opts: ['Dropout', 'Weight Decay', 'Gradient Clipping', 'Data Augmentation'],
      ans: 0
    }
  ],

  'full-stack-web-development': [
    {
      q: 'What is the Virtual DOM in React, and why is it used?',
      opts: ['An in-memory lightweight representation of the real DOM used for fast diffing and batch updates', 'A browser API providing direct GPU acceleration for canvas elements', 'A server-side cache for caching raw HTML responses', 'A database shadow copy representing user sessions'],
      ans: 0
    },
    {
      q: 'In React, what is the behavior of useEffect when an empty dependency array ([]) is passed as the second argument?',
      opts: ['The effect runs once after the initial component mount', 'The effect runs after every single render and re-render', 'The effect never runs at all', 'The effect runs only when component props change'],
      ans: 0
    },
    {
      q: 'What is the key difference between useMemo and useCallback in React?',
      opts: ['useMemo memoizes a computed value; useCallback memoizes a function reference', 'useMemo is for asynchronous API calls; useCallback is for synchronous state updates', 'useMemo persists data to localStorage; useCallback persists data to cookies', 'useMemo binds event listeners; useCallback unbinds them on unmount'],
      ans: 0
    },
    {
      q: 'In the CSS Box Model, what is the correct order from inside to outside?',
      opts: ['Content -> Padding -> Border -> Margin', 'Content -> Border -> Padding -> Margin', 'Margin -> Border -> Padding -> Content', 'Content -> Margin -> Padding -> Border'],
      ans: 0
    },
    {
      q: 'In CSS Flexbox, which property aligns items along the cross axis?',
      opts: ['align-items', 'justify-content', 'flex-direction', 'align-content'],
      ans: 0
    },
    {
      q: 'How does the JavaScript Event Loop handle Promises (microtasks) compared to setTimeout (macrotasks)?',
      opts: ['Microtasks queue is processed immediately after the current script, before any macrotask', 'Macrotasks always execute before microtasks', 'Both microtasks and macrotasks execute concurrently on separate OS threads', 'Promises are delegated to the browser worker pool and execute last'],
      ans: 0
    },
    {
      q: 'What is a JavaScript closure?',
      opts: ['A function bundled with references to its surrounding lexical environment', 'A method to forcibly terminate infinite while loops', 'A syntax for defining private class fields using the # prefix', 'An asynchronous callback executed when a network request completes'],
      ans: 0
    },
    {
      q: 'What is the difference between "let" and "var" in JavaScript?',
      opts: ['"let" is block-scoped and temporal dead zone protected; "var" is function-scoped and hoisted', '"let" cannot be reassigned; "var" can be reassigned', '"let" is hoisted to window object; "var" is not hoisted', '"let" only accepts string values; "var" accepts any data type'],
      ans: 0
    },
    {
      q: 'Which HTTP method should be used according to RESTful standards for idempotent full replacement of an existing resource?',
      opts: ['PUT', 'POST', 'PATCH', 'GET'],
      ans: 0
    },
    {
      q: 'What HTTP status code represents "Unauthorized" (meaning client authentication credentials are required or invalid)?',
      opts: ['401', '403', '404', '400'],
      ans: 0
    },
    {
      q: 'What security mechanism does CORS (Cross-Origin Resource Sharing) enforce?',
      opts: ['It restricts browsers from making cross-origin HTTP requests unless permitted by server headers', 'It encrypts database network traffic between backend servers and clients', 'It prevents users from taking screenshots inside web browsers', 'It enforces automatic password rotation on login forms'],
      ans: 0
    },
    {
      q: 'What are the three components of a JSON Web Token (JWT) separated by periods?',
      opts: ['Header, Payload, Signature', 'Header, Body, Encryption Key', 'Origin, Claims, Hash', 'TokenId, ClientSecret, Checksum'],
      ans: 0
    },
    {
      q: 'Why are authentication session cookies typically configured with the "HttpOnly" flag?',
      opts: ['To prevent client-side JavaScript from accessing the cookie, mitigating XSS token theft', 'To ensure the cookie is only transmitted over HTTPS encrypted connections', 'To restrict cookie transmission to top-level domain navigation', 'To compress cookie payload size for faster transmission'],
      ans: 0
    },
    {
      q: 'How does Node.js achieve high concurrency despite being single-threaded for JavaScript execution?',
      opts: ['Via an event-driven non-blocking I/O model supported by the libuv C++ thread pool', 'By spinning up a new OS process for every incoming HTTP request', 'By executing JavaScript bytecode directly on GPU shaders', 'By disabling asynchronous event handling entirely'],
      ans: 0
    },
    {
      q: 'In Express.js, what is the role of the "next()" parameter in middleware functions?',
      opts: ['Passes control to the next middleware function in the request-response cycle', 'Sends the final JSON response to the client', 'Restarts the Express HTTP server process', 'Rolls back the active database transaction'],
      ans: 0
    },
    {
      q: 'What is the primary benefit of adding a B-Tree index to a database column?',
      opts: ['Dramatically accelerates SELECT query filtering and sorting at the cost of slower writes', 'Ensures the column can only store non-null unique values', 'Compresses database table size on physical hard drives', 'Encrypts column data with AES-256 at rest'],
      ans: 0
    },
    {
      q: 'What is the difference between SQL INNER JOIN and LEFT JOIN?',
      opts: ['INNER JOIN returns rows matching both tables; LEFT JOIN returns all left rows plus matched right rows', 'INNER JOIN returns all rows from both tables; LEFT JOIN returns only rows from left table', 'INNER JOIN is only for primary keys; LEFT JOIN is for foreign keys', 'LEFT JOIN eliminates duplicate columns while INNER JOIN duplicates them'],
      ans: 0
    },
    {
      q: 'What is Server-Side Rendering (SSR) in frameworks like Next.js, and what is its primary benefit?',
      opts: ['Pre-rendering HTML on the server for each request, delivering faster FCP and better SEO', 'Executing all database queries on client browsers via WebAssembly', 'Compiling React components into native desktop C++ binaries', 'Generating static HTML files only once at build time without dynamic server computation'],
      ans: 0
    },
    {
      q: 'What technology provides full-duplex, persistent bidirectional communication between client and server over a single TCP connection?',
      opts: ['WebSockets', 'HTTP Short Polling', 'Server-Sent Events (SSE)', 'REST Webhooks'],
      ans: 0
    },
    {
      q: 'What is the purpose of the CSS property "box-sizing: border-box"?',
      opts: ['Includes padding and border within the specified width and height of an element', 'Excludes margins from calculations of parent container width', 'Forces all child elements to display as inline blocks', 'Adds a drop shadow around the element border automatically'],
      ans: 0
    },
    {
      q: 'What does the "useCallback" hook return in React?',
      opts: ['A memoized version of the callback function that only changes if dependencies change', 'The returned value of executing the callback function', 'A Promise resolving when the callback finishes execution', 'A ref pointer attached to the DOM node'],
      ans: 0
    },
    {
      q: 'What is the purpose of React Portal (ReactDOM.createPortal)?',
      opts: ['Rendering children into a DOM node that exists outside the DOM hierarchy of parent component', 'Establishing WebRTC peer-to-peer data channels between browsers', 'Transferring state between two isolated React root applications', 'Lazy-loading heavy components over dynamic network imports'],
      ans: 0
    },
    {
      q: 'In Node.js, what does the "EventEmitter" pattern allow objects to do?',
      opts: ['Emit named events that cause previously registered listener functions to be called', 'Write unbuffered binary data directly to disk blocks', 'Share RAM memory heap across multiple worker threads', 'Proxy incoming TCP sockets to remote DNS hostnames'],
      ans: 0
    },
    {
      q: 'What is SQL Injection (SQLi) and how is it reliably prevented in full-stack applications?',
      opts: ['Malicious SQL injected via user input; prevented by using parameterized queries / prepared statements', 'Injecting JavaScript into DOM; prevented by setting HttpOnly cookies', 'Overwhelming database server with connections; prevented by connection pooling', 'Stealing session tokens from memory; prevented by SSL encryption'],
      ans: 0
    },
    {
      q: 'What does the JavaScript "=== " (strict equality) operator check compared to "==" (loose equality)?',
      opts: ['Checks both value and data type without performing type coercion', 'Performs automatic type conversion before comparing values', 'Checks whether two objects have identical memory references only', 'Checks whether strings match case-insensitively'],
      ans: 0
    },
    {
      q: 'What is the role of a Service Worker in Progressive Web Applications (PWA)?',
      opts: ['Runs in background intercepting network requests to enable offline caching and push notifications', 'Manages database migrations on backend servers', 'Handles CSS animations and 3D WebGL rendering threads', 'Compiles TypeScript into minified JavaScript bundles'],
      ans: 0
    },
    {
      q: 'In relational databases, what does the ACID acronym stand for?',
      opts: ['Atomicity, Consistency, Isolation, Durability', 'Asynchronous, Concurrent, Indexed, Distributed', 'Aggregation, Cache, Integrity, Delivery', 'Authentication, Confidentiality, Identity, Decryption'],
      ans: 0
    },
    {
      q: 'What is the purpose of the HTML5 semantic tag <main>?',
      opts: ['Specifies the unique dominant content of the document body', 'Contains site-wide navigation links and menu items', 'Houses introductory banner content and logo images', 'Defines tangential sidebar content related to the page'],
      ans: 0
    },
    {
      q: 'How does CSS Grid differ fundamentally from CSS Flexbox?',
      opts: ['Grid is two-dimensional (rows and columns); Flexbox is one-dimensional (row or column)', 'Grid only works with fixed pixel sizes; Flexbox works with percentages', 'Grid is deprecated in modern browsers; Flexbox is the replacement', 'Grid is only for typography layouts; Flexbox is for layout containers'],
      ans: 0
    },
    {
      q: 'What is Code Splitting in modern frontend bundlers (e.g. Vite, Webpack)?',
      opts: ['Splitting bundle into smaller chunks loaded on-demand to reduce initial page load time', 'Formatting code according to Prettier formatting rules', 'Separating HTML, CSS, and JavaScript into three isolated files', 'Compiling code into separate binaries for different OS platforms'],
      ans: 0
    }
  ],

  'python-programming': [
    {
      q: 'What is the output of print(type(5 / 2)) in Python 3?',
      opts: ["<class 'float'>", "<class 'int'>", "<class 'double'>", "<class 'number'>"],
      ans: 0
    },
    {
      q: 'Which of the following data types in Python is immutable?',
      opts: ['Tuple', 'List', 'Dictionary', 'Set'],
      ans: 0
    },
    {
      q: 'What keyword is used to define an anonymous function in Python?',
      opts: ['lambda', 'def', 'func', 'inline'],
      ans: 0
    },
    {
      q: 'What does the *args parameter represent in a Python function definition?',
      opts: ['Variable length non-keyword positional arguments as a tuple', 'Keyword arguments dictionary', 'Default arguments list', 'Pointer to a tuple'],
      ans: 0
    },
    {
      q: 'What is the average time complexity of looking up a key in a standard Python dictionary?',
      opts: ['O(1)', 'O(n)', 'O(log n)', 'O(n log n)'],
      ans: 0
    },
    {
      q: 'What is the Global Interpreter Lock (GIL) in CPython?',
      opts: ['A mutex that prevents multiple native threads from executing Python bytecodes at once', 'A security lock that encrypts Python scripts at runtime', 'A memory manager that locks unused RAM blocks', 'A compiler pass that prevents global variables from mutation'],
      ans: 0
    },
    {
      q: 'What is the difference between the "is" operator and the "==" operator in Python?',
      opts: ['"is" checks object identity (same memory address); "==" checks value equality', '"is" checks value equality; "==" checks identity', '"is" converts types; "==" does not convert types', '"is" is used only for strings; "==" is used for numbers'],
      ans: 0
    },
    {
      q: 'Which built-in Python method is called to initialize a newly created class instance?',
      opts: ['__init__', '__new__', '__construct__', '__start__'],
      ans: 0
    },
    {
      q: 'What does the "yield" keyword do inside a Python function?',
      opts: ['Turns the function into a generator that yields values lazily on-demand', 'Terminates function execution and returns an error code', 'Forces the CPU to pause execution for 100 milliseconds', 'Converts local variables into global variables'],
      ans: 0
    },
    {
      q: 'What is the primary benefit of using a Python Context Manager with the "with" statement?',
      opts: ['Guarantees resource cleanup (e.g. closing files or connections) even if exceptions occur', 'Accelerates function execution by caching return values', 'Allows multiple threads to access shared memory simultaneously', 'Bypasses the Python Global Interpreter Lock'],
      ans: 0
    },
    {
      q: 'What is the result of list(range(1, 10, 2)) in Python?',
      opts: ['[1, 3, 5, 7, 9]', '[1, 2, 4, 6, 8]', '[2, 4, 6, 8, 10]', '[1, 3, 5, 7, 9, 10]'],
      ans: 0
    },
    {
      q: 'What is the difference between shallow copy (copy.copy) and deep copy (copy.deepcopy)?',
      opts: ['Shallow copy copies the outer container referencing nested objects; deep copy recursively copies all nested objects', 'Shallow copy copies strings; deep copy copies numbers', 'Shallow copy works on tuples; deep copy works on lists', 'Shallow copy writes to disk; deep copy writes to RAM'],
      ans: 0
    },
    {
      q: 'Which Python collection type stores unique, unordered, and hashable elements?',
      opts: ['set', 'list', 'dict', 'tuple'],
      ans: 0
    },
    {
      q: 'In Python, what algorithm is used by the Method Resolution Order (MRO) for multiple inheritance?',
      opts: ['C3 Linearization', 'Depth-First Search (DFS)', 'Breadth-First Search (BFS)', 'Dijkstra Algorithm'],
      ans: 0
    },
    {
      q: 'What is the purpose of functools.wraps when writing Python decorators?',
      opts: ['Preserves the original function name, docstring, and metadata on the decorated wrapper', 'Converts synchronous functions into asynchronous coroutines', 'Compiles the function into native C machine code', 'Encrypts the source code of the wrapped function'],
      ans: 0
    },
    {
      q: 'How does Python handle memory management and cleanup of unreferenced objects?',
      opts: ['Automatic Reference Counting combined with a cyclic generational Garbage Collector', 'Manual free() calls required by developers', 'Linear sweep garbage collection at application exit only', 'Allocating memory solely on the CPU L1 cache'],
      ans: 0
    },
    {
      q: 'What does a list comprehension [x for x in range(10) if x % 2 == 0] produce?',
      opts: ['[0, 2, 4, 6, 8]', '[2, 4, 6, 8, 10]', '[1, 3, 5, 7, 9]', '[0, 1, 2, 3, 4]'],
      ans: 0
    },
    {
      q: 'What does the built-in enumerate() function return when iterating over an iterable?',
      opts: ['Pairs of (index, item) for each element in the iterable', 'A sorted duplicate list of the iterable', 'A reversed list of elements', 'The total count of items in the iterable'],
      ans: 0
    },
    {
      q: 'In Python exception handling, when does the "else" block execute?',
      opts: ['Only if no exception was raised inside the try block', 'Always, right before the finally block', 'Only if an exception was caught by except', 'When the script encounters an unhandled warning'],
      ans: 0
    },
    {
      q: 'What does the __str__() magic method return compared to __repr__()?',
      opts: ['__str__ returns a user-friendly readable string; __repr__ returns an unambiguous official string for debugging', '__str__ returns integer hash; __repr__ returns string', '__str__ prints to console; __repr__ writes to file', '__str__ is for numbers; __repr__ is for text'],
      ans: 0
    },
    {
      q: 'What decorator defines a method that receives the class (cls) as its first implicit argument rather than an instance (self)?',
      opts: ['@classmethod', '@staticmethod', '@property', '@abstractmethod'],
      ans: 0
    },
    {
      q: 'What does collections.defaultdict do when a non-existent key is queried?',
      opts: ['Automatically initializes the key with a default value provided by a factory function without raising KeyError', 'Raises a KeyError exception immediately', 'Deletes the dictionary from memory', 'Returns None without modifying the dictionary'],
      ans: 0
    },
    {
      q: 'In Python, what is the output of bool([])?',
      opts: ['False', 'True', 'None', 'SyntaxError'],
      ans: 0
    },
    {
      q: 'What does the zip() function do when passed iterables of unequal length?',
      opts: ['Stops iterating when the shortest input iterable is exhausted', 'Fills missing values with None automatically', 'Raises a ValueError exception by default', 'Loops through the shorter iterable continuously'],
      ans: 0
    },
    {
      q: 'What module provides asynchronous event loop and coroutines in standard Python?',
      opts: ['asyncio', 'threading', 'multiprocessing', 'concurrent.futures'],
      ans: 0
    },
    {
      q: 'What does the "pass" statement do in Python?',
      opts: ['A null statement that executes and does nothing, used as a syntactic placeholder', 'Exits the enclosing loop immediately', 'Skips to the next iteration of the loop', 'Raises a StopIteration exception'],
      ans: 0
    },
    {
      q: 'What is the syntax for creating an f-string in Python 3.6+?',
      opts: ['f"Value is {var}"', 'format("Value is %s", var)', '"Value is {0}".format(var)', 's"Value is $(var)"'],
      ans: 0
    },
    {
      q: 'What does the __all__ list inside a Python package __init__.py file define?',
      opts: ['The list of public module names exported when "from package import *" is used', 'All external pip dependencies required by the package', 'The author and license information for PyPI', 'The list of test cases to execute on pytest'],
      ans: 0
    },
    {
      q: 'How does Python evaluate round(2.5) and round(3.5)?',
      opts: ['2 and 4 (Banker\'s Rounding / round half to even)', '3 and 4 (Standard arithmetic rounding)', '2 and 3 (Truncating towards zero)', '3 and 3 (Ceiling rounding)'],
      ans: 0
    },
    {
      q: 'Which data structure from the collections module implements a double-ended queue with O(1) appends and pops from both ends?',
      opts: ['deque', 'OrderedDict', 'ChainMap', 'Counter'],
      ans: 0
    }
  ],

  'java-backend-architecture': [
    {
      q: 'In the Java Virtual Machine (JVM), where are object instances and arrays allocated?',
      opts: ['Heap Memory', 'Stack Memory', 'Method Area', 'PC Register'],
      ans: 0
    },
    {
      q: 'Starting from Java 8, what types of concrete methods can be declared inside an Interface?',
      opts: ['default and static methods', 'private synchronized methods only', 'final abstract methods only', 'native constructor methods'],
      ans: 0
    },
    {
      q: 'What is the key difference between String and StringBuilder in Java?',
      opts: ['String is immutable; StringBuilder is mutable and faster for frequent concatenations', 'String is mutable; StringBuilder is immutable', 'String is thread-safe; StringBuilder is synchronized', 'String stores bytes; StringBuilder stores integers'],
      ans: 0
    },
    {
      q: 'What is the fundamental difference between HashMap and Hashtable in Java?',
      opts: ['HashMap is unsynchronized and allows one null key; Hashtable is synchronized and permits no null keys', 'HashMap is thread-safe; Hashtable is not thread-safe', 'HashMap is ordered; Hashtable is sorted by keys', 'HashMap stores primitives; Hashtable stores objects'],
      ans: 0
    },
    {
      q: 'What is the difference between method Overloading and method Overriding in Java?',
      opts: ['Overloading has same name with different parameter signatures in the same class; Overriding redefines superclass method in subclass', 'Overloading occurs at runtime; Overriding occurs at compile-time', 'Overloading requires the @Override annotation; Overriding does not', 'Overloading is for static methods only; Overriding is for private methods only'],
      ans: 0
    },
    {
      q: 'In Spring Boot, what does the @RestController annotation combine?',
      opts: ['@Controller and @ResponseBody', '@Controller and @Service', '@Component and @Repository', '@Service and @Autowired'],
      ans: 0
    },
    {
      q: 'What is the default bean scope in the Spring Framework IoC Container?',
      opts: ['Singleton', 'Prototype', 'Request', 'Session'],
      ans: 0
    },
    {
      q: 'What does the @SpringBootApplication annotation encapsulate?',
      opts: ['@Configuration, @EnableAutoConfiguration, and @ComponentScan', '@Service, @Repository, and @Controller', '@Entity, @Table, and @Id', '@Component, @Scope, and @Lazy'],
      ans: 0
    },
    {
      q: 'What is the purpose of the "volatile" keyword in Java multithreading?',
      opts: ['Guarantees that updates to a variable are immediately visible to all threads by reading from main memory', 'Locks the object monitor preventing concurrent access', 'Prevents the variable from being serialized to disk', 'Ensures the variable cannot be modified after initialization'],
      ans: 0
    },
    {
      q: 'What is the difference between ArrayList and LinkedList in Java?',
      opts: ['ArrayList uses a dynamic resizable array (O(1) random access); LinkedList uses a doubly-linked list (O(1) insertions at ends)', 'ArrayList is synchronized; LinkedList is unsynchronized', 'ArrayList cannot store duplicates; LinkedList can store duplicates', 'ArrayList is for primitive types; LinkedList is for reference types'],
      ans: 0
    },
    {
      q: 'Which interface in Java is used to define the natural ordering of objects via the compareTo() method?',
      opts: ['Comparable', 'Comparator', 'Cloneable', 'Serializable'],
      ans: 0
    },
    {
      q: 'What are Checked Exceptions in Java?',
      opts: ['Exceptions that inherit from Exception (excluding RuntimeException) and must be handled or declared in throws clause', 'Exceptions that inherit directly from Error and cause JVM termination', 'Exceptions that only occur during unit test execution', 'Exceptions that inherit from RuntimeException and are unchecked at compile-time'],
      ans: 0
    },
    {
      q: 'What is Inversion of Control (IoC) in the Spring Framework?',
      opts: ['The framework manages object creation and lifecycle, injecting dependencies rather than objects instantiating them', 'Reversing the flow of TCP network packets', 'Inverting the inheritance hierarchy between classes and interfaces', 'Compiling Java bytecode directly into C++ source code'],
      ans: 0
    },
    {
      q: 'What does the @Transactional annotation in Spring manage?',
      opts: ['Automatic transaction demarcation (commit on success, rollback on RuntimeException)', 'Encrypting database columns during persistence', 'Rate limiting incoming HTTP requests', 'Logging SQL query latency to console'],
      ans: 0
    },
    {
      q: 'What is the purpose of Optional<T> introduced in Java 8?',
      opts: ['To provide a type-level representation of a value that may or may not be present, reducing NullPointerExceptions', 'To make method parameters optional in function calls', 'To enable optional multithreading execution', 'To define optional dependencies in Maven pom.xml'],
      ans: 0
    },
    {
      q: 'What is the difference between Hibernate First-Level (L1) and Second-Level (L2) Cache?',
      opts: ['L1 Cache is session-scoped (enabled by default); L2 Cache is SessionFactory-scoped across sessions (optional, shared)', 'L1 Cache stores data in Redis; L2 Cache stores data in RAM', 'L1 Cache is for MongoDB; L2 Cache is for PostgreSQL', 'L1 Cache is client-side; L2 Cache is server-side'],
      ans: 0
    },
    {
      q: 'How does Spring Data JPA generate SQL queries when using repository interface method names like findByEmailAndStatus(String email, String status)?',
      opts: ['Parses method naming conventions using reflection and dynamically derives the JPQL/SQL query', 'Requires raw SQL string annotations on all repository methods', 'Compiles method names into stored procedures on database boot', 'Executes a full table scan and filters records in JVM memory'],
      ans: 0
    },
    {
      q: 'What is Type Erasure in Java Generics?',
      opts: ['The compiler strips all generic type parameter information at compile time, replacing with bounds/Object for bytecode backward compatibility', 'A runtime exception thrown when casting incompatible types', 'Erasing unused class definitions during garbage collection', 'A garbage collection phase that clears static variable memory'],
      ans: 0
    },
    {
      q: 'What is the ExecutorService in java.util.concurrent?',
      opts: ['A high-level framework that manages thread pools and asynchronous task execution lifecycle', 'A low-level operating system scheduler hook', 'A tool for compiling Java source code in parallel', 'A garbage collection thread monitor'],
      ans: 0
    },
    {
      q: 'Which annotation in Spring Boot is used to extract a variable from the URI path (e.g. /users/{id})?',
      opts: ['@PathVariable', '@RequestParam', '@RequestBody', '@RequestHeader'],
      ans: 0
    },
    {
      q: 'What is the contract between equals() and hashCode() in Java?',
      opts: ['If two objects are equal according to equals(), they must produce the same hashCode() integer', 'If two objects have the same hashCode(), they must always be equal according to equals()', 'hashCode() must return a unique integer for every distinct object in memory', 'equals() and hashCode() are completely independent with no contractual requirement'],
      ans: 0
    },
    {
      q: 'In Spring Framework, how does Dependency Injection via constructor compare to field injection with @Autowired?',
      opts: ['Constructor injection is preferred because it enables immutability (final fields) and simplifies unit testing without mocking framework', 'Field injection is faster at runtime than constructor injection', 'Constructor injection is deprecated in Spring Boot 3', 'Field injection is the only way to inject circular dependencies'],
      ans: 0
    },
    {
      q: 'What does the finalize() method do in Java, and why is it deprecated in modern Java versions?',
      opts: ['Called by garbage collector before object reclamation; deprecated due to unpredictable timing, performance issues, and deadlocks', 'Finalizes class bytecode compilation; deprecated in favor of GraalVM', 'Closes database sockets automatically; deprecated for try-with-resources', 'Prevents classes from being extended; deprecated for sealed classes'],
      ans: 0
    },
    {
      q: 'Which garbage collector was introduced as the default low-pause collector in Java 9+?',
      opts: ['G1 (Garbage-First) GC', 'Serial GC', 'Parallel GC', 'CMS (Concurrent Mark Sweep) GC'],
      ans: 0
    },
    {
      q: 'What are Java 14+ Records (record Keyword)?',
      opts: ['Immutable data carrier classes with auto-generated constructor, getters, equals(), hashCode(), and toString()', 'Database row representations that automatically sync with SQL tables', 'Classes specifically designed for logging telemetry records to disk', 'Mutable structures that bypass heap memory allocation'],
      ans: 0
    },
    {
      q: 'What is Spring Cloud Eureka used for in a microservices architecture?',
      opts: ['Service Registration and Service Discovery', 'Distributed transaction coordinator', 'Centralized API rate limiting gateway', 'Cloud storage bucket synchronization'],
      ans: 0
    },
    {
      q: 'What is the purpose of the Java Stream.map() operation?',
      opts: ['An intermediate operation that transforms each element of the stream by applying a function', 'A terminal operation that converts the stream into a java.util.Map', 'A filtering operation that drops null values', 'A reduction operation calculating the sum of elements'],
      ans: 0
    },
    {
      q: 'What is the difference between fail-fast and fail-safe iterators in Java collections?',
      opts: ['Fail-fast throws ConcurrentModificationException if collection is modified during iteration; fail-safe iterates over a copy', 'Fail-fast continues iterating on errors; fail-safe stops iteration', 'Fail-fast is thread-safe; fail-safe is unsynchronized', 'Fail-fast works on arrays; fail-safe works on queues'],
      ans: 0
    },
    {
      q: 'In Maven, what is the role of the pom.xml file?',
      opts: ['Defines project configuration, dependencies, plugins, and build lifecycle goals (Project Object Model)', 'Stores runtime database connection passwords', 'Compiles Java bytecode into native machine executables', 'Manages git branch merge conflicts'],
      ans: 0
    },
    {
      q: 'What design pattern does the Spring Framework BeanFactory and ApplicationContext implement?',
      opts: ['Factory Pattern and Inversion of Control Container', 'Observer Pattern exclusively', 'Decorator Pattern exclusively', 'Singleton Anti-Pattern'],
      ans: 0
    }
  ],

  'cloud-devops': [
    {
      q: 'What is the key difference between a Docker container and a Virtual Machine (VM)?',
      opts: ['Containers share the host OS kernel and isolate at process level; VMs run a full guest OS on top of a hypervisor', 'Containers require a dedicated hypervisor; VMs do not', 'VMs start up in milliseconds; containers take minutes to boot', 'Containers can only run Python applications; VMs run any language'],
      ans: 0
    },
    {
      q: 'In Kubernetes, what is a Pod?',
      opts: ['The smallest deployable computing unit in K8s, encapsulating one or more containers sharing network and storage', 'A physical server rack inside a cloud provider datacenter', 'A continuous integration build pipeline runner', 'A load balancer that distributes traffic across AWS regions'],
      ans: 0
    },
    {
      q: 'In Docker, what is the primary advantage of a Multi-Stage Build?',
      opts: ['Keeps production images lean by discarding build-time SDKs and dependencies from the final runtime image', 'Enables running multiple containers inside a single Docker image', 'Allows building images across multiple cloud providers simultaneously', 'Automatically encrypts Docker image layers with AES-256'],
      ans: 0
    },
    {
      q: 'What is the primary function of Kubernetes Ingress?',
      opts: ['Managing external HTTP and HTTPS routing into services within a Kubernetes cluster', 'Scraping Prometheus metrics from cluster nodes', 'Allocating persistent SSD storage volumes to worker nodes', 'Managing container restart policies on node failure'],
      ans: 0
    },
    {
      q: 'What is Infrastructure as Code (IaC), and what tool is widely used to achieve it declaratively across multiple clouds?',
      opts: ['Managing and provisioning cloud infrastructure through version-controlled code; Terraform', 'Manually clicking cloud console buttons; AWS Management Console', 'Writing shell scripts executed via SSH on live servers; Bash', 'Configuring routers via telnet; PuTTY'],
      ans: 0
    },
    {
      q: 'What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?',
      opts: ['CI automatically builds and tests code changes; CD automatically deploys validated code to production', 'CI is for frontend applications; CD is for backend databases', 'CI requires manual approval; CD is always manual', 'CI manages cloud infrastructure; CD monitors server CPU usage'],
      ans: 0
    },
    {
      q: 'In AWS networking, what is the difference between a Public Subnet and a Private Subnet?',
      opts: ['Public subnets have direct routing to an Internet Gateway; Private subnets route outbound traffic through a NAT Gateway', 'Public subnets are free; Private subnets are paid', 'Public subnets run Linux; Private subnets run Windows', 'Public subnets cannot run databases; Private subnets cannot run web servers'],
      ans: 0
    },
    {
      q: 'What is a Blue-Green Deployment strategy?',
      opts: ['Maintaining two identical production environments, switching traffic to the new version once verified to eliminate downtime', 'Gradually routing 5% of traffic to the new version and scaling up based on metrics', 'Deploying updates to half the servers on Mondays and the other half on Fridays', 'Deploying code changes directly into live running container processes'],
      ans: 0
    },
    {
      q: 'What are the three core pillars of Observability in modern distributed systems?',
      opts: ['Metrics, Logs, and Traces', 'CPU, RAM, and Disk', 'Latency, Bandwidth, and Throughput', 'Alerts, Notifications, and Escalations'],
      ans: 0
    },
    {
      q: 'In Prometheus monitoring, what collection model is primarily used to gather metrics from targets?',
      opts: ['Pull model: Prometheus periodically scrapes HTTP /metrics endpoints exposed by targets', 'Push model: Targets push UDP packets to Prometheus every second', 'Streaming model: Targets stream binary telemetry over Kafka topics', 'Polling model: Prometheus queries SQL databases directly for metrics'],
      ans: 0
    },
    {
      q: 'In AWS IAM, what is the Principle of Least Privilege?',
      opts: ['Granting users and services only the minimum permissions necessary to perform their designated tasks', 'Allowing all developers administrator access to avoid deployment friction', 'Restricting all cloud access exclusively to the root account', 'Revoking permissions after 24 hours of inactivity'],
      ans: 0
    },
    {
      q: 'What is the role of Kubernetes etcd in the cluster control plane?',
      opts: ['A consistent and highly-available distributed key-value store holding all cluster state and configuration', 'The network proxy that routes traffic to pods', 'The component that compiles container images from source code', 'The DNS resolver that translates external domain names'],
      ans: 0
    },
    {
      q: 'What is a Canary Deployment?',
      opts: ['Rolling out new code to a small subset of users/servers before promoting to the entire fleet', 'Deploying code exclusively to non-production staging environments', 'Running automated penetration tests against live production endpoints', 'Testing database recovery by intentionally terminating instances'],
      ans: 0
    },
    {
      q: 'What is the difference between Layer 4 (L4) and Layer 7 (L7) load balancers?',
      opts: ['L4 routes based on IP and TCP/UDP ports; L7 inspects HTTP/HTTPS headers, paths, cookies, and payloads', 'L4 is for cloud environments; L7 is for on-premise datacenters', 'L4 encrypts SSL; L7 cannot terminate SSL certificates', 'L4 is software-based; L7 is hardware-based'],
      ans: 0
    },
    {
      q: 'What is GitOps?',
      opts: ['An operational framework using Git repositories as the single source of truth for declarative infrastructure and applications', 'Using git commit hooks to send Slack notifications', 'Hosting git repositories on AWS S3 buckets', 'Deploying applications by running git pull on production servers via cron'],
      ans: 0
    },
    {
      q: 'In Kubernetes, what is a ReplicaSet?',
      opts: ['Maintains a stable set of identical replica Pods running at any given time', 'Creates database read-replicas in AWS RDS', 'Backs up cluster logs to Amazon Glacier', 'Replicates container images across multiple Docker registries'],
      ans: 0
    },
    {
      q: 'What AWS service provides serverless compute that executes code in response to events without provisioning servers?',
      opts: ['AWS Lambda', 'Amazon EC2', 'Amazon ECS', 'Amazon EMR'],
      ans: 0
    },
    {
      q: 'What is the purpose of a Reverse Proxy like Nginx in a production architecture?',
      opts: ['Sits in front of backend servers handling SSL termination, reverse caching, load balancing, and rate limiting', 'Translates domain names to IP addresses for web browsers', 'Connects client browsers directly to physical database sockets', 'Compresses images before uploading them to Git repositories'],
      ans: 0
    },
    {
      q: 'In Docker, what is the difference between the CMD and ENTRYPOINT instructions in a Dockerfile?',
      opts: ['ENTRYPOINT sets the default executable; CMD provides default arguments that can be easily overridden at runtime', 'CMD is mandatory; ENTRYPOINT is optional', 'CMD sets environment variables; ENTRYPOINT copies files', 'ENTRYPOINT runs during docker build; CMD runs during docker push'],
      ans: 0
    },
    {
      q: 'What tool is commonly used for distributed tracing across microservices to visualize request latency breakdown?',
      opts: ['Jaeger / OpenTelemetry', 'Logstash', 'Nginx', 'Docker Compose'],
      ans: 0
    },
    {
      q: 'In Kubernetes, what is a ConfigMap?',
      opts: ['An API object used to store non-confidential configuration data in key-value pairs separated from container image', 'A network routing table for inter-pod communication', 'A visual GUI dashboard mapping pod resource usage', 'A cluster deployment script written in Python'],
      ans: 0
    },
    {
      q: 'What AWS storage service provides scalable, durable object storage accessible over HTTP via REST APIs?',
      opts: ['Amazon S3 (Simple Storage Service)', 'Amazon EBS (Elastic Block Store)', 'Amazon EFS (Elastic File System)', 'AWS Storage Gateway'],
      ans: 0
    },
    {
      q: 'What is the primary benefit of Immutable Infrastructure in cloud environments?',
      opts: ['Eliminates configuration drift by replacing servers rather than modifying running servers in-place', 'Reduces monthly cloud computing billing rates by 50%', 'Guarantees that software will never encounter memory leaks', 'Enables servers to run without operating system kernels'],
      ans: 0
    },
    {
      q: 'What does the Kubernetes Horizontal Pod Autoscaler (HPA) do?',
      opts: ['Automatically scales the number of Pod replicas in a deployment based on observed CPU/memory utilization', 'Adds additional physical CPU cores to worker node motherboards', 'Increases pod network bandwidth allocation during high traffic', 'Moves pods between AWS availability zones automatically'],
      ans: 0
    },
    {
      q: 'What is HashiCorp Vault primarily used for in DevOps workflows?',
      opts: ['Securely managing, storing, and tightly controlling access to secrets, tokens, API keys, and certificates', 'Compiling Docker images from source code', 'Monitoring Kubernetes pod memory consumption', 'Hosting private Git repositories with branch protection'],
      ans: 0
    },
    {
      q: 'What is a Dead Letter Queue (DLQ) in message queuing systems (e.g. RabbitMQ, AWS SQS)?',
      opts: ['A queue that isolates messages that cannot be processed successfully after a designated number of retry attempts', 'A queue that deletes all messages when consumer memory exceeds 80%', 'A high-priority queue that bypasses standard rate limits', 'A queue reserved for administrative system broadcast notices'],
      ans: 0
    },
    {
      q: 'In CI/CD, what is the role of a Linter (e.g. ESLint, Flake8)?',
      opts: ['Analyzes source code statically to flag programming errors, stylistic bugs, and anti-patterns before execution', 'Compiles source code into production binary executables', 'Deploys artifacts to staging environments automatically', 'Generates mock database fixtures for unit tests'],
      ans: 0
    },
    {
      q: 'What is Chaos Engineering (e.g. Chaos Monkey)?',
      opts: ['The discipline of experimenting on a system to build confidence in its capability to withstand turbulent conditions in production', 'Intentionally deploying untested code to production on Fridays', 'Writing microservices without automated unit test coverage', 'Disabling database backups to test manual recovery procedures'],
      ans: 0
    },
    {
      q: 'In Kubernetes, what is a StatefulSet used for instead of a Deployment?',
      opts: ['Managing stateful applications (e.g. databases, Kafka) requiring unique identities and persistent stable storage per pod', 'Deploying stateless web APIs that can be scaled up or down interchangeably', 'Running batch jobs that terminate upon successful completion', 'Managing cluster-wide DaemonSet networking plugins'],
      ans: 0
    },
    {
      q: 'What is Zero Trust Network Access (ZTNA) in modern DevOps architectures?',
      opts: ['Requires strict identity verification for every person and device trying to access private network resources, regardless of perimeter', 'Granting access automatically to any device connected to the office Wi-Fi', 'Disabling encryption between internal microservices to reduce latency', 'Allowing public access to all staging environments'],
      ans: 0
    }
  ],

  'cybersecurity-ethical-hacking': [
    {
      q: 'What are the three components of the CIA Triad in Information Security?',
      opts: ['Confidentiality, Integrity, Availability', 'Control, Inspection, Authorization', 'Cryptography, Identification, Authentication', 'Centralization, Isolation, Access'],
      ans: 0
    },
    {
      q: 'What is the primary difference between Symmetric and Asymmetric Encryption?',
      opts: ['Symmetric uses the same key for encryption and decryption (e.g. AES); Asymmetric uses a public/private keypair (e.g. RSA)', 'Symmetric uses public keys; Asymmetric uses private keys only', 'Symmetric is one-way hashing; Asymmetric is reversible', 'Symmetric encryption cannot be decrypted once applied'],
      ans: 0
    },
    {
      q: 'What is a Cryptographic Hash function (e.g. SHA-256), and what is its primary property?',
      opts: ['A one-way deterministic mathematical function producing a fixed-size digest that cannot be reversed', 'A two-way algorithm used to encrypt confidential customer passwords', 'A compression algorithm that reduces file sizes by 50%', 'A random number generator that produces unique integers per second'],
      ans: 0
    },
    {
      q: 'Why is "Salting" essential when storing hashed passwords in a database?',
      opts: ['It appends unique random data to each password before hashing, defeating precomputed Rainbow Table attacks', 'It encrypts the hash with a master AES-256 key', 'It compresses the password hash so it fits in smaller database columns', 'It allows administrators to recover lost passwords on request'],
      ans: 0
    },
    {
      q: 'What is Cross-Site Scripting (XSS)?',
      opts: ['A vulnerability where an attacker injects malicious client-side JavaScript that executes in other users\' browsers', 'An attack where SQL commands are injected into database forms', 'An attack that floods network bandwidth with UDP packets', 'An attack that steals physical hard drives from datacenters'],
      ans: 0
    },
    {
      q: 'What is Cross-Site Request Forgery (CSRF)?',
      opts: ['An attack that tricks an authenticated victim into executing unwanted state-changing actions on a trusted web application', 'Injecting malicious scripts into public web forums', 'Intercepting Wi-Fi packets using a rogue access point', 'Cracking passwords using brute-force dictionary attacks'],
      ans: 0
    },
    {
      q: 'How does a Web Application Firewall (WAF) differ from a traditional Network Firewall?',
      opts: ['A WAF inspects application layer (Layer 7) HTTP/HTTPS traffic for web attacks; Network firewalls filter network packets (Layers 3-4)', 'A WAF protects against physical hardware theft; Network firewalls protect Wi-Fi', 'A WAF is only for cloud environments; Network firewalls are for home routers', 'A WAF replaces the need for SSL/TLS certificates'],
      ans: 0
    },
    {
      q: 'What is a Man-In-The-Middle (MITM) attack, and how is it primarily mitigated?',
      opts: ['An attacker intercepts communication between two parties; mitigated by end-to-end TLS/HTTPS encryption and certificate verification', 'An attacker uses brute force against passwords; mitigated by MFA', 'An attacker floods server CPU; mitigated by auto-scaling', 'An attacker steals cookies; mitigated by disabling JavaScript'],
      ans: 0
    },
    {
      q: 'What is the role of an ARP Spoofing attack on a Local Area Network (LAN)?',
      opts: ['Associating the attacker\'s MAC address with the IP address of the legitimate default gateway to intercept LAN traffic', 'Cracking WPA2 Wi-Fi encryption passphrases', 'Flooding the network switch with random MAC addresses to cause a broadcast storm', 'Spoofing DNS root server certificates'],
      ans: 0
    },
    {
      q: 'What vulnerability category ranks consistently as #1 in the OWASP Top 10 web security risks?',
      opts: ['Broken Access Control', 'Security Misconfiguration', 'Software and Data Integrity Failures', 'Cryptographic Failures'],
      ans: 0
    },
    {
      q: 'What is a Buffer Overflow vulnerability in low-level languages like C/C++?',
      opts: ['Writing data past the boundary of an allocated buffer, overwriting adjacent memory and potentially hijacking control flow', 'Reading past the end of a database result set', 'Exhausting network buffer queues on high traffic', 'Allocating more memory on the heap than available physical RAM'],
      ans: 0
    },
    {
      q: 'What is the difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?',
      opts: ['An IDS passively monitors and alerts on suspicious traffic; an IPS sits in-line and actively drops or blocks malicious traffic', 'An IDS is hardware; an IPS is software', 'An IDS monitors outgoing traffic; an IPS monitors incoming traffic', 'An IDS is only for wireless networks; an IPS is for wired networks'],
      ans: 0
    },
    {
      q: 'In penetration testing, what tool is considered the industry standard for port scanning and network service enumeration?',
      opts: ['Nmap', 'Burp Suite', 'Wireshark', 'Metasploit'],
      ans: 0
    },
    {
      q: 'What does the HTTP header "Content-Security-Policy" (CSP) help prevent?',
      opts: ['Cross-Site Scripting (XSS) and data injection by specifying approved origins for executable scripts and resources', 'SQL Injection by sanitizing database queries', 'DDoS attacks by rate limiting requests per IP', 'MITM attacks by enforcing HTTPS connections'],
      ans: 0
    },
    {
      q: 'What is a Zero-Day Vulnerability?',
      opts: ['A software vulnerability that is known to attackers or researchers but has no available patch from the vendor', 'A vulnerability that requires zero technical skill to exploit', 'A security flaw that automatically resolves itself within 24 hours', 'A bug that was introduced on day zero of project creation'],
      ans: 0
    },
    {
      q: 'What are the three factors in Multi-Factor Authentication (MFA)?',
      opts: ['Something you know (password), Something you have (device/token), Something you are (biometrics)', 'Username, Password, Security Question', 'Email, Phone Number, Home Address', 'Fingerprint, Face ID, Retina Scan'],
      ans: 0
    },
    {
      q: 'What is DNS Spoofing (DNS Cache Poisoning)?',
      opts: ['Injecting fraudulent DNS records into a recursive resolver cache to redirect users to malicious IP addresses', 'Stealing domain ownership through registrar account takeovers', 'Flooding authoritative DNS name servers with NXDOMAIN queries', 'Modifying local /etc/hosts files via administrative access'],
      ans: 0
    },
    {
      q: 'What security principle dictates that a user should be granted the minimum permissions required to perform their job?',
      opts: ['Principle of Least Privilege', 'Defense in Depth', 'Fail-Safe Defaults', 'Separation of Duties'],
      ans: 0
    },
    {
      q: 'In Cryptography, what is a "Nonce"?',
      opts: ['An arbitrary number used only once in cryptographic communications to prevent replay attacks', 'A master private key stored in an HSM', 'A mathematical constant used to calculate prime numbers', 'An encrypted password hash stored on disk'],
      ans: 0
    },
    {
      q: 'What is a Honeypot in defensive cyber operations?',
      opts: ['A decoy system deliberately exposed to detect, deflect, and study unauthorized attacker techniques', 'A password manager that auto-fills encrypted credentials', 'A secure enclave inside CPU hardware (e.g. Intel SGX)', 'A cryptographic vault that stores administrative SSH keys'],
      ans: 0
    },
    {
      q: 'What does the HTTP response header "X-Frame-Options: DENY" prevent?',
      opts: ['Clickjacking attacks by disallowing the page from being embedded in an <iframe>', 'Cross-Site Scripting by disabling JavaScript frames', 'SQL Injection by denying framed query strings', 'Cookie theft by denying cross-origin frames'],
      ans: 0
    },
    {
      q: 'What is a Distributed Denial of Service (DDoS) attack using a "Botnet"?',
      opts: ['Overwhelming a target server with traffic coordinated across thousands of compromised Internet-connected devices', 'Cracking database passwords using a cluster of GPU servers', 'Sending deceptive phishing emails to company employees', 'Intercepting cellular SMS authentication tokens'],
      ans: 0
    },
    {
      q: 'What is the role of a Security Information and Event Management (SIEM) platform (e.g. Splunk, Microsoft Sentinel)?',
      opts: ['Aggregating, correlating, and analyzing log data across an enterprise in real time to detect security incidents', 'Deploying firewalls automatically to cloud subnets', 'Encrypting hard drive partitions on employee laptops', 'Conducting automated black-box penetration testing'],
      ans: 0
    },
    {
      q: 'In Public Key Infrastructure (PKI), what is the function of a Certificate Authority (CA)?',
      opts: ['A trusted third-party entity that issues and digitally signs certificates verifying the identity of public key owners', 'An agency that manages global DNS domain name assignments', 'A hardware device that encrypts network traffic at the router level', 'A server that stores encrypted user passwords'],
      ans: 0
    },
    {
      q: 'What is Ransomware?',
      opts: ['Malware that encrypts victim files and demands payment in cryptocurrency in exchange for decryption keys', 'Spyware that logs keystrokes to steal bank account credentials', 'A virus that deletes operating system system32 files', 'Adware that displays unwanted popup advertisements'],
      ans: 0
    },
    {
      q: 'What is the difference between Black-Box and White-Box Penetration Testing?',
      opts: ['Black-Box simulates an external attacker with zero prior knowledge; White-Box provides full internal architecture and source code access', 'Black-Box is illegal; White-Box is legal', 'Black-Box is for cloud; White-Box is for hardware', 'Black-Box tests firewalls; White-Box tests web applications'],
      ans: 0
    },
    {
      q: 'What is Privilege Escalation in cyber attacks?',
      opts: ['Exploiting a bug, design flaw, or configuration error to gain higher access permissions than originally intended (e.g. root/admin)', 'Increasing network bandwidth to execute DDoS attacks faster', 'Cracking password hashes using rainbow tables', 'Bypassing web application firewalls with encoded characters'],
      ans: 0
    },
    {
      q: 'What is the purpose of HSTS (HTTP Strict Transport Security)?',
      opts: ['Forces browsers to communicate with the domain exclusively over HTTPS, protecting against SSL-stripping attacks', 'Enforces multi-factor authentication on every HTTP login', 'Limits HTTP request rates to prevent brute force attacks', 'Restricts HTTP access to approved IP whitelist ranges'],
      ans: 0
    },
    {
      q: 'In Wi-Fi security, what vulnerability in WPA2 allows attackers within radio range to intercept and decrypt Wi-Fi traffic?',
      opts: ['KRACK (Key Reinstallation Attack)', 'Heartbleed', 'Shellshock', 'EternalBlue'],
      ans: 0
    },
    {
      q: 'What does the "Defense in Depth" security strategy entail?',
      opts: ['Deploying multiple layered security controls throughout an IT system rather than relying on a single defensive barrier', 'Protecting the physical datacenter with biometric locks and armed guards only', 'Encrypting data only when at rest on persistent disks', 'Relying exclusively on a next-generation web application firewall'],
      ans: 0
    }
  ]
};

// Aliases mapping to ensure every slug/subdomain reaches the right 30 questions
const ALIAS_MAP = {
  'ai-ml': 'ai-ml',
  'ai': 'ai-ml',
  'ml': 'ai-ml',
  'data-science': 'ai-ml',
  'data-science-machine-learning': 'ai-ml',

  'web-development': 'full-stack-web-development',
  'web-dev': 'full-stack-web-development',
  'fullstack': 'full-stack-web-development',
  'full-stack': 'full-stack-web-development',
  'full-stack-web-development': 'full-stack-web-development',
  'javascript': 'full-stack-web-development',
  'react': 'full-stack-web-development',

  'python': 'python-programming',
  'python-programming': 'python-programming',

  'java': 'java-backend-architecture',
  'java-backend-architecture': 'java-backend-architecture',

  'cloud': 'cloud-devops',
  'cloud-computing': 'cloud-devops',
  'devops': 'cloud-devops',
  'cloud-devops': 'cloud-devops',

  'cyber-security': 'cybersecurity-ethical-hacking',
  'cybersecurity': 'cybersecurity-ethical-hacking',
  'security': 'cybersecurity-ethical-hacking',
  'cybersecurity-ethical-hacking': 'cybersecurity-ethical-hacking',
};

// 1. Generate frontend TypeScript questionBank.ts
function generateFrontendQuestionBank() {
  const targetPath = path.join(__dirname, '../../frontend/src/services/questionBank.ts');
  let ts = `import type { Question } from '@/types';\n\n`;
  ts += `// Comprehensive, authentic question bank for EVERY domain\n`;
  ts += `const DOMAIN_QUESTIONS: Record<string, any[]> = {\n`;

  for (const [domKey, qList] of Object.entries(DOMAIN_QUESTIONS)) {
    ts += `  '${domKey}': [\n`;
    qList.forEach((item, idx) => {
      const qId = `${domKey}-${idx + 1}`;
      ts += `    {\n`;
      ts += `      id: '${qId}',\n`;
      ts += `      question_text: ${JSON.stringify(item.q)},\n`;
      ts += `      difficulty: '${idx < 10 ? 'easy' : idx < 20 ? 'medium' : 'hard'}',\n`;
      ts += `      marks: 1,\n`;
      ts += `      options: [\n`;
      item.opts.forEach((optText, oIdx) => {
        ts += `        { id: '${qId}-${String.fromCharCode(97 + oIdx)}', option_text: ${JSON.stringify(optText)}, is_correct: ${oIdx === item.ans} },\n`;
      });
      ts += `      ],\n`;
      ts += `    },\n`;
    });
    ts += `  ],\n\n`;
  }

  ts += `};\n\n`;

  // Write alias map and getDomainQuestions function
  ts += `const ALIAS_MAP: Record<string, string> = ${JSON.stringify(ALIAS_MAP, null, 2)};\n\n`;

  ts += `export function getDomainQuestions(\n`;
  ts += `  domainSlug: string,\n`;
  ts += `  domainName?: string,\n`;
  ts += `  targetCount: number = 30\n`;
  ts += `): Question[] {\n`;
  ts += `  const cleanSlug = (domainSlug || '').toLowerCase().trim();\n`;
  ts += `  const resolvedKey = ALIAS_MAP[cleanSlug] || Object.keys(DOMAIN_QUESTIONS).find(k => cleanSlug.includes(k) || k.includes(cleanSlug)) || 'python-programming';\n`;
  ts += `  const rawList = DOMAIN_QUESTIONS[resolvedKey] || DOMAIN_QUESTIONS['python-programming'];\n`;
  ts += `  const count = Math.max(1, Math.min(rawList.length, targetCount || 30));\n\n`;
  ts += `  const questions: Question[] = rawList.slice(0, count).map((q, idx) => ({\n`;
  ts += `    ...q,\n`;
  ts += `    id: \`\${cleanSlug}-q-\${idx + 1}\`,\n`;
  ts += `    domain_id: domainSlug,\n`;
  ts += `    active: true,\n`;
  ts += `    display_order: idx + 1,\n`;
  ts += `    created_at: '',\n`;
  ts += `    updated_at: '',\n`;
  ts += `    options: (q.options || []).map((o: any, oIdx: number) => ({\n`;
  ts += `      id: \`\${cleanSlug}-q-\${idx + 1}-\${String.fromCharCode(97 + oIdx)}\`,\n`;
  ts += `      question_id: \`\${cleanSlug}-q-\${idx + 1}\`,\n`;
  ts += `      option_text: o.option_text,\n`;
  ts += `      option_order: oIdx + 1,\n`;
  ts += `      is_correct: !!o.is_correct,\n`;
  ts += `    })),\n`;
  ts += `  }));\n\n`;
  ts += `  return questions;\n`;
  ts += `}\n`;

  fs.writeFileSync(targetPath, ts, 'utf8');
  console.log(`[Seed] Successfully wrote complete question bank to ${targetPath}`);

  // Also write backend CommonJS question bank
  const backendTargetPath = path.resolve(__dirname, '../data/domainQuestionBank.js');
  const backendDir = path.dirname(backendTargetPath);
  if (!fs.existsSync(backendDir)) fs.mkdirSync(backendDir, { recursive: true });

  const cjs = `// Auto-generated comprehensive authentic question bank for backend
const DOMAIN_QUESTIONS = ${JSON.stringify(DOMAIN_QUESTIONS, null, 2)};

const ALIAS_MAP = ${JSON.stringify(ALIAS_MAP, null, 2)};

function getDomainQuestions(domainSlug, targetCount = 30) {
  const cleanSlug = (domainSlug || '').toLowerCase().trim();
  const resolvedKey = ALIAS_MAP[cleanSlug] || Object.keys(DOMAIN_QUESTIONS).find(k => cleanSlug.includes(k) || k.includes(cleanSlug)) || 'python-programming';
  const rawList = DOMAIN_QUESTIONS[resolvedKey] || DOMAIN_QUESTIONS['python-programming'];
  const count = Math.max(1, Math.min(rawList.length, targetCount || 30));

  return rawList.slice(0, count).map((item, idx) => {
    const qId = \`\${cleanSlug}-q-\${idx + 1}\`;
    return {
      id: qId,
      domain_id: domainSlug,
      question_text: item.q,
      difficulty: idx < 10 ? 'easy' : idx < 20 ? 'medium' : 'hard',
      marks: 1,
      explanation: 'Detailed assessment evaluation',
      active: true,
      display_order: idx + 1,
      options: item.opts.map((optText, oIdx) => ({
        id: \`\${qId}-\${String.fromCharCode(97 + oIdx)}\`,
        question_id: qId,
        option_text: optText,
        option_order: oIdx + 1,
        is_correct: oIdx === item.ans
      }))
    };
  });
}

module.exports = {
  DOMAIN_QUESTIONS,
  ALIAS_MAP,
  getDomainQuestions
};
`;

  fs.writeFileSync(backendTargetPath, cjs, 'utf8');
  console.log(`[Seed] Successfully wrote backend question bank to ${backendTargetPath}`);
}

generateFrontendQuestionBank();

