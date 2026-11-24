"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Footer"
      className="relative z-10 py-6 px-6 md:px-12 bg-ink border-t border-white/[0.06] text-muted text-xs font-sans"
    >
      <div className="inner flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Side: Name and Copyright - STRICTLY NO LOGO */}
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-center sm:text-left">
          <span className="text-white font-bold font-display">Ashik Khan</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span>© {new Date().getFullYear()} All Rights Reserved</span>
          <span className="hidden sm:inline text-white/20">·</span>
          <span className="text-[11px] font-mono text-muted/70">The Making of an Engineer</span>
        </div>

        {/* Right Side: Back to Top */}
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Back to top"
            className="group flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/10 hover:border-brand-violet bg-white/[0.04] hover:bg-brand-violet text-white text-xs font-sans font-bold transition-all"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
