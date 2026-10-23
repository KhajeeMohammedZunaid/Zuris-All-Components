"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Navbar() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const mobileBtnRef = React.useRef<HTMLButtonElement>(null);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = React.useCallback(() => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }, [resolvedTheme, setTheme]);

  const openMenu = React.useCallback(() => {
    setIsMenuOpen(true);
    document.body.classList.add("overflow-hidden");
    setTimeout(() => {
      const firstFocusable = overlayRef.current?.querySelector<HTMLElement>("a, button");
      firstFocusable?.focus();
    }, 60);
  }, []);

  const closeMenu = React.useCallback(() => {
    setIsMenuOpen(false);
    document.body.classList.remove("overflow-hidden");
    mobileBtnRef.current?.focus();
  }, []);

  const toggleMenu = React.useCallback(() => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isMenuOpen, openMenu, closeMenu]);

  // Handle Escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        closeMenu();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen, closeMenu]);

  // Close menu on desktop resize
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && isMenuOpen) {
        setIsMenuOpen(false);
        document.body.classList.remove("overflow-hidden");
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMenuOpen]);

  // Focus trap for mobile menu
  const handleBtnKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (isMenuOpen && e.key === "Tab") {
      const focusables = overlayRef.current
        ? Array.from(overlayRef.current.querySelectorAll<HTMLElement>("a, button"))
        : [];
      if (focusables.length) {
        e.preventDefault();
        if (!e.shiftKey) {
          focusables[0].focus();
        } else {
          focusables[focusables.length - 1].focus();
        }
      }
    }
  };

  const handleOverlayKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab" && isMenuOpen) {
      const focusables = overlayRef.current
        ? Array.from(overlayRef.current.querySelectorAll<HTMLElement>("a, button"))
        : [];
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        mobileBtnRef.current?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        mobileBtnRef.current?.focus();
      }
    }
  };

  return (
    <>
      {/* Mobile Navigation Overlay */}
      <div
        id="mobileMenuOverlay"
        ref={overlayRef}
        className={cn(
          "fixed inset-0 w-full h-full h-[100dvh] bg-[#fafafa] dark:bg-[#09090b] z-40 md:hidden flex flex-col justify-between pt-20 xs:pt-24 pb-8 px-6 xs:px-8 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-y-auto",
          isMenuOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-4"
        )}
        aria-hidden={!isMenuOpen}
        inert={!isMenuOpen}
        onKeyDown={handleOverlayKeyDown}
      >
        <nav className="relative z-10 flex flex-col gap-5 pt-4" aria-label="Mobile Navigation">
          <a
            href="#product"
            onClick={closeMenu}
            className="mobile-nav-link font-sans text-[1.15rem] xs:text-[1.25rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white no-underline tracking-tight transition-colors py-1"
          >
            Product
          </a>
          <a
            href="#pricing"
            onClick={closeMenu}
            className="mobile-nav-link font-sans text-[1.15rem] xs:text-[1.25rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white no-underline tracking-tight transition-colors py-1"
          >
            Pricing
          </a>
          <a
            href="#integration"
            onClick={closeMenu}
            className="mobile-nav-link font-sans text-[1.15rem] xs:text-[1.25rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white no-underline tracking-tight transition-colors py-1"
          >
            Integration
          </a>
          <a
            href="#resources"
            onClick={closeMenu}
            className="mobile-nav-link font-sans text-[1.15rem] xs:text-[1.25rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white no-underline tracking-tight transition-colors py-1"
          >
            Resources
          </a>

          <Button
            type="button"
            variant="ghost"
            onClick={toggleTheme}
            className="mobile-nav-link text-left font-sans text-[1.15rem] xs:text-[1.25rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white no-underline tracking-tight transition-colors py-1 h-auto bg-transparent hover:bg-transparent border-none cursor-pointer flex items-center justify-between shadow-none w-full p-0"
          >
            <span>Theme</span>
            <span className="text-[0.92rem] font-medium text-zinc-950 dark:text-zinc-100 px-3 py-1 rounded-full bg-zinc-200/70 dark:bg-zinc-800 border border-zinc-300/80 dark:border-zinc-700">
              {mounted ? (resolvedTheme === "dark" ? "Dark" : "Light") : "Theme"}
            </span>
          </Button>
        </nav>

        <div className="relative z-10 pt-6 border-t border-solid border-zinc-200 dark:border-zinc-800">
          <Button
            nativeButton={false}
            render={<a href="#signin" />}
            onClick={closeMenu}
            className="mobile-nav-link w-full inline-flex items-center justify-center bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-normal text-[0.92rem] py-3 h-auto rounded-full no-underline shadow-sm transition-colors"
          >
            Sign in
          </Button>
        </div>
      </div>

      {/* Main Header */}
      <header className="relative w-full px-4 sm:px-6 md:px-5 lg:px-12 4k:px-16 py-2.5 sm:py-3.5 4k:py-5 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] bg-[#fafafa] dark:bg-[#09090b] border-b border-solid border-zinc-200 dark:border-zinc-800 z-50 flex-shrink-0">
        {/* Corner Markers */}
        <div className="absolute -left-[4px] 4k:-left-[5px] -bottom-[4px] 4k:-bottom-[5px] w-[7px] 4k:w-[9px] h-[7px] 4k:h-[9px] bg-[#fafafa] dark:bg-[#09090b] border border-zinc-400 dark:border-zinc-600 pointer-events-none z-30" />
        <div className="absolute -right-[4px] 4k:-right-[5px] -bottom-[4px] 4k:-bottom-[5px] w-[7px] 4k:w-[9px] h-[7px] 4k:h-[9px] bg-[#fafafa] dark:bg-[#09090b] border border-zinc-400 dark:border-zinc-600 pointer-events-none z-30" />

        {/* Brand */}
        <div className="flex items-center justify-start justify-self-start flex-shrink-0">
          <a
            href="#"
            className="flex items-center gap-2 xs:gap-2.5 md:gap-2.5 lg:gap-3 4k:gap-4 font-sans text-[1.08rem] xs:text-[1.15rem] sm:text-[1.18rem] md:text-[1.22rem] lg:text-[1.28rem] 4k:text-[1.58rem] font-medium tracking-tight text-zinc-950 dark:text-zinc-50 no-underline whitespace-nowrap select-none"
          >
            <svg
              className="w-[21px] h-[21px] xs:w-[23px] xs:h-[23px] sm:w-[24px] sm:h-[24px] md:w-[24px] md:h-[24px] lg:w-[26px] lg:h-[26px] 4k:w-[33px] 4k:h-[33px] flex-shrink-0"
              viewBox="0 0 180 180"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M73.9286 81.9811C77.479 81.9811 80.3571 84.8533 80.3571 88.3962V100.357C80.3571 103.832 77.5887 106.661 74.1329 106.769C73.9974 106.773 73.8617 106.786 73.7289 106.813L38.7711 114.015C38.6383 114.043 38.5026 114.056 38.3671 114.06C34.9113 114.167 32.1429 116.997 32.1429 120.472V136.509C32.1429 140.052 35.021 142.925 38.5714 142.925H141.429C144.979 142.925 147.857 140.052 147.857 136.509V120.472C147.857 116.929 150.735 114.057 154.286 114.057H173.571C177.122 114.057 180 116.929 180 120.472V139.717C180 143.26 177.122 146.132 173.571 146.132H157.5C153.95 146.132 151.071 149.004 151.071 152.547V168.585C151.071 172.128 148.193 175 144.643 175H35.3571C31.8067 175 28.9286 172.128 28.9286 168.585V152.547C28.9286 149.004 26.0504 146.132 22.5 146.132H6.42857C2.87817 146.132 0 143.26 0 139.717V95.6806C0 92.1376 2.87817 89.2655 6.42857 89.2655L73.9286 81.9811Z"
                fill="currentColor"
              />
              <path
                d="M151.071 27.4528C151.071 30.9958 153.95 33.8679 157.5 33.8679H173.571C177.122 33.8679 180 36.7401 180 40.283V84.3194C180 87.8624 177.122 90.7345 173.571 90.7345L106.071 98.0189C102.521 98.0189 99.6429 95.1467 99.6429 91.6038V79.6428C99.6429 76.1681 102.411 73.3386 105.867 73.2309C106.003 73.2267 106.138 73.214 106.271 73.1866L141.229 65.9845C141.362 65.9572 141.497 65.9444 141.633 65.9402C145.089 65.8326 147.857 63.0031 147.857 59.5283V43.4906C147.857 39.9476 144.979 37.0755 141.429 37.0755H38.5714C35.021 37.0755 32.1429 39.9476 32.1429 43.4906V59.5283C32.1429 63.0713 29.2647 65.9434 25.7143 65.9434H6.42857C2.87817 65.9434 0 63.0713 0 59.5283V40.283C0 36.7401 2.87817 33.8679 6.42857 33.8679H22.5C26.0504 33.8679 28.9286 30.9958 28.9286 27.4528V11.4151C28.9286 7.87214 31.8067 5 35.3571 5H144.643C148.193 5 151.071 7.87214 151.071 11.4151V27.4528Z"
                fill="currentColor"
              />
            </svg>
            <span className="leading-none">Nexura</span>
          </a>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center justify-center justify-self-center" aria-label="Main Navigation">
          <ul className="flex items-center gap-3.5 md:gap-4 lg:gap-8 4k:gap-14 list-none m-0 p-0">
            <li>
              <a
                href="#product"
                className="text-[0.84rem] md:text-[0.86rem] lg:text-[0.95rem] 4k:text-[1.12rem] font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors whitespace-nowrap"
              >
                Product
              </a>
            </li>
            <li>
              <a
                href="#pricing"
                className="text-[0.84rem] md:text-[0.86rem] lg:text-[0.95rem] 4k:text-[1.12rem] font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors whitespace-nowrap"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#integration"
                className="text-[0.84rem] md:text-[0.86rem] lg:text-[0.95rem] 4k:text-[1.12rem] font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight transition-colors whitespace-nowrap"
              >
                Integration
              </a>
            </li>
            <li>
              <a
                href="#resources"
                className="text-[0.84rem] md:text-[0.86rem] lg:text-[0.95rem] 4k:text-[1.12rem] font-normal text-slate-800 hover:text-black dark:text-zinc-400 dark:hover:text-white no-underline tracking-tight inline-flex items-center gap-1 4k:gap-1.5 transition-colors whitespace-nowrap"
              >
                <span>Resources</span>
                <svg className="w-3 h-3 4k:w-4 4k:h-4 stroke-current stroke-2 fill-none" viewBox="0 0 24 24">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </a>
            </li>
          </ul>
        </nav>

        {/* Actions */}
        <div className="flex items-center justify-end justify-self-end gap-2 sm:gap-3 md:gap-3 lg:gap-5 flex-shrink-0">
          <Button
            type="button"
            variant="ghost"
            onClick={toggleTheme}
            className="hidden md:inline-flex items-center justify-center text-[0.82rem] md:text-[0.85rem] lg:text-[0.92rem] 4k:text-[1.12rem] font-normal text-slate-800 hover:text-black dark:text-zinc-300 dark:hover:text-white tracking-tight transition-colors cursor-pointer select-none bg-transparent hover:bg-zinc-200/60 dark:hover:bg-zinc-800/70 px-2.5 py-1 md:py-1.5 h-auto rounded-full border border-transparent whitespace-nowrap shadow-none"
            aria-label="Toggle theme"
          >
            {mounted ? (resolvedTheme === "dark" ? "Light" : "Dark") : "Theme"}
          </Button>

          <Button
            id="mobileMenuBtn"
            ref={mobileBtnRef}
            variant="ghost"
            size="icon"
            className={cn(
              "md:hidden relative z-50 p-2 h-auto w-auto flex flex-col justify-center items-center gap-[5px] text-zinc-900 dark:text-zinc-100 focus:outline-none cursor-pointer select-none border-none shadow-none bg-transparent hover:bg-transparent",
              isMenuOpen && "menu-open"
            )}
            aria-label="Toggle Navigation Menu"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
            onKeyDown={handleBtnKeyDown}
          >
            <span className="hamburger-bar hamburger-bar-1 block w-5 h-[2px] bg-zinc-950 dark:bg-zinc-100 rounded-full" />
            <span className="hamburger-bar hamburger-bar-2 block w-5 h-[2px] bg-zinc-950 dark:bg-zinc-100 rounded-full" />
            <span className="hamburger-bar hamburger-bar-3 block w-5 h-[2px] bg-zinc-950 dark:bg-zinc-100 rounded-full" />
          </Button>

          <Button
            nativeButton={false}
            render={<a href="#signin" />}
            className="hidden md:inline-flex bg-black hover:bg-zinc-800 text-white dark:bg-white dark:hover:bg-zinc-200 dark:text-black font-normal text-[0.82rem] md:text-[0.84rem] lg:text-[0.92rem] 4k:text-[1.05rem] px-3.5 md:px-4 lg:px-5 4k:px-7 py-1.5 sm:py-2 4k:py-2.5 rounded-full no-underline transition-colors shadow-sm flex-shrink-0 h-auto whitespace-nowrap"
          >
            Sign in
          </Button>
        </div>
      </header>
    </>
  );
}
