"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";

interface NavbarHero2Props {
  onLoginClick?: () => void;
  onGetStartedClick?: () => void;
}

export function NavbarHero2({
  onLoginClick,
  onGetStartedClick,
}: NavbarHero2Props) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll smoothly when mobile menu is open
  React.useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <>
      <header className="w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#09090b]/95 backdrop-blur-md sticky top-0 z-50 font-[family-name:var(--font-jakarta-display)] select-none">
        <div className="w-full flex items-stretch justify-between h-14 sm:h-16">
          {/* Left: Square box containing Zuris Logo & Text (smoothly moves to left end on mobile open, returns on close) */}
          <div
            className={`flex items-center gap-2.5 px-6 sm:px-8 border-r border-zinc-200 dark:border-zinc-800 select-none h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              mobileMenuOpen
                ? "-translate-x-3 sm:-translate-x-4 md:translate-x-0"
                : "translate-x-0"
            }`}
          >
            <a
              href="/"
              className="flex items-center gap-2.5 text-zinc-950 dark:text-zinc-50 no-underline"
              aria-label="Zuris Home"
            >
              <ZurisBlackV1
                className="h-5 sm:h-5.5 w-auto text-zinc-950 dark:hidden"
                aria-hidden="true"
              />
              <ZurisWhiteV1
                className="h-5 sm:h-5.5 w-auto text-zinc-50 hidden dark:block"
                aria-hidden="true"
              />
              <span className="font-semibold text-base sm:text-lg tracking-[-0.03em] leading-none">
                Zuris
              </span>
            </a>
          </div>

          {/* Center: CMS SaaS Navigation Links in Normal 400 weight with -3% letterspacing */}
          <nav
            className="hidden md:flex items-center justify-center gap-8 lg:gap-10 px-8 flex-1"
            aria-label="Hero Navigation"
          >
            <a
              href="#features"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Features
            </a>
            <a
              href="#templates"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Templates
            </a>
            <a
              href="#integrations"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Integrations
            </a>
            <a
              href="#pricing"
              className="text-sm font-normal text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-zinc-50 tracking-[-0.03em] transition-colors"
            >
              Pricing
            </a>
          </nav>

          {/* Right Desktop Actions: Login + Theme Switcher */}
          <div className="hidden md:flex items-stretch">
            <button
              type="button"
              onClick={onLoginClick}
              className="flex items-center justify-center px-6 border-l border-zinc-200 dark:border-zinc-800 text-sm font-normal text-zinc-800 dark:text-zinc-200 hover:bg-zinc-50 dark:hover:bg-zinc-900 tracking-[-0.03em] cursor-pointer transition-colors rounded-none"
            >
              Login
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="rounded-none border-0 border-l border-zinc-200 dark:border-zinc-800 bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-sm px-6 h-full shadow-none cursor-pointer flex items-center justify-center transition-colors"
              aria-label="Toggle theme"
            >
              {mounted
                ? resolvedTheme === "dark"
                  ? "Light Mode"
                  : "Dark Mode"
                : "Theme"}
            </button>
          </div>

          {/* Mobile: In-place Morphing Hamburger/Cross Button (smoothly moves to right end on open, returns on close) */}
          <div className="flex md:hidden items-stretch">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`flex items-center justify-center px-5 border-l border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 cursor-pointer rounded-none focus:outline-none h-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                mobileMenuOpen
                  ? "translate-x-3 sm:translate-x-4 md:translate-x-0"
                  : "translate-x-0"
              }`}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              <div className="relative w-5 h-4 flex flex-col justify-between items-center pointer-events-none">
                {/* Top line morphs to 45 deg */}
                <span
                  className={`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen
                      ? "translate-y-[7.1px] rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
                {/* Middle line morphs out with subtle blur */}
                <span
                  className={`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-200 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    mobileMenuOpen
                      ? "opacity-0 blur-[1px] scale-x-0"
                      : "opacity-100 blur-0 scale-x-100"
                  }`}
                />
                {/* Bottom line morphs to -45 deg */}
                <span
                  className={`w-5 h-[1.8px] bg-zinc-950 dark:bg-zinc-50 rounded-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                    mobileMenuOpen
                      ? "-translate-y-[7.1px] -rotate-45"
                      : "translate-y-0 rotate-0"
                  }`}
                />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay: Translucent with noise and blur, showing website behind */}
      <div
        className={`fixed inset-x-0 top-14 sm:top-16 bottom-0 z-40 md:hidden flex flex-col justify-between bg-white/45 dark:bg-[#09090b]/50 backdrop-blur-2xl backdrop-saturate-150 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden font-[family-name:var(--font-jakarta-display)] border-b border-zinc-200/60 dark:border-zinc-800/60 ${
          mobileMenuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto visible"
            : "opacity-0 -translate-y-3 pointer-events-none invisible"
        }`}
      >
        {/* Subtle noise texture overlay revealing website behind */}
        <div
          className="absolute inset-0 pointer-events-none opacity-25 dark:opacity-35 mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Center: CMS SaaS Nav Links matching site typography (400 weight, -3% tracking) */}
        <div className="relative z-10 px-8 py-10 flex-1 flex flex-col justify-center gap-6">
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Features
          </a>
          <a
            href="#templates"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Templates
          </a>
          <a
            href="#integrations"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Integrations
          </a>
          <a
            href="#pricing"
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-normal text-zinc-900 dark:text-zinc-100 hover:text-zinc-500 dark:hover:text-zinc-400 tracking-[-0.03em] transition-colors"
          >
            Pricing
          </a>
        </div>

        {/* Bottom: Action buttons with matching typography & sharp edges */}
        <div className="relative z-10 p-6 border-t border-zinc-200/60 dark:border-zinc-800/60 bg-white/30 dark:bg-[#09090b]/40 backdrop-blur-md flex flex-col gap-3">
          <Button
            onClick={() => {
              setMobileMenuOpen(false);
              onGetStartedClick?.();
            }}
            className="w-full rounded-none bg-zinc-950 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200 font-normal tracking-[-0.03em] text-sm h-11 shadow-none cursor-pointer flex items-center justify-center"
          >
            Get started
          </Button>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onLoginClick?.();
            }}
            className="w-full rounded-none border border-zinc-300 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 hover:bg-white/40 dark:hover:bg-zinc-900/40 font-normal tracking-[-0.03em] text-sm h-11 cursor-pointer flex items-center justify-center transition-colors"
          >
            Login
          </button>

          <button
            type="button"
            onClick={toggleTheme}
            className="w-full rounded-none border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 hover:bg-white/40 dark:hover:bg-zinc-900/40 font-normal tracking-[-0.03em] text-xs h-10 cursor-pointer flex items-center justify-between px-4 transition-colors"
          >
            <span>Switch Theme</span>
            <span className="font-normal text-zinc-950 dark:text-zinc-50">
              {mounted ? (resolvedTheme === "dark" ? "Light Mode" : "Dark Mode") : "Theme"}
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
