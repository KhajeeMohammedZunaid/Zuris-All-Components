"use client";

import * as React from "react";
import GlowInput from "@/components/glow-input";

export default function GlowInputPage() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center p-4 sm:p-6 md:p-8 bg-zinc-50 dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 transition-colors">
      <div className="w-full max-w-xl">
        <GlowInput />
      </div>
    </main>
  );
}
