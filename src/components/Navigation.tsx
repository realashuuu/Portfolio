"use client";

import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavItem {
  name: string;
  href: string;
}

const navItems: NavItem[] = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "LeetCode", href: "#problem-solving" },
  { name: "Contact", href: "#contact" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 20);
        const sections = navItems.map((item) => item.href.substring(1));
        const scrollPos = window.scrollY + 180;
        let nextSection = "";
        for (let i = sections.length - 1; i >= 0; i--) {
          const sec = document.getElementById(sections[i]);
          if (sec && sec.offsetTop <= scrollPos) {
            nextSection = sections[i];
            break;
          }
        }
        setActiveSection((current) => current === nextSection ? current : nextSection);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-16 flex items-center px-6 md:px-12 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-white/80 backdrop-blur-md border-b border-border/80"
      }`}
    >
      <nav
        aria-label="Primary Navigation"
        className="inner flex items-center justify-between"
      >
        {/* Minimal status indicator - STRICTLY NO LOGO */}
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-emerald opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-emerald"></span>
          </span>
          <span className="text-[0.72rem] font-mono tracking-wider font-semibold text-brand-violet uppercase">
            Full-Stack &amp; Systems
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-1 border border-border/70 rounded-full bg-white/90 px-3 py-1 shadow-sm">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.name}
                href={item.href}
                className={`relative px-3.5 py-1 text-[0.78rem] font-sans font-medium tracking-wide rounded-full transition-all duration-200 ${
                  isActive
                    ? "text-brand-violet bg-brand-violet/10 font-semibold"
                    : "text-ink-2 hover:text-ink hover:bg-surface"
                }`}
              >
                {item.name}
              </a>
            );
          })}
        </div>

        {/* Right CTA Button */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-sans font-bold text-white bg-ink hover:bg-brand-violet transition-all duration-300 shadow-sm hover:shadow-brand-violet/20"
          >
            <span>Get in touch</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="p-2 text-ink-2 hover:text-ink focus:outline-none"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white/98 backdrop-blur-2xl z-50 md:hidden flex flex-col px-8 py-10 justify-between border-t border-border">
          <div className="flex flex-col space-y-5">
            <span className="text-xs font-mono uppercase text-muted tracking-widest">
              Navigation
            </span>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-2xl font-display font-bold text-ink hover:text-brand-violet transition-colors py-2 flex items-center justify-between border-b border-border/60"
              >
                <span>{item.name}</span>
                <span className="text-xs font-mono text-muted">→</span>
              </a>
            ))}
          </div>

          <div className="pt-6 border-t border-border flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full py-3 text-center text-sm font-sans font-bold text-white bg-ink hover:bg-brand-violet rounded-xl transition-colors"
            >
              Get in touch
            </a>
            <span className="text-center text-xs font-mono text-muted">
              ashikcodex@gmail.com
            </span>
          </div>
        </div>
      )}
    </header>
  );
}
