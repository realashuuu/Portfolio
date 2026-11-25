"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowRight, FileText } from "lucide-react";
import HeroShaderBg from "./HeroShaderBg";

const PHRASES = [
  "Full-Stack Developer",
  "Backend & Systems Engineer",
  "AI Product Builder",
  "DSA & Problem Solver",
];

export default function Hero() {
  const typeWordRef = useRef<HTMLSpanElement | null>(null);
  const portraitRef = useRef<HTMLDivElement | null>(null);
  const projectsBtnRef = useRef<HTMLAnchorElement | null>(null);
  const resumeBtnRef = useRef<HTMLAnchorElement | null>(null);

  // Smooth character-by-character typewriter effect
  useEffect(() => {
    const el = typeWordRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      el.textContent = PHRASES[0];
      return;
    }

    let pi = 0;
    let ci = 0;
    let deleting = false;
    let pauseFrames = 0;
    let timerId = 0;
    const PAUSE = 55;
    const TYPE_MS = 55;
    const DEL_MS = 28;

    const tick = () => {
      const phrase = PHRASES[pi];
      if (pauseFrames > 0) {
        pauseFrames--;
        timerId = window.setTimeout(tick, TYPE_MS);
        return;
      }

      if (!deleting) {
        el.textContent = phrase.slice(0, ci + 1);
        ci++;
        if (ci === phrase.length) {
          deleting = true;
          pauseFrames = PAUSE;
          timerId = window.setTimeout(tick, TYPE_MS);
          return;
        }
      } else {
        el.textContent = phrase.slice(0, ci - 1);
        ci--;
        if (ci === 0) {
          deleting = false;
          pi = (pi + 1) % PHRASES.length;
          pauseFrames = 8;
        }
      }

      timerId = window.setTimeout(tick, deleting ? DEL_MS : TYPE_MS);
    };

    el.textContent = "";
    timerId = window.setTimeout(tick, 900);

    return () => {
      window.clearTimeout(timerId);
    };
  }, []);

  // Magnetic hover pull on primary hero CTAs
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const buttons = [projectsBtnRef.current, resumeBtnRef.current].filter(
      Boolean
    ) as HTMLAnchorElement[];

    const cleanups = buttons.map((btn) => {
      const onMove = (e: MouseEvent) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.3;
        const y = (e.clientY - r.top - r.height / 2) * 0.3;
        btn.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      };
      const onLeave = () => {
        btn.style.transform = "";
      };

      btn.addEventListener("mousemove", onMove, { passive: true });
      btn.addEventListener("mouseleave", onLeave);

      return () => {
        btn.removeEventListener("mousemove", onMove);
        btn.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  // Floating and magnetic portrait interaction
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

  return (
    <section
      id="hero"
      aria-label="Introduction & Overview"
      className="relative min-h-[106vh] flex flex-col justify-center pt-32 md:pt-36 pb-44 md:pb-48 overflow-hidden bg-[#04070e] text-white"
      style={{
        backgroundImage:
          "radial-gradient(85% 65% at 62% 38%, #0e172a 0%, #04070e 75%)",
      }}
    >
      {/* Animated dark-blue WebGL silk gradient backdrop */}
      <HeroShaderBg />

      {/* Architectural dot-grid & contrast vignette */}
      <div className="dot-grid-dark" aria-hidden="true" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-[#04070e]/45 via-[#04070e]/15 to-[#04070e]/80"
      />

      <div className="inner px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
        {/* Left Column: Availability Badge, Hero Typography, Typewriter & Magnetic CTAs */}
        <div className="lg:col-span-7">
          {/* Compact blinking green availability pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/15 backdrop-blur-md text-[0.58rem] sm:text-[0.62rem] font-mono font-bold uppercase tracking-[0.09em] text-sky-300 mb-3.5 shadow-[0_4px_20px_rgba(6,182,212,0.1)] animate-[yin_0.6s_cubic-bezier(0.23,1,0.32,1)_both]">
            <span className="badge-pulse-green !w-1.5 !h-1.5" aria-hidden="true" />
            <span>Open to internships &amp; entry-level roles</span>
          </div>

          {/* Capitalized display name headline */}
          <h1 className="hname">
            <span className="gr-hero">ASHIK</span>
            <br />
            <span className="text-[#F3F1EB]">KHAN</span>
          </h1>

          {/* Smooth typewriter cycle below name */}
          <div className="hero-role-cycle">
            <span ref={typeWordRef} className="type-word-hero">
              Full-Stack Developer
            </span>
            <span className="hero-cursor" aria-hidden="true" />
          </div>

          {/* Concise bio */}
          <p className="hero-p-dark">
            <strong className="text-white font-semibold">Ashik Khan</strong> — Computer Science &amp;
            Engineering undergraduate and{" "}
            <strong className="text-white font-semibold">Full-Stack Developer</strong> building scalable
            web applications, backend architectures, real-time systems, and practical{" "}
            <strong className="text-white font-semibold">AI-powered products</strong>.
          </p>

          {/* Magnetic CTAs: View Projects & View Resume */}
          <div className="flex flex-wrap items-center gap-4">
            <a ref={projectsBtnRef} href="#projects" className="hbtn-p">
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <a
              ref={resumeBtnRef}
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hbtn-s"
            >
              <FileText className="w-4 h-4 text-sky-300" />
              <span>View Resume</span>
            </a>
          </div>
        </div>

        {/* Right Column: Round floating magnetic portrait */}
        <div className="relative flex items-center justify-center lg:col-span-5">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(91,62,255,0.28)_0%,rgba(56,189,248,0.12)_45%,rgba(7,11,20,0)_72%)] blur-2xl sm:h-[380px] sm:w-[380px]"
          />

          <div
            ref={portraitRef}
            className="relative h-64 w-64 rounded-full bg-gradient-to-br from-[#8b6fff] via-[#354656] to-[#38bdf8] p-[3px] shadow-[0_30px_90px_-15px_rgba(91,62,255,0.45)] will-change-transform sm:h-72 sm:w-72 md:h-80 md:w-80"
          >
            <div className="relative h-full w-full overflow-hidden rounded-full bg-[#10151C]">
              <Image
                src="/avatar.png"
                alt="Ashik Khan - Computer Science Undergraduate & Full-Stack Developer"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Wave separator transitioning cleanly into #about */}
      <div className="wave-wrap" aria-hidden="true">
        <svg
          viewBox="0 0 1440 80"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="block w-full h-[54px] sm:h-[72px] md:h-[84px]"
        >
          <path
            d="M0,32 C240,78 480,2 720,44 C960,86 1200,12 1440,38 L1440,80 L0,80Z"
            fill="#f7f7fc"
          />
        </svg>
      </div>
    </section>
  );
}
