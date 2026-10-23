"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TextMorph } from "torph/react";
import { motion, AnimatePresence } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DestinationSlide {
  id: number;
  title: string;
  location: string;
  image: string;
  description?: string;
}

export const DESTINATIONS: DestinationSlide[] = [
  {
    id: 1,
    title: "Utula'aina Lookout",
    location: "Vava'u, Tonga",
    image: "/acc-1.png",
    description: "Towering oceanic cliffs overlooking turquoise Pacific lagoons.",
  },
  {
    id: 2,
    title: "Nankumba Peninsula",
    location: "Lake Malawi, Malawi",
    image: "/acc-2.png",
    description: "Granite boulders and lush tropical greenery resting on crystalline freshwater.",
  },
  {
    id: 3,
    title: "Bayan-Ölgii Highlands",
    location: "Altai Mountains, Mongolia",
    image: "/acc-3.png",
    description: "Wild equestrian herds roaming vast golden steppes beneath dramatic peaks.",
  },
  {
    id: 4,
    title: "Emerald Mountain Pass",
    location: "Southern Fjords, Norway",
    image: "/acc-4.png",
    description: "Misty evergreen slopes plunging into calm glacial waters.",
  },
  {
    id: 5,
    title: "Anse Source d'Argent",
    location: "La Digue, Seychelles",
    image: "/acc-5.png",
    description: "Spectacular weathered sea stacks standing sentinel over coral shallows.",
  },
];

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4 stroke-current stroke-2 fill-none", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 21c-4.418-5.333-7-8.889-7-12a7 7 0 1 1 14 0c0 3.111-2.582 6.667-7 12z"
      />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ChevronLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4 stroke-current stroke-2 fill-none", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <polyline points="15 18 9 12 15 6" />
    </svg>
  );
}

