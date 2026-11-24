"use client";

import { useEffect, useRef, useState } from "react";
import {
  Mail,
  Copy,
  Check,
  Github,
  Linkedin,
  Code2,
  Instagram,
  ArrowUpRight,
  MapPin,
  Clock,
  Sparkles,
} from "lucide-react";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  const handleCopy = async () => {
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
    <section id="contact" aria-label="Contact Ashik Khan" className="py-28 px-6 md:px-12 bg-ink text-white relative">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow !text-brand-cyan">Contact</div>
          <h2 className="st !text-white">
            Let&apos;s build something<br />
            <span className="gr">remarkable</span>
          </h2>
          <p className="stxt !text-muted">
            Open to software engineering roles, internships, product engineering, and collaborative systems development.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Contact Cards matching .ct-card */}
          <div className="lg:col-span-7 space-y-4">
            {/* Primary Email Card */}
            <div className="bg-white/[0.05] border border-white/[0.08] rounded-[20px] p-6 sm:p-7 space-y-3">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-muted font-bold block">
                PRIMARY EMAIL
              </span>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center text-brand-violet">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-base sm:text-lg font-mono font-bold text-white select-all">
                      ashikcodex@gmail.com
                    </span>
                    <span className="text-xs font-mono text-muted block">Direct developer inbox</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    aria-label="Copy email address"
                    className="px-4 py-2 rounded-full text-xs font-mono font-bold text-white bg-white/[0.08] hover:bg-white/[0.15] border border-white/[0.12] transition-all flex items-center gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-brand-emerald" />
                        <span className="text-brand-emerald">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-muted" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:ashikcodex@gmail.com?subject=Software%20Engineering%20Inquiry%20-%20Ashik%20Khan"
                    className="px-4 py-2 rounded-full text-xs font-sans font-bold text-white bg-brand-violet hover:bg-brand-violet-light transition-all flex items-center gap-1.5 shadow-md shadow-brand-violet/30"
                  >
                    <span>Send Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Social Grid matching .ct-card */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/ashik-khan-489856299/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-brand-violet/50 hover:bg-white/[0.08] rounded-[20px] p-5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-violet/20 text-brand-violet flex items-center justify-center">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.62rem] font-mono text-muted uppercase font-bold block">
                      LinkedIn
                    </span>
                    <span className="text-sm font-display font-bold text-white group-hover:text-brand-violet transition-colors">
                      Ashik Khan
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-all" />
              </a>

              {/* GitHub */}
              <a
                href="https://github.com/realashuuu"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-brand-violet/50 hover:bg-white/[0.08] rounded-[20px] p-5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/[0.08] text-white flex items-center justify-center">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.62rem] font-mono text-muted uppercase font-bold block">
                      GitHub
                    </span>
                    <span className="text-sm font-display font-bold text-white group-hover:text-brand-violet transition-colors">
                      realashuuu
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-all" />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/u/ashikkhan03/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-brand-amber/50 hover:bg-white/[0.08] rounded-[20px] p-5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-amber/20 text-brand-amber flex items-center justify-center">
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.62rem] font-mono text-muted uppercase font-bold block">
                      LeetCode
                    </span>
                    <span className="text-sm font-display font-bold text-white group-hover:text-brand-amber transition-colors">
                      100 Solved · 50 Days
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-all" />
              </a>

              {/* Instagram */}
              <a
                href="https://www.instagram.com/realashuuu/"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/[0.05] border border-white/[0.08] hover:border-white/30 hover:bg-white/[0.08] rounded-[20px] p-5 flex items-center justify-between group transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand-rose/20 text-brand-rose flex items-center justify-center">
                    <Instagram className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[0.62rem] font-mono text-muted uppercase font-bold block">
                      Instagram
                    </span>
                    <span className="text-sm font-display font-bold text-white group-hover:text-brand-rose transition-colors">
                      @realashuuu
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-white transition-all" />
              </a>
            </div>
          </div>

          {/* Right Column: Status & Direct Summary */}
          <div className="lg:col-span-5 bg-white/[0.05] border border-white/[0.08] rounded-[20px] p-7 space-y-5">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-emerald"></span>
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-brand-emerald font-bold">
                CURRENT STATUS
              </span>
            </div>

            <div className="space-y-3.5 text-xs font-mono">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <MapPin className="w-4 h-4 text-brand-violet flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block uppercase text-[0.62rem]">Location</span>
                  <span className="text-white font-bold">Durgapur, West Bengal, India</span>
                  <span className="text-muted text-[11px] block">(IST · UTC+5:30)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Clock className="w-4 h-4 text-brand-amber flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block uppercase text-[0.62rem]">Academic Timeline</span>
                  <span className="text-white font-bold">B.Tech CSE (2023–2027)</span>
                  <span className="text-muted text-[11px] block">NSHM · MAKAUT (CGPA 7.1)</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <Sparkles className="w-4 h-4 text-brand-emerald flex-shrink-0 mt-0.5" />
                <div>
                  <span className="text-muted block uppercase text-[0.62rem]">Opportunities</span>
                  <span className="text-white font-bold">Full-Stack / Backend Engineering</span>
                  <span className="text-muted text-[11px] block">Internships &amp; Full-Time Roles</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-muted font-sans leading-relaxed pt-1">
              Available for immediate discussions regarding software engineering roles, full-stack application development,
              and innovative product architectures.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
