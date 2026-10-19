"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  ClaudeAI,
  OpenAI,
  Shopify,
  Stripe,
  Google,
  Datadog,
} from "@/components/logo-only/all-logos";

export interface Sections2Props {
  className?: string;
  showThemeBar?: boolean;
}

export function Sections2({ className, showThemeBar = false }: Sections2Props) {
  return (
    <section
      className={cn(
        "w-full bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300",
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-12 sm:gap-16">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto gap-3.5">
          <span className="text-xs uppercase tracking-widest font-medium text-blue-600 dark:text-blue-400 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200/60 dark:border-blue-900/40">
            Platform Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 leading-[1.15]">
            Built for modern product teams
          </h2>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-normal tracking-[-0.015em] leading-relaxed">
            Plan deliverables, monitor live progress, and connect all your tools in one intuitive workspace.
          </p>
        </div>

        {/* 3-Card Feature Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Project & Task Management */}
          <div className="group rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.45)] hover:-translate-y-1">
            {/* Upper Stage: image-bg-2 + Floating Task Card */}
            <div className="relative w-full h-[270px] sm:h-[300px] overflow-hidden flex items-center justify-center p-4">
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none" />

              {/* Foreground Floating Linear/Notion Task Widget */}
              <div className="relative z-10 w-full max-w-[310px] bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col gap-3">
                {/* Header */}
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-amber-500 fill-none stroke-current stroke-2"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
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
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    To-do
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.2 rounded-md">
                    2
                  </span>
                </div>

                {/* Status Tags */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v19" />
                    </svg>
                    High
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Pending
                  </span>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-900/40">
                    <svg
                      className="w-2.5 h-2.5 stroke-current stroke-2 fill-none"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <line x1="9" y1="3" x2="9" y2="21" />
                    </svg>
                    Landing page
                  </span>
                </div>

                {/* Task Title & Subnote */}
                <div className="flex flex-col gap-1 pt-0.5">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-snug m-0">
                    Homepage redesign feedback
                  </p>
                  <p className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400 flex items-center gap-1 m-0">
                    <span className="text-zinc-400">↳</span> Client requested UI refinement for hero section
                  </p>
                </div>

                {/* Task Footer */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                  {/* Stacked avatars */}
                  <div className="flex items-center -space-x-1.5">
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-medium text-white">
                      AL
                    </span>
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-medium text-white">
                      RK
                    </span>
                    <span className="w-5 h-5 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-white dark:border-zinc-900 flex items-center justify-center text-[9px] font-medium text-white">
                      JD
                    </span>
                  </div>

                  {/* Metadata */}
                  <div className="flex items-center gap-2.5 text-[11px] text-zinc-400">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 stroke-current stroke-2 fill-none"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      5
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 stroke-current stroke-2 fill-none"
                        viewBox="0 0 24 24"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <polyline points="12 6 12 12 16 14" />
                      </svg>
                      Tomorrow
                    </span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-3 h-3 stroke-current stroke-2 fill-none"
                        viewBox="0 0 24 24"
                      >
                        <polyline points="9 11 12 14 22 4" />
                        <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                      </svg>
                      1
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Stage: Typography Content */}
            <div className="p-6 sm:p-7 flex flex-col gap-2.5 bg-white dark:bg-[#121215] flex-1 justify-center border-t border-zinc-100 dark:border-zinc-800/80">
              <h4 className="font-normal text-xl sm:text-[1.25rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans m-0">
                Project & Task Management
              </h4>
              <p className="text-sm sm:text-[0.925rem] text-zinc-600 dark:text-zinc-400 leading-normal tracking-[-0.01em] font-sans m-0">
                Plan projects, assign tasks, set deadlines, and track every deliverable from one workspace.
              </p>
            </div>
          </div>

          {/* Card 2: Progress & Performance Tracking */}
          <div className="group rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.45)] hover:-translate-y-1">
            {/* Upper Stage: image-bg-2 + User Chip & Status Table */}
            <div className="relative w-full h-[270px] sm:h-[300px] overflow-hidden flex flex-col items-center justify-center p-4">
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none" />

              {/* User Chip with Floating Cursor */}
              <div className="relative z-10 w-full max-w-[290px] flex items-center justify-end mb-2 pr-4">
                <div className="relative flex items-center gap-2 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-white/80 dark:border-white/10">
                  <svg
                    className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                  </svg>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    John
                  </span>
                </div>

                {/* Classic dark cursor pointer pointing to chip */}
                <div className="absolute -left-2 -top-1 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-zinc-950 dark:text-white drop-shadow-md fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M3 3l7.5 18 2.5-7 7-2.5L3 3z" />
                  </svg>
                </div>
              </div>

              {/* Project Status Table Widget */}
              <div className="relative z-10 w-full max-w-[290px] bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl rounded-2xl p-4 shadow-[0_10px_35px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col gap-2.5">
                {/* Table Header */}
                <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                  <span>Items</span>
                  <span>Stat</span>
                </div>

                {/* Row 1 */}
                <div className="flex items-center justify-between px-1 py-1">
                  <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                    Project Alpha
                  </span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/50 dark:border-emerald-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  </span>
                </div>

                {/* Row 2 */}
                <div className="flex items-center justify-between px-1 py-1">
                  <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                    Project Beta
                  </span>
                  <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/50 dark:border-amber-900/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  </span>
                </div>
              </div>
            </div>

            {/* Lower Stage: Typography Content */}
            <div className="p-6 sm:p-7 flex flex-col gap-2.5 bg-white dark:bg-[#121215] flex-1 justify-center border-t border-zinc-100 dark:border-zinc-800/80">
              <h4 className="font-normal text-xl sm:text-[1.25rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans m-0">
                Progress & Performance Tracking
              </h4>
              <p className="text-sm sm:text-[0.925rem] text-zinc-600 dark:text-zinc-400 leading-normal tracking-[-0.01em] font-sans m-0">
                Monitor project status, team workload, deadlines, and completion rates with clear dashboards and reports.
              </p>
            </div>
          </div>

          {/* Card 3: Connected Apps */}
          <div className="group rounded-2xl sm:rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex flex-col transition-all duration-300 hover:shadow-[0_12px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_12px_40px_rgb(0,0,0,0.45)] hover:-translate-y-1">
            {/* Upper Stage: image-bg-2 + 2x3 Frosted Glass App Icons Grid */}
            <div className="relative w-full h-[270px] sm:h-[300px] overflow-hidden flex items-center justify-center p-4">
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none" />

              {/* 2x3 Floating Glassmorphic App Tiles */}
              <div className="relative z-10 grid grid-cols-3 gap-3 sm:gap-3.5 max-w-[270px] mx-auto">
                {/* Tile 1: OpenAI */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center dark:invert">
                    <OpenAI className="w-full h-full" />
                  </div>
                </div>

                {/* Tile 2: Claude AI */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <ClaudeAI className="w-full h-full" />
                  </div>
                </div>

                {/* Tile 3: Google */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Google className="w-full h-full" />
                  </div>
                </div>

                {/* Tile 4: Shopify */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Shopify className="w-full h-full" />
                  </div>
                </div>

                {/* Tile 5: Stripe */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Stripe className="w-full h-full" />
                  </div>
                </div>

                {/* Tile 6: Datadog */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white/75 dark:bg-white/10 backdrop-blur-xl border border-white/90 dark:border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.08)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.35)] flex items-center justify-center transition-all duration-300 group-hover:scale-105">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Datadog className="w-full h-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* Lower Stage: Typography Content */}
            <div className="p-6 sm:p-7 flex flex-col gap-2.5 bg-white dark:bg-[#121215] flex-1 justify-center border-t border-zinc-100 dark:border-zinc-800/80">
              <h4 className="font-normal text-xl sm:text-[1.25rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans m-0">
                Connected Apps
              </h4>
              <p className="text-sm sm:text-[0.925rem] text-zinc-600 dark:text-zinc-400 leading-normal tracking-[-0.01em] font-sans m-0">
                Connect the tools your team already uses and keep projects, tasks, and updates synced in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
