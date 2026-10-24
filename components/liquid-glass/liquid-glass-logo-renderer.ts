/**
 * Liquid Glass Simulation & WebGL 2.0 Optical Engine
 *
 * High-performance fluid simulation pipeline rendering physical caustics,
 * spectral dispersion, superelliptic signed distance fields, and photorealistic
 * photographic light bloom onto arbitrary vector or bitmap artwork.
 */

import {
  liquidGlassLogoComposite,
  liquidGlassLogoRender,
  liquidGlassLogoVertex,
} from './liquid-glass-logo-shaders';

export type LiquidGlassLogoTuning = {
  /** Source URL (SVG, PNG, data URI) for the primary mark / logo */
  logo: string;
  /** Secondary insignia displayed adjacent to the wordmark; "logo" reuses the primary mark */
  mark: string;
  /** Primary typographic wordmark label */
  text: string;
  /** Visual sequence conclusion: 'logo' isolates the central emblem, 'wordmark' resolves the complete typography */
  ending: 'logo' | 'wordmark';
  /** Base lens bounding dimension in virtual CSS pixels */
  logoSize: number;
  /** Relative scale of the logo graphic within the plate bounds */
  logoScale: number;
  /** Final resting scale of the emblem after liquid settling */
  finalLogoScale: number;
  /** Renders the translucent glass bounding tile plate behind the artwork */
  tile: boolean;
  /** Wordmark typographic font size in pixels */
  fontSize: number;
  /** Font family stack for wordmark text rendering */
  fontFamily: string;
  /** Typographic font weight (100–1000) */
  fontWeight: number;
  /** Typographic font stretch keyword (e.g. 'normal', 'expanded') */
  fontStretch: string;
  /** Typographic letter spacing in em units */
  letterSpacing: number;
  /** Gap between the insignia mark and wordmark text in em units */
  markGap: number;
  /** Active environmental color scheme ('dark' | 'light') */
  theme: 'dark' | 'light';
  /** Silhouette recoloring target ('original' preserves source pixels) */
  logoColor: string;
  /** Alpha silhouette embossing relief intensity (0 = flat, 1 = maximum curvature) */
  logoRelief: number;
  /** Wordmark typographic fill color */
  textColor: string;
  /** Glass tile body color tone */
  tileColor: string;
  /** Background canvas container color */
  background: string;
  /** Physical optical thickness / refractive depth */
  depth: number;
  /** Wavelength refractive dispersion split index */
  dispersion: number;
  /** Bevel intensity and secondary interior wall reflection prominence */
  relief: number;
  /** Caustic light concentration brightness */
  caustics: number;
  /** Specular highlight reflection intensity */
  highlights: number;
  /** Optical bloom and light spill diffusion */
  bloom: number;
  /** Initial wordmark droplet aperture radius relative to plate bounds */
  dropSize: number;
  /** Fluid droplet curvature and surface tension strength */
  dropStrength: number;
  /** Outer boundary echo line plate tint absorption (0–1) */
  echoTint: number;
  /** Polar orientation focus of interior rim highlights (0 = uniform, 1 = diagonal) */
  innerWallFocus: number;
  /** Exponential decay duration of fluid ripples in seconds */
  decay: number;
  /** Animation playback rate multiplier */
  speed: number;
  /** Loops fluid animation continuously */
  loop: boolean;
  /** Rest delay before restarting looped cycle in seconds */
  loopDelay: number;
  /** Simulation playback pause state */
  paused: boolean;
  /** Maximum rendering device pixel ratio constraint */
  maxDpr: number;
};

