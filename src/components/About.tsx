import { GraduationCap, Award, Compass, Layers, CheckCircle2, Code2, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <section id="about" aria-label="About Ashik Khan" className="py-28 px-6 md:px-12 bg-surface">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow">About</div>
          <h2 className="st">
            The person behind<br />
            the <span className="gr">engineering mindset</span>
          </h2>
          <p className="stxt">
            Computer Science and Engineering undergraduate building complete products, understanding
            system tradeoffs, and solving real-world software challenges.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Authentic Story Narrative */}
          <div className="lg:col-span-7 space-y-5 text-[1.02rem] text-ink-2 leading-[1.85] font-sans">
            <p>
              I am <strong className="text-ink font-semibold">Ashik Khan</strong>, a Computer Science &amp; Engineering
              undergraduate at{" "}
              <strong className="text-ink font-semibold">
                NSHM College of Management and Technology, Durgapur
              </strong>
              , affiliated with MAKAUT, West Bengal (2023–2027).
            </p>

            <p>
              I am driven by a passion to understand how software works in its entirety. Rather than viewing
              web development as disconnected visual blocks, I explore the complete lifecycle: responsive frontend
              experiences, robust RESTful APIs, duplex WebSocket streaming, relational database schemas, and the
              practical integration of artificial intelligence into daily workflows.
            </p>

            <p>
              My engineering discipline is rooted in algorithmic problem solving in{" "}
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded-full bg-white border border-border text-brand-violet">
                C++
              </span>
              , where I have solved over 100 problems on LeetCode across arrays, binary search, two pointers, and dynamic
              programming. That analytical foundation guides every architectural decision I make in full-stack TypeScript,
              Node.js, and PostgreSQL.
            </p>

            <p>
              Whether developing an AI meeting transcription and intelligence platform (<strong>Nexora</strong>),
              engineering low-latency messaging backends (<strong>MivChat</strong>), or building event-driven Meta webhook
              pipelines (<strong>UnQue Lead PoC</strong>), I aim to turn ideas into tangible, production-ready software products.
            </p>

            {/* Checklist */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-border/70">
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-ink">
                <CheckCircle2 className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <span>Full-Stack Architecture &amp; UI</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-ink">
                <CheckCircle2 className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <span>REST APIs &amp; WebSockets (Socket.IO)</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-ink">
                <CheckCircle2 className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <span>PostgreSQL, Drizzle ORM &amp; MongoDB</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-sans font-medium text-ink">
                <CheckCircle2 className="w-4 h-4 text-brand-violet flex-shrink-0" />
                <span>Practical OpenAI &amp; LLM Integrations</span>
              </div>
            </div>
          </div>

          {/* Right Column: Credential Cards matching Surya's cert-card style */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-[0.68rem] font-mono uppercase tracking-[0.18em] text-muted font-bold block mb-1">
              CREDENTIALS &amp; ACADEMICS
            </span>

            {/* Degree Card */}
            <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-brand-violet hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-violet flex-shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-ink leading-tight">
                  B.Tech in Computer Science &amp; Engineering
                </div>
                <div className="text-[0.68rem] font-mono uppercase font-semibold text-muted mt-1">
                  NSHM Durgapur · MAKAUT · 2023–2027 (CGPA 7.1)
                </div>
              </div>
            </div>

            {/* Simulation Card */}
            <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-brand-violet hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-ink leading-tight">
                  Software Engineering Job Simulation
                </div>
                <div className="text-[0.68rem] font-mono uppercase font-semibold text-muted mt-1">
                  JPMorgan Chase &amp; Co. via Forage (April 2025)
                </div>
              </div>
            </div>

            {/* Certification Card */}
            <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-brand-violet hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-emerald/10 flex items-center justify-center text-brand-emerald flex-shrink-0">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-ink leading-tight">
                  Foundations of Web Development
                </div>
                <div className="text-[0.68rem] font-mono uppercase font-semibold text-muted mt-1">
                  CSS, Bootstrap, JavaScript &amp; React (Udemy, April 2025)
                </div>
              </div>
            </div>

            {/* LeetCode Consistency Card */}
            <div className="bg-white border border-border rounded-2xl p-4 flex items-center gap-3.5 shadow-sm hover:border-brand-violet hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-brand-amber/10 flex items-center justify-center text-brand-amber flex-shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <div className="text-[0.88rem] font-bold text-ink leading-tight">
                  50 Days Badge 2026 Recognition
                </div>
                <div className="text-[0.68rem] font-mono uppercase font-semibold text-muted mt-1">
                  LeetCode Verified Daily Consistency Award
                </div>
              </div>
            </div>

            {/* Career Direction Pill */}
            <div className="mt-2 p-3.5 rounded-xl border border-dashed border-border bg-white/70 flex items-center gap-3 text-xs font-mono text-ink-2">
              <Compass className="w-4 h-4 text-brand-violet flex-shrink-0" />
              <span>Targeting: Entry-Level Software Engineer / Full-Stack Roles</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
