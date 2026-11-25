"use client";

import { useEffect } from "react";

// Single shared IntersectionObserver for smooth 0.7s cubic-bezier scroll reveals across mobile & desktop
export default function CardRevealObserver() {
  useEffect(() => {
    const cards = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal-card]")
    );
    if (!cards.length) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === "undefined") {
      cards.forEach((card) => card.classList.remove("reveal-card"));
      return;
    }

    const timers: number[] = [];

    const reveal = (el: HTMLElement, immediate = false) => {
      if (immediate) {
        el.classList.remove("reveal-card");
        return;
      }
      el.classList.add("is-visible");
      // Release reveal classes after 0.7s transition completes so hover/GSAP animations never conflict
      const t = window.setTimeout(() => {
        el.classList.remove("reveal-card", "is-visible");
        el.style.removeProperty("--reveal-delay");
      }, 950);
      timers.push(t);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            reveal(el);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -24px 0px",
      }
    );

    cards.forEach((card) => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.95) {
        reveal(card, true);
      } else {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  return null;
}
