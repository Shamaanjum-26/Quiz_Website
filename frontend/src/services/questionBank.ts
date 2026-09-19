import type { Question } from '@/types';

// Comprehensive, authentic question bank for EVERY domain
// strictly 4 options (A, B, C, D) per question, question shuffling, option shuffling, and dynamic domain generation
const DOMAIN_QUESTIONS: Record<string, any[]> = {
  "ai-ml": [
    {
      "id": "ai-ml-1",
      "question_text": "Which learning paradigm relies on labeled training datasets consisting of input-output pairs?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-1-a",
          "option_text": "Supervised Learning",
          "is_correct": true
        },
        {
          "id": "ai-ml-1-b",
          "option_text": "Unsupervised Learning",
          "is_correct": false
        },
        {
          "id": "ai-ml-1-c",
          "option_text": "Reinforcement Learning",
          "is_correct": false
        },
        {
          "id": "ai-ml-1-d",
          "option_text": "Self-Supervised Clustering",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-2",
      "question_text": "In Machine Learning, what does a model with \"high variance\" typically suffer from?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-2-a",
          "option_text": "Overfitting to training data",
          "is_correct": true
        },
        {
          "id": "ai-ml-2-b",
          "option_text": "Underfitting the underlying trend",
          "is_correct": false
        },
        {
          "id": "ai-ml-2-c",
          "option_text": "Inability to learn simple linear relationships",
          "is_correct": false
        },
        {
          "id": "ai-ml-2-d",
          "option_text": "Excessive training regularization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-3",
      "question_text": "Which activation function is defined as f(x) = max(0, x) and helps prevent vanishing gradients?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-3-a",
          "option_text": "ReLU (Rectified Linear Unit)",
          "is_correct": true
        },
        {
          "id": "ai-ml-3-b",
          "option_text": "Sigmoid",
          "is_correct": false
        },
        {
          "id": "ai-ml-3-c",
          "option_text": "Hyperbolic Tangent (Tanh)",
          "is_correct": false
        },
        {
          "id": "ai-ml-3-d",
          "option_text": "Softmax",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-4",
      "question_text": "What is the primary objective of L1 Regularization (Lasso) compared to L2 Regularization (Ridge)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-4-a",
          "option_text": "Promoting feature sparsity by driving irrelevant weights to exactly zero",
          "is_correct": true
        },
        {
          "id": "ai-ml-4-b",
          "option_text": "Penalizing large weights proportionally to their square without zeroing",
          "is_correct": false
        },
        {
          "id": "ai-ml-4-c",
          "option_text": "Accelerating learning rate decay in stochastic gradient descent",
          "is_correct": false
        },
        {
          "id": "ai-ml-4-d",
          "option_text": "Normalizing input feature distributions across min-max bounds",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-5",
      "question_text": "In classification metrics, how is Recall (Sensitivity) mathematically formulated?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-5-a",
          "option_text": "TP / (TP + FN)",
          "is_correct": true
        },
        {
          "id": "ai-ml-5-b",
          "option_text": "TP / (TP + FP)",
          "is_correct": false
        },
        {
          "id": "ai-ml-5-c",
          "option_text": "(TP + TN) / Total",
          "is_correct": false
        },
        {
          "id": "ai-ml-5-d",
          "option_text": "2 * (Precision * Recall) / (Precision + Recall)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-6",
      "question_text": "Which metric represents the harmonic mean of Precision and Recall?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-6-a",
          "option_text": "F1-Score",
          "is_correct": true
        },
        {
          "id": "ai-ml-6-b",
          "option_text": "ROC-AUC",
          "is_correct": false
        },
        {
          "id": "ai-ml-6-c",
          "option_text": "Mean Absolute Error (MAE)",
          "is_correct": false
        },
        {
          "id": "ai-ml-6-d",
          "option_text": "Cohen Kappa",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-7",
      "question_text": "What happens in Gradient Descent if the learning rate (alpha) is configured excessively high?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-7-a",
          "option_text": "The optimization algorithm can overshoot the global minimum and diverge",
          "is_correct": true
        },
        {
          "id": "ai-ml-7-b",
          "option_text": "The model takes an excessively long time to converge to the local minimum",
          "is_correct": false
        },
        {
          "id": "ai-ml-7-c",
          "option_text": "The gradients will permanently shrink to zero",
          "is_correct": false
        },
        {
          "id": "ai-ml-7-d",
          "option_text": "The loss function will instantly evaluate to negative infinity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-8",
      "question_text": "Which splitting criterion is commonly utilized in CART Decision Trees to evaluate node purity?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-8-a",
          "option_text": "Gini Impurity",
          "is_correct": true
        },
        {
          "id": "ai-ml-8-b",
          "option_text": "Root Mean Squared Log Error",
          "is_correct": false
        },
        {
          "id": "ai-ml-8-c",
          "option_text": "Cosine Similarity",
          "is_correct": false
        },
        {
          "id": "ai-ml-8-d",
          "option_text": "Hamming Distance",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-9",
      "question_text": "How does Random Forest reduce model variance compared to individual decision trees?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-9-a",
          "option_text": "By aggregating predictions across decorrelated trees trained on bootstrap samples (Bagging)",
          "is_correct": true
        },
        {
          "id": "ai-ml-9-b",
          "option_text": "By sequentially fitting trees to the residuals of previous trees (Boosting)",
          "is_correct": false
        },
        {
          "id": "ai-ml-9-c",
          "option_text": "By pruning leaf nodes with high depth penalties",
          "is_correct": false
        },
        {
          "id": "ai-ml-9-d",
          "option_text": "By enforcing linear boundaries across all feature dimensions",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-10",
      "question_text": "Which ensemble method trains sequential weak learners where each subsequent tree corrects the residual errors of its predecessor?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-10-a",
          "option_text": "Gradient Boosting (e.g. XGBoost, LightGBM)",
          "is_correct": true
        },
        {
          "id": "ai-ml-10-b",
          "option_text": "Random Forest",
          "is_correct": false
        },
        {
          "id": "ai-ml-10-c",
          "option_text": "Extra Trees Classifier",
          "is_correct": false
        },
        {
          "id": "ai-ml-10-d",
          "option_text": "Voting Classifier with soft voting",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-11",
      "question_text": "What is the purpose of the \"Kernel Trick\" in Support Vector Machines (SVM)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-11-a",
          "option_text": "Implicitly mapping non-linear data into higher-dimensional space where it becomes linearly separable",
          "is_correct": true
        },
        {
          "id": "ai-ml-11-b",
          "option_text": "Accelerating disk I/O when loading large image datasets",
          "is_correct": false
        },
        {
          "id": "ai-ml-11-c",
          "option_text": "Encrypting support vector coordinates for privacy-preserving computation",
          "is_correct": false
        },
        {
          "id": "ai-ml-11-d",
          "option_text": "Normalizing feature matrices using fast GPU kernels",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-12",
      "question_text": "In K-Means clustering, what does the algorithm iteratively minimize?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-12-a",
          "option_text": "Inertia (Within-Cluster Sum of Squares)",
          "is_correct": true
        },
        {
          "id": "ai-ml-12-b",
          "option_text": "Mutual Information between clusters",
          "is_correct": false
        },
        {
          "id": "ai-ml-12-c",
          "option_text": "Silhouette coefficient across inter-cluster distances",
          "is_correct": false
        },
        {
          "id": "ai-ml-12-d",
          "option_text": "Kullback-Leibler divergence between sample distributions",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-13",
      "question_text": "Which clustering algorithm is capable of finding arbitrary shaped clusters and detecting outliers/noise points based on spatial density?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-13-a",
          "option_text": "DBSCAN",
          "is_correct": true
        },
        {
          "id": "ai-ml-13-b",
          "option_text": "K-Means",
          "is_correct": false
        },
        {
          "id": "ai-ml-13-c",
          "option_text": "Gaussian Mixture Models with spherical covariance",
          "is_correct": false
        },
        {
          "id": "ai-ml-13-d",
          "option_text": "Agglomerative Ward Hierarchical Clustering",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-14",
      "question_text": "What is the primary mathematical principle behind Principal Component Analysis (PCA)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-14-a",
          "option_text": "Eigenvalue decomposition of the covariance matrix to project data along axes of maximum variance",
          "is_correct": true
        },
        {
          "id": "ai-ml-14-b",
          "option_text": "Minimizing cross-entropy loss using backpropagation through time",
          "is_correct": false
        },
        {
          "id": "ai-ml-14-c",
          "option_text": "Maximizing class separation margin using Lagrange multipliers",
          "is_correct": false
        },
        {
          "id": "ai-ml-14-d",
          "option_text": "Clustering nearest neighbors using Euclidean distance metrics",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-15",
      "question_text": "Which fundamental calculus rule is used by the backpropagation algorithm to compute loss gradients with respect to neural network weights?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-15-a",
          "option_text": "The Chain Rule",
          "is_correct": true
        },
        {
          "id": "ai-ml-15-b",
          "option_text": "L'Hopital's Rule",
          "is_correct": false
        },
        {
          "id": "ai-ml-15-c",
          "option_text": "Taylor Series Expansion",
          "is_correct": false
        },
        {
          "id": "ai-ml-15-d",
          "option_text": "Integration by Parts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-16",
      "question_text": "Why does the Vanishing Gradient Problem predominantly occur in deep networks utilizing Sigmoid or Tanh activation functions?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-16-a",
          "option_text": "Their derivatives saturate and are bounded between 0 and 0.25, causing gradient products to diminish exponentially",
          "is_correct": true
        },
        {
          "id": "ai-ml-16-b",
          "option_text": "They produce discontinuous output jumps that disrupt numerical differentiation",
          "is_correct": false
        },
        {
          "id": "ai-ml-16-c",
          "option_text": "They require excessive matrix inversion steps on backward passes",
          "is_correct": false
        },
        {
          "id": "ai-ml-16-d",
          "option_text": "They prevent weights from taking negative values",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-17",
      "question_text": "In Convolutional Neural Networks (CNNs), what is the primary role of a Max Pooling layer?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-17-a",
          "option_text": "Downsampling feature map dimensions while preserving dominant spatial features and translation invariance",
          "is_correct": true
        },
        {
          "id": "ai-ml-17-b",
          "option_text": "Multiplying feature maps by learnable convolution kernels",
          "is_correct": false
        },
        {
          "id": "ai-ml-17-c",
          "option_text": "Normalizing activations to zero mean and unit variance",
          "is_correct": false
        },
        {
          "id": "ai-ml-17-d",
          "option_text": "Flattening multi-channel tensors into single dense vectors",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-18",
      "question_text": "What architectural innovation enables LSTMs and GRUs to model long-term sequential dependencies better than vanilla RNNs?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-18-a",
          "option_text": "Gating mechanisms (e.g. forget, input, and output gates) controlling information flow",
          "is_correct": true
        },
        {
          "id": "ai-ml-18-b",
          "option_text": "Replacing recurrent feedback loops with multi-head self-attention",
          "is_correct": false
        },
        {
          "id": "ai-ml-18-c",
          "option_text": "Using 2D spatial convolution filters over temporal tokens",
          "is_correct": false
        },
        {
          "id": "ai-ml-18-d",
          "option_text": "Enforcing orthogonal weight matrices on hidden states",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-19",
      "question_text": "In the Transformer architecture, what is the mathematical formula for Scaled Dot-Product Attention?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-19-a",
          "option_text": "softmax((Q * K^T) / sqrt(d_k)) * V",
          "is_correct": true
        },
        {
          "id": "ai-ml-19-b",
          "option_text": "sigmoid(Q * K) + V",
          "is_correct": false
        },
        {
          "id": "ai-ml-19-c",
          "option_text": "tanh((Q + K) / d_k) * V",
          "is_correct": false
        },
        {
          "id": "ai-ml-19-d",
          "option_text": "softmax(Q * V^T) / sqrt(d_k) * K",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-20",
      "question_text": "Which loss function is optimal when training a multi-class neural network classifier with mutually exclusive classes?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-20-a",
          "option_text": "Categorical Cross-Entropy",
          "is_correct": true
        },
        {
          "id": "ai-ml-20-b",
          "option_text": "Binary Cross-Entropy",
          "is_correct": false
        },
        {
          "id": "ai-ml-20-c",
          "option_text": "Mean Squared Error (MSE)",
          "is_correct": false
        },
        {
          "id": "ai-ml-20-d",
          "option_text": "Hinge Loss",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-21",
      "question_text": "What technique synthetically generates minority class examples along the line segments joining k-nearest neighbors to address class imbalance?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-21-a",
          "option_text": "SMOTE (Synthetic Minority Over-sampling Technique)",
          "is_correct": true
        },
        {
          "id": "ai-ml-21-b",
          "option_text": "Random Under-Sampling",
          "is_correct": false
        },
        {
          "id": "ai-ml-21-c",
          "option_text": "Stratified K-Fold Splitting",
          "is_correct": false
        },
        {
          "id": "ai-ml-21-d",
          "option_text": "Min-Max Normalization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-22",
      "question_text": "How does Standard Scaling (Z-Score Standardization) transform a numerical feature?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-22-a",
          "option_text": "Scales feature to have a mean of 0 and standard deviation of 1",
          "is_correct": true
        },
        {
          "id": "ai-ml-22-b",
          "option_text": "Bounds all values strictly between [0, 1]",
          "is_correct": false
        },
        {
          "id": "ai-ml-22-c",
          "option_text": "Transforms feature values into discrete quantiles",
          "is_correct": false
        },
        {
          "id": "ai-ml-22-d",
          "option_text": "Converts numerical continuous values into one-hot binary vectors",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-23",
      "question_text": "Why is One-Hot Encoding preferred over Label Encoding for nominal categorical variables (e.g. Country: India, USA, Germany)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-23-a",
          "option_text": "It prevents machine learning algorithms from inferring false ordinal/numerical hierarchy (e.g. 2 > 1)",
          "is_correct": true
        },
        {
          "id": "ai-ml-23-b",
          "option_text": "It reduces the dimensionality of the feature matrix",
          "is_correct": false
        },
        {
          "id": "ai-ml-23-c",
          "option_text": "It guarantees zero missing values in downstream models",
          "is_correct": false
        },
        {
          "id": "ai-ml-23-d",
          "option_text": "It forces all categorical probabilities to sum to 1.0",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-24",
      "question_text": "What does the Area Under the ROC Curve (ROC-AUC) measure across varying classification thresholds?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-24-a",
          "option_text": "The model's capability to discriminate between positive and negative classes (TPR vs FPR)",
          "is_correct": true
        },
        {
          "id": "ai-ml-24-b",
          "option_text": "The exact accuracy of the model on the test split",
          "is_correct": false
        },
        {
          "id": "ai-ml-24-c",
          "option_text": "The average training loss across all epochs",
          "is_correct": false
        },
        {
          "id": "ai-ml-24-d",
          "option_text": "The harmonic balance between precision and calibration",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-25",
      "question_text": "What does the \"Early Stopping\" regularization technique monitor to prevent neural network overfitting?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-25-a",
          "option_text": "Validation loss, halting training when validation performance ceases to improve",
          "is_correct": true
        },
        {
          "id": "ai-ml-25-b",
          "option_text": "GPU temperature and memory bandwidth limits",
          "is_correct": false
        },
        {
          "id": "ai-ml-25-c",
          "option_text": "Gradient norms, stopping when learning rates fall below threshold",
          "is_correct": false
        },
        {
          "id": "ai-ml-25-d",
          "option_text": "Training accuracy, terminating as soon as training error hits zero",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-26",
      "question_text": "What is the role of Batch Normalization in training deep neural networks?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-26-a",
          "option_text": "Stabilizing and accelerating training by normalizing layer inputs per mini-batch",
          "is_correct": true
        },
        {
          "id": "ai-ml-26-b",
          "option_text": "Converting floating point weights to 8-bit integers for mobile deployment",
          "is_correct": false
        },
        {
          "id": "ai-ml-26-c",
          "option_text": "Shuffling training data batches before each epoch",
          "is_correct": false
        },
        {
          "id": "ai-ml-26-d",
          "option_text": "Enforcing strict dropout on hidden layer activations",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-27",
      "question_text": "In Natural Language Processing, how do Word2Vec and GloVe represent words?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-27-a",
          "option_text": "As dense, low-dimensional continuous numerical vectors capturing semantic relationships",
          "is_correct": true
        },
        {
          "id": "ai-ml-27-b",
          "option_text": "As sparse high-dimensional bag-of-words boolean matrices",
          "is_correct": false
        },
        {
          "id": "ai-ml-27-c",
          "option_text": "As phonetic transcription strings based on IPA rules",
          "is_correct": false
        },
        {
          "id": "ai-ml-27-d",
          "option_text": "As encrypted hash tokens to ensure text privacy",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-28",
      "question_text": "In Reinforcement Learning, what equation expresses the value of a state as the immediate reward plus discounted future returns?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-28-a",
          "option_text": "Bellman Equation",
          "is_correct": true
        },
        {
          "id": "ai-ml-28-b",
          "option_text": "Euler-Lagrange Equation",
          "is_correct": false
        },
        {
          "id": "ai-ml-28-c",
          "option_text": "Navier-Stokes Equation",
          "is_correct": false
        },
        {
          "id": "ai-ml-28-d",
          "option_text": "Markov Transition Formula",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-29",
      "question_text": "What is the \"Curse of Dimensionality\" in machine learning?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-29-a",
          "option_text": "As feature dimensions increase, data becomes exponentially sparse and distances lose discriminative power",
          "is_correct": true
        },
        {
          "id": "ai-ml-29-b",
          "option_text": "Models become incapable of running on single CPU architectures",
          "is_correct": false
        },
        {
          "id": "ai-ml-29-c",
          "option_text": "Data storage requirements surpass standard database limits",
          "is_correct": false
        },
        {
          "id": "ai-ml-29-d",
          "option_text": "Feature correlations will always become perfectly collinear",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ai-ml-30",
      "question_text": "Which technique randomly drops neurons and their connections during neural network training to prevent feature co-adaptation?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ai-ml-30-a",
          "option_text": "Dropout",
          "is_correct": true
        },
        {
          "id": "ai-ml-30-b",
          "option_text": "Weight Decay",
          "is_correct": false
        },
        {
          "id": "ai-ml-30-c",
          "option_text": "Gradient Clipping",
          "is_correct": false
        },
        {
          "id": "ai-ml-30-d",
          "option_text": "Data Augmentation",
          "is_correct": false
        }
      ]
    }
  ],
  "full-stack-web-development": [
    {
      "id": "full-stack-web-development-1",
      "question_text": "What is the Virtual DOM in React, and why is it used?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-1-a",
          "option_text": "An in-memory lightweight representation of the real DOM used for fast diffing and batch updates",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-1-b",
          "option_text": "A browser API providing direct GPU acceleration for canvas elements",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-1-c",
          "option_text": "A server-side cache for caching raw HTML responses",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-1-d",
          "option_text": "A database shadow copy representing user sessions",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-2",
      "question_text": "In React, what is the behavior of useEffect when an empty dependency array ([]) is passed as the second argument?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-2-a",
          "option_text": "The effect runs once after the initial component mount",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-2-b",
          "option_text": "The effect runs after every single render and re-render",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-2-c",
          "option_text": "The effect never runs at all",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-2-d",
          "option_text": "The effect runs only when component props change",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-3",
      "question_text": "What is the key difference between useMemo and useCallback in React?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-3-a",
          "option_text": "useMemo memoizes a computed value; useCallback memoizes a function reference",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-3-b",
          "option_text": "useMemo is for asynchronous API calls; useCallback is for synchronous state updates",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-3-c",
          "option_text": "useMemo persists data to localStorage; useCallback persists data to cookies",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-3-d",
          "option_text": "useMemo binds event listeners; useCallback unbinds them on unmount",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-4",
      "question_text": "In the CSS Box Model, what is the correct order from inside to outside?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-4-a",
          "option_text": "Content -> Padding -> Border -> Margin",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-4-b",
          "option_text": "Content -> Border -> Padding -> Margin",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-4-c",
          "option_text": "Margin -> Border -> Padding -> Content",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-4-d",
          "option_text": "Content -> Margin -> Padding -> Border",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-5",
      "question_text": "In CSS Flexbox, which property aligns items along the cross axis?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-5-a",
          "option_text": "align-items",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-5-b",
          "option_text": "justify-content",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-5-c",
          "option_text": "flex-direction",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-5-d",
          "option_text": "align-content",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-6",
      "question_text": "How does the JavaScript Event Loop handle Promises (microtasks) compared to setTimeout (macrotasks)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-6-a",
          "option_text": "Microtasks queue is processed immediately after the current script, before any macrotask",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-6-b",
          "option_text": "Macrotasks always execute before microtasks",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-6-c",
          "option_text": "Both microtasks and macrotasks execute concurrently on separate OS threads",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-6-d",
          "option_text": "Promises are delegated to the browser worker pool and execute last",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-7",
      "question_text": "What is a JavaScript closure?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-7-a",
          "option_text": "A function bundled with references to its surrounding lexical environment",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-7-b",
          "option_text": "A method to forcibly terminate infinite while loops",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-7-c",
          "option_text": "A syntax for defining private class fields using the # prefix",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-7-d",
          "option_text": "An asynchronous callback executed when a network request completes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-8",
      "question_text": "What is the difference between \"let\" and \"var\" in JavaScript?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-8-a",
          "option_text": "\"let\" is block-scoped and temporal dead zone protected; \"var\" is function-scoped and hoisted",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-8-b",
          "option_text": "\"let\" cannot be reassigned; \"var\" can be reassigned",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-8-c",
          "option_text": "\"let\" is hoisted to window object; \"var\" is not hoisted",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-8-d",
          "option_text": "\"let\" only accepts string values; \"var\" accepts any data type",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-9",
      "question_text": "Which HTTP method should be used according to RESTful standards for idempotent full replacement of an existing resource?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-9-a",
          "option_text": "PUT",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-9-b",
          "option_text": "POST",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-9-c",
          "option_text": "PATCH",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-9-d",
          "option_text": "GET",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-10",
      "question_text": "What HTTP status code represents \"Unauthorized\" (meaning client authentication credentials are required or invalid)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-10-a",
          "option_text": "401",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-10-b",
          "option_text": "403",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-10-c",
          "option_text": "404",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-10-d",
          "option_text": "400",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-11",
      "question_text": "What security mechanism does CORS (Cross-Origin Resource Sharing) enforce?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-11-a",
          "option_text": "It restricts browsers from making cross-origin HTTP requests unless permitted by server headers",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-11-b",
          "option_text": "It encrypts database network traffic between backend servers and clients",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-11-c",
          "option_text": "It prevents users from taking screenshots inside web browsers",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-11-d",
          "option_text": "It enforces automatic password rotation on login forms",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-12",
      "question_text": "What are the three components of a JSON Web Token (JWT) separated by periods?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-12-a",
          "option_text": "Header, Payload, Signature",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-12-b",
          "option_text": "Header, Body, Encryption Key",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-12-c",
          "option_text": "Origin, Claims, Hash",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-12-d",
          "option_text": "TokenId, ClientSecret, Checksum",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-13",
      "question_text": "Why are authentication session cookies typically configured with the \"HttpOnly\" flag?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-13-a",
          "option_text": "To prevent client-side JavaScript from accessing the cookie, mitigating XSS token theft",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-13-b",
          "option_text": "To ensure the cookie is only transmitted over HTTPS encrypted connections",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-13-c",
          "option_text": "To restrict cookie transmission to top-level domain navigation",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-13-d",
          "option_text": "To compress cookie payload size for faster transmission",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-14",
      "question_text": "How does Node.js achieve high concurrency despite being single-threaded for JavaScript execution?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-14-a",
          "option_text": "Via an event-driven non-blocking I/O model supported by the libuv C++ thread pool",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-14-b",
          "option_text": "By spinning up a new OS process for every incoming HTTP request",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-14-c",
          "option_text": "By executing JavaScript bytecode directly on GPU shaders",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-14-d",
          "option_text": "By disabling asynchronous event handling entirely",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-15",
      "question_text": "In Express.js, what is the role of the \"next()\" parameter in middleware functions?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-15-a",
          "option_text": "Passes control to the next middleware function in the request-response cycle",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-15-b",
          "option_text": "Sends the final JSON response to the client",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-15-c",
          "option_text": "Restarts the Express HTTP server process",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-15-d",
          "option_text": "Rolls back the active database transaction",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-16",
      "question_text": "What is the primary benefit of adding a B-Tree index to a database column?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-16-a",
          "option_text": "Dramatically accelerates SELECT query filtering and sorting at the cost of slower writes",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-16-b",
          "option_text": "Ensures the column can only store non-null unique values",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-16-c",
          "option_text": "Compresses database table size on physical hard drives",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-16-d",
          "option_text": "Encrypts column data with AES-256 at rest",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-17",
      "question_text": "What is the difference between SQL INNER JOIN and LEFT JOIN?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-17-a",
          "option_text": "INNER JOIN returns rows matching both tables; LEFT JOIN returns all left rows plus matched right rows",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-17-b",
          "option_text": "INNER JOIN returns all rows from both tables; LEFT JOIN returns only rows from left table",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-17-c",
          "option_text": "INNER JOIN is only for primary keys; LEFT JOIN is for foreign keys",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-17-d",
          "option_text": "LEFT JOIN eliminates duplicate columns while INNER JOIN duplicates them",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-18",
      "question_text": "What is Server-Side Rendering (SSR) in frameworks like Next.js, and what is its primary benefit?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-18-a",
          "option_text": "Pre-rendering HTML on the server for each request, delivering faster FCP and better SEO",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-18-b",
          "option_text": "Executing all database queries on client browsers via WebAssembly",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-18-c",
          "option_text": "Compiling React components into native desktop C++ binaries",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-18-d",
          "option_text": "Generating static HTML files only once at build time without dynamic server computation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-19",
      "question_text": "What technology provides full-duplex, persistent bidirectional communication between client and server over a single TCP connection?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-19-a",
          "option_text": "WebSockets",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-19-b",
          "option_text": "HTTP Short Polling",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-19-c",
          "option_text": "Server-Sent Events (SSE)",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-19-d",
          "option_text": "REST Webhooks",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-20",
      "question_text": "What is the purpose of the CSS property \"box-sizing: border-box\"?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-20-a",
          "option_text": "Includes padding and border within the specified width and height of an element",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-20-b",
          "option_text": "Excludes margins from calculations of parent container width",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-20-c",
          "option_text": "Forces all child elements to display as inline blocks",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-20-d",
          "option_text": "Adds a drop shadow around the element border automatically",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-21",
      "question_text": "What does the \"useCallback\" hook return in React?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-21-a",
          "option_text": "A memoized version of the callback function that only changes if dependencies change",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-21-b",
          "option_text": "The returned value of executing the callback function",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-21-c",
          "option_text": "A Promise resolving when the callback finishes execution",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-21-d",
          "option_text": "A ref pointer attached to the DOM node",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-22",
      "question_text": "What is the purpose of React Portal (ReactDOM.createPortal)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-22-a",
          "option_text": "Rendering children into a DOM node that exists outside the DOM hierarchy of parent component",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-22-b",
          "option_text": "Establishing WebRTC peer-to-peer data channels between browsers",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-22-c",
          "option_text": "Transferring state between two isolated React root applications",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-22-d",
          "option_text": "Lazy-loading heavy components over dynamic network imports",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-23",
      "question_text": "In Node.js, what does the \"EventEmitter\" pattern allow objects to do?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-23-a",
          "option_text": "Emit named events that cause previously registered listener functions to be called",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-23-b",
          "option_text": "Write unbuffered binary data directly to disk blocks",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-23-c",
          "option_text": "Share RAM memory heap across multiple worker threads",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-23-d",
          "option_text": "Proxy incoming TCP sockets to remote DNS hostnames",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-24",
      "question_text": "What is SQL Injection (SQLi) and how is it reliably prevented in full-stack applications?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-24-a",
          "option_text": "Malicious SQL injected via user input; prevented by using parameterized queries / prepared statements",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-24-b",
          "option_text": "Injecting JavaScript into DOM; prevented by setting HttpOnly cookies",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-24-c",
          "option_text": "Overwhelming database server with connections; prevented by connection pooling",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-24-d",
          "option_text": "Stealing session tokens from memory; prevented by SSL encryption",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-25",
      "question_text": "What does the JavaScript \"=== \" (strict equality) operator check compared to \"==\" (loose equality)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-25-a",
          "option_text": "Checks both value and data type without performing type coercion",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-25-b",
          "option_text": "Performs automatic type conversion before comparing values",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-25-c",
          "option_text": "Checks whether two objects have identical memory references only",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-25-d",
          "option_text": "Checks whether strings match case-insensitively",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-26",
      "question_text": "What is the role of a Service Worker in Progressive Web Applications (PWA)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-26-a",
          "option_text": "Runs in background intercepting network requests to enable offline caching and push notifications",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-26-b",
          "option_text": "Manages database migrations on backend servers",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-26-c",
          "option_text": "Handles CSS animations and 3D WebGL rendering threads",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-26-d",
          "option_text": "Compiles TypeScript into minified JavaScript bundles",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-27",
      "question_text": "In relational databases, what does the ACID acronym stand for?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-27-a",
          "option_text": "Atomicity, Consistency, Isolation, Durability",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-27-b",
          "option_text": "Asynchronous, Concurrent, Indexed, Distributed",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-27-c",
          "option_text": "Aggregation, Cache, Integrity, Delivery",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-27-d",
          "option_text": "Authentication, Confidentiality, Identity, Decryption",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-28",
      "question_text": "What is the purpose of the HTML5 semantic tag <main>?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-28-a",
          "option_text": "Specifies the unique dominant content of the document body",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-28-b",
          "option_text": "Contains site-wide navigation links and menu items",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-28-c",
          "option_text": "Houses introductory banner content and logo images",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-28-d",
          "option_text": "Defines tangential sidebar content related to the page",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-29",
      "question_text": "How does CSS Grid differ fundamentally from CSS Flexbox?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-29-a",
          "option_text": "Grid is two-dimensional (rows and columns); Flexbox is one-dimensional (row or column)",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-29-b",
          "option_text": "Grid only works with fixed pixel sizes; Flexbox works with percentages",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-29-c",
          "option_text": "Grid is deprecated in modern browsers; Flexbox is the replacement",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-29-d",
          "option_text": "Grid is only for typography layouts; Flexbox is for layout containers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "full-stack-web-development-30",
      "question_text": "What is Code Splitting in modern frontend bundlers (e.g. Vite, Webpack)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "full-stack-web-development-30-a",
          "option_text": "Splitting bundle into smaller chunks loaded on-demand to reduce initial page load time",
          "is_correct": true
        },
        {
          "id": "full-stack-web-development-30-b",
          "option_text": "Formatting code according to Prettier formatting rules",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-30-c",
          "option_text": "Separating HTML, CSS, and JavaScript into three isolated files",
          "is_correct": false
        },
        {
          "id": "full-stack-web-development-30-d",
          "option_text": "Compiling code into separate binaries for different OS platforms",
          "is_correct": false
        }
      ]
    }
  ],
  "python-programming": [
    {
      "id": "python-programming-1",
      "question_text": "What is the output of print(type(5 / 2)) in Python 3?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-1-a",
          "option_text": "<class 'float'>",
          "is_correct": true
        },
        {
          "id": "python-programming-1-b",
          "option_text": "<class 'int'>",
          "is_correct": false
        },
        {
          "id": "python-programming-1-c",
          "option_text": "<class 'double'>",
          "is_correct": false
        },
        {
          "id": "python-programming-1-d",
          "option_text": "<class 'number'>",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-2",
      "question_text": "Which of the following data types in Python is immutable?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-2-a",
          "option_text": "Tuple",
          "is_correct": true
        },
        {
          "id": "python-programming-2-b",
          "option_text": "List",
          "is_correct": false
        },
        {
          "id": "python-programming-2-c",
          "option_text": "Dictionary",
          "is_correct": false
        },
        {
          "id": "python-programming-2-d",
          "option_text": "Set",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-3",
      "question_text": "What keyword is used to define an anonymous function in Python?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-3-a",
          "option_text": "lambda",
          "is_correct": true
        },
        {
          "id": "python-programming-3-b",
          "option_text": "def",
          "is_correct": false
        },
        {
          "id": "python-programming-3-c",
          "option_text": "func",
          "is_correct": false
        },
        {
          "id": "python-programming-3-d",
          "option_text": "inline",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-4",
      "question_text": "What does the *args parameter represent in a Python function definition?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-4-a",
          "option_text": "Variable length non-keyword positional arguments as a tuple",
          "is_correct": true
        },
        {
          "id": "python-programming-4-b",
          "option_text": "Keyword arguments dictionary",
          "is_correct": false
        },
        {
          "id": "python-programming-4-c",
          "option_text": "Default arguments list",
          "is_correct": false
        },
        {
          "id": "python-programming-4-d",
          "option_text": "Pointer to a tuple",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-5",
      "question_text": "What is the average time complexity of looking up a key in a standard Python dictionary?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-5-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "python-programming-5-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "python-programming-5-c",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "python-programming-5-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-6",
      "question_text": "What is the Global Interpreter Lock (GIL) in CPython?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-6-a",
          "option_text": "A mutex that prevents multiple native threads from executing Python bytecodes at once",
          "is_correct": true
        },
        {
          "id": "python-programming-6-b",
          "option_text": "A security lock that encrypts Python scripts at runtime",
          "is_correct": false
        },
        {
          "id": "python-programming-6-c",
          "option_text": "A memory manager that locks unused RAM blocks",
          "is_correct": false
        },
        {
          "id": "python-programming-6-d",
          "option_text": "A compiler pass that prevents global variables from mutation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-7",
      "question_text": "What is the difference between the \"is\" operator and the \"==\" operator in Python?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-7-a",
          "option_text": "\"is\" checks object identity (same memory address); \"==\" checks value equality",
          "is_correct": true
        },
        {
          "id": "python-programming-7-b",
          "option_text": "\"is\" checks value equality; \"==\" checks identity",
          "is_correct": false
        },
        {
          "id": "python-programming-7-c",
          "option_text": "\"is\" converts types; \"==\" does not convert types",
          "is_correct": false
        },
        {
          "id": "python-programming-7-d",
          "option_text": "\"is\" is used only for strings; \"==\" is used for numbers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-8",
      "question_text": "Which built-in Python method is called to initialize a newly created class instance?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-8-a",
          "option_text": "__init__",
          "is_correct": true
        },
        {
          "id": "python-programming-8-b",
          "option_text": "__new__",
          "is_correct": false
        },
        {
          "id": "python-programming-8-c",
          "option_text": "__construct__",
          "is_correct": false
        },
        {
          "id": "python-programming-8-d",
          "option_text": "__start__",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-9",
      "question_text": "What does the \"yield\" keyword do inside a Python function?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-9-a",
          "option_text": "Turns the function into a generator that yields values lazily on-demand",
          "is_correct": true
        },
        {
          "id": "python-programming-9-b",
          "option_text": "Terminates function execution and returns an error code",
          "is_correct": false
        },
        {
          "id": "python-programming-9-c",
          "option_text": "Forces the CPU to pause execution for 100 milliseconds",
          "is_correct": false
        },
        {
          "id": "python-programming-9-d",
          "option_text": "Converts local variables into global variables",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-10",
      "question_text": "What is the primary benefit of using a Python Context Manager with the \"with\" statement?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-10-a",
          "option_text": "Guarantees resource cleanup (e.g. closing files or connections) even if exceptions occur",
          "is_correct": true
        },
        {
          "id": "python-programming-10-b",
          "option_text": "Accelerates function execution by caching return values",
          "is_correct": false
        },
        {
          "id": "python-programming-10-c",
          "option_text": "Allows multiple threads to access shared memory simultaneously",
          "is_correct": false
        },
        {
          "id": "python-programming-10-d",
          "option_text": "Bypasses the Python Global Interpreter Lock",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-11",
      "question_text": "What is the result of list(range(1, 10, 2)) in Python?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-11-a",
          "option_text": "[1, 3, 5, 7, 9]",
          "is_correct": true
        },
        {
          "id": "python-programming-11-b",
          "option_text": "[1, 2, 4, 6, 8]",
          "is_correct": false
        },
        {
          "id": "python-programming-11-c",
          "option_text": "[2, 4, 6, 8, 10]",
          "is_correct": false
        },
        {
          "id": "python-programming-11-d",
          "option_text": "[1, 3, 5, 7, 9, 10]",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-12",
      "question_text": "What is the difference between shallow copy (copy.copy) and deep copy (copy.deepcopy)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-12-a",
          "option_text": "Shallow copy copies the outer container referencing nested objects; deep copy recursively copies all nested objects",
          "is_correct": true
        },
        {
          "id": "python-programming-12-b",
          "option_text": "Shallow copy copies strings; deep copy copies numbers",
          "is_correct": false
        },
        {
          "id": "python-programming-12-c",
          "option_text": "Shallow copy works on tuples; deep copy works on lists",
          "is_correct": false
        },
        {
          "id": "python-programming-12-d",
          "option_text": "Shallow copy writes to disk; deep copy writes to RAM",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-13",
      "question_text": "Which Python collection type stores unique, unordered, and hashable elements?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-13-a",
          "option_text": "set",
          "is_correct": true
        },
        {
          "id": "python-programming-13-b",
          "option_text": "list",
          "is_correct": false
        },
        {
          "id": "python-programming-13-c",
          "option_text": "dict",
          "is_correct": false
        },
        {
          "id": "python-programming-13-d",
          "option_text": "tuple",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-14",
      "question_text": "In Python, what algorithm is used by the Method Resolution Order (MRO) for multiple inheritance?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-14-a",
          "option_text": "C3 Linearization",
          "is_correct": true
        },
        {
          "id": "python-programming-14-b",
          "option_text": "Depth-First Search (DFS)",
          "is_correct": false
        },
        {
          "id": "python-programming-14-c",
          "option_text": "Breadth-First Search (BFS)",
          "is_correct": false
        },
        {
          "id": "python-programming-14-d",
          "option_text": "Dijkstra Algorithm",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-15",
      "question_text": "What is the purpose of functools.wraps when writing Python decorators?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-15-a",
          "option_text": "Preserves the original function name, docstring, and metadata on the decorated wrapper",
          "is_correct": true
        },
        {
          "id": "python-programming-15-b",
          "option_text": "Converts synchronous functions into asynchronous coroutines",
          "is_correct": false
        },
        {
          "id": "python-programming-15-c",
          "option_text": "Compiles the function into native C machine code",
          "is_correct": false
        },
        {
          "id": "python-programming-15-d",
          "option_text": "Encrypts the source code of the wrapped function",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-16",
      "question_text": "How does Python handle memory management and cleanup of unreferenced objects?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-16-a",
          "option_text": "Automatic Reference Counting combined with a cyclic generational Garbage Collector",
          "is_correct": true
        },
        {
          "id": "python-programming-16-b",
          "option_text": "Manual free() calls required by developers",
          "is_correct": false
        },
        {
          "id": "python-programming-16-c",
          "option_text": "Linear sweep garbage collection at application exit only",
          "is_correct": false
        },
        {
          "id": "python-programming-16-d",
          "option_text": "Allocating memory solely on the CPU L1 cache",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-17",
      "question_text": "What does a list comprehension [x for x in range(10) if x % 2 == 0] produce?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-17-a",
          "option_text": "[0, 2, 4, 6, 8]",
          "is_correct": true
        },
        {
          "id": "python-programming-17-b",
          "option_text": "[2, 4, 6, 8, 10]",
          "is_correct": false
        },
        {
          "id": "python-programming-17-c",
          "option_text": "[1, 3, 5, 7, 9]",
          "is_correct": false
        },
        {
          "id": "python-programming-17-d",
          "option_text": "[0, 1, 2, 3, 4]",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-18",
      "question_text": "What does the built-in enumerate() function return when iterating over an iterable?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-18-a",
          "option_text": "Pairs of (index, item) for each element in the iterable",
          "is_correct": true
        },
        {
          "id": "python-programming-18-b",
          "option_text": "A sorted duplicate list of the iterable",
          "is_correct": false
        },
        {
          "id": "python-programming-18-c",
          "option_text": "A reversed list of elements",
          "is_correct": false
        },
        {
          "id": "python-programming-18-d",
          "option_text": "The total count of items in the iterable",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-19",
      "question_text": "In Python exception handling, when does the \"else\" block execute?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-19-a",
          "option_text": "Only if no exception was raised inside the try block",
          "is_correct": true
        },
        {
          "id": "python-programming-19-b",
          "option_text": "Always, right before the finally block",
          "is_correct": false
        },
        {
          "id": "python-programming-19-c",
          "option_text": "Only if an exception was caught by except",
          "is_correct": false
        },
        {
          "id": "python-programming-19-d",
          "option_text": "When the script encounters an unhandled warning",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-20",
      "question_text": "What does the __str__() magic method return compared to __repr__()?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-20-a",
          "option_text": "__str__ returns a user-friendly readable string; __repr__ returns an unambiguous official string for debugging",
          "is_correct": true
        },
        {
          "id": "python-programming-20-b",
          "option_text": "__str__ returns integer hash; __repr__ returns string",
          "is_correct": false
        },
        {
          "id": "python-programming-20-c",
          "option_text": "__str__ prints to console; __repr__ writes to file",
          "is_correct": false
        },
        {
          "id": "python-programming-20-d",
          "option_text": "__str__ is for numbers; __repr__ is for text",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-21",
      "question_text": "What decorator defines a method that receives the class (cls) as its first implicit argument rather than an instance (self)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-21-a",
          "option_text": "@classmethod",
          "is_correct": true
        },
        {
          "id": "python-programming-21-b",
          "option_text": "@staticmethod",
          "is_correct": false
        },
        {
          "id": "python-programming-21-c",
          "option_text": "@property",
          "is_correct": false
        },
        {
          "id": "python-programming-21-d",
          "option_text": "@abstractmethod",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-22",
      "question_text": "What does collections.defaultdict do when a non-existent key is queried?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-22-a",
          "option_text": "Automatically initializes the key with a default value provided by a factory function without raising KeyError",
          "is_correct": true
        },
        {
          "id": "python-programming-22-b",
          "option_text": "Raises a KeyError exception immediately",
          "is_correct": false
        },
        {
          "id": "python-programming-22-c",
          "option_text": "Deletes the dictionary from memory",
          "is_correct": false
        },
        {
          "id": "python-programming-22-d",
          "option_text": "Returns None without modifying the dictionary",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-23",
      "question_text": "In Python, what is the output of bool([])?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-23-a",
          "option_text": "False",
          "is_correct": true
        },
        {
          "id": "python-programming-23-b",
          "option_text": "True",
          "is_correct": false
        },
        {
          "id": "python-programming-23-c",
          "option_text": "None",
          "is_correct": false
        },
        {
          "id": "python-programming-23-d",
          "option_text": "SyntaxError",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-24",
      "question_text": "What does the zip() function do when passed iterables of unequal length?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-24-a",
          "option_text": "Stops iterating when the shortest input iterable is exhausted",
          "is_correct": true
        },
        {
          "id": "python-programming-24-b",
          "option_text": "Fills missing values with None automatically",
          "is_correct": false
        },
        {
          "id": "python-programming-24-c",
          "option_text": "Raises a ValueError exception by default",
          "is_correct": false
        },
        {
          "id": "python-programming-24-d",
          "option_text": "Loops through the shorter iterable continuously",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-25",
      "question_text": "What module provides asynchronous event loop and coroutines in standard Python?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-25-a",
          "option_text": "asyncio",
          "is_correct": true
        },
        {
          "id": "python-programming-25-b",
          "option_text": "threading",
          "is_correct": false
        },
        {
          "id": "python-programming-25-c",
          "option_text": "multiprocessing",
          "is_correct": false
        },
        {
          "id": "python-programming-25-d",
          "option_text": "concurrent.futures",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-26",
      "question_text": "What does the \"pass\" statement do in Python?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-26-a",
          "option_text": "A null statement that executes and does nothing, used as a syntactic placeholder",
          "is_correct": true
        },
        {
          "id": "python-programming-26-b",
          "option_text": "Exits the enclosing loop immediately",
          "is_correct": false
        },
        {
          "id": "python-programming-26-c",
          "option_text": "Skips to the next iteration of the loop",
          "is_correct": false
        },
        {
          "id": "python-programming-26-d",
          "option_text": "Raises a StopIteration exception",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-27",
      "question_text": "What is the syntax for creating an f-string in Python 3.6+?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-27-a",
          "option_text": "f\"Value is {var}\"",
          "is_correct": true
        },
        {
          "id": "python-programming-27-b",
          "option_text": "format(\"Value is %s\", var)",
          "is_correct": false
        },
        {
          "id": "python-programming-27-c",
          "option_text": "\"Value is {0}\".format(var)",
          "is_correct": false
        },
        {
          "id": "python-programming-27-d",
          "option_text": "s\"Value is $(var)\"",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-28",
      "question_text": "What does the __all__ list inside a Python package __init__.py file define?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-28-a",
          "option_text": "The list of public module names exported when \"from package import *\" is used",
          "is_correct": true
        },
        {
          "id": "python-programming-28-b",
          "option_text": "All external pip dependencies required by the package",
          "is_correct": false
        },
        {
          "id": "python-programming-28-c",
          "option_text": "The author and license information for PyPI",
          "is_correct": false
        },
        {
          "id": "python-programming-28-d",
          "option_text": "The list of test cases to execute on pytest",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-29",
      "question_text": "How does Python evaluate round(2.5) and round(3.5)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-29-a",
          "option_text": "2 and 4 (Banker's Rounding / round half to even)",
          "is_correct": true
        },
        {
          "id": "python-programming-29-b",
          "option_text": "3 and 4 (Standard arithmetic rounding)",
          "is_correct": false
        },
        {
          "id": "python-programming-29-c",
          "option_text": "2 and 3 (Truncating towards zero)",
          "is_correct": false
        },
        {
          "id": "python-programming-29-d",
          "option_text": "3 and 3 (Ceiling rounding)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "python-programming-30",
      "question_text": "Which data structure from the collections module implements a double-ended queue with O(1) appends and pops from both ends?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "python-programming-30-a",
          "option_text": "deque",
          "is_correct": true
        },
        {
          "id": "python-programming-30-b",
          "option_text": "OrderedDict",
          "is_correct": false
        },
        {
          "id": "python-programming-30-c",
          "option_text": "ChainMap",
          "is_correct": false
        },
        {
          "id": "python-programming-30-d",
          "option_text": "Counter",
          "is_correct": false
        }
      ]
    }
  ],
  "java-backend-architecture": [
    {
      "id": "java-backend-architecture-1",
      "question_text": "In the Java Virtual Machine (JVM), where are object instances and arrays allocated?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-1-a",
          "option_text": "Heap Memory",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-1-b",
          "option_text": "Stack Memory",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-1-c",
          "option_text": "Method Area",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-1-d",
          "option_text": "PC Register",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-2",
      "question_text": "Starting from Java 8, what types of concrete methods can be declared inside an Interface?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-2-a",
          "option_text": "default and static methods",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-2-b",
          "option_text": "private synchronized methods only",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-2-c",
          "option_text": "final abstract methods only",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-2-d",
          "option_text": "native constructor methods",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-3",
      "question_text": "What is the key difference between String and StringBuilder in Java?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-3-a",
          "option_text": "String is immutable; StringBuilder is mutable and faster for frequent concatenations",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-3-b",
          "option_text": "String is mutable; StringBuilder is immutable",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-3-c",
          "option_text": "String is thread-safe; StringBuilder is synchronized",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-3-d",
          "option_text": "String stores bytes; StringBuilder stores integers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-4",
      "question_text": "What is the fundamental difference between HashMap and Hashtable in Java?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-4-a",
          "option_text": "HashMap is unsynchronized and allows one null key; Hashtable is synchronized and permits no null keys",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-4-b",
          "option_text": "HashMap is thread-safe; Hashtable is not thread-safe",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-4-c",
          "option_text": "HashMap is ordered; Hashtable is sorted by keys",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-4-d",
          "option_text": "HashMap stores primitives; Hashtable stores objects",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-5",
      "question_text": "What is the difference between method Overloading and method Overriding in Java?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-5-a",
          "option_text": "Overloading has same name with different parameter signatures in the same class; Overriding redefines superclass method in subclass",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-5-b",
          "option_text": "Overloading occurs at runtime; Overriding occurs at compile-time",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-5-c",
          "option_text": "Overloading requires the @Override annotation; Overriding does not",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-5-d",
          "option_text": "Overloading is for static methods only; Overriding is for private methods only",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-6",
      "question_text": "In Spring Boot, what does the @RestController annotation combine?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-6-a",
          "option_text": "@Controller and @ResponseBody",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-6-b",
          "option_text": "@Controller and @Service",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-6-c",
          "option_text": "@Component and @Repository",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-6-d",
          "option_text": "@Service and @Autowired",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-7",
      "question_text": "What is the default bean scope in the Spring Framework IoC Container?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-7-a",
          "option_text": "Singleton",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-7-b",
          "option_text": "Prototype",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-7-c",
          "option_text": "Request",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-7-d",
          "option_text": "Session",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-8",
      "question_text": "What does the @SpringBootApplication annotation encapsulate?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-8-a",
          "option_text": "@Configuration, @EnableAutoConfiguration, and @ComponentScan",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-8-b",
          "option_text": "@Service, @Repository, and @Controller",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-8-c",
          "option_text": "@Entity, @Table, and @Id",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-8-d",
          "option_text": "@Component, @Scope, and @Lazy",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-9",
      "question_text": "What is the purpose of the \"volatile\" keyword in Java multithreading?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-9-a",
          "option_text": "Guarantees that updates to a variable are immediately visible to all threads by reading from main memory",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-9-b",
          "option_text": "Locks the object monitor preventing concurrent access",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-9-c",
          "option_text": "Prevents the variable from being serialized to disk",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-9-d",
          "option_text": "Ensures the variable cannot be modified after initialization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-10",
      "question_text": "What is the difference between ArrayList and LinkedList in Java?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-10-a",
          "option_text": "ArrayList uses a dynamic resizable array (O(1) random access); LinkedList uses a doubly-linked list (O(1) insertions at ends)",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-10-b",
          "option_text": "ArrayList is synchronized; LinkedList is unsynchronized",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-10-c",
          "option_text": "ArrayList cannot store duplicates; LinkedList can store duplicates",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-10-d",
          "option_text": "ArrayList is for primitive types; LinkedList is for reference types",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-11",
      "question_text": "Which interface in Java is used to define the natural ordering of objects via the compareTo() method?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-11-a",
          "option_text": "Comparable",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-11-b",
          "option_text": "Comparator",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-11-c",
          "option_text": "Cloneable",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-11-d",
          "option_text": "Serializable",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-12",
      "question_text": "What are Checked Exceptions in Java?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-12-a",
          "option_text": "Exceptions that inherit from Exception (excluding RuntimeException) and must be handled or declared in throws clause",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-12-b",
          "option_text": "Exceptions that inherit directly from Error and cause JVM termination",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-12-c",
          "option_text": "Exceptions that only occur during unit test execution",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-12-d",
          "option_text": "Exceptions that inherit from RuntimeException and are unchecked at compile-time",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-13",
      "question_text": "What is Inversion of Control (IoC) in the Spring Framework?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-13-a",
          "option_text": "The framework manages object creation and lifecycle, injecting dependencies rather than objects instantiating them",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-13-b",
          "option_text": "Reversing the flow of TCP network packets",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-13-c",
          "option_text": "Inverting the inheritance hierarchy between classes and interfaces",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-13-d",
          "option_text": "Compiling Java bytecode directly into C++ source code",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-14",
      "question_text": "What does the @Transactional annotation in Spring manage?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-14-a",
          "option_text": "Automatic transaction demarcation (commit on success, rollback on RuntimeException)",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-14-b",
          "option_text": "Encrypting database columns during persistence",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-14-c",
          "option_text": "Rate limiting incoming HTTP requests",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-14-d",
          "option_text": "Logging SQL query latency to console",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-15",
      "question_text": "What is the purpose of Optional<T> introduced in Java 8?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-15-a",
          "option_text": "To provide a type-level representation of a value that may or may not be present, reducing NullPointerExceptions",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-15-b",
          "option_text": "To make method parameters optional in function calls",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-15-c",
          "option_text": "To enable optional multithreading execution",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-15-d",
          "option_text": "To define optional dependencies in Maven pom.xml",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-16",
      "question_text": "What is the difference between Hibernate First-Level (L1) and Second-Level (L2) Cache?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-16-a",
          "option_text": "L1 Cache is session-scoped (enabled by default); L2 Cache is SessionFactory-scoped across sessions (optional, shared)",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-16-b",
          "option_text": "L1 Cache stores data in Redis; L2 Cache stores data in RAM",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-16-c",
          "option_text": "L1 Cache is for MongoDB; L2 Cache is for PostgreSQL",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-16-d",
          "option_text": "L1 Cache is client-side; L2 Cache is server-side",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-17",
      "question_text": "How does Spring Data JPA generate SQL queries when using repository interface method names like findByEmailAndStatus(String email, String status)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-17-a",
          "option_text": "Parses method naming conventions using reflection and dynamically derives the JPQL/SQL query",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-17-b",
          "option_text": "Requires raw SQL string annotations on all repository methods",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-17-c",
          "option_text": "Compiles method names into stored procedures on database boot",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-17-d",
          "option_text": "Executes a full table scan and filters records in JVM memory",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-18",
      "question_text": "What is Type Erasure in Java Generics?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-18-a",
          "option_text": "The compiler strips all generic type parameter information at compile time, replacing with bounds/Object for bytecode backward compatibility",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-18-b",
          "option_text": "A runtime exception thrown when casting incompatible types",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-18-c",
          "option_text": "Erasing unused class definitions during garbage collection",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-18-d",
          "option_text": "A garbage collection phase that clears static variable memory",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-19",
      "question_text": "What is the ExecutorService in java.util.concurrent?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-19-a",
          "option_text": "A high-level framework that manages thread pools and asynchronous task execution lifecycle",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-19-b",
          "option_text": "A low-level operating system scheduler hook",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-19-c",
          "option_text": "A tool for compiling Java source code in parallel",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-19-d",
          "option_text": "A garbage collection thread monitor",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-20",
      "question_text": "Which annotation in Spring Boot is used to extract a variable from the URI path (e.g. /users/{id})?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-20-a",
          "option_text": "@PathVariable",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-20-b",
          "option_text": "@RequestParam",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-20-c",
          "option_text": "@RequestBody",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-20-d",
          "option_text": "@RequestHeader",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-21",
      "question_text": "What is the contract between equals() and hashCode() in Java?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-21-a",
          "option_text": "If two objects are equal according to equals(), they must produce the same hashCode() integer",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-21-b",
          "option_text": "If two objects have the same hashCode(), they must always be equal according to equals()",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-21-c",
          "option_text": "hashCode() must return a unique integer for every distinct object in memory",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-21-d",
          "option_text": "equals() and hashCode() are completely independent with no contractual requirement",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-22",
      "question_text": "In Spring Framework, how does Dependency Injection via constructor compare to field injection with @Autowired?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-22-a",
          "option_text": "Constructor injection is preferred because it enables immutability (final fields) and simplifies unit testing without mocking framework",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-22-b",
          "option_text": "Field injection is faster at runtime than constructor injection",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-22-c",
          "option_text": "Constructor injection is deprecated in Spring Boot 3",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-22-d",
          "option_text": "Field injection is the only way to inject circular dependencies",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-23",
      "question_text": "What does the finalize() method do in Java, and why is it deprecated in modern Java versions?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-23-a",
          "option_text": "Called by garbage collector before object reclamation; deprecated due to unpredictable timing, performance issues, and deadlocks",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-23-b",
          "option_text": "Finalizes class bytecode compilation; deprecated in favor of GraalVM",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-23-c",
          "option_text": "Closes database sockets automatically; deprecated for try-with-resources",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-23-d",
          "option_text": "Prevents classes from being extended; deprecated for sealed classes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-24",
      "question_text": "Which garbage collector was introduced as the default low-pause collector in Java 9+?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-24-a",
          "option_text": "G1 (Garbage-First) GC",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-24-b",
          "option_text": "Serial GC",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-24-c",
          "option_text": "Parallel GC",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-24-d",
          "option_text": "CMS (Concurrent Mark Sweep) GC",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-25",
      "question_text": "What are Java 14+ Records (record Keyword)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-25-a",
          "option_text": "Immutable data carrier classes with auto-generated constructor, getters, equals(), hashCode(), and toString()",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-25-b",
          "option_text": "Database row representations that automatically sync with SQL tables",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-25-c",
          "option_text": "Classes specifically designed for logging telemetry records to disk",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-25-d",
          "option_text": "Mutable structures that bypass heap memory allocation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-26",
      "question_text": "What is Spring Cloud Eureka used for in a microservices architecture?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-26-a",
          "option_text": "Service Registration and Service Discovery",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-26-b",
          "option_text": "Distributed transaction coordinator",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-26-c",
          "option_text": "Centralized API rate limiting gateway",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-26-d",
          "option_text": "Cloud storage bucket synchronization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-27",
      "question_text": "What is the purpose of the Java Stream.map() operation?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-27-a",
          "option_text": "An intermediate operation that transforms each element of the stream by applying a function",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-27-b",
          "option_text": "A terminal operation that converts the stream into a java.util.Map",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-27-c",
          "option_text": "A filtering operation that drops null values",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-27-d",
          "option_text": "A reduction operation calculating the sum of elements",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-28",
      "question_text": "What is the difference between fail-fast and fail-safe iterators in Java collections?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-28-a",
          "option_text": "Fail-fast throws ConcurrentModificationException if collection is modified during iteration; fail-safe iterates over a copy",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-28-b",
          "option_text": "Fail-fast continues iterating on errors; fail-safe stops iteration",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-28-c",
          "option_text": "Fail-fast is thread-safe; fail-safe is unsynchronized",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-28-d",
          "option_text": "Fail-fast works on arrays; fail-safe works on queues",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-29",
      "question_text": "In Maven, what is the role of the pom.xml file?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-29-a",
          "option_text": "Defines project configuration, dependencies, plugins, and build lifecycle goals (Project Object Model)",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-29-b",
          "option_text": "Stores runtime database connection passwords",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-29-c",
          "option_text": "Compiles Java bytecode into native machine executables",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-29-d",
          "option_text": "Manages git branch merge conflicts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "java-backend-architecture-30",
      "question_text": "What design pattern does the Spring Framework BeanFactory and ApplicationContext implement?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "java-backend-architecture-30-a",
          "option_text": "Factory Pattern and Inversion of Control Container",
          "is_correct": true
        },
        {
          "id": "java-backend-architecture-30-b",
          "option_text": "Observer Pattern exclusively",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-30-c",
          "option_text": "Decorator Pattern exclusively",
          "is_correct": false
        },
        {
          "id": "java-backend-architecture-30-d",
          "option_text": "Singleton Anti-Pattern",
          "is_correct": false
        }
      ]
    }
  ],
  "cloud-devops": [
    {
      "id": "cloud-devops-1",
      "question_text": "What is the key difference between a Docker container and a Virtual Machine (VM)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-1-a",
          "option_text": "Containers share the host OS kernel and isolate at process level; VMs run a full guest OS on top of a hypervisor",
          "is_correct": true
        },
        {
          "id": "cloud-devops-1-b",
          "option_text": "Containers require a dedicated hypervisor; VMs do not",
          "is_correct": false
        },
        {
          "id": "cloud-devops-1-c",
          "option_text": "VMs start up in milliseconds; containers take minutes to boot",
          "is_correct": false
        },
        {
          "id": "cloud-devops-1-d",
          "option_text": "Containers can only run Python applications; VMs run any language",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-2",
      "question_text": "In Kubernetes, what is a Pod?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-2-a",
          "option_text": "The smallest deployable computing unit in K8s, encapsulating one or more containers sharing network and storage",
          "is_correct": true
        },
        {
          "id": "cloud-devops-2-b",
          "option_text": "A physical server rack inside a cloud provider datacenter",
          "is_correct": false
        },
        {
          "id": "cloud-devops-2-c",
          "option_text": "A continuous integration build pipeline runner",
          "is_correct": false
        },
        {
          "id": "cloud-devops-2-d",
          "option_text": "A load balancer that distributes traffic across AWS regions",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-3",
      "question_text": "In Docker, what is the primary advantage of a Multi-Stage Build?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-3-a",
          "option_text": "Keeps production images lean by discarding build-time SDKs and dependencies from the final runtime image",
          "is_correct": true
        },
        {
          "id": "cloud-devops-3-b",
          "option_text": "Enables running multiple containers inside a single Docker image",
          "is_correct": false
        },
        {
          "id": "cloud-devops-3-c",
          "option_text": "Allows building images across multiple cloud providers simultaneously",
          "is_correct": false
        },
        {
          "id": "cloud-devops-3-d",
          "option_text": "Automatically encrypts Docker image layers with AES-256",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-4",
      "question_text": "What is the primary function of Kubernetes Ingress?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-4-a",
          "option_text": "Managing external HTTP and HTTPS routing into services within a Kubernetes cluster",
          "is_correct": true
        },
        {
          "id": "cloud-devops-4-b",
          "option_text": "Scraping Prometheus metrics from cluster nodes",
          "is_correct": false
        },
        {
          "id": "cloud-devops-4-c",
          "option_text": "Allocating persistent SSD storage volumes to worker nodes",
          "is_correct": false
        },
        {
          "id": "cloud-devops-4-d",
          "option_text": "Managing container restart policies on node failure",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-5",
      "question_text": "What is Infrastructure as Code (IaC), and what tool is widely used to achieve it declaratively across multiple clouds?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-5-a",
          "option_text": "Managing and provisioning cloud infrastructure through version-controlled code; Terraform",
          "is_correct": true
        },
        {
          "id": "cloud-devops-5-b",
          "option_text": "Manually clicking cloud console buttons; AWS Management Console",
          "is_correct": false
        },
        {
          "id": "cloud-devops-5-c",
          "option_text": "Writing shell scripts executed via SSH on live servers; Bash",
          "is_correct": false
        },
        {
          "id": "cloud-devops-5-d",
          "option_text": "Configuring routers via telnet; PuTTY",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-6",
      "question_text": "What is the difference between Continuous Integration (CI) and Continuous Deployment (CD)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-6-a",
          "option_text": "CI automatically builds and tests code changes; CD automatically deploys validated code to production",
          "is_correct": true
        },
        {
          "id": "cloud-devops-6-b",
          "option_text": "CI is for frontend applications; CD is for backend databases",
          "is_correct": false
        },
        {
          "id": "cloud-devops-6-c",
          "option_text": "CI requires manual approval; CD is always manual",
          "is_correct": false
        },
        {
          "id": "cloud-devops-6-d",
          "option_text": "CI manages cloud infrastructure; CD monitors server CPU usage",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-7",
      "question_text": "In AWS networking, what is the difference between a Public Subnet and a Private Subnet?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-7-a",
          "option_text": "Public subnets have direct routing to an Internet Gateway; Private subnets route outbound traffic through a NAT Gateway",
          "is_correct": true
        },
        {
          "id": "cloud-devops-7-b",
          "option_text": "Public subnets are free; Private subnets are paid",
          "is_correct": false
        },
        {
          "id": "cloud-devops-7-c",
          "option_text": "Public subnets run Linux; Private subnets run Windows",
          "is_correct": false
        },
        {
          "id": "cloud-devops-7-d",
          "option_text": "Public subnets cannot run databases; Private subnets cannot run web servers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-8",
      "question_text": "What is a Blue-Green Deployment strategy?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-8-a",
          "option_text": "Maintaining two identical production environments, switching traffic to the new version once verified to eliminate downtime",
          "is_correct": true
        },
        {
          "id": "cloud-devops-8-b",
          "option_text": "Gradually routing 5% of traffic to the new version and scaling up based on metrics",
          "is_correct": false
        },
        {
          "id": "cloud-devops-8-c",
          "option_text": "Deploying updates to half the servers on Mondays and the other half on Fridays",
          "is_correct": false
        },
        {
          "id": "cloud-devops-8-d",
          "option_text": "Deploying code changes directly into live running container processes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-9",
      "question_text": "What are the three core pillars of Observability in modern distributed systems?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-9-a",
          "option_text": "Metrics, Logs, and Traces",
          "is_correct": true
        },
        {
          "id": "cloud-devops-9-b",
          "option_text": "CPU, RAM, and Disk",
          "is_correct": false
        },
        {
          "id": "cloud-devops-9-c",
          "option_text": "Latency, Bandwidth, and Throughput",
          "is_correct": false
        },
        {
          "id": "cloud-devops-9-d",
          "option_text": "Alerts, Notifications, and Escalations",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-10",
      "question_text": "In Prometheus monitoring, what collection model is primarily used to gather metrics from targets?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-10-a",
          "option_text": "Pull model: Prometheus periodically scrapes HTTP /metrics endpoints exposed by targets",
          "is_correct": true
        },
        {
          "id": "cloud-devops-10-b",
          "option_text": "Push model: Targets push UDP packets to Prometheus every second",
          "is_correct": false
        },
        {
          "id": "cloud-devops-10-c",
          "option_text": "Streaming model: Targets stream binary telemetry over Kafka topics",
          "is_correct": false
        },
        {
          "id": "cloud-devops-10-d",
          "option_text": "Polling model: Prometheus queries SQL databases directly for metrics",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-11",
      "question_text": "In AWS IAM, what is the Principle of Least Privilege?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-11-a",
          "option_text": "Granting users and services only the minimum permissions necessary to perform their designated tasks",
          "is_correct": true
        },
        {
          "id": "cloud-devops-11-b",
          "option_text": "Allowing all developers administrator access to avoid deployment friction",
          "is_correct": false
        },
        {
          "id": "cloud-devops-11-c",
          "option_text": "Restricting all cloud access exclusively to the root account",
          "is_correct": false
        },
        {
          "id": "cloud-devops-11-d",
          "option_text": "Revoking permissions after 24 hours of inactivity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-12",
      "question_text": "What is the role of Kubernetes etcd in the cluster control plane?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-12-a",
          "option_text": "A consistent and highly-available distributed key-value store holding all cluster state and configuration",
          "is_correct": true
        },
        {
          "id": "cloud-devops-12-b",
          "option_text": "The network proxy that routes traffic to pods",
          "is_correct": false
        },
        {
          "id": "cloud-devops-12-c",
          "option_text": "The component that compiles container images from source code",
          "is_correct": false
        },
        {
          "id": "cloud-devops-12-d",
          "option_text": "The DNS resolver that translates external domain names",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-13",
      "question_text": "What is a Canary Deployment?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-13-a",
          "option_text": "Rolling out new code to a small subset of users/servers before promoting to the entire fleet",
          "is_correct": true
        },
        {
          "id": "cloud-devops-13-b",
          "option_text": "Deploying code exclusively to non-production staging environments",
          "is_correct": false
        },
        {
          "id": "cloud-devops-13-c",
          "option_text": "Running automated penetration tests against live production endpoints",
          "is_correct": false
        },
        {
          "id": "cloud-devops-13-d",
          "option_text": "Testing database recovery by intentionally terminating instances",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-14",
      "question_text": "What is the difference between Layer 4 (L4) and Layer 7 (L7) load balancers?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-14-a",
          "option_text": "L4 routes based on IP and TCP/UDP ports; L7 inspects HTTP/HTTPS headers, paths, cookies, and payloads",
          "is_correct": true
        },
        {
          "id": "cloud-devops-14-b",
          "option_text": "L4 is for cloud environments; L7 is for on-premise datacenters",
          "is_correct": false
        },
        {
          "id": "cloud-devops-14-c",
          "option_text": "L4 encrypts SSL; L7 cannot terminate SSL certificates",
          "is_correct": false
        },
        {
          "id": "cloud-devops-14-d",
          "option_text": "L4 is software-based; L7 is hardware-based",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-15",
      "question_text": "What is GitOps?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-15-a",
          "option_text": "An operational framework using Git repositories as the single source of truth for declarative infrastructure and applications",
          "is_correct": true
        },
        {
          "id": "cloud-devops-15-b",
          "option_text": "Using git commit hooks to send Slack notifications",
          "is_correct": false
        },
        {
          "id": "cloud-devops-15-c",
          "option_text": "Hosting git repositories on AWS S3 buckets",
          "is_correct": false
        },
        {
          "id": "cloud-devops-15-d",
          "option_text": "Deploying applications by running git pull on production servers via cron",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-16",
      "question_text": "In Kubernetes, what is a ReplicaSet?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-16-a",
          "option_text": "Maintains a stable set of identical replica Pods running at any given time",
          "is_correct": true
        },
        {
          "id": "cloud-devops-16-b",
          "option_text": "Creates database read-replicas in AWS RDS",
          "is_correct": false
        },
        {
          "id": "cloud-devops-16-c",
          "option_text": "Backs up cluster logs to Amazon Glacier",
          "is_correct": false
        },
        {
          "id": "cloud-devops-16-d",
          "option_text": "Replicates container images across multiple Docker registries",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-17",
      "question_text": "What AWS service provides serverless compute that executes code in response to events without provisioning servers?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-17-a",
          "option_text": "AWS Lambda",
          "is_correct": true
        },
        {
          "id": "cloud-devops-17-b",
          "option_text": "Amazon EC2",
          "is_correct": false
        },
        {
          "id": "cloud-devops-17-c",
          "option_text": "Amazon ECS",
          "is_correct": false
        },
        {
          "id": "cloud-devops-17-d",
          "option_text": "Amazon EMR",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-18",
      "question_text": "What is the purpose of a Reverse Proxy like Nginx in a production architecture?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-18-a",
          "option_text": "Sits in front of backend servers handling SSL termination, reverse caching, load balancing, and rate limiting",
          "is_correct": true
        },
        {
          "id": "cloud-devops-18-b",
          "option_text": "Translates domain names to IP addresses for web browsers",
          "is_correct": false
        },
        {
          "id": "cloud-devops-18-c",
          "option_text": "Connects client browsers directly to physical database sockets",
          "is_correct": false
        },
        {
          "id": "cloud-devops-18-d",
          "option_text": "Compresses images before uploading them to Git repositories",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-19",
      "question_text": "In Docker, what is the difference between the CMD and ENTRYPOINT instructions in a Dockerfile?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-19-a",
          "option_text": "ENTRYPOINT sets the default executable; CMD provides default arguments that can be easily overridden at runtime",
          "is_correct": true
        },
        {
          "id": "cloud-devops-19-b",
          "option_text": "CMD is mandatory; ENTRYPOINT is optional",
          "is_correct": false
        },
        {
          "id": "cloud-devops-19-c",
          "option_text": "CMD sets environment variables; ENTRYPOINT copies files",
          "is_correct": false
        },
        {
          "id": "cloud-devops-19-d",
          "option_text": "ENTRYPOINT runs during docker build; CMD runs during docker push",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-20",
      "question_text": "What tool is commonly used for distributed tracing across microservices to visualize request latency breakdown?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-20-a",
          "option_text": "Jaeger / OpenTelemetry",
          "is_correct": true
        },
        {
          "id": "cloud-devops-20-b",
          "option_text": "Logstash",
          "is_correct": false
        },
        {
          "id": "cloud-devops-20-c",
          "option_text": "Nginx",
          "is_correct": false
        },
        {
          "id": "cloud-devops-20-d",
          "option_text": "Docker Compose",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-21",
      "question_text": "In Kubernetes, what is a ConfigMap?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-21-a",
          "option_text": "An API object used to store non-confidential configuration data in key-value pairs separated from container image",
          "is_correct": true
        },
        {
          "id": "cloud-devops-21-b",
          "option_text": "A network routing table for inter-pod communication",
          "is_correct": false
        },
        {
          "id": "cloud-devops-21-c",
          "option_text": "A visual GUI dashboard mapping pod resource usage",
          "is_correct": false
        },
        {
          "id": "cloud-devops-21-d",
          "option_text": "A cluster deployment script written in Python",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-22",
      "question_text": "What AWS storage service provides scalable, durable object storage accessible over HTTP via REST APIs?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-22-a",
          "option_text": "Amazon S3 (Simple Storage Service)",
          "is_correct": true
        },
        {
          "id": "cloud-devops-22-b",
          "option_text": "Amazon EBS (Elastic Block Store)",
          "is_correct": false
        },
        {
          "id": "cloud-devops-22-c",
          "option_text": "Amazon EFS (Elastic File System)",
          "is_correct": false
        },
        {
          "id": "cloud-devops-22-d",
          "option_text": "AWS Storage Gateway",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-23",
      "question_text": "What is the primary benefit of Immutable Infrastructure in cloud environments?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-23-a",
          "option_text": "Eliminates configuration drift by replacing servers rather than modifying running servers in-place",
          "is_correct": true
        },
        {
          "id": "cloud-devops-23-b",
          "option_text": "Reduces monthly cloud computing billing rates by 50%",
          "is_correct": false
        },
        {
          "id": "cloud-devops-23-c",
          "option_text": "Guarantees that software will never encounter memory leaks",
          "is_correct": false
        },
        {
          "id": "cloud-devops-23-d",
          "option_text": "Enables servers to run without operating system kernels",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-24",
      "question_text": "What does the Kubernetes Horizontal Pod Autoscaler (HPA) do?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-24-a",
          "option_text": "Automatically scales the number of Pod replicas in a deployment based on observed CPU/memory utilization",
          "is_correct": true
        },
        {
          "id": "cloud-devops-24-b",
          "option_text": "Adds additional physical CPU cores to worker node motherboards",
          "is_correct": false
        },
        {
          "id": "cloud-devops-24-c",
          "option_text": "Increases pod network bandwidth allocation during high traffic",
          "is_correct": false
        },
        {
          "id": "cloud-devops-24-d",
          "option_text": "Moves pods between AWS availability zones automatically",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-25",
      "question_text": "What is HashiCorp Vault primarily used for in DevOps workflows?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-25-a",
          "option_text": "Securely managing, storing, and tightly controlling access to secrets, tokens, API keys, and certificates",
          "is_correct": true
        },
        {
          "id": "cloud-devops-25-b",
          "option_text": "Compiling Docker images from source code",
          "is_correct": false
        },
        {
          "id": "cloud-devops-25-c",
          "option_text": "Monitoring Kubernetes pod memory consumption",
          "is_correct": false
        },
        {
          "id": "cloud-devops-25-d",
          "option_text": "Hosting private Git repositories with branch protection",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-26",
      "question_text": "What is a Dead Letter Queue (DLQ) in message queuing systems (e.g. RabbitMQ, AWS SQS)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-26-a",
          "option_text": "A queue that isolates messages that cannot be processed successfully after a designated number of retry attempts",
          "is_correct": true
        },
        {
          "id": "cloud-devops-26-b",
          "option_text": "A queue that deletes all messages when consumer memory exceeds 80%",
          "is_correct": false
        },
        {
          "id": "cloud-devops-26-c",
          "option_text": "A high-priority queue that bypasses standard rate limits",
          "is_correct": false
        },
        {
          "id": "cloud-devops-26-d",
          "option_text": "A queue reserved for administrative system broadcast notices",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-27",
      "question_text": "In CI/CD, what is the role of a Linter (e.g. ESLint, Flake8)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-27-a",
          "option_text": "Analyzes source code statically to flag programming errors, stylistic bugs, and anti-patterns before execution",
          "is_correct": true
        },
        {
          "id": "cloud-devops-27-b",
          "option_text": "Compiles source code into production binary executables",
          "is_correct": false
        },
        {
          "id": "cloud-devops-27-c",
          "option_text": "Deploys artifacts to staging environments automatically",
          "is_correct": false
        },
        {
          "id": "cloud-devops-27-d",
          "option_text": "Generates mock database fixtures for unit tests",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-28",
      "question_text": "What is Chaos Engineering (e.g. Chaos Monkey)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-28-a",
          "option_text": "The discipline of experimenting on a system to build confidence in its capability to withstand turbulent conditions in production",
          "is_correct": true
        },
        {
          "id": "cloud-devops-28-b",
          "option_text": "Intentionally deploying untested code to production on Fridays",
          "is_correct": false
        },
        {
          "id": "cloud-devops-28-c",
          "option_text": "Writing microservices without automated unit test coverage",
          "is_correct": false
        },
        {
          "id": "cloud-devops-28-d",
          "option_text": "Disabling database backups to test manual recovery procedures",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-29",
      "question_text": "In Kubernetes, what is a StatefulSet used for instead of a Deployment?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-29-a",
          "option_text": "Managing stateful applications (e.g. databases, Kafka) requiring unique identities and persistent stable storage per pod",
          "is_correct": true
        },
        {
          "id": "cloud-devops-29-b",
          "option_text": "Deploying stateless web APIs that can be scaled up or down interchangeably",
          "is_correct": false
        },
        {
          "id": "cloud-devops-29-c",
          "option_text": "Running batch jobs that terminate upon successful completion",
          "is_correct": false
        },
        {
          "id": "cloud-devops-29-d",
          "option_text": "Managing cluster-wide DaemonSet networking plugins",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cloud-devops-30",
      "question_text": "What is Zero Trust Network Access (ZTNA) in modern DevOps architectures?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cloud-devops-30-a",
          "option_text": "Requires strict identity verification for every person and device trying to access private network resources, regardless of perimeter",
          "is_correct": true
        },
        {
          "id": "cloud-devops-30-b",
          "option_text": "Granting access automatically to any device connected to the office Wi-Fi",
          "is_correct": false
        },
        {
          "id": "cloud-devops-30-c",
          "option_text": "Disabling encryption between internal microservices to reduce latency",
          "is_correct": false
        },
        {
          "id": "cloud-devops-30-d",
          "option_text": "Allowing public access to all staging environments",
          "is_correct": false
        }
      ]
    }
  ],
  "cybersecurity-ethical-hacking": [
    {
      "id": "cybersecurity-ethical-hacking-1",
      "question_text": "What are the three components of the CIA Triad in Information Security?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-1-a",
          "option_text": "Confidentiality, Integrity, Availability",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-1-b",
          "option_text": "Control, Inspection, Authorization",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-1-c",
          "option_text": "Cryptography, Identification, Authentication",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-1-d",
          "option_text": "Centralization, Isolation, Access",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-2",
      "question_text": "What is the primary difference between Symmetric and Asymmetric Encryption?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-2-a",
          "option_text": "Symmetric uses the same key for encryption and decryption (e.g. AES); Asymmetric uses a public/private keypair (e.g. RSA)",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-2-b",
          "option_text": "Symmetric uses public keys; Asymmetric uses private keys only",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-2-c",
          "option_text": "Symmetric is one-way hashing; Asymmetric is reversible",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-2-d",
          "option_text": "Symmetric encryption cannot be decrypted once applied",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-3",
      "question_text": "What is a Cryptographic Hash function (e.g. SHA-256), and what is its primary property?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-3-a",
          "option_text": "A one-way deterministic mathematical function producing a fixed-size digest that cannot be reversed",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-3-b",
          "option_text": "A two-way algorithm used to encrypt confidential customer passwords",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-3-c",
          "option_text": "A compression algorithm that reduces file sizes by 50%",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-3-d",
          "option_text": "A random number generator that produces unique integers per second",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-4",
      "question_text": "Why is \"Salting\" essential when storing hashed passwords in a database?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-4-a",
          "option_text": "It appends unique random data to each password before hashing, defeating precomputed Rainbow Table attacks",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-4-b",
          "option_text": "It encrypts the hash with a master AES-256 key",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-4-c",
          "option_text": "It compresses the password hash so it fits in smaller database columns",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-4-d",
          "option_text": "It allows administrators to recover lost passwords on request",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-5",
      "question_text": "What is Cross-Site Scripting (XSS)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-5-a",
          "option_text": "A vulnerability where an attacker injects malicious client-side JavaScript that executes in other users' browsers",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-5-b",
          "option_text": "An attack where SQL commands are injected into database forms",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-5-c",
          "option_text": "An attack that floods network bandwidth with UDP packets",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-5-d",
          "option_text": "An attack that steals physical hard drives from datacenters",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-6",
      "question_text": "What is Cross-Site Request Forgery (CSRF)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-6-a",
          "option_text": "An attack that tricks an authenticated victim into executing unwanted state-changing actions on a trusted web application",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-6-b",
          "option_text": "Injecting malicious scripts into public web forums",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-6-c",
          "option_text": "Intercepting Wi-Fi packets using a rogue access point",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-6-d",
          "option_text": "Cracking passwords using brute-force dictionary attacks",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-7",
      "question_text": "How does a Web Application Firewall (WAF) differ from a traditional Network Firewall?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-7-a",
          "option_text": "A WAF inspects application layer (Layer 7) HTTP/HTTPS traffic for web attacks; Network firewalls filter network packets (Layers 3-4)",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-7-b",
          "option_text": "A WAF protects against physical hardware theft; Network firewalls protect Wi-Fi",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-7-c",
          "option_text": "A WAF is only for cloud environments; Network firewalls are for home routers",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-7-d",
          "option_text": "A WAF replaces the need for SSL/TLS certificates",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-8",
      "question_text": "What is a Man-In-The-Middle (MITM) attack, and how is it primarily mitigated?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-8-a",
          "option_text": "An attacker intercepts communication between two parties; mitigated by end-to-end TLS/HTTPS encryption and certificate verification",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-8-b",
          "option_text": "An attacker uses brute force against passwords; mitigated by MFA",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-8-c",
          "option_text": "An attacker floods server CPU; mitigated by auto-scaling",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-8-d",
          "option_text": "An attacker steals cookies; mitigated by disabling JavaScript",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-9",
      "question_text": "What is the role of an ARP Spoofing attack on a Local Area Network (LAN)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-9-a",
          "option_text": "Associating the attacker's MAC address with the IP address of the legitimate default gateway to intercept LAN traffic",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-9-b",
          "option_text": "Cracking WPA2 Wi-Fi encryption passphrases",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-9-c",
          "option_text": "Flooding the network switch with random MAC addresses to cause a broadcast storm",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-9-d",
          "option_text": "Spoofing DNS root server certificates",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-10",
      "question_text": "What vulnerability category ranks consistently as #1 in the OWASP Top 10 web security risks?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-10-a",
          "option_text": "Broken Access Control",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-10-b",
          "option_text": "Security Misconfiguration",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-10-c",
          "option_text": "Software and Data Integrity Failures",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-10-d",
          "option_text": "Cryptographic Failures",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-11",
      "question_text": "What is a Buffer Overflow vulnerability in low-level languages like C/C++?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-11-a",
          "option_text": "Writing data past the boundary of an allocated buffer, overwriting adjacent memory and potentially hijacking control flow",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-11-b",
          "option_text": "Reading past the end of a database result set",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-11-c",
          "option_text": "Exhausting network buffer queues on high traffic",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-11-d",
          "option_text": "Allocating more memory on the heap than available physical RAM",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-12",
      "question_text": "What is the difference between an Intrusion Detection System (IDS) and an Intrusion Prevention System (IPS)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-12-a",
          "option_text": "An IDS passively monitors and alerts on suspicious traffic; an IPS sits in-line and actively drops or blocks malicious traffic",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-12-b",
          "option_text": "An IDS is hardware; an IPS is software",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-12-c",
          "option_text": "An IDS monitors outgoing traffic; an IPS monitors incoming traffic",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-12-d",
          "option_text": "An IDS is only for wireless networks; an IPS is for wired networks",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-13",
      "question_text": "In penetration testing, what tool is considered the industry standard for port scanning and network service enumeration?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-13-a",
          "option_text": "Nmap",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-13-b",
          "option_text": "Burp Suite",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-13-c",
          "option_text": "Wireshark",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-13-d",
          "option_text": "Metasploit",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-14",
      "question_text": "What does the HTTP header \"Content-Security-Policy\" (CSP) help prevent?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-14-a",
          "option_text": "Cross-Site Scripting (XSS) and data injection by specifying approved origins for executable scripts and resources",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-14-b",
          "option_text": "SQL Injection by sanitizing database queries",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-14-c",
          "option_text": "DDoS attacks by rate limiting requests per IP",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-14-d",
          "option_text": "MITM attacks by enforcing HTTPS connections",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-15",
      "question_text": "What is a Zero-Day Vulnerability?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-15-a",
          "option_text": "A software vulnerability that is known to attackers or researchers but has no available patch from the vendor",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-15-b",
          "option_text": "A vulnerability that requires zero technical skill to exploit",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-15-c",
          "option_text": "A security flaw that automatically resolves itself within 24 hours",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-15-d",
          "option_text": "A bug that was introduced on day zero of project creation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-16",
      "question_text": "What are the three factors in Multi-Factor Authentication (MFA)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-16-a",
          "option_text": "Something you know (password), Something you have (device/token), Something you are (biometrics)",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-16-b",
          "option_text": "Username, Password, Security Question",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-16-c",
          "option_text": "Email, Phone Number, Home Address",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-16-d",
          "option_text": "Fingerprint, Face ID, Retina Scan",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-17",
      "question_text": "What is DNS Spoofing (DNS Cache Poisoning)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-17-a",
          "option_text": "Injecting fraudulent DNS records into a recursive resolver cache to redirect users to malicious IP addresses",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-17-b",
          "option_text": "Stealing domain ownership through registrar account takeovers",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-17-c",
          "option_text": "Flooding authoritative DNS name servers with NXDOMAIN queries",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-17-d",
          "option_text": "Modifying local /etc/hosts files via administrative access",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-18",
      "question_text": "What security principle dictates that a user should be granted the minimum permissions required to perform their job?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-18-a",
          "option_text": "Principle of Least Privilege",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-18-b",
          "option_text": "Defense in Depth",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-18-c",
          "option_text": "Fail-Safe Defaults",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-18-d",
          "option_text": "Separation of Duties",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-19",
      "question_text": "In Cryptography, what is a \"Nonce\"?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-19-a",
          "option_text": "An arbitrary number used only once in cryptographic communications to prevent replay attacks",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-19-b",
          "option_text": "A master private key stored in an HSM",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-19-c",
          "option_text": "A mathematical constant used to calculate prime numbers",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-19-d",
          "option_text": "An encrypted password hash stored on disk",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-20",
      "question_text": "What is a Honeypot in defensive cyber operations?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-20-a",
          "option_text": "A decoy system deliberately exposed to detect, deflect, and study unauthorized attacker techniques",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-20-b",
          "option_text": "A password manager that auto-fills encrypted credentials",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-20-c",
          "option_text": "A secure enclave inside CPU hardware (e.g. Intel SGX)",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-20-d",
          "option_text": "A cryptographic vault that stores administrative SSH keys",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-21",
      "question_text": "What does the HTTP response header \"X-Frame-Options: DENY\" prevent?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-21-a",
          "option_text": "Clickjacking attacks by disallowing the page from being embedded in an <iframe>",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-21-b",
          "option_text": "Cross-Site Scripting by disabling JavaScript frames",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-21-c",
          "option_text": "SQL Injection by denying framed query strings",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-21-d",
          "option_text": "Cookie theft by denying cross-origin frames",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-22",
      "question_text": "What is a Distributed Denial of Service (DDoS) attack using a \"Botnet\"?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-22-a",
          "option_text": "Overwhelming a target server with traffic coordinated across thousands of compromised Internet-connected devices",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-22-b",
          "option_text": "Cracking database passwords using a cluster of GPU servers",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-22-c",
          "option_text": "Sending deceptive phishing emails to company employees",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-22-d",
          "option_text": "Intercepting cellular SMS authentication tokens",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-23",
      "question_text": "What is the role of a Security Information and Event Management (SIEM) platform (e.g. Splunk, Microsoft Sentinel)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-23-a",
          "option_text": "Aggregating, correlating, and analyzing log data across an enterprise in real time to detect security incidents",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-23-b",
          "option_text": "Deploying firewalls automatically to cloud subnets",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-23-c",
          "option_text": "Encrypting hard drive partitions on employee laptops",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-23-d",
          "option_text": "Conducting automated black-box penetration testing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-24",
      "question_text": "In Public Key Infrastructure (PKI), what is the function of a Certificate Authority (CA)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-24-a",
          "option_text": "A trusted third-party entity that issues and digitally signs certificates verifying the identity of public key owners",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-24-b",
          "option_text": "An agency that manages global DNS domain name assignments",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-24-c",
          "option_text": "A hardware device that encrypts network traffic at the router level",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-24-d",
          "option_text": "A server that stores encrypted user passwords",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-25",
      "question_text": "What is Ransomware?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-25-a",
          "option_text": "Malware that encrypts victim files and demands payment in cryptocurrency in exchange for decryption keys",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-25-b",
          "option_text": "Spyware that logs keystrokes to steal bank account credentials",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-25-c",
          "option_text": "A virus that deletes operating system system32 files",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-25-d",
          "option_text": "Adware that displays unwanted popup advertisements",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-26",
      "question_text": "What is the difference between Black-Box and White-Box Penetration Testing?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-26-a",
          "option_text": "Black-Box simulates an external attacker with zero prior knowledge; White-Box provides full internal architecture and source code access",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-26-b",
          "option_text": "Black-Box is illegal; White-Box is legal",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-26-c",
          "option_text": "Black-Box is for cloud; White-Box is for hardware",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-26-d",
          "option_text": "Black-Box tests firewalls; White-Box tests web applications",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-27",
      "question_text": "What is Privilege Escalation in cyber attacks?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-27-a",
          "option_text": "Exploiting a bug, design flaw, or configuration error to gain higher access permissions than originally intended (e.g. root/admin)",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-27-b",
          "option_text": "Increasing network bandwidth to execute DDoS attacks faster",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-27-c",
          "option_text": "Cracking password hashes using rainbow tables",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-27-d",
          "option_text": "Bypassing web application firewalls with encoded characters",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-28",
      "question_text": "What is the purpose of HSTS (HTTP Strict Transport Security)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-28-a",
          "option_text": "Forces browsers to communicate with the domain exclusively over HTTPS, protecting against SSL-stripping attacks",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-28-b",
          "option_text": "Enforces multi-factor authentication on every HTTP login",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-28-c",
          "option_text": "Limits HTTP request rates to prevent brute force attacks",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-28-d",
          "option_text": "Restricts HTTP access to approved IP whitelist ranges",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-29",
      "question_text": "In Wi-Fi security, what vulnerability in WPA2 allows attackers within radio range to intercept and decrypt Wi-Fi traffic?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-29-a",
          "option_text": "KRACK (Key Reinstallation Attack)",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-29-b",
          "option_text": "Heartbleed",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-29-c",
          "option_text": "Shellshock",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-29-d",
          "option_text": "EternalBlue",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cybersecurity-ethical-hacking-30",
      "question_text": "What does the \"Defense in Depth\" security strategy entail?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cybersecurity-ethical-hacking-30-a",
          "option_text": "Deploying multiple layered security controls throughout an IT system rather than relying on a single defensive barrier",
          "is_correct": true
        },
        {
          "id": "cybersecurity-ethical-hacking-30-b",
          "option_text": "Protecting the physical datacenter with biometric locks and armed guards only",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-30-c",
          "option_text": "Encrypting data only when at rest on persistent disks",
          "is_correct": false
        },
        {
          "id": "cybersecurity-ethical-hacking-30-d",
          "option_text": "Relying exclusively on a next-generation web application firewall",
          "is_correct": false
        }
      ]
    }
  ],
  "dsa": [
    {
      "id": "dsa-1",
      "question_text": "What is the worst-case time complexity of searching for an element in an unbalanced Binary Search Tree (BST)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-1-a",
          "option_text": "O(n)",
          "is_correct": true
        },
        {
          "id": "dsa-1-b",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "dsa-1-c",
          "option_text": "O(1)",
          "is_correct": false
        },
        {
          "id": "dsa-1-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-2",
      "question_text": "Which data structure operates strictly on a First-In-First-Out (FIFO) principle?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-2-a",
          "option_text": "Queue",
          "is_correct": true
        },
        {
          "id": "dsa-2-b",
          "option_text": "Stack",
          "is_correct": false
        },
        {
          "id": "dsa-2-c",
          "option_text": "Binary Heap",
          "is_correct": false
        },
        {
          "id": "dsa-2-d",
          "option_text": "Priority Queue",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-3",
      "question_text": "What is the average time complexity of QuickSort on an array of n elements?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-3-a",
          "option_text": "O(n log n)",
          "is_correct": true
        },
        {
          "id": "dsa-3-b",
          "option_text": "O(n^2)",
          "is_correct": false
        },
        {
          "id": "dsa-3-c",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-3-d",
          "option_text": "O(log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-4",
      "question_text": "In a Hash Table, what technique resolves collisions by storing multiple entries in a linked list at the same bucket index?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-4-a",
          "option_text": "Separate Chaining",
          "is_correct": true
        },
        {
          "id": "dsa-4-b",
          "option_text": "Linear Probing",
          "is_correct": false
        },
        {
          "id": "dsa-4-c",
          "option_text": "Quadratic Probing",
          "is_correct": false
        },
        {
          "id": "dsa-4-d",
          "option_text": "Double Hashing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-5",
      "question_text": "Which algorithm is used to find the shortest path from a single source vertex to all other vertices in a weighted graph with non-negative edges?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-5-a",
          "option_text": "Dijkstra's Algorithm",
          "is_correct": true
        },
        {
          "id": "dsa-5-b",
          "option_text": "Kruskal's Algorithm",
          "is_correct": false
        },
        {
          "id": "dsa-5-c",
          "option_text": "Prim's Algorithm",
          "is_correct": false
        },
        {
          "id": "dsa-5-d",
          "option_text": "Floyd-Warshall Algorithm",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-6",
      "question_text": "What data structure is typically used to implement Breadth-First Search (BFS) on a graph?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-6-a",
          "option_text": "Queue",
          "is_correct": true
        },
        {
          "id": "dsa-6-b",
          "option_text": "Stack",
          "is_correct": false
        },
        {
          "id": "dsa-6-c",
          "option_text": "Min Heap",
          "is_correct": false
        },
        {
          "id": "dsa-6-d",
          "option_text": "Binary Search Tree",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-7",
      "question_text": "What is the minimum number of queues needed to implement a Stack efficiently?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-7-a",
          "option_text": "2",
          "is_correct": true
        },
        {
          "id": "dsa-7-b",
          "option_text": "1",
          "is_correct": false
        },
        {
          "id": "dsa-7-c",
          "option_text": "3",
          "is_correct": false
        },
        {
          "id": "dsa-7-d",
          "option_text": "4",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-8",
      "question_text": "Which sorting algorithm is guaranteed to be stable and have an O(n log n) worst-case time complexity?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-8-a",
          "option_text": "MergeSort",
          "is_correct": true
        },
        {
          "id": "dsa-8-b",
          "option_text": "QuickSort",
          "is_correct": false
        },
        {
          "id": "dsa-8-c",
          "option_text": "HeapSort",
          "is_correct": false
        },
        {
          "id": "dsa-8-d",
          "option_text": "Selection Sort",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-9",
      "question_text": "What is the height of a balanced Binary Tree having n nodes?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-9-a",
          "option_text": "O(log n)",
          "is_correct": true
        },
        {
          "id": "dsa-9-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-9-c",
          "option_text": "O(n^2)",
          "is_correct": false
        },
        {
          "id": "dsa-9-d",
          "option_text": "O(1)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-10",
      "question_text": "Which data structure is best suited for checking whether parentheses in a mathematical expression are balanced?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "dsa-10-a",
          "option_text": "Stack",
          "is_correct": true
        },
        {
          "id": "dsa-10-b",
          "option_text": "Queue",
          "is_correct": false
        },
        {
          "id": "dsa-10-c",
          "option_text": "Array",
          "is_correct": false
        },
        {
          "id": "dsa-10-d",
          "option_text": "Linked List",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-11",
      "question_text": "What is the time complexity of inserting a node at the head of a Singly Linked List if the head pointer is known?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-11-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "dsa-11-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-11-c",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "dsa-11-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-12",
      "question_text": "What is the primary characteristic of an AVL Tree?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-12-a",
          "option_text": "The heights of the two child subtrees of any node differ by at most one",
          "is_correct": true
        },
        {
          "id": "dsa-12-b",
          "option_text": "All leaves are at the exact same depth",
          "is_correct": false
        },
        {
          "id": "dsa-12-c",
          "option_text": "Nodes can have up to three children",
          "is_correct": false
        },
        {
          "id": "dsa-12-d",
          "option_text": "Elements are stored in descending order only",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-13",
      "question_text": "Which algorithmic paradigm does the '0/1 Knapsack Problem' typically utilize for an optimal polynomial-time solution?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-13-a",
          "option_text": "Dynamic Programming",
          "is_correct": true
        },
        {
          "id": "dsa-13-b",
          "option_text": "Greedy Approach",
          "is_correct": false
        },
        {
          "id": "dsa-13-c",
          "option_text": "Divide and Conquer",
          "is_correct": false
        },
        {
          "id": "dsa-13-d",
          "option_text": "Backtracking only",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-14",
      "question_text": "What is the space complexity of an in-place HeapSort algorithm?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-14-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "dsa-14-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-14-c",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "dsa-14-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-15",
      "question_text": "In a Red-Black tree, what color must the root node always be?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-15-a",
          "option_text": "Black",
          "is_correct": true
        },
        {
          "id": "dsa-15-b",
          "option_text": "Red",
          "is_correct": false
        },
        {
          "id": "dsa-15-c",
          "option_text": "Yellow",
          "is_correct": false
        },
        {
          "id": "dsa-15-d",
          "option_text": "Blue",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-16",
      "question_text": "Which algorithm finds the Minimum Spanning Tree (MST) by sorting all graph edges in ascending order of their weights?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-16-a",
          "option_text": "Kruskal's Algorithm",
          "is_correct": true
        },
        {
          "id": "dsa-16-b",
          "option_text": "Prim's Algorithm",
          "is_correct": false
        },
        {
          "id": "dsa-16-c",
          "option_text": "Bellman-Ford Algorithm",
          "is_correct": false
        },
        {
          "id": "dsa-16-d",
          "option_text": "Dijkstra's Algorithm",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-17",
      "question_text": "What is the time complexity of accessing an element in an array by its index?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-17-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "dsa-17-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-17-c",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "dsa-17-d",
          "option_text": "O(n^2)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-18",
      "question_text": "Which graph traversal strategy uses a Stack (or recursion)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-18-a",
          "option_text": "Depth-First Search (DFS)",
          "is_correct": true
        },
        {
          "id": "dsa-18-b",
          "option_text": "Breadth-First Search (BFS)",
          "is_correct": false
        },
        {
          "id": "dsa-18-c",
          "option_text": "Topological Sort via Kahn's Algorithm",
          "is_correct": false
        },
        {
          "id": "dsa-18-d",
          "option_text": "Level-order traversal",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-19",
      "question_text": "In an optimal Huffman Coding tree, which characters receive the shortest binary codes?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-19-a",
          "option_text": "Characters with the highest frequencies",
          "is_correct": true
        },
        {
          "id": "dsa-19-b",
          "option_text": "Characters with the lowest frequencies",
          "is_correct": false
        },
        {
          "id": "dsa-19-c",
          "option_text": "Vowels only",
          "is_correct": false
        },
        {
          "id": "dsa-19-d",
          "option_text": "Alphabetically first characters",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-20",
      "question_text": "What is the amortized time complexity of inserting an element into a dynamic array (like std::vector or ArrayList)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "dsa-20-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "dsa-20-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-20-c",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "dsa-20-d",
          "option_text": "O(n^2)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-21",
      "question_text": "Which data structure is commonly used to implement LRU (Least Recently Used) Cache with O(1) get and put operations?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-21-a",
          "option_text": "Hash Map + Doubly Linked List",
          "is_correct": true
        },
        {
          "id": "dsa-21-b",
          "option_text": "Binary Search Tree + Stack",
          "is_correct": false
        },
        {
          "id": "dsa-21-c",
          "option_text": "Array + Queue",
          "is_correct": false
        },
        {
          "id": "dsa-21-d",
          "option_text": "Single Linked List + Min Heap",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-22",
      "question_text": "What is the maximum number of children a node can have in a Binary Tree?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-22-a",
          "option_text": "2",
          "is_correct": true
        },
        {
          "id": "dsa-22-b",
          "option_text": "3",
          "is_correct": false
        },
        {
          "id": "dsa-22-c",
          "option_text": "1",
          "is_correct": false
        },
        {
          "id": "dsa-22-d",
          "option_text": "Unlimited",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-23",
      "question_text": "What does Kadane's Algorithm find in O(n) time?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-23-a",
          "option_text": "Maximum Subarray Sum",
          "is_correct": true
        },
        {
          "id": "dsa-23-b",
          "option_text": "Longest Common Subsequence",
          "is_correct": false
        },
        {
          "id": "dsa-23-c",
          "option_text": "Shortest Cycle in a Graph",
          "is_correct": false
        },
        {
          "id": "dsa-23-d",
          "option_text": "Median of Two Sorted Arrays",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-24",
      "question_text": "Which data structure is optimal for finding the median of a continuously incoming stream of numbers?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-24-a",
          "option_text": "Two Heaps (Max-Heap and Min-Heap)",
          "is_correct": true
        },
        {
          "id": "dsa-24-b",
          "option_text": "A sorted singly linked list",
          "is_correct": false
        },
        {
          "id": "dsa-24-c",
          "option_text": "A circular queue",
          "is_correct": false
        },
        {
          "id": "dsa-24-d",
          "option_text": "A stack",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-25",
      "question_text": "What is the worst-case time complexity of Bubble Sort?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-25-a",
          "option_text": "O(n^2)",
          "is_correct": true
        },
        {
          "id": "dsa-25-b",
          "option_text": "O(n log n)",
          "is_correct": false
        },
        {
          "id": "dsa-25-c",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-25-d",
          "option_text": "O(log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-26",
      "question_text": "What property must a Directed Graph satisfy to have a valid Topological Ordering?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-26-a",
          "option_text": "It must be a Directed Acyclic Graph (DAG)",
          "is_correct": true
        },
        {
          "id": "dsa-26-b",
          "option_text": "It must be strongly connected",
          "is_correct": false
        },
        {
          "id": "dsa-26-c",
          "option_text": "It must have undirected cycles",
          "is_correct": false
        },
        {
          "id": "dsa-26-d",
          "option_text": "It must have equal in-degrees and out-degrees",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-27",
      "question_text": "In a Min-Heap, where is the smallest element always located?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-27-a",
          "option_text": "At the root node",
          "is_correct": true
        },
        {
          "id": "dsa-27-b",
          "option_text": "At the leftmost leaf",
          "is_correct": false
        },
        {
          "id": "dsa-27-c",
          "option_text": "At the rightmost leaf",
          "is_correct": false
        },
        {
          "id": "dsa-27-d",
          "option_text": "At any internal node",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-28",
      "question_text": "What is the time complexity of searching in a balanced Trie for a word of length L?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-28-a",
          "option_text": "O(L)",
          "is_correct": true
        },
        {
          "id": "dsa-28-b",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "dsa-28-c",
          "option_text": "O(n * L)",
          "is_correct": false
        },
        {
          "id": "dsa-28-d",
          "option_text": "O(log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-29",
      "question_text": "Which of the following problems can be solved using the Disjoint Set Union (Union-Find) data structure?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-29-a",
          "option_text": "Detecting cycles in an undirected graph",
          "is_correct": true
        },
        {
          "id": "dsa-29-b",
          "option_text": "Finding all-pairs shortest paths",
          "is_correct": false
        },
        {
          "id": "dsa-29-c",
          "option_text": "Evaluating postfix expressions",
          "is_correct": false
        },
        {
          "id": "dsa-29-d",
          "option_text": "Sorting an array in linear time",
          "is_correct": false
        }
      ]
    },
    {
      "id": "dsa-30",
      "question_text": "What is the number of edges in a tree with V vertices?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "dsa-30-a",
          "option_text": "V - 1",
          "is_correct": true
        },
        {
          "id": "dsa-30-b",
          "option_text": "V",
          "is_correct": false
        },
        {
          "id": "dsa-30-c",
          "option_text": "V + 1",
          "is_correct": false
        },
        {
          "id": "dsa-30-d",
          "option_text": "2 * V",
          "is_correct": false
        }
      ]
    }
  ],
  "core-engineering": [
    {
      "id": "core-engineering-1",
      "question_text": "According to Newton's Second Law of Motion, what is the mathematical formula for force?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-1-a",
          "option_text": "F = m * a",
          "is_correct": true
        },
        {
          "id": "core-engineering-1-b",
          "option_text": "F = m / a",
          "is_correct": false
        },
        {
          "id": "core-engineering-1-c",
          "option_text": "F = m * v^2",
          "is_correct": false
        },
        {
          "id": "core-engineering-1-d",
          "option_text": "F = 0.5 * m * v",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-2",
      "question_text": "What does Ohm's Law state for an ideal electrical resistor?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-2-a",
          "option_text": "V = I * R",
          "is_correct": true
        },
        {
          "id": "core-engineering-2-b",
          "option_text": "V = I / R",
          "is_correct": false
        },
        {
          "id": "core-engineering-2-c",
          "option_text": "P = V * R",
          "is_correct": false
        },
        {
          "id": "core-engineering-2-d",
          "option_text": "I = V * R",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-3",
      "question_text": "Which thermodynamic cycle represents the ideal theoretical maximum efficiency for a heat engine operating between two temperatures?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-3-a",
          "option_text": "Carnot Cycle",
          "is_correct": true
        },
        {
          "id": "core-engineering-3-b",
          "option_text": "Rankine Cycle",
          "is_correct": false
        },
        {
          "id": "core-engineering-3-c",
          "option_text": "Otto Cycle",
          "is_correct": false
        },
        {
          "id": "core-engineering-3-d",
          "option_text": "Diesel Cycle",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-4",
      "question_text": "In structural mechanics, what does the Hooke's Law state within the elastic limit?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-4-a",
          "option_text": "Stress is directly proportional to Strain",
          "is_correct": true
        },
        {
          "id": "core-engineering-4-b",
          "option_text": "Strain is inversely proportional to Area",
          "is_correct": false
        },
        {
          "id": "core-engineering-4-c",
          "option_text": "Force equals Mass times Velocity",
          "is_correct": false
        },
        {
          "id": "core-engineering-4-d",
          "option_text": "Pressure is constant throughout the cross-section",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-5",
      "question_text": "Which semiconductor component conducts current primarily in only one direction?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-5-a",
          "option_text": "Diode",
          "is_correct": true
        },
        {
          "id": "core-engineering-5-b",
          "option_text": "Capacitor",
          "is_correct": false
        },
        {
          "id": "core-engineering-5-c",
          "option_text": "Inductor",
          "is_correct": false
        },
        {
          "id": "core-engineering-5-d",
          "option_text": "Transformer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-6",
      "question_text": "In fluid mechanics, what principle explains the lift generated by an aircraft wing due to fluid velocity and pressure differences?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-6-a",
          "option_text": "Bernoulli's Principle",
          "is_correct": true
        },
        {
          "id": "core-engineering-6-b",
          "option_text": "Archimedes' Principle",
          "is_correct": false
        },
        {
          "id": "core-engineering-6-c",
          "option_text": "Pascal's Law",
          "is_correct": false
        },
        {
          "id": "core-engineering-6-d",
          "option_text": "Fourier's Law",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-7",
      "question_text": "What is the SI unit of electrical capacitance?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-7-a",
          "option_text": "Farad",
          "is_correct": true
        },
        {
          "id": "core-engineering-7-b",
          "option_text": "Henry",
          "is_correct": false
        },
        {
          "id": "core-engineering-7-c",
          "option_text": "Tesla",
          "is_correct": false
        },
        {
          "id": "core-engineering-7-d",
          "option_text": "Weber",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-8",
      "question_text": "In civil engineering, what is the primary structural function of reinforced steel rebar inside concrete beams?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-8-a",
          "option_text": "To resist tensile stresses while concrete resists compressive stresses",
          "is_correct": true
        },
        {
          "id": "core-engineering-8-b",
          "option_text": "To prevent concrete from absorbing water",
          "is_correct": false
        },
        {
          "id": "core-engineering-8-c",
          "option_text": "To decrease the overall density of the structure",
          "is_correct": false
        },
        {
          "id": "core-engineering-8-d",
          "option_text": "To conduct electrical ground currents",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-9",
      "question_text": "Which logic gate outputs HIGH (1) if and only if all of its inputs are HIGH (1)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-9-a",
          "option_text": "AND Gate",
          "is_correct": true
        },
        {
          "id": "core-engineering-9-b",
          "option_text": "OR Gate",
          "is_correct": false
        },
        {
          "id": "core-engineering-9-c",
          "option_text": "XOR Gate",
          "is_correct": false
        },
        {
          "id": "core-engineering-9-d",
          "option_text": "NOT Gate",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-10",
      "question_text": "What type of stress occurs when opposing forces act parallel to the cross-sectional plane of a material?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-10-a",
          "option_text": "Shear Stress",
          "is_correct": true
        },
        {
          "id": "core-engineering-10-b",
          "option_text": "Tensile Stress",
          "is_correct": false
        },
        {
          "id": "core-engineering-10-c",
          "option_text": "Compressive Stress",
          "is_correct": false
        },
        {
          "id": "core-engineering-10-d",
          "option_text": "Bending Stress",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-11",
      "question_text": "What law states that the total current entering a circuit junction must equal the total current leaving that junction?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-11-a",
          "option_text": "Kirchhoff's Current Law (KCL)",
          "is_correct": true
        },
        {
          "id": "core-engineering-11-b",
          "option_text": "Kirchhoff's Voltage Law (KVL)",
          "is_correct": false
        },
        {
          "id": "core-engineering-11-c",
          "option_text": "Ampere's Law",
          "is_correct": false
        },
        {
          "id": "core-engineering-11-d",
          "option_text": "Faraday's Law",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-12",
      "question_text": "In mechanical engineering, what is the ratio of pitch diameter to the number of teeth on a gear called?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-12-a",
          "option_text": "Module",
          "is_correct": true
        },
        {
          "id": "core-engineering-12-b",
          "option_text": "Diametral Pitch",
          "is_correct": false
        },
        {
          "id": "core-engineering-12-c",
          "option_text": "Circular Pitch",
          "is_correct": false
        },
        {
          "id": "core-engineering-12-d",
          "option_text": "Addendum",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-13",
      "question_text": "What is the primary function of a step-down electrical transformer?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-13-a",
          "option_text": "Decreasing voltage while increasing current",
          "is_correct": true
        },
        {
          "id": "core-engineering-13-b",
          "option_text": "Increasing voltage while decreasing current",
          "is_correct": false
        },
        {
          "id": "core-engineering-13-c",
          "option_text": "Converting AC electricity to DC electricity",
          "is_correct": false
        },
        {
          "id": "core-engineering-13-d",
          "option_text": "Storing energy in an electrostatic field",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-14",
      "question_text": "Which property describes a material's ability to undergo significant permanent plastic deformation before fracture?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-14-a",
          "option_text": "Ductility",
          "is_correct": true
        },
        {
          "id": "core-engineering-14-b",
          "option_text": "Brittleness",
          "is_correct": false
        },
        {
          "id": "core-engineering-14-c",
          "option_text": "Hardness",
          "is_correct": false
        },
        {
          "id": "core-engineering-14-d",
          "option_text": "Resilience",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-15",
      "question_text": "In electronics, what terminal of a Bipolar Junction Transistor (BJT) controls the flow of majority carriers?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-15-a",
          "option_text": "Base",
          "is_correct": true
        },
        {
          "id": "core-engineering-15-b",
          "option_text": "Collector",
          "is_correct": false
        },
        {
          "id": "core-engineering-15-c",
          "option_text": "Emitter",
          "is_correct": false
        },
        {
          "id": "core-engineering-15-d",
          "option_text": "Gate",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-16",
      "question_text": "What type of foundation is most suitable when surface soils have low bearing capacity and structural loads must reach deep bedrock?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-16-a",
          "option_text": "Pile Foundation",
          "is_correct": true
        },
        {
          "id": "core-engineering-16-b",
          "option_text": "Strip Footing",
          "is_correct": false
        },
        {
          "id": "core-engineering-16-c",
          "option_text": "Spread Footing",
          "is_correct": false
        },
        {
          "id": "core-engineering-16-d",
          "option_text": "Isolated Pad Footing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-17",
      "question_text": "What does the First Law of Thermodynamics fundamentally express?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-17-a",
          "option_text": "Conservation of Energy",
          "is_correct": true
        },
        {
          "id": "core-engineering-17-b",
          "option_text": "Increase of Entropy",
          "is_correct": false
        },
        {
          "id": "core-engineering-17-c",
          "option_text": "Absolute zero temperature limit",
          "is_correct": false
        },
        {
          "id": "core-engineering-17-d",
          "option_text": "Thermal equilibrium between bodies",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-18",
      "question_text": "Which instrument is used to measure electrical potential difference across two points without drawing substantial current?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-18-a",
          "option_text": "Voltmeter",
          "is_correct": true
        },
        {
          "id": "core-engineering-18-b",
          "option_text": "Ammeter",
          "is_correct": false
        },
        {
          "id": "core-engineering-18-c",
          "option_text": "Ohmmeter",
          "is_correct": false
        },
        {
          "id": "core-engineering-18-d",
          "option_text": "Galvanometer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-19",
      "question_text": "What is the relationship between torque (T), rotational speed (omega), and power (P) in mechanical drives?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-19-a",
          "option_text": "P = T * omega",
          "is_correct": true
        },
        {
          "id": "core-engineering-19-b",
          "option_text": "P = T / omega",
          "is_correct": false
        },
        {
          "id": "core-engineering-19-c",
          "option_text": "P = T^2 * omega",
          "is_correct": false
        },
        {
          "id": "core-engineering-19-d",
          "option_text": "T = P * omega",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-20",
      "question_text": "In communications engineering, what modulation technique varies the frequency of a carrier wave in proportion to the message signal?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-20-a",
          "option_text": "Frequency Modulation (FM)",
          "is_correct": true
        },
        {
          "id": "core-engineering-20-b",
          "option_text": "Amplitude Modulation (AM)",
          "is_correct": false
        },
        {
          "id": "core-engineering-20-c",
          "option_text": "Phase Modulation (PM)",
          "is_correct": false
        },
        {
          "id": "core-engineering-20-d",
          "option_text": "Pulse Code Modulation (PCM)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-21",
      "question_text": "What is the point on a stress-strain curve beyond which deformation is irreversible and permanent?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-21-a",
          "option_text": "Yield Point",
          "is_correct": true
        },
        {
          "id": "core-engineering-21-b",
          "option_text": "Proportional Limit",
          "is_correct": false
        },
        {
          "id": "core-engineering-21-c",
          "option_text": "Ultimate Tensile Strength",
          "is_correct": false
        },
        {
          "id": "core-engineering-21-d",
          "option_text": "Fracture Point",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-22",
      "question_text": "What is the standard frequency of AC mains power transmission in India?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-22-a",
          "option_text": "50 Hz",
          "is_correct": true
        },
        {
          "id": "core-engineering-22-b",
          "option_text": "60 Hz",
          "is_correct": false
        },
        {
          "id": "core-engineering-22-c",
          "option_text": "100 Hz",
          "is_correct": false
        },
        {
          "id": "core-engineering-22-d",
          "option_text": "120 Hz",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-23",
      "question_text": "Which thermal transfer mechanism does not require any material medium to propagate heat?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-23-a",
          "option_text": "Radiation",
          "is_correct": true
        },
        {
          "id": "core-engineering-23-b",
          "option_text": "Conduction",
          "is_correct": false
        },
        {
          "id": "core-engineering-23-c",
          "option_text": "Convection",
          "is_correct": false
        },
        {
          "id": "core-engineering-23-d",
          "option_text": "Advection",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-24",
      "question_text": "What is the primary constituent of Portland cement responsible for early compressive strength development?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-24-a",
          "option_text": "Tricalcium Silicate (C3S)",
          "is_correct": true
        },
        {
          "id": "core-engineering-24-b",
          "option_text": "Dicalcium Silicate (C2S)",
          "is_correct": false
        },
        {
          "id": "core-engineering-24-c",
          "option_text": "Tricalcium Aluminate (C3A)",
          "is_correct": false
        },
        {
          "id": "core-engineering-24-d",
          "option_text": "Gypsum",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-25",
      "question_text": "In an RLC circuit, what condition occurs when inductive reactance equals capacitive reactance (XL = XC)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-25-a",
          "option_text": "Resonance",
          "is_correct": true
        },
        {
          "id": "core-engineering-25-b",
          "option_text": "Antiresonance",
          "is_correct": false
        },
        {
          "id": "core-engineering-25-c",
          "option_text": "Short Circuit",
          "is_correct": false
        },
        {
          "id": "core-engineering-25-d",
          "option_text": "Open Circuit",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-26",
      "question_text": "Which machine element is used to support rotating shafts while minimizing rotational friction?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-26-a",
          "option_text": "Bearing",
          "is_correct": true
        },
        {
          "id": "core-engineering-26-b",
          "option_text": "Coupling",
          "is_correct": false
        },
        {
          "id": "core-engineering-26-c",
          "option_text": "Keyway",
          "is_correct": false
        },
        {
          "id": "core-engineering-26-d",
          "option_text": "Flywheel",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-27",
      "question_text": "What type of survey instrument measures both horizontal and vertical angles as well as slope distances electronically?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-27-a",
          "option_text": "Total Station",
          "is_correct": true
        },
        {
          "id": "core-engineering-27-b",
          "option_text": "Theodolite",
          "is_correct": false
        },
        {
          "id": "core-engineering-27-c",
          "option_text": "Dumpy Level",
          "is_correct": false
        },
        {
          "id": "core-engineering-27-d",
          "option_text": "Prismatic Compass",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-28",
      "question_text": "What is the operational purpose of an op-amp configured with negative feedback?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-28-a",
          "option_text": "Stabilizing closed-loop gain and broadening bandwidth",
          "is_correct": true
        },
        {
          "id": "core-engineering-28-b",
          "option_text": "Maximizing open-loop saturation",
          "is_correct": false
        },
        {
          "id": "core-engineering-28-c",
          "option_text": "Generating high-frequency carrier oscillations",
          "is_correct": false
        },
        {
          "id": "core-engineering-28-d",
          "option_text": "Eliminating input impedance",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-29",
      "question_text": "In a 4-stroke internal combustion engine, during which stroke is mechanical work delivered to the crankshaft?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-29-a",
          "option_text": "Power (Expansion) Stroke",
          "is_correct": true
        },
        {
          "id": "core-engineering-29-b",
          "option_text": "Compression Stroke",
          "is_correct": false
        },
        {
          "id": "core-engineering-29-c",
          "option_text": "Intake Stroke",
          "is_correct": false
        },
        {
          "id": "core-engineering-29-d",
          "option_text": "Exhaust Stroke",
          "is_correct": false
        }
      ]
    },
    {
      "id": "core-engineering-30",
      "question_text": "What does the Reynolds Number in fluid dynamics indicate?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "core-engineering-30-a",
          "option_text": "Ratio of inertial forces to viscous forces",
          "is_correct": true
        },
        {
          "id": "core-engineering-30-b",
          "option_text": "Ratio of buoyant forces to drag forces",
          "is_correct": false
        },
        {
          "id": "core-engineering-30-c",
          "option_text": "Ratio of pressure forces to surface tension",
          "is_correct": false
        },
        {
          "id": "core-engineering-30-d",
          "option_text": "Velocity of sound in the medium",
          "is_correct": false
        }
      ]
    }
  ],
  "business-management": [
    {
      "id": "business-management-1",
      "question_text": "Which marketing framework encompasses Product, Price, Place, and Promotion?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-1-a",
          "option_text": "The 4 Ps of Marketing Mix",
          "is_correct": true
        },
        {
          "id": "business-management-1-b",
          "option_text": "Porter's Five Forces",
          "is_correct": false
        },
        {
          "id": "business-management-1-c",
          "option_text": "SWOT Analysis",
          "is_correct": false
        },
        {
          "id": "business-management-1-d",
          "option_text": "BCG Matrix",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-2",
      "question_text": "In corporate finance, what does EBITDA stand for?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-2-a",
          "option_text": "Earnings Before Interest, Taxes, Depreciation, and Amortization",
          "is_correct": true
        },
        {
          "id": "business-management-2-b",
          "option_text": "Equity Before Investment, Trading, Debt, and Assets",
          "is_correct": false
        },
        {
          "id": "business-management-2-c",
          "option_text": "Estimated Balance of International Trade, Debt, and Accounts",
          "is_correct": false
        },
        {
          "id": "business-management-2-d",
          "option_text": "Earnings Behind Insurance, Taxes, Dividends, and Assets",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-3",
      "question_text": "What financial statement provides a snapshot of a company's assets, liabilities, and shareholders' equity at a specific point in time?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-3-a",
          "option_text": "Balance Sheet",
          "is_correct": true
        },
        {
          "id": "business-management-3-b",
          "option_text": "Income Statement",
          "is_correct": false
        },
        {
          "id": "business-management-3-c",
          "option_text": "Cash Flow Statement",
          "is_correct": false
        },
        {
          "id": "business-management-3-d",
          "option_text": "Statement of Retained Earnings",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-4",
      "question_text": "In strategic management, which tool analyzes internal Strengths and Weaknesses alongside external Opportunities and Threats?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-4-a",
          "option_text": "SWOT Analysis",
          "is_correct": true
        },
        {
          "id": "business-management-4-b",
          "option_text": "PESTEL Analysis",
          "is_correct": false
        },
        {
          "id": "business-management-4-c",
          "option_text": "Ansoff Matrix",
          "is_correct": false
        },
        {
          "id": "business-management-4-d",
          "option_text": "Value Chain Analysis",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-5",
      "question_text": "What metric measures the total revenue a business can reasonably expect from a single customer account throughout their relationship?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-5-a",
          "option_text": "Customer Lifetime Value (CLV / LTV)",
          "is_correct": true
        },
        {
          "id": "business-management-5-b",
          "option_text": "Customer Acquisition Cost (CAC)",
          "is_correct": false
        },
        {
          "id": "business-management-5-c",
          "option_text": "Net Promoter Score (NPS)",
          "is_correct": false
        },
        {
          "id": "business-management-5-d",
          "option_text": "Return on Equity (ROE)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-6",
      "question_text": "Which inventory management strategy seeks to receive goods only as they are needed in the production process, minimizing holding costs?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-6-a",
          "option_text": "Just-In-Time (JIT)",
          "is_correct": true
        },
        {
          "id": "business-management-6-b",
          "option_text": "Economic Order Quantity (EOQ)",
          "is_correct": false
        },
        {
          "id": "business-management-6-c",
          "option_text": "First-In-First-Out (FIFO)",
          "is_correct": false
        },
        {
          "id": "business-management-6-d",
          "option_text": "Safety Stock Buffer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-7",
      "question_text": "In Agile project management, what is a fixed-duration iteration (usually 1–4 weeks) called where a team delivers completed work?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-7-a",
          "option_text": "Sprint",
          "is_correct": true
        },
        {
          "id": "business-management-7-b",
          "option_text": "Kanban Queue",
          "is_correct": false
        },
        {
          "id": "business-management-7-c",
          "option_text": "Milestone",
          "is_correct": false
        },
        {
          "id": "business-management-7-d",
          "option_text": "Backlog Grooming",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-8",
      "question_text": "What metric measures the percentage of customers who stop using a company's product or service during a given timeframe?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-8-a",
          "option_text": "Churn Rate",
          "is_correct": true
        },
        {
          "id": "business-management-8-b",
          "option_text": "Bounce Rate",
          "is_correct": false
        },
        {
          "id": "business-management-8-c",
          "option_text": "Conversion Rate",
          "is_correct": false
        },
        {
          "id": "business-management-8-d",
          "option_text": "Retention Index",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-9",
      "question_text": "In the BCG Growth-Share Matrix, what are high market share business units in a slow-growing mature industry termed?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-9-a",
          "option_text": "Cash Cows",
          "is_correct": true
        },
        {
          "id": "business-management-9-b",
          "option_text": "Stars",
          "is_correct": false
        },
        {
          "id": "business-management-9-c",
          "option_text": "Question Marks",
          "is_correct": false
        },
        {
          "id": "business-management-9-d",
          "option_text": "Dogs",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-10",
      "question_text": "What accounting principle requires expenses to be recognized in the same period as the revenues they helped generate?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "business-management-10-a",
          "option_text": "Matching Principle",
          "is_correct": true
        },
        {
          "id": "business-management-10-b",
          "option_text": "Conservatism Principle",
          "is_correct": false
        },
        {
          "id": "business-management-10-c",
          "option_text": "Cost Principle",
          "is_correct": false
        },
        {
          "id": "business-management-10-d",
          "option_text": "Materiality Principle",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-11",
      "question_text": "What does ROI stand for in performance evaluation?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-11-a",
          "option_text": "Return on Investment",
          "is_correct": true
        },
        {
          "id": "business-management-11-b",
          "option_text": "Rate of Inflation",
          "is_correct": false
        },
        {
          "id": "business-management-11-c",
          "option_text": "Receipt of Income",
          "is_correct": false
        },
        {
          "id": "business-management-11-d",
          "option_text": "Reserve on Inventory",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-12",
      "question_text": "In digital marketing, what does CPC represent in pay-per-click advertising campaigns?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-12-a",
          "option_text": "Cost Per Click",
          "is_correct": true
        },
        {
          "id": "business-management-12-b",
          "option_text": "Cost Per Customer",
          "is_correct": false
        },
        {
          "id": "business-management-12-c",
          "option_text": "Clicks Per Conversion",
          "is_correct": false
        },
        {
          "id": "business-management-12-d",
          "option_text": "Click Passing Channel",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-13",
      "question_text": "What is the primary goal of Human Resource Management (HRM) during the onboarding phase?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-13-a",
          "option_text": "Integrating new employees smoothly into company culture, tools, and job roles",
          "is_correct": true
        },
        {
          "id": "business-management-13-b",
          "option_text": "Conducting annual salary appraisals",
          "is_correct": false
        },
        {
          "id": "business-management-13-c",
          "option_text": "Managing legal termination procedures",
          "is_correct": false
        },
        {
          "id": "business-management-13-d",
          "option_text": "Auditing employee tax filings",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-14",
      "question_text": "Which financial ratio divides Current Assets by Current Liabilities to measure short-term liquidity?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-14-a",
          "option_text": "Current Ratio",
          "is_correct": true
        },
        {
          "id": "business-management-14-b",
          "option_text": "Debt-to-Equity Ratio",
          "is_correct": false
        },
        {
          "id": "business-management-14-c",
          "option_text": "Quick Acid-Test Ratio",
          "is_correct": false
        },
        {
          "id": "business-management-14-d",
          "option_text": "Gross Profit Margin",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-15",
      "question_text": "What does SEO stand for in modern inbound growth marketing?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-15-a",
          "option_text": "Search Engine Optimization",
          "is_correct": true
        },
        {
          "id": "business-management-15-b",
          "option_text": "Social Engagement Operations",
          "is_correct": false
        },
        {
          "id": "business-management-15-c",
          "option_text": "Sales Enterprise Outreach",
          "is_correct": false
        },
        {
          "id": "business-management-15-d",
          "option_text": "Structured Email Overview",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-16",
      "question_text": "Which competitive strategy identifies a firm aiming to become the lowest-cost producer in its industry?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-16-a",
          "option_text": "Cost Leadership Strategy",
          "is_correct": true
        },
        {
          "id": "business-management-16-b",
          "option_text": "Differentiation Strategy",
          "is_correct": false
        },
        {
          "id": "business-management-16-c",
          "option_text": "Focus Strategy",
          "is_correct": false
        },
        {
          "id": "business-management-16-d",
          "option_text": "Diversification Strategy",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-17",
      "question_text": "What type of B2B sales model involves selling software hosted on cloud servers and accessed via recurring subscriptions?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-17-a",
          "option_text": "Software as a Service (SaaS)",
          "is_correct": true
        },
        {
          "id": "business-management-17-b",
          "option_text": "On-Premise Licensing",
          "is_correct": false
        },
        {
          "id": "business-management-17-c",
          "option_text": "Perpetual Commercial Distribution",
          "is_correct": false
        },
        {
          "id": "business-management-17-d",
          "option_text": "Open Source Hardware",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-18",
      "question_text": "In operations research, what is the path through a project network with zero slack time that determines total project duration?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-18-a",
          "option_text": "Critical Path",
          "is_correct": true
        },
        {
          "id": "business-management-18-b",
          "option_text": "Fast-Track Path",
          "is_correct": false
        },
        {
          "id": "business-management-18-c",
          "option_text": "Slack Route",
          "is_correct": false
        },
        {
          "id": "business-management-18-d",
          "option_text": "Buffer Chain",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-19",
      "question_text": "What KPI measures customer loyalty by asking how likely they are to recommend a company to a friend or colleague?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-19-a",
          "option_text": "Net Promoter Score (NPS)",
          "is_correct": true
        },
        {
          "id": "business-management-19-b",
          "option_text": "Customer Satisfaction Score (CSAT)",
          "is_correct": false
        },
        {
          "id": "business-management-19-c",
          "option_text": "Customer Effort Score (CES)",
          "is_correct": false
        },
        {
          "id": "business-management-19-d",
          "option_text": "System Usability Scale (SUS)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-20",
      "question_text": "What is the point in volume sales where total revenue equals total fixed and variable costs?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "business-management-20-a",
          "option_text": "Break-even Point",
          "is_correct": true
        },
        {
          "id": "business-management-20-b",
          "option_text": "Operating Margin Point",
          "is_correct": false
        },
        {
          "id": "business-management-20-c",
          "option_text": "Contribution Plateau",
          "is_correct": false
        },
        {
          "id": "business-management-20-d",
          "option_text": "Profit Maximization Point",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-21",
      "question_text": "What is the formula for Gross Profit?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-21-a",
          "option_text": "Revenue - Cost of Goods Sold (COGS)",
          "is_correct": true
        },
        {
          "id": "business-management-21-b",
          "option_text": "Revenue - Operating Expenses",
          "is_correct": false
        },
        {
          "id": "business-management-21-c",
          "option_text": "Net Income - Taxes",
          "is_correct": false
        },
        {
          "id": "business-management-21-d",
          "option_text": "Operating Income + Dividends",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-22",
      "question_text": "In supply chain management, what phenomenon describes how small fluctuations in consumer demand amplify as they move up the supply chain?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-22-a",
          "option_text": "Bullwhip Effect",
          "is_correct": true
        },
        {
          "id": "business-management-22-b",
          "option_text": "Hawthorne Effect",
          "is_correct": false
        },
        {
          "id": "business-management-22-c",
          "option_text": "Pareto Principle",
          "is_correct": false
        },
        {
          "id": "business-management-22-d",
          "option_text": "Halo Effect",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-23",
      "question_text": "Which leadership style empowers team members with high autonomy and minimal direct oversight?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-23-a",
          "option_text": "Laissez-Faire Leadership",
          "is_correct": true
        },
        {
          "id": "business-management-23-b",
          "option_text": "Autocratic Leadership",
          "is_correct": false
        },
        {
          "id": "business-management-23-c",
          "option_text": "Bureaucratic Leadership",
          "is_correct": false
        },
        {
          "id": "business-management-23-d",
          "option_text": "Transactional Leadership",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-24",
      "question_text": "In financial markets, what does IPO stand for?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-24-a",
          "option_text": "Initial Public Offering",
          "is_correct": true
        },
        {
          "id": "business-management-24-b",
          "option_text": "International Portfolio Order",
          "is_correct": false
        },
        {
          "id": "business-management-24-c",
          "option_text": "Internal Profit Organization",
          "is_correct": false
        },
        {
          "id": "business-management-24-d",
          "option_text": "Index Price Optimization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-25",
      "question_text": "What does the 80/20 rule (Pareto Principle) assert in business productivity?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-25-a",
          "option_text": "80% of outcomes result from 20% of causes or inputs",
          "is_correct": true
        },
        {
          "id": "business-management-25-b",
          "option_text": "80% of budget must be allocated to marketing",
          "is_correct": false
        },
        {
          "id": "business-management-25-c",
          "option_text": "20% of staff should manage 80% of projects",
          "is_correct": false
        },
        {
          "id": "business-management-25-d",
          "option_text": "Profits must grow by 20% over 80 business days",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-26",
      "question_text": "What term describes the strategic buying and selling of foreign currencies to facilitate international trade or profit from exchange rate shifts?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-26-a",
          "option_text": "Foreign Exchange (Forex) Trading",
          "is_correct": true
        },
        {
          "id": "business-management-26-b",
          "option_text": "Securities Underwriting",
          "is_correct": false
        },
        {
          "id": "business-management-26-c",
          "option_text": "Venture Capital Financing",
          "is_correct": false
        },
        {
          "id": "business-management-26-d",
          "option_text": "Factoring Accounts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-27",
      "question_text": "In performance management, what does the acronym SMART stand for when defining project objectives?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-27-a",
          "option_text": "Specific, Measurable, Achievable, Relevant, Time-bound",
          "is_correct": true
        },
        {
          "id": "business-management-27-b",
          "option_text": "Strategic, Marketable, Authorized, Rapid, Targeted",
          "is_correct": false
        },
        {
          "id": "business-management-27-c",
          "option_text": "Systematic, Modular, Accountable, Robust, Tested",
          "is_correct": false
        },
        {
          "id": "business-management-27-d",
          "option_text": "Standardized, Monitored, Accurate, Reviewed, Tracked",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-28",
      "question_text": "What is working capital defined as?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-28-a",
          "option_text": "Current Assets - Current Liabilities",
          "is_correct": true
        },
        {
          "id": "business-management-28-b",
          "option_text": "Total Assets - Total Debt",
          "is_correct": false
        },
        {
          "id": "business-management-28-c",
          "option_text": "Cash at Bank + Fixed Assets",
          "is_correct": false
        },
        {
          "id": "business-management-28-d",
          "option_text": "Net Profit - Depreciation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-29",
      "question_text": "Which pricing strategy involves setting high initial prices when launching an innovative product and gradually lowering prices over time?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-29-a",
          "option_text": "Price Skimming",
          "is_correct": true
        },
        {
          "id": "business-management-29-b",
          "option_text": "Penetration Pricing",
          "is_correct": false
        },
        {
          "id": "business-management-29-c",
          "option_text": "Cost-Plus Pricing",
          "is_correct": false
        },
        {
          "id": "business-management-29-d",
          "option_text": "Freemium Pricing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "business-management-30",
      "question_text": "In organizational design, what does 'Span of Control' refer to?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "business-management-30-a",
          "option_text": "The number of direct subordinates a manager supervises",
          "is_correct": true
        },
        {
          "id": "business-management-30-b",
          "option_text": "The geographical reach of sales branches",
          "is_correct": false
        },
        {
          "id": "business-management-30-c",
          "option_text": "The maximum budget allocated to an executive",
          "is_correct": false
        },
        {
          "id": "business-management-30-d",
          "option_text": "The duration of board member tenures",
          "is_correct": false
        }
      ]
    }
  ],
  "ui-ux-design": [
    {
      "id": "ui-ux-design-1",
      "question_text": "In digital product design, what does 'UI' stand for?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-1-a",
          "option_text": "User Interface",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-1-b",
          "option_text": "User Interaction",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-1-c",
          "option_text": "Unified Integration",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-1-d",
          "option_text": "Universal Identity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-2",
      "question_text": "In User Experience (UX) methodology, what is a fictional representation of an ideal target customer based on research data called?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-2-a",
          "option_text": "User Persona",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-2-b",
          "option_text": "Wireframe",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-2-c",
          "option_text": "Storyboard",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-2-d",
          "option_text": "Customer Empathy Map",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-3",
      "question_text": "According to WCAG (Web Content Accessibility Guidelines), what is the minimum contrast ratio required for normal body text at AA level?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-3-a",
          "option_text": "4.5:1",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-3-b",
          "option_text": "3.0:1",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-3-c",
          "option_text": "7.0:1",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-3-d",
          "option_text": "2.0:1",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-4",
      "question_text": "In Figma, what feature dynamically resizes container frames and elements according to their content and layout rules?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-4-a",
          "option_text": "Auto Layout",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-4-b",
          "option_text": "Smart Animate",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-4-c",
          "option_text": "Boolean Groups",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-4-d",
          "option_text": "Interactive Overlays",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-5",
      "question_text": "What psychological law predicts that the time required to rapidly move to a target area is a function of the ratio between the distance to the target and the width of the target?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-5-a",
          "option_text": "Fitts's Law",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-5-b",
          "option_text": "Hick's Law",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-5-c",
          "option_text": "Miller's Law",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-5-d",
          "option_text": "Jakob's Law",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-6",
      "question_text": "What does Hick's Law state in interaction design?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-6-a",
          "option_text": "The time it takes to make a decision increases with the number and complexity of choices",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-6-b",
          "option_text": "Users spend most of their time on other sites",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-6-c",
          "option_text": "Human working memory can hold only 7 plus-or-minus 2 items",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-6-d",
          "option_text": "Objects near each other tend to be grouped together",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-7",
      "question_text": "In product discovery, what is a low-fidelity, basic structural outline of a screen layout called?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-7-a",
          "option_text": "Wireframe",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-7-b",
          "option_text": "High-fidelity Prototype",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-7-c",
          "option_text": "Design System",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-7-d",
          "option_text": "Pixel-perfect Mockup",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-8",
      "question_text": "Which Gestalt Principle explains why visual elements enclosed within a boundary or sharing a common background are perceived as a group?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-8-a",
          "option_text": "Law of Common Region",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-8-b",
          "option_text": "Law of Similarity",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-8-c",
          "option_text": "Law of Closure",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-8-d",
          "option_text": "Law of Continuity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-9",
      "question_text": "What is an A/B Test in product optimization?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-9-a",
          "option_text": "Comparing two versions of a webpage or feature against each other to determine which performs better with real users",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-9-b",
          "option_text": "Testing software on Apple vs Android devices",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-9-c",
          "option_text": "Evaluating backend load vs database queries",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-9-d",
          "option_text": "Auditing source code for security vulnerabilities",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-10",
      "question_text": "What does 'Information Architecture' (IA) primarily focus on?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-10-a",
          "option_text": "Organizing, structuring, and labeling content effectively so users can easily find information",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-10-b",
          "option_text": "Writing automated frontend unit tests",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-10-c",
          "option_text": "Selecting brand typography font pairings",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-10-d",
          "option_text": "Configuring web hosting servers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-11",
      "question_text": "In typographic hierarchy, what is the vertical space between lines of text termed?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-11-a",
          "option_text": "Line Height (Leading)",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-11-b",
          "option_text": "Kerning",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-11-c",
          "option_text": "Tracking",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-11-d",
          "option_text": "Baseline Offset",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-12",
      "question_text": "What is an affordance in design?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-12-a",
          "option_text": "A property or clue in an object that indicates how it can be used or interacted with",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-12-b",
          "option_text": "The financial cost of purchasing a software license",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-12-c",
          "option_text": "The speed at which a CSS animation executes",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-12-d",
          "option_text": "The resolution of a vector SVG file",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-13",
      "question_text": "Which UX research method involves asking participants to organize topic cards into categories that make logical sense to them?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-13-a",
          "option_text": "Card Sorting",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-13-b",
          "option_text": "Tree Testing",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-13-c",
          "option_text": "Heuristic Evaluation",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-13-d",
          "option_text": "Eye Tracking",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-14",
      "question_text": "What design tool feature allows reusable master UI components that propagate changes across an entire design system?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-14-a",
          "option_text": "Components / Master Instances",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-14-b",
          "option_text": "Layer Clipping Masks",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-14-c",
          "option_text": "Vector Paths",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-14-d",
          "option_text": "Bitmap Export",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-15",
      "question_text": "According to Jakob's Law of Internet User Experience, where do users spend most of their time?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-15-a",
          "option_text": "On other websites, meaning they prefer your site to work like all the other sites they already know",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-15-b",
          "option_text": "On social media platforms exclusively",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-15-c",
          "option_text": "On search engine result pages only",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-15-d",
          "option_text": "Navigating hamburger drawer menus",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-16",
      "question_text": "What usability evaluation method has expert evaluators inspect a product interface against recognized usability principles?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-16-a",
          "option_text": "Heuristic Evaluation (Nielsen's Heuristics)",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-16-b",
          "option_text": "Guerilla Intercept Testing",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-16-c",
          "option_text": "Cognitive Walkthrough with raw telemetry",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-16-d",
          "option_text": "Synthetic Eye-Tracking heatmap",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-17",
      "question_text": "What is a 'Breadcrumb' navigation element in website UX?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-17-a",
          "option_text": "A secondary navigation trail showing the user's location within the site hierarchy",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-17-b",
          "option_text": "A cookie stored in the user's browser",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-17-c",
          "option_text": "A temporary notification toast banner",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-17-d",
          "option_text": "A floating action button in mobile layouts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-18",
      "question_text": "In responsive web design, what are the viewport width thresholds called where the layout rearranges for different screen sizes?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-18-a",
          "option_text": "Breakpoints",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-18-b",
          "option_text": "Aspect Ratios",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-18-c",
          "option_text": "Safe Areas",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-18-d",
          "option_text": "Grid Margins",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-19",
      "question_text": "What is 'White Space' (Negative Space) in visual design?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-19-a",
          "option_text": "The unmarked space between design elements, typography, and margins that gives content breathing room",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-19-b",
          "option_text": "Areas colored strictly with hex code #FFFFFF",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-19-c",
          "option_text": "Unused dead zones that must be filled with advertisements",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-19-d",
          "option_text": "The canvas border outside an artboard",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-20",
      "question_text": "What is a Design System primarily composed of?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-20-a",
          "option_text": "Reusable UI components, design tokens, style guidelines, and code documentation",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-20-b",
          "option_text": "A collection of stock photography only",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-20-c",
          "option_text": "A Photoshop layer archive",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-20-d",
          "option_text": "A repository of frontend test scripts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-21",
      "question_text": "Which color model is universally used for digital screen display interfaces?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-21-a",
          "option_text": "RGB (Red, Green, Blue)",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-21-b",
          "option_text": "CMYK (Cyan, Magenta, Yellow, Key Black)",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-21-c",
          "option_text": "Pantone PMS",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-21-d",
          "option_text": "RAL Color Standard",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-22",
      "question_text": "What is a 'Call to Action' (CTA) button in digital interface design?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-22-a",
          "option_text": "A prominent interactive element designed to prompt an immediate response from the user",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-22-b",
          "option_text": "An audio trigger that rings customer support",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-22-c",
          "option_text": "A disclaimer modal link for privacy terms",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-22-d",
          "option_text": "A subtle back button in the top navigation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-23",
      "question_text": "What does 'Skeuomorphism' describe in interface design history?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-23-a",
          "option_text": "Designing digital UI elements to mimic real-world physical objects and realistic textures",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-23-b",
          "option_text": "Using flat minimalist neon gradients",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-23-c",
          "option_text": "Adopting brutalist raw monochrome layouts",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-23-d",
          "option_text": "Using high-contrast dark mode palettes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-24",
      "question_text": "What metric tracks the percentage of users who complete a desired goal (such as signing up or purchasing)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-24-a",
          "option_text": "Conversion Rate",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-24-b",
          "option_text": "Click-Through Rate (CTR)",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-24-c",
          "option_text": "Drop-off Ratio",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-24-d",
          "option_text": "Task Completion Time",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-25",
      "question_text": "What research technique asks users to vocalize their thoughts, questions, and reactions out loud while completing a task?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-25-a",
          "option_text": "Think-Aloud Protocol",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-25-b",
          "option_text": "Silent Observation Method",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-25-c",
          "option_text": "Closed Survey Polling",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-25-d",
          "option_text": "Retrospective Post-Mortem",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-26",
      "question_text": "What does a 'User Journey Map' visualize?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-26-a",
          "option_text": "The chronological sequence of steps, touchpoints, and emotions a user experiences while achieving a goal",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-26-b",
          "option_text": "The geographic locations of website visitors on a map",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-26-c",
          "option_text": "The database network topology between cloud regions",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-26-d",
          "option_text": "The sprint velocity of engineering iterations",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-27",
      "question_text": "In mobile navigation, what is a modal interface element that slides up from the bottom of the screen called?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-27-a",
          "option_text": "Bottom Sheet",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-27-b",
          "option_text": "Floating Action Button",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-27-c",
          "option_text": "Notification Badge",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-27-d",
          "option_text": "Tooltip Popover",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-28",
      "question_text": "What is 'Microcopy' in UX writing?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-28-a",
          "option_text": "Small, targeted pieces of contextual text (like button labels, helper text, and error messages) that guide users",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-28-b",
          "option_text": "Copyright legal terms in footer links",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-28-c",
          "option_text": "Compressed minified JavaScript strings",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-28-d",
          "option_text": "Font sizes smaller than 10 pixels",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-29",
      "question_text": "What is a 'Dark Pattern' in user interface design?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-29-a",
          "option_text": "A deceptive user interface crafted to trick users into taking actions they might not otherwise choose",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-29-b",
          "option_text": "A stylish high-contrast dark theme mode",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-29-c",
          "option_text": "An interface with missing color contrast",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-29-d",
          "option_text": "A wireframe drawn on a dark slate canvas",
          "is_correct": false
        }
      ]
    },
    {
      "id": "ui-ux-design-30",
      "question_text": "What is the primary benefit of conducting Moderated Usability Testing?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "ui-ux-design-30-a",
          "option_text": "The facilitator can probe deeper, ask follow-up questions, and understand the user's reasoning in real-time",
          "is_correct": true
        },
        {
          "id": "ui-ux-design-30-b",
          "option_text": "It requires zero human intervention or analysis",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-30-c",
          "option_text": "It can test millions of users simultaneously in seconds",
          "is_correct": false
        },
        {
          "id": "ui-ux-design-30-d",
          "option_text": "It completely replaces quantitative analytical dashboards",
          "is_correct": false
        }
      ]
    }
  ],
  "cpp": [
    {
      "id": "cpp-1",
      "question_text": "Which operator is used in C++ to dynamically allocate memory on the heap?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-1-a",
          "option_text": "new",
          "is_correct": true
        },
        {
          "id": "cpp-1-b",
          "option_text": "malloc",
          "is_correct": false
        },
        {
          "id": "cpp-1-c",
          "option_text": "alloc",
          "is_correct": false
        },
        {
          "id": "cpp-1-d",
          "option_text": "create",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-2",
      "question_text": "What is the size of a standard char in C / C++?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-2-a",
          "option_text": "1 byte",
          "is_correct": true
        },
        {
          "id": "cpp-2-b",
          "option_text": "2 bytes",
          "is_correct": false
        },
        {
          "id": "cpp-2-c",
          "option_text": "4 bytes",
          "is_correct": false
        },
        {
          "id": "cpp-2-d",
          "option_text": "8 bytes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-3",
      "question_text": "What feature allows C++ functions or classes to work with generic data types without rewriting code for each type?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-3-a",
          "option_text": "Templates",
          "is_correct": true
        },
        {
          "id": "cpp-3-b",
          "option_text": "Macros",
          "is_correct": false
        },
        {
          "id": "cpp-3-c",
          "option_text": "Inheritance",
          "is_correct": false
        },
        {
          "id": "cpp-3-d",
          "option_text": "Pointers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-4",
      "question_text": "What principle in C++ ensures resource deallocation occurs automatically during stack unwinding via object destructors?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-4-a",
          "option_text": "RAII (Resource Acquisition Is Initialization)",
          "is_correct": true
        },
        {
          "id": "cpp-4-b",
          "option_text": "DRY (Don't Repeat Yourself)",
          "is_correct": false
        },
        {
          "id": "cpp-4-c",
          "option_text": "KISS Principle",
          "is_correct": false
        },
        {
          "id": "cpp-4-d",
          "option_text": "Polymorphic Binding",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-5",
      "question_text": "What is a pointer that holds the memory address of an object that has already been deallocated called?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-5-a",
          "option_text": "Dangling Pointer",
          "is_correct": true
        },
        {
          "id": "cpp-5-b",
          "option_text": "Null Pointer",
          "is_correct": false
        },
        {
          "id": "cpp-5-c",
          "option_text": "Void Pointer",
          "is_correct": false
        },
        {
          "id": "cpp-5-d",
          "option_text": "Wild Pointer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-6",
      "question_text": "Which keyword in C++ makes a member function eligible for dynamic polymorphism and runtime method overriding?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-6-a",
          "option_text": "virtual",
          "is_correct": true
        },
        {
          "id": "cpp-6-b",
          "option_text": "override",
          "is_correct": false
        },
        {
          "id": "cpp-6-c",
          "option_text": "dynamic",
          "is_correct": false
        },
        {
          "id": "cpp-6-d",
          "option_text": "polymorphic",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-7",
      "question_text": "In C++, which smart pointer allows shared ownership of a heap resource through reference counting?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-7-a",
          "option_text": "std::shared_ptr",
          "is_correct": true
        },
        {
          "id": "cpp-7-b",
          "option_text": "std::unique_ptr",
          "is_correct": false
        },
        {
          "id": "cpp-7-c",
          "option_text": "std::weak_ptr",
          "is_correct": false
        },
        {
          "id": "cpp-7-d",
          "option_text": "std::auto_ptr",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-8",
      "question_text": "What is the standard stream used for standard output in C++?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-8-a",
          "option_text": "std::cout",
          "is_correct": true
        },
        {
          "id": "cpp-8-b",
          "option_text": "std::cin",
          "is_correct": false
        },
        {
          "id": "cpp-8-c",
          "option_text": "std::cerr",
          "is_correct": false
        },
        {
          "id": "cpp-8-d",
          "option_text": "printf()",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-9",
      "question_text": "What does the 'const' keyword applied to a C++ member function indicate (e.g. int getVal() const)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-9-a",
          "option_text": "The function promises not to modify any member variables of the calling object",
          "is_correct": true
        },
        {
          "id": "cpp-9-b",
          "option_text": "The function cannot return a constant value",
          "is_correct": false
        },
        {
          "id": "cpp-9-c",
          "option_text": "The function can only be called once",
          "is_correct": false
        },
        {
          "id": "cpp-9-d",
          "option_text": "The function cannot accept input parameters",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-10",
      "question_text": "What is the result of sizeof(int*) on a standard 64-bit operating system?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "cpp-10-a",
          "option_text": "8 bytes",
          "is_correct": true
        },
        {
          "id": "cpp-10-b",
          "option_text": "4 bytes",
          "is_correct": false
        },
        {
          "id": "cpp-10-c",
          "option_text": "16 bytes",
          "is_correct": false
        },
        {
          "id": "cpp-10-d",
          "option_text": "2 bytes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-11",
      "question_text": "What header file must be included in C++ to use dynamic resizable vectors?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-11-a",
          "option_text": "<vector>",
          "is_correct": true
        },
        {
          "id": "cpp-11-b",
          "option_text": "<array>",
          "is_correct": false
        },
        {
          "id": "cpp-11-c",
          "option_text": "<list>",
          "is_correct": false
        },
        {
          "id": "cpp-11-d",
          "option_text": "<algorithm>",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-12",
      "question_text": "Which access specifier in C++ makes class members accessible only within the class itself and by derived classes?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-12-a",
          "option_text": "protected",
          "is_correct": true
        },
        {
          "id": "cpp-12-b",
          "option_text": "private",
          "is_correct": false
        },
        {
          "id": "cpp-12-c",
          "option_text": "public",
          "is_correct": false
        },
        {
          "id": "cpp-12-d",
          "option_text": "internal",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-13",
      "question_text": "In C++, what is a class called that has at least one pure virtual function (e.g. virtual void fn() = 0;)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-13-a",
          "option_text": "Abstract Class",
          "is_correct": true
        },
        {
          "id": "cpp-13-b",
          "option_text": "Interface Singleton",
          "is_correct": false
        },
        {
          "id": "cpp-13-c",
          "option_text": "Concrete Class",
          "is_correct": false
        },
        {
          "id": "cpp-13-d",
          "option_text": "Static Class",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-14",
      "question_text": "What does the 'friend' keyword in C++ grant to an external function or class?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-14-a",
          "option_text": "Access to private and protected members of the class declaring the friendship",
          "is_correct": true
        },
        {
          "id": "cpp-14-b",
          "option_text": "Inheritance of all public methods",
          "is_correct": false
        },
        {
          "id": "cpp-14-c",
          "option_text": "Ability to override const qualifiers",
          "is_correct": false
        },
        {
          "id": "cpp-14-d",
          "option_text": "Automatic dynamic memory cleanup",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-15",
      "question_text": "What is the difference between a pointer and a reference in C++?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-15-a",
          "option_text": "A reference cannot be null and cannot be reseated to refer to another object after initialization",
          "is_correct": true
        },
        {
          "id": "cpp-15-b",
          "option_text": "A pointer cannot be re-assigned once initialized",
          "is_correct": false
        },
        {
          "id": "cpp-15-c",
          "option_text": "A reference can hold a null address",
          "is_correct": false
        },
        {
          "id": "cpp-15-d",
          "option_text": "Pointers do not occupy any memory addresses",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-16",
      "question_text": "Which STL container in C++ is implemented as a doubly linked list?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-16-a",
          "option_text": "std::list",
          "is_correct": true
        },
        {
          "id": "cpp-16-b",
          "option_text": "std::vector",
          "is_correct": false
        },
        {
          "id": "cpp-16-c",
          "option_text": "std::deque",
          "is_correct": false
        },
        {
          "id": "cpp-16-d",
          "option_text": "std::forward_list",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-17",
      "question_text": "In C++, what operator is overloaded to enable stream output with std::cout << obj?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-17-a",
          "option_text": "<< (Insertion Operator)",
          "is_correct": true
        },
        {
          "id": "cpp-17-b",
          "option_text": ">> (Extraction Operator)",
          "is_correct": false
        },
        {
          "id": "cpp-17-c",
          "option_text": "+ (Addition Operator)",
          "is_correct": false
        },
        {
          "id": "cpp-17-d",
          "option_text": "-> (Member Access Operator)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-18",
      "question_text": "What is undefined behavior in C / C++?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-18-a",
          "option_text": "Execution behavior for which the language standard imposes no requirements, leading to unpredictable crashes or bugs",
          "is_correct": true
        },
        {
          "id": "cpp-18-b",
          "option_text": "A compiler error that prevents binary generation",
          "is_correct": false
        },
        {
          "id": "cpp-18-c",
          "option_text": "A syntax error detected by static linters",
          "is_correct": false
        },
        {
          "id": "cpp-18-d",
          "option_text": "A standard floating point exception",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-19",
      "question_text": "What does the 'inline' keyword suggest to the C++ compiler?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-19-a",
          "option_text": "Substitute the function code directly at the call site to eliminate function call overhead",
          "is_correct": true
        },
        {
          "id": "cpp-19-b",
          "option_text": "Execute the function in a dedicated thread",
          "is_correct": false
        },
        {
          "id": "cpp-19-c",
          "option_text": "Store the function in CPU registers only",
          "is_correct": false
        },
        {
          "id": "cpp-19-d",
          "option_text": "Prevent the function from being optimized",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-20",
      "question_text": "Which header file provides standard algorithms like std::sort, std::find, and std::binary_search in C++?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "cpp-20-a",
          "option_text": "<algorithm>",
          "is_correct": true
        },
        {
          "id": "cpp-20-b",
          "option_text": "<numeric>",
          "is_correct": false
        },
        {
          "id": "cpp-20-c",
          "option_text": "<functional>",
          "is_correct": false
        },
        {
          "id": "cpp-20-d",
          "option_text": "<utility>",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-21",
      "question_text": "What is the time complexity of searching for an element in an std::map (implemented as a Red-Black Tree)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-21-a",
          "option_text": "O(log n)",
          "is_correct": true
        },
        {
          "id": "cpp-21-b",
          "option_text": "O(1)",
          "is_correct": false
        },
        {
          "id": "cpp-21-c",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "cpp-21-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-22",
      "question_text": "What is the average time complexity of finding an element in an std::unordered_map (implemented as a Hash Table)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-22-a",
          "option_text": "O(1)",
          "is_correct": true
        },
        {
          "id": "cpp-22-b",
          "option_text": "O(log n)",
          "is_correct": false
        },
        {
          "id": "cpp-22-c",
          "option_text": "O(n)",
          "is_correct": false
        },
        {
          "id": "cpp-22-d",
          "option_text": "O(n log n)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-23",
      "question_text": "What does the 'static' keyword on a class member variable in C++ mean?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-23-a",
          "option_text": "A single copy of the variable is shared among all instances of the class",
          "is_correct": true
        },
        {
          "id": "cpp-23-b",
          "option_text": "The variable cannot be read or written to",
          "is_correct": false
        },
        {
          "id": "cpp-23-c",
          "option_text": "The variable is destroyed when the constructor exits",
          "is_correct": false
        },
        {
          "id": "cpp-23-d",
          "option_text": "The variable can only be accessed via pointers",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-24",
      "question_text": "Which keyword in modern C++ (C++11+) queries the type of an expression at compile time without evaluating it?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-24-a",
          "option_text": "decltype",
          "is_correct": true
        },
        {
          "id": "cpp-24-b",
          "option_text": "typeof",
          "is_correct": false
        },
        {
          "id": "cpp-24-c",
          "option_text": "typeid",
          "is_correct": false
        },
        {
          "id": "cpp-24-d",
          "option_text": "auto",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-25",
      "question_text": "What is a lambda expression in C++?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-25-a",
          "option_text": "An anonymous, inline function object that can capture variables from its surrounding scope",
          "is_correct": true
        },
        {
          "id": "cpp-25-b",
          "option_text": "A recursive macro definition in preprocessor",
          "is_correct": false
        },
        {
          "id": "cpp-25-c",
          "option_text": "A hardware pointer to an interrupt handler",
          "is_correct": false
        },
        {
          "id": "cpp-25-d",
          "option_text": "A template class specialization",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-26",
      "question_text": "What is the Diamond Problem in C++ object-oriented programming?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-26-a",
          "option_text": "Ambiguity arising when a class inherits from two classes that both inherit from the same common base class",
          "is_correct": true
        },
        {
          "id": "cpp-26-b",
          "option_text": "Memory leaks in circular shared_ptr references",
          "is_correct": false
        },
        {
          "id": "cpp-26-c",
          "option_text": "Stack overflow in deeply nested templates",
          "is_correct": false
        },
        {
          "id": "cpp-26-d",
          "option_text": "Buffer overflow when writing past array bounds",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-27",
      "question_text": "How is the Diamond Problem resolved in C++ inheritance hierarchies?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-27-a",
          "option_text": "Virtual Inheritance (e.g. virtual public Base)",
          "is_correct": true
        },
        {
          "id": "cpp-27-b",
          "option_text": "Static Casts",
          "is_correct": false
        },
        {
          "id": "cpp-27-c",
          "option_text": "Declaring all members protected",
          "is_correct": false
        },
        {
          "id": "cpp-27-d",
          "option_text": "Multiple destructors",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-28",
      "question_text": "What is the correct way to deallocate an array allocated with new int[50] in C++?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-28-a",
          "option_text": "delete[] ptr;",
          "is_correct": true
        },
        {
          "id": "cpp-28-b",
          "option_text": "delete ptr;",
          "is_correct": false
        },
        {
          "id": "cpp-28-c",
          "option_text": "free(ptr);",
          "is_correct": false
        },
        {
          "id": "cpp-28-d",
          "option_text": "dispose(ptr);",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-29",
      "question_text": "What is the 'Rule of Five' in modern C++ (C++11)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-29-a",
          "option_text": "If you define destructor, copy constructor, or copy assignment, you should also define move constructor and move assignment operator",
          "is_correct": true
        },
        {
          "id": "cpp-29-b",
          "option_text": "A class cannot have more than 5 private member variables",
          "is_correct": false
        },
        {
          "id": "cpp-29-c",
          "option_text": "Every function must have fewer than 5 arguments",
          "is_correct": false
        },
        {
          "id": "cpp-29-d",
          "option_text": "A namespace can contain at most 5 nested sub-namespaces",
          "is_correct": false
        }
      ]
    },
    {
      "id": "cpp-30",
      "question_text": "What does std::move do in C++?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "cpp-30-a",
          "option_text": "It casts an lvalue to an rvalue reference, enabling resource transfer without deep copying",
          "is_correct": true
        },
        {
          "id": "cpp-30-b",
          "option_text": "It moves an object to a new CPU register",
          "is_correct": false
        },
        {
          "id": "cpp-30-c",
          "option_text": "It copies bytes directly from disk to RAM",
          "is_correct": false
        },
        {
          "id": "cpp-30-d",
          "option_text": "It forces thread context switching",
          "is_correct": false
        }
      ]
    }
  ],
  "prompt-engineering": [
    {
      "id": "prompt-engineering-1",
      "question_text": "Which prompting technique provides demonstration examples with desired input-output pairs inside the prompt before the target query?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-1-a",
          "option_text": "Few-Shot Prompting",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-1-b",
          "option_text": "Zero-Shot Prompting",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-1-c",
          "option_text": "Zero-Shot CoT",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-1-d",
          "option_text": "Recursive Self-Refinement",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-2",
      "question_text": "What does the 'Temperature' hyperparameter in Large Language Models (LLMs) primarily control?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-2-a",
          "option_text": "The randomness and creativity of next-token probability distribution",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-2-b",
          "option_text": "The maximum number of tokens in the context window",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-2-c",
          "option_text": "The physical operating temperature of GPU clusters",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-2-d",
          "option_text": "The learning rate during model pre-training",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-3",
      "question_text": "What prompting strategy encourages an LLM to break complex multi-step reasoning down by adding 'Let's think step by step'?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-3-a",
          "option_text": "Chain-of-Thought (CoT) Prompting",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-3-b",
          "option_text": "Directional Stimulus Prompting",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-3-c",
          "option_text": "Generated Knowledge Prompting",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-3-d",
          "option_text": "ReAct Prompting",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-4",
      "question_text": "What is the primary objective of Retrieval-Augmented Generation (RAG) in LLM applications?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-4-a",
          "option_text": "Grounding the LLM generation with external dynamic or proprietary knowledge to reduce hallucinations",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-4-b",
          "option_text": "Compressing the neural weights of the transformer architecture",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-4-c",
          "option_text": "Fine-tuning base model weights using supervised datasets",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-4-d",
          "option_text": "Increasing the context window beyond physical GPU memory",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-5",
      "question_text": "What vulnerability describes an attacker crafting malicious input to override developer instructions in the system prompt?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-5-a",
          "option_text": "Prompt Injection",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-5-b",
          "option_text": "Cross-Site Scripting (XSS)",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-5-c",
          "option_text": "Buffer Overflow",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-5-d",
          "option_text": "SQL Injection",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-6",
      "question_text": "In the ReAct prompting framework, what two iterative processes does the model alternate between?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-6-a",
          "option_text": "Reasoning traces and task-specific Actions",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-6-b",
          "option_text": "Recursive compiling and Activation pruning",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-6-c",
          "option_text": "Reinforcement learning and Auto-regressive decoding",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-6-d",
          "option_text": "Rule extraction and Attention mask tuning",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-7",
      "question_text": "What is the 'System Prompt' in chat completion API architectures (like OpenAI or Anthropic)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-7-a",
          "option_text": "High-priority instructions defining the model's persona, boundaries, and formatting rules",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-7-b",
          "option_text": "The operating system command line arguments",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-7-c",
          "option_text": "The token budget allocated per user subscription tier",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-7-d",
          "option_text": "A hardware initialization string sent to the GPU",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-8",
      "question_text": "Which parameter restricts token sampling to the smallest set of tokens whose cumulative probability exceeds a threshold p?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-8-a",
          "option_text": "Top-p (Nucleus Sampling)",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-8-b",
          "option_text": "Top-k Sampling",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-8-c",
          "option_text": "Frequency Penalty",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-8-d",
          "option_text": "Presence Penalty",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-9",
      "question_text": "What is an LLM 'hallucination'?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-9-a",
          "option_text": "When a model generates factually incorrect, ungrounded, or nonsensical output with high confidence",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-9-b",
          "option_text": "When a GPU overheats and drops tensor calculations",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-9-c",
          "option_text": "When prompt tokens exceed context window limits",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-9-d",
          "option_text": "When an embedding vector produces negative cosine similarity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-10",
      "question_text": "Which prompting technique explores multiple reasoning paths in parallel and evaluates choices using search algorithms like BFS or DFS?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-10-a",
          "option_text": "Tree of Thoughts (ToT)",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-10-b",
          "option_text": "Chain-of-Thought (CoT)",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-10-c",
          "option_text": "Zero-Shot Prompting",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-10-d",
          "option_text": "Least-to-Most Prompting",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-11",
      "question_text": "What technique involves sampling multiple different reasoning paths from an LLM and selecting the most consistent final answer?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-11-a",
          "option_text": "Self-Consistency Prompting",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-11-b",
          "option_text": "Greedy Decoding",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-11-c",
          "option_text": "One-Shot Prompting",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-11-d",
          "option_text": "Speculative Decoding",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-12",
      "question_text": "What is 'In-Context Learning' in modern Large Language Models?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-12-a",
          "option_text": "The model's ability to learn tasks and follow patterns from examples in the prompt without updating weights",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-12-b",
          "option_text": "Updating transformer backpropagation weights at inference time",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-12-c",
          "option_text": "Storing conversations in persistent SQL databases",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-12-d",
          "option_text": "Caching past key-value attention matrices on SSDs",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-13",
      "question_text": "What does the 'Presence Penalty' parameter discourage in LLM generation?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-13-a",
          "option_text": "Repeating topics or words that have already appeared in the generated text",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-13-b",
          "option_text": "Generating responses in languages other than English",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-13-c",
          "option_text": "Using punctuation and special characters",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-13-d",
          "option_text": "Exceeding prompt length limits",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-14",
      "question_text": "What is the 'Lost in the Middle' phenomenon observed in long-context Large Language Models?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-14-a",
          "option_text": "Models tend to recall information at the beginning and end of long prompts better than information in the middle",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-14-b",
          "option_text": "Middle layers of transformer neural networks lose precision during quantization",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-14-c",
          "option_text": "Conversations lose state after exactly 10 prompt turns",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-14-d",
          "option_text": "Vector databases drop middle chunks during similarity search",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-15",
      "question_text": "Which vector similarity metric is most commonly used to measure relevance between prompt embeddings and document chunks in RAG?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-15-a",
          "option_text": "Cosine Similarity",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-15-b",
          "option_text": "Manhattan Distance",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-15-c",
          "option_text": "Hamming Distance",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-15-d",
          "option_text": "Jaccard Index",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-16",
      "question_text": "What is 'Jailbreaking' in the context of AI safety and prompt engineering?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-16-a",
          "option_text": "Bypassing safety guardrails and policy filters to force the model to generate prohibited or harmful content",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-16-b",
          "option_text": "Rooting the server running the LLM container",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-16-c",
          "option_text": "Exporting closed-source model weights to open source formats",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-16-d",
          "option_text": "Fine-tuning an LLM on pirated textbooks",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-17",
      "question_text": "What is the primary role of an 'Evaluation Framework' like Ragas or TruLens in LLM applications?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-17-a",
          "option_text": "Measuring retrieval precision, faithfulness, and answer relevance quantitatively",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-17-b",
          "option_text": "Benchmarking GPU FLOPS and memory bandwidth",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-17-c",
          "option_text": "Transcribing human audio prompts to text",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-17-d",
          "option_text": "Generating vector embeddings for unstructured files",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-18",
      "question_text": "In 'Least-to-Most Prompting', how does the prompt guide the language model?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-18-a",
          "option_text": "By decomposing a complex problem into sub-problems and solving them sequentially, using answers from earlier steps",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-18-b",
          "option_text": "By restricting output to fewer than 10 words",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-18-c",
          "option_text": "By feeding tokens in reverse chronological order",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-18-d",
          "option_text": "By using lowest temperature first and increasing it gradually",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-19",
      "question_text": "What is 'Chunking' in the context of Retrieval-Augmented Generation (RAG)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-19-a",
          "option_text": "Splitting large documents into smaller, semantically coherent passages before generating embeddings",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-19-b",
          "option_text": "Compressing model weights using 4-bit quantization",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-19-c",
          "option_text": "Grouping multiple API requests to save network overhead",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-19-d",
          "option_text": "Removing punctuation from the input prompt",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-20",
      "question_text": "What is 'Negative Prompting' commonly used for in generative image and text models?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-20-a",
          "option_text": "Specifying what the model should explicitly avoid or exclude from the generated output",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-20-b",
          "option_text": "Subtracting embedding vectors to invert model weights",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-20-c",
          "option_text": "Testing the model with insulting user prompts",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-20-d",
          "option_text": "Generating sarcastic and pessimistic responses",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-21",
      "question_text": "Which technique guides an LLM to strictly output valid structured JSON matching a predefined schema?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-21-a",
          "option_text": "Constrained Decoding / JSON Schema Enforcement",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-21-b",
          "option_text": "Unsupervised Fine-Tuning",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-21-c",
          "option_text": "LoRA Adapter training",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-21-d",
          "option_text": "Greedy token sampling",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-22",
      "question_text": "What is a 'Hallucination Guardrail'?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-22-a",
          "option_text": "A verification layer that cross-checks LLM responses against retrieved evidence before returning them to users",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-22-b",
          "option_text": "A physical cooling system for AI inference servers",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-22-c",
          "option_text": "A hardware firewall blocking inbound port 80 traffic",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-22-d",
          "option_text": "A rate limiter capping API requests per minute",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-23",
      "question_text": "In Prompt Engineering, what is 'Role Prompting' (e.g., 'Act as a Senior Cloud Architect')?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-23-a",
          "option_text": "Instructing the model to adopt a specific identity, tone, expertise level, and perspective",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-23-b",
          "option_text": "Assigning IAM roles to API service accounts",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-23-c",
          "option_text": "Switching between human and synthetic user accounts",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-23-d",
          "option_text": "Defining user permissions in a database",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-24",
      "question_text": "What is 'Directional Stimulus Prompting'?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-24-a",
          "option_text": "Providing an additional small hint or keywords in the prompt to guide the LLM toward a desired specific response",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-24-b",
          "option_text": "Sending prompts via high-speed directional Wi-Fi antennas",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-24-c",
          "option_text": "Aligning LLMs with human preferences via RLHF",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-24-d",
          "option_text": "Forcing the model to process tokens from right to left",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-25",
      "question_text": "What is the difference between Pre-training, Fine-tuning, and Prompt Engineering?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-25-a",
          "option_text": "Pre-training learns from raw internet data, Fine-tuning adjusts weights for a task, Prompt Engineering guides without weight updates",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-25-b",
          "option_text": "Prompt Engineering modifies weights, Fine-tuning does not",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-25-c",
          "option_text": "Pre-training is done locally on user devices; Prompt Engineering requires a supercomputer",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-25-d",
          "option_text": "There is no difference; all three mean the same thing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-26",
      "question_text": "What is 'Context Window' in a Large Language Model?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-26-a",
          "option_text": "The maximum number of tokens (prompt + completion) the model can process simultaneously in a single request",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-26-b",
          "option_text": "The browser window where the chat interface is rendered",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-26-c",
          "option_text": "The duration of time an API key remains active",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-26-d",
          "option_text": "The cache memory allocated per thread on the CPU",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-27",
      "question_text": "What is 'Indirect Prompt Injection'?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-27-a",
          "option_text": "When malicious prompt instructions are hidden inside third-party untrusted data (like a webpage or email) read by the LLM",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-27-b",
          "option_text": "When a user asks another human to prompt the model for them",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-27-c",
          "option_text": "When a database query fails due to syntax errors",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-27-d",
          "option_text": "When an LLM calls another LLM recursively",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-28",
      "question_text": "Which component converts human text into numerical tokens for LLM transformer processing?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-28-a",
          "option_text": "Tokenizer (e.g. Byte-Pair Encoding)",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-28-b",
          "option_text": "Vector Database",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-28-c",
          "option_text": "Softmax Layer",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-28-d",
          "option_text": "GPU Tensor Core",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-29",
      "question_text": "In prompt optimization, what does 'Few-Shot with CoT' combine?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-29-a",
          "option_text": "Exemplar demonstrations showing both the input, step-by-step reasoning, and the final answer",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-29-b",
          "option_text": "Zero prompts with high temperature",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-29-c",
          "option_text": "Reinforcement learning with negative weights",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-29-d",
          "option_text": "Random token sampling without examples",
          "is_correct": false
        }
      ]
    },
    {
      "id": "prompt-engineering-30",
      "question_text": "What is 'Self-Refinement' (or Reflexion) in autonomous LLM agent prompting?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "prompt-engineering-30-a",
          "option_text": "Having the LLM critique and iteratively improve its own previous output before providing the final answer",
          "is_correct": true
        },
        {
          "id": "prompt-engineering-30-b",
          "option_text": "Compacting the model's neural network weights into a smaller model",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-30-c",
          "option_text": "Resetting the chat memory after each message",
          "is_correct": false
        },
        {
          "id": "prompt-engineering-30-d",
          "option_text": "Translating the prompt into machine language",
          "is_correct": false
        }
      ]
    }
  ],
  "mechanical-engineering": [
    {
      "id": "mechanical-engineering-1",
      "question_text": "According to Newton's Second Law of Motion, what is the mathematical formula for force?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-1-a",
          "option_text": "F = m * a",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-1-b",
          "option_text": "F = m / a",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-1-c",
          "option_text": "F = m * v^2",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-1-d",
          "option_text": "F = 0.5 * m * v",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-2",
      "question_text": "What does Ohm's Law state for an ideal electrical resistor?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-2-a",
          "option_text": "V = I * R",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-2-b",
          "option_text": "V = I / R",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-2-c",
          "option_text": "P = V * R",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-2-d",
          "option_text": "I = V * R",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-3",
      "question_text": "Which thermodynamic cycle represents the ideal theoretical maximum efficiency for a heat engine operating between two temperatures?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-3-a",
          "option_text": "Carnot Cycle",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-3-b",
          "option_text": "Rankine Cycle",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-3-c",
          "option_text": "Otto Cycle",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-3-d",
          "option_text": "Diesel Cycle",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-4",
      "question_text": "In structural mechanics, what does the Hooke's Law state within the elastic limit?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-4-a",
          "option_text": "Stress is directly proportional to Strain",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-4-b",
          "option_text": "Strain is inversely proportional to Area",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-4-c",
          "option_text": "Force equals Mass times Velocity",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-4-d",
          "option_text": "Pressure is constant throughout the cross-section",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-5",
      "question_text": "Which semiconductor component conducts current primarily in only one direction?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-5-a",
          "option_text": "Diode",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-5-b",
          "option_text": "Capacitor",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-5-c",
          "option_text": "Inductor",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-5-d",
          "option_text": "Transformer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-6",
      "question_text": "In fluid mechanics, what principle explains the lift generated by an aircraft wing due to fluid velocity and pressure differences?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-6-a",
          "option_text": "Bernoulli's Principle",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-6-b",
          "option_text": "Archimedes' Principle",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-6-c",
          "option_text": "Pascal's Law",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-6-d",
          "option_text": "Fourier's Law",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-7",
      "question_text": "What is the SI unit of electrical capacitance?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-7-a",
          "option_text": "Farad",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-7-b",
          "option_text": "Henry",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-7-c",
          "option_text": "Tesla",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-7-d",
          "option_text": "Weber",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-8",
      "question_text": "In civil engineering, what is the primary structural function of reinforced steel rebar inside concrete beams?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-8-a",
          "option_text": "To resist tensile stresses while concrete resists compressive stresses",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-8-b",
          "option_text": "To prevent concrete from absorbing water",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-8-c",
          "option_text": "To decrease the overall density of the structure",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-8-d",
          "option_text": "To conduct electrical ground currents",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-9",
      "question_text": "Which logic gate outputs HIGH (1) if and only if all of its inputs are HIGH (1)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-9-a",
          "option_text": "AND Gate",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-9-b",
          "option_text": "OR Gate",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-9-c",
          "option_text": "XOR Gate",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-9-d",
          "option_text": "NOT Gate",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-10",
      "question_text": "What type of stress occurs when opposing forces act parallel to the cross-sectional plane of a material?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-10-a",
          "option_text": "Shear Stress",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-10-b",
          "option_text": "Tensile Stress",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-10-c",
          "option_text": "Compressive Stress",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-10-d",
          "option_text": "Bending Stress",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-11",
      "question_text": "What law states that the total current entering a circuit junction must equal the total current leaving that junction?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-11-a",
          "option_text": "Kirchhoff's Current Law (KCL)",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-11-b",
          "option_text": "Kirchhoff's Voltage Law (KVL)",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-11-c",
          "option_text": "Ampere's Law",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-11-d",
          "option_text": "Faraday's Law",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-12",
      "question_text": "In mechanical engineering, what is the ratio of pitch diameter to the number of teeth on a gear called?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-12-a",
          "option_text": "Module",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-12-b",
          "option_text": "Diametral Pitch",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-12-c",
          "option_text": "Circular Pitch",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-12-d",
          "option_text": "Addendum",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-13",
      "question_text": "What is the primary function of a step-down electrical transformer?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-13-a",
          "option_text": "Decreasing voltage while increasing current",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-13-b",
          "option_text": "Increasing voltage while decreasing current",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-13-c",
          "option_text": "Converting AC electricity to DC electricity",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-13-d",
          "option_text": "Storing energy in an electrostatic field",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-14",
      "question_text": "Which property describes a material's ability to undergo significant permanent plastic deformation before fracture?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-14-a",
          "option_text": "Ductility",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-14-b",
          "option_text": "Brittleness",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-14-c",
          "option_text": "Hardness",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-14-d",
          "option_text": "Resilience",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-15",
      "question_text": "In electronics, what terminal of a Bipolar Junction Transistor (BJT) controls the flow of majority carriers?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-15-a",
          "option_text": "Base",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-15-b",
          "option_text": "Collector",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-15-c",
          "option_text": "Emitter",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-15-d",
          "option_text": "Gate",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-16",
      "question_text": "What type of foundation is most suitable when surface soils have low bearing capacity and structural loads must reach deep bedrock?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-16-a",
          "option_text": "Pile Foundation",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-16-b",
          "option_text": "Strip Footing",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-16-c",
          "option_text": "Spread Footing",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-16-d",
          "option_text": "Isolated Pad Footing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-17",
      "question_text": "What does the First Law of Thermodynamics fundamentally express?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-17-a",
          "option_text": "Conservation of Energy",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-17-b",
          "option_text": "Increase of Entropy",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-17-c",
          "option_text": "Absolute zero temperature limit",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-17-d",
          "option_text": "Thermal equilibrium between bodies",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-18",
      "question_text": "Which instrument is used to measure electrical potential difference across two points without drawing substantial current?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-18-a",
          "option_text": "Voltmeter",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-18-b",
          "option_text": "Ammeter",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-18-c",
          "option_text": "Ohmmeter",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-18-d",
          "option_text": "Galvanometer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-19",
      "question_text": "What is the relationship between torque (T), rotational speed (omega), and power (P) in mechanical drives?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-19-a",
          "option_text": "P = T * omega",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-19-b",
          "option_text": "P = T / omega",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-19-c",
          "option_text": "P = T^2 * omega",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-19-d",
          "option_text": "T = P * omega",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-20",
      "question_text": "In communications engineering, what modulation technique varies the frequency of a carrier wave in proportion to the message signal?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-20-a",
          "option_text": "Frequency Modulation (FM)",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-20-b",
          "option_text": "Amplitude Modulation (AM)",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-20-c",
          "option_text": "Phase Modulation (PM)",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-20-d",
          "option_text": "Pulse Code Modulation (PCM)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-21",
      "question_text": "What is the point on a stress-strain curve beyond which deformation is irreversible and permanent?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-21-a",
          "option_text": "Yield Point",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-21-b",
          "option_text": "Proportional Limit",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-21-c",
          "option_text": "Ultimate Tensile Strength",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-21-d",
          "option_text": "Fracture Point",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-22",
      "question_text": "What is the standard frequency of AC mains power transmission in India?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-22-a",
          "option_text": "50 Hz",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-22-b",
          "option_text": "60 Hz",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-22-c",
          "option_text": "100 Hz",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-22-d",
          "option_text": "120 Hz",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-23",
      "question_text": "Which thermal transfer mechanism does not require any material medium to propagate heat?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-23-a",
          "option_text": "Radiation",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-23-b",
          "option_text": "Conduction",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-23-c",
          "option_text": "Convection",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-23-d",
          "option_text": "Advection",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-24",
      "question_text": "What is the primary constituent of Portland cement responsible for early compressive strength development?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-24-a",
          "option_text": "Tricalcium Silicate (C3S)",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-24-b",
          "option_text": "Dicalcium Silicate (C2S)",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-24-c",
          "option_text": "Tricalcium Aluminate (C3A)",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-24-d",
          "option_text": "Gypsum",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-25",
      "question_text": "In an RLC circuit, what condition occurs when inductive reactance equals capacitive reactance (XL = XC)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-25-a",
          "option_text": "Resonance",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-25-b",
          "option_text": "Antiresonance",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-25-c",
          "option_text": "Short Circuit",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-25-d",
          "option_text": "Open Circuit",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-26",
      "question_text": "Which machine element is used to support rotating shafts while minimizing rotational friction?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-26-a",
          "option_text": "Bearing",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-26-b",
          "option_text": "Coupling",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-26-c",
          "option_text": "Keyway",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-26-d",
          "option_text": "Flywheel",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-27",
      "question_text": "What type of survey instrument measures both horizontal and vertical angles as well as slope distances electronically?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-27-a",
          "option_text": "Total Station",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-27-b",
          "option_text": "Theodolite",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-27-c",
          "option_text": "Dumpy Level",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-27-d",
          "option_text": "Prismatic Compass",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-28",
      "question_text": "What is the operational purpose of an op-amp configured with negative feedback?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-28-a",
          "option_text": "Stabilizing closed-loop gain and broadening bandwidth",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-28-b",
          "option_text": "Maximizing open-loop saturation",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-28-c",
          "option_text": "Generating high-frequency carrier oscillations",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-28-d",
          "option_text": "Eliminating input impedance",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-29",
      "question_text": "In a 4-stroke internal combustion engine, during which stroke is mechanical work delivered to the crankshaft?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-29-a",
          "option_text": "Power (Expansion) Stroke",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-29-b",
          "option_text": "Compression Stroke",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-29-c",
          "option_text": "Intake Stroke",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-29-d",
          "option_text": "Exhaust Stroke",
          "is_correct": false
        }
      ]
    },
    {
      "id": "mechanical-engineering-30",
      "question_text": "What does the Reynolds Number in fluid dynamics indicate?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "mechanical-engineering-30-a",
          "option_text": "Ratio of inertial forces to viscous forces",
          "is_correct": true
        },
        {
          "id": "mechanical-engineering-30-b",
          "option_text": "Ratio of buoyant forces to drag forces",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-30-c",
          "option_text": "Ratio of pressure forces to surface tension",
          "is_correct": false
        },
        {
          "id": "mechanical-engineering-30-d",
          "option_text": "Velocity of sound in the medium",
          "is_correct": false
        }
      ]
    }
  ],
  "biotechnology": [
    {
      "id": "biotechnology-1",
      "question_text": "What enzyme is primarily used in Polymerase Chain Reaction (PCR) to synthesize new DNA strands at high temperatures?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-1-a",
          "option_text": "Taq Polymerase (from Thermus aquaticus)",
          "is_correct": true
        },
        {
          "id": "biotechnology-1-b",
          "option_text": "DNA Ligase",
          "is_correct": false
        },
        {
          "id": "biotechnology-1-c",
          "option_text": "RNA Polymerase II",
          "is_correct": false
        },
        {
          "id": "biotechnology-1-d",
          "option_text": "DNA Topoisomerase",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-2",
      "question_text": "In recombinant DNA technology, which enzymes act as 'molecular scissors' to cleave DNA at specific palindromic recognition sequences?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-2-a",
          "option_text": "Restriction Endonucleases",
          "is_correct": true
        },
        {
          "id": "biotechnology-2-b",
          "option_text": "DNA Polymerases",
          "is_correct": false
        },
        {
          "id": "biotechnology-2-c",
          "option_text": "Reverse Transcriptases",
          "is_correct": false
        },
        {
          "id": "biotechnology-2-d",
          "option_text": "Exonucleases",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-3",
      "question_text": "What is the primary function of DNA Ligase during molecular cloning?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-3-a",
          "option_text": "Catalyzing the formation of phosphodiester bonds between adjacent DNA fragments",
          "is_correct": true
        },
        {
          "id": "biotechnology-3-b",
          "option_text": "Unwinding the DNA double helix",
          "is_correct": false
        },
        {
          "id": "biotechnology-3-c",
          "option_text": "Synthesizing RNA primers",
          "is_correct": false
        },
        {
          "id": "biotechnology-3-d",
          "option_text": "Degrading bacterial cell walls",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-4",
      "question_text": "Which genome editing technology utilizes a synthetic guide RNA (gRNA) and an endonuclease to create targeted double-strand breaks?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-4-a",
          "option_text": "CRISPR-Cas9",
          "is_correct": true
        },
        {
          "id": "biotechnology-4-b",
          "option_text": "Sanger Sequencing",
          "is_correct": false
        },
        {
          "id": "biotechnology-4-c",
          "option_text": "Northern Blotting",
          "is_correct": false
        },
        {
          "id": "biotechnology-4-d",
          "option_text": "Microarray Analysis",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-5",
      "question_text": "In Sanger chain-termination DNA sequencing, which modified nucleotides terminate further strand elongation?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-5-a",
          "option_text": "Dideoxynucleotide triphosphates (ddNTPs)",
          "is_correct": true
        },
        {
          "id": "biotechnology-5-b",
          "option_text": "Deoxynucleotide triphosphates (dNTPs)",
          "is_correct": false
        },
        {
          "id": "biotechnology-5-c",
          "option_text": "Ribonucleotide triphosphates (rNTPs)",
          "is_correct": false
        },
        {
          "id": "biotechnology-5-d",
          "option_text": "Methylated cytosines",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-6",
      "question_text": "What widely-used bioinformatics tool finds regions of local similarity between biological nucleotide or protein sequences?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-6-a",
          "option_text": "BLAST (Basic Local Alignment Search Tool)",
          "is_correct": true
        },
        {
          "id": "biotechnology-6-b",
          "option_text": "AutoCAD",
          "is_correct": false
        },
        {
          "id": "biotechnology-6-c",
          "option_text": "Docker",
          "is_correct": false
        },
        {
          "id": "biotechnology-6-d",
          "option_text": "Apache Spark",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-7",
      "question_text": "In Western Blotting, which biological molecule is specifically detected and quantified using target antibodies?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-7-a",
          "option_text": "Specific target proteins",
          "is_correct": true
        },
        {
          "id": "biotechnology-7-b",
          "option_text": "Double-stranded DNA fragments",
          "is_correct": false
        },
        {
          "id": "biotechnology-7-c",
          "option_text": "Messenger RNA transcripts",
          "is_correct": false
        },
        {
          "id": "biotechnology-7-d",
          "option_text": "Lipid bilayer membranes",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-8",
      "question_text": "Which technique is standardly used in downstream bioprocessing to separate and purify proteins based on charge, size, or affinity?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-8-a",
          "option_text": "Column Chromatography (e.g. Affinity or Ion-Exchange)",
          "is_correct": true
        },
        {
          "id": "biotechnology-8-b",
          "option_text": "Centrifugal Milling",
          "is_correct": false
        },
        {
          "id": "biotechnology-8-c",
          "option_text": "Distillation Fractionation",
          "is_correct": false
        },
        {
          "id": "biotechnology-8-d",
          "option_text": "Sintering",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-9",
      "question_text": "In eukaryotic gene expression, what post-transcriptional process removes non-coding introns and splices exons together?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-9-a",
          "option_text": "RNA Splicing",
          "is_correct": true
        },
        {
          "id": "biotechnology-9-b",
          "option_text": "DNA Replication",
          "is_correct": false
        },
        {
          "id": "biotechnology-9-c",
          "option_text": "Western Blotting",
          "is_correct": false
        },
        {
          "id": "biotechnology-9-d",
          "option_text": "Cell Lysis",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-10",
      "question_text": "What is a circular, double-stranded extra-chromosomal DNA molecule commonly used as a cloning vector in genetic engineering?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-10-a",
          "option_text": "Plasmid",
          "is_correct": true
        },
        {
          "id": "biotechnology-10-b",
          "option_text": "Ribosome",
          "is_correct": false
        },
        {
          "id": "biotechnology-10-c",
          "option_text": "Centrosome",
          "is_correct": false
        },
        {
          "id": "biotechnology-10-d",
          "option_text": "Bacteriophage coat",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-11",
      "question_text": "Which immunological assay uses enzyme-linked antibodies to detect and quantify soluble antigens or antibodies in liquid samples?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-11-a",
          "option_text": "ELISA (Enzyme-Linked Immunosorbent Assay)",
          "is_correct": true
        },
        {
          "id": "biotechnology-11-b",
          "option_text": "Gas Chromatography",
          "is_correct": false
        },
        {
          "id": "biotechnology-11-c",
          "option_text": "X-ray Diffraction",
          "is_correct": false
        },
        {
          "id": "biotechnology-11-d",
          "option_text": "Polyacrylamide Gel Drying",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-12",
      "question_text": "In industrial fermentation and bioprocessing, what specialized vessel maintains controlled temperature, pH, and dissolved oxygen for microbial growth?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-12-a",
          "option_text": "Bioreactor / Fermenter",
          "is_correct": true
        },
        {
          "id": "biotechnology-12-b",
          "option_text": "Autoclave Chamber",
          "is_correct": false
        },
        {
          "id": "biotechnology-12-c",
          "option_text": "Bunsen Burner",
          "is_correct": false
        },
        {
          "id": "biotechnology-12-d",
          "option_text": "Centrifugal Dryer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-13",
      "question_text": "What text-based file format in bioinformatics represents nucleotide or peptide sequences using single-letter codes preceded by a header line starting with '>'?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-13-a",
          "option_text": "FASTA format",
          "is_correct": true
        },
        {
          "id": "biotechnology-13-b",
          "option_text": "JSON Schema",
          "is_correct": false
        },
        {
          "id": "biotechnology-13-c",
          "option_text": "CSV Matrix",
          "is_correct": false
        },
        {
          "id": "biotechnology-13-d",
          "option_text": "YAML Config",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-14",
      "question_text": "Which high-throughput genomic technique is used to measure the global expression levels of thousands of RNA transcripts simultaneously?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-14-a",
          "option_text": "RNA-Seq (Next-Generation RNA Sequencing)",
          "is_correct": true
        },
        {
          "id": "biotechnology-14-b",
          "option_text": "Southern Blotting",
          "is_correct": false
        },
        {
          "id": "biotechnology-14-c",
          "option_text": "Paper Chromatography",
          "is_correct": false
        },
        {
          "id": "biotechnology-14-d",
          "option_text": "Gram Staining",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-15",
      "question_text": "In molecular biology and cDNA library construction, what enzyme synthesizes complementary DNA (cDNA) using an RNA template?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-15-a",
          "option_text": "Reverse Transcriptase",
          "is_correct": true
        },
        {
          "id": "biotechnology-15-b",
          "option_text": "DNA Gyrase",
          "is_correct": false
        },
        {
          "id": "biotechnology-15-c",
          "option_text": "Alkaline Phosphatase",
          "is_correct": false
        },
        {
          "id": "biotechnology-15-d",
          "option_text": "RNA Helicase",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-16",
      "question_text": "What is the computational process of identifying genes, coding regions, and regulatory motifs within raw genomic sequence assemblies?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-16-a",
          "option_text": "Genome Annotation",
          "is_correct": true
        },
        {
          "id": "biotechnology-16-b",
          "option_text": "Genome Translation",
          "is_correct": false
        },
        {
          "id": "biotechnology-16-c",
          "option_text": "Sequence Annealing",
          "is_correct": false
        },
        {
          "id": "biotechnology-16-d",
          "option_text": "Colony PCR",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-17",
      "question_text": "In agarose gel electrophoresis, toward which electrode do negatively charged DNA fragments migrate, and which fragments travel fastest?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-17-a",
          "option_text": "Toward the positive anode; smaller fragments travel faster",
          "is_correct": true
        },
        {
          "id": "biotechnology-17-b",
          "option_text": "Toward the negative cathode; larger fragments travel faster",
          "is_correct": false
        },
        {
          "id": "biotechnology-17-c",
          "option_text": "Toward the negative cathode; smaller fragments travel faster",
          "is_correct": false
        },
        {
          "id": "biotechnology-17-d",
          "option_text": "Toward the positive anode; larger fragments travel faster",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-18",
      "question_text": "Monoclonal antibodies are industrially produced using hybridoma technology by fusing which two specific cell types?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-18-a",
          "option_text": "B lymphocytes (antibody-producing plasma cells) and Myeloma (cancer) cells",
          "is_correct": true
        },
        {
          "id": "biotechnology-18-b",
          "option_text": "T lymphocytes and Red Blood cells",
          "is_correct": false
        },
        {
          "id": "biotechnology-18-c",
          "option_text": "Bacterial E. coli and Yeast cells",
          "is_correct": false
        },
        {
          "id": "biotechnology-18-d",
          "option_text": "Macrophage cells and Fibroblasts",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-19",
      "question_text": "Which comprehensive public biological repository hosted by NCBI archives all publicly available DNA and RNA sequence records?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-19-a",
          "option_text": "GenBank",
          "is_correct": true
        },
        {
          "id": "biotechnology-19-b",
          "option_text": "Protein Data Bank (PDB)",
          "is_correct": false
        },
        {
          "id": "biotechnology-19-c",
          "option_text": "GitHub",
          "is_correct": false
        },
        {
          "id": "biotechnology-19-d",
          "option_text": "PubChem",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-20",
      "question_text": "In a closed microbial batch growth curve, which phase is characterized by an exponential increase in viable bacterial cell numbers?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-20-a",
          "option_text": "Log (Exponential) Phase",
          "is_correct": true
        },
        {
          "id": "biotechnology-20-b",
          "option_text": "Lag Phase",
          "is_correct": false
        },
        {
          "id": "biotechnology-20-c",
          "option_text": "Stationary Phase",
          "is_correct": false
        },
        {
          "id": "biotechnology-20-d",
          "option_text": "Death (Decline) Phase",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-21",
      "question_text": "What is the primary analytical application of Mass Spectrometry (MS) in modern proteomics?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-21-a",
          "option_text": "Accurately determining protein molecular mass, sequence identity, and post-translational modifications (m/z)",
          "is_correct": true
        },
        {
          "id": "biotechnology-21-b",
          "option_text": "Amplifying DNA templates exponentially",
          "is_correct": false
        },
        {
          "id": "biotechnology-21-c",
          "option_text": "Visualizing live bacterial motility under dark-field microscopy",
          "is_correct": false
        },
        {
          "id": "biotechnology-21-d",
          "option_text": "Measuring osmotic pressure in blood plasma",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-22",
      "question_text": "Which term denotes an organism whose genome has been stably altered by the introduction of foreign exogenous recombinant DNA?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-22-a",
          "option_text": "Transgenic Organism (Genetically Modified Organism)",
          "is_correct": true
        },
        {
          "id": "biotechnology-22-b",
          "option_text": "Wild-type Strain",
          "is_correct": false
        },
        {
          "id": "biotechnology-22-c",
          "option_text": "Polyploid Hybrid",
          "is_correct": false
        },
        {
          "id": "biotechnology-22-d",
          "option_text": "Obligate Aerobe",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-23",
      "question_text": "In bioinformatics sequence analysis, which scoring substitution matrix is standardly used for comparing moderately divergent protein alignments?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-23-a",
          "option_text": "BLOSUM62",
          "is_correct": true
        },
        {
          "id": "biotechnology-23-b",
          "option_text": "Identity Matrix",
          "is_correct": false
        },
        {
          "id": "biotechnology-23-c",
          "option_text": "ASCII Lookup Table",
          "is_correct": false
        },
        {
          "id": "biotechnology-23-d",
          "option_text": "Hamming Distance Table",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-24",
      "question_text": "Which fluorescent intercalating dye is widely added to agarose gels to visualize separated DNA bands under ultraviolet light?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-24-a",
          "option_text": "Ethidium Bromide (or GelRed / SYBR Safe)",
          "is_correct": true
        },
        {
          "id": "biotechnology-24-b",
          "option_text": "Crystal Violet",
          "is_correct": false
        },
        {
          "id": "biotechnology-24-c",
          "option_text": "Methylene Blue",
          "is_correct": false
        },
        {
          "id": "biotechnology-24-d",
          "option_text": "Phenolphthalein",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-25",
      "question_text": "Which cellular enzyme is responsible for unwinding the double-stranded DNA helix at the replication fork in living cells?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-25-a",
          "option_text": "DNA Helicase",
          "is_correct": true
        },
        {
          "id": "biotechnology-25-b",
          "option_text": "DNA Ligase",
          "is_correct": false
        },
        {
          "id": "biotechnology-25-c",
          "option_text": "DNA Polymerase I",
          "is_correct": false
        },
        {
          "id": "biotechnology-25-d",
          "option_text": "Topoisomerase II",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-26",
      "question_text": "In biopharmaceuticals, what is a 'Biosimilar' drug?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-26-a",
          "option_text": "A biologic medical product highly similar to an already approved reference biologic with no clinically meaningful differences",
          "is_correct": true
        },
        {
          "id": "biotechnology-26-b",
          "option_text": "A synthetic small-molecule generic chemical compound",
          "is_correct": false
        },
        {
          "id": "biotechnology-26-c",
          "option_text": "An herbal homeopathic nutritional supplement",
          "is_correct": false
        },
        {
          "id": "biotechnology-26-d",
          "option_text": "A completely untested novel experimental vaccine",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-27",
      "question_text": "What field of genomics analyzes the collective genomic DNA extracted directly from whole environmental or clinical microbiome communities?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-27-a",
          "option_text": "Metagenomics",
          "is_correct": true
        },
        {
          "id": "biotechnology-27-b",
          "option_text": "Single-cell Epigenetics",
          "is_correct": false
        },
        {
          "id": "biotechnology-27-c",
          "option_text": "Structural Crystallography",
          "is_correct": false
        },
        {
          "id": "biotechnology-27-d",
          "option_text": "Comparative Anatomy",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-28",
      "question_text": "In mammalian cell culture, what gas concentration and buffer system is standardly used in incubators to maintain physiological pH 7.4?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-28-a",
          "option_text": "5% CO2 atmosphere with Sodium Bicarbonate buffer in media",
          "is_correct": true
        },
        {
          "id": "biotechnology-28-b",
          "option_text": "100% Oxygen with Acetic acid buffer",
          "is_correct": false
        },
        {
          "id": "biotechnology-28-c",
          "option_text": "Pure Nitrogen with Potassium Hydroxide",
          "is_correct": false
        },
        {
          "id": "biotechnology-28-d",
          "option_text": "Argon gas with Hydrochloric acid",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-29",
      "question_text": "In molecular biology, which hybridization blotting technique is specifically designed to detect target DNA sequences using labeled probes?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-29-a",
          "option_text": "Southern Blotting",
          "is_correct": true
        },
        {
          "id": "biotechnology-29-b",
          "option_text": "Northern Blotting (for RNA)",
          "is_correct": false
        },
        {
          "id": "biotechnology-29-c",
          "option_text": "Western Blotting (for Proteins)",
          "is_correct": false
        },
        {
          "id": "biotechnology-29-d",
          "option_text": "Eastern Blotting",
          "is_correct": false
        }
      ]
    },
    {
      "id": "biotechnology-30",
      "question_text": "What computational deep learning system developed by DeepMind accurately predicts the 3D tertiary structures of proteins from primary amino acid sequences?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "biotechnology-30-a",
          "option_text": "AlphaFold",
          "is_correct": true
        },
        {
          "id": "biotechnology-30-b",
          "option_text": "ChatGPT",
          "is_correct": false
        },
        {
          "id": "biotechnology-30-c",
          "option_text": "TensorFlow Lite",
          "is_correct": false
        },
        {
          "id": "biotechnology-30-d",
          "option_text": "CRISPR-Cas12",
          "is_correct": false
        }
      ]
    }
  ],
  "civil-engineering": [
    {
      "id": "civil-engineering-1",
      "question_text": "What test is standardly performed on fresh concrete on a construction site to measure its workability and consistency?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-1-a",
          "option_text": "Slump Cone Test",
          "is_correct": true
        },
        {
          "id": "civil-engineering-1-b",
          "option_text": "Tensile Split Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-1-c",
          "option_text": "Core Cutter Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-1-d",
          "option_text": "Proctor Compaction Test",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-2",
      "question_text": "In structural reinforced concrete (RCC) design, why is steel rebar positioned in the tension zone of a horizontal beam?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-2-a",
          "option_text": "Concrete is strong in compression but weak in tension; steel carries the tensile stresses",
          "is_correct": true
        },
        {
          "id": "civil-engineering-2-b",
          "option_text": "Steel prevents water absorption into the concrete core",
          "is_correct": false
        },
        {
          "id": "civil-engineering-2-c",
          "option_text": "Steel reduces the dead weight of the concrete beam",
          "is_correct": false
        },
        {
          "id": "civil-engineering-2-d",
          "option_text": "Steel provides thermal insulation against ambient freezing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-3",
      "question_text": "What laboratory test is conducted on soil samples to determine their optimum moisture content (OMC) and maximum dry density (MDD)?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-3-a",
          "option_text": "Standard Proctor Compaction Test",
          "is_correct": true
        },
        {
          "id": "civil-engineering-3-b",
          "option_text": "Direct Shear Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-3-c",
          "option_text": "Hydrometer Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-3-d",
          "option_text": "Atterberg Limit Test",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-4",
      "question_text": "In geotechnical engineering, what equation proposed by Karl Terzaghi is widely used to calculate the ultimate bearing capacity of shallow strip footings?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-4-a",
          "option_text": "q_ult = c*Nc + q*Nq + 0.5*gamma*B*Ngamma",
          "is_correct": true
        },
        {
          "id": "civil-engineering-4-b",
          "option_text": "V = I * R",
          "is_correct": false
        },
        {
          "id": "civil-engineering-4-c",
          "option_text": "PV = nRT",
          "is_correct": false
        },
        {
          "id": "civil-engineering-4-d",
          "option_text": "F = m * a",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-5",
      "question_text": "Which advanced surveying instrument integrates an electronic theodolite, an electronic distance meter (EDM), and internal microprocessor data logging?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-5-a",
          "option_text": "Total Station",
          "is_correct": true
        },
        {
          "id": "civil-engineering-5-b",
          "option_text": "Dumpy Level",
          "is_correct": false
        },
        {
          "id": "civil-engineering-5-c",
          "option_text": "Cross Staff",
          "is_correct": false
        },
        {
          "id": "civil-engineering-5-d",
          "option_text": "Prismatic Compass",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-6",
      "question_text": "In prestressed concrete structures, what is the primary structural advantage over conventional reinforced concrete?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-6-a",
          "option_text": "Internal compressive stresses counteract external tensile loads, reducing cracking and deflections",
          "is_correct": true
        },
        {
          "id": "civil-engineering-6-b",
          "option_text": "Prestressed concrete requires no steel tendons or cables",
          "is_correct": false
        },
        {
          "id": "civil-engineering-6-c",
          "option_text": "It completely eliminates the curing period of concrete",
          "is_correct": false
        },
        {
          "id": "civil-engineering-6-d",
          "option_text": "It increases concrete permeability for drainage",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-7",
      "question_text": "What law governs the laminar flow of groundwater through a porous soil medium?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-7-a",
          "option_text": "Darcy's Law (Q = k * i * A)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-7-b",
          "option_text": "Hooke's Law",
          "is_correct": false
        },
        {
          "id": "civil-engineering-7-c",
          "option_text": "Bernoulli's Equation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-7-d",
          "option_text": "Newton's Law of Viscosity",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-8",
      "question_text": "In highway and flexible pavement design, what empirical penetration test measures the mechanical strength of subgrade soil?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-8-a",
          "option_text": "California Bearing Ratio (CBR) Test",
          "is_correct": true
        },
        {
          "id": "civil-engineering-8-b",
          "option_text": "Vicat Needle Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-8-c",
          "option_text": "Los Angeles Abrasion Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-8-d",
          "option_text": "Soundness Test",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-9",
      "question_text": "In structural column analysis, what formula gives the theoretical critical buckling load (P_cr) for an ideal slender column?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-9-a",
          "option_text": "Euler's Buckling Formula (P_cr = pi^2 * E * I / L_eff^2)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-9-b",
          "option_text": "Rankine Formula",
          "is_correct": false
        },
        {
          "id": "civil-engineering-9-c",
          "option_text": "Mohr's Circle Equation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-9-d",
          "option_text": "Castigliano's Theorem",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-10",
      "question_text": "In truss analysis, which method involves isolating individual joints as concurrent coplanar force systems in static equilibrium?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-10-a",
          "option_text": "Method of Joints",
          "is_correct": true
        },
        {
          "id": "civil-engineering-10-b",
          "option_text": "Finite Difference Method",
          "is_correct": false
        },
        {
          "id": "civil-engineering-10-c",
          "option_text": "Moment Distribution Method",
          "is_correct": false
        },
        {
          "id": "civil-engineering-10-d",
          "option_text": "Slope Deflection Method",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-11",
      "question_text": "How does an increase in the Water-Cement (w/c) ratio beyond the optimum affect the compressive strength of hardened concrete?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-11-a",
          "option_text": "Significantly decreases compressive strength due to increased capillary porosity",
          "is_correct": true
        },
        {
          "id": "civil-engineering-11-b",
          "option_text": "Increases compressive strength exponentially",
          "is_correct": false
        },
        {
          "id": "civil-engineering-11-c",
          "option_text": "Has zero impact on mechanical strength",
          "is_correct": false
        },
        {
          "id": "civil-engineering-11-d",
          "option_text": "Increases tensile resistance without affecting compression",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-12",
      "question_text": "In geotechnical retaining wall design, which theory assumes a cohesionless, dry granular soil mass with planar rupture surfaces?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-12-a",
          "option_text": "Rankine's Earth Pressure Theory",
          "is_correct": true
        },
        {
          "id": "civil-engineering-12-b",
          "option_text": "Boussinesq Stress Theory",
          "is_correct": false
        },
        {
          "id": "civil-engineering-12-c",
          "option_text": "Westergaard Theory",
          "is_correct": false
        },
        {
          "id": "civil-engineering-12-d",
          "option_text": "Bishop's Slip Circle Method",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-13",
      "question_text": "In environmental wastewater engineering, what parameter quantifies the amount of dissolved oxygen required by aerobic microorganisms to decompose organic matter?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-13-a",
          "option_text": "Biochemical Oxygen Demand (BOD5)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-13-b",
          "option_text": "Chemical Oxygen Demand (COD)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-13-c",
          "option_text": "Total Suspended Solids (TSS)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-13-d",
          "option_text": "Turbidity Index",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-14",
      "question_text": "In hydrology and stormwater design, what is the 'Rational Formula' used to estimate peak surface runoff discharge?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-14-a",
          "option_text": "Q = C * I * A",
          "is_correct": true
        },
        {
          "id": "civil-engineering-14-b",
          "option_text": "Q = A * V",
          "is_correct": false
        },
        {
          "id": "civil-engineering-14-c",
          "option_text": "H = f * L * V^2 / (2 * g * D)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-14-d",
          "option_text": "P = 2 * pi * N * T / 60",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-15",
      "question_text": "Which cement property is determined in the laboratory using a Vicat apparatus with standard needles?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-15-a",
          "option_text": "Initial and Final Setting Times and Normal Consistency",
          "is_correct": true
        },
        {
          "id": "civil-engineering-15-b",
          "option_text": "Compressive Strength of Mortar Cubes",
          "is_correct": false
        },
        {
          "id": "civil-engineering-15-c",
          "option_text": "Soundness due to Free Lime",
          "is_correct": false
        },
        {
          "id": "civil-engineering-15-d",
          "option_text": "Fineness by Sieve Analysis",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-16",
      "question_text": "In structural analysis, what does a Shear Force Diagram (SFD) plot across the span of a loaded beam?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-16-a",
          "option_text": "Internal vertical transverse shear force at each cross-section",
          "is_correct": true
        },
        {
          "id": "civil-engineering-16-b",
          "option_text": "External bending moments only",
          "is_correct": false
        },
        {
          "id": "civil-engineering-16-c",
          "option_text": "Axial tension in the supports",
          "is_correct": false
        },
        {
          "id": "civil-engineering-16-d",
          "option_text": "Deflection angle in radians",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-17",
      "question_text": "In earthquake-resistant structural engineering, what design characteristic allows a building frame to undergo large inelastic deformations without sudden collapse?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-17-a",
          "option_text": "Ductility",
          "is_correct": true
        },
        {
          "id": "civil-engineering-17-b",
          "option_text": "Brittleness",
          "is_correct": false
        },
        {
          "id": "civil-engineering-17-c",
          "option_text": "Thermal Expansion",
          "is_correct": false
        },
        {
          "id": "civil-engineering-17-d",
          "option_text": "Permeability",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-18",
      "question_text": "What laboratory test is conducted on bitumen binders to evaluate their hardness and consistency at 25 degrees Celsius?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-18-a",
          "option_text": "Penetration Test",
          "is_correct": true
        },
        {
          "id": "civil-engineering-18-b",
          "option_text": "Softening Point Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-18-c",
          "option_text": "Ductility Briquette Test",
          "is_correct": false
        },
        {
          "id": "civil-engineering-18-d",
          "option_text": "Flash and Fire Point Test",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-19",
      "question_text": "In open channel hydraulics, what dimensionless number distinguishes subcritical flow (Fr < 1) from supercritical flow (Fr > 1)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-19-a",
          "option_text": "Froude Number (Fr)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-19-b",
          "option_text": "Reynolds Number (Re)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-19-c",
          "option_text": "Mach Number (Ma)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-19-d",
          "option_text": "Weber Number (We)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-20",
      "question_text": "Which foundation type is most suitable for distributing heavy structural column loads over weak, highly compressible soil strata across the entire building footprint?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-20-a",
          "option_text": "Raft (Mat) Foundation",
          "is_correct": true
        },
        {
          "id": "civil-engineering-20-b",
          "option_text": "Isolated Pad Footing",
          "is_correct": false
        },
        {
          "id": "civil-engineering-20-c",
          "option_text": "Stepped Footing",
          "is_correct": false
        },
        {
          "id": "civil-engineering-20-d",
          "option_text": "Strap Footing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-21",
      "question_text": "In soil mechanics, what are the Atterberg limits used to delineate the consistency states of fine-grained cohesive soils?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-21-a",
          "option_text": "Liquid Limit, Plastic Limit, and Shrinkage Limit",
          "is_correct": true
        },
        {
          "id": "civil-engineering-21-b",
          "option_text": "Void Ratio, Porosity, and Degree of Saturation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-21-c",
          "option_text": "Specific Gravity, Unit Weight, and Moisture Content",
          "is_correct": false
        },
        {
          "id": "civil-engineering-21-d",
          "option_text": "Permeability, Cohesion, and Friction Angle",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-22",
      "question_text": "What is the primary cause of 'bleeding' in freshly placed concrete?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-22-a",
          "option_text": "Upward migration of excess mixing water to the surface due to settlement of heavier aggregate solids",
          "is_correct": true
        },
        {
          "id": "civil-engineering-22-b",
          "option_text": "Excessive hydration heat during curing",
          "is_correct": false
        },
        {
          "id": "civil-engineering-22-c",
          "option_text": "Reaction of aggregate alkali with silica",
          "is_correct": false
        },
        {
          "id": "civil-engineering-22-d",
          "option_text": "Premature drying of surface cement paste",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-23",
      "question_text": "Which surveying method is used to determine differences in elevation between points on the ground relative to a permanent benchmark?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-23-a",
          "option_text": "Differential Spirit Leveling",
          "is_correct": true
        },
        {
          "id": "civil-engineering-23-b",
          "option_text": "Traversing with Compass",
          "is_correct": false
        },
        {
          "id": "civil-engineering-23-c",
          "option_text": "Triangulation Baseline Measurement",
          "is_correct": false
        },
        {
          "id": "civil-engineering-23-d",
          "option_text": "Plane Table Radiation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-24",
      "question_text": "In structural steel design, what structural failure mode governs the design of slender compression members (struts and columns)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-24-a",
          "option_text": "Elastic or Inelastic Buckling",
          "is_correct": true
        },
        {
          "id": "civil-engineering-24-b",
          "option_text": "Brittle Tensile Rupture",
          "is_correct": false
        },
        {
          "id": "civil-engineering-24-c",
          "option_text": "Creep Deformation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-24-d",
          "option_text": "Surface Fatigue Corrosion",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-25",
      "question_text": "What hydraulic formula calculates flow velocity in open gravity conduits such as sewers and drainage canals?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-25-a",
          "option_text": "Manning's Equation (V = (1/n) * R^(2/3) * S^(1/2))",
          "is_correct": true
        },
        {
          "id": "civil-engineering-25-b",
          "option_text": "Hazen-Williams Formula",
          "is_correct": false
        },
        {
          "id": "civil-engineering-25-c",
          "option_text": "Poiseuille's Equation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-25-d",
          "option_text": "Euler's Energy Equation",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-26",
      "question_text": "In geotechnical slope stability analysis, which Swedish circle method divides the soil mass above a potential failure arc into vertical strips?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-26-a",
          "option_text": "Fellenius Method of Slices (Ordinary Method of Slices)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-26-b",
          "option_text": "Terzaghi Bearing Capacity Equation",
          "is_correct": false
        },
        {
          "id": "civil-engineering-26-c",
          "option_text": "Rankine Wedge Method",
          "is_correct": false
        },
        {
          "id": "civil-engineering-26-d",
          "option_text": "Westergaard Elastic Solution",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-27",
      "question_text": "What is the purpose of curing concrete with moisture or ponding for at least 7 to 14 days after placement?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-27-a",
          "option_text": "Maintaining moisture to facilitate complete chemical hydration of Portland cement and strength development",
          "is_correct": true
        },
        {
          "id": "civil-engineering-27-b",
          "option_text": "Cooling down the building frame to prevent thermal shocks",
          "is_correct": false
        },
        {
          "id": "civil-engineering-27-c",
          "option_text": "Washing away surplus sand and fine aggregates",
          "is_correct": false
        },
        {
          "id": "civil-engineering-27-d",
          "option_text": "Softening the outer concrete surface for aesthetic polishing",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-28",
      "question_text": "In transportation engineering, what geometric curve is provided between two tangent straights to counteract centrifugal force on high-speed vehicles?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-28-a",
          "option_text": "Superelevated Circular Curve with Spiral Transition Curves",
          "is_correct": true
        },
        {
          "id": "civil-engineering-28-b",
          "option_text": "Parabolic Crest Vertical Curve",
          "is_correct": false
        },
        {
          "id": "civil-engineering-28-c",
          "option_text": "Sag Curve with drainage inlets",
          "is_correct": false
        },
        {
          "id": "civil-engineering-28-d",
          "option_text": "Broken-back Reverse Curve",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-29",
      "question_text": "Which non-destructive testing (NDT) instrument measures the surface hardness of hardened concrete to estimate its in-situ compressive strength?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-29-a",
          "option_text": "Schmidt Rebound Hammer",
          "is_correct": true
        },
        {
          "id": "civil-engineering-29-b",
          "option_text": "Core Drilling Rig",
          "is_correct": false
        },
        {
          "id": "civil-engineering-29-c",
          "option_text": "Universal Testing Machine (UTM)",
          "is_correct": false
        },
        {
          "id": "civil-engineering-29-d",
          "option_text": "Hydraulic Pull-off Gauge",
          "is_correct": false
        }
      ]
    },
    {
      "id": "civil-engineering-30",
      "question_text": "In urban water supply treatment, what chemical coagulant is most widely added to raw water to destabilize colloidal turbidity particles?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "civil-engineering-30-a",
          "option_text": "Alum (Aluminum Sulfate)",
          "is_correct": true
        },
        {
          "id": "civil-engineering-30-b",
          "option_text": "Calcium Carbonate",
          "is_correct": false
        },
        {
          "id": "civil-engineering-30-c",
          "option_text": "Sodium Chloride",
          "is_correct": false
        },
        {
          "id": "civil-engineering-30-d",
          "option_text": "Activated Charcoal",
          "is_correct": false
        }
      ]
    }
  ],
  "electrical-engineering": [
    {
      "id": "electrical-engineering-1",
      "question_text": "What is the primary cause of core (iron) losses in an AC power transformer?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-1-a",
          "option_text": "Hysteresis loss and Eddy current loss in the magnetic laminations",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-1-b",
          "option_text": "Ohmic I^2*R resistance heating in copper windings",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-1-c",
          "option_text": "Dielectric breakdown of transformer mineral oil",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-1-d",
          "option_text": "Mechanical friction in the bushings",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-2",
      "question_text": "What formula determines the synchronous speed (N_s) of a three-phase AC induction motor with P poles operating at frequency f?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-2-a",
          "option_text": "N_s = 120 * f / P (RPM)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-2-b",
          "option_text": "N_s = 60 * f * P (RPM)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-2-c",
          "option_text": "N_s = f / (120 * P)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-2-d",
          "option_text": "N_s = P * f / 120",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-3",
      "question_text": "In AC circuit analysis, how does connecting a shunt capacitor bank to an inductive industrial load improve power system performance?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-3-a",
          "option_text": "Improves power factor toward unity and reduces lagging reactive power (kVAR) demand",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-3-b",
          "option_text": "Increases harmonic distortion across high-voltage lines",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-3-c",
          "option_text": "Converts alternating current directly into high-voltage direct current",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-3-d",
          "option_text": "Triples the fundamental line frequency",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-4",
      "question_text": "What phenomenon in high-voltage AC transmission lines causes current density to concentrate near the outer surface of conductors?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-4-a",
          "option_text": "Skin Effect",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-4-b",
          "option_text": "Proximity Effect",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-4-c",
          "option_text": "Corona Discharge",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-4-d",
          "option_text": "Ferranti Effect",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-5",
      "question_text": "Under no-load or light-load conditions on long EHV transmission lines, what effect causes the receiving-end voltage to exceed the sending-end voltage?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-5-a",
          "option_text": "Ferranti Effect",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-5-b",
          "option_text": "Skin Effect",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-5-c",
          "option_text": "Stroboscopic Effect",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-5-d",
          "option_text": "Hall Effect",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-6",
      "question_text": "What is the condition for electrical resonance in a series RLC alternating current circuit?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-6-a",
          "option_text": "Inductive reactance equals capacitive reactance (X_L = X_C)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-6-b",
          "option_text": "Total circuit impedance is infinite",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-6-c",
          "option_text": "Resistance R equals zero while voltage is lagging by 90 degrees",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-6-d",
          "option_text": "Current and voltage are in complete phase quadrature",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-7",
      "question_text": "According to Lenz's Law, what is the direction of an induced electromotive force (EMF) in a closed circuit?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-7-a",
          "option_text": "It always opposes the change in magnetic flux that produces it",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-7-b",
          "option_text": "It always reinforces the changing magnetic flux",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-7-c",
          "option_text": "It flows perpendicular to all electrostatic potential fields",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-7-d",
          "option_text": "It remains strictly constant regardless of magnetic field rate of change",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-8",
      "question_text": "Which high-voltage circuit breaker technology utilizes an inert, highly electronegative gas with outstanding arc-quenching properties?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-8-a",
          "option_text": "SF6 (Sulfur Hexafluoride) Circuit Breaker",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-8-b",
          "option_text": "Air-Blast Circuit Breaker",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-8-c",
          "option_text": "Bulk Oil Circuit Breaker",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-8-d",
          "option_text": "Carbon Dioxide Circuit Breaker",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-9",
      "question_text": "In an AC induction motor, what is 'slip' (s) defined as?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-9-a",
          "option_text": "s = (N_s - N_r) / N_s, where N_s is synchronous speed and N_r is rotor speed",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-9-b",
          "option_text": "s = N_r / N_s",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-9-c",
          "option_text": "s = N_s + N_r",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-9-d",
          "option_text": "s = 1 / (N_s - N_r)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-10",
      "question_text": "What is the relationship between line voltage (V_L) and phase voltage (V_ph) in a balanced three-phase Star (Wye) connected AC system?",
      "difficulty": "easy",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-10-a",
          "option_text": "V_L = sqrt(3) * V_ph",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-10-b",
          "option_text": "V_L = V_ph",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-10-c",
          "option_text": "V_L = V_ph / sqrt(3)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-10-d",
          "option_text": "V_L = 3 * V_ph",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-11",
      "question_text": "In power system fault analysis, which type of short-circuit fault occurs most frequently on overhead high-voltage transmission lines?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-11-a",
          "option_text": "Single Line-to-Ground (L-G) Fault",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-11-b",
          "option_text": "Three-Phase Symmetrical (L-L-L) Fault",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-11-c",
          "option_text": "Line-to-Line (L-L) Fault",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-11-d",
          "option_text": "Double Line-to-Ground (L-L-G) Fault",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-12",
      "question_text": "What is the primary function of a Buchholz Relay in an oil-immersed power transformer?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-12-a",
          "option_text": "Detecting internal incipient electrical faults and gas accumulation inside the main transformer tank",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-12-b",
          "option_text": "Measuring secondary load current accurately",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-12-c",
          "option_text": "Cooling the external radiator fins with forced air",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-12-d",
          "option_text": "Regulating primary tap-changer voltages dynamically",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-13",
      "question_text": "What mathematical method is standardly used for analyzing unbalanced three-phase power system faults into positive, negative, and zero sequence components?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-13-a",
          "option_text": "Fortescue's Symmetrical Components Method",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-13-b",
          "option_text": "Fourier Transform Decomposition",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-13-c",
          "option_text": "Laplace Transform Integral",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-13-d",
          "option_text": "Bode Plot Stability Analysis",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-14",
      "question_text": "In electrical machines, what is the purpose of laminating the stator and rotor iron cores?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-14-a",
          "option_text": "To minimize eddy current power losses by increasing electrical resistance between thin sheets",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-14-b",
          "option_text": "To increase the mechanical flexibility of the motor casing",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-14-c",
          "option_text": "To reduce the magnetic permeability of the air gap",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-14-d",
          "option_text": "To decrease the copper winding resistance",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-15",
      "question_text": "Which DC motor speed control method allows operation above the rated base speed?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-15-a",
          "option_text": "Field Flux Weakening Control",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-15-b",
          "option_text": "Armature Resistance Control",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-15-c",
          "option_text": "Armature Voltage Reduction Control",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-15-d",
          "option_text": "Reverse Polarity Switching",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-16",
      "question_text": "What is the ideal input impedance and output impedance of an ideal operational amplifier (Op-Amp)?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-16-a",
          "option_text": "Infinite Input Impedance (Z_in = infinity) and Zero Output Impedance (Z_out = 0)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-16-b",
          "option_text": "Zero Input Impedance and Infinite Output Impedance",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-16-c",
          "option_text": "50 Ohms Input Impedance and 50 Ohms Output Impedance",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-16-d",
          "option_text": "Equal reactive impedance at all frequencies",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-17",
      "question_text": "In an AC synchronous generator (alternator), what type of electrical excitation is supplied to the rotor field windings?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-17-a",
          "option_text": "Direct Current (DC)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-17-b",
          "option_text": "Three-Phase Alternating Current (AC)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-17-c",
          "option_text": "High-Frequency Radio Pulses",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-17-d",
          "option_text": "Square-wave AC with 50% duty cycle",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-18",
      "question_text": "What safety protective device automatically trips an electrical circuit when it detects a differential leakage current escaping to earth ground?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-18-a",
          "option_text": "Residual Current Circuit Breaker (RCCB / GFCI)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-18-b",
          "option_text": "Thermal Overload Relay",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-18-c",
          "option_text": "Fast-acting Cartridge Fuse",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-18-d",
          "option_text": "Surge Arrester Varistor",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-19",
      "question_text": "What theorem states that any linear active bilateral electrical network with two terminals can be replaced by an equivalent single voltage source in series with an impedance?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-19-a",
          "option_text": "Thevenin's Theorem",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-19-b",
          "option_text": "Norton's Theorem",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-19-c",
          "option_text": "Superposition Theorem",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-19-d",
          "option_text": "Maximum Power Transfer Theorem",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-20",
      "question_text": "What is the Maximum Power Transfer condition for a load connected to a linear DC source with internal resistance R_s?",
      "difficulty": "medium",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-20-a",
          "option_text": "Load resistance equals source resistance (R_L = R_s)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-20-b",
          "option_text": "Load resistance is infinite (open circuit)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-20-c",
          "option_text": "Load resistance is zero (short circuit)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-20-d",
          "option_text": "Load resistance is double the source resistance",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-21",
      "question_text": "In electric power transmission, what is the luminous violet glow and hissing sound caused by ionization of air surrounding high-voltage conductors?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-21-a",
          "option_text": "Corona Discharge",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-21-b",
          "option_text": "Skin Effect",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-21-c",
          "option_text": "Arc Flash",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-21-d",
          "option_text": "Eddy Current Luminescence",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-22",
      "question_text": "What type of power semiconductor device combines the simple gate-drive characteristics of MOSFETs with the high-current and low-saturation-voltage capability of bipolar transistors?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-22-a",
          "option_text": "Insulated-Gate Bipolar Transistor (IGBT)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-22-b",
          "option_text": "Silicon-Controlled Rectifier (SCR)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-22-c",
          "option_text": "Zener Diode",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-22-d",
          "option_text": "Schottky Barrier Diode",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-23",
      "question_text": "In solar photovoltaic (PV) power systems, what component converts variable direct current (DC) electricity into synchronized utility-grade alternating current (AC)?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-23-a",
          "option_text": "Grid-Tied Solar Inverter",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-23-b",
          "option_text": "Buck-Boost DC Chopper",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-23-c",
          "option_text": "Analog Rectifier Bridge",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-23-d",
          "option_text": "Current Transformer (CT)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-24",
      "question_text": "What protective instrument is installed at substation overhead entries to divert high-voltage lightning and switching surges safely to ground?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-24-a",
          "option_text": "Surge Arrester (Lightning Arrester)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-24-b",
          "option_text": "Earth Disconnector Switch",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-24-c",
          "option_text": "Current Limiting Reactor",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-24-d",
          "option_text": "Potential Transformer (PT)",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-25",
      "question_text": "In power engineering, what is the per-unit (p.u.) system used for?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-25-a",
          "option_text": "Simplifying complex network calculations by normalizing voltages, currents, and impedances to a common base",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-25-b",
          "option_text": "Calculating electrical tariffs for retail residential consumers",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-25-c",
          "option_text": "Measuring mechanical vibrations in turbine bearings",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-25-d",
          "option_text": "Standardizing the physical dimensions of motor casings",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-26",
      "question_text": "Which motor type has its rotor speed strictly synchronized with the rotating magnetic field of the stator at all operating loads?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-26-a",
          "option_text": "Synchronous Motor",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-26-b",
          "option_text": "Squirrel-Cage Induction Motor",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-26-c",
          "option_text": "Universal Series Motor",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-26-d",
          "option_text": "Shaded-Pole Induction Motor",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-27",
      "question_text": "What is the active power (P) in a balanced three-phase AC circuit with line voltage V_L, line current I_L, and power factor angle theta?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-27-a",
          "option_text": "P = sqrt(3) * V_L * I_L * cos(theta)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-27-b",
          "option_text": "P = 3 * V_L * I_L * sin(theta)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-27-c",
          "option_text": "P = V_L * I_L * cos(theta)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-27-d",
          "option_text": "P = sqrt(2) * V_L * I_L",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-28",
      "question_text": "What starting method is standardly used for medium-to-large three-phase induction motors to reduce inrush starting current without adding external resistance?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-28-a",
          "option_text": "Star-Delta (Wye-Delta) Starter or Soft Starter",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-28-b",
          "option_text": "Direct-On-Line (DOL) Full Voltage Starting",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-28-c",
          "option_text": "DC Injection Braking",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-28-d",
          "option_text": "Series Capacitive Starter",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-29",
      "question_text": "What instrument transformer is specifically designed to step down high line currents safely for measurement by standard 5A ammeters and protective relays?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-29-a",
          "option_text": "Current Transformer (CT)",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-29-b",
          "option_text": "Potential Transformer (PT)",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-29-c",
          "option_text": "Autotransformer",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-29-d",
          "option_text": "Isolation Transformer",
          "is_correct": false
        }
      ]
    },
    {
      "id": "electrical-engineering-30",
      "question_text": "Which law mathematically states that the line integral of magnetic field intensity around any closed loop equals the total enclosed electric current?",
      "difficulty": "hard",
      "marks": 1,
      "options": [
        {
          "id": "electrical-engineering-30-a",
          "option_text": "Ampere's Circuital Law",
          "is_correct": true
        },
        {
          "id": "electrical-engineering-30-b",
          "option_text": "Gauss's Law for Magnetism",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-30-c",
          "option_text": "Coulomb's Inverse Square Law",
          "is_correct": false
        },
        {
          "id": "electrical-engineering-30-d",
          "option_text": "Biot-Savart Law",
          "is_correct": false
        }
      ]
    }
  ]
};

