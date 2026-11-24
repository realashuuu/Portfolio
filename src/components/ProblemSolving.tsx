import { Code2, Award, ExternalLink, CheckCircle2, Terminal } from "lucide-react";

export default function ProblemSolving() {
  return (
    <section id="problem-solving" aria-label="Algorithmic Problem Solving & LeetCode" className="py-28 px-6 md:px-12 bg-surface">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow">Algorithms</div>
          <h2 className="st">
            Data Structures &amp; <span className="gr">Problem Solving</span>
          </h2>
          <p className="stxt">
            Systematic problem-solving practice grounded in C++ and core algorithmic patterns to write
            efficient, high-performance software.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Metrics & Distribution */}
          <div className="lg:col-span-7 bg-white border border-border rounded-[24px] p-7 md:p-8 space-y-6 shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-border">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-brand-violet/10 flex items-center justify-center text-brand-violet">
                  <Code2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-3xl font-display font-bold text-ink">100</span>
                  <span className="text-xs font-mono uppercase tracking-wider text-muted font-bold block">
                    Total Problems Solved
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-amber/10 border border-brand-amber/30 text-brand-amber text-xs font-mono font-bold">
                <Award className="w-4 h-4" />
                <span>50 Days Badge 2026</span>
              </div>
            </div>

            {/* Difficulty Breakdown Bars */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-wider text-muted font-bold block">
                Difficulty Breakdown
              </span>

              {/* Easy */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-brand-emerald flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-emerald" /> Easy
                  </span>
                  <span className="text-ink">35</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden border border-border">
                  <div className="h-full bg-brand-emerald rounded-full" style={{ width: "35%" }} />
                </div>
              </div>

              {/* Medium */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-brand-amber flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-amber" /> Medium
                  </span>
                  <span className="text-ink">58</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden border border-border">
                  <div className="h-full bg-brand-amber rounded-full" style={{ width: "58%" }} />
                </div>
              </div>

              {/* Hard */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono font-bold">
                  <span className="text-brand-rose flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-brand-rose" /> Hard
                  </span>
                  <span className="text-ink">7</span>
                </div>
                <div className="h-2 rounded-full bg-surface overflow-hidden border border-border">
                  <div className="h-full bg-brand-rose rounded-full" style={{ width: "7%" }} />
                </div>
              </div>
            </div>

            {/* Language Breakdown */}
            <div className="pt-4 border-t border-border flex items-center justify-between text-xs font-mono">
              <div className="flex items-center gap-3">
                <span className="text-muted font-semibold">Language:</span>
                <span className="text-ink font-bold">99 C++</span>
                <span className="text-muted">·</span>
                <span className="text-ink font-bold">1 Python</span>
              </div>
              <span className="text-brand-violet font-bold">Primary: C++ (STL)</span>
            </div>
          </div>

          {/* Right Column: Key Patterns & Profile Link */}
          <div className="lg:col-span-5 bg-white border border-border rounded-[24px] p-7 md:p-8 space-y-5 shadow-sm">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-violet font-bold">
              <Terminal className="w-4 h-4" />
              <span>Core Algorithmic Patterns</span>
            </div>

            <p className="text-xs text-ink-2 leading-relaxed font-sans">
              Daily practice focused on fundamental computer science patterns:
            </p>

            <div className="grid grid-cols-2 gap-2">
              {[
                "Arrays & Strings",
                "Two Pointers",
                "Binary Search",
                "Hash Tables",
                "Dynamic Programming",
                "Monotonic Stack",
                "Divide & Conquer",
                "Bit Manipulation",
              ].map((topic) => (
                <div
                  key={topic}
                  className="flex items-center gap-2 p-2.5 rounded-xl bg-surface border border-border text-xs font-mono font-medium text-ink"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet flex-shrink-0" />
                  <span>{topic}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 border-t border-border">
              <a
                href="https://leetcode.com/u/ashikkhan03/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 rounded-xl text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all flex items-center justify-center gap-2 group shadow-sm"
              >
                <span>View Public Profile on LeetCode</span>
                <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
