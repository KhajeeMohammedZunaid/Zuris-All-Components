"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { HeroTextSwap } from "@/components/hero-sections/hero-text-swap";
import { TypewriterPrompt } from "@/components/typewriter-prompt";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

export function Hero() {
  const shouldReduceMotion = useReducedMotion();
  const [startBtnText, setStartBtnText] = React.useState("Start for free");
  const [isBtnBusy, setIsBtnBusy] = React.useState(false);

  const handleStartClick = () => {
    if (isBtnBusy) return;
    setIsBtnBusy(true);

    setStartBtnText("Launching workspace…");

    setTimeout(() => {
      setStartBtnText("Workspace ready ✓");

      setTimeout(() => {
        setStartBtnText("Start for free");
        setIsBtnBusy(false);
      }, 2200);
    }, 1200);
  };

  const handleStartKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === " " || e.key === "Spacebar") {
      e.preventDefault();
      handleStartClick();
    }
  };

  return (
    <div className="relative w-full flex-1 min-h-0 bg-[#fafafa] dark:bg-[#09090b] overflow-hidden flex flex-col justify-between">
      {/* Hero Artwork */}
      <div className="absolute inset-x-0 bottom-0 h-[52%] xs:h-[56%] sm:h-[58%] md:h-[60%] lg:h-[62%] 4k:h-[68%] z-[1] overflow-hidden pointer-events-none">
        <img
          src="/alone-upscaled.png"
          alt=""
          className="w-full h-full object-cover object-bottom artwork-fade-mask"
        />
      </div>

      {/* Sarah Badge */}
      <div className="flex absolute left-[10%] xs:left-[14%] sm:left-[18%] lg:left-[14%] xl:left-[16%] 4k:left-[17%] bottom-[38%] xs:bottom-[40%] sm:bottom-[36%] lg:bottom-[35%] 4k:bottom-[44%] z-[12] pointer-events-none flex-col items-start scale-[0.82] xs:scale-90 lg:scale-100 4k:scale-125 origin-bottom-left">
        <div className="floating-badge-sarah flex flex-col items-start">
          <svg className="w-[17px] h-[17px] fill-sky-400 -rotate-[15deg] drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7 2-3 7L4 2z" />
          </svg>
          <div className="bg-sky-400 text-white font-sans text-[0.78rem] font-medium py-[0.22rem] px-[0.65rem] rounded-full ml-[10px] mt-[2px] tracking-tight shadow-sm select-none">
            Sarah
          </div>
        </div>
      </div>

      {/* Aaron Badge */}
      <div className="flex absolute right-[10%] xs:right-[14%] sm:right-[18%] lg:right-[13%] xl:right-[15%] 4k:right-[17%] bottom-[34%] xs:bottom-[36%] sm:bottom-[33%] lg:bottom-[32%] 4k:bottom-[40%] z-[12] pointer-events-none flex-col items-start scale-[0.82] xs:scale-90 lg:scale-100 4k:scale-125 origin-bottom-left">
        <div className="floating-badge-aaron flex flex-col items-start">
          <svg className="w-[17px] h-[17px] fill-amber-500 -rotate-[15deg] drop-shadow-sm" viewBox="0 0 24 24">
            <path d="M4 2l16 11-7 2-3 7L4 2z" />
          </svg>
          <div className="bg-amber-500 text-white font-sans text-[0.78rem] font-medium py-[0.22rem] px-[0.65rem] rounded-full ml-[10px] mt-[2px] tracking-tight shadow-sm select-none">
            Aaron
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <main className="relative z-10 w-full max-w-[820px] 4k:max-w-[1180px] mx-auto px-4 pt-24 xs:pt-28 sm:pt-10 md:pt-12 lg:pt-16 4k:pt-24 text-center flex flex-col items-center">
        {/* Headline */}
        <h1 className="animate-enter-1 text-[2.1rem] xs:text-[2.45rem] sm:text-[2.9rem] md:text-[3.4rem] lg:text-[3.9rem] 4k:text-[5.4rem] font-semibold sm:font-medium text-zinc-950 dark:text-zinc-50 leading-[1.12] sm:leading-[1.14] 4k:leading-[1.12] tracking-[-0.035em] mb-2.5 sm:mb-3 4k:mb-5 max-w-[680px] md:max-w-[720px] lg:max-w-[740px] 4k:max-w-[1060px]">
          Scale faster with
          <br />
          <HeroTextSwap />
        </h1>

        {/* Subtitle */}
        <p className="animate-enter-2 text-[0.84rem] xs:text-[0.88rem] sm:text-[1rem] md:text-[1.04rem] lg:text-[1.08rem] 4k:text-[1.32rem] font-normal sm:font-light text-slate-800 dark:text-zinc-400 max-w-[580px] md:max-w-[620px] 4k:max-w-[860px] leading-[1.46] sm:leading-[1.58] 4k:leading-[1.62] mb-4 sm:mb-6 4k:mb-8 tracking-tight px-2">
          Spend less time on logistics and more on strategy while Nexura handles the execution of your global marketing<span className="hidden xl:inline"> operations</span>.
        </p>

        {/* CTA Buttons */}
        <div className="animate-enter-3 flex flex-row items-center justify-center gap-2.5 xs:gap-3 sm:gap-3.5 md:gap-4 4k:gap-5 w-auto">
          <Button
            id="startBtn"
            onClick={handleStartClick}
            onKeyDown={handleStartKeyDown}
            className="h-auto inline-flex items-center justify-center py-[0.68rem] xs:py-[0.72rem] sm:py-[0.75rem] 4k:py-[1rem] px-5 xs:px-6 sm:px-7 md:px-[1.75rem] 4k:px-10 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:hover:bg-zinc-200 dark:text-zinc-950 font-medium sm:font-normal text-[0.88rem] xs:text-[0.92rem] sm:text-[0.92rem] 4k:text-[1.08rem] rounded-full border border-zinc-950 dark:border-zinc-50 cursor-pointer transition-colors shadow-sm whitespace-nowrap flex-shrink-0"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={startBtnText}
                initial={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: 4, filter: "blur(2px)" }
                }
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={
                  shouldReduceMotion
                    ? { opacity: 1 }
                    : { opacity: 0, y: -4, filter: "blur(2px)" }
                }
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.15,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {startBtnText}
              </motion.span>
            </AnimatePresence>
          </Button>

          <Button
            nativeButton={false}
            variant="outline"
            render={<a href="#sales" />}
            className="h-auto inline-flex items-center justify-center py-[0.68rem] xs:py-[0.72rem] sm:py-[0.75rem] 4k:py-[1rem] px-5 xs:px-6 sm:px-7 md:px-[1.75rem] 4k:px-10 bg-white hover:bg-zinc-50 text-zinc-950 dark:bg-zinc-900/80 dark:hover:bg-zinc-800 dark:text-zinc-100 font-medium sm:font-normal text-[0.88rem] xs:text-[0.92rem] sm:text-[0.92rem] 4k:text-[1.08rem] rounded-full no-underline border border-black/15 dark:border-zinc-700 cursor-pointer transition-colors shadow-none whitespace-nowrap flex-shrink-0"
          >
            Talk to sales
          </Button>
        </div>
      </main>

      {/* Prompt Card */}
      <TypewriterPrompt />
    </div>
  );
}

export { Hero as Hero1 };
