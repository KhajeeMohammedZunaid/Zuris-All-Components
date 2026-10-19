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
}

/**
 * Nested radius formula:
 * outer_radius = inner_radius + padding
 * Inner radius = 14px
 * Padding = 10px
 * Outer radius = 14px + 10px = 24px
 */
const CARD_PADDING = 10; // 10px padding around image edges
const INNER_RADIUS = 14; // 14px inner image radius
const OUTER_RADIUS = INNER_RADIUS + CARD_PADDING; // 24px: outer radius = inner radius + padding

export function Sections2({ className }: Sections2Props) {
  return (
    <section
      className={cn(
        "w-full bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 font-sans transition-colors duration-300",
        className
      )}
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* 3-Card Feature Showcase Grid - responsive across mobile, tablet, desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {/* Card 1: Project & Task Management */}
          <div
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Vertically centered in height, pushed to the right */}
            <div
              className="relative w-full h-[265px] sm:h-[285px] lg:h-[280px] overflow-hidden flex items-center justify-end select-none"
              style={{ borderRadius: `${INNER_RADIUS}px` }}
            >
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />
              <div
                className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />

              {/* Foreground Floating Linear/Notion Task Widget: Centered in height, pushed more to the right */}
              <div className="relative z-10 w-[92%] sm:w-[88%] max-w-[335px] sm:max-w-[345px] bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col gap-2.5 sm:gap-3 translate-x-5 sm:translate-x-8">
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
                <div className="flex flex-col gap-1 pt-0.5 text-left">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-snug m-0 text-left">
                    Homepage redesign feedback
                  </p>
                  <p className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400 flex items-center gap-1 m-0 text-left">
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

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <div className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start">
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Project & Task Management
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Plan projects, assign tasks, set deadlines, and track every deliverable from one workspace.
              </p>
            </div>
          </div>

          {/* Card 2: Progress & Performance Tracking */}
          <div
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Vertically centered in height, pushed to the right */}
            <div
              className="relative w-full h-[265px] sm:h-[285px] lg:h-[280px] overflow-hidden flex items-center justify-end select-none"
              style={{ borderRadius: `${INNER_RADIUS}px` }}
            >
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />
              <div
                className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />

              {/* John Chip + Status Table Widget Container: Centered in height, pushed more to the right */}
              <div className="relative z-10 w-[88%] sm:w-[85%] max-w-[295px] sm:max-w-[310px] flex flex-col items-start translate-x-5 sm:translate-x-8">
                {/* User Chip with Floating Cursor */}
                <div className="relative flex items-center mb-2 sm:mb-2.5 ml-2 sm:ml-3">
                  {/* Classic dark cursor pointer pointing to chip */}
                  <div className="absolute -left-6 -top-1 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-zinc-950 dark:text-white drop-shadow-md fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 3l7.5 18 2.5-7 7-2.5L3 3z" />
                    </svg>
                  </div>

                  <div className="flex items-center gap-2 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-white/80 dark:border-white/10">
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
                </div>

                {/* Project Status Table Widget: slightly wider & more comfortable row height */}
                <div className="w-full bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl rounded-2xl p-4 sm:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col gap-2.5">
                  {/* Table Header */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                    <span>Items</span>
                    <span>Stat</span>
                  </div>

                  {/* Row 1 */}
                  <div className="flex items-center justify-between px-1 py-1.5">
                    <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      Project Alpha
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/50 dark:border-emerald-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </span>
                  </div>

                  {/* Row 2 */}
                  <div className="flex items-center justify-between px-1 py-1.5">
                    <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      Project Beta
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/50 dark:border-amber-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <div className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start">
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Progress & Performance Tracking
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Monitor project status, team workload, deadlines, and completion rates with clear dashboards.
              </p>
            </div>
          </div>

          {/* Card 3: Connected Apps */}
          <div
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Vertically and horizontally centered */}
            <div
              className="relative w-full h-[265px] sm:h-[285px] lg:h-[280px] overflow-hidden flex items-center justify-center p-3 select-none"
              style={{ borderRadius: `${INNER_RADIUS}px` }}
            >
              <img
                src="/image-bg-2.png"
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-center select-none pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />
              <div
                className="absolute inset-0 bg-black/5 dark:bg-black/35 pointer-events-none"
                style={{ borderRadius: `${INNER_RADIUS}px` }}
              />

              {/* 2x3 App Tiles: Centered in the MIDDLE, slightly larger width and height with 2px liquid glass border */}
              <div className="relative z-10 grid grid-cols-3 gap-3.5 sm:gap-4 max-w-[280px] sm:max-w-[305px] mx-auto">
                {/* Tile 1: OpenAI */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center dark:invert">
                      <OpenAI className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Tile 2: Claude AI */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                      <ClaudeAI className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Tile 3: Google */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                      <Google className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Tile 4: Shopify */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                      <Shopify className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Tile 5: Stripe */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                      <Stripe className="w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Tile 6: Datadog */}
                <div className="relative p-[2px] rounded-[18px] bg-white/45 dark:bg-white/15 backdrop-blur-md shadow-[0_6px_20px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] dark:shadow-[0_6px_20px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)] border-2 border-white/80 dark:border-white/20">
                  <div className="relative w-13 h-13 sm:w-[58px] sm:h-[58px] rounded-[14px] bg-white dark:bg-black flex items-center justify-center">
                    <div className="w-6.5 h-6.5 sm:w-7.5 sm:h-7.5 flex items-center justify-center">
                      <Datadog className="w-full h-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <div className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start">
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Connected Apps
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Connect the tools your team already uses and keep projects, tasks, and updates synced in one place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
