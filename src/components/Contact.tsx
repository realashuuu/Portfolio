"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  MapPin,
  ArrowUpRight,
} from "lucide-react";
import EarthGlobe from "./EarthGlobe";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [focusSignal, setFocusSignal] = useState(0);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText("ashikcodex@gmail.com");
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = "ashikcodex@gmail.com";
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    setCopied(true);
    if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    copiedTimerRef.current = window.setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section
      id="contact"
      aria-label="Contact Ashik Khan"
      className="py-24 px-6 md:px-12 bg-ink text-white relative"
    >
      <div className="inner">
        {/* Section Header */}
        <div className="mb-12">
          <div className="eyebrow !text-brand-cyan">Contact</div>
          <h2 className="st !text-white">
            Let&apos;s build something<br />
            <span className="gr">remarkable</span>
          </h2>
          <p className="stxt !text-muted !mb-0">
            Open to internships, entry-level analyst &amp; engineering roles, and building practical
            full-stack and AI products together.
          </p>
        </div>

        {/* 2-Column Layout: Clean Contact Stack on Left + Standalone 3D Earth Globe on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Column: Email, LinkedIn, GitHub, Location */}
          <div className="lg:col-span-5 flex flex-col gap-3.5">
            {/* Email Card */}
            <a
              href="mailto:ashikcodex@gmail.com?subject=Opportunity%20%2F%20Inquiry%20-%20Ashik%20Khan"
              data-reveal-card
              style={{ "--reveal-delay": "0ms" } as React.CSSProperties}
              className="reveal-card ct-card group active:scale-[0.99]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="ct-ico text-white">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="ct-lbl">EMAIL</div>
                  <div className="ct-val truncate">ashikcodex@gmail.com</div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                aria-label="Copy email address"
                className="flex-shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-mono font-bold text-slate-200 bg-white/[0.08] hover:bg-white/[0.18] border border-white/[0.12] transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-brand-emerald" />
                    <span className="text-brand-emerald">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-muted" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </a>

            {/* LinkedIn Card */}
            <a
              href="https://www.linkedin.com/in/ashik-khan-489856299/"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-card
              style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
              className="reveal-card ct-card group active:scale-[0.99]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="ct-ico text-white">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="ct-lbl">LINKEDIN</div>
                  <div className="ct-val truncate">linkedin.com/in/ashik-khan-489856299</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white flex-shrink-0 transition-colors" />
            </a>

            {/* GitHub Card */}
            <a
              href="https://github.com/realashuuu"
              target="_blank"
              rel="noopener noreferrer"
              data-reveal-card
              style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
              className="reveal-card ct-card group active:scale-[0.99]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="ct-ico text-white">
                  <Github className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="ct-lbl">GITHUB</div>
                  <div className="ct-val truncate">github.com/realashuuu</div>
                </div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white flex-shrink-0 transition-colors" />
            </a>

            {/* Location Card (centers globe on India) */}
            <button
              type="button"
              onClick={() => setFocusSignal((n) => n + 1)}
              data-reveal-card
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
              className="reveal-card ct-card group text-left w-full active:scale-[0.99]"
            >
              <div className="flex items-center gap-4 min-w-0">
                <div className="ct-ico text-white">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="ct-lbl">LOCATION</div>
                  <div className="ct-val truncate">Durgapur, West Bengal, India</div>
                </div>
              </div>
            </button>
          </div>

          {/* Right Column: Standalone Interactive 3D Rotating Earth Globe shifted slightly right */}
          <div className="lg:col-span-7 flex items-center justify-center lg:justify-end lg:pl-8 lg:translate-x-6">
            <EarthGlobe focusSignal={focusSignal} />
          </div>
        </div>
      </div>
    </section>
  );
}
