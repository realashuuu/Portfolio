"use client";

import { useEffect, useRef } from "react";
import { skillCategories } from "@/data/skills";
import {
  Code2,
  Layout,
  Server,
  Database,
  Sparkles,
  Terminal,
  LucideIcon,
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 3D perspective tilt hover motion across skill cards
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    const cleanups = cards.map((card) => {
      const onMove = (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        card.style.transition = "transform 0.05s";
        card.style.transform = `perspective(900px) rotateY(${x * 14}deg) rotateX(${
          -y * 14
        }deg) translateY(-10px) scale(1.02)`;
      };

      const onLeave = () => {
        card.style.transition = "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)";
        card.style.transform = "";
      };

      card.addEventListener("mousemove", onMove, { passive: true });
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      id="skills"
      aria-label="Technical Expertise & Stack"
      className="py-28 px-6 md:px-12 bg-white"
    >
      <div className="inner">
        {/* Section Header */}
        <div>
          <div className="eyebrow">Expertise</div>
          <h2 className="st">
            Tools I <span className="gr">master</span>
          </h2>
          <p className="stxt">
            A focused, production-tested engineering toolkit across full-stack development,
            backend APIs, databases, and generative AI integrations.
          </p>
        </div>

        {/* 6-Card Skill Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => {
            const Icon = iconMap[category.iconName] || Terminal;
            return (
              <div
                key={category.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                data-reveal-card
                style={{ "--reveal-delay": `${(index % 3) * 70}ms` } as React.CSSProperties}
                className="reveal-card sk-card active:scale-[0.99]"
              >
                <div
                  className="sk-ico"
                  style={{ background: category.accentBg }}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{ color: category.accentColor }}
                  />
                </div>

                <h3 className="sk-title">{category.title}</h3>

                <p className="text-[0.82rem] text-ink-2 leading-relaxed mb-4 font-sans">
                  {category.description}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {category.tags.map((tag) => (
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
    </section>
  );
}
