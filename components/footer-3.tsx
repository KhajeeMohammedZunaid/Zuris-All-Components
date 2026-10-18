"use client";

import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";

const NAV_LINKS = [
  { title: "Features", href: "#features" },
  { title: "Usecases", href: "#usecases" },
  { title: "Pricing", href: "#pricing" },
  { title: "Customers", href: "#customers" },
];

export function Footer3() {
  return (
    <footer className="w-full flex flex-col items-center justify-center py-20 sm:py-28 lg:py-36 2xl:py-48 px-6 bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      <div className="flex flex-col items-center justify-center space-y-8 sm:space-y-10 lg:space-y-12 2xl:space-y-16 max-w-4xl 2xl:max-w-6xl mx-auto text-center">
        {/* Brand: Logo + Zuris Name perfectly aligned in size and axis */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <ZurisBlackV1
            className="h-8 sm:h-9 md:h-10 lg:h-11 2xl:h-14 w-auto text-zinc-950 dark:hidden shrink-0"
            aria-label="Zuris Logo"
          />
          <ZurisWhiteV1
            className="h-8 sm:h-9 md:h-10 lg:h-11 2xl:h-14 w-auto text-zinc-50 hidden dark:block shrink-0"
            aria-label="Zuris Logo"
          />
          <span className="font-sans font-semibold text-2xl sm:text-3xl md:text-4xl 2xl:text-5xl tracking-tight leading-none text-zinc-950 dark:text-zinc-50 flex items-center">
            Zuris
          </span>
        </div>

        {/* Navigation Links: Inter font, leading-relaxed, tracking-normal, weight 300 (light) */}
        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 lg:gap-16 2xl:gap-20 list-none m-0 p-0">
            {NAV_LINKS.map((link) => (
              <li key={link.title}>
                <a href={link.href} className="block cursor-pointer">
                  <p className="font-sans font-light font-[300] text-base sm:text-lg md:text-xl 2xl:text-2xl leading-relaxed tracking-normal text-zinc-700 dark:text-zinc-300">
                    {link.title}
                  </p>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Links: Sized up proportionally, responsive for mobile to 4K */}
        <div className="flex items-center justify-center gap-6 sm:gap-8 lg:gap-10 2xl:gap-12 text-zinc-700 dark:text-zinc-400">
          {/* X (formerly Twitter) */}
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 2xl:w-9 2xl:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 2xl:w-9 2xl:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.4 3.66z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 2xl:w-9 2xl:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 2xl:w-9 2xl:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* TikTok */}
          <a
            href="https://tiktok.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="TikTok"
            className="cursor-pointer"
          >
            <svg className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 2xl:w-9 2xl:h-9 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
        </div>

        {/* Copyright: Inter font, leading-relaxed, tracking-normal, weight 300 (light) */}
        <div>
          <p className="font-sans font-light font-[300] text-sm sm:text-base 2xl:text-lg leading-relaxed tracking-normal text-zinc-500 dark:text-zinc-400">
            &copy; 2026 Zuris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