// Preset SVGs
const DEFAULT_NOTE_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 96 104"><path fill="#fff" d="M35 24c0-2.6 1.7-4.8 4.2-5.5L79.6 7.6C82.6 6.8 85 9 85 12.1V64c0 8.9-7.3 17-16.5 19.2C59.3 85.4 52 81 52 73.2c0-9 7.5-16.9 16.7-19.1 3.3-.8 6.3-.9 8.3-.2V28.8L43 38.1V77c0 8.9-7.3 17-16.5 19.2C17.3 98.4 10 94 10 86.2c0-9 7.5-16.9 16.7-19.1 3.3-.8 6.3-.9 8.3-.2V24Z"/></svg>',
)}`;

const DEFAULT_REFERENCE_MARK = `data:image/svg+xml;utf8,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#fff"><path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"/></svg>',
)}`;

export const liquidGlassLogoNoteLogo = DEFAULT_NOTE_LOGO;
export const liquidGlassLogoReferenceMark = DEFAULT_REFERENCE_MARK;

export const liquidGlassLogoDefaults: LiquidGlassLogoTuning = {
  logo: DEFAULT_NOTE_LOGO,
  mark: DEFAULT_REFERENCE_MARK,
  text: 'music',
  ending: 'logo',
  logoSize: 256,
  logoScale: 0.72,
  finalLogoScale: 1,
  tile: true,
  fontSize: 64,
  fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontWeight: 850,
  fontStretch: 'expanded',
  letterSpacing: -0.01,
  markGap: 0.12,
  theme: 'dark',
  logoColor: '#ffffff',
  logoRelief: 1,
  textColor: '#e2e6ee',
  tileColor: '#060c18',
  background: '#000000',
  depth: 1.2,
  dispersion: 1,
  relief: 1,
  caustics: 1,
  highlights: 1,
  bloom: 0.55,
  dropSize: 0.32,
  dropStrength: 1,
  echoTint: 0.5,
  innerWallFocus: 0,
  decay: 1.4,
  speed: 1,
  loop: false,
  loopDelay: 1.6,
  paused: false,
  maxDpr: 2,
};

/** Pre-calibrated environmental color palettes */
export const liquidGlassLogoThemes = {
  dark: {
    logoColor: '#ffffff',
    textColor: '#e2e6ee',
    tileColor: '#060c18',
    background: '#000000',
  },
  light: {
    logoColor: '#09111b',
    textColor: '#09111b',
    tileColor: '#e4e6ea',
    background: '#e2e2e5',
  },
} as const satisfies Record<LiquidGlassLogoTuning['theme'], Partial<LiquidGlassLogoTuning>>;

/** Duration of the full choreographed sequence at 1x speed */
export const liquidGlassLogoDuration = 3.3;
export const LOGO_FINISH_TIMESTAMP = 1.8;

// Catmull-Rom Cubic Hermite Spline Interpolator
type KeyframeTuple = readonly [time: number, val: number];
type KeyframeCurve = readonly KeyframeTuple[];

class HermiteSplineTimeline {
  static evaluate(keys: KeyframeCurve, time: number): number {
    if (time <= keys[0][0]) return keys[0][1];
    const lastKey = keys[keys.length - 1];
    if (time >= lastKey[0]) return lastKey[1];

    let idx = 0;
    while (time > keys[idx + 1][0]) idx++;

    const [t1, v1] = keys[idx];
    const [t2, v2] = keys[idx + 1];
    const [t0, v0] = keys[idx - 1] ?? [t1 - (t2 - t1), v1];
    const [t3, v3] = keys[idx + 2] ?? [t2 + (t2 - t1), v2];

    const span = t2 - t1;
    const m1 = ((v2 - v0) / (t2 - t0)) * span;
    const m2 = ((v3 - v1) / (t3 - t1)) * span;
    const progress = (time - t1) / span;
    const p2 = progress * progress;
    const p3 = p2 * progress;

    return (
      (2 * p3 - 3 * p2 + 1) * v1 +
      (p3 - 2 * p2 + progress) * m1 +
      (-2 * p3 + 3 * p2) * v2 +
      (p3 - p2) * m2
    );
  }
}

// Physical Spline Animation Curves
const CURVE_ARTWORK_SCALE: KeyframeCurve = [
  [0.12, 1.4],
  [0.33, 1.45],
  [0.46, 1.44],
  [0.63, 1.33],
  [0.79, 1.24],
  [0.96, 1.2],
  [1.13, 1.11],
  [1.25, 1.0],
  [1.335, 0.865],
  [1.376, 0.81],
  [1.418, 0.735],
  [1.46, 0.41],
];

const CURVE_DROP_RADIUS: KeyframeCurve = [
  [1.46, 0.32],
  [1.55, 0.36],
  [1.67, 0.49],
  [1.75, 0.52],
  [1.84, 0.56],
  [1.92, 0.68],
  [2.0, 0.88],
  [2.15, 0.95],
  [2.4, 1.06],
  [2.95, 1.3],
];

const CURVE_DROP_CORE: KeyframeCurve = [
  [1.46, 1.5],
  [1.84, 1.5],
  [1.92, 0.55],
  [2.0, 0.6],
  [2.09, 0.68],
  [2.17, 0.78],
  [2.3, 0.85],
  [2.5, 0.9],
  [2.75, 0.93],
  [2.95, 0.97],
  [3.02, 1.03],
];

const CURVE_DROP_STRETCH: KeyframeCurve = [
  [1.46, 0.3],
  [1.84, 0.3],
  [2.0, 0.25],
  [2.1, 0.2],
  [2.2, 0.2],
  [2.4, 0.25],
  [2.7, 0.3],
  [2.85, 0.45],
  [2.95, 0.8],
  [3.02, 1],
];

const CURVE_DROP_CENTER: KeyframeCurve = [
  [1.46, -0.6],
  [1.6, -0.5],
  [1.75, -0.3],
  [1.8, 0.4],
  [1.84, 1],
];

const CURVE_DROP_MAGNIFY: KeyframeCurve = [
  [1.46, 1.5],
  [1.6, 1.5],
  [1.75, 2.2],
  [1.84, 1.4],
  [1.92, 1.2],
  [2.0, 1.05],
  [2.1, 1],
];

function smoothHermiteStep(edge0: number, edge1: number, value: number): number {
  const norm = Math.min(1, Math.max(0, (value - edge0) / (edge1 - edge0)));
  return norm * norm * (3 - 2 * norm);
}

/** Sanitize and clamp all tuning props within stable physical thresholds */
export function normalizeLiquidGlassLogo(props: LiquidGlassLogoTuning): LiquidGlassLogoTuning {
  const clamp = (val: number, fallback: number, min: number, max: number) =>
    Number.isFinite(val) ? Math.min(max, Math.max(min, val)) : fallback;
  const d = liquidGlassLogoDefaults;

  return {
    ...props,
    ending: props.ending === 'wordmark' ? 'wordmark' : 'logo',
    theme: props.theme === 'light' ? 'light' : 'dark',
    logoSize: clamp(props.logoSize, d.logoSize, 24, 1024),
    logoScale: clamp(props.logoScale, d.logoScale, 0.1, 1),
    finalLogoScale: clamp(props.finalLogoScale, d.finalLogoScale, 0.1, 1),
    fontSize: clamp(props.fontSize, d.fontSize, 8, 400),
    fontWeight: clamp(props.fontWeight, d.fontWeight, 100, 1000),
    letterSpacing: clamp(props.letterSpacing, d.letterSpacing, -0.3, 1),
    markGap: clamp(props.markGap, d.markGap, 0, 2),
    depth: clamp(props.depth, d.depth, 0, 6),
    dispersion: clamp(props.dispersion, d.dispersion, 0, 4),
    relief: clamp(props.relief, d.relief, 0, 3),
    caustics: clamp(props.caustics, d.caustics, 0, 4),
    highlights: clamp(props.highlights, d.highlights, 0, 4),
    bloom: clamp(props.bloom, d.bloom, 0, 2),
    dropSize: clamp(props.dropSize, d.dropSize, 0.05, 1.5),
    dropStrength: clamp(props.dropStrength, d.dropStrength, 0, 4),
    echoTint: clamp(props.echoTint, d.echoTint, 0, 1),
    logoRelief: clamp(props.logoRelief, d.logoRelief, 0, 1),
    innerWallFocus: clamp(props.innerWallFocus, d.innerWallFocus, 0, 1),
    decay: clamp(props.decay, d.decay, 0.1, 10),
    speed: clamp(props.speed, d.speed, 0.1, 4),
    loopDelay: clamp(props.loopDelay, d.loopDelay, 0, 30),
    maxDpr: clamp(props.maxDpr, d.maxDpr, 0.5, 4),
  };
}

export type RasterizedTexture = {
  canvas: HTMLCanvasElement;
  box: [width: number, height: number];
};

function fetchImage(url: string): Promise<HTMLImageElement | null> {
  return new Promise((resolve) => {
    if (!url) return resolve(null);
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = url;
  });
}

function calculateNextPOT(dim: number): number {
  return 2 ** Math.ceil(Math.log2(Math.max(2, dim)));
}

function paintSilhouetteTint(
  ctx: CanvasRenderingContext2D,
  source: CanvasImageSource,
  dx: number,
  dy: number,
  dw: number,
  dh: number,
  fillColor: string,
) {
  if (fillColor === 'original') {
    ctx.drawImage(source, dx, dy, dw, dh);
    return;
  }
  const scratchCanvas = document.createElement('canvas');
  scratchCanvas.width = Math.max(1, Math.ceil(dw));
  scratchCanvas.height = Math.max(1, Math.ceil(dh));
  const scratchCtx = scratchCanvas.getContext('2d')!;
  scratchCtx.drawImage(source, 0, 0, scratchCanvas.width, scratchCanvas.height);
  scratchCtx.globalCompositeOperation = 'source-in';
  scratchCtx.fillStyle = fillColor;
  scratchCtx.fillRect(0, 0, scratchCanvas.width, scratchCanvas.height);
  ctx.drawImage(scratchCanvas, dx, dy, dw, dh);
}

/** 2-pass Euclidean distance transform computing curvature normals and diffuse studio light relief */
function applyEmbossedRelief(canvas: HTMLCanvasElement, radius: number, reliefPower: number) {
  if (reliefPower <= 0) return;
  const ctx = canvas.getContext('2d')!;
  const { width, height } = canvas;
  const imgData = ctx.getImageData(0, 0, width, height);
  const px = imgData.data;
  const distMap = new Float32Array(width * height);

  for (let i = 0; i < distMap.length; i++) {
    distMap[i] = px[i * 4 + 3] > 127 ? 1e6 : 0;
  }

  const SQRT2 = Math.SQRT2;

  // Forward Pass
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      distMap[idx] = Math.min(
        distMap[idx],
        distMap[idx - 1] + 1,
        distMap[idx - width] + 1,
        distMap[idx - width - 1] + SQRT2,
        distMap[idx - width + 1] + SQRT2,
      );
    }
  }

  // Backward Pass
  for (let y = height - 2; y > 0; y--) {
    for (let x = width - 2; x > 0; x--) {
      const idx = y * width + x;
      distMap[idx] = Math.min(
        distMap[idx],
        distMap[idx + 1] + 1,
        distMap[idx + width] + 1,
        distMap[idx + width - 1] + SQRT2,
        distMap[idx + width + 1] + SQRT2,
      );
    }
  }

  // Profile Mapping
  for (let i = 0; i < distMap.length; i++) {
    const q = Math.max(0, 1 - distMap[i] / radius);
    distMap[i] = Math.sqrt(Math.max(0, 1 - q * q)) * radius * 0.4;
  }

  // Normal Gradient Shading
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = y * width + x;
      if (!px[idx * 4 + 3]) continue;
      const gradX = (distMap[idx - 1] - distMap[idx + 1]) * 0.5;
      const gradY = (distMap[idx - width] - distMap[idx + width]) * 0.5;
      const diffuseFactor = Math.max(0, (-gradX * 0.45 - gradY * 0.6 + 0.8) / Math.hypot(gradX, gradY, 1));
      const normalizedShade = (0.74 + diffuseFactor * 0.26) / (0.74 + 0.8 * 0.26);
      const luminanceMultiplier = 1 + (normalizedShade - 1) * reliefPower;

      for (let c = 0; c < 3; c++) {
        px[idx * 4 + c] *= luminanceMultiplier;
      }
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

function rasterizeEmblem(
  img: HTMLImageElement | null,
  config: LiquidGlassLogoTuning,
  dpr: number,
): RasterizedTexture {
  const targetDimension = Math.min(2048, calculateNextPOT(config.logoSize * dpr * 2));
  const offscreen = document.createElement('canvas');
  offscreen.width = offscreen.height = targetDimension;
  const ctx = offscreen.getContext('2d')!;

  if (img) {
    const naturalW = img.naturalWidth || img.width || 1;
    const naturalH = img.naturalHeight || img.height || 1;
    const fitScale = (targetDimension * config.logoScale) / Math.max(naturalW, naturalH);
    const scaledW = naturalW * fitScale;
    const scaledH = naturalH * fitScale;
    paintSilhouetteTint(
      ctx,
      img,
      (targetDimension - scaledW) / 2,
      (targetDimension - scaledH) / 2,
      scaledW,
      scaledH,
      config.logoColor,
    );
  }

  if (img && config.logoColor !== 'original') {
    applyEmbossedRelief(offscreen, offscreen.width * 0.03, config.logoRelief);
  }

  return { canvas: offscreen, box: [config.logoSize, config.logoSize] };
}

function formatFontString(config: LiquidGlassLogoTuning): string {
  return `${config.fontWeight} ${config.fontSize}px ${config.fontFamily}`;
}

function rasterizeTypography(
  insignia: HTMLImageElement | null,
  config: LiquidGlassLogoTuning,
  dpr: number,
): { canvas: HTMLCanvasElement; box: [number, number]; contentWidth: number } {
  const measureCanvas = document.createElement('canvas').getContext('2d')!;
  measureCanvas.font = formatFontString(config);
  measureCanvas.fontStretch = config.fontStretch as CanvasFontStretch;
  const letterSpacingPx = config.letterSpacing * config.fontSize;
  measureCanvas.letterSpacing = `${letterSpacingPx}px`;

  const measuredTextW = Math.max(0, measureCanvas.measureText(config.text).width);
  const metrics = measureCanvas.measureText(config.text || 'x');
  const ascent = metrics.actualBoundingBoxAscent || config.fontSize * 0.72;
  const descent = metrics.actualBoundingBoxDescent || config.fontSize * 0.2;
  const xHeight = measureCanvas.measureText('x').actualBoundingBoxAscent || config.fontSize * 0.52;

  let insigniaW = 0;
  let insigniaH = 0;
  if (insignia) {
    const naturalW = insignia.naturalWidth || insignia.width || 1;
    const naturalH = insignia.naturalHeight || insignia.height || 1;
    insigniaH = Math.max(ascent, xHeight * 1.3);
    insigniaW = (naturalW / naturalH) * insigniaH;
  }

  const markMargin = insignia && config.text.length ? config.markGap * config.fontSize : 0;
  const totalContentW = insigniaW + markMargin + measuredTextW;
  const paddingMargin = config.fontSize * 0.5;
  const layoutBox: [number, number] = [totalContentW + paddingMargin * 2, config.fontSize * 2];

  const scaleFactor = Math.min(dpr * 2, 4096 / layoutBox[0], 4096 / layoutBox[1]);
  const rasterCanvas = document.createElement('canvas');
  rasterCanvas.width = Math.min(4096, calculateNextPOT(layoutBox[0] * scaleFactor));
  rasterCanvas.height = Math.min(4096, calculateNextPOT(layoutBox[1] * scaleFactor));

  const ctx = rasterCanvas.getContext('2d')!;
  ctx.scale(rasterCanvas.width / layoutBox[0], rasterCanvas.height / layoutBox[1]);

  const baselinePos = layoutBox[1] / 2 + (ascent - descent) / 2;
  let cursorX = paddingMargin;

  if (insignia) {
    const tintColor = config.logoColor === 'original' ? 'original' : config.textColor;
    paintSilhouetteTint(ctx, insignia, cursorX, baselinePos - insigniaH, insigniaW, insigniaH, tintColor);
    cursorX += insigniaW + markMargin;
  }

  ctx.font = formatFontString(config);
  ctx.fontStretch = config.fontStretch as CanvasFontStretch;
  ctx.fillStyle = config.textColor;
  ctx.textBaseline = 'alphabetic';
  ctx.letterSpacing = `${letterSpacingPx}px`;
  ctx.textAlign = 'left';
  ctx.fillText(config.text, cursorX, baselinePos);

  if (config.logoColor !== 'original') {
    applyEmbossedRelief(rasterCanvas, (config.fontSize * 0.04 * rasterCanvas.height) / layoutBox[1], config.logoRelief);
  }

  return { canvas: rasterCanvas, box: layoutBox, contentWidth: totalContentW };
}

function parseNormalizedColor(colorStr: string): [number, number, number] {
  const probe = document.createElement('canvas').getContext('2d')!;
  probe.fillStyle = '#000000';
  probe.fillStyle = colorStr;
  const hex = String(probe.fillStyle);
  if (hex.startsWith('#')) {
    const num = parseInt(hex.slice(1, 7), 16);
    return [(num >> 16) / 255, ((num >> 8) & 255) / 255, (num & 255) / 255];
  }
  const rgbValues = hex.match(/[\d.]+/g)?.map(Number) ?? [0, 0, 0];
  return [rgbValues[0] / 255, rgbValues[1] / 255, rgbValues[2] / 255];
}

export type LiquidGlassLogoRenderer = {
  update: (tuning: LiquidGlassLogoTuning) => void;
  replay: () => void;
  seek: (seconds: number) => void;
  pause: () => void;
  play: () => void;
  dispose: () => void;
};

/** Initializes the WebGL2 rendering pipeline and simulation clock */
export function createLiquidGlassLogoRenderer(
  canvas: HTMLCanvasElement,
  initialConfig: LiquidGlassLogoTuning,
  onEngineReady?: () => void,
): LiquidGlassLogoRenderer | null {
  const gl = canvas.getContext('webgl2', {
    premultipliedAlpha: true,
    alpha: true,
    antialias: false,
  });
  if (!gl) return null;

  const compileShader = (type: number, glslSource: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, glslSource);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const log = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error(log ?? 'Liquid Glass WebGL Shader compilation error.');
    }
    return shader;
  };

  const buildShaderProgram = (fragSource: string) => {
    const program = gl.createProgram()!;
    const vertShader = compileShader(gl.VERTEX_SHADER, liquidGlassLogoVertex);
    const fragShader = compileShader(gl.FRAGMENT_SHADER, fragSource);
    gl.attachShader(program, vertShader);
    gl.attachShader(program, fragShader);
    gl.bindAttribLocation(program, 0, 'aPosition');
    gl.linkProgram(program);
    gl.deleteShader(vertShader);
    gl.deleteShader(fragShader);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const log = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error(log ?? 'Liquid Glass WebGL Program link error.');
    }
    return program;
  };

  const renderProgram = buildShaderProgram(liquidGlassLogoRender);
  const compositeProgram = buildShaderProgram(liquidGlassLogoComposite);

  const compositeUniformMap = Object.fromEntries(
    [
      'uScene',
      'uResolution',
      'uDpr',
      'uUnit',
      'uSettle',
      'uBloom',
      'uTime',
      'uFinish',
      'uPageLight',
    ].map((uName) => [uName, gl.getUniformLocation(compositeProgram, uName)]),
  );

  const uniformLocations = new Map<string, WebGLUniformLocation | null>();
  const getRenderUniform = (name: string) => {
    if (!uniformLocations.has(name)) {
      uniformLocations.set(name, gl.getUniformLocation(renderProgram, name));
    }
    return uniformLocations.get(name)!;
  };

  // Fullscreen Geometry Setup
  const vao = gl.createVertexArray();
  gl.bindVertexArray(vao);
  const vbo = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

  const allocateTexture = () => {
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array(4));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    return tex;
  };

  const logoTexture = allocateTexture();
  const textTexture = allocateTexture();
  const sceneTexture = allocateTexture();

  const sceneFBO = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFBO);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, sceneTexture, 0);
  gl.bindFramebuffer(gl.FRAMEBUFFER, null);

  let sceneBufferW = 0;
  let sceneBufferH = 0;

  const resizeSceneFBO = () => {
    if (sceneBufferW === canvas.width && sceneBufferH === canvas.height) return;
    sceneBufferW = canvas.width;
    sceneBufferH = canvas.height;
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, sceneBufferW, sceneBufferH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
  };

  const uploadCanvasTexture = (targetTex: WebGLTexture, sourceCanvas: HTMLCanvasElement) => {
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, targetTex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, sourceCanvas);
    gl.generateMipmap(gl.TEXTURE_2D);
  };

  let activeConfig = initialConfig;
  let currentDpr = 1;
  let clientW = 1;
  let clientH = 1;
  let emblemBox: [number, number] = [1, 1];
  let typographyBox: [number, number] = [1, 1];
  let measuredTypographyW = 0;
  let isLoaded = false;
  let isDisposed = false;
  let currentRasterSignature = '';
  let rasterQueueVersion = 0;
  let cachedEmblem: { cacheKey: string; rasterData: RasterizedTexture } | null = null;
  let simulationClock = 0;
  let previousTimestamp = 0;
  let isPlaying = !initialConfig.paused;
  let isViewportVisible = true;
  let animFrameId = 0;

  const reducedMotionQuery = window.matchMedia?.('(prefers-reduced-motion: reduce)');

  const computeViewportScale = () =>
    Math.min(
      1,
      clientW / Math.max(activeConfig.logoSize * 1.9, activeConfig.ending === 'wordmark' ? measuredTypographyW * 1.22 : 0),
      clientH / (activeConfig.logoSize * 1.5),
    );

  const executeRenderPass = () => {
    if (!isLoaded || isDisposed) return;
    const viewScale = computeViewportScale();
    resizeSceneFBO();

    // 1. Scene Simulation Pass
    gl.bindFramebuffer(gl.FRAMEBUFFER, sceneFBO);
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.useProgram(renderProgram);
    gl.bindVertexArray(vao);

    [logoTexture, textTexture].forEach((tex, slot) => {
      gl.activeTexture(gl.TEXTURE0 + slot);
      gl.bindTexture(gl.TEXTURE_2D, tex);
    });

    gl.uniform1i(getRenderUniform('uLogo'), 0);
    gl.uniform1i(getRenderUniform('uText'), 1);
    gl.uniform2f(getRenderUniform('uResolution'), canvas.width, canvas.height);
    gl.uniform1f(getRenderUniform('uDpr'), canvas.width / clientW);
    gl.uniform1f(getRenderUniform('uUnit'), activeConfig.logoSize * viewScale);
    gl.uniform2f(getRenderUniform('uLogoBox'), emblemBox[0] * viewScale, emblemBox[1] * viewScale);
    gl.uniform2f(getRenderUniform('uTextBox'), typographyBox[0] * viewScale, typographyBox[1] * viewScale);
    gl.uniform1f(getRenderUniform('uTextWidth'), measuredTypographyW * viewScale);

    const finishDuration = activeConfig.ending === 'logo' ? LOGO_FINISH_TIMESTAMP : liquidGlassLogoDuration;
    const effectiveTime = reducedMotionQuery?.matches ? finishDuration : simulationClock;
    const displayTime = activeConfig.ending === 'logo' ? Math.min(LOGO_FINISH_TIMESTAMP, effectiveTime) : effectiveTime;

    gl.uniform1f(getRenderUniform('uTime'), displayTime);
    gl.uniform1f(getRenderUniform('uWordmarkEnabled'), activeConfig.ending === 'wordmark' ? 1 : 0);

    const settleFactor =
      activeConfig.ending === 'logo'
        ? Math.max(0, Math.min(1, (effectiveTime - 1.16) / (1.4 - 1.16)))
        : 0;

    const unitPixels = activeConfig.logoSize * viewScale;
    const dropletReach = Math.max((measuredTypographyW * viewScale) / 2, unitPixels * 0.3);
    const t = displayTime;
    const settleWaveMask = 1 - smoothHermiteStep(2.85, 3.02, t);

    gl.uniform4f(
      getRenderUniform('uDrop'),
      dropletReach * HermiteSplineTimeline.evaluate(CURVE_DROP_RADIUS, t),
      dropletReach * HermiteSplineTimeline.evaluate(CURVE_DROP_CORE, t),
      Math.max(0.02, Math.min(1, HermiteSplineTimeline.evaluate(CURVE_DROP_STRETCH, t))),
      1 + (HermiteSplineTimeline.evaluate(CURVE_DROP_CENTER, t) - 1) * activeConfig.dropStrength,
    );

    gl.uniform4f(
      getRenderUniform('uDropLens'),
      1 + (HermiteSplineTimeline.evaluate(CURVE_DROP_MAGNIFY, t) - 1) * activeConfig.dropStrength,
      2 + 4 * smoothHermiteStep(1.74, 1.84, t),
      unitPixels *
        (0.009 * Math.exp(-Math.max(t - 1.46, 0) / 0.5) * (1 - smoothHermiteStep(1.85, 1.95, t)) +
          0.012 * smoothHermiteStep(2.2, 2.4, t)) *
        settleWaveMask,
      unitPixels * (0.07 + (0.03 - 0.07) * smoothHermiteStep(1.9, 2.4, t)),
    );

    gl.uniform4f(
      getRenderUniform('uDropWave'),
      (t - 1.45) * 42,
      1 - smoothHermiteStep(1.85, 2.0, t),
      2 * (0.12 + 1.6 * smoothHermiteStep(1.86, 2.0, t) - 0.9 * smoothHermiteStep(2.25, 2.5, t)) * settleWaveMask,
      0,
    );

    const artworkSettleProg = smoothHermiteStep(1.13, 1.28, effectiveTime);
    const interpolatedArtScale =
      activeConfig.ending === 'logo' && effectiveTime > 1.13
        ? HermiteSplineTimeline.evaluate(CURVE_ARTWORK_SCALE, 1.13) * (1 - artworkSettleProg) +
          activeConfig.finalLogoScale * artworkSettleProg
        : HermiteSplineTimeline.evaluate(CURVE_ARTWORK_SCALE, displayTime);

    gl.uniform1f(getRenderUniform('uArtScale'), interpolatedArtScale);
    gl.uniform1f(getRenderUniform('uSettle'), settleFactor);
    gl.uniform3fv(getRenderUniform('uTile'), parseNormalizedColor(activeConfig.tileColor));

    const [pageR, pageG, pageB] = parseNormalizedColor(activeConfig.background);
    const backgroundLuma = 0.299 * pageR + 0.587 * pageG + 0.114 * pageB;
    const pageLightFactor = Math.min(1, Math.max(0, (backgroundLuma - 0.35) / 0.4));

    gl.uniform1f(getRenderUniform('uPageLight'), pageLightFactor);
    gl.uniform1f(getRenderUniform('uTileEnabled'), activeConfig.tile ? 1 : 0);
    gl.uniform1f(getRenderUniform('uDepth'), activeConfig.depth);
    gl.uniform1f(getRenderUniform('uDispersion'), activeConfig.dispersion);
    gl.uniform1f(getRenderUniform('uRelief'), activeConfig.relief);
    gl.uniform1f(getRenderUniform('uCaustics'), activeConfig.caustics);
    gl.uniform1f(getRenderUniform('uHighlights'), activeConfig.highlights);
    gl.uniform1f(getRenderUniform('uEchoTint'), activeConfig.echoTint);
    gl.uniform1f(getRenderUniform('uInnerWallFocus'), activeConfig.innerWallFocus);
    gl.uniform1f(getRenderUniform('uDropSize'), activeConfig.dropSize);
    gl.uniform1f(getRenderUniform('uDropStrength'), activeConfig.dropStrength);
    gl.uniform1f(getRenderUniform('uDecay'), activeConfig.decay);

    gl.drawArrays(gl.TRIANGLES, 0, 3);

    // 2. Optical Bloom & Photographic Finish Pass
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.useProgram(compositeProgram);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, sceneTexture);
    gl.generateMipmap(gl.TEXTURE_2D);

    gl.uniform1i(compositeUniformMap.uScene, 0);
    gl.uniform2f(compositeUniformMap.uResolution, canvas.width, canvas.height);
    gl.uniform1f(compositeUniformMap.uDpr, canvas.width / clientW);
    gl.uniform1f(compositeUniformMap.uUnit, unitPixels);
    gl.uniform1f(compositeUniformMap.uSettle, settleFactor);
    gl.uniform1f(compositeUniformMap.uBloom, activeConfig.bloom);
    gl.uniform1f(compositeUniformMap.uPageLight, pageLightFactor);
    gl.uniform1f(compositeUniformMap.uTime, displayTime);
    gl.uniform1f(
      compositeUniformMap.uFinish,
      activeConfig.ending === 'logo'
        ? Math.max(0, Math.min(1, (effectiveTime - 1.05) / (LOGO_FINISH_TIMESTAMP - 1.05)))
        : Math.max(0, Math.min(1, (effectiveTime - 2.8) / (liquidGlassLogoDuration - 2.8))),
    );

    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  const refreshTexturesAsync = async () => {
    const signature = JSON.stringify([
      activeConfig.logo,
      activeConfig.mark,
      activeConfig.text,
      activeConfig.logoSize,
      activeConfig.logoScale,
      activeConfig.fontSize,
      activeConfig.fontFamily,
      activeConfig.fontWeight,
      activeConfig.fontStretch,
      activeConfig.letterSpacing,
      activeConfig.markGap,
      activeConfig.logoColor,
      activeConfig.logoRelief,
      activeConfig.textColor,
      currentDpr,
    ]);

    if (signature === currentRasterSignature) return;
    currentRasterSignature = signature;
    const taskVersion = ++rasterQueueVersion;

    const snapshot = { ...activeConfig };
    const markUrl = snapshot.mark === 'logo' ? snapshot.logo : snapshot.mark;

    const [loadedLogo, loadedInsignia] = await Promise.all([
      fetchImage(snapshot.logo),
      markUrl === snapshot.logo ? null : fetchImage(markUrl),
      document.fonts?.load(formatFontString(snapshot), snapshot.text || 'x').catch(() => undefined),
    ]);

    if (isDisposed || taskVersion !== rasterQueueVersion) return;

    const finalInsigniaImg = markUrl === snapshot.logo ? loadedLogo : loadedInsignia;
    const emblemCacheKey = JSON.stringify([
      snapshot.logo,
      snapshot.logoSize,
      snapshot.logoScale,
      snapshot.logoColor,
      snapshot.logoRelief,
      currentDpr,
    ]);

    const rasterEmblem =
      cachedEmblem?.cacheKey === emblemCacheKey
        ? cachedEmblem.rasterData
        : rasterizeEmblem(loadedLogo, snapshot, currentDpr);

    cachedEmblem = { cacheKey: emblemCacheKey, rasterData: rasterEmblem };

    const rasterTypography = rasterizeTypography(markUrl ? finalInsigniaImg : null, snapshot, currentDpr);

    uploadCanvasTexture(logoTexture, rasterEmblem.canvas);
    uploadCanvasTexture(textTexture, rasterTypography.canvas);

    emblemBox = rasterEmblem.box;
    typographyBox = rasterTypography.box;
    measuredTypographyW = rasterTypography.contentWidth;

    if (!isLoaded) {
      isLoaded = true;
      previousTimestamp = 0;
      onEngineReady?.();
    }

    executeRenderPass();
    queueNextFrame();
  };

  const animationTick = (timestamp: number) => {
    animFrameId = 0;
    const elapsedDelta = previousTimestamp ? Math.min(0.05, (timestamp - previousTimestamp) / 1000) : 0;
    previousTimestamp = timestamp;

    const isRunning = isPlaying && isViewportVisible && !reducedMotionQuery?.matches && isLoaded;
    if (isRunning) {
      simulationClock += elapsedDelta * activeConfig.speed;
      const sequenceDuration =
        (activeConfig.ending === 'logo' ? LOGO_FINISH_TIMESTAMP : liquidGlassLogoDuration) + activeConfig.loopDelay;
      if (activeConfig.loop && simulationClock >= sequenceDuration) {
        simulationClock %= sequenceDuration;
      }
    }

    executeRenderPass();

    if (
      isRunning &&
      (activeConfig.loop ||
        simulationClock < (activeConfig.ending === 'logo' ? LOGO_FINISH_TIMESTAMP : liquidGlassLogoDuration))
    ) {
      queueNextFrame();
    } else {
      previousTimestamp = 0;
    }
  };

  function queueNextFrame() {
    if (!animFrameId && !isDisposed) {
      animFrameId = requestAnimationFrame(animationTick);
    }
  }

  const handleResize = () => {
    const boundingBox = canvas.getBoundingClientRect();
    clientW = Math.max(1, boundingBox.width);
    clientH = Math.max(1, boundingBox.height);
    const targetDpr = Math.min(window.devicePixelRatio || 1, activeConfig.maxDpr);

    canvas.width = Math.max(1, Math.round(clientW * targetDpr));
    canvas.height = Math.max(1, Math.round(clientH * targetDpr));

    if (targetDpr !== currentDpr) {
      currentDpr = targetDpr;
      void refreshTexturesAsync();
    }

    executeRenderPass();
    queueNextFrame();
  };

  const resizeObserver = new ResizeObserver(handleResize);
  resizeObserver.observe(canvas);

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    isViewportVisible = entry?.isIntersecting ?? true;
    previousTimestamp = 0;
    if (isViewportVisible) queueNextFrame();
  });
  visibilityObserver.observe(canvas);

  const handleMotionPreferenceChange = () => {
    previousTimestamp = 0;
    queueNextFrame();
  };
  reducedMotionQuery?.addEventListener?.('change', handleMotionPreferenceChange);

  handleResize();
  void refreshTexturesAsync();

  return {
    update(nextConfig) {
      const previouslyPlaying = isPlaying;
      activeConfig = nextConfig;
      isPlaying = !nextConfig.paused;
      if (!previouslyPlaying && isPlaying) previousTimestamp = 0;
      handleResize();
      void refreshTexturesAsync();
    },
    replay() {
      simulationClock = 0;
      previousTimestamp = 0;
      executeRenderPass();
      queueNextFrame();
    },
    seek(seconds) {
      simulationClock = Number.isFinite(seconds) ? Math.max(0, Math.min(3600, seconds)) : 0;
      previousTimestamp = 0;
      executeRenderPass();
    },
    pause() {
      isPlaying = false;
      previousTimestamp = 0;
    },
    play() {
      isPlaying = true;
      previousTimestamp = 0;
      queueNextFrame();
    },
    dispose() {
      isDisposed = true;
      cachedEmblem = null;
      cancelAnimationFrame(animFrameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      reducedMotionQuery?.removeEventListener?.('change', handleMotionPreferenceChange);

      gl.deleteTexture(logoTexture);
      gl.deleteTexture(textTexture);
      gl.deleteTexture(sceneTexture);
      gl.deleteFramebuffer(sceneFBO);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteProgram(renderProgram);
      gl.deleteProgram(compositeProgram);
    },
  };
}
