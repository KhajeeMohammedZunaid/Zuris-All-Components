"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface Features1Props {
  className?: string;
  variant?: "top" | "middle" | "bottom" | "all";
  showVariantNav?: boolean;
}

interface FeatureShowcaseSectionProps {
  id: "variant-top" | "variant-middle" | "variant-bottom";
  alignment: "top" | "middle" | "bottom";
  headingId: string;
  figureLabel: string;
  isLast?: boolean;
}

function FeatureShowcaseSection({
  id,
  alignment,
  headingId,
  figureLabel,
  isLast = false,
}: FeatureShowcaseSectionProps) {
  const alignWrapClass =
    alignment === "top"
      ? "items-start"
      : alignment === "middle"
      ? "items-center"
      : "items-start lg:items-end";

  const alignArticleClass =
    alignment === "top"
      ? "pt-0"
      : alignment === "middle"
      ? "justify-center"
      : "justify-end pb-0";

  return (
    <section
      id={id}
      className={cn(
        "features-1-variant-section w-full relative py-16 lg:py-24 overflow-x-hidden scroll-mt-6",
        !isLast && "border-b border-[var(--border-subtle)]/30"
      )}
      aria-labelledby={headingId}
    >
      <div
        className={cn(
          "showcase-main-wrap w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-14 xl:gap-20",
          alignWrapClass
        )}
      >
        {/* LEFT COLUMN: Typography (Smooth one-way entrance, no descender clipping) */}
        <article
          className={cn(
            "w-full lg:w-auto max-w-[520px] px-6 sm:px-12 lg:pl-16 xl:pl-24 2xl:pl-32 lg:pr-0 shrink-0 z-10 flex flex-col",
            alignArticleClass
          )}
        >
          {/* Category Tag: 01 Finance with breathing indicator dot */}
          <motion.div
            initial={{ opacity: 0, x: -14 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-4 sm:mb-5 font-body text-[0.85rem] font-normal text-[var(--text-main)] tracking-[-0.01em]"
          >
            <span className="font-mono text-[0.8rem] font-normal text-[var(--text-light)]">01</span>
            <motion.span
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="w-[3px] h-[3px] rounded-full bg-[var(--text-light)] opacity-50"
            />
            <span>Finance</span>
          </motion.div>

          {/* Headline: font-normal, 2 distinct lines with full descender clearance */}
          <motion.h2
            id={headingId}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-[clamp(2.1rem,3.2vw,2.75rem)] font-normal leading-[1.18] tracking-[-0.03em] text-[var(--text-main)] pb-1"
          >
            <span className="block">Ops gets an instant</span>
            <span className="block">invoice tracker.</span>
          </motion.h2>

          {/* Description: font-normal, below the headline */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="font-body text-[clamp(1.02rem,1.4vw,1.18rem)] font-normal leading-[1.5] text-[var(--text-muted)] mt-4 sm:mt-5"
          >
            Built from billing inboxes.
          </motion.p>
        </article>

        {/* RIGHT COLUMN: 980x595 box with smooth entrance only (no hover/mouse events) */}
        <motion.div
          initial={{ opacity: 0, x: 28, scale: 0.98 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.95, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="w-full lg:flex-1 relative flex items-start justify-start lg:justify-end overflow-visible px-6 sm:px-12 lg:px-0 pt-0"
        >
          <figure
            className="showcase-figure relative w-full aspect-[980/595] lg:aspect-auto lg:w-[980px] lg:h-[595px] lg:-mr-[98px] shrink-0 m-0 p-0 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-0 border-0 border-none bg-[var(--bg-surface)] select-none pointer-events-none"
            role="region"
            aria-label={figureLabel}
          >
            {/* The Image with bottom gradient mask - purely visual, zero mouse interactions */}
            <div className="relative w-full h-full overflow-hidden image-fade-mask">
              <img
                src="/451shots_so.png"
                alt="Invoice chasing and real-time tracker application"
                className="w-full h-full object-cover object-left-top block select-none pointer-events-none"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Progressive bottom blur diffusion layer */}
            <div className="image-blur-scrim" aria-hidden="true" />

            {/* Color fade veil matching exact theme background */}
            <div className="image-gradient-veil" aria-hidden="true" />
          </figure>
        </motion.div>
      </div>
    </section>
  );
}

export function Features1({
  className,
  variant = "all",
  showVariantNav = false,
}: Features1Props) {
  const [activeVariant, setActiveVariant] = React.useState<"variant-top" | "variant-middle" | "variant-bottom">(
    "variant-top"
  );

  const scrollToVariant = (id: "variant-top" | "variant-middle" | "variant-bottom") => {
    setActiveVariant(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  React.useEffect(() => {
    if (variant !== "all") return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveVariant(entry.target.id as "variant-top" | "variant-middle" | "variant-bottom");
          }
        });
      },
      { threshold: 0.35 }
    );

    const sections = document.querySelectorAll(".features-1-variant-section");
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [variant]);

  const showTop = variant === "all" || variant === "top";
  const showMiddle = variant === "all" || variant === "middle";
  const showBottom = variant === "all" || variant === "bottom";

  return (
    <div
      className={cn(
        "features-1-root w-full bg-[var(--bg)] text-[var(--text-main)] font-body antialiased transition-[background-color,color] duration-300 ease-in-out",
        className
      )}
    >
      <style>{`
        /* ========================================================
           1. THEME TOKENS FOR THE FADE VEIL
           ======================================================== */
        :root,
        .features-1-root {
          --bg: #ffffff;
          --bg-surface: #ffffff;
          --bg-fade-solid: #ffffff;
          --bg-fade-mid: rgba(255, 255, 255, 0.92);
          --bg-fade-transparent: rgba(255, 255, 255, 0);

          --text-main: #000000;
          --text-muted: #52525b;
          --text-light: #71717a;

          --border-main: #000000;
          --border-subtle: rgba(0, 0, 0, 0.08);
          --border-image: transparent;

          --badge-bg: rgba(0, 0, 0, 0.03);
        }

        [data-theme="dark"],
        .dark,
        :is(.dark .features-1-root),
        :is([data-theme="dark"] .features-1-root) {
          --bg: #000000;
          --bg-surface: #0a0a0c;
          --bg-fade-solid: #000000;
          --bg-fade-mid: rgba(0, 0, 0, 0.92);
          --bg-fade-transparent: rgba(0, 0, 0, 0);

          --text-main: #ffffff;
          --text-muted: #a1a1aa;
          --text-light: #71717a;

          --border-main: #ffffff;
          --border-subtle: rgba(255, 255, 255, 0.12);
          --border-image: transparent;

          --badge-bg: rgba(255, 255, 255, 0.05);
        }

        /* ========================================================
           2. THREE-LAYER IMAGE MASKING SYSTEM
           ======================================================== */

        /* Layer 1: Direct Alpha Mask on the Image Wrapper (Very Low Bottom Fade) */
        .image-fade-mask {
          mask-image: linear-gradient(
            to bottom,
            #000000 0%,
            #000000 84%,
            rgba(0, 0, 0, 0.88) 90%,
            rgba(0, 0, 0, 0.42) 95%,
            rgba(0, 0, 0, 0.08) 98%,
            transparent 100%
          );
          -webkit-mask-image: linear-gradient(
            to bottom,
            #000000 0%,
            #000000 84%,
            rgba(0, 0, 0, 0.88) 90%,
            rgba(0, 0, 0, 0.42) 95%,
            rgba(0, 0, 0, 0.08) 98%,
            transparent 100%
          );
        }

        /* Layer 2: Progressive Bottom Blur Diffusion (Low Height) */
        .image-blur-scrim {
          position: absolute;
          inset-x: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 14%;
          pointer-events: none;
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          mask-image: linear-gradient(to top, #000000 32%, transparent 100%);
          -webkit-mask-image: linear-gradient(to top, #000000 32%, transparent 100%);
        }

        /* Layer 3: Color Fade Veil (Low Height) */
        .image-gradient-veil {
          position: absolute;
          inset-x: 0;
          left: 0;
          right: 0;
          bottom: 0;
          height: 16%;
          pointer-events: none;
          background: linear-gradient(
            to top,
            var(--bg-fade-solid) 0%,
            var(--bg-fade-mid) 42%,
            var(--bg-fade-transparent) 100%
          );
        }

        /* ========================================================
           3. BASE RESET & 4K (2000px+) RESPONSIVE OVERRIDES
           ======================================================== */
        .showcase-figure {
          border: none !important;
          outline: none !important;
        }

        @media (min-width: 2000px) {
          .showcase-figure {
            margin-right: 0 !important;
            border-radius: 24px !important;
          }
        }
      `}</style>

      <div className="w-full flex flex-col justify-start overflow-x-hidden">
        {/* VARIANT 01: TOP ALIGNED */}
        {showTop && (
          <FeatureShowcaseSection
            id="variant-top"
            alignment="top"
            headingId="heading-v1"
            figureLabel="Invoice tracker application preview - Top Aligned"
            isLast={!showMiddle && !showBottom}
          />
        )}

        {/* VARIANT 02: MIDDLE ALIGNED (CENTERED) */}
        {showMiddle && (
          <FeatureShowcaseSection
            id="variant-middle"
            alignment="middle"
            headingId="heading-v2"
            figureLabel="Invoice tracker application preview - Middle Centered"
            isLast={!showBottom}
          />
        )}

        {/* VARIANT 03: BOTTOM ALIGNED */}
        {showBottom && (
          <FeatureShowcaseSection
            id="variant-bottom"
            alignment="bottom"
            headingId="heading-v3"
            figureLabel="Invoice tracker application preview - Bottom Aligned"
            isLast={true}
          />
        )}

        {/* FLOATING VARIANT NAVIGATION (with smooth spring layoutId indicator) */}
        {showVariantNav && variant === "all" && (
          <motion.nav
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 bg-[var(--bg)] border border-[var(--border-main)] rounded-full p-[4px] flex items-center gap-[3px] z-50 select-none shadow-sm max-[640px]:scale-[0.88] max-[640px]:bottom-[0.8rem] whitespace-nowrap"
            aria-label="Variant navigation controls"
          >
            {(
              [
                { id: "variant-top", label: "Top" },
                { id: "variant-middle", label: "Middle" },
                { id: "variant-bottom", label: "Bottom" },
              ] as const
            ).map((item) => {
              const isActive = activeVariant === item.id;
              return (
                <button
                  key={item.id}
                  className={cn(
                    "relative bg-transparent border-none font-display text-[0.74rem] font-medium tracking-[0.01em] py-[0.4rem] px-[0.75rem] rounded-full cursor-pointer transition-colors duration-200 ease-in-out z-10 active:scale-95",
                    isActive
                      ? "text-[var(--bg)]"
                      : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                  )}
                  onClick={() => scrollToVariant(item.id)}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeVariantPill"
                      className="absolute inset-0 bg-[var(--text-main)] rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 450, damping: 32 }}
                    />
                  )}
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.nav>
        )}
      </div>
    </div>
  );
}

export default Features1;
