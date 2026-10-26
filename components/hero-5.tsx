"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingCard {
  id: string;
  name?: string;
  src: string;
  styleDesktop: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    aspectRatio: string;
    zIndex?: number;
  };
  blur?: "none" | "sm" | "md" | "lg";
  opacity?: number;
  delay?: number;
  hideOnMobile?: boolean;
}

const CARDS: FloatingCard[] = [
  // 1. TOP-LEFT FAR BACKGROUND (Blurred depth-of-field, straight)
  {
    id: "bg-top-left",
    src: "/acc-1.webp",
    styleDesktop: {
      top: "5%",
      left: "4%",
      width: "180px",
      aspectRatio: "4/3",
      zIndex: 5,
    },
    blur: "md",
    opacity: 0.65,
    delay: 0.1,
    hideOnMobile: true,
  },

  // 2. ATHARVA (Top-left midground, sharp, straight)
  {
    id: "atharva",
    name: "Atharva",
    src: "/n1.png",
    styleDesktop: {
      top: "12%",
      left: "18%",
      width: "135px",
      aspectRatio: "1/1",
      zIndex: 15,
    },
    blur: "none",
    opacity: 1,
    delay: 0.25,
  },

  // 3. VISHESH (Top center-left, sharp, straight)
  {
    id: "vishesh",
    name: "Vishesh",
    src: "/n2.png",
    styleDesktop: {
      top: "4%",
      left: "37%",
      width: "140px",
      aspectRatio: "1/1",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    delay: 0.35,
  },

  // 4. RUCHIT (Top center-right, sharp, straight)
  {
    id: "ruchit",
    name: "Ruchit",
    src: "/n3.png",
    styleDesktop: {
      top: "4%",
      right: "26%",
      width: "145px",
      aspectRatio: "1/1",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    delay: 0.2,
  },

  // 5. TOP-RIGHT FAR BACKGROUND (Blurred depth-of-field, straight)
  {
    id: "bg-top-right",
    src: "/acc-2.webp",
    styleDesktop: {
      top: "4%",
      right: "4%",
      width: "185px",
      aspectRatio: "4/3",
      zIndex: 5,
    },
    blur: "lg",
    opacity: 0.7,
    delay: 0.45,
    hideOnMobile: true,
  },

  // 6. KANISHKA (Mid-right foreground, sharp, straight)
  {
    id: "kanishka",
    name: "Kanishka",
    src: "/acc-3.webp",
    styleDesktop: {
      top: "34%",
      right: "4%",
      width: "180px",
      aspectRatio: "16/11",
      zIndex: 18,
    },
    blur: "none",
    opacity: 1,
    delay: 0.3,
  },

  // 7. KASHISH (Mid-left foreground, sharp, straight)
  {
    id: "kashish",
    name: "Kashish",
    src: "/n4.png",
    styleDesktop: {
      top: "42%",
      left: "4%",
      width: "145px",
      aspectRatio: "1/1",
      zIndex: 18,
    },
    blur: "none",
    opacity: 1,
    delay: 0.4,
  },

  // 8. EEMON (Bottom-left foreground, sharp, straight upright card)
  {
    id: "eemon",
    name: "Eemon",
    src: "/acc-4.webp",
    styleDesktop: {
      bottom: "8%",
      left: "19%",
      width: "135px",
      aspectRatio: "3/4",
      zIndex: 22,
    },
    blur: "none",
    opacity: 1,
    delay: 0.15,
  },

  // 9. JUNE (Bottom-center foreground, sharp, straight)
  {
    id: "june",
    name: "June",
    src: "/acc-5.webp",
    styleDesktop: {
      bottom: "3%",
      left: "44%",
      width: "150px",
      aspectRatio: "1/1",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    delay: 0.3,
  },

  // 10. SAMEEN (Bottom-right foreground, sharp, straight)
  {
    id: "sameen",
    name: "Sameen",
    src: "/alone-upscaled.png",
    styleDesktop: {
      bottom: "9%",
      right: "19%",
      width: "155px",
      aspectRatio: "1/1",
      zIndex: 22,
    },
    blur: "none",
    opacity: 1,
    delay: 0.25,
  },

  // 11. BOTTOM-RIGHT FAR BACKGROUND (Shifted left & lower, appearing half cut off)
  {
    id: "bg-bottom-right",
    src: "/acc-1.webp",
    styleDesktop: {
      bottom: "-95px",
      right: "13%",
      width: "220px",
      aspectRatio: "16/10",
      zIndex: 6,
    },
    blur: "lg",
    opacity: 0.65,
    delay: 0.5,
    hideOnMobile: true,
  },
];

export function Hero5() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-[#111111] dark:text-zinc-50 select-none py-20 px-4 sm:px-6">
      
      {/* Clean subtle radial background lighting */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.015),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.025),transparent_70%)]" />

      {/* =========================================================================
          DESKTOP GALLERY CANVAS (md and up)
          Smooth entrance animation, then stays 100% stable in place (zero bobbing)
         ========================================================================= */}
      <div className="hidden md:block absolute inset-0 w-full h-full max-w-[1600px] mx-auto pointer-events-none overflow-hidden">
        {CARDS.map((card) => {
          const isBlurred = card.blur && card.blur !== "none";
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.88, y: 18 }}
              animate={{ opacity: card.opacity ?? 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.85,
                delay: card.delay || 0.2,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                position: "absolute",
                top: card.styleDesktop.top,
                bottom: card.styleDesktop.bottom,
                left: card.styleDesktop.left,
                right: card.styleDesktop.right,
                width: card.styleDesktop.width,
                zIndex: card.styleDesktop.zIndex || 10,
              }}
              className="pointer-events-auto flex flex-col items-center"
            >
              {/* Photo Card Container: Straight, Precision-Rounded */}
              <div
                style={{
                  aspectRatio: card.styleDesktop.aspectRatio,
                }}
                className={cn(
                  "relative w-full overflow-hidden rounded-[20px] sm:rounded-[24px] bg-zinc-200 dark:bg-zinc-800",
                  isBlurred
                    ? card.blur === "lg"
                      ? "blur-[10px] sm:blur-[12px] brightness-105"
                      : "blur-[6px] sm:blur-[8px]"
                    : "border border-black/[0.08] dark:border-white/[0.12] shadow-none"
                )}
              >
                <Image
                  src={card.src}
                  alt={card.name || "Team member"}
                  fill
                  sizes="240px"
                  priority={!isBlurred}
                  className="w-full h-full object-cover select-none pointer-events-none"
                />
                {/* Subtle inner glaze border */}
                <div className="absolute inset-0 rounded-[20px] sm:rounded-[24px] ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />
              </div>

              {/* Name Label Centered Below */}
              {card.name && !isBlurred && (
                <span className="mt-2 text-[12px] sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-normal text-zinc-500 dark:text-zinc-400 tracking-[-0.01em] select-none">
                  {card.name}
                </span>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          CENTER HERO HEADLINE (Cinematic entrance reveal, then 100% stable)
         ========================================================================= */}
      <div className="relative z-25 max-w-2xl mx-auto text-center px-4 flex flex-col items-center pointer-events-auto">
        <motion.h2
          initial={{ opacity: 0, y: 22, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.12] tracking-[-0.055em] [word-spacing:normal] text-[#111111] dark:text-zinc-50 m-0 select-none"
        >
          The humans behind the
          <br />
          prompts &amp; pixels
        </motion.h2>
      </div>

      {/* =========================================================================
          MOBILE RESPONSIVE CLOUD (< md)
          Staggered entrance reveal, then stays stable
         ========================================================================= */}
      <div className="md:hidden w-full max-w-sm mx-auto mt-10 grid grid-cols-3 gap-3.5 z-20">
        {CARDS.filter((c) => !c.hideOnMobile).slice(0, 6).map((card, idx) => (
          <motion.div
            key={`mobile-${card.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center"
          >
            <div className="relative w-full aspect-square rounded-[18px] overflow-hidden bg-zinc-200 dark:bg-zinc-800 border border-black/10 dark:border-white/10">
              <Image
                src={card.src}
                alt={card.name || "Team member"}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            {card.name && (
              <span className="mt-1.5 text-[11px] font-['Plus_Jakarta_Sans',sans-serif] text-zinc-500 dark:text-zinc-400 font-normal">
                {card.name}
              </span>
            )}
          </motion.div>
        ))}
      </div>

    </section>
  );
}

export default Hero5;
