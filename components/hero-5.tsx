"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// Configuration interface for community showcase floating cards
interface FloatingCard {
  id: string;
  name?: string;
  src: string;
  // Positioning classes across mobile (sm), tablet (md), laptop (lg), and desktop (xl)
  positionClass: string;
  sizeClass: string;
  aspectRatio: string;
  blur?: "none" | "sm" | "md" | "lg";
  opacity?: number;
  delay?: number;
  showOnMobile?: boolean; // Set to false for mid-side cards on narrow phones to guarantee zero text collision
  // Stage container clamp preserves 16:9 aspect ratio and prevents vertical tower distortion
}

const CARDS: FloatingCard[] = [
  // 1. TOP-LEFT FAR BACKGROUND (Blurred depth-of-field)
  {
    id: "bg-top-left",
    src: "/acc-1.webp",
    positionClass: "top-[2%] -left-6 sm:left-[2%] md:left-[3%] lg:left-[4%] z-[5]",
    sizeClass: "w-[85px] sm:w-[110px] md:w-[130px] lg:w-[160px] xl:w-[180px]",
    aspectRatio: "4/3",
    blur: "md",
    opacity: 0.6,
    delay: 0.1,
    showOnMobile: false,
  },

  // 2. ATHARVA (Top-left midground, sharp photo)
  {
    id: "atharva",
    name: "Atharva",
    src: "/n1.png",
    positionClass: "top-[16%] xs:top-[17%] sm:top-[12%] md:top-[8%] lg:top-[10%] left-[4%] xs:left-[6%] sm:left-[8%] md:left-[12%] lg:left-[16%] xl:left-[17%] z-[15]",
    sizeClass: "w-[76px] xs:w-[82px] sm:w-[94px] md:w-[112px] lg:w-[130px] xl:w-[140px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.25,
    showOnMobile: true,
  },

  // 3. VISHESH (Top center-left, sharp photo)
  {
    id: "vishesh",
    name: "Vishesh",
    src: "/n2.png",
    positionClass: "top-[9%] xs:top-[10%] sm:top-[6%] md:top-[3%] lg:top-[4%] left-[34%] xs:left-[35%] sm:left-[36%] md:left-[35%] lg:left-[36%] z-[20]",
    sizeClass: "w-[80px] xs:w-[86px] sm:w-[98px] md:w-[116px] lg:w-[134px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.35,
    showOnMobile: true,
  },

  // 4. RUCHIT (Top center-right, sharp photo)
  {
    id: "ruchit",
    name: "Ruchit",
    src: "/n3.png",
    positionClass: "top-[15%] xs:top-[16%] sm:top-[9%] md:top-[4%] lg:top-[5%] right-[5%] xs:right-[7%] sm:right-[10%] md:right-[16%] lg:right-[22%] xl:right-[24%] z-[20]",
    sizeClass: "w-[76px] xs:w-[82px] sm:w-[94px] md:w-[114px] lg:w-[132px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.2,
    showOnMobile: true,
  },

  // 5. TOP-RIGHT FAR BACKGROUND (Blurred depth-of-field)
  {
    id: "bg-top-right",
    src: "/acc-2.webp",
    positionClass: "top-[2%] -right-8 xs:-right-6 sm:right-[2%] md:right-[2%] lg:right-[4%] z-[5]",
    sizeClass: "w-[90px] sm:w-[115px] md:w-[135px] lg:w-[165px] xl:w-[185px]",
    aspectRatio: "4/3",
    blur: "lg",
    opacity: 0.65,
    delay: 0.45,
    showOnMobile: true,
  },

  // 6. KASHISH (Mid-left foreground, sharp - shown on tablet & desktop with zero collision)
  {
    id: "kashish",
    name: "Kashish",
    src: "/n4.png",
    positionClass: "hidden md:flex md:top-[40%] lg:top-[42%] md:left-[1.5%] lg:left-[4%] xl:left-[4.5%] z-[18]",
    sizeClass: "md:w-[96px] lg:w-[124px] xl:w-[140px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.4,
    showOnMobile: false,
  },

  // 7. KANISHKA (Mid-right foreground, sharp - shown on tablet & desktop with zero collision)
  {
    id: "kanishka",
    name: "Kanishka",
    src: "/acc-3.webp",
    positionClass: "hidden md:flex md:top-[34%] lg:top-[34%] md:right-[1.5%] lg:right-[4%] xl:right-[4.5%] z-[18]",
    sizeClass: "md:w-[110px] lg:w-[142px] xl:w-[170px]",
    aspectRatio: "16/11",
    blur: "none",
    opacity: 1,
    delay: 0.3,
    showOnMobile: false,
  },

  // 8. EEMON (Bottom-left foreground, sharp upright card)
  {
    id: "eemon",
    name: "Eemon",
    src: "/acc-4.webp",
    positionClass: "bottom-[15%] xs:bottom-[16%] sm:bottom-[11%] md:bottom-[8%] lg:bottom-[9%] left-[4%] xs:left-[6%] sm:left-[8%] md:left-[12%] lg:left-[16%] xl:left-[18%] z-[22]",
    sizeClass: "w-[72px] xs:w-[78px] sm:w-[90px] md:w-[106px] lg:w-[122px] xl:w-[132px]",
    aspectRatio: "3/4",
    blur: "none",
    opacity: 1,
    delay: 0.15,
    showOnMobile: true,
  },

  // 9. JUNE (Bottom-center foreground, sharp photo)
  {
    id: "june",
    name: "June",
    src: "/acc-5.webp",
    positionClass: "bottom-[9%] xs:bottom-[10%] sm:bottom-[6%] md:bottom-[3%] lg:bottom-[3%] left-[34%] xs:left-[35%] sm:left-[37%] md:left-[37%] lg:left-[41%] xl:left-[42%] z-[20]",
    sizeClass: "w-[80px] xs:w-[86px] sm:w-[98px] md:w-[116px] lg:w-[132px] xl:w-[145px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.3,
    showOnMobile: true,
  },

  // 10. SAMEEN (Bottom-right foreground, sharp photo)
  {
    id: "sameen",
    name: "Sameen",
    src: "/alone-upscaled.png",
    positionClass: "bottom-[15%] xs:bottom-[16%] sm:bottom-[10%] md:bottom-[7%] lg:bottom-[8%] right-[5%] xs:right-[7%] sm:right-[10%] md:right-[12%] lg:right-[16%] xl:right-[18%] z-[22]",
    sizeClass: "w-[76px] xs:w-[82px] sm:w-[94px] md:w-[112px] lg:w-[130px] xl:w-[142px]",
    aspectRatio: "1/1",
    blur: "none",
    opacity: 1,
    delay: 0.25,
    showOnMobile: true,
  },

  // 11. BOTTOM-RIGHT FAR BACKGROUND (Blurred depth-of-field, peeking half off bottom)
  {
    id: "bg-bottom-right",
    src: "/acc-1.webp",
    positionClass: "-bottom-8 xs:-bottom-10 sm:-bottom-12 md:-bottom-14 lg:-bottom-16 right-[3%] xs:right-[5%] sm:right-[6%] md:right-[7%] lg:right-[10%] xl:right-[12%] z-[6]",
    sizeClass: "w-[110px] xs:w-[125px] sm:w-[145px] md:w-[170px] lg:w-[200px] xl:w-[225px]",
    aspectRatio: "16/10",
    blur: "lg",
    opacity: 0.65,
    delay: 0.5,
    showOnMobile: true,
  },
];

