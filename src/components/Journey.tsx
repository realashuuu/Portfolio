"use client";

import { useState } from "react";
import { journeyMilestones } from "@/data/journey";
import { Calendar, ChevronRight, GraduationCap, Award, Code, Compass } from "lucide-react";

export default function Journey() {
  const [selectedYear, setSelectedYear] = useState<string>("all");

  const displayedMilestones =
    selectedYear === "all"
      ? journeyMilestones
      : journeyMilestones.filter((m) => m.year === selectedYear);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "Academic":
        return {
          icon: GraduationCap,
          color: "text-brand-emerald bg-brand-emerald/10 border-brand-emerald/30",
        };
      case "Certification":
        return {
          icon: Award,
          color: "text-brand-amber bg-brand-amber/10 border-brand-amber/30",
        };
      case "Engineering":
      case "Milestone":
        return {
          icon: Code,
          color: "text-brand-violet bg-brand-violet/10 border-brand-violet/30",
        };
      case "Future":
        return {
          icon: Compass,
          color: "text-brand-blue bg-brand-blue/10 border-brand-blue/30",
        };
      default:
        return {
          icon: Calendar,
          color: "text-ink-2 bg-surface border-border",
        };
    }
  };

  return (
    <section id="experience" aria-label="Chronological Journey Timeline" className="py-28 px-6 md:px-12 bg-surface">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-14">
          <div className="eyebrow">Journey</div>
          <h2 className="st">
            The Making of an <span className="gr">Engineer</span>
          </h2>
          <p className="stxt">
            A chronological account of academic milestones, software job simulations, full-stack application
            builds, and competitive programming progress.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Timeline Year Navigation matching Surya's exp-side */}
          <div className="lg:col-span-3">
            <div className="sticky top-28 space-y-2 bg-white border border-border rounded-2xl p-4 shadow-sm">
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.18em] text-muted font-bold block pb-2 border-b border-border">
                TIMELINE
              </span>

              <button
                type="button"
                onClick={() => setSelectedYear("all")}
                className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-between transition-all ${
                  selectedYear === "all"
                    ? "bg-ink text-white shadow-sm"
                    : "text-ink-2 hover:bg-surface"
                }`}
              >
                <span>All Milestones</span>
                <span className="text-[10px] opacity-70">{journeyMilestones.length}</span>
              </button>

              {journeyMilestones.map((m) => (
                <button
                  key={m.year}
                  type="button"
                  onClick={() => setSelectedYear(m.year)}
                  className={`w-full text-left px-3.5 py-2 rounded-xl text-xs font-mono font-bold flex items-center justify-between transition-all ${
                    selectedYear === m.year
                      ? "bg-brand-violet text-white shadow-sm"
                      : "text-ink-2 hover:bg-surface"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        selectedYear === m.year ? "bg-white" : "bg-border"
                      }`}
                    />
                    <span>{m.year}</span>
                  </div>
                  <ChevronRight className="w-3 h-3 opacity-60" />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Experience Cards matching .exp-card */}
          <div className="lg:col-span-9 space-y-6">
            {displayedMilestones.map((milestone) => {
              const badge = getTypeBadge(milestone.type);
              const Icon = badge.icon;
              return (
                <div
                  key={milestone.year + milestone.title}
                  className="bg-white border border-border rounded-[24px] p-7 md:p-8 shadow-sm hover:border-brand-violet/50 hover:shadow-md transition-all duration-300"
                >
                  {/* Top Metadata */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-border">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className="font-bold text-brand-violet">{milestone.year}</span>
                      <span className="text-muted">·</span>
                      <span className="text-muted font-medium">{milestone.period}</span>
                    </div>

                    <div
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-bold border ${badge.color}`}
                    >
                      <Icon className="w-3 h-3" />
                      <span>{milestone.type}</span>
                    </div>
                  </div>

                  {/* Title & Organization */}
                  <div className="pt-3">
                    <h3 className="text-xl font-display font-bold text-ink">
                      {milestone.title}
                    </h3>
                    <p className="text-xs font-mono text-muted uppercase font-semibold pt-1">
                      {milestone.organization}
                    </p>
                  </div>

                  {/* Narrative Body */}
                  <p className="text-sm text-ink-2 leading-relaxed font-sans pt-3">
                    {milestone.description}
                  </p>

                  {/* Bullet Highlights */}
                  <div className="space-y-2 pt-3">
                    {milestone.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-ink font-sans">
                        <span className="text-brand-violet font-mono text-xs mt-0.5">❯</span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border mt-4">
                    {milestone.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
