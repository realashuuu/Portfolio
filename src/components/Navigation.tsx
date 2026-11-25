"use client";

import { useState, useEffect, useRef } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
];

export default function Navigation() {
  const [pastHero, setPastHero] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const contactBtnRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const heroEl = document.getElementById("hero");
        const threshold = heroEl ? Math.max(240, heroEl.offsetHeight - 160) : -1;
        setPastHero(window.scrollY > threshold);

        const sections = [...navItems.map((item) => item.href.substring(1)), "contact"];
        const scrollPos = window.scrollY + 200;
        let nextSection = "";
        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = document.getElementById(sections[i]);
          if (sec && sec.offsetTop <= scrollPos) {
            nextSection = sections[i];
            break;
          }
        }
        setActiveSection((current) => (current === nextSection ? current : nextSection));
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  // Magnetic hover pull on Contact CTA button
  useEffect(() => {
    const btn = contactBtnRef.current;
    if (!btn) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (reduceMotion || !finePointer) return;

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
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") setMobileMenuOpen(false);
      };
      document.addEventListener("keydown", closeOnEscape);
      return () => {
        document.removeEventListener("keydown", closeOnEscape);
        document.body.style.overflow = "";
      };
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleMobileNav = (href: string) => {
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target instanceof HTMLElement) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed z-[500] transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
          pastHero
            ? "top-0 left-0 right-0 h-16 px-5 md:px-12 bg-white/85 backdrop-blur-2xl border-b border-border/80 shadow-[0_8px_30px_rgba(9,9,15,0.05)] flex items-center"
            : "top-3.5 md:top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md md:max-w-none md:w-auto h-12 px-5 md:pl-6 md:pr-2.5 rounded-full bg-[#050811]/88 backdrop-blur-2xl border border-white/15 shadow-[0_14px_40px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.12)] flex items-center justify-between md:justify-center"
        }`}
      >
        <nav
          aria-label="Primary Navigation"
          className={
            pastHero
              ? "w-full flex items-center justify-between"
              : "flex items-center justify-between md:justify-center w-full gap-6"
          }
        >
          {/* Left slot: Hidden on Hero candle pill; visible as blinking purple dot + Ashik Khan when scrolled */}
          {pastHero ? (
            <a
              href="#hero"
              aria-label="Scroll to top"
              onClick={() => setMobileMenuOpen(false)}
              className="nav-logo group focus:outline-none animate-[yin_0.35s_ease_both]"
            >
              <span className="logo-dot" aria-hidden="true" />
              <span className="text-ink">Ashik Khan</span>
            </a>
          ) : (
            <span className="md:hidden text-xs font-mono tracking-widest uppercase text-slate-300">
              Menu
            </span>
          )}

          {/* Desktop Links + Contact CTA */}
          <div
            className={`hidden md:flex items-center ${
              pastHero ? "gap-9" : "gap-7"
            }`}
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link inline-flex items-center ${isActive ? "active" : ""} ${
                    pastHero
                      ? isActive
                        ? "text-brand-violet"
                        : "text-ink-2 hover:text-brand-violet"
                      : isActive
                      ? "text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}

            <a
              ref={contactBtnRef}
              href="#contact"
              className={`nav-cta group inline-flex items-center gap-1.5 ${
                pastHero
                  ? "bg-ink text-white hover:bg-brand-violet hover:shadow-[0_8px_24px_rgba(91,62,255,0.3)]"
                  : "!py-1.5 !px-4 bg-white text-ink hover:bg-brand-violet hover:text-white hover:shadow-[0_8px_24px_rgba(91,62,255,0.45)]"
              }`}
            >
              <span>Contact</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-nav-drawer"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              className={`p-1.5 rounded-full transition-colors focus:outline-none ${
                mobileMenuOpen
                  ? "text-ink bg-surface"
                  : pastHero
                  ? "text-ink-2 hover:text-ink"
                  : "text-slate-200 hover:text-white"
              }`}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Full-Screen Drawer rendered outside <header> so transform/backdrop-filter never clips fixed positioning */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          className="fixed inset-0 z-[490] bg-white/95 backdrop-blur-2xl md:hidden flex flex-col justify-between px-7 pt-24 pb-10 animate-[yin_0.28s_cubic-bezier(0.23,1,0.32,1)_both]"
        >
          <div className="flex flex-col space-y-2">
            <span className="text-[11px] font-mono uppercase text-muted tracking-[0.2em] mb-2">
              Navigation
            </span>
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNav(item.href);
                  }}
                  className={`text-2xl font-display font-extrabold py-3.5 flex items-center justify-between border-b border-border/70 transition-colors ${
                    isActive ? "text-brand-violet" : "text-ink hover:text-brand-violet"
                  }`}
                >
                  <span>{item.name}</span>
                  <span className="text-sm font-mono text-muted">→</span>
                </a>
              );
            })}
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleMobileNav("#contact");
              }}
              className="w-full py-3.5 text-center text-sm font-sans font-bold text-white bg-ink hover:bg-brand-violet rounded-full transition-colors inline-flex items-center justify-center gap-1.5 shadow-lg shadow-ink/15"
            >
              <span>Contact</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <span className="text-center text-xs font-mono text-muted">
              ashikcodex@gmail.com
            </span>
          </div>
        </div>
      )}
    </>
  );
}
