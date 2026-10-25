"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion } from "motion/react";
import {
  StuxButton,
  StuxColorScheme,
  StuxButtonSize,
} from "@/components/buttons/stux-button";
import { cn } from "@/lib/utils";

export default function StuxButtonPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [isGrid, setIsGrid] = React.useState(true);
  const [size, setSize] = React.useState<StuxButtonSize>("default");
  const [colorScheme, setColorScheme] = React.useState<StuxColorScheme>("yellow");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent browser save dialog if user hits Ctrl+S / Cmd+S
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const colors: { key: StuxColorScheme; label: string; hex: string }[] = [
    { key: "yellow", label: "Yellow", hex: "#ffea2f" },
    { key: "lime", label: "Lime", hex: "#d4ff32" },
    { key: "cyan", label: "Cyan", hex: "#00f0ff" },
    { key: "orange", label: "Orange", hex: "#ff5416" },
    { key: "white", label: "White", hex: "#ffffff" },
    { key: "violet", label: "Violet", hex: "#a855f7" },
    { key: "emerald", label: "Emerald", hex: "#10b981" },
  ];

  return (
    <main
      className={cn(
        "min-h-screen w-full flex items-center justify-center p-6 relative select-none overflow-hidden",
        /* Pure CSS theme matching: zero JavaScript-induced black flash on page refresh */
        "bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50",
        isGrid &&
          "bg-[radial-gradient(rgba(0,0,0,0.13)_1px,transparent_1px)] dark:bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:24px_24px]"
      )}
    >
      {/* Center Stage: Pure Button Visual with Framer Motion Layout Container */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 380, damping: 30 }}
        className="flex items-center justify-center z-10"
      >
        <StuxButton size={size} colorScheme={colorScheme} />
      </motion.div>

      {/* Floating Bottom Pill Controls: 100% Theme-Responsive, Zero Ugly Text */}
      <div className="fixed bottom-6 inset-x-0 mx-auto flex items-center justify-center z-50 pointer-events-none px-4">
        <div className="pointer-events-auto inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 shadow-none backdrop-blur-xl text-xs font-sans">
          {/* Color Palette Switcher */}
          <div className="flex items-center gap-1 px-1">
            {colors.map((c) => {
              const active = colorScheme === c.key;
              return (
                <button
                  key={c.key}
                  type="button"
                  title={c.label}
                  onClick={() => setColorScheme(c.key)}
                  className={cn(
                    "w-5 h-5 rounded-full transition-all cursor-pointer border shrink-0 flex items-center justify-center",
                    active
                      ? "scale-125 ring-2 ring-zinc-950 dark:ring-white border-transparent"
                      : "opacity-75 hover:opacity-100 hover:scale-110 border-black/20 dark:border-white/20"
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>

          <span className="w-px h-3.5 mx-0.5 bg-zinc-300 dark:bg-zinc-700" />

          {/* Grid Toggle: Responsive for Both Themes */}
          <button
            type="button"
            onClick={() => setIsGrid((prev) => !prev)}
            className={cn(
              "px-3 py-1.5 rounded-full transition-colors cursor-pointer select-none font-medium text-xs whitespace-nowrap",
              isGrid
                ? "bg-zinc-200/90 dark:bg-zinc-800 text-zinc-950 dark:text-white font-semibold"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            )}
          >
            {isGrid ? "Grid: On" : "Grid: Off"}
          </button>

          <span className="w-px h-3.5 mx-0.5 bg-zinc-300 dark:bg-zinc-700" />

          {/* Framer Motion Animated Size Switcher */}
          <div className="inline-flex items-center gap-1 p-0.5 rounded-full bg-zinc-100 dark:bg-zinc-950/60 border border-zinc-200/60 dark:border-zinc-800/60">
            {(["sm", "default", "lg"] as const).map((s) => {
              const active = size === s;
              return (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSize(s)}
                  className={cn(
                    "relative px-3 py-1 rounded-full transition-colors cursor-pointer select-none font-medium capitalize text-xs",
                    active
                      ? "text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                  )}
                >
                  {active && (
                    <motion.span
                      layoutId="active-size-pill"
                      className="absolute inset-0 rounded-full bg-white dark:bg-zinc-800 shadow-sm"
                      transition={{
                        type: "spring",
                        stiffness: 420,
                        damping: 32,
                      }}
                    />
                  )}
                  <span className="relative z-10">
                    {s === "sm"
                      ? "Small"
                      : s === "default"
                      ? "Good Size"
                      : "Large"}
                  </span>
                </button>
              );
            })}
          </div>

          <span className="w-px h-3.5 mx-0.5 bg-zinc-300 dark:bg-zinc-700" />

          {/* Theme Switcher: Direct next-themes toggle with zero flash */}
          <button
            type="button"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="px-3 py-1.5 rounded-full transition-colors cursor-pointer select-none font-medium text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
          >
            {mounted
              ? resolvedTheme === "dark"
                ? "☀️ Light"
                : "🌙 Dark"
              : "Theme"}
          </button>
        </div>
      </div>
    </main>
  );
}
