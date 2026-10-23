"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import { TextMorph } from "torph/react";
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
 * - 5 curved cards fanning out in an elegant arc
 * - Center card elevated, scaled, and upright
 * - Left/right cards tilted progressively along a parabolic curve
 * - Embla carousel manages touch/drag snapping and slide navigation
 * - Title and location morph smoothly on change using torph's TextMorph
 * - Left/Right navigation chevron buttons flanking the title
 * - Pill-shaped "Explore" button at the bottom
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
        "relative w-full max-w-4xl mx-auto flex flex-col items-center justify-center py-8 sm:py-12 px-4 select-none",
        className
      )}
    >
      {/* Invisible Embla gesture layer capturing swipe / drag anywhere across the carousel */}
      <div
        className="w-full overflow-hidden absolute inset-0 z-30 cursor-grab active:cursor-grabbing pointer-events-auto"
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

      {/* Arc Fan Stage */}
      <div className="relative w-full h-[290px] xs:h-[320px] sm:h-[380px] md:h-[410px] flex items-center justify-center overflow-visible">
        {slides.map((slide, i) => {
          let diff = i - selectedIndex;
          if (diff > total / 2) diff -= total;
          if (diff < -total / 2) diff += total;

          // Compute arc geometry
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
            transform = "translate3d(0px, 0px, 0px) scale(1.14) rotate(0deg)";
            zIndex = 30;
            opacity = 1;
          } else if (isLeft1) {
            transform =
              "translate3d(-110px, 34px, 0px) scale(0.96) rotate(-14deg)";
            zIndex = 20;
            opacity = 0.88;
          } else if (isRight1) {
            transform =
              "translate3d(110px, 34px, 0px) scale(0.96) rotate(14deg)";
            zIndex = 20;
            opacity = 0.88;
          } else if (isLeft2) {
            transform =
              "translate3d(-205px, 86px, 0px) scale(0.82) rotate(-28deg)";
            zIndex = 10;
            opacity = 0.65;
          } else if (isRight2) {
            transform =
              "translate3d(205px, 86px, 0px) scale(0.82) rotate(28deg)";
            zIndex = 10;
            opacity = 0.65;
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
                "absolute top-6 sm:top-8 left-1/2 -translate-x-1/2 w-[150px] xs:w-[170px] sm:w-[210px] md:w-[230px] aspect-[3/4] transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] origin-bottom cursor-pointer",
                !isVisible && "pointer-events-none"
              )}
            >
              <Card
                className={cn(
                  "w-full h-full p-0 overflow-hidden rounded-[22px] sm:rounded-[26px] border border-white/15 bg-zinc-900 shadow-2xl relative group",
                  isCenter &&
                    "ring-1 ring-white/30 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)]"
                )}
              >
                <CardContent className="p-0 w-full h-full relative">
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

      {/* Bottom Information Row & Navigation */}
      <div className="relative z-40 flex items-center justify-center gap-4 sm:gap-8 mt-2 sm:mt-4 w-full">
        {/* Left Arrow Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={scrollPrev}
          className="size-10 sm:size-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white/90 border border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer shrink-0"
          aria-label="Previous slide"
        >
          <ChevronLeftIcon className="size-4 sm:size-5" />
        </Button>

        {/* Center Title & Location (Powered by torph TextMorph) */}
        <div className="flex flex-col items-center justify-center text-center min-w-[220px] sm:min-w-[300px]">
          <TextMorph
            as="h2"
            className="text-2xl sm:text-3xl md:text-[34px] font-bold text-white tracking-tight leading-tight select-none"
          >
            {currentSlide.title}
          </TextMorph>

          <div className="flex items-center justify-center gap-1.5 text-zinc-400 mt-1.5 select-none">
            <MapPinIcon className="size-3.5 sm:size-4 text-zinc-400 shrink-0" />
            <TextMorph
              as="span"
              className="text-xs sm:text-sm md:text-base font-normal text-zinc-400"
            >
              {currentSlide.location}
            </TextMorph>
          </div>
        </div>

        {/* Right Arrow Button */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={scrollNext}
          className="size-10 sm:size-11 rounded-full bg-white/[0.08] hover:bg-white/[0.18] text-white/90 border border-white/10 shadow-md backdrop-blur-md transition-all active:scale-95 cursor-pointer shrink-0"
          aria-label="Next slide"
        >
          <ChevronRightIcon className="size-4 sm:size-5" />
        </Button>
      </div>

      {/* Explore CTA Button */}
      <div className="relative z-40 mt-5 sm:mt-6">
        <Button
          type="button"
          className="rounded-full px-8 sm:px-9 py-2.5 h-auto bg-gradient-to-b from-[#f5f6f8] to-[#d6dae1] hover:from-white hover:to-[#e4e7ec] text-zinc-950 font-semibold text-xs sm:text-sm shadow-[0_4px_24px_rgba(255,255,255,0.18)] active:scale-95 transition-all cursor-pointer border-none"
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
 * - Embla carousel seamlessly transitions between destinations
 * - Top-left overlay: Title and location animated with torph TextMorph
 * - Bottom floating pill overlay:
 *   - Dark circular chevron left button
 *   - Dark capsule with 5 pagination indicators (active is an elongated pill, others are circles)
 *   - Dark circular chevron right button
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
        "relative w-full max-w-[420px] sm:max-w-[440px] mx-auto select-none",
        className
      )}
    >
      <Card className="w-full aspect-[4/5] sm:h-[530px] p-0 overflow-hidden rounded-[30px] sm:rounded-[34px] border border-white/10 bg-zinc-950 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.85)] relative group">
        <CardContent className="p-0 w-full h-full relative">
          {/* Embla Viewport */}
          <div
            className="w-full h-full overflow-hidden cursor-grab active:cursor-grabbing"
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

          {/* Top-Left Header Overlay (Vignette + TextMorph Title/Location) */}
          <div className="absolute top-0 inset-x-0 pt-6 pb-12 px-6 z-20 bg-gradient-to-b from-black/75 via-black/35 to-transparent pointer-events-none text-left">
            <TextMorph
              as="h3"
              className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-tight drop-shadow-md select-none"
            >
              {currentSlide.title}
            </TextMorph>

            <div className="flex items-center gap-1.5 text-white/90 text-xs sm:text-sm mt-1 drop-shadow-sm font-medium select-none">
              <MapPinIcon className="size-3.5 text-white/90 shrink-0" />
              <TextMorph
                as="span"
                className="text-xs sm:text-sm text-white/90 font-medium"
              >
                {currentSlide.location}
              </TextMorph>
            </div>
          </div>

          {/* Bottom Vignette */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none z-10" />

          {/* Bottom Floating Control Bar (Chevron Prev, Dots Capsule, Chevron Next) */}
          <div className="absolute bottom-5 sm:bottom-6 inset-x-0 mx-auto z-30 flex items-center justify-center gap-2.5">
            {/* Prev Button */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={scrollPrev}
              className="size-9 rounded-full bg-[#173035]/80 hover:bg-[#20434a] text-white/95 border border-white/10 backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
              aria-label="Previous destination"
            >
              <ChevronLeftIcon className="size-4" />
            </Button>

            {/* Pagination Indicators Capsule */}
            <div className="h-9 px-3 rounded-full bg-[#173035]/80 border border-white/10 backdrop-blur-md shadow-lg flex items-center gap-1.5">
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
              className="size-9 rounded-full bg-[#173035]/80 hover:bg-[#20434a] text-white/95 border border-white/10 backdrop-blur-md shadow-lg transition-transform active:scale-95 cursor-pointer shrink-0"
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
 * ALL-IN-ONE SHOWCASE: Switch between Version 1 & Version 2 or view both
 * =========================================================================
 */
export function TravelCarouselShowcase() {
  const [activeTab, setActiveTab] = React.useState<"v1" | "v2" | "both">("v1");

  return (
    <section className="w-full min-h-screen bg-[#0e1013] text-white font-sans flex flex-col items-center justify-center p-4 sm:p-8 selection:bg-white selection:text-black">
      {/* Top Header & View Switcher */}
      <div className="w-full max-w-4xl flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 sm:mb-12 border-b border-white/10 pb-5">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
            Embla + Torph Travel Carousels
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-0.5">
            Powered by Embla Carousel, torph TextMorph, and shadcn Card & Button
          </p>
        </div>

        {/* View Switcher Pill */}
        <div className="flex items-center p-1 rounded-full bg-white/[0.06] border border-white/10 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab("v1")}
            className={cn(
              "px-3.5 py-1.5 rounded-full transition-all cursor-pointer",
              activeTab === "v1"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Arc View (Version 1)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("v2")}
            className={cn(
              "px-3.5 py-1.5 rounded-full transition-all cursor-pointer",
              activeTab === "v2"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Single Card (Version 2)
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("both")}
            className={cn(
              "px-3.5 py-1.5 rounded-full transition-all cursor-pointer",
              activeTab === "both"
                ? "bg-white text-zinc-950 font-semibold shadow-sm"
                : "text-zinc-400 hover:text-white"
            )}
          >
            Both Side-by-Side
          </button>
        </div>
      </div>

      {/* Dynamic Views */}
      <div className="w-full max-w-6xl flex flex-col items-center justify-center gap-12">
        {activeTab === "v1" && <ArcCarousel />}
        {activeTab === "v2" && <SingleCardCarousel />}
        {activeTab === "both" && (
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center justify-items-center">
            <div className="flex flex-col items-center w-full">
              <span className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-semibold">
                Version 1 — Arc Fan Carousel
              </span>
              <ArcCarousel />
            </div>

            <div className="flex flex-col items-center w-full">
              <span className="text-xs uppercase tracking-widest text-zinc-400 mb-4 font-semibold">
                Version 2 — Single Destination Card
              </span>
              <SingleCardCarousel />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default TravelCarouselShowcase;
