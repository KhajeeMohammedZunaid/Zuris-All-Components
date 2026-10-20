import * as React from "react"
import Link from "next/link"
import { HugeiconsIcon } from "@hugeicons/react"
import {
  NewTwitterIcon,
  GithubIcon,
  DiscordIcon,
  YoutubeIcon,
} from "@hugeicons/core-free-icons"
import { ZurisBlackV1 } from "@/components/ui/zuris-black-v1"
import { ZurisWhiteV1 } from "@/components/ui/zuris-white-v1"

const CURRENT_YEAR = new Date().getFullYear()

export interface Footer5Props {
  className?: string
}

export function Footer5({ className }: Footer5Props) {
  const sections = {
    agents: {
      title: "AI Agents",
      items: [
        { label: "Coding", href: "#" },
        { label: "Workflows", href: "#" },
        { label: "Models", href: "#" },
        { label: "Reasoning", href: "#" },
        { label: "Sandbox", href: "#" },
        { label: "Prompts", href: "#" },
      ],
    },
    mcpTools: {
      title: "MCP Tools",
      items: [
        { label: "MCP Server", href: "#" },
        { label: "Tool Store", href: "#" },
        { label: "CLI Tool", href: "#" },
        { label: "IDE Plugin", href: "#" },
        { label: "Connectors", href: "#" },
        { label: "Terminal", href: "#" },
      ],
    },
    docs: {
      title: "Docs",
      items: [
        { label: "Quickstart", href: "#" },
        { label: "Guides", href: "#" },
        { label: "API Docs", href: "#" },
        { label: "SDKs", href: "#" },
        { label: "Examples", href: "#" },
        { label: "Changelog", href: "#" },
      ],
    },
    community: {
      title: "Community",
      items: [
        { label: "GitHub", href: "https://github.com/zuris-ai", external: true },
        { label: "Discord", href: "https://discord.gg/zuris", external: true },
        { label: "Status", href: "#", external: true },
        { label: "Support", href: "#" },
        { label: "Privacy", href: "#" },
        { label: "Terms", href: "#" },
      ],
    },
  }

  const socialLinks = [
    { icon: NewTwitterIcon, href: "https://x.com/zuris_ai", label: "X (Twitter)" },
    { icon: GithubIcon, href: "https://github.com/zuris-ai", label: "GitHub" },
    { icon: DiscordIcon, href: "https://discord.gg/zuris", label: "Discord" },
    { icon: YoutubeIcon, href: "https://youtube.com/@zuris_ai", label: "YouTube" },
  ]

  return (
    <div className={`w-full overflow-hidden bg-[#fafafa] dark:bg-[#09090b] text-zinc-950 dark:text-zinc-50 font-sans px-4 sm:px-6 lg:px-8 xl:px-0 transition-colors duration-300 ${className || ""}`}>
      <footer
        id="footer"
        className="relative mx-auto flex flex-col max-w-6xl pt-2 pb-8 sm:pb-10"
      >
        {/* Vertical Dashed Border Lines */}
        <div className="pointer-events-none inset-0">
          {/* Left */}
          <div
            className="absolute top-[-2rem] bottom-0 left-0 w-px"
            style={{
              maskImage: "linear-gradient(transparent, white 3rem)",
            }}
          >
            <svg className="h-full w-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>

          {/* Right */}
          <div
            className="absolute top-[-2rem] bottom-0 right-0 w-px"
            style={{
              maskImage: "linear-gradient(transparent, white 3rem)",
            }}
          >
            <svg className="h-full w-full" preserveAspectRatio="none">
              <line
                x1="0"
                y1="0"
                x2="0"
                y2="100%"
                className="stroke-zinc-200 dark:stroke-zinc-800"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
            </svg>
          </div>
        </div>

        {/* Compact Diagonal Footer Pattern Stripe */}
        <svg
          className="mb-8 h-12 w-full border-y border-dashed border-zinc-200 dark:border-zinc-800 text-zinc-200 dark:text-zinc-800/80"
        >
          <defs>
            <pattern
              id="diagonal-footer-pattern-5"
              patternUnits="userSpaceOnUse"
              width="64"
              height="64"
            >
              {Array.from({ length: 17 }, (_, i) => {
                const offset = i * 8
                return (
                  <path
                    key={i}
                    d={`M${-106 + offset} 110L${22 + offset} -18`}
                    stroke="currentColor"
                    strokeWidth="1"
                  />
                )
              })}
            </pattern>
          </defs>
          <rect
            stroke="none"
            width="100%"
            height="100%"
            fill="url(#diagonal-footer-pattern-5)"
          />
        </svg>

        {/* Content Container: Analogous left and right gaps with side-by-side layout from md (768px+) */}
        <div className="w-full px-6 sm:px-8 md:px-10 lg:px-12 flex flex-col md:flex-row md:justify-between items-start gap-8 md:gap-10 lg:gap-14">
          {/* Brand Column (Left Side): Zuris logo at top, socials & copyright at bottom on tablet & desktop */}
          <div className="flex flex-col md:w-44 lg:w-52 shrink-0 md:self-stretch justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 font-medium select-none"
            >
              <ZurisBlackV1 className="h-6 w-auto text-zinc-950 dark:hidden" aria-label="Zuris Logo" />
              <ZurisWhiteV1 className="h-6 w-auto text-zinc-50 hidden dark:block" aria-label="Zuris Logo" />
              <span className="font-sans font-bold text-lg tracking-tight text-zinc-950 dark:text-zinc-50">
                Zuris
              </span>
              <span className="sr-only">Zuris Logo (go home)</span>
            </Link>

            {/* Desktop & Tablet Socials: Anchored to the bottom-left under the logo (no top-right clash) */}
            <div className="hidden md:flex flex-col items-start md:mt-auto pt-6">
              <div className="flex items-center gap-1">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="rounded-lg p-1.5 text-zinc-500 dark:text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50"
                  >
                    <HugeiconsIcon icon={social.icon} size={18} />
                  </Link>
                ))}
              </div>
              <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
                &copy; {CURRENT_YEAR} Zuris, Inc.
              </div>
            </div>
          </div>

          {/* Footer Navigation Columns: Shifted right with md:ml-auto to cover extra space and match left/right gaps */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 md:gap-8 lg:gap-12 xl:gap-16 w-full md:w-auto md:ml-auto">
            {Object.entries(sections).map(([key, section]) => (
              <div key={key} className="font-sans min-w-0 sm:min-w-[90px] md:min-w-[100px] lg:min-w-[110px]">
                <h3 className="mb-3.5 font-semibold text-zinc-950 dark:text-zinc-100 text-sm tracking-tight font-sans">
                  {section.title}
                </h3>
                <ul className="space-y-2.5">
                  {section.items.map((item) => (
                    <li key={item.label} className="text-sm">
                      <Link
                        href={item.href}
                        className="text-zinc-600 dark:text-zinc-400 transition-colors duration-200 hover:text-zinc-950 dark:hover:text-zinc-100 font-sans"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            </div>

          {/* Mobile-only Socials & Copyright: Neatly pinned below navigation on screens < 768px */}
          <div className="flex md:hidden flex-col items-start pt-6 border-t border-dashed border-zinc-200 dark:border-zinc-800 w-full">
            <div className="flex items-center gap-1">
              {socialLinks.map((social) => (
                <Link
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="rounded-lg p-1.5 text-zinc-500 dark:text-zinc-400 transition-colors duration-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-950 dark:hover:text-zinc-50"
                >
                  <HugeiconsIcon icon={social.icon} size={18} />
                </Link>
              ))}
            </div>
            <div className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 font-sans">
              &copy; {CURRENT_YEAR} Zuris, Inc.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer5
