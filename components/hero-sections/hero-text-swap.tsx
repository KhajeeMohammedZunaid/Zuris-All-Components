"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const HERO_ROLES = [
  "your Copilot",
  "your AI Marketing",
  "your Agents",
  "your Platform",
];

export function HeroTextSwap() {
  const [index, setIndex] = React.useState(0);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % HERO_ROLES.length);
    }, 3600);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="relative inline-flex items-center justify-center overflow-visible">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={HERO_ROLES[index]}
          initial={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: 8, filter: "blur(3.5px)" }
          }
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={
            shouldReduceMotion
              ? { opacity: 1 }
              : { opacity: 0, y: -8, filter: "blur(3.5px)" }
          }
          transition={{
            duration: shouldReduceMotion ? 0 : 0.21,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="inline-block whitespace-nowrap"
        >
          {HERO_ROLES[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
