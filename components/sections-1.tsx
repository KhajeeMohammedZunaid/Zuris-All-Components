"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface Sections1Props {
  className?: string;
  showThemeBar?: boolean;
}

export function Sections1({ className, showThemeBar = false }: Sections1Props) {
  const [animKey, setAnimKey] = React.useState(0);

  const replayAnimation = () => {
    setAnimKey((prev) => prev + 1);
  };

  return (
    <div
      className={cn(
        "sections-1-root w-full bg-[var(--bg)] text-[var(--text-main)] font-body antialiased transition-[background-color,color] duration-300 ease-in-out",
        className
      )}
    >
      <style>{`
        .sections-1-root {
          --bg: #fafafa;
          --card-bg: #ececee;
          --card-bg-subtle: #f4f4f6;
          --text-main: #09090b;
          --text-muted: #27272a;
          --text-light: #52525b;
          --border-main: #09090b;
          --border-subtle: rgba(0, 0, 0, 0.1);
          --corner-btn-bg: #09090b;
          --corner-btn-text: #fafafa;
          --pill-white-bg: #ffffff;
          --pill-white-text: #09090b;
          --pill-contrast-bg: #09090b;
          --pill-contrast-text: #fafafa;
          --pill-highlight-bg: #09090b;
          --pill-highlight-text: #fafafa;
          --client-card-bg: #ffffff;
          --client-card-text: #09090b;
        }

        :is(.dark .sections-1-root),
        :is([data-theme="dark"] .sections-1-root),
        .sections-1-root:is(.dark, [data-theme="dark"]) {
          --bg: #09090b;
          --card-bg: #18181b;
          --card-bg-subtle: #141416;
          --text-main: #fafafa;
          --text-muted: #e4e4e7;
          --text-light: #a1a1aa;
          --border-main: #fafafa;
          --border-subtle: rgba(255, 255, 255, 0.12);
          --corner-btn-bg: #fafafa;
          --corner-btn-text: #09090b;
          --pill-white-bg: #27272a;
          --pill-white-text: #fafafa;
          --pill-contrast-bg: #000000;
          --pill-contrast-text: #fafafa;
          --pill-highlight-bg: #fafafa;
          --pill-highlight-text: #09090b;
          --client-card-bg: #18181b;
          --client-card-text: #fafafa;
        }

        @keyframes rotateMarquee {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .sections-1-root .animate-marquee {
          animation: rotateMarquee 24s linear infinite;
        }

        @keyframes textFloatMount {
          0% {
            opacity: 0;
            transform: translateY(14px);
          }
          100% {
            opacity: 1;
            transform: translateY(0px);
          }
        }

        .sections-1-root .anim-word,
        .sections-1-root .anim-sentence {
          opacity: 0;
          transform: translateY(14px);
          animation: textFloatMount 1.15s cubic-bezier(0.22, 1, 0.36, 1) forwards;
          animation-delay: var(--delay, 0s);
          will-change: transform, opacity;
        }

        .sections-1-root .anim-word {
          display: inline-block;
        }

        .sections-1-root .corner-arrow-btn {
          overflow: hidden !important;
          position: absolute;
          cursor: pointer;
        }

        .sections-1-root .corner-arrow-btn .arrow-wrapper {
          position: relative;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .sections-1-root .corner-arrow-btn .arrow-main,
        .sections-1-root .corner-arrow-btn .arrow-clone {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          transition: transform 0.55s cubic-bezier(0.22, 1, 0.36, 1);
          will-change: transform;
        }

        .sections-1-root .corner-arrow-btn .arrow-main {
          transform: translate(0, 0);
        }

        .sections-1-root .corner-arrow-btn .arrow-clone {
          transform: translate(-34px, 34px);
        }

        .sections-1-root .corner-arrow-btn:hover .arrow-main,
        .sections-1-root .corner-arrow-btn:focus-visible .arrow-main {
          transform: translate(34px, -34px);
        }

        .sections-1-root .corner-arrow-btn:hover .arrow-clone,
        .sections-1-root .corner-arrow-btn:focus-visible .arrow-clone {
          transform: translate(0, 0);
        }

        @media (prefers-reduced-motion: reduce) {
          .sections-1-root .anim-word,
          .sections-1-root .anim-sentence {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
          }

          .sections-1-root .corner-arrow-btn .arrow-main,
          .sections-1-root .corner-arrow-btn .arrow-clone {
            transition: none !important;
          }
        }

        @media (max-width: 580px) {
          .sections-1-root .circular-stamp-wrapper {
            left: 0 !important;
            right: auto !important;
            top: 8px !important;
            transform: translate(0, 0) !important;
          }
        }
      `}</style>

      <div
        key={animKey}
        className="w-full flex flex-col items-center justify-center pt-[3.5rem] px-[1.5rem] pb-[5.5rem] max-[580px]:pt-[2.25rem] max-[580px]:px-[1.25rem] max-[580px]:pb-[5.5rem] overflow-x-hidden"
      >
        {/* MAIN SHOWCASE CONTAINER */}
        <main className="showcase-container w-full max-w-[1130px] mx-auto flex flex-col gap-[5.5rem] max-[980px]:gap-[4rem] max-[980px]:max-w-[490px] max-[580px]:gap-[3.25rem] max-[580px]:max-w-full">

          {/* ========================================================
               ROW 1: Visual Composition + About Development & AI Studio
               ======================================================== */}
          <section
            className="section-row grid grid-cols-[minmax(0,490px)_minmax(0,490px)] justify-between items-center gap-[4rem] relative max-[980px]:flex max-[980px]:flex-col max-[980px]:gap-[2.75rem] max-[980px]:w-full max-[980px]:max-w-[490px] max-[980px]:mx-auto max-[980px]:items-start max-[580px]:gap-[2.25rem] max-[580px]:max-w-full"
            aria-labelledby="heading-studio"
          >
            {/* Left Visual Composition */}
            <figure
              className="visual-composition-top relative flex items-end gap-[1.25rem] pt-[2rem] min-h-[420px] w-full max-w-[490px] max-[980px]:order-2 max-[980px]:m-0 max-[580px]:min-h-[340px] max-[580px]:pt-[1.5rem] max-[580px]:gap-[0.85rem] max-[580px]:max-w-full"
              role="region"
              aria-label="Studio proof and awards"
            >
              {/* 360-Degree Circular Marquee Stamp Badge */}
              <div
                className="circular-stamp-wrapper absolute top-[18px] right-[63%] -translate-x-1/2 -translate-y-[10%] w-[116px] h-[116px] z-10 flex items-center justify-center pointer-events-auto max-[580px]:w-[98px] max-[580px]:h-[98px] max-[580px]:left-0 max-[580px]:right-auto max-[580px]:top-[8px] max-[580px]:translate-x-0 max-[580px]:translate-y-0"
                role="img"
                aria-label="Winner AI Studio Dev & Design Badge"
              >
                <svg className="stamp-svg w-full h-full origin-center animate-marquee" viewBox="0 0 120 120">
                  <defs>
                    {/* Full 360-degree perimeter path (2 * PI * 44 ≈ 276.46px) */}
                    <path
                      id="stampCirclePath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                      fill="none"
                    />
                  </defs>
                  <text
                    fontFamily="'Plus Jakarta Sans', 'Inter', sans-serif"
                    fontSize="8.6"
                    fontWeight="700"
                    fill="var(--text-main)"
                  >
                    <textPath href="#stampCirclePath" startOffset="0%" textLength="268" lengthAdjust="spacing">
                      {" WINNER • AI STUDIO • DEV & DESIGN •"}
                    </textPath>
                  </text>
                </svg>
                <span className="stamp-center-text absolute font-display text-[1.85rem] font-bold text-[var(--text-main)] tracking-[-0.04em] leading-none pointer-events-none select-none max-[580px]:text-[1.55rem]">
                  #1
                </span>
              </div>

              {/* Shorter Left Card Placeholder */}
              <div
                className="card-left-short w-[44%] h-[270px] bg-[var(--card-bg)] rounded-[28px] relative overflow-hidden border border-[var(--border-subtle)] transition-[background-color] duration-300 ease-in-out max-[580px]:h-[220px] max-[580px]:rounded-[22px]"
                id="cardShort"
                aria-hidden="true"
              />

              {/* Taller Right Card Placeholder */}
              <div
                className="card-right-tall w-[54%] h-[380px] bg-[var(--card-bg)] rounded-[28px] relative overflow-hidden border border-[var(--border-subtle)] transition-[background-color] duration-300 ease-in-out max-[580px]:h-[310px] max-[580px]:rounded-[22px]"
                id="cardTall"
                aria-hidden="true"
              />

              {/* 120k+ Developers Floating Social Proof Card */}
              <aside
                className="client-card absolute bottom-[22px] left-[44%] -translate-x-1/2 bg-[var(--client-card-bg)] text-[var(--client-card-text)] rounded-[20px] pt-[0.95rem] px-[1.3rem] pb-[1.05rem] border border-[var(--border-subtle)] z-12 flex flex-col items-center gap-[0.7rem] cursor-default transition-[background-color] duration-300 ease-in-out max-[580px]:pt-[0.75rem] max-[580px]:px-[1rem] max-[580px]:pb-[0.85rem] max-[580px]:rounded-[16px] max-[580px]:bottom-[14px] max-[580px]:gap-[0.55rem]"
                aria-label="120,000 plus developers and founders"
              >
                <span className="client-card-title font-display text-[0.92rem] font-semibold text-[var(--client-card-text)] tracking-[-0.015em] whitespace-nowrap max-[580px]:text-[0.82rem]">
                  120k+ Developers
                </span>
                <div className="avatar-stack flex items-center" role="group" aria-label="Developer avatars">
                  <span
                    className="avatar-slot w-[44px] h-[44px] rounded-full border-[2.5px] border-[var(--client-card-bg)] ml-0 relative bg-white overflow-hidden flex items-center justify-center shrink-0 box-border"
                    style={{ zIndex: 4 }}
                  >
                    <img
                      className="avatar-img w-full h-full object-cover object-center scale-[1.28] block border-none m-0 bg-transparent"
                      src="/n1.png"
                      alt="Engineer 1"
                    />
                  </span>
                  <span
                    className="avatar-slot w-[44px] h-[44px] rounded-full border-[2.5px] border-[var(--client-card-bg)] -ml-[10px] relative bg-white overflow-hidden flex items-center justify-center shrink-0 box-border"
                    style={{ zIndex: 3 }}
                  >
                    <img
                      className="avatar-img w-full h-full object-cover object-center scale-[1.28] block border-none m-0 bg-transparent"
                      src="/n3.png"
                      alt="Engineer 2"
                    />
                  </span>
                  <span
                    className="avatar-slot w-[44px] h-[44px] rounded-full border-[2.5px] border-[var(--client-card-bg)] -ml-[10px] relative bg-white overflow-hidden flex items-center justify-center shrink-0 box-border"
                    style={{ zIndex: 2 }}
                  >
                    <img
                      className="avatar-img w-full h-full object-cover object-center scale-[1.28] block border-none m-0 bg-transparent"
                      src="/n2.png"
                      alt="Engineer 3"
                    />
                  </span>
                  <span
                    className="avatar-slot w-[44px] h-[44px] rounded-full border-[2.5px] border-[var(--client-card-bg)] -ml-[10px] relative bg-white overflow-hidden flex items-center justify-center shrink-0 box-border"
                    style={{ zIndex: 1 }}
                  >
                    <img
                      className="avatar-img w-full h-full object-cover object-center scale-[1.28] block border-none m-0 bg-transparent"
                      src="/n4.png"
                      alt="Engineer 4"
                    />
                  </span>
                </div>
              </aside>
            </figure>

            {/* Right Text Content */}
            <header className="text-content-top flex flex-col items-start p-0 w-full max-w-[490px] m-0 max-[980px]:order-1 max-[980px]:pl-0 max-[980px]:text-left max-[580px]:max-w-full">
              <span className="about-tag inline-flex items-center justify-center py-[0.35rem] px-[0.95rem] border border-[var(--border-main)] rounded-full font-body text-[0.72rem] font-semibold tracking-[0.06em] uppercase text-[var(--text-main)] mb-[1.15rem] bg-transparent whitespace-nowrap max-[980px]:self-start max-[580px]:mb-[0.85rem]">
                AI &amp; PRODUCT STUDIO
              </span>
              <h1
                className="headline-main font-display text-[clamp(2.35rem,4.2vw,3.45rem)] font-medium leading-[1.12] tracking-[-0.035em] text-[var(--text-main)] mb-[0.85rem] w-full max-w-[490px] max-[980px]:text-left max-[580px]:text-[clamp(2rem,8vw,2.5rem)] max-[580px]:mb-[0.65rem] max-[580px]:max-w-full"
                id="heading-studio"
              >
                <span className="block">
                  <span className="anim-word" style={{ "--delay": "0.10s" } as React.CSSProperties}>Developing</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.18s" } as React.CSSProperties}>AI</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.26s" } as React.CSSProperties}>that</span>
                </span>
                <span className="block">
                  <span className="anim-word" style={{ "--delay": "0.35s" } as React.CSSProperties}>Inspire</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.43s" } as React.CSSProperties}>&amp;</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.51s" } as React.CSSProperties}>Scale.</span>
                </span>
              </h1>
              <p
                className="paragraph-main anim-sentence font-body text-[1rem] leading-[1.55] tracking-[-0.015em] text-[var(--text-muted)] w-full max-w-[490px] max-[980px]:text-left max-[580px]:text-[0.95rem] max-[580px]:leading-[1.5] max-[580px]:max-w-full"
                style={{ "--delay": "0.30s" } as React.CSSProperties}
              >
                Intelligent full-stack systems and intuitive AI interfaces, crafted to scale seamlessly.{" "}
                <span className="desc-desktop-extra inline max-[980px]:hidden">
                  We bridge advanced neural models with frictionless, human-centered interaction.
                </span>
              </p>
            </header>
          </section>

          {/* ========================================================
               ROW 2: Engineering Systems + Monochrome Tag Card
               ======================================================== */}
          <section
            className="section-row grid grid-cols-[minmax(0,490px)_minmax(0,490px)] justify-between items-center gap-[4rem] relative max-[980px]:flex max-[980px]:flex-col max-[980px]:gap-[2.75rem] max-[980px]:w-full max-[980px]:max-w-[490px] max-[980px]:mx-auto max-[980px]:items-start max-[580px]:gap-[2.25rem] max-[580px]:max-w-full"
            aria-labelledby="heading-engineering"
          >
            {/* Left Text Content */}
            <article className="text-content-bottom flex flex-col items-start p-0 w-full max-w-[490px] m-0 max-[980px]:order-1 max-[980px]:pr-0 max-[980px]:text-left max-[580px]:max-w-full">
              <h2
                className="headline-secondary font-display text-[clamp(2.25rem,4vw,3.3rem)] font-medium leading-[1.14] tracking-[-0.035em] text-[var(--text-main)] mb-[0.85rem] w-full max-w-[490px] max-[980px]:text-left max-[580px]:text-[clamp(1.9rem,7.5vw,2.35rem)] max-[580px]:mb-[0.65rem] max-[580px]:max-w-full"
                id="heading-engineering"
              >
                <span className="block">
                  <span className="anim-word" style={{ "--delay": "0.12s" } as React.CSSProperties}>Smart</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.20s" } as React.CSSProperties}>Designs</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.28s" } as React.CSSProperties}>that</span>
                </span>
                <span className="block">
                  <span className="anim-word" style={{ "--delay": "0.37s" } as React.CSSProperties}>inspire</span>{" "}
                  <span className="anim-word" style={{ "--delay": "0.45s" } as React.CSSProperties}>people</span>
                </span>
              </h2>
              <p
                className="paragraph-secondary anim-sentence font-body text-[1rem] leading-[1.55] tracking-[-0.015em] text-[var(--text-muted)] w-full max-w-[490px] mb-[2rem] max-[980px]:text-left max-[980px]:mb-0 max-[580px]:text-[0.95rem] max-[580px]:leading-[1.5] max-[580px]:max-w-full"
                style={{ "--delay": "0.32s" } as React.CSSProperties}
              >
                High-throughput infrastructure paired with pixel-crafted design systems.{" "}
                <span className="desc-desktop-extra inline max-[980px]:hidden">
                  Every interaction is engineered for lightning latency and effortless cognition.
                </span>
              </p>

              {/* Tilted Oval "A+ Rating" Badge */}
              <aside
                className="rating-oval anim-sentence inline-flex flex-col items-center justify-center w-[204px] h-[94px] border border-[var(--border-main)] rounded-[50%] -rotate-[8.5deg] bg-transparent select-none max-[980px]:!hidden"
                style={{ "--delay": "0.42s" } as React.CSSProperties}
                aria-label="A+ Rating by Developers & Founders"
              >
                <span className="rating-val block font-display text-[1.7rem] font-bold text-[var(--text-main)] tracking-[-0.03em] leading-[1.1]">
                  A+ Rating
                </span>
                <span className="rating-label block font-body text-[0.74rem] font-medium text-[var(--text-muted)] mt-[2px] tracking-[-0.012em]">
                  By Developers &amp; Founders.
                </span>
              </aside>
            </article>

            {/* Right Feature Card with Notched Corner & Monochrome Sticker Cluster */}
            <figure
              className="feature-card-wrapper relative w-full max-w-[490px] h-[385px] m-0 max-[980px]:order-2 max-[580px]:h-[330px] max-[580px]:max-w-full"
              role="region"
              aria-label="Technical capabilities and focus areas"
            >
              {/* SVG Canvas with mathematically perfect reverse-radius corner notch */}
              <svg className="feature-card-bg absolute inset-0 w-full h-full" viewBox="0 0 490 385" preserveAspectRatio="none">
                <path
                  className="card-path-fill fill-[var(--card-bg)] stroke-[var(--border-subtle)] stroke-[1px] transition-[fill] duration-300 ease-in-out"
                  d="
                    M 28 0
                    L 416 0
                    C 426 0, 432 8, 432 18
                    L 432 46
                    C 432 58, 442 66, 454 66
                    L 472 66
                    C 482 66, 490 74, 490 84
                    L 490 357
                    C 490 372.5, 477.5 385, 462 385
                    L 28 385
                    C 12.5 385, 0 372.5, 0 357
                    L 0 28
                    C 0 12.5, 12.5 0, 28 0
                    Z
                  "
                />
              </svg>

              {/* Minimal Monochrome Arrow Button in the Cutout */}
              <button
                className="corner-arrow-btn absolute top-0 right-0 w-[48px] h-[48px] bg-[var(--corner-btn-bg)] text-[var(--corner-btn-text)] rounded-[14px] flex items-center justify-center z-10 border border-[var(--border-subtle)] outline-none cursor-pointer overflow-hidden transition-[background-color,color] duration-300 ease-in-out max-[580px]:w-[42px] max-[580px]:h-[42px] max-[580px]:rounded-[12px]"
                type="button"
                aria-label="Explore capabilities"
              >
                <span className="arrow-wrapper relative w-[18px] h-[18px] flex items-center justify-center max-[580px]:w-[16px] max-[580px]:h-[16px] pointer-events-none">
                  <svg
                    className="arrow-icon arrow-main w-[18px] h-[18px] stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] max-[580px]:w-[16px] max-[580px]:h-[16px] block"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                  <svg
                    className="arrow-icon arrow-clone w-[18px] h-[18px] stroke-current stroke-[2.2] [stroke-linecap:round] [stroke-linejoin:round] max-[580px]:w-[16px] max-[580px]:h-[16px] block"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </button>

              {/* Development & AI UI/UX Tag Cluster */}
              <ul
                className="tag-cluster absolute bottom-[22px] left-[14px] right-[14px] z-10 flex flex-col gap-[6px] items-center list-none m-0 p-0 pointer-events-none max-w-[calc(100%-28px)] box-border max-[580px]:bottom-[18px] max-[580px]:left-[8px] max-[580px]:right-[8px] max-[580px]:gap-[4px]"
                role="list"
              >
                {/* Row 1: Development & AI Agents */}
                <li className="tag-row flex items-center justify-center gap-[6px] w-full max-w-full list-none m-0 p-0 flex-nowrap max-[580px]:gap-[4px]">
                  <span className="sticker-pill pill-white rot-development inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] -rotate-[1deg] text-[clamp(0.82rem,1.9vw,0.96rem)] py-[0.4rem] px-[1.15rem] z-4 max-[580px]:text-[0.92rem] max-[580px]:py-[0.4rem] max-[580px]:px-[1.05rem] max-[380px]:text-[0.82rem] max-[380px]:py-[0.36rem] max-[380px]:px-[0.85rem]">
                    Development
                  </span>
                  <span className="sticker-pill pill-white rot-ai-agents inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] rotate-[1.5deg] text-[clamp(0.82rem,1.9vw,0.96rem)] py-[0.4rem] px-[1.1rem] z-3 max-[580px]:text-[0.92rem] max-[580px]:py-[0.4rem] max-[580px]:px-[1.05rem] max-[380px]:text-[0.82rem] max-[380px]:py-[0.36rem] max-[380px]:px-[0.85rem]">
                    AI Agents
                  </span>
                </li>

                {/* Row 2: UI/UX Design, Architecture & Full-Stack */}
                <li className="tag-row flex items-center justify-center gap-[6px] w-full max-w-full list-none m-0 p-0 flex-nowrap max-[580px]:gap-[4px]">
                  <span className="sticker-pill pill-white rot-ui-ux inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] -rotate-[4deg] text-[clamp(0.78rem,1.8vw,0.92rem)] py-[0.36rem] px-[0.98rem] z-2 max-[580px]:text-[0.88rem] max-[580px]:py-[0.38rem] max-[580px]:px-[0.95rem] max-[380px]:text-[0.78rem] max-[380px]:py-[0.34rem] max-[380px]:px-[0.75rem]">
                    UI/UX Design
                  </span>
                  <span className="sticker-pill pill-white rot-architecture inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] -rotate-[0.5deg] text-[clamp(0.8rem,1.8vw,0.94rem)] py-[0.38rem] px-[1.05rem] z-5 max-[580px]:text-[0.88rem] max-[580px]:py-[0.38rem] max-[580px]:px-[0.95rem] max-[380px]:text-[0.78rem] max-[380px]:py-[0.34rem] max-[380px]:px-[0.75rem]">
                    Architecture
                  </span>
                  <span className="sticker-pill pill-black rot-fullstack inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-white/16 transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-contrast-bg)] text-[var(--pill-contrast-text)] -rotate-[2deg] text-[clamp(0.8rem,1.8vw,0.94rem)] py-[0.38rem] px-[1.05rem] z-6 max-[580px]:text-[0.88rem] max-[580px]:py-[0.38rem] max-[580px]:px-[0.95rem] max-[380px]:text-[0.78rem] max-[380px]:py-[0.34rem] max-[380px]:px-[0.75rem]">
                    Full-Stack
                  </span>
                </li>

                {/* Row 3: Design Systems, Interface & Prototyping */}
                <li className="tag-row flex items-center justify-center gap-[6px] w-full max-w-full list-none m-0 p-0 flex-nowrap max-[580px]:gap-[4px]">
                  <span className="sticker-pill pill-white rot-design-systems inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] -rotate-[3.5deg] text-[clamp(0.78rem,1.8vw,0.92rem)] py-[0.38rem] px-[1.02rem] z-7 max-[580px]:text-[0.88rem] max-[580px]:py-[0.38rem] max-[580px]:px-[0.95rem] max-[380px]:text-[0.78rem] max-[380px]:py-[0.34rem] max-[380px]:px-[0.75rem]">
                    Design Systems
                  </span>
                  <span className="sticker-pill pill-highlight rot-interface-highlight inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--text-main)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-highlight-bg)] text-[var(--pill-highlight-text)] -rotate-[6deg] text-[clamp(0.82rem,1.9vw,0.96rem)] py-[0.4rem] px-[1.15rem] z-8 max-[580px]:text-[0.92rem] max-[580px]:py-[0.4rem] max-[580px]:px-[1.05rem] max-[380px]:text-[0.82rem] max-[380px]:py-[0.36rem] max-[380px]:px-[0.85rem]">
                    Interface
                  </span>
                  <span className="sticker-pill pill-white rot-prototyping inline-flex items-center justify-center font-display font-semibold tracking-[-0.02em] rounded-full select-none whitespace-nowrap relative border border-[var(--border-subtle)] transition-[background-color,color] duration-300 ease-in-out box-border shrink-0 bg-[var(--pill-white-bg)] text-[var(--pill-white-text)] rotate-[3deg] text-[clamp(0.8rem,1.8vw,0.94rem)] py-[0.38rem] px-[1.05rem] z-4 max-[580px]:text-[0.88rem] max-[580px]:py-[0.38rem] max-[580px]:px-[0.95rem] max-[380px]:text-[0.78rem] max-[380px]:py-[0.34rem] max-[380px]:px-[0.75rem]">
                    Prototyping
                  </span>
                </li>
              </ul>
            </figure>
          </section>

        </main>

        {showThemeBar && (
          <aside
            className="floating-replay-bar fixed bottom-[1.5rem] left-1/2 -translate-x-1/2 bg-[var(--bg)] border border-[var(--border-main)] rounded-full p-[4px] flex items-center gap-[3px] z-50 select-none shadow-sm max-[580px]:scale-[0.92] max-[580px]:bottom-[1rem]"
            aria-label="Animation replay controls"
          >
            <button
              onClick={replayAnimation}
              className="bg-transparent border-none text-[var(--text-muted)] hover:text-[var(--text-main)] font-display text-[0.74rem] font-semibold tracking-[0.02em] py-[0.4rem] px-[0.85rem] rounded-full cursor-pointer inline-flex items-center gap-[0.35rem] transition-all duration-200 ease-in-out"
              aria-label="Replay text animation"
              title="Replay text animation"
            >
              <span aria-hidden="true">↺</span> Replay
            </button>
          </aside>
        )}
      </div>
    </div>
  );
}

export default Sections1;
