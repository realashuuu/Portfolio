"use client";

import { useEffect, useRef, useState } from "react";

interface SpherePoint {
  x: number;
  y: number;
  z: number;
  isLand: boolean;
  isIndia: boolean;
}

// India centroid coordinates for globe orientation & marker
const INDIA_LAT = 22.2;
const INDIA_LON = 79.0;

// Detailed continental + India landmass polygons [lon, lat]
const INDIA_POLY: [number, number][] = [
  [68.2,23.6],[70.0,27.0],[74.0,32.2],[76.8,34.5],[79.5,31.0],[84.5,27.6],
  [88.8,27.5],[92.5,27.8],[96.5,28.0],[94.5,24.0],[92.0,21.5],[89.0,21.8],
  [86.8,20.4],[83.0,17.2],[80.2,13.0],[79.2,9.5],[77.5,8.1],[76.0,10.5],
  [74.0,15.0],[72.8,19.1],[72.2,21.5],[69.0,22.4],
];

const LAND_POLYGONS: [number, number][][] = [
  INDIA_POLY,
  // North America
  [[-168,66],[-156,71],[-132,70],[-105,72],[-82,68],[-65,61],[-55,51],[-64,44],[-75,35],[-81,25],[-89,29],[-97,26],[-105,20],[-92,15],[-84,10],[-78,8],[-84,12],[-94,16],[-106,23],[-114,31],[-122,38],[-125,49],[-136,58],[-152,60],[-165,62]],
  // Greenland
  [[-55,60],[-42,60],[-20,70],[-18,81],[-46,83],[-68,77],[-58,68]],
  // South America
  [[-80,10],[-70,12],[-60,8],[-50,1],[-35,-6],[-38,-14],[-42,-23],[-49,-28],[-55,-35],[-64,-42],[-68,-54],[-74,-48],[-72,-35],[-71,-18],[-81,-5]],
  // Europe
  [[-9,37],[-9,43],[-2,44],[4,43],[12,44],[16,40],[23,38],[28,41],[30,46],[38,47],[45,52],[55,62],[58,69],[42,68],[28,71],[16,69],[5,61],[8,56],[-4,50]],
  // UK & Ireland
  [[-10,51],[-6,50],[1,52],[-2,58],[-8,55]],
  // Africa
  [[-17,15],[-14,26],[-6,36],[10,37],[25,32],[33,31],[39,20],[43,12],[51,12],[45,2],[40,-10],[35,-24],[28,-33],[19,-35],[15,-25],[12,-6],[9,4],[2,6],[-8,5],[-16,12]],
  // Madagascar
  [[44,-25],[48,-24],[50,-14],[47,-12]],
  // Arabian Peninsula & Eurasia
  [[34,31],[39,38],[49,40],[56,26],[59,22],[52,15],[44,13],[36,28]],
  [[49,40],[54,46],[60,55],[62,68],[85,74],[115,74],[145,71],[178,66],[162,59],[142,54],[132,43],[129,35],[121,39],[122,31],[118,24],[108,21],[109,12],[104,2],[99,8],[96,17],[92,22],[89,28],[80,31],[74,36],[67,38],[61,36],[54,37]],
  // Japan
  [[130,31],[136,34],[141,38],[145,44],[140,43],[136,37]],
  // Southeast Asia Islands (Sumatra, Java, Borneo, Philippines)
  [[96,5],[105,-6],[114,-8],[109,-3],[99,1]],
  [[109,1],[117,6],[118,-3],[111,-3]],
  [[120,18],[126,8],[122,6],[120,13]],
  // Australia
  [[114,-22],[122,-17],[131,-12],[136,-12],[142,-11],[146,-18],[153,-26],[150,-37],[141,-38],[135,-34],[126,-32],[115,-34]],
  // New Zealand
  [[167,-46],[174,-41],[178,-37],[174,-35],[172,-42]],
];

function pointInPolygon(lon: number, lat: number, poly: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i][0], yi = poly[i][1];
    const xj = poly[j][0], yj = poly[j][1];
    const intersect =
      yi > lat !== yj > lat &&
      lon < ((xj - xi) * (lat - yi)) / (yj - yi + 1e-9) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

function latLonToXYZ(latDeg: number, lonDeg: number) {
  const lat = (latDeg * Math.PI) / 180;
  const lon = (lonDeg * Math.PI) / 180;
  return {
    x: Math.cos(lat) * Math.sin(lon),
    y: -Math.sin(lat),
    z: Math.cos(lat) * Math.cos(lon),
  };
}

// Initial sphere orientation facing India directly
const TARGET_ROT_Y = (-INDIA_LON * Math.PI) / 180;
const TARGET_ROT_X = (INDIA_LAT * Math.PI) / 180 * 0.72;