export function Hero5() {
  return (
    <section className="relative w-full h-[100dvh] max-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-[#111111] dark:text-zinc-50 select-none m-0 p-0">
      
      {/* Clean subtle radial background lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_70%)]" />

      {/* =========================================================================
          PROPORTIONAL FLOATING STAGE CONTAINER
          - On mobile: fills full viewport with comfortable framing around text.
          - On desktop & zoom-out: locked to max-w-[1540px] and max-h-[860px] (16:9 ratio)
            so it NEVER distorts into a tall vertical tower when zooming out!
          - Zero scrollbars at all zoom levels.
         ========================================================================= */}
      <div className="relative w-full h-full max-w-full md:max-w-[1540px] md:max-h-[860px] mx-auto flex items-center justify-center overflow-hidden pointer-events-none">
        
        {/* All Floating Cards */}
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
                card.showOnMobile ? "flex" : "hidden md:flex",
                card.positionClass,
                card.sizeClass
              )}
            >
              {/* Photo Card Container: Straight, Precision-Rounded */}
              <div
                style={{
                  aspectRatio: card.aspectRatio,
                }}
                className={cn(
                  "relative w-full overflow-hidden rounded-[14px] xs:rounded-[16px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[24px] bg-zinc-200 dark:bg-zinc-800",
                  isBlurred
                    ? card.blur === "lg"
                      ? "blur-[6px] xs:blur-[7px] md:blur-[10px] lg:blur-[12px] brightness-105"
                      : "blur-[4px] xs:blur-[5px] md:blur-[7px] lg:blur-[8px]"
                    : "border border-black/[0.08] dark:border-white/[0.12] shadow-none"
                )}
              >
                <Image
                  src={card.src}
                  alt={card.name || "Team member"}
                  fill
                  sizes="(max-width: 640px) 90px, (max-width: 1024px) 130px, 240px"
                  priority={!isBlurred}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Subtle inner glaze border */}
                <div className="absolute inset-0 rounded-[14px] xs:rounded-[16px] sm:rounded-[18px] md:rounded-[22px] lg:rounded-[24px] ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />
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

        {/* =========================================================================
            CENTER HERO HEADLINE (Mathematically constrained to eliminate overlap)
           ========================================================================= */}
        <div className="relative z-25 max-w-[280px] xs:max-w-[320px] sm:max-w-[380px] md:max-w-[440px] lg:max-w-[560px] xl:max-w-[620px] mx-auto text-center px-2 flex flex-col items-center pointer-events-auto">
          <motion.h2
            initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-[24px] xs:text-[27px] sm:text-[32px] md:text-[38px] lg:text-[48px] xl:text-[54px] leading-[1.12] sm:leading-[1.1] tracking-[-0.055em] [word-spacing:normal] text-[#111111] dark:text-zinc-50 m-0 select-none"
          >
            The humans behind the
            <br />
            prompts &amp; pixels
          </motion.h2>
        </div>

      </div>

    </section>
  );
}

export default Hero5;
