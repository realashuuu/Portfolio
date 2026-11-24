export interface ProjectMetric {
  value: string;
  label: string;
}

export interface TechGroup {
  category: string;
  items: string[];
}

export interface ArchitectureNode {
  step: string;
  title: string;
  desc: string;
}

export interface Project {
  id: string;
  slug: string;
  projectNumber: string;
  title: string;
  subtitle: string;
  status: "In Progress" | "Live" | "Completed PoC" | "Simulation";
  category: string;
  shortDescription: string;
  fullOverview: string;
  problem: string;
  solution: string;
  keyCapabilities: string[];
  technicalDecisions: string[];
  architectureFlow: ArchitectureNode[];
  metrics: ProjectMetric[];
  techStack: TechGroup[];
  allTechPills: string[];
  githubUrl: string;
  liveUrl?: string;
  challenges: string[];
  futureRoadmap: string[];
}

export const projects: Project[] = [
  {
    id: "nexora",
    slug: "nexora",
    projectNumber: "PROJECT 001",
    title: "Nexora",
    subtitle: "AI MEETING INTELLIGENCE PLATFORM",
    status: "In Progress",
    category: "AI & Full-Stack Systems",
    shortDescription:
      "Transforming conversational meetings into actionable intelligence through automated transcription, structured executive summaries, and intelligent task extraction.",
    fullOverview:
      "Nexora is an ongoing enterprise AI meeting intelligence platform engineered with Next.js App Router, TypeScript, PostgreSQL (Neon Serverless), Drizzle ORM, OpenAI API, and Stream Video integration. It captures real-time meeting dialogues, processes audio streams, and generates context-rich meeting briefs, categorized decision trees, and assigned action items.",
    problem:
      "Unstructured audio meetings result in severe context loss, ambiguous action items, manual note-taking overhead, and delayed team execution across software engineering workflows.",
    solution:
      "An automated pipeline that streams meeting sessions, extracts high-fidelity transcriptions, processes conversational context through structured LLM prompt chains, and persists relational meeting artifacts for instant retrieval and search.",
    keyCapabilities: [
      "Real-time audio session streaming with Stream Video SDK",
      "Automated transcription and dialogue speaker separation",
      "AI-powered decision extraction and priority task synthesis",
      "Type-safe tRPC client-server API contracts",
      "Serverless PostgreSQL persistence managed via Drizzle ORM",
      "Sub-second caching layer powered by Redis",
    ],
    technicalDecisions: [
      "Next.js App Router with Server Components for low-latency FCP and SEO indexability",
      "Drizzle ORM over Prisma for lightweight footprint and native SQL query execution efficiency",
      "Better-Auth infrastructure with secure session management and cookie tokens",
      "TanStack Query for optimistic updates and real-time meeting cache invalidation",
    ],
    architectureFlow: [
      {
        step: "01. Ingestion",
        title: "Session Stream Capture",
        desc: "Stream Video React SDK captures multi-participant audio streams with low latency.",
      },
      {
        step: "02. Synthesis",
        title: "AI Audio & Context Pipeline",
        desc: "Audio stream is transcribed and processed through OpenAI LLM pipelines with structured JSON schemas.",
      },
      {
        step: "03. Persistence",
        title: "Relational Modeling",
        desc: "Neon PostgreSQL stores users, meetings, action items, and transcripts via Drizzle ORM schemas.",
      },
      {
        step: "04. Delivery",
        title: "tRPC & Real-Time Sync",
        desc: "End-to-end type safety delivers structured meeting insights to dashboard clients with sub-100ms UI sync.",
      },
    ],
    metrics: [
      { value: "100%", label: "TYPE SAFETY (tRPC + Drizzle)" },
      { value: "In Dev", label: "ACTIVE CORE DEVELOPMENT" },
      { value: "Neon", label: "SERVERLESS POSTGRESQL" },
    ],
    techStack: [
      { category: "Frontend", items: ["Next.js 14", "React", "TypeScript", "Tailwind CSS", "Radix UI"] },
      { category: "Backend & API", items: ["Node.js", "tRPC", "Better-Auth", "Stream Video SDK"] },
      { category: "Database & Cache", items: ["PostgreSQL (Neon)", "Drizzle ORM", "Redis"] },
      { category: "AI & ML", items: ["OpenAI API", "Prompt Engineering", "Structured Output"] },
    ],
    allTechPills: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Drizzle ORM",
      "OpenAI API",
      "tRPC",
      "Redis",
      "Stream Video",
    ],
    githubUrl: "https://github.com/realashuuu/nexora",
    challenges: [
      "Managing audio chunk streaming synchronization across fluctuating client network conditions",
      "Enforcing strictly typed JSON schema validation on LLM output to guarantee relational database insertion integrity",
      "Architecting efficient database indexes on meeting transcripts for fuzzy full-text keyword search",
    ],
    futureRoadmap: [
      "Integration of local Whisper models for zero-latency on-device fallback transcription",
      "Automated Slack & Notion webhook dispatches for instant sprint task assignment",
      "Meeting sentiment analytics and speaker talk-time distribution graphs",
    ],
  },
  {
    id: "mivchat",
    slug: "mivchat",
    projectNumber: "PROJECT 002",
    title: "MivChat",
    subtitle: "REAL-TIME MESSAGING PLATFORM",
    status: "Live",
    category: "Full-Stack & WebSockets",
    shortDescription:
      "A high-concurrency real-time messaging application featuring instant WebSocket communication, active presence tracking, encrypted media sharing, and delivery status.",
    fullOverview:
      "MivChat is a full-stack MERN application delivering fluid instant communication. Engineered with Socket.IO for bidirectional event streaming, Node.js and Express for RESTful routing, MongoDB and Mongoose for flexible chat storage, JWT authentication with bcrypt password hashing, and Cloudinary for optimized image delivery.",
    problem:
      "Modern team and individual communication requires instantaneous message delivery, online visibility, and reliable media sharing without polling bottlenecks or unsecured state synchronization.",
    solution:
      "A responsive real-time client coupled with an event-driven Socket.IO server that broadcasts message packets, maintains heartbeats for online status, and handles media uploads seamlessly through Cloudinary CDN.",
    keyCapabilities: [
      "Instant bidirectional messaging with sub-50ms WebSocket latency",
      "Live user presence tracking (online/offline indicators)",
      "Secure authentication with JWT and bcryptjs password salting",
      "Rich media sharing with automated Cloudinary compression",
      "Message read receipts and delivery status verification",
      "Responsive, clean UI engineered with Vite and Tailwind CSS",
    ],
    technicalDecisions: [
      "Socket.IO rooms and user mappings for targeted message dispatch without unnecessary broadcasts",
      "HTTP-only cookies for JWT storage to eliminate client-side XSS token exfiltration vulnerabilities",
      "Mongoose schema indexing on conversation IDs and timestamps for optimized pagination queries",
      "Vite build toolchain for instant HMR and optimized production bundle chunking",
    ],
    architectureFlow: [
      {
        step: "01. Auth & Handshake",
        title: "JWT Verified Connection",
        desc: "Client authenticates via JWT; Socket.IO establishes authenticated persistent duplex connection.",
      },
      {
        step: "02. Event Broadcast",
        title: "Bidirectional Messaging",
        desc: "Message payload emitted to socket room; server verifies payload and broadcasts to target client in real time.",
      },
      {
        step: "03. Media Pipeline",
        title: "Cloudinary CDN Pipeline",
        desc: "Images uploaded directly via Cloudinary SDK, returning secure CDN URLs stored in MongoDB.",
      },
      {
        step: "04. Persistence",
        title: "MongoDB Document Storage",
        desc: "Message history, timestamps, sender IDs, and read statuses indexed for fast retrieval.",
      },
    ],
    metrics: [
      { value: "Sub-50ms", label: "WEBSOCKET LATENCY" },
      { value: "Live", label: "VERCEL DEPLOYMENT" },
      { value: "100%", label: "RESPONSIVE LAYOUT" },
    ],
    techStack: [
      { category: "Frontend", items: ["React.js", "Vite", "Tailwind CSS", "Axios", "Lucide Icons"] },
      { category: "Backend", items: ["Node.js", "Express.js", "Socket.IO", "JWT", "bcryptjs"] },
      { category: "Database & Cloud", items: ["MongoDB", "Mongoose", "Cloudinary CDN", "Render / Vercel"] },
    ],
    allTechPills: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "Cloudinary",
    ],
    githubUrl: "https://github.com/realashuuu/MivChat",
    liveUrl: "https://miv-chat-vert.vercel.app/",
    challenges: [
      "Handling graceful socket reconnections during intermittent mobile network shifts without message loss",
      "Managing optimistic message state in React while waiting for server timestamp and delivery confirmation",
      "Preventing unauthorized room subscriptions via token inspection on socket handshake middleware",
    ],
    futureRoadmap: [
      "End-to-end client encryption using Web Crypto API",
      "Group chat channels and role-based channel administration",
      "Audio note recording and voice waveform playback",
    ],
  },
  {
    id: "unque-lead",
    slug: "unque-lead",
    projectNumber: "PROJECT 003",
    title: "UnQue Lead PoC",
    subtitle: "META LEAD ADS EVENT-DRIVEN INTEGRATION",
    status: "Completed PoC",
    category: "Backend & Event Architecture",
    shortDescription:
      "An automated event-driven integration pipeline that captures Meta Lead Ads webhooks, queries the Meta Graph API, persists verified leads, and streams them in real time to a mobile dashboard.",
    fullOverview:
      "UnQue Lead PoC solves the critical lead-latency gap in digital marketing. Instead of waiting hours for CSV exports, this system receives Meta webhook challenge verifications, listens for real-time leadgen events, pulls full lead parameters via the Meta Graph API, prevents duplicates in MongoDB, and streams instant notifications to a React Native mobile application over Socket.IO.",
    problem:
      "Businesses lose up to 70% of potential conversions when lead response times exceed 15 minutes. Manual retrieval of Meta Lead Ad records is slow, error-prone, and disconnected from field sales agents.",
    solution:
      "An automated, event-driven Node.js & TypeScript pipeline that transforms lead generation into an instant mobile-notified workflow within seconds of user ad submission.",
    keyCapabilities: [
      "Cryptographic SHA-256 Meta webhook challenge verification",
      "Secure Meta Graph API lead payload retrieval",
      "Duplicate lead prevention logic utilizing compound unique indexes",
      "MongoDB document persistence with strict Mongoose validation",
      "Real-time mobile delivery via Socket.IO WebSocket streams",
      "Comprehensive REST API endpoints for historical lead inspection",
    ],
    technicalDecisions: [
      "TypeScript across backend services for predictable request/response contracts with external Graph API",
      "Webhook signature validation middleware to thwart spoofed or malicious external HTTP requests",
      "Asynchronous job pattern to return immediate 200 OK to Meta servers within their required 3-second window, deferring Graph API fetching",
      "Clean separation of webhook listeners, business service layers, and socket broadcast managers",
    ],
    architectureFlow: [
      {
        step: "01. Ad Submission",
        title: "Meta Lead Ad Triggered",
        desc: "Prospective customer submits instant lead form on Facebook / Instagram platform.",
      },
      {
        step: "02. Webhook Event",
        title: "Secure Webhook Receiver",
        desc: "Meta dispatches signed leadgen event to Node.js backend; server verifies hub.challenge and signature.",
      },
      {
        step: "03. Graph API Fetch",
        title: "Lead Detail Resolution",
        desc: "Backend queries Meta Graph API using System User Access Token to fetch decrypted lead field data.",
      },
      {
        step: "04. Deduplication & Sync",
        title: "MongoDB & Socket Broadcast",
        desc: "Lead stored with unique id checks in MongoDB, then pushed to React Native field agent dashboard via Socket.IO.",
      },
    ],
    metrics: [
      { value: "< 2 sec", label: "END-TO-END LEAD DISPATCH" },
      { value: "0%", label: "DUPLICATE LEAD DUPLICATION" },
      { value: "100%", label: "GRAPH API COMPLIANCE" },
    ],
    techStack: [
      { category: "Backend Architecture", items: ["Node.js", "Express.js", "TypeScript", "Meta Webhooks"] },
      { category: "Third-Party APIs", items: ["Meta Graph API", "Meta Lead Ads Platform"] },
      { category: "Real-Time & Mobile", items: ["Socket.IO", "React Native", "Expo"] },
      { category: "Storage", items: ["MongoDB", "Mongoose ORM"] },
    ],
    allTechPills: [
      "Node.js",
      "TypeScript",
      "Express",
      "MongoDB",
      "Socket.IO",
      "React Native",
      "Meta Graph API",
      "Webhooks",
    ],
    githubUrl: "https://github.com/realashuuu/Unque-Lead-PoC",
    challenges: [
      "Satisfying Meta's strict 3000ms webhook response SLA while fetching multi-field lead payloads",
      "Handling token expiry and permissions renewal on long-lived Meta Page Access Tokens",
      "Designing an offline sync queue for mobile field sales reps with intermittent connectivity",
    ],
    futureRoadmap: [
      "CRM connectors for automated two-way synchronization with HubSpot and Salesforce",
      "Automated WhatsApp Business API instant messaging trigger to the submitted lead",
      "Multi-tenant agency routing rules based on ad campaign tags and geographical zones",
    ],
  },
  {
    id: "landing-gaming-page",
    slug: "landing-gaming-page",
    projectNumber: "PROJECT 004",
    title: "Nexus Gaming Showcase",
    subtitle: "HIGH-PERFORMANCE CINEMATIC LANDING EXPERIENCE",
    status: "Live",
    category: "Frontend & Motion Design",
    shortDescription:
      "A cinematic, high-performance web experience featuring autoplay background video integration, glassmorphism aesthetics, responsive layout grids, and interactive product sections.",
    fullOverview:
      "Nexus Gaming Showcase explores cutting-edge interactive frontend presentation. Built with semantic HTML5, custom modern CSS3 animations, modular JavaScript, and optimized media containers, it creates a gripping metagame atmosphere while maintaining smooth 60fps rendering across screen resolutions.",
    problem:
      "Traditional gaming product pages suffer from bloated bundle sizes, jarring asset load times, and poor mobile responsiveness when attempting to deliver high-fidelity cinematic visuals.",
    solution:
      "A lightweight, dependency-free frontend architecture leveraging native browser video layering, hardware-accelerated CSS transforms, and fluid viewport typography for maximum immersion and instantaneous initial paint.",
    keyCapabilities: [
      "Autoplay looping video hero banner with fallback poster states",
      "Custom responsive navigation with backdrop blur treatment",
      "Fluid responsive layout grids tailored for 4K desktop to mobile screens",
      "Clean semantic markup without heavy third-party framework overhead",
      "Accessible interactive buttons and subtle micro-interaction states",
    ],
    technicalDecisions: [
      "Zero-dependency vanilla architecture to maximize browser execution speed and eliminate framework overhead",
      "CSS `playsinline` and hardware-accelerated transform layers to prevent iOS mobile video expansion and battery drain",
      "Google Montserrat display typography coupled with Boxicons font rendering",
    ],
    architectureFlow: [
      {
        step: "01. Init",
        title: "Progressive Asset Load",
        desc: "CSS styles and DOM load immediately; video background streams progressively with muted autoplay.",
      },
      {
        step: "02. Layout",
        title: "Fluid Grid Computation",
        desc: "CSS Flexbox and Grid establish high-density product cards and typography scaling.",
      },
      {
        step: "03. Interactivity",
        title: "Micro-Interaction Engine",
        desc: "Lightweight event handlers govern hover states, audio toggles, and modal product viewports.",
      },
    ],
    metrics: [
      { value: "60 FPS", label: "SMOOTH VIDEO RENDERING" },
      { value: "0 kB", label: "EXTERNAL JS FRAMEWORK OVERHEAD" },
      { value: "100%", label: "VIEWPORT RESPONSIVENESS" },
    ],
    techStack: [
      { category: "Frontend Core", items: ["HTML5", "CSS3", "JavaScript (ES6+)"] },
      { category: "Media & Icons", items: ["HTML5 Video", "Boxicons", "Google Fonts"] },
    ],
    allTechPills: ["HTML5", "CSS3", "JavaScript", "Video Engineering", "Responsive Design"],
    githubUrl: "https://github.com/realashuuu/Landing-Gaming-Page",
    challenges: [
      "Ensuring seamless video autoplay policies across Safari iOS and mobile Chrome without user gesture blocks",
      "Preventing layout shifts during custom font and high-resolution background asset ingestion",
    ],
    futureRoadmap: [
      "Integration of WebGL / Three.js 3D character preview shaders",
      "Dynamic game catalog filter powered by headless CMS API",
    ],
  },
  {
    id: "backend-auth",
    slug: "backend-auth",
    projectNumber: "PROJECT 005",
    title: "Enterprise Auth Engine",
    subtitle: "ROBUST NODE.JS AUTHENTICATION ARCHITECTURE",
    status: "Completed PoC",
    category: "Backend & Application Security",
    shortDescription:
      "A production-grade backend authentication and authorization microservice featuring email OTP verification, JWT access/refresh token rotation, and HTTP-only session security.",
    fullOverview:
      "Security is a non-negotiable software foundation. This backend authentication system implements defense-in-depth principles: cryptographically secure user registration, automated email OTP verification, access token and refresh token rotation, secure HTTP-only cookie storage, and granular middleware protection.",
    problem:
      "Weak authentication architectures leave applications vulnerable to credential stuffing, cross-site scripting (XSS) token theft, and session hijacking.",
    solution:
      "A modular, secure Node.js & Express service with bcryptjs password hashing, short-lived JWT access tokens paired with rotatable refresh tokens stored in HTTP-only cookies, and time-expiring email OTP verification.",
    keyCapabilities: [
      "Salted and hashed password persistence using bcryptjs",
      "Dual-token architecture (short-lived access + rotating refresh tokens)",
      "Automated email OTP generation and validation workflows",
      "Strict HTTP-only, SameSite cookie transport for token isolation",
      "Custom Express authentication and authorization middleware gates",
    ],
    technicalDecisions: [
      "Separate token lifecycles: 15-minute access tokens and 7-day refresh tokens with automated rotation on reuse",
      "MongoDB document TTL indexes for automatic cleanup of expired OTP codes",
      "Comprehensive error normalization middleware preventing stack trace leakage to clients",
    ],
    architectureFlow: [
      {
        step: "01. Signup / Login",
        title: "Credential Validation",
        desc: "User submits email/password; server verifies bcrypt hash and validates account status.",
      },
      {
        step: "02. OTP Verification",
        title: "Time-Sensitive Challenge",
        desc: "Server generates cryptographically random 6-digit OTP, dispatches via email service, and sets TTL.",
      },
      {
        step: "03. Token Issuance",
        title: "Dual Token Rotation",
        desc: "On verification, an access token is returned and a refresh token is injected into a secure HTTP-only cookie.",
      },
      {
        step: "04. Middleware Gate",
        title: "Protected Route Access",
        desc: "Incoming requests are validated by JWT middleware before hitting protected business endpoints.",
      },
    ],
    metrics: [
      { value: "Dual-Token", label: "JWT ROTATION MODEL" },
      { value: "HTTP-Only", label: "COOKIE SECURITY ARCHITECTURE" },
      { value: "bcrypt", label: "PASSWORD ENCRYPTION" },
    ],
    techStack: [
      { category: "Backend Engine", items: ["Node.js", "Express.js", "JWT", "bcryptjs"] },
      { category: "Database", items: ["MongoDB", "Mongoose ORM"] },
      { category: "Communication", items: ["Nodemailer", "Email OTP Service"] },
    ],
    allTechPills: ["Node.js", "Express.js", "MongoDB", "JWT", "bcryptjs", "Security", "REST API"],
    githubUrl: "https://github.com/realashuuu/Authentication",
    challenges: [
      "Preventing race conditions during rapid concurrent token refresh requests",
      "Mitigating brute-force OTP attempts with IP-based rate limiting middleware",
    ],
    futureRoadmap: [
      "OAuth2 social authentication (Google and GitHub logins)",
      "WebAuthn / Passkey passwordless authentication integration",
    ],
  },
  {
    id: "forage-midas",
    slug: "forage-midas",
    projectNumber: "PROJECT 006",
    title: "JPMorgan Chase SE Simulation",
    subtitle: "FINANCIAL DATA VISUALIZATION & PERSPECTIVE DASHBOARD",
    status: "Simulation",
    category: "Software Engineering & Systems",
    shortDescription:
      "Completed software engineering simulation tasks focusing on financial market data feeds, correlation analysis, and live interactive data dashboards.",
    fullOverview:
      "A structured software engineering program completed through Forage under JPMorgan Chase & Co. Focused on interfacing with financial data feeds, calculating price ratios, identifying trading trigger alerts, and rendering live streaming financial graphs using JPMorgan's open-source Perspective library.",
    problem:
      "High-frequency traders and financial analysts need instantaneous visual tracking of stock price movements and historical ratio thresholds to execute trades effectively.",
    solution:
      "Engineered client-side React modifications to ingest streaming server data feeds, compute relative price ratios between trading pairs, calculate continuous moving averages, and trigger visual alert bounds in real time.",
    keyCapabilities: [
      "Financial market data ingestion and continuous stream processing",
      "Dynamic ratio calculation and historical bounds tracking",
      "Interactive data graph configuration with Perspective library",
      "Unit testing and code quality compliance following enterprise engineering standards",
    ],
    technicalDecisions: [
      "Utilized JPMorgan Chase's Perspective library for high-throughput WebAssembly-backed data grid rendering",
      "Configured automatic schema mapping for real-time price updates and alert triggers",
    ],
    architectureFlow: [
      {
        step: "01. Feed Ingestion",
        title: "Market Server Feed",
        desc: "Server generates financial trade events for multiple stock pairs.",
      },
      {
        step: "02. Client Processing",
        title: "Ratio & Alert Computation",
        desc: "Client computes price ratios, historical upper and lower bounds, and trigger points.",
      },
      {
        step: "03. Perspective View",
        title: "Live Chart Rendering",
        desc: "WebAssembly Perspective view updates and charts live market correlations.",
      },
    ],
    metrics: [
      { value: "April 2025", label: "SIMULATION COMPLETION" },
      { value: "Perspective", label: "FINANCIAL CHARTING ENGINE" },
      { value: "JPMC", label: "STRUCTURED ENGINEERING TASKS" },
    ],
    techStack: [
      { category: "Frontend & Charting", items: ["React.js", "TypeScript", "Perspective Library"] },
      { category: "Simulation Tools", items: ["Python Data Feeds", "Git", "Forage Platform"] },
    ],
    allTechPills: ["React", "TypeScript", "Perspective", "Financial Feeds", "Data Visualization"],
    githubUrl: "https://github.com/realashuuu/forage-midas",
    challenges: [
      "Configuring TypeScript interfaces to handle dynamic streaming updates without re-render thrashing",
      "Calibrating ratio bound algorithms to trigger visual alerts accurately during rapid price fluctuations",
    ],
    futureRoadmap: [
      "Extending algorithmic trade simulation triggers with historical backtesting datasets",
    ],
  },
];
