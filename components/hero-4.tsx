"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  OpenAI,
  Anthropic,
  Replicate,
  GitHub,
  Vercel,
  Grok,
} from "@/components/logos/all-logos";

// ---------- Settings from gradient.html ----------
const BLACK: [number, number, number] = [3, 10, 30]; // Darkest colour (r,g,b)
const CURVE = 0.20; // Band curve: 0 = flat, bigger = more bowed
const BLACK_CURVE = 0.34; // How much the black rises at the sides
const BLACK_REACH = 0.56; // How far down the black reaches (0..1 of height)
const BLACK_SOLID = 0.03; // Portion that stays fully black
const STOPS: [number, string][] = [
  [0.00, "#0a34b0"],
  [0.40, "#0640c8"],
  [0.53, "#0a50e8"],
  [0.60, "#1f66ee"],
  [0.69, "#6f9cf5"],
  [0.77, "#b8cffa"],
  [0.84, "#e6eefc"],
  [0.90, "#f7f9fe"],
  [0.97, "#fafafa"],
  [1.00, "#fafafa"],
];

function hexToRgb(h: string): [number, number, number] {
  return [1, 3, 5].map((i) => parseInt(h.substr(i, 2), 16)) as [number, number, number];
}

function sstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * t * (t * (t * 6 - 15) + 10);
}

// Smooth colour ramp lookup table (linear samples, then blurred to round every kink)
const N = 1024;
const LUT: [number, number, number][] = (() => {
  let s: [number, number, number][] = [];
  for (let i = 0; i < N; i++) {
    const t = i / (N - 1);
    let j = 0;
    while (j < STOPS.length - 2 && t > STOPS[j + 1][0]) j++;
    const a = STOPS[j];
    const b = STOPS[j + 1];
    const f = (t - a[0]) / (b[0] - a[0]);
    const ca = hexToRgb(a[1]);
    const cb = hexToRgb(b[1]);
    s.push([
      ca[0] + (cb[0] - ca[0]) * f,
      ca[1] + (cb[1] - ca[1]) * f,
      ca[2] + (cb[2] - ca[2]) * f,
    ]);
  }
  for (let pass = 0; pass < 3; pass++) {
    const nx: [number, number, number][] = [];
    for (let i = 0; i < N; i++) {
      let sum = [0, 0, 0];
      let cnt = 0;
      for (let k = -24; k <= 24; k++) {
        const idx = Math.min(N - 1, Math.max(0, i + k));
        sum[0] += s[idx][0];
        sum[1] += s[idx][1];
        sum[2] += s[idx][2];
        cnt++;
      }
      nx.push([sum[0] / cnt, sum[1] / cnt, sum[2] / cnt]);
    }
    s = nx;
  }
  return s;
})();

export function HeroGradientBackground({ className }: { className?: string }) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { willReadFrequently: false });
    if (!ctx) return;

    const paint = () => {
      const w = Math.max(1, canvas.clientWidth);
      const h = Math.max(1, canvas.clientHeight);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      const img = ctx.createImageData(w, h);
      const d = img.data;

      const u2 = new Float32Array(w);
      for (let x = 0; x < w; x++) {
        const u = x / w - 0.5;
        u2[x] = u * u;
      }

      for (let y = 0; y < h; y++) {
        const ty = y / h;
        const row = y * w * 4;
        for (let xx = 0; xx < w; xx++) {
          const tb = ty + CURVE * u2[xx];
          const li = tb <= 0 ? 0 : tb >= 1 ? N - 1 : tb * (N - 1);
          const i0 = li | 0;
          const i1 = Math.min(N - 1, i0 + 1);
          const fr = li - i0;
          const c0 = LUT[i0];
          const c1 = LUT[i1];

          const td = ty + BLACK_CURVE * u2[xx];
          const a = 1 - sstep(BLACK_SOLID, BLACK_REACH, td);

          const n = Math.random() - 0.5;
          const r = c0[0] + (c1[0] - c0[0]) * fr;
          const g = c0[1] + (c1[1] - c0[1]) * fr;
          const b = c0[2] + (c1[2] - c0[2]) * fr;
          const p = row + xx * 4;
          d[p] = r + (BLACK[0] - r) * a + n;
          d[p + 1] = g + (BLACK[1] - g) * a + n;
          d[p + 2] = b + (BLACK[2] - b) * a + n;
          d[p + 3] = 255;
        }
      }
      ctx.putImageData(img, 0, 0);
    };

    paint();

    let timer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timer);
      timer = setTimeout(paint, 120);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={cn("absolute inset-0 w-full h-full block pointer-events-none select-none", className)}
      style={{ background: "#0640c8" }}
    />
  );
}

export interface Hero4Props {
  className?: string;
  onAutomateSubmit?: (prompt: string) => void;
}

