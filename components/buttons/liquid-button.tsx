"use client";

import * as React from "react";
import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

export type ElementName =
  | "lava"
  | "ocean"
  | "stone"
  | "sky"
  | "obsidian"
  | "emerald"
  | "aurora"
  | "amber"
  | "rose"
  | "cyber"
  | "neon"
  | "sunset"
  | "amethyst"
  | "solar";
export type ElementColors = [string, string, string];

type ElementLook = {
  colors: ElementColors;
  text: string;
  ring: string;
  shape: number;
  scale: number;
  swirl: number;
  distortion: number;
  speed: number;
  sparkle: number;
  grain: number;
};

export const elementPalettes: Record<ElementName, ElementLook> = {
  lava: {
    colors: ["#d42a1a", "#9e1408", "#3a0300"],
    text: "#ffffff",
    ring: "#d42a1a",
    shape: 0,
    scale: 34,
    swirl: 0.9,
    distortion: 0.35,
    speed: 0.6,
    sparkle: 0.04,
    grain: 0,
  },
  ocean: {
    colors: ["#1d6fc4", "#0f4a94", "#031a40"],
    text: "#ffffff",
    ring: "#1d6fc4",
    shape: 0,
    scale: 42,
    swirl: 1.1,
    distortion: 0.2,
    speed: 0.45,
    sparkle: 0.12,
    grain: 0,
  },
  stone: {
    colors: ["#8a5a2b", "#5a3818", "#1f1309"],
    text: "#fff7eb",
    ring: "#8a5a2b",
    shape: 1,
    scale: 26,
    swirl: 0.35,
    distortion: 0.5,
    speed: 0.14,
    sparkle: 0,
    grain: 0.16,
  },
  sky: {
    colors: ["#3f6d96", "#2c5276", "#142a40"],
    text: "#ffffff",
    ring: "#3f6d96",
    shape: 1,
    scale: 56,
    swirl: 0.7,
    distortion: 0.3,
    speed: 0.75,
    sparkle: 0,
    grain: 0,
  },
  obsidian: {
    colors: ["#5c5c63", "#1f1f23", "#050506"],
    text: "#fafafa",
    ring: "#a1a1aa",
    shape: 0,
    scale: 48,
    swirl: 0.8,
    distortion: 0.25,
    speed: 0.4,
    sparkle: 0.18,
    grain: 0,
  },
  emerald: {
    colors: ["#10b981", "#047857", "#022c22"],
    text: "#ffffff",
    ring: "#10b981",
    shape: 0,
    scale: 38,
    swirl: 1.0,
    distortion: 0.3,
    speed: 0.5,
    sparkle: 0.08,
    grain: 0,
  },
  aurora: {
    colors: ["#c084fc", "#7e22ce", "#2e1065"],
    text: "#ffffff",
    ring: "#a855f7",
    shape: 0,
    scale: 44,
    swirl: 1.2,
    distortion: 0.28,
    speed: 0.55,
    sparkle: 0.15,
    grain: 0,
  },
  amber: {
    colors: ["#f59e0b", "#b45309", "#451a03"],
    text: "#ffffff",
    ring: "#f59e0b",
    shape: 1,
    scale: 36,
    swirl: 0.7,
    distortion: 0.4,
    speed: 0.35,
    sparkle: 0.1,
    grain: 0.05,
  },
  rose: {
    colors: ["#f43f5e", "#be123c", "#4c0519"],
    text: "#ffffff",
    ring: "#f43f5e",
    shape: 0,
    scale: 40,
    swirl: 0.95,
    distortion: 0.32,
    speed: 0.5,
    sparkle: 0.12,
    grain: 0,
  },
  cyber: {
    colors: ["#84cc16", "#4d7c0f", "#1a2e05"],
    text: "#ffffff",
    ring: "#84cc16",
    shape: 0,
    scale: 46,
    swirl: 1.15,
    distortion: 0.35,
    speed: 0.6,
    sparkle: 0.1,
    grain: 0,
  },
  neon: {
    colors: ["#00f0ff", "#0891b2", "#082f49"],
    text: "#ffffff",
    ring: "#00f0ff",
    shape: 0,
    scale: 44,
    swirl: 1.2,
    distortion: 0.3,
    speed: 0.65,
    sparkle: 0.16,
    grain: 0,
  },
  sunset: {
    colors: ["#fb923c", "#db2777", "#4c0519"],
    text: "#ffffff",
    ring: "#fb923c",
    shape: 0,
    scale: 38,
    swirl: 0.95,
    distortion: 0.35,
    speed: 0.5,
    sparkle: 0.1,
    grain: 0,
  },
  amethyst: {
    colors: ["#a78bfa", "#6d28d9", "#1e1b4b"],
    text: "#ffffff",
    ring: "#a78bfa",
    shape: 1,
    scale: 42,
    swirl: 0.85,
    distortion: 0.32,
    speed: 0.45,
    sparkle: 0.14,
    grain: 0.04,
  },
  solar: {
    colors: ["#facc15", "#ea580c", "#431407"],
    text: "#ffffff",
    ring: "#facc15",
    shape: 0,
    scale: 36,
    swirl: 1.05,
    distortion: 0.4,
    speed: 0.6,
    sparkle: 0.18,
    grain: 0,
  },
};

