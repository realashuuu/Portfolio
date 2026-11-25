"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects, Project } from "@/data/projects";
import { Github, ExternalLink, Image as ImageIcon } from "lucide-react";

// Only showcase Nexora & MivChat
const FEATURED_PROJECTS = projects.filter(
  (p) => p.id === "nexora" || p.id === "mivchat"
);

// Replace these paths once you drop your screenshots into /public/images/
const PROJECT_PREVIEW_IMAGES: Record<string, string> = {
  nexora: "", // e.g., "/images/nexora-preview.png"
  mivchat: "", // e.g., "/images/mivchat-preview.png"
};

// Authentic resume bullet points for each card
const PROJECT_POINTS: Record<string, string[]> = {
  nexora: [
    "Transcribes meetings, generates structured summaries, and extracts action items via OpenAI APIs.",
    "JWT access/refresh token auth, role-based middleware, and protected tRPC routes on Next.js.",
    "PostgreSQL schemas with Drizzle ORM paired with Redis caching and async Inngest retry pipelines.",
  ],
  mivchat: [
    "JWT authentication, bcrypt password hashing, and instant 1:1 messaging powered by Socket.IO.",
    "Live user presence, Cloudinary image sharing, message status tracking, and unread notifications.",
    "Modular Express REST APIs, React Context API state management, deployed on Vercel and Render.",
  ],
};

