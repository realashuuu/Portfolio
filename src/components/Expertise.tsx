"use client";

import { useState } from "react";
import { skillCategories } from "@/data/skills";
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Terminal,
  LucideIcon,
  Check,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Terminal,
};

export default function Expertise() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const filteredCategories =
    selectedCategory === "all"
      ? skillCategories
      : skillCategories.filter((c) => c.id === selectedCategory);

  return (
    <section id="skills" aria-label="Technical Expertise & Stack" className="py-28 px-6 md:px-12 bg-white">
      <div className="inner">
        {/* Section Header */}
        <div className="mb-12">
          <div className="eyebrow">Expertise</div>
          <h2 className="st">
            Technologies I <span className="gr">build with</span>
          </h2>
          <p className="stxt">
            A comprehensive, production-tested software stack across full-stack systems, backend APIs,
            databases, and AI engineering.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-10">
          <button
            type="button"
            onClick={() => setSelectedCategory("all")}
            className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
              selectedCategory === "all"
                ? "bg-ink text-white shadow-sm"
                : "bg-surface text-ink-2 hover:bg-white border border-border"
            }`}
          >
            All Domains ({skillCategories.length})
          </button>
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-sans font-bold transition-all ${
                selectedCategory === cat.id
                  ? "bg-ink text-white shadow-sm"
                  : "bg-surface text-ink-2 hover:bg-white border border-border"
              }`}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Skills Grid matching .sk-grid & .sk-card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => {
            const Icon = iconMap[category.iconName] || Terminal;
            return (
              <div
                key={category.id}
                className="bg-surface border border-border rounded-[20px] p-7 flex flex-col justify-between hover:border-brand-violet/50 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="space-y-4">
                  {/* Category Header */}
                  <div className="flex items-center gap-3.5 pb-3 border-b border-border/80">
                    <div className="w-11 h-11 rounded-xl bg-white border border-border flex items-center justify-center text-brand-violet shadow-sm">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-ink">
                        {category.category}
                      </h3>
                      <span className="text-[0.68rem] font-mono text-muted uppercase font-semibold">
                        {category.skills.length} core technologies
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-ink-2 leading-relaxed font-sans">
                    {category.description}
                  </p>

                  {/* Skills List */}
                  <div className="space-y-2.5 pt-1">
                    {category.skills.map((skill) => (
                      <div
                        key={skill.name}
                        className="bg-white border border-border rounded-xl p-3 hover:border-brand-violet/40 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono font-bold text-ink flex items-center gap-1.5">
                            <Check className="w-3 h-3 text-brand-emerald" />
                            {skill.name}
                          </span>
                          {skill.highlight && (
                            <span className="text-[0.65rem] font-mono uppercase tracking-wider text-brand-violet px-2 py-0.5 rounded-full bg-brand-violet/10 font-bold">
                              Core
                            </span>
                          )}
                        </div>
                        <p className="text-[0.72rem] text-ink-2 leading-normal mb-2">
                          {skill.description}
                        </p>
                        <div className="flex flex-wrap gap-1">
                          {skill.tags.map((tag) => (
                            <span key={tag} className="tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-border flex items-center justify-between text-[0.7rem] font-mono text-muted font-medium">
                  <span>Verified toolkit</span>
                  <span className="text-brand-violet font-semibold">Production Stack</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
