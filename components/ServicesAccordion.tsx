"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface ServiceItem {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export const servicesData: ServiceItem[] = [
  {
    num: "01",
    title: "ARCHITECTURE",
    desc: "Expert architecture services focused on modern, sustainable, and innovative design solutions.",
    img: "/JPG/services.jpg",
  },
  {
    num: "02",
    title: "RESIDENTIAL",
    desc: "Modern homes blending comfort, functionality, and timeless minimalist architectural expression.",
    img: "/JPG/services-2.jpg",
  },
  {
    num: "03",
    title: "INTERIOR",
    desc: "Crafting atmospheric interior spaces driven by light, material logic, and human scale.",
    img: "/JPG/categories-2.jpg",
  },
  {
    num: "04",
    title: "FLOOR & LAYOUT",
    desc: "Optimizing spatial configurations for seamless flow, adaptability, and enduring utility.",
    img: "/JPG/process-1.jpg",
  },
  {
    num: "05",
    title: "LANDSCAPE",
    desc: "Integrating natural environments with architectural forms to create cohesive, organic spaces.",
    img: "/villa-redesign.jpeg",
  },
];

export interface ServicesAccordionProps {
  items?: ServiceItem[];
  defaultIndex?: number;
  className?: string;
  onItemChange?: (index: number) => void;
}

export function ServicesAccordion({
  items = servicesData,
  defaultIndex = 0,
  className,
  onItemChange,
}: ServicesAccordionProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(defaultIndex);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onItemChange?.(index);
  };

  return (
    <div
      role="tablist"
      aria-orientation="horizontal"
      className={cn(
        "w-full flex flex-col md:flex-row h-auto md:h-[550px] lg:h-[650px] border-y border-[#040404]/10 bg-white",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <div
            key={item.num || index}
            role="tab"
            tabIndex={0}
            aria-selected={isActive}
            aria-label={`${item.num} ${item.title}`}
            onClick={() => handleSelect(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(index);
              }
            }}
            className={cn(
              "group relative flex flex-col items-center border-b md:border-b-0 md:border-r border-[#040404]/10 last:border-0 cursor-pointer overflow-hidden transition-all duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20",
              isActive
                ? "w-full md:flex-grow h-[500px] md:h-full bg-white"
                : "w-full md:w-[80px] lg:w-[100px] xl:w-[120px] shrink-0 h-[70px] sm:h-[80px] md:h-full bg-[#fafafa] hover:bg-[#f4f4f4]"
            )}
          >
            {/* Collapsed State Content (Desktop) */}
            <div
              className={cn(
                "hidden md:flex h-full absolute inset-y-0 left-0 w-[80px] lg:w-[100px] xl:w-[120px] transition-opacity duration-300",
                isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-300"
              )}
            >
              {/* Container for vertical alignment, centered horizontally */}
              <div className="w-full flex-col flex items-center pt-10">
                <span className="text-sm font-bold tracking-[2px] transform rotate-90 text-[#040404]">
                  {item.num}
                </span>
              </div>

              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 uppercase font-bold tracking-[1.5px] text-[13px] lg:text-[15px] whitespace-nowrap text-[#040404] [writing-mode:vertical-rl] rotate-180"
              >
                {item.title}
              </div>
            </div>

            {/* Active State Content */}
            <div
              className={cn(
                "absolute inset-y-0 left-0 w-full min-w-full md:min-w-[600px] lg:min-w-[800px] h-full flex flex-col transition-opacity duration-500 delay-100",
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex flex-col h-full p-6 md:p-8 lg:p-12 w-full">
                {/* Desktop Number */}
                <span className="text-sm md:text-base font-bold tracking-[2px] hidden md:block mb-8 md:mb-12 text-[#040404]">
                  {item.num}
                </span>

                {/* Mobile header components */}
                <div className="md:hidden flex justify-between w-full mb-4 items-center">
                  <span className="text-sm font-bold tracking-[2px] text-[#040404]">
                    {item.num}
                  </span>
                  <span className="text-sm font-bold tracking-[1.5px] uppercase text-[#040404]">
                    {item.title}
                  </span>
                </div>

                {/* Description */}
                <div className="mb-6 md:mb-10 w-full md:max-w-xl">
                  <p className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-[#040404] font-bold leading-[1.4] md:leading-[1.4]">
                    {item.desc}
                  </p>
                </div>

                {/* Image */}
                <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[640px] h-[260px] sm:h-[320px] md:h-[320px] lg:h-[400px] overflow-hidden relative mt-auto border border-black/5">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                    priority={index === 0}
                    unoptimized
                    className="object-cover transition-transform duration-[1200ms] scale-[1.05] group-hover:scale-100"
                  />
                </div>
              </div>
            </div>

            {/* Mobile Collapsed State */}
            <div
              className={cn(
                "md:hidden absolute inset-0 flex items-center justify-between w-full h-full px-6 transition-opacity duration-300",
                isActive ? "opacity-0 pointer-events-none" : "opacity-100"
              )}
            >
              <span className="text-sm font-bold tracking-[2px] text-[#040404]">
                {item.num}
              </span>
              <span className="text-sm font-bold uppercase tracking-[1.5px] text-[#040404]">
                {item.title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ServicesAccordion;
