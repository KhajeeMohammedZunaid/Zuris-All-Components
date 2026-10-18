"use client";

import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";

interface NavCol {
  heading: string;
  links: { title: string; href: string }[];
}

const PRIMARY_COLUMNS: NavCol[] = [
  {
    heading: "Product",
    links: [
      { title: "Components", href: "#components" },
      { title: "Design System", href: "#design-system" },
      { title: "Documentation", href: "#docs" },
      { title: "CLI & Tooling", href: "#cli" },
      { title: "Figma Kit", href: "#figma" },
    ],
  },
  {
    heading: "Platform",
    links: [
      { title: "Component Library", href: "#library" },
      { title: "Templates", href: "#templates" },
      { title: "Showcase", href: "#showcase" },
      { title: "Integrations", href: "#integrations" },
    ],
  },
  {
    heading: "Company",
    links: [
      { title: "About Us", href: "#about" },
      { title: "Careers", href: "#careers" },
      { title: "Blog", href: "#blog" },
      { title: "Press & Media", href: "#press" },
    ],
  },
];

const LEGAL_LINKS = [
  { title: "Terms of Service", href: "#terms" },
  { title: "Privacy Policy", href: "#privacy" },
  { title: "Status", href: "#status" },
];

const SUPPORT_LINKS = [
  { title: "Contact Us", href: "#contact" },
  { title: "Report an Issue", href: "#issue" },
];

function SocialIcons() {
  return (
    <div className="flex items-center gap-3.5 text-zinc-800 dark:text-zinc-200">
      {/* X (formerly Twitter) */}
      <a
        href="https://x.com"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (formerly Twitter)"
        className="cursor-pointer"
      >
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
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
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
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
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76A1.69 1.69 0 0 0 8.16 7.07 1.7 1.7 0 0 0 6.46 5.37a1.7 1.7 0 0 0-1.7 1.7 1.69 1.69 0 0 0 1.7 1.69m1.4 9.74v-8.37H5.06v8.37h2.8z" />
        </svg>
      </a>
    </div>
  );
}

