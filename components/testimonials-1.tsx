"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ClaudeAI, Shopify, Stripe } from "@/components/logo-only/all-logos";

export interface Testimonials1Props {
  className?: string;
  variant?: "dual" | "trio";
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

export function Testimonials1({ className, variant = "trio" }: Testimonials1Props) {
  // Dual Variant
  if (variant === "dual") {
    return (
      <section
        id="customers"
        className={cn(
          "w-full max-w-full overflow-hidden bg-transparent text-zinc-950 dark:text-zinc-50 py-8 sm:py-12 lg:py-16 font-sans flex items-center justify-center transition-colors duration-300",
          className
        )}
      >
        <div className="w-full max-w-[1360px] mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
          <div className="flex flex-nowrap lg:flex-row gap-3.5 sm:gap-4 lg:gap-5 overflow-x-auto lg:overflow-x-visible overflow-y-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 items-stretch justify-start lg:justify-center">
            {/* Card 1: Reduced to 360px on mobile (<sm); 440px on tablet & desktop; 390px on 1024-1300px */}
            <div className="relative shrink-0 lg:shrink w-[88vw] max-w-[540px] lg:max-w-none lg:w-auto lg:flex-[1.65] min-[1300px]:w-[880px] min-[1300px]:flex-none h-[360px] sm:h-[440px] lg:max-[1300px]:h-[390px] min-[1300px]:h-[440px] rounded-[8px] overflow-hidden p-5 sm:p-[24px_32px] lg:max-[1300px]:p-[24px_24px] flex flex-col justify-between bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fde2d4] border border-[#d2def0] text-zinc-950 select-none">
              {/* Claude Watermark: Only visible on lg+ */}
              <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[560px] h-[560px] sm:w-[660px] sm:h-[660px] lg:w-[480px] lg:h-[480px] min-[1300px]:w-[680px] min-[1300px]:h-[680px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 hidden lg:flex items-center justify-center select-none"
                aria-hidden="true"
              >
                <ClaudeAI className="w-full h-full" />
              </div>

              {/* Main Quote */}
              <div className="relative z-10 max-w-xl flex items-start gap-2 text-left text-base sm:text-xl lg:max-[1300px]:text-[1.125rem] min-[1300px]:text-[22px]">
                <div className="shrink-0 -mt-[4px] lg:max-[1300px]:-mt-[5px] min-[1300px]:-mt-[6px] select-none text-zinc-900">
                  <InvertedCommasOpen />
                </div>
                <h5 className="font-sans font-normal text-inherit leading-[1.35] tracking-[-0.025em] text-zinc-950 m-0 text-left">
                  You’ll probably build a better product,
                  <br className="hidden sm:inline" /> just because of the craft
                  that using
                  <br className="hidden sm:inline" /> Linear infuses on your
                  brain.
                  <span className="inline-block ml-1 align-top -translate-y-[4px] lg:max-[1300px]:-translate-y-[5px] min-[1300px]:-translate-y-[6px] select-none text-zinc-900">
                    <InvertedCommasClose />
                  </span>
                </h5>
              </div>

              {/* Author Badge */}
              <div className="relative z-10 flex items-center gap-3 mt-auto">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <ClaudeAI className="w-full h-full" />
                </div>
                <div className="h-7 sm:h-8 w-px bg-zinc-900/15 shrink-0" aria-hidden="true" />
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

            {/* Card 2: Reduced to 360px on mobile (<sm); 440px on tablet & desktop; 390px on 1024-1300px */}
            <div className="relative shrink-0 lg:shrink w-[85vw] max-w-[420px] lg:max-w-none lg:w-auto lg:flex-1 min-[1300px]:w-[440px] min-[1300px]:flex-none h-[360px] sm:h-[440px] lg:max-[1300px]:h-[390px] min-[1300px]:h-[440px] rounded-[8px] overflow-hidden p-5 sm:p-[24px_32px] lg:max-[1300px]:p-[24px_24px] flex flex-col justify-between bg-gradient-to-br from-[#e0fceb] via-[#f0fdd8] to-[#fef3c7] border border-[#cdeed6] text-zinc-950 select-none">
              {/* Shopify Watermark: Only visible on lg+ */}
              <div
                className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[460px] h-[460px] sm:w-[540px] sm:h-[540px] lg:w-[420px] lg:h-[420px] min-[1300px]:w-[560px] min-[1300px]:h-[560px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 hidden lg:flex items-center justify-center select-none"
                aria-hidden="true"
              >
                <Shopify className="w-full h-full" />
              </div>

              {/* Main Quote */}
              <div className="relative z-10 max-w-md flex items-start gap-2 text-left text-base sm:text-xl lg:max-[1300px]:text-[1.125rem] min-[1300px]:text-[22px]">
                <div className="shrink-0 -mt-[4px] lg:max-[1300px]:-mt-[5px] min-[1300px]:-mt-[6px] select-none text-zinc-900">
                  <InvertedCommasOpen />
                </div>
                <h5 className="font-sans font-normal text-inherit leading-[1.35] tracking-[-0.025em] text-zinc-950 m-0 text-left">
                  Our speed is intense
                  <br className="hidden sm:inline" /> and Linear helps us
                  <br className="hidden sm:inline" /> be action biased.
                  <span className="inline-block ml-1 align-top -translate-y-[4px] lg:max-[1300px]:-translate-y-[5px] min-[1300px]:-translate-y-[6px] select-none text-zinc-900">
                    <InvertedCommasClose />
                  </span>
                </h5>
              </div>

              {/* Author Badge */}
              <div className="relative z-10 flex items-center gap-3 mt-auto">
                <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                  <Shopify className="w-full h-full" />
                </div>
                <div className="h-7 sm:h-8 w-px bg-zinc-900/15 shrink-0" aria-hidden="true" />
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
        </div>
      </section>
    );
  }

  // Trio Variant (Reduced to 360px on mobile (<sm); 440px on tablet & desktop; 390px on 1024-1300px)
  return (
    <section
      id="customers"
      className={cn(
        "w-full max-w-full overflow-hidden bg-transparent text-zinc-950 dark:text-zinc-50 py-8 sm:py-12 lg:py-16 font-sans flex items-center justify-center transition-colors duration-300",
        className
      )}
    >
      <div className="w-full max-w-[1360px] mx-auto overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="flex flex-nowrap lg:grid lg:grid-cols-3 gap-3 sm:gap-3.5 lg:gap-3.5 xl:gap-4 overflow-x-auto lg:overflow-x-visible overflow-y-hidden no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-2 items-stretch">
          {/* Card 1 */}
          <div className="relative shrink-0 lg:shrink w-[88vw] sm:w-[420px] md:w-[460px] lg:w-auto h-[360px] sm:h-[440px] lg:max-[1300px]:h-[390px] min-[1300px]:h-[440px] rounded-[8px] overflow-hidden p-5 sm:p-[24px_32px] lg:max-[1300px]:p-[24px_22px] flex flex-col justify-between bg-gradient-to-br from-[#dbeafe] via-[#ede9fe] to-[#fde2d4] border border-[#d2def0] text-zinc-950 select-none">
            {/* Claude Watermark */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[320px] h-[320px] min-[1300px]:w-[420px] min-[1300px]:h-[420px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 hidden lg:flex items-center justify-center select-none"
              aria-hidden="true"
            >
              <ClaudeAI className="w-full h-full" />
            </div>

            {/* Main Quote */}
            <div className="relative z-10 w-full flex items-start gap-1.5 sm:gap-2 text-left text-base sm:text-lg lg:max-[1300px]:text-[0.975rem] min-[1300px]:text-[1.2rem]">
              <div className="shrink-0 -mt-[3px] lg:max-[1300px]:-mt-[4px] min-[1300px]:-mt-[6px] select-none text-zinc-900">
                <InvertedCommasOpen />
              </div>
              <h5 className="font-sans font-normal text-inherit leading-[1.38] tracking-[-0.025em] text-zinc-950 m-0 text-left">
                You’ll probably build a better product, just because of the
                craft that Linear infuses on you.
                <span className="inline-block ml-1 align-top -translate-y-[3px] lg:max-[1300px]:-translate-y-[4px] min-[1300px]:-translate-y-[6px] select-none text-zinc-900">
                  <InvertedCommasClose />
                </span>
              </h5>
            </div>

            {/* Author Badge */}
            <div className="relative z-10 flex items-center gap-3 mt-auto">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                <ClaudeAI className="w-full h-full" />
              </div>
              <div className="h-7 sm:h-8 w-px bg-zinc-900/15 shrink-0" aria-hidden="true" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-medium text-xs sm:text-sm text-zinc-950 leading-tight">
                  Julian Thorne
                </span>
                <span className="font-sans font-normal text-[11px] sm:text-xs text-zinc-600 leading-tight mt-0.5">
                  Principal Architect, Anthropic
                </span>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="relative shrink-0 lg:shrink w-[88vw] sm:w-[420px] md:w-[460px] lg:w-auto h-[360px] sm:h-[440px] lg:max-[1300px]:h-[390px] min-[1300px]:h-[440px] rounded-[8px] overflow-hidden p-5 sm:p-[24px_32px] lg:max-[1300px]:p-[24px_22px] flex flex-col justify-between bg-gradient-to-br from-[#e0fceb] via-[#f0fdd8] to-[#fef3c7] border border-[#cdeed6] text-zinc-950 select-none">
            {/* Shopify Watermark */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[320px] h-[320px] min-[1300px]:w-[420px] min-[1300px]:h-[420px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 hidden lg:flex items-center justify-center select-none"
              aria-hidden="true"
            >
              <Shopify className="w-full h-full" />
            </div>

            {/* Main Quote */}
            <div className="relative z-10 w-full flex items-start gap-1.5 sm:gap-2 text-left text-base sm:text-lg lg:max-[1300px]:text-[0.975rem] min-[1300px]:text-[1.2rem]">
              <div className="shrink-0 -mt-[3px] lg:max-[1300px]:-mt-[4px] min-[1300px]:-mt-[6px] select-none text-zinc-900">
                <InvertedCommasOpen />
              </div>
              <h5 className="font-sans font-normal text-inherit leading-[1.38] tracking-[-0.025em] text-zinc-950 m-0 text-left">
                Our speed is intense and Linear consistently helps us be
                action biased in execution.
                <span className="inline-block ml-1 align-top -translate-y-[3px] lg:max-[1300px]:-translate-y-[4px] min-[1300px]:-translate-y-[6px] select-none text-zinc-900">
                  <InvertedCommasClose />
                </span>
              </h5>
            </div>

            {/* Author Badge */}
            <div className="relative z-10 flex items-center gap-3 mt-auto">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                <Shopify className="w-full h-full" />
              </div>
              <div className="h-7 sm:h-8 w-px bg-zinc-900/15 shrink-0" aria-hidden="true" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-medium text-xs sm:text-sm text-zinc-950 leading-tight">
                  Chloe Bennett
                </span>
                <span className="font-sans font-normal text-[11px] sm:text-xs text-zinc-600 leading-tight mt-0.5">
                  Director of Engineering, Shopify
                </span>
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="relative shrink-0 lg:shrink w-[88vw] sm:w-[420px] md:w-[460px] lg:w-auto h-[360px] sm:h-[440px] lg:max-[1300px]:h-[390px] min-[1300px]:h-[440px] rounded-[8px] overflow-hidden p-5 sm:p-[24px_32px] lg:max-[1300px]:p-[24px_22px] flex flex-col justify-between bg-gradient-to-br from-[#ede9fe] via-[#fce7f3] to-[#ffe4e6] border border-[#e8d5f5] text-zinc-950 select-none">
            {/* Stripe Watermark */}
            <div
              className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 translate-x-[40%] w-[320px] h-[320px] min-[1300px]:w-[420px] min-[1300px]:h-[420px] opacity-[0.025] text-zinc-950 [&_path]:fill-zinc-950 hidden lg:flex items-center justify-center select-none"
              aria-hidden="true"
            >
              <Stripe className="w-full h-full" />
            </div>

            {/* Main Quote */}
            <div className="relative z-10 w-full flex items-start gap-1.5 sm:gap-2 text-left text-base sm:text-lg lg:max-[1300px]:text-[0.975rem] min-[1300px]:text-[1.2rem]">
              <div className="shrink-0 -mt-[3px] lg:max-[1300px]:-mt-[4px] min-[1300px]:-mt-[6px] select-none text-zinc-900">
                <InvertedCommasOpen />
              </div>
              <h5 className="font-sans font-normal text-inherit leading-[1.38] tracking-[-0.025em] text-zinc-950 m-0 text-left">
                Linear cut our cycle times in half. The clarity it delivers
                across every team is unmatched.
                <span className="inline-block ml-1 align-top -translate-y-[3px] lg:max-[1300px]:-translate-y-[4px] min-[1300px]:-translate-y-[6px] select-none text-zinc-900">
                  <InvertedCommasClose />
                </span>
              </h5>
            </div>

            {/* Author Badge */}
            <div className="relative z-10 flex items-center gap-3 mt-auto">
              <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0">
                <Stripe className="w-full h-full" />
              </div>
              <div className="h-7 sm:h-8 w-px bg-zinc-900/15 shrink-0" aria-hidden="true" />
              <div className="flex flex-col text-left">
                <span className="font-sans font-medium text-xs sm:text-sm text-zinc-950 leading-tight">
                  Marcus Vance
                </span>
                <span className="font-sans font-normal text-[11px] sm:text-xs text-zinc-600 leading-tight mt-0.5">
                  Head of Infrastructure, Stripe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials1;
