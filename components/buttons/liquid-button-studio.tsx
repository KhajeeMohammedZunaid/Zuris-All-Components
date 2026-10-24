"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { LiquidButton, type ElementName, type LiquidButtonSize, elementPalettes } from "./liquid-button";
import { cn } from "@/lib/utils";

const THEMES: { id: ElementName; name: string; color: string }[] = [
  { id: "lava", name: "Lava", color: "#d42a1a" },
  { id: "ocean", name: "Ocean", color: "#1d6fc4" },
  { id: "stone", name: "Stone", color: "#8a5a2b" },
  { id: "sky", name: "Sky", color: "#3f6d96" },
  { id: "obsidian", name: "Obsidian", color: "#1f1f23" },
];

const SIZES: { id: LiquidButtonSize; label: string }[] = [
  { id: "sm", label: "Small" },
  { id: "default", label: "Default" },
  { id: "lg", label: "Large" },
];

export function LiquidButtonStudio() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Studio state matching reference image
  const [element, setElement] = React.useState<ElementName>("lava");
  const [size, setSize] = React.useState<LiquidButtonSize>("lg");
  const [label, setLabel] = React.useState("Get started");
  const [disabled, setDisabled] = React.useState(false);
  const [showCode, setShowCode] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const handleReset = () => {
    setElement("lava");
    setSize("lg");
    setLabel("Get started");
    setDisabled(false);
  };

  const codeSnippet = `<LiquidButton
  element="${element}"
  size="${size}"${disabled ? "\n  disabled" : ""}
>
  ${label || "Button"}
</LiquidButton>`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#f7f8fa] dark:bg-[#0c0d10] text-zinc-950 dark:text-zinc-50 font-['Inter',sans-serif] p-4 sm:p-6 md:p-10 flex flex-col items-center justify-center transition-colors duration-200">
      {/* Top Header Bar */}
      <header className="w-full max-w-4xl mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            <svg
              className="size-4 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Back to Components</span>
          </Link>
          <span className="text-zinc-300 dark:text-zinc-700">/</span>
          <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-zinc-100">
            Liquid Button
          </span>
        </div>

        {/* Theme Toggle Button */}
        {mounted && (
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-xs cursor-pointer"
            aria-label="Toggle theme"
          >
            {resolvedTheme === "dark" ? (
              <>
                <svg className="size-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
                <span>Light</span>
              </>
            ) : (
              <>
                <svg className="size-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Dark</span>
              </>
            )}
          </button>
        )}
      </header>

      {/* Main Studio Frame (Exact layout of reference image) */}
      <div className="w-full max-w-4xl rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 shadow-xl overflow-hidden backdrop-blur-sm">
        {/* Top Preview Canvas */}
        <div className="w-full min-h-[380px] sm:min-h-[420px] bg-white dark:bg-zinc-950/80 flex items-center justify-center p-8 sm:p-12 relative overflow-hidden select-none border-b border-zinc-200/80 dark:border-zinc-800">
          {/* Subtle architectural dot grid background */}
          <div
            className="absolute inset-0 opacity-[0.4] dark:opacity-[0.25] pointer-events-none"
            style={{
              backgroundImage: "radial-gradient(#a1a1aa 0.75px, transparent 0.75px)",
              backgroundSize: "20px 20px",
            }}
          />

          {/* Interactive Centered Liquid Button */}
          <div className="relative z-10 flex flex-col items-center">
            <LiquidButton
              element={element}
              size={size}
              disabled={disabled}
              className="transition-all duration-300 shadow-xl"
            >
              {label || "Button"}
            </LiquidButton>

            {disabled && (
              <span className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                (Disabled state)
              </span>
            )}
          </div>
        </div>

        {/* Bottom Customize Panel */}
        <div className="w-full bg-[#fcfcfd] dark:bg-[#121316] p-5 sm:p-6 flex flex-col gap-4">
          {/* Customize Header with Reset and Code Buttons */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
              Customize
            </h2>

            <div className="flex items-center gap-2">
              {/* Reset Button */}
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border border-zinc-200 dark:border-zinc-700/80 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700/70 text-zinc-700 dark:text-zinc-200 shadow-2xs transition-colors cursor-pointer"
                title="Reset all settings to default"
              >
                <svg
                  className="size-3.5 stroke-current stroke-2 fill-none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Reset</span>
              </button>

              {/* Code Toggle Button */}
              <button
                type="button"
                onClick={() => setShowCode(!showCode)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 hover:bg-zinc-800 dark:hover:bg-zinc-100 shadow-xs transition-colors cursor-pointer"
              >
                <svg
                  className="size-3.5 stroke-current stroke-2 fill-none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                <span>{showCode ? "Hide Code" : "Code"}</span>
              </button>
            </div>
          </div>

          {/* Controls Row 1: Theme, Size, Label */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {/* Box 1: Theme Swatches */}
            <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 rounded-xl px-3.5 py-2.5 shadow-2xs">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Theme
              </span>
              <div className="flex items-center gap-2">
                {THEMES.map((item) => {
                  const isSelected = element === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setElement(item.id)}
                      className={cn(
                        "size-4.5 rounded-full transition-transform active:scale-95 cursor-pointer relative",
                        isSelected && "ring-2 ring-offset-2 ring-zinc-900 dark:ring-white dark:ring-offset-zinc-900 scale-110"
                      )}
                      style={{ backgroundColor: item.color }}
                      title={`${item.name} theme`}
                      aria-label={`${item.name} theme`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Box 2: Size Segmented Control */}
            <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 rounded-xl px-3.5 py-2.5 shadow-2xs">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Size
              </span>
              <div className="inline-flex items-center p-0.5 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/60 dark:border-zinc-700/50">
                {SIZES.map((item) => {
                  const isSelected = size === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSize(item.id)}
                      className={cn(
                        "px-2.5 py-1 text-xs font-medium rounded-md transition-all cursor-pointer",
                        isSelected
                          ? "bg-white dark:bg-zinc-700 text-zinc-950 dark:text-white shadow-2xs"
                          : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                      )}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Box 3: Label Text Input */}
            <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 rounded-xl px-3.5 py-2.5 shadow-2xs">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 shrink-0 mr-3">
                Label
              </span>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Button label"
                className="w-full max-w-[150px] sm:max-w-[160px] text-right sm:text-left text-xs font-medium px-2 py-1 rounded-md border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors"
              />
            </div>
          </div>

          {/* Controls Row 2: Disabled Toggle Switch */}
          <div className="w-full max-w-xs">
            <div className="flex items-center justify-between border border-zinc-200 dark:border-zinc-800/90 bg-white dark:bg-zinc-900/90 rounded-xl px-3.5 py-2.5 shadow-2xs">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Disabled
              </span>
              <button
                type="button"
                role="switch"
                aria-checked={disabled}
                onClick={() => setDisabled(!disabled)}
                className={cn(
                  "relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none",
                  disabled
                    ? "bg-zinc-900 dark:bg-white"
                    : "bg-zinc-300 dark:bg-zinc-700"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block size-4 transform rounded-full bg-white dark:bg-zinc-900 shadow-sm transition duration-200 ease-in-out",
                    disabled ? "translate-x-4 dark:bg-zinc-950" : "translate-x-0"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Expandable Code Box */}
          {showCode && (
            <div className="mt-2 border border-zinc-200 dark:border-zinc-800 rounded-xl bg-zinc-950 text-zinc-100 p-4 text-xs font-mono relative overflow-hidden">
              <div className="flex items-center justify-between mb-2 pb-2 border-b border-zinc-800 text-zinc-400">
                <span>Usage (Base UI)</span>
                <button
                  type="button"
                  onClick={handleCopyCode}
                  className="inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <svg className="size-3.5 stroke-emerald-400 stroke-2 fill-none" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <svg className="size-3.5 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                      </svg>
                      <span>Copy Code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="overflow-x-auto text-zinc-200 whitespace-pre">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LiquidButtonStudio;