const VERTEX = `attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}`;

const FRAGMENT = `#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform float t;uniform float dpr;uniform vec2 seed;
uniform float shape;uniform float scale;uniform float swirl;uniform float distortion;
uniform float sparkle;uniform float grain;uniform vec3 c1;uniform vec3 c2;uniform vec3 c3;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
return mix(mix(h(i),h(i+vec2(1,0)),f.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),f.x),f.y);}
void main(){
vec2 px=gl_FragCoord.xy;
vec2 uv=px/(dpr*scale)+seed;
float a=n(uv+t*.5)*6.2831;
uv+=distortion*n(uv*2.-t*.5)*vec2(cos(a),sin(a));
for(int i=1;i<=5;i++){float fi=float(i);
uv.x+=swirl/fi*cos(t+fi*1.5*uv.y);uv.y+=swirl/fi*cos(t+fi*uv.x);}
float m;
if(shape<.5){m=.5+.5*sin(uv.x)*cos(uv.y);}
else{float f=fract(uv.y*.5);m=smoothstep(0.,.55,f)*smoothstep(1.,.45,f);}
vec3 col=mix(c3,c2,smoothstep(.12,.55,m));
col=mix(col,c1,smoothstep(.52,.92,m));
col+=c1*sparkle*pow(max(0.,sin(uv.x*2.1)*sin(uv.y*1.7)),12.);
col*=1.-grain*.5+grain*h(floor(px));
gl_FragColor=vec4(col,1.);}`;

function toRgb(hex: string): [number, number, number] {
  const value = hex.replace("#", "");
  const full =
    value.length === 3
      ? value
          .split("")
          .map((c) => c + c)
          .join("")
      : value.slice(0, 6);
  const number = parseInt(full, 16);
  return [((number >> 16) & 255) / 255, ((number >> 8) & 255) / 255, (number & 255) / 255];
}

export function elementGradient(colors: ElementColors) {
  return `linear-gradient(0deg, ${colors[2]}, ${colors[1]}, ${colors[0]})`;
}

type Surface = {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  look: ElementLook;
  rgb: [number, number, number][];
  seed: [number, number];
  time: number;
  speed: number;
  boost: number;
  visible: boolean;
  still: boolean;
  dirty: boolean;
  onReady: () => void;
};

type Renderer = {
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  uniforms: Record<string, WebGLUniformLocation | null>;
  surfaces: Set<Surface>;
  frame: number;
  last: number;
};

let renderer: Renderer | null | undefined;

function getRenderer() {
  if (renderer !== undefined) return renderer;
  if (typeof window === "undefined" || typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl", {
    antialias: false,
    alpha: false,
    depth: false,
    powerPreference: "low-power",
  });
  renderer = null;
  if (!gl) return renderer;
  const compile = (type: number, source: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  };
  const program = gl.createProgram()!;
  gl.attachShader(program, compile(gl.VERTEX_SHADER, VERTEX));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT));
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return renderer;
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  const names = ["t", "dpr", "seed", "shape", "scale", "swirl", "distortion"];
  const uniforms = Object.fromEntries(
    [...names, "sparkle", "grain", "c1", "c2", "c3"].map((name) => [
      name,
      gl.getUniformLocation(program, name),
    ]),
  );
  renderer = { gl, canvas, uniforms, surfaces: new Set(), frame: 0, last: 0 };
  return renderer;
}

