"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Testimonials1 } from "@/components/testimonials-1";

export default function TestimonialsPage() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <main className="min-h-screen w-full bg-[#fcfcfd] dark:bg-[#08090a] text-zinc-950 dark:text-zinc-50 flex flex-col items-center justify-center relative transition-colors duration-200">
      {/* Floating Theme Switcher */}
      

      <Testimonials1 />
    </main>
  );
}
