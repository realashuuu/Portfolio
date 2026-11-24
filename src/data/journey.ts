export interface JourneyMilestone {
  year: string;
  period: string;
  title: string;
  organization: string;
  type: "Academic" | "Certification" | "Engineering" | "Milestone" | "Future";
  headline: string;
  description: string;
  highlights: string[];
  tags: string[];
}

export const journeyMilestones: JourneyMilestone[] = [
  {
    year: "2023",
    period: "August 2023",
    title: "Commenced B.Tech in Computer Science & Engineering",
    organization: "NSHM College of Management and Technology, Durgapur (MAKAUT)",
    type: "Academic",
    headline: "The Foundation Begins",
    description:
      "Began 4-year undergraduate degree in Computer Science and Engineering. Immersed in foundational computational disciplines including discrete mathematics, computer organization, C programming, and algorithmic fundamentals.",
    highlights: [
      "Enrolled in B.Tech CSE (2023–2027) affiliated with MAKAUT, West Bengal",
      "Built rigorous habits around problem-solving and structured code design",
      "Maintained consistent academic record (CGPA 7.1 through Semester VI)",
    ],
    tags: ["B.Tech CSE", "MAKAUT", "C Programming", "Discrete Mathematics", "Algorithms"],
  },
  {
    year: "2024–2025",
    period: "2024 – Early 2025",
    title: "Algorithmic Rigor & Web Development Foundations",
    organization: "Independent Learning & Academic Practice",
    type: "Engineering",
    headline: "Connecting Data Structures to the Web",
    description:
      "Deepened algorithmic problem solving in C++, mastering arrays, two pointers, binary search, recursion, and dynamic programming patterns. Simultaneously broadened into web technologies: semantic HTML5, modern CSS3, responsive layouts, and modern JavaScript (ES6+).",
    highlights: [
      "Committed to systematic C++ DSA practice on LeetCode",
      "Engineered responsive user interfaces and interactive landing pages",
      "Transitioned from scripting to architectural thinking and DOM mastery",
    ],
    tags: ["C++", "DSA", "JavaScript", "HTML5", "CSS3", "Problem Solving"],
  },
  {
    year: "2025",
    period: "April 2025",
    title: "JPMorgan Chase SE Simulation & Web Development Certification",
    organization: "Forage & Udemy",
    type: "Certification",
    headline: "Industry Standards & Systematic Engineering",
    description:
      "Successfully completed the JPMorgan Chase & Co. Advanced Software Engineering Job Simulation on Forage, implementing streaming financial data graph visualisations with Perspective. Completed comprehensive Foundations of Web Development certification covering CSS, Bootstrap, JavaScript, and React.",
    highlights: [
      "Completed JPMorgan Chase & Co. Software Engineering Job Simulation (April 2025)",
      "Engineered financial trade feed correlation charts using JPMC's Perspective library",
      "Earned Foundations of Web Development Certification (CSS, Bootstrap, JS, React)",
    ],
    tags: ["JPMorgan Chase", "Forage Simulation", "Perspective Library", "React", "Certification"],
  },
  {
    year: "2025–2026",
    period: "Mid 2025 – 2026",
    title: "Full-Stack Web Architectures & Real-Time Engineering",
    organization: "Independent Product Engineering",
    type: "Engineering",
    headline: "Building Full-Stack Applications from the Ground Up",
    description:
      "Expanded beyond the frontend into full-stack product engineering. Designed and built complete MERN stack architectures, WebSocket duplex communication with Socket.IO, secure JWT authentication with rotating cookies, and relational database schemas with PostgreSQL and Drizzle ORM.",
    highlights: [
      "Engineered MivChat: A full-stack real-time messaging platform with Socket.IO and Cloudinary",
      "Architected UnQue Lead PoC: An event-driven Meta Lead Ads webhook and real-time mobile push integration",
      "Implemented Enterprise Authentication Engine with email OTP and dual-token rotation",
    ],
    tags: ["MivChat", "UnQue Lead PoC", "Socket.IO", "Node.js", "Express", "MongoDB", "PostgreSQL"],
  },
  {
    year: "2026",
    period: "2026 (Present)",
    title: "Nexora (AI Meeting Intelligence) & LeetCode Milestone",
    organization: "Product Development & Competitive Programming",
    type: "Milestone",
    headline: "AI Systems Engineering & Consistent Problem Solving",
    description:
      "Currently architecting Nexora, an AI meeting intelligence platform combining Next.js App Router, tRPC, PostgreSQL, Drizzle ORM, OpenAI APIs, and Stream Video. Reached 100 LeetCode solved problems (99 C++, 1 Python) and received the prestigious 50 Days Badge 2026 for consistent coding dedication.",
    highlights: [
      "Architecting Nexora — AI Meeting Intelligence Platform (active development)",
      "Crossed 100 solved LeetCode problems (35 Easy, 58 Medium, 7 Hard)",
      "Awarded LeetCode 50 Days Badge 2026 for verified daily problem-solving consistency",
    ],
    tags: ["Nexora", "AI Engineering", "LeetCode 100", "50 Days Badge 2026", "tRPC", "Drizzle ORM"],
  },
  {
    year: "2027",
    period: "Mid 2027",
    title: "Expected Graduation (B.Tech CSE) & Industry Impact",
    organization: "NSHM College of Management and Technology / MAKAUT",
    type: "Future",
    headline: "Transitioning to Full-Time Software Engineering",
    description:
      "Targeting graduation with Bachelor of Technology in Computer Science & Engineering. Seeking high-impact entry-level Software Engineer / Full-Stack Engineer roles, with ambitions to build scalable distributed systems, contribute to international engineering teams, and explore tech opportunities in India and the UAE / Gulf region.",
    highlights: [
      "Completion of 4-year B.Tech CSE degree",
      "Ready for SDE-1 / Product Engineering responsibilities across full-stack & backend systems",
      "Committed to continuous growth towards SDE-2 and distributed systems ownership",
    ],
    tags: ["Graduation 2027", "SDE", "Full-Stack Engineer", "Backend Systems", "Career Launch"],
  },
];
