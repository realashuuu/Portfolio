export interface SkillCategory {
  id: string;
  category: string;
  headline: string;
  description: string;
  iconName: string;
  skills: {
    name: string;
    description: string;
    tags: string[];
    highlight?: boolean;
  }[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    category: "Programming Languages",
    headline: "Algorithmic Precision & Multi-Paradigm Foundations",
    description:
      "C++ serves as my core foundation for solving Data Structures and Algorithms on LeetCode. TypeScript and JavaScript power all full-stack and backend systems. Java, Python, and C support low-level concepts and system logic.",
    iconName: "Code2",
    skills: [
      {
        name: "C++",
        description: "Primary language for 99+ LeetCode problems, memory-conscious data structures, and algorithmic patterns.",
        tags: ["DSA", "STL", "Problem Solving", "Memory Management"],
        highlight: true,
      },
      {
        name: "TypeScript",
        description: "End-to-end type safety across Next.js, tRPC client-server contracts, and backend microservices.",
        tags: ["Type Safety", "Interfaces", "Generics", "Full-Stack"],
        highlight: true,
      },
      {
        name: "JavaScript (ES6+)",
        description: "Asynchronous programming, event loops, promises, Node.js runtimes, and dynamic client interactions.",
        tags: ["Async/Await", "Event Loop", "DOM", "ESNext"],
      },
      {
        name: "Java",
        description: "Object-oriented software principles, design patterns, and computer science academic coursework.",
        tags: ["OOP", "Design Patterns", "Core CS"],
      },
      {
        name: "Python",
        description: "Scripting, rapid prototyping, data manipulation, and AI pipeline orchestration.",
        tags: ["Scripting", "Prototyping", "Automation"],
      },
      {
        name: "C",
        description: "Understanding pointers, manual memory allocation, low-level architecture, and operating systems concepts.",
        tags: ["Pointers", "Memory", "Systems Basics"],
      },
    ],
  },
  {
    id: "frontend",
    category: "Frontend Engineering",
    headline: "Responsive, Performant & Semantic Web Interfaces",
    description:
      "Crafting modern user interfaces with Next.js App Router and React. Focused on fast First Contentful Paint, component modularity, accessibility, and fluid layouts with Tailwind CSS.",
    iconName: "Layout",
    skills: [
      {
        name: "React.js",
        description: "Declarative component architecture, custom hooks, context management, and efficient DOM reconciliation.",
        tags: ["Hooks", "Context API", "State Management", "SPA"],
        highlight: true,
      },
      {
        name: "Next.js (App Router)",
        description: "Server-side rendering (SSR), static site generation (SSG), React Server Components, and optimized image/font pipelines.",
        tags: ["RSC", "SSR", "SSG", "App Router"],
        highlight: true,
      },
      {
        name: "Tailwind CSS",
        description: "Utility-first CSS architecture, responsive design breakpoints, design tokens, and custom dark mode styling.",
        tags: ["Utility CSS", "Responsive Design", "Tokens", "Fluid Layouts"],
      },
      {
        name: "HTML5 & Semantic Web",
        description: "W3C accessible DOM structuring, SEO metadata, microdata, and ARIA attributes for inclusive web usability.",
        tags: ["Semantics", "SEO", "Accessibility", "A11y"],
      },
      {
        name: "CSS3 & Motion",
        description: "CSS Grid, Flexbox, hardware-accelerated transforms, keyframes, transitions, and responsive typography.",
        tags: ["Grid", "Flexbox", "Keyframes", "Hardware Acceleration"],
      },
      {
        name: "Bootstrap",
        description: "Rapid grid prototyping, responsive navigation systems, and cross-browser component scaffolding.",
        tags: ["Rapid Prototyping", "Grid System", "UI Scaffolding"],
      },
    ],
  },
  {
    id: "backend",
    category: "Backend & Systems",
    headline: "Event-Driven Pipelines, WebSockets & Secure REST APIs",
    description:
      "Architecting reliable server runtimes with Node.js and Express. Experienced in real-time duplex streaming via Socket.IO, type-safe tRPC procedures, JWT authentication, and secure webhook receivers.",
    iconName: "Server",
    skills: [
      {
        name: "Node.js & Express.js",
        description: "High-throughput asynchronous server runtimes, modular routing, middleware pipelines, and error handling layers.",
        tags: ["Runtime", "Express Router", "Middleware", "REST"],
        highlight: true,
      },
      {
        name: "Socket.IO & WebSockets",
        description: "Bidirectional event-driven communication, persistent connection handling, room multiplexing, and presence status.",
        tags: ["WebSockets", "Real-Time", "Bidirectional", "Rooms"],
        highlight: true,
      },
      {
        name: "tRPC",
        description: "End-to-end type safety between client and server without code generation, sharing unified types across Next.js.",
        tags: ["Type Safety", "RPC", "Zero-Codegen", "DX"],
      },
      {
        name: "JWT & Security Middleware",
        description: "Token-based stateless authentication, bcrypt password salting, access/refresh token rotation, and HTTP-only cookies.",
        tags: ["Authentication", "Authorization", "bcrypt", "HTTP-Only"],
      },
      {
        name: "REST APIs & Webhooks",
        description: "Idempotent RESTful resource design, SHA-256 webhook cryptographic verification, and external API gateways.",
        tags: ["REST", "Webhooks", "HMAC SHA-256", "Meta Graph API"],
      },
    ],
  },
  {
    id: "database",
    category: "Databases & Storage",
    headline: "Relational Modeling, Document Stores & Caching Layers",
    description:
      "Structuring persistent data layers across relational and NoSQL engines. Utilizing PostgreSQL with Drizzle ORM for strict schemas, MongoDB with Mongoose for dynamic documents, and Redis for low-latency memory caching.",
    iconName: "Database",
    skills: [
      {
        name: "PostgreSQL & Neon",
        description: "Relational schema design, foreign keys, table joins, indexes, transactions, and serverless database scaling.",
        tags: ["SQL", "Relational", "ACID", "Neon Serverless"],
        highlight: true,
      },
      {
        name: "MongoDB & Mongoose",
        description: "Document-oriented data modeling, compound unique indexing, document validation schemas, and aggregation pipelines.",
        tags: ["NoSQL", "Mongoose Schemas", "Indexing", "Aggregation"],
        highlight: true,
      },
      {
        name: "Drizzle ORM",
        description: "Lightweight, type-safe SQL query builder and schema migration toolchain offering near-zero runtime overhead.",
        tags: ["Type-Safe SQL", "Migrations", "Drizzle Kit", "Zero-Bloat"],
      },
      {
        name: "Redis",
        description: "In-memory key-value data caching, sub-millisecond retrieval, rate limiting counters, and session storage.",
        tags: ["Caching", "Key-Value", "In-Memory", "Session Store"],
      },
    ],
  },
  {
    id: "ai",
    category: "AI & Practical Integrations",
    headline: "Practical Product Workflows & LLM Orchestration",
    description:
      "Focusing on the practical application of generative AI into functional software products. Integrating OpenAI APIs, structuring deterministic JSON prompts, and building automated meeting intelligence pipelines.",
    iconName: "Sparkles",
    skills: [
      {
        name: "OpenAI API & LLM Pipelines",
        description: "Integrating GPT models for automated text summarization, meeting dialogue analysis, and structured extraction.",
        tags: ["GPT-4o", "API Integration", "JSON Schemas", "Text Analysis"],
        highlight: true,
      },
      {
        name: "Prompt Engineering",
        description: "Designing deterministic system prompts, few-shot conditioning, and constrained schema formats for predictable outputs.",
        tags: ["Few-Shot", "Role Prompting", "Chain of Thought", "Validation"],
      },
      {
        name: "Generative AI Fundamentals",
        description: "Understanding tokenization, context windows, embeddings, temperature parameters, and practical AI product boundaries.",
        tags: ["Embeddings", "Context Windows", "Token Economics"],
      },
      {
        name: "AI-Powered Workflows",
        description: "Building automated end-to-end software loops: Audio Stream → Transcription → AI Summarization → Database Persistence.",
        tags: ["Pipeline Design", "Automated Synthesis", "Action Items"],
      },
    ],
  },
  {
    id: "tools",
    category: "Developer Tools & Platforms",
    headline: "Version Control, Deployment Pipelines & Cloud Media",
    description:
      "Professional development workflows with Git, GitHub collaborative version control, automated cloud deployments on Vercel and Render, and CDN media distribution via Cloudinary.",
    iconName: "Terminal",
    skills: [
      {
        name: "Git & GitHub",
        description: "Branching workflows, semantic commits, PR code reviews, merge conflict resolution, and public repository management.",
        tags: ["Version Control", "Branching", "Code Reviews", "CI/CD"],
        highlight: true,
      },
      {
        name: "Vercel & Render",
        description: "Automated continuous deployment (CD), environment variable management, serverless function scaling, and domain routing.",
        tags: ["Deployment", "Serverless", "Edge", "PaaS"],
      },
      {
        name: "Cloudinary CDN",
        description: "Automated image and media transformation, asset compression, secure API upload signatures, and global CDN delivery.",
        tags: ["Media CDN", "Image Optimization", "Transformations"],
      },
      {
        name: "VS Code & Tooling",
        description: "Advanced debugging, ESLint, Prettier, Postman API testing, and terminal productivity on macOS.",
        tags: ["Debugging", "Postman", "ESLint", "Productivity"],
      },
    ],
  },
];