export default function Projects() {
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});
  const sectionRef = useRef<HTMLElement | null>(null);
  const card1Ref = useRef<HTMLElement | null>(null);
  const card2Ref = useRef<HTMLElement | null>(null);

  // Smooth scroll-driven overlapping animation keeping both heading and cards visible in viewport
  useEffect(() => {
    const section = sectionRef.current;
    const card1 = card1Ref.current;
    const card2 = card2Ref.current;
    if (!section || !card1 || !card2) return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();
    const ctx = gsap.context(() => {
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.to(card1, {
          scale: 0.955,
          opacity: 0.65,
          y: -10,
          ease: "none",
          scrollTrigger: {
            trigger: card2,
            start: "top 82%",
            end: "top 28%",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      });
    }, sectionRef);

    return () => {
      ctx.revert();
      mm.revert();
    };
  }, []);

  const renderPreview = (project: Project) => {
    const src = PROJECT_PREVIEW_IMAGES[project.id];
    const hasValidImage = Boolean(src) && !failedImages[project.id];

    return (
      <div className="relative w-full md:w-[43%] lg:w-[44%] flex-shrink-0 min-h-[210px] md:min-h-[270px] rounded-2xl overflow-hidden border border-border bg-gradient-to-br from-[#0B0F19] via-[#141b2d] to-[#1e1b4b]">
        {hasValidImage ? (
          <img
            src={src}
            alt={`${project.title} application preview`}
            onError={() =>
              setFailedImages((prev) => ({ ...prev, [project.id]: true }))
            }
            className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-5 bg-[radial-gradient(circle_at_75%_20%,rgba(91,62,255,0.28),transparent_55%),radial-gradient(circle_at_20%_80%,rgba(6,182,212,0.18),transparent_50%)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-300/85 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                {project.id === "nexora" ? "AI Pipeline" : "Live Chat"}
              </span>
            </div>

            <div className="flex flex-col items-center justify-center text-center gap-1.5 my-auto">
              <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/15 flex items-center justify-center text-sky-300">
                <ImageIcon className="w-5 h-5" />
              </div>
              <span className="text-sm font-display font-bold text-white tracking-tight">
                {project.title}
              </span>
              <span className="text-[10px] font-mono text-slate-400">
                /public/images/{project.id}-preview.png
              </span>
            </div>

            <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-white/10 pt-2.5">
              <span>{project.architectureFlow[0]?.title}</span>
              <span>→</span>
              <span>{project.architectureFlow[project.architectureFlow.length - 1]?.title}</span>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      aria-label="Featured Projects"
      className="py-20 px-6 md:px-12 bg-white overflow-x-clip"
    >
      <div className="inner">
        {/* Sticky Header aligned cleanly so both heading and cards fit in screen together */}
        <div className="md:sticky md:top-16 z-10 bg-white/95 backdrop-blur-sm pt-2 pb-4 mb-5">
          <div className="eyebrow !mb-1.5">PROJECTS</div>
          <h2 className="st !mb-1.5 !text-[clamp(1.85rem,4vw,3rem)]">
            Work that <span className="gr">matters</span>
          </h2>
          <p className="stxt !mb-0 !max-w-2xl text-[0.92rem]">
            Selected full-stack and AI-powered applications built end to end.
          </p>
        </div>

        {/* Full-Width Compact Rectangular Cards aligned with inner container */}
        <div className="w-full space-y-8 md:space-y-12 pb-10">
          {FEATURED_PROJECTS.map((project, index) => {
            const isFirst = index === 0;
            const points = PROJECT_POINTS[project.id] ?? [];

            return (
              <article
                key={project.id}
                ref={isFirst ? card1Ref : card2Ref}
                data-reveal-card
                style={{ "--reveal-delay": `${index * 80}ms` } as React.CSSProperties}
                className={`reveal-card pc card-glow group bg-white rounded-[24px] p-5 sm:p-6 will-change-transform flex flex-col md:flex-row items-stretch gap-5 md:gap-7 active:scale-[0.99] ${
                  isFirst
                    ? "md:sticky md:top-[200px] z-20 shadow-[0_18px_50px_rgba(9,9,15,0.06)]"
                    : "md:sticky md:top-[220px] z-30 shadow-[0_26px_75px_rgba(9,9,15,0.13)]"
                }`}
              >
                {/* Left Side: Stretched-to-match Rectangular Preview Image with Manual Image Slot */}
                {isFirst ? (
                  <>
                    {/* MANUAL IMAGE SLOT: Replace src below with your Nexora screenshot/preview image (e.g., /images/nexora-preview.png) */}
                    {renderPreview(project)}
                  </>
                ) : (
                  <>
                    {/* MANUAL IMAGE SLOT: Replace src below with your MivChat screenshot/preview image (e.g., /images/mivchat-preview.png) */}
                    {renderPreview(project)}
                  </>
                )}

                {/* Right Side: Balanced Title, Details in Bullet Points & Links */}
                <div className="flex-1 min-w-0 flex flex-col justify-between gap-3">
                  <div className="space-y-2.5">
                    {/* Top Index, Status & Direct Action Links */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[0.65rem] tracking-[0.22em] text-muted uppercase font-bold">
                          {project.projectNumber}
                        </span>
                        <span className="text-muted">·</span>
                        <span
                          className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                            project.status === "In Progress"
                              ? "text-brand-amber bg-brand-amber/10 border-brand-amber/30"
                              : "text-brand-emerald bg-brand-emerald/10 border-brand-emerald/30"
                          }`}
                        >
                          {project.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} GitHub repository`}
                          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-ink bg-surface border border-border hover:border-brand-violet hover:text-brand-violet transition-colors"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>

                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live deployment`}
                            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold text-white bg-ink hover:bg-brand-violet transition-colors"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Title & Category Subtitle */}
                    <div>
                      <h3 className="pc-title-glow text-2xl sm:text-[1.7rem] font-display font-extrabold text-ink leading-tight">
                        {project.title}
                      </h3>
                      <div className="text-[0.68rem] font-mono uppercase tracking-[0.12em] text-muted font-bold pt-0.5">
                        {project.subtitle}
                      </div>
                    </div>

                    {/* Details in Bullet Points filling remaining space cleanly */}
                    <ul className="exp-ul pt-1">
                      {points.map((pt, i) => (
                        <li key={i} className="!text-[0.83rem] !leading-[1.55]">
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stack Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-2.5 border-t border-border">
                    {project.allTechPills.map((tech) => (
                      <span key={tech} className="tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
