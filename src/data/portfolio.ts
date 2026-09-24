export type Project = {
  title: string;
  category: string;
  description: string;
  achievement: string;
  stack: string[];
  github?: string;
  demo?: string;
  accent: 'lime' | 'cyan' | 'violet';
};

export type TimelineItem = {
  title: string;
  organization: string;
  location: string;
  period: string;
  details: string[];
};

export type Achievement = {
  title: string;
  result: string;
  description: string;
  imageLabel: string;
  accent: 'lime' | 'cyan' | 'violet';
};

export const portfolioContent = {
  identity: {
    name: 'Your Name',
    shortName: 'YN',
    eyebrow: "Hi, I'm Your Name.",
    roles: ['Full Stack Developer', 'AI Engineer', 'Machine Learning Engineer'],
    headline: 'Building the Future with Code',
    summary:
      'I design and ship thoughtful digital products across the stack—from fast Next.js interfaces and reliable Node.js services to practical machine learning systems that solve real problems.',
    location: 'India · Open to remote collaboration',
    email: 'hello@yourdomain.dev',
    phone: '+91 00000 00000',
    profileImage: '',
    resumeLabel: 'Download Resume',
  },
  about: {
    paragraphs: [
      'I am a Full Stack Developer, AI Engineer, and Machine Learning Engineer focused on turning ambitious ideas into clear, dependable products.',
      'My work blends frontend craft with backend systems, data modeling, model experimentation, and deployment. I care about interfaces that feel calm, APIs that are predictable, and AI features that are genuinely useful.',
      'When I am away from the keyboard, I enjoy learning about emerging technology, exploring product ideas, and contributing to communities that help builders grow.',
    ],
    skills: [
      'Next.js & React',
      'Node.js & Express',
      'TypeScript',
      'PostgreSQL & Supabase',
      'Python & FastAPI',
      'Machine Learning',
      'Generative AI',
      'RAG & AI Agents',
    ],
    interests: ['Product engineering', 'Open source', 'AI research', 'Developer tools', 'Cricket', 'World affairs'],
  },
  experience: [
    {
      title: 'Full Stack Developer',
      organization: 'Your Company',
      location: 'Remote',
      period: '2024 — Present',
      details: [
        'Built user-focused web products with Next.js, TypeScript, Node.js, and PostgreSQL.',
        'Collaborated with design and product teams to turn ideas into shippable features.',
      ],
    },
    {
      title: 'AI / Machine Learning Engineer',
      organization: 'Your AI Lab',
      location: 'India',
      period: '2023 — Present',
      details: [
        'Prototyped applied ML and generative AI workflows with measurable product outcomes.',
        'Worked with model evaluation, retrieval pipelines, prompt engineering, and deployment.',
      ],
    },
    {
      title: 'Independent Builder',
      organization: 'Personal Projects',
      location: 'Worldwide',
      period: '2022 — Present',
      details: [
        'Created experiments across frontend development, automation, analytics, and computer vision.',
        'Documented learnings and iterated quickly from proof of concept to polished demo.',
      ],
    },
  ] satisfies TimelineItem[],
  education: [
    {
      title: 'Bachelor of Technology',
      organization: 'Your University',
      location: 'India',
      period: '2021 — 2025',
      details: ['Focused on software engineering, artificial intelligence, data structures, and applied machine learning.'],
    },
    {
      title: 'Professional Learning',
      organization: 'Courses & Communities',
      location: 'Online',
      period: 'Ongoing',
      details: ['Continuously learning through production projects, technical writing, open-source work, and research papers.'],
    },
  ] satisfies TimelineItem[],
  projects: [
    {
      title: 'AI Workspace Copilot',
      category: 'Generative AI',
      description: 'A focused workspace that turns scattered notes, documents, and conversations into searchable answers and next actions.',
      achievement: 'Designed a grounded RAG flow with transparent sources and useful follow-up actions.',
      stack: ['Next.js', 'TypeScript', 'Node.js', 'RAG', 'Postgres'],
      github: '#',
      demo: '#',
      accent: 'lime',
    },
    {
      title: 'Model Evaluation Lab',
      category: 'Machine Learning',
      description: 'A dashboard for comparing model responses, tracking evaluation runs, and finding blind spots before release.',
      achievement: 'Made model quality visible with repeatable datasets, scoring, and review notes.',
      stack: ['Python', 'FastAPI', 'React', 'LLM Evals', 'Charts'],
      github: '#',
      accent: 'cyan',
    },
    {
      title: 'Commerce Pulse',
      category: 'Full Stack Product',
      description: 'An analytics product that helps small teams understand sales, customer behavior, and growth opportunities.',
      achievement: 'Connected a clean data model to fast, decision-ready reporting views.',
      stack: ['Next.js', 'Express', 'Supabase', 'SQL', 'Recharts'],
      github: '#',
      demo: '#',
      accent: 'violet',
    },
    {
      title: 'Vision Notes',
      category: 'Computer Vision',
      description: 'A lightweight image understanding tool that extracts context and turns visual input into structured notes.',
      achievement: 'Combined vision models with a human-friendly review workflow.',
      stack: ['Python', 'OpenCV', 'FastAPI', 'Vision AI'],
      github: '#',
      accent: 'cyan',
    },
    {
      title: 'PromptOps Control Room',
      category: 'Developer Tools',
      description: 'A small control room for versioning prompts, comparing outputs, and tracking the cost of AI workflows.',
      achievement: 'Gave teams a practical feedback loop for improving AI features over time.',
      stack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
      github: '#',
      demo: '#',
      accent: 'lime',
    },
    {
      title: 'FocusFlow',
      category: 'Automation',
      description: 'An intelligent study and work planner that turns goals into small, realistic sessions and reminders.',
      achievement: 'Kept the experience simple while adding personalized recommendations.',
      stack: ['Next.js', 'Express', 'Supabase', 'AI Agents'],
      github: '#',
      accent: 'violet',
    },
    {
      title: 'DocuFlow AI',
      category: 'Document Intelligence',
      description: 'A document workspace that extracts key facts, creates summaries, and keeps every answer linked to its source.',
      achievement: 'Turned long documents into an auditable, searchable knowledge layer.',
      stack: ['Next.js', 'Express', 'OCR', 'RAG'],
      github: '#',
      accent: 'cyan',
    },
    {
      title: 'Signal Studio',
      category: 'Data Analytics',
      description: 'A data exploration dashboard that makes trends, anomalies, and business questions easier to investigate.',
      achievement: 'Built a reusable analytics workflow from ingestion to decision-ready charts.',
      stack: ['Python', 'SQL', 'PostgreSQL', 'Data Viz'],
      github: '#',
      demo: '#',
      accent: 'lime',
    },
    {
      title: 'Vision Sentinel',
      category: 'Computer Vision',
      description: 'A real-time vision prototype for detecting objects, measuring context, and surfacing events that need attention.',
      achievement: 'Combined fast inference with a clear human review surface.',
      stack: ['Python', 'YOLO', 'OpenCV', 'FastAPI'],
      github: '#',
      accent: 'violet',
    },
    {
      title: 'Resume Studio',
      category: 'Product Engineering',
      description: 'A versioned resume builder that keeps one source of truth while making each application easy to tailor.',
      achievement: 'Created a structured editing flow with autosave and reusable templates.',
      stack: ['Next.js', 'TypeScript', 'Supabase', 'PDF'],
      github: '#',
      demo: '#',
      accent: 'cyan',
    },
    {
      title: 'Market Lens',
      category: 'Applied ML',
      description: 'A market intelligence experiment that combines historical data, technical indicators, and plain-language summaries.',
      achievement: 'Made complex signals easier to explore without hiding uncertainty.',
      stack: ['Python', 'Pandas', 'ML', 'Charts'],
      github: '#',
      accent: 'lime',
    },
    {
      title: 'Quiet Inbox',
      category: 'Automation',
      description: 'A privacy-minded notification organizer that helps people see important messages and silence the noise.',
      achievement: 'Kept classification local-first and made the user stay in control.',
      stack: ['React', 'Node.js', 'Rules', 'On-device ML'],
      github: '#',
      accent: 'violet',
    },
  ] satisfies Project[],
  achievements: [
    {
      title: 'Hackathon Finalist',
      result: 'Top 5',
      description: 'Recognized for turning an ambitious technical idea into a working product under time pressure.',
      imageLabel: 'Hackathon certificate',
      accent: 'lime',
    },
    {
      title: 'Open Source Contributor',
      result: 'Community',
      description: 'Contributed ideas, documentation, and practical improvements to developer communities.',
      imageLabel: 'Community recognition',
      accent: 'cyan',
    },
    {
      title: 'Machine Learning Project',
      result: 'Published',
      description: 'Completed an applied project with reproducible experiments, evaluation, and a clear technical story.',
      imageLabel: 'Project showcase',
      accent: 'violet',
    },
    {
      title: 'Technical Excellence',
      result: 'Awarded',
      description: 'Built a track record of learning quickly and delivering dependable engineering work.',
      imageLabel: 'Technical achievement',
      accent: 'lime',
    },
    {
      title: 'Research Showcase',
      result: 'Featured',
      description: 'Shared a practical technical project with a clear explanation of the problem, approach, and outcomes.',
      imageLabel: 'Research showcase',
      accent: 'cyan',
    },
  ] satisfies Achievement[],
  techStack: [
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Node.js',
    'Express.js',
    'PostgreSQL',
    'Supabase',
    'Python',
    'FastAPI',
    'Machine Learning',
    'Deep Learning',
    'Generative AI',
    'RAG',
    'Computer Vision',
    'SQL',
    'Git',
    'AWS',
  ],
};

export type PortfolioContent = typeof portfolioContent;
