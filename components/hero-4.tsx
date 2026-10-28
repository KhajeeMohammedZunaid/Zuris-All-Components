"use client";

import * as React from "react";
import Link from "next/link";

import { motion } from "motion/react";
import { BorderBeam } from "border-beam";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";
import {
  Mocha,
  Manus,
  Firecrawl,
  Grida,
  Grok,
} from "@/components/logos/all-logos";

/**
 * High-performance, zero-flicker gradient background converted directly from gradient.html.
 * Uses GPU-accelerated layered radial and linear gradients for instantaneous, smooth rendering.
 */
export function HeroGradientBackground({ className }: { className?: string }) {
  return (
    <div
      className={cn("absolute inset-0 w-full h-full pointer-events-none select-none transform-gpu [contain:strict]", className)}
      style={{
        transform: "translate3d(0, 0, 0)",
        backfaceVisibility: "hidden",
        WebkitBackfaceVisibility: "hidden",
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
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (promptValue.trim()) {
      onAutomateSubmit?.(promptValue.trim());
    }
  };

  const logos = [
    {
      name: "Mocha",
      Component: Mocha,
      logoClass: "h-3.5 xs:h-4 sm:h-[18px] lg:h-5 w-auto",
    },
    {
      name: "Manus",
      Component: Manus,
      logoClass: "h-5 xs:h-5.5 sm:h-[24px] lg:h-[26px] w-auto",
    },
    {
      name: "Firecrawl",
      Component: Firecrawl,
      logoClass: "h-4.5 xs:h-5 sm:h-[22px] lg:h-6 w-auto",
    },
    {
      name: "Grida",
      Component: Grida,
      logoClass: "h-5 xs:h-5.5 sm:h-[24px] lg:h-[26px] w-auto",
    },
    {
      name: "Grok",
      Component: Grok,
      logoClass: "h-5.5 xs:h-6 sm:h-[26px] lg:h-7 w-auto",
    },
  ];

  return (
    <section
      className={cn(
        "relative w-full min-h-screen lg:h-screen lg:max-h-screen overflow-x-hidden lg:overflow-hidden flex flex-col justify-between font-['Inter',sans-serif] bg-white",
        className
      )}
    >
      {/* Seamless Left-to-Right Marquee Keyframes for Mobile & Tablet with 100% mathematically uniform spacing */}
      <style jsx>{`
        @keyframes marquee-ltr {
          0% {
            transform: translate3d(-50%, 0, 0);
          }
          100% {
            transform: translate3d(0%, 0, 0);
          }
        }
        .animate-marquee-ltr {
          animation: marquee-ltr 24s linear infinite;
          will-change: transform;
          transform: translate3d(0, 0, 0);
          -webkit-transform: translate3d(0, 0, 0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
      `}</style>

      {/* Background Gradient converted from gradient.html */}
      <HeroGradientBackground />

      {/* Top Navbar Header (powered by motion/react) */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-50 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pt-3.5 sm:pt-5 flex items-center justify-between shrink-0 transform-gpu will-change-[transform,opacity]"
      >
        {/* Brand: Zuris White Version Logo */}
        <div className="flex items-center justify-start min-w-[100px] sm:min-w-[150px]">
          <Link href="/" className="flex items-center gap-2 group" aria-label="Zuris Home">
            <ZurisWhiteV1 className="h-4.5 sm:h-5 w-auto text-white shrink-0" />
            <span className="text-white text-base font-semibold tracking-[-0.03em] font-['Inter',sans-serif]">
              Zuris
            </span>
          </Link>
        </div>

        {/* Center Nav Links: Centered mathematically on desktop */}
        <nav className="hidden lg:flex items-center justify-center gap-6 lg:gap-7 absolute left-1/2 -translate-x-1/2">
          <Link
            href="#products"
            className="text-white/80 hover:text-white text-[13px] sm:text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Products
          </Link>
          <Link
            href="#apps"
            className="text-white/80 hover:text-white text-[13px] sm:text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Apps
          </Link>
          <Link
            href="#resources"
            className="text-white/80 hover:text-white text-[13px] sm:text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Resources
          </Link>
          <Link
            href="#docs"
            className="text-white/80 hover:text-white text-[13px] sm:text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Docs
          </Link>
        </nav>

        {/* Right CTA / Auth (Desktop: Buttons, Mobile/Tablet: Hamburger only) */}
        <div className="flex items-center justify-end gap-3 min-w-[40px] lg:min-w-[150px]">
          <Link
            href="#signin"
            className="hidden lg:inline-flex text-white/85 hover:text-white text-xs sm:text-sm font-normal tracking-[-0.02em] transition-colors"
          >
            Sign in
          </Link>

          {/* Desktop Get started Button */}
          <Button
            nativeButton={false}
            render={<Link href="#get-started" />}
            className="hidden lg:inline-flex text-white hover:text-white/90 text-xs sm:text-sm font-medium tracking-[-0.02em] transition-colors items-center gap-1 bg-white/10 hover:bg-white/15 border border-white/20 px-3 py-1.5 h-auto rounded-full shrink-0 shadow-none font-sans"
          >
            <span>Get started</span>
            <svg
              className="size-3 stroke-current stroke-2 fill-none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </Button>

          {/* Mobile Hamburger / Close Button */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden size-8 rounded-full p-0 flex flex-col items-center justify-center gap-1 text-white hover:bg-white/10 hover:text-white transition-colors focus:outline-none cursor-pointer shrink-0 ml-0.5 border-none shadow-none bg-transparent"
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
          >
            <span
              className={cn(
                "w-4 h-[1.5px] bg-white transition-all duration-300 origin-center",
                mobileMenuOpen && "rotate-45 translate-y-[2.5px]"
              )}
            />
            <span
              className={cn(
                "w-4 h-[1.5px] bg-white transition-all duration-300 origin-center",
                mobileMenuOpen && "-rotate-45 -translate-y-[2.5px]"
              )}
            />
          </Button>
        </div>
      </motion.header>

      {/* Mobile Backdrop Click-to-Close (Transparent click catcher) */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-transparent"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile Minimal Floating Glass Navigation Menu */}
      <div
        className={cn(
          "lg:hidden fixed top-[58px] sm:top-[70px] left-5 right-5 sm:left-8 sm:right-8 z-50 bg-white/[0.08] backdrop-blur-2xl border border-white/20 rounded-2xl p-4 sm:p-5 flex flex-col gap-3.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          mobileMenuOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-98 pointer-events-none"
        )}
      >
        {/* Pure Clean Navigation Links: No 'Navigation' header, no descriptions */}
        <nav className="flex flex-col gap-0.5">
          {["Products", "Apps", "Resources", "Docs"].map((item) => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={() => setMobileMenuOpen(false)}
              className="px-3.5 py-2 rounded-xl text-white/90 hover:text-white hover:bg-white/10 text-[15px] font-normal tracking-[-0.02em] transition-colors"
            >
              {item}
            </Link>
          ))}
        </nav>

        {/* Divider */}
        <div className="w-full h-px bg-white/15 my-0.5" />

        {/* Bottom Actions */}
        <div className="flex items-center gap-2.5 pt-1">
          <Button
            nativeButton={false}
            render={<Link href="#signin" />}
            onClick={() => setMobileMenuOpen(false)}
            className="flex-1 text-center py-2.5 h-auto rounded-2xl text-white text-sm font-semibold border border-white/20 bg-white/10 hover:bg-white/15 transition-colors shadow-none font-sans"
          >
            Sign in
          </Button>
          <Button
            nativeButton={false}
            render={<Link href="#get-started" />}
            onClick={() => setMobileMenuOpen(false)}
            className="flex-1 text-center py-2.5 h-auto rounded-2xl text-white bg-[#1864f7] hover:bg-[#1056e0] text-sm font-semibold border-none transition-colors shadow-none font-sans"
          >
            Get started
          </Button>
        </div>
      </div>

      {/* Main Hero Content: Centered in the middle */}
      <div className="relative z-10 w-full max-w-3xl mx-auto px-5 sm:px-8 my-auto py-5 sm:py-6 lg:py-4 flex flex-col items-center text-center">
        {/* Top Growth Pill Badge: Single line guaranteed (powered by border-beam) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mb-2.5 sm:mb-3.5 mx-auto inline-flex transform-gpu will-change-[opacity]"
        >
          <BorderBeam
            size="sm"
            colorVariant="ocean"
            borderRadius={9999}
            duration={2.5}
            className="inline-flex rounded-full"
          >
            <div className="inline-flex items-center justify-center gap-1.5 xs:gap-2 px-3 py-1 rounded-full bg-[#0a183d]/90 backdrop-blur-md border border-white/15 text-[11px] sm:text-xs text-white/90 font-normal tracking-[-0.02em] whitespace-nowrap select-none">
              <span className="whitespace-nowrap">#1 Cloud Platform</span>
              <span className="text-white/30 text-[10px]">|</span>
              <Link
                href="#explore"
                className="text-white font-medium inline-flex items-center gap-1 shrink-0 whitespace-nowrap"
              >
                <span>Explore platform</span>
                <svg
                  className="w-2.5 h-2.5 stroke-current stroke-2 fill-none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            </div>
          </BorderBeam>
        </motion.div>

        {/* Main Headline: Word-by-word staggered reveal (powered by motion/react without clipping descenders) */}
        <h2 className="text-white text-2xl xs:text-[28px] sm:text-4xl lg:text-[42px] xl:text-[46px] font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.18] sm:leading-[1.14] mb-2 sm:mb-2.5 text-center mx-auto select-none">
          <span className="block">
            {["Connect", "any", "cloud."].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.24em] transform-gpu will-change-[transform,opacity,filter]"
                initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.16 + i * 0.065,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          <span className="block mt-0.5 sm:mt-1">
            {["Automate", "everything."].map((word, i) => (
              <motion.span
                key={i}
                className="inline-block mr-[0.24em] transform-gpu will-change-[transform,opacity,filter]"
                initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                transition={{
                  duration: 0.55,
                  delay: 0.36 + i * 0.065,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word}
              </motion.span>
            ))}
          </span>
        </h2>

        {/* Description: Centered, concise, reduced (powered by motion/react) */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.52, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/85 text-xs sm:text-[13.5px] md:text-[14px] font-['Inter',sans-serif] font-normal tracking-[-0.045em] leading-[1.45] max-w-sm sm:max-w-md mb-4 sm:mb-5 text-center mx-auto transform-gpu will-change-[transform,opacity]"
        >
          Connect all your tools and automate workflows in real time — zero engineering overhead.
        </motion.p>

        {/* Prompt / Automate Input Box (powered by motion/react) */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.64, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-sm sm:max-w-md md:max-w-lg bg-white rounded-xl sm:rounded-2xl p-3 sm:p-3.5 flex flex-col justify-between min-h-[72px] sm:min-h-[80px] text-left mx-auto shadow-xl focus-within:ring-2 focus-within:ring-[#1864f7]/30 focus-within:border-blue-400 transform-gpu will-change-[transform,opacity]"
        >
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Start right now. What should we automate?"
            className="w-full bg-transparent border-none outline-none text-[#040404] placeholder:text-zinc-400 font-['Inter',sans-serif] font-normal text-xs sm:text-[13.5px] tracking-[-0.045em]"
          />
          <div className="flex justify-end mt-2">
            <Button
              type="submit"
              size="icon"
              className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full bg-[#1864f7] hover:bg-[#1056e0] text-white flex items-center justify-center cursor-pointer shrink-0 shadow-sm transition-colors border-none p-0"
              aria-label="Submit automation prompt"
            >
              <svg
                className="size-3 stroke-current stroke-2 fill-none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <line x1="12" y1="19" x2="12" y2="5" />
                <polyline points="5 12 12 5 19 12" />
              </svg>
            </Button>
          </div>
        </motion.form>
      </div>

      {/* Bottom Logos Ribbon */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-5 sm:pb-7 lg:pb-10 pt-2 shrink-0">
        {/* Desktop Layout: Static evenly distributed row */}
        <div className="hidden lg:flex items-center justify-between gap-10 lg:gap-14 w-full">
          {/* Left Text (powered by motion/react) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-600 text-xs sm:text-sm font-['Inter',sans-serif] font-normal leading-[1.35] tracking-[-0.02em] text-left shrink-0"
          >
            Trusted by fast-growing
            <br />
            cloud teams around the world
          </motion.div>

          {/* Logos Row (powered by motion/react) */}
          <div className="flex items-center justify-between gap-8 lg:gap-10 flex-1 text-zinc-800">
            {logos.map(({ name, Component, logoClass }, index) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{
                  duration: 0.48,
                  delay: 0.8 + index * 0.065,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ scale: 1.08, opacity: 1 }}
                className="flex items-center justify-center shrink-0 cursor-pointer"
              >
                <Component className={logoClass} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mobile & Tablet Layout: Mathematically consistent Left-to-Right Marquee with blurred ends */}
        <div className="flex lg:hidden flex-col items-center sm:items-start w-full">
          {/* Mobile Footer Text (powered by motion/react) */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.74, ease: [0.16, 1, 0.3, 1] }}
            className="text-zinc-600 text-[11px] sm:text-xs font-['Inter',sans-serif] font-normal leading-[1.3] tracking-[-0.02em] mb-2.5 text-center sm:text-left"
          >
            Trusted by fast-growing cloud teams around the world
          </motion.div>

          {/* Marquee Wrapper (powered by motion/react) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8, ease: "easeOut" }}
            className="relative w-full overflow-hidden isolate transform-gpu"
            style={{ contain: "paint" }}
          >
            {/* Edge Fade Overlays: High-performance gradient edges replacing expensive mask-image for zero-lag 120fps */}
            <div className="absolute inset-y-0 left-0 w-10 sm:w-16 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none z-10" />
            <div className="absolute inset-y-0 right-0 w-10 sm:w-16 bg-gradient-to-l from-white via-white/80 to-transparent pointer-events-none z-10" />

            {/* Continuous 2-track marquee with uniform gap across all logos and wrap-around */}
            <div
              className="flex w-max select-none overflow-hidden py-1 animate-marquee-ltr transform-gpu will-change-transform opacity-80"
              style={{ contain: "layout style paint" }}
            >
              <div className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14">
                {[...logos, ...logos].map(({ name, Component, logoClass }, idx) => (
                  <div
                    key={`track1-${name}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <Component className={logoClass} />
                  </div>
                ))}
              </div>

              <div
                className="flex shrink-0 items-center gap-10 sm:gap-14 pr-10 sm:pr-14"
                aria-hidden="true"
              >
                {[...logos, ...logos].map(({ name, Component, logoClass }, idx) => (
                  <div
                    key={`track2-${name}-${idx}`}
                    className="flex items-center justify-center shrink-0"
                  >
                    <Component className={logoClass} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </footer>
    </section>
  );
}

export default Hero4;
