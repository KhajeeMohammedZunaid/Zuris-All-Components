"use client";

import * as React from "react";
import { Sections2 } from "@/components/sections-2";
import { useTheme } from "next-themes";
import Link from "next/link";

export default function Sections2ShowcasePage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="min-h-screen bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 transition-colors duration-300">
      {/* Top Bar with Directory Return and Theme Toggle */}
      <header className="w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 transition-colors flex items-center gap-1.5"
          >
            <span>←</span>
            <span>Component Directory</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="text-xs text-zinc-400 hidden sm:inline">
              Sections 2 Showcase
            </span>
            <button
              type="button"
              onClick={toggleTheme}
              className="text-xs font-medium px-3 py-1.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-800/80 cursor-pointer transition-colors shadow-sm"
              aria-label="Toggle theme"
            >
              {mounted ? (resolvedTheme === "dark" ? "☀ Light" : "🌙 Dark") : "Theme"}
            </button>
          </div>
        </div>
      </header>

      {/* Main Sections 2 Content */}
      <main className="w-full">
        <Sections2 />
      </main>
    </div>
  );
}
