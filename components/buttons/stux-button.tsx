"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

export type StuxColorScheme =
  | "yellow"
  | "lime"
  | "cyan"
  | "orange"
  | "white"
  | "violet"
  | "emerald";

export type StuxButtonSize = "sm" | "default" | "lg";

export interface StuxColorConfig {
  accentBg: string;
  accentHex: string;
  textColorOnHover: string;
  iconColor: string;
  darkHoverBorder: string;
  darkActiveBorder: string;
}

export const STUX_COLOR_SCHEMES: Record<StuxColorScheme, StuxColorConfig> = {
  yellow: {
    accentBg: "bg-[#ffea2f]",
    accentHex: "#ffea2f",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#ffea2f]",
    darkActiveBorder: "dark:border-[#ffea2f]",
  },
  lime: {
    accentBg: "bg-[#d4ff32]",
    accentHex: "#d4ff32",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#d4ff32]",
    darkActiveBorder: "dark:border-[#d4ff32]",
  },
  cyan: {
    accentBg: "bg-[#00f0ff]",
    accentHex: "#00f0ff",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#00f0ff]",
    darkActiveBorder: "dark:border-[#00f0ff]",
  },
  orange: {
    accentBg: "bg-[#ff5416]",
    accentHex: "#ff5416",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#ff5416]",
    darkActiveBorder: "dark:border-[#ff5416]",
  },
  white: {
    accentBg: "bg-white",
    accentHex: "#ffffff",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-white",
    darkActiveBorder: "dark:border-white",
  },
  violet: {
    accentBg: "bg-[#a855f7]",
    accentHex: "#a855f7",
    textColorOnHover: "group-hover:text-white",
    iconColor: "text-white",
    darkHoverBorder: "dark:group-hover:border-[#a855f7]",
    darkActiveBorder: "dark:border-[#a855f7]",
  },
  emerald: {
    accentBg: "bg-[#10b981]",
    accentHex: "#10b981",
    textColorOnHover: "group-hover:text-black",
    iconColor: "text-[#040404]",
    darkHoverBorder: "dark:group-hover:border-[#10b981]",
    darkActiveBorder: "dark:border-[#10b981]",
  },
};

const SIZES: Record<
  StuxButtonSize,
  {
    height: number;
    endcapWidth: number;
    paddingX: number;
    fontSize: number;
    iconSize: number;
    shift: number;
  }
> = {
  sm: {
    height: 44,
    endcapWidth: 44,
    paddingX: 20,
    fontSize: 14,
    iconSize: 16,
    shift: 38,
  },
  default: {
    height: 52,
    endcapWidth: 52,
    paddingX: 28,
    fontSize: 16,
    iconSize: 19,
    shift: 44,
  },
  lg: {
    height: 62,
    endcapWidth: 62,
    paddingX: 36,
    fontSize: 18,
    iconSize: 22,
    shift: 52,
  },
};

const SPRING_TRANSITION = {
  type: "spring" as const,
  stiffness: 380,
  damping: 30,
  mass: 0.8,
};

export interface StuxButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  menuOpen?: boolean;
  text?: string;
  size?: StuxButtonSize;
  colorScheme?: StuxColorScheme;
  customAccent?: string;
  children?: React.ReactNode;
}

/**
 * StuxButton ("LET'S TALK"):
 * - High-contrast architectural button with responsive theme adaptivity.
 * - Solid 3px border (#040404 in light mode, dark:border-white/30 in dark mode) with smooth 600ms [0.22, 1, 0.36, 1] slide physics.
 * - Typography: Inter, <p> base tag (text-base), 0 mutedness, 0 tracking (tracking-normal), 400 weight (font-normal).
 * - Framer Motion smooth size transitions across Small, Good Size (default), and Large.
 * - Exact sections-1 dual-arrow fly-through pass animation:
 *   Travels all the way across the square endcap to the top-right edge and enters from the below edge.
 */
export const StuxButton = React.forwardRef<HTMLButtonElement, StuxButtonProps>(
  (
    {
      menuOpen = false,
      onClick,
      text = "LET'S TALK",
      children,
      className,
      id = "stux-lets-talk-btn",
      size = "default",
      colorScheme = "yellow",
      customAccent,
      style,
      ...props
    },
    ref
  ) => {
    const isOpen = menuOpen;
    const cfg = SIZES[size] ?? SIZES.default;
    const scheme = STUX_COLOR_SCHEMES[colorScheme] ?? STUX_COLOR_SCHEMES.yellow;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      onClick?.(e);
    };

    return (
      <>
        {/* Scoped CSS for full-span arrow movement from center to edge and back from below edge */}
        <style>{`
          .stux-btn-${id} .stux-arrow-main,
          .stux-btn-${id} .stux-arrow-clone {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
            will-change: transform;
          }
          .stux-btn-${id} .stux-arrow-main {
            transform: translate(0, 0);
          }
          .stux-btn-${id} .stux-arrow-clone {
            transform: translate(calc(-1 * var(--arrow-dist)), var(--arrow-dist));
          }
          .stux-btn-${id}:hover .stux-arrow-main,
          .stux-btn-${id}:focus-visible .stux-arrow-main,
          .stux-btn-${id}[aria-expanded="true"] .stux-arrow-main {
            transform: translate(var(--arrow-dist), calc(-1 * var(--arrow-dist)));
          }
          .stux-btn-${id}:hover .stux-arrow-clone,
          .stux-btn-${id}:focus-visible .stux-arrow-clone,
          .stux-btn-${id}[aria-expanded="true"] .stux-arrow-clone {
            transform: translate(0, 0);
          }
        `}</style>

        <motion.button
          ref={ref}
          type="button"
          id={id}
          onClick={handleClick}
          aria-expanded={isOpen}
          initial={false}
          animate={{
            height: cfg.height,
          }}
          transition={SPRING_TRANSITION}
          style={
            {
              "--arrow-dist": `${cfg.shift}px`,
              ...(customAccent ? { "--stux-accent": customAccent } : {}),
              ...style,
            } as React.CSSProperties
          }
          className={cn(
            `stux-btn-${id}`,
            "relative flex items-stretch select-none overflow-hidden focus:outline-none shadow-none group pointer-events-auto border-[3px] border-[#040404] dark:border-white/30 transition-all duration-300 cursor-pointer will-change-transform active:scale-[0.98] active:translate-y-[1px]",
            scheme.darkHoverBorder,
            isOpen
              ? cn(scheme.accentBg, scheme.darkActiveBorder)
              : "bg-black dark:bg-[#0c0d10]",
            className
          )}
          {...props}
        >
          {/* Responsive sliding panel: Smoothly morphs resting width with size, sweeps full-width on hover */}
          <motion.div
            initial={false}
            animate={{
              width: isOpen ? "100%" : cfg.endcapWidth,
            }}
            transition={SPRING_TRANSITION}
            className={cn(
              "absolute top-0 right-0 bottom-0 transition-[width] duration-[600ms] ease-[0.22,1,0.36,1] z-0 group-hover:!w-full",
              scheme.accentBg
            )}
          />

          {/* Text Container: Inter font, <p> tag, smooth font-size & padding morphing, 0 mutedness, 0 tracking, 400 weight */}
          <motion.p
            initial={false}
            animate={{
              paddingLeft: cfg.paddingX,
              paddingRight: cfg.paddingX,
              fontSize: cfg.fontSize,
            }}
            transition={SPRING_TRANSITION}
            className={cn(
              "relative z-10 m-0 font-['Inter',sans-serif] font-normal tracking-normal flex items-center justify-center transition-colors duration-[600ms] select-none whitespace-nowrap leading-none",
              isOpen
                ? scheme.textColorOnHover.replace("group-hover:", "")
                : cn("text-white", scheme.textColorOnHover)
            )}
          >
            {children ?? text}
          </motion.p>

          {/* Square Icon Container: Clipped at the button border edge so arrow travels all the way across the endcap */}
          <motion.div
            initial={false}
            animate={{
              width: cfg.endcapWidth,
            }}
            transition={SPRING_TRANSITION}
            className={cn(
              "relative z-10 flex items-center justify-center transition-colors duration-[600ms] border-l-[3px] shrink-0 overflow-hidden h-full",
              isOpen
                ? "border-black/15 dark:border-black/25"
                : "border-transparent group-hover:border-black/15 dark:group-hover:border-black/25"
            )}
          >
            {/* Arrow wrapper: Does NOT clip, allowing arrows to fly freely across the full square endcap */}
            <motion.span
              initial={false}
              animate={{
                width: cfg.iconSize,
                height: cfg.iconSize,
              }}
              transition={SPRING_TRANSITION}
              className="stux-arrow-wrapper relative flex items-center justify-center pointer-events-none select-none shrink-0"
            >
              {/* Primary Arrow: shoots from center all the way out to top-right edge */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn("stux-arrow-main block", scheme.iconColor)}
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>

              {/* Clone Arrow: enters from below edge into the center */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={cn("stux-arrow-clone block", scheme.iconColor)}
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </motion.span>
          </motion.div>
        </motion.button>
      </>
    );
  }
);

StuxButton.displayName = "StuxButton";

export default StuxButton;
