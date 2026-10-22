"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { ServicesAccordion, ServiceItem, servicesData } from "./ServicesAccordion";

export interface ServicesSectionProps {
  eyebrowNumber?: string;
  eyebrowText?: string;
  heading?: React.ReactNode;
  items?: ServiceItem[];
  className?: string;
}

export function ServicesSection({
  eyebrowNumber = "03",
  eyebrowText = "SERVICES",
  heading = (
    <>
      WE OFFER WIDE RANGE
      <br /> OF SERVICES
    </>
  ),
  items = servicesData,
  className,
}: ServicesSectionProps) {
  return (
    <section
      className={cn(
        "bg-white text-[#040404] py-20 md:py-32 flex flex-col justify-center select-none relative z-10 w-full overflow-hidden -mt-px",
        className
      )}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12 mb-16 md:mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10 w-full items-start">
          <div className="lg:col-span-5 flex items-center gap-4 pt-1 md:pt-4">
            <span className="text-[#040404] text-xs sm:text-sm font-bold tracking-[0.25em] font-sans">
              {eyebrowNumber}
            </span>
            <div className="w-10 md:w-16 h-[1.5px] bg-[#040404]" />
            <span className="text-[#040404] text-xs sm:text-sm font-bold tracking-[4.5px] uppercase">
              {eyebrowText}
            </span>
          </div>

          <div className="lg:col-span-7 flex flex-col mt-4 lg:mt-0">
            <h2 className="text-[#040404] text-[24px] sm:text-[28px] md:text-[34px] lg:text-[42px] xl:text-[46px] font-bold tracking-[-0.045em] leading-[1.05] uppercase text-left">
              {heading}
            </h2>
          </div>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="max-w-7xl mx-auto w-full px-6 md:px-12">
        <ServicesAccordion items={items} />
      </div>
    </section>
  );
}

export default ServicesSection;
