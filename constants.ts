import type { Experience, Project, Skill } from './types';
import { BrainCircuit, Database, Code, BarChart4, TestTube, FileText, Bot, Layers3, GitFork, Sigma, Waypoints, Dna, Terminal, PenTool, MessageCircleQuestion, Combine, SmilePlus, Link2, Server, Cloud, Package, AppWindow } from 'lucide-react';

export const experiences: Experience[] = [
  {
    role: "Data Scientist (Part-time)",
    company: "Kidaura",
    period: "Mar 2025 - Current",
    points: [
      "Developed ETL pipelines with Python, reducing data processing time by 30%.",
      "Built scikit-learn models achieving 95% accuracy and 25% error reduction.",
      "Performed anomaly detection and custom analysis for clinical stakeholders.",
    ],
  },
  {
    role: "Founder's Office - Analytics & Partnerships",
    company: "Tummo Labs",
    period: "Jun 2024 - Oct 2024",
    points: [
      "Led analytics for a product launch reaching 47,000+ users in 3 months.",
      "Designed and interpreted A/B tests, increasing user retention by 25%.",
      "Created dashboards for cross-functional data-driven decision making.",
    ],
  },
  {
    role: "Administrator",
    company: "Shloka",
    period: "May 2023 - Dec 2023",
    points: [
      "Improved data collection, achieving 98% data integrity across 50+ groups.",
      "Analyzed engagement metrics with SQL to create stakeholder reports.",
    ],
  },
];

export const projects: Project[] = [
  {
    title: "Clinical Analytics Pipeline",
    description: "Built an end-to-end data pipeline with robust validation, anomaly detection, and automated QA, reducing manual review time by 40%.",
    tech: ["Python", "SQL", "Pandas & NumPy", "ETL Pipelines"],
    repoUrl: "https://github.com/jbanmol/Touchdata_Analysis_clinical.git",
  },
  {
    title: "Neuro-Diverse Medical Classification",
    description: "Applied statistical modeling and cohort analysis to distill user behavior data into actionable product insights for a neuro-diverse context.",
    tech: ["Python", "scikit-learn", "Statistical Modeling", "RAG"],
    repoUrl: "https://github.com/jbanmol/binary_classification_clinical.git",
  },
  {
    title: "AI Builder & Deployer",
    description: "Built an AI agent using GPT-4o-mini that automatically builds, deploys, and updates projects on GitHub based on natural language user queries.",
    tech: ["Python", "OpenAI", "LangChain", "Hugging Face", "Docker"],
    repoUrl: "https://github.com/jbanmol/Build_Deploy_gpt-4o-mini-IITM",
  },
  {
    title: "Movie Review Sentiment Analyzer",
    description: "Developed a Created a high-accuracy sentiment analysis model with Gemini Flash 2.0 to classify movie reviews and fine-tune responses using temperature control.",
    tech: ["Python", "Gemini API", "Pandas & NumPy"],
    repoUrl: "https://github.com/jbanmol/movie_Review_Sentiment_Analyzer",
  },
];

export const skills: Skill[] = [
    { name: "Python", icon: Code },
    { name: "SQL", icon: Database },
    { name: "PostgreSQL", icon: Database },
    { name: "scikit-learn", icon: BrainCircuit },
    { name: "Pandas & NumPy", icon: BarChart4 },
    { name: "ETL Pipelines", icon: Waypoints },
    { name: "Statistical Modeling", icon: Sigma },
    { name: "A/B Testing", icon: TestTube },
    { name: "Flask", icon: Server },
    { name: "FastAPI", icon: Server },
    { name: "Hugging Face", icon: SmilePlus },
    { name: "LangChain", icon: Link2 },
    { name: "Docker", icon: Package },
    { name: "S3 (AWS)", icon: Cloud },
    { name: "Feature Engineering", icon: Dna },
    { name: "Git", icon: GitFork },
    { name: "Bash", icon: Terminal },
    { name: "RAG", icon: Combine },
    { name: "Tableau", icon: BarChart4 },
    { name: "Power BI", icon: BarChart4 },
    { name: "Google Workspace", icon: AppWindow },
    { name: "Vue3", icon: Code },
    { name: "OpenAI", icon: Bot },
    { name: "Claude", icon: MessageCircleQuestion },
];

export const RESUME_DATA_FOR_AI = `
Name: Jb Anmol
Tagline: "Architecting Intelligence, Cultivating Consciousness"
Role: Data Scientist & Breath Engineer
Location: Currently in Bangalore, India

Summary: A Data Scientist who bridges technical rigor with contemplative practice. Passionate about leveraging AI to unlock human potential, especially in medical sciences and healthcare. Known for strong stakeholder communication skills, translating complex data into actionable insights, and bringing a mindful, disciplined approach to problem-solving. Combines hands-on experience in the full data lifecycle with a deep interest in clinical time series analysis, AGI safety, and human-AI collaboration.

Education: BS in Data Science & Programming from IIT Madras (2023-2026), Current CGPA: 9.1.

Experience:
- Data Scientist (Part-time) at Kidaura (Mar 2025 - Current): Developed ETL pipelines (Python) reducing processing time by 30%, built ML models (scikit-learn) with 95% accuracy and 25% error reduction, performed anomaly detection and custom analysis for clinical stakeholders working with neuro-diverse children.
- Founder's Office - Analytics & Partnerships at Tummo Labs (Jun 2024 - Oct 2024): Worked directly with the founding team to lead launch analytics for 47k+ users in 3 months, designed and interpreted A/B tests improving retention by 25%, created dashboards for cross-functional data-driven decision making.
- Administrator at Shloka (May 2023 - Dec 2023): Improved data collection achieving 98% data integrity across 50+ groups, analyzed engagement metrics with SQL to create stakeholder reports.

Technical Skills: Python, SQL, PostgreSQL, scikit-learn, Pandas & NumPy, ETL Pipelines, Statistical Modeling, A/B Testing, Flask, FastAPI, Hugging Face, LangChain, Docker, S3 (AWS), Feature Engineering, Git, Bash, RAG, Tableau, Power BI, Google Workspace, Vue3, OpenAI, Claude.

Spiritual & Philosophical Practices:
- Hatha Yoga: Daily practice focused on pranayama (breath work), embodied discipline, and mind-body integration. Described as a "breath engineer."
- Vedic Astrology: Studies pattern recognition in cosmic cycles and human behavior.
- Buddhist Mindfulness: Cultivates present-moment awareness, compassionate observation, and non-attachment.
- Stoic Philosophy: Practices rational clarity, acceptance, and virtuous action.
- Japandi Aesthetics: Design philosophy rooted in minimalism, warmth, intentional negative space, and contemplative simplicity.

Research Interests: AGI safety, consciousness research, clinical time series analysis, human-AI collaboration, ethical ML in healthcare, systems thinking, open source values.

Personal Philosophy: Building technology that serves human flourishing. Interested in roles and collaborations that honor both technical excellence and human impact. Approaches work with calm energy, curiosity, and high-agency problem-solving.
`;
