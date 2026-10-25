"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import { TextMorph } from "torph/react";
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
    sample: "Deterministic validation loops with precision.",
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
    sample: "Configure custom typography with instant tactile feedback.",
  },
  h6: {
    size: 15,
    weight: 500,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.95,
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
    sample: "Spend less time on manual logistics and more on strategic velocity with autonomous design systems.",
  },
  "p-base": {
    size: 16,
    weight: 400,
    tracking: 0,
    wordSpacing: 0,
    lineHeight: 1.6,
    mutedness: 0.95,
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
    mutedness: 0.9,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Agents execute multi-step workflows using live tool access and confidence thresholds.",
  },
  "p-caption": {
    size: 12,
    weight: 400,
    tracking: 0.01,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.85,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "Available across all enterprise plans with SOC 2 Type II compliance.",
  },
  blockquote: {
    size: 20,
    weight: 400,
    tracking: -0.015,
    wordSpacing: 0.02,
    lineHeight: 1.4,
    mutedness: 0.95,
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
    mutedness: 0.9,
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
    sample: "const studio = new TypographyEngine({ zeroJumping: true });",
  },
  small: {
    size: 12,
    weight: 400,
    tracking: 0.01,
    wordSpacing: 0,
    lineHeight: 1.4,
    mutedness: 0.85,
    italic: false,
    transform: "none",
    font: "inter",
    sample: "SOC 2 Type II certified. All rights reserved © 2026.",
  },
};

const TAG_GROUPS = [
  {
    category: "Headings",
    items: [
      { id: "h1", label: "H1" },
      { id: "h2", label: "H2" },
      { id: "h3", label: "H3" },
      { id: "h4", label: "H4" },
      { id: "h5", label: "H5" },
      { id: "h6", label: "H6" },
    ] as const,
  },
  {
    category: "Body",
    items: [
      { id: "p-lead", label: "Lead" },
      { id: "p-base", label: "Base" },
      { id: "p-small", label: "Small" },
      { id: "p-caption", label: "Caption" },
    ] as const,
  },
  {
    category: "Semantic",
    items: [
      { id: "blockquote", label: "Quote" },
      { id: "code", label: "Code" },
      { id: "label", label: "Label" },
      { id: "small", label: "Legal" },
    ] as const,
  },
];

interface ContinuousSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  stepDelta: number;
  unit: string;
  displayValue: string;
  onChange: (val: number) => void;
  allowDirectInput?: boolean;
}

function ContinuousSlider({
  label,
  value,
  min,
  max,
  step,
  stepDelta,
  unit,
  displayValue,
  onChange,
}: ContinuousSliderProps) {
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  const handleStepDown = () => {
    const nextVal = Math.max(min, Number((value - stepDelta).toFixed(4)));
    onChange(nextVal);
  };

  const handleStepUp = () => {
    const nextVal = Math.min(max, Number((value + stepDelta).toFixed(4)));
    onChange(nextVal);
  };

  return (
    <div className="flex flex-col gap-1.5 select-none">
      {/* Label and High-Contrast Numerical Readout */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="font-semibold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
          {label}
        </span>
        <div className="flex items-center gap-1">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const val = parseFloat(e.target.value);
              if (!isNaN(val)) {
                onChange(Math.min(max, Math.max(min, val)));
              }
            }}
            className="w-16 px-1.5 py-0.5 text-right font-mono text-xs font-bold bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white rounded-[4px] outline-none focus:border-zinc-950 dark:focus:border-zinc-300"
          />
          <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
            {unit}
          </span>
          {displayValue && (
            <span className="text-[10px] text-zinc-600 dark:text-zinc-400 pl-1 font-sans">
              ({displayValue})
            </span>
          )}
        </div>
      </div>

      {/* Track & Stepper Controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleStepDown}
          title={`Decrease by ${stepDelta}`}
          className="size-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-950 dark:text-white font-mono text-sm font-bold transition-colors shrink-0 cursor-pointer rounded-[4px] active:scale-[0.96]"
        >
          –
        </button>

        {/* Continuous Range Track */}
        <div className="relative flex-1 h-6 flex items-center">
          {/* Base Track */}
          <div className="absolute inset-x-0 h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full pointer-events-none" />

          {/* Active Progress Fill */}
          <div
            className="absolute left-0 h-1.5 bg-zinc-950 dark:bg-white rounded-full pointer-events-none transition-[width] duration-75"
            style={{ width: `${percentage}%` }}
          />

          {/* Range Input with Smooth Precision Thumb */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => onChange(parseFloat(e.target.value))}
            className="relative z-10 w-full h-6 bg-transparent appearance-none cursor-ew-resize outline-none m-0 p-0
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3.5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:bg-zinc-950
              dark:[&::-webkit-slider-thumb]:bg-white
              [&::-webkit-slider-thumb]:border
              [&::-webkit-slider-thumb]:border-zinc-950
              dark:[&::-webkit-slider-thumb]:border-white
              [&::-webkit-slider-thumb]:rounded-[3px]
              [&::-webkit-slider-thumb]:cursor-ew-resize
              [&::-webkit-slider-thumb]:shadow-none
              [&::-moz-range-thumb]:w-3.5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:bg-zinc-950
              dark:[&::-moz-range-thumb]:bg-white
              [&::-moz-range-thumb]:border
              [&::-moz-range-thumb]:border-zinc-950
              dark:[&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:rounded-[3px]
              [&::-moz-range-thumb]:cursor-ew-resize
              [&::-moz-range-thumb]:shadow-none"
          />
        </div>

        <button
          type="button"
          onClick={handleStepUp}
          title={`Increase by ${stepDelta}`}
          className="size-7 flex items-center justify-center border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-950 dark:text-white font-mono text-sm font-bold transition-colors shrink-0 cursor-pointer rounded-[4px] active:scale-[0.96]"
        >
          +
        </button>
      </div>
    </div>
  );
}

