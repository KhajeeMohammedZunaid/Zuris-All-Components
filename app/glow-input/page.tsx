"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import {
  GlowInput,
  type GlowColorVariant,
  type GlowIntensity,
  type GlowTrigger,
  type GlowSpeed,
} from "@/components/glow-input";
import { cn } from "@/lib/utils";

type ControlTab = "color" | "intensity" | "trigger" | "speed";

const TABS: { id: ControlTab; label: string }[] = [
  { id: "color", label: "Palette" },
  { id: "intensity", label: "Glow" },
  { id: "trigger", label: "Trigger" },
  { id: "speed", label: "Speed" },
];

const COLOR_OPTIONS: { id: GlowColorVariant; label: string; dot: string }[] = [
  {
    id: "colorful",
    label: "Colorful",
    dot: "linear-gradient(135deg, #3b82f6, #ec4899, #eab308)",
  },
  {
    id: "sunset",
    label: "Sunset",
    dot: "linear-gradient(135deg, #f97316, #ef4444, #eab308)",
  },
  {
    id: "ocean",
    label: "Ocean",
    dot: "linear-gradient(135deg, #06b6d4, #3b82f6, #6366f1)",
  },
  {
    id: "candy",
    label: "Candy",
    dot: "linear-gradient(135deg, #ec4899, #a855f7, #f43f5e)",
  },
  {
    id: "ice",
    label: "Ice",
    dot: "linear-gradient(135deg, #38bdf8, #818cf8, #c084fc)",
  },
  {
    id: "forest",
    label: "Forest",
    dot: "linear-gradient(135deg, #10b981, #14b8a6, #22c55e)",
  },
  {
    id: "gold",
    label: "Gold",
    dot: "linear-gradient(135deg, #f59e0b, #eab308, #d97706)",
  },
];

const INTENSITY_OPTIONS: { id: GlowIntensity; label: string; desc: string }[] = [
  { id: "subtle", label: "Subtle", desc: "Gentle soft halo" },
  { id: "balanced", label: "Balanced", desc: "Calibrated glow" },
  { id: "vibrant", label: "Vibrant", desc: "Deep rich contrast" },
];

const TRIGGER_OPTIONS: { id: GlowTrigger; label: string; desc: string }[] = [
  { id: "interaction", label: "Interact", desc: "Hover or click" },
  { id: "focus", label: "Focus Only", desc: "Active typing only" },
  { id: "always", label: "Always On", desc: "Continuous perimeter" },
];

const SPEED_OPTIONS: { id: GlowSpeed; label: string; desc: string }[] = [
  { id: "slow", label: "Relaxed", desc: "8s slow loop" },
  { id: "normal", label: "Normal", desc: "5s balanced cadence" },
  { id: "fast", label: "Rapid", desc: "2.8s dynamic velocity" },
];

export default function GlowInputPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Studio customization states
  const [glowColor, setGlowColor] = React.useState<GlowColorVariant>("colorful");
  const [glowIntensity, setGlowIntensity] = React.useState<GlowIntensity>("balanced");
  const [glowTrigger, setGlowTrigger] = React.useState<GlowTrigger>("interaction");
  const [glowSpeed, setGlowSpeed] = React.useState<GlowSpeed>("normal");
  const [activeTab, setActiveTab] = React.useState<ControlTab>("color");

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark");
  };

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-between px-4 py-12 sm:py-16 md:py-20 bg-zinc-100 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 transition-colors font-sans">
      {/* Top Bar with High-Contrast Theme Toggle */}
      <header className="w-full max-w-xl flex items-center justify-end">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-normal rounded-full bg-white dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-700 text-zinc-950 dark:text-zinc-50 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
        >
          {mounted ? (isDark ? "🌙 Dark" : "☀ Light") : "Theme"}
        </button>
      </header>

      {/* Main Showcase Stage */}
      <section className="w-full max-w-xl my-auto py-8 sm:py-12 flex flex-col items-center justify-center">
        <div className="w-full">
          <GlowInput
            glowColor={glowColor}
            glowIntensity={glowIntensity}
            glowTrigger={glowTrigger}
            glowSpeed={glowSpeed}
            placeholder="Ask anything..."
            onSend={(text) => {
              console.log("Submitted:", text);
            }}
          />
        </div>
      </section>

      {/* Flat Tabs Controls - High Contrast, Zero Mutedness, Smooth Height Resizing */}
      <footer className="w-full max-w-xl mt-6 sm:mt-10">
        <motion.div
          layout
          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="w-full rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-700 p-3 sm:p-4 flex flex-col gap-3 transition-colors shadow-none"
        >
          {/* Main Tab Category Pill Bar */}
          <div className="inline-flex w-full items-center p-1 rounded-xl bg-zinc-200/90 dark:bg-zinc-950 border border-zinc-350 dark:border-zinc-800 gap-1">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex-1 py-1.5 px-2 rounded-lg text-xs font-normal transition-colors cursor-pointer text-center select-none",
                    active
                      ? "text-zinc-950 dark:text-white"
                      : "text-zinc-900 hover:text-black dark:text-zinc-100 dark:hover:text-white"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="active-tab-pill"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Options Container with Smooth Layout Resizing */}
          <motion.div
            layout
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center justify-center overflow-hidden"
          >
            <AnimatePresence mode="wait" initial={false}>
              {/* Palette / Colors Tab (Mono variant completely removed) */}
              {activeTab === "color" && (
                <motion.div
                  key="tab-color"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="flex flex-wrap items-center justify-center gap-1.5 w-full py-1"
                >
                  {COLOR_OPTIONS.map((c) => {
                    const active = glowColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setGlowColor(c.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-normal cursor-pointer transition-colors border",
                          active
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-transparent"
                            : "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        )}
                      >
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ background: c.dot }}
                        />
                        <span>{c.label}</span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Intensity Tab */}
              {activeTab === "intensity" && (
                <motion.div
                  key="tab-intensity"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="grid grid-cols-3 gap-2 w-full py-1"
                >
                  {INTENSITY_OPTIONS.map((item) => {
                    const active = glowIntensity === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowIntensity(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-2 px-2 rounded-xl text-center cursor-pointer transition-colors border",
                          active
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-transparent"
                            : "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        )}
                      >
                        <span className="text-xs font-normal">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] font-normal mt-0.5",
                            active
                              ? "text-zinc-200 dark:text-zinc-800"
                              : "text-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          {item.desc}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Trigger Tab */}
              {activeTab === "trigger" && (
                <motion.div
                  key="tab-trigger"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="grid grid-cols-3 gap-2 w-full py-1"
                >
                  {TRIGGER_OPTIONS.map((item) => {
                    const active = glowTrigger === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowTrigger(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-2 px-2 rounded-xl text-center cursor-pointer transition-colors border",
                          active
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-transparent"
                            : "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        )}
                      >
                        <span className="text-xs font-normal">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] font-normal mt-0.5",
                            active
                              ? "text-zinc-200 dark:text-zinc-800"
                              : "text-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          {item.desc}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Speed Tab */}
              {activeTab === "speed" && (
                <motion.div
                  key="tab-speed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="grid grid-cols-3 gap-2 w-full py-1"
                >
                  {SPEED_OPTIONS.map((item) => {
                    const active = glowSpeed === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowSpeed(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-2 px-2 rounded-xl text-center cursor-pointer transition-colors border",
                          active
                            ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-transparent"
                            : "bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 border-zinc-400 dark:border-zinc-700 hover:bg-zinc-200 dark:hover:bg-zinc-800"
                        )}
                      >
                        <span className="text-xs font-normal">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] font-normal mt-0.5",
                            active
                              ? "text-zinc-200 dark:text-zinc-800"
                              : "text-zinc-800 dark:text-zinc-200"
                          )}
                        >
                          {item.desc}
                        </span>
                      </button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </footer>
    </main>
  );
}
