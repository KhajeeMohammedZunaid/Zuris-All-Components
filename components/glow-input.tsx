"use client";

import * as React from "react";
import { BorderBeam } from "border-beam";
import { cn } from "@/lib/utils";

export interface GlowInputProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  containerClassName?: string;
  onSend?: (value: string) => void;
}

export const GlowInput = React.forwardRef<HTMLTextAreaElement, GlowInputProps>(
  ({ className, containerClassName, onSend, onKeyDown, ...props }, ref) => {
    const [value, setValue] = React.useState(props.value ?? "");
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

    // PowerModeInput particle effect on typing
    React.useEffect(() => {
      const el = localRef.current;
      if (!el || typeof window === "undefined") return;

      let powerModeInstance: any = null;

      import("power-mode-input")
        .then((mod) => {
          const PowerMode = mod.default || mod;
          powerModeInstance = PowerMode;
          PowerMode.make(el, {
            num: 6,
            radius: 4,
            color: "random",
            g: 0.4,
            tha: [0, 360],
          });
        })
        .catch((err) => {
          console.error("Failed to initialize power-mode-input:", err);
        });

      return () => {
        if (powerModeInstance && el) {
          try {
            powerModeInstance.close(el);
          } catch {}
        }
      };
    }, []);

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
      <BorderBeam
        borderRadius={16}
        size="md"
        colorVariant="colorful"
        theme="auto"
        className="w-full rounded-2xl overflow-hidden"
      >
        <div
          className={cn(
            "w-full min-h-[140px] sm:min-h-[160px] flex flex-col justify-between p-4 sm:p-5 rounded-2xl",
            "bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800",
            containerClassName
          )}
        >
          {/* Main Textarea */}
          <textarea
            ref={setRefs}
            value={value}
            onChange={(e) => {
              setValue(e.target.value);
              props.onChange?.(e);
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
                "p-2 sm:p-2.5 rounded-full transition-colors cursor-pointer flex items-center justify-center shrink-0",
                typeof value === "string" && value.trim().length > 0
                  ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 hover:opacity-90"
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
      </BorderBeam>
    );
  }
);

GlowInput.displayName = "GlowInput";

export default GlowInput;
