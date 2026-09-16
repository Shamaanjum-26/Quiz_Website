export interface TechDomainOption {
  id: string;
  name: string;
  slug: string;
  category: string;
  icon: string;
}

export const TECH_DOMAINS: TechDomainOption[] = [
  // ── 1. Top Featured & Most Popular ──
  { id: 'web-dev', name: 'Full-Stack Web Development', slug: 'web-development', category: 'Featured', icon: '🌐' },
  { id: 'python', name: 'Python Programming', slug: 'python', category: 'Featured', icon: '🐍' },
  { id: 'java', name: 'Java Development', slug: 'java', category: 'Featured', icon: '☕' },
  { id: 'dsa', name: 'Data Structures & Algorithms (DSA)', slug: 'dsa', category: 'Featured', icon: '🧩' },
  { id: 'ai-ml', name: 'Artificial Intelligence & Machine Learning', slug: 'ai-ml', category: 'Featured', icon: '🤖' },
  { id: 'data-science', name: 'Data Science & Analytics', slug: 'data-science', category: 'Featured', icon: '📊' },
  { id: 'cloud-computing', name: 'Cloud Computing (AWS / Azure / GCP)', slug: 'cloud-computing', category: 'Featured', icon: '☁️' },
  { id: 'cyber-security', name: 'Cyber Security & Ethical Hacking', slug: 'cyber-security', category: 'Featured', icon: '🔐' },

  // ── 2. Core Engineering & Non-Tech Disciplines ──
  { id: 'mech-eng', name: 'Mechanical Engineering (CAD / SolidWorks / Thermodynamics)', slug: 'mechanical-engineering', category: 'Core Engineering', icon: '⚙️' },
  { id: 'civil-eng', name: 'Civil Engineering (AutoCAD / Structural / Construction)', slug: 'civil-engineering', category: 'Core Engineering', icon: '🏗️' },
  { id: 'eee-eng', name: 'Electrical & Electronics (EEE / Power / Circuits)', slug: 'electrical-engineering', category: 'Core Engineering', icon: '⚡' },
  { id: 'ece-eng', name: 'Electronics & Communication (ECE / VLSI / Embedded)', slug: 'electronics-communication', category: 'Core Engineering', icon: '📡' },
  { id: 'chemical-eng', name: 'Chemical Engineering & Process Technology', slug: 'chemical-engineering', category: 'Core Engineering', icon: '🧪' },
  { id: 'biotech-eng', name: 'Biotechnology & Bioinformatics', slug: 'biotechnology', category: 'Core Engineering', icon: '🧬' },
  { id: 'aerospace-eng', name: 'Aerospace & Automobile Engineering', slug: 'aerospace-automobile', category: 'Core Engineering', icon: '🚀' },
  { id: 'industrial-eng', name: 'Industrial & Production Engineering', slug: 'industrial-engineering', category: 'Core Engineering', icon: '🏭' },

  // ── 3. Business, Management & Commerce ──
  { id: 'mba-mgmt', name: 'Business Administration & Management (MBA / BBA)', slug: 'business-management', category: 'Management & Commerce', icon: '📈' },
  { id: 'finance-acc', name: 'Finance, Banking & Corporate Accounting', slug: 'finance-accounting', category: 'Management & Commerce', icon: '💳' },
  { id: 'hr-talent', name: 'Human Resource Management (HR) & Talent Acquisition', slug: 'human-resources', category: 'Management & Commerce', icon: '👥' },
  { id: 'digital-marketing', name: 'Digital Marketing, SEO & Growth Marketing', slug: 'digital-marketing', category: 'Management & Commerce', icon: '🎯' },
  { id: 'supply-chain', name: 'Operations & Supply Chain Logistics', slug: 'supply-chain-operations', category: 'Management & Commerce', icon: '🚚' },
  { id: 'sales-bizdev', name: 'B2B Sales & Business Development', slug: 'sales-business-development', category: 'Management & Commerce', icon: '🤝' },

  // ── 4. Design & Creative ──
  { id: 'ui-ux', name: 'UI/UX Design & Product Design (Figma)', slug: 'ui-ux-design', category: 'Design & Product', icon: '🎨' },
  { id: 'product-mgmt', name: 'Product Management & Agile Frameworks', slug: 'product-management', category: 'Design & Product', icon: '📋' },
  { id: 'graphic-media', name: 'Graphic Design & Multimedia Creation', slug: 'graphic-design', category: 'Design & Product', icon: '🖌️' },
  { id: 'tech-writing', name: 'Technical Writing & Documentation', slug: 'technical-writing', category: 'Design & Product', icon: '✍️' },

  // ── 5. Programming Languages ──
  { id: 'javascript', name: 'JavaScript', slug: 'javascript', category: 'Programming Languages', icon: '⚡' },
  { id: 'typescript', name: 'TypeScript', slug: 'typescript', category: 'Programming Languages', icon: '🔷' },
  { id: 'cpp', name: 'C / C++', slug: 'cpp', category: 'Programming Languages', icon: '➕' },
  { id: 'csharp', name: 'C# / .NET', slug: 'csharp', category: 'Programming Languages', icon: '🎯' },
  { id: 'golang', name: 'Go (Golang)', slug: 'golang', category: 'Programming Languages', icon: '🐹' },
  { id: 'rust', name: 'Rust', slug: 'rust', category: 'Programming Languages', icon: '🦀' },
  { id: 'php', name: 'PHP & Laravel', slug: 'php', category: 'Programming Languages', icon: '🐘' },
  { id: 'kotlin', name: 'Kotlin', slug: 'kotlin', category: 'Programming Languages', icon: '📱' },
  { id: 'swift', name: 'Swift (iOS)', slug: 'swift', category: 'Programming Languages', icon: '🍎' },

  // ── 6. Frontend & Modern Web ──
  { id: 'react', name: 'React.js', slug: 'react', category: 'Web Development', icon: '⚛️' },
  { id: 'nextjs', name: 'Next.js & Server Components', slug: 'nextjs', category: 'Web Development', icon: '▲' },
  { id: 'angular', name: 'Angular Framework', slug: 'angular', category: 'Web Development', icon: '🅰️' },
  { id: 'vue', name: 'Vue.js', slug: 'vue', category: 'Web Development', icon: '💚' },
  { id: 'tailwind', name: 'Tailwind CSS & Modern UI', slug: 'tailwind', category: 'Web Development', icon: '🌊' },

  // ── 7. Backend & Databases ──
  { id: 'nodejs', name: 'Node.js & Express', slug: 'nodejs', category: 'Backend & Databases', icon: '🟢' },
  { id: 'springboot', name: 'Spring Boot (Java Enterprise)', slug: 'springboot', category: 'Backend & Databases', icon: '🍃' },
  { id: 'django', name: 'Django & FastAPI (Python)', slug: 'django', category: 'Backend & Databases', icon: '🎸' },
  { id: 'sql-db', name: 'SQL & Relational Databases', slug: 'sql-databases', category: 'Backend & Databases', icon: '🗄️' },
  { id: 'mongodb', name: 'MongoDB & NoSQL', slug: 'mongodb', category: 'Backend & Databases', icon: '🍃' },
  { id: 'redis', name: 'Redis & In-Memory Caching', slug: 'redis', category: 'Backend & Databases', icon: '⚡' },

  // ── 8. DevOps & Cloud ──
  { id: 'devops-ci-cd', name: 'DevOps & CI/CD Pipelines', slug: 'devops-ci-cd', category: 'Cloud & DevOps', icon: '🔄' },
  { id: 'docker-k8s', name: 'Docker & Kubernetes', slug: 'docker', category: 'Cloud & DevOps', icon: '🐳' },
  { id: 'aws', name: 'Amazon Web Services (AWS Cloud)', slug: 'aws', category: 'Cloud & DevOps', icon: '📦' },
  { id: 'linux', name: 'Linux Administration & Shell Scripting', slug: 'linux', category: 'Cloud & DevOps', icon: '🐧' },

  // ── 9. Mobile & Emerging Technologies ──
  { id: 'flutter', name: 'Flutter & Dart (Cross-Platform Mobile)', slug: 'flutter', category: 'Mobile & Emerging', icon: '💙' },
  { id: 'react-native', name: 'React Native', slug: 'react-native', category: 'Mobile & Emerging', icon: '📱' },
  { id: 'blockchain', name: 'Blockchain, Web3 & Smart Contracts', slug: 'blockchain', category: 'Mobile & Emerging', icon: '⛓️' },
  { id: 'iot', name: 'Internet of Things (IoT) & Embedded Systems', slug: 'iot-embedded', category: 'Mobile & Emerging', icon: '📡' },
  { id: 'gen-ai', name: 'Generative AI, LLMs & Prompt Engineering', slug: 'generative-ai', category: 'Mobile & Emerging', icon: '✨' },

  // ── 10. Custom Topic Option ──
  { id: 'custom', name: '✏️ Others / Custom Domain (Enter Your Subject)', slug: 'custom-topic', category: 'Custom', icon: '✍️' },
];
