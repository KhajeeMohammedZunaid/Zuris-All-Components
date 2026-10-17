"use client";

import * as React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

const PROMPTS = [
  "Generate Q3 performance report",
  "Analyze ad spend metrics",
  "Optimize global campaign budget",
];

export function TypewriterPrompt() {
  const shouldReduceMotion = useReducedMotion();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const [promptIndex, setPromptIndex] = React.useState(0);
  const [displayText, setDisplayText] = React.useState(PROMPTS[0]);
  const [caretVisible, setCaretVisible] = React.useState(true);
  const [isUserTyping, setIsUserTyping] = React.useState(false);
  const [inputValue, setInputValue] = React.useState("");
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isBusy, setIsBusy] = React.useState(false);

  // Caret blinking effect
  React.useEffect(() => {
    if (isUserTyping || shouldReduceMotion) {
      setCaretVisible(true);
      return;
    }
    const interval = setInterval(() => {
      setCaretVisible((prev) => !prev);
    }, 530);
    return () => clearInterval(interval);
  }, [isUserTyping, shouldReduceMotion]);

  // Typewriter animation loop
  React.useEffect(() => {
    if (isUserTyping || shouldReduceMotion || isBusy) {
      if (!isBusy) {
        setDisplayText(PROMPTS[0]);
      }
      return;
    }

    let charIndex = 0;
    let isDeleting = false;
    let currentIdx = promptIndex;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const currentPrompt = PROMPTS[currentIdx];

      if (isDeleting) {
        charIndex--;
        setDisplayText(currentPrompt.substring(0, charIndex));
      } else {
        charIndex++;
        setDisplayText(currentPrompt.substring(0, charIndex));
      }

      let speed = isDeleting ? 22 : 55 + Math.random() * 20;

      if (!isDeleting && charIndex === currentPrompt.length) {
        speed = 2000;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        currentIdx = (currentIdx + 1) % PROMPTS.length;
        setPromptIndex(currentIdx);
        speed = 400;
      }

      timeoutId = setTimeout(tick, speed);
    };

    timeoutId = setTimeout(tick, 400);

    return () => clearTimeout(timeoutId);
  }, [isUserTyping, shouldReduceMotion, isBusy, promptIndex]);

  const handleFocus = () => {
    setIsUserTyping(true);
    if (!inputValue) {
      setInputValue(displayText);
    }
  };

  const handleBlur = () => {
    if (!inputValue.trim()) {
      setIsUserTyping(false);
      setInputValue("");
    }
  };

  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.stopPropagation();
    if (isBusy) return;
    setIsBusy(true);
    setIsSubmitted(true);

    const query = inputValue.trim() || "Analyzing metrics across channels";
    setDisplayText(`${query}…`);
    setIsUserTyping(false);

    setTimeout(() => {
      setIsSubmitted(false);
      setDisplayText("Report generated successfully ✓");

      setTimeout(() => {
        setIsBusy(false);
        setInputValue("");
      }, 2000);
    }, 2000);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="animate-enter-4 relative z-10 w-full max-w-[540px] 4k:max-w-[760px] mx-auto px-3 sm:px-4 mb-5 sm:mb-6 4k:mb-8">
      <Card
        className="w-full bg-white dark:bg-[#121215] rounded-[18px] sm:rounded-[20px] 4k:rounded-[24px] p-3.5 sm:p-5 4k:p-6 pb-3 sm:pb-3.5 4k:pb-4 min-h-[105px] sm:min-h-[125px] 4k:min-h-[155px] flex flex-col justify-between border border-black/[0.08] dark:border-white/[0.12] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.6)] cursor-text ring-0 gap-0"
        onClick={() => inputRef.current?.focus()}
      >
        <div className="relative w-full flex items-center min-h-[1.6rem] sm:min-h-[1.75rem] 4k:min-h-[2.2rem] mt-1.5 sm:mt-0">
          {!isUserTyping && (
            <div
              id="typewriterDisplay"
              aria-hidden="true"
              className="flex items-center w-full pointer-events-none"
            >
              <span
                id="typewriterText"
                className="font-sans text-[16px] sm:text-[1.02rem] 4k:text-[1.22rem] font-medium sm:font-normal text-slate-800 dark:text-zinc-200 tracking-tight"
              >
                {displayText}
              </span>
              <span
                id="typewriterCaret"
                className="inline-block w-[1.5px] 4k:w-[2px] h-[1rem] sm:h-[1.15rem] 4k:h-[1.4rem] bg-zinc-950 dark:bg-zinc-100 ml-[2px] transition-opacity duration-150"
                style={{ opacity: caretVisible ? 1 : 0 }}
              />
            </div>
          )}

          <input
            ref={inputRef}
            type="text"
            className={cn(
              "absolute inset-0 w-full h-full border-none outline-none bg-transparent font-sans text-[16px] sm:text-[1.02rem] 4k:text-[1.22rem] font-medium sm:font-normal text-slate-800 dark:text-zinc-200 placeholder:text-slate-400 dark:placeholder:text-zinc-500 tracking-tight transition-opacity",
              isUserTyping ? "opacity-100" : "opacity-0"
            )}
            id="promptInput"
            aria-label="Prompt"
            placeholder="Ask Nexura anything..."
            spellCheck={false}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex justify-end items-center mt-2 sm:mt-2.5 4k:mt-3">
          <Button
            id="promptSubmitBtn"
            size="icon"
            type="button"
            aria-label="Submit Prompt"
            className="w-[32px] h-[32px] sm:w-[36px] sm:h-[36px] 4k:w-[46px] 4k:h-[46px] rounded-full bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:hover:bg-zinc-300 dark:text-zinc-950 border-none flex items-center justify-center cursor-pointer transition-colors p-0 shrink-0 shadow-none"
            onClick={handleSubmit}
          >
            <AnimatePresence mode="wait" initial={false}>
              {isSubmitted ? (
                <motion.span
                  key="check"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.14 }}
                  className="flex items-center justify-center"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 4k:w-5 4k:h-5 stroke-emerald-400 stroke-2 fill-none"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.span>
              ) : (
                <motion.span
                  key="arrow"
                  initial={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  exit={
                    shouldReduceMotion
                      ? { opacity: 1 }
                      : { opacity: 0, scale: 0.8 }
                  }
                  transition={{ duration: 0.14 }}
                  className="flex items-center justify-center"
                >
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 4k:w-5 4k:h-5 stroke-white dark:stroke-zinc-950 stroke-2 fill-none"
                    viewBox="0 0 24 24"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </Card>
    </div>
  );
}
