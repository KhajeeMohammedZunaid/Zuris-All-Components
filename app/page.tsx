"use client";

import * as React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

interface PageRoute {
  category: string;
  items: { name: string; href: string; description?: string }[];
}

const DIRECTORY_ROUTES: PageRoute[] = [
  {
    category: "Hero Sections",
    items: [
      { name: "Hero 1 (Nexura)", href: "/hero-1", description: "Full canvas hero with interactive badge pins & typewriter prompt" },
      { name: "Hero 2 (Zuris CMS)", href: "/hero-2", description: "Zero-roundedness architectural grid hero with Plus Jakarta Sans & CMS SaaS workspace" },
      { name: "Hero 3", href: "/hero-3", description: "Minimalist fintech hero with Plus Jakarta Sans, marquee brand logos & dual image slots" },
      { name: "Hero 4 (MindCloud)", href: "/hero-4", description: "Curved canvas gradient hero with Inter typography & automation prompt" },
    ],
  },
  {
    category: "Footer Sections",
    items: [
      { name: "Footer 1", href: "/footer-1", description: "Modern multi-column minimalist footer" },
      { name: "Footer 2", href: "/footer-2", description: "Full-bleed category row footer with responsive dividers" },
      { name: "Footer 3", href: "/footer-3", description: "Compact centered 1/3-page brand footer" },
      { name: "Footer 4", href: "/footer-4", description: "Half-page high-contrast architectural brand footer" },
      { name: "Footer 5", href: "/footer-5", description: "Dashed grid brand footer for AI agents, MCP tools & documentation" },
    ],
  },
  {
    category: "Feature & Section Components",
    items: [
      { name: "Features 1", href: "/features-1", description: "Feature grid showcase" },
      { name: "Sections 1", href: "/sections-1", description: "Interactive product studio showcase" },
      { name: "Sections 2", href: "/sections-2", description: "Trio card showcase with image-bg-2, floating UI widgets & logo tiles" },
      { name: "Sections 3", href: "/sections-3", description: "Cloud & SaaS showcase with expanding horizontal accordion" },
      { name: "Testimonials 1", href: "/testimonials", description: "Linear-style dual testimonial cards with hanging quotes & logo watermarks" },
      { name: "FAQs 1", href: "/faqs-1", description: "Accordion FAQ layout" },
    ],
  },
  {
    category: "Interactive & UI Demos",
    items: [
      { name: "Arc Cards", href: "/arc-cards", description: "Arc card carousel interactive component" },
      { name: "Arc Embla Carousel", href: "/arc-carousel", description: "Embla & torph TextMorph travel carousel in Arc and Single-Card versions" },
      { name: "Shader 1", href: "/shader-1", description: "WebGL shader visual canvas" },
      { name: "Typography", href: "/typo", description: "Display and body typography specimens" },
      { name: "Typography Lab", href: "/typography-lab", description: "Interactive custom typography preset studio & live tag playground" },
    ],
  },
];

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <div className="w-full min-h-screen bg-white dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-sans transition-colors duration-200">
      <main className="max-w-4xl mx-auto px-6 py-12 sm:py-16 md:py-20 flex flex-col gap-12">
        {/* Header & Theme Switcher */}
        <header className="flex flex-row items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Component Library
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
              Select a component page below to preview.
            </p>
          </div>

          {/* Theme Switcher in plain text */}
          <button
            type="button"
            onClick={toggleTheme}
            className="text-sm font-medium px-3.5 py-1.5 rounded-md border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer transition-colors"
            aria-label="Toggle theme"
          >
            {mounted ? (resolvedTheme === "dark" ? "☀ Light Mode" : "🌙 Dark Mode") : "Theme"}
          </button>
        </header>

        {/* Directory Navigation in Plain Text */}
        <nav aria-label="Component directory" className="flex flex-col gap-10">
          {DIRECTORY_ROUTES.map((section) => (
            <div key={section.category} className="flex flex-col gap-3">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {section.category}
              </h2>
              <ul className="flex flex-col divide-y divide-zinc-100 dark:divide-zinc-900 list-none m-0 p-0 border border-zinc-200 dark:border-zinc-800/80 rounded-lg overflow-hidden bg-zinc-50/50 dark:bg-zinc-950/40">
                {section.items.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="group flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-4 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-900/80 transition-colors"
                    >
                      <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                      {item.description && (
                        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                          {item.description}
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </main>
    </div>
  );
}
