"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, animate, PanInfo } from "motion/react";
import { useTheme } from "next-themes";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { defaultArcCards, type ArcCardItemData } from "./arc-cards-data";

export type { ArcCardItemData };
export { defaultArcCards };

// Mathematical rule: outer radius = inner radius + padding
const CARD_PADDING_PX = 14;
const INNER_RADIUS_PX = 18;
const OUTER_RADIUS_PX = INNER_RADIUS_PX + CARD_PADDING_PX; // Exactly 32px (18 + 14 = 32)



// Responsive metrics hook calibrated for mobile peek and desktop proportions
function useResponsiveArcMetrics() {
  const [metrics, setMetrics] = React.useState({
    cardWidth: 340,
    cardGap: 56,
    cardHeight: 520,
    imageHeight: 295,
    isMounted: false,
  });

  React.useEffect(() => {
    function computeMetrics() {
      const w = window.innerWidth;
      if (w < 480) {
        // Mobile (360px - 440px): calibrated card size with generous gap
        const cardW = Math.max(235, Math.min(250, Math.floor(w * 0.66)));
        setMetrics({
          cardWidth: cardW,
          cardGap: 46, // Increased gap on mobile
          cardHeight: 440,
          imageHeight: 230,
          isMounted: true,
        });
      } else if (w < 768) {
        // Large Mobile / Phablet
        const cardW = Math.max(265, Math.min(285, Math.floor(w * 0.56)));
        setMetrics({
          cardWidth: cardW,
          cardGap: 44,
          cardHeight: 470,
          imageHeight: 250,
          isMounted: true,
        });
      } else if (w < 1024) {
        // Tablet
        setMetrics({
          cardWidth: 325,
          cardGap: 42,
          cardHeight: 495,
          imageHeight: 275,
          isMounted: true,
        });
      } else {
        // Desktop
        setMetrics({
          cardWidth: 340,
          cardGap: 76,
          cardHeight: 520,
          imageHeight: 295,
          isMounted: true,
        });
      }
    }

    computeMetrics();
    window.addEventListener("resize", computeMetrics);
    return () => window.removeEventListener("resize", computeMetrics);
  }, []);

  return metrics;
}

export interface ArcCardsProps {
  className?: string;
  headline?: React.ReactNode;
  cards?: ArcCardItemData[];
  showThemeToggle?: boolean;
}

