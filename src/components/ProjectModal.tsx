"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { Project } from "@/data/projects";
import {
  X,
  Github,
  ExternalLink,
  CheckCircle2,
  Workflow,
  AlertTriangle,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
} from "lucide-react";

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!project) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
      if (e.key === "Tab" && modalRef.current) {
        const focusable = Array.from(
          modalRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ).filter((element) => !element.hasAttribute("hidden"));
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      previouslyFocused?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 sm:p-6 md:p-8 bg-ink/60 backdrop-blur-2xl overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={modalRef}
        className="relative w-full max-w-[760px] max-h-[88vh] overflow-y-auto bg-white rounded-[32px] p-8 sm:p-11 shadow-[0_80px_160px_rgba(0,0,0,0.25)] space-y-7 border border-border"
        data-lenis-prevent
      >
        {/* Close Button matching mclose */}
        <button
          ref={closeButtonRef}
          type="button"
          onClick={onClose}
          aria-label="Close Case Study"
          className="absolute top-6 right-6 w-9 h-9 rounded-full bg-surface border border-border text-ink hover:bg-ink hover:text-white flex items-center justify-center transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-2 pr-10">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-[0.68rem] font-mono font-bold tracking-[0.2em] text-brand-violet uppercase">
              {project.projectNumber} · {project.category}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold border border-brand-violet/30 bg-brand-violet/10 text-brand-violet">
              {project.status}
            </span>
          </div>

          <h2
            id="modal-project-title"
            className="text-2xl sm:text-3xl font-display font-extrabold text-ink tracking-tight"
          >
            {project.title}
          </h2>

          <p className="text-xs font-mono font-semibold text-muted uppercase tracking-wider">
            {project.subtitle}
          </p>
        </div>

        {/* Metrics Row matching .m-metrics and .mm from Surya's portfolio */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {project.metrics.map((metric, idx) => (
            <div
              key={idx}
              className="bg-surface rounded-2xl p-4 text-center border border-border/60"
            >
              <div className="text-2xl font-display font-extrabold text-brand-violet">
                {metric.value}
              </div>
              <div className="text-[0.62rem] font-mono font-bold uppercase tracking-wider text-muted mt-1">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Overview, Problem & Solution */}
        <div className="space-y-4">
          <p className="text-sm text-ink-2 leading-relaxed font-sans">
            {project.fullOverview}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-rose text-xs font-mono font-bold uppercase">
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>The Challenge</span>
              </div>
              <p className="text-xs text-ink-2 leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface border border-border space-y-1.5">
              <div className="flex items-center gap-1.5 text-brand-emerald text-xs font-mono font-bold uppercase">
                <Lightbulb className="w-3.5 h-3.5" />
                <span>The Solution</span>
              </div>
              <p className="text-xs text-ink-2 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>

        {/* Architecture Flow */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-wider text-muted">
            <Workflow className="w-4 h-4 text-brand-violet" />
            <span>Architecture Flow</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.architectureFlow.map((node, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-surface border border-border/80 space-y-1"
              >
                <span className="text-[10px] font-mono font-bold text-brand-violet block">
                  {node.step}
                </span>
                <h4 className="text-xs font-display font-bold text-ink">
                  {node.title}
                </h4>
                <p className="text-[11px] text-ink-2 leading-relaxed">
                  {node.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div className="space-y-2.5 pt-1">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
            Key Capabilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {project.keyCapabilities.map((cap, i) => (
              <div key={i} className="flex items-start gap-2 text-xs text-ink">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-violet mt-0.5 flex-shrink-0" />
                <span>{cap}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="space-y-2 pt-1">
          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-muted">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {project.allTechPills.map((tech) => (
              <span key={tech} className="tag font-bold">
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Bar */}
        <div className="pt-5 border-t border-border flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all"
            >
              <Github className="w-3.5 h-3.5" />
              <span>Source Code</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-sans font-bold text-brand-violet bg-brand-violet/10 hover:bg-brand-violet hover:text-white transition-all border border-brand-violet/20"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
            )}

            <Link
              href={`/projects/${project.slug}`}
              className="inline-flex items-center gap-1 text-xs font-mono text-brand-violet font-bold hover:underline"
            >
              <span>Dedicated Page</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-full text-xs font-sans font-semibold text-muted hover:text-ink border border-border"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
