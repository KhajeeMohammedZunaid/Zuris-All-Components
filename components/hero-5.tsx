"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingCard {
  id: string;
  name?: string;
  src: string;
  className: string;
  cardWidthClass: string;
  aspectRatio: string;
  blur?: "none" | "sm" | "md" | "lg";
  opacity?: number;
  delay?: number;
}

const CARDS: FloatingCard[] = [
  // 1. TOP-LEFT FAR BACKGROUND (Blurred depth-of-field)
  {
    id: "bg-top-left",
    src: "/acc-1.webp",
    className: "top-[2%] -left-6 sm:left-[2%] md:left-[3%] lg:left-[4%] z-[5]",
    cardWidthClass: "w-[85px] sm:w-[110px] md:w-[135px] lg:w-[160px] xl:w-[180px]",
    aspectRatio: "4/3",
    blur: "md",
    opacity: 0.6,
    delay: 0.1,
  },

  // 2. ATHARVA (Top-left midground, sharp)
  {
    id: "atharva",
    name: "Atharva",
    src: "/n1.png",
    className: "top-[7%] xs:top-[9%] sm:top-[10%] md:top-[11%] lg:top-[12%] left-[3%] xs:left-[5%] sm:left-[12%] md:left-[16%] lg:left-[18%] z-[15]",
    cardWidthClass: "w-[72px] xs:w-[82px] sm:w-[100px] md:w-[118px] lg:w-[132px] xl:w-[140px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.25,
  },

  // 3. VISHESH (Top center-left, sharp)
  {
    id: "vishesh",
    name: "Vishesh",
    src: "/n2.png",
    className: "top-[3%] xs:top-[4%] left-[34%] xs:left-[35%] sm:left-[36%] md:left-[37%] z-[20]",
    cardWidthClass: "w-[76px] xs:w-[86px] sm:w-[105px] md:w-[124px] lg:w-[136px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.35,
  },

  // 4. RUCHIT (Top center-right, sharp)
  {
    id: "ruchit",
    name: "Ruchit",
    src: "/n3.png",
    className: "top-[7%] xs:top-[9%] sm:top-[6%] md:top-[4%] right-[3%] xs:right-[5%] sm:right-[16%] md:right-[22%] lg:right-[26%] z-[20]",
    cardWidthClass: "w-[74px] xs:w-[84px] sm:w-[102px] md:w-[122px] lg:w-[136px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.2,
  },

  // 5. TOP-RIGHT FAR BACKGROUND (Blurred depth-of-field)
  {
    id: "bg-top-right",
    src: "/acc-2.webp",
    className: "top-[2%] -right-8 sm:right-[2%] md:right-[3%] lg:right-[4%] z-[5]",
    cardWidthClass: "w-[90px] sm:w-[115px] md:w-[140px] lg:w-[165px] xl:w-[185px]",
    aspectRatio: "4/3",
    blur: "lg",
    opacity: 0.65,
    delay: 0.45,
  },

  // 6. KASHISH (Mid-left foreground, sharp)
  {
    id: "kashish",
    name: "Kashish",
    src: "/n4.png",
    className: "top-[27%] xs:top-[28%] sm:top-[38%] md:top-[42%] left-[1%] xs:left-[2%] sm:left-[3%] md:left-[4%] z-[18]",
    cardWidthClass: "w-[68px] xs:w-[78px] sm:w-[98px] md:w-[118px] lg:w-[132px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.4,
  },

  // 7. KANISHKA (Mid-right foreground, sharp)
  {
    id: "kanishka",
    name: "Kanishka",
    src: "/acc-3.webp",
    className: "top-[27%] xs:top-[28%] sm:top-[32%] md:top-[34%] right-[1%] xs:right-[2%] sm:right-[3%] md:right-[4%] z-[18]",
    cardWidthClass: "w-[84px] xs:w-[94px] sm:w-[116px] md:w-[138px] lg:w-[155px] xl:w-[175px]",
    aspectRatio: "16/11",
    blur: "none",
    opacity: 1,
    delay: 0.3,
  },

  // 8. EEMON (Bottom-left foreground, sharp upright card)
  {
    id: "eemon",
    name: "Eemon",
    src: "/acc-4.webp",
    className: "bottom-[9%] xs:bottom-[10%] sm:bottom-[8%] left-[3%] xs:left-[5%] sm:left-[12%] md:left-[16%] lg:left-[19%] z-[22]",
    cardWidthClass: "w-[70px] xs:w-[78px] sm:w-[96px] md:w-[114px] lg:w-[126px] xl:w-[135px]",
    aspectRatio: "3/4",
    blur: "none",
    opacity: 1,
    delay: 0.15,
  },

  // 9. JUNE (Bottom-center foreground, sharp)
  {
    id: "june",
    name: "June",
    src: "/acc-5.webp",
    className: "bottom-[3%] xs:bottom-[4%] sm:bottom-[3%] left-[34%] xs:left-[35%] sm:left-[38%] md:left-[42%] lg:left-[44%] z-[20]",
    cardWidthClass: "w-[78px] xs:w-[86px] sm:w-[105px] md:w-[124px] lg:w-[138px] xl:w-[150px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.3,
  },

  // 10. SAMEEN (Bottom-right foreground, sharp)
  {
    id: "sameen",
    name: "Sameen",
    src: "/alone-upscaled.png",
    className: "bottom-[9%] xs:bottom-[10%] sm:bottom-[9%] right-[3%] xs:right-[5%] sm:right-[13%] md:right-[16%] lg:right-[19%] z-[22]",
    cardWidthClass: "w-[74px] xs:w-[84px] sm:w-[102px] md:w-[120px] lg:w-[135px] xl:w-[150px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.25,
  },

  // 11. BOTTOM-RIGHT FAR BACKGROUND (Blurred depth-of-field, peeking half off bottom)
  {
    id: "bg-bottom-right",
    src: "/acc-1.webp",
    className: "-bottom-8 xs:-bottom-10 sm:-bottom-14 md:-bottom-18 lg:-bottom-22 right-[4%] xs:right-[6%] sm:right-[8%] md:right-[11%] lg:right-[13%] z-[6]",
    cardWidthClass: "w-[110px] xs:w-[125px] sm:w-[145px] md:w-[170px] lg:w-[195px] xl:w-[220px]",
    aspectRatio: "16/10",
    blur: "lg",
    opacity: 0.65,
    delay: 0.5,
  },
];

