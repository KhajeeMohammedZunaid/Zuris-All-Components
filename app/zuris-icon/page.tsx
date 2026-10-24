"use client";

import * as React from "react";
import { ZurisLiquidGlassAnimation } from "@/components/zuris-liquid-glass-animation";
import { ZurisSequenceAnimation } from "@/components/zuris-sequence-animation";
import { ZurisAppIcon } from "@/components/zuris-app-icon";
import { cn } from "@/lib/utils";

type ActiveTab = "liquid-glass" | "shader-sequence" | "app-icon";

export default function ZurisIconPage() {
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("liquid-glass");
  const [replayCount, setReplayCount] = React.useState(0);

  return (
    <main className="min-h-screen w-full bg-[#f8f9fb] dark:bg-[#09090b] flex items-center justify-center p-4 transition-colors duration-200 overflow-hidden relative">
      {/* Center Stage: Active Visual Only */}
      <div className="flex items-center justify-center">
        {activeTab === "liquid-glass" && (
          <ZurisLiquidGlassAnimation replayTrigger={replayCount} />
        )}
        {activeTab === "shader-sequence" && (
          <ZurisSequenceAnimation replayTrigger={replayCount} />
        )}
        {activeTab === "app-icon" && <ZurisAppIcon />}
      </div>

      {/* Floating Bottom Tab Switcher */}
      <div className="fixed bottom-6 inset-x-0 mx-auto flex items-center justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1 p-1 rounded-full bg-white/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 shadow-[0_8px_32px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.36)] backdrop-blur-xl text-xs font-sans">
          <button
            type="button"
            onClick={() => {
              setActiveTab("liquid-glass");
              setReplayCount((c) => c + 1);
            }}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer select-none font-medium",
              activeTab === "liquid-glass"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            Liquid Glass
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("shader-sequence");
              setReplayCount((c) => c + 1);
            }}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer select-none font-medium",
              activeTab === "shader-sequence"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            Shader Sequence
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("app-icon")}
            className={cn(
              "px-3.5 sm:px-4 py-1.5 rounded-full transition-all cursor-pointer select-none font-medium",
              activeTab === "app-icon"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 shadow-sm"
                : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            App Icon
          </button>

          {activeTab !== "app-icon" && (
            <button
              type="button"
              onClick={() => setReplayCount((c) => c + 1)}
              title="Replay sequence animation"
              className="px-2 py-1.5 rounded-full text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer select-none flex items-center justify-center"
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0"
              >
                <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                <path d="M3 3v5h5" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