export function Hero4({ className, onAutomateSubmit }: Hero4Props) {
  const [promptValue, setPromptValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptValue.trim()) {
      onAutomateSubmit?.(promptValue.trim());
    }
  };

  const logos = [
    { name: "OpenAI", Component: OpenAI, className: "w-24 sm:w-28 opacity-85" },
    { name: "Anthropic", Component: Anthropic, className: "w-24 sm:w-28 opacity-85" },
    { name: "Replicate", Component: Replicate, className: "w-22 sm:w-26 opacity-85" },
    { name: "GitHub", Component: GitHub, className: "w-16 sm:w-18 opacity-85" },
    { name: "Vercel", Component: Vercel, className: "w-20 sm:w-22 opacity-85" },
    { name: "Grok", Component: Grok, className: "w-20 sm:w-24 opacity-85" },
  ];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen overflow-hidden flex flex-col justify-between font-['Inter',sans-serif] bg-[#fafafa]",
        className
      )}
    >
      {/* Background Gradient Canvas converted from gradient.html */}
      <HeroGradientBackground />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-6 sm:pt-8 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <svg
            className="w-6 h-6 text-[#2970ff] shrink-0"
            viewBox="0 0 28 28"
            fill="currentColor"
            aria-hidden="true"
          >
            <rect x="4" y="9" width="4.2" height="10" rx="2.1" transform="rotate(-20 6.1 14)" />
            <rect x="11.5" y="6.5" width="4.2" height="15" rx="2.1" transform="rotate(-20 13.6 14)" />
            <rect x="19" y="9" width="4.2" height="10" rx="2.1" transform="rotate(-20 21.1 14)" />
          </svg>
          <span className="text-white text-lg font-semibold tracking-[-0.03em]">
            mindcloud
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <Link
            href="#products"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Products
          </Link>
          <Link
            href="#apps"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Apps
          </Link>
          <Link
            href="#resources"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Resources
          </Link>
          <Link
            href="#docs"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Right CTA / Auth */}
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="#signin"
            className="text-white/85 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="#get-started"
            className="text-white hover:text-white/85 text-sm font-normal tracking-[-0.02em] transition-colors inline-flex items-center gap-1"
          >
            <span>Get started</span>
            <svg
              className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 py-12 sm:py-16 md:py-20 flex flex-col items-center text-center">
        {/* Top Growth Pill Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-4 py-1.5 rounded-full bg-[#0a183d]/50 backdrop-blur-md border border-white/15 text-xs sm:text-[13px] text-white/90 mb-7 sm:mb-9 font-normal tracking-[-0.02em]">
          <span>#351 on the Inc. 5000 with 981% growth</span>
          <span className="text-white/30">|</span>
          <Link href="#read-more" className="text-white font-medium hover:underline">
            Read more
          </Link>
        </div>

        {/* Main Headline: h2 tag, 400 weight (font-normal), -4.5% tracking */}
        <h2 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-[68px] xl:text-[76px] font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.08] sm:leading-[1.05] mb-5 sm:mb-6">
          Connect to anything.
          <br />
          Automate everything.
        </h2>

        {/* Description: p base, 85% mutedness, 400 weight, -4.5% tracking */}
        <p className="text-white/85 text-base font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.6] max-w-xl sm:max-w-2xl mb-8 sm:mb-10">
          MindCloud connects all your tools and builds the workflows for you, so your systems work together without the engineering overhead.
        </p>

        {/* Prompt / Automate Input Box */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-xl bg-white rounded-2xl sm:rounded-[22px] p-4 sm:p-5 flex flex-col justify-between min-h-[105px] sm:min-h-[115px] text-left transition-shadow"
        >
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Start right now. What should we automate?"
            className="w-full bg-transparent border-none outline-none text-[#040404] placeholder:text-zinc-400 font-['Inter',sans-serif] font-normal text-sm sm:text-base tracking-[-0.045em]"
          />
          <div className="flex justify-end mt-3 sm:mt-4">
            <button
              type="submit"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#1864f7] text-white flex items-center justify-center transition-opacity hover:opacity-90 cursor-pointer shrink-0"
              aria-label="Submit automation prompt"
            >
              <svg
                className="w-4 h-4 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Logos Ribbon (Hero-2 logos) */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-8 sm:pb-12 pt-4">
        <div className="flex flex-col md:flex-row items-center md:items-center justify-between gap-6 md:gap-10">
          {/* Left Text */}
          <div className="text-zinc-600 text-xs sm:text-sm font-['Inter',sans-serif] font-normal leading-[1.35] tracking-[-0.02em] text-center md:text-left shrink-0">
            Trusted by fast-growing
            <br />
            companies around the world
          </div>

          {/* Right Logos from hero-2 */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-6 sm:gap-8 lg:gap-10 xl:gap-12 flex-1 text-zinc-800">
            {logos.map(({ name, Component, className: logoClass }) => (
              <div
                key={name}
                className={cn("flex items-center justify-center", logoClass)}
              >
                <Component className="w-full h-auto max-h-6 sm:max-h-7" />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Hero4;