export function Hero5() {
  return (
    <section className="relative w-full min-h-[100dvh] h-screen max-h-[1200px] flex flex-col justify-center items-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-[#111111] dark:text-zinc-50 select-none px-3 xs:px-4 sm:px-6">
      
      {/* Clean subtle radial background lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_70%)]" />

      {/* =========================================================================
          UNIVERSAL RESPONSIVE FLOATING GALLERY CANVAS
          Compatible across Mobile, Tablet, Laptop, Desktop & 4K Displays
         ========================================================================= */}
      <div className="absolute inset-0 w-full h-full max-w-[1700px] mx-auto pointer-events-none overflow-hidden">
        {CARDS.map((card) => {
          const isBlurred = card.blur && card.blur !== "none";
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: card.opacity ?? 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: card.delay || 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              className={cn(
                "absolute pointer-events-auto flex flex-col items-center",
                card.className,
                card.cardWidthClass
              )}
            >
              {/* Photo Card Container: Straight, Precision-Rounded */}
              <div
                style={{
                  aspectRatio: card.aspectRatio,
                }}
                className={cn(
                  "relative w-full overflow-hidden rounded-[14px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] bg-zinc-200 dark:bg-zinc-800",
                  isBlurred
                    ? card.blur === "lg"
                      ? "blur-[6px] xs:blur-[8px] md:blur-[10px] lg:blur-[12px] brightness-105"
                      : "blur-[4px] xs:blur-[6px] md:blur-[8px]"
                    : "border border-black/[0.08] dark:border-white/[0.12] shadow-none"
                )}
              >
                <Image
                  src={card.src}
                  alt={card.name || "Team member"}
                  fill
                  sizes="(max-width: 640px) 100px, (max-width: 1024px) 150px, 240px"
                  priority={!isBlurred}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Subtle inner glaze border */}
                <div className="absolute inset-0 rounded-[14px] xs:rounded-[16px] sm:rounded-[20px] md:rounded-[22px] lg:rounded-[24px] ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />
              </div>

              {/* Name Label Centered Below */}
              {card.name && !isBlurred && (
                <span className="mt-1 xs:mt-1.5 md:mt-2 text-[10px] xs:text-[11px] sm:text-[12px] md:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-normal text-zinc-500 dark:text-zinc-400 tracking-[-0.01em] select-none text-center">
                  {card.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          CENTER HERO HEADLINE (Plus Jakarta Sans, h2, 500 weight, -5.5% tracking)
         ========================================================================= */}
      <div className="relative z-25 max-w-[320px] xs:max-w-[360px] sm:max-w-md md:max-w-xl lg:max-w-2xl mx-auto text-center px-3 sm:px-4 flex flex-col items-center pointer-events-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-[26px] xs:text-[30px] sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.12] sm:leading-[1.1] tracking-[-0.055em] [word-spacing:normal] text-[#111111] dark:text-zinc-50 m-0 select-none"
        >
          The humans behind the
          <br />
          prompts &amp; pixels
        </motion.h2>
      </div>

    </section>
  );
}

export default Hero5;
