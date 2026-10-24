'use client';

import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
  type CSSProperties,
} from 'react';
import {
  createLiquidGlassLogoRenderer,
  liquidGlassLogoDefaults,
  liquidGlassLogoThemes,
  normalizeLiquidGlassLogo,
  type LiquidGlassLogoRenderer,
  type LiquidGlassLogoTuning,
} from './liquid-glass-logo-renderer';
import './liquid-glass-logo.css';

export type LiquidGlassLogoHandle = {
  replay: () => void;
  seek: (seconds: number) => void;
  pause: () => void;
  play: () => void;
};

export type LiquidGlassLogoProps = Partial<LiquidGlassLogoTuning> & {
  /** Height dimension of the logo container */
  height?: number | string;
  /** Image URL placed behind the fluid animation; converts the glass plate into a clear lens */
  backgroundImage?: string;
  /** Horizontal offset percentage (-100 to 100) for the background image */
  backgroundX?: number;
  /** Vertical offset percentage (-100 to 100) for the background image */
  backgroundY?: number;
  /** Scale factor (1 to 3) for the background image */
  backgroundScale?: number;
  /** Tint overlay color between background image and liquid glass */
  backgroundTint?: string;
  /** Opacity of the background tint overlay (0 to 1) */
  backgroundTintOpacity?: number;
  /** Optional soft ambient backlight glow around the fluid plate */
  glowEffect?: boolean;
  /** Enables click-to-replay interaction on the canvas */
  interactive?: boolean;
  /** Callback fired once the WebGL textures and shaders are fully compiled and ready */
  onReady?: () => void;
  /** Additional CSS class names */
  className?: string;
  /** Inline CSS styles */
  style?: CSSProperties;
  /** Accessible label description */
  'aria-label'?: string;
};

export const LiquidGlassLogo = forwardRef<LiquidGlassLogoHandle, LiquidGlassLogoProps>(
  function LiquidGlassLogo(
    {
      height,
      backgroundImage,
      backgroundX = 0,
      backgroundY = 0,
      backgroundScale = 1,
      backgroundTint = '#000000',
      backgroundTintOpacity = 0,
      glowEffect = false,
      interactive = false,
      onReady,
      className = '',
      style,
      'aria-label': ariaLabel,
      ...overrides
    },
    ref,
  ) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const engineRef = useRef<LiquidGlassLogoRenderer | null>(null);
    const [isReady, setIsReady] = useState(false);
    const [renderFallback, setRenderFallback] = useState(false);

    // Resolve environmental color theme
    const themePalette = liquidGlassLogoThemes[overrides.theme === 'light' ? 'light' : 'dark'];

    // Over background images, disable the solid opaque plate so lens optics are clear
    const activeTuning = normalizeLiquidGlassLogo({
      ...liquidGlassLogoDefaults,
      ...themePalette,
      ...overrides,
      ...(backgroundImage ? { tile: false } : {}),
    });

    const tuningSignature = JSON.stringify(activeTuning);
    const latestTuningRef = useRef(activeTuning);
    latestTuningRef.current = activeTuning;

    useImperativeHandle(
      ref,
      () => ({
        replay: () => engineRef.current?.replay(),
        seek: (seconds) => engineRef.current?.seek(seconds),
        pause: () => engineRef.current?.pause(),
        play: () => engineRef.current?.play(),
      }),
      [],
    );

    useEffect(() => {
      if (!canvasRef.current) return;
      let rendererInstance: LiquidGlassLogoRenderer | null = null;

      try {
        rendererInstance = createLiquidGlassLogoRenderer(canvasRef.current, latestTuningRef.current, () => {
          setIsReady(true);
          onReady?.();
        });
      } catch (err) {
        console.warn('LiquidGlass WebGL2 initialization failed:', err);
        rendererInstance = null;
      }

      if (!rendererInstance) {
        setRenderFallback(true);
      }

      engineRef.current = rendererInstance;

      return () => {
        rendererInstance?.dispose();
        engineRef.current = null;
      };
    }, []);

    // Push updated tuning props to active WebGL engine
    useEffect(() => {
      engineRef.current?.update(latestTuningRef.current);
    }, [tuningSignature]);

    const activeMarkSrc = activeTuning.mark === 'logo' ? activeTuning.logo : activeTuning.mark;
    const computedLabel = ariaLabel ?? (activeTuning.ending === 'logo' ? 'Logo' : activeTuning.text);

    return (
      <div
        className={`liquid-glass-container ${className}`.trim()}
        style={{
          height,
          background: activeTuning.background,
          cursor: interactive ? 'pointer' : undefined,
          ...style,
        }}
        role="img"
        aria-label={computedLabel}
        data-ready={isReady ? 'true' : 'false'}
        onClick={interactive ? () => engineRef.current?.replay() : undefined}
      >
        {/* Optional Ambient Glow Behind Glass */}
        {glowEffect && (
          <div
            className="liquid-glass-backdrop-ambient"
            style={{
              background: `radial-gradient(circle, ${activeTuning.logoColor} 0%, transparent 70%)`,
            }}
            aria-hidden="true"
          />
        )}

        {/* Custom Background Image & Tint Layer */}
        {backgroundImage && (
          <>
            <div
              className="liquid-glass-layer"
              aria-hidden="true"
              style={{
                backgroundImage: `url(${JSON.stringify(backgroundImage)})`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                transform: `translate(${Math.max(-100, Math.min(100, backgroundX))}%, ${Math.max(-100, Math.min(100, backgroundY))}%) scale(${Math.max(1, Math.min(3, backgroundScale))})`,
              }}
            />
            <div
              className="liquid-glass-layer"
              aria-hidden="true"
              style={{
                backgroundColor: backgroundTint,
                opacity: Math.max(0, Math.min(1, backgroundTintOpacity)),
              }}
            />
          </>
        )}

        {/* WebGL2 Accelerated Simulation Canvas */}
        <canvas ref={canvasRef} aria-hidden="true" />

        {/* Accessible Fallback Graphic */}
        {renderFallback && (
          <div
            className="liquid-glass-fallback-view"
            aria-hidden="true"
            style={{
              color: activeTuning.textColor,
              fontFamily: activeTuning.fontFamily,
              fontWeight: activeTuning.fontWeight,
              fontSize: activeTuning.fontSize,
              letterSpacing: `${activeTuning.letterSpacing}em`,
              gap: `${activeTuning.markGap}em`,
            }}
          >
            {activeTuning.ending === 'logo' ? (
              <img
                src={activeTuning.logo}
                alt=""
                style={{
                  width: activeTuning.logoSize * activeTuning.logoScale * activeTuning.finalLogoScale,
                  height: activeTuning.logoSize * activeTuning.logoScale * activeTuning.finalLogoScale,
                  maxWidth: '80%',
                  maxHeight: '80%',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <>
                {activeMarkSrc && <img src={activeMarkSrc} alt="" />}
                {activeTuning.text}
              </>
            )}
          </div>
        )}
      </div>
    );
  },
);
