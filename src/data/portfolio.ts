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
export type TimelineItem = { title: string; organization: string; location?: string; period: string; details: string[]; skills?: string[] };
export type Achievement = { title: string; result: string; description: string; image: string; imageAlt: string; href: string; kind: 'certificate' | 'illustration' | 'event'; accent: 'lime' | 'cyan' | 'violet' };

const github = 'https://github.com/pintu1238';

export const portfolioContent = {
  identity: {
    name: 'Pintu Kumar',
    shortName: 'PK',
    eyebrow: "Hi, I'm Pintu Kumar.",
    roles: ['Full Stack Developer', 'AI Engineer', 'Machine Learning Engineer'],
    headline: 'Building the Future with Code',
    summary: 'Full Stack Developer, AI Engineer and Machine Learning Engineer building intelligent applications from idea to deployment. I work with Next.js, Java, Spring Boot, Node.js, Python and RAG, connecting useful interfaces with dependable backend systems. I currently work on backend development and AI/ML at Code Crafter, following experience at iplairani.com, Globiz Technology, ITJOBXS and Wayspire.',
    location: 'Ludhiana, Punjab, India',
    email: 'pintugupta99880@gmail.com',
    phone: '+91 6284929772',
    profileImage: '/pintu-kumar.jpg',
    resume: '/Pintu_Kumar_Resume.pdf',
    resumeLabel: 'Download Resume',
    github,
    linkedin: 'https://www.linkedin.com/in/pintu-gupta-834254251/',
    youtube: 'https://www.youtube.com/@CoderBoyz-g1j',
    leetcode: 'https://leetcode.com/u/pintu_kumar5161/',
    hackerrank: 'https://www.hackerrank.com/profile/vickygup9900',
  },
  about: {
    paragraphs: [
      "I'm Pintu Kumar, a Full Stack Developer, AI Engineer and Machine Learning Engineer based in Punjab, India. I'm pursuing a B.Tech in Computer Science and Engineering at GNA University, with a CGPA of 8.14.",
      'My work connects software engineering with applied AI: Java and Spring Boot backend services, responsive web applications, REST APIs, retrieval-augmented generation and machine learning pipelines. I currently work as a Backend Developer & AI/ML Developer at Code Crafter. Previously, I worked on AI/ML at iplairani.com, backend development at Globiz Technology, software development at ITJOBXS and machine learning at Wayspire.',
      'I enjoy taking a project through its complete lifecycle, from clean data and experiments to a usable product. I have built 10+ AI/ML projects and solved 250+ DSA and SQL problems. I am currently exploring LangGraph, agentic AI and scalable data engineering, and I welcome opportunities to build useful products with thoughtful teams.',
    ],
    skills: ['Full Stack Development (Next.js, React, Node.js)', 'Machine Learning & Deep Learning', 'Generative AI & LLM Applications', 'RAG, LangChain & AI Agents', 'MLOps (MLflow, Docker, CI/CD)', 'Data Engineering (PySpark, Azure, Databricks)', 'APIs & Databases (FastAPI, PostgreSQL, MongoDB)', 'Data Analysis & Visualization (Power BI)'],
    interests: ['Building useful software', 'Agentic AI & LLMs', 'Open-source collaboration', 'Data engineering', 'Problem solving'],
  },
  experience: [
    {
      title: 'Backend Developer & AI/ML Developer', organization: 'Code Crafter', period: 'July 2026 – Present',
      skills: ['Java', 'Spring Boot', 'Spring Data JPA', 'Hibernate', 'REST APIs', 'SQL', 'Python', 'FastAPI', 'Machine Learning', 'Large Language Models (LLM)', 'Generative AI', 'Retrieval-Augmented Generation (RAG)', 'LangChain', 'Vector Databases', 'Prompt Engineering'],
      details: [
        'Develop backend services and REST APIs with Java and Spring Boot, connecting application workflows with reliable business logic.',
        'Implement SQL persistence using Spring Data JPA and Hibernate, with validation, exception handling and maintainable service layers.',
        'Build and integrate AI/ML capabilities using Python, FastAPI and LLM-based services for intelligent application features.',
        'Work on RAG workflows with LangChain, embeddings and vector databases to connect AI responses with relevant application data.',
        'Collaborate on API integration, testing and deployment across backend and AI/ML services.',
      ],
    },
    {
      title: 'AI/ML Engineer Intern', organization: 'iplairani.com', location: 'Delhi, India · On-site', period: 'January 2026 – June 2026',
      skills: ['Large Language Models (LLM)', 'Generative AI', 'Retrieval-Augmented Generation (RAG)', 'Agentic AI', 'Ollama', 'LangChain', 'Vector Databases', 'Prompt Engineering', 'Python', 'FastAPI', 'MLOps', 'Fine Tuning', 'Natural Language Processing (NLP)', 'Embeddings', 'Semantic Search'],
      details: [
        'Developed Generative AI and NLP applications with Python, Large Language Models (LLMs) and LangChain to support intelligent workflows.',
        'Built Retrieval-Augmented Generation (RAG) pipelines using document preprocessing, chunking, embeddings and vector databases for contextual answers from PDFs and custom datasets.',
        'Implemented agentic AI workflows with multi-step reasoning, tool calling, conversational memory and semantic search.',
        'Integrated open-source LLMs through Ollama and exposed AI capabilities through FastAPI services for application and backend integration.',
        'Worked on prompt engineering and fine-tuning workflows, evaluating response quality and improving the relevance of model outputs.',
        'Applied MLOps practices to model evaluation, monitoring and deployment, supporting maintainable real-time inference workflows.',
      ],
    },
    {
      title: 'Backend Developer Intern', organization: 'Globiz Technology', location: 'Ludhiana, Punjab, India · On-site', period: 'June 2025 – December 2025',
      skills: ['Java', 'Spring Boot', 'Spring MVC', 'Spring Data JPA', 'Hibernate', 'Spring Security', 'REST APIs', 'SQL', 'PostgreSQL', 'JWT Authentication', 'Maven', 'JUnit', 'Mockito', 'Postman', 'Git'],
      details: [
        'Developed Java backend services with Spring Boot, organizing application logic into controller, service and repository layers.',
        'Built REST APIs for application workflows with request validation, consistent responses and centralized exception handling.',
        'Used Spring Data JPA and Hibernate to work with SQL databases, entity relationships and transactional operations.',
        'Worked on authentication and authorization with Spring Security, and collaborated with frontend developers on API integration.',
        'Tested and debugged backend endpoints, reviewed database queries and documented APIs to support maintainable development.',
      ],
    },
    {
      title: 'Software Developer Intern', organization: 'ITJOBXS', location: 'Mumbai, Maharashtra, India · Remote', period: 'May 2025 – June 2025',
      skills: ['MongoDB', 'Express.js', 'React', 'Node.js', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'REST APIs', 'JWT Authentication', 'Responsive Web Design', 'SQL', 'Git', 'Postman', 'Unit Testing'],
      details: [
        'Developed a responsive web section for itjobxs.com, adapting layouts and interactions across desktop and mobile screens.',
        'Worked on user verification and authentication flows, including form validation and integration with backend services.',
        'Used SQL and backend application logic to support structured data access and user-facing features.',
        'Collaborated on feature testing, debugging and interface improvements to keep application workflows consistent.',
      ],
    },
    {
      title: 'Machine Learning Intern', organization: 'Wayspire', location: 'Gurugram, Haryana, India · On-site', period: 'June 2024 – August 2024',
      skills: ['Python', 'Machine Learning', 'NumPy', 'Pandas', 'Scikit-learn', 'Data Cleaning', 'Data Preprocessing', 'Exploratory Data Analysis', 'Feature Engineering', 'Supervised Learning', 'Model Training', 'Model Evaluation', 'Matplotlib', 'Seaborn', 'Jupyter Notebook'],
      details: [
        'Used Python for data cleaning, preprocessing and exploratory analysis to prepare structured datasets for machine learning.',
        'Worked on data ingestion workflows that transformed raw application usage data into analytical datasets for reporting.',
        'Explored feature selection, model training and evaluation to understand predictive performance and model behavior.',
        'Documented data preparation steps and experiment results to support reproducible analysis and collaboration.',
      ],
    },
  ] satisfies TimelineItem[],
  education: [
    { title: 'B.Tech — Computer Science & Engineering', organization: 'GNA University', location: 'Phagwara, Punjab', period: '2022 – Present', details: ['CGPA: 8.14.', 'Focused on artificial intelligence, machine learning, software development and data engineering.'] },
    { title: 'Advance One Year Diploma in Computer Application', organization: 'Progressive Institute of Management & Technology', location: 'Ludhiana, Punjab', period: '1 July 2021 – 30 July 2022', details: ['Successfully completed the Advance One Year Diploma in Computer Application.', 'Grade: A.'] },
    { title: 'Higher Secondary', organization: 'GSSS MultiPurpose', location: 'Ludhiana, Punjab', period: '2022', details: ['Higher Secondary score: 75.8%.'] },
  ] satisfies TimelineItem[],
  projects: [
    {
      title: 'US Visa Approval Prediction — Production MLOps', category: 'Machine Learning',
      description: 'An end-to-end visa approval prediction system with modular ingestion, validation, transformation, training and inference. Includes data drift monitoring, experiment tracking and automated container deployment on AWS.',
      achievement: 'Connected Evidently AI, MLflow, Docker and GitHub Actions across the complete ML lifecycle.',
      stack: ['Python', 'Scikit-learn', 'MLflow', 'MongoDB', 'Evidently AI', 'Docker', 'AWS'],
      github: github + '/MLOPs-Production-Ready-Machine-Learning-Project', accent: 'lime',
    },
    {
      title: 'End-to-End Machine Learning Pipeline', category: 'Machine Learning',
      description: 'A modular ML system covering data ingestion, preprocessing, feature engineering, model training and prediction. A Flask web interface exposes real-time inference, with deployment using Azure services.',
      achievement: 'Separated training and prediction pipelines for a maintainable, reusable ML architecture.',
      stack: ['Python', 'Scikit-learn', 'Pandas', 'Flask', 'Azure', 'Machine Learning'],
      github: github + '/End-to-End-Machine-Learning-Pipeline-with-Modular-Architecture', accent: 'cyan',
    },
    {
      title: 'Intelligent Document Assistant using RAG', category: 'Generative AI',
      description: 'A document question-answering assistant combining LLMs, document chunking, embeddings and semantic retrieval. Explores retrieval with LlamaIndex and Google Gemini, alongside the RAG and API workflows in my resume.',
      achievement: 'Turns document collections into searchable context for grounded question answering.',
      stack: ['Python', 'RAG', 'LlamaIndex', 'Gemini', 'LangChain', 'FAISS', 'FastAPI'],
      github: github + '/Retrival-Using-LlamaIdex-and-Google_Gemini', accent: 'violet',
    },
    {
      title: 'HRMS.sh — Human Resource Management', category: 'Full Stack',
      description: 'A multi-tenant HR platform bringing employee records, attendance, leave, recruitment, payroll and performance into one workspace. Provides role-based experiences for employees, managers, HR teams and organization administrators.',
      achievement: 'Connects people operations, approval workflows and workforce analytics in one platform.',
      stack: ['HR Platform', 'Multi-tenancy', 'Role-based Access', 'Workflow Automation'],
      demo: 'https://hrms.sh/', accent: 'lime',
    },
    {
      title: 'Retail Sales Data Engineering Pipeline', category: 'Data Engineering',
      description: 'An Azure data pipeline using Bronze, Silver and Gold layers. Azure Data Factory ingests sales data, Databricks cleans and transforms it, and Delta Lake holds dimensional models and fact tables.',
      achievement: 'Implements watermark-based incremental loads, Delta MERGE and a sales star schema.',
      stack: ['Azure Data Factory', 'Databricks', 'PySpark', 'Delta Lake', 'Azure SQL'],
      github: github + '/Retail-Sales-Data-Engineering-Pipeline', accent: 'cyan',
    },
    {
      title: 'Spotify Streaming Data Pipeline', category: 'Data Engineering',
      description: 'An Azure lakehouse project combining batch and streaming ingestion with metadata-driven transformations. Uses Spark Structured Streaming, Databricks Autoloader and Delta tables to create analytics-ready datasets.',
      achievement: 'Combines incremental processing, SCD modeling and deployment through Databricks Asset Bundles.',
      stack: ['PySpark', 'Azure', 'Databricks', 'Delta Lake', 'Structured Streaming', 'Unity Catalog'],
      github: github + '/Spotify-Incremental-Streaming-Data-Pipeline', accent: 'lime',
    },
    {
      title: 'Uber Data Analytics Pipeline', category: 'Data Analytics',
      description: 'An end-to-end GCP analytics pipeline for trip records. Python and Mage transform raw data into a dimensional model in BigQuery, with Looker Studio dashboards for fares, revenue and trip patterns.',
      achievement: 'Connects cloud ingestion, star-schema modeling and business reporting in one workflow.',
      stack: ['Python', 'Mage', 'BigQuery', 'Looker Studio', 'Google Cloud'],
      github: github + '/Uber-Data-Analytics-Pipeline', accent: 'violet',
    },
    {
      title: 'Medical Knowledge Chatbot', category: 'Generative AI',
      description: 'A Streamlit RAG prototype for exploring medical reference documents. Uses Hugging Face embeddings, a FAISS vector store and a Groq-hosted LLM to retrieve relevant passages and show source documents with responses.',
      achievement: 'Combines a persistent chat interface with document retrieval and source visibility.',
      stack: ['Python', 'Streamlit', 'LangChain', 'FAISS', 'Hugging Face', 'Groq'],
      github: github + '/Medical-chatbot-huggingface', accent: 'cyan',
    },
    {
      title: 'Smart Recruitment Agent', category: 'AI Applications',
      description: 'A Streamlit application for AI-assisted resume analysis. Explores document extraction, matching resume skills with a job description, and surfacing strengths, gaps and improvement suggestions.',
      achievement: 'Brings resume analysis and job-description review into an interactive application.',
      stack: ['Python', 'Streamlit', 'LangChain', 'Groq', 'PDF Processing'],
      github: github + '/Smart-Recruitment-Agent', accent: 'lime',
    },
    {
      title: 'Railway AI Conversational Assistant', category: 'Natural Language Processing',
      description: 'A conversational prototype for UK railway queries using a fine-tuned T5-small model. Includes a dataset generator with 1,000 conversations across 13 scenarios, a FastAPI backend and a web chat interface.',
      achievement: 'Connects task-specific dataset generation, language-model fine-tuning and API serving.',
      stack: ['Python', 'T5-small', 'FastAPI', 'Transformers', 'NLP'],
      github: github + '/railway-ai-assistant', accent: 'violet',
    },
    {
      title: 'Vehicle Insurance Prediction', category: 'MLOps',
      description: 'A modular insurance prediction project with separate components for ingestion, validation, transformation, training and evaluation. Includes MongoDB access, AWS storage integration and a Dockerized application.',
      achievement: 'Organizes model training, evaluation, persistence and inference into distinct pipeline stages.',
      stack: ['Python', 'Machine Learning', 'MongoDB', 'AWS', 'Docker'],
      github: github + '/Vehicle-Insurance-Prediction-MLOPs', accent: 'lime',
    },
    {
      title: 'Spam Classification with DVC', category: 'MLOps',
      description: 'A reproducible spam-classification workflow with DVC stages for ingestion, text preprocessing, feature engineering, model building and evaluation. DVCLive records accuracy, precision and recall across experiments.',
      achievement: 'Makes the data-to-evaluation workflow repeatable through versioned pipeline stages.',
      stack: ['Python', 'DVC', 'DVCLive', 'NLP', 'Machine Learning'],
      github: github + '/spam-MLOPs-project-using-dvc', accent: 'cyan',
    },
    {
      title: 'MCP Server & Client Experiments', category: 'AI Developer Tools',
      description: 'A hands-on Model Context Protocol project with a Python MCP server and both native Python and LangChain clients. Explores connecting AI applications to tools through FastMCP and MCP adapters.',
      achievement: 'Implements server and client examples for experimenting with tool-connected AI applications.',
      stack: ['Python', 'FastMCP', 'MCP', 'LangChain'],
      github: github + '/MCP_Masterclass', accent: 'violet',
    },
    {
      title: 'VINGO — Food Delivery Platform', category: 'Full Stack',
      description: 'A full-stack food ordering application with customer, shop-owner and delivery interfaces. Includes authentication, shop and menu management, checkout, order tracking and delivery assignment workflows.',
      achievement: 'Connects ordering, shop operations and delivery tracking across a React frontend and Node backend.',
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Socket.IO', 'Redux'],
      github: github + '/VINGO', accent: 'lime',
    },
    {
      title: 'UniEats — Campus Food Operations', category: 'Full Stack SaaS',
      description: 'A campus cafeteria platform for discovering food outlets, browsing menus and placing pickup orders. Includes cuisine filters, favorites, cart checkout, order tracking and dedicated workflows for students and cafeteria partners.',
      achievement: 'Connects student ordering and cafeteria fulfilment with server-calculated pricing and controlled order transitions.',
      stack: ['React', 'TypeScript', 'Express', 'PostgreSQL', 'OAuth'],
      github: github + '/cafe-websites', demo: 'https://cafe-websites-five.vercel.app', accent: 'cyan',
    },
    {
      title: 'Learning Management System', category: 'Full Stack · Team Project',
      description: 'A collaborative learning management project built with Abhi, with separate learner, administration and backend repositories. A web application for bringing an online learning experience into one platform.',
      achievement: 'Worked on a collaborative application with separate frontend, admin and backend codebases.',
      stack: ['JavaScript', 'Web Development', 'REST APIs', 'Team Project'],
      github: github + '/LMS-Learning-Management-System-', accent: 'violet',
    },
  ] satisfies Project[],
  achievements: [
    {title: 'AWS Academy Machine Learning Foundations', result: 'Certificate of Completion', description: 'Completed the 20-hour AWS Academy course on February 23, 2024.', image: '/portfolio-media/certificate-1709348196874.png', imageAlt: 'AWS Academy certificate issued to Pintu Kumar for Machine Learning Foundations', href: '/portfolio-media/certificate-1709348196874.pdf', kind: 'certificate', accent: 'lime'},
    {title: 'Hackathon', result: 'Top 10', description: 'Participated in a hackathon and secured a place among the top 10.', image: '/portfolio-media/pintu-hackathon-top-10.png', imageAlt: 'Team collaborating on a laptop during a hackathon', href: '/portfolio-media/pintu-hackathon-top-10.png', kind: 'event', accent: 'cyan'},
    {title: 'GNA University DevOps Bootcamp', result: 'Certificate of Participation', description: 'Participated in the three-day DevOps bootcamp organized by the Data Pirates Club, September 18–20, 2024.', image: '/portfolio-media/certificate-1727362794680.png', imageAlt: 'GNA University certificate of participation issued to Pintu Kumar for the DevOps bootcamp', href: '/portfolio-media/certificate-1727362794680.pdf', kind: 'certificate', accent: 'violet'},
  ] satisfies Achievement[],
  techStack: ['Python', 'JavaScript', 'TypeScript', 'Next.js', 'React', 'Node.js', 'Express.js', 'Machine Learning', 'Deep Learning', 'NLP', 'Generative AI', 'LangChain', 'RAG', 'Scikit-learn', 'TensorFlow', 'PyTorch', 'FastAPI', 'SQL', 'PostgreSQL', 'Supabase', 'MongoDB', 'MLflow', 'Docker', 'CI/CD', 'PySpark', 'Databricks', 'Azure Data Factory', 'Delta Lake', 'Power BI', 'AWS', 'Git'],
};
