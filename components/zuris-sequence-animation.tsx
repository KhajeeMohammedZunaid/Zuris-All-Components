"use client";

import * as React from "react";
import { motion } from "motion/react";
import {
  useElementSurface,
  elementPalettes,
  elementGradient,
  type ElementName,
} from "@/components/buttons/liquid-button";
import { cn } from "@/lib/utils";

const FIVE_THEMES: ElementName[] = [
  "ocean",
  "emerald",
  "solar",
  "lava",
  "amethyst",
];

export interface ZurisSequenceAnimationProps {
  className?: string;
  intervalMs?: number; // duration for each theme variant (defaults to 400ms = 0.4s)
  onComplete?: () => void;
  replayTrigger?: number;
}

/**
 * Zuris Sequence Animation:
 * 1. App icon displays in the center with liquid shader theme variations.
 * 2. 5 theme variants cycle through rapidly (0.4s each = 2.0s total).
 * 3. The icon background moves aside to the left and dissolves.
 * 4. The logo resizes down to the exact size in the animation (h-9 sm:h-11)
 *    and moves aside to the left to its lockup position.
 * 5. Brand text "Zuris" unfolds smoothly beside the logo (Inter 400, -4.5% tracking).
 * 6. Clean and buttery smooth Apple-style fluid motion curve [0.16, 1, 0.3, 1].
 */
export function ZurisSequenceAnimation({
  className,
  intervalMs = 400,
  onComplete,
  replayTrigger = 0,
}: ZurisSequenceAnimationProps) {
  const [internalKey, setInternalKey] = React.useState(0);

  const activeKey = internalKey + replayTrigger;

  return (
    <SequencePlayer
      key={activeKey}
      intervalMs={intervalMs}
      className={className}
      onReplay={() => setInternalKey((k) => k + 1)}
      onComplete={onComplete}
    />
  );
}

interface SequencePlayerProps {
  intervalMs: number;
  className?: string;
  onReplay: () => void;
  onComplete?: () => void;
}

function SequencePlayer({
  intervalMs,
  className,
  onReplay,
  onComplete,
}: SequencePlayerProps) {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<"cycling" | "revealing">("cycling");
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  // Synchronously compute initial centering offset based on viewport breakpoint to avoid any mount shift
  const [centerOffset] = React.useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 640) {
      return 44;
    }
    return 53;
  });

  // Cycle through 5 theme variations
  React.useEffect(() => {
    let count = 0;
    const maxCycles = FIVE_THEMES.length; // 5 variations

    const timer = setInterval(() => {
      count += 1;
      if (count < maxCycles) {
        setThemeIndex(count);
      } else {
        clearInterval(timer);
        setPhase("revealing");
        onComplete?.();
      }
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs, onComplete]);

  const currentTheme = FIVE_THEMES[themeIndex] ?? "ocean";
  const palette = elementPalettes[currentTheme] ?? elementPalettes.ocean;
  const { ready, boost } = useElementSurface(
    canvasRef,
    currentTheme,
    undefined,
    false
  );

  return (
    <div
      onClick={onReplay}
      role="button"
      tabIndex={0}
      title="Click to replay sequence"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onReplay();
        }
      }}
      className={cn(
        "relative inline-flex items-center justify-center cursor-pointer select-none group outline-none",
        className
      )}
    >
      {/* 1. App Icon Box (Theme variants move aside to the left when revealing) */}
      <motion.div
        initial={{
          x: 0,
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
        }}
        animate={
          phase === "revealing"
            ? {
                x: -180,
                opacity: 0,
                scale: 0.85,
                filter: "blur(8px)",
              }
            : {
                x: 0,
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        transition={{
          duration: 0.95,
          ease: [0.16, 1, 0.3, 1],
        }}
        onMouseEnter={() => boost(2.4)}
        onMouseLeave={() => boost(1)}
        style={{
          backgroundImage: elementGradient(palette.colors),
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-[32px] sm:rounded-[40px] md:rounded-[46px] overflow-hidden flex items-center justify-center z-0 will-change-transform"
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 size-full transition-opacity duration-300",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
      </motion.div>

      {/* 2. Brand Lockup: Logo Mark + Brand Text */}
      <div className="relative z-10 flex items-center">
        {/* Zuris Logo: Big in the icon till sequence begins, then smoothly resizes down & moves aside */}
        <motion.div
          initial={{
            x: centerOffset,
            scale: 2.0,
          }}
          animate={
            phase === "revealing"
              ? {
                  x: 0,
                  scale: 1,
                }
              : {
                  x: centerOffset,
                  scale: 2.0,
                }
          }
          transition={{
            duration: 1.1,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="shrink-0 flex items-center justify-center z-10 will-change-transform"
        >
          <svg
            width="292"
            height="208"
            viewBox="0 0 292 208"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "h-9 sm:h-11 w-auto shrink-0 select-none pointer-events-none transition-colors duration-700 ease-out",
              phase === "revealing"
                ? "text-zinc-950 dark:text-zinc-50"
                : "text-white"
            )}
            aria-hidden="true"
          >
            <path
              d="M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0ZM147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </motion.div>

        {/* Brand Text: Emerges smoothly beside the logo */}
        <motion.div
          initial={{
            opacity: 0,
            x: -14,
            clipPath: "inset(0 100% 0 0)",
            filter: "blur(4px)",
          }}
          animate={
            phase === "revealing"
              ? {
                  opacity: 1,
                  x: 0,
                  clipPath: "inset(0 0% 0 0)",
                  filter: "blur(0px)",
                }
              : {
                  opacity: 0,
                  x: -14,
                  clipPath: "inset(0 100% 0 0)",
                  filter: "blur(4px)",
                }
          }
          transition={{
            duration: 1.15,
            delay: phase === "revealing" ? 0.32 : 0,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="pl-3 sm:pl-3.5 flex items-center z-0 pointer-events-none"
        >
          <h4 className="font-['Inter',sans-serif] font-normal tracking-[-0.045em] text-zinc-950 dark:text-zinc-50 leading-none select-none whitespace-nowrap m-0 text-3xl sm:text-4xl">
            Zuris
          </h4>
        </motion.div>
      </div>
    </div>
  );
}

export default ZurisSequenceAnimation;
