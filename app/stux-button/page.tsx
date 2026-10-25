"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import {
  StuxButton,
  StuxColorScheme,
} from "@/components/buttons/stux-button";
import { cn } from "@/lib/utils";

type ButtonSize = "sm" | "default" | "lg";

export default function StuxButtonPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  const [isGrid, setIsGrid] = React.useState(true);
  const [size, setSize] = React.useState<ButtonSize>("default");
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

  const isDark = mounted ? resolvedTheme === "dark" : true;

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
        "min-h-screen w-full flex items-center justify-center p-6 transition-colors duration-300 relative select-none overflow-hidden",
        isDark ? "bg-[#09090b] text-white" : "bg-[#fafafa] text-zinc-950",
        isGrid &&
          (isDark
            ? "bg-[radial-gradient(rgba(255,255,255,0.14)_1px,transparent_1px)] [background-size:24px_24px]"
            : "bg-[radial-gradient(rgba(0,0,0,0.13)_1px,transparent_1px)] [background-size:24px_24px]")
      )}
    >
      {/* Center Stage: Pure Button Visual */}
      <div className="flex items-center justify-center z-10">
        <StuxButton
          size={size}
          colorScheme={colorScheme}
        />
      </div>

      {/* Floating Bottom Pill Controls: 100% Theme-Responsive with Zero Ugly Text */}
      <div className="fixed bottom-6 inset-x-0 mx-auto flex items-center justify-center z-50 pointer-events-none px-4">
        <div
          className={cn(
            "pointer-events-auto inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 rounded-full border shadow-2xl backdrop-blur-xl text-xs font-sans transition-all duration-300",
            isDark
              ? "bg-zinc-900/90 border-zinc-800 text-zinc-100 shadow-[0_8px_32px_rgba(0,0,0,0.5)]"
              : "bg-white/95 border-zinc-200 text-zinc-900 shadow-[0_8px_32px_rgba(0,0,0,0.12)]"
          )}
        >
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
                      ? "scale-125 ring-2 border-transparent"
                      : "opacity-75 hover:opacity-100 hover:scale-110",
                    active && (isDark ? "ring-white" : "ring-zinc-950"),
                    !active && (isDark ? "border-white/20" : "border-black/20")
                  )}
                  style={{ backgroundColor: c.hex }}
                />
              );
            })}
          </div>

          <span
            className={cn(
              "w-px h-3.5 mx-0.5",
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            )}
          />


          {/* Grid Toggle: Responsive for Both Themes */}
          <button
            type="button"
            onClick={() => setIsGrid((prev) => !prev)}
            className={cn(
              "px-3 py-1 rounded-full transition-all cursor-pointer select-none font-medium text-xs whitespace-nowrap",
              isGrid
                ? isDark
                  ? "bg-zinc-800 text-white font-semibold"
                  : "bg-zinc-200 text-zinc-950 font-semibold"
                : isDark
                ? "text-zinc-400 hover:text-white"
                : "text-zinc-600 hover:text-zinc-950"
            )}
          >
            {isGrid ? "Grid: On" : "Grid: Off"}
          </button>

          <span
            className={cn(
              "w-px h-3.5 mx-0.5",
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            )}
          />

          {/* Size Options */}
          {(["sm", "default", "lg"] as const).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSize(s)}
              className={cn(
                "px-2.5 py-1 rounded-full transition-all cursor-pointer select-none font-medium capitalize text-xs",
                size === s
                  ? isDark
                    ? "bg-zinc-800 text-white"
                    : "bg-zinc-200 text-zinc-950"
                  : isDark
                  ? "text-zinc-400 hover:text-white"
                  : "text-zinc-500 hover:text-zinc-900"
              )}
            >
              {s === "sm" ? "Small" : s === "default" ? "Good Size" : "Large"}
            </button>
          ))}

          <span
            className={cn(
              "w-px h-3.5 mx-0.5",
              isDark ? "bg-zinc-700" : "bg-zinc-300"
            )}
          />

          {/* Theme Switcher: Real next-themes toggle */}
          <button
            type="button"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className={cn(
              "px-3 py-1 rounded-full transition-all cursor-pointer select-none font-medium text-xs",
              isDark
                ? "text-zinc-400 hover:text-white"
                : "text-zinc-600 hover:text-zinc-950"
            )}
          >
            {isDark ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </div>
    </main>
  );
}
