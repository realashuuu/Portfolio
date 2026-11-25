"use client";

import { useEffect, useRef, useState } from "react";
import { GraduationCap, Award, Zap, ExternalLink } from "lucide-react";

interface EducationItem {
  id: string;
  navLabel: string;
  title: string;
  institution: string;
  linkUrl?: string;
  linkLabel?: string;
  period: string;
  icon: "degree" | "cert" | "dsa";
  points: string[];
}

const educationItems: EducationItem[] = [
  {
    id: "edu-degree",
    navLabel: "B.Tech CSE · NSHM",
    title: "B.Tech in Computer Science and Engineering",
    institution: "NSHM College of Management and Technology · Durgapur, WB",
    period: "2023 — 2027",
    icon: "degree",
    points: [
      "CGPA: 7.1 (Up to 6th Semester) across a full-time 4-year undergraduate computer science track",
      "Core CS Coursework: Data Structures, Algorithms, Database Management Systems (DBMS), Object-Oriented Programming (OOP), and Operating Systems",
      "Building strong computer science fundamentals across system architecture, database internals, and algorithmic design applied directly to full-stack and real-time backend architectures",
    ],
  },
  {
    id: "edu-certifications",
    navLabel: "JPMorgan & Web Dev",
    title: "Software Engineering Simulation & Web Foundations",
    institution: "JPMorgan Chase & Co. (Forage) · Web Development Track",
    period: "2024",
    icon: "cert",
    points: [
      "JPMorgan Chase & Co. Software Engineering Job Simulation (Forage, 2024) — practiced financial system design, engineering workflows, and production best practices",
      "Foundations of Web Development (2024) — built responsive, component-driven interfaces using React.js, JavaScript, Bootstrap, and CSS3",
      "Completed structured engineering simulations and frontend architecture training focused on real-world software workflows and responsive component design",
    ],
  },
  {
    id: "edu-dsa",
    navLabel: "LeetCode · DSA",
    title: "Data Structures, Algorithms & Competitive Consistency",
    institution: "LeetCode · C++, Java, Python & C",
    linkUrl: "https://leetcode.com/u/ashikkhan03/",
    linkLabel: "leetcode.com/u/ashikkhan03",
    period: "2025 — 2026",
    icon: "dsa",
    points: [
      "Solved 100+ algorithmic problems on LeetCode (35 Easy · 58 Medium · 7 Hard) with a strong emphasis on Medium-difficulty data structure and optimization challenges",
      "Earned the LeetCode 50 Days Badge 2026 for sustained daily coding discipline",
      "Focused on writing optimal time- and space-complex solutions across C++, Java, Python, and C covering Dynamic Programming, Trees & Graphs, and sliding-window patterns",
    ],
  },
];

export default function Education() {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Sync sidebar active dot with card visibility on scroll
  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!cards.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = cards.indexOf(entry.target as HTMLDivElement);
            if (idx !== -1) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-15% 0px -30% 0px" }
    );

    cards.forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  const scrollToCard = (index: number) => {
    const target = cardRefs.current[index];
    if (!target) return;
    setActiveIndex(index);
    target.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section
      id="education"
      aria-label="Academic Background and Credentials"
      className="py-28 px-6 md:px-12 bg-surface"
    >
      <div className="inner">
        {/* Section Header */}
        <div>
          <div className="eyebrow">EDUCATION</div>
          <h2 className="st">
            Academic background &amp; <span className="gr">credentials</span>
          </h2>
          <p className="stxt">
            Computer science degree coursework, engineering simulations, and algorithmic milestones.
          </p>
        </div>

        {/* Sticky Timeline Sidebar + Cards */}
        <div className="exp-layout">
          <aside className="exp-side" aria-label="Education timeline navigation">
            <div className="exp-side-title">TIMELINE</div>
            <div className="exp-dot-list">
              {educationItems.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToCard(idx)}
                  className={`exp-dot-btn ${activeIndex === idx ? "active" : ""}`}
                >
                  <span className="edot" aria-hidden="true" />
                  <span>{item.navLabel}</span>
                </button>
              ))}
            </div>
          </aside>

          <div className="exp-list">
            {educationItems.map((item, idx) => {
              const Icon =
                item.icon === "degree"
                  ? GraduationCap
                  : item.icon === "cert"
                  ? Award
                  : Zap;

              return (
                <article
                  key={item.id}
                  ref={(el) => {
                    cardRefs.current[idx] = el as HTMLDivElement | null;
                  }}
                  data-reveal-card
                  style={{ "--reveal-delay": `${idx * 75}ms` } as React.CSSProperties}
                  className="reveal-card exp-card active:scale-[0.99]"
                >
                  <div className="exp-top">
                    <div>
                      <h3 className="exp-role">{item.title}</h3>
                      <div className="exp-co flex-wrap">
                        <Icon className="w-3.5 h-3.5 text-brand-violet flex-shrink-0" />
                        <span>{item.institution}</span>
                        {item.linkUrl && (
                          <a
                            href={item.linkUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 ml-1 text-brand-violet hover:underline font-mono text-[0.75rem]"
                          >
                            <span>({item.linkLabel || "Profile"})</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                    </div>
                    <span className="exp-chip">{item.period}</span>
                  </div>

                  <ul className="exp-ul">
                    {item.points.map((point, pIdx) => (
                      <li key={pIdx}>{point}</li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
