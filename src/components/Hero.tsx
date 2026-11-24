"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  Github,
  Linkedin,
  Code2,
  Instagram,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";

const roles = [
  "Full-Stack Developer",
  "Backend & Systems Explorer",
  "AI Product Builder",
  "Problem Solver (100 LeetCode)",
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const copiedTimerRef = useRef<number | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 3200);
    return () => {
      clearInterval(interval);
      if (copiedTimerRef.current) window.clearTimeout(copiedTimerRef.current);
    };
  }, []);

  // Floating + magnetic portrait
  useEffect(() => {
    const el = portraitRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let targetX = 0;
    let targetY = 0;
    let targetScale = 1;
    let x = 0;
    let y = 0;
    let scale = 1;
    let rafId = 0;
    const startTime = performance.now();

    const onEnter = () => {
      targetScale = 1.04;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      targetX = Math.max(-24, Math.min(24, (e.clientX - cx) * 0.25));
      targetY = Math.max(-24, Math.min(24, (e.clientY - cy) * 0.25));
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      targetScale = 1;
    };

    const tick = (now: number) => {
      const t = (now - startTime) / 1000;
      const float = Math.sin(t * 1.3) * 10;

      x += (targetX - x) * 0.12;
      y += (targetY - y) * 0.12;
      scale += (targetScale - scale) * 0.12;

      el.style.transform = `translate3d(${x}px, ${y + float}px, 0) scale(${scale})`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    if (finePointer) {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mousemove", onMove, { passive: true });
      el.addEventListener("mouseleave", onLeave);
    }

    return () => {
      cancelAnimationFrame(rafId);
      if (finePointer) {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      }
    };
  }, []);

  const handleCopyEmail = async () => {
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
      id="hero"
      aria-label="Introduction & Overview"
      className="relative min-h-screen flex flex-col justify-center pt-28 pb-20 overflow-hidden bg-white"
    >
      {/* Ambient background blobs matching Surya's portfolio */}
      <div className="blob bl1" aria-hidden="true" />
      <div className="blob bl2" aria-hidden="true" />
      <div className="blob bl3" aria-hidden="true" />
      <div className="dot-grid" aria-hidden="true" />

      <div className="inner px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Hero Typography & Actions */}
        <div className="lg:col-span-7 space-y-6">
          {/* Status Badge */}
          <div>
            <div className="hero-badge">
              <div className="badge-pulse" />
              <span>B.Tech CSE &apos;27 · Durgapur · Open for Opportunities</span>
            </div>
          </div>

          {/* Headline matching reference hname */}
          <h1 className="hname">
            <span className="gr">Ashik</span>
            <br />
            Khan
          </h1>

          {/* Role Cycler */}
          <div className="flex items-center gap-2 font-mono text-sm sm:text-base text-ink-2 h-7">
            <span className="text-brand-violet font-bold">❯</span>
            <span className="font-semibold text-brand-violet">
              {roles[roleIndex]}
            </span>
            <span className="inline-block w-2 h-4 bg-brand-violet animate-pulse" />
          </div>

          {/* Description matching .hero-p */}
          <p className="hero-p">
            <strong>Ashik Khan</strong> — Computer Science &amp; Engineering undergraduate and{" "}
            <strong>Full-Stack Developer</strong> exploring the intersection of backend architectures,
            real-time WebSockets, database design, and practical <strong>Generative AI</strong> product integrations.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a href="#projects" className="hbtn-p">
              <span>View Projects</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>

            <a href="#contact" className="hbtn-s">
              <span>Get in touch</span>
            </a>

            <button
              type="button"
              onClick={handleCopyEmail}
              aria-label="Copy Email Address"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-full border border-border text-ink-2 hover:border-ink hover:text-ink bg-white text-xs font-sans font-bold transition-all shadow-sm"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-brand-emerald" />
                  <span className="text-brand-emerald">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted" />
                  <span>Copy Email</span>
                </>
              )}
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-3 text-muted">
            <span className="text-xs font-mono uppercase tracking-wider text-muted/70 mr-1">
              Connect:
            </span>
            <a
              href="https://github.com/realashuuu"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashik Khan on GitHub"
              className="hover:text-brand-violet transition-colors p-1"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/ashik-khan-489856299/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashik Khan on LinkedIn"
              className="hover:text-brand-violet transition-colors p-1"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href="https://leetcode.com/u/ashikkhan03/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashik Khan on LeetCode"
              className="hover:text-brand-violet transition-colors p-1"
            >
              <Code2 className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/realashuuu/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ashik Khan on Instagram"
              className="hover:text-brand-violet transition-colors p-1"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Right Column: round floating portrait */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(53,70,86,0.7)_0%,rgba(53,70,86,0)_70%)] blur-2xl sm:h-[360px] sm:w-[360px]"
          />

          <div
            ref={portraitRef}
            className="relative h-64 w-64 rounded-full bg-gradient-to-br from-[#E9ECEF] via-[#354656] to-[#A6B7C8] p-[3px] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)] will-change-transform sm:h-72 sm:w-72"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#202B37]">
              <Image
                src="/avatar.png"
                alt="Ashik Khan - Computer Science Undergraduate & Full-Stack Developer"
                fill
                priority
                sizes="(max-width: 768px) 250px, 300px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave bottom separator transitioning to #about with fill #f7f7fc */}
      <div className="wave-wrap" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          height="80"
          className="w-full"
        >
          <path
            d="M0,30 C240,75 480,0 720,45 C960,90 1200,10 1440,40 L1440,80 L0,80Z"
            fill="#f7f7fc"
          />
        </svg>
      </div>
    </section>
  );
}