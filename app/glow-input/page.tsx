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
  {
    id: "mono",
    label: "Mono",
    dot: "linear-gradient(135deg, #9ca3af, #6b7280, #374151)",
  },
];

const INTENSITY_OPTIONS: { id: GlowIntensity; label: string; desc: string }[] = [
  { id: "subtle", label: "Subtle", desc: "Gentle soft halo" },
  { id: "balanced", label: "Balanced", desc: "Standard calibrated glow" },
  { id: "vibrant", label: "Vibrant", desc: "Deep rich contrast" },
];

const TRIGGER_OPTIONS: { id: GlowTrigger; label: string; desc: string }[] = [
  { id: "interaction", label: "Interact", desc: "Hover or click" },
  { id: "focus", label: "Focus Only", desc: "Active typing only" },
  { id: "always", label: "Always On", desc: "Continuous beam" },
];

const SPEED_OPTIONS: { id: GlowSpeed; label: string; desc: string }[] = [
  { id: "slow", label: "Relaxed", desc: "8s slow loop" },
  { id: "normal", label: "Normal", desc: "5s balanced cadence" },
  { id: "fast", label: "Rapid", desc: "2.8s quick velocity" },
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

  const tabs: { id: ControlTab; label: string }[] = [
    { id: "color", label: "Palette" },
    { id: "intensity", label: "Glow" },
    { id: "trigger", label: "Trigger" },
    { id: "speed", label: "Speed" },
  ];

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-100/90 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 transition-colors">
      {/* Top Bar with Theme Toggle */}
      <div className="fixed top-5 right-5 z-50">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-full bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors cursor-pointer shadow-sm"
        >
          {mounted ? (isDark ? "🌙 Dark" : "☀ Light") : "Theme"}
        </button>
      </div>

      <div className="w-full max-w-xl flex flex-col items-center gap-6 sm:gap-8">
        {/* Glow Input Component */}
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

        {/* Clean Minimalist Customization Tabs Underneath */}
        <div className="w-full rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/90 dark:border-zinc-800/90 p-3 sm:p-4 shadow-sm flex flex-col gap-3.5 transition-colors">
          {/* Main Tab Category Pill Bar */}
          <div className="inline-flex w-full items-center p-1 rounded-xl bg-zinc-100/90 dark:bg-zinc-950/70 border border-zinc-200/60 dark:border-zinc-800/60 gap-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "relative flex-1 py-1.5 px-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-center select-none",
                    active
                      ? "text-zinc-950 dark:text-white font-semibold"
                      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
                  )}
                >
                  {active && (
                    <motion.div
                      layoutId="active-tab-pill"
                      className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"
                      transition={{ type: "spring", stiffness: 440, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Sub-Options for the Active Tab */}
          <div className="min-h-[46px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {/* Palette / Colors Tab */}
              {activeTab === "color" && (
                <motion.div
                  key="tab-color"
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="flex flex-wrap items-center justify-center gap-1.5 w-full"
                >
                  {COLOR_OPTIONS.map((c) => {
                    const active = glowColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setGlowColor(c.id)}
                        className={cn(
                          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer transition-colors border",
                          active
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent shadow-xs"
                            : "bg-transparent text-zinc-600 dark:text-zinc-400 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
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
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-3 gap-2 w-full"
                >
                  {INTENSITY_OPTIONS.map((item) => {
                    const active = glowIntensity === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowIntensity(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-center cursor-pointer transition-all border",
                          active
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent shadow-xs"
                            : "bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        )}
                      >
                        <span className="text-xs font-semibold">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] mt-0.5",
                            active
                              ? "text-zinc-300 dark:text-zinc-600"
                              : "text-zinc-400 dark:text-zinc-500"
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
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-3 gap-2 w-full"
                >
                  {TRIGGER_OPTIONS.map((item) => {
                    const active = glowTrigger === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowTrigger(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-center cursor-pointer transition-all border",
                          active
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent shadow-xs"
                            : "bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        )}
                      >
                        <span className="text-xs font-semibold">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] mt-0.5",
                            active
                              ? "text-zinc-300 dark:text-zinc-600"
                              : "text-zinc-400 dark:text-zinc-500"
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
                  initial={{ opacity: 0, y: 3 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -3 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-3 gap-2 w-full"
                >
                  {SPEED_OPTIONS.map((item) => {
                    const active = glowSpeed === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setGlowSpeed(item.id)}
                        className={cn(
                          "flex flex-col items-center justify-center py-1.5 px-2 rounded-xl text-center cursor-pointer transition-all border",
                          active
                            ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-950 border-transparent shadow-xs"
                            : "bg-transparent text-zinc-700 dark:text-zinc-300 border-zinc-200/80 dark:border-zinc-800/80 hover:bg-zinc-100 dark:hover:bg-zinc-800/60"
                        )}
                      >
                        <span className="text-xs font-semibold">{item.label}</span>
                        <span
                          className={cn(
                            "text-[10px] mt-0.5",
                            active
                              ? "text-zinc-300 dark:text-zinc-600"
                              : "text-zinc-400 dark:text-zinc-500"
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
          </div>
        </div>
      </div>
    </main>
  );
}
