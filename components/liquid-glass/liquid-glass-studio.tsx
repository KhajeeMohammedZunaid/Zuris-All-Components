'use client';

import React, { useState, useRef, useEffect, useCallback, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from 'next-themes';
import {
  LiquidGlassLogo,
  type LiquidGlassLogoHandle,
} from './liquid-glass-logo';
import {
  liquidGlassLogoNoteLogo,
  liquidGlassLogoThemes,
} from './liquid-glass-logo-renderer';

// Built-in Vector Mark Presets
const NIKE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M21.71 6.36c-2.45 2.5-6.72 6.58-12.87 11.02-2.18 1.57-4.22 2.37-6.08 2.37-1.43 0-2.31-.53-2.61-1.57-.35-1.22.42-2.89 2.27-4.96C4.46 10.95 7.4 8.7 11.16 6.54c2.8-1.61 5.38-2.66 7.69-3.13 1.94-.4 3.03-.23 3.25.5.21.71-.05 1.57-.39 2.45z"/></svg>'
)}`;

const APPLE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.87-.9.04-1.99.6-2.63 1.35-.58.65-1.08 1.73-.95 2.76.99.08 2.03-.51 2.66-1.24z"/></svg>'
)}`;

// Color Space Conversion Utilities
function hexToRgb(hex: string): [number, number, number] {
  let clean = hex.replace('#', '').trim();
  if (clean.length === 3) clean = clean.split('').map((c) => c + c).join('');
  if (clean.length !== 6) return [0, 0, 0];
  const intVal = parseInt(clean, 16);
  return [(intVal >> 16) & 255, (intVal >> 8) & 255, intVal & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toByte = (n: number) => Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toByte(r)}${toByte(g)}${toByte(b)}`;
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const linearize = (v: number) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const lr = linearize(r), lg = linearize(g), lb = linearize(b);
  const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
  const m = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
  const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bO = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.sqrt(a * a + bO * bO);
  let h = Math.atan2(bO, a) * (180 / Math.PI);
  if (h < 0) h += 360;

  return [Number(L.toFixed(3)), Number(C.toFixed(3)), Number(h.toFixed(1))];
}

function oklchToRgb(L: number, C: number, h: number): [number, number, number] {
  const hRad = (h * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const bO = C * Math.sin(hRad);

  const l = Math.pow(L + 0.3963377774 * a + 0.2158037573 * bO, 3);
  const m = Math.pow(L - 0.1055613458 * a - 0.0638541728 * bO, 3);
  const s = Math.pow(L - 0.0894841775 * a - 1.291485548 * bO, 3);

  const rLin = +4.076743477 * l - 3.3077115913 * m + 0.2309699292 * s;
  const gLin = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
  const bLin = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;

  const delinearize = (v: number) => {
    v = Math.max(0, Math.min(1, v));
    return Math.round((v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255);
  };

  return [delinearize(rLin), delinearize(gLin), delinearize(bLin)];
}

type StudioCategory = 'all' | 'brand' | 'optics' | 'motion' | 'color' | 'export';

export function LiquidGlassStudio() {
  const logoRef = useRef<LiquidGlassLogoHandle>(null);
  const { setTheme: setAppTheme, resolvedTheme } = useTheme();

  // Active Category Filter for Right Adjusting Panel
  const [activeCategory, setActiveCategory] = useState<StudioCategory>('all');
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: StudioCategory) => {
    setActiveCategory(category);
    if (rightPanelRef.current) {
      rightPanelRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  };

  // Brand & Emblem Settings
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoChoice, setLogoChoice] = useState<'Music' | 'Nike' | 'Apple' | 'Custom'>('Music');
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [originalColors, setOriginalColors] = useState(false);
  const [tileSize, setTileSize] = useState(256);
  const [logoScale, setLogoScale] = useState(0.72);
  const [finalLogoScale, setFinalLogoScale] = useState(1);
  const [logoRelief, setLogoRelief] = useState(1);
  const [iconPlate, setIconPlate] = useState(true);

  // Glass Optics Settings
  const [depth, setDepth] = useState(2.9);
  const [dispersion, setDispersion] = useState(1);
  const [relief, setRelief] = useState(1);
  const [caustics, setCaustics] = useState(1);
  const [highlights, setHighlights] = useState(1);
  const [echoTint, setEchoTint] = useState(0.5);
  const [innerWallFocus, setInnerWallFocus] = useState(0);
  const [bloom, setBloom] = useState(0.55);

  // Color Palette Settings
  const [logoColor, setLogoColor] = useState('#09111b');
  const [plateColor, setPlateColor] = useState('#e4e6ea');
  const [backgroundColor, setBackgroundColor] = useState('#e2e2e5');

  // Background Media
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

  // Fluid Motion Settings
  const [dropStrength, setDropStrength] = useState(1);
  const [decay, setDecay] = useState(1.4);
  const [speed, setSpeed] = useState(1);
  const [loopDelay, setLoopDelay] = useState(1.6);
  const [loop, setLoop] = useState(true);
  const [paused, setPaused] = useState(false);

  // Video Export Settings
  const [format, setFormat] = useState('MP4');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [resolution, setResolution] = useState('1080p');
  const [frameRate, setFrameRate] = useState('60 fps');
  const [isExporting, setIsExporting] = useState(false);
  const [exportFeedback, setExportFeedback] = useState<string | null>(null);

  // Sync environmental theme colors
  useEffect(() => {
    const t = liquidGlassLogoThemes[theme];
    if (t) {
      setLogoColor(t.logoColor);
      setPlateColor(t.tileColor);
      setBackgroundColor(t.background);
    }
  }, [theme]);

  // Sync with next-themes system preference
  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  const resolvedLogo =
    logoChoice === 'Music'
      ? liquidGlassLogoNoteLogo
      : logoChoice === 'Nike'
      ? NIKE_LOGO
      : logoChoice === 'Apple'
      ? APPLE_LOGO
      : customLogoUrl || liquidGlassLogoNoteLogo;

  const bgInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleBgUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setBackgroundImage(url);
    }
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCustomLogoUrl(url);
      setLogoChoice('Custom');
    }
  };

  const triggerReplay = useCallback(() => {
    if (logoRef.current) {
      logoRef.current.replay();
    }
  }, []);

  const handleExportVideo = () => {
    setIsExporting(true);
    setExportFeedback(null);
    setTimeout(() => {
      setIsExporting(false);
      setExportFeedback(`Exported ${resolution} ${format} (${aspectRatio} @ ${frameRate})`);
      setTimeout(() => setExportFeedback(null), 3500);
    }, 1200);
  };

  return (
    <div className="w-full h-screen max-h-screen overflow-hidden flex flex-col p-3 sm:p-4 lg:p-5 box-border bg-[#f7f8fa] dark:bg-[#0a0b0e] text-neutral-900 dark:text-neutral-100 transition-colors duration-200 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
      
      {/* Main Two-Panel Workspace Grid */}
      <div className="w-full h-full max-h-full max-w-[1520px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch overflow-hidden">
        
        {/* ========================================================= */}
        {/* LEFT PANEL: PREVIEW STAGE                                 */}
        {/* ========================================================= */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col gap-3 h-full min-h-0">
          
          {/* Top Quick Actions Bar */}
          <div className="flex items-center justify-end px-1 shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  const nextT = theme === 'dark' ? 'light' : 'dark';
                  setTheme(nextT);
                  setAppTheme(nextT);
                  triggerReplay();
                }}
                className="px-2.5 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors"
                title="Toggle Theme"
              >
                {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
              </button>

              <button
                onClick={triggerReplay}
                className="px-3 py-1.5 rounded-lg border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-medium text-neutral-700 dark:text-neutral-300 transition-colors flex items-center gap-1.5 active:scale-95"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Replay
              </button>

              <button
                onClick={() => {
                  if (paused) {
                    logoRef.current?.play();
                    setPaused(false);
                  } else {
                    logoRef.current?.pause();
                    setPaused(true);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg border text-xs font-medium transition-colors flex items-center gap-1.5 active:scale-95 ${
                  paused
                    ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-400'
                    : 'border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                }`}
              >
                {paused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>

          {/* Left Panel Canvas Stage Box - No Bottom Shadows, No Top HUD */}
          <div className="relative w-full flex-1 min-h-0 rounded-2xl overflow-hidden border border-neutral-200 dark:border-neutral-800 bg-neutral-950 flex items-center justify-center">
            <LiquidGlassLogo
              ref={logoRef}
              className="w-full h-full"
              theme={theme}
              logo={resolvedLogo}
              logoColor={originalColors ? 'original' : logoColor}
              logoSize={tileSize}
              logoScale={logoScale}
              finalLogoScale={finalLogoScale}
              logoRelief={logoRelief}
              tile={iconPlate}
              depth={depth}
              dispersion={dispersion}
              relief={relief}
              caustics={caustics}
              highlights={highlights}
              echoTint={echoTint}
              innerWallFocus={innerWallFocus}
              bloom={bloom}
              tileColor={plateColor}
              background={backgroundColor}
              backgroundImage={backgroundImage}
              dropStrength={dropStrength}
              decay={decay}
              speed={speed}
              loopDelay={loopDelay}
              loop={loop}
              paused={paused}
              interactive={true}
            />
          </div>
        </div>

        {/* ========================================================= */}
        {/* RIGHT PANEL: PROPS ADJUSTING PANEL                        */}
        {/* ========================================================= */}
        <div
          ref={rightPanelRef}
          className="lg:col-span-6 xl:col-span-5 flex flex-col gap-4 bg-white dark:bg-[#121316] border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 h-full min-h-0 overflow-y-auto overscroll-contain [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
        >
          {/* Right Panel Header */}
          <div className="flex flex-col gap-3 pb-3 border-b border-neutral-100 dark:border-neutral-800/80 shrink-0">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-semibold text-neutral-900 dark:text-white tracking-tight">
                  Parameters & Properties
                </h3>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                  Fine-tune optics, fluid mechanics, and styling
                </p>
              </div>

              <button
                onClick={() => {
                  setDepth(2.9);
                  setDispersion(1);
                  setRelief(1);
                  setCaustics(1);
                  setHighlights(1);
                  setBloom(0.55);
                  setDropStrength(1);
                  setDecay(1.4);
                  setSpeed(1);
                  triggerReplay();
                }}
                className="text-[11px] font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white px-2 py-1 rounded border border-neutral-200 dark:border-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors"
                title="Reset to default tuning"
              >
                Reset
              </button>
            </div>

            {/* Category Filter Pills with Fluid Motion Pill */}
            <div className="flex items-center gap-1 overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden pt-1">
              {[
                { id: 'all', label: 'All' },
                { id: 'brand', label: 'Brand & Assets' },
                { id: 'optics', label: 'Optics' },
                { id: 'motion', label: 'Motion' },
                { id: 'color', label: 'Colors' },
                { id: 'export', label: 'Export' },
              ].map((cat) => {
                const isSelected = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id as StudioCategory)}
                    className={`relative px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'text-white dark:text-neutral-900 font-semibold'
                        : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                    }`}
                  >
                    {isSelected && (
                      <motion.div
                        layoutId="activeCategoryPill"
                        transition={{ type: 'spring', stiffness: 480, damping: 35 }}
                        className="absolute inset-0 bg-neutral-900 dark:bg-white rounded-lg shadow-2xs"
                      />
                    )}
                    <span className="relative z-10">{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Animated Tab Content Container with Zero Layout Shift */}
          <div className="relative flex-1 min-h-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 7 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
              {/* SECTION: BRAND & ASSETS */}
              {(activeCategory === 'all' || activeCategory === 'brand') && (
                <div className="flex flex-col gap-3.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                    Assets & Silhouette
                  </span>

              {/* Upload Dropzones */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input ref={bgInputRef} type="file" accept="image/*" className="hidden" onChange={handleBgUpload} />
                <div
                  onClick={() => bgInputRef.current?.click()}
                  className="border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/70 dark:bg-neutral-900/40 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">Backdrop</span>
                    <span className="text-[10px] text-neutral-400 truncate">Image behind glass</span>
                  </div>
                  {backgroundImage && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setBackgroundImage(undefined);
                      }}
                      className="ml-auto text-[10px] text-red-500 font-medium px-1.5 py-0.5 rounded bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900"
                    >
                      Clear
                    </button>
                  )}
                </div>

                <input ref={logoInputRef} type="file" accept="image/svg+xml,image/png" className="hidden" onChange={handleLogoUpload} />
                <div
                  onClick={() => logoInputRef.current?.click()}
                  className="border border-dashed border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600 bg-neutral-50/70 dark:bg-neutral-900/40 rounded-xl p-3 flex items-center gap-3 cursor-pointer transition-colors"
                >
                  <div className="w-9 h-9 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                  </div>
                  <div className="flex flex-col truncate">
                    <span className="text-xs font-semibold text-neutral-900 dark:text-white truncate">Logo SVG/PNG</span>
                    <span className="text-[10px] text-neutral-400 truncate">Drop or select file</span>
                  </div>
                  {logoChoice === 'Custom' && (
                    <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-medium px-1.5 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                      Active
                    </span>
                  )}
                </div>
              </div>

              {/* Logo Select */}
              <div className="flex flex-col gap-1.5">
                <span className="text-xs font-medium text-neutral-700 dark:text-neutral-300">Preset Vector Mark</span>
                <div className="grid grid-cols-4 gap-2">
                  {(['Music', 'Nike', 'Apple', ...(customLogoUrl ? ['Custom'] : [])] as const).map((opt) => (
                    <button
                      key={opt}
                      onClick={() => {
                        setLogoChoice(opt as any);
                        triggerReplay();
                      }}
                      className={`py-1.5 px-2 rounded-lg text-xs font-medium border text-center transition-colors truncate ${
                        logoChoice === opt
                          ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-neutral-900'
                          : 'border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/60 text-neutral-700 dark:text-neutral-300 hover:border-neutral-300'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sliders */}
              <div className="flex flex-col gap-2.5">
                <PropSlider
                  label="Tile Size"
                  value={tileSize}
                  min={64}
                  max={512}
                  step={1}
                  unit="px"
                  onChange={(val) => {
                    setTileSize(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Logo Scale"
                  value={logoScale}
                  min={0.1}
                  max={1.0}
                  step={0.01}
                  onChange={(val) => {
                    setLogoScale(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Final Settled Scale"
                  value={finalLogoScale}
                  min={0.1}
                  max={1.0}
                  step={0.01}
                  onChange={(val) => {
                    setFinalLogoScale(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Embossed Relief"
                  value={logoRelief}
                  min={0}
                  max={1.0}
                  step={0.05}
                  onChange={(val) => {
                    setLogoRelief(val);
                    triggerReplay();
                  }}
                />

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <PropToggle
                    label="Original Colors"
                    checked={originalColors}
                    onChange={(val) => {
                      setOriginalColors(val);
                      triggerReplay();
                    }}
                  />

                  <PropToggle
                    label="Icon Plate"
                    checked={iconPlate}
                    onChange={(val) => {
                      setIconPlate(val);
                      triggerReplay();
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: GLASS OPTICS */}
          {(activeCategory === 'all' || activeCategory === 'optics') && (
            <div className="flex flex-col gap-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Glass Optics
              </span>

              <div className="flex flex-col gap-2.5">
                <PropSlider
                  label="Optical Depth"
                  value={depth}
                  min={0}
                  max={6.0}
                  step={0.1}
                  onChange={(val) => {
                    setDepth(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Spectral Dispersion"
                  value={dispersion}
                  min={0}
                  max={4.0}
                  step={0.1}
                  onChange={(val) => {
                    setDispersion(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Double Bevel"
                  value={relief}
                  min={0}
                  max={3.0}
                  step={0.1}
                  onChange={(val) => {
                    setRelief(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Focused Caustics"
                  value={caustics}
                  min={0}
                  max={4.0}
                  step={0.1}
                  onChange={(val) => {
                    setCaustics(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Highlights"
                  value={highlights}
                  min={0}
                  max={4.0}
                  step={0.1}
                  onChange={(val) => {
                    setHighlights(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Light Diffusion"
                  value={bloom}
                  min={0}
                  max={2.0}
                  step={0.05}
                  onChange={(val) => {
                    setBloom(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Inner Wall Focus"
                  value={innerWallFocus}
                  min={0}
                  max={1.0}
                  step={0.05}
                  onChange={(val) => {
                    setInnerWallFocus(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Echo Rim Tint"
                  value={echoTint}
                  min={0}
                  max={1.0}
                  step={0.05}
                  onChange={(val) => {
                    setEchoTint(val);
                    triggerReplay();
                  }}
                />
              </div>
            </div>
          )}

          {/* SECTION: FLUID DYNAMICS */}
          {(activeCategory === 'all' || activeCategory === 'motion') && (
            <div className="flex flex-col gap-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Fluid Motion
              </span>

              <div className="flex flex-col gap-2.5">
                <PropSlider
                  label="Drop Strength"
                  value={dropStrength}
                  min={0}
                  max={4.0}
                  step={0.1}
                  onChange={(val) => {
                    setDropStrength(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Ring Decay"
                  value={decay}
                  min={0.1}
                  max={5.0}
                  step={0.1}
                  unit="s"
                  onChange={(val) => {
                    setDecay(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Simulation Speed"
                  value={speed}
                  min={0.1}
                  max={3.0}
                  step={0.1}
                  unit="x"
                  onChange={(val) => {
                    setSpeed(val);
                    triggerReplay();
                  }}
                />

                <PropSlider
                  label="Loop Rest Delay"
                  value={loopDelay}
                  min={0}
                  max={10.0}
                  step={0.2}
                  unit="s"
                  onChange={(val) => {
                    setLoopDelay(val);
                    triggerReplay();
                  }}
                />

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <PropToggle
                    label="Continuous Loop"
                    checked={loop}
                    onChange={(val) => {
                      setLoop(val);
                      if (val && logoRef.current) logoRef.current.play();
                    }}
                  />

                  <PropToggle
                    label="Simulation Paused"
                    checked={paused}
                    onChange={(val) => {
                      setPaused(val);
                      if (val) logoRef.current?.pause();
                      else logoRef.current?.play();
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* SECTION: COLOR MATRIX */}
          {(activeCategory === 'all' || activeCategory === 'color') && (
            <div className="flex flex-col gap-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Color Palette
              </span>

              <div className="flex flex-col gap-2.5">
                <PropColorField
                  label="Logo Ink Color"
                  value={logoColor}
                  onChange={(val) => {
                    setLogoColor(val);
                    triggerReplay();
                  }}
                />

                <PropColorField
                  label="Plate Glass Color"
                  value={plateColor}
                  onChange={(val) => {
                    setPlateColor(val);
                    triggerReplay();
                  }}
                />

                <PropColorField
                  label="Studio Canvas Background"
                  value={backgroundColor}
                  onChange={(val) => {
                    setBackgroundColor(val);
                    triggerReplay();
                  }}
                />
              </div>
            </div>
          )}

          {/* SECTION: VIDEO EXPORT */}
          {(activeCategory === 'all' || activeCategory === 'export') && (
            <div className="flex flex-col gap-3.5 pt-2 border-t border-neutral-100 dark:border-neutral-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                Video Export
              </span>

              <div className="grid grid-cols-2 gap-2.5">
                <PropSelect
                  label="Format"
                  value={format}
                  options={['MP4', 'WebM', 'GIF', 'ProRes']}
                  onChange={setFormat}
                />

                <PropSelect
                  label="Aspect Ratio"
                  value={aspectRatio}
                  options={['16:9', '1:1', '9:16', '4:3']}
                  onChange={setAspectRatio}
                />

                <PropSelect
                  label="Resolution"
                  value={resolution}
                  options={['720p', '1080p', '2K', '4K']}
                  onChange={setResolution}
                />

                <PropSelect
                  label="Framerate"
                  value={frameRate}
                  options={['24 fps', '30 fps', '60 fps', '120 fps']}
                  onChange={setFrameRate}
                />
              </div>

              <button
                onClick={handleExportVideo}
                disabled={isExporting}
                className="w-full py-2.5 px-4 rounded-xl border border-neutral-900 bg-neutral-900 dark:border-white dark:bg-white text-white dark:text-neutral-900 text-xs font-semibold hover:opacity-90 active:scale-[0.99] transition-all flex items-center justify-center gap-2 mt-1 disabled:opacity-50"
              >
                {isExporting ? (
                  <>
                    <svg className="animate-spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                    </svg>
                    <span>Synthesizing Video...</span>
                  </>
                ) : (
                  <span>Export Video ({resolution} {format})</span>
                )}
              </button>

              <AnimatePresence>
                {exportFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-medium text-center"
                  >
                    ✓ {exportFeedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// RIGHT PANEL CLEAN MICRO-COMPONENTS (NO BOTTOM SHADOWS!)
// -------------------------------------------------------------

interface PropSliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  unit?: string;
  onChange: (val: number) => void;
}

function PropSlider({ label, value, min, max, step, unit = '', onChange }: PropSliderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(String(value));

  useEffect(() => {
    setTempVal(String(value));
  }, [value]);

  const commit = () => {
    setIsEditing(false);
    const parsed = parseFloat(tempVal);
    if (!isNaN(parsed)) {
      const clamped = Math.max(min, Math.min(max, parsed));
      onChange(Number(clamped.toFixed(3)));
    }
  };

  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div className="flex flex-col gap-1.5 p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium truncate">
          {label}
        </span>

        {isEditing ? (
          <input
            type="number"
            value={tempVal}
            min={min}
            max={max}
            step={step}
            autoFocus
            onBlur={commit}
            onKeyDown={(e) => {
              if (e.key === 'Enter') commit();
              if (e.key === 'Escape') setIsEditing(false);
            }}
            onChange={(e) => setTempVal(e.target.value)}
            className="w-14 px-1 py-0.5 text-right font-mono text-xs font-semibold bg-white dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded outline-none"
          />
        ) : (
          <span
            onDoubleClick={() => setIsEditing(true)}
            className="font-mono text-xs font-semibold text-neutral-800 dark:text-neutral-200 cursor-pointer hover:underline"
            title="Double-click to type exact value"
          >
            {value}{unit}
          </span>
        )}
      </div>

      <div className="relative flex items-center h-4 w-full">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-1 bg-neutral-200 dark:bg-neutral-800 rounded appearance-none cursor-pointer accent-neutral-900 dark:accent-white focus:outline-none"
          style={{
            background: `linear-gradient(to right, currentColor 0%, currentColor ${pct}%, rgba(150,150,150,0.2) ${pct}%, rgba(150,150,150,0.2) 100%)`,
          }}
        />
      </div>
    </div>
  );
}

interface PropToggleProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

function PropToggle({ label, checked, onChange }: PropToggleProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40 cursor-pointer select-none hover:border-neutral-300 dark:hover:border-neutral-700 transition-colors"
    >
      <span className="text-xs text-neutral-700 dark:text-neutral-300 font-medium truncate">
        {label}
      </span>
      <div
        className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex items-center shrink-0 ${
          checked ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
        }`}
      >
        <motion.div
          layout
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          className={`w-3 h-3 rounded-full ${
            checked ? 'ml-auto bg-white dark:bg-neutral-900' : 'mr-auto bg-white dark:bg-neutral-400'
          }`}
        />
      </div>
    </div>
  );
}

interface PropSelectProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function PropSelect({ label, value, options, onChange }: PropSelectProps) {
  return (
    <div className="flex flex-col gap-1 p-2 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
      <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-medium truncate">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-transparent text-xs font-semibold text-neutral-800 dark:text-neutral-200 outline-none cursor-pointer py-0.5"
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white">
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

interface PropColorFieldProps {
  label: string;
  value: string;
  onChange: (newColor: string) => void;
}

function PropColorField({ label, value, onChange }: PropColorFieldProps) {
  const [mode, setMode] = useState<'hex' | 'rgb' | 'oklch'>('hex');

  let normalizedHex = '#000000';
  if (value.startsWith('#')) {
    normalizedHex = value;
  } else if (value.startsWith('rgb')) {
    const m = value.match(/\d+/g);
    if (m && m.length >= 3) {
      normalizedHex = rgbToHex(Number(m[0]), Number(m[1]), Number(m[2]));
    }
  } else if (value.startsWith('oklch')) {
    const m = value.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      const [r, g, b] = oklchToRgb(Number(m[0]), Number(m[1]), Number(m[2]));
      normalizedHex = rgbToHex(r, g, b);
    }
  }

  const [r, g, b] = hexToRgb(normalizedHex);
  const [okL, okC, okH] = rgbToOklch(r, g, b);

  const displayString =
    mode === 'hex'
      ? normalizedHex
      : mode === 'rgb'
      ? `rgb(${r}, ${g}, ${b})`
      : `oklch(${okL} ${okC} ${okH})`;

  const handleColorChange = (newHex: string) => {
    const [nr, ng, nb] = hexToRgb(newHex);
    if (mode === 'hex') {
      onChange(newHex);
    } else if (mode === 'rgb') {
      onChange(`rgb(${nr}, ${ng}, ${nb})`);
    } else {
      const [nl, nc, nh] = rgbToOklch(nr, ng, nb);
      onChange(`oklch(${nl} ${nc} ${nh})`);
    }
  };

  return (
    <div className="flex flex-col gap-2 p-2.5 rounded-xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-900/40">
      <div className="flex items-center justify-between">
        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-medium">
          {label}
        </span>
        <div className="flex items-center gap-1">
          {(['hex', 'rgb', 'oklch'] as const).map((fmt) => (
            <button
              key={fmt}
              onClick={() => setMode(fmt)}
              className={`px-1 rounded text-[9px] font-semibold uppercase ${
                mode === fmt
                  ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                  : 'text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200'
              }`}
            >
              {fmt}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <label className="relative w-7 h-7 rounded-lg border border-neutral-300 dark:border-neutral-700 cursor-pointer overflow-hidden shrink-0">
          <input
            type="color"
            value={normalizedHex}
            onChange={(e) => handleColorChange(e.target.value)}
            className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
          />
          <div className="w-full h-full" style={{ backgroundColor: normalizedHex }} />
        </label>

        <span className="font-mono text-xs text-neutral-800 dark:text-neutral-200 truncate flex-1">
          {displayString}
        </span>

        {/* Quick Swatches */}
        <div className="flex items-center gap-1 shrink-0">
          {['#000000', '#09111b', '#e2e2e5', '#ffffff'].map((sw) => (
            <button
              key={sw}
              onClick={() => handleColorChange(sw)}
              className="w-4 h-4 rounded border border-neutral-300 dark:border-neutral-700"
              style={{ backgroundColor: sw }}
              title={sw}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
