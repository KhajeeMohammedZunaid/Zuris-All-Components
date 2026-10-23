'use client';

import React, { useState, useRef, useEffect, ChangeEvent, useCallback } from 'react';
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

// Preset Logos
const NIKE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M21.71 6.36c-2.45 2.5-6.72 6.58-12.87 11.02-2.18 1.57-4.22 2.37-6.08 2.37-1.43 0-2.31-.53-2.61-1.57-.35-1.22.42-2.89 2.27-4.96C4.46 10.95 7.4 8.7 11.16 6.54c2.8-1.61 5.38-2.66 7.69-3.13 1.94-.4 3.03-.23 3.25.5.21.71-.05 1.57-.39 2.45z"/></svg>'
)}`;

const APPLE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.92-2.87-.9.04-1.99.6-2.63 1.35-.58.65-1.08 1.73-.95 2.76.99.08 2.03-.51 2.66-1.24z"/></svg>'
)}`;

// -------------------------------------------------------------
// COLOR CONVERSION HELPERS (HEX <-> RGB <-> OKLCH)
// -------------------------------------------------------------
function hexToRgb(hex: string): [number, number, number] {
  let c = hex.replace('#', '').trim();
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  if (c.length !== 6) return [0, 0, 0];
  const num = parseInt(c, 16);
  return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  const toHex = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n))).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function rgbToOklch(r: number, g: number, b: number): [number, number, number] {
  const lin = (v: number) => {
    v /= 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  };
  const lr = lin(r), lg = lin(g), lb = lin(b);
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

  const delin = (v: number) => {
    v = Math.max(0, Math.min(1, v));
    return Math.round(
      (v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055) * 255
    );
  };

  return [delin(rLin), delin(gLin), delin(bLin)];
}