export const ALIAS_MAP: Record<string, string> = {
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


function synthesizeDomainQuestions(domainName: string, domainSlug: string, targetCount: number = 30) {
  const cleanTitle = domainName && domainName.trim() 
    ? domainName.trim() 
    : (domainSlug || 'Technical Domain').replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());

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


function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// In-memory cache for evaluating dynamically synthesized questions
const dynamicAnswerRegistry = new Map<string, string>();

export function getDomainQuestions(
  domainSlug: string,
  domainName?: string,
  targetCount: number = 30
): Question[] {
  const cleanSlug = (domainSlug || '').toLowerCase().trim();
  
  // 1. Resolve domain key from alias map or existing domain questions
  let resolvedKey = ALIAS_MAP[cleanSlug] || Object.keys(DOMAIN_QUESTIONS).find(k => cleanSlug.includes(k) || k.includes(cleanSlug));
  
  let rawList: any[] = [];

  if (resolvedKey && DOMAIN_QUESTIONS[resolvedKey]) {
    rawList = DOMAIN_QUESTIONS[resolvedKey];
  } else {
    // Generate questions for ANY arbitrary custom domain entered under "Others"
    resolvedKey = cleanSlug || 'custom-domain';
    const displayTitle = domainName && domainName.trim()
      ? domainName.trim()
      : cleanSlug.replace(/-/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    
    const generated = synthesizeDomainQuestions(displayTitle, cleanSlug, 30);
    rawList = generated.map((item: any, idx: number) => ({
      id: `${cleanSlug}-${idx + 1}`,
      question_text: item.q,
      difficulty: idx < 10 ? 'easy' : idx < 20 ? 'medium' : 'hard',
      marks: 1,
      options: item.opts.map((optText: string, oIdx: number) => ({
        id: `${cleanSlug}-${idx + 1}-${String.fromCharCode(97 + oIdx)}`,
        option_text: optText,
        is_correct: oIdx === item.ans
      }))
    }));
  }

  // 1. Shuffling of questions for the selected domain
  const shuffledRaw = shuffle(rawList);
  const count = Math.max(1, Math.min(shuffledRaw.length, targetCount || 30));
  const selectedRaw = shuffledRaw.slice(0, count);

  // 2. Build questions with shuffled options (strictly 4 options A, B, C, D)
  const questions: Question[] = selectedRaw.map((q: any, idx: number) => {
    // Strictly take 4 options
    const rawOptions = (q.options || []).slice(0, 4);

    // Register correct option for grading
    const correctOpt = rawOptions.find((o: any) => o.is_correct);
    if (correctOpt) {
      dynamicAnswerRegistry.set(q.id, correctOpt.id);
    }

    // Shuffle the 4 options randomly so correct answer is randomly distributed across A, B, C, D
    const shuffledOptions = shuffle(rawOptions);

    return {
      ...q,
      id: q.id, // Stable question ID for grading lookup
      domain_id: domainSlug,
      active: true,
      display_order: idx + 1,
      created_at: '',
      updated_at: '',
      options: shuffledOptions.map((o: any, oIdx: number) => ({
        id: o.id, // Stable option ID for grading lookup
        question_id: q.id,
        option_text: o.option_text,
        option_order: oIdx + 1,
        is_correct: !!o.is_correct,
      })),
    };
  });

  return questions;
}

export function checkQuestionBankCorrectAnswer(questionId: string, optionId: string): boolean {
  if (!questionId || !optionId) return false;

  // Check dynamic registry first
  if (dynamicAnswerRegistry.has(questionId)) {
    return dynamicAnswerRegistry.get(questionId) === optionId;
  }

  // Authoritative direct lookup across question bank
  for (const questionsList of Object.values(DOMAIN_QUESTIONS)) {
    const q = questionsList.find((item: any) => item.id === questionId);
    if (q && q.options) {
      const opt = q.options.find((o: any) => o.id === optionId);
      if (opt) {
        return !!opt.is_correct;
      }
    }
  }

  // Also check normalized question IDs if slug prefix differs
  for (const questionsList of Object.values(DOMAIN_QUESTIONS)) {
    for (const q of questionsList) {
      if (questionId.endsWith(q.id) || q.id.endsWith(questionId)) {
        const opt = (q.options || []).find((o: any) => o.id === optionId || optionId.endsWith(o.id));
        if (opt) return !!opt.is_correct;
      }
    }
  }

  return false;
}
