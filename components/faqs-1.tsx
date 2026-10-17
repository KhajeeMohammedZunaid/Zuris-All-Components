"use client";

import * as React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export interface Faqs1Props {
  className?: string;
  headlineFirstLine?: string;
  headlineSecondLine?: string;
  items?: FaqItem[];
}

export const defaultFaqItems: FaqItem[] = [
  {
    id: "faq-1",
    question: "How do AI agents make autonomous decisions?",
    answer:
      "Agents execute multi-step workflows using live tool access, deterministic validation loops, and confidence thresholds before taking actions.",
  },
  {
    id: "faq-2",
    question: "Can I set custom permissions and spending limits for each agent?",
    answer:
      "Yes. You can define granular role-based access control (RBAC), API rate limits, tool allowlists, and hard monthly budget ceilings for every agent.",
  },
  {
    id: "faq-3",
    question: "How do agents handle edge cases or unexpected API failures?",
    answer:
      "Agents run automated retry routines with alternate tool fallbacks. If uncertainty remains high, the agent halts and requests one-click human verification.",
  },
  {
    id: "faq-4",
    question: "Which tools and data sources can the agents connect to?",
    answer:
      "Agents connect with over 120 enterprise platforms including Salesforce, HubSpot, Snowflake, PostgreSQL, GitHub, Slack, and any custom API via OpenAPI or MCP.",
  },
  {
    id: "faq-5",
    question: "Is our proprietary company data used to train public models?",
    answer:
      "No. Strict zero-data retention agreements ensure your prompts, database records, and agent execution states are never stored or used for model training.",
  },
];

export function Faqs1({
  className,
  headlineFirstLine = "Do you",
  headlineSecondLine = "Know",
  items = defaultFaqItems,
}: Faqs1Props) {
  return (
    <section
      className={cn(
        "w-full py-16 sm:py-20 lg:py-24 bg-transparent text-zinc-950 dark:text-zinc-50 transition-colors duration-300",
        className
      )}
      aria-labelledby="faq-main-heading"
    >
      <div className="w-full max-w-[1320px] 4k:max-w-[1720px] mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 xl:gap-24 items-start">
          
          {/* ========================================================
              LEFT COLUMN: "Do you" in one line, "Know" in the other
              ======================================================== */}
          <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-28 flex flex-col items-start">
            <h2
              id="faq-main-heading"
              className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-zinc-950 dark:text-zinc-50 leading-[1.06]"
            >
              <span className="block">{headlineFirstLine}</span>
              <span className="block">{headlineSecondLine}</span>
            </h2>
          </div>

          {/* ========================================================
              RIGHT COLUMN: 5 Accordion Questions (No Categories)
              ======================================================== */}
          <div className="lg:col-span-7 xl:col-span-8 flex flex-col w-full">
            <Accordion
              multiple
              defaultValue={["faq-1"]}
              className="w-full border-none rounded-none shadow-none divide-none bg-transparent"
            >
              {items.map((item) => (
                <AccordionItem
                  key={item.id}
                  value={item.id}
                  className="border-b border-zinc-200 dark:border-zinc-800/80 data-open:bg-transparent py-0.5 transition-none hover:bg-transparent"
                >
                  <AccordionTrigger className="text-base sm:text-[1.05rem] font-medium text-zinc-900 dark:text-zinc-100 hover:text-zinc-900 dark:hover:text-zinc-100 hover:opacity-100 py-4 sm:py-4.5 px-0 text-left flex items-center justify-between cursor-pointer transition-none select-none">
                    <span className="pr-4">{item.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-sm sm:text-[0.95rem] text-zinc-600 dark:text-zinc-400 leading-relaxed pt-0 pb-5 pr-6 font-normal">
                    <p>{item.answer}</p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Faqs1;
