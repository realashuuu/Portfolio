// "use client";

// import { useEffect, useRef } from "react";

// interface Node {
//   x: number;
//   y: number;
//   vx: number;
//   vy: number;
//   radius: number;
//   baseX: number;
//   baseY: number;
//   color: string;
// }

// interface Packet {
//   fromNode: number;
//   toNode: number;
//   progress: number;
//   speed: number;
// }

// export default function CanvasBackground() {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);

//   useEffect(() => {
//     const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
//     if (prefersReducedMotion) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;

//     let animationFrameId: number;
//     let width = window.innerWidth;
//     let height = window.innerHeight;
//     let resizeTimer = 0;

//     let mouseX = -9999;
//     let mouseY = -9999;

//     const handleResize = () => {
//       window.clearTimeout(resizeTimer);
//       resizeTimer = window.setTimeout(() => {
//         width = window.innerWidth;
//         height = window.innerHeight;
//         const dpr = Math.min(window.devicePixelRatio || 1, 2);
//         canvas.width = Math.floor(width * dpr);
//         canvas.height = Math.floor(height * dpr);
//         canvas.style.width = `${width}px`;
//         canvas.style.height = `${height}px`;
//         ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//         initNodes();
//       }, 120);
//     };

//     const handleMouseMove = (e: MouseEvent) => {
//       mouseX = e.clientX;
//       mouseY = e.clientY;
//     };

//     const handleMouseLeave = () => {
//       mouseX = -9999;
//       mouseY = -9999;
//     };

//     window.addEventListener("resize", handleResize, { passive: true });
//     window.addEventListener("mousemove", handleMouseMove, { passive: true });
//     document.addEventListener("mouseleave", handleMouseLeave);

//     const colors = ["#5b3eff", "#06b6d4", "#8b6fff"];
//     let nodeCount = 0;
//     let nodes: Node[] = [];
//     let packets: Packet[] = [];

//     const initNodes = () => {
//       nodes = [];
//       packets = [];
//       nodeCount = width < 768
//         ? Math.min(12, Math.floor((width * height) / 70000))
//         : Math.min(32, Math.floor((width * height) / 36000));
//       for (let i = 0; i < nodeCount; i++) {
//         const x = Math.random() * width;
//         const y = Math.random() * height;
//         nodes.push({
//           x,
//           y,
//           baseX: x,
//           baseY: y,
//           vx: (Math.random() - 0.5) * 0.3,
//           vy: (Math.random() - 0.5) * 0.3,
//           radius: Math.random() * 1.6 + 1.2,
//           color: colors[i % colors.length],
//         });
//       }
//     };

//     const dpr = Math.min(window.devicePixelRatio || 1, 2);
//     canvas.width = Math.floor(width * dpr);
//     canvas.height = Math.floor(height * dpr);
//     canvas.style.width = `${width}px`;
//     canvas.style.height = `${height}px`;
//     ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
//     initNodes();

//     const render = () => {
//       if (document.hidden) {
//         animationFrameId = requestAnimationFrame(render);
//         return;
//       }
//       ctx.clearRect(0, 0, width, height);

//       for (let i = 0; i < nodes.length; i++) {
//         const n = nodes[i];
//         n.x += n.vx;
//         n.y += n.vy;

//         if (n.x < 0 || n.x > width) n.vx *= -1;
//         if (n.y < 0 || n.y > height) n.vy *= -1;

//         const dx = n.x - mouseX;
//         const dy = n.y - mouseY;
//         const dist = Math.sqrt(dx * dx + dy * dy);
//         if (dist < 120 && dist > 0) {
//           const force = (120 - dist) / 120;
//           n.x += (dx / dist) * force * 1.5;
//           n.y += (dy / dist) * force * 1.5;
//         }

//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
//         ctx.fillStyle = n.color + "55";
//         ctx.fill();
//       }

//       const maxDistance = 150;
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x;
//           const dy = nodes[i].y - nodes[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);

//           if (dist < maxDistance) {
//             const alpha = (1 - dist / maxDistance) * 0.16;
//             ctx.beginPath();
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.strokeStyle = `rgba(91, 62, 255, ${alpha})`;
//             ctx.lineWidth = 0.8;
//             ctx.stroke();

//             if (Math.random() < 0.002 && packets.length < 10) {
//               packets.push({
//                 fromNode: i,
//                 toNode: j,
//                 progress: 0,
//                 speed: 0.01 + Math.random() * 0.008,
//               });
//             }
//           }
//         }
//       }

//       for (let k = packets.length - 1; k >= 0; k--) {
//         const p = packets[k];
//         p.progress += p.speed;

//         if (p.progress >= 1) {
//           packets.splice(k, 1);
//           continue;
//         }

//         const nodeA = nodes[p.fromNode];
//         const nodeB = nodes[p.toNode];
//         if (!nodeA || !nodeB) {
//           packets.splice(k, 1);
//           continue;
//         }

//         const px = nodeA.x + (nodeB.x - nodeA.x) * p.progress;
//         const py = nodeA.y + (nodeB.y - nodeA.y) * p.progress;

