"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { TypographyLab } from "@/components/typography-lab";

export default function TypographyLabPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 p-6 sm:p-10 md:p-14 transition-colors duration-200 font-sans">
      <div className="max-w-[1240px] mx-auto flex flex-col gap-8">
        {/* Top Header */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-200 dark:border-zinc-800">
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
                Typography Studio (/typography-lab)
              </h1>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
              Interactive typography workbench — select HTML tags, customize tracking, line height, word spacing, weight, and mutedness.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
              className="px-3.5 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 text-xs font-semibold bg-white dark:bg-zinc-900 text-zinc-950 dark:text-zinc-50 cursor-pointer hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors shadow-2xs"
            >
              {mounted ? (resolvedTheme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode") : "Theme"}
            </button>
          </div>
        </header>

        {/* Typography Studio */}
        <main>
          <TypographyLab />
        </main>
      </div>
    </div>
  );
}
