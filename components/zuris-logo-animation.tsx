"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export interface ZurisLogoAnimationProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

/**
 * Micro-interactive Zuris Logo & Side-Revealing Text Animation
 * - Logo enters first with an organic spring pop & micro-tilt
 * - Text expands & slides out horizontally from beside the logo
 * - Uses Inter font, <h4> tag, 400 weight (font-normal), -4.5% tracking (-0.045em)
 * - Click anywhere on the component to replay the animation
 */
export function ZurisLogoAnimation({
  className,
  size = "md",
}: ZurisLogoAnimationProps) {
  const [replayKey, setReplayKey] = React.useState(0);

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  // Calibrated dimensions for sm, md, lg
  const sizeConfig = {
    sm: {
      svg: "h-7 sm:h-8",
      text: "text-2xl sm:text-[26px]",
      gap: "pl-2.5 sm:pl-3",
    },
    md: {
      svg: "h-9 sm:h-11",
      text: "text-3xl sm:text-4xl",
      gap: "pl-3 sm:pl-3.5",
    },
    lg: {
      svg: "h-12 sm:h-14",
      text: "text-4xl sm:text-5xl",
      gap: "pl-4 sm:pl-4.5",
    },
  }[size];

  return (
    <div
      key={replayKey}
      onClick={handleReplay}
      className={cn(
        "inline-flex items-center cursor-pointer select-none group",
        className
      )}
      title="Click to replay animation"
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleReplay();
        }
      }}
    >
      {/* Step 1: Zuris Logo Mark (Animates into its fixed position, never shifts) */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.45,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="shrink-0 flex items-center justify-center z-10"
      >
        <svg
          width="292"
          height="208"
          viewBox="0 0 292 208"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "w-auto text-zinc-950 dark:text-zinc-50 shrink-0 drop-shadow-sm",
            sizeConfig.svg
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

      {/* Step 2: Text emerges from the side of the logo with clip-path (Zero layout shift on logo or text) */}
      <motion.div
        initial={{ opacity: 0, x: -12, clipPath: "inset(0 100% 0 0)" }}
        animate={{ opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }}
        transition={{
          duration: 0.5,
          delay: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
        className={cn(
          "flex items-center z-0",
          sizeConfig.gap
        )}
      >
        <h4
          className={cn(
            "font-['Inter',sans-serif] font-normal tracking-[-0.045em] text-zinc-950 dark:text-zinc-50 leading-none select-none whitespace-nowrap m-0",
            sizeConfig.text
          )}
        >
          Zuris
        </h4>
      </motion.div>
    </div>
  );
}

export default ZurisLogoAnimation;
