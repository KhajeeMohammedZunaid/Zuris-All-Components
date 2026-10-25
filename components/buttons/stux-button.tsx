"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export type StuxColorScheme =
  | "yellow"
  | "lime"
  | "cyan"
  | "orange"
  | "white"
  | "violet"
  | "emerald";

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

export interface StuxButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  menuOpen?: boolean;
  onMenuOpenChange?: (open: boolean) => void;
  text?: string;
  size?: "default" | "sm" | "lg";
  colorScheme?: StuxColorScheme;
  customAccent?: string;
}

/**
 * Dual-arrow pass-through fly animation identical to sections-1.tsx:
 * - arrow-main: at rest at (0, 0), glides out to (34px, -34px) on hover / open.
 * - arrow-clone: at rest at (-34px, 34px), glides in to (0, 0) on hover / open.
 * - Easing: cubic-bezier(0.22, 1, 0.36, 1) over 550ms.
 */
export function SectionsArrow({
  className,
  isOpen = false,
  iconColor = "text-[#040404]",
}: {
  className?: string;
  isOpen?: boolean;
  iconColor?: string;
}) {
  return (
    <span
      className={cn(
        "relative flex items-center justify-center overflow-hidden pointer-events-none select-none shrink-0",
        className
      )}
    >
      {/* Primary Arrow: resting at center (0,0), shoots out to top-right on hover / open */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full stroke-current pointer-events-none transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform block",
          iconColor,
          isOpen
            ? "translate-x-[34px] -translate-y-[34px]"
            : "translate-x-0 translate-y-0 group-hover:translate-x-[34px] group-hover:-translate-y-[34px] group-focus-visible:translate-x-[34px] group-focus-visible:-translate-y-[34px]"
        )}
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>

      {/* Clone Arrow: enters from bottom-left (-34px, 34px) into center (0,0) on hover / open */}
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={cn(
          "absolute inset-0 size-full stroke-current pointer-events-none transition-transform duration-[550ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform block",
          iconColor,
          isOpen
            ? "translate-x-0 translate-y-0"
            : "-translate-x-[34px] translate-y-[34px] group-hover:translate-x-0 group-hover:translate-y-0 group-focus-visible:translate-x-0 group-focus-visible:translate-y-0"
        )}
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
  );
}

/**
 * StuxButton ("LET'S TALK"):
 * - High-contrast architectural button with responsive theme adaptivity.
 * - Solid 3px border (#040404 in light mode, dark:border-white/30 in dark mode) with smooth 600ms [0.22, 1, 0.36, 1] slide physics.
 * - Typography: Inter, <p> base tag (text-base), 0 mutedness, 0 tracking (tracking-normal), 400 weight (font-normal).
 * - Exact sections-1 dual-arrow fly-through pass animation.
 * - Proportional button sizing with matching square endcap container.
 */
export const StuxButton = React.forwardRef<HTMLButtonElement, StuxButtonProps>(
  (
    {
      menuOpen: controlledMenuOpen,
      onMenuOpenChange,
      onClick,
      text = "LET'S TALK",
      children,
      className,
      id = "stux-lets-talk-btn",
      size = "default",
      colorScheme = "yellow",
      customAccent,
      ...props
    },
    ref
  ) => {
    const [internalOpen, setInternalOpen] = React.useState(false);
    const isControlled = controlledMenuOpen !== undefined;
    const isOpen = isControlled ? controlledMenuOpen : internalOpen;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!isControlled) {
        setInternalOpen((prev) => !prev);
      }
      onMenuOpenChange?.(!isOpen);
      onClick?.(e);
    };

    const scheme = STUX_COLOR_SCHEMES[colorScheme] ?? STUX_COLOR_SCHEMES.yellow;

    // Sizing matrix: height matches endcap width for a perfectly square icon container
    const sizeMap = {
      sm: {
        height: "h-10 sm:h-11 md:h-12",
        endcap: "w-10 sm:w-11 md:w-12",
        padding: "px-4 sm:px-5 md:px-6",
        icon: "w-4 h-4",
        text: "text-sm sm:text-[15px] md:text-base",
      },
      default: {
        height: "h-11 sm:h-12 md:h-[54px]",
        endcap: "w-11 sm:w-12 md:w-[54px]",
        padding: "px-5 sm:px-6 md:px-8",
        icon: "w-[18px] h-[18px] md:w-5 md:h-5",
        text: "text-base",
      },
      lg: {
        height: "h-13 sm:h-14 md:h-16",
        endcap: "w-13 sm:w-14 md:w-16",
        padding: "px-6 sm:px-7 md:px-10",
        icon: "w-5 h-5 md:w-6 md:h-6",
        text: "text-base sm:text-[17px] md:text-lg",
      },
    };

    const currentSize = sizeMap[size] ?? sizeMap.default;

    return (
      <button
        ref={ref}
        type="button"
        id={id}
        onClick={handleClick}
        aria-expanded={isOpen}
        style={
          customAccent
            ? ({
                "--stux-accent": customAccent,
              } as React.CSSProperties)
            : undefined
        }
        className={cn(
          "relative flex items-stretch select-none overflow-hidden focus:outline-none shadow-lg group pointer-events-auto border-[3px] border-[#040404] dark:border-white/30 transition-all duration-300 cursor-pointer will-change-transform",
          scheme.darkHoverBorder,
          isOpen
            ? cn(scheme.accentBg, scheme.darkActiveBorder)
            : "bg-black dark:bg-[#0c0d10]",
          currentSize.height,
          className
        )}
        {...props}
      >
        {/* Responsive sliding panel: Sits behind right endcap at rest, smoothly sweeps full-width on hover / open */}
        <div
          className={cn(
            "absolute top-0 right-0 bottom-0 transition-all duration-[600ms] ease-[0.22,1,0.36,1] z-0",
            scheme.accentBg,
            currentSize.endcap,
            isOpen ? "w-full" : "group-hover:w-full"
          )}
        />

        {/* Text Container: Inter font, <p> base tag, 0 mutedness (pure white / pure black), 0 tracking, 400 weight */}
        <p
          className={cn(
            "relative z-10 m-0 font-['Inter',sans-serif] font-normal tracking-normal flex items-center justify-center transition-colors duration-[600ms] select-none whitespace-nowrap leading-none",
            currentSize.text,
            currentSize.padding,
            isOpen
              ? scheme.textColorOnHover.replace("group-hover:", "")
              : cn("text-white", scheme.textColorOnHover)
          )}
        >
          {children ?? text}
        </p>

        {/* Square Icon Container with 3px interior divider line */}
        <div
          className={cn(
            "relative z-10 flex items-center justify-center transition-colors duration-[600ms] border-l-[3px] shrink-0 overflow-hidden",
            currentSize.endcap,
            isOpen
              ? "border-black/15 dark:border-black/25"
              : "border-transparent group-hover:border-black/15 dark:group-hover:border-black/25"
          )}
        >
          {/* Exact sections-1 dual-arrow fly-through animation */}
          <SectionsArrow
            className={currentSize.icon}
            isOpen={isOpen}
            iconColor={scheme.iconColor}
          />
        </div>
      </button>
    );
  }
);

StuxButton.displayName = "StuxButton";

export default StuxButton;