export default function EarthGlobe({ focusSignal = 0 }: { focusSignal?: number }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const targetRef = useRef<{ rotY: number; rotX: number; snap: boolean }>({
    rotY: TARGET_ROT_Y,
    rotX: TARGET_ROT_X,
    snap: false,
  });
  const [dragging, setDragging] = useState(false);

  // Smoothly rotate back to India when Location card is clicked
  useEffect(() => {
    if (focusSignal > 0) {
      targetRef.current = { rotY: TARGET_ROT_Y, rotX: TARGET_ROT_X, snap: true };
    }
  }, [focusSignal]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Generate dense 2,600-point Fibonacci sphere with dedicated India region shading
    const totalPoints = 2600;
    const goldenRatio = (1 + Math.sqrt(5)) / 2;
    const points: SpherePoint[] = [];

    for (let i = 0; i < totalPoints; i++) {
      const y = 1 - (i / (totalPoints - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = (2 * Math.PI * i) / goldenRatio;
      const x = Math.cos(theta) * r;
      const z = Math.sin(theta) * r;

      const latDeg = Math.asin(-y) * (180 / Math.PI);
      const lonDeg = Math.atan2(x, z) * (180 / Math.PI);
      const isIndia = pointInPolygon(lonDeg, latDeg, INDIA_POLY);
      const isLand = isIndia || LAND_POLYGONS.some((poly) => pointInPolygon(lonDeg, latDeg, poly));
      points.push({ x, y, z, isLand, isIndia });
    }

    const indiaXYZ = latLonToXYZ(INDIA_LAT, INDIA_LON);

    // Subtle directional sunlight vector from upper-left front
    const sunLen = Math.hypot(-0.45, -0.35, 0.82);
    const sunX = -0.45 / sunLen;
    const sunY = -0.35 / sunLen;
    const sunZ = 0.82 / sunLen;

    let rotY = TARGET_ROT_Y;
    let rotX = TARGET_ROT_X;
    let velY = 0;
    let velX = 0;
    let isPointerDown = false;
    let lastX = 0;
    let lastY = 0;
    let inView = true;
    let rafId = 0;
    let width = 0;
    let height = 0;
    let pulsePhase = 0;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (px: number, py: number, pz: number, rY: number, rX: number) => {
      const cosY = Math.cos(rY);
      const sinY = Math.sin(rY);
      const x1 = px * cosY + pz * sinY;
      const z1 = -px * sinY + pz * cosY;

      const cosX = Math.cos(rX);
      const sinX = Math.sin(rX);
      const y2 = py * cosX - z1 * sinX;
      const z2 = py * sinX + z1 * cosX;

      return { x: x1, y: y2, z: z2 };
    };

    const draw = () => {
      if (!width || !height) return;
      ctx.clearRect(0, 0, width, height);

      const cx = width / 2;
      const cy = height / 2;
      const radius = Math.min(width, height) * 0.44;

      // Multi-layered atmospheric halo
      const halo = ctx.createRadialGradient(cx, cy, radius * 0.8, cx, cy, radius * 1.28);
      halo.addColorStop(0, "rgba(56, 189, 248, 0.24)");
      halo.addColorStop(0.45, "rgba(91, 62, 255, 0.16)");
      halo.addColorStop(1, "rgba(9, 9, 15, 0)");
      ctx.fillStyle = halo;
      ctx.beginPath();
      ctx.arc(cx, cy, radius * 1.28, 0, Math.PI * 2);
      ctx.fill();

      // Realistic sunlit oceanic sphere shading
      const sphereGrad = ctx.createRadialGradient(
        cx - radius * 0.34,
        cy - radius * 0.32,
        radius * 0.06,
        cx,
        cy,
        radius
      );
      sphereGrad.addColorStop(0, "#1d3557");
      sphereGrad.addColorStop(0.42, "#0f1d36");
      sphereGrad.addColorStop(0.82, "#070c18");
      sphereGrad.addColorStop(1, "#03050a");
      ctx.fillStyle = sphereGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.fill();

      // Crisp inner Fresnel atmospheric rim
      ctx.save();
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.clip();

      const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.84, cx, cy, radius);
      rimGrad.addColorStop(0, "rgba(56, 189, 248, 0)");
      rimGrad.addColorStop(0.85, "rgba(56, 189, 248, 0.12)");
      rimGrad.addColorStop(1, "rgba(139, 111, 255, 0.42)");
      ctx.fillStyle = rimGrad;
      ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);

      // Faint spherical graticule parallels
      ctx.strokeStyle = "rgba(148, 163, 184, 0.07)";
      ctx.lineWidth = 0.7;
      for (const lat of [-60, -30, 0, 30, 60]) {
        ctx.beginPath();
        let started = false;
        for (let lon = -180; lon <= 180; lon += 8) {
          const p = latLonToXYZ(lat, lon);
          const pr = project(p.x, p.y, p.z, rotY, rotX);
          if (pr.z > 0) {
            const sx = cx + pr.x * radius;
            const sy = cy + pr.y * radius;
            if (!started) {
              ctx.moveTo(sx, sy);
              started = true;
            } else {
              ctx.lineTo(sx, sy);
            }
          } else {
            started = false;
          }
        }
        ctx.stroke();
      }

      // Render landmass & ocean surface points with directional lighting
      for (let i = 0; i < points.length; i++) {
        const pt = points[i];
        const pr = project(pt.x, pt.y, pt.z, rotY, rotX);
        if (pr.z < -0.1) continue;

        const sx = cx + pr.x * radius;
        const sy = cy + pr.y * radius;
        const light = Math.max(0.18, pr.x * sunX + pr.y * sunY + pr.z * sunZ);
        const frontFade = Math.min(1, Math.max(0, (pr.z + 0.1) * 1.4));

        if (pt.isIndia) {
          const alpha = (0.45 + 0.55 * light) * frontFade;
          ctx.fillStyle = `rgba(52, 211, 153, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.35 + light * 0.9, 0, Math.PI * 2);
          ctx.fill();
        } else if (pt.isLand) {
          const alpha = (0.2 + 0.72 * light) * frontFade;
          ctx.fillStyle = `rgba(125, 211, 252, ${alpha.toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 1.0 + light * 0.85, 0, Math.PI * 2);
          ctx.fill();
        } else if (pr.z > 0.05) {
          ctx.fillStyle = `rgba(91, 62, 255, ${(0.12 * light * frontFade).toFixed(2)})`;
          ctx.beginPath();
          ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.restore();

      // Subtle outer sphere edge ring
      ctx.strokeStyle = "rgba(56, 189, 248, 0.25)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Render pulsing beacon pointing to India
      const indProj = project(indiaXYZ.x, indiaXYZ.y, indiaXYZ.z, rotY, rotX);
      if (indProj.z > -0.02) {
        const ix = cx + indProj.x * radius;
        const iy = cy + indProj.y * radius;
        const fade = Math.min(1, Math.max(0, (indProj.z + 0.02) * 3.5));

        const r1 = (pulsePhase % 1) * 22 + 5;
        const a1 = (1 - (pulsePhase % 1)) * 0.8 * fade;
        ctx.strokeStyle = `rgba(16, 185, 129, ${a1.toFixed(2)})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.arc(ix, iy, r1, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = `rgba(16, 185, 129, ${fade.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(ix, iy, 4.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(255, 255, 255, ${fade.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(ix, iy, 2, 0, Math.PI * 2);
        ctx.fill();

        if (fade > 0.25) {
          const lx = ix + 14;
          const ly = iy - 16;
          ctx.strokeStyle = `rgba(52, 211, 153, ${(fade * 0.75).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(ix + 3, iy - 3);
          ctx.lineTo(lx, ly);
          ctx.lineTo(lx + 10, ly);
          ctx.stroke();

          ctx.font = "700 11px var(--font-jetbrains-mono), monospace";
          const label = "India";
          const textW = ctx.measureText(label).width;
          const boxX = lx + 12;
          const boxY = ly - 10;

          ctx.fillStyle = `rgba(9, 14, 26, ${(0.9 * fade).toFixed(2)})`;
          ctx.strokeStyle = `rgba(52, 211, 153, ${(0.55 * fade).toFixed(2)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(boxX, boxY, textW + 14, 20, 6);
          ctx.fill();
          ctx.stroke();

          ctx.fillStyle = `rgba(248, 250, 252, ${fade.toFixed(2)})`;
          ctx.fillText(label, boxX + 7, boxY + 13.5);
        }
      }
    };

    const tick = () => {
      if (inView && !document.hidden) {
        if (!reduceMotion) {
          pulsePhase += 0.014;
          if (targetRef.current.snap) {
            const dy = targetRef.current.rotY - rotY;
            const dx = targetRef.current.rotX - rotX;
            rotY += dy * 0.1;
            rotX += dx * 0.1;
            velY = 0;
            velX = 0;
            if (Math.abs(dy) < 0.002 && Math.abs(dx) < 0.002) {
              targetRef.current.snap = false;
            }
          } else if (!isPointerDown) {
            rotY += velY + 0.0016;
            rotX = Math.max(-0.95, Math.min(0.95, rotX + velX));
            velY *= 0.94;
            velX *= 0.94;
          }
        }
        draw();
      }
      rafId = requestAnimationFrame(tick);
    };

    const onPointerDown = (e: PointerEvent) => {
      isPointerDown = true;
      targetRef.current.snap = false;
      setDragging(true);
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.setPointerCapture(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isPointerDown) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      velY = dx * 0.0065;
      velX = dy * 0.0065;
      rotY += velY;
      rotX = Math.max(-0.95, Math.min(0.95, rotX + velX));
    };

    const onPointerUp = (e: PointerEvent) => {
      if (!isPointerDown) return;
      isPointerDown = false;
      setDragging(false);
      if (canvas.hasPointerCapture(e.pointerId)) {
        canvas.releasePointerCapture(e.pointerId);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    resize();
    draw();
    rafId = requestAnimationFrame(tick);

    window.addEventListener("resize", resize, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);

    return () => {
      cancelAnimationFrame(rafId);
      io.disconnect();
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] md:h-[460px] select-none touch-none flex items-center justify-center">
      <canvas
        ref={canvasRef}
        aria-label="Interactive 3D Earth globe pointing to India"
        className={`w-full h-full block ${dragging ? "cursor-grabbing" : "cursor-grab"}`}
      />
    </div>
  );
}