export function Footer4() {
  return (
    <footer className="relative w-full min-h-[45vh] sm:min-h-[50vh] flex flex-col justify-between py-6 sm:py-12 md:py-14 lg:py-16 px-4 sm:px-8 md:px-10 lg:px-14 xl:px-18 2xl:px-24 bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 border-t border-zinc-200/60 dark:border-zinc-800/60 transition-colors duration-300">
      <div className="relative z-10 w-full max-w-[1536px] 2xl:max-w-[1920px] 3xl:max-w-[2400px] mx-auto flex-1 flex flex-col justify-between gap-8 sm:gap-10 md:gap-12 lg:gap-16">
        {/* Top Row: Tagline on Left, Navigation Columns on Right */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-6 md:gap-8 lg:gap-14 xl:gap-16">
          {/* Main Tagline Heading: font-light 300, -5 letter spacing (tracking-[-0.05em]) */}
          <div className="shrink-0 max-w-sm sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl">
            <p className="font-sans font-light font-[300] tracking-[-0.05em] text-2xl sm:text-2xl md:text-3xl lg:text-4xl 2xl:text-5xl leading-tight text-zinc-900 dark:text-zinc-100">
              Where Design Meets
              <br />
              Real Scale
            </p>
          </div>

          {/* Navigation Columns */}
          {/* Mobile View: 2x2 grid filling the void beside Company */}
          <div className="grid grid-cols-2 gap-x-6 sm:gap-x-8 gap-y-6 sm:hidden shrink-0">
            {PRIMARY_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col">
                {/* Column Heading: font-light 300, -5 letter spacing */}
                <p className="font-sans font-light font-[300] tracking-[-0.05em] text-base text-zinc-900 dark:text-zinc-100 mb-3">
                  {column.heading}
                </p>

                {/* Sub items / links */}
                <ul className="flex flex-col space-y-2 list-none m-0 p-0">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="font-sans font-light font-[300] tracking-normal text-xs leading-normal text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                          {link.title}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Mobile Only: 4th Cell beside "Company" to completely fill the gap */}
            <div className="flex flex-col">
              <p className="font-sans font-light font-[300] tracking-[-0.05em] text-base text-zinc-900 dark:text-zinc-100 mb-3">
                Terms & Contact
              </p>

              {/* Terms of Service & Contact Us stacked one below the other */}
              <div className="flex flex-col space-y-3.5">
                {/* Terms of Service & Legal */}
                <ul className="flex flex-col space-y-2 list-none m-0 p-0">
                  {LEGAL_LINKS.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="font-sans font-light font-[300] tracking-normal text-xs leading-normal text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                          {link.title}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Contact Us & Support */}
                <ul className="flex flex-col space-y-2 list-none m-0 p-0 pt-1">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="font-sans font-light font-[300] tracking-normal text-xs leading-normal text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                          {link.title}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Tablet & Desktop View: 3 columns flex-row matching bottom sub-columns */}
          <div className="hidden sm:flex flex-row items-start gap-5 sm:gap-5 md:gap-7 lg:gap-14 xl:gap-20 2xl:gap-24 shrink-0">
            {PRIMARY_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col">
                {/* Column Heading: font-light 300, -5 letter spacing */}
                <p className="font-sans font-light font-[300] tracking-[-0.05em] text-base sm:text-base md:text-lg lg:text-xl 2xl:text-2xl text-zinc-900 dark:text-zinc-100 mb-3 sm:mb-4">
                  {column.heading}
                </p>

                {/* Sub items / links: Little less size, muted text */}
                <ul className="flex flex-col space-y-2 sm:space-y-2.5 list-none m-0 p-0">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="font-sans font-light font-[300] tracking-normal text-xs sm:text-xs md:text-sm lg:text-[15px] xl:text-base leading-normal text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                          {link.title}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-Only Bottom: Logo in Col 1, Social Icons in Col 2 */}
        <div className="flex sm:hidden flex-col gap-6 pt-6">
          {/* Main big logo in Col 1, Social icons in Col 2 */}
          <div className="grid grid-cols-2 gap-6 items-center">
            <div className="relative select-none">
              <span className="block text-[11vw] font-bold tracking-tight leading-none text-zinc-950 dark:text-zinc-50 font-sans">
                Zuris<span className="text-[0.4em] font-normal align-top ml-1">®</span>
              </span>
            </div>

            {/* Social links */}
            <div className="flex items-center">
              <SocialIcons />
            </div>
          </div>

          {/* Mobile Copyright Bar: Zuris logo and text restored */}
          <div className="pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            <p className="font-sans font-light font-[300] tracking-normal text-xs text-zinc-500 dark:text-zinc-400">
              &copy; 2026 Zuris. All rights reserved.
            </p>

            {/* Small Zuris badge restored for mobile */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ZurisBlackV1 className="h-4 w-auto text-zinc-950 dark:hidden" aria-label="Zuris Logo" />
              <ZurisWhiteV1 className="h-4 w-auto text-zinc-50 hidden dark:block" aria-label="Zuris Logo" />
              <span className="font-sans font-medium text-xs text-zinc-950 dark:text-zinc-50">Zuris</span>
            </div>
          </div>
        </div>

        {/* Tablet & Desktop Bottom: Big Logo Top-Aligned with Terms of Service Line, Full-Width Divider, Copyright on Left End */}
        <div className="hidden sm:flex flex-col gap-6 sm:gap-8 pt-8 sm:pt-12">
          {/* Top section: Big Zuris Logo (aligned precisely with Terms of Service line) on Left, Two Sub-columns on Right */}
          <div className="flex sm:flex-row sm:items-start sm:justify-between gap-8 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16">
            {/* Big Brand Watermark on Left: Aligned horizontally with Terms of Service text line universally */}
            <div className="relative shrink-0 select-none">
              <span className="block text-[11vw] sm:text-[8vw] md:text-[7.5vw] lg:text-[7.8vw] xl:text-[8vw] 2xl:text-[8.5vw] font-bold tracking-tight leading-none text-zinc-950 dark:text-zinc-50 font-sans -mt-[0.14em]">
                Zuris<span className="text-[0.4em] font-normal align-top ml-1">®</span>
              </span>
            </div>

            {/* Right Area: Sub-columns for Legal & Support aligning precisely with Company navigation text */}
            <div className="flex flex-row items-start gap-5 sm:gap-5 md:gap-7 lg:gap-14 xl:gap-20 2xl:gap-24 shrink-0">
              {/* Legal sub-column: Terms of Service, Privacy Policy, Status */}
              <ul className="flex flex-col space-y-2.5 list-none m-0 p-0">
                {LEGAL_LINKS.map((link) => (
                  <li key={link.title}>
                    <a href={link.href} className="block cursor-pointer">
                      <p className="font-sans font-light font-[300] tracking-normal text-xs sm:text-xs md:text-sm lg:text-[15px] xl:text-base text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                        {link.title}
                      </p>
                    </a>
                  </li>
                ))}
              </ul>

              {/* Support & Socials sub-column: Contact Us, Report an Issue, Social Icons */}
              <div className="flex flex-col space-y-3.5">
                <ul className="flex flex-col space-y-2.5 list-none m-0 p-0">
                  {SUPPORT_LINKS.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="font-sans font-light font-[300] tracking-normal text-xs sm:text-xs md:text-sm lg:text-[15px] xl:text-base text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors">
                          {link.title}
                        </p>
                      </a>
                    </li>
                  ))}
                </ul>

                {/* Social icons: X, Instagram, LinkedIn with deliberate gap */}
                <div className="pt-4 sm:pt-5">
                  <SocialIcons />
                </div>
              </div>
            </div>
          </div>

          {/* Extended full-width line across to the left, with Copyright text moved to left end */}
          <div className="w-full pt-4 sm:pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 flex items-center justify-between gap-4">
            {/* Copyright text at the left end */}
            <p className="font-sans font-light font-[300] tracking-normal text-xs sm:text-xs md:text-sm lg:text-sm text-zinc-500 dark:text-zinc-400">
              &copy; 2026 Zuris. All rights reserved.
            </p>

            {/* Small Zuris badge at the right end */}
            <div className="flex items-center gap-1.5 shrink-0">
              <ZurisBlackV1 className="h-4 lg:h-5 w-auto text-zinc-950 dark:hidden" aria-label="Zuris Logo" />
              <ZurisWhiteV1 className="h-4 lg:h-5 w-auto text-zinc-50 hidden dark:block" aria-label="Zuris Logo" />
              <span className="font-sans font-medium text-xs lg:text-sm text-zinc-950 dark:text-zinc-50">Zuris</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

