"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Features1Props {
  className?: string;
  variant?: "top" | "middle" | "bottom" | "all";
  showVariantNav?: boolean;
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

        {/* ========================================================
             VARIANT 01: TOP ALIGNED
             Text aligned with the top starting edge of the image
             ======================================================== */}
        {showTop && (
          <section
            id="variant-top"
            className="features-1-variant-section w-full relative py-16 lg:py-24 overflow-x-hidden border-b border-[var(--border-subtle)]/30 scroll-mt-6"
            aria-labelledby="heading-v1"
          >
            <div className="showcase-main-wrap w-full flex flex-col lg:flex-row items-start justify-between gap-10 lg:gap-14 xl:gap-20">
              {/* LEFT COLUMN: Typography (Top-aligned with image, font-normal / no bold) */}
              <article className="w-full lg:w-auto max-w-[520px] px-6 sm:px-12 lg:pl-16 xl:pl-24 2xl:pl-32 lg:pr-0 shrink-0 z-10 pt-0">
                {/* Category Tag: 01 Finance */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 font-body text-[0.85rem] font-normal text-[var(--text-main)] tracking-[-0.01em]">
                  <span className="font-mono text-[0.8rem] font-normal text-[var(--text-light)]">01</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[var(--text-light)] opacity-40" />
                  <span>Finance</span>
                </div>

                {/* Headline: font-normal, 2 distinct lines */}
                <h2
                  id="heading-v1"
                  className="font-display text-[clamp(2.1rem,3.2vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[var(--text-main)]"
                >
                  <span className="block">Ops gets an instant</span>
                  <span className="block">invoice tracker.</span>
                </h2>

                {/* Description: font-normal, below the headline */}
                <p className="font-body text-[clamp(1.02rem,1.4vw,1.18rem)] font-normal leading-[1.5] text-[var(--text-muted)] mt-4 sm:mt-5">
                  Built from billing inboxes.
                </p>
              </article>

              {/* RIGHT COLUMN: 980x595 box on desktop, full-width with matching padding on mobile, 100% on 4K */}
              <div className="w-full lg:flex-1 relative flex items-start justify-start lg:justify-end overflow-visible px-6 sm:px-12 lg:px-0 pt-0">
                <figure
                  className="showcase-figure relative w-full aspect-[980/595] lg:aspect-auto lg:w-[980px] lg:h-[595px] lg:-mr-[98px] shrink-0 m-0 p-0 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-0 border-0 border-none bg-[var(--bg-surface)]"
                  role="region"
                  aria-label="Invoice tracker application preview - Top Aligned"
                >
                  {/* The Image with bottom gradient mask */}
                  <div className="relative w-full h-full overflow-hidden image-fade-mask">
                    <img
                      src="/451shots_so.png"
                      alt="Invoice chasing and real-time tracker application"
                      className="w-full h-full object-cover object-left-top block select-none pointer-events-none"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Progressive bottom blur diffusion layer */}
                  <div className="image-blur-scrim" aria-hidden="true" />

                  {/* Color fade veil matching exact theme background */}
                  <div className="image-gradient-veil" aria-hidden="true" />
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
             VARIANT 02: MIDDLE ALIGNED (CENTERED)
             Text vertically centered relative to the image
             ======================================================== */}
        {showMiddle && (
          <section
            id="variant-middle"
            className="features-1-variant-section w-full relative py-16 lg:py-24 overflow-x-hidden border-b border-[var(--border-subtle)]/30 scroll-mt-6"
            aria-labelledby="heading-v2"
          >
            <div className="showcase-main-wrap w-full flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-14 xl:gap-20">
              {/* LEFT COLUMN: Typography (Vertically centered relative to image) */}
              <article className="w-full lg:w-auto max-w-[520px] px-6 sm:px-12 lg:pl-16 xl:pl-24 2xl:pl-32 lg:pr-0 shrink-0 z-10 flex flex-col justify-center">
                {/* Category Tag: 01 Finance */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 font-body text-[0.85rem] font-normal text-[var(--text-main)] tracking-[-0.01em]">
                  <span className="font-mono text-[0.8rem] font-normal text-[var(--text-light)]">01</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[var(--text-light)] opacity-40" />
                  <span>Finance</span>
                </div>

                {/* Headline: font-normal, 2 distinct lines */}
                <h2
                  id="heading-v2"
                  className="font-display text-[clamp(2.1rem,3.2vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[var(--text-main)]"
                >
                  <span className="block">Ops gets an instant</span>
                  <span className="block">invoice tracker.</span>
                </h2>

                {/* Description: font-normal, below the headline */}
                <p className="font-body text-[clamp(1.02rem,1.4vw,1.18rem)] font-normal leading-[1.5] text-[var(--text-muted)] mt-4 sm:mt-5">
                  Built from billing inboxes.
                </p>
              </article>

              {/* RIGHT COLUMN: 980x595 box on desktop, full-width with matching padding on mobile, 100% on 4K */}
              <div className="w-full lg:flex-1 relative flex items-start justify-start lg:justify-end overflow-visible px-6 sm:px-12 lg:px-0 pt-0">
                <figure
                  className="showcase-figure relative w-full aspect-[980/595] lg:aspect-auto lg:w-[980px] lg:h-[595px] lg:-mr-[98px] shrink-0 m-0 p-0 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-0 border-0 border-none bg-[var(--bg-surface)]"
                  role="region"
                  aria-label="Invoice tracker application preview - Middle Centered"
                >
                  {/* The Image with bottom gradient mask */}
                  <div className="relative w-full h-full overflow-hidden image-fade-mask">
                    <img
                      src="/451shots_so.png"
                      alt="Invoice chasing and real-time tracker application"
                      className="w-full h-full object-cover object-left-top block select-none pointer-events-none"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Progressive bottom blur diffusion layer */}
                  <div className="image-blur-scrim" aria-hidden="true" />

                  {/* Color fade veil matching exact theme background */}
                  <div className="image-gradient-veil" aria-hidden="true" />
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================
             VARIANT 03: BOTTOM ALIGNED
             Text aligned with the bottom baseline edge of the image
             ======================================================== */}
        {showBottom && (
          <section
            id="variant-bottom"
            className="features-1-variant-section w-full relative py-16 lg:py-24 overflow-x-hidden scroll-mt-6"
            aria-labelledby="heading-v3"
          >
            <div className="showcase-main-wrap w-full flex flex-col lg:flex-row items-start lg:items-end justify-between gap-10 lg:gap-14 xl:gap-20">
              {/* LEFT COLUMN: Typography (Bottom-aligned with image) */}
              <article className="w-full lg:w-auto max-w-[520px] px-6 sm:px-12 lg:pl-16 xl:pl-24 2xl:pl-32 lg:pr-0 shrink-0 z-10 flex flex-col justify-end pb-0">
                {/* Category Tag: 01 Finance */}
                <div className="inline-flex items-center gap-2 mb-4 sm:mb-5 font-body text-[0.85rem] font-normal text-[var(--text-main)] tracking-[-0.01em]">
                  <span className="font-mono text-[0.8rem] font-normal text-[var(--text-light)]">01</span>
                  <span className="w-[3px] h-[3px] rounded-full bg-[var(--text-light)] opacity-40" />
                  <span>Finance</span>
                </div>

                {/* Headline: font-normal, 2 distinct lines */}
                <h2
                  id="heading-v3"
                  className="font-display text-[clamp(2.1rem,3.2vw,2.75rem)] font-normal leading-[1.12] tracking-[-0.03em] text-[var(--text-main)]"
                >
                  <span className="block">Ops gets an instant</span>
                  <span className="block">invoice tracker.</span>
                </h2>

                {/* Description: font-normal, below the headline */}
                <p className="font-body text-[clamp(1.02rem,1.4vw,1.18rem)] font-normal leading-[1.5] text-[var(--text-muted)] mt-4 sm:mt-5">
                  Built from billing inboxes.
                </p>
              </article>

              {/* RIGHT COLUMN: 980x595 box on desktop, full-width with matching padding on mobile, 100% on 4K */}
              <div className="w-full lg:flex-1 relative flex items-start justify-start lg:justify-end overflow-visible px-6 sm:px-12 lg:px-0 pt-0">
                <figure
                  className="showcase-figure relative w-full aspect-[980/595] lg:aspect-auto lg:w-[980px] lg:h-[595px] lg:-mr-[98px] shrink-0 m-0 p-0 overflow-hidden rounded-[20px] sm:rounded-[24px] lg:rounded-l-[24px] lg:rounded-r-0 border-0 border-none bg-[var(--bg-surface)]"
                  role="region"
                  aria-label="Invoice tracker application preview - Bottom Aligned"
                >
                  {/* The Image with bottom gradient mask */}
                  <div className="relative w-full h-full overflow-hidden image-fade-mask">
                    <img
                      src="/451shots_so.png"
                      alt="Invoice chasing and real-time tracker application"
                      className="w-full h-full object-cover object-left-top block select-none pointer-events-none"
                      loading="eager"
                      decoding="async"
                    />
                  </div>

                  {/* Progressive bottom blur diffusion layer */}
                  <div className="image-blur-scrim" aria-hidden="true" />

                  {/* Color fade veil matching exact theme background */}
                  <div className="image-gradient-veil" aria-hidden="true" />
                </figure>
              </div>
            </div>
          </section>
        )}

        {/* FLOATING VARIANT NAVIGATION (when variant === "all" or showVariantNav === true) */}
        {showVariantNav && variant === "all" && (
          <nav
            className="fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 bg-[var(--bg)] border border-[var(--border-main)] rounded-full p-[4px] flex items-center gap-[3px] z-50 select-none shadow-sm max-[640px]:scale-[0.88] max-[640px]:bottom-[0.8rem] whitespace-nowrap"
            aria-label="Variant navigation controls"
          >
            <button
              className={cn(
                "bg-transparent border-none font-display text-[0.74rem] font-medium tracking-[0.01em] py-[0.4rem] px-[0.75rem] rounded-full cursor-pointer transition-all duration-200 ease-in-out",
                activeVariant === "variant-top"
                  ? "bg-[var(--text-main)] text-[var(--bg)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
              onClick={() => scrollToVariant("variant-top")}
            >
              Top
            </button>
            <button
              className={cn(
                "bg-transparent border-none font-display text-[0.74rem] font-medium tracking-[0.01em] py-[0.4rem] px-[0.75rem] rounded-full cursor-pointer transition-all duration-200 ease-in-out",
                activeVariant === "variant-middle"
                  ? "bg-[var(--text-main)] text-[var(--bg)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
              onClick={() => scrollToVariant("variant-middle")}
            >
              Middle
            </button>
            <button
              className={cn(
                "bg-transparent border-none font-display text-[0.74rem] font-medium tracking-[0.01em] py-[0.4rem] px-[0.75rem] rounded-full cursor-pointer transition-all duration-200 ease-in-out",
                activeVariant === "variant-bottom"
                  ? "bg-[var(--text-main)] text-[var(--bg)]"
                  : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
              )}
              onClick={() => scrollToVariant("variant-bottom")}
            >
              Bottom
            </button>
          </nav>
        )}
      </div>
    </div>
  );
}

export default Features1;