function ChevronRightIcon({ className }: { className?: string }) {
  return (
    <svg
      className={cn("w-4 h-4 stroke-current stroke-2 fill-none", className)}
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

/**
 * =========================================================================
 * VERSION 1: Arc / Curved Carousel (Exact match to User Image 1)
 * =========================================================================
 * - Generously spaced cards fanning out in an arc with natural breathing room
 * - Standard pointer cursor on cards (NO grabbing hand cursor)
 * - Navigation buttons locked in fixed positions (never move when text changes)
 * - Typography: Inter font, h3 title with font-normal (400) and -4.5% tracking,
 *   p base location tag with matching font-normal and -4.5% tracking
 * - No text truncation or three dots (...)
 * - Substantial vertical gap between arc cards and navigation row
 */
export function ArcCarousel({
  slides = DESTINATIONS,
  className,
}: {
  slides?: DestinationSlide[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const total = slides.length;
  const currentSlide = slides[selectedIndex] ?? slides[0];

  return (
    <div
      className={cn(
        "relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-0 px-4 select-none font-['Inter',sans-serif]",
        className
      )}
    >
      {/* Underlying gesture track (z-0, default cursor so no grabbing hand takes over card hover) */}
      <div
        className="w-full overflow-hidden absolute inset-0 z-0 pointer-events-auto cursor-default"
        ref={emblaRef}
        aria-hidden="true"
      >
        <div className="flex h-full w-full">
          {slides.map((slide) => (
            <div
              key={`embla-snap-${slide.id}`}
              className="flex-[0_0_100%] h-full pointer-events-none"
            />
          ))}
        </div>
      </div>

      {/* Arc Fan Stage: Cards at higher z-index with clean cursor-pointer */}
      <div className="relative z-10 w-full h-[240px] xs:h-[260px] sm:h-[290px] md:h-[310px] flex items-center justify-center overflow-visible">
        {slides.map((slide, i) => {
          let diff = i - selectedIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          // Compute arc geometry with breathing room
          const isCenter = diff === 0;
          const isLeft1 = diff === -1;
          const isRight1 = diff === 1;
          const isLeft2 = diff === -2;
          const isRight2 = diff === 2;
          const isVisible = Math.abs(diff) <= 2;

          let transform = "translate3d(0, 0, 0) scale(0) rotate(0deg)";
          let zIndex = 0;
          let opacity = 0;

          if (isCenter) {
            transform = "translate3d(0px, 0px, 0px) scale(1.08) rotate(0deg)";
            zIndex = 30;
            opacity = 1;
          } else if (isLeft1) {
            const tx = isMobile ? -100 : -135;
            transform = `translate3d(${tx}px, 24px, 0px) scale(0.95) rotate(-13deg)`;
            zIndex = 20;
            opacity = 0.9;
          } else if (isRight1) {
            const tx = isMobile ? 100 : 135;
            transform = `translate3d(${tx}px, 24px, 0px) scale(0.95) rotate(13deg)`;
            zIndex = 20;
            opacity = 0.9;
          } else if (isLeft2) {
            const tx = isMobile ? -190 : -255;
            transform = `translate3d(${tx}px, 62px, 0px) scale(0.84) rotate(-24deg)`;
            zIndex = 10;
            opacity = 0.68;
          } else if (isRight2) {
            const tx = isMobile ? 190 : 255;
            transform = `translate3d(${tx}px, 62px, 0px) scale(0.84) rotate(24deg)`;
            zIndex = 10;
            opacity = 0.68;
          }

          return (
            <div
              key={slide.id}
              onClick={() => emblaApi?.scrollTo(i)}
              style={{
                transform,
                zIndex,
                opacity,
              }}
              className={cn(
                "absolute top-4 sm:top-6 left-1/2 -translate-x-1/2 w-[120px] xs:w-[135px] sm:w-[160px] md:w-[172px] aspect-[3/4] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom cursor-pointer",
                !isVisible && "pointer-events-none"
              )}
            >
              <Card
                className={cn(
                  "w-full h-full p-0 overflow-hidden rounded-[20px] sm:rounded-[24px] border border-zinc-200/80 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-md dark:shadow-2xl relative group transition-shadow cursor-pointer",
                  isCenter &&
                    "ring-1 ring-zinc-300 dark:ring-white/30 shadow-[0_18px_40px_rgba(0,0,0,0.18)] dark:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
                )}
              >
                <CardContent className="p-0 w-full h-full relative cursor-pointer">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                  />
                  {/* Subtle edge vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 pointer-events-none" />
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {/* Bottom Information Row with COMPLETELY FIXED Navigation Buttons & Generous Gap */}
      <div className="relative z-40 w-full max-w-[460px] sm:max-w-[520px] mx-auto mt-8 sm:mt-10 md:mt-12 px-4 flex items-center justify-between">
        {/* Left Arrow Button - Fixed Position at Left */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="size-10 sm:size-11 rounded-full shrink-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 shadow-sm dark:bg-white/[0.08] dark:hover:bg-white/[0.18] dark:text-white/90 dark:border-white/10 dark:shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="size-4 sm:size-5" />
        </Button>

        {/* Center Title & Location (Strict typography: Inter, h3 with 400 weight & -4.5% tracking, p base with 400 weight & -4.5% tracking, NO truncate) */}
        <div className="flex-1 px-4 flex flex-col items-center justify-center text-center">
          <TextMorph
            as="h3"
            className="text-2xl sm:text-3xl md:text-[32px] font-normal tracking-[-0.045em] text-zinc-950 dark:text-white leading-tight select-none font-['Inter',sans-serif]"
          >
            {currentSlide.title}
          </TextMorph>

          <p className="flex items-center justify-center gap-1.5 text-zinc-500 dark:text-zinc-400 mt-1.5 select-none font-['Inter',sans-serif] font-normal tracking-[-0.045em] text-sm sm:text-base">
            <MapPinIcon className="size-3.5 sm:size-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
            <TextMorph as="span">
              {currentSlide.location}
            </TextMorph>
          </p>
        </div>

        {/* Right Arrow Button - Fixed Position at Right */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="size-10 sm:size-11 rounded-full shrink-0 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 border border-zinc-200 shadow-sm dark:bg-white/[0.08] dark:hover:bg-white/[0.18] dark:text-white/90 dark:border-white/10 dark:shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="size-4 sm:size-5" />
        </Button>
      </div>

      {/* Explore CTA Button */}
      <div className="relative z-40 mt-5 sm:mt-6">
        <Button
          type="button"
          className="rounded-full px-8 sm:px-9 py-2.5 h-auto bg-zinc-900 hover:bg-zinc-800 text-white shadow-md dark:bg-gradient-to-b dark:from-[#f5f6f8] dark:to-[#d6dae1] dark:hover:from-white dark:hover:to-[#e4e7ec] dark:text-zinc-950 font-normal tracking-[-0.045em] text-xs sm:text-sm dark:shadow-[0_4px_24px_rgba(255,255,255,0.18)] active:scale-95 transition-all cursor-pointer border-none font-['Inter',sans-serif]"
        >
          Explore
        </Button>
      </div>
    </div>
  );
}

/**
 * =========================================================================
 * VERSION 2: Single Card Carousel (Exact match to User Image 2)
 * =========================================================================
 * - Single large, full-bleed scenic hero card
 * - Both Theme Compatible
 * - Clean default cursor (NO grabbing hand cursor)
 * - Typography: Inter font, h3 with font-normal (400) & -4.5% tracking,
 *   p with font-normal (400) & -4.5% tracking
 * - Embla carousel seamlessly transitions between destinations
 * - Bottom floating pill overlay with fixed chevrons & capsule indicator
 */
export function SingleCardCarousel({
  slides = DESTINATIONS,
  className,
}: {
  slides?: DestinationSlide[];
  className?: string;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
  });

  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const scrollPrev = React.useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = React.useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = React.useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  const currentSlide = slides[selectedIndex] ?? slides[0];

  return (
    <div
      className={cn(
        "relative w-full max-w-[380px] sm:max-w-[420px] mx-auto select-none font-['Inter',sans-serif]",
        className
      )}
    >
      <Card className="w-full aspect-[4/5] sm:h-[490px] md:h-[500px] p-0 overflow-hidden rounded-[28px] sm:rounded-[32px] border border-zinc-200/90 dark:border-white/10 bg-zinc-950 shadow-none relative group cursor-default">
        <CardContent className="p-0 w-full h-full relative cursor-default">
          {/* Embla Viewport with clean default cursor */}
          <div
            className="w-full h-full overflow-hidden cursor-default"
            ref={emblaRef}
          >
            <div className="flex h-full w-full">
              {slides.map((slide) => (
                <div
                  key={`single-slide-${slide.id}`}
                  className="flex-[0_0_100%] min-w-0 h-full relative"
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover select-none pointer-events-none"
                    loading="eager"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Top-Left Header Overlay (Vignette + Inter h3 & p tracking -4.5%) */}
          <div className="absolute top-0 inset-x-0 pt-6 pb-12 px-6 z-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none text-left font-['Inter',sans-serif]">
            <TextMorph
              as="h3"
              className="text-xl sm:text-2xl font-normal tracking-[-0.045em] text-white leading-tight drop-shadow-md select-none font-['Inter',sans-serif]"
            >
              {currentSlide.title}
            </TextMorph>

            <p className="flex items-center gap-1.5 text-white/90 text-sm mt-1 drop-shadow-sm font-normal tracking-[-0.045em] select-none font-['Inter',sans-serif]">
              <MapPinIcon className="size-3.5 text-white/90 shrink-0" />
              <TextMorph as="span">
                {currentSlide.location}
              </TextMorph>
            </p>
          </div>

          {/* Bottom Floating Control Bar (Chevron Prev, Dots Capsule, Chevron Next) */}
          <div className="absolute bottom-5 sm:bottom-6 inset-x-0 mx-auto z-30 flex items-center justify-center gap-2.5">
            {/* Prev Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="size-9 rounded-full bg-[#173035]/85 hover:bg-[#20434a] text-white/95 border border-white/10 backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              aria-label="Previous destination"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            {/* Pagination Indicators Capsule */}
            <div className="h-9 px-3 rounded-full bg-[#173035]/85 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5">
              {slides.map((_, i) => {
                const isActive = i === selectedIndex;
                return (
                  <button
                    key={`dot-${i}`}
                    type="button"
                    onClick={() => scrollTo(i)}
                    className={cn(
                      "h-2 rounded-full transition-all duration-300 cursor-pointer",
                      isActive
                        ? "w-6 bg-white shadow-sm"
                        : "w-2 bg-white/40 hover:bg-white/75"
                    )}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                );
              })}
            </div>

            {/* Next Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={scrollNext}
              className="size-9 rounded-full bg-[#173035]/85 hover:bg-[#20434a] text-white/95 border border-white/10 backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              aria-label="Next destination"
            >
              <ChevronRightIcon className="size-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/**
 * =========================================================================
 * ALL-IN-ONE SHOWCASE: Fixed switcher position & buttery smooth cross-fade
 * =========================================================================
 */
export function TravelCarouselShowcase() {
  const [activeTab, setActiveTab] = React.useState<"v1" | "v2">("v1");

  return (
    <section className="w-full min-h-screen bg-zinc-50 dark:bg-[#0c0d10] text-zinc-950 dark:text-zinc-50 font-['Inter',sans-serif] flex flex-col items-center justify-center p-4 sm:p-8 transition-colors duration-200">
      {/* Fixed-Height Stage Container (Prevents any jumping/shifting of the switcher below) */}
      <div className="w-full max-w-4xl h-[510px] sm:h-[530px] flex items-center justify-center relative">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.985 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="w-full h-full flex flex-col items-center justify-center"
          >
            {activeTab === "v1" ? <ArcCarousel /> : <SingleCardCarousel />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom Switcher Pill locked in place (Never moves when switching views) */}
      <div className="mt-8 sm:mt-10 flex items-center p-1 rounded-full bg-zinc-200/70 dark:bg-white/[0.06] border border-zinc-300/80 dark:border-white/10 text-[11px] sm:text-xs font-medium font-['Inter',sans-serif]">
        <button
          type="button"
          onClick={() => setActiveTab("v1")}
          className={cn(
            "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full transition-all cursor-pointer",
            activeTab === "v1"
              ? "bg-white text-zinc-950 font-normal shadow-sm dark:bg-white dark:text-zinc-950"
              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          )}
        >
          Arc View
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("v2")}
          className={cn(
            "px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full transition-all cursor-pointer",
            activeTab === "v2"
              ? "bg-white text-zinc-950 font-normal shadow-sm dark:bg-white dark:text-zinc-950"
              : "text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
          )}
        >
          Single Card
        </button>
      </div>
    </section>
  );
}

export default TravelCarouselShowcase;