function paint(r: Renderer, surface: Surface) {
  const { gl, canvas, uniforms: u } = r;
  const { width, height } = surface.canvas;
  if (!width || !height) return;
  if (canvas.width < width || canvas.height < height) {
    canvas.width = Math.max(canvas.width, width);
    canvas.height = Math.max(canvas.height, height);
  }
  const { look } = surface;
  gl.viewport(0, 0, width, height);
  gl.uniform1f(u.t, surface.time);
  gl.uniform1f(u.dpr, width / Math.max(1, surface.canvas.clientWidth));
  gl.uniform2f(u.seed, surface.seed[0], surface.seed[1]);
  gl.uniform1f(u.shape, look.shape);
  gl.uniform1f(u.scale, look.scale);
  gl.uniform1f(u.swirl, look.swirl);
  gl.uniform1f(u.distortion, look.distortion);
  gl.uniform1f(u.sparkle, look.sparkle);
  gl.uniform1f(u.grain, look.grain);
  surface.rgb.forEach((rgb, index) => gl.uniform3f(u[`c${index + 1}`], ...rgb));
  gl.drawArrays(gl.TRIANGLES, 0, 3);
  surface.ctx.drawImage(canvas, 0, canvas.height - height, width, height, 0, 0, width, height);
  if (surface.dirty) {
    surface.dirty = false;
    surface.onReady();
  }
}

function tick(now: number) {
  const r = renderer;
  if (!r) return;
  const dt = r.last ? Math.min(0.05, (now - r.last) / 1000) : 0;
  r.last = now;
  let animating = false;
  for (const surface of r.surfaces) {
    if (!surface.visible) continue;
    if (surface.still) {
      if (surface.dirty) paint(r, surface);
      continue;
    }
    surface.speed += (surface.boost - surface.speed) * Math.min(1, dt * 6);
    surface.time += dt * surface.look.speed * surface.speed;
    if (!document.hidden) paint(r, surface);
    animating = true;
  }
  r.frame = animating ? requestAnimationFrame(tick) : 0;
  if (!animating) r.last = 0;
}

function wake() {
  const r = renderer;
  if (r && !r.frame) r.frame = requestAnimationFrame(tick);
}

export function useElementSurface(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  element: ElementName,
  colors: ElementColors | undefined,
  still: boolean,
) {
  const [ready, setReady] = React.useState(false);
  const surfaceRef = React.useRef<Surface | null>(null);
  const look = elementPalettes[element] ?? elementPalettes.lava;
  const [a, b, c] = colors ?? look.colors;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const r = getRenderer();
    if (!canvas || !ctx || !r) return;

    const surface: Surface = {
      canvas,
      ctx,
      look,
      rgb: [toRgb(a), toRgb(b), toRgb(c)],
      seed: [Math.random() * 40, Math.random() * 40],
      time: Math.random() * 20,
      speed: 1,
      boost: 1,
      visible: true,
      still,
      dirty: true,
      onReady: () => setReady(true),
    };
    surfaceRef.current = surface;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.max(1, Math.round(canvas.clientWidth * dpr));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight * dpr));
      surface.dirty = true;
      wake();
    };
    const sizer = new ResizeObserver(resize);
    sizer.observe(canvas);
    const viewer = new IntersectionObserver(([entry]) => {
      surface.visible = entry.isIntersecting;
      wake();
    });
    viewer.observe(canvas);

    r.surfaces.add(surface);
    resize();

    return () => {
      sizer.disconnect();
      viewer.disconnect();
      r.surfaces.delete(surface);
      surfaceRef.current = null;
    };
  }, [canvasRef]);

  React.useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    surface.look = look;
    surface.rgb = [toRgb(a), toRgb(b), toRgb(c)];
    surface.still = still;
    surface.dirty = true;
    wake();
  }, [look, a, b, c, still]);

  const boost = React.useCallback((value: number) => {
    if (surfaceRef.current) surfaceRef.current.boost = value;
    wake();
  }, []);

  return { ready, boost };
}

