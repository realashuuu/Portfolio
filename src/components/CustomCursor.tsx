"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";

const CURSOR_VIOLET = "91, 62, 255"; // #5b3eff, same as the original brand-violet

const HOVER_TARGETS =
  'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]';

const RING_SIZE = 36;
const RING_SIZE_HOVER = 60;

const dotStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: 10,
  height: 10,
  borderRadius: "9999px",
  background: `rgb(${CURSOR_VIOLET})`,
  boxShadow: `0 0 14px rgba(${CURSOR_VIOLET}, 0.7)`,
  pointerEvents: "none",
  zIndex: 9998,
  opacity: 0,
  transition: "opacity 0.3s ease",
  willChange: "transform",
};

const ringStyle: CSSProperties = {
  position: "fixed",
  top: 0,
  left: 0,
  width: RING_SIZE,
  height: RING_SIZE,
  borderRadius: "9999px",
  border: `1.5px solid rgba(${CURSOR_VIOLET}, 0.6)`,
  backgroundColor: "transparent",
  pointerEvents: "none",
  zIndex: 9997,
  opacity: 0,
  transition:
    "width 0.25s ease, height 0.25s ease, border-color 0.25s ease, background-color 0.25s ease, opacity 0.3s ease",
  willChange: "transform",
};

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Only for mouse-style pointers. On touch screens nothing is attached,
    // so the elements stay at opacity 0.
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    // Hide the system cursor only while the custom one is active
    const hideCursor = document.createElement("style");
    hideCursor.textContent = "*, *::before, *::after { cursor: none !important; }";
    document.head.appendChild(hideCursor);

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let visible = false;
    let rafId = 0;
    let lastTime = performance.now();

    const show = () => {
      if (visible) return;
      visible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
      show();
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target instanceof Element ? e.target : null;
      const hovering = Boolean(target?.closest(HOVER_TARGETS));
      const size = hovering ? RING_SIZE_HOVER : RING_SIZE;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
      ring.style.borderColor = hovering
        ? `rgba(${CURSOR_VIOLET}, 1)`
        : `rgba(${CURSOR_VIOLET}, 0.6)`;
      ring.style.backgroundColor = hovering
        ? `rgba(${CURSOR_VIOLET}, 0.12)`
        : "transparent";
    };

    const onLeaveWindow = () => {
      visible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const loop = (now: number) => {
      const dt = Math.min(now - lastTime, 64) / 1000;
      lastTime = now;
      const ease = reduceMotion ? 1 : 1 - Math.pow(1 - 0.38, dt * 60);
      ringX += (mouseX - ringX) * ease;
      ringY += (mouseY - ringY) * ease;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%)`;
      rafId = requestAnimationFrame(loop);
    };

    rafId = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeaveWindow);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.documentElement.removeEventListener("mouseleave", onLeaveWindow);
      hideCursor.remove();
    };
  }, []);

  return (
    <>
      <div ref={ringRef} aria-hidden="true" style={ringStyle} />
      <div ref={dotRef} aria-hidden="true" style={dotStyle} />
    </>
  );
}