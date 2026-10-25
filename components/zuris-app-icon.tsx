"use client";

import * as React from "react";
import {
  useElementSurface,
  elementPalettes,
  elementGradient,
  type ElementName,
} from "@/components/buttons/liquid-button";
import { cn } from "@/lib/utils";

const THEMES: ElementName[] = [
  "lava",
  "ocean",
  "stone",
  "sky",
  "obsidian",
  "emerald",
  "aurora",
  "amber",
  "rose",
  "cyber",
  "neon",
  "sunset",
  "amethyst",
  "solar",
];

export interface ZurisAppIconProps {
  className?: string;
  intervalMs?: number; // fast changing, defaults to 400ms (0.4s)
}

/**
 * Zuris App Icon with dynamic liquid button theme variants
 * - Shapes as an Apple-style squircle app icon
 * - Rapidly cycles through liquid shader theme palettes every 0.4s
 * - Center holds the Zuris logo mark in pure white with floating drop-shadow
 * - Pure visual component with zero extra text
 */
export function ZurisAppIcon({
  className,
  intervalMs = 400,
}: ZurisAppIconProps) {
  const [themeIndex, setThemeIndex] = React.useState(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setThemeIndex((prev) => (prev + 1) % THEMES.length);
    }, intervalMs);

    return () => clearInterval(timer);
  }, [intervalMs]);

  const currentTheme = THEMES[themeIndex];
  const palette = elementPalettes[currentTheme] ?? elementPalettes.lava;
  const { ready, boost } = useElementSurface(
    canvasRef,
    currentTheme,
    undefined,
    false
  );

  return (
    <div
      onMouseEnter={() => boost(2.4)}
      onMouseLeave={() => boost(1)}
      style={{
        backgroundImage: elementGradient(palette.colors),
      }}
      className={cn(
        "relative w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 rounded-[32px] sm:rounded-[40px] md:rounded-[46px] overflow-hidden flex items-center justify-center select-none",
        className
      )}
    >
      {/* Dynamic WebGL Liquid Canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className={cn(
          "pointer-events-none absolute inset-0 size-full transition-opacity duration-300",
          ready ? "opacity-100" : "opacity-0"
        )}
      />

      {/* Center Zuris Logo (Crisp White, flat & simple) */}
      <svg
        width="292"
        height="208"
        viewBox="0 0 292 208"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-20 sm:w-28 md:w-32 h-auto text-white shrink-0 select-none pointer-events-none"
        aria-hidden="true"
      >
        <path
          d="M0 0H212C249.5 0 280 30.5 280 67C280 94 266 112 245 131L230 146L292 208H226L164 146L101 208H0V129L81 47H0V0ZM147 47H212C224 47 233 56 233 68C233 75 229 82 223 88L164 146V80L82 162H34L147 47Z"
          fill="white"
          fillRule="evenodd"
          clipRule="evenodd"
        />
      </svg>
    </div>
  );
}

export default ZurisAppIcon;
