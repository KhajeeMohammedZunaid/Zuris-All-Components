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

const DURATION = 10.0;
const GAP = 24;
const MARK_W = 292 * 0.64;
const NODE = 5;

/* ───────────── 5 Shader Sequence Themes (matching zuris-sequence-animation) ───────────── */
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
 * - Cycles through 5 theme variations at energetic, fast fluid speed (boost=3.2)
 * - Dissolves away cleanly as the logo moves to its position (5.5s -> 6.25s) with zero lingering
 */
function SequenceAppIcon({
  t,
  shift,
}: {
  t: T;
  shift: MotionValue<number>;
}) {
  const [themeIndex, setThemeIndex] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Synchronize theme cycling with the animation clock (exact 400ms speed matching zuris-sequence-animation)
  useEffect(() => {
    return t.on("change", (v) => {
      if (v < 3.5) {
        setThemeIndex(0);
      } else if (v < 3.9) {
        setThemeIndex(0); // ocean
      } else if (v < 4.3) {
        setThemeIndex(1); // emerald
      } else if (v < 4.7) {
        setThemeIndex(2); // solar
      } else if (v < 5.1) {
        setThemeIndex(3); // lava
      } else {
        setThemeIndex(4); // amethyst
      }
    });
  }, [t]);

  const currentTheme = FIVE_THEMES[themeIndex] ?? "ocean";
  const palette = elementPalettes[currentTheme] ?? elementPalettes.ocean;

  // WebGL fluid surface with boosted speed for fast, lively fluid motion
  const { ready, boost } = useElementSurface(
    canvasRef,
    currentTheme,
    undefined,
    false
  );

  useEffect(() => {
    boost(3.2);
  }, [boost, themeIndex]);

  // Glides alongside logo towards destination
  const x = useTransform(t, (v) => {
    if (v <= 5.5) return 0;
    return -shift.get() * kf(v, [5.5, 6.4], [0, 1], out);
  });

  const scale = useTransform(t, (v) => {
    if (v < 3.0) return 0.88;
    if (v < 3.5) return kf(v, [3.0, 3.5], [0.88, 1.0], out);
    if (v <= 5.5) return 1.0;
    return kf(v, [5.5, 6.3], [1.0, 0.82], out);
  });

  // Dissolves away cleanly as the logo travels there (gone by 6.25s, so it never sits lingering)
  const op = useTransform(t, (v) => {
    if (v < 3.0) return 0;
    if (v < 3.5) return kf(v, [3.0, 3.5], [0, 1], out);
    if (v <= 5.5) return 1;
    return kf(v, [5.5, 6.25], [1, 0], io);
  });

  const blur = useTransform(t, (v) => {
    if (v <= 5.5) return 0;
    return kf(v, [5.5, 6.25], [0, 6], io);
  });
  const filter = useMotionTemplate`blur(${blur}px)`;

  return (
    <motion.div
      style={{
        position: "absolute",
        left: 640 - 150, // 490 (centered behind logo)
        top: 360 - 150,  // 210 (centered behind logo)
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
   3.0–3.5  cinematic theme transition: stage turns dark, app icon squircle emerges
   3.5–5.5  app icon shader sequence cycles 5 theme variations at fast fluid speed
   5.5–6.4  logo glides to lockup position while app icon squircle dissolves away seamlessly
   6.4–7.4  brand text "Zuris" unfolds beside the settled logo
   7.4–10.0 deep black, soft radial ambient light, hold                                      */
export default function LogoIntro() {
  const t = useMotionValue(0); // master clock 0 → 10.0s
  const [run, setRun] = useState(0); // click to replay
  const [fit, setFit] = useState(1);
  const [wordLeft, setWordLeft] = useState(612);
  const shift = useMotionValue(0); // how far the mark slides left when the name appears
  const wordRef = useRef<HTMLHeadingElement | null>(null);

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
  const darkFillOp = useK(t, [2.2, 2.9, 3.0, 3.5], [0, 1, 1, 0]);
  const whiteFillOp = useK(t, [3.0, 3.5], [0, 1]);
  const darkStageOp = useK(t, [3.0, 3.5], [0, 1], out);

  /* 3 · logo mark slide to lockup position (5.5s -> 6.4s) */
  const markX = useTransform(t, (v) =>
    v <= 5.5 ? 0 : -shift.get() * kf(v, [5.5, 6.4], [0, 1], out)
  );
  const markS = useK(t, [5.5, 6.4], [0.82, 0.64], out);

  /* 4 · wordmark reveal (emerges right as logo lands: 6.4s -> 7.4s) */
  const wp = useK(t, [6.4, 7.4], [0, 1], out);
  const wClip = useTransform(wp, (w) => 100 - 100 * w);
  const wClipPath = useMotionTemplate`inset(0 ${wClip}% 0 0)`;
  const wX = useTransform(wp, (w) => -40 * (1 - w));
  const wBlur = useTransform(wp, (w) => 8 * (1 - w));
  const wFilter = useMotionTemplate`blur(${wBlur}px)`;

  /* 5 · soft end glow + hold */
  const glowOp = useK(t, [7.2, 8.2, 10.0], [0, 1, 0.7]);

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
        {/* Stage Theme Transition: Light to dark obsidian (3.0s -> 3.5s) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            opacity: darkStageOp,
          }}
        />

        {/* Zuris App Icon: Dissolves away cleanly as logo travels to lockup */}
        <SequenceAppIcon t={t} shift={shift} />

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

        {/* Logo Mark: Sits centered inside App Icon, glides to lockup while icon dissolves */}
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
