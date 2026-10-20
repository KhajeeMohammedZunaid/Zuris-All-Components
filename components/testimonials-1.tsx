"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ClaudeAI, Shopify } from "@/components/logo-only/all-logos";

export interface Testimonials1Props {
  className?: string;
}

/**
 * Smooth opening quotation mark
 */
function InvertedCommasOpen({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current select-none inline-block", className)}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M3.5 12c-1.4 0-2.5-1-2.5-2.6 0-2.4 1.8-5.1 4.5-6.4l.7 1.1c-2 1.1-3 2.7-3.2 4.2.4-.2.9-.3 1.5-.3 1.3 0 2.3 1 2.3 2.1 0 1.1-.9 1.9-2.3 1.9zm7.5 0c-1.4 0-2.5-1-2.5-2.6 0-2.4 1.8-5.1 4.5-6.4l.7 1.1c-2 1.1-3 2.7-3.2 4.2.4-.2.9-.3 1.5-.3 1.3 0 2.3 1 2.3 2.1 0 1.1-.9 1.9-2.3 1.9z" />
    </svg>
  );
}

/**
 * Smooth closing quotation mark - matching pair rotated 180deg
 */
function InvertedCommasClose({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 fill-current select-none inline-block rotate-180", className)}
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="M3.5 12c-1.4 0-2.5-1-2.5-2.6 0-2.4 1.8-5.1 4.5-6.4l.7 1.1c-2 1.1-3 2.7-3.2 4.2.4-.2.9-.3 1.5-.3 1.3 0 2.3 1 2.3 2.1 0 1.1-.9 1.9-2.3 1.9zm7.5 0c-1.4 0-2.5-1-2.5-2.6 0-2.4 1.8-5.1 4.5-6.4l.7 1.1c-2 1.1-3 2.7-3.2 4.2.4-.2.9-.3 1.5-.3 1.3 0 2.3 1 2.3 2.1 0 1.1-.9 1.9-2.3 1.9z" />
    </svg>
  );
}

export function Testimonials1({ className }: Testimonials1Props) {
  return (
    <section
      id="customers"
      className={cn(
        "w-full bg-transparent text-zinc-950 dark:text-zinc-50 py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 font-sans flex items-center justify-center transition-colors duration-300",
        className
      )}
    >
      <div className="w-full max-w-[1360px] mx-auto flex flex-col lg:flex-row gap-4 sm:gap-5 items-stretch justify-center">
        {/* Card 1: 880x440 Card with light peach-blue pastel gradient and Claude AI Logo */}
        <div className="relative w-full lg:w-[880px] h-[440px] shrink-0 rounded-[8px] overflow-hidden p-[24px_32px] flex flex-col justify-between bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fde2d4] border border-[#d2def0] text-zinc-950 select-none">
          {/* Claude Watermark: scaled large, ultra-faint ghost opacity (0.025) */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[560px] h-[560px] sm:w-[660px] sm:h-[660px] lg:w-[720px] lg:h-[720px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <ClaudeAI className="w-full h-full" />
          </div>

          {/* Main Quote: Inverted commas flush with text top */}
          <div className="relative z-10 max-w-xl flex items-start gap-2 text-left text-lg sm:text-xl lg:text-[22px]">
            {/* Opening Inverted Commas */}
            <div className="shrink-0 -mt-[6px] select-none text-zinc-900">
              <InvertedCommasOpen />
            </div>

            {/* <h5> Quote Text broken into balanced chunks */}
            <h5 className="font-sans font-normal text-inherit leading-[1.35] tracking-[-0.025em] text-zinc-950 m-0 text-left">
              You’ll probably build a better product,
              <br />
              just because of the craft that using
              <br />
              Linear infuses on your brain.
              <span className="inline-block ml-1 align-top -translate-y-[6px] select-none text-zinc-900">
                <InvertedCommasClose />
              </span>
            </h5>
          </div>

          {/* Author Badge: Claude Logo, Divider, Name & Role */}
          <div className="relative z-10 flex items-center gap-3.5 mt-auto">
            {/* Claude Logo */}
            <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
              <ClaudeAI className="w-full h-full" />
            </div>

            {/* Vertical Divider */}
            <div
              className="h-8 w-px bg-zinc-900/15 shrink-0"
              aria-hidden="true"
            />

            {/* Author Information */}
            <div className="flex flex-col text-left">
              <span className="font-sans font-medium text-xs sm:text-sm text-zinc-950 leading-tight">
                Julian Thorne
              </span>
              <span className="font-sans font-normal text-[11px] sm:text-xs text-zinc-600 leading-tight mt-0.5">
                Principal Product Architect, Anthropic
              </span>
            </div>
          </div>
        </div>

        {/* Card 2: 440px height Card with blended mint-lime pastel gradient and Shopify Logo */}
        <div className="relative w-full lg:flex-1 h-[440px] rounded-[8px] overflow-hidden p-[24px_32px] flex flex-col justify-between bg-gradient-to-br from-[#e0fceb] via-[#f0fdd8] to-[#fef3c7] border border-[#cdeed6] text-zinc-950 select-none">
          {/* Shopify Watermark: scaled large, ultra-faint ghost opacity (0.025) */}
          <div
            className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] lg:w-[600px] lg:h-[600px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 flex items-center justify-center select-none"
            aria-hidden="true"
          >
            <Shopify className="w-full h-full" />
          </div>

          {/* Main Quote: Inverted commas flush with text top */}
          <div className="relative z-10 max-w-md flex items-start gap-2 text-left text-lg sm:text-xl lg:text-[22px]">
            {/* Opening Inverted Commas */}
            <div className="shrink-0 -mt-[6px] select-none text-zinc-900">
              <InvertedCommasOpen />
            </div>

            {/* <h5> Quote Text broken into balanced chunks */}
            <h5 className="font-sans font-normal text-inherit leading-[1.35] tracking-[-0.025em] text-zinc-950 m-0 text-left">
              Our speed is intense
              <br />
              and Linear helps us
              <br />
              be action biased.
              <span className="inline-block ml-1 align-top -translate-y-[6px] select-none text-zinc-900">
                <InvertedCommasClose />
              </span>
            </h5>
          </div>

          {/* Author Badge: Shopify Logo, Divider, Name & Role */}
          <div className="relative z-10 flex items-center gap-3.5 mt-auto">
            {/* Shopify Logo */}
            <div className="w-8 h-8 flex items-center justify-center shrink-0">
              <Shopify className="w-full h-full" />
            </div>

            {/* Vertical Divider */}
            <div
              className="h-8 w-px bg-zinc-900/15 shrink-0"
              aria-hidden="true"
            />

            {/* Author Information */}
            <div className="flex flex-col text-left">
              <span className="font-sans font-medium text-xs sm:text-sm text-zinc-950 leading-tight">
                Chloe Bennett
              </span>
              <span className="font-sans font-normal text-[11px] sm:text-xs text-zinc-600 leading-tight mt-0.5">
                Director of Product Engineering, Shopify
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials1;