const liquidButtonVariants = cva(
  [
    "group/element relative isolate inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 overflow-hidden font-semibold whitespace-nowrap select-none",
    "transition-transform duration-150 ease-out outline-none active:scale-[0.96] active:duration-75",
    "focus-visible:ring-offset-background focus-visible:ring-2 focus-visible:ring-[var(--element-ring)] focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-50 data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "h-8 rounded-lg px-3.5 text-xs",
        default: "h-10 rounded-xl px-5 text-sm",
        lg: "h-12 rounded-xl px-7 text-base",
      },
    },
    defaultVariants: { size: "default" },
  },
);

export type LiquidButtonSize = NonNullable<VariantProps<typeof liquidButtonVariants>["size"]>;

export type LiquidButtonProps = ButtonPrimitive.Props &
  VariantProps<typeof liquidButtonVariants> & {
    element?: ElementName;
    colors?: ElementColors;
    asChild?: boolean;
  };

const LiquidButton = React.forwardRef<HTMLButtonElement, LiquidButtonProps>(
  (
    {
      element = "lava",
      colors,
      size,
      asChild = false,
      render,
      nativeButton,
      className,
      style,
      children,
      onPointerEnter,
      onPointerLeave,
      onFocus,
      onBlur,
      ...props
    },
    ref
  ) => {
    const still = Boolean(useReducedMotion());
    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const palette = elementPalettes[element] ?? elementPalettes.lava;
    const { ready, boost } = useElementSurface(canvasRef, element, colors, still);

    // If asChild is passed (from Radix pattern), adapt it to Base UI's render prop
    const isChildElement = asChild && React.isValidElement(children);
    const effectiveRender = render ?? (isChildElement ? children : undefined);
    const content = isChildElement
      ? (children as React.ReactElement<{ children?: React.ReactNode }>).props.children
      : children;

    const isNative =
      nativeButton ??
      (React.isValidElement(effectiveRender)
        ? typeof effectiveRender.type === "string"
          ? effectiveRender.type === "button"
          : (effectiveRender.type as any)?.displayName === "motion.button" ||
            (effectiveRender.type as any)?.name === "button"
            ? true
            : false
        : true);

    const baseStyle: React.CSSProperties = {
      backgroundImage: elementGradient(colors ?? palette.colors),
      color: palette.text,
      ["--element-ring" as any]: palette.ring,
    };

    const resolvedStyle =
      typeof style === "function"
        ? (state: ButtonPrimitive.State) => ({ ...baseStyle, ...style(state) })
        : { ...baseStyle, ...style };

    const resolvedClassName =
      typeof className === "function"
        ? (state: ButtonPrimitive.State) => cn(liquidButtonVariants({ size }), className(state))
        : cn(liquidButtonVariants({ size }), className);

    return (
      <ButtonPrimitive
        ref={ref as any}
        data-element={element}
        render={effectiveRender}
        nativeButton={isNative}
        className={resolvedClassName}
        style={resolvedStyle}
        onPointerEnter={(event) => {
          onPointerEnter?.(event as any);
          boost(2.6);
        }}
        onPointerLeave={(event) => {
          onPointerLeave?.(event as any);
          boost(1);
        }}
        onFocus={(event) => {
          onFocus?.(event as any);
          boost(2.6);
        }}
        onBlur={(event) => {
          onBlur?.(event as any);
          boost(1);
        }}
        {...props}
      >
        <canvas
          ref={canvasRef}
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 z-0 size-full transition-opacity duration-500",
            ready ? "opacity-100" : "opacity-0"
          )}
        />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-px z-[1] rounded-[inherit] bg-[linear-gradient(180deg,rgb(255_255_255/0.12),transparent_55%)] opacity-80 transition-opacity duration-300 group-hover/element:opacity-100"
        />
        <span className="relative z-10 inline-flex items-center justify-center gap-2">
          {content}
        </span>
      </ButtonPrimitive>
    );
  }
);

LiquidButton.displayName = "LiquidButton";

export { LiquidButton, liquidButtonVariants };