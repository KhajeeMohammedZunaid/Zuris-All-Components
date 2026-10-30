"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  motion,
  animate,
  useMotionValue,
  useTransform,
  useMotionTemplate,
  type MotionValue,
} from "motion/react";
import {
  useElementSurface,
  elementPalettes,
  elementGradient,
  type ElementName,
} from "@/components/buttons/liquid-button";
import { cn } from "@/lib/utils";

/* ───────────── logo geometry ───────────── */
const OUTER =
  "M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0Z";
const INNER =
  "M147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z";
const OUTER_PTS: [number, number][] = [
  [0, 0],
  [212, 0],
  [280, 67],
  [245, 131],
  [230, 146],
  [292, 208],
  [226, 208],
  [164, 146],
  [101, 208],
  [0, 208],
  [0, 129],
  [81, 47],
  [0, 47],
];
const INNER_PTS: [number, number][] = [
  [147, 47],
  [212, 47],
  [233, 68],
  [223, 88],
  [164, 80],
  [82, 162],
  [34, 162],
];

const DURATION = 9.8;
const GAP = 24;
const MARK_W = 292 * 0.64;
const NODE = 5;

/* ───────────── 5 Shader Sequence Themes (from zuris-sequence-animation) ───────────── */
const FIVE_THEMES: ElementName[] = [
  "ocean",
  "emerald",
  "solar",
  "lava",
  "amethyst",
];

/* ───────────── easing + keyframes ───────────── */
const io = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2); // smooth in-out
const out = (x: number) => 1 - (1 - x) ** 4; // soft landing
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));

function kf(t: number, I: number[], O: number[], e: (x: number) => number = io) {
  if (t <= I[0]) return O[0];
  for (let k = 1; k < I.length; k++) {
    if (t <= I[k]) {
      const p = e((t - I[k - 1]) / (I[k] - I[k - 1]));
      return O[k - 1] + (O[k] - O[k - 1]) * p;
    }
  }
  return O[O.length - 1];
}
type T = MotionValue<number>;
const useK = (t: T, I: number[], O: number[], e = io) =>
  useTransform(t, (v) => kf(v, I, O, e));

/* node positions along each contour (0..1), so nodes pop as outline passes them */
function fractions(pts: [number, number][]) {
  const d = pts.map((p, i) =>
    i ? Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0
  );
  const last = pts[pts.length - 1];
  const total =
    d.reduce((a, b) => a + b, 0) + Math.hypot(pts[0][0] - last[0], pts[0][1] - last[1]);
  let c = 0;
  return pts.map((_, i) => (c += d[i]) / total);
}
const oF = fractions(OUTER_PTS),
  iF = fractions(INNER_PTS);
const NODES = [
  ...OUTER_PTS.map((p, i) => ({ p, f: oF[i] })),
  ...INNER_PTS.map((p, i) => ({ p, f: iF[i] })),
];

/* ───────────── scene pieces ───────────── */
function Node({
  t,
  x,
  y,
  f,
  color,
}: {
  t: T;
  x: number;
  y: number;
  f: number;
  color: string;
}) {
  const opacity = useTransform(
    t,
    (v) =>
      clamp((io(clamp((v - 0.5) / 1.8)) - f) * 25) * kf(v, [2.2, 2.9], [1, 0])
  );
  return (
    <motion.rect
      x={x - NODE / 2}
      y={y - NODE / 2}
      width={NODE}
      height={NODE}
      fill={color}
      style={{ opacity }}
    />
  );
}

/**
 * App Icon with WebGL Liquid Shader Sequence:
 * - Emerges when transitioning to dark stage
 * - Cycles through 5 theme variations (ocean -> emerald -> solar -> lava -> amethyst)
 * - Moves aside to the left and dissolves away with blur when revealing brand lockup
 */
function SequenceAppIcon({ t }: { t: T }) {
  const [themeIndex, setThemeIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Synchronize theme cycling with the animation clock (400ms each from 3.6s to 5.6s)
  useEffect(() => {
    return t.on("change", (v) => {
      if (v < 3.6) {
        setThemeIndex(0);
      } else if (v < 4.0) {
        setThemeIndex(0); // ocean
      } else if (v < 4.4) {
        setThemeIndex(1); // emerald
      } else if (v < 4.8) {
        setThemeIndex(2); // solar
      } else if (v < 5.2) {
        setThemeIndex(3); // lava
      } else {
        setThemeIndex(4); // amethyst
      }
    });
  }, [t]);

  const currentTheme = FIVE_THEMES[themeIndex] ?? "ocean";
  const palette = elementPalettes[currentTheme] ?? elementPalettes.ocean;
  const { ready, boost } = useElementSurface(
    canvasRef,
    currentTheme,
    undefined,
    false
  );

  useEffect(() => {
    boost(2.6);
  }, [boost, themeIndex]);

  // Entrance at 3.0s -> 3.6s; steady hold 3.6s -> 5.6s; shifts left & dissolves 5.6s -> 6.7s
  const op = useTransform(t, (v) => {
    if (v < 3.0) return 0;
    if (v < 3.6) return kf(v, [3.0, 3.6], [0, 1], out);
    if (v <= 5.6) return 1;
    return kf(v, [5.6, 6.5], [1, 0], io);
  });

  const scale = useTransform(t, (v) => {
    if (v < 3.0) return 0.85;
    if (v < 3.6) return kf(v, [3.0, 3.6], [0.85, 1.0], out);
    if (v <= 5.6) return 1.0;
    return kf(v, [5.6, 6.7], [1.0, 0.85], out);
  });

  const x = useTransform(t, (v) => {
    if (v <= 5.6) return 0;
    return kf(v, [5.6, 6.7], [0, -220], out);
  });

  const blur = useTransform(t, (v) => {
    if (v <= 5.6) return 0;
    return kf(v, [5.6, 6.6], [0, 8], io);
  });
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 640 - 150, // 490
        top: 360 - 150,  // 210
        width: 300,
        height: 300,
        borderRadius: 66,
        overflow: "hidden",
        x,
        scale,
        opacity: op,
        filter,
        backgroundImage: elementGradient(palette.colors),
        boxShadow:
          "0 28px 64px -12px rgba(0,0,0,0.6), inset 0 0 0 1.5px rgba(255,255,255,0.18)",
      }}
      className="pointer-events-none select-none z-[5] will-change-transform flex items-center justify-center [contain:paint]"
    >
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 size-full transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0"
        )}
      />
    </motion.div>
  );
}

/* ───────────── main ─────────────
   0.5–2.2  outline draws in ink black on light canvas, nodes pop
   2.2–2.9  mark fills with solid ink black
   3.0–3.6  cinematic theme transition: stage turns dark, app icon squircle emerges
   3.6–5.6  app icon shader sequence cycles 5 theme variations (ocean -> emerald -> solar -> lava -> amethyst)
   5.6–6.8  app icon shifts left and dissolves; logo settles into lockup position; "Zuris" emerges
   6.8–9.8  deep black, soft radial ambient light, hold                                      */
