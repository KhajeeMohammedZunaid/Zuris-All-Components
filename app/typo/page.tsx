"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

type WeightOption = "default" | "light" | "normal" | "medium" | "semibold" | "bold" | "extrabold";
type FontOption = "inter" | "jakarta";

interface TrackingPreset {
  label: string;
  percent: number; // e.g. -4.5 for -4.5%
  type: "negative" | "neutral" | "positive";
}

export default function TypographyPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  
  // Initial font is Inter (the website's initial font)
  const [activeFont, setActiveFont] = React.useState<FontOption>("inter");
  const [activeWeight, setActiveWeight] = React.useState<WeightOption>("default");
  const [sampleText, setSampleText] = React.useState("The quick brown fox jumps over the lazy dog");

  // Letter spacing state: "default" or numeric percentage (e.g. -4.5 for -4.5% / -0.045em)
  const [activePercent, setActivePercent] = React.useState<number | "default">("default");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const currentFontFamily =
    activeFont === "jakarta"
      ? "'Plus Jakarta Sans', var(--font-jakarta-display), -apple-system, BlinkMacSystemFont, sans-serif"
      : "'Inter', var(--font-sans-inter), -apple-system, BlinkMacSystemFont, sans-serif";

  const getWeightClass = (defaultClass: string) => {
    if (activeWeight === "default") return defaultClass;
    if (activeWeight === "light") return "font-light";
    if (activeWeight === "normal") return "font-normal";
    if (activeWeight === "medium") return "font-medium";
    if (activeWeight === "semibold") return "font-semibold";
    if (activeWeight === "bold") return "font-bold";
    if (activeWeight === "extrabold") return "font-extrabold";
    return defaultClass;
  };

  const getActiveLetterSpacingStyle = (): React.CSSProperties => {
    if (activePercent === "default") {
      return {};
    }
    return { letterSpacing: `${activePercent / 100}em` };
  };

  const getLetterSpacingClass = (defaultClass: string) => {
    if (activePercent !== "default") {
      return "";
    }
    return defaultClass;
  };

  const weights: { key: WeightOption; label: string }[] = [
    { key: "default", label: "Semantic Default" },
    { key: "extrabold", label: "ExtraBold (800)" },
    { key: "bold", label: "Bold (700)" },
    { key: "semibold", label: "SemiBold (600)" },
    { key: "medium", label: "Medium (500)" },
    { key: "normal", label: "Normal (400)" },
    { key: "light", label: "Light (300)" },
  ];

  // Presets including -4.5% and other standard negative/positive percentages
  const trackingPresets: TrackingPreset[] = [
    { label: "-5.0%", percent: -5.0, type: "negative" },
    { label: "-4.5%", percent: -4.5, type: "negative" },
    { label: "-3.0%", percent: -3.0, type: "negative" },
    { label: "-2.5%", percent: -2.5, type: "negative" },
    { label: "-1.5%", percent: -1.5, type: "negative" },
    { label: "0.0%", percent: 0.0, type: "neutral" },
    { label: "+2.0%", percent: 2.0, type: "positive" },
    { label: "+2.5%", percent: 2.5, type: "positive" },
    { label: "+4.5%", percent: 4.5, type: "positive" },
    { label: "+5.0%", percent: 5.0, type: "positive" },
    { label: "+10.0%", percent: 10.0, type: "positive" },
  ];

  const trackingScaleItems = [
    {
      name: "Tighter",
      percent: "-5.0%",
      emValue: "-0.050em",
      tailwind: "tracking-tighter",
      type: "Negative",
      description: "Hero titles, jumbo metrics, display headings (>48px)",
    },
    {
      name: "Display Headline",
      percent: "-4.5%",
      emValue: "-0.045em",
      tailwind: "-[0.045em]",
      type: "Negative",
      description: "Figma -4.5% standard for bold marketing headers & hero titles",
    },
    {
      name: "Tight Headline",
      percent: "-3.0%",
      emValue: "-0.030em",
      tailwind: "-[0.030em]",
      type: "Negative",
      description: "H1–H2 headings, compact card headers",
    },
    {
      name: "Tight",
      percent: "-2.5%",
      emValue: "-0.025em",
      tailwind: "tracking-tight",
      type: "Negative",
      description: "Standard Tailwind tracking-tight for H1–H3 and card titles",
    },
    {
      name: "Snug",
      percent: "-1.5%",
      emValue: "-0.015em",
      tailwind: "-[0.015em]",
      type: "Negative",
      description: "Medium headings (H4, H5) and feature highlights",
    },
    {
      name: "Normal",
      percent: "0.0%",
      emValue: "0.000em",
      tailwind: "tracking-normal",
      type: "Neutral",
      description: "Standard body copy, paragraphs, inputs, controls",
    },
    {
      name: "Wide",
      percent: "+2.5%",
      emValue: "+0.025em",
      tailwind: "tracking-wide",
      type: "Positive",
      description: "Small UI text, buttons, tags, tabular numbers",
    },
    {
      name: "Display Caps",
      percent: "+4.5%",
      emValue: "+0.045em",
      tailwind: "+[0.045em]",
      type: "Positive",
      description: "Figma +4.5% positive tracking for uppercase section titles & badges",
    },
    {
      name: "Wider",
      percent: "+5.0%",
      emValue: "+0.050em",
      tailwind: "tracking-wider",
      type: "Positive",
      description: "Uppercase overlines, section subtitles, navigation",
    },
    {
      name: "Widest",
      percent: "+10.0%",
      emValue: "+0.100em",
      tailwind: "tracking-widest",
      type: "Positive",
      description: "Uppercase badges, category pills, spaced micro-copy",
    },
  ];

  return (
    <div
      id="typo-root"
      className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 p-6 sm:p-10 md:p-14 transition-colors duration-200"
    >
      {/* Scoped font-family rule: Ensures ALL UI text, buttons, controls, labels, and content update dynamically */}
      <style>{`
        #typo-root,
        #typo-root *,
        #typo-root button,
        #typo-root input,
        #typo-root label,
        #typo-root select,
        #typo-root textarea,
        #typo-root a,
        #typo-root p,
        #typo-root h1,
        #typo-root h2,
        #typo-root h3,
        #typo-root h4,
        #typo-root h5,
        #typo-root h6,
        #typo-root span {
          font-family: ${currentFontFamily} !important;
        }
      `}</style>

      <div className="max-w-[1100px] mx-auto flex flex-col gap-10">

        {/* Top Header - Font dynamically updates with activeFont */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-300 dark:border-zinc-700">
          <div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="text-sm font-bold text-zinc-950 dark:text-zinc-50 hover:underline"
              >
                ← Back
              </Link>
              <span className="text-zinc-400 dark:text-zinc-600 font-bold">/</span>
              <h1 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
                Typography Specimen (/typo)
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Active UI &amp; Page Font:
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-950 dark:text-zinc-50">
                {activeFont === "inter" ? "Inter (Initial Font)" : "Plus Jakarta Sans"}
              </span>
              <span className="text-zinc-400 dark:text-zinc-600">·</span>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Tracking:
              </span>
              <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-xs font-bold text-zinc-950 dark:text-zinc-50">
                {activePercent === "default"
                  ? "Semantic Default"
                  : `${activePercent >= 0 ? "+" : ""}${activePercent.toFixed(1)}% (${activePercent >= 0 ? "+" : ""}${(activePercent / 100).toFixed(3)}em)`}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="px-3 py-1.5 rounded border border-zinc-400 dark:border-zinc-600 text-xs font-bold bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800"
            >
              Theme: {mounted ? resolvedTheme : "system"}
            </button>
          </div>
        </div>

        {/* Control Box: Switch font family, weight, letter spacing (% and em), and sample text */}
        <div className="p-4 sm:p-5 rounded border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 flex flex-col gap-4">
          
          {/* 1. Font Family Selector */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                Font Family Selector:
              </span>
              <p className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 mt-0.5">
                Switches the entire UI text and all specimens between Inter and Plus Jakarta Sans
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveFont("inter")}
                className={`px-3.5 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                  activeFont === "inter"
                    ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Inter (Initial Font)
              </button>
              <button
                onClick={() => setActiveFont("jakarta")}
                className={`px-3.5 py-1.5 text-xs rounded border transition-colors cursor-pointer ${
                  activeFont === "jakarta"
                    ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold shadow-sm"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Plus Jakarta Sans
              </button>
            </div>
          </div>

          {/* 2. Letter Spacing (Tracking) with % and Negative/Positive Values */}
          <div className="flex flex-col gap-2.5 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
                  Letter Spacing Percentage (% &amp; em):
                </span>
                <span className="ml-2 text-xs font-bold text-zinc-950 dark:text-zinc-50">
                  {activePercent === "default"
                    ? "Semantic Default"
                    : `${activePercent >= 0 ? "+" : ""}${activePercent.toFixed(1)}% (${activePercent >= 0 ? "+" : ""}${(activePercent / 100).toFixed(3)}em)`}
                </span>
              </div>
              <button
                onClick={() => setActivePercent("default")}
                className="self-start sm:self-auto text-xs font-bold underline text-zinc-950 dark:text-zinc-50 hover:opacity-80 cursor-pointer"
              >
                Reset to Semantic Default
              </button>
            </div>

            {/* Percentage Preset Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              <button
                onClick={() => setActivePercent("default")}
                className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                  activePercent === "default"
                    ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold"
                    : "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                Semantic Default
              </button>

              {trackingPresets.map((preset) => {
                const isSelected = activePercent === preset.percent;
                return (
                  <button
                    key={preset.label}
                    onClick={() => setActivePercent(preset.percent)}
                    className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold"
                        : "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800"
                    }`}
                  >
                    <span>{preset.label}</span>
                    <span
                      className={`text-[10px] px-1 py-0.2 rounded font-mono ${
                        isSelected
                          ? "bg-white/20 dark:bg-black/20 text-white dark:text-zinc-950 font-bold"
                          : preset.type === "negative"
                          ? "bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200 font-bold"
                          : preset.type === "positive"
                          ? "bg-blue-200 dark:bg-blue-900/60 text-blue-950 dark:text-blue-200 font-bold"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50 font-bold"
                      }`}
                    >
                      {(preset.percent / 100).toFixed(3)}em
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Continuous Percentage Slider + Direct Numeric % Input */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
              <label htmlFor="spacing-slider" className="text-xs font-bold text-zinc-950 dark:text-zinc-50 shrink-0">
                Adjust % Slider:
              </label>
              <div className="flex items-center gap-3 flex-1">
                <span className="text-[11px] font-mono font-bold text-zinc-950 dark:text-zinc-50">-8.0%</span>
                <input
                  id="spacing-slider"
                  type="range"
                  min="-8.0"
                  max="15.0"
                  step="0.1"
                  value={activePercent === "default" ? 0 : activePercent}
                  onChange={(e) => setActivePercent(parseFloat(e.target.value))}
                  className="w-full accent-zinc-950 dark:accent-zinc-100 cursor-pointer"
                />
                <span className="text-[11px] font-mono font-bold text-zinc-950 dark:text-zinc-50">+15.0%</span>
              </div>

              {/* Direct Percentage Number Input */}
              <div className="flex items-center gap-1.5 shrink-0">
                <label htmlFor="percent-input" className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                  Direct %:
                </label>
                <div className="flex items-center border border-zinc-300 dark:border-zinc-700 rounded bg-zinc-50 dark:bg-zinc-900 px-2 py-1">
                  <input
                    id="percent-input"
                    type="number"
                    step="0.1"
                    value={activePercent === "default" ? 0 : activePercent}
                    onChange={(e) => {
                      const val = parseFloat(e.target.value);
                      if (!isNaN(val)) {
                        setActivePercent(val);
                      }
                    }}
                    className="w-14 text-xs font-mono font-bold bg-transparent text-zinc-950 dark:text-zinc-50 outline-none"
                  />
                  <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">%</span>
                </div>
                <span className="font-mono text-xs font-bold px-2 py-1 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50">
                  {activePercent === "default"
                    ? "0.000em"
                    : `${(activePercent / 100).toFixed(3)}em`}
                </span>
              </div>
            </div>
          </div>

          {/* 3. Weight Override Buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Weight Override:
            </span>
            <div className="flex flex-wrap items-center gap-1.5">
              {weights.map((w) => (
                <button
                  key={w.key}
                  onClick={() => setActiveWeight(w.key)}
                  className={`px-2.5 py-1 text-xs rounded border transition-colors cursor-pointer ${
                    activeWeight === w.key
                      ? "bg-zinc-950 dark:bg-zinc-100 text-white dark:text-zinc-950 border-zinc-950 dark:border-zinc-100 font-bold"
                      : "bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-300 dark:border-zinc-700 font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-800"
                  }`}
                >
                  {w.label}
                </button>
              ))}
            </div>
          </div>

          {/* 4. Editable Sample Text */}
          <div className="flex items-center gap-3 pt-3 border-t border-zinc-200 dark:border-zinc-800">
            <label htmlFor="sample-input" className="text-xs font-bold text-zinc-950 dark:text-zinc-50 shrink-0">
              Sample Text:
            </label>
            <input
              id="sample-input"
              type="text"
              value={sampleText}
              onChange={(e) => setSampleText(e.target.value)}
              className="w-full text-sm px-3 py-1.5 rounded border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 font-semibold outline-none focus:border-zinc-900 dark:focus:border-zinc-100"
              placeholder="Type test words..."
            />
          </div>
        </div>

        {/* Section 1: Headings (H1 to H6) */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-2 flex items-baseline justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Headings (H1 – H6)
            </h2>
            <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              {activeFont === "inter" ? "Inter" : "Plus Jakarta Sans"}
            </span>
          </div>

          <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">
            
            {/* H1 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h1&gt;
                </span>
                <span>text-5xl (48px) · leading-[1.1] · default tracking -2.5% (-0.025em)</span>
              </div>
              <h1
                style={getActiveLetterSpacingStyle()}
                className={`text-4xl sm:text-5xl leading-[1.1] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-tight")} ${getWeightClass("font-bold")}`}
              >
                {sampleText}
              </h1>
            </div>

            {/* H2 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h2&gt;
                </span>
                <span>text-4xl (36px) · leading-[1.15] · default tracking -2.5% (-0.025em)</span>
              </div>
              <h2
                style={getActiveLetterSpacingStyle()}
                className={`text-3xl sm:text-4xl leading-[1.15] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-tight")} ${getWeightClass("font-bold")}`}
              >
                {sampleText}
              </h2>
            </div>

            {/* H3 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h3&gt;
                </span>
                <span>text-3xl (30px) · leading-[1.2] · default tracking -2.5% (-0.025em)</span>
              </div>
              <h3
                style={getActiveLetterSpacingStyle()}
                className={`text-2xl sm:text-3xl leading-[1.2] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-tight")} ${getWeightClass("font-semibold")}`}
              >
                {sampleText}
              </h3>
            </div>

            {/* H4 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h4&gt;
                </span>
                <span>text-2xl (24px) · leading-[1.25] · default tracking -2.5% (-0.025em)</span>
              </div>
              <h4
                style={getActiveLetterSpacingStyle()}
                className={`text-xl sm:text-2xl leading-[1.25] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-tight")} ${getWeightClass("font-semibold")}`}
              >
                {sampleText}
              </h4>
            </div>

            {/* H5 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h5&gt;
                </span>
                <span>text-xl (20px) · leading-[1.3] · default tracking -2.5% (-0.025em)</span>
              </div>
              <h5
                style={getActiveLetterSpacingStyle()}
                className={`text-lg sm:text-xl leading-[1.3] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-tight")} ${getWeightClass("font-medium")}`}
              >
                {sampleText}
              </h5>
            </div>

            {/* H6 */}
            <div className="py-6 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;h6&gt;
                </span>
                <span>text-base (16px) · leading-[1.4] · default tracking 0.0% (0.000em)</span>
              </div>
              <h6
                style={getActiveLetterSpacingStyle()}
                className={`text-base leading-[1.4] text-zinc-950 dark:text-zinc-50 ${getLetterSpacingClass("tracking-normal")} ${getWeightClass("font-medium")}`}
              >
                {sampleText}
              </h6>
            </div>

          </div>
        </section>

        {/* Section 2: Paragraphs & Body Sizes (No Muted Options) */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-2 flex items-baseline justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Paragraphs &amp; Body Text (&lt;p&gt;)
            </h2>
            <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              {activeFont === "inter" ? "Inter" : "Plus Jakarta Sans"}
            </span>
          </div>

          <div className="flex flex-col divide-y divide-zinc-200 dark:divide-zinc-800">

            {/* p lead */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;p&gt; (Lead)
                </span>
                <span>text-xl (20px) · leading-relaxed · default tracking 0.0% (0.000em)</span>
              </div>
              <p
                style={getActiveLetterSpacingStyle()}
                className={`text-xl leading-relaxed text-zinc-950 dark:text-zinc-50 ${getWeightClass("font-normal")}`}
              >
                {sampleText}. Spend less time on manual logistics and more on strategic growth with autonomous AI workflows.
              </p>
            </div>

            {/* p base / regular */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;p&gt; (Base / Body)
                </span>
                <span>text-base (16px) · leading-normal · default tracking 0.0% (0.000em)</span>
              </div>
              <p
                style={getActiveLetterSpacingStyle()}
                className={`text-base leading-normal text-zinc-950 dark:text-zinc-50 ${getWeightClass("font-normal")}`}
              >
                {sampleText}. Intelligent full-stack systems and intuitive interfaces, crafted to scale seamlessly.
              </p>
            </div>

            {/* p small */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;p&gt; (Small)
                </span>
                <span>text-sm (14px) · leading-normal · default tracking 0.0% (0.000em)</span>
              </div>
              <p
                style={getActiveLetterSpacingStyle()}
                className={`text-sm leading-normal text-zinc-950 dark:text-zinc-50 ${getWeightClass("font-normal")}`}
              >
                {sampleText}. Agents execute multi-step workflows using live tool access, deterministic validation loops, and confidence thresholds.
              </p>
            </div>

            {/* p extra small */}
            <div className="py-5 flex flex-col gap-2">
              <div className="flex items-center gap-3 text-xs text-zinc-950 dark:text-zinc-50 font-bold">
                <span className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-bold text-zinc-950 dark:text-zinc-50">
                  &lt;p&gt; (Caption / XS)
                </span>
                <span>text-xs (12px) · leading-normal · default tracking 0.0% (0.000em)</span>
              </div>
              <p
                style={getActiveLetterSpacingStyle()}
                className={`text-xs leading-normal text-zinc-950 dark:text-zinc-50 ${getWeightClass("font-normal")}`}
              >
                {sampleText}. Available across all enterprise plans with SOC 2 Type II compliance.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: Dedicated Letter Spacing Scale with % (Negative to Positive) */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-2 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Letter Spacing Scale in Percentages (% &amp; em)
            </h2>
            <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              {activeFont === "inter" ? "Inter" : "Plus Jakarta Sans"} · -5.0% (-0.050em) to +10.0% (+0.100em)
            </span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-950 dark:text-zinc-50">
            {trackingScaleItems.map((item) => (
              <div key={item.percent} className="py-5 flex flex-col gap-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        item.type === "Negative"
                          ? "bg-amber-200 dark:bg-amber-900/60 text-amber-950 dark:text-amber-200"
                          : item.type === "Positive"
                          ? "bg-blue-200 dark:bg-blue-900/60 text-blue-950 dark:text-blue-200"
                          : "bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50"
                      }`}
                    >
                      {item.percent}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-950 dark:text-zinc-50">
                      ({item.emValue})
                    </span>
                    <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
                      {item.name}
                    </span>
                    <span className="text-[11px] font-bold px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-950 dark:text-zinc-50">
                      {item.type}
                    </span>
                  </div>
                  <span className="text-xs font-semibold text-zinc-900 dark:text-zinc-100">
                    Recommended: {item.description}
                  </span>
                </div>

                {/* Sentence case preview */}
                <div
                  style={{ letterSpacing: item.emValue.replace("+", "") }}
                  className="text-xl sm:text-2xl font-bold text-zinc-950 dark:text-zinc-50"
                >
                  {sampleText}
                </div>

                {/* All-caps comparison (critical for seeing positive letter spacing utility) */}
                <div className="flex items-center gap-3 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50 bg-zinc-200 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                    UPPERCASE
                  </span>
                  <span
                    style={{ letterSpacing: item.emValue.replace("+", "") }}
                    className="text-xs sm:text-sm font-bold uppercase text-zinc-950 dark:text-zinc-50"
                  >
                    ENTERPRISE AI PLATFORM · SECURE BY DESIGN · HIGH CONCURRENCY
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Active Font Weight Matrix */}
        <section className="flex flex-col gap-6">
          <div className="border-b border-zinc-300 dark:border-zinc-700 pb-2 flex items-baseline justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-950 dark:text-zinc-50">
              Font Weights ({activeFont === "inter" ? "Inter: 300 to 700" : "Plus Jakarta Sans: 400 to 800"})
            </h2>
            <span className="text-xs font-bold text-zinc-950 dark:text-zinc-50">
              {activeFont === "inter" ? "Inter" : "Plus Jakarta Sans"}
            </span>
          </div>

          <div className="grid grid-cols-1 divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-950 dark:text-zinc-50">
            
            {activeFont === "inter" ? (
              <>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Light (300) · font-light
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-light flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Normal (400) · font-normal
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-normal flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Medium (500) · font-medium
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-medium flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    SemiBold (600) · font-semibold
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-semibold flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Bold (700) · font-bold
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-bold flex-1">
                    {sampleText}
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Regular (400) · font-normal
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-normal flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Medium (500) · font-medium
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-medium flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    SemiBold (600) · font-semibold
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-semibold flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    Bold (700) · font-bold
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-bold flex-1">
                    {sampleText}
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                  <div className="w-52 text-xs font-bold shrink-0 text-zinc-950 dark:text-zinc-50">
                    ExtraBold (800) · font-extrabold
                  </div>
                  <div style={getActiveLetterSpacingStyle()} className="text-lg font-extrabold flex-1">
                    {sampleText}
                  </div>
                </div>
              </>
            )}

          </div>
        </section>

      </div>
    </div>
  );
}