export function LiquidGlassStudio() {
  const logoRef = useRef<LiquidGlassLogoHandle>(null);
  const { theme: appTheme, setTheme: setAppTheme, resolvedTheme } = useTheme();

  // Logo settings
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [logoChoice, setLogoChoice] = useState<'Nike' | 'Apple' | 'Music' | 'Custom'>('Music');
  const [customLogoUrl, setCustomLogoUrl] = useState<string>('');
  const [originalColors, setOriginalColors] = useState(false);
  const [tileSize, setTileSize] = useState(256);
  const [logoScale, setLogoScale] = useState(0.72);
  const [finalLogoScale, setFinalLogoScale] = useState(1);
  const [logoRelief, setLogoRelief] = useState(1);
  const [iconPlate, setIconPlate] = useState(true);

  // Glass settings
  const [depth, setDepth] = useState(2.9);
  const [dispersion, setDispersion] = useState(1);
  const [relief, setRelief] = useState(1); // Double bevel
  const [caustics, setCaustics] = useState(1);
  const [highlights, setHighlights] = useState(1);
  const [echoTint, setEchoTint] = useState(0.5); // Echo plate tint
  const [innerWallFocus, setInnerWallFocus] = useState(0);
  const [bloom, setBloom] = useState(0.55); // Light diffusion
  const [logoColor, setLogoColor] = useState('#09111b');
  const [plateColor, setPlateColor] = useState('#e4e6ea');
  const [backgroundColor, setBackgroundColor] = useState('#e2e2e5');

  // Background Image
  const [backgroundImage, setBackgroundImage] = useState<string | undefined>(undefined);

  // Motion settings
  const [dropStrength, setDropStrength] = useState(1);
  const [decay, setDecay] = useState(1.4); // Ring decay (s)
  const [speed, setSpeed] = useState(1);
  const [loopDelay, setLoopDelay] = useState(1.6);
  const [loop, setLoop] = useState(true); // Loop enabled by default so glass ripples continuously while tuning
  const [paused, setPaused] = useState(false);

  // Export video settings
  const [format, setFormat] = useState('MP4');
  const [aspectRatio, setAspectRatio] = useState('16:9');
  const [resolution, setResolution] = useState('1080p');
  const [frameRate, setFrameRate] = useState('60 fps');
  const [isExporting, setIsExporting] = useState(false);

  // Sync theme changes with default colors
  useEffect(() => {
    const t = liquidGlassLogoThemes[theme];
    if (t) {
      setLogoColor(t.logoColor);
      setPlateColor(t.tileColor);
      setBackgroundColor(t.background);
    }
  }, [theme]);

  // Sync with next-themes system/user preference
  useEffect(() => {
    if (resolvedTheme === 'dark' || resolvedTheme === 'light') {
      setTheme(resolvedTheme);
    }
  }, [resolvedTheme]);

  // Resolve current active logo
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

  const handleExportVideo = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`Exporting ${resolution} ${format} video at ${frameRate} (${aspectRatio})`);
    }, 1200);
  };

  // Replay animation whenever relevant optical/motion/logo props change so changes are immediately visible
  const triggerReplay = useCallback(() => {
    if (logoRef.current) {
      logoRef.current.replay();
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#fbfbfb] dark:bg-[#09090b] text-[#111827] dark:text-neutral-100 flex flex-col items-center py-6 px-4 sm:px-6 lg:px-8 overflow-x-hidden transition-colors duration-200">
      {/* Live Preview Stage - Fluid max-w-[866px] with viewport preserved */}
      <div className="w-full max-w-[866px] mb-6 flex justify-center">
        <div className="relative w-full h-[460px] rounded-2xl overflow-hidden border border-neutral-200/90 dark:border-neutral-800 shadow-sm bg-neutral-900 flex items-center justify-center">
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
          />

          {/* Quick controls on preview overlay */}
          <div className="absolute bottom-3 right-3 flex items-center gap-2 z-20">
            <button
              onClick={() => logoRef.current?.replay()}
              className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/20 transition-all active:scale-95 flex items-center gap-1.5 shadow-sm"
              title="Replay animation"
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
              className="px-3 py-1.5 bg-black/60 hover:bg-black/80 backdrop-blur-md text-white text-xs font-medium rounded-lg border border-white/20 transition-all active:scale-95 shadow-sm"
            >
              {paused ? 'Play' : 'Pause'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Inspector Container - Locked to max-w-[866px] with full theme compatibility */}
      <div className="w-full max-w-[866px] bg-white dark:bg-[#121215] border border-[#e5e5e7] dark:border-neutral-800 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col gap-7 transition-colors duration-200">
        
        {/* Top Dropzones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <input
            ref={bgInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleBgUpload}
          />
          <div
            onClick={() => bgInputRef.current?.click()}
            className="group relative border border-dashed border-[#d1d5db] dark:border-neutral-700/80 hover:border-neutral-400 dark:hover:border-neutral-500 bg-[#f9fafb] dark:bg-neutral-900/50 hover:bg-[#f3f4f6] dark:hover:bg-neutral-800/60 rounded-xl p-4 flex items-center gap-3.5 cursor-pointer transition-colors"
          >
            <div className="w-11 h-11 rounded-lg border border-[#e5e7eb] dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 shadow-2xs transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Background</span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Drop an image or click</span>
            </div>
            {backgroundImage && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setBackgroundImage(undefined);
                }}
                className="ml-auto text-[10px] text-neutral-500 dark:text-neutral-400 hover:text-red-500 dark:hover:text-red-400 font-medium px-2 py-1 rounded bg-neutral-200/60 dark:bg-neutral-700"
              >
                Clear
              </button>
            )}
          </div>

          <input
            ref={logoInputRef}
            type="file"
            accept="image/svg+xml,image/png"
            className="hidden"
            onChange={handleLogoUpload}
          />
          <div
            onClick={() => logoInputRef.current?.click()}
            className="group relative border border-dashed border-[#d1d5db] dark:border-neutral-700/80 hover:border-neutral-400 dark:hover:border-neutral-500 bg-[#f9fafb] dark:bg-neutral-900/50 hover:bg-[#f3f4f6] dark:hover:bg-neutral-800/60 rounded-xl p-4 flex items-center gap-3.5 cursor-pointer transition-colors"
          >
            <div className="w-11 h-11 rounded-lg border border-[#e5e7eb] dark:border-neutral-700 bg-white dark:bg-neutral-800 flex items-center justify-center text-neutral-600 dark:text-neutral-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100 group-hover:border-neutral-300 dark:group-hover:border-neutral-600 shadow-2xs transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.75} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-neutral-900 dark:text-neutral-100">Logo</span>
              <span className="text-[11px] text-neutral-500 dark:text-neutral-400">SVG or PNG · drop or click</span>
            </div>
            {logoChoice === 'Custom' && (
              <span className="ml-auto text-[10px] text-emerald-600 dark:text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
                Custom
              </span>
            )}
          </div>
        </div>

        {/* SECTION 1: LOGO */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Logo</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {/* Theme Select */}
            <SelectPill
              label="Theme"
              value={theme === 'light' ? 'Light' : 'Dark'}
              options={['Light', 'Dark']}
              onChange={(val) => {
                const nextT = val.toLowerCase() as 'light' | 'dark';
                setTheme(nextT);
                setAppTheme(nextT);
                triggerReplay();
              }}
            />

            {/* Logo Select */}
            <SelectPill
              label="Logo"
              value={logoChoice}
              options={['Music', 'Nike', 'Apple', ...(customLogoUrl ? ['Custom'] : [])]}
              onChange={(val) => {
                setLogoChoice(val as 'Nike' | 'Apple' | 'Music' | 'Custom');
                triggerReplay();
              }}
            />

            {/* Original Colors Toggle */}
            <TogglePill
              label="Original colors"
              checked={originalColors}
              onChange={(val) => {
                setOriginalColors(val);
                triggerReplay();
              }}
            />

            {/* Tile size (px) */}
            <NumberPill
              label="Tile size (px)"
              value={tileSize}
              min={64}
              max={512}
              step={1}
              onChange={(val) => {
                setTileSize(val);
                triggerReplay();
              }}
            />

            {/* Logo scale */}
            <NumberPill
              label="Logo scale"
              value={logoScale}
              min={0.1}
              max={1}
              step={0.01}
              onChange={(val) => {
                setLogoScale(val);
                triggerReplay();
              }}
            />

            {/* Final logo scale */}
            <NumberPill
              label="Final logo scale"
              value={finalLogoScale}
              min={0.1}
              max={1}
              step={0.01}
              onChange={(val) => {
                setFinalLogoScale(val);
                triggerReplay();
              }}
            />

            {/* Logo relief */}
            <NumberPill
              label="Logo relief"
              value={logoRelief}
              min={0}
              max={1}
              step={0.05}
              onChange={(val) => {
                setLogoRelief(val);
                triggerReplay();
              }}
            />

            {/* Icon plate Toggle */}
            <TogglePill
              label="Icon plate"
              checked={iconPlate}
              onChange={(val) => {
                setIconPlate(val);
                triggerReplay();
              }}
            />
          </div>
        </div>

        {/* SECTION 2: GLASS */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Glass</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {/* Optical depth */}
            <NumberPill
              label="Optical depth"
              value={depth}
              min={0}
              max={6}
              step={0.1}
              onChange={(val) => {
                setDepth(val);
                triggerReplay();
              }}
            />

            {/* Dispersion */}
            <NumberPill
              label="Dispersion"
              value={dispersion}
              min={0}
              max={4}
              step={0.1}
              onChange={(val) => {
                setDispersion(val);
                triggerReplay();
              }}
            />

            {/* Double bevel */}
            <NumberPill
              label="Double bevel"
              value={relief}
              min={0}
              max={3}
              step={0.1}
              onChange={(val) => {
                setRelief(val);
                triggerReplay();
              }}
            />

            {/* Caustics */}
            <NumberPill
              label="Caustics"
              value={caustics}
              min={0}
              max={4}
              step={0.1}
              onChange={(val) => {
                setCaustics(val);
                triggerReplay();
              }}
            />

            {/* Highlights */}
            <NumberPill
              label="Highlights"
              value={highlights}
              min={0}
              max={4}
              step={0.1}
              onChange={(val) => {
                setHighlights(val);
                triggerReplay();
              }}
            />

            {/* Echo plate tint */}
            <NumberPill
              label="Echo plate tint"
              value={echoTint}
              min={0}
              max={1}
              step={0.05}
              onChange={(val) => {
                setEchoTint(val);
                triggerReplay();
              }}
            />

            {/* Inner wall focus */}
            <NumberPill
              label="Inner wall focus"
              value={innerWallFocus}
              min={0}
              max={1}
              step={0.05}
              onChange={(val) => {
                setInnerWallFocus(val);
                triggerReplay();
              }}
            />

            {/* Light diffusion */}
            <NumberPill
              label="Light diffusion"
              value={bloom}
              min={0}
              max={2}
              step={0.05}
              onChange={(val) => {
                setBloom(val);
                triggerReplay();
              }}
            />

            {/* Logo color - with HEX, RGB, OKLCH support */}
            <ColorPill
              label="Logo color"
              value={logoColor}
              onChange={(val) => {
                setLogoColor(val);
                triggerReplay();
              }}
            />

            {/* Plate color - with HEX, RGB, OKLCH support */}
            <ColorPill
              label="Plate color"
              value={plateColor}
              onChange={(val) => {
                setPlateColor(val);
                triggerReplay();
              }}
            />

            {/* Background - with HEX, RGB, OKLCH support */}
            <ColorPill
              label="Background"
              value={backgroundColor}
              onChange={(val) => {
                setBackgroundColor(val);
                triggerReplay();
              }}
            />
          </div>
        </div>

        {/* SECTION 3: MOTION */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Motion</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {/* Drop strength */}
            <NumberPill
              label="Drop strength"
              value={dropStrength}
              min={0}
              max={4}
              step={0.1}
              onChange={(val) => {
                setDropStrength(val);
                triggerReplay();
              }}
            />

            {/* Ring decay (s) */}
            <NumberPill
              label="Ring decay (s)"
              value={decay}
              min={0.1}
              max={5}
              step={0.1}
              onChange={(val) => {
                setDecay(val);
                triggerReplay();
              }}
            />

            {/* Speed */}
            <NumberPill
              label="Speed"
              value={speed}
              min={0.1}
              max={3}
              step={0.1}
              onChange={(val) => {
                setSpeed(val);
                triggerReplay();
              }}
            />

            {/* Loop delay (s) */}
            <NumberPill
              label="Loop delay (s)"
              value={loopDelay}
              min={0}
              max={10}
              step={0.2}
              onChange={(val) => {
                setLoopDelay(val);
                triggerReplay();
              }}
            />

            {/* Loop Toggle */}
            <TogglePill
              label="Loop"
              checked={loop}
              onChange={(val) => {
                setLoop(val);
                if (val && logoRef.current) logoRef.current.play();
              }}
            />

            {/* Paused Toggle */}
            <TogglePill
              label="Paused"
              checked={paused}
              onChange={(val) => {
                setPaused(val);
                if (val) logoRef.current?.pause();
                else logoRef.current?.play();
              }}
            />
          </div>
        </div>

        {/* SECTION 4: EXPORT VIDEO */}
        <div className="flex flex-col gap-3">
          <h3 className="text-xs font-bold text-neutral-900 dark:text-neutral-100 tracking-tight">Export video</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
            {/* Format */}
            <SelectPill
              label="Format"
              value={format}
              options={['MP4', 'WebM', 'GIF', 'ProRes']}
              onChange={setFormat}
            />

            {/* Aspect ratio */}
            <SelectPill
              label="Aspect ratio"
              value={aspectRatio}
              options={['16:9', '1:1', '9:16', '4:3']}
              onChange={setAspectRatio}
            />

            {/* Resolution */}
            <SelectPill
              label="Resolution"
              value={resolution}
              options={['720p', '1080p', '2K', '4K']}
              onChange={setResolution}
            />

            {/* Frame rate */}
            <SelectPill
              label="Frame rate"
              value={frameRate}
              options={['24 fps', '30 fps', '60 fps', '120 fps']}
              onChange={setFrameRate}
            />
          </div>

          {/* Download Action */}
          <div className="w-full flex items-center justify-between border border-[#e4e4e7] dark:border-neutral-800 rounded-lg bg-[#f4f4f5] dark:bg-[#1a1a1e] px-3.5 py-1.5 min-h-[42px] mt-1 transition-colors">
            <span className="text-xs text-neutral-600 dark:text-neutral-400 font-normal">Download</span>
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleExportVideo}
              disabled={isExporting}
              className="px-6 py-1.5 bg-white dark:bg-neutral-800 hover:bg-neutral-50 dark:hover:bg-neutral-700 active:bg-neutral-100 dark:active:bg-neutral-600 text-neutral-900 dark:text-neutral-100 text-xs font-medium rounded-md border border-neutral-300 dark:border-neutral-700 shadow-2xs transition-all flex items-center justify-center min-w-[140px]"
            >
              {isExporting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin w-3 h-3 text-neutral-800 dark:text-neutral-200" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                  Exporting...
                </span>
              ) : (
                'Export video'
              )}
            </motion.button>
          </div>
        </div>

      </div>
    </div>
  );
}

// -------------------------------------------------------------
// MICRO-COMPONENTS MATCHING DIALKIT SPECIFICATION & AESTHETICS
// -------------------------------------------------------------

interface NumberPillProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (val: number) => void;
}

function NumberPill({ label, value, min, max, step, onChange }: NumberPillProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [tempVal, setTempVal] = useState(String(value));
  const isDragging = useRef(false);
  const startX = useRef(0);
  const startVal = useRef(value);

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

  // DialKit horizontal scrub interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    if (isEditing) return;
    isDragging.current = true;
    startX.current = e.clientX;
    startVal.current = value;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - startX.current;
    const sensitivity = (max - min) / 240; // 240px drag covers full range
    const nextVal = startVal.current + deltaX * sensitivity;
    const clamped = Math.max(min, Math.min(max, nextVal));
    const stepped = Math.round(clamped / step) * step;
    onChange(Number(stepped.toFixed(3)));
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (isDragging.current) {
      isDragging.current = false;
      try {
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
      } catch {}
    }
  };

  // Calculate percentage fill for subtle slider progress bar
  const pct = Math.max(0, Math.min(100, ((value - min) / (max - min)) * 100));

  return (
    <div
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className="relative flex items-center justify-between h-9 px-3 bg-[#f4f4f5] dark:bg-[#1e1e22] border border-[#e4e4e7] dark:border-[#2e2e34] rounded-lg select-none hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-ew-resize overflow-hidden"
    >
      {/* Subtle DialKit progress track fill */}
      <div
        className="absolute inset-y-0 left-0 bg-neutral-200/40 dark:bg-neutral-700/40 pointer-events-none transition-all duration-75"
        style={{ width: `${pct}%` }}
      />

      <span className="relative z-10 text-xs text-neutral-600 dark:text-neutral-400 font-normal truncate mr-2 pointer-events-none">
        {label}
      </span>
      <div className="relative z-10 flex items-center gap-1.5 border-l border-neutral-200/90 dark:border-neutral-700/80 pl-3">
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
            className="w-14 text-right text-xs font-medium text-neutral-900 dark:text-neutral-100 bg-white dark:bg-neutral-900 px-1 py-0.5 rounded border border-neutral-300 dark:border-neutral-700 outline-none cursor-text"
          />
        ) : (
          <span
            onDoubleClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="text-xs font-medium text-neutral-900 dark:text-neutral-100 cursor-ew-resize min-w-[32px] text-right hover:text-neutral-600 dark:hover:text-neutral-300"
            title="Drag horizontally to adjust or double-click to type"
          >
            {value}
          </span>
        )}
      </div>
    </div>
  );
}

