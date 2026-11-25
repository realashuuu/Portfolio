"use client";

import { useEffect, useRef } from "react";

const VERT_SRC = `
attribute vec2 a;
void main() {
  gl_Position = vec4(a, 0.0, 1.0);
}
`;

// Flowing silk/cloth shader inspired by the reference, tuned to deep dark blue, slate & subtle violet-cyan sheen
const FRAG_SRC = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform vec2 uRes;
uniform float uTime;
uniform vec2 uLight;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * noise(p);
    p = p * 2.02 + 7.3;
    a *= 0.5;
  }
  return v;
}

float cloth(vec2 p) {
  float t = uTime * 0.14;
  vec2 w = p;
  for (int i = 0; i < 4; i++) {
    float fi = float(i);
    w += 0.5 * vec2(
      sin(w.y * 1.25 + t + fi * 1.9),
      cos(w.x * 1.05 - t * 0.8 + fi * 2.3)
    );
  }
  float folds = sin(w.x * 1.6 + w.y * 1.1);
  float soft = fbm(w * 0.9);
  return folds * 0.75 + soft * 0.35;
}

void main() {
  vec2 fc = gl_FragCoord.xy;
  float s = sqrt(uRes.x * uRes.y);
  vec2 p = (fc - 0.5 * uRes) / s * 3.1;

  float e = 0.02;
  float h = cloth(p);
  float hx = cloth(p + vec2(e, 0.0));
  float hy = cloth(p + vec2(0.0, e));
  vec3 n = normalize(vec3((h - hx) / e * 0.55, (h - hy) / e * 0.55, 1.0));

  vec2 lp = (uLight - 0.5) * (uRes / s) * 3.1
    + vec2(0.28 * sin(uTime * 0.32), 0.22 * cos(uTime * 0.26));
  vec3 L = normalize(vec3(lp - p, 1.25));
  vec3 H = normalize(L + vec3(0.0, 0.0, 1.0));

  float diff = clamp(dot(n, L), 0.0, 1.0);
  float nh = clamp(dot(n, H), 0.0, 1.0);
  float spec = pow(nh, 80.0);
  float sheen = pow(nh, 7.0);
  float rim = pow(1.0 - n.z, 2.0);

  // Dark blue / deep slate / steel blue + electric violet & cyan specular sheen
  vec3 baseNavy = vec3(0.031, 0.047, 0.086);   // #080c16
  vec3 steelBlue = vec3(0.145, 0.235, 0.365);  // #253c5d
  vec3 violetAccent = vec3(0.357, 0.243, 1.0); // #5b3eff
  vec3 cyanAccent = vec3(0.055, 0.647, 0.914); // #0ea5e9

  vec3 col = baseNavy
    + diff * 0.24 * steelBlue
    + sheen * 0.16 * violetAccent
    + spec * 0.22 * cyanAccent
    + rim * 0.20 * steelBlue;

  vec2 uv = fc / uRes;
  float vig = 1.0 - 0.65 * smoothstep(0.32, 1.05, length(vec2(uv.x - 0.5, (uv.y - 0.5) * 1.1)));
  col *= vig;

  gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(0.95)), 1.0);
}
`;

export default function HeroShaderBg() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      antialias: false,
      alpha: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const compileShader = (type: number, src: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERT_SRC);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAG_SRC);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const locA = gl.getAttribLocation(program, "a");
    gl.enableVertexAttribArray(locA);
    gl.vertexAttribPointer(locA, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uLight = gl.getUniformLocation(program, "uLight");

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;

    let targetLX = 0.62;
    let targetLY = 0.42;
    let lx = 0.62;
    let ly = 0.42;
    let inView = true;
    let rafId = 0;
    let resizeTimer = 0;
    const startTime = performance.now();

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      // Cap DPR to 1 on mobile viewports so fragment shader stays 60fps with minimal battery drain
      const dpr = window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(parent.clientWidth * dpr));
      const h = Math.max(1, Math.floor(parent.clientHeight * dpr));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };

    const drawFrame = (now: number) => {
      const elapsed = reduceMotion ? 0 : (now - startTime) / 1000;
      lx += (targetLX - lx) * 0.08;
      ly += (targetLY - ly) * 0.08;
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uLight, lx, ly);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const loop = (now: number) => {
      if (inView && !document.hidden) {
        drawFrame(now);
      }
      if (!reduceMotion) {
        rafId = requestAnimationFrame(loop);
      }
    };

    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      targetLX = (e.clientX - rect.left) / rect.width;
      targetLY = 1 - (e.clientY - rect.top) / rect.height;
    };

    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resize();
        if (reduceMotion) drawFrame(performance.now());
      }, 120);
    };

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0]?.isIntersecting ?? true;
      },
      { threshold: 0.01 }
    );
    io.observe(canvas);

    resize();
    drawFrame(performance.now());
    if (!reduceMotion) {
      rafId = requestAnimationFrame(loop);
    }

    if (finePointer && !reduceMotion) {
      window.addEventListener("mousemove", onPointerMove, { passive: true });
    }
    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(resizeTimer);
      io.disconnect();
      if (finePointer && !reduceMotion) {
        window.removeEventListener("mousemove", onPointerMove);
      }
      window.removeEventListener("resize", onResize);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  );
}
