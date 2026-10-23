"use client";

import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";
import {
  Anthropic,
  Replicate,
  GitHub,
  Vercel,
  Grok,
} from "@/components/logos/all-logos";

/**
 * High-performance, zero-flicker gradient background converted directly from gradient.html.
 * Uses GPU-accelerated layered radial and linear gradients so on initial page load and refresh,
 * there is zero lag, zero canvas repainting flash, and zero banding.
 */
export function HeroGradientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full pointer-events-none select-none", className)}
      style={{
        background: `
          radial-gradient(
            90% 45% at 50% 8%, 
            rgba(3, 8, 26, 0.85) 0%, 
            rgba(3, 12, 38, 0.4) 55%, 
            transparent 100%
          ),
          radial-gradient(
            75% 32% at 50% 58%, 
            rgba(18, 99, 255, 0.55) 0%, 
            transparent 100%
          ),
          linear-gradient(
            180deg,
            #03091c 0%,
            #051131 16%,
            #08215c 32%,
            #0b3996 45%,
            #0d56d9 56%,
            #256ef0 64%,
            #669df6 74%,
            #bfd6fb 83%,
            #f2f7fe 90%,
            #ffffff 95%,
            #ffffff 100%
          )
        `,
      }}
    >
      {/* Subtle side vertical edge highlights from gradient.html */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.04) 0%,
            transparent 4%,
            transparent 96%,
            rgba(255, 255, 255, 0.04) 100%
          )`,
        }}
      />
    </div>
  );
}

export interface Hero4Props {
  className?: string;
  onAutomateSubmit?: (prompt: string) => void;
}

export function Hero4({ className, onAutomateSubmit }: Hero4Props) {
  const [promptValue, setPromptValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptValue.trim()) {
      onAutomateSubmit?.(promptValue.trim());
    }
  };

  const logos = [
    {
      name: "Anthropic",
      Component: Anthropic,
      containerClass: "w-32 sm:w-38 md:w-44",
      logoClass: "w-full h-auto max-h-7 sm:max-h-8 md:max-h-8.5",
    },
    {
      name: "Grok",
      Component: Grok,
      containerClass: "w-28 sm:w-32 md:w-38",
      logoClass: "w-full h-auto max-h-8 sm:max-h-9 md:max-h-9.5",
    },
    {
      name: "Replicate",
      Component: Replicate,
      containerClass: "w-28 sm:w-34 md:w-38",
      logoClass: "w-full h-auto max-h-7 sm:max-h-8 md:max-h-8.5",
    },
    {
      name: "GitHub",
      Component: GitHub,
      containerClass: "w-22 sm:w-26 md:w-28",
      logoClass: "w-full h-auto max-h-6 sm:max-h-7 md:max-h-7.5",
    },
    {
      name: "Vercel",
      Component: Vercel,
      containerClass: "w-26 sm:w-30 md:w-34",
      logoClass: "w-full h-auto max-h-6 sm:max-h-7 md:max-h-7.5",
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen md:h-screen md:max-h-screen overflow-x-hidden md:overflow-hidden flex flex-col justify-between font-['Inter',sans-serif] bg-white",
        className
      )}
    >
      {/* Background Gradient converted from gradient.html (Zero-flicker, instant render) */}
      <HeroGradientBackground />

      {/* Top Navbar */}
      <header className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-4 sm:pt-6 flex items-center justify-between shrink-0">
        {/* Brand: Zuris White Version Logo */}
        <Link href="/" className="flex items-center gap-2.5 group" aria-label="Zuris Home">
          <ZurisWhiteV1 className="h-5 sm:h-5.5 w-auto text-white shrink-0" />
          <span className="text-white text-lg font-semibold tracking-[-0.03em] font-['Inter',sans-serif]">
            Zuris
          </span>
        </Link>

        {/* Center Nav Links: Cloud Platform / SaaS Focus */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          <Link
            href="#compute"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Cloud Compute
          </Link>
          <Link
            href="#serverless"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Serverless
          </Link>
          <Link
            href="#pipelines"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Pipelines
          </Link>
          <Link
            href="#docs"
            className="text-white/80 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Right CTA / Auth */}
        <div className="flex items-center gap-5 sm:gap-6">
          <Link
            href="#signin"
            className="text-white/85 hover:text-white text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="#get-started"
            className="text-white hover:text-white/85 text-sm font-normal tracking-[-0.02em] transition-colors inline-flex items-center gap-1 font-medium"
          >
            <span>Start free</span>
            <svg
              className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 sm:px-8 my-auto py-4 sm:py-6 md:py-8 flex flex-col items-center text-center">
        {/* Top Growth Pill Badge */}
        <div className="inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-[#0a183d]/50 backdrop-blur-md border border-white/15 text-xs sm:text-[13px] text-white/90 mb-3.5 sm:mb-4.5 font-normal tracking-[-0.02em]">
          <span>#1 Cloud & Workflow Platform for Engineering Teams</span>
          <span className="text-white/30">|</span>
          <Link href="#explore" className="text-white font-medium hover:underline">
            Explore platform
          </Link>
        </div>

        {/* Main Headline: h2 tag, 400 weight (font-normal), -4.5% tracking */}
        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-[50px] xl:text-[56px] font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.08] sm:leading-[1.05] mb-3 sm:mb-4">
          Connect to any cloud.
          <br />
          Automate every workload.
        </h2>

        {/* Description: p base, 85% mutedness, 400 weight, -4.5% tracking */}
        <p className="text-white/85 text-sm sm:text-base font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.55] max-w-xl sm:max-w-2xl mb-5 sm:mb-7">
          Zuris orchestrates your microservices, APIs, and cloud infrastructure into unified automated workflows — scaling your workloads globally without the DevOps overhead.
        </p>

        {/* Prompt / Automate Input Box */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-lg sm:max-w-xl bg-white rounded-2xl sm:rounded-[20px] p-3.5 sm:p-4 flex flex-col justify-between min-h-[85px] sm:min-h-[95px] text-left"
        >
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Describe a cloud service or workflow to automate..."
            className="w-full bg-transparent border-none outline-none text-[#040404] placeholder:text-zinc-400 font-['Inter',sans-serif] font-normal text-sm sm:text-base tracking-[-0.045em]"
          />
          <div className="flex justify-end mt-2 sm:mt-3">
            <button
              type="submit"
              className="w-7.5 h-7.5 sm:w-8.5 sm:h-8.5 rounded-full bg-[#1864f7] text-white flex items-center justify-center transition-opacity hover:opacity-90 cursor-pointer shrink-0"
              aria-label="Submit automation prompt"
            >
              <svg
                className="w-3.5 h-3.5 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </button>
          </div>
        </form>
      </div>

      {/* Bottom Logos Ribbon: OpenAI removed; Anthropic, Grok, Replicate, GitHub, Vercel prominent */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pb-5 sm:pb-7 pt-2 shrink-0">
        <div className="flex flex-col md:flex-row items-center justify-between gap-5 md:gap-8">
          {/* Left Text */}
          <div className="text-zinc-600 text-xs sm:text-sm font-['Inter',sans-serif] font-normal leading-[1.35] tracking-[-0.02em] text-center md:text-left shrink-0">
            Trusted by fast-growing
            <br />
            cloud teams around the world
          </div>

          {/* Right Logos: Anthropic, Grok, Replicate, GitHub, Vercel */}
          <div className="flex flex-wrap items-center justify-center md:justify-end gap-5 sm:gap-7 md:gap-9 lg:gap-11 flex-1 text-zinc-800">
            {logos.map(({ name, Component, containerClass, logoClass }) => (
              <div
                key={name}
                className={cn(
                  "flex items-center justify-center opacity-85 hover:opacity-100 transition-opacity",
                  containerClass
                )}
              >
                <Component className={logoClass} />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </section>
  );
}

export default Hero4;
