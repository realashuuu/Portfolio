export default function About() {
  const keyStrengths = [
    "End-to-end systems thinking and full-stack execution",
    "Strong analytical and algorithmic problem-solving in C++",
    "Backend architecture, clean APIs, and data modeling",
    "Practical AI integration and asynchronous workflows",
    "Structured, maintainable code with attention to detail",
    "Fast, hands-on learner driven by curiosity for scalable systems",
  ];

  return (
    <section id="about" aria-label="About Ashik Khan" className="py-28 px-6 md:px-12 bg-surface">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow">ABOUT</div>
          <h2 className="st">
            Building software that<br />
            <span className="gr">holds up in practice</span>
          </h2>
          <p className="stxt">
            From clean interfaces and APIs to asynchronous workflows, databases, and applied AI.
          </p>
        </div>

        {/* 2-Column Grid vertically centered to middle of paragraph */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="lg:col-span-6 space-y-5 text-[1rem] text-ink-2 leading-[1.85] font-sans">
            <p>
              I am <strong className="text-ink font-semibold">Ashik Khan</strong>, a Computer
              Science &amp; Engineering undergraduate at{" "}
              <strong className="text-ink font-semibold">
                NSHM College of Management and Technology, Durgapur
              </strong>
              , affiliated with MAKAUT, West Bengal (2023–2027), driven by a curiosity to understand
              how software works beneath the surface and build practical products from the ground up.
            </p>

            <p>
              Rather than treating web development as disconnected visual blocks or surface-level
              demos, I explore how the full stack fits together—from responsive interfaces and
              structured APIs to real-time interactions, data layers, and practical AI integrations.
              Alongside full-stack building, I sharpen my problem-solving through consistent DSA
              practice in C++ on LeetCode while exploring Python, backend architecture, and
              cloud-ready workflows.
            </p>

            <p>
              What matters most to me is writing clean, dependable code and seeing how every layer
              holds up under real constraints. If you care about thoughtful engineering, DSA, backend
              systems, applied AI, or building hands-on products together,{" "}
              <a
                href="#contact"
                className="text-brand-violet font-semibold hover:underline underline-offset-4"
              >
                let&apos;s connect
              </a>
              .
            </p>
          </div>

          {/* Right Column: Compact centered Key Strengths card */}
          <div className="lg:col-span-6 flex justify-center">
            <div
              data-reveal-card
              className="reveal-card card-glow w-fit max-w-full bg-white rounded-[22px] p-5 sm:p-6 shadow-sm active:scale-[0.99]"
            >
              <div className="pb-2.5 mb-3 border-b border-border">
                <h3 className="text-base font-display font-extrabold text-ink tracking-tight">
                  Key Strengths
                </h3>
              </div>

              <ul className="space-y-2.5">
                {keyStrengths.map((strength) => (
                  <li
                    key={strength}
                    className="flex items-center gap-2.5 text-[0.78rem] sm:text-[0.82rem] text-ink-2 leading-snug font-sans xl:whitespace-nowrap"
                  >
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full border-[1.5px] border-brand-violet flex-shrink-0"
                    />
                    <span>{strength}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
