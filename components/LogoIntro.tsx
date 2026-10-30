"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform, useMotionTemplate, type MotionValue } from "motion/react";

/* ───────────── logo geometry ───────────── */
const OUTER =
  "M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0Z";
const INNER = "M147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z";
const OUTER_PTS: [number, number][] = [[0,0],[212,0],[280,67],[245,131],[230,146],[292,208],[226,208],[164,146],[101,208],[0,208],[0,129],[81,47],[0,47]];
const INNER_PTS: [number, number][] = [[147,47],[212,47],[233,68],[223,88],[164,80],[82,162],[34,162]];

const DURATION = 10.5;
const GAP = 24;
const MARK_W = 292 * 0.64;
const NODE = 5;

/* ───────────── 5 Iconic WebP Backdrop Images ───────────── */
const ACC_IMAGES = [
  "/acc-1.webp",
  "/acc-2.webp",
  "/acc-3.webp",
  "/acc-4.webp",
  "/acc-5.webp",
];

/* ───────────── easing + keyframes ───────────── */
const io  = (x: number) => (x < 0.5 ? 4 * x ** 3 : 1 - (-2 * x + 2) ** 3 / 2); // smooth in-out
const out = (x: number) => 1 - (1 - x) ** 4;                                   // soft landing
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
const useK = (t: T, I: number[], O: number[], e = io) => useTransform(t, (v) => kf(v, I, O, e));

/* node positions along each contour (0..1), so nodes pop as the outline passes them */
function fractions(pts: [number, number][]) {
  const d = pts.map((p, i) => (i ? Math.hypot(p[0] - pts[i - 1][0], p[1] - pts[i - 1][1]) : 0));
  const last = pts[pts.length - 1];
  const total = d.reduce((a, b) => a + b, 0) + Math.hypot(pts[0][0] - last[0], pts[0][1] - last[1]);
  let c = 0;
  return pts.map((_, i) => (c += d[i]) / total);
}
const oF = fractions(OUTER_PTS), iF = fractions(INNER_PTS);
const NODES = [
  ...OUTER_PTS.map((p, i) => ({ p, f: oF[i] })),
  ...INNER_PTS.map((p, i) => ({ p, f: iF[i] })),
];

/* ───────────── scene pieces ───────────── */
function Node({ t, x, y, f, color }: { t: T; x: number; y: number; f: number; color: string }) {
  const opacity = useTransform(t, (v) => clamp((io(clamp((v - 0.5) / 1.8)) - f) * 25) * kf(v, [2.2, 2.9], [1, 0]));
  return <motion.rect x={x - NODE / 2} y={y - NODE / 2} width={NODE} height={NODE} fill={color} style={{ opacity }} />;
}

/**
 * 5 Iconic Images Showcase (acc-1.webp -> acc-5.webp):
 * - Each image stays visible for >= 0.7s (calibrated 0.8s - 1.0s slots)
 * - Seamless stacked cross-fades with hardware-accelerated transforms
 * - Layered with edge vignette & contrast overlay so white brand lockup stays razor-sharp
 */
function AccImageShowcase({ t }: { t: T }) {
  // Layer cross-fade timings: each layer smoothly reveals over the previous
  const op1 = useK(t, [5.55, 5.8], [0, 1], io); // acc-2 appears over acc-1
  const op2 = useK(t, [6.35, 6.6], [0, 1], io); // acc-3 appears over acc-2
  const op3 = useK(t, [7.15, 7.4], [0, 1], io); // acc-4 appears over acc-3
  const op4 = useK(t, [7.95, 8.2], [0, 1], io); // acc-5 appears over acc-4

  const opacities = [
    undefined, // acc-1 stays solid underneath
    op1,
    op2,
    op3,
    op4,
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-black [contain:paint]">
      {ACC_IMAGES.map((src, i) => (
        <motion.div
          key={src}
          className="absolute inset-0 w-full h-full [transform:translateZ(0)]"
          style={{
            opacity: opacities[i],
          }}
        >
          <img
            src={src}
            alt={`Visual backdrop ${i + 1}`}
            className="w-full h-full object-cover object-center select-none pointer-events-none block [transform:translateZ(0)]"
            loading="eager"
            decoding="async"
          />
        </motion.div>
      ))}

      {/* Cinematic subtle edge vignette & contrast scrim */}
      <div className="absolute inset-0 bg-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(0,0,0,0.65)_100%)] pointer-events-none" />
    </div>
  );
}

