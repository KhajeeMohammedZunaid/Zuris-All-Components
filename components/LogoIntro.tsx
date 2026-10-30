"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { motion, animate, useMotionValue, useTransform, useMotionTemplate, type MotionValue } from "motion/react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400"] });

/* ───────────── logo geometry ───────────── */
const OUTER =
  "M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0Z";
const INNER = "M147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z";
const OUTER_PTS: [number, number][] = [[0,0],[212,0],[280,67],[245,131],[230,146],[292,208],[226,208],[164,146],[101,208],[0,208],[0,129],[81,47],[0,47]];
const INNER_PTS: [number, number][] = [[147,47],[212,47],[233,68],[223,88],[164,80],[82,162],[34,162]];

const DURATION = 10;
const GAP = 24;
const MARK_W = 292 * 0.64;
const NODE = 5;

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
function Node({ t, x, y, f }: { t: T; x: number; y: number; f: number }) {
  const opacity = useTransform(t, (v) => clamp((io(clamp((v - 0.5) / 1.8)) - f) * 25) * kf(v, [2.3, 2.9], [1, 0]));
  return <motion.rect x={x - NODE / 2} y={y - NODE / 2} width={NODE} height={NODE} fill="#fff" style={{ opacity }} />;
}

function Blob({ t, color, x, y, dx, dy, speed, i, times, values }: {
  t: T; color: string; x: number; y: number; dx: number; dy: number; speed: number; i: number; times: number[]; values: number[];
}) {
  const tx = useTransform(t, (v) => x + Math.sin(v * speed + i) * dx);
  const ty = useTransform(t, (v) => y + Math.cos(v * speed + i) * dy);
  const opacity = useK(t, times, values);
  return (
    <motion.div style={{ x: tx, y: ty, opacity, background: color, position: "absolute", width: 820, height: 820, borderRadius: "50%", filter: "blur(90px)" }} />
  );
}

/* ───────────── main ─────────────
   0.5–2.3  outline draws, nodes pop            3.3–4.4  black circle expands, mark inverts
   2.3–3.1  mark fills, nodes + outline fade    4.3–5.5  mark settles left, "zuris" reveals
   5.3–8.4  gradient moment                     8.2–10   black, soft glow, hold             */
