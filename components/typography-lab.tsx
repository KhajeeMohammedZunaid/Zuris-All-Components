"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type TypoTag =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "p-lead"
  | "p-base"
  | "p-small"
  | "p-caption"
  | "span"
  | "blockquote"
  | "label"
  | "code"
  | "small";

interface TagDefault {
  size: number;
  weight: number;
  tracking: number; // in em
  wordSpacing: number; // in em
  lineHeight: number;
  mutedness: number;
  italic: boolean;
  transform: "none" | "uppercase" | "lowercase" | "capitalize";
  font: "inter" | "jakarta" | "mono" | "serif";
  sample: string;
}

// Semantic presets mapped to each HTML tag and paragraph variant
const TAG_DEFAULTS: Record<TypoTag, TagDefault> = {
  h1: {
    size: 48,
    weight: 700,
    tracking: -0.035,
    wordSpacing: 0,
    lineHeight: 1.1,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Issue tracking you’ll actually enjoy using.",
  },
  h2: {
    size: 36,
    weight: 700,
    tracking: -0.03,
    wordSpacing: 0,
    lineHeight: 1.15,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Crafted to infuse momentum on your brain.",
  },
  h3: {
    size: 28,
    weight: 600,
    tracking: -0.025,
    wordSpacing: 0,
    lineHeight: 1.2,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Accelerate your development cycle seamlessly.",
  },
  h4: {
    size: 22,
    weight: 600,
    tracking: -0.02,
    wordSpacing: 0,
    lineHeight: 1.25,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Real-time agentic workflows with deterministic validation.",
  },
  h5: {
    size: 18,
    weight: 500,
    tracking: -0.015,
    wordSpacing: 0,
    lineHeight: 1.3,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Configure custom typography with instant visual precision.",
  },
  h6: {
    size: 15,
    weight: 500,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.9,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Subtle sub-headings and module category dividers.",
  },
  "p-lead": {
    size: 20,
    weight: 400,
    tracking: -0.01,
    wordSpacing: 0,
    lineHeight: 1.6,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Spend less time on manual logistics and more on strategic growth with autonomous AI workflows.",
  },
  "p-base": {
    size: 16,
    weight: 400,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.6,
    mutedness: 0.85,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Linear helps streamline software projects, sprints, tasks, and bug tracking with high-performance velocity.",
  },
  "p-small": {
    size: 14,
    weight: 400,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.5,
    mutedness: 0.75,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Agents execute multi-step workflows using live tool access, deterministic validation loops, and confidence thresholds.",
  },
  "p-caption": {
    size: 12,
    weight: 400,
    tracking: 0.01,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.6,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Available across all enterprise plans with SOC 2 Type II compliance.",
  },
  span: {
    size: 16,
    weight: 400,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 1.0,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Inline text element for targeted stylings and micro-copy.",
  },
  blockquote: {
    size: 20,
    weight: 400,
    tracking: -0.015,
    wordSpacing: 0.02,
    lineHeight: 1.4,
    mutedness: 0.9,
    italic: true,
    transform: "none",
    font: "inter",
    sample: "“You’ll probably build a better product, just because of the craft Linear infuses on your brain.”",
  },
  label: {
    size: 11,
    weight: 700,
    tracking: 0.08,
    wordSpacing: 0.04,
    lineHeight: 1.0,
    mutedness: 0.7,
    italic: false,
    transform: "uppercase",
    font: "jakarta",
    sample: "SYSTEM PROTOCOL · ACTIVE",
  },
  code: {
    size: 14,
    weight: 500,
    tracking: 0,
    wordSpacing: 0.08,
    lineHeight: 1.5,
    mutedness: 0.95,
    italic: false,
    transform: "none",
    font: "mono",
    sample: "const client = new Agent({ deterministic: true });",
  },
  small: {
    size: 12,
    weight: 400,
    tracking: 0.01,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.55,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "SOC 2 Type II certified. All rights reserved © 2026.",
  },
};

