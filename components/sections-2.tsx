"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
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
        "w-full bg-[#f8f9fb] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 py-8 sm:py-12 px-2 sm:px-4 lg:px-6 font-sans transition-colors duration-300",
        className
      )}
    >
      {/* Expanded max-width & tuned gaps to make cards wider across mobile to laptop-1330px */}
      <div className="max-w-[1360px] 2xl:max-w-7xl mx-auto w-full">
        {/* 3-Card Feature Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-5 xl:gap-6 items-stretch">
          {/* Card 1: Project & Task Management */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Hardware-masked to guarantee 100% smooth rounded corner at right-bottom edge */}
            <div
              className="relative w-full h-[275px] sm:h-[295px] lg:h-[290px] overflow-hidden flex items-end justify-end select-none p-0"
              style={{
                borderRadius: `${INNER_RADIUS}px`,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                maskImage: "radial-gradient(white, black)",
                isolation: "isolate",
              }}
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

              {/* Foreground Floating Linear/Notion Task Widget: Micro interactive tap & subtle float */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                whileTap={{ scale: 0.992 }}
                className="relative z-10 w-[92%] sm:w-[88%] max-w-[340px] sm:max-w-[350px] h-[260px] sm:h-[275px] bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl p-4 sm:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col justify-between translate-x-4 sm:translate-x-6 translate-y-3 sm:translate-y-4 cursor-default"
                style={{
                  borderTopLeftRadius: `${OUTER_RADIUS}px`,
                  borderTopRightRadius: `${OUTER_RADIUS}px`,
                  borderBottomLeftRadius: `${OUTER_RADIUS}px`,
                  borderBottomRightRadius: `${INNER_RADIUS}px`,
                }}
              >
                {/* Header with slow continuous rotating sun icon */}
                <div className="flex items-center gap-1.5">
                  <motion.svg
                    animate={{ rotate: 360 }}
                    transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 text-amber-500 fill-none stroke-current stroke-2 will-change-transform"
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
                  </motion.svg>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                    To-do
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-md">
                    2
                  </span>
                </div>

                {/* Status Tags with breathing amber pending beacon */}
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium px-2 py-0.5 rounded-md bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border border-red-200/60 dark:border-red-900/40">
                    <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 24 24">
                      <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v19" />
                    </svg>
                    High
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-medium px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-900/40">
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
                <div className="flex flex-col gap-0.5 text-left">
                  <p className="text-[13px] font-medium text-zinc-900 dark:text-zinc-100 leading-snug m-0 text-left">
                    Homepage redesign feedback
                  </p>
                  <p className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400 flex items-center gap-1 m-0 text-left">
                    <span className="text-zinc-400">↳</span> Client requested UI refinement for hero section
                  </p>
                </div>

                {/* Minimal Secondary Content Row with micro-reveal check */}
                <div className="flex items-center justify-between py-1 px-0.5 border-t border-zinc-100/90 dark:border-zinc-800/60 text-[11px]">
                  <span className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-300">
                    <motion.svg
                      initial={{ scale: 0.75, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.35, delay: 0.4 }}
                      className="w-3 h-3 text-emerald-500 fill-none stroke-current stroke-2"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </motion.svg>
                    Tokens synced with Figma
                  </span>
                  <span className="text-[10px] text-zinc-400 font-medium">Done</span>
                </div>

                {/* Task Footer with staggered overlapping avatar entrance */}
                <div className="flex items-center justify-between pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="flex items-center -space-x-1.5">
                    {[
                      { src: "/n1.png", alt: "Assignee 1", delay: 0.3 },
                      { src: "/n2.png", alt: "Assignee 2", delay: 0.38 },
                      { src: "/n3.png", alt: "Assignee 3", delay: 0.46 },
                    ].map((av, idx) => (
                      <motion.span
                        key={idx}
                        initial={{ opacity: 0, x: -5 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, delay: av.delay }}
                        className="relative w-5 h-5 sm:w-[22px] sm:h-[22px] rounded-full border-2 border-white dark:border-zinc-900 overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center shrink-0 shadow-sm"
                        style={{ zIndex: 3 - idx }}
                      >
                        <img
                          src={av.src}
                          alt={av.alt}
                          className="w-full h-full object-cover object-center"
                        />
                      </motion.span>
                    ))}
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
              </motion.div>
            </div>

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start"
            >
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Project & Task Management
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Plan projects, assign tasks, set deadlines, and track every deliverable from one workspace.
              </p>
            </motion.div>
          </motion.div>

          {/* Card 2: Progress & Performance Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Hardware-masked to guarantee 100% smooth rounded corner at right-bottom edge */}
            <div
              className="relative w-full h-[275px] sm:h-[295px] lg:h-[290px] overflow-hidden flex items-end justify-end select-none p-0"
              style={{
                borderRadius: `${INNER_RADIUS}px`,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                maskImage: "radial-gradient(white, black)",
                isolation: "isolate",
              }}
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

              {/* Krezu Chip + Status Table: Same height as Card 1, covers right-bottom edge */}
              <div className="relative z-10 w-[92%] sm:w-[88%] max-w-[340px] sm:max-w-[350px] h-[260px] sm:h-[275px] flex flex-col justify-between items-start translate-x-4 sm:translate-x-6 translate-y-3 sm:translate-y-4">
                {/* User Chip with Live Multiplayer Cursor Micro-Interaction */}
                <div className="relative flex items-center mb-1.5 ml-3">
                  {/* Multiplayer animated cursor with organic wobble around micro-motion */}
                  <motion.div
                    animate={{
                      x: [0, 5, -2, 6, -1, 0],
                      y: [0, -4, 3, -1, 4, 0],
                      rotate: [0, -6, 5, -3, 4, 0],
                    }}
                    transition={{
                      duration: 4.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    style={{ transformOrigin: "3px 3px" }}
                    className="absolute -left-6 -top-1 pointer-events-none will-change-transform"
                  >
                    <svg
                      className="w-5 h-5 text-zinc-950 dark:text-white drop-shadow-md fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M3 3l7.5 18 2.5-7 7-2.5L3 3z" />
                    </svg>
                  </motion.div>

                  {/* Krezu Badge with tactile tap */}
                  <motion.div
                    whileTap={{ scale: 0.96 }}
                    className="flex items-center gap-2 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl px-3.5 py-1.5 rounded-full shadow-[0_6px_20px_rgba(0,0,0,0.1)] border border-white/80 dark:border-white/10 cursor-default select-none will-change-transform"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 fill-current"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                    </svg>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                      Krezu
                    </span>
                  </motion.div>
                </div>

                {/* Project Status Table Widget with live radar ping beacon */}
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.65, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.992 }}
                  className="w-full flex-1 bg-white/95 dark:bg-[#18181b]/95 backdrop-blur-xl p-4 sm:p-4.5 shadow-[0_12px_36px_rgba(0,0,0,0.12)] border border-white/80 dark:border-white/10 flex flex-col justify-between cursor-default"
                  style={{
                    borderTopLeftRadius: `${OUTER_RADIUS}px`,
                    borderTopRightRadius: `${OUTER_RADIUS}px`,
                    borderBottomLeftRadius: `${OUTER_RADIUS}px`,
                    borderBottomRightRadius: `${INNER_RADIUS}px`,
                  }}
                >
                  {/* Table Header */}
                  <div className="flex items-center justify-between text-[11px] font-medium text-zinc-400 dark:text-zinc-500 px-1 border-b border-zinc-100 dark:border-zinc-800/80 pb-2">
                    <span>Items</span>
                    <span>Stat</span>
                  </div>

                  {/* Row 1 with static solid emerald status */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      Project Alpha
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-200/50 dark:border-emerald-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    </span>
                  </div>

                  {/* Row 2 with static solid amber status */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      Project Beta
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-500 border border-amber-200/50 dark:border-amber-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    </span>
                  </div>

                  {/* Row 3 with static solid blue status */}
                  <div className="flex items-center justify-between px-1 py-1">
                    <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">
                      Project Gamma
                    </span>
                    <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-500 border border-blue-200/50 dark:border-blue-900/40">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    </span>
                  </div>

                  {/* Row 4: Minimal sync metrics */}
                  <div className="flex items-center justify-between px-1 pt-1.5 border-t border-zinc-100/90 dark:border-zinc-800/80 text-[11px] text-zinc-500 dark:text-zinc-400">
                    <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      All systems synced
                    </span>
                    <span className="font-mono text-[10px] text-zinc-400">98% uptime</span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start"
            >
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Progress & Performance Tracking
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Monitor project status, team workload, deadlines, and completion rates in dashboards.
              </p>
            </motion.div>
          </motion.div>

          {/* Card 3: Connected Apps */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.65, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#121215] flex flex-col gap-5 sm:gap-6 text-left overflow-hidden pb-1 w-full"
            style={{
              borderRadius: `${OUTER_RADIUS}px`,
              padding: `${CARD_PADDING}px`,
            }}
          >
            {/* Image Stage: Vertically and horizontally centered with hardware-masking */}
            <div
              className="relative w-full h-[275px] sm:h-[295px] lg:h-[290px] overflow-hidden flex items-center justify-center p-3 select-none"
              style={{
                borderRadius: `${INNER_RADIUS}px`,
                WebkitMaskImage: "-webkit-radial-gradient(white, black)",
                maskImage: "radial-gradient(white, black)",
                isolation: "isolate",
              }}
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

              {/* 2x3 App Tiles: Organic desynchronized zero-gravity liquid glass float with tactile tap */}
              <div className="relative z-10 grid grid-cols-3 gap-3.5 sm:gap-4 max-w-[280px] sm:max-w-[305px] mx-auto">
                {/* Tile 1: OpenAI */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center dark:invert">
                    <OpenAI className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Tile 2: Claude AI */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <ClaudeAI className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Tile 3: Google */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Google className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Tile 4: Shopify */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Shopify className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Tile 5: Stripe */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Stripe className="w-full h-full" />
                  </div>
                </motion.div>

                {/* Tile 6: Datadog */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, y: 12 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  whileTap={{ scale: 0.93 }}
                  className="relative w-14 h-14 sm:w-[60px] sm:h-[60px] rounded-2xl bg-white/90 dark:bg-[#141416]/90 backdrop-blur-xl border-2 border-white/90 dark:border-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.08),inset_0_1px_2px_rgba(255,255,255,1)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_1px_rgba(255,255,255,0.15)] flex items-center justify-center cursor-pointer"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center">
                    <Datadog className="w-full h-full" />
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Typography Content: Left-aligned, Medium 500 h4, <p> lead description */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col gap-2 px-1 pb-1 pt-0.5 text-left items-start"
            >
              <h4 className="font-medium text-xl sm:text-[1.22rem] leading-[1.25] tracking-[-0.025em] text-zinc-950 dark:text-zinc-50 font-sans text-left m-0">
                Connected Apps
              </h4>
              <p className="lead text-left text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed font-sans m-0">
                Connect the tools your team already uses and keep projects, tasks, and updates synced in one place.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