export default function LogoIntro() {
  const t = useMotionValue(0);              // master clock 0 → 10s
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

  /* measure real text width (after Inter loads) so mark + name are optically centred */
  useLayoutEffect(() => {
    const measure = () => {
      const w = wordRef.current?.offsetWidth ?? 270;
      const total = MARK_W + GAP + w;
      shift.set(total / 2 - MARK_W / 2);
      setWordLeft(640 - total / 2 + MARK_W + GAP);
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [shift]);

  /* 1 · outline draw */
  const drawn   = useTransform(t, (v) => io(clamp((v - 0.5) / 1.8)));
  const strokeOp = useK(t, [0.5, 0.55, 2.4, 3.1], [0, 1, 1, 0]);

  /* 2 · fill */
  const fillOp = useK(t, [2.3, 3.1], [0, 1]);

  /* 3 · circle (mark uses difference blend until the circle covers the stage) */
  const circleR = useK(t, [3.3, 4.4], [0, 800]);
  const circleClip = useMotionTemplate`circle(${circleR}px at 640px 360px)`;
  const blend = useTransform(t, (v) => (v < 4.5 ? "difference" : "normal"));

  /* 4 · lockup */
  const markX = useTransform(t, (v) => -shift.get() * kf(v, [4.3, 5.5], [0, 1], out));
  const markS = useK(t, [4.3, 5.5], [1.2, 0.64], out);
  const wp = useK(t, [4.55, 5.6], [0, 1], out);
  const wClip = useTransform(wp, (w) => 100 - 100 * w);
  const wClipPath = useMotionTemplate`inset(0 ${wClip}% 0 0)`;
  const wX = useTransform(wp, (w) => -40 * (1 - w));
  const wBlur = useTransform(wp, (w) => 8 * (1 - w));
  const wFilter = useMotionTemplate`blur(${wBlur}px)`;

  /* 5 · gradient moment */
  const blobsOp = useK(t, [5.2, 5.9, 7.7, 8.4], [0, 1, 1, 0]);

  /* 6 · glow + hold */
  const glowOp = useK(t, [8.2, 9.0, 10], [0, 1, 0.7]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#000", overflow: "hidden", cursor: "pointer" }} onClick={() => setRun((r) => r + 1)}>
      <div
        className={inter.className}
        style={{
          position: "absolute", left: "50%", top: "50%", width: 1280, height: 720, marginLeft: -640, marginTop: -360,
          overflow: "hidden", background: "#fff", isolation: "isolate", transform: `scale(${fit})`,
        }}
      >
        {/* black circle that wipes white → black */}
        <motion.div style={{ position: "absolute", inset: 0, background: "#000", clipPath: circleClip }} />

        {/* gradient moment */}
        <motion.div style={{ position: "absolute", inset: 0, background: "#e9cfe3", overflow: "hidden", opacity: blobsOp }}>
          <Blob t={t} i={0} color="#ff7a1a" x={-100} y={-200} dx={140} dy={90}  speed={0.7} times={[5.3, 7.0]}      values={[1, 0]} />
          <Blob t={t} i={1} color="#ff5c8a" x={100}  y={100}  dx={120} dy={120} speed={0.8} times={[5.3, 6.2, 7.4]} values={[0.9, 1, 0]} />
          <Blob t={t} i={2} color="#e0102a" x={600}  y={300}  dx={100} dy={100} speed={0.6} times={[5.6, 6.5, 7.5]} values={[0, 1, 0]} />
          <Blob t={t} i={3} color="#2a2aff" x={300}  y={-300} dx={160} dy={60}  speed={0.7} times={[6.4, 7.2]}      values={[0, 1]} />
          <Blob t={t} i={4} color="#6fe3ff" x={200}  y={300}  dx={160} dy={80}  speed={0.9} times={[6.4, 7.2]}      values={[0, 1]} />
          <Blob t={t} i={5} color="#e8ff3a" x={-150} y={150}  dx={120} dy={80}  speed={1.0} times={[6.6, 7.2]}      values={[0, 1]} />
        </motion.div>

        {/* soft end glow */}
        <motion.div
          style={{
            position: "absolute", left: 290, top: 160, width: 700, height: 400, opacity: glowOp,
            background: "radial-gradient(closest-side, rgba(255,255,255,.12), rgba(255,255,255,0))",
          }}
        />

        {/* logo mark */}
        <motion.div style={{ position: "absolute", left: 494, top: 256, width: 292, height: 208, x: markX, scale: markS, mixBlendMode: blend }}>
          <svg width={292} height={208} viewBox="0 0 292 208" fill="none" style={{ overflow: "visible" }}>
            <motion.path d={OUTER} stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" style={{ pathLength: drawn, opacity: strokeOp }} />
            <motion.path d={INNER} stroke="#fff" strokeWidth={1.8} strokeLinejoin="round" style={{ pathLength: drawn, opacity: strokeOp }} />
            <motion.path d={OUTER + INNER} fill="#fff" fillRule="evenodd" clipRule="evenodd" style={{ opacity: fillOp }} />
            {NODES.map(({ p, f }, i) => <Node key={i} t={t} x={p[0]} y={p[1]} f={f} />)}
          </svg>
        </motion.div>

        {/* name: h3, Inter 400, letter-spacing -4.5% */}
        <motion.h3
          ref={wordRef}
          style={{
            position: "absolute", top: 290, left: wordLeft, margin: 0, height: 140, width: "max-content", whiteSpace: "nowrap",
            fontSize: 112, lineHeight: "140px", fontWeight: 400, letterSpacing: "-0.045em", color: "#fff",
            opacity: wp, clipPath: wClipPath, x: wX, filter: wFilter,
          }}
        >
          zuris
        </motion.h3>
      </div>
    </div>
  );
}
