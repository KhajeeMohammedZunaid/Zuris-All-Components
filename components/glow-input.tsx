"use client";

import * as React from "react";
import { BorderBeam } from "border-beam";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";

export type GlowColorVariant =
  | "colorful"
  | "ocean"
  | "sunset"
  | "forest"
  | "candy"
  | "ice"
  | "gold";

export type GlowIntensity = "subtle" | "balanced" | "vibrant";
export type GlowTrigger = "interaction" | "focus" | "always";
export type GlowSpeed = "slow" | "normal" | "fast";

export interface GlowInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  glowColor?: GlowColorVariant;
  glowIntensity?: GlowIntensity;
  glowTrigger?: GlowTrigger;
  glowSpeed?: GlowSpeed | number;
  borderRadius?: number;
  minHeight?: string | number;
  showSendButton?: boolean;
  onSend?: (value: string) => void;
}

export const GlowInput = React.forwardRef<HTMLTextAreaElement, GlowInputProps>(
  (
    {
      className,
      containerClassName,
      glowColor = "colorful",
      glowIntensity = "balanced",
      glowTrigger = "interaction",
      glowSpeed = "normal",
      borderRadius = 16,
      minHeight,
      showSendButton = true,
      onSend,
      onKeyDown,
      onChange,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState(
      props.defaultValue ?? ""
    );
    const [isFocused, setIsFocused] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const isDark = mounted ? resolvedTheme === "dark" : false;

    const isControlled = props.value !== undefined;
    const currentValue = isControlled ? props.value : uncontrolledValue;

    const localRef = React.useRef<HTMLTextAreaElement | null>(null);

    // Merge forwarded ref and local ref
    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        localRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          ref.current = node;
        }
      },
      [ref]
    );

    // Focus input when clicking anywhere inside the card
    const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("button")) {
        return;
      }
      if (localRef.current) {
        localRef.current.focus();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (typeof currentValue === "string" && currentValue.trim() && onSend) {
          onSend(currentValue);
        }
      }
      onKeyDown?.(e);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      if (!isControlled) {
        setUncontrolledValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    // Calculate active trigger state
    const isActive = React.useMemo(() => {
      if (glowTrigger === "always") return true;
      if (glowTrigger === "focus") return isFocused;
      return isFocused || isHovered;
    }, [glowTrigger, isFocused, isHovered]);

    // Calculate duration in seconds from glowSpeed
    const duration = React.useMemo(() => {
      if (typeof glowSpeed === "number") return glowSpeed;
      if (glowSpeed === "slow") return 8;
      if (glowSpeed === "fast") return 2.8;
      return 5;
    }, [glowSpeed]);

    // Calibrate glow parameters based on intensity and active theme
    const {
      brightness,
      glowSize,
      saturation,
      innerOpacity,
      bloomOpacity,
      strokeOpacity,
    } = React.useMemo(() => {
      if (glowIntensity === "subtle") {
        return {
          brightness: isDark ? 1.15 : 1.0,
          glowSize: isDark ? 1.15 : 1.0,
          saturation: isDark ? 1.4 : 1.6,
          innerOpacity: isDark ? "1.4" : "1.8",
          bloomOpacity: isDark ? "1.3" : "1.6",
          strokeOpacity: isDark ? "1.3" : "1.9",
        };
      }
      if (glowIntensity === "vibrant") {
        return {
          brightness: isDark ? 1.35 : 1.15,
          glowSize: isDark ? 1.5 : 1.35,
          saturation: isDark ? 1.8 : 2.2,
          innerOpacity: isDark ? "2.2" : "2.8",
          bloomOpacity: isDark ? "2.0" : "2.5",
          strokeOpacity: isDark ? "2.0" : "3.0",
        };
      }
      // Balanced (default)
      return {
        brightness: isDark ? 1.25 : 1.1,
        glowSize: isDark ? 1.3 : 1.2,
        saturation: isDark ? 1.6 : 1.8,
        innerOpacity: isDark ? "1.8" : "2.2",
        bloomOpacity: isDark ? "1.6" : "2.0",
        strokeOpacity: isDark ? "1.6" : "2.4",
      };
    }, [glowIntensity, isDark]);

    const hueRange = glowColor === "colorful" ? 360 : 45;
    const hasValue =
      typeof currentValue === "string" && currentValue.trim().length > 0;

    return (
      <BorderBeam
        borderRadius={borderRadius}
        size="md"
        colorVariant={glowColor}
        theme={isDark ? "dark" : "light"}
        active={isActive}
        duration={duration}
        brightness={brightness}
        glowSize={glowSize}
        saturation={saturation}
        hueRange={hueRange}
        style={
          {
            "--beam-stroke-opacity": strokeOpacity,
            "--beam-inner-opacity": innerOpacity,
            "--beam-bloom-opacity": bloomOpacity,
            "--beam-glow-brightness": String(brightness),
            "--beam-glow-saturate": String(saturation),
          } as React.CSSProperties
        }
        className={cn(
          "w-full max-w-xl mx-auto rounded-2xl overflow-hidden transition-all duration-300",
          containerClassName
        )}
      >
        <motion.div
          onClick={handleContainerClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          animate={{
            borderColor: isFocused
              ? isDark
                ? "rgba(113, 113, 122, 0.6)"
                : "rgba(161, 161, 170, 0.9)"
              : isDark
              ? "rgba(39, 39, 42, 1)"
              : "rgba(212, 212, 216, 0.9)",
          }}
          transition={{ duration: 0.2 }}
          style={minHeight ? { minHeight } : undefined}
          className={cn(
            "w-full min-h-[140px] sm:min-h-[160px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl cursor-text select-none",
            "bg-white dark:bg-zinc-900 border border-zinc-400 dark:border-zinc-700 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none"
          )}
        >
          {/* Main Textarea Area */}
          <div className="w-full flex-1 flex flex-col min-h-[80px]">
            <textarea
              ref={setRefs}
              value={currentValue}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              rows={3}
              className={cn(
                "w-full flex-1 min-h-[80px] bg-transparent resize-none outline-none border-none p-0 cursor-text select-text",
                "text-zinc-950 dark:text-zinc-50 text-sm sm:text-base leading-relaxed font-normal",
                "placeholder:text-zinc-700 dark:placeholder:text-zinc-300 font-sans",
                className
              )}
              {...props}
            />
          </div>

          {/* Bottom Actions Row */}
          {showSendButton && (
            <div className="flex items-center justify-end pt-2">
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  if (hasValue && onSend) {
                    onSend(currentValue);
                  }
                }}
                className={cn(
                  "p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center shrink-0",
                  hasValue
                    ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950"
                    : "bg-zinc-200 text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100 hover:text-black dark:hover:text-white border border-zinc-400 dark:border-zinc-600"
                )}
                aria-label="Send"
              >
                <svg
                  className="w-4 h-4 sm:w-4.5 sm:h-4.5 stroke-2 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
          )}
        </motion.div>
      </BorderBeam>
    );
  }
);

GlowInput.displayName = "GlowInput";

export default GlowInput;