//         ctx.beginPath();
//         ctx.arc(px, py, 2.2, 0, Math.PI * 2);
//         ctx.fillStyle = "#5b3eff";
//         ctx.fill();
//       }

//       animationFrameId = requestAnimationFrame(render);
//     };

//     animationFrameId = requestAnimationFrame(render);

//     return () => {
//       cancelAnimationFrame(animationFrameId);
//       window.clearTimeout(resizeTimer);
//       window.removeEventListener("resize", handleResize);
//       window.removeEventListener("mousemove", handleMouseMove);
//       document.removeEventListener("mouseleave", handleMouseLeave);
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       aria-hidden="true"
//       className="fixed inset-0 pointer-events-none z-0 opacity-70"
//     />
//   );
// }

"use client";

import { useEffect, useRef } from "react";

// Palette from your portfolio notes
const OBSIDIAN = "#10151C";
const DEEP_SLATE = "#202B37";
const STEEL_RGB = "53, 70, 86";     // #354656
const SILVER_RGB = "166, 183, 200"; // #A6B7C8
const IVORY_RGB = "233, 236, 239";  // #E9ECEF

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
}

interface Packet {
  from: number;
  to: number;
  p: number;
  speed: number;
}

export default function CanvasBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let packets: Packet[] = [];
    let rafId = 0;
    let resizeTimer = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    const startTime = performance.now();

    const buildNodes = () => {
      const count =
        width < 768
          ? Math.min(14, Math.floor((width * height) / 70000))
          : Math.min(34, Math.floor((width * height) / 36000));

      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.9,
      }));
      packets = [];
    };

    const setup = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildNodes();
    };

    const drawBackground = (t: number) => {
      const base = ctx.createLinearGradient(0, 0, width, height);
      base.addColorStop(0, OBSIDIAN);
      base.addColorStop(1, DEEP_SLATE);
      ctx.fillStyle = base;
      ctx.fillRect(0, 0, width, height);

      const radius = Math.max(width, height) * 0.7;
      const blobs = [
        {
          cx: 0.25 + 0.08 * Math.sin(t * 0.15),
          cy: 0.3 + 0.06 * Math.cos(t * 0.11),
          color: STEEL_RGB,
          alpha: 0.55,
        },
        {
          cx: 0.8 + 0.07 * Math.cos(t * 0.12),
          cy: 0.7 + 0.08 * Math.sin(t * 0.09),
          color: STEEL_RGB,
          alpha: 0.45,
        },
        {
          cx: 0.55 + 0.1 * Math.sin(t * 0.07 + 1),
          cy: 0.15 + 0.05 * Math.cos(t * 0.13),
          color: SILVER_RGB,
          alpha: 0.1,
        },
      ];

      for (const b of blobs) {
        const x = width * b.cx;
        const y = height * b.cy;
        const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
        g.addColorStop(0, `rgba(${b.color}, ${b.alpha})`);
        g.addColorStop(1, `rgba(${b.color}, 0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, width, height);
      }
    };

    const drawNetwork = (move: boolean) => {
      if (move) {
        for (const n of nodes) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > width) n.vx *= -1;
          if (n.y < 0 || n.y > height) n.vy *= -1;

          const dx = n.x - mouseX;
          const dy = n.y - mouseY;
          const d = Math.hypot(dx, dy);
          if (d < 140 && d > 0) {
            const force = (140 - d) / 140;
            n.x += (dx / d) * force * 1.2;
            n.y += (dy / d) * force * 1.2;
          }
        }
      }

      const maxDist = 160;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist >= maxDist) continue;

          const alpha = (1 - dist / maxDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(${SILVER_RGB}, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();

          if (move && Math.random() < 0.002 && packets.length < 10) {
            packets.push({ from: i, to: j, p: 0, speed: 0.01 + Math.random() * 0.008 });
          }
        }
      }

      for (const n of nodes) {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${SILVER_RGB}, 0.55)`;
        ctx.fill();
      }

      if (!move) return;

      for (let k = packets.length - 1; k >= 0; k--) {
        const pk = packets[k];
        pk.p += pk.speed;
        const a = nodes[pk.from];
        const b = nodes[pk.to];
        if (pk.p >= 1 || !a || !b) {
          packets.splice(k, 1);
          continue;
        }
        const px = a.x + (b.x - a.x) * pk.p;
        const py = a.y + (b.y - a.y) * pk.p;
        ctx.beginPath();
        ctx.arc(px, py, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${IVORY_RGB}, 0.9)`;
        ctx.fill();
      }
    };

    const renderStatic = () => {
      drawBackground(0);
      drawNetwork(false);
    };

    const frame = (now: number) => {
      if (!document.hidden) {
        const t = (now - startTime) / 1000;
        drawBackground(t);
        drawNetwork(true);
      }
      rafId = requestAnimationFrame(frame);
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        if (reduceMotion) renderStatic();
      }, 120);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    setup();

    if (reduceMotion) {
      renderStatic();
    } else {
      rafId = requestAnimationFrame(frame);
    }

    window.addEventListener("resize", onResize, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onMouseLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      document.documentElement.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-full w-full"
    />
  );
}