export function TypographyLab() {
  const [tag, setTag] = React.useState<TypoTag>("h2");
  const [font, setFont] = React.useState<"inter" | "jakarta" | "mono" | "serif">("inter");
  const [fontSize, setFontSize] = React.useState<number>(36);
  const [fontWeight, setFontWeight] = React.useState<number>(700);
  const [letterSpacing, setLetterSpacing] = React.useState<number>(-0.03); // in em
  const [wordSpacing, setWordSpacing] = React.useState<number>(0); // in em
  const [lineHeight, setLineHeight] = React.useState<number>(1.15);
  const [mutedness, setMutedness] = React.useState<number>(1.0); // opacity
  const [colorTone, setColorTone] = React.useState<string>("neutral");
  const [transform, setTransform] = React.useState<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const [italic, setItalic] = React.useState<boolean>(false);
  const [underline, setUnderline] = React.useState<boolean>(false);
  const [align, setAlign] = React.useState<"left" | "center" | "right">("left");
  const [sampleText, setSampleText] = React.useState<string>(
    "Crafted to infuse momentum on your brain."
  );

  // When tag changes, apply that tag's natural semantic defaults
  const handleTagChange = (newTag: TypoTag) => {
    setTag(newTag);
    const defaults = TAG_DEFAULTS[newTag];
    if (defaults) {
      setFontSize(defaults.size);
      setFontWeight(defaults.weight);
      setLetterSpacing(defaults.tracking);
      setWordSpacing(defaults.wordSpacing);
      setLineHeight(defaults.lineHeight);
      setMutedness(defaults.mutedness);
      setItalic(defaults.italic);
      setTransform(defaults.transform);
      setFont(defaults.font);
      setSampleText(defaults.sample);
    }
  };

  const getFontFamily = () => {
    switch (font) {
      case "jakarta":
        return "'Plus Jakarta Sans', var(--font-jakarta-display), sans-serif";
      case "mono":
        return "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace";
      case "serif":
        return "ui-serif, Georgia, Cambria, 'Times New Roman', serif";
      case "inter":
      default:
        return "'Inter', var(--font-sans-inter), sans-serif";
    }
  };

  const getToneColor = () => {
    switch (colorTone) {
      case "violet":
        return "rgb(139, 92, 246)";
      case "emerald":
        return "rgb(16, 185, 129)";
      case "amber":
        return "rgb(245, 158, 11)";
      case "rose":
        return "rgb(244, 63, 94)";
      case "cyan":
        return "rgb(6, 182, 212)";
      case "neutral":
      default:
        return "currentColor";
    }
  };

  const computedStyle: React.CSSProperties = {
    fontFamily: getFontFamily(),
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    letterSpacing: `${letterSpacing}em`,
    wordSpacing: `${wordSpacing}em`,
    lineHeight: lineHeight,
    opacity: mutedness,
    color: getToneColor(),
    textTransform: transform,
    fontStyle: italic ? "italic" : "normal",
    textDecoration: underline ? "underline" : "none",
    textAlign: align,
  };

  // Actual rendered HTML tag
  const renderedTag = tag.startsWith("p-") ? "p" : tag;

  const tagGroups: { id: TypoTag; label: string; badge?: string }[] = [
    { id: "h1", label: "<h1>" },
    { id: "h2", label: "<h2>" },
    { id: "h3", label: "<h3>" },
    { id: "h4", label: "<h4>" },
    { id: "h5", label: "<h5>" },
    { id: "h6", label: "<h6>" },
    { id: "p-lead", label: "p (lead)", badge: "20px" },
    { id: "p-base", label: "p (base)", badge: "16px" },
    { id: "p-small", label: "p (small)", badge: "14px" },
    { id: "p-caption", label: "p (caption)", badge: "12px" },
    { id: "blockquote", label: "<blockquote>" },
    { id: "label", label: "<label>" },
    { id: "code", label: "<code>" },
    { id: "small", label: "<small>" },
    { id: "span", label: "<span>" },
  ];

  return (
    <section className="flex flex-col gap-6 pt-2 pb-6">
      {/* Studio Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-violet-600 animate-pulse" />
            <h2 className="text-sm sm:text-base font-bold text-zinc-950 dark:text-zinc-50 tracking-tight">
              Interactive Typography Studio
            </h2>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 ml-1">
              &lt;{renderedTag}&gt;
              {tag.startsWith("p-") && ` · ${tag.replace("p-", "")}`}
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
            Select an HTML tag or body variant (lead, base, small, caption) and refine tracking, weight, word spacing, and line height with zero scroll jumping.
          </p>
        </div>
      </div>

      {/* 1. Live Preview Stage (Always on top, instantly visible) */}
      <div className="rounded-[12px] border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-6 sm:p-8 flex flex-col justify-between min-h-[180px] shadow-xs">
        {/* Top Preview Meta Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-zinc-200 dark:border-zinc-800 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950">
              &lt;{renderedTag}&gt;
              {tag.startsWith("p-") && ` · ${tag.replace("p-", "")}`}
            </span>
            <span className="text-zinc-500 dark:text-zinc-400 font-medium">
              Real semantic {renderedTag.toUpperCase()} element
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
            <span>{fontSize}px</span>
            <span>·</span>
            <span>{(letterSpacing * 100).toFixed(1)}% track</span>
            <span>·</span>
            <span>{lineHeight} leading</span>
            <span>·</span>
            <span>{wordSpacing > 0 ? `+${wordSpacing}em` : `${wordSpacing}em`} word</span>
            <span>·</span>
            <span>{Math.round(mutedness * 100)}% opac</span>
          </div>
        </div>

        {/* Live Rendered Element */}
        <div id="typo-lab-preview" className="py-6 flex items-center justify-start overflow-hidden">
          {React.createElement(
            renderedTag,
            {
              style: computedStyle,
              className: cn(
                "w-full transition-all duration-150 break-words",
                tag === "blockquote" && "border-l-4 border-zinc-400 dark:border-zinc-600 pl-4 italic",
                tag === "code" && "bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded font-mono inline-block"
              ),
            },
            sampleText
          )}
        </div>

        {/* Live Inline Text Input */}
        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-2">
          <label htmlFor="sample-text-input" className="text-xs font-bold text-zinc-500 shrink-0">
            Text:
          </label>
          <input
            id="sample-text-input"
            type="text"
            value={sampleText}
            onChange={(e) => setSampleText(e.target.value)}
            className="w-full text-xs px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 outline-none focus:border-zinc-950 dark:focus:border-zinc-100"
            placeholder="Type your own sample text..."
          />
        </div>
      </div>

      {/* 2. Compact, Well-Spaced Controls Box */}
      <div className="rounded-[12px] border border-zinc-300 dark:border-zinc-800 bg-white dark:bg-zinc-950 p-5 flex flex-col gap-5 shadow-xs">
        
        {/* Row 1: HTML Tag & Paragraph Variant Selector Pills */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              HTML Semantic Tag &amp; Paragraph Presets:
            </span>
            <span className="text-[11px] text-zinc-500">
              Includes lead, base, small &amp; caption presets
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {tagGroups.map((t) => (
              <button
                key={t.id}
                onClick={() => handleTagChange(t.id)}
                className={`py-1.5 px-2.5 text-xs font-mono font-bold rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                  tag === t.id
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                <span>{t.label}</span>
                {t.badge && (
                  <span
                    className={`text-[9px] px-1 py-0.2 rounded font-sans font-semibold ${
                      tag === t.id
                        ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-950"
                        : "bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {t.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: 4-Column Balanced Grid of Sliders and Selectors */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5 pt-3 border-t border-zinc-200 dark:border-zinc-800">
          
          {/* Box 1: Font & Weight */}
          <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Font &amp; Weight
            </span>

            {/* Font family */}
            <div className="grid grid-cols-2 gap-1">
              {(["inter", "jakarta", "mono", "serif"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={`py-1 text-xs font-medium rounded border capitalize transition-colors ${
                    font === f
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold"
                      : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100"
                  }`}
                >
                  {f === "jakarta" ? "Jakarta" : f}
                </button>
              ))}
            </div>

            {/* Weight buttons */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Weight:</span>
                <span className="font-mono">{fontWeight}</span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                {[300, 400, 500, 600, 700, 800, 900].map((w) => (
                  <button
                    key={w}
                    onClick={() => setFontWeight(w)}
                    className={`py-1 text-xs font-mono rounded border transition-colors ${
                      fontWeight === w
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100"
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box 2: Sizing & Line Height */}
          <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Size &amp; Leading
            </span>

            {/* Font size */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Font Size:</span>
                <span className="font-mono">{fontSize}px</span>
              </div>
              <input
                type="range"
                min={11}
                max={84}
                value={fontSize}
                onChange={(e) => setFontSize(parseInt(e.target.value))}
                className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1 mt-0.5">
                {[12, 14, 16, 20, 24, 28, 36, 48].map((s) => (
                  <button
                    key={s}
                    onClick={() => setFontSize(s)}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                      fontSize === s
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Line height */}
            <div className="flex flex-col gap-1 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Line Height:</span>
                <span className="font-mono">{lineHeight.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min={0.9}
                max={2.0}
                step={0.05}
                value={lineHeight}
                onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
              />
              <div className="flex gap-1">
                {[1.0, 1.15, 1.35, 1.6].map((lh) => (
                  <button
                    key={lh}
                    onClick={() => setLineHeight(lh)}
                    className={`flex-1 py-0.5 text-[10px] font-mono rounded border ${
                      lineHeight === lh
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {lh}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box 3: Tracking & Word Spacing */}
          <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Letter &amp; Word Spacing
            </span>

            {/* Tracking */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Tracking:</span>
                <span className="font-mono">{(letterSpacing * 100).toFixed(1)}%</span>
              </div>
              <input
                type="range"
                min={-0.06}
                max={0.12}
                step={0.005}
                value={letterSpacing}
                onChange={(e) => setLetterSpacing(parseFloat(e.target.value))}
                className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
              />
              <div className="flex flex-wrap gap-1 mt-0.5">
                {[
                  { v: -0.045, l: "-4.5%" },
                  { v: -0.025, l: "-2.5%" },
                  { v: 0.0, l: "0%" },
                  { v: 0.05, l: "+5%" },
                ].map(({ v, l }) => (
                  <button
                    key={l}
                    onClick={() => setLetterSpacing(v)}
                    className={`px-1.5 py-0.5 text-[10px] font-mono rounded border ${
                      letterSpacing === v
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Word Spacing */}
            <div className="flex flex-col gap-1 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Word Spacing:</span>
                <span className="font-mono">{wordSpacing.toFixed(2)}em</span>
              </div>
              <input
                type="range"
                min={-0.08}
                max={0.3}
                step={0.02}
                value={wordSpacing}
                onChange={(e) => setWordSpacing(parseFloat(e.target.value))}
                className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
              />
              <div className="flex gap-1">
                {[
                  { v: -0.04, l: "Tight" },
                  { v: 0.0, l: "Normal" },
                  { v: 0.1, l: "Wide" },
                ].map(({ v, l }) => (
                  <button
                    key={l}
                    onClick={() => setWordSpacing(v)}
                    className={`flex-1 py-0.5 text-[10px] rounded border ${
                      wordSpacing === v
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Box 4: Mutedness & Style */}
          <div className="flex flex-col gap-3 p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Mutedness &amp; Style
            </span>

            {/* Mutedness / Opacity */}
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                <span>Mutedness:</span>
                <span className="font-mono">{Math.round(mutedness * 100)}%</span>
              </div>
              <input
                type="range"
                min={0.15}
                max={1.0}
                step={0.05}
                value={mutedness}
                onChange={(e) => setMutedness(parseFloat(e.target.value))}
                className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
              />
              <div className="flex gap-1">
                {[
                  { v: 1.0, l: "100%" },
                  { v: 0.75, l: "75%" },
                  { v: 0.5, l: "50%" },
                  { v: 0.25, l: "25%" },
                ].map(({ v, l }) => (
                  <button
                    key={l}
                    onClick={() => setMutedness(v)}
                    className={`flex-1 py-0.5 text-[10px] font-mono rounded border ${
                      mutedness === v
                        ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                        : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
            </div>

            {/* Transforms & Toggles */}
            <div className="flex flex-wrap gap-1 pt-1.5 border-t border-zinc-200 dark:border-zinc-800">
              <button
                onClick={() => setTransform(transform === "uppercase" ? "none" : "uppercase")}
                className={`flex-1 py-1 text-xs rounded border transition-colors ${
                  transform === "uppercase"
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                UPPER
              </button>
              <button
                onClick={() => setItalic(!italic)}
                className={`flex-1 py-1 text-xs rounded border italic transition-colors ${
                  italic
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                Italic
              </button>
              <button
                onClick={() => setUnderline(!underline)}
                className={`flex-1 py-1 text-xs rounded border underline transition-colors ${
                  underline
                    ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                    : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                }`}
              >
                Line
              </button>
            </div>

            {/* Alignment */}
            <div className="flex gap-1 pt-1">
              {(["left", "center", "right"] as const).map((a) => (
                <button
                  key={a}
                  onClick={() => setAlign(a)}
                  className={`flex-1 py-0.5 text-[10px] rounded border capitalize transition-colors ${
                    align === a
                      ? "bg-zinc-950 text-white dark:bg-zinc-100 dark:text-zinc-950 font-bold"
                      : "bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800"
                  }`}
                >
                  {a}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

export default TypographyLab;