/* ───────────── main ─────────────
   0.5–2.2  outline draws in ink black on light canvas, nodes pop
   2.2–3.0  mark fills with solid ink black
   3.1–4.2  cinematic theme transition: stage dissolves to dark, mark illuminates to white
   4.3–5.5  mark settles left, "Zuris" unfolds beside it (exact h4 Inter typography)
   5.0–8.95 exactly 5 images (acc-1.webp -> acc-5.webp) stay >= 0.7s each with smooth dissolves
   8.95–10.5 deep black, soft radial ambient light, hold                                      */
export default function LogoIntro() {
  const t = useMotionValue(0);              // master clock 0 → 10.5s
  const [run, setRun] = useState(0);        // click to replay
  const [fit, setFit] = useState(1);
  const [wordLeft, setWordLeft] = useState(612);
  const shift = useMotionValue(0);          // how far the mark slides left when the name appears
  const wordRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    t.set(0);
    const c = animate(t, DURATION, { duration: DURATION, ease: "linear" });
    return () => c.stop();
  }, [run, t]);

  useEffect(() => {
    const f = () => setFit(Math.min(innerWidth / 1280, innerHeight / 720));
    f(); addEventListener("resize", f);
    return () => removeEventListener("resize", f);
  }, []);

  // Preload and decode all 5 acc images into memory so playback never stutters
  useEffect(() => {
    if (typeof window === "undefined") return;
    ACC_IMAGES.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.decode?.().catch(() => {});
    });
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
  const darkFillOp = useK(t, [2.2, 2.9, 3.1, 4.1], [0, 1, 1, 0]);
  const whiteFillOp = useK(t, [3.1, 4.1], [0, 1]);
  const darkStageOp = useK(t, [3.1, 4.2], [0, 1], out);

  /* 3 · lockup slide & wordmark reveal */
  const markX = useTransform(t, (v) => -shift.get() * kf(v, [4.3, 5.5], [0, 1], out));
  const markS = useK(t, [4.3, 5.5], [1.2, 0.64], out);
  const wp = useK(t, [4.55, 5.6], [0, 1], out);
  const wClip = useTransform(wp, (w) => 100 - 100 * w);
  const wClipPath = useMotionTemplate`inset(0 ${wClip}% 0 0)`;
  const wX = useTransform(wp, (w) => -40 * (1 - w));
  const wBlur = useTransform(wp, (w) => 8 * (1 - w));
  const wFilter = useMotionTemplate`blur(${wBlur}px)`;

  /* 4 · 5 images backdrop showcase (acc-1.webp -> acc-5.webp: 5.0s -> 8.95s) */
  const imageShowcaseOp = useK(t, [4.9, 5.2, 8.95, 9.4], [0, 1, 1, 0]);

  /* 5 · soft end glow + hold */
  const glowOp = useK(t, [8.95, 9.6, 10.5], [0, 1, 0.7]);

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
        {/* Theme transition: Smooth feathered obsidian wash from light to dark (3.1s -> 4.2s) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            background: "#000000",
            opacity: darkStageOp,
          }}
        />

        {/* 5 Images Showcase: acc-1.webp -> acc-5.webp (5.0s -> 8.95s, >= 0.7s each) */}
        <motion.div
          style={{
            position: "absolute",
            inset: 0,
            overflow: "hidden",
            opacity: imageShowcaseOp,
          }}
        >
          <AccImageShowcase t={t} />
        </motion.div>

        {/* Soft end glow */}
        <motion.div
          style={{
            position: "absolute",
            left: 290,
            top: 160,
            width: 700,
            height: 400,
            opacity: glowOp,
            background: "radial-gradient(closest-side, rgba(255,255,255,.14), rgba(255,255,255,0))",
          }}
        />

        {/* logo mark */}
        <motion.div
          style={{
            position: "absolute",
            left: 494,
            top: 256,
            width: 292,
            height: 208,
            x: markX,
            scale: markS,
          }}
        >
          <svg width={292} height={208} viewBox="0 0 292 208" fill="none" style={{ overflow: "visible" }}>
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

            {/* Radiant white fill on dark stage and image backgrounds */}
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

        {/* name: h4, Inter 400, letter-spacing -4.5% matching ZurisLogoAnimation typography */}
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
          }}
        >
          Zuris
        </motion.h4>
      </div>
    </div>
  );
}
