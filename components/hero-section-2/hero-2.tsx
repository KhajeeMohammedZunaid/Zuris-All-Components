"use client";

import * as React from "react";
import { NavbarHero2 } from "./navbar";
import { Button } from "@/components/ui/button";
import {
  OpenAI,
  Anthropic,
  Replicate,
  GitHub,
  Vercel,
  Grok,
} from "@/components/logos/all-logos";

interface Hero2Props {
  onGetStarted?: () => void;
  onViewDemo?: () => void;
  onLogin?: () => void;
}

export function Hero2({ onGetStarted, onViewDemo, onLogin }: Hero2Props) {
  return (
    <section className="w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-[family-name:var(--font-jakarta-display)] select-none px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10">
      {/* Centered Architecture Container with continuous vertical border lines running down */}
      <div className="w-full max-w-[1240px] 2xl:max-w-[1360px] mx-auto border-x border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] flex flex-col min-h-screen">
        {/* Top Navbar */}
        <NavbarHero2
          onLoginClick={onLogin}
          onGetStartedClick={onGetStarted}
        />

        {/* Hero Header Section: Headline Left + Description & CTA Right */}
        <div className="w-full px-6 sm:px-8 pt-10 sm:pt-14 lg:pt-16 pb-8 sm:pb-12">
          <div className="flex flex-col lg:flex-row lg:items-stretch lg:justify-between gap-6 lg:gap-8 xl:gap-12">
            {/* Left: h3 headline, semibold, -3% letterspacing, CMS SaaS */}
            <div className="flex-1 min-w-0 flex flex-col items-start justify-between">
              <h3 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-[2.25rem] xl:text-[2.85rem] leading-[1.08] tracking-[-0.03em] text-zinc-950 dark:text-zinc-50 font-[family-name:var(--font-jakarta-display)] m-0">
                Create, Manage and
                <br />
                Publish Content in
                <br />
                One Fast Workspace
              </h3>
            </div>

            {/* Right: p lead, normal 400, -3% letterspacing + side-by-side buttons aligned with headline */}
            <div className="w-full lg:w-[380px] xl:w-[430px] 2xl:w-[470px] flex-shrink-0 flex flex-col justify-between gap-4">
              <p className="text-sm sm:text-base lg:text-[0.875rem] xl:text-[0.95rem] text-zinc-600 dark:text-zinc-400 font-normal tracking-[-0.03em] leading-[1.5] m-0 font-[family-name:var(--font-jakarta-display)]">
               Create, organize, collaborate and publish your content in one workspace that helps you understand more, connect workflows and ship with confidence.
              </p>

              {/* Action Buttons: side by side across all screens including mobile and laptops */}
              <div className="flex flex-row items-center gap-2.5 sm:gap-3 w-full">
                <Button
                  onClick={onGetStarted}
                  className="flex-1 sm:flex-initial rounded-none bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-xs sm:text-sm h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-5 shadow-none inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>Get started</span>
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  onClick={onViewDemo}
                  className="flex-1 sm:flex-initial rounded-none border border-zinc-200 dark:border-zinc-800 bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-900 dark:text-zinc-100 font-normal tracking-[-0.03em] text-xs sm:text-sm h-9 lg:h-9.5 xl:h-10 px-3.5 sm:px-5 shadow-none inline-flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                >
                  <span>View demo</span>
                  <svg
                    className="w-3.5 h-3.5 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image: Directly framed between vertical grid lines */}
        <div className="w-full border-t border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b] overflow-hidden">
          <img
            src="/hero-img.png"
            alt="Zuris CMS Dashboard"
            className="w-full h-auto block rounded-none select-none"
            loading="eager"
          />
        </div>

        {/* Logos Ribbon: OpenAI, Anthropic, Replicate, GitHub, Vercel, Grok */}
        <div className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#09090b]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-x divide-zinc-200 dark:divide-zinc-800 items-stretch">
            {/* OpenAI */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-36 sm:w-44 lg:w-48 flex items-center justify-center dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-opacity">
                <OpenAI className="w-full h-auto max-h-10 sm:max-h-12" />
              </div>
            </div>

            {/* Anthropic */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-28 sm:w-32 lg:w-36 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-opacity">
                <Anthropic className="w-full h-auto max-h-6 sm:max-h-7" />
              </div>
            </div>

            {/* Replicate */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-28 sm:w-32 lg:w-36 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-opacity">
                <Replicate className="w-full h-auto max-h-6 sm:max-h-7" />
              </div>
            </div>

            {/* GitHub */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-18 sm:w-20 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-opacity">
                <GitHub className="w-full h-auto max-h-5 sm:max-h-5.5" />
              </div>
            </div>

            {/* Vercel - Slightly reduced as requested */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-22 sm:w-26 lg:w-28 flex items-center justify-center dark:invert dark:brightness-100 opacity-90 group-hover:opacity-100 transition-opacity">
                <Vercel className="w-full h-auto max-h-5 sm:max-h-6" />
              </div>
            </div>

            {/* Grok */}
            <div className="h-18 sm:h-22 flex items-center justify-center px-4 group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-900/40">
              <div className="w-24 sm:w-28 lg:w-32 flex items-center justify-center dark:invert dark:brightness-100 opacity-85 group-hover:opacity-100 transition-opacity">
                <Grok className="w-full h-auto max-h-7 sm:max-h-8" />
              </div>
            </div>
          </div>
        </div>

        {/* Clean extension area below logos so vertical lines continue down */}
        <div className="w-full flex-1 bg-white dark:bg-[#09090b] min-h-[4rem]" />
      </div>
    </section>
  );
}
