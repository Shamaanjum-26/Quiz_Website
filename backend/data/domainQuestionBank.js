// Comprehensive authentic question bank for backend
// Domain-based questions with strictly 4 options (A, B, C, D) per question, question shuffling, option shuffling, and dynamic domain generation.

const DOMAIN_QUESTIONS = {
  "ai-ml": [
    {
      "q": "Which learning paradigm relies on labeled training datasets consisting of input-output pairs?",
      "opts": [
        "Supervised Learning",
        "Unsupervised Learning",
        "Reinforcement Learning",
        "Self-Supervised Clustering"
      ],
      "ans": 0
    },
    {
      "q": "In Machine Learning, what does a model with \"high variance\" typically suffer from?",
      "opts": [
        "Overfitting to training data",
        "Underfitting the underlying trend",
        "Inability to learn simple linear relationships",
        "Excessive training regularization"
      ],
      "ans": 0
    },
    {
      "q": "Which activation function is defined as f(x) = max(0, x) and helps prevent vanishing gradients?",
      "opts": [
        "ReLU (Rectified Linear Unit)",
        "Sigmoid",
        "Hyperbolic Tangent (Tanh)",
        "Softmax"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary objective of L1 Regularization (Lasso) compared to L2 Regularization (Ridge)?",
      "opts": [
        "Promoting feature sparsity by driving irrelevant weights to exactly zero",
        "Penalizing large weights proportionally to their square without zeroing",
        "Accelerating learning rate decay in stochastic gradient descent",
        "Normalizing input feature distributions across min-max bounds"
      ],
      "ans": 0
    },
    {
      "q": "In classification metrics, how is Recall (Sensitivity) mathematically formulated?",
      "opts": [
        "TP / (TP + FN)",
        "TP / (TP + FP)",
        "(TP + TN) / Total",
        "2 * (Precision * Recall) / (Precision + Recall)"
      ],
      "ans": 0
    },
    {
      "q": "Which metric represents the harmonic mean of Precision and Recall?",
      "opts": [
        "F1-Score",
        "ROC-AUC",
        "Mean Absolute Error (MAE)",
        "Cohen Kappa"
      ],
      "ans": 0
    },
    {
      "q": "What happens in Gradient Descent if the learning rate (alpha) is configured excessively high?",
      "opts": [
        "The optimization algorithm can overshoot the global minimum and diverge",
        "The model takes an excessively long time to converge to the local minimum",
        "The gradients will permanently shrink to zero",
        "The loss function will instantly evaluate to negative infinity"
      ],
      "ans": 0
    },
    {
      "q": "Which splitting criterion is commonly utilized in CART Decision Trees to evaluate node purity?",
      "opts": [
        "Gini Impurity",
        "Root Mean Squared Log Error",
        "Cosine Similarity",
        "Hamming Distance"
      ],
      "ans": 0
    },
    {
      "q": "How does Random Forest reduce model variance compared to individual decision trees?",
      "opts": [
        "By aggregating predictions across decorrelated trees trained on bootstrap samples (Bagging)",
        "By sequentially fitting trees to the residuals of previous trees (Boosting)",
        "By pruning leaf nodes with high depth penalties",
        "By enforcing linear boundaries across all feature dimensions"
      ],
      "ans": 0
    },
    {
      "q": "Which ensemble method trains sequential weak learners where each subsequent tree corrects the residual errors of its predecessor?",
      "opts": [
        "Gradient Boosting (e.g. XGBoost, LightGBM)",
        "Random Forest",
        "Extra Trees Classifier",
        "Voting Classifier with soft voting"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of the \"Kernel Trick\" in Support Vector Machines (SVM)?",
      "opts": [
        "Implicitly mapping non-linear data into higher-dimensional space where it becomes linearly separable",
        "Accelerating disk I/O when loading large image datasets",
        "Encrypting support vector coordinates for privacy-preserving computation",
        "Normalizing feature matrices using fast GPU kernels"
      ],
      "ans": 0
    },
    {
      "q": "In K-Means clustering, what does the algorithm iteratively minimize?",
      "opts": [
        "Inertia (Within-Cluster Sum of Squares)",
        "Mutual Information between clusters",
        "Silhouette coefficient across inter-cluster distances",
        "Kullback-Leibler divergence between sample distributions"
      ],
      "ans": 0
    },
    {
      "q": "Which clustering algorithm is capable of finding arbitrary shaped clusters and detecting outliers/noise points based on spatial density?",
      "opts": [
        "DBSCAN",
        "K-Means",
        "Gaussian Mixture Models with spherical covariance",
        "Agglomerative Ward Hierarchical Clustering"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary mathematical principle behind Principal Component Analysis (PCA)?",
      "opts": [
        "Eigenvalue decomposition of the covariance matrix to project data along axes of maximum variance",
        "Minimizing cross-entropy loss using backpropagation through time",
        "Maximizing class separation margin using Lagrange multipliers",
        "Clustering nearest neighbors using Euclidean distance metrics"
      ],
      "ans": 0
    },
    {
      "q": "Which fundamental calculus rule is used by the backpropagation algorithm to compute loss gradients with respect to neural network weights?",
      "opts": [
        "The Chain Rule",
        "L'Hopital's Rule",
        "Taylor Series Expansion",
        "Integration by Parts"
      ],
      "ans": 0
    },
    {
      "q": "Why does the Vanishing Gradient Problem predominantly occur in deep networks utilizing Sigmoid or Tanh activation functions?",
      "opts": [
        "Their derivatives saturate and are bounded between 0 and 0.25, causing gradient products to diminish exponentially",
        "They produce discontinuous output jumps that disrupt numerical differentiation",
        "They require excessive matrix inversion steps on backward passes",
        "They prevent weights from taking negative values"
      ],
      "ans": 0
    },
    {
      "q": "In Convolutional Neural Networks (CNNs), what is the primary role of a Max Pooling layer?",
      "opts": [
        "Downsampling feature map dimensions while preserving dominant spatial features and translation invariance",
        "Multiplying feature maps by learnable convolution kernels",
        "Normalizing activations to zero mean and unit variance",
        "Flattening multi-channel tensors into single dense vectors"
      ],
      "ans": 0
    },
    {
      "q": "What architectural innovation enables LSTMs and GRUs to model long-term sequential dependencies better than vanilla RNNs?",
      "opts": [
        "Gating mechanisms (e.g. forget, input, and output gates) controlling information flow",
        "Replacing recurrent feedback loops with multi-head self-attention",
        "Using 2D spatial convolution filters over temporal tokens",
        "Enforcing orthogonal weight matrices on hidden states"
      ],
      "ans": 0
    },
    {
      "q": "In the Transformer architecture, what is the mathematical formula for Scaled Dot-Product Attention?",
      "opts": [
        "softmax((Q * K^T) / sqrt(d_k)) * V",
        "sigmoid(Q * K) + V",
        "tanh((Q + K) / d_k) * V",
        "softmax(Q * V^T) / sqrt(d_k) * K"
      ],
      "ans": 0
    },
    {
      "q": "Which loss function is optimal when training a multi-class neural network classifier with mutually exclusive classes?",
      "opts": [
        "Categorical Cross-Entropy",
        "Binary Cross-Entropy",
        "Mean Squared Error (MSE)",
        "Hinge Loss"
      ],
      "ans": 0
    },
    {
      "q": "What technique synthetically generates minority class examples along the line segments joining k-nearest neighbors to address class imbalance?",
      "opts": [
        "SMOTE (Synthetic Minority Over-sampling Technique)",
        "Random Under-Sampling",
        "Stratified K-Fold Splitting",
        "Min-Max Normalization"
      ],
      "ans": 0
    },
    {
      "q": "How does Standard Scaling (Z-Score Standardization) transform a numerical feature?",
      "opts": [
        "Scales feature to have a mean of 0 and standard deviation of 1",
        "Bounds all values strictly between [0, 1]",
        "Transforms feature values into discrete quantiles",
        "Converts numerical continuous values into one-hot binary vectors"
      ],
      "ans": 0
    },
    {
      "q": "Why is One-Hot Encoding preferred over Label Encoding for nominal categorical variables (e.g. Country: India, USA, Germany)?",
      "opts": [
        "It prevents machine learning algorithms from inferring false ordinal/numerical hierarchy (e.g. 2 > 1)",
        "It reduces the dimensionality of the feature matrix",
        "It guarantees zero missing values in downstream models",
        "It forces all categorical probabilities to sum to 1.0"
      ],
      "ans": 0
    },
    {
      "q": "What does the Area Under the ROC Curve (ROC-AUC) measure across varying classification thresholds?",
      "opts": [
        "The model's capability to discriminate between positive and negative classes (TPR vs FPR)",
        "The exact accuracy of the model on the test split",
        "The average training loss across all epochs",
        "The harmonic balance between precision and calibration"
      ],
      "ans": 0
    },
    {
      "q": "What does the \"Early Stopping\" regularization technique monitor to prevent neural network overfitting?",
      "opts": [
        "Validation loss, halting training when validation performance ceases to improve",
        "GPU temperature and memory bandwidth limits",
        "Gradient norms, stopping when learning rates fall below threshold",
        "Training accuracy, terminating as soon as training error hits zero"
      ],
      "ans": 0
    },
    {
      "q": "What is the role of Batch Normalization in training deep neural networks?",
      "opts": [
        "Stabilizing and accelerating training by normalizing layer inputs per mini-batch",
        "Converting floating point weights to 8-bit integers for mobile deployment",
        "Shuffling training data batches before each epoch",
        "Enforcing strict dropout on hidden layer activations"
      ],
      "ans": 0
    },
    {
      "q": "In Natural Language Processing, how do Word2Vec and GloVe represent words?",
      "opts": [
        "As dense, low-dimensional continuous numerical vectors capturing semantic relationships",
        "As sparse high-dimensional bag-of-words boolean matrices",
        "As phonetic transcription strings based on IPA rules",
        "As encrypted hash tokens to ensure text privacy"
      ],
      "ans": 0
    },
    {
      "q": "In Reinforcement Learning, what equation expresses the value of a state as the immediate reward plus discounted future returns?",
      "opts": [
        "Bellman Equation",
        "Euler-Lagrange Equation",
        "Navier-Stokes Equation",
        "Markov Transition Formula"
      ],
      "ans": 0
    },
    {
      "q": "What is the \"Curse of Dimensionality\" in machine learning?",
      "opts": [
        "As feature dimensions increase, data becomes exponentially sparse and distances lose discriminative power",
        "Models become incapable of running on single CPU architectures",
        "Data storage requirements surpass standard database limits",
        "Feature correlations will always become perfectly collinear"
      ],
      "ans": 0
    },
    {
      "q": "Which technique randomly drops neurons and their connections during neural network training to prevent feature co-adaptation?",
      "opts": [
        "Dropout",
        "Weight Decay",
        "Gradient Clipping",
        "Data Augmentation"
      ],
      "ans": 0
    }
  ],
  "full-stack-web-development": [
    {
      "q": "What is the Virtual DOM in React, and why is it used?",
      "opts": [
        "An in-memory lightweight representation of the real DOM used for fast diffing and batch updates",
        "A browser API providing direct GPU acceleration for canvas elements",
        "A server-side cache for caching raw HTML responses",
        "A database shadow copy representing user sessions"
      ],
      "ans": 0
    },
    {
      "q": "In React, what is the behavior of useEffect when an empty dependency array ([]) is passed as the second argument?",
      "opts": [
        "The effect runs once after the initial component mount",
        "The effect runs after every single render and re-render",
        "The effect never runs at all",
        "The effect runs only when component props change"
      ],
      "ans": 0
    },
    {
      "q": "What is the key difference between useMemo and useCallback in React?",
      "opts": [
        "useMemo memoizes a computed value; useCallback memoizes a function reference",
        "useMemo is for asynchronous API calls; useCallback is for synchronous state updates",
        "useMemo persists data to localStorage; useCallback persists data to cookies",
        "useMemo binds event listeners; useCallback unbinds them on unmount"
      ],
      "ans": 0
    },
    {
      "q": "In the CSS Box Model, what is the correct order from inside to outside?",
      "opts": [
        "Content -> Padding -> Border -> Margin",
        "Content -> Border -> Padding -> Margin",
        "Margin -> Border -> Padding -> Content",
        "Content -> Margin -> Padding -> Border"
      ],
      "ans": 0
    },
    {
      "q": "In CSS Flexbox, which property aligns items along the cross axis?",
      "opts": [
        "align-items",
        "justify-content",
        "flex-direction",
        "align-content"
      ],
      "ans": 0
    },
    {
      "q": "How does the JavaScript Event Loop handle Promises (microtasks) compared to setTimeout (macrotasks)?",
      "opts": [
        "Microtasks queue is processed immediately after the current script, before any macrotask",
        "Macrotasks always execute before microtasks",
        "Both microtasks and macrotasks execute concurrently on separate OS threads",
        "Promises are delegated to the browser worker pool and execute last"
      ],
      "ans": 0
    },
    {
      "q": "What is a JavaScript closure?",
      "opts": [
        "A function bundled with references to its surrounding lexical environment",
        "A method to forcibly terminate infinite while loops",
        "A syntax for defining private class fields using the # prefix",
        "An asynchronous callback executed when a network request completes"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between \"let\" and \"var\" in JavaScript?",
      "opts": [
        "\"let\" is block-scoped and temporal dead zone protected; \"var\" is function-scoped and hoisted",
        "\"let\" cannot be reassigned; \"var\" can be reassigned",
        "\"let\" is hoisted to window object; \"var\" is not hoisted",
        "\"let\" only accepts string values; \"var\" accepts any data type"
      ],
      "ans": 0
    },
    {
      "q": "Which HTTP method should be used according to RESTful standards for idempotent full replacement of an existing resource?",
      "opts": [
        "PUT",
        "POST",
        "PATCH",
        "GET"
      ],
      "ans": 0
    },
    {
      "q": "What HTTP status code represents \"Unauthorized\" (meaning client authentication credentials are required or invalid)?",
      "opts": [
        "401",
        "403",
        "404",
        "400"
      ],
      "ans": 0
    },
    {
      "q": "What security mechanism does CORS (Cross-Origin Resource Sharing) enforce?",
      "opts": [
        "It restricts browsers from making cross-origin HTTP requests unless permitted by server headers",
        "It encrypts database network traffic between backend servers and clients",
        "It prevents users from taking screenshots inside web browsers",
        "It enforces automatic password rotation on login forms"
      ],
      "ans": 0
    },
    {
      "q": "What are the three components of a JSON Web Token (JWT) separated by periods?",
      "opts": [
        "Header, Payload, Signature",
        "Header, Body, Encryption Key",
        "Origin, Claims, Hash",
        "TokenId, ClientSecret, Checksum"
      ],
      "ans": 0
    },
    {
      "q": "Why are authentication session cookies typically configured with the \"HttpOnly\" flag?",
      "opts": [
        "To prevent client-side JavaScript from accessing the cookie, mitigating XSS token theft",
        "To ensure the cookie is only transmitted over HTTPS encrypted connections",
        "To restrict cookie transmission to top-level domain navigation",
        "To compress cookie payload size for faster transmission"
      ],
      "ans": 0
    },
    {
      "q": "How does Node.js achieve high concurrency despite being single-threaded for JavaScript execution?",
      "opts": [
        "Via an event-driven non-blocking I/O model supported by the libuv C++ thread pool",
        "By spinning up a new OS process for every incoming HTTP request",
        "By executing JavaScript bytecode directly on GPU shaders",
        "By disabling asynchronous event handling entirely"
      ],
      "ans": 0
    },
    {
      "q": "In Express.js, what is the role of the \"next()\" parameter in middleware functions?",
      "opts": [
        "Passes control to the next middleware function in the request-response cycle",
        "Sends the final JSON response to the client",
        "Restarts the Express HTTP server process",
        "Rolls back the active database transaction"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary benefit of adding a B-Tree index to a database column?",
      "opts": [
        "Dramatically accelerates SELECT query filtering and sorting at the cost of slower writes",
        "Ensures the column can only store non-null unique values",
        "Compresses database table size on physical hard drives",
        "Encrypts column data with AES-256 at rest"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between SQL INNER JOIN and LEFT JOIN?",
      "opts": [
        "INNER JOIN returns rows matching both tables; LEFT JOIN returns all left rows plus matched right rows",
        "INNER JOIN returns all rows from both tables; LEFT JOIN returns only rows from left table",
        "INNER JOIN is only for primary keys; LEFT JOIN is for foreign keys",
        "LEFT JOIN eliminates duplicate columns while INNER JOIN duplicates them"
      ],
      "ans": 0
    },
    {
      "q": "What is Server-Side Rendering (SSR) in frameworks like Next.js, and what is its primary benefit?",
      "opts": [
        "Pre-rendering HTML on the server for each request, delivering faster FCP and better SEO",
        "Executing all database queries on client browsers via WebAssembly",
        "Compiling React components into native desktop C++ binaries",
        "Generating static HTML files only once at build time without dynamic server computation"
      ],
      "ans": 0
    },
    {
      "q": "What technology provides full-duplex, persistent bidirectional communication between client and server over a single TCP connection?",
      "opts": [
        "WebSockets",
        "HTTP Short Polling",
        "Server-Sent Events (SSE)",
        "REST Webhooks"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of the CSS property \"box-sizing: border-box\"?",
      "opts": [
        "Includes padding and border within the specified width and height of an element",
        "Excludes margins from calculations of parent container width",
        "Forces all child elements to display as inline blocks",
        "Adds a drop shadow around the element border automatically"
      ],
      "ans": 0
    },
    {
      "q": "What does the \"useCallback\" hook return in React?",
      "opts": [
        "A memoized version of the callback function that only changes if dependencies change",
        "The returned value of executing the callback function",
        "A Promise resolving when the callback finishes execution",
        "A ref pointer attached to the DOM node"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of React Portal (ReactDOM.createPortal)?",
      "opts": [
        "Rendering children into a DOM node that exists outside the DOM hierarchy of parent component",
        "Establishing WebRTC peer-to-peer data channels between browsers",
        "Transferring state between two isolated React root applications",
        "Lazy-loading heavy components over dynamic network imports"
      ],
      "ans": 0
    },
    {
      "q": "In Node.js, what does the \"EventEmitter\" pattern allow objects to do?",
      "opts": [
        "Emit named events that cause previously registered listener functions to be called",
        "Write unbuffered binary data directly to disk blocks",
        "Share RAM memory heap across multiple worker threads",
        "Proxy incoming TCP sockets to remote DNS hostnames"
      ],
      "ans": 0
    },
    {
      "q": "What is SQL Injection (SQLi) and how is it reliably prevented in full-stack applications?",
      "opts": [
        "Malicious SQL injected via user input; prevented by using parameterized queries / prepared statements",
        "Injecting JavaScript into DOM; prevented by setting HttpOnly cookies",
        "Overwhelming database server with connections; prevented by connection pooling",
        "Stealing session tokens from memory; prevented by SSL encryption"
      ],
      "ans": 0
    },
    {
      "q": "What does the JavaScript \"=== \" (strict equality) operator check compared to \"==\" (loose equality)?",
      "opts": [
        "Checks both value and data type without performing type coercion",
        "Performs automatic type conversion before comparing values",
        "Checks whether two objects have identical memory references only",
        "Checks whether strings match case-insensitively"
      ],
      "ans": 0
    },
    {
      "q": "What is the role of a Service Worker in Progressive Web Applications (PWA)?",
      "opts": [
        "Runs in background intercepting network requests to enable offline caching and push notifications",
        "Manages database migrations on backend servers",
        "Handles CSS animations and 3D WebGL rendering threads",
        "Compiles TypeScript into minified JavaScript bundles"
      ],
      "ans": 0
    },
    {
      "q": "In relational databases, what does the ACID acronym stand for?",
      "opts": [
        "Atomicity, Consistency, Isolation, Durability",
        "Asynchronous, Concurrent, Indexed, Distributed",
        "Aggregation, Cache, Integrity, Delivery",
        "Authentication, Confidentiality, Identity, Decryption"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of the HTML5 semantic tag <main>?",
      "opts": [
        "Specifies the unique dominant content of the document body",
        "Contains site-wide navigation links and menu items",
        "Houses introductory banner content and logo images",
        "Defines tangential sidebar content related to the page"
      ],
      "ans": 0
    },
    {
      "q": "How does CSS Grid differ fundamentally from CSS Flexbox?",
      "opts": [
        "Grid is two-dimensional (rows and columns); Flexbox is one-dimensional (row or column)",
        "Grid only works with fixed pixel sizes; Flexbox works with percentages",
        "Grid is deprecated in modern browsers; Flexbox is the replacement",
        "Grid is only for typography layouts; Flexbox is for layout containers"
      ],
      "ans": 0
    },
    {
      "q": "What is Code Splitting in modern frontend bundlers (e.g. Vite, Webpack)?",
      "opts": [
        "Splitting bundle into smaller chunks loaded on-demand to reduce initial page load time",
        "Formatting code according to Prettier formatting rules",
        "Separating HTML, CSS, and JavaScript into three isolated files",
        "Compiling code into separate binaries for different OS platforms"
      ],
      "ans": 0
    }
  ],
  "python-programming": [
    {
      "q": "What is the output of print(type(5 / 2)) in Python 3?",
      "opts": [
        "<class 'float'>",
        "<class 'int'>",
        "<class 'double'>",
        "<class 'number'>"
      ],
      "ans": 0
    },
    {
      "q": "Which of the following data types in Python is immutable?",
      "opts": [
        "Tuple",
        "List",
        "Dictionary",
        "Set"
      ],
      "ans": 0
    },
    {
      "q": "What keyword is used to define an anonymous function in Python?",
      "opts": [
        "lambda",
        "def",
        "func",
        "inline"
      ],
      "ans": 0
    },
    {
      "q": "What does the *args parameter represent in a Python function definition?",
      "opts": [
        "Variable length non-keyword positional arguments as a tuple",
        "Keyword arguments dictionary",
        "Default arguments list",
        "Pointer to a tuple"
      ],
      "ans": 0
    },
    {
      "q": "What is the average time complexity of looking up a key in a standard Python dictionary?",
      "opts": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "What is the Global Interpreter Lock (GIL) in CPython?",
      "opts": [
        "A mutex that prevents multiple native threads from executing Python bytecodes at once",
        "A security lock that encrypts Python scripts at runtime",
        "A memory manager that locks unused RAM blocks",
        "A compiler pass that prevents global variables from mutation"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between the \"is\" operator and the \"==\" operator in Python?",
      "opts": [
        "\"is\" checks object identity (same memory address); \"==\" checks value equality",
        "\"is\" checks value equality; \"==\" checks identity",
        "\"is\" converts types; \"==\" does not convert types",
        "\"is\" is used only for strings; \"==\" is used for numbers"
      ],
      "ans": 0
    },
    {
      "q": "Which built-in Python method is called to initialize a newly created class instance?",
      "opts": [
        "__init__",
        "__new__",
        "__construct__",
        "__start__"
      ],
      "ans": 0
    },
    {
      "q": "What does the \"yield\" keyword do inside a Python function?",
      "opts": [
        "Turns the function into a generator that yields values lazily on-demand",
        "Terminates function execution and returns an error code",
        "Forces the CPU to pause execution for 100 milliseconds",
        "Converts local variables into global variables"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary benefit of using a Python Context Manager with the \"with\" statement?",
      "opts": [
        "Guarantees resource cleanup (e.g. closing files or connections) even if exceptions occur",
        "Accelerates function execution by caching return values",
        "Allows multiple threads to access shared memory simultaneously",
        "Bypasses the Python Global Interpreter Lock"
      ],
      "ans": 0
    },
    {
      "q": "What is the result of list(range(1, 10, 2)) in Python?",
      "opts": [
        "[1, 3, 5, 7, 9]",
        "[1, 2, 4, 6, 8]",
        "[2, 4, 6, 8, 10]",
        "[1, 3, 5, 7, 9, 10]"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between shallow copy (copy.copy) and deep copy (copy.deepcopy)?",
      "opts": [
        "Shallow copy copies the outer container referencing nested objects; deep copy recursively copies all nested objects",
        "Shallow copy copies strings; deep copy copies numbers",
        "Shallow copy works on tuples; deep copy works on lists",
        "Shallow copy writes to disk; deep copy writes to RAM"
      ],
      "ans": 0
    },
    {
      "q": "Which Python collection type stores unique, unordered, and hashable elements?",
      "opts": [
        "set",
        "list",
        "dict",
        "tuple"
      ],
      "ans": 0
    },
    {
      "q": "In Python, what algorithm is used by the Method Resolution Order (MRO) for multiple inheritance?",
      "opts": [
        "C3 Linearization",
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)",
        "Dijkstra Algorithm"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of functools.wraps when writing Python decorators?",
      "opts": [
        "Preserves the original function name, docstring, and metadata on the decorated wrapper",
        "Converts synchronous functions into asynchronous coroutines",
        "Compiles the function into native C machine code",
        "Encrypts the source code of the wrapped function"
      ],
      "ans": 0
    },
    {
      "q": "How does Python handle memory management and cleanup of unreferenced objects?",
      "opts": [
        "Automatic Reference Counting combined with a cyclic generational Garbage Collector",
        "Manual free() calls required by developers",
        "Linear sweep garbage collection at application exit only",
        "Allocating memory solely on the CPU L1 cache"
      ],
      "ans": 0
    },
    {
      "q": "What does a list comprehension [x for x in range(10) if x % 2 == 0] produce?",
      "opts": [
        "[0, 2, 4, 6, 8]",
        "[2, 4, 6, 8, 10]",
        "[1, 3, 5, 7, 9]",
        "[0, 1, 2, 3, 4]"
      ],
      "ans": 0
    },
    {
      "q": "What does the built-in enumerate() function return when iterating over an iterable?",
      "opts": [
        "Pairs of (index, item) for each element in the iterable",
        "A sorted duplicate list of the iterable",
        "A reversed list of elements",
        "The total count of items in the iterable"
      ],
      "ans": 0
    },
    {
      "q": "In Python exception handling, when does the \"else\" block execute?",
      "opts": [
        "Only if no exception was raised inside the try block",
        "Always, right before the finally block",
        "Only if an exception was caught by except",
        "When the script encounters an unhandled warning"
      ],
      "ans": 0
    },
    {
      "q": "What does the __str__() magic method return compared to __repr__()?",
      "opts": [
        "__str__ returns a user-friendly readable string; __repr__ returns an unambiguous official string for debugging",
        "__str__ returns integer hash; __repr__ returns string",
        "__str__ prints to console; __repr__ writes to file",
        "__str__ is for numbers; __repr__ is for text"
      ],
      "ans": 0
    },
    {
      "q": "What decorator defines a method that receives the class (cls) as its first implicit argument rather than an instance (self)?",
      "opts": [
        "@classmethod",
        "@staticmethod",
        "@property",
        "@abstractmethod"
      ],
      "ans": 0
    },
    {
      "q": "What does collections.defaultdict do when a non-existent key is queried?",
      "opts": [
        "Automatically initializes the key with a default value provided by a factory function without raising KeyError",
        "Raises a KeyError exception immediately",
        "Deletes the dictionary from memory",
        "Returns None without modifying the dictionary"
      ],
      "ans": 0
    },
    {
      "q": "In Python, what is the output of bool([])?",
      "opts": [
        "False",
        "True",
        "None",
        "SyntaxError"
      ],
      "ans": 0
    },
    {
      "q": "What does the zip() function do when passed iterables of unequal length?",
      "opts": [
        "Stops iterating when the shortest input iterable is exhausted",
        "Fills missing values with None automatically",
        "Raises a ValueError exception by default",
        "Loops through the shorter iterable continuously"
      ],
      "ans": 0
    },
    {
      "q": "What module provides asynchronous event loop and coroutines in standard Python?",
      "opts": [
        "asyncio",
        "threading",
        "multiprocessing",
        "concurrent.futures"
      ],
      "ans": 0
    },
    {
      "q": "What does the \"pass\" statement do in Python?",
      "opts": [
        "A null statement that executes and does nothing, used as a syntactic placeholder",
        "Exits the enclosing loop immediately",
        "Skips to the next iteration of the loop",
        "Raises a StopIteration exception"
      ],
      "ans": 0
    },
    {
      "q": "What is the syntax for creating an f-string in Python 3.6+?",
      "opts": [
        "f\"Value is {var}\"",
        "format(\"Value is %s\", var)",
        "\"Value is {0}\".format(var)",
        "s\"Value is $(var)\""
      ],
      "ans": 0
    },
    {
      "q": "What does the __all__ list inside a Python package __init__.py file define?",
      "opts": [
        "The list of public module names exported when \"from package import *\" is used",
        "All external pip dependencies required by the package",
        "The author and license information for PyPI",
        "The list of test cases to execute on pytest"
      ],
      "ans": 0
    },
    {
      "q": "How does Python evaluate round(2.5) and round(3.5)?",
      "opts": [
        "2 and 4 (Banker's Rounding / round half to even)",
        "3 and 4 (Standard arithmetic rounding)",
        "2 and 3 (Truncating towards zero)",
        "3 and 3 (Ceiling rounding)"
      ],
      "ans": 0
    },
    {
      "q": "Which data structure from the collections module implements a double-ended queue with O(1) appends and pops from both ends?",
      "opts": [
        "deque",
        "OrderedDict",
        "ChainMap",
        "Counter"
      ],
      "ans": 0
    }
  ],
  "java-backend-architecture": [
    {
      "q": "In the Java Virtual Machine (JVM), where are object instances and arrays allocated?",
      "opts": [
        "Heap Memory",
        "Stack Memory",
        "Method Area",
        "PC Register"
      ],
      "ans": 0
    },
    {
      "q": "Starting from Java 8, what types of concrete methods can be declared inside an Interface?",
      "opts": [
        "default and static methods",
        "private synchronized methods only",
        "final abstract methods only",
        "native constructor methods"
      ],
      "ans": 0
    },
    {
      "q": "What is the key difference between String and StringBuilder in Java?",
      "opts": [
        "String is immutable; StringBuilder is mutable and faster for frequent concatenations",
        "String is mutable; StringBuilder is immutable",
        "String is thread-safe; StringBuilder is synchronized",
        "String stores bytes; StringBuilder stores integers"
      ],
      "ans": 0
    },
    {
      "q": "What is the fundamental difference between HashMap and Hashtable in Java?",
      "opts": [
        "HashMap is unsynchronized and allows one null key; Hashtable is synchronized and permits no null keys",
        "HashMap is thread-safe; Hashtable is not thread-safe",
        "HashMap is ordered; Hashtable is sorted by keys",
        "HashMap stores primitives; Hashtable stores objects"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between method Overloading and method Overriding in Java?",
      "opts": [
        "Overloading has same name with different parameter signatures in the same class; Overriding redefines superclass method in subclass",
        "Overloading occurs at runtime; Overriding occurs at compile-time",
        "Overloading requires the @Override annotation; Overriding does not",
        "Overloading is for static methods only; Overriding is for private methods only"
      ],
      "ans": 0
    },
    {
      "q": "In Spring Boot, what does the @RestController annotation combine?",
      "opts": [
        "@Controller and @ResponseBody",
        "@Controller and @Service",
        "@Component and @Repository",
        "@Service and @Autowired"
      ],
      "ans": 0
    },
    {
      "q": "What is the default bean scope in the Spring Framework IoC Container?",
      "opts": [
        "Singleton",
        "Prototype",
        "Request",
        "Session"
      ],
      "ans": 0
    },
    {
      "q": "What does the @SpringBootApplication annotation encapsulate?",
      "opts": [
        "@Configuration, @EnableAutoConfiguration, and @ComponentScan",
        "@Service, @Repository, and @Controller",
        "@Entity, @Table, and @Id",
        "@Component, @Scope, and @Lazy"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of the \"volatile\" keyword in Java multithreading?",
      "opts": [
        "Guarantees that updates to a variable are immediately visible to all threads by reading from main memory",
        "Locks the object monitor preventing concurrent access",
        "Prevents the variable from being serialized to disk",
        "Ensures the variable cannot be modified after initialization"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between ArrayList and LinkedList in Java?",
      "opts": [
        "ArrayList uses a dynamic resizable array (O(1) random access); LinkedList uses a doubly-linked list (O(1) insertions at ends)",
        "ArrayList is synchronized; LinkedList is unsynchronized",
        "ArrayList cannot store duplicates; LinkedList can store duplicates",
        "ArrayList is for primitive types; LinkedList is for reference types"
      ],
      "ans": 0
    },
    {
      "q": "Which interface in Java is used to define the natural ordering of objects via the compareTo() method?",
      "opts": [
        "Comparable",
        "Comparator",
        "Cloneable",
        "Serializable"
      ],
      "ans": 0
    },
    {
      "q": "What are Checked Exceptions in Java?",
      "opts": [
        "Exceptions that inherit from Exception (excluding RuntimeException) and must be handled or declared in throws clause",
        "Exceptions that inherit directly from Error and cause JVM termination",
        "Exceptions that only occur during unit test execution",
        "Exceptions that inherit from RuntimeException and are unchecked at compile-time"
      ],
      "ans": 0
    },
    {
      "q": "What is Inversion of Control (IoC) in the Spring Framework?",
      "opts": [
        "The framework manages object creation and lifecycle, injecting dependencies rather than objects instantiating them",
        "Reversing the flow of TCP network packets",
        "Inverting the inheritance hierarchy between classes and interfaces",
        "Compiling Java bytecode directly into C++ source code"
      ],
      "ans": 0
    },
    {
      "q": "What does the @Transactional annotation in Spring manage?",
      "opts": [
        "Automatic transaction demarcation (commit on success, rollback on RuntimeException)",
        "Encrypting database columns during persistence",
        "Rate limiting incoming HTTP requests",
        "Logging SQL query latency to console"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of Optional<T> introduced in Java 8?",
      "opts": [
        "To provide a type-level representation of a value that may or may not be present, reducing NullPointerExceptions",
        "To make method parameters optional in function calls",
        "To enable optional multithreading execution",
        "To define optional dependencies in Maven pom.xml"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between Hibernate First-Level (L1) and Second-Level (L2) Cache?",
      "opts": [
        "L1 Cache is session-scoped (enabled by default); L2 Cache is SessionFactory-scoped across sessions (optional, shared)",
        "L1 Cache stores data in Redis; L2 Cache stores data in RAM",
        "L1 Cache is for MongoDB; L2 Cache is for PostgreSQL",
        "L1 Cache is client-side; L2 Cache is server-side"
      ],
      "ans": 0
    },
    {
      "q": "How does Spring Data JPA generate SQL queries when using repository interface method names like findByEmailAndStatus(String email, String status)?",
      "opts": [
        "Parses method naming conventions using reflection and dynamically derives the JPQL/SQL query",
        "Requires raw SQL string annotations on all repository methods",
        "Compiles method names into stored procedures on database boot",
        "Executes a full table scan and filters records in JVM memory"
      ],
      "ans": 0
    },
    {
      "q": "What is Type Erasure in Java Generics?",
      "opts": [
        "The compiler strips all generic type parameter information at compile time, replacing with bounds/Object for bytecode backward compatibility",
        "A runtime exception thrown when casting incompatible types",
        "Erasing unused class definitions during garbage collection",
        "A garbage collection phase that clears static variable memory"
      ],
      "ans": 0
    },
    {
      "q": "What is the ExecutorService in java.util.concurrent?",
      "opts": [
        "A high-level framework that manages thread pools and asynchronous task execution lifecycle",
        "A low-level operating system scheduler hook",
        "A tool for compiling Java source code in parallel",
        "A garbage collection thread monitor"
      ],
      "ans": 0
    },
    {
      "q": "Which annotation in Spring Boot is used to extract a variable from the URI path (e.g. /users/{id})?",
      "opts": [
        "@PathVariable",
        "@RequestParam",
        "@RequestBody",
        "@RequestHeader"
      ],
      "ans": 0
    },
    {
      "q": "What is the contract between equals() and hashCode() in Java?",
      "opts": [
        "If two objects are equal according to equals(), they must produce the same hashCode() integer",
        "If two objects have the same hashCode(), they must always be equal according to equals()",
        "hashCode() must return a unique integer for every distinct object in memory",
        "equals() and hashCode() are completely independent with no contractual requirement"
      ],
      "ans": 0
    },
    {
      "q": "In Spring Framework, how does Dependency Injection via constructor compare to field injection with @Autowired?",
      "opts": [
        "Constructor injection is preferred because it enables immutability (final fields) and simplifies unit testing without mocking framework",
        "Field injection is faster at runtime than constructor injection",
        "Constructor injection is deprecated in Spring Boot 3",
        "Field injection is the only way to inject circular dependencies"
      ],
      "ans": 0
    },
    {
      "q": "What does the finalize() method do in Java, and why is it deprecated in modern Java versions?",
      "opts": [
        "Called by garbage collector before object reclamation; deprecated due to unpredictable timing, performance issues, and deadlocks",
        "Finalizes class bytecode compilation; deprecated in favor of GraalVM",
        "Closes database sockets automatically; deprecated for try-with-resources",
        "Prevents classes from being extended; deprecated for sealed classes"
      ],
      "ans": 0
    },
    {
      "q": "Which garbage collector was introduced as the default low-pause collector in Java 9+?",
      "opts": [
        "G1 (Garbage-First) GC",
        "Serial GC",
        "Parallel GC",
        "CMS (Concurrent Mark Sweep) GC"
      ],
      "ans": 0
    },
    {
      "q": "What are Java 14+ Records (record Keyword)?",
      "opts": [
        "Immutable data carrier classes with auto-generated constructor, getters, equals(), hashCode(), and toString()",
        "Database row representations that automatically sync with SQL tables",
        "Classes specifically designed for logging telemetry records to disk",
        "Mutable structures that bypass heap memory allocation"
      ],
      "ans": 0
    },
    {
      "q": "What is Spring Cloud Eureka used for in a microservices architecture?",
      "opts": [
        "Service Registration and Service Discovery",
        "Distributed transaction coordinator",
        "Centralized API rate limiting gateway",
        "Cloud storage bucket synchronization"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of the Java Stream.map() operation?",
      "opts": [
        "An intermediate operation that transforms each element of the stream by applying a function",
        "A terminal operation that converts the stream into a java.util.Map",
        "A filtering operation that drops null values",
        "A reduction operation calculating the sum of elements"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between fail-fast and fail-safe iterators in Java collections?",
      "opts": [
        "Fail-fast throws ConcurrentModificationException if collection is modified during iteration; fail-safe iterates over a copy",
        "Fail-fast continues iterating on errors; fail-safe stops iteration",
        "Fail-fast is thread-safe; fail-safe is unsynchronized",
        "Fail-fast works on arrays; fail-safe works on queues"
      ],
      "ans": 0
    },
    {
      "q": "In Maven, what is the role of the pom.xml file?",
      "opts": [
        "Defines project configuration, dependencies, plugins, and build lifecycle goals (Project Object Model)",
        "Stores runtime database connection passwords",
        "Compiles Java bytecode into native machine executables",
        "Manages git branch merge conflicts"
      ],
      "ans": 0
    },
    {
      "q": "What design pattern does the Spring Framework BeanFactory and ApplicationContext implement?",
      "opts": [
        "Factory Pattern and Inversion of Control Container",
        "Observer Pattern exclusively",
        "Decorator Pattern exclusively",
        "Singleton Anti-Pattern"
      ],
      "ans": 0
    }
  ],
  "cloud-devops": [
    {
      "q": "What is the key difference between a Docker container and a Virtual Machine (VM)?",
      "opts": [
        "Containers share the host OS kernel and isolate at process level; VMs run a full guest OS on top of a hypervisor",
        "Containers require a dedicated hypervisor; VMs do not",
        "VMs start up in milliseconds; containers take minutes to boot",
        "Containers can only run Python applications; VMs run any language"
      ],
      "ans": 0
    },
    {
      "q": "In Kubernetes, what is a Pod?",
      "opts": [
        "The smallest deployable computing unit in K8s, encapsulating one or more containers sharing network and storage",
        "A physical server rack inside a cloud provider datacenter",
        "A continuous integration build pipeline runner",
        "A load balancer that distributes traffic across AWS regions"
      ],
      "ans": 0
    },
    {
      "q": "In Docker, what is the primary advantage of a Multi-Stage Build?",
      "opts": [
        "Keeps production images lean by discarding build-time SDKs and dependencies from the final runtime image",
        "Enables running multiple containers inside a single Docker image",
        "Allows building images across multiple cloud providers simultaneously",
        "Automatically encrypts Docker image layers with AES-256"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary function of Kubernetes Ingress?",
      "opts": [
        "Managing external HTTP and HTTPS routing into services within a Kubernetes cluster",
        "Scraping Prometheus metrics from cluster nodes",
        "Allocating persistent SSD storage volumes to worker nodes",
        "Managing container restart policies on node failure"
      ],
      "ans": 0
    },
    {
      "q": "What is Infrastructure as Code (IaC), and what tool is widely used to achieve it declaratively across multiple clouds?",
      "opts": [
        "Managing and provisioning cloud infrastructure through version-controlled code; Terraform",
        "Manually clicking cloud console buttons; AWS Management Console",
        "Writing shell scripts executed via SSH on live servers; Bash",
        "Configuring routers via telnet; PuTTY"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?",
      "opts": [
        "CI automatically builds and tests code changes; CD automatically deploys validated code to production",
        "CI is for frontend applications; CD is for backend databases",
        "CI requires manual approval; CD is always manual",
        "CI manages cloud infrastructure; CD monitors server CPU usage"
      ],
      "ans": 0
    },
    {
      "q": "In AWS networking, what is the difference between a Public Subnet and a Private Subnet?",
      "opts": [
        "Public subnets have direct routing to an Internet Gateway; Private subnets route outbound traffic through a NAT Gateway",
        "Public subnets are free; Private subnets are paid",
        "Public subnets run Linux; Private subnets run Windows",
        "Public subnets cannot run databases; Private subnets cannot run web servers"
      ],
      "ans": 0
    },
    {
      "q": "What is a Blue-Green Deployment strategy?",
      "opts": [
        "Maintaining two identical production environments, switching traffic to the new version once verified to eliminate downtime",
        "Gradually routing 5% of traffic to the new version and scaling up based on metrics",
        "Deploying updates to half the servers on Mondays and the other half on Fridays",
        "Deploying code changes directly into live running container processes"
      ],
      "ans": 0
    },
    {
      "q": "What are the three core pillars of Observability in modern distributed systems?",
      "opts": [
        "Metrics, Logs, and Traces",
        "CPU, RAM, and Disk",
        "Latency, Bandwidth, and Throughput",
        "Alerts, Notifications, and Escalations"
      ],
      "ans": 0
    },
    {
      "q": "In Prometheus monitoring, what collection model is primarily used to gather metrics from targets?",
      "opts": [
        "Pull model: Prometheus periodically scrapes HTTP /metrics endpoints exposed by targets",
        "Push model: Targets push UDP packets to Prometheus every second",
        "Streaming model: Targets stream binary telemetry over Kafka topics",
        "Polling model: Prometheus queries SQL databases directly for metrics"
      ],
      "ans": 0
    },
    {
      "q": "In AWS IAM, what is the Principle of Least Privilege?",
      "opts": [
        "Granting users and services only the minimum permissions necessary to perform their designated tasks",
        "Allowing all developers administrator access to avoid deployment friction",
        "Restricting all cloud access exclusively to the root account",
        "Revoking permissions after 24 hours of inactivity"
      ],
      "ans": 0
    },
    {
      "q": "What is the role of Kubernetes etcd in the cluster control plane?",
      "opts": [
        "A consistent and highly-available distributed key-value store holding all cluster state and configuration",
        "The network proxy that routes traffic to pods",
        "The component that compiles container images from source code",
        "The DNS resolver that translates external domain names"
      ],
      "ans": 0
    },
    {
      "q": "What is a Canary Deployment?",
      "opts": [
        "Rolling out new code to a small subset of users/servers before promoting to the entire fleet",
        "Deploying code exclusively to non-production staging environments",
        "Running automated penetration tests against live production endpoints",
        "Testing database recovery by intentionally terminating instances"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between Layer 4 (L4) and Layer 7 (L7) load balancers?",
      "opts": [
        "L4 routes based on IP and TCP/UDP ports; L7 inspects HTTP/HTTPS headers, paths, cookies, and payloads",
        "L4 is for cloud environments; L7 is for on-premise datacenters",
        "L4 encrypts SSL; L7 cannot terminate SSL certificates",
        "L4 is software-based; L7 is hardware-based"
      ],
      "ans": 0
    },
    {
      "q": "What is GitOps?",
      "opts": [
        "An operational framework using Git repositories as the single source of truth for declarative infrastructure and applications",
        "Using git commit hooks to send Slack notifications",
        "Hosting git repositories on AWS S3 buckets",
        "Deploying applications by running git pull on production servers via cron"
      ],
      "ans": 0
    },
    {
      "q": "In Kubernetes, what is a ReplicaSet?",
      "opts": [
        "Maintains a stable set of identical replica Pods running at any given time",
        "Creates database read-replicas in AWS RDS",
        "Backs up cluster logs to Amazon Glacier",
        "Replicates container images across multiple Docker registries"
      ],
      "ans": 0
    },
    {
      "q": "What AWS service provides serverless compute that executes code in response to events without provisioning servers?",
      "opts": [
        "AWS Lambda",
        "Amazon EC2",
        "Amazon ECS",
        "Amazon EMR"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of a Reverse Proxy like Nginx in a production architecture?",
      "opts": [
        "Sits in front of backend servers handling SSL termination, reverse caching, load balancing, and rate limiting",
        "Translates domain names to IP addresses for web browsers",
        "Connects client browsers directly to physical database sockets",
        "Compresses images before uploading them to Git repositories"
      ],
      "ans": 0
    },
    {
      "q": "In Docker, what is the difference between the CMD and ENTRYPOINT instructions in a Dockerfile?",
      "opts": [
        "ENTRYPOINT sets the default executable; CMD provides default arguments that can be easily overridden at runtime",
        "CMD is mandatory; ENTRYPOINT is optional",
        "CMD sets environment variables; ENTRYPOINT copies files",
        "ENTRYPOINT runs during docker build; CMD runs during docker push"
      ],
      "ans": 0
    },
    {
      "q": "What tool is commonly used for distributed tracing across microservices to visualize request latency breakdown?",
      "opts": [
        "Jaeger / OpenTelemetry",
        "Logstash",
        "Nginx",
        "Docker Compose"
      ],
      "ans": 0
    },
    {
      "q": "In Kubernetes, what is a ConfigMap?",
      "opts": [
        "An API object used to store non-confidential configuration data in key-value pairs separated from container image",
        "A network routing table for inter-pod communication",
        "A visual GUI dashboard mapping pod resource usage",
        "A cluster deployment script written in Python"
      ],
      "ans": 0
    },
    {
      "q": "What AWS storage service provides scalable, durable object storage accessible over HTTP via REST APIs?",
      "opts": [
        "Amazon S3 (Simple Storage Service)",
        "Amazon EBS (Elastic Block Store)",
        "Amazon EFS (Elastic File System)",
        "AWS Storage Gateway"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary benefit of Immutable Infrastructure in cloud environments?",
      "opts": [
        "Eliminates configuration drift by replacing servers rather than modifying running servers in-place",
        "Reduces monthly cloud computing billing rates by 50%",
        "Guarantees that software will never encounter memory leaks",
        "Enables servers to run without operating system kernels"
      ],
      "ans": 0
    },
    {
      "q": "What does the Kubernetes Horizontal Pod Autoscaler (HPA) do?",
      "opts": [
        "Automatically scales the number of Pod replicas in a deployment based on observed CPU/memory utilization",
        "Adds additional physical CPU cores to worker node motherboards",
        "Increases pod network bandwidth allocation during high traffic",
        "Moves pods between AWS availability zones automatically"
      ],
      "ans": 0
    },
    {
      "q": "What is HashiCorp Vault primarily used for in DevOps workflows?",
      "opts": [
        "Securely managing, storing, and tightly controlling access to secrets, tokens, API keys, and certificates",
        "Compiling Docker images from source code",
        "Monitoring Kubernetes pod memory consumption",
        "Hosting private Git repositories with branch protection"
      ],
      "ans": 0
    },
    {
      "q": "What is a Dead Letter Queue (DLQ) in message queuing systems (e.g. RabbitMQ, AWS SQS)?",
      "opts": [
        "A queue that isolates messages that cannot be processed successfully after a designated number of retry attempts",
        "A queue that deletes all messages when consumer memory exceeds 80%",
        "A high-priority queue that bypasses standard rate limits",
        "A queue reserved for administrative system broadcast notices"
      ],
      "ans": 0
    },
    {
      "q": "In CI/CD, what is the role of a Linter (e.g. ESLint, Flake8)?",
      "opts": [
        "Analyzes source code statically to flag programming errors, stylistic bugs, and anti-patterns before execution",
        "Compiles source code into production binary executables",
        "Deploys artifacts to staging environments automatically",
        "Generates mock database fixtures for unit tests"
      ],
      "ans": 0
    },
    {
      "q": "What is Chaos Engineering (e.g. Chaos Monkey)?",
      "opts": [
        "The discipline of experimenting on a system to build confidence in its capability to withstand turbulent conditions in production",
        "Intentionally deploying untested code to production on Fridays",
        "Writing microservices without automated unit test coverage",
        "Disabling database backups to test manual recovery procedures"
      ],
      "ans": 0
    },
    {
      "q": "In Kubernetes, what is a StatefulSet used for instead of a Deployment?",
      "opts": [
        "Managing stateful applications (e.g. databases, Kafka) requiring unique identities and persistent stable storage per pod",
        "Deploying stateless web APIs that can be scaled up or down interchangeably",
        "Running batch jobs that terminate upon successful completion",
        "Managing cluster-wide DaemonSet networking plugins"
      ],
      "ans": 0
    },
    {
      "q": "What is Zero Trust Network Access (ZTNA) in modern DevOps architectures?",
      "opts": [
        "Requires strict identity verification for every person and device trying to access private network resources, regardless of perimeter",
        "Granting access automatically to any device connected to the office Wi-Fi",
        "Disabling encryption between internal microservices to reduce latency",
        "Allowing public access to all staging environments"
      ],
      "ans": 0
    }
  ],
  "cybersecurity-ethical-hacking": [
    {
      "q": "What are the three components of the CIA Triad in Information Security?",
      "opts": [
        "Confidentiality, Integrity, Availability",
        "Control, Inspection, Authorization",
        "Cryptography, Identification, Authentication",
        "Centralization, Isolation, Access"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary difference between Symmetric and Asymmetric Encryption?",
      "opts": [
        "Symmetric uses the same key for encryption and decryption (e.g. AES); Asymmetric uses a public/private keypair (e.g. RSA)",
        "Symmetric uses public keys; Asymmetric uses private keys only",
        "Symmetric is one-way hashing; Asymmetric is reversible",
        "Symmetric encryption cannot be decrypted once applied"
      ],
      "ans": 0
    },
    {
      "q": "What is a Cryptographic Hash function (e.g. SHA-256), and what is its primary property?",
      "opts": [
        "A one-way deterministic mathematical function producing a fixed-size digest that cannot be reversed",
        "A two-way algorithm used to encrypt confidential customer passwords",
        "A compression algorithm that reduces file sizes by 50%",
        "A random number generator that produces unique integers per second"
      ],
      "ans": 0
    },
    {
      "q": "Why is \"Salting\" essential when storing hashed passwords in a database?",
      "opts": [
        "It appends unique random data to each password before hashing, defeating precomputed Rainbow Table attacks",
        "It encrypts the hash with a master AES-256 key",
        "It compresses the password hash so it fits in smaller database columns",
        "It allows administrators to recover lost passwords on request"
      ],
      "ans": 0
    },
    {
      "q": "What is Cross-Site Scripting (XSS)?",
      "opts": [
        "A vulnerability where an attacker injects malicious client-side JavaScript that executes in other users' browsers",
        "An attack where SQL commands are injected into database forms",
        "An attack that floods network bandwidth with UDP packets",
        "An attack that steals physical hard drives from datacenters"
      ],
      "ans": 0
    },
    {
      "q": "What is Cross-Site Request Forgery (CSRF)?",
      "opts": [
        "An attack that tricks an authenticated victim into executing unwanted state-changing actions on a trusted web application",
        "Injecting malicious scripts into public web forums",
        "Intercepting Wi-Fi packets using a rogue access point",
        "Cracking passwords using brute-force dictionary attacks"
      ],
      "ans": 0
    },
    {
      "q": "How does a Web Application Firewall (WAF) differ from a traditional Network Firewall?",
      "opts": [
        "A WAF inspects application layer (Layer 7) HTTP/HTTPS traffic for web attacks; Network firewalls filter network packets (Layers 3-4)",
        "A WAF protects against physical hardware theft; Network firewalls protect Wi-Fi",
        "A WAF is only for cloud environments; Network firewalls are for home routers",
        "A WAF replaces the need for SSL/TLS certificates"
      ],
      "ans": 0
    },
    {
      "q": "What is a Man-In-The-Middle (MITM) attack, and how is it primarily mitigated?",
      "opts": [
        "An attacker intercepts communication between two parties; mitigated by end-to-end TLS/HTTPS encryption and certificate verification",
        "An attacker uses brute force against passwords; mitigated by MFA",
        "An attacker floods server CPU; mitigated by auto-scaling",
        "An attacker steals cookies; mitigated by disabling JavaScript"
      ],
      "ans": 0
    },
    {
      "q": "What is the role of an ARP Spoofing attack on a Local Area Network (LAN)?",
      "opts": [
        "Associating the attacker's MAC address with the IP address of the legitimate default gateway to intercept LAN traffic",
        "Cracking WPA2 Wi-Fi encryption passphrases",
        "Flooding the network switch with random MAC addresses to cause a broadcast storm",
        "Spoofing DNS root server certificates"
      ],
      "ans": 0
    },
    {
      "q": "What vulnerability category ranks consistently as #1 in the OWASP Top 10 web security risks?",
      "opts": [
        "Broken Access Control",
        "Security Misconfiguration",
        "Software and Data Integrity Failures",
        "Cryptographic Failures"
      ],
      "ans": 0
    },
    {
      "q": "What is a Buffer Overflow vulnerability in low-level languages like C/C++?",
      "opts": [
        "Writing data past the boundary of an allocated buffer, overwriting adjacent memory and potentially hijacking control flow",
        "Reading past the end of a database result set",
        "Exhausting network buffer queues on high traffic",
        "Allocating more memory on the heap than available physical RAM"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
      "opts": [
        "An IDS passively monitors and alerts on suspicious traffic; an IPS sits in-line and actively drops or blocks malicious traffic",
        "An IDS is hardware; an IPS is software",
        "An IDS monitors outgoing traffic; an IPS monitors incoming traffic",
        "An IDS is only for wireless networks; an IPS is for wired networks"
      ],
      "ans": 0
    },
    {
      "q": "In penetration testing, what tool is considered the industry standard for port scanning and network service enumeration?",
      "opts": [
        "Nmap",
        "Burp Suite",
        "Wireshark",
        "Metasploit"
      ],
      "ans": 0
    },
    {
      "q": "What does the HTTP header \"Content-Security-Policy\" (CSP) help prevent?",
      "opts": [
        "Cross-Site Scripting (XSS) and data injection by specifying approved origins for executable scripts and resources",
        "SQL Injection by sanitizing database queries",
        "DDoS attacks by rate limiting requests per IP",
        "MITM attacks by enforcing HTTPS connections"
      ],
      "ans": 0
    },
    {
      "q": "What is a Zero-Day Vulnerability?",
      "opts": [
        "A software vulnerability that is known to attackers or researchers but has no available patch from the vendor",
        "A vulnerability that requires zero technical skill to exploit",
        "A security flaw that automatically resolves itself within 24 hours",
        "A bug that was introduced on day zero of project creation"
      ],
      "ans": 0
    },
    {
      "q": "What are the three factors in Multi-Factor Authentication (MFA)?",
      "opts": [
        "Something you know (password), Something you have (device/token), Something you are (biometrics)",
        "Username, Password, Security Question",
        "Email, Phone Number, Home Address",
        "Fingerprint, Face ID, Retina Scan"
      ],
      "ans": 0
    },
    {
      "q": "What is DNS Spoofing (DNS Cache Poisoning)?",
      "opts": [
        "Injecting fraudulent DNS records into a recursive resolver cache to redirect users to malicious IP addresses",
        "Stealing domain ownership through registrar account takeovers",
        "Flooding authoritative DNS name servers with NXDOMAIN queries",
        "Modifying local /etc/hosts files via administrative access"
      ],
      "ans": 0
    },
    {
      "q": "What security principle dictates that a user should be granted the minimum permissions required to perform their job?",
      "opts": [
        "Principle of Least Privilege",
        "Defense in Depth",
        "Fail-Safe Defaults",
        "Separation of Duties"
      ],
      "ans": 0
    },
    {
      "q": "In Cryptography, what is a \"Nonce\"?",
      "opts": [
        "An arbitrary number used only once in cryptographic communications to prevent replay attacks",
        "A master private key stored in an HSM",
        "A mathematical constant used to calculate prime numbers",
        "An encrypted password hash stored on disk"
      ],
      "ans": 0
    },
    {
      "q": "What is a Honeypot in defensive cyber operations?",
      "opts": [
        "A decoy system deliberately exposed to detect, deflect, and study unauthorized attacker techniques",
        "A password manager that auto-fills encrypted credentials",
        "A secure enclave inside CPU hardware (e.g. Intel SGX)",
        "A cryptographic vault that stores administrative SSH keys"
      ],
      "ans": 0
    },
    {
      "q": "What does the HTTP response header \"X-Frame-Options: DENY\" prevent?",
      "opts": [
        "Clickjacking attacks by disallowing the page from being embedded in an <iframe>",
        "Cross-Site Scripting by disabling JavaScript frames",
        "SQL Injection by denying framed query strings",
        "Cookie theft by denying cross-origin frames"
      ],
      "ans": 0
    },
    {
      "q": "What is a Distributed Denial of Service (DDoS) attack using a \"Botnet\"?",
      "opts": [
        "Overwhelming a target server with traffic coordinated across thousands of compromised Internet-connected devices",
        "Cracking database passwords using a cluster of GPU servers",
        "Sending deceptive phishing emails to company employees",
        "Intercepting cellular SMS authentication tokens"
      ],
      "ans": 0
    },
    {
      "q": "What is the role of a Security Information and Event Management (SIEM) platform (e.g. Splunk, Microsoft Sentinel)?",
      "opts": [
        "Aggregating, correlating, and analyzing log data across an enterprise in real time to detect security incidents",
        "Deploying firewalls automatically to cloud subnets",
        "Encrypting hard drive partitions on employee laptops",
        "Conducting automated black-box penetration testing"
      ],
      "ans": 0
    },
    {
      "q": "In Public Key Infrastructure (PKI), what is the function of a Certificate Authority (CA)?",
      "opts": [
        "A trusted third-party entity that issues and digitally signs certificates verifying the identity of public key owners",
        "An agency that manages global DNS domain name assignments",
        "A hardware device that encrypts network traffic at the router level",
        "A server that stores encrypted user passwords"
      ],
      "ans": 0
    },
    {
      "q": "What is Ransomware?",
      "opts": [
        "Malware that encrypts victim files and demands payment in cryptocurrency in exchange for decryption keys",
        "Spyware that logs keystrokes to steal bank account credentials",
        "A virus that deletes operating system system32 files",
        "Adware that displays unwanted popup advertisements"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between Black-Box and White-Box Penetration Testing?",
      "opts": [
        "Black-Box simulates an external attacker with zero prior knowledge; White-Box provides full internal architecture and source code access",
        "Black-Box is illegal; White-Box is legal",
        "Black-Box is for cloud; White-Box is for hardware",
        "Black-Box tests firewalls; White-Box tests web applications"
      ],
      "ans": 0
    },
    {
      "q": "What is Privilege Escalation in cyber attacks?",
      "opts": [
        "Exploiting a bug, design flaw, or configuration error to gain higher access permissions than originally intended (e.g. root/admin)",
        "Increasing network bandwidth to execute DDoS attacks faster",
        "Cracking password hashes using rainbow tables",
        "Bypassing web application firewalls with encoded characters"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of HSTS (HTTP Strict Transport Security)?",
      "opts": [
        "Forces browsers to communicate with the domain exclusively over HTTPS, protecting against SSL-stripping attacks",
        "Enforces multi-factor authentication on every HTTP login",
        "Limits HTTP request rates to prevent brute force attacks",
        "Restricts HTTP access to approved IP whitelist ranges"
      ],
      "ans": 0
    },
    {
      "q": "In Wi-Fi security, what vulnerability in WPA2 allows attackers within radio range to intercept and decrypt Wi-Fi traffic?",
      "opts": [
        "KRACK (Key Reinstallation Attack)",
        "Heartbleed",
        "Shellshock",
        "EternalBlue"
      ],
      "ans": 0
    },
    {
      "q": "What does the \"Defense in Depth\" security strategy entail?",
      "opts": [
        "Deploying multiple layered security controls throughout an IT system rather than relying on a single defensive barrier",
        "Protecting the physical datacenter with biometric locks and armed guards only",
        "Encrypting data only when at rest on persistent disks",
        "Relying exclusively on a next-generation web application firewall"
      ],
      "ans": 0
    }
  ],
  "dsa": [
    {
      "q": "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?",
      "opts": [
        "O(n)",
        "O(log n)",
        "O(1)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "Which data structure operates strictly on a First-In-First-Out (FIFO) principle?",
      "opts": [
        "Queue",
        "Stack",
        "Binary Heap",
        "Priority Queue"
      ],
      "ans": 0
    },
    {
      "q": "What is the average time complexity of QuickSort on an array of n elements?",
      "opts": [
        "O(n log n)",
        "O(n^2)",
        "O(n)",
        "O(log n)"
      ],
      "ans": 0
    },
    {
      "q": "In a Hash Table, what technique resolves collisions by storing multiple entries in a linked list at the same bucket index?",
      "opts": [
        "Separate Chaining",
        "Linear Probing",
        "Quadratic Probing",
        "Double Hashing"
      ],
      "ans": 0
    },
    {
      "q": "Which algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edges?",
      "opts": [
        "Dijkstra's Algorithm",
        "Kruskal's Algorithm",
        "Prim's Algorithm",
        "Floyd-Warshall Algorithm"
      ],
      "ans": 0
    },
    {
      "q": "What data structure is typically used to implement Breadth-First Search (BFS) on a graph?",
      "opts": [
        "Queue",
        "Stack",
        "Min Heap",
        "Binary Search Tree"
      ],
      "ans": 0
    },
    {
      "q": "What is the minimum number of queues needed to implement a Stack efficiently?",
      "opts": [
        "2",
        "1",
        "3",
        "4"
      ],
      "ans": 0
    },
    {
      "q": "Which sorting algorithm is guaranteed to be stable and have an O(n log n) worst-case time complexity?",
      "opts": [
        "MergeSort",
        "QuickSort",
        "HeapSort",
        "Selection Sort"
      ],
      "ans": 0
    },
    {
      "q": "What is the height of a balanced Binary Tree having n nodes?",
      "opts": [
        "O(log n)",
        "O(n)",
        "O(n^2)",
        "O(1)"
      ],
      "ans": 0
    },
    {
      "q": "Which data structure is best suited for checking whether parentheses in a mathematical expression are balanced?",
      "opts": [
        "Stack",
        "Queue",
        "Array",
        "Linked List"
      ],
      "ans": 0
    },
    {
      "q": "What is the time complexity of inserting a node at the head of a Singly Linked List if the head pointer is known?",
      "opts": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary characteristic of an AVL Tree?",
      "opts": [
        "The heights of the two child subtrees of any node differ by at most one",
        "All leaves are at the exact same depth",
        "Nodes can have up to three children",
        "Elements are stored in descending order only"
      ],
      "ans": 0
    },
    {
      "q": "Which algorithmic paradigm does the '0/1 Knapsack Problem' typically utilize for an optimal polynomial-time solution?",
      "opts": [
        "Dynamic Programming",
        "Greedy Approach",
        "Divide and Conquer",
        "Backtracking only"
      ],
      "ans": 0
    },
    {
      "q": "What is the space complexity of an in-place HeapSort algorithm?",
      "opts": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "In a Red-Black tree, what color must the root node always be?",
      "opts": [
        "Black",
        "Red",
        "Yellow",
        "Blue"
      ],
      "ans": 0
    },
    {
      "q": "Which algorithm finds the Minimum Spanning Tree (MST) by sorting all graph edges in ascending order of their weights?",
      "opts": [
        "Kruskal's Algorithm",
        "Prim's Algorithm",
        "Bellman-Ford Algorithm",
        "Dijkstra's Algorithm"
      ],
      "ans": 0
    },
    {
      "q": "What is the time complexity of accessing an element in an array by its index?",
      "opts": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "ans": 0
    },
    {
      "q": "Which graph traversal strategy uses a Stack (or recursion)?",
      "opts": [
        "Depth-First Search (DFS)",
        "Breadth-First Search (BFS)",
        "Topological Sort via Kahn's Algorithm",
        "Level-order traversal"
      ],
      "ans": 0
    },
    {
      "q": "In an optimal Huffman Coding tree, which characters receive the shortest binary codes?",
      "opts": [
        "Characters with the highest frequencies",
        "Characters with the lowest frequencies",
        "Vowels only",
        "Alphabetically first characters"
      ],
      "ans": 0
    },
    {
      "q": "What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or ArrayList)?",
      "opts": [
        "O(1)",
        "O(n)",
        "O(log n)",
        "O(n^2)"
      ],
      "ans": 0
    },
    {
      "q": "Which data structure is commonly used to implement LRU (Least Recently Used) Cache with O(1) get and put operations?",
      "opts": [
        "Hash Map + Doubly Linked List",
        "Binary Search Tree + Stack",
        "Array + Queue",
        "Single Linked List + Min Heap"
      ],
      "ans": 0
    },
    {
      "q": "What is the maximum number of children a node can have in a Binary Tree?",
      "opts": [
        "2",
        "3",
        "1",
        "Unlimited"
      ],
      "ans": 0
    },
    {
      "q": "What does Kadane's Algorithm find in O(n) time?",
      "opts": [
        "Maximum Subarray Sum",
        "Longest Common Subsequence",
        "Shortest Cycle in a Graph",
        "Median of Two Sorted Arrays"
      ],
      "ans": 0
    },
    {
      "q": "Which data structure is optimal for finding the median of a continuously incoming stream of numbers?",
      "opts": [
        "Two Heaps (Max-Heap and Min-Heap)",
        "A sorted singly linked list",
        "A circular queue",
        "A stack"
      ],
      "ans": 0
    },
    {
      "q": "What is the worst-case time complexity of Bubble Sort?",
      "opts": [
        "O(n^2)",
        "O(n log n)",
        "O(n)",
        "O(log n)"
      ],
      "ans": 0
    },
    {
      "q": "What property must a Directed Graph satisfy to have a valid Topological Ordering?",
      "opts": [
        "It must be a Directed Acyclic Graph (DAG)",
        "It must be strongly connected",
        "It must have undirected cycles",
        "It must have equal in-degrees and out-degrees"
      ],
      "ans": 0
    },
    {
      "q": "In a Min-Heap, where is the smallest element always located?",
      "opts": [
        "At the root node",
        "At the leftmost leaf",
        "At the rightmost leaf",
        "At any internal node"
      ],
      "ans": 0
    },
    {
      "q": "What is the time complexity of searching in a balanced Trie for a word of length L?",
      "opts": [
        "O(L)",
        "O(n)",
        "O(n * L)",
        "O(log n)"
      ],
      "ans": 0
    },
    {
      "q": "Which of the following problems can be solved using the Disjoint Set Union (Union-Find) data structure?",
      "opts": [
        "Detecting cycles in an undirected graph",
        "Finding all-pairs shortest paths",
        "Evaluating postfix expressions",
        "Sorting an array in linear time"
      ],
      "ans": 0
    },
    {
      "q": "What is the number of edges in a tree with V vertices?",
      "opts": [
        "V - 1",
        "V",
        "V + 1",
        "2 * V"
      ],
      "ans": 0
    }
  ],
  "core-engineering": [
    {
      "q": "According to Newton's Second Law of Motion, what is the mathematical formula for force?",
      "opts": [
        "F = m * a",
        "F = m / a",
        "F = m * v^2",
        "F = 0.5 * m * v"
      ],
      "ans": 0
    },
    {
      "q": "What does Ohm's Law state for an ideal electrical resistor?",
      "opts": [
        "V = I * R",
        "V = I / R",
        "P = V * R",
        "I = V * R"
      ],
      "ans": 0
    },
    {
      "q": "Which thermodynamic cycle represents the ideal theoretical maximum efficiency for a heat engine operating between two temperatures?",
      "opts": [
        "Carnot Cycle",
        "Rankine Cycle",
        "Otto Cycle",
        "Diesel Cycle"
      ],
      "ans": 0
    },
    {
      "q": "In structural mechanics, what does the Hooke's Law state within the elastic limit?",
      "opts": [
        "Stress is directly proportional to Strain",
        "Strain is inversely proportional to Area",
        "Force equals Mass times Velocity",
        "Pressure is constant throughout the cross-section"
      ],
      "ans": 0
    },
    {
      "q": "Which semiconductor component conducts current primarily in only one direction?",
      "opts": [
        "Diode",
        "Capacitor",
        "Inductor",
        "Transformer"
      ],
      "ans": 0
    },
    {
      "q": "In fluid mechanics, what principle explains the lift generated by an aircraft wing due to fluid velocity and pressure differences?",
      "opts": [
        "Bernoulli's Principle",
        "Archimedes' Principle",
        "Pascal's Law",
        "Fourier's Law"
      ],
      "ans": 0
    },
    {
      "q": "What is the SI unit of electrical capacitance?",
      "opts": [
        "Farad",
        "Henry",
        "Tesla",
        "Weber"
      ],
      "ans": 0
    },
    {
      "q": "In civil engineering, what is the primary structural function of reinforced steel rebar inside concrete beams?",
      "opts": [
        "To resist tensile stresses while concrete resists compressive stresses",
        "To prevent concrete from absorbing water",
        "To decrease the overall density of the structure",
        "To conduct electrical ground currents"
      ],
      "ans": 0
    },
    {
      "q": "Which logic gate outputs HIGH (1) if and only if all of its inputs are HIGH (1)?",
      "opts": [
        "AND Gate",
        "OR Gate",
        "XOR Gate",
        "NOT Gate"
      ],
      "ans": 0
    },
    {
      "q": "What type of stress occurs when opposing forces act parallel to the cross-sectional plane of a material?",
      "opts": [
        "Shear Stress",
        "Tensile Stress",
        "Compressive Stress",
        "Bending Stress"
      ],
      "ans": 0
    },
    {
      "q": "What law states that the total current entering a circuit junction must equal the total current leaving that junction?",
      "opts": [
        "Kirchhoff's Current Law (KCL)",
        "Kirchhoff's Voltage Law (KVL)",
        "Ampere's Law",
        "Faraday's Law"
      ],
      "ans": 0
    },
    {
      "q": "In mechanical engineering, what is the ratio of pitch diameter to the number of teeth on a gear called?",
      "opts": [
        "Module",
        "Diametral Pitch",
        "Circular Pitch",
        "Addendum"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary function of a step-down electrical transformer?",
      "opts": [
        "Decreasing voltage while increasing current",
        "Increasing voltage while decreasing current",
        "Converting AC electricity to DC electricity",
        "Storing energy in an electrostatic field"
      ],
      "ans": 0
    },
    {
      "q": "Which property describes a material's ability to undergo significant permanent plastic deformation before fracture?",
      "opts": [
        "Ductility",
        "Brittleness",
        "Hardness",
        "Resilience"
      ],
      "ans": 0
    },
    {
      "q": "In electronics, what terminal of a Bipolar Junction Transistor (BJT) controls the flow of majority carriers?",
      "opts": [
        "Base",
        "Collector",
        "Emitter",
        "Gate"
      ],
      "ans": 0
    },
    {
      "q": "What type of foundation is most suitable when surface soils have low bearing capacity and structural loads must reach deep bedrock?",
      "opts": [
        "Pile Foundation",
        "Strip Footing",
        "Spread Footing",
        "Isolated Pad Footing"
      ],
      "ans": 0
    },
    {
      "q": "What does the First Law of Thermodynamics fundamentally express?",
      "opts": [
        "Conservation of Energy",
        "Increase of Entropy",
        "Absolute zero temperature limit",
        "Thermal equilibrium between bodies"
      ],
      "ans": 0
    },
    {
      "q": "Which instrument is used to measure electrical potential difference across two points without drawing substantial current?",
      "opts": [
        "Voltmeter",
        "Ammeter",
        "Ohmmeter",
        "Galvanometer"
      ],
      "ans": 0
    },
    {
      "q": "What is the relationship between torque (T), rotational speed (omega), and power (P) in mechanical drives?",
      "opts": [
        "P = T * omega",
        "P = T / omega",
        "P = T^2 * omega",
        "T = P * omega"
      ],
      "ans": 0
    },
    {
      "q": "In communications engineering, what modulation technique varies the frequency of a carrier wave in proportion to the message signal?",
      "opts": [
        "Frequency Modulation (FM)",
        "Amplitude Modulation (AM)",
        "Phase Modulation (PM)",
        "Pulse Code Modulation (PCM)"
      ],
      "ans": 0
    },
    {
      "q": "What is the point on a stress-strain curve beyond which deformation is irreversible and permanent?",
      "opts": [
        "Yield Point",
        "Proportional Limit",
        "Ultimate Tensile Strength",
        "Fracture Point"
      ],
      "ans": 0
    },
    {
      "q": "What is the standard frequency of AC mains power transmission in India?",
      "opts": [
        "50 Hz",
        "60 Hz",
        "100 Hz",
        "120 Hz"
      ],
      "ans": 0
    },
    {
      "q": "Which thermal transfer mechanism does not require any material medium to propagate heat?",
      "opts": [
        "Radiation",
        "Conduction",
        "Convection",
        "Advection"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary constituent of Portland cement responsible for early compressive strength development?",
      "opts": [
        "Tricalcium Silicate (C3S)",
        "Dicalcium Silicate (C2S)",
        "Tricalcium Aluminate (C3A)",
        "Gypsum"
      ],
      "ans": 0
    },
    {
      "q": "In an RLC circuit, what condition occurs when inductive reactance equals capacitive reactance (XL = XC)?",
      "opts": [
        "Resonance",
        "Antiresonance",
        "Short Circuit",
        "Open Circuit"
      ],
      "ans": 0
    },
    {
      "q": "Which machine element is used to support rotating shafts while minimizing rotational friction?",
      "opts": [
        "Bearing",
        "Coupling",
        "Keyway",
        "Flywheel"
      ],
      "ans": 0
    },
    {
      "q": "What type of survey instrument measures both horizontal and vertical angles as well as slope distances electronically?",
      "opts": [
        "Total Station",
        "Theodolite",
        "Dumpy Level",
        "Prismatic Compass"
      ],
      "ans": 0
    },
    {
      "q": "What is the operational purpose of an op-amp configured with negative feedback?",
      "opts": [
        "Stabilizing closed-loop gain and broadening bandwidth",
        "Maximizing open-loop saturation",
        "Generating high-frequency carrier oscillations",
        "Eliminating input impedance"
      ],
      "ans": 0
    },
    {
      "q": "In a 4-stroke internal combustion engine, during which stroke is mechanical work delivered to the crankshaft?",
      "opts": [
        "Power (Expansion) Stroke",
        "Compression Stroke",
        "Intake Stroke",
        "Exhaust Stroke"
      ],
      "ans": 0
    },
    {
      "q": "What does the Reynolds Number in fluid dynamics indicate?",
      "opts": [
        "Ratio of inertial forces to viscous forces",
        "Ratio of buoyant forces to drag forces",
        "Ratio of pressure forces to surface tension",
        "Velocity of sound in the medium"
      ],
      "ans": 0
    }
  ],
  "business-management": [
    {
      "q": "Which marketing framework encompasses Product, Price, Place, and Promotion?",
      "opts": [
        "The 4 Ps of Marketing Mix",
        "Porter's Five Forces",
        "SWOT Analysis",
        "BCG Matrix"
      ],
      "ans": 0
    },
    {
      "q": "In corporate finance, what does EBITDA stand for?",
      "opts": [
        "Earnings Before Interest, Taxes, Depreciation, and Amortization",
        "Equity Before Investment, Trading, Debt, and Assets",
        "Estimated Balance of International Trade, Debt, and Accounts",
        "Earnings Behind Insurance, Taxes, Dividends, and Assets"
      ],
      "ans": 0
    },
    {
      "q": "What financial statement provides a snapshot of a company's assets, liabilities, and shareholders' equity at a specific point in time?",
      "opts": [
        "Balance Sheet",
        "Income Statement",
        "Cash Flow Statement",
        "Statement of Retained Earnings"
      ],
      "ans": 0
    },
    {
      "q": "In strategic management, which tool analyzes internal Strengths and Weaknesses alongside external Opportunities and Threats?",
      "opts": [
        "SWOT Analysis",
        "PESTEL Analysis",
        "Ansoff Matrix",
        "Value Chain Analysis"
      ],
      "ans": 0
    },
    {
      "q": "What metric measures the total revenue a business can reasonably expect from a single customer account throughout their relationship?",
      "opts": [
        "Customer Lifetime Value (CLV / LTV)",
        "Customer Acquisition Cost (CAC)",
        "Net Promoter Score (NPS)",
        "Return on Equity (ROE)"
      ],
      "ans": 0
    },
    {
      "q": "Which inventory management strategy seeks to receive goods only as they are needed in the production process, minimizing holding costs?",
      "opts": [
        "Just-In-Time (JIT)",
        "Economic Order Quantity (EOQ)",
        "First-In-First-Out (FIFO)",
        "Safety Stock Buffer"
      ],
      "ans": 0
    },
    {
      "q": "In Agile project management, what is a fixed-duration iteration (usually 1–4 weeks) called where a team delivers completed work?",
      "opts": [
        "Sprint",
        "Kanban Queue",
        "Milestone",
        "Backlog Grooming"
      ],
      "ans": 0
    },
    {
      "q": "What metric measures the percentage of customers who stop using a company's product or service during a given timeframe?",
      "opts": [
        "Churn Rate",
        "Bounce Rate",
        "Conversion Rate",
        "Retention Index"
      ],
      "ans": 0
    },
    {
      "q": "In the BCG Growth-Share Matrix, what are high market share business units in a slow-growing mature industry termed?",
      "opts": [
        "Cash Cows",
        "Stars",
        "Question Marks",
        "Dogs"
      ],
      "ans": 0
    },
    {
      "q": "What accounting principle requires expenses to be recognized in the same period as the revenues they helped generate?",
      "opts": [
        "Matching Principle",
        "Conservatism Principle",
        "Cost Principle",
        "Materiality Principle"
      ],
      "ans": 0
    },
    {
      "q": "What does ROI stand for in performance evaluation?",
      "opts": [
        "Return on Investment",
        "Rate of Inflation",
        "Receipt of Income",
        "Reserve on Inventory"
      ],
      "ans": 0
    },
    {
      "q": "In digital marketing, what does CPC represent in pay-per-click advertising campaigns?",
      "opts": [
        "Cost Per Click",
        "Cost Per Customer",
        "Clicks Per Conversion",
        "Click Passing Channel"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary goal of Human Resource Management (HRM) during the onboarding phase?",
      "opts": [
        "Integrating new employees smoothly into company culture, tools, and job roles",
        "Conducting annual salary appraisals",
        "Managing legal termination procedures",
        "Auditing employee tax filings"
      ],
      "ans": 0
    },
    {
      "q": "Which financial ratio divides Current Assets by Current Liabilities to measure short-term liquidity?",
      "opts": [
        "Current Ratio",
        "Debt-to-Equity Ratio",
        "Quick Acid-Test Ratio",
        "Gross Profit Margin"
      ],
      "ans": 0
    },
    {
      "q": "What does SEO stand for in modern inbound growth marketing?",
      "opts": [
        "Search Engine Optimization",
        "Social Engagement Operations",
        "Sales Enterprise Outreach",
        "Structured Email Overview"
      ],
      "ans": 0
    },
    {
      "q": "Which competitive strategy identifies a firm aiming to become the lowest-cost producer in its industry?",
      "opts": [
        "Cost Leadership Strategy",
        "Differentiation Strategy",
        "Focus Strategy",
        "Diversification Strategy"
      ],
      "ans": 0
    },
    {
      "q": "What type of B2B sales model involves selling software hosted on cloud servers and accessed via recurring subscriptions?",
      "opts": [
        "Software as a Service (SaaS)",
        "On-Premise Licensing",
        "Perpetual Commercial Distribution",
        "Open Source Hardware"
      ],
      "ans": 0
    },
    {
      "q": "In operations research, what is the path through a project network with zero slack time that determines total project duration?",
      "opts": [
        "Critical Path",
        "Fast-Track Path",
        "Slack Route",
        "Buffer Chain"
      ],
      "ans": 0
    },
    {
      "q": "What KPI measures customer loyalty by asking how likely they are to recommend a company to a friend or colleague?",
      "opts": [
        "Net Promoter Score (NPS)",
        "Customer Satisfaction Score (CSAT)",
        "Customer Effort Score (CES)",
        "System Usability Scale (SUS)"
      ],
      "ans": 0
    },
    {
      "q": "What is the point in volume sales where total revenue equals total fixed and variable costs?",
      "opts": [
        "Break-even Point",
        "Operating Margin Point",
        "Contribution Plateau",
        "Profit Maximization Point"
      ],
      "ans": 0
    },
    {
      "q": "What is the formula for Gross Profit?",
      "opts": [
        "Revenue - Cost of Goods Sold (COGS)",
        "Revenue - Operating Expenses",
        "Net Income - Taxes",
        "Operating Income + Dividends"
      ],
      "ans": 0
    },
    {
      "q": "In supply chain management, what phenomenon describes how small fluctuations in consumer demand amplify as they move up the supply chain?",
      "opts": [
        "Bullwhip Effect",
        "Hawthorne Effect",
        "Pareto Principle",
        "Halo Effect"
      ],
      "ans": 0
    },
    {
      "q": "Which leadership style empowers team members with high autonomy and minimal direct oversight?",
      "opts": [
        "Laissez-Faire Leadership",
        "Autocratic Leadership",
        "Bureaucratic Leadership",
        "Transactional Leadership"
      ],
      "ans": 0
    },
    {
      "q": "In financial markets, what does IPO stand for?",
      "opts": [
        "Initial Public Offering",
        "International Portfolio Order",
        "Internal Profit Organization",
        "Index Price Optimization"
      ],
      "ans": 0
    },
    {
      "q": "What does the 80/20 rule (Pareto Principle) assert in business productivity?",
      "opts": [
        "80% of outcomes result from 20% of causes or inputs",
        "80% of budget must be allocated to marketing",
        "20% of staff should manage 80% of projects",
        "Profits must grow by 20% over 80 business days"
      ],
      "ans": 0
    },
    {
      "q": "What term describes the strategic buying and selling of foreign currencies to facilitate international trade or profit from exchange rate shifts?",
      "opts": [
        "Foreign Exchange (Forex) Trading",
        "Securities Underwriting",
        "Venture Capital Financing",
        "Factoring Accounts"
      ],
      "ans": 0
    },
    {
      "q": "In performance management, what does the acronym SMART stand for when defining project objectives?",
      "opts": [
        "Specific, Measurable, Achievable, Relevant, Time-bound",
        "Strategic, Marketable, Authorized, Rapid, Targeted",
        "Systematic, Modular, Accountable, Robust, Tested",
        "Standardized, Monitored, Accurate, Reviewed, Tracked"
      ],
      "ans": 0
    },
    {
      "q": "What is working capital defined as?",
      "opts": [
        "Current Assets - Current Liabilities",
        "Total Assets - Total Debt",
        "Cash at Bank + Fixed Assets",
        "Net Profit - Depreciation"
      ],
      "ans": 0
    },
    {
      "q": "Which pricing strategy involves setting high initial prices when launching an innovative product and gradually lowering prices over time?",
      "opts": [
        "Price Skimming",
        "Penetration Pricing",
        "Cost-Plus Pricing",
        "Freemium Pricing"
      ],
      "ans": 0
    },
    {
      "q": "In organizational design, what does 'Span of Control' refer to?",
      "opts": [
        "The number of direct subordinates a manager supervises",
        "The geographical reach of sales branches",
        "The maximum budget allocated to an executive",
        "The duration of board member tenures"
      ],
      "ans": 0
    }
  ],
  "ui-ux-design": [
    {
      "q": "In digital product design, what does 'UI' stand for?",
      "opts": [
        "User Interface",
        "User Interaction",
        "Unified Integration",
        "Universal Identity"
      ],
      "ans": 0
    },
    {
      "q": "In User Experience (UX) methodology, what is a fictional representation of an ideal target customer based on research data called?",
      "opts": [
        "User Persona",
        "Wireframe",
        "Storyboard",
        "Customer Empathy Map"
      ],
      "ans": 0
    },
    {
      "q": "According to WCAG (Web Content Accessibility Guidelines), what is the minimum contrast ratio required for normal body text at AA level?",
      "opts": [
        "4.5:1",
        "3.0:1",
        "7.0:1",
        "2.0:1"
      ],
      "ans": 0
    },
    {
      "q": "In Figma, what feature dynamically resizes container frames and elements according to their content and layout rules?",
      "opts": [
        "Auto Layout",
        "Smart Animate",
        "Boolean Groups",
        "Interactive Overlays"
      ],
      "ans": 0
    },
    {
      "q": "What psychological law predicts that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target?",
      "opts": [
        "Fitts's Law",
        "Hick's Law",
        "Miller's Law",
        "Jakob's Law"
      ],
      "ans": 0
    },
    {
      "q": "What does Hick's Law state in interaction design?",
      "opts": [
        "The time it takes to make a decision increases with the number and complexity of choices",
        "Users spend most of their time on other sites",
        "Human working memory can hold only 7 plus-or-minus 2 items",
        "Objects near each other tend to be grouped together"
      ],
      "ans": 0
    },
    {
      "q": "In product discovery, what is a low-fidelity, basic structural outline of a screen layout called?",
      "opts": [
        "Wireframe",
        "High-fidelity Prototype",
        "Design System",
        "Pixel-perfect Mockup"
      ],
      "ans": 0
    },
    {
      "q": "Which Gestalt Principle explains why visual elements enclosed within a boundary or sharing a common background are perceived as a group?",
      "opts": [
        "Law of Common Region",
        "Law of Similarity",
        "Law of Closure",
        "Law of Continuity"
      ],
      "ans": 0
    },
    {
      "q": "What is an A/B Test in product optimization?",
      "opts": [
        "Comparing two versions of a webpage or feature against each other to determine which performs better with real users",
        "Testing software on Apple vs Android devices",
        "Evaluating backend load vs database queries",
        "Auditing source code for security vulnerabilities"
      ],
      "ans": 0
    },
    {
      "q": "What does 'Information Architecture' (IA) primarily focus on?",
      "opts": [
        "Organizing, structuring, and labeling content effectively so users can easily find information",
        "Writing automated frontend unit tests",
        "Selecting brand typography font pairings",
        "Configuring web hosting servers"
      ],
      "ans": 0
    },
    {
      "q": "In typographic hierarchy, what is the vertical space between lines of text termed?",
      "opts": [
        "Line Height (Leading)",
        "Kerning",
        "Tracking",
        "Baseline Offset"
      ],
      "ans": 0
    },
    {
      "q": "What is an affordance in design?",
      "opts": [
        "A property or clue in an object that indicates how it can be used or interacted with",
        "The financial cost of purchasing a software license",
        "The speed at which a CSS animation executes",
        "The resolution of a vector SVG file"
      ],
      "ans": 0
    },
    {
      "q": "Which UX research method involves asking participants to organize topic cards into categories that make logical sense to them?",
      "opts": [
        "Card Sorting",
        "Tree Testing",
        "Heuristic Evaluation",
        "Eye Tracking"
      ],
      "ans": 0
    },
    {
      "q": "What design tool feature allows reusable master UI components that propagate changes across an entire design system?",
      "opts": [
        "Components / Master Instances",
        "Layer Clipping Masks",
        "Vector Paths",
        "Bitmap Export"
      ],
      "ans": 0
    },
    {
      "q": "According to Jakob's Law of Internet User Experience, where do users spend most of their time?",
      "opts": [
        "On other websites, meaning they prefer your site to work like all the other sites they already know",
        "On social media platforms exclusively",
        "On search engine result pages only",
        "Navigating hamburger drawer menus"
      ],
      "ans": 0
    },
    {
      "q": "What usability evaluation method has expert evaluators inspect a product interface against recognized usability principles?",
      "opts": [
        "Heuristic Evaluation (Nielsen's Heuristics)",
        "Guerilla Intercept Testing",
        "Cognitive Walkthrough with raw telemetry",
        "Synthetic Eye-Tracking heatmap"
      ],
      "ans": 0
    },
    {
      "q": "What is a 'Breadcrumb' navigation element in website UX?",
      "opts": [
        "A secondary navigation trail showing the user's location within the site hierarchy",
        "A cookie stored in the user's browser",
        "A temporary notification toast banner",
        "A floating action button in mobile layouts"
      ],
      "ans": 0
    },
    {
      "q": "In responsive web design, what are the viewport width thresholds called where the layout rearranges for different screen sizes?",
      "opts": [
        "Breakpoints",
        "Aspect Ratios",
        "Safe Areas",
        "Grid Margins"
      ],
      "ans": 0
    },
    {
      "q": "What is 'White Space' (Negative Space) in visual design?",
      "opts": [
        "The unmarked space between design elements, typography, and margins that gives content breathing room",
        "Areas colored strictly with hex code #FFFFFF",
        "Unused dead zones that must be filled with advertisements",
        "The canvas border outside an artboard"
      ],
      "ans": 0
    },
    {
      "q": "What is a Design System primarily composed of?",
      "opts": [
        "Reusable UI components, design tokens, style guidelines, and code documentation",
        "A collection of stock photography only",
        "A Photoshop layer archive",
        "A repository of frontend test scripts"
      ],
      "ans": 0
    },
    {
      "q": "Which color model is universally used for digital screen display interfaces?",
      "opts": [
        "RGB (Red, Green, Blue)",
        "CMYK (Cyan, Magenta, Yellow, Key Black)",
        "Pantone PMS",
        "RAL Color Standard"
      ],
      "ans": 0
    },
    {
      "q": "What is a 'Call to Action' (CTA) button in digital interface design?",
      "opts": [
        "A prominent interactive element designed to prompt an immediate response from the user",
        "An audio trigger that rings customer support",
        "A disclaimer modal link for privacy terms",
        "A subtle back button in the top navigation"
      ],
      "ans": 0
    },
    {
      "q": "What does 'Skeuomorphism' describe in interface design history?",
      "opts": [
        "Designing digital UI elements to mimic real-world physical objects and realistic textures",
        "Using flat minimalist neon gradients",
        "Adopting brutalist raw monochrome layouts",
        "Using high-contrast dark mode palettes"
      ],
      "ans": 0
    },
    {
      "q": "What metric tracks the percentage of users who complete a desired goal (such as signing up or purchasing)?",
      "opts": [
        "Conversion Rate",
        "Click-Through Rate (CTR)",
        "Drop-off Ratio",
        "Task Completion Time"
      ],
      "ans": 0
    },
    {
      "q": "What research technique asks users to vocalize their thoughts, questions, and reactions out loud while completing a task?",
      "opts": [
        "Think-Aloud Protocol",
        "Silent Observation Method",
        "Closed Survey Polling",
        "Retrospective Post-Mortem"
      ],
      "ans": 0
    },
    {
      "q": "What does a 'User Journey Map' visualize?",
      "opts": [
        "The chronological sequence of steps, touchpoints, and emotions a user experiences while achieving a goal",
        "The geographic locations of website visitors on a map",
        "The database network topology between cloud regions",
        "The sprint velocity of engineering iterations"
      ],
      "ans": 0
    },
    {
      "q": "In mobile navigation, what is a modal interface element that slides up from the bottom of the screen called?",
      "opts": [
        "Bottom Sheet",
        "Floating Action Button",
        "Notification Badge",
        "Tooltip Popover"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Microcopy' in UX writing?",
      "opts": [
        "Small, targeted pieces of contextual text (like button labels, helper text, and error messages) that guide users",
        "Copyright legal terms in footer links",
        "Compressed minified JavaScript strings",
        "Font sizes smaller than 10 pixels"
      ],
      "ans": 0
    },
    {
      "q": "What is a 'Dark Pattern' in user interface design?",
      "opts": [
        "A deceptive user interface crafted to trick users into taking actions they might not otherwise choose",
        "A stylish high-contrast dark theme mode",
        "An interface with missing color contrast",
        "A wireframe drawn on a dark slate canvas"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary benefit of conducting Moderated Usability Testing?",
      "opts": [
        "The facilitator can probe deeper, ask follow-up questions, and understand the user's reasoning in real-time",
        "It requires zero human intervention or analysis",
        "It can test millions of users simultaneously in seconds",
        "It completely replaces quantitative analytical dashboards"
      ],
      "ans": 0
    }
  ],
  "cpp": [
    {
      "q": "Which operator is used in C++ to dynamically allocate memory on the heap?",
      "opts": [
        "new",
        "malloc",
        "alloc",
        "create"
      ],
      "ans": 0
    },
    {
      "q": "What is the size of a standard char in C / C++?",
      "opts": [
        "1 byte",
        "2 bytes",
        "4 bytes",
        "8 bytes"
      ],
      "ans": 0
    },
    {
      "q": "What feature allows C++ functions or classes to work with generic data types without rewriting code for each type?",
      "opts": [
        "Templates",
        "Macros",
        "Inheritance",
        "Pointers"
      ],
      "ans": 0
    },
    {
      "q": "What principle in C++ ensures resource deallocation occurs automatically during stack unwinding via object destructors?",
      "opts": [
        "RAII (Resource Acquisition Is Initialization)",
        "DRY (Don't Repeat Yourself)",
        "KISS Principle",
        "Polymorphic Binding"
      ],
      "ans": 0
    },
    {
      "q": "What is a pointer that holds the memory address of an object that has already been deallocated called?",
      "opts": [
        "Dangling Pointer",
        "Null Pointer",
        "Void Pointer",
        "Wild Pointer"
      ],
      "ans": 0
    },
    {
      "q": "Which keyword in C++ makes a member function eligible for dynamic polymorphism and runtime method overriding?",
      "opts": [
        "virtual",
        "override",
        "dynamic",
        "polymorphic"
      ],
      "ans": 0
    },
    {
      "q": "In C++, which smart pointer allows shared ownership of a heap resource through reference counting?",
      "opts": [
        "std::shared_ptr",
        "std::unique_ptr",
        "std::weak_ptr",
        "std::auto_ptr"
      ],
      "ans": 0
    },
    {
      "q": "What is the standard stream used for standard output in C++?",
      "opts": [
        "std::cout",
        "std::cin",
        "std::cerr",
        "printf()"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'const' keyword applied to a C++ member function indicate (e.g. int getVal() const)?",
      "opts": [
        "The function promises not to modify any member variables of the calling object",
        "The function cannot return a constant value",
        "The function can only be called once",
        "The function cannot accept input parameters"
      ],
      "ans": 0
    },
    {
      "q": "What is the result of sizeof(int*) on a standard 64-bit operating system?",
      "opts": [
        "8 bytes",
        "4 bytes",
        "16 bytes",
        "2 bytes"
      ],
      "ans": 0
    },
    {
      "q": "What header file must be included in C++ to use dynamic resizable vectors?",
      "opts": [
        "<vector>",
        "<array>",
        "<list>",
        "<algorithm>"
      ],
      "ans": 0
    },
    {
      "q": "Which access specifier in C++ makes class members accessible only within the class itself and by derived classes?",
      "opts": [
        "protected",
        "private",
        "public",
        "internal"
      ],
      "ans": 0
    },
    {
      "q": "In C++, what is a class called that has at least one pure virtual function (e.g. virtual void fn() = 0;)?",
      "opts": [
        "Abstract Class",
        "Interface Singleton",
        "Concrete Class",
        "Static Class"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'friend' keyword in C++ grant to an external function or class?",
      "opts": [
        "Access to private and protected members of the class declaring the friendship",
        "Inheritance of all public methods",
        "Ability to override const qualifiers",
        "Automatic dynamic memory cleanup"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between a pointer and a reference in C++?",
      "opts": [
        "A reference cannot be null and cannot be reseated to refer to another object after initialization",
        "A pointer cannot be re-assigned once initialized",
        "A reference can hold a null address",
        "Pointers do not occupy any memory addresses"
      ],
      "ans": 0
    },
    {
      "q": "Which STL container in C++ is implemented as a doubly linked list?",
      "opts": [
        "std::list",
        "std::vector",
        "std::deque",
        "std::forward_list"
      ],
      "ans": 0
    },
    {
      "q": "In C++, what operator is overloaded to enable stream output with std::cout << obj?",
      "opts": [
        "<< (Insertion Operator)",
        ">> (Extraction Operator)",
        "+ (Addition Operator)",
        "-> (Member Access Operator)"
      ],
      "ans": 0
    },
    {
      "q": "What is undefined behavior in C / C++?",
      "opts": [
        "Execution behavior for which the language standard imposes no requirements, leading to unpredictable crashes or bugs",
        "A compiler error that prevents binary generation",
        "A syntax error detected by static linters",
        "A standard floating point exception"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'inline' keyword suggest to the C++ compiler?",
      "opts": [
        "Substitute the function code directly at the call site to eliminate function call overhead",
        "Execute the function in a dedicated thread",
        "Store the function in CPU registers only",
        "Prevent the function from being optimized"
      ],
      "ans": 0
    },
    {
      "q": "Which header file provides standard algorithms like std::sort, std::find, and std::binary_search in C++?",
      "opts": [
        "<algorithm>",
        "<numeric>",
        "<functional>",
        "<utility>"
      ],
      "ans": 0
    },
    {
      "q": "What is the time complexity of searching for an element in an std::map (implemented as a Red-Black Tree)?",
      "opts": [
        "O(log n)",
        "O(1)",
        "O(n)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "What is the average time complexity of finding an element in an std::unordered_map (implemented as a Hash Table)?",
      "opts": [
        "O(1)",
        "O(log n)",
        "O(n)",
        "O(n log n)"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'static' keyword on a class member variable in C++ mean?",
      "opts": [
        "A single copy of the variable is shared among all instances of the class",
        "The variable cannot be read or written to",
        "The variable is destroyed when the constructor exits",
        "The variable can only be accessed via pointers"
      ],
      "ans": 0
    },
    {
      "q": "Which keyword in modern C++ (C++11+) queries the type of an expression at compile time without evaluating it?",
      "opts": [
        "decltype",
        "typeof",
        "typeid",
        "auto"
      ],
      "ans": 0
    },
    {
      "q": "What is a lambda expression in C++?",
      "opts": [
        "An anonymous, inline function object that can capture variables from its surrounding scope",
        "A recursive macro definition in preprocessor",
        "A hardware pointer to an interrupt handler",
        "A template class specialization"
      ],
      "ans": 0
    },
    {
      "q": "What is the Diamond Problem in C++ object-oriented programming?",
      "opts": [
        "Ambiguity arising when a class inherits from two classes that both inherit from the same common base class",
        "Memory leaks in circular shared_ptr references",
        "Stack overflow in deeply nested templates",
        "Buffer overflow when writing past array bounds"
      ],
      "ans": 0
    },
    {
      "q": "How is the Diamond Problem resolved in C++ inheritance hierarchies?",
      "opts": [
        "Virtual Inheritance (e.g. virtual public Base)",
        "Static Casts",
        "Declaring all members protected",
        "Multiple destructors"
      ],
      "ans": 0
    },
    {
      "q": "What is the correct way to deallocate an array allocated with new int[50] in C++?",
      "opts": [
        "delete[] ptr;",
        "delete ptr;",
        "free(ptr);",
        "dispose(ptr);"
      ],
      "ans": 0
    },
    {
      "q": "What is the 'Rule of Five' in modern C++ (C++11)?",
      "opts": [
        "If you define destructor, copy constructor, or copy assignment, you should also define move constructor and move assignment operator",
        "A class cannot have more than 5 private member variables",
        "Every function must have fewer than 5 arguments",
        "A namespace can contain at most 5 nested sub-namespaces"
      ],
      "ans": 0
    },
    {
      "q": "What does std::move do in C++?",
      "opts": [
        "It casts an lvalue to an rvalue reference, enabling resource transfer without deep copying",
        "It moves an object to a new CPU register",
        "It copies bytes directly from disk to RAM",
        "It forces thread context switching"
      ],
      "ans": 0
    }
  ],
  "prompt-engineering": [
    {
      "q": "Which prompting technique provides demonstration examples with desired input-output pairs inside the prompt before the target query?",
      "opts": [
        "Few-Shot Prompting",
        "Zero-Shot Prompting",
        "Zero-Shot CoT",
        "Recursive Self-Refinement"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'Temperature' hyperparameter in Large Language Models (LLMs) primarily control?",
      "opts": [
        "The randomness and creativity of next-token probability distribution",
        "The maximum number of tokens in the context window",
        "The physical operating temperature of GPU clusters",
        "The learning rate during model pre-training"
      ],
      "ans": 0
    },
    {
      "q": "What prompting strategy encourages an LLM to break complex multi-step reasoning down by adding 'Let's think step by step'?",
      "opts": [
        "Chain-of-Thought (CoT) Prompting",
        "Directional Stimulus Prompting",
        "Generated Knowledge Prompting",
        "ReAct Prompting"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary objective of Retrieval-Augmented Generation (RAG) in LLM applications?",
      "opts": [
        "Grounding the LLM generation with external dynamic or proprietary knowledge to reduce hallucinations",
        "Compressing the neural weights of the transformer architecture",
        "Fine-tuning base model weights using supervised datasets",
        "Increasing the context window beyond physical GPU memory"
      ],
      "ans": 0
    },
    {
      "q": "What vulnerability describes an attacker crafting malicious input to override developer instructions in the system prompt?",
      "opts": [
        "Prompt Injection",
        "Cross-Site Scripting (XSS)",
        "Buffer Overflow",
        "SQL Injection"
      ],
      "ans": 0
    },
    {
      "q": "In the ReAct prompting framework, what two iterative processes does the model alternate between?",
      "opts": [
        "Reasoning traces and task-specific Actions",
        "Recursive compiling and Activation pruning",
        "Reinforcement learning and Auto-regressive decoding",
        "Rule extraction and Attention mask tuning"
      ],
      "ans": 0
    },
    {
      "q": "What is the 'System Prompt' in chat completion API architectures (like OpenAI or Anthropic)?",
      "opts": [
        "High-priority instructions defining the model's persona, boundaries, and formatting rules",
        "The operating system command line arguments",
        "The token budget allocated per user subscription tier",
        "A hardware initialization string sent to the GPU"
      ],
      "ans": 0
    },
    {
      "q": "Which parameter restricts token sampling to the smallest set of tokens whose cumulative probability exceeds a threshold p?",
      "opts": [
        "Top-p (Nucleus Sampling)",
        "Top-k Sampling",
        "Frequency Penalty",
        "Presence Penalty"
      ],
      "ans": 0
    },
    {
      "q": "What is an LLM 'hallucination'?",
      "opts": [
        "When a model generates factually incorrect, ungrounded, or nonsensical output with high confidence",
        "When a GPU overheats and drops tensor calculations",
        "When prompt tokens exceed context window limits",
        "When an embedding vector produces negative cosine similarity"
      ],
      "ans": 0
    },
    {
      "q": "Which prompting technique explores multiple reasoning paths in parallel and evaluates choices using search algorithms like BFS or DFS?",
      "opts": [
        "Tree of Thoughts (ToT)",
        "Chain-of-Thought (CoT)",
        "Zero-Shot Prompting",
        "Least-to-Most Prompting"
      ],
      "ans": 0
    },
    {
      "q": "What technique involves sampling multiple different reasoning paths from an LLM and selecting the most consistent final answer?",
      "opts": [
        "Self-Consistency Prompting",
        "Greedy Decoding",
        "One-Shot Prompting",
        "Speculative Decoding"
      ],
      "ans": 0
    },
    {
      "q": "What is 'In-Context Learning' in modern Large Language Models?",
      "opts": [
        "The model's ability to learn tasks and follow patterns from examples in the prompt without updating weights",
        "Updating transformer backpropagation weights at inference time",
        "Storing conversations in persistent SQL databases",
        "Caching past key-value attention matrices on SSDs"
      ],
      "ans": 0
    },
    {
      "q": "What does the 'Presence Penalty' parameter discourage in LLM generation?",
      "opts": [
        "Repeating topics or words that have already appeared in the generated text",
        "Generating responses in languages other than English",
        "Using punctuation and special characters",
        "Exceeding prompt length limits"
      ],
      "ans": 0
    },
    {
      "q": "What is the 'Lost in the Middle' phenomenon observed in long-context Large Language Models?",
      "opts": [
        "Models tend to recall information at the beginning and end of long prompts better than information in the middle",
        "Middle layers of transformer neural networks lose precision during quantization",
        "Conversations lose state after exactly 10 prompt turns",
        "Vector databases drop middle chunks during similarity search"
      ],
      "ans": 0
    },
    {
      "q": "Which vector similarity metric is most commonly used to measure relevance between prompt embeddings and document chunks in RAG?",
      "opts": [
        "Cosine Similarity",
        "Manhattan Distance",
        "Hamming Distance",
        "Jaccard Index"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Jailbreaking' in the context of AI safety and prompt engineering?",
      "opts": [
        "Bypassing safety guardrails and policy filters to force the model to generate prohibited or harmful content",
        "Rooting the server running the LLM container",
        "Exporting closed-source model weights to open source formats",
        "Fine-tuning an LLM on pirated textbooks"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary role of an 'Evaluation Framework' like Ragas or TruLens in LLM applications?",
      "opts": [
        "Measuring retrieval precision, faithfulness, and answer relevance quantitatively",
        "Benchmarking GPU FLOPS and memory bandwidth",
        "Transcribing human audio prompts to text",
        "Generating vector embeddings for unstructured files"
      ],
      "ans": 0
    },
    {
      "q": "In 'Least-to-Most Prompting', how does the prompt guide the language model?",
      "opts": [
        "By decomposing a complex problem into sub-problems and solving them sequentially, using answers from earlier steps",
        "By restricting output to fewer than 10 words",
        "By feeding tokens in reverse chronological order",
        "By using lowest temperature first and increasing it gradually"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Chunking' in the context of Retrieval-Augmented Generation (RAG)?",
      "opts": [
        "Splitting large documents into smaller, semantically coherent passages before generating embeddings",
        "Compressing model weights using 4-bit quantization",
        "Grouping multiple API requests to save network overhead",
        "Removing punctuation from the input prompt"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Negative Prompting' commonly used for in generative image and text models?",
      "opts": [
        "Specifying what the model should explicitly avoid or exclude from the generated output",
        "Subtracting embedding vectors to invert model weights",
        "Testing the model with insulting user prompts",
        "Generating sarcastic and pessimistic responses"
      ],
      "ans": 0
    },
    {
      "q": "Which technique guides an LLM to strictly output valid structured JSON matching a predefined schema?",
      "opts": [
        "Constrained Decoding / JSON Schema Enforcement",
        "Unsupervised Fine-Tuning",
        "LoRA Adapter training",
        "Greedy token sampling"
      ],
      "ans": 0
    },
    {
      "q": "What is a 'Hallucination Guardrail'?",
      "opts": [
        "A verification layer that cross-checks LLM responses against retrieved evidence before returning them to users",
        "A physical cooling system for AI inference servers",
        "A hardware firewall blocking inbound port 80 traffic",
        "A rate limiter capping API requests per minute"
      ],
      "ans": 0
    },
    {
      "q": "In Prompt Engineering, what is 'Role Prompting' (e.g., 'Act as a Senior Cloud Architect')?",
      "opts": [
        "Instructing the model to adopt a specific identity, tone, expertise level, and perspective",
        "Assigning IAM roles to API service accounts",
        "Switching between human and synthetic user accounts",
        "Defining user permissions in a database"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Directional Stimulus Prompting'?",
      "opts": [
        "Providing an additional small hint or keywords in the prompt to guide the LLM toward a desired specific response",
        "Sending prompts via high-speed directional Wi-Fi antennas",
        "Aligning LLMs with human preferences via RLHF",
        "Forcing the model to process tokens from right to left"
      ],
      "ans": 0
    },
    {
      "q": "What is the difference between Pre-training, Fine-tuning, and Prompt Engineering?",
      "opts": [
        "Pre-training learns from raw internet data, Fine-tuning adjusts weights for a task, Prompt Engineering guides without weight updates",
        "Prompt Engineering modifies weights, Fine-tuning does not",
        "Pre-training is done locally on user devices; Prompt Engineering requires a supercomputer",
        "There is no difference; all three mean the same thing"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Context Window' in a Large Language Model?",
      "opts": [
        "The maximum number of tokens (prompt + completion) the model can process simultaneously in a single request",
        "The browser window where the chat interface is rendered",
        "The duration of time an API key remains active",
        "The cache memory allocated per thread on the CPU"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Indirect Prompt Injection'?",
      "opts": [
        "When malicious prompt instructions are hidden inside third-party untrusted data (like a webpage or email) read by the LLM",
        "When a user asks another human to prompt the model for them",
        "When a database query fails due to syntax errors",
        "When an LLM calls another LLM recursively"
      ],
      "ans": 0
    },
    {
      "q": "Which component converts human text into numerical tokens for LLM transformer processing?",
      "opts": [
        "Tokenizer (e.g. Byte-Pair Encoding)",
        "Vector Database",
        "Softmax Layer",
        "GPU Tensor Core"
      ],
      "ans": 0
    },
    {
      "q": "In prompt optimization, what does 'Few-Shot with CoT' combine?",
      "opts": [
        "Exemplar demonstrations showing both the input, step-by-step reasoning, and the final answer",
        "Zero prompts with high temperature",
        "Reinforcement learning with negative weights",
        "Random token sampling without examples"
      ],
      "ans": 0
    },
    {
      "q": "What is 'Self-Refinement' (or Reflexion) in autonomous LLM agent prompting?",
      "opts": [
        "Having the LLM critique and iteratively improve its own previous output before providing the final answer",
        "Compacting the model's neural network weights into a smaller model",
        "Resetting the chat memory after each message",
        "Translating the prompt into machine language"
      ],
      "ans": 0
    }
  ],
  "mechanical-engineering": [
    {
      "q": "According to Newton's Second Law of Motion, what is the mathematical formula for force?",
      "opts": [
        "F = m * a",
        "F = m / a",
        "F = m * v^2",
        "F = 0.5 * m * v"
      ],
      "ans": 0
    },
    {
      "q": "What does Ohm's Law state for an ideal electrical resistor?",
      "opts": [
        "V = I * R",
        "V = I / R",
        "P = V * R",
        "I = V * R"
      ],
      "ans": 0
    },
    {
      "q": "Which thermodynamic cycle represents the ideal theoretical maximum efficiency for a heat engine operating between two temperatures?",
      "opts": [
        "Carnot Cycle",
        "Rankine Cycle",
        "Otto Cycle",
        "Diesel Cycle"
      ],
      "ans": 0
    },
    {
      "q": "In structural mechanics, what does the Hooke's Law state within the elastic limit?",
      "opts": [
        "Stress is directly proportional to Strain",
        "Strain is inversely proportional to Area",
        "Force equals Mass times Velocity",
        "Pressure is constant throughout the cross-section"
      ],
      "ans": 0
    },
    {
      "q": "Which semiconductor component conducts current primarily in only one direction?",
      "opts": [
        "Diode",
        "Capacitor",
        "Inductor",
        "Transformer"
      ],
      "ans": 0
    },
    {
      "q": "In fluid mechanics, what principle explains the lift generated by an aircraft wing due to fluid velocity and pressure differences?",
      "opts": [
        "Bernoulli's Principle",
        "Archimedes' Principle",
        "Pascal's Law",
        "Fourier's Law"
      ],
      "ans": 0
    },
    {
      "q": "What is the SI unit of electrical capacitance?",
      "opts": [
        "Farad",
        "Henry",
        "Tesla",
        "Weber"
      ],
      "ans": 0
    },
    {
      "q": "In civil engineering, what is the primary structural function of reinforced steel rebar inside concrete beams?",
      "opts": [
        "To resist tensile stresses while concrete resists compressive stresses",
        "To prevent concrete from absorbing water",
        "To decrease the overall density of the structure",
        "To conduct electrical ground currents"
      ],
      "ans": 0
    },
    {
      "q": "Which logic gate outputs HIGH (1) if and only if all of its inputs are HIGH (1)?",
      "opts": [
        "AND Gate",
        "OR Gate",
        "XOR Gate",
        "NOT Gate"
      ],
      "ans": 0
    },
    {
      "q": "What type of stress occurs when opposing forces act parallel to the cross-sectional plane of a material?",
      "opts": [
        "Shear Stress",
        "Tensile Stress",
        "Compressive Stress",
        "Bending Stress"
      ],
      "ans": 0
    },
    {
      "q": "What law states that the total current entering a circuit junction must equal the total current leaving that junction?",
      "opts": [
        "Kirchhoff's Current Law (KCL)",
        "Kirchhoff's Voltage Law (KVL)",
        "Ampere's Law",
        "Faraday's Law"
      ],
      "ans": 0
    },
    {
      "q": "In mechanical engineering, what is the ratio of pitch diameter to the number of teeth on a gear called?",
      "opts": [
        "Module",
        "Diametral Pitch",
        "Circular Pitch",
        "Addendum"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary function of a step-down electrical transformer?",
      "opts": [
        "Decreasing voltage while increasing current",
        "Increasing voltage while decreasing current",
        "Converting AC electricity to DC electricity",
        "Storing energy in an electrostatic field"
      ],
      "ans": 0
    },
    {
      "q": "Which property describes a material's ability to undergo significant permanent plastic deformation before fracture?",
      "opts": [
        "Ductility",
        "Brittleness",
        "Hardness",
        "Resilience"
      ],
      "ans": 0
    },
    {
      "q": "In electronics, what terminal of a Bipolar Junction Transistor (BJT) controls the flow of majority carriers?",
      "opts": [
        "Base",
        "Collector",
        "Emitter",
        "Gate"
      ],
      "ans": 0
    },
    {
      "q": "What type of foundation is most suitable when surface soils have low bearing capacity and structural loads must reach deep bedrock?",
      "opts": [
        "Pile Foundation",
        "Strip Footing",
        "Spread Footing",
        "Isolated Pad Footing"
      ],
      "ans": 0
    },
    {
      "q": "What does the First Law of Thermodynamics fundamentally express?",
      "opts": [
        "Conservation of Energy",
        "Increase of Entropy",
        "Absolute zero temperature limit",
        "Thermal equilibrium between bodies"
      ],
      "ans": 0
    },
    {
      "q": "Which instrument is used to measure electrical potential difference across two points without drawing substantial current?",
      "opts": [
        "Voltmeter",
        "Ammeter",
        "Ohmmeter",
        "Galvanometer"
      ],
      "ans": 0
    },
    {
      "q": "What is the relationship between torque (T), rotational speed (omega), and power (P) in mechanical drives?",
      "opts": [
        "P = T * omega",
        "P = T / omega",
        "P = T^2 * omega",
        "T = P * omega"
      ],
      "ans": 0
    },
    {
      "q": "In communications engineering, what modulation technique varies the frequency of a carrier wave in proportion to the message signal?",
      "opts": [
        "Frequency Modulation (FM)",
        "Amplitude Modulation (AM)",
        "Phase Modulation (PM)",
        "Pulse Code Modulation (PCM)"
      ],
      "ans": 0
    },
    {
      "q": "What is the point on a stress-strain curve beyond which deformation is irreversible and permanent?",
      "opts": [
        "Yield Point",
        "Proportional Limit",
        "Ultimate Tensile Strength",
        "Fracture Point"
      ],
      "ans": 0
    },
    {
      "q": "What is the standard frequency of AC mains power transmission in India?",
      "opts": [
        "50 Hz",
        "60 Hz",
        "100 Hz",
        "120 Hz"
      ],
      "ans": 0
    },
    {
      "q": "Which thermal transfer mechanism does not require any material medium to propagate heat?",
      "opts": [
        "Radiation",
        "Conduction",
        "Convection",
        "Advection"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary constituent of Portland cement responsible for early compressive strength development?",
      "opts": [
        "Tricalcium Silicate (C3S)",
        "Dicalcium Silicate (C2S)",
        "Tricalcium Aluminate (C3A)",
        "Gypsum"
      ],
      "ans": 0
    },
    {
      "q": "In an RLC circuit, what condition occurs when inductive reactance equals capacitive reactance (XL = XC)?",
      "opts": [
        "Resonance",
        "Antiresonance",
        "Short Circuit",
        "Open Circuit"
      ],
      "ans": 0
    },
    {
      "q": "Which machine element is used to support rotating shafts while minimizing rotational friction?",
      "opts": [
        "Bearing",
        "Coupling",
        "Keyway",
        "Flywheel"
      ],
      "ans": 0
    },
    {
      "q": "What type of survey instrument measures both horizontal and vertical angles as well as slope distances electronically?",
      "opts": [
        "Total Station",
        "Theodolite",
        "Dumpy Level",
        "Prismatic Compass"
      ],
      "ans": 0
    },
    {
      "q": "What is the operational purpose of an op-amp configured with negative feedback?",
      "opts": [
        "Stabilizing closed-loop gain and broadening bandwidth",
        "Maximizing open-loop saturation",
        "Generating high-frequency carrier oscillations",
        "Eliminating input impedance"
      ],
      "ans": 0
    },
    {
      "q": "In a 4-stroke internal combustion engine, during which stroke is mechanical work delivered to the crankshaft?",
      "opts": [
        "Power (Expansion) Stroke",
        "Compression Stroke",
        "Intake Stroke",
        "Exhaust Stroke"
      ],
      "ans": 0
    },
    {
      "q": "What does the Reynolds Number in fluid dynamics indicate?",
      "opts": [
        "Ratio of inertial forces to viscous forces",
        "Ratio of buoyant forces to drag forces",
        "Ratio of pressure forces to surface tension",
        "Velocity of sound in the medium"
      ],
      "ans": 0
    }
  ],
  "biotechnology": [
    {
      "q": "What enzyme is primarily used in Polymerase Chain Reaction (PCR) to synthesize new DNA strands at high temperatures?",
      "opts": [
        "Taq Polymerase (from Thermus aquaticus)",
        "DNA Ligase",
        "RNA Polymerase II",
        "DNA Topoisomerase"
      ],
      "ans": 0
    },
    {
      "q": "In recombinant DNA technology, which enzymes act as 'molecular scissors' to cleave DNA at specific palindromic recognition sequences?",
      "opts": [
        "Restriction Endonucleases",
        "DNA Polymerases",
        "Reverse Transcriptases",
        "Exonucleases"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary function of DNA Ligase during molecular cloning?",
      "opts": [
        "Catalyzing the formation of phosphodiester bonds between adjacent DNA fragments",
        "Unwinding the DNA double helix",
        "Synthesizing RNA primers",
        "Degrading bacterial cell walls"
      ],
      "ans": 0
    },
    {
      "q": "Which genome editing technology utilizes a synthetic guide RNA (gRNA) and an endonuclease to create targeted double-strand breaks?",
      "opts": [
        "CRISPR-Cas9",
        "Sanger Sequencing",
        "Northern Blotting",
        "Microarray Analysis"
      ],
      "ans": 0
    },
    {
      "q": "In Sanger chain-termination DNA sequencing, which modified nucleotides terminate further strand elongation?",
      "opts": [
        "Dideoxynucleotide triphosphates (ddNTPs)",
        "Deoxynucleotide triphosphates (dNTPs)",
        "Ribonucleotide triphosphates (rNTPs)",
        "Methylated cytosines"
      ],
      "ans": 0
    },
    {
      "q": "What widely-used bioinformatics tool finds regions of local similarity between biological nucleotide or protein sequences?",
      "opts": [
        "BLAST (Basic Local Alignment Search Tool)",
        "AutoCAD",
        "Docker",
        "Apache Spark"
      ],
      "ans": 0
    },
    {
      "q": "In Western Blotting, which biological molecule is specifically detected and quantified using target antibodies?",
      "opts": [
        "Specific target proteins",
        "Double-stranded DNA fragments",
        "Messenger RNA transcripts",
        "Lipid bilayer membranes"
      ],
      "ans": 0
    },
    {
      "q": "Which technique is standardly used in downstream bioprocessing to separate and purify proteins based on charge, size, or affinity?",
      "opts": [
        "Column Chromatography (e.g. Affinity or Ion-Exchange)",
        "Centrifugal Milling",
        "Distillation Fractionation",
        "Sintering"
      ],
      "ans": 0
    },
    {
      "q": "In eukaryotic gene expression, what post-transcriptional process removes non-coding introns and splices exons together?",
      "opts": [
        "RNA Splicing",
        "DNA Replication",
        "Western Blotting",
        "Cell Lysis"
      ],
      "ans": 0
    },
    {
      "q": "What is a circular, double-stranded extra-chromosomal DNA molecule commonly used as a cloning vector in genetic engineering?",
      "opts": [
        "Plasmid",
        "Ribosome",
        "Centrosome",
        "Bacteriophage coat"
      ],
      "ans": 0
    },
    {
      "q": "Which immunological assay uses enzyme-linked antibodies to detect and quantify soluble antigens or antibodies in liquid samples?",
      "opts": [
        "ELISA (Enzyme-Linked Immunosorbent Assay)",
        "Gas Chromatography",
        "X-ray Diffraction",
        "Polyacrylamide Gel Drying"
      ],
      "ans": 0
    },
    {
      "q": "In industrial fermentation and bioprocessing, what specialized vessel maintains controlled temperature, pH, and dissolved oxygen for microbial growth?",
      "opts": [
        "Bioreactor / Fermenter",
        "Autoclave Chamber",
        "Bunsen Burner",
        "Centrifugal Dryer"
      ],
      "ans": 0
    },
    {
      "q": "What text-based file format in bioinformatics represents nucleotide or peptide sequences using single-letter codes preceded by a header line starting with '>'?",
      "opts": [
        "FASTA format",
        "JSON Schema",
        "CSV Matrix",
        "YAML Config"
      ],
      "ans": 0
    },
    {
      "q": "Which high-throughput genomic technique is used to measure the global expression levels of thousands of RNA transcripts simultaneously?",
      "opts": [
        "RNA-Seq (Next-Generation RNA Sequencing)",
        "Southern Blotting",
        "Paper Chromatography",
        "Gram Staining"
      ],
      "ans": 0
    },
    {
      "q": "In molecular biology and cDNA library construction, what enzyme synthesizes complementary DNA (cDNA) using an RNA template?",
      "opts": [
        "Reverse Transcriptase",
        "DNA Gyrase",
        "Alkaline Phosphatase",
        "RNA Helicase"
      ],
      "ans": 0
    },
    {
      "q": "What is the computational process of identifying genes, coding regions, and regulatory motifs within raw genomic sequence assemblies?",
      "opts": [
        "Genome Annotation",
        "Genome Translation",
        "Sequence Annealing",
        "Colony PCR"
      ],
      "ans": 0
    },
    {
      "q": "In agarose gel electrophoresis, toward which electrode do negatively charged DNA fragments migrate, and which fragments travel fastest?",
      "opts": [
        "Toward the positive anode; smaller fragments travel faster",
        "Toward the negative cathode; larger fragments travel faster",
        "Toward the negative cathode; smaller fragments travel faster",
        "Toward the positive anode; larger fragments travel faster"
      ],
      "ans": 0
    },
    {
      "q": "Monoclonal antibodies are industrially produced using hybridoma technology by fusing which two specific cell types?",
      "opts": [
        "B lymphocytes (antibody-producing plasma cells) and Myeloma (cancer) cells",
        "T lymphocytes and Red Blood cells",
        "Bacterial E. coli and Yeast cells",
        "Macrophage cells and Fibroblasts"
      ],
      "ans": 0
    },
    {
      "q": "Which comprehensive public biological repository hosted by NCBI archives all publicly available DNA and RNA sequence records?",
      "opts": [
        "GenBank",
        "Protein Data Bank (PDB)",
        "GitHub",
        "PubChem"
      ],
      "ans": 0
    },
    {
      "q": "In a closed microbial batch growth curve, which phase is characterized by an exponential increase in viable bacterial cell numbers?",
      "opts": [
        "Log (Exponential) Phase",
        "Lag Phase",
        "Stationary Phase",
        "Death (Decline) Phase"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary analytical application of Mass Spectrometry (MS) in modern proteomics?",
      "opts": [
        "Accurately determining protein molecular mass, sequence identity, and post-translational modifications (m/z)",
        "Amplifying DNA templates exponentially",
        "Visualizing live bacterial motility under dark-field microscopy",
        "Measuring osmotic pressure in blood plasma"
      ],
      "ans": 0
    },
    {
      "q": "Which term denotes an organism whose genome has been stably altered by the introduction of foreign exogenous recombinant DNA?",
      "opts": [
        "Transgenic Organism (Genetically Modified Organism)",
        "Wild-type Strain",
        "Polyploid Hybrid",
        "Obligate Aerobe"
      ],
      "ans": 0
    },
    {
      "q": "In bioinformatics sequence analysis, which scoring substitution matrix is standardly used for comparing moderately divergent protein alignments?",
      "opts": [
        "BLOSUM62",
        "Identity Matrix",
        "ASCII Lookup Table",
        "Hamming Distance Table"
      ],
      "ans": 0
    },
    {
      "q": "Which fluorescent intercalating dye is widely added to agarose gels to visualize separated DNA bands under ultraviolet light?",
      "opts": [
        "Ethidium Bromide (or GelRed / SYBR Safe)",
        "Crystal Violet",
        "Methylene Blue",
        "Phenolphthalein"
      ],
      "ans": 0
    },
    {
      "q": "Which cellular enzyme is responsible for unwinding the double-stranded DNA helix at the replication fork in living cells?",
      "opts": [
        "DNA Helicase",
        "DNA Ligase",
        "DNA Polymerase I",
        "Topoisomerase II"
      ],
      "ans": 0
    },
    {
      "q": "In biopharmaceuticals, what is a 'Biosimilar' drug?",
      "opts": [
        "A biologic medical product highly similar to an already approved reference biologic with no clinically meaningful differences",
        "A synthetic small-molecule generic chemical compound",
        "An herbal homeopathic nutritional supplement",
        "A completely untested novel experimental vaccine"
      ],
      "ans": 0
    },
    {
      "q": "What field of genomics analyzes the collective genomic DNA extracted directly from whole environmental or clinical microbiome communities?",
      "opts": [
        "Metagenomics",
        "Single-cell Epigenetics",
        "Structural Crystallography",
        "Comparative Anatomy"
      ],
      "ans": 0
    },
    {
      "q": "In mammalian cell culture, what gas concentration and buffer system is standardly used in incubators to maintain physiological pH 7.4?",
      "opts": [
        "5% CO2 atmosphere with Sodium Bicarbonate buffer in media",
        "100% Oxygen with Acetic acid buffer",
        "Pure Nitrogen with Potassium Hydroxide",
        "Argon gas with Hydrochloric acid"
      ],
      "ans": 0
    },
    {
      "q": "In molecular biology, which hybridization blotting technique is specifically designed to detect target DNA sequences using labeled probes?",
      "opts": [
        "Southern Blotting",
        "Northern Blotting (for RNA)",
        "Western Blotting (for Proteins)",
        "Eastern Blotting"
      ],
      "ans": 0
    },
    {
      "q": "What computational deep learning system developed by DeepMind accurately predicts the 3D tertiary structures of proteins from primary amino acid sequences?",
      "opts": [
        "AlphaFold",
        "ChatGPT",
        "TensorFlow Lite",
        "CRISPR-Cas12"
      ],
      "ans": 0
    }
  ],
  "civil-engineering": [
    {
      "q": "What test is standardly performed on fresh concrete on a construction site to measure its workability and consistency?",
      "opts": [
        "Slump Cone Test",
        "Tensile Split Test",
        "Core Cutter Test",
        "Proctor Compaction Test"
      ],
      "ans": 0
    },
    {
      "q": "In structural reinforced concrete (RCC) design, why is steel rebar positioned in the tension zone of a horizontal beam?",
      "opts": [
        "Concrete is strong in compression but weak in tension; steel carries the tensile stresses",
        "Steel prevents water absorption into the concrete core",
        "Steel reduces the dead weight of the concrete beam",
        "Steel provides thermal insulation against ambient freezing"
      ],
      "ans": 0
    },
    {
      "q": "What laboratory test is conducted on soil samples to determine their optimum moisture content (OMC) and maximum dry density (MDD)?",
      "opts": [
        "Standard Proctor Compaction Test",
        "Direct Shear Test",
        "Hydrometer Test",
        "Atterberg Limit Test"
      ],
      "ans": 0
    },
    {
      "q": "In geotechnical engineering, what equation proposed by Karl Terzaghi is widely used to calculate the ultimate bearing capacity of shallow strip footings?",
      "opts": [
        "q_ult = c*Nc + q*Nq + 0.5*gamma*B*Ngamma",
        "V = I * R",
        "PV = nRT",
        "F = m * a"
      ],
      "ans": 0
    },
    {
      "q": "Which advanced surveying instrument integrates an electronic theodolite, an electronic distance meter (EDM), and internal microprocessor data logging?",
      "opts": [
        "Total Station",
        "Dumpy Level",
        "Cross Staff",
        "Prismatic Compass"
      ],
      "ans": 0
    },
    {
      "q": "In prestressed concrete structures, what is the primary structural advantage over conventional reinforced concrete?",
      "opts": [
        "Internal compressive stresses counteract external tensile loads, reducing cracking and deflections",
        "Prestressed concrete requires no steel tendons or cables",
        "It completely eliminates the curing period of concrete",
        "It increases concrete permeability for drainage"
      ],
      "ans": 0
    },
    {
      "q": "What law governs the laminar flow of groundwater through a porous soil medium?",
      "opts": [
        "Darcy's Law (Q = k * i * A)",
        "Hooke's Law",
        "Bernoulli's Equation",
        "Newton's Law of Viscosity"
      ],
      "ans": 0
    },
    {
      "q": "In highway and flexible pavement design, what empirical penetration test measures the mechanical strength of subgrade soil?",
      "opts": [
        "California Bearing Ratio (CBR) Test",
        "Vicat Needle Test",
        "Los Angeles Abrasion Test",
        "Soundness Test"
      ],
      "ans": 0
    },
    {
      "q": "In structural column analysis, what formula gives the theoretical critical buckling load (P_cr) for an ideal slender column?",
      "opts": [
        "Euler's Buckling Formula (P_cr = pi^2 * E * I / L_eff^2)",
        "Rankine Formula",
        "Mohr's Circle Equation",
        "Castigliano's Theorem"
      ],
      "ans": 0
    },
    {
      "q": "In truss analysis, which method involves isolating individual joints as concurrent coplanar force systems in static equilibrium?",
      "opts": [
        "Method of Joints",
        "Finite Difference Method",
        "Moment Distribution Method",
        "Slope Deflection Method"
      ],
      "ans": 0
    },
    {
      "q": "How does an increase in the Water-Cement (w/c) ratio beyond the optimum affect the compressive strength of hardened concrete?",
      "opts": [
        "Significantly decreases compressive strength due to increased capillary porosity",
        "Increases compressive strength exponentially",
        "Has zero impact on mechanical strength",
        "Increases tensile resistance without affecting compression"
      ],
      "ans": 0
    },
    {
      "q": "In geotechnical retaining wall design, which theory assumes a cohesionless, dry granular soil mass with planar rupture surfaces?",
      "opts": [
        "Rankine's Earth Pressure Theory",
        "Boussinesq Stress Theory",
        "Westergaard Theory",
        "Bishop's Slip Circle Method"
      ],
      "ans": 0
    },
    {
      "q": "In environmental wastewater engineering, what parameter quantifies the amount of dissolved oxygen required by aerobic microorganisms to decompose organic matter?",
      "opts": [
        "Biochemical Oxygen Demand (BOD5)",
        "Chemical Oxygen Demand (COD)",
        "Total Suspended Solids (TSS)",
        "Turbidity Index"
      ],
      "ans": 0
    },
    {
      "q": "In hydrology and stormwater design, what is the 'Rational Formula' used to estimate peak surface runoff discharge?",
      "opts": [
        "Q = C * I * A",
        "Q = A * V",
        "H = f * L * V^2 / (2 * g * D)",
        "P = 2 * pi * N * T / 60"
      ],
      "ans": 0
    },
    {
      "q": "Which cement property is determined in the laboratory using a Vicat apparatus with standard needles?",
      "opts": [
        "Initial and Final Setting Times and Normal Consistency",
        "Compressive Strength of Mortar Cubes",
        "Soundness due to Free Lime",
        "Fineness by Sieve Analysis"
      ],
      "ans": 0
    },
    {
      "q": "In structural analysis, what does a Shear Force Diagram (SFD) plot across the span of a loaded beam?",
      "opts": [
        "Internal vertical transverse shear force at each cross-section",
        "External bending moments only",
        "Axial tension in the supports",
        "Deflection angle in radians"
      ],
      "ans": 0
    },
    {
      "q": "In earthquake-resistant structural engineering, what design characteristic allows a building frame to undergo large inelastic deformations without sudden collapse?",
      "opts": [
        "Ductility",
        "Brittleness",
        "Thermal Expansion",
        "Permeability"
      ],
      "ans": 0
    },
    {
      "q": "What laboratory test is conducted on bitumen binders to evaluate their hardness and consistency at 25 degrees Celsius?",
      "opts": [
        "Penetration Test",
        "Softening Point Test",
        "Ductility Briquette Test",
        "Flash and Fire Point Test"
      ],
      "ans": 0
    },
    {
      "q": "In open channel hydraulics, what dimensionless number distinguishes subcritical flow (Fr < 1) from supercritical flow (Fr > 1)?",
      "opts": [
        "Froude Number (Fr)",
        "Reynolds Number (Re)",
        "Mach Number (Ma)",
        "Weber Number (We)"
      ],
      "ans": 0
    },
    {
      "q": "Which foundation type is most suitable for distributing heavy structural column loads over weak, highly compressible soil strata across the entire building footprint?",
      "opts": [
        "Raft (Mat) Foundation",
        "Isolated Pad Footing",
        "Stepped Footing",
        "Strap Footing"
      ],
      "ans": 0
    },
    {
      "q": "In soil mechanics, what are the Atterberg limits used to delineate the consistency states of fine-grained cohesive soils?",
      "opts": [
        "Liquid Limit, Plastic Limit, and Shrinkage Limit",
        "Void Ratio, Porosity, and Degree of Saturation",
        "Specific Gravity, Unit Weight, and Moisture Content",
        "Permeability, Cohesion, and Friction Angle"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary cause of 'bleeding' in freshly placed concrete?",
      "opts": [
        "Upward migration of excess mixing water to the surface due to settlement of heavier aggregate solids",
        "Excessive hydration heat during curing",
        "Reaction of aggregate alkali with silica",
        "Premature drying of surface cement paste"
      ],
      "ans": 0
    },
    {
      "q": "Which surveying method is used to determine differences in elevation between points on the ground relative to a permanent benchmark?",
      "opts": [
        "Differential Spirit Leveling",
        "Traversing with Compass",
        "Triangulation Baseline Measurement",
        "Plane Table Radiation"
      ],
      "ans": 0
    },
    {
      "q": "In structural steel design, what structural failure mode governs the design of slender compression members (struts and columns)?",
      "opts": [
        "Elastic or Inelastic Buckling",
        "Brittle Tensile Rupture",
        "Creep Deformation",
        "Surface Fatigue Corrosion"
      ],
      "ans": 0
    },
    {
      "q": "What hydraulic formula calculates flow velocity in open gravity conduits such as sewers and drainage canals?",
      "opts": [
        "Manning's Equation (V = (1/n) * R^(2/3) * S^(1/2))",
        "Hazen-Williams Formula",
        "Poiseuille's Equation",
        "Euler's Energy Equation"
      ],
      "ans": 0
    },
    {
      "q": "In geotechnical slope stability analysis, which Swedish circle method divides the soil mass above a potential failure arc into vertical strips?",
      "opts": [
        "Fellenius Method of Slices (Ordinary Method of Slices)",
        "Terzaghi Bearing Capacity Equation",
        "Rankine Wedge Method",
        "Westergaard Elastic Solution"
      ],
      "ans": 0
    },
    {
      "q": "What is the purpose of curing concrete with moisture or ponding for at least 7 to 14 days after placement?",
      "opts": [
        "Maintaining moisture to facilitate complete chemical hydration of Portland cement and strength development",
        "Cooling down the building frame to prevent thermal shocks",
        "Washing away surplus sand and fine aggregates",
        "Softening the outer concrete surface for aesthetic polishing"
      ],
      "ans": 0
    },
    {
      "q": "In transportation engineering, what geometric curve is provided between two tangent straights to counteract centrifugal force on high-speed vehicles?",
      "opts": [
        "Superelevated Circular Curve with Spiral Transition Curves",
        "Parabolic Crest Vertical Curve",
        "Sag Curve with drainage inlets",
        "Broken-back Reverse Curve"
      ],
      "ans": 0
    },
    {
      "q": "Which non-destructive testing (NDT) instrument measures the surface hardness of hardened concrete to estimate its in-situ compressive strength?",
      "opts": [
        "Schmidt Rebound Hammer",
        "Core Drilling Rig",
        "Universal Testing Machine (UTM)",
        "Hydraulic Pull-off Gauge"
      ],
      "ans": 0
    },
    {
      "q": "In urban water supply treatment, what chemical coagulant is most widely added to raw water to destabilize colloidal turbidity particles?",
      "opts": [
        "Alum (Aluminum Sulfate)",
        "Calcium Carbonate",
        "Sodium Chloride",
        "Activated Charcoal"
      ],
      "ans": 0
    }
  ],
  "electrical-engineering": [
    {
      "q": "What is the primary cause of core (iron) losses in an AC power transformer?",
      "opts": [
        "Hysteresis loss and Eddy current loss in the magnetic laminations",
        "Ohmic I^2*R resistance heating in copper windings",
        "Dielectric breakdown of transformer mineral oil",
        "Mechanical friction in the bushings"
      ],
      "ans": 0
    },
    {
      "q": "What formula determines the synchronous speed (N_s) of a three-phase AC induction motor with P poles operating at frequency f?",
      "opts": [
        "N_s = 120 * f / P (RPM)",
        "N_s = 60 * f * P (RPM)",
        "N_s = f / (120 * P)",
        "N_s = P * f / 120"
      ],
      "ans": 0
    },
    {
      "q": "In AC circuit analysis, how does connecting a shunt capacitor bank to an inductive industrial load improve power system performance?",
      "opts": [
        "Improves power factor toward unity and reduces lagging reactive power (kVAR) demand",
        "Increases harmonic distortion across high-voltage lines",
        "Converts alternating current directly into high-voltage direct current",
        "Triples the fundamental line frequency"
      ],
      "ans": 0
    },
    {
      "q": "What phenomenon in high-voltage AC transmission lines causes current density to concentrate near the outer surface of conductors?",
      "opts": [
        "Skin Effect",
        "Proximity Effect",
        "Corona Discharge",
        "Ferranti Effect"
      ],
      "ans": 0
    },
    {
      "q": "Under no-load or light-load conditions on long EHV transmission lines, what effect causes the receiving-end voltage to exceed the sending-end voltage?",
      "opts": [
        "Ferranti Effect",
        "Skin Effect",
        "Stroboscopic Effect",
        "Hall Effect"
      ],
      "ans": 0
    },
    {
      "q": "What is the condition for electrical resonance in a series RLC alternating current circuit?",
      "opts": [
        "Inductive reactance equals capacitive reactance (X_L = X_C)",
        "Total circuit impedance is infinite",
        "Resistance R equals zero while voltage is lagging by 90 degrees",
        "Current and voltage are in complete phase quadrature"
      ],
      "ans": 0
    },
    {
      "q": "According to Lenz's Law, what is the direction of an induced electromotive force (EMF) in a closed circuit?",
      "opts": [
        "It always opposes the change in magnetic flux that produces it",
        "It always reinforces the changing magnetic flux",
        "It flows perpendicular to all electrostatic potential fields",
        "It remains strictly constant regardless of magnetic field rate of change"
      ],
      "ans": 0
    },
    {
      "q": "Which high-voltage circuit breaker technology utilizes an inert, highly electronegative gas with outstanding arc-quenching properties?",
      "opts": [
        "SF6 (Sulfur Hexafluoride) Circuit Breaker",
        "Air-Blast Circuit Breaker",
        "Bulk Oil Circuit Breaker",
        "Carbon Dioxide Circuit Breaker"
      ],
      "ans": 0
    },
    {
      "q": "In an AC induction motor, what is 'slip' (s) defined as?",
      "opts": [
        "s = (N_s - N_r) / N_s, where N_s is synchronous speed and N_r is rotor speed",
        "s = N_r / N_s",
        "s = N_s + N_r",
        "s = 1 / (N_s - N_r)"
      ],
      "ans": 0
    },
    {
      "q": "What is the relationship between line voltage (V_L) and phase voltage (V_ph) in a balanced three-phase Star (Wye) connected AC system?",
      "opts": [
        "V_L = sqrt(3) * V_ph",
        "V_L = V_ph",
        "V_L = V_ph / sqrt(3)",
        "V_L = 3 * V_ph"
      ],
      "ans": 0
    },
    {
      "q": "In power system fault analysis, which type of short-circuit fault occurs most frequently on overhead high-voltage transmission lines?",
      "opts": [
        "Single Line-to-Ground (L-G) Fault",
        "Three-Phase Symmetrical (L-L-L) Fault",
        "Line-to-Line (L-L) Fault",
        "Double Line-to-Ground (L-L-G) Fault"
      ],
      "ans": 0
    },
    {
      "q": "What is the primary function of a Buchholz Relay in an oil-immersed power transformer?",
      "opts": [
        "Detecting internal incipient electrical faults and gas accumulation inside the main transformer tank",
        "Measuring secondary load current accurately",
        "Cooling the external radiator fins with forced air",
        "Regulating primary tap-changer voltages dynamically"
      ],
      "ans": 0
    },
    {
      "q": "What mathematical method is standardly used for analyzing unbalanced three-phase power system faults into positive, negative, and zero sequence components?",
      "opts": [
        "Fortescue's Symmetrical Components Method",
        "Fourier Transform Decomposition",
        "Laplace Transform Integral",
        "Bode Plot Stability Analysis"
      ],
      "ans": 0
    },
    {
      "q": "In electrical machines, what is the purpose of laminating the stator and rotor iron cores?",
      "opts": [
        "To minimize eddy current power losses by increasing electrical resistance between thin sheets",
        "To increase the mechanical flexibility of the motor casing",
        "To reduce the magnetic permeability of the air gap",
        "To decrease the copper winding resistance"
      ],
      "ans": 0
    },
    {
      "q": "Which DC motor speed control method allows operation above the rated base speed?",
      "opts": [
        "Field Flux Weakening Control",
        "Armature Resistance Control",
        "Armature Voltage Reduction Control",
        "Reverse Polarity Switching"
      ],
      "ans": 0
    },
    {
      "q": "What is the ideal input impedance and output impedance of an ideal operational amplifier (Op-Amp)?",
      "opts": [
        "Infinite Input Impedance (Z_in = infinity) and Zero Output Impedance (Z_out = 0)",
        "Zero Input Impedance and Infinite Output Impedance",
        "50 Ohms Input Impedance and 50 Ohms Output Impedance",
        "Equal reactive impedance at all frequencies"
      ],
      "ans": 0
    },
    {
      "q": "In an AC synchronous generator (alternator), what type of electrical excitation is supplied to the rotor field windings?",
      "opts": [
        "Direct Current (DC)",
        "Three-Phase Alternating Current (AC)",
        "High-Frequency Radio Pulses",
        "Square-wave AC with 50% duty cycle"
      ],
      "ans": 0
    },
    {
      "q": "What safety protective device automatically trips an electrical circuit when it detects a differential leakage current escaping to earth ground?",
      "opts": [
        "Residual Current Circuit Breaker (RCCB / GFCI)",
        "Thermal Overload Relay",
        "Fast-acting Cartridge Fuse",
        "Surge Arrester Varistor"
      ],
      "ans": 0
    },
    {
      "q": "What theorem states that any linear active bilateral electrical network with two terminals can be replaced by an equivalent single voltage source in series with an impedance?",
      "opts": [
        "Thevenin's Theorem",
        "Norton's Theorem",
        "Superposition Theorem",
        "Maximum Power Transfer Theorem"
      ],
      "ans": 0
    },
    {
      "q": "What is the Maximum Power Transfer condition for a load connected to a linear DC source with internal resistance R_s?",
      "opts": [
        "Load resistance equals source resistance (R_L = R_s)",
        "Load resistance is infinite (open circuit)",
        "Load resistance is zero (short circuit)",
        "Load resistance is double the source resistance"
      ],
      "ans": 0
    },
    {
      "q": "In electric power transmission, what is the luminous violet glow and hissing sound caused by ionization of air surrounding high-voltage conductors?",
      "opts": [
        "Corona Discharge",
        "Skin Effect",
        "Arc Flash",
        "Eddy Current Luminescence"
      ],
      "ans": 0
    },
    {
      "q": "What type of power semiconductor device combines the simple gate-drive characteristics of MOSFETs with the high-current and low-saturation-voltage capability of bipolar transistors?",
      "opts": [
        "Insulated-Gate Bipolar Transistor (IGBT)",
        "Silicon-Controlled Rectifier (SCR)",
        "Zener Diode",
        "Schottky Barrier Diode"
      ],
      "ans": 0
    },
    {
      "q": "In solar photovoltaic (PV) power systems, what component converts variable direct current (DC) electricity into synchronized utility-grade alternating current (AC)?",
      "opts": [
        "Grid-Tied Solar Inverter",
        "Buck-Boost DC Chopper",
        "Analog Rectifier Bridge",
        "Current Transformer (CT)"
      ],
      "ans": 0
    },
    {
      "q": "What protective instrument is installed at substation overhead entries to divert high-voltage lightning and switching surges safely to ground?",
      "opts": [
        "Surge Arrester (Lightning Arrester)",
        "Earth Disconnector Switch",
        "Current Limiting Reactor",
        "Potential Transformer (PT)"
      ],
      "ans": 0
    },
    {
      "q": "In power engineering, what is the per-unit (p.u.) system used for?",
      "opts": [
        "Simplifying complex network calculations by normalizing voltages, currents, and impedances to a common base",
        "Calculating electrical tariffs for retail residential consumers",
        "Measuring mechanical vibrations in turbine bearings",
        "Standardizing the physical dimensions of motor casings"
      ],
      "ans": 0
    },
    {
      "q": "Which motor type has its rotor speed strictly synchronized with the rotating magnetic field of the stator at all operating loads?",
      "opts": [
        "Synchronous Motor",
        "Squirrel-Cage Induction Motor",
        "Universal Series Motor",
        "Shaded-Pole Induction Motor"
      ],
      "ans": 0
    },
    {
      "q": "What is the active power (P) in a balanced three-phase AC circuit with line voltage V_L, line current I_L, and power factor angle theta?",
      "opts": [
        "P = sqrt(3) * V_L * I_L * cos(theta)",
        "P = 3 * V_L * I_L * sin(theta)",
        "P = V_L * I_L * cos(theta)",
        "P = sqrt(2) * V_L * I_L"
      ],
      "ans": 0
    },
    {
      "q": "What starting method is standardly used for medium-to-large three-phase induction motors to reduce inrush starting current without adding external resistance?",
      "opts": [
        "Star-Delta (Wye-Delta) Starter or Soft Starter",
        "Direct-On-Line (DOL) Full Voltage Starting",
        "DC Injection Braking",
        "Series Capacitive Starter"
      ],
      "ans": 0
    },
    {
      "q": "What instrument transformer is specifically designed to step down high line currents safely for measurement by standard 5A ammeters and protective relays?",
      "opts": [
        "Current Transformer (CT)",
        "Potential Transformer (PT)",
        "Autotransformer",
        "Isolation Transformer"
      ],
      "ans": 0
    },
    {
      "q": "Which law mathematically states that the line integral of magnetic field intensity around any closed loop equals the total enclosed electric current?",
      "opts": [
        "Ampere's Circuital Law",
        "Gauss's Law for Magnetism",
        "Coulomb's Inverse Square Law",
        "Biot-Savart Law"
      ],
      "ans": 0
    }
  ]
};

const ALIAS_MAP = {
  "biotechnology": "biotechnology",
  "biotech": "biotechnology",
  "bioinformatics": "biotechnology",
  "biotech-eng": "biotechnology",
  "biotechnology-bioinformatics": "biotechnology",
  "civil-engineering": "civil-engineering",
  "civil-eng": "civil-engineering",
  "civil": "civil-engineering",
  "structural-engineering": "civil-engineering",
  "electrical-engineering": "electrical-engineering",
  "eee-eng": "electrical-engineering",
  "electrical": "electrical-engineering",
  "power-systems": "electrical-engineering",
  "mechanical-engineering": "mechanical-engineering",
  "mech-eng": "mechanical-engineering",
  "mechanical": "mechanical-engineering",
  "core-engineering": "mechanical-engineering",
  "aerospace-automobile": "mechanical-engineering",
  "industrial-engineering": "mechanical-engineering",
  "prompt-engineering": "prompt-engineering",
  "prompt": "prompt-engineering",
  "prompts": "prompt-engineering",
  "prompting": "prompt-engineering",
  "prompt-engineer": "prompt-engineering",
  "generative-ai": "prompt-engineering",
  "genai": "prompt-engineering",
  "gen-ai": "prompt-engineering",
  "llm": "prompt-engineering",
  "llms": "prompt-engineering",
  "large-language-model": "prompt-engineering",
  "large-language-models": "prompt-engineering",
  "chatgpt": "prompt-engineering",
  "gpt": "prompt-engineering",
  "agentic-ai": "prompt-engineering",
  "ai-ml": "ai-ml",
  "ai": "ai-ml",
  "ml": "ai-ml",
  "artificial-intelligence": "ai-ml",
  "machine-learning": "ai-ml",
  "data-science": "ai-ml",
  "data-science-machine-learning": "ai-ml",
  "data-science-analytics": "ai-ml",
  "data-analytics": "ai-ml",
  "web-development": "full-stack-web-development",
  "web-dev": "full-stack-web-development",
  "fullstack": "full-stack-web-development",
  "full-stack": "full-stack-web-development",
  "full-stack-web-development": "full-stack-web-development",
  "frontend": "full-stack-web-development",
  "backend": "full-stack-web-development",
  "javascript": "full-stack-web-development",
  "typescript": "full-stack-web-development",
  "react": "full-stack-web-development",
  "nextjs": "full-stack-web-development",
  "angular": "full-stack-web-development",
  "vue": "full-stack-web-development",
  "tailwind": "full-stack-web-development",
  "python": "python-programming",
  "python-programming": "python-programming",
  "py": "python-programming",
  "java": "java-backend-architecture",
  "java-backend-architecture": "java-backend-architecture",
  "spring": "java-backend-architecture",
  "springboot": "java-backend-architecture",
  "cloud": "cloud-devops",
  "cloud-computing": "cloud-devops",
  "devops": "cloud-devops",
  "cloud-devops": "cloud-devops",
  "aws": "cloud-devops",
  "azure": "cloud-devops",
  "gcp": "cloud-devops",
  "docker": "cloud-devops",
  "kubernetes": "cloud-devops",
  "cyber-security": "cybersecurity-ethical-hacking",
  "cybersecurity": "cybersecurity-ethical-hacking",
  "security": "cybersecurity-ethical-hacking",
  "ethical-hacking": "cybersecurity-ethical-hacking",
  "cybersecurity-ethical-hacking": "cybersecurity-ethical-hacking",
  "dsa": "dsa",
  "data-structures": "dsa",
  "algorithms": "dsa",
  "data-structures-algorithms": "dsa",
  "business-management": "business-management",
  "mba-mgmt": "business-management",
  "finance-accounting": "business-management",
  "finance-acc": "business-management",
  "human-resources": "business-management",
  "hr-talent": "business-management",
  "digital-marketing": "business-management",
  "supply-chain-operations": "business-management",
  "sales-business-development": "business-management",
  "ui-ux-design": "ui-ux-design",
  "ui-ux": "ui-ux-design",
  "product-management": "ui-ux-design",
  "graphic-design": "ui-ux-design",
  "graphic-media": "ui-ux-design",
  "technical-writing": "ui-ux-design",
  "cpp": "cpp",
  "c": "cpp",
  "csharp": "cpp",
  "golang": "cpp",
  "rust": "cpp",
  "php": "full-stack-web-development",
  "kotlin": "java-backend-architecture",
  "swift": "full-stack-web-development"
};


function synthesizeDomainQuestions(domainName, domainSlug, targetCount = 30) {
  const cleanTitle = domainName && domainName.trim() 
    ? domainName.trim() 
    : (domainSlug || 'Technical Domain').replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

  const templates = [
    {
      q: 'In ' + cleanTitle + ', what is the fundamental objective of adopting modern architectural design patterns?',
      correct: 'To achieve loose coupling, high cohesion, and scalable maintainability across ' + cleanTitle + ' components',
      distractors: [
        'To eliminate the need for automated testing and code reviews in ' + cleanTitle,
        'To force all components to run on a single monolithic thread',
        'To maximize network bandwidth consumption between service layers'
      ]
    },
    {
      q: 'When optimizing performance in ' + cleanTitle + ' systems, which strategy yields the most predictable latency and throughput?',
      correct: 'Profiling execution bottlenecks and implementing non-blocking asynchronous operations with optimized caching',
      distractors: [
        'Increasing recursive call depth without base condition termination',
        'Disabling all compiler and interpreter optimization flags',
        'Storing all operational data in flat temporary text files without indexing'
      ]
    },
    {
      q: 'Which of the following represents a critical security risk specifically mitigated in robust ' + cleanTitle + ' implementations?',
      correct: 'Input validation bypass, insecure deserialization, and unauthenticated access to core services',
      distractors: [
        'Using strict cryptographic protocols with SHA-256 or higher',
        'Enforcing role-based access control (RBAC) across all service endpoints',
        'Automating dependency vulnerability scanning during build cycles'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', how is state consistency typically maintained across concurrent or distributed nodes?',
      correct: 'Through distributed consensus algorithms, transactional outbox patterns, or idempotent event processing',
      distractors: [
        'By allowing arbitrary asynchronous writes without conflict resolution or locking',
        'By resetting the system clock after every concurrent write',
        'By storing state exclusively in local volatile memory registers'
      ]
    },
    {
      q: 'What is the industry best practice for handling unhandled exceptions and failovers in ' + cleanTitle + ' production environments?',
      correct: 'Structured telemetry logging, circuit breaker patterns, and automated graceful degradation',
      distractors: [
        'Silently suppressing error logs and halting execution indefinitely',
        'Terminating the hosting infrastructure immediately upon receiving a non-fatal warning',
        'Exposing raw stack traces and internal secrets directly to end users'
      ]
    },
    {
      q: 'When conducting automated testing for ' + cleanTitle + ' applications, which layer validates end-to-end user workflows?',
      correct: 'Comprehensive integration and end-to-end (E2E) workflow test suites simulating real production loads',
      distractors: [
        'Static code linting without executing any runtime test assertions',
        'Manual random clicking without recording test outcomes or coverage metrics',
        'Testing only deprecated functions that are no longer accessible to clients'
      ]
    },
    {
      q: 'Which metric is most crucial when benchmarking scalability and load handling in ' + cleanTitle + ' infrastructure?',
      correct: '99th percentile (p99) response latency, throughput (requests/sec), and resource saturation',
      distractors: [
        'Total number of comments written in source code files',
        'Color depth of the graphical user interface assets',
        'Alphabetical length of database column names'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', what role does asynchronous processing or decoupled messaging play in system resilience?',
      correct: 'It absorbs traffic spikes, prevents downstream bottlenecks, and decouples producer-consumer dependencies',
      distractors: [
        'It guarantees that every request must wait synchronously for all background jobs',
        'It doubles the memory consumption of every single thread',
        'It prevents services from ever restarting in the event of an OS reboot'
      ]
    },
    {
      q: 'When refactoring legacy code in a ' + cleanTitle + ' project, which principle ensures maintainability without breaking compatibility?',
      correct: 'Adhering to SOLID principles, versioned API contracts, and high test coverage before refactoring',
      distractors: [
        'Deleting all existing unit tests to speed up the refactoring process',
        'Combining multiple unrelated business functions into a single 5,000-line function',
        'Hardcoding database credentials directly inside the refactored modules'
      ]
    },
    {
      q: 'Which of the following accurately describes modern lifecycle management of resources in ' + cleanTitle + ' frameworks?',
      correct: 'Deterministic allocation, automatic garbage collection/RAII, and explicit connection pooling with cleanup hooks',
      distractors: [
        'Opening endless file handles and database connections without ever closing them',
        'Relying on hardware power cycling to clean up dangling system threads',
        'Allocating unbounded memory buffers without limits or eviction policies'
      ]
    },
    {
      q: 'How does containerization (e.g. Docker) or virtualization benefit modern ' + cleanTitle + ' deployments?',
      correct: 'Provides environment parity across development and production, isolated dependencies, and rapid scaling',
      distractors: [
        'Eliminates the need for writing optimized code in ' + cleanTitle,
        'Restricts code execution strictly to a single central CPU core',
        'Removes all network firewalls and access controls by default'
      ]
    },
    {
      q: 'What is the recommended approach for logging and telemetry monitoring in high-availability ' + cleanTitle + ' clusters?',
      correct: 'Centralized structured JSON logs, distributed trace IDs, and real-time metric dashboards',
      distractors: [
        'Printing unstructured plain text messages to local console output without timestamps',
        'Disabling all logging to save storage space on edge servers',
        'Storing audit records in temporary browser cookies'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', which design pattern is specifically suited for decoupling business logic from external data interfaces?',
      correct: 'Repository and Dependency Inversion patterns',
      distractors: [
        'Singleton pattern storing raw database SQL strings globally',
        'God Object anti-pattern managing all application concerns in one file',
        'Tight coupling where UI components query raw hardware devices directly'
      ]
    },
    {
      q: 'How should secret credentials and sensitive configuration be managed in ' + cleanTitle + ' deployment environments?',
      correct: 'Using encrypted secret managers, environment variables, and strict principle of least privilege',
      distractors: [
        'Committing production API keys and private certificates to public git repositories',
        'Encoding passwords in base64 inside frontend client bundle code',
        'Writing credentials in plaintext comments throughout the source files'
      ]
    },
    {
      q: 'What is the primary trade-off when choosing horizontal scaling over vertical scaling in ' + cleanTitle + ' architecture?',
      correct: 'Horizontal scaling enhances fault tolerance and elastic capacity but introduces network overhead and distributed complexity',
      distractors: [
        'Horizontal scaling only works if the code is written in assembly language',
        'Vertical scaling is completely cost-free with zero physical server constraints',
        'Horizontal scaling guarantees that no data synchronization will ever be required'
      ]
    },
    {
      q: 'Which caching strategy is most appropriate for high-read, low-write data models in ' + cleanTitle + '?',
      correct: 'Cache-Aside (Lazy Loading) or Read-Through caching with Time-To-Live (TTL) eviction',
      distractors: [
        'Disabling all memory caching and forcing every read to query cold disk storage',
        'Writing every query response directly into non-volatile firmware',
        'Cache without any eviction policy until server memory crashes with out-of-memory'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', what mechanism is standardly used to prevent data race conditions in concurrent environments?',
      correct: 'Mutual exclusion locks (Mutexes), atomic primitives, or software transactional memory',
      distractors: [
        'Running threads with random sleep intervals hoping they will not overlap',
        'Allowing concurrent writes without synchronization or atomic boundaries',
        'Disabling CPU multicore support across all production servers'
      ]
    },
    {
      q: 'When designing APIs or communication contracts in ' + cleanTitle + ', which standard provides the strongest type safety and schema validation?',
      correct: 'Strict schema protocols like OpenAPI/Swagger, gRPC/Protobuf, or GraphQL with type schemas',
      distractors: [
        'Unstructured text strings separated by arbitrary random delimiter characters',
        'Sending raw memory pointers across public internet HTTP connections',
        'Relying on client-side oral agreements without written specifications'
      ]
    },
    {
      q: 'What is the long-term impact of accumulating technical debt in enterprise ' + cleanTitle + ' codebases?',
      correct: 'Velocity slows down, bug frequency increases, and the cost of adding new features grows exponentially',
      distractors: [
        'Technical debt automatically refactors itself into optimized machine instructions',
        'Developer productivity increases proportionally with undocumented hacks',
        'System throughput improves as architectural constraints are discarded'
      ]
    },
    {
      q: 'Which Continuous Integration (CI) practice best ensures code quality before merging in ' + cleanTitle + ' teams?',
      correct: 'Automated pipelines executing linting, unit/integration tests, security scanning, and requiring peer reviews',
      distractors: [
        'Directly pushing untested modifications straight to the production master branch',
        'Disabling branch protection rules and skipping build verification steps',
        'Testing only in local developer machines without continuous shared integration'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', how is graceful degradation achieved during downstream third-party service outages?',
      correct: 'Serving cached fallback data, queueing outgoing events, and maintaining critical primary functionality',
      distractors: [
        'Crashing the entire user application with a fatal white screen error',
        'Infinitely retrying failing requests at microsecond intervals to overload the service',
        'Corrupting local configuration files to prevent the system from starting again'
      ]
    },
    {
      q: 'What is the key advantage of reactive event-driven patterns compared to synchronous blocking in ' + cleanTitle + '?',
      correct: 'Higher resource utilization and scalability by not tying up OS threads while waiting for I/O',
      distractors: [
        'Reactive programming completely eliminates the need for computer RAM',
        'Synchronous blocking enables infinite concurrency with zero thread stack overhead',
        'Event-driven patterns ensure that code will never have logical runtime defects'
      ]
    },
    {
      q: 'When profiling memory bottlenecks in ' + cleanTitle + ' applications, what is a frequent cause of persistent leaks?',
      correct: 'Dangling event listeners, unevicted global caches, and unclosed connection handles',
      distractors: [
        'Using strongly typed immutable variables throughout the codebase',
        'Employing small, pure functions that allocate and immediately discard local scope',
        'Validating user input before storing it in transactional records'
      ]
    },
    {
      q: 'Which data protection principle is mandatory when processing sensitive user information in ' + cleanTitle + '?',
      correct: 'End-to-end encryption in transit (TLS) and at rest, data minimization, and audit logging',
      distractors: [
        'Broadcasting user data across unencrypted public WebSocket channels',
        'Storing user credentials in plain text log files for debugging convenience',
        'Granting read access to all internal records to anonymous guest requests'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', how do idempotent operations contribute to reliable transaction processing?',
      correct: 'They ensure that executing the same operation multiple times produces the exact same outcome without side-effects',
      distractors: [
        'They guarantee that every repeated request creates a duplicate database entry',
        'They double the fee charged for each subsequent network transmission',
        'They randomly alter the state each time an operation is triggered'
      ]
    },
    {
      q: 'What role does Dependency Injection (DI) play in enhancing testability for ' + cleanTitle + ' systems?',
      correct: 'Allows dependencies to be easily replaced with mock or stub implementations during automated testing',
      distractors: [
        'Hardwires deep hardware dependencies into every single class constructor',
        'Prevents developers from writing any modular unit tests',
        'Forces the entire test suite to run against live production databases'
      ]
    },
    {
      q: 'When orchestrating distributed microservices in ' + cleanTitle + ', which pattern manages multi-step distributed transactions?',
      correct: 'The Saga Pattern (orchestrated or choreographed) with compensating rollback transactions',
      distractors: [
        'Two-phase commits holding indefinite distributed database locks across public WAN',
        'Ignoring partial failures and assuming every network call always succeeds',
        'Writing transactions to browser localStorage and waiting for client sync'
      ]
    },
    {
      q: 'Which strategy best minimizes downtime during continuous delivery deployments in ' + cleanTitle + '?',
      correct: 'Blue-Green or Canary deployment with automated health checks and instant rollback capabilities',
      distractors: [
        'Terminating all active customer sessions simultaneously before starting a manual update',
        'Overwriting running production binaries in-place during peak user traffic hours',
        'Deleting all historical deployment artifacts so rollbacks are impossible'
      ]
    },
    {
      q: 'In ' + cleanTitle + ', how are rate limiting and circuit breaking employed to safeguard core service integrity?',
      correct: 'By throttling abusive traffic volumes and fast-failing requests when a dependency exceeds error thresholds',
      distractors: [
        'By accepting infinite concurrent connections until the server CPU overheats',
        'By blocking legitimate authenticated users while allowing malicious scraping',
        'By restarting the physical network switch every time an error code 400 is seen'
      ]
    },
    {
      q: 'What constitutes the ultimate benchmark of engineering excellence and operational readiness in production ' + cleanTitle + '?',
      correct: 'High availability (99.9%+), resilient fault tolerance, secure architecture, and seamless developer ergonomics',
      distractors: [
        'Having the maximum number of dependencies installed in package.json',
        'Writing code that is so deeply obfuscated that no other engineer can comprehend it',
        'Deploying updates only once every five years to avoid any change'
      ]
    }
  ];

  return templates.slice(0, targetCount).map((item, idx) => {
    const opts = [item.correct, ...item.distractors.slice(0, 3)];
    const correctIdx = Math.floor(Math.random() * 4);
    if (correctIdx !== 0) {
      const temp = opts[0];
      opts[0] = opts[correctIdx];
      opts[correctIdx] = temp;
    }
    return {
      q: item.q,
      opts: opts,
      ans: correctIdx
    };
  });
}


function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// In-memory cache of generated dynamic questions to ensure accurate server grading
const dynamicQuestionCache = new Map();

function getDomainQuestions(domainSlug, targetCount = 30) {
  const cleanSlug = (domainSlug || '').toLowerCase().trim();
  
  // 1. Check alias map or existing domain questions
  let resolvedKey = ALIAS_MAP[cleanSlug] || Object.keys(DOMAIN_QUESTIONS).find(k => cleanSlug.includes(k) || k.includes(cleanSlug));
  
  let rawList = null;

  if (resolvedKey && DOMAIN_QUESTIONS[resolvedKey]) {
    rawList = DOMAIN_QUESTIONS[resolvedKey];
  } else {
    // Dynamic generation for ANY arbitrary custom domain entered by user!
    resolvedKey = cleanSlug || 'custom-domain';
    const domainTitle = cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
    rawList = synthesizeDomainQuestions(domainTitle, cleanSlug, 30);
  }

  // 1. Randomly shuffle the questions for this domain
  const shuffledQuestions = shuffle(rawList);
  const count = Math.max(1, Math.min(shuffledQuestions.length, targetCount || 30));

  return shuffledQuestions.slice(0, count).map((item, idx) => {
    const originalIndex = rawList.indexOf(item);
    const qId = `${resolvedKey}-q-${originalIndex + 1}`;

    // 2. Map options with stable identifier and shuffle strictly 4 options (A, B, C, D)
    const rawOptions = (item.opts || []).slice(0, 4).map((optText, oIdx) => ({
      id: `${qId}-opt-${String.fromCharCode(97 + oIdx)}`,
      question_id: qId,
      option_text: optText,
      is_correct: oIdx === item.ans
    }));

    const correctOptId = `${qId}-opt-${String.fromCharCode(97 + item.ans)}`;
    dynamicQuestionCache.set(qId, correctOptId);

    const shuffledOptions = shuffle(rawOptions).map((opt, oIdx) => ({
      ...opt,
      option_order: oIdx + 1
    }));

    return {
      id: qId,
      domain_id: domainSlug,
      question_text: item.q,
      difficulty: idx < 10 ? 'easy' : idx < 20 ? 'medium' : 'hard',
      marks: 1,
      explanation: 'Detailed assessment evaluation',
      active: true,
      display_order: idx + 1,
      options: shuffledOptions
    };
  });
}

function checkCorrectAnswer(questionId, optionId) {
  if (!questionId || !optionId) return false;
  if (dynamicQuestionCache.has(questionId)) {
    return dynamicQuestionCache.get(questionId) === optionId;
  }
  return false;
}

module.exports = {
  DOMAIN_QUESTIONS,
  ALIAS_MAP,
  getDomainQuestions,
  checkCorrectAnswer,
  synthesizeDomainQuestions
};
