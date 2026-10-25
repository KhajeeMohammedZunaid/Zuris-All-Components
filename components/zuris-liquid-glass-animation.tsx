"use client";

import * as React from "react";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { LiquidGlassLogo } from "@/components/liquid-glass/liquid-glass-logo";
import { cn } from "@/lib/utils";

const ZURIS_SVG_DATA_URI = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 292 208" fill="#ffffff"><path fill="#ffffff" fill-rule="evenodd" clip-rule="evenodd" d="M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0ZM147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z"/></svg>'
)}`;

export interface ZurisLiquidGlassAnimationProps {
  className?: string;
  replayTrigger?: number;
  onComplete?: () => void;
}

/**
 * Zuris Liquid Glass Animation:
 * 1. Liquid-glass optical engine runs on the Zuris logo.
 * 2. Fluid caustics, wave ripples, and dispersion settle on the emblem.
 * 3. The exact same liquid-glass logo resizes smoothly and precisely into the brand lockup position.
 * 4. The brand text "Zuris" unfolds beside it (Inter 400, -4.5% tracking).
 * 5. Clean, buttery smooth, with zero duplicate logos or jarring glitches.
 */
export function ZurisLiquidGlassAnimation({
  className,
  replayTrigger = 0,
  onComplete,
}: ZurisLiquidGlassAnimationProps) {
  const [internalKey, setInternalKey] = React.useState(0);
  const activeKey = internalKey + replayTrigger;

  return (
    <LiquidGlassPlayer
      key={activeKey}
      className={className}
      onReplay={() => setInternalKey((k) => k + 1)}
      onComplete={onComplete}
    />
  );
}

interface LiquidGlassPlayerProps {
  className?: string;
  onReplay: () => void;
  onComplete?: () => void;
}

function LiquidGlassPlayer({
  className,
  onReplay,
  onComplete,
}: LiquidGlassPlayerProps) {
  const [phase, setPhase] = React.useState<"glass" | "revealing">("glass");
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 640;
    }
    return false;
  });

  React.useEffect(() => {
    setMounted(true);
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : true;

  // Center offset to place the logo dead-center of the screen during glass phase
  const centerOffset = isMobile ? 53 : 65;
  // Precise target scale to match resting logo size in shader sequence (50px desktop / 44px mobile)
  const targetScale = isMobile ? 0.483 : 0.488;

  // Let the liquid-glass fluid simulation run and settle (~1.9s) before starting the reveal transition
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setPhase("revealing");
      onComplete?.();
    }, 1900);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      onClick={onReplay}
      role="button"
      tabIndex={0}
      title="Click to replay liquid glass sequence"
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
      {/* Brand Lockup: Logo Slot + Brand Typography */}
      <div className="relative z-10 flex items-center">
        {/* Anchor Slot for Logo: Exactly matches shader sequence logo dimensions (70x50 desktop, 62x44 mobile) */}
        <div className="w-[62px] h-[44px] sm:w-[70px] sm:h-[50px] shrink-0 relative flex items-center justify-center">
          {/* The Same Liquid Glass Logo: Starts big & centered on screen, then resizes smoothly down into this slot */}
          <motion.div
            initial={{
              x: centerOffset,
              scale: 1.0,
            }}
            animate={
              phase === "revealing"
                ? {
                    x: 0,
                    scale: targetScale,
                  }
                : {
                    x: centerOffset,
                    scale: 1.0,
                  }
            }
            transition={{
              duration: 1.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[360px] sm:h-[360px] flex items-center justify-center will-change-transform"
          >
            <LiquidGlassLogo
              logo={ZURIS_SVG_DATA_URI}
              ending="logo"
              tile={true}
              theme={isDark ? "dark" : "light"}
              logoColor={isDark ? "#ffffff" : "#09111b"}
              tileColor={isDark ? "#060c18" : "#e4e6ea"}
              background="transparent"
              logoSize={220}
              logoScale={0.76}
              finalLogoScale={1}
              logoRelief={1}
              depth={2.9}
              dispersion={1}
              relief={1}
              caustics={1}
              highlights={1}
              echoTint={0.5}
              innerWallFocus={0}
              bloom={0.55}
              dropStrength={1}
              decay={1.4}
              speed={1}
              loop={false}
              interactive={false}
              className="!min-h-0 size-full"
              style={{ minHeight: 0, background: "transparent" }}
            />
          </motion.div>
        </div>

        {/* Brand Text: Emerges smoothly beside the liquid glass logo */}
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
          className="pl-3.5 sm:pl-4 flex items-center z-0 pointer-events-none"
        >
          <h4 className="font-['Inter',sans-serif] font-normal tracking-[-0.045em] text-zinc-950 dark:text-zinc-50 leading-none select-none whitespace-nowrap m-0 text-4xl sm:text-5xl">
            Zuris
          </h4>
        </motion.div>
      </div>
    </div>
  );
}

export default ZurisLiquidGlassAnimation;