export function TypographyLab() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [tag, setTag] = React.useState<TypoTag>("h2");
  const [font, setFont] = React.useState<"inter" | "jakarta" | "mono" | "serif">("inter");
  const [fontSize, setFontSize] = React.useState<number>(36);
  const [fontWeight, setFontWeight] = React.useState<number>(700);
  const [letterSpacing, setLetterSpacing] = React.useState<number>(-0.03); // in em
  const [wordSpacing, setWordSpacing] = React.useState<number>(0); // in em
  const [lineHeight, setLineHeight] = React.useState<number>(1.15);
  const [mutedness, setMutedness] = React.useState<number>(1.0); // opacity (default 100%)
  const [transform, setTransform] = React.useState<"none" | "uppercase" | "lowercase" | "capitalize">("none");
  const [italic, setItalic] = React.useState<boolean>(false);
  const [underline, setUnderline] = React.useState<boolean>(false);
  const [strikethrough, setStrikethrough] = React.useState<boolean>(false);
  const [align, setAlign] = React.useState<"left" | "center" | "right">("left");
  const [sampleText, setSampleText] = React.useState<string>(
    "Crafted to infuse momentum on your brain."
  );
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

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

  const resetCurrentTag = () => {
    handleTagChange(tag);
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

  const computedStyle: React.CSSProperties = {
    fontFamily: getFontFamily(),
    fontSize: `${fontSize}px`,
    fontWeight,
    letterSpacing: `${letterSpacing}em`,
    wordSpacing: `${wordSpacing}em`,
    lineHeight,
    opacity: mutedness,
    color: "currentColor",
    textTransform: transform,
    fontStyle: italic ? "italic" : "normal",
    textDecoration: [
      underline ? "underline" : null,
      strikethrough ? "line-through" : null,
    ]
      .filter(Boolean)
      .join(" ") || "none",
    textAlign: align,
  };

  const renderedTag = tag.startsWith("p-") ? "p" : tag;

  // Generate clean Tailwind string
  const getTailwindClasses = () => {
    const parts = [
      `text-[${fontSize}px]`,
      `font-[${fontWeight}]`,
      letterSpacing !== 0 ? `tracking-[${letterSpacing}em]` : "tracking-normal",
      `leading-[${lineHeight}]`,
    ];
    if (wordSpacing !== 0) parts.push(`[word-spacing:${wordSpacing}em]`);
    if (mutedness < 1) parts.push(`opacity-[${Math.round(mutedness * 100)}%]`);
    if (transform === "uppercase") parts.push("uppercase");
    if (transform === "lowercase") parts.push("lowercase");
    if (transform === "capitalize") parts.push("capitalize");
    if (italic) parts.push("italic");
    if (underline) parts.push("underline");
    if (strikethrough) parts.push("line-through");
    if (align === "center") parts.push("text-center");
    if (align === "right") parts.push("text-right");
    return parts.join(" ");
  };

  // Generate CSS string
  const getCssRules = () => {
    return [
      `font-size: ${fontSize}px;`,
      `font-weight: ${fontWeight};`,
      `letter-spacing: ${letterSpacing}em;`,
      `line-height: ${lineHeight};`,
      wordSpacing !== 0 ? `word-spacing: ${wordSpacing}em;` : null,
      mutedness < 1 ? `opacity: ${mutedness};` : null,
      transform !== "none" ? `text-transform: ${transform};` : null,
      italic ? "font-style: italic;" : null,
      underline && strikethrough
        ? "text-decoration: underline line-through;"
        : underline
        ? "text-decoration: underline;"
        : strikethrough
        ? "text-decoration: line-through;"
        : null,
      align !== "left" ? `text-align: ${align};` : null,
    ]
      .filter(Boolean)
      .join(" ");
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  return (
    <div className="w-full flex flex-col gap-3 font-sans select-none">
      {/* 1. TOP CONTROL BAR (Zero Drop Shadows, Refined Smooth Corners) */}
      <div className="flex flex-wrap items-center justify-between gap-2.5 p-2 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10]">
        {/* Left: Navigation & Active Element Badge */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="text-xs font-mono font-bold px-2.5 py-1 rounded-[5px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors"
          >
            ← BACK
          </Link>

          <span className="w-px h-4 bg-zinc-200 dark:border-zinc-800" />

          <div className="flex items-center gap-1.5 px-2 py-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-bold text-zinc-950 dark:text-white">
              &lt;{renderedTag}&gt;
            </span>
            {tag.startsWith("p-") && (
              <span className="text-[10px] uppercase font-bold text-zinc-600 dark:text-zinc-300">
                {tag.replace("p-", "")}
              </span>
            )}
          </div>
        </div>

        {/* Center: Segmented Tag Selector with Framer Motion Spring Pill */}
        <div className="flex flex-wrap items-center gap-1 p-1 rounded-[5px] bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs">
          {TAG_GROUPS.map((group, gIdx) => (
            <React.Fragment key={group.category}>
              {gIdx > 0 && (
                <span className="w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 mx-1" />
              )}
              {group.items.map((t) => {
                const active = tag === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => handleTagChange(t.id as TypoTag)}
                    className={cn(
                      "relative px-2.5 py-1 rounded-[4px] text-xs font-mono font-medium transition-colors cursor-pointer shrink-0 select-none",
                      active
                        ? "text-white dark:text-zinc-950 font-bold"
                        : "text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-tag-pill"
                        className="absolute inset-0 rounded-[4px] bg-zinc-950 dark:bg-white -z-0"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{t.label}</span>
                  </button>
                );
              })}
            </React.Fragment>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-1.5 text-xs">
          <button
            type="button"
            title="Reset this tag to default values"
            onClick={resetCurrentTag}
            className="px-2.5 py-1 rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer active:scale-[0.97]"
          >
            RESET
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(getTailwindClasses(), "tw")}
            className="px-2.5 py-1 rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer active:scale-[0.97]"
          >
            {copiedKey === "tw" ? "✓ COPIED TW" : "COPY TW"}
          </button>

          <button
            type="button"
            onClick={() => copyToClipboard(getCssRules(), "css")}
            className="px-2.5 py-1 rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 font-mono text-xs font-bold text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer active:scale-[0.97]"
          >
            {copiedKey === "css" ? "✓ COPIED CSS" : "COPY CSS"}
          </button>

          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="size-7 flex items-center justify-center rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 transition-colors cursor-pointer"
            title="Toggle theme"
          >
            {mounted ? (resolvedTheme === "dark" ? "☀️" : "🌙") : "·"}
          </button>
        </div>
      </div>

      {/* 2. DEDICATED FULL-WIDTH EDIT TEXT BAR (Write your own text seamlessly) */}
      <div className="flex items-center gap-2 px-3 py-2 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10]">
        <span className="text-xs font-mono font-bold text-zinc-950 dark:text-white uppercase tracking-wider shrink-0">
          TYPE TEXT:
        </span>
        <input
          type="text"
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Type any custom sentence, headline, or paragraph to preview..."
          className="flex-1 text-sm font-medium bg-transparent border-none text-zinc-950 dark:text-white outline-none placeholder:text-zinc-400"
        />
        {sampleText !== TAG_DEFAULTS[tag].sample && (
          <button
            type="button"
            onClick={() => setSampleText(TAG_DEFAULTS[tag].sample)}
            className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-[4px] border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            Reset Text
          </button>
        )}
      </div>

      {/* 3. LIVE PREVIEW CANVAS WITH TORPH TEXTMORPH & ZERO SCROLL JUMPING */}
      <div className="relative rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] p-5 flex flex-col justify-between h-[270px] sm:h-[290px] overflow-hidden">
        {/* Top High-Contrast Telemetry Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80 font-mono text-xs text-zinc-900 dark:text-zinc-100 shrink-0 select-none">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-zinc-950 dark:text-white uppercase">
              {renderedTag}
            </span>
            <span>/</span>
            <span className="capitalize">{font}</span>
            <span>/</span>
            <span>{fontSize}px</span>
            <span>/</span>
            <span>w{fontWeight}</span>
            <span>/</span>
            <span>{(letterSpacing * 100).toFixed(1)}% track</span>
            <span>/</span>
            <span>{lineHeight.toFixed(2)}x lead</span>
            {wordSpacing !== 0 && (
              <>
                <span>/</span>
                <span>{wordSpacing > 0 ? `+${wordSpacing}em` : `${wordSpacing}em`} ws</span>
              </>
            )}
            {mutedness < 1 && (
              <>
                <span>/</span>
                <span>{Math.round(mutedness * 100)}% op</span>
              </>
            )}
          </div>


        </div>

        {/* Scroll-Contained Canvas with TORPH TextMorph */}
        <div className="flex-1 w-full flex items-center overflow-y-auto py-2 pr-1 select-none">
          <TextMorph
            as={renderedTag as any}
            style={computedStyle}
            className={cn(
              "w-full break-words outline-none m-0 select-none",
              tag === "blockquote" &&
                "border-l-3 border-zinc-500 dark:border-zinc-400 pl-4 italic",
              tag === "code" &&
                "bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 font-mono inline-block rounded-[4px] border border-zinc-200 dark:border-zinc-800"
            )}
          >
            {sampleText}
          </TextMorph>
        </div>

        {/* Bottom Tag Defaults Hint */}
        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between font-mono text-[11px] text-zinc-700 dark:text-zinc-300 shrink-0">
          <span>Active Tag: &lt;{renderedTag}&gt; ({tag})</span>
          <span>Zero Scroll Jumping Guarantee</span>
        </div>
      </div>

      {/* 4. REVAMPED SLIDERS & BLOCKS (CONTINUOUS, HIGH-CONTRAST 90%+, ZERO SHADOWS) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
        
        {/* BLOCK 01: TYPEFACE & WEIGHT */}
        <div className="p-3.5 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 font-mono text-xs select-none">
            <span className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <span className="text-zinc-800 dark:text-zinc-200">[ 01 ]</span>
              TYPEFACE &amp; WEIGHT
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold uppercase">{font} · w{fontWeight}</span>
          </div>

          {/* Font Family Segmented Tabs with Framer Motion Spring Pill */}
          <div className="grid grid-cols-2 gap-1 select-none">
            {(["inter", "jakarta", "mono", "serif"] as const).map((f) => {
              const active = font === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFont(f)}
                  className={cn(
                    "relative py-1.5 px-2.5 rounded-[5px] border text-xs capitalize transition-colors cursor-pointer",
                    active
                      ? "text-white dark:text-zinc-950 font-bold border-zinc-950 dark:border-white"
                      : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="active-font-pill"
                      className="absolute inset-0 rounded-[5px] bg-zinc-950 dark:bg-white -z-0"
                      transition={{ type: "spring", stiffness: 500, damping: 35 }}
                    />
                  )}
                  <div className="relative z-10 flex items-center justify-between">
                    <span>{f === "jakarta" ? "Jakarta" : f}</span>
                    <span className="font-mono text-[10px] font-bold opacity-80">Aa</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Continuous Weight Slider (User can choose ANY weight 100 - 900) */}
          <div className="pt-1 flex flex-col gap-2">
            <ContinuousSlider
              label="Font Weight"
              value={fontWeight}
              min={100}
              max={900}
              step={10}
              stepDelta={100}
              unit=""
              displayValue={
                fontWeight >= 800
                  ? "Black"
                  : fontWeight >= 700
                  ? "Bold"
                  : fontWeight >= 600
                  ? "Semi"
                  : fontWeight >= 500
                  ? "Medium"
                  : fontWeight >= 400
                  ? "Regular"
                  : "Light"
              }
              onChange={setFontWeight}
            />

            {/* Quick Weight Steppers */}
            <div className="grid grid-cols-7 gap-1 font-mono text-[11px] select-none pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
              {[300, 400, 500, 600, 700, 800, 900].map((w) => {
                const active = fontWeight === w;
                return (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setFontWeight(w)}
                    className={cn(
                      "relative py-1 rounded-[4px] border text-center transition-colors cursor-pointer",
                      active
                        ? "text-white dark:text-zinc-950 font-bold border-zinc-950 dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="active-weight-chip"
                        className="absolute inset-0 rounded-[4px] bg-zinc-950 dark:bg-white -z-0"
                        transition={{ type: "spring", stiffness: 500, damping: 35 }}
                      />
                    )}
                    <span className="relative z-10">{w}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BLOCK 02: SCALE & LEADING */}
        <div className="p-3.5 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 font-mono text-xs select-none">
            <span className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <span className="text-zinc-800 dark:text-zinc-200">[ 02 ]</span>
              SCALE &amp; LEADING
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{fontSize}px / {lineHeight.toFixed(2)}x</span>
          </div>

          {/* Continuous Font Size Slider (Continuous: 10px to 120px) */}
          <ContinuousSlider
            label="Font Size"
            value={fontSize}
            min={10}
            max={120}
            step={1}
            stepDelta={1}
            unit="px"
            displayValue={`${fontSize}px`}
            onChange={setFontSize}
          />

          {/* Continuous Line Height Slider (Continuous: 0.85 to 2.50) */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <ContinuousSlider
              label="Line Height (Leading)"
              value={lineHeight}
              min={0.85}
              max={2.5}
              step={0.01}
              stepDelta={0.05}
              unit="x"
              displayValue={`${(lineHeight * fontSize).toFixed(0)}px`}
              onChange={(val) => setLineHeight(Number(val.toFixed(2)))}
            />
          </div>
        </div>

        {/* BLOCK 03: KERNING & WORD SPACING */}
        <div className="p-3.5 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 font-mono text-xs select-none">
            <span className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <span className="text-zinc-800 dark:text-zinc-200">[ 03 ]</span>
              KERNING &amp; SPACING
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{(letterSpacing * 100).toFixed(1)}% / {wordSpacing.toFixed(2)}em</span>
          </div>

          {/* Continuous Letter Spacing Slider (Continuous: -0.100em to +0.250em) */}
          <ContinuousSlider
            label="Letter Spacing (Tracking)"
            value={Number((letterSpacing * 100).toFixed(2))}
            min={-10.0}
            max={25.0}
            step={0.1}
            stepDelta={0.5}
            unit="%"
            displayValue={`${letterSpacing.toFixed(3)}em`}
            onChange={(val) => setLetterSpacing(Number((val / 100).toFixed(4)))}
          />

          {/* Continuous Word Spacing Slider (Continuous: -0.10em to +0.50em) */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80">
            <ContinuousSlider
              label="Word Spacing (Rhythm)"
              value={Number(wordSpacing.toFixed(2))}
              min={-0.1}
              max={0.5}
              step={0.01}
              stepDelta={0.02}
              unit="em"
              displayValue={`${wordSpacing > 0 ? "+" : ""}${wordSpacing.toFixed(2)}em`}
              onChange={(val) => setWordSpacing(Number(val.toFixed(3)))}
            />
          </div>
        </div>

        {/* BLOCK 04: SURFACE & FORMAT (Colors removed, continuous opacity, case, align, modifiers) */}
        <div className="p-3.5 rounded-[6px] border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#0c0d10] flex flex-col gap-3">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-800/80 font-mono text-xs select-none">
            <span className="font-bold text-zinc-950 dark:text-white flex items-center gap-1.5">
              <span className="text-zinc-800 dark:text-zinc-200">[ 04 ]</span>
              SURFACE &amp; FORMAT
            </span>
            <span className="text-zinc-900 dark:text-zinc-100 font-bold">{Math.round(mutedness * 100)}% · {transform}</span>
          </div>

          {/* Continuous Opacity Slider (Continuous: 10% to 100%) */}
          <ContinuousSlider
            label="Opacity (Mutedness)"
            value={Math.round(mutedness * 100)}
            min={10}
            max={100}
            step={1}
            stepDelta={5}
            unit="%"
            displayValue={`${Math.round(mutedness * 100)}%`}
            onChange={(val) => setMutedness(Number((val / 100).toFixed(2)))}
          />

          {/* Transform & Alignment & Modifiers */}
          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col gap-2 select-none">
            {/* Case Transform (Framer Motion spring switch) */}
            <div className="flex flex-col gap-1">
              <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                Case Transform
              </span>
              <div className="grid grid-cols-4 gap-1 font-mono text-[11px]">
                {(["none", "uppercase", "lowercase", "capitalize"] as const).map((tr) => {
                  const active = transform === tr;
                  return (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => setTransform(tr)}
                      className={cn(
                        "relative py-1 rounded-[4px] border text-center transition-colors cursor-pointer",
                        active
                          ? "text-white dark:text-zinc-950 font-bold border-zinc-950 dark:border-white"
                          : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                      )}
                    >
                      {active && (
                        <motion.span
                          layoutId="active-transform-pill"
                          className="absolute inset-0 rounded-[4px] bg-zinc-950 dark:bg-white -z-0"
                          transition={{ type: "spring", stiffness: 500, damping: 35 }}
                        />
                      )}
                      <span className="relative z-10">
                        {tr === "none" ? "Norm" : tr === "uppercase" ? "UPPER" : tr === "lowercase" ? "lower" : "Cap"}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Align & Modifiers Row */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              {/* Text Align (Framer Motion spring switch) */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                  Alignment
                </span>
                <div className="grid grid-cols-3 gap-1 font-mono text-[11px]">
                  {(["left", "center", "right"] as const).map((a) => {
                    const active = align === a;
                    return (
                      <button
                        key={a}
                        type="button"
                        onClick={() => setAlign(a)}
                        className={cn(
                          "relative py-1 rounded-[4px] border text-center capitalize transition-colors cursor-pointer",
                          active
                            ? "text-white dark:text-zinc-950 font-bold border-zinc-950 dark:border-white"
                            : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                        )}
                      >
                        {active && (
                          <motion.span
                            layoutId="active-align-pill"
                            className="absolute inset-0 rounded-[4px] bg-zinc-950 dark:bg-white -z-0"
                            transition={{ type: "spring", stiffness: 500, damping: 35 }}
                          />
                        )}
                        <span className="relative z-10">
                          {a === "left" ? "L" : a === "center" ? "C" : "R"}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Modifiers (Italic, Underline, Strikethrough) */}
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-mono font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-wide">
                  Style
                </span>
                <div className="grid grid-cols-3 gap-1 font-mono text-[11px]">
                  <button
                    type="button"
                    onClick={() => setItalic(!italic)}
                    className={cn(
                      "py-1 rounded-[4px] border text-center italic transition-colors cursor-pointer font-bold",
                      italic
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                    )}
                  >
                    I
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnderline(!underline)}
                    className={cn(
                      "py-1 rounded-[4px] border text-center underline transition-colors cursor-pointer font-bold",
                      underline
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                    )}
                  >
                    U
                  </button>
                  <button
                    type="button"
                    onClick={() => setStrikethrough(!strikethrough)}
                    className={cn(
                      "py-1 rounded-[4px] border text-center line-through transition-colors cursor-pointer font-bold",
                      strikethrough
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                        : "border-zinc-200 dark:border-zinc-800 text-zinc-800 dark:text-zinc-200 hover:text-zinc-950 dark:hover:text-white bg-zinc-50 dark:bg-zinc-900/60"
                    )}
                  >
                    S
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default TypographyLab;
