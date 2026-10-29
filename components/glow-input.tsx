"use client";

import * as React from "react";
import { BorderBeam } from "border-beam";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

export interface GlowInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  onSend?: (value: string) => void;
}

export const GlowInput = React.forwardRef<HTMLTextAreaElement, GlowInputProps>(
  (
    {
      className,
      containerClassName,
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

    const isInteracting = isFocused || isHovered;

    return (
      <BorderBeam
        borderRadius={16}
        size="md"
        colorVariant="colorful"
        theme={isDark ? "dark" : "light"}
        active={isInteracting}
        brightness={isDark ? 1.25 : 1.1}
        glowSize={isDark ? 1.3 : 1.2}
        saturation={isDark ? 1.6 : 1.8}
        hueRange={360}
        style={
          {
            "--beam-stroke-opacity": isDark ? "1.6" : "2.4",
            "--beam-inner-opacity": isDark ? "1.8" : "2.2",
            "--beam-bloom-opacity": isDark ? "1.6" : "2.0",
            "--beam-glow-brightness": isDark ? "1.25" : "1.1",
            "--beam-glow-saturate": isDark ? "1.6" : "1.8",
          } as React.CSSProperties
        }
        className={cn(
          "w-full max-w-xl mx-auto rounded-2xl overflow-hidden transition-all duration-300",
          containerClassName
        )}
      >
        <div
          onClick={handleContainerClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "w-full min-h-[140px] sm:min-h-[160px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl cursor-text select-none",
            "bg-white dark:bg-zinc-900 border border-zinc-300/90 dark:border-zinc-800 shadow-[0_2px_12px_rgba(0,0,0,0.06)] dark:shadow-none transition-colors"
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
                "text-zinc-900 dark:text-zinc-100 text-sm sm:text-base leading-relaxed",
                "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-sans",
                className
              )}
              {...props}
            />
          </div>

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                if (typeof currentValue === "string" && currentValue.trim() && onSend) {
                  onSend(currentValue);
                }
              }}
              className={cn(
                "p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center shrink-0",
                typeof currentValue === "string" && currentValue.trim().length > 0
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 shadow-sm"
                  : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 border border-zinc-200/80 dark:border-transparent"
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
        </div>
      </BorderBeam>
    );
  }
);

GlowInput.displayName = "GlowInput";

export default GlowInput;
