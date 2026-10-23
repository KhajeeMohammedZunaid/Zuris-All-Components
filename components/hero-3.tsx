"use client";

import React, { useState } from "react";
import Link from "next/link";
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

interface Hero3Props {
  leftImageSlot?: React.ReactNode;
  rightImageSlot?: React.ReactNode;
}

export function Hero3({ leftImageSlot, rightImageSlot }: Hero3Props) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Features", href: "#features" },
    { label: "Products", href: "#products" },
    { label: "Solutions", href: "#solutions" },
    { label: "Resources", href: "#resources" },
  ];

  const brandLogos = [
    {
      name: "OpenAI",
      Component: OpenAI,
      containerClass: "w-42 sm:w-50 lg:w-56",
      logoClass: "w-full h-auto max-h-12 sm:max-h-14",
      opacityClass: "opacity-90",
    },
    {
      name: "Anthropic",
      Component: Anthropic,
      containerClass: "w-44 sm:w-52 lg:w-60",
      logoClass: "w-full h-auto max-h-11 sm:max-h-13",
      opacityClass: "opacity-85",
    },
    {
      name: "Replicate",
      Component: Replicate,
      containerClass: "w-38 sm:w-46 lg:w-52",
      logoClass: "w-full h-auto max-h-9.5 sm:max-h-11",
      opacityClass: "opacity-85",
    },
    {
      name: "GitHub",
      Component: GitHub,
      containerClass: "w-26 sm:w-30 lg:w-34",
      logoClass: "w-full h-auto max-h-8 sm:max-h-9",
      opacityClass: "opacity-85",
    },
    {
      name: "Vercel",
      Component: Vercel,
      containerClass: "w-32 sm:w-38 lg:w-42",
      logoClass: "w-full h-auto max-h-8 sm:max-h-9.5",
      opacityClass: "opacity-90",
    },
    {
      name: "Grok",
      Component: Grok,
      containerClass: "w-28 sm:w-34 lg:w-38",
      logoClass: "w-full h-auto max-h-8 sm:max-h-9.5",
      opacityClass: "opacity-85",
    },
  ];

  return (
    <div className="relative w-full min-h-screen bg-[#fafbfc] dark:bg-[#060909] text-zinc-900 dark:text-zinc-100 antialiased overflow-hidden transition-colors duration-300">
      {/* 
        GPU-Accelerated Seamless Infinite Left-to-Right Marquee
        Using two mathematically identical rows with matching gap and padding.
        Moves from -100% to 0% continuously with zero jump or flicker.
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
      `}</style>

      {/* =========================================================================
          NAVBAR (Refined minimal height, clean logo sizing, zero drop shadows)
          ========================================================================= */}
      <header className="relative z-30 w-full bg-white/70 dark:bg-[#060909]/70 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
          {/* Top Left: Zuris Logo with Proportional Analogous Size */}
          <Link href="/" className="flex items-center gap-2.5 focus:outline-none">
            <div className="w-7 h-7 flex items-center justify-center">
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

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 lg:gap-8">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] font-medium text-zinc-600 hover:text-[#053f31] dark:text-zinc-300 dark:hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right Action: Minimal Pill Button (No drop shadow) */}
          <div className="hidden md:flex items-center">
            <Button
              nativeButton={false}
              render={<Link href="#get-started" />}
              className="inline-flex items-center justify-center px-4 py-2 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-medium bg-[#063b2f] hover:bg-[#0a4d3e] text-white transition-colors duration-200 dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 shadow-none border-none"
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden size-8 rounded-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border-none shadow-none bg-transparent"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            ) : (
              <svg
                className="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            )}
          </Button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-2 pb-5 border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#060909] space-y-2.5">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-200 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-2">
              <Button
                nativeButton={false}
                render={<Link href="#get-started" />}
                onClick={() => setMobileMenuOpen(false)}
                className="w-full inline-flex items-center justify-center px-4 py-2 h-auto rounded-full font-medium text-[13px] bg-[#063b2f] text-white dark:bg-emerald-500 dark:text-zinc-950 shadow-none border-none"
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================================================
          HERO CONTENT WRAPPER WITH SUBTLE CONCENTRIC BACKGROUND RINGS
          ========================================================================= */}
      <section className="relative z-10 w-full pt-10 sm:pt-14 lg:pt-16 pb-12 sm:pb-16 lg:pb-20 overflow-hidden">
        {/* Concentric Subtle Background Circles radiating outward (Subtle & scaled down) */}
        <div className="pointer-events-none absolute left-1/2 top-[180px] sm:top-[210px] -translate-x-1/2 -translate-y-1/2 w-full max-w-[960px] h-[600px] flex items-center justify-center overflow-visible select-none -z-10">
          {/* Inner ring */}
          <div className="absolute w-[260px] h-[260px] sm:w-[320px] sm:h-[320px] rounded-full border border-emerald-900/[0.04] dark:border-emerald-400/[0.05]" />
          {/* Middle ring */}
          <div className="absolute w-[460px] h-[460px] sm:w-[560px] sm:h-[560px] rounded-full border border-emerald-900/[0.035] dark:border-emerald-400/[0.04]" />
          {/* Outer ring */}
          <div className="absolute w-[680px] h-[680px] sm:w-[820px] sm:h-[820px] rounded-full border border-emerald-900/[0.025] dark:border-emerald-400/[0.03]" />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
          {/* Top Pill Badge (Minimal, no drop shadow) */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#49dfa4] text-[#053f31] font-['Plus_Jakarta_Sans',sans-serif] text-[10.5px] sm:text-[11px] font-bold tracking-[0.05em] uppercase hover:brightness-105 transition-all cursor-default">
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

          {/* Main Heading: Strictly H2, Plus Jakarta Sans, 500 weight, -4.5% tracking, normal word spacing, minimal scale */}
          <h2 className="mt-6 sm:mt-7 max-w-3xl font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] leading-[1.09] sm:leading-[1.06] tracking-[-0.045em] [word-spacing:normal] text-[#053f31] dark:text-[#6ee7b7] transition-colors">
            Manage money with <br className="hidden sm:inline" />
            confidence everyday
          </h2>

          {/* CTA Buttons (Minimal sizes, zero drop shadows) */}
          <div className="mt-6 sm:mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <Button
              nativeButton={false}
              render={<Link href="#open-account" />}
              className="inline-flex items-center justify-center gap-1.5 px-5 sm:px-6 py-2.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] sm:text-[14px] font-medium text-white bg-[#063b2f] hover:bg-[#0a4d3e] transition-colors duration-200 group dark:bg-emerald-500 dark:text-zinc-950 dark:hover:bg-emerald-400 border-none shadow-none"
            >
              <span>Open an Account</span>
              <svg
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
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
              className="inline-flex items-center justify-center px-5 py-2.5 h-auto rounded-full font-['Plus_Jakarta_Sans',sans-serif] text-[13.5px] sm:text-[14px] font-medium text-[#063b2f] dark:text-zinc-200 bg-transparent hover:bg-black/[0.06] dark:hover:bg-white/[0.08] transition-all duration-200 cursor-pointer border-none shadow-none"
            >
              Generate your card
            </Button>
          </div>

          {/* =========================================================================
              LOGOS BAR:
              - Mobile & Tablet: Seamless flicker-free left-to-right infinite marquee with blurred edges
              - Desktop (lg+): Static clean minimal row
              ========================================================================= */}
          <div className="w-full mt-10 sm:mt-14 lg:mt-16">
            {/* Mobile & Tablet Infinite Marquee (Hidden on Desktop) */}
            <div className="lg:hidden relative w-full overflow-hidden marquee-track [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)] py-2">
              <div className="flex w-max">
                {/* Track 1: Animate -100% -> 0% */}
                <div className="animate-marquee-ltr flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
                  {brandLogos.map((logo) => {
                    const LogoComp = logo.Component;
                    return (
                      <div
                        key={`m1-${logo.name}`}
                        className={`shrink-0 flex items-center justify-center dark:invert dark:brightness-100 ${logo.opacityClass} ${logo.containerClass}`}
                      >
                        {LogoComp && <LogoComp className={logo.logoClass} />}
                      </div>
                    );
                  })}
                </div>

                {/* Track 2: Identical duplicate for seamless 100% flicker-free loop */}
                <div
                  className="animate-marquee-ltr flex shrink-0 items-center gap-12 sm:gap-16 pr-12 sm:pr-16"
                  aria-hidden="true"
                >
                  {brandLogos.map((logo) => {
                    const LogoComp = logo.Component;
                    return (
                      <div
                        key={`m2-${logo.name}`}
                        className={`shrink-0 flex items-center justify-center dark:invert dark:brightness-100 ${logo.opacityClass} ${logo.containerClass}`}
                      >
                        {LogoComp && <LogoComp className={logo.logoClass} />}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Desktop Static Logos Grid (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:flex items-center justify-center gap-12 xl:gap-18 max-w-6xl mx-auto py-3">
              {brandLogos.map((logo) => {
                const LogoComp = logo.Component;
                return (
                  <div
                    key={`desktop-${logo.name}`}
                    className={`flex items-center justify-center dark:invert dark:brightness-100 ${logo.opacityClass} ${logo.containerClass}`}
                  >
                    {LogoComp && <LogoComp className={logo.logoClass} />}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* =========================================================================
            BELOW TWO IMAGES / CARDS CONTAINER:
            - Kept empty for the user to fill as instructed
            - Clean minimal borders, zero drop shadows, refined heights & roundedness
            ========================================================================= */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-10 sm:mt-14 lg:mt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
            {/* Left Image Card (Narrower ~40% width on desktop) */}
            <div className="lg:col-span-5 relative w-full rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col justify-center items-center transition-all duration-300 group">
              {leftImageSlot ? (
                leftImageSlot
              ) : (
                /* Empty placeholder frame ready for user image */
                <div className="w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-2.5 group-hover:scale-105 transition-transform">
                    <svg
                      className="w-5 h-5 stroke-[1.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                    Left Hero Image Slot
                  </p>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                    (Ready to insert image)
                  </span>
                </div>
              )}
            </div>

            {/* Right Image Card (Wider ~60% width on desktop) */}
            <div className="lg:col-span-7 relative w-full rounded-[22px] sm:rounded-[28px] lg:rounded-[32px] overflow-hidden bg-zinc-100/70 dark:bg-zinc-900/40 border border-zinc-200/70 dark:border-zinc-800/70 min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col justify-center items-center transition-all duration-300 group">
              {rightImageSlot ? (
                rightImageSlot
              ) : (
                /* Empty placeholder frame ready for user image */
                <div className="w-full h-full min-h-[260px] sm:min-h-[320px] lg:min-h-[380px] flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-10 h-10 rounded-xl bg-white/70 dark:bg-zinc-800/70 border border-zinc-200/50 dark:border-zinc-700/50 flex items-center justify-center text-zinc-400 dark:text-zinc-500 mb-2.5 group-hover:scale-105 transition-transform">
                    <svg
                      className="w-5 h-5 stroke-[1.5]"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                      <circle cx="9" cy="9" r="2" />
                      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                    </svg>
                  </div>
                  <p className="font-['Plus_Jakarta_Sans',sans-serif] text-[13px] font-medium text-zinc-500 dark:text-zinc-400">
                    Right Hero Image Slot
                  </p>
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                    (Ready to insert image)
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
export default Hero3;
