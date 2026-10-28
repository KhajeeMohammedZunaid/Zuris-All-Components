"use client";

import * as React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

export interface CloudServiceItem {
  num: string;
  title: string;
  desc: string;
  img: string;
}

export const cloudServicesData: CloudServiceItem[] = [
  {
    num: "01",
    title: "CLOUD COMPUTE",
    desc: "Elastic serverless compute engines architected for high-concurrency workloads and instantaneous auto-scaling.",
    img: "/acc-1.webp",
  },
  {
    num: "02",
    title: "EDGE NETWORK",
    desc: "Global low-latency edge distribution with automated caching, dynamic routing, and DDoS mitigation.",
    img: "/acc-2.webp",
  },
  {
    num: "03",
    title: "OBJECT STORAGE",
    desc: "Highly resilient multi-region cloud object storage optimized for real-time asset delivery and petabyte-scale throughput.",
    img: "/acc-3.webp",
  },
  {
    num: "04",
    title: "DATA & TELEMETRY",
    desc: "Managed distributed data streaming and query engines delivering sub-second insights across real-time pipelines.",
    img: "/acc-4.webp",
  },
  {
    num: "05",
    title: "SECURITY & IAM",
    desc: "Zero-trust identity governance, end-to-end cryptographic key management, and continuous compliance enforcement.",
    img: "/acc-5.webp",
  },
];

export interface Sections3AccordionProps {
  items?: CloudServiceItem[];
  defaultIndex?: number;
  className?: string;
  onItemChange?: (index: number) => void;
}

