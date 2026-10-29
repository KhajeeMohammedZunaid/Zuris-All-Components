"use client";

import Image from "next/image";
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1";
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1";

interface FooterLinkItem {
  title: string;
  href: string;
}

interface FooterColumn {
  heading: string;
  links: FooterLinkItem[];
}

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: "Product",
    links: [
      { title: "Pricing", href: "#pricing" },
      { title: "Live demo", href: "#demo" },
      { title: "All features", href: "#features" },
      { title: "Changelog", href: "#changelog" },
      { title: "Wallpapers", href: "#wallpapers" },
    ],
  },
  {
    heading: "Docs",
    links: [
      { title: "Get started", href: "#get-started" },
      { title: "Add the tracker", href: "#tracker" },
      { title: "Install guides", href: "#install" },
      { title: "CLI and MCP", href: "#cli" },
      { title: "Import your data", href: "#import" },
    ],
  },
  {
    heading: "Support",
    links: [
      { title: "Contact", href: "#contact" },
      { title: "FAQ", href: "#faq" },
      { title: "Charges", href: "#charges" },
      { title: "Billing and usage", href: "#billing" },
    ],
  },
  {
    heading: "Legal",
    links: [
      { title: "Privacy", href: "#privacy" },
      { title: "Terms", href: "#terms" },
      { title: "GDPR", href: "#gdpr" },
      { title: "DPA", href: "#dpa" },
    ],
  },
  {
    heading: "Resources",
    links: [
      { title: "Showcase", href: "#showcase" },
      { title: "Guides", href: "#guides" },
      { title: "Library", href: "#library" },
      { title: "Systems", href: "#systems" },
    ],
  },
];

export function Footer1() {
  return (
    <footer className="relative w-full min-h-screen flex flex-col justify-between overflow-hidden bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* 
        Background Landscape Layer (Opposite layout: image anchored on the RIGHT side).
        Mask Geometry:
        - Diagonal from bottom-left to top-right (angle 135deg).
        - On the left side of diagonal: mask is transparent, filled like a simple solid rectangle 
          shape with the background surface (bg-white / bg-[#09090b]).
        - On the right side of diagonal: scenic landscape painting (f-bg1.png) is revealed.
        - Scales seamlessly on 4K, ultra-wide zoom-outs, laptops, tablets, and phones.
      */}
      {/* 
        Unified Scenic Landscape Background Layer (Anchored to the RIGHT & BOTTOM):
        - Single efficient Image instance (no duplicate DOM nodes or redundant fetches).
        - Proper top-to-middle mask: 
          Transparent across the top, smoothly transitioning into full visibility at the middle-to-bottom.
        - Dual theme-aware overlays:
          1. Top-to-middle fade (h-[52%]): Pure white in Light mode, pure #09090b in Dark mode.
             Guarantees the logo and navigation text sit on a 100% clean, neat, and razor-sharp surface.
          2. Left-side gradient: Softens the left logo area so the landscape naturally anchors on the right.
      */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 16%, rgba(0, 0, 0, 0.35) 34%, black 54%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, transparent 16%, rgba(0, 0, 0, 0.35) 34%, black 54%)",
        }}
        aria-hidden="true"
      >
        <Image
          src="/f-bg1.png"
          alt="Scenic landscape background"
          fill
          loading="lazy"
          sizes="100vw"
          style={{
            objectFit: "cover",
            objectPosition: "center bottom",
          }}
          className="object-cover object-bottom select-none dark:brightness-[0.78] dark:contrast-[1.1] dark:saturate-[0.95]"
        />

        {/* Top-to-middle solid fade overlay for BOTH White mode & Dark mode */}
        <div className="absolute inset-x-0 top-0 h-[52%] bg-gradient-to-b from-white via-white/85 to-transparent dark:from-[#09090b] dark:via-[#09090b]/85 dark:to-transparent" />
      </div>

      {/* 
        Content Layer: Elevated above the mask (z-10 relative).
        Responsive & 4K Zoom-Out Architecture:
        - max-w-[1800px] 2xl:max-w-[2400px] 3xl:max-w-[2800px] mx-auto prevents elements from scattering infinitely on 4K.
        - Responsive logo scaling (h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-14).
        - Responsive gaps (gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-12 xl:gap-x-16 2xl:gap-x-20).
        - Resources section reduced to crisp single small words.
        - Typography: <p> text-sm 2xl:text-base, leading-normal, default tracking 0.0%, muted links with NO hover animations.
        - Bottom bar: bold lil (font-medium), NOT muted.
      */}
      <div className="relative z-10 w-full max-w-[1800px] 2xl:max-w-[2400px] 3xl:max-w-[2800px] mx-auto px-6 sm:px-10 md:px-12 lg:pl-16 lg:pr-10 xl:px-20 2xl:px-28 pt-12 sm:pt-16 lg:pt-20 2xl:pt-28 pb-8 sm:pb-12 2xl:pb-16 flex-1 flex flex-col justify-between">
        {/* Upper Area: Responsive Logo on the Left, Navigation Columns on the Right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 sm:gap-12 lg:gap-16 xl:gap-20">
          {/* Responsive Logo on the left */}
          <div className="shrink-0">
            <a href="#" className="inline-block" aria-label="Zuris Home">
              <ZurisBlackV1 className="h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-14 w-auto text-zinc-950 dark:hidden" />
              <ZurisWhiteV1 className="h-7 sm:h-8 md:h-9 lg:h-10 xl:h-11 2xl:h-14 w-auto text-zinc-50 hidden dark:block" />
            </a>
          </div>

          {/* Navigation Columns moved slightly right on 1024px laptop with balanced gaps */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-x-6 sm:gap-x-8 md:gap-x-10 lg:gap-x-14 xl:gap-x-16 2xl:gap-x-20 gap-y-8 lg:gap-y-0 shrink-0 lg:ml-auto lg:mr-0 xl:mr-4 2xl:mr-8">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.heading} className="flex flex-col min-w-0">
                {/* Column Heading: <p> text-sm 2xl:text-base leading-normal tracking-normal */}
                <p className="text-sm 2xl:text-base font-medium leading-normal tracking-normal text-zinc-900 dark:text-zinc-100 mb-3 sm:mb-3.5 2xl:mb-4">
                  {column.heading}
                </p>

                {/* Sub items / links: <p> text-sm 2xl:text-base leading-normal tracking-normal muted no hover animations */}
                <ul className="flex flex-col space-y-2.5 sm:space-y-3 2xl:space-y-3.5 m-0 p-0 list-none">
                  {column.links.map((link) => (
                    <li key={link.title}>
                      <a href={link.href} className="block cursor-pointer">
                        <p className="text-sm 2xl:text-base font-normal leading-normal tracking-normal text-zinc-700 dark:text-zinc-300">
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

        {/* Bottom Bar: Copyright (Bold lil, white text over meadow) */}
        <div className="mt-auto pt-12 sm:pt-16 2xl:pt-24 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <p className="text-sm 2xl:text-base font-medium leading-normal tracking-normal text-white">
            &copy; 2026 Zuris. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