interface TogglePillProps {
  label: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

function TogglePill({ label, checked, onChange }: TogglePillProps) {
  return (
    <div
      onClick={() => onChange(!checked)}
      className="flex items-center justify-between h-9 px-3 bg-[#f4f4f5] dark:bg-[#1e1e22] border border-[#e4e4e7] dark:border-[#2e2e34] rounded-lg select-none cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
    >
      <span className="text-xs text-neutral-600 dark:text-neutral-400 font-normal truncate mr-2">{label}</span>
      <div className="flex items-center border-l border-neutral-200/90 dark:border-neutral-700/80 pl-3">
        <div
          className={`w-8 h-4 rounded-full p-0.5 transition-colors duration-200 flex items-center ${
            checked ? 'bg-neutral-900 dark:bg-white' : 'bg-neutral-300 dark:bg-neutral-700'
          }`}
        >
          <motion.div
            layout
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            className={`w-3 h-3 rounded-full shadow-2xs ${
              checked ? 'ml-auto bg-white dark:bg-neutral-900' : 'mr-auto bg-white dark:bg-neutral-400'
            }`}
          />
        </div>
      </div>
    </div>
  );
}

interface SelectPillProps {
  label: string;
  value: string;
  options: string[];
  onChange: (val: string) => void;
}

function SelectPill({ label, value, options, onChange }: SelectPillProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between h-9 px-3 bg-[#f4f4f5] dark:bg-[#1e1e22] border border-[#e4e4e7] dark:border-[#2e2e34] rounded-lg select-none cursor-pointer hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors"
      >
        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-normal truncate mr-2">{label}</span>
        <div className="flex items-center gap-1.5 border-l border-neutral-200/90 dark:border-neutral-700/80 pl-3">
          <span className="text-xs font-medium text-neutral-900 dark:text-neutral-100">{value}</span>
          <svg
            className={`w-3.5 h-3.5 text-neutral-500 dark:text-neutral-400 transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.12 }}
            className="absolute top-full mt-1 right-0 w-36 bg-white dark:bg-[#1c1c20] border border-neutral-200 dark:border-neutral-800 rounded-lg shadow-lg py-1 z-50 overflow-hidden"
          >
            {options.map((opt) => (
              <div
                key={opt}
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`px-3 py-1.5 text-xs cursor-pointer flex items-center justify-between hover:bg-neutral-100 dark:hover:bg-neutral-800/70 transition-colors ${
                  opt === value
                    ? 'font-semibold text-neutral-900 dark:text-neutral-100 bg-neutral-50 dark:bg-neutral-800'
                    : 'text-neutral-700 dark:text-neutral-300'
                }`}
              >
                <span>{opt}</span>
                {opt === value && (
                  <svg className="w-3.5 h-3.5 text-neutral-900 dark:text-neutral-100" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// -------------------------------------------------------------
// DIALKIT-INSPIRED COLOR PILL SUPPORTING HEX, RGB & OKLCH
// -------------------------------------------------------------

interface ColorPillProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
}

function ColorPill({ label, value, onChange }: ColorPillProps) {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'hex' | 'rgb' | 'oklch'>('hex');
  const containerRef = useRef<HTMLDivElement>(null);

  // Normalize incoming color to hex for the native color picker and math
  let currentHex = '#000000';
  if (value.startsWith('#')) {
    currentHex = value;
  } else if (value.startsWith('rgb')) {
    const m = value.match(/\d+/g);
    if (m && m.length >= 3) {
      currentHex = rgbToHex(Number(m[0]), Number(m[1]), Number(m[2]));
    }
  } else if (value.startsWith('oklch')) {
    const m = value.match(/[\d.]+/g);
    if (m && m.length >= 3) {
      const [r, g, b] = oklchToRgb(Number(m[0]), Number(m[1]), Number(m[2]));
      currentHex = rgbToHex(r, g, b);
    }
  }

  const [r, g, b] = hexToRgb(currentHex);
  const [okL, okC, okH] = rgbToOklch(r, g, b);

  // Format displayed string according to selected mode
  const displayString =
    mode === 'hex'
      ? currentHex
      : mode === 'rgb'
      ? `rgb(${r}, ${g}, ${b})`
      : `oklch(${okL} ${okC} ${okH})`;

  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

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
    <div ref={containerRef} className="relative">
      <div
        onClick={() => setOpen(!open)}
        className="relative flex items-center justify-between h-9 px-3 bg-[#f4f4f5] dark:bg-[#1e1e22] border border-[#e4e4e7] dark:border-[#2e2e34] rounded-lg select-none hover:border-neutral-300 dark:hover:border-neutral-600 transition-colors cursor-pointer"
      >
        <span className="text-xs text-neutral-600 dark:text-neutral-400 font-normal truncate mr-2">{label}</span>
        <div className="flex items-center gap-2 border-l border-neutral-200/90 dark:border-neutral-700/80 pl-3">
          <span className="text-[11px] font-mono font-medium text-neutral-800 dark:text-neutral-200 truncate max-w-[84px]">
            {displayString}
          </span>
          <div
            className="w-4 h-4 rounded border border-black/15 dark:border-white/20 shadow-2xs cursor-pointer shrink-0"
            style={{ backgroundColor: currentHex }}
          />
        </div>
      </div>

      {/* DialKit-Inspired Color Popover with HEX / RGB / OKLCH Modes */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -4 }}
            transition={{ duration: 0.14 }}
            className="absolute top-full mt-1.5 right-0 w-64 bg-white dark:bg-[#1c1c20] border border-neutral-200/90 dark:border-neutral-800 rounded-xl shadow-xl p-3 z-50 flex flex-col gap-3"
          >
            {/* Format Switcher: HEX | OKLCH | RGB */}
            <div className="grid grid-cols-3 gap-1 bg-neutral-100 dark:bg-neutral-800 p-0.5 rounded-lg text-[10px] font-semibold text-neutral-600 dark:text-neutral-400">
              {(['hex', 'oklch', 'rgb'] as const).map((fmt) => (
                <button
                  key={fmt}
                  onClick={(e) => {
                    e.stopPropagation();
                    setMode(fmt);
                    // Emit in the new format immediately
                    if (fmt === 'hex') onChange(currentHex);
                    else if (fmt === 'rgb') onChange(`rgb(${r}, ${g}, ${b})`);
                    else onChange(`oklch(${okL} ${okC} ${okH})`);
                  }}
                  className={`py-1 rounded text-center uppercase transition-all ${
                    mode === fmt
                      ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-2xs'
                      : 'hover:text-neutral-900 dark:hover:text-neutral-100'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>

            {/* Native Color Picker Trigger & Swatch */}
            <div className="flex items-center gap-2">
              <label className="relative flex items-center justify-center w-full h-8 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden cursor-pointer shadow-2xs">
                <input
                  type="color"
                  value={currentHex}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                />
                <div
                  className="w-full h-full flex items-center justify-center text-[11px] font-mono font-medium"
                  style={{
                    backgroundColor: currentHex,
                    color: (r * 0.299 + g * 0.587 + b * 0.114) > 140 ? '#000000' : '#ffffff',
                  }}
                >
                  Click to pick
                </div>
              </label>
            </div>

            {/* Quick Swatches */}
            <div className="flex items-center justify-between gap-1 pt-1 border-t border-neutral-100 dark:border-neutral-800">
              {['#000000', '#09111b', '#ffffff', '#e4e6ea', '#e2e2e5', '#3b82f6', '#ef4444'].map((sw) => (
                <button
                  key={sw}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleColorChange(sw);
                  }}
                  className="w-5 h-5 rounded-md border border-neutral-300/80 dark:border-neutral-700 shadow-2xs hover:scale-110 active:scale-95 transition-transform"
                  style={{ backgroundColor: sw }}
                  title={sw}
                />
              ))}
            </div>

            {/* Raw Input Display */}
            <input
              type="text"
              value={displayString}
              onChange={(e) => {
                const text = e.target.value.trim();
                onChange(text);
              }}
              className="w-full text-[11px] font-mono px-2 py-1 rounded bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 outline-none focus:border-neutral-400 dark:focus:border-neutral-500"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