export default function LogoIntro() {
  const t = useMotionValue(0); // master clock 0 → 9.8s
  const [run, setRun] = useState(0); // click to replay
  const [fit, setFit] = useState(1);
  const [wordLeft, setWordLeft] = useState(612);
  const shift = useMotionValue(0); // how far the mark slides left when the name appears
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    t.set(0);
    const c = animate(t, DURATION, { duration: DURATION, ease: "linear" });
    return () => c.stop();
  }, [run, t]);

  useEffect(() => {
    const f = () => setFit(Math.min(innerWidth / 1280, innerHeight / 720));
    f();
    addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);

  /* measure real text width (after Inter loads) so mark + name are optically centred */
  useLayoutEffect(() => {
    const measure = () => {
      const w = wordRef.current?.offsetWidth ?? 280;
      const total = MARK_W + GAP + w;
      shift.set(total / 2 - MARK_W / 2);
      setWordLeft(640 - total / 2 + MARK_W + GAP);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [shift]);

  /* 1 · outline draw */
  const drawn = useTransform(t, (v) => io(clamp((v - 0.5) / 1.8)));
  const strokeOp = useK(t, [0.5, 0.55, 2.4, 3.0], [0, 1, 1, 0]);

  /* 2 · theme transition (light -> dark) & mark crossfade */
  const darkFillOp = useK(t, [2.2, 2.9, 3.0, 3.6], [0, 1, 1, 0]);
  const whiteFillOp = useK(t, [3.0, 3.6], [0, 1]);
  const darkStageOp = useK(t, [3.0, 3.6], [0, 1], out);

  /* 3 · lockup slide & wordmark reveal (starts at 5.6s after shader sequence) */
  const markX = useTransform(t, (v) =>
    v <= 5.6 ? 0 : -shift.get() * kf(v, [5.6, 6.8], [0, 1], out)
  );
  const markS = useK(t, [5.6, 6.8], [0.82, 0.64], out);

  const wp = useK(t, [5.85, 6.9], [0, 1], out);
  const wClip = useTransform(wp, (w) => 100 - 100 * w);
  const wClipPath = useMotionTemplate`inset(0 ${wClip}% 0 0)`;
  const wX = useTransform(wp, (w) => -40 * (1 - w));
  const wBlur = useTransform(wp, (w) => 8 * (1 - w));
  const wFilter = useMotionTemplate`blur(${wBlur}px)`;

  /* 4 · soft end glow + hold */
  const glowOp = useK(t, [6.8, 7.8, 9.8], [0, 1, 0.7]);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#000000",
        overflow: "hidden",
        cursor: "pointer",
      }}
      onClick={() => setRun((r) => r + 1)}
    >
      <div
        className="font-sans"
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: 1280,
          height: 720,
          marginLeft: -640,
          marginTop: -360,
          overflow: "hidden",
          background: "#ffffff",
          isolation: "isolate",
          transform: `scale(${fit})`,
          fontFamily: "'Inter', sans-serif",
        }}
      >
        {/* Stage Theme Transition: Light to dark obsidian (3.0s -> 3.6s) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            opacity: darkStageOp,
          }}
        />

        {/* Zuris App Icon with WebGL Liquid Shader Sequence (3.0s -> 6.7s) */}
        <SequenceAppIcon t={t} />

        {/* Soft end glow */}
        <motion.div
          style={{
            position: "absolute",
            left: 290,
            top: 160,
            width: 700,
            height: 400,
            opacity: glowOp,
            background:
              "radial-gradient(closest-side, rgba(255,255,255,.14), rgba(255,255,255,0))",
          }}
        />

        {/* Logo Mark: Sits dead center inside the App Icon, then smoothly slides to lockup */}
        <motion.div
          style={{
            position: "absolute",
            left: 494,
            top: 256,
            width: 292,
            height: 208,
            x: markX,
            scale: markS,
            zIndex: 10,
          }}
        >
          <svg
            width={292}
            height={208}
            viewBox="0 0 292 208"
            fill="none"
            style={{ overflow: "visible" }}
          >
            {/* Outline stroke in ink black on light canvas */}
            <motion.path
              d={OUTER}
              stroke="#09090b"
              strokeWidth={1.8}
              strokeLinejoin="round"
              style={{ pathLength: drawn, opacity: strokeOp }}
            />
            <motion.path
              d={INNER}
              stroke="#09090b"
              strokeWidth={1.8}
              strokeLinejoin="round"
              style={{ pathLength: drawn, opacity: strokeOp }}
            />

            {/* Dark fill on light stage */}
            <motion.path
              d={OUTER + INNER}
              fill="#09090b"
              fillRule="evenodd"
              clipRule="evenodd"
              style={{ opacity: darkFillOp }}
            />

            {/* Radiant white fill on dark stage and inside App Icon */}
            <motion.path
              d={OUTER + INNER}
              fill="#ffffff"
              fillRule="evenodd"
              clipRule="evenodd"
              style={{ opacity: whiteFillOp }}
            />

            {NODES.map(({ p, f }, i) => (
              <Node key={i} t={t} x={p[0]} y={p[1]} f={f} color="#09090b" />
            ))}
          </svg>
        </motion.div>

        {/* Brand Text "Zuris": Emerges smoothly beside the logo mark */}
        <motion.h4
          ref={wordRef}
          className="font-['Inter',sans-serif] font-normal tracking-[-0.045em] text-white leading-none select-none whitespace-nowrap m-0"
          style={{
            position: "absolute",
            top: 290,
            left: wordLeft,
            height: 140,
            width: "max-content",
            fontSize: 112,
            lineHeight: "140px",
            fontFamily: "'Inter', sans-serif",
            fontWeight: 400,
            letterSpacing: "-0.045em",
            color: "#ffffff",
            opacity: wp,
            clipPath: wClipPath,
            x: wX,
            filter: wFilter,
            zIndex: 10,
          }}
        >
          Zuris
        </motion.h4>
      </div>
    </div>
  );
}