export function Sections3Accordion({
  items = cloudServicesData,
  defaultIndex = 0,
  className,
  onItemChange,
}: Sections3AccordionProps) {
  const [activeIndex, setActiveIndex] = React.useState<number>(-1);
  const [hasOpened, setHasOpened] = React.useState<boolean>(false);
  const itemRefs = React.useRef<(HTMLDivElement | null)[]>([]);

  const triggerInitialOpen = React.useCallback(() => {
    if (!hasOpened) {
      setHasOpened(true);
      setActiveIndex(defaultIndex);
    }
  }, [hasOpened, defaultIndex]);

  React.useEffect(() => {
    // Smooth fallback so panel 0 reliably opens even if viewport callbacks are delayed
    const timer = setTimeout(() => {
      triggerInitialOpen();
    }, 500);
    return () => clearTimeout(timer);
  }, [triggerInitialOpen]);

  const handleSelect = (index: number) => {
    setActiveIndex(index);
    onItemChange?.(index);

    // On mobile devices, smoothly align the opened accordion item into comfortable view
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setTimeout(() => {
        const el = itemRefs.current[index];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top < 65 || rect.bottom > window.innerHeight) {
            el.scrollIntoView({ behavior: "smooth", block: "nearest" });
          }
        }
      }, 100);
    }
  };

  return (
    <motion.div
      role="tablist"
      aria-orientation="horizontal"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      onViewportEnter={() => {
        setTimeout(() => {
          triggerInitialOpen();
        }, 260);
      }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.12,
            delayChildren: 0.15,
          },
        },
      }}
      className={cn(
        "w-full flex flex-col md:flex-row h-auto md:h-[550px] lg:h-[650px] border-y border-[#040404]/10 bg-white",
        className
      )}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;

        return (
          <motion.div
            key={item.num || index}
            ref={(node) => {
              itemRefs.current[index] = node;
            }}
            role="tab"
            tabIndex={0}
            aria-selected={isActive}
            aria-label={`${item.num} ${item.title}`}
            onClick={() => !isActive && handleSelect(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                !isActive && handleSelect(index);
              }
            }}
            variants={{
              hidden: { opacity: 0, y: 32 },
              visible: {
                opacity: 1,
                y: 0,
                transition: {
                  duration: 1.15,
                  ease: [0.16, 1, 0.3, 1],
                },
              },
            }}
            className={cn(
              "group relative flex flex-col items-center border-b md:border-b-0 md:border-r border-[#040404]/10 last:border-0 overflow-hidden transition-[width,height,flex-grow,background-color] duration-500 md:duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/20 will-change-[width,height,flex-grow] [transform:translateZ(0)]",
              isActive
                ? "cursor-default w-full md:flex-grow h-[410px] xs:h-[430px] sm:h-[450px] md:h-full bg-white select-auto"
                : "cursor-pointer w-full md:w-[80px] lg:w-[100px] xl:w-[120px] h-[64px] sm:h-[70px] md:h-full bg-[#fafafa] hover:bg-[#f4f4f4]"
            )}
          >
            {/* =========================================================================
                MOBILE VIEW (< md): Single Header Bar (Zero Title Mixing) + Smooth Revealing Content
                ========================================================================= */}
            <div className="md:hidden flex flex-col w-full h-full overflow-hidden">
              {/* Mobile Single Header: Always at top of card, never mixes or duplicates */}
              <div className="flex items-center justify-between w-full h-[64px] sm:h-[70px] px-5 sm:px-6 shrink-0 select-none z-20 cursor-pointer">
                <span className="text-sm font-bold tracking-[2px] text-[#040404]">
                  {item.num}
                </span>
                <span className="text-sm font-['Inter',sans-serif] font-semibold tracking-[-0.04em] uppercase text-[#040404]">
                  {item.title}
                </span>
              </div>

              {/* Mobile Expandable Content (Desc + Image): Smoothly reveals below header */}
              <div
                className={cn(
                  "flex flex-col w-full px-5 sm:px-6 pb-5 flex-1 overflow-hidden transition-all duration-300",
                  isActive
                    ? "opacity-100 delay-150 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                )}
              >
                {/* Service Heading */}
                <div className="mb-3 w-full">
                  <h3 className="text-[14px] xs:text-[15px] sm:text-[16px] text-[#040404] font-['Inter',sans-serif] font-[500] tracking-[-0.045em] [word-spacing:normal] leading-[1.38]">
                    {item.desc}
                  </h3>
                </div>

                {/* Image */}
                <div className="w-full h-[220px] xs:h-[235px] sm:h-[250px] overflow-hidden relative mt-auto border border-black/5 [transform:translateZ(0)] [contain:paint]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 640px"
                    priority={index === 0}
                    className="absolute inset-0 w-full h-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
                  />
                </div>
              </div>
            </div>

            {/* =========================================================================
                DESKTOP VIEW (>= md): Cinematic Horizontal Stretch (Unchanged)
                ========================================================================= */}
            {/* Collapsed State Content (Desktop) - Smooth delayed entrance on close */}
            <div
              className={cn(
                "hidden md:flex h-full absolute inset-y-0 left-0 w-[80px] lg:w-[100px] xl:w-[120px] transition-opacity duration-500",
                isActive ? "opacity-0 pointer-events-none" : "opacity-100 delay-400"
              )}
            >
              {/* Container for vertical number alignment, centered horizontally */}
              <div className="w-full flex-col flex items-center pt-10">
                <span className="text-sm font-bold tracking-[2px] transform rotate-90 text-[#040404]">
                  {item.num}
                </span>
              </div>

              {/* Vertical Title: Smooth CSS writing-mode without text clipping */}
              <div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 uppercase font-['Inter',sans-serif] font-semibold tracking-[-0.04em] text-[13px] lg:text-[15px] whitespace-nowrap text-[#040404]"
                style={{
                  writingMode: "vertical-rl",
                  transform: "rotate(180deg)",
                }}
              >
                {item.title}
              </div>
            </div>

            {/* Active State Content (Desktop) - Fixed min-width prevents text squishing while closing */}
            <div
              className={cn(
                "hidden md:flex absolute inset-y-0 left-0 w-full min-w-full md:min-w-[600px] lg:min-w-[800px] h-full flex-col cursor-default transition-opacity duration-700 delay-200",
                isActive ? "opacity-100" : "opacity-0 pointer-events-none"
              )}
            >
              <div className="flex flex-col h-full p-6 md:p-8 lg:p-12 w-full cursor-default">
                {/* Desktop Number */}
                <span className="text-sm md:text-base font-bold tracking-[2px] hidden md:block relative -top-2 lg:-top-3.5 mb-6 md:mb-9 text-[#040404]">
                  {item.num}
                </span>

                {/* Service Heading: H3, 500 weight, Inter font, -4.5% tracking, normal word spacing */}
                <div className="mb-6 md:mb-10 w-full md:max-w-xl">
                  <h3 className="text-[15px] sm:text-[16px] md:text-[20px] lg:text-[24px] text-[#040404] font-['Inter',sans-serif] font-[500] tracking-[-0.045em] [word-spacing:normal] leading-[1.4] md:leading-[1.4]">
                    {item.desc}
                  </h3>
                </div>

                {/* Image: Restored original height and proportions, static without hover scale */}
                <div className="w-full max-w-[400px] sm:max-w-[500px] md:max-w-[520px] lg:max-w-[640px] h-[260px] sm:h-[320px] md:h-[320px] lg:h-[400px] overflow-hidden relative mt-auto border border-black/5 [transform:translateZ(0)] [contain:paint]">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 640px"
                    priority={index === 0}
                    className="absolute inset-0 w-full h-full object-cover [transform:translateZ(0)] [backface-visibility:hidden]"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

export interface Sections3Props {
  eyebrowNumber?: string;
  eyebrowText?: string;
  heading?: React.ReactNode;
  items?: CloudServiceItem[];
  className?: string;
}

export function Sections3({
  eyebrowNumber = "03",
  eyebrowText = "CLOUD SERVICES",
  heading = (
    <>
      WE OFFER WIDE RANGE
      <br /> OF CLOUD SERVICES
    </>
  ),
  items = cloudServicesData,
  className,
}: Sections3Props) {
  return (
    <section
      className={cn(
        "bg-white text-[#040404] py-16 md:py-24 flex flex-col justify-center select-none relative z-10 w-full overflow-hidden -mt-px",
        className
      )}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-12 md:mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 w-full items-start">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex items-center gap-3.5 pt-1 md:pt-4"
          >
            <span className="text-[#040404] text-xs sm:text-sm font-bold tracking-[0.25em] font-sans">
              {eyebrowNumber}
            </span>
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ originX: 0 }}
              className="w-10 md:w-16 h-[1.5px] bg-[#040404]"
            />
            <span className="text-[#040404] text-xs sm:text-sm font-bold tracking-[1.5px] uppercase">
              {eyebrowText}
            </span>
          </motion.div>

          {/* Main Heading: H2, 500 weight, Inter, -4.5% tracking, normal word spacing, aligned to the right edge */}
          <div className="lg:col-span-7 flex flex-col items-start lg:items-end mt-4 lg:mt-0 overflow-hidden">
            <motion.h2
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1.2, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="text-[#040404] text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] xl:text-[46px] font-['Inter',sans-serif] font-[500] tracking-[-0.045em] [word-spacing:normal] leading-[1.05] uppercase text-left lg:text-right"
            >
              {heading}
            </motion.h2>
          </div>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <Sections3Accordion items={items} />
      </div>
    </section>
  );
}

export { Sections3 as Section3 };
export default Sections3;

