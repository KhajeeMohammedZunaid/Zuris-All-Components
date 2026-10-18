"use client";

interface NavigationRow {
  category: string;
  links: { title: string; href: string }[];
}

const FOOTER_ROWS: NavigationRow[] = [
  {
    category: "Platform",
    links: [
      { title: "Overview", href: "#overview" },
      { title: "AI Agents", href: "#ai-agents" },
      { title: "Pipeline Generation", href: "#pipeline" },
      { title: "Forecasting", href: "#forecasting" },
      { title: "Deal Management", href: "#deals" },
    ],
  },
  {
    category: "Solutions",
    links: [
      { title: "Sales Leaders", href: "#leaders" },
      { title: "RevOps", href: "#revops" },
      { title: "Sellers", href: "#sellers" },
      { title: "Customer Success", href: "#success" },
    ],
  },
  {
    category: "Resources",
    links: [
      { title: "Blog", href: "#blog" },
      { title: "Case Studies", href: "#cases" },
      { title: "Guides", href: "#guides" },
      { title: "ROI Calculator", href: "#roi" },
    ],
  },
  {
    category: "Company",
    links: [
      { title: "About", href: "#about" },
      { title: "Careers", href: "#careers" },
      { title: "Partners", href: "#partners" },
      { title: "Contact", href: "#contact" },
    ],
  },
];

export function Footer2() {
  return (
    <footer className="relative w-full min-h-screen flex flex-col justify-end overflow-hidden bg-white dark:bg-[#09090b] text-zinc-900 dark:text-zinc-50 transition-colors duration-300">
      {/* 
        Responsive Container:
        - Scales gracefully from mobile (320px) up to 2560px & 4K displays (3840px)
        - Controlled max-width prevents over-stretching when zooming out
      */}
      <div className="relative z-10 w-full max-w-[1700px] 2xl:max-w-[2200px] 3xl:max-w-[2600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 2xl:px-28 3xl:px-36 pt-16 sm:pt-24 lg:pt-36 2xl:pt-48 flex flex-col justify-end">
        {/* Navigation Section: Responsive category rows on opposite sides with vertical dividers */}
        <div className="w-full flex flex-col space-y-4 sm:space-y-5 lg:space-y-6 2xl:space-y-8">
          {FOOTER_ROWS.map((row) => (
            <div
              key={row.category}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-6 w-full"
            >
              {/* Category Name on the Left */}
              <div className="shrink-0">
                <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-medium leading-normal tracking-normal text-zinc-900 dark:text-zinc-100">
                  {row.category}
                </p>
              </div>

              {/* Horizontal Links with Vertical Dividers on the Right */}
              <div className="flex flex-wrap items-center sm:justify-end gap-y-2">
                {row.links.map((link, index) => (
                  <div key={link.title} className="flex items-center">
                    <a href={link.href} className="block cursor-pointer">
                      <p className="text-xs sm:text-sm lg:text-base 2xl:text-lg 3xl:text-xl font-normal leading-normal tracking-normal text-zinc-700 dark:text-zinc-300">
                        {link.title}
                      </p>
                    </a>
                    {/* Responsive vertical divider line between navigation links */}
                    {index < row.links.length - 1 && (
                      <span
                        className="inline-block h-3 sm:h-3.5 2xl:h-4.5 3xl:h-5 w-px bg-zinc-300 dark:bg-zinc-700 mx-2 sm:mx-3 md:mx-4 lg:mx-5 2xl:mx-7 shrink-0"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 
          Big Website Name: "SalesForge" with Precise Vertical Fade Mask
          - Fluid clamped typography ensures perfect fit on 320px mobile up to 2560px & 4K
          - Comfortable responsive gap above (mt-14 sm:mt-20 lg:mt-24 2xl:mt-32)
          - Precise vertical fade mask dissolving to 100% transparent at the bottom
          - Two-theme compatible (Light & Dark)
        */}
        <div className="mt-14 sm:mt-20 lg:mt-24 2xl:mt-32 relative w-full flex justify-center items-end select-none pointer-events-none overflow-hidden">
          <div
            className="w-full text-center"
            style={{
              maskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 42%, rgba(0, 0, 0, 0.15) 75%, transparent 100%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0.6) 42%, rgba(0, 0, 0, 0.15) 75%, transparent 100%)",
            }}
          >
            <span className="block text-[clamp(2.2rem,12.5vw,17rem)] font-bold tracking-tighter leading-[0.8] text-zinc-950/25 dark:text-zinc-100/20 uppercase font-sans whitespace-nowrap">
              SalesForge
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
