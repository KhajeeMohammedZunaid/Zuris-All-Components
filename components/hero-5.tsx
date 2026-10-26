"use client";

import * as React from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface FloatingCard {
  id: string;
  name?: string;
  src: string;
  // Position percentage or style
  styleDesktop: {
    top?: string;
    bottom?: string;
    left?: string;
    right?: string;
    width: string;
    aspectRatio?: string;
    zIndex?: number;
  };
  blur?: "none" | "sm" | "md" | "lg";
  opacity?: number;
  rotation?: number;
  floatDelay?: number;
  floatDuration?: number;
  floatDistance?: number;
  hideOnMobile?: boolean;
}

const CARDS: FloatingCard[] = [
  // 1. Far background top-left (Soft scenic, heavy depth blur)
  {
    id: "bg-top-left",
    src: "/acc-1.webp",
    styleDesktop: {
      top: "6%",
      left: "3%",
      width: "180px",
      aspectRatio: "16/10",
      zIndex: 5,
    },
    blur: "md",
    opacity: 0.65,
    rotation: -2,
    floatDelay: 0.2,
    floatDuration: 6.5,
    floatDistance: 8,
    hideOnMobile: true,
  },

  // 2. Atharva (Top-left midground, sharp)
  {
    id: "atharva",
    name: "Atharva",
    src: "/n1.png",
    styleDesktop: {
      top: "12%",
      left: "17%",
      width: "135px",
      aspectRatio: "1/1",
      zIndex: 15,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.4,
    floatDuration: 5.5,
    floatDistance: 7,
  },

  // 3. Vishesh (Top center-left, sharp, black & white / outdoor portrait)
  {
    id: "vishesh",
    name: "Vishesh",
    src: "/n2.png",
    styleDesktop: {
      top: "5%",
      left: "36%",
      width: "140px",
      aspectRatio: "1/1",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    rotation: 1,
    floatDelay: 0.6,
    floatDuration: 6.2,
    floatDistance: 9,
  },

  // 4. Ruchit (Top center-right, sharp, white shirt & sunglasses)
  {
    id: "ruchit",
    name: "Ruchit",
    src: "/n3.png",
    styleDesktop: {
      top: "4%",
      right: "26%",
      width: "150px",
      aspectRatio: "1/1.05",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    rotation: -1,
    floatDelay: 0.3,
    floatDuration: 5.8,
    floatDistance: 8,
  },

  // 5. Far background top-right (Green hills / blue sky scenic, heavy depth blur)
  {
    id: "bg-top-right",
    src: "/acc-2.webp",
    styleDesktop: {
      top: "4%",
      right: "4%",
      width: "190px",
      aspectRatio: "16/11",
      zIndex: 5,
    },
    blur: "lg",
    opacity: 0.7,
    rotation: 2,
    floatDelay: 0.8,
    floatDuration: 7,
    floatDistance: 10,
    hideOnMobile: true,
  },

  // 6. Kanishka (Mid-right foreground, balcony / horizon view)
  {
    id: "kanishka",
    name: "Kanishka",
    src: "/acc-3.webp",
    styleDesktop: {
      top: "32%",
      right: "3%",
      width: "185px",
      aspectRatio: "16/11",
      zIndex: 18,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.5,
    floatDuration: 6.8,
    floatDistance: 9,
  },

  // 7. Kashish (Mid-left foreground, indoor portrait with glasses)
  {
    id: "kashish",
    name: "Kashish",
    src: "/n4.png",
    styleDesktop: {
      top: "44%",
      left: "4%",
      width: "145px",
      aspectRatio: "1/1",
      zIndex: 18,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.7,
    floatDuration: 5.9,
    floatDistance: 7,
  },

  // 8. Eemon (Bottom-left foreground, upright stage/portrait)
  {
    id: "eemon",
    name: "Eemon",
    src: "/acc-4.webp",
    styleDesktop: {
      bottom: "6%",
      left: "19%",
      width: "135px",
      aspectRatio: "3/4",
      zIndex: 22,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.2,
    floatDuration: 6.4,
    floatDistance: 8,
  },

  // 9. June (Bottom-center foreground, seated by ruins)
  {
    id: "june",
    name: "June",
    src: "/acc-5.webp",
    styleDesktop: {
      bottom: "3%",
      left: "44%",
      width: "155px",
      aspectRatio: "1/1",
      zIndex: 20,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.5,
    floatDuration: 5.6,
    floatDistance: 7,
  },

  // 10. Sameen (Bottom-right foreground, reading book by window)
  {
    id: "sameen",
    name: "Sameen",
    src: "/alone-upscaled.png",
    styleDesktop: {
      bottom: "8%",
      right: "18%",
      width: "160px",
      aspectRatio: "1/1",
      zIndex: 22,
    },
    blur: "none",
    opacity: 1,
    rotation: 0,
    floatDelay: 0.4,
    floatDuration: 6.6,
    floatDistance: 8,
  },
];

export function Hero5() {
  return (
    <section className="relative w-full min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-[#111111] dark:text-zinc-50 select-none py-20 px-4 sm:px-6">
      
      {/* Subtle Background Glow / Texture */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top,rgba(0,0,0,0.02),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)]" />

      {/* Foreground Luminous Bokeh Orb (Bottom-Right Accent from user image) */}
      <div 
        aria-hidden="true"
        className="absolute -bottom-10 right-2 sm:bottom-4 sm:right-10 w-44 h-44 sm:w-60 sm:h-60 rounded-full bg-gradient-to-tr from-cyan-400 via-teal-300 to-emerald-400 blur-3xl opacity-75 dark:opacity-45 pointer-events-none z-30" 
      />

      {/* =========================================================================
          DESKTOP FLOATING GALLERY CANVAS (md and up)
          100% faithful to reference: depth blurs, spatial positioning, names
         ========================================================================= */}
      <div className="hidden md:block absolute inset-0 w-full h-full max-w-[1600px] mx-auto pointer-events-none">
        {CARDS.map((card) => {
          const isBlurred = card.blur && card.blur !== "none";
          
          return (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: card.opacity ?? 1, scale: 1, y: 0 }}
              transition={{
                duration: 0.9,
                delay: card.floatDelay || 0.2,
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
              className="pointer-events-auto"
            >
              {/* Continuous micro-bobbing floating animation */}
              <motion.div
                animate={{
                  y: [0, -(card.floatDistance || 8), 0],
                  rotate: [
                    card.rotation || 0,
                    (card.rotation || 0) + 0.8,
                    card.rotation || 0,
                  ],
                }}
                transition={{
                  duration: card.floatDuration || 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: (card.floatDelay || 0) * 1.5,
                }}
                whileHover={
                  !isBlurred
                    ? {
                        scale: 1.05,
                        y: -8,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                    : undefined
                }
                className={cn(
                  "flex flex-col items-center group transition-transform duration-300",
                  isBlurred && "pointer-events-none select-none"
                )}
              >
                {/* Photo Card Container with Precision Radius */}
                <div
                  style={{
                    aspectRatio: card.styleDesktop.aspectRatio || "1/1",
                  }}
                  className={cn(
                    "relative w-full overflow-hidden rounded-[22px] sm:rounded-[26px] bg-zinc-200 dark:bg-zinc-800 transition-all duration-300",
                    isBlurred
                      ? card.blur === "lg"
                        ? "blur-[10px] sm:blur-[12px] brightness-105"
                        : "blur-[6px] sm:blur-[8px]"
                      : "border border-black/[0.08] dark:border-white/[0.12] shadow-none group-hover:border-black/20 dark:group-hover:border-white/30"
                  )}
                >
                  <Image
                    src={card.src}
                    alt={card.name || "Team member"}
                    fill
                    sizes="220px"
                    priority={!isBlurred}
                    className="w-full h-full object-cover select-none pointer-events-none"
                  />
                  {/* Subtle inner card border glaze */}
                  <div className="absolute inset-0 rounded-[22px] sm:rounded-[26px] ring-1 ring-inset ring-black/5 dark:ring-white/10 pointer-events-none" />
                </div>

                {/* Name Label Centered Below (Exact typography from image) */}
                {card.name && !isBlurred && (
                  <span className="mt-2 text-[12px] sm:text-[13px] font-['Plus_Jakarta_Sans',sans-serif] font-normal text-zinc-500 dark:text-zinc-400 tracking-[-0.01em] select-none transition-colors group-hover:text-zinc-950 dark:group-hover:text-zinc-100">
                    {card.name}
                  </span>
                )}
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* =========================================================================
          CENTER HERO HEADLINE (Strict Specs: Plus Jakarta Sans, h2, 500 weight, -5.5% tracking)
         ========================================================================= */}
      <div className="relative z-25 max-w-2xl mx-auto text-center px-4 flex flex-col items-center pointer-events-auto">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-['Plus_Jakarta_Sans',sans-serif] font-[500] text-3xl sm:text-4xl md:text-5xl lg:text-[54px] xl:text-[58px] leading-[1.12] tracking-[-0.055em] [word-spacing:normal] text-[#111111] dark:text-zinc-50 m-0"
        >
          The humans behind the
          <br />
          prompts &amp; pixels
        </motion.h2>
      </div>

      {/* =========================================================================
          MOBILE RESPONSIVE CLOUD (Shown only on small screens < md)
          Neatly flows the cards above and below the center title without clipping
         ========================================================================= */}
      <div className="md:hidden w-full max-w-sm mx-auto mt-10 grid grid-cols-3 gap-3.5 z-20">
        {CARDS.filter((c) => !c.hideOnMobile).slice(0, 6).map((card, idx) => (
          <motion.div
            key={`mobile-${card.id}`}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: idx * 0.08 }}
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
