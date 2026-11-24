"use client";

import { useState } from "react";
import { projects, Project } from "@/data/projects";
import ProjectModal from "./ProjectModal";
import { ArrowUpRight, Github, ExternalLink, ArrowRight } from "lucide-react";

export default function Projects() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [filter, setFilter] = useState<string>("all");

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.status === filter);

  return (
    <section id="projects" aria-label="Featured Projects & Case Studies" className="py-28 px-6 md:px-12 bg-white">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-12">
          <div className="eyebrow">Projects</div>
          <h2 className="st">
            Work that <span className="gr">matters</span>
          </h2>
          <p className="stxt">
            Flagship solutions spanning AI intelligence, real-time WebSockets, event-driven webhooks,
            and high-performance frontends. Click any card to explore the case study.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setFilter("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
              filter === "all"
                ? "bg-ink text-white shadow-sm"
                : "bg-surface text-ink-2 hover:bg-white border border-border"
            }`}
          >
            All Work ({projects.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter("In Progress")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
              filter === "In Progress"
                ? "bg-ink text-white shadow-sm"
                : "bg-surface text-ink-2 hover:bg-white border border-border"
            }`}
          >
            In Progress
          </button>
          <button
            type="button"
            onClick={() => setFilter("Live")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
              filter === "Live"
                ? "bg-ink text-white shadow-sm"
                : "bg-surface text-ink-2 hover:bg-white border border-border"
            }`}
          >
            Live Deployments
          </button>
          <button
            type="button"
            onClick={() => setFilter("Completed PoC")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
              filter === "Completed PoC"
                ? "bg-ink text-white shadow-sm"
                : "bg-surface text-ink-2 hover:bg-white border border-border"
            }`}
          >
            Completed PoCs
          </button>
        </div>

        {/* Project Grid matching .pc cards from reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredProjects.map((project) => (
            <article
              key={project.id}
              onClick={() => setActiveProject(project)}
              onKeyDown={(event) => {
                if (event.target === event.currentTarget && (event.key === "Enter" || event.key === " ")) {
                  event.preventDefault();
                  setActiveProject(project);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Explore ${project.title} case study`}
              className="group bg-white border border-border rounded-[24px] p-7 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:border-brand-violet hover:shadow-[0_30px_80px_rgba(91,62,255,0.12)] relative overflow-hidden"
            >
              <div className="space-y-4">
                {/* Project Number & Status */}
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[0.62rem] tracking-[0.25em] text-muted uppercase font-bold">
                    {project.projectNumber}
                  </span>
                  <span
                    className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                      project.status === "In Progress"
                        ? "text-brand-amber bg-brand-amber/10 border-brand-amber/30"
                        : project.status === "Live"
                        ? "text-brand-emerald bg-brand-emerald/10 border-brand-emerald/30"
                        : "text-brand-violet bg-brand-violet/10 border-brand-violet/30"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Title & Category */}
                <div>
                  <h3 className="text-2xl font-display font-extrabold text-ink group-hover:text-brand-violet transition-colors flex items-center justify-between">
                    <span>{project.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-brand-violet opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </h3>
                  <div className="text-[0.72rem] font-mono uppercase tracking-[0.08em] text-muted font-bold pt-1">
                    {project.subtitle}
                  </div>
                </div>

                {/* Description */}
                <p className="text-[0.88rem] text-ink-2 leading-[1.7] font-sans line-clamp-3">
                  {project.shortDescription}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.allTechPills.slice(0, 5).map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                  {project.allTechPills.length > 5 && (
                    <span className="tag bg-surface text-muted">
                      +{project.allTechPills.length - 5}
                    </span>
                  )}
                </div>
              </div>

              {/* Bottom Actions matching .pc-btn */}
              <div className="mt-7 pt-4 border-t border-border flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-sans font-bold text-white bg-ink group-hover:bg-brand-violet transition-all">
                  <span>Explore Case Study</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>

                <div
                  className="flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} source code`}
                    className="p-1.5 text-muted hover:text-ink transition-colors"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} live demo`}
                      className="p-1.5 text-muted hover:text-brand-violet transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Modal Case Study Component */}
        <ProjectModal
          project={activeProject}
          onClose={() => setActiveProject(null)}
        />
      </div>
    </section>
  );
}
