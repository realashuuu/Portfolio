export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  iconName: string;
  accentBg: string;
  accentColor: string;
  tags: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: "PROGRAMMING LANGUAGES",
    description:
      "Core algorithmic problem solving in C++ alongside full-stack application development in TypeScript and JavaScript.",
    iconName: "Code2",
    accentBg: "rgba(91, 62, 255, 0.1)",
    accentColor: "#5b3eff",
    tags: ["C", "C++", "JavaScript (ES6+)", "TypeScript", "Java", "Python"],
  },
  {
    id: "frontend",
    title: "FRONTEND ENGINEERING",
    description:
      "Responsive, accessible interfaces built with React, Next.js App Router, Tailwind CSS, and modular UI components.",
    iconName: "Layout",
    accentBg: "rgba(6, 182, 212, 0.1)",
    accentColor: "#06b6d4",
    tags: ["React.js", "Next.js", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap", "DOM Manipulation"],
  },
  {
    id: "backend",
    title: "BACKEND & REAL-TIME APIS",
    description:
      "Modular server architectures, RESTful APIs, bidirectional WebSockets, end-to-end type-safe RPC, and authentication middleware.",
    iconName: "Server",
    accentBg: "rgba(16, 185, 129, 0.1)",
    accentColor: "#10b981",
    tags: ["Node.js", "Express.js", "RESTful APIs", "Socket.IO", "tRPC", "JWT Auth", "Middleware", "Webhooks"],
  },
  {
    id: "database",
    title: "DATABASES & PERSISTENCE",
    description:
      "Relational schema design, type-safe SQL queries, document modeling, and low-latency caching layers.",
    iconName: "Database",
    accentBg: "rgba(37, 99, 235, 0.1)",
    accentColor: "#2563eb",
    tags: ["PostgreSQL", "MongoDB", "Mongoose", "Drizzle ORM", "Redis", "CRUD Operations"],
  },
  {
    id: "ai",
    title: "GENERATIVE AI & WORKFLOWS",
    description:
      "Practical LLM integrations, structured output prompting, meeting intelligence pipelines, and async background jobs.",
    iconName: "Sparkles",
    accentBg: "rgba(244, 63, 94, 0.1)",
    accentColor: "#f43f5e",
    tags: ["OpenAI API", "LLM Integrations", "Prompt Engineering", "Generative AI", "Inngest"],
  },
  {
    id: "tools",
    title: "TOOLS & CS FUNDAMENTALS",
    description:
      "Version control, cloud deployment pipelines, media CDNs, and core computer science engineering foundations.",
    iconName: "Terminal",
    accentBg: "rgba(245, 158, 11, 0.1)",
    accentColor: "#f59e0b",
    tags: ["Git", "GitHub", "VS Code", "Cloudinary", "Vercel", "Render", "DSA", "OOP", "DBMS", "OS"],
  },
];
