"use client";

import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      aria-label="Footer"
      className="relative z-10 w-full py-5 px-6 md:px-12 bg-ink border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      <p className="text-xs font-sans font-medium text-white/40">
        © {new Date().getFullYear()} All Rights Reserved · Ashik Khan
      </p>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className="group inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border border-white/10 hover:border-brand-violet bg-white/[0.04] hover:bg-brand-violet text-white text-xs font-sans font-bold transition-all"
      >
        <span>Back to top</span>
        <ArrowUp className="w-3.5 h-3.5 transition-transform group-hover:-translate-y-0.5" />
      </button>
    </footer>
  );
}