export function ArcCards({
  className,
  headline = "Designed for modern interfaces",
  cards = defaultArcCards,
  showThemeToggle = true,
}: ArcCardsProps) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    // Preload and decode all unique card images immediately into memory so scrolling fast never flashes white
    cards.forEach((card) => {
      if (typeof window !== "undefined") {
        const img = new Image();
        img.src = card.imageSrc;
        img.decode?.().catch(() => {});
      }
    });
  }, [cards]);

  const isDark = mounted ? (theme === "dark" || resolvedTheme === "dark") : false;
  const { cardWidth, cardGap, cardHeight, imageHeight, isMounted } = useResponsiveArcMetrics();
  const cardStep = cardWidth + cardGap;

  // Infinite Virtual Loop: 9 full sets (54 cards) so fast scrolling never runs out of cards
  const SETS_COUNT = 9;
  const middleSetIndex = Math.floor(SETS_COUNT / 2); // Set 4
  const virtualCards = React.useMemo(() => {
    const list: (ArcCardItemData & { virtualIndex: number })[] = [];
    for (let s = 0; s < SETS_COUNT; s++) {
      cards.forEach((card, i) => {
        list.push({
          ...card,
          virtualIndex: s * cards.length + i,
        });
      });
    }
    return list;
  }, [cards]);

  // Center initial card is card index 2 in the middle set
  const initialCenterIndex = middleSetIndex * cards.length + 2;
  const initialX = -initialCenterIndex * cardStep;

  const x = useMotionValue<number>(initialX);
  const activeIndexRef = React.useRef<number>(initialCenterIndex);
  const isSnappingRef = React.useRef<boolean>(false);

  // Recalculate position when dimensions resize smoothly
  React.useEffect(() => {
    if (isMounted) {
      x.set(-activeIndexRef.current * cardStep);
    }
  }, [cardStep, isMounted, x]);

  // Safe boundaries: cards are NEVER out of stock on fast drag
  const minSafeIndex = 2 * cards.length;
  const maxSafeIndex = (SETS_COUNT - 3) * cards.length + (cards.length - 1);
  const minDragX = -((SETS_COUNT - 2) * cards.length) * cardStep;
  const maxDragX = -(cards.length * cardStep);

  // Smooth buttery snapping with spring physics and safe buffer clamping
  const snapToIndex = React.useCallback(
    (targetIndex: number) => {
      // Clamped within safe buffer: impossible to fly into white space
      const clampedTarget = Math.max(minSafeIndex, Math.min(maxSafeIndex, targetIndex));

      isSnappingRef.current = true;
      activeIndexRef.current = clampedTarget;

      animate(x, -clampedTarget * cardStep, {
        type: "spring",
        stiffness: 260,
        damping: 28,
        mass: 0.7,
        onComplete: () => {
          isSnappingRef.current = false;
          // Silent infinite re-center to middle set (Set 4)
          const currentVirtual = activeIndexRef.current;
          const original = ((currentVirtual % cards.length) + cards.length) % cards.length;
          const normalized = middleSetIndex * cards.length + original;

          if (currentVirtual !== normalized) {
            activeIndexRef.current = normalized;
            x.set(-normalized * cardStep);
          }
        },
      });
    },
    [cardStep, cards.length, maxSafeIndex, middleSetIndex, minSafeIndex, x]
  );

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const current = x.get();
    // Buttery natural inertia flick
    const velocityFactor = info.velocity.x * 0.22;
    const projected = current + velocityFactor;
    const nearestIndex = Math.round(-projected / cardStep);
    snapToIndex(nearestIndex);
  };

  return (
    <section
      className={cn(
        "relative w-full min-h-screen flex flex-col justify-center overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 pt-10 sm:pt-16 pb-12 sm:pb-20 transition-colors duration-300 select-none",
        className
      )}
    >
      <div className="relative max-w-[1400px] mx-auto flex flex-col items-center w-full">
        

        {/* Main Section Heading: Exactly 4 simple words ("Designed for modern interfaces") */}
        <div className="text-center px-4 mb-6 sm:mb-12 z-10">
          <h2
            className="text-2xl sm:text-5xl md:text-6xl font-normal text-zinc-950 dark:text-zinc-50 tracking-tight"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "-0.045rem",
            }}
          >
            {headline}
          </h2>
        </div>

        {/* 
          Arc Carousel Viewport
          Anchored with paddingLeft: calc(50% - cardWidth / 2) so that at x = -k * cardStep,
          card k is guaranteed to be DEAD-CENTER in the viewport with rotate = 0deg (completely straight).
          touchAction: 'pan-y' allows seamless vertical scrolling while horizontal touch drags the arc buttery smooth.
        */}
        <div
          suppressHydrationWarning
          className="relative w-full overflow-visible pt-2 pb-10 sm:pb-14 cursor-grab active:cursor-grabbing"
          style={{
            paddingLeft: `calc(50% - ${cardWidth / 2}px)`,
            touchAction: "pan-y",
          }}
        >
          <motion.div
            suppressHydrationWarning
            drag="x"
            dragConstraints={{ left: minDragX, right: maxDragX }}
            dragElastic={0.08}
            onDragEnd={handleDragEnd}
            style={{ x }}
            className="flex items-start will-change-transform"
          >
            {virtualCards.map((card) => (
              <ArcCardItem
                key={`${card.id}-v${card.virtualIndex}`}
                card={card}
                virtualIndex={card.virtualIndex}
                cardWidth={cardWidth}
                cardGap={cardGap}
                cardStep={cardStep}
                cardHeight={cardHeight}
                imageHeight={imageHeight}
                motionX={x}
                onSelect={() => snapToIndex(card.virtualIndex)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface ArcCardItemProps {
  card: ArcCardItemData;
  virtualIndex: number;
  cardWidth: number;
  cardGap: number;
  cardStep: number;
  cardHeight: number;
  imageHeight: number;
  motionX: ReturnType<typeof useMotionValue<number>>;
  onSelect: () => void;
}

function ArcCardItem({
  card,
  virtualIndex,
  cardWidth,
  cardGap,
  cardStep,
  cardHeight,
  imageHeight,
  motionX,
  onSelect,
}: ArcCardItemProps) {
  // deltaX = motionX + virtualIndex * cardStep
  // When this card is dead center: deltaX = 0 exactly.
  // Pure circular arc geometry without artificial flatlining caps
  // Calibrated so the dome arch is continuous across all cards even when zoomed out
  const arcRadius = cardStep * 14.5;

  const rotate = useTransform(motionX, (currentX) => {
    const deltaX = currentX + virtualIndex * cardStep;
    const ratio = Math.max(-0.65, Math.min(0.65, deltaX / arcRadius));
    // Exact tangential rotation along the circular dome: exactly 0.000deg at center!
    const angle = Math.asin(ratio) * (180 / Math.PI);
    return Math.round(angle * 100) / 100;
  });

  const translateY = useTransform(motionX, (currentX) => {
    const deltaX = currentX + virtualIndex * cardStep;
    const ratio = Math.max(-0.65, Math.min(0.65, deltaX / arcRadius));
    // Exact circular arc drop: R * (1 - cos(theta))
    // Continues naturally and gracefully along the entire circular arch
    const drop = arcRadius * (1 - Math.cos(Math.asin(ratio)));
    return Math.round(drop * 10) / 10;
  });

  const scale = useTransform(motionX, (currentX) => {
    const deltaX = Math.abs(currentX + virtualIndex * cardStep);
    const stepDiff = deltaX / cardStep;
    return Math.round(Math.max(0.92, 1 - stepDiff * 0.015) * 1000) / 1000;
  });

  return (
    <motion.div
      suppressHydrationWarning
      style={{
        width: `${cardWidth}px`,
        marginRight: `${cardGap}px`,
        rotate,
        y: translateY,
        scale,
      }}
      onClick={onSelect}
      className="shrink-0 will-change-transform select-none origin-center"
    >
      {/* 
        Mathematical Rule Application:
        Card outer radius = inner radius + padding
        Outer radius = 18px + 14px = 32px
        Subtle inner shadow highlights the card boundary delicately without outer drop shadows or borders.
        All cards have the EXACT same height (cardHeight) to remove dead below-text white space.
      */}
      <Card
        className="w-full bg-white dark:bg-[#18181b] border-0 border-none ring-0 ring-offset-0 ring-transparent outline-none flex flex-col justify-between transition-colors duration-200 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.06),inset_0_1px_2px_0_rgba(0,0,0,0.02)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08),inset_0_1px_0_0_rgba(255,255,255,0.06)]"
        style={{
          padding: `${CARD_PADDING_PX}px`,
          borderRadius: `${OUTER_RADIUS_PX}px`, // Exactly 32px
          height: `${cardHeight}px`,
          minHeight: `${cardHeight}px`,
          maxHeight: `${cardHeight}px`,
          border: "none",
          outline: "none",
        }}
      >
        {/* Top: Inner Rounded Visual Container - any image fits edge-to-edge */}
        <div className="w-full flex flex-col">
          <div
            className="w-full relative overflow-hidden flex items-center justify-center bg-[#eaeaea] dark:bg-[#232326] border-0 border-none shadow-none shrink-0"
            style={{
              height: `${imageHeight}px`,
              borderRadius: `${INNER_RADIUS_PX}px`, // Exactly 18px (Outer 32px = Inner 18px + Padding 14px)
              boxShadow: "none",
              border: "none",
            }}
          >
            <img
              src={card.imageSrc}
              alt={card.title}
              className="w-full h-full object-cover object-center select-none pointer-events-none"
              loading="eager"
              decoding="async"
              draggable={false}
            />
          </div>

          {/* Card Body: Title (h4) + Description (p) */}
          <div className="pt-3 sm:pt-4 flex flex-col">
            {/* 
              h4 Heading: Inter font, medium (500) weight, letterspacing -0.045rem
            */}
            <h4
              className="text-[1.05rem] sm:text-[1.15rem] md:text-[1.2rem] text-zinc-950 dark:text-zinc-50 leading-[1.25] mb-1.5 sm:mb-2 line-clamp-1"
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 500,
                letterSpacing: "-0.045rem",
              }}
            >
              {card.title}
            </h4>

            {/* 
              p Description: Inter font, light (300) weight, deep unmuted contrast, DEFAULT TRACKING
            */}
            <p
              className="text-[0.82rem] sm:text-[0.86rem] md:text-[0.89rem] text-zinc-950 dark:text-zinc-50 leading-[1.45] sm:leading-[1.5] line-clamp-3"
              style={{
                fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
                fontWeight: 300,
                letterSpacing: "normal",
              }}
            >
              {card.description}    
            </p>
          </div>
        </div>

        {/* Card Footer: Clean Text Action Link (Steady, no hover opacity change) */}
        <div className="pt-2 sm:pt-3 pb-1 mt-auto flex items-center justify-start">
          <span
            className="inline-flex items-center text-[0.82rem] sm:text-[0.86rem] font-medium text-zinc-950 dark:text-zinc-50 cursor-pointer"
            style={{
              fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
              letterSpacing: "normal",
            }}
          >
            {card.actionText}
          </span>
        </div>
      </Card>
    </motion.div>
  );
}

export default ArcCards;
