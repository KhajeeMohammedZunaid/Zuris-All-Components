"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface GlowInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  onSend?: (value: string) => void;
}

export const GlowInput = React.forwardRef<HTMLTextAreaElement, GlowInputProps>(
  ({ className, containerClassName, onSend, onKeyDown, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value ?? "");
    const [isFocused, setIsFocused] = React.useState(false);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        if (typeof value === "string" && value.trim() && onSend) {
          onSend(value);
        }
      }
      onKeyDown?.(e);
    };

    return (
      <div
        className={cn(
          "relative w-full group rounded-2xl transition-all duration-300",
          containerClassName
        )}
      >
        {/* Ambient Glow Backdrop */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all duration-500",
            isFocused
              ? "opacity-60 blur-xl scale-[1.01]"
              : "opacity-25 blur-md group-hover:opacity-45"
          )}
        />

        {/* Outer Glow Ring / Border */}
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-2xl transition-all duration-300",
            isFocused
              ? "ring-1 ring-indigo-500/50 dark:ring-indigo-400/50"
              : "ring-1 ring-black/5 dark:ring-white/10 group-hover:ring-black/10 dark:group-hover:ring-white/20"
          )}
        />

        {/* Input Box Container */}
        <div
          className={cn(
            "relative w-full min-h-[140px] sm:min-h-[160px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl",
            "bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl shadow-zinc-950/5 dark:shadow-zinc-950/40",
            "border border-zinc-200/80 dark:border-zinc-800"
          )}
        >
          {/* Main Textarea */}
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              props.onChange?.(e);
            }}
            onFocus={(e) => {
              setIsFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              props.onBlur?.(e);
            }}
            onKeyDown={handleKeyDown}
            rows={3}
            className={cn(
              "w-full flex-1 bg-transparent resize-none outline-none border-none p-0",
              "text-zinc-900 dark:text-zinc-100 text-sm sm:text-base leading-relaxed",
              "placeholder:text-zinc-400 dark:placeholder:text-zinc-500 font-sans",
              className
            )}
            {...props}
          />

          {/* Bottom Actions Row */}
          <div className="flex items-center justify-end pt-2">
            <button
              type="button"
              onClick={() => {
                if (typeof value === "string" && value.trim() && onSend) {
                  onSend(value);
                }
              }}
              className={cn(
                "p-2 sm:p-2.5 rounded-full transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0",
                typeof value === "string" && value.trim().length > 0
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90 shadow-sm"
                  : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300"
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
      </div>
    );
  }
);

GlowInput.displayName = "GlowInput";

export default GlowInput;
