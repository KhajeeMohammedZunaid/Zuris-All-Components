"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";
import {
  Anthropic,
  Grok,
  OpenAI,
  Replicate,
  GitHub,
  Vercel,
} from "@/components/logos/all-logos";

// ---------------------------------------------------------------------------
// GROWTH & METRIC TELEMETRY CARD (Matches reference image, no live-engine chip)
// ---------------------------------------------------------------------------
function Hero3GrowthMetricCard() {
  // Dot matrix: 3 rows (5 active green, 3 active green, all inactive)
  const dotMatrix = [
    [true, true, true, true, true, false, false],
    [true, true, true, false, false, false, false],
    [false, false, false, false, false],
  ];

  // Equalizer waveform bars: 12 bars with 3 center pink peak bars
  const equalizerBars = [
    { height: "h-3 sm:h-3.5", active: false },
    { height: "h-2 sm:h-2.5", active: false },
    { height: "h-4 sm:h-4.5", active: false },
    { height: "h-3 sm:h-3.5", active: false },
    { height: "h-6 sm:h-7", active: true },
    { height: "h-8 sm:h-9", active: true },
    { height: "h-8 sm:h-9", active: true },
    { height: "h-4 sm:h-4.5", active: false },
    { height: "h-2.5 sm:h-3", active: false },
    { height: "h-4 sm:h-4.5", active: false },
    { height: "h-3.5 sm:h-4", active: false },
    { height: "h-2.5 sm:h-3", active: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] bg-[#09110f] dark:bg-[#050b0a] rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between select-none relative overflow-hidden"
    >
      {/* Subtle Ambient Emerald & Rose Depth inside the card */}
      <div className="pointer-events-none absolute -top-20 -right-20 w-56 h-56 bg-[#49dfa4]/[0.08] rounded-full blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 -left-20 w-56 h-56 bg-[#f9a8d4]/[0.06] rounded-full blur-3xl" />

      {/* TOP SECTION: Dot Matrix (Clean, no chip) */}
      <div className="flex flex-col gap-2 z-10">
        {dotMatrix.map((row, rIdx) => (
          <div key={`row-${rIdx}`} className="flex items-center gap-2 sm:gap-2.5">
            {row.map((isActive, cIdx) => (
              <div
                key={`dot-${rIdx}-${cIdx}`}
                className={cn(
                  "w-4.5 h-4.5 sm:w-5.5 sm:h-5.5 rounded-full transition-colors",
                  isActive
                    ? "bg-[#49dfa4] shadow-[0_0_8px_rgba(73,223,164,0.35)]"
                    : "bg-white/[0.08] dark:bg-white/[0.06]"
                )}
              />
            ))}
          </div>
        ))}
      </div>

      {/* PRIMARY STAT: 6.4x + Blended ROAS */}
      <div className="flex items-baseline justify-between pt-3 sm:pt-4 z-10">
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-5xl sm:text-6xl lg:text-[64px] leading-none text-white tracking-[-0.04em]">
          6.4x
        </span>
        <div className="flex flex-col items-end">
          <span className="font-['Plus_Jakarta_Sans',sans-serif] font-normal text-xs sm:text-[13px] text-zinc-400 tracking-[-0.01em]">
            Blended ROAS
          </span>
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-[#49dfa4] mt-0.5">
            <svg className="w-3 h-3 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
              <path d="m18 15-6-6-6 6" />
            </svg>
            +3.2x benchmark
          </span>
        </div>
      </div>

      {/* SUBTLE HORIZONTAL DIVIDER */}
      <div className="w-full h-px bg-white/[0.08] my-2 sm:my-2.5 z-10" />

      {/* HEADLINE: Built for clarity, control, and compounding growth */}
      <div className="z-10 flex flex-col gap-2.5">
        <p className="font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-base sm:text-lg lg:text-[19px] leading-[1.3] text-white tracking-[-0.035em]">
          Built for clarity, control, and compounding growth
        </p>

        {/* Mini Performance Matrix */}
        <div className="grid grid-cols-2 gap-2 pt-0.5">
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2 flex flex-col">
            <span className="text-[10.5px] text-zinc-400 font-normal">Conversion Rate</span>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight mt-0.5">
              4.82% <span className="text-[10px] text-emerald-400 font-normal">(+18%)</span>
            </span>
          </div>
          <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2 flex flex-col">
            <span className="text-[10.5px] text-zinc-400 font-normal">Net Velocity</span>
            <span className="text-xs sm:text-sm font-semibold text-white tracking-tight mt-0.5">
              99.94% <span className="text-[10px] text-emerald-400 font-normal">(Instant)</span>
            </span>
          </div>
        </div>
      </div>

      {/* SUBMETRIC ROW: CAC in 90 days + -41% */}
      <div className="flex items-baseline justify-between pt-2 sm:pt-3 z-10">
        <span className="font-['Plus_Jakarta_Sans',sans-serif] text-xs sm:text-[13px] font-normal text-zinc-400 tracking-[-0.01em]">
          CAC in 90 days
        </span>
        <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-2xl sm:text-3xl text-[#f9a8d4] tracking-[-0.03em]">
          -41%
        </span>
      </div>

      {/* BOTTOM EQUALIZER / WAVEFORM BARS */}
      <div className="flex flex-col gap-1.5 pt-1 z-10">
        <div className="flex items-end justify-between sm:justify-center gap-1.5 sm:gap-2">
          {equalizerBars.map((bar, idx) => (
            <div
              key={`bar-${idx}`}
              className={cn(
                "w-2.5 sm:w-3.5 rounded-sm sm:rounded-md transition-all",
                bar.height,
                bar.active
                  ? "bg-[#f9a8d4] shadow-[0_0_12px_rgba(249,168,212,0.4)]"
                  : "bg-white/[0.08] dark:bg-white/[0.06]"
              )}
            />
          ))}
        </div>
        <div className="flex justify-between w-full text-[9px] text-zinc-500 font-mono pt-0.5 px-1">
          <span>DAY 1</span>
          <span>DAY 45</span>
          <span>DAY 90</span>
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// MAIN HERO-3 COMPONENT
// ---------------------------------------------------------------------------
interface Hero3Props {
  leftSlot?: React.ReactNode;
  rightSlot?: React.ReactNode;
  leftImageSlot?: React.ReactNode;
  rightImageSlot?: React.ReactNode;
}

export function Hero3({ leftSlot, rightSlot, leftImageSlot, rightImageSlot }: Hero3Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Smoothly lock body scroll when mobile menu overlay is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#resources" },
  ];

  // Balanced optical sizing: standard base for all logos, with Grok slightly scaled to optically balance its diagonal mark
  const brandLogos = [
    {
      name: "OpenAI",
      Component: OpenAI,
      logoClass: "h-5.5 sm:h-6 lg:h-6.5",
      opacityClass: "opacity-85",
    },
    {
      name: "Anthropic",
      Component: Anthropic,
      logoClass: "h-4 sm:h-4.5 lg:h-5",
      opacityClass: "opacity-85",
    },
    {
      name: "Replicate",
      Component: Replicate,
      logoClass: "h-5 sm:h-5.5 lg:h-6",
      opacityClass: "opacity-85",
    },
    {
      name: "GitHub",
      Component: GitHub,
      logoClass: "h-4.5 sm:h-5 lg:h-5.5",
      opacityClass: "opacity-85",
    },
    {
      name: "Vercel",
      Component: Vercel,
      logoClass: "h-4 sm:h-4.5 lg:h-5",
      opacityClass: "opacity-85",
    },
    {
      name: "Grok",
      Component: Grok,
      logoClass: "h-6 sm:h-6.5 lg:h-7",
      opacityClass: "opacity-85",
    },
  ];

  // Reversed slots (Left: Metric Card, Right: Dashboard Image)
  const resolvedLeft = leftSlot || leftImageSlot || <Hero3GrowthMetricCard />;
  const resolvedRight = rightSlot || rightImageSlot || (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="w-full h-full min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] relative overflow-hidden flex items-center justify-center"
    >
      <img
        src="/hero-3-image left.avif"
        alt="Zuris Platform Dashboard"
        className="w-full h-full object-cover object-center block"
      />
    </motion.div>
  );

  return (
    <div className="relative w-full min-h-screen bg-[#fafbfc] dark:bg-[#060909] text-zinc-900 dark:text-zinc-100 antialiased overflow-hidden transition-colors duration-300">
      {/* 
        GPU-Accelerated Seamless Infinite Left-to-Right Marquee for Mobile/Tablet
      */}
      <style jsx global>{`
        @keyframes marquee-ltr {
          0% {
            transform: translate3d(-100%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 22s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover .animate-marquee-ltr {
          animation-play-state: paused;
        }
        html.dark .hero3-brand-logo,
        .dark .hero3-brand-logo {
          filter: invert(1) brightness(1.2) !important;
        }
      `}</style>

      {/* =========================================================================
          NAVBAR: Precision typography, alignment & desktop micro-interactions
          ========================================================================= */}
      <header className="sticky top-0 z-50 w-full bg-[#fafbfc]/90 dark:bg-[#060909]/90 backdrop-blur-md border-b border-zinc-200/50 dark:border-zinc-800/50 transition-colors">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Top Left: Zuris Logo & Text (matches hero-3 typography) */}
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none group">
            <div className="w-7 h-7 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
              <span className="block dark:hidden">
                <ZurisBlackV1 className="w-6.5 h-6.5" />
              </span>
              <span className="hidden dark:block">
                <ZurisWhiteV1 className="w-6.5 h-6.5" />
              </span>
            </div>
            <span className="font-['Plus_Jakarta_Sans',sans-serif] font-bold text-[22px] tracking-[-0.035em] leading-none text-[#053f31] dark:text-zinc-100">
              zuris
            </span>
          </Link>

          {/* Desktop Navigation Links: Clean spacing and precise typography */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-10">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] font-medium text-zinc-600 hover:text-[#053f31] dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors duration-200 tracking-[-0.01em]"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Desktop Right Action: Get Started Button */}
          <div className="hidden md:flex items-center">
            <motion.div
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.15, ease: "easeOut" }}
            >
              <Button
                nativeButton={false}
                render={<Link href="#get-started" />}
                className="inline-flex items-center justify-center px-5 py-2.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] font-medium bg-[#063b2f] hover:bg-[#0a4d3e] text-white transition-colors duration-200 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 shadow-none border-none cursor-pointer tracking-[-0.01em]"
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Mobile Morphing Hamburger Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-10 rounded-full flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:bg-black/[0.05] dark:hover:bg-white/[0.08] transition-colors focus:outline-none cursor-pointer"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
              <span
                className={cn(
                  "w-5 h-[1.8px] bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  mobileMenuOpen ? "translate-y-[7.1px] rotate-45" : "translate-y-0 rotate-0"
                )}
              />
              <span
                className={cn(
                  "w-5 h-[1.8px] bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100"
                )}
              />
              <span
                className={cn(
                  "w-5 h-[1.8px] bg-zinc-900 dark:bg-zinc-100 rounded-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center",
                  mobileMenuOpen ? "-translate-y-[7.1px] -rotate-45" : "translate-y-0 rotate-0"
                )}
              />
            </div>
          </button>
        </div>
      </header>

      {/* =========================================================================
          FULL-SCREEN MOBILE NAVIGATION OVERLAY (Begins directly below navbar, no duplicated logo/text)
          ========================================================================= */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-overlay"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 sm:top-18 bottom-0 z-40 md:hidden flex flex-col justify-between bg-[#fafbfc]/98 dark:bg-[#060909]/98 backdrop-blur-2xl px-6 sm:px-8 py-8 sm:py-10 border-b border-zinc-200/60 dark:border-zinc-800/60 select-none overflow-y-auto"
          >
            {/* Nav Links with staggered smooth entrance */}
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{
                hidden: { opacity: 0 },
                show: {
                  opacity: 1,
                  transition: { staggerChildren: 0.07, delayChildren: 0.08 },
                },
              }}
              className="flex flex-col gap-6 pt-2"
            >
              {navLinks.map((item) => (
                <motion.div
                  key={item.label}
                  variants={{
                    hidden: { opacity: 0, y: -12 },
                    show: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
                    },
                  }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-['Plus_Jakarta_Sans',sans-serif] text-2xl sm:text-3xl font-semibold tracking-[-0.035em] text-zinc-900 dark:text-zinc-100 hover:text-[#053f31] dark:hover:text-emerald-400 transition-colors block py-1"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            {/* Bottom Action: Get Started Button */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60"
            >
              <Button
                nativeButton={false}
                render={<Link href="#get-started" />}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-6 py-3.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[15px] font-medium bg-[#063b2f] hover:bg-[#0a4d3e] text-white transition-colors duration-200 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 shadow-none border-none cursor-pointer tracking-[-0.01em]"
              >
                Get Started
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================================================================
          HERO CONTENT WRAPPER
          ========================================================================= */}
      <section className="relative z-10 w-full pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Soft, borderless ambient atmospheric glow placed far behind text */}
        <div className="pointer-events-none absolute left-1/2 top-[240px] -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[640px] h-[340px] bg-emerald-500/[0.04] dark:bg-emerald-400/[0.03] rounded-full blur-3xl -z-10 select-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Pill Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#49dfa4] text-[#053f31] font-['Plus_Jakarta_Sans',sans-serif] text-[10.5px] sm:text-[11px] font-bold tracking-[0.05em] uppercase hover:brightness-105 transition-all cursor-default select-none">
            <span>SECURE TRANSFER PLATFORM</span>
            <svg
              className="w-3 h-3 stroke-[2.5]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </div>

          {/* Main Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 max-w-3xl font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.09] sm:leading-[1.06] tracking-[-0.045em] [word-spacing:normal] text-[#053f31] dark:text-[#6ee7b7] transition-colors"
          >
            Manage money with <br className="hidden sm:inline" />
            confidence everyday
          </motion.h2>

          {/* CTA Action Buttons with micro blur fade & tactile press animation */}
          <motion.div
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.5, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <Button
              nativeButton={false}
              render={<Link href="#open-account" />}
              className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] sm:text-[14px] font-medium text-white bg-[#063b2f] hover:bg-[#0a4d3e] transition-colors duration-200 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 border-none shadow-none cursor-pointer"
            >
              <span>Open an Account</span>
              <svg
                className="size-3.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </Button>

            <Button
              nativeButton={false}
              render={<Link href="#generate-card" />}
              className="inline-flex items-center justify-center px-5 sm:px-6 py-2.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] sm:text-[14px] font-medium text-[#063b2f] dark:text-zinc-200 bg-transparent hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-colors duration-200 cursor-pointer border-none shadow-none"
            >
              Generate your card
            </Button>
          </motion.div>

          {/* =========================================================================
              LOGOS BAR: Consistent responsive spacing & calibrated optical balance
              ========================================================================= */}
          <div className="w-full mt-8 sm:mt-10 lg:mt-12">
            {/* Mobile & Tablet Infinite Marquee with consistent gaps */}
            <div className="lg:hidden relative w-full overflow-hidden marquee-track [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2 sm:py-2.5">
              <div className="flex w-max items-center">
                {/* Track 1 */}
                <div className="animate-marquee-ltr flex shrink-0 items-center gap-10 sm:gap-13 pr-10 sm:pr-13">
                  {brandLogos.map((logo) => {
                    const LogoComp = logo.Component;
                    return (
                      <div
                        key={`m1-${logo.name}`}
                        className="hero3-brand-logo shrink-0 flex items-center justify-center transition-[filter] duration-200"
                      >
                        <LogoComp className={cn("w-auto shrink-0 select-none", logo.logoClass, logo.opacityClass)} />
                      </div>
                    );
                  })}
                </div>

                {/* Track 2 */}
                <div
                  className="animate-marquee-ltr flex shrink-0 items-center gap-10 sm:gap-13 pr-10 sm:pr-13"
                  aria-hidden="true"
                >
                  {brandLogos.map((logo) => {
                    const LogoComp = logo.Component;
                    return (
                      <div
                        key={`m2-${logo.name}`}
                        className="hero3-brand-logo shrink-0 flex items-center justify-center transition-[filter] duration-200"
                      >
                        <LogoComp className={cn("w-auto shrink-0 select-none", logo.logoClass, logo.opacityClass)} />
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Static Logos Grid: strictly uniform gap spacing across all logos */}
            <div className="hidden lg:flex items-center justify-center gap-11 xl:gap-14 max-w-5xl mx-auto py-2">
              {brandLogos.map((logo, index) => {
                const LogoComp = logo.Component;
                return (
                  <motion.div
                    key={`desktop-${logo.name}`}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                    className="shrink-0 flex items-center justify-center"
                  >
                    <div className="hero3-brand-logo flex items-center justify-center transition-[filter] duration-200">
                      <LogoComp
                        className={cn(
                          "w-auto shrink-0 select-none transition-opacity duration-200 hover:opacity-100",
                          logo.logoClass,
                          logo.opacityClass
                        )}
                      />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            BELOW TWO CARDS CONTAINER (Reversed Layout: Left Metric Card, Right Dashboard Image)
            ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 sm:mt-10 lg:mt-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Card: Growth & Telemetry Metric Card (5 cols on desktop, portrait ratio) */}
            <div className="lg:col-span-5 relative w-full rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden border border-zinc-200/70 dark:border-zinc-800/70 min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] flex items-stretch transition-colors">
              {resolvedLeft}
            </div>

            {/* Right Card: Hero Dashboard Image (7 cols on desktop, landscape ratio) */}
            <div className="lg:col-span-7 relative w-full rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 min-h-[340px] sm:min-h-[400px] lg:min-h-[440px] flex items-center justify-center transition-colors">
              {resolvedRight}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

export default Hero3;
