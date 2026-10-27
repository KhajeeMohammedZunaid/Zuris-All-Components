'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'
import { useTheme } from 'next-themes'

/* ============================== PRESET DATA ============================== */
export const LOCAL_IMAGES = [
  '/acc-1.webp',
  '/acc-2.webp',
  '/acc-3.webp',
  '/acc-4.webp',
  '/acc-5.webp',
]

export const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=2000&q=85',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=85',
]

export type AnimationVariantKey = 'slow' | 'drape' | 'fast'
export type ImageCollectionKey = 'local' | 'unsplash' | 'custom'
export type SizeModeKey = 'full' | 'card'

export interface VariantSettings {
  label: string
  description: string
  period: number   // total seconds per slide
  trans: number    // seconds of curl transition
  lift: number     // max lift toward camera -> top/bottom 3D flare
  blur: number     // max horizontal blur (uv) at the seam
  squeeze: number  // new-page content gather/squeeze near the seam
  wOld: number     // lifted OLD page extent right of seam
  wNew: number     // lifted NEW page extent left of seam
}

export const VARIANTS: Record<AnimationVariantKey, VariantSettings> = {
  slow: {
    label: 'Slow',
    description: 'Gentle, leisurely, cinematic flow',
    period: 3.8,
    trans: 1.5,
    lift: 0.72,
    blur: 0.05,
    squeeze: 0.08,
    wOld: 0.40,
    wNew: 0.22,
  },
  drape: {
    label: 'Drape',
    description: 'Deep physical cloth drape with heavy flare',
    period: 2.3,
    trans: 0.95,
    lift: 1.30,
    blur: 0.09,
    squeeze: 0.15,
    wOld: 0.56,
    wNew: 0.34,
  },
  fast: {
    label: 'Fast',
    description: 'Crisp, brisk, snappy page curl',
    period: 1.4,
    trans: 0.45,
    lift: 0.60,
    blur: 0.04,
    squeeze: 0.06,
    wOld: 0.30,
    wNew: 0.18,
  },
}

const CARD_W = 4.0
const CARD_H = 3.0
const H = 3.0 // reference height in 3D world coordinates
// H=3 world units precisely align camera FOV with viewport bounding box for 100% full-bleed coverage

// Smoothstep utility matching duo.html
const ss = (a: number, b: number, x: number) => {
  x = Math.min(1, Math.max(0, (x - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

/** Dynamic loader for Three.js (r128) matching duo.html CDN */
function loadThreeJs(): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('Window not available'))
  if ((window as any).THREE) return Promise.resolve((window as any).THREE)

  return new Promise((resolve, reject) => {
    const existing = document.querySelector('script[data-three-loader]')
    if (existing) {
      if ((window as any).THREE) {
        resolve((window as any).THREE)
      } else {
        existing.addEventListener('load', () => resolve((window as any).THREE))
      }
      return
    }
    const script = document.createElement('script')
    script.setAttribute('data-three-loader', 'true')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.async = true
    script.onload = () => resolve((window as any).THREE)
    script.onerror = () => reject(new Error('Failed to load Three.js from CDN'))
    document.head.appendChild(script)
  })
}

export interface PageCurlTransitionProps {
  initialVariant?: AnimationVariantKey
  initialSource?: ImageCollectionKey
  initialSizeMode?: SizeModeKey
  children?: React.ReactNode
  showControls?: boolean
  className?: string
}

export default function PageCurlTransition({
  initialVariant = 'drape',
  initialSource = 'local',
  initialSizeMode = 'full',
  children,
  showControls = true,
  className = '',
}: PageCurlTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Size mode: 'full' (full-bleed background) | 'card' (centered card in middle of page)
  const [sizeMode, setSizeMode] = useState<SizeModeKey>(initialSizeMode)
  const sizeModeRef = useRef(sizeMode)
  sizeModeRef.current = sizeMode

  // Variant state: slow | drape | fast
  const [variantKey, setVariantKey] = useState<AnimationVariantKey>(initialVariant)
  const activeVariant = VARIANTS[variantKey]
  const variantRef = useRef(activeVariant)
  variantRef.current = activeVariant

  // Image collection state: local | unsplash | custom
  const [sourceKey, setSourceKey] = useState<ImageCollectionKey>(initialSource)
  const [customImages, setCustomImages] = useState<string[]>([])

  const currentImages = useMemo(() => {
    if (sourceKey === 'unsplash') return UNSPLASH_IMAGES
    if (sourceKey === 'custom' && customImages.length > 0) return customImages
    return LOCAL_IMAGES
  }, [sourceKey, customImages])

  const [count, setCount] = useState(currentImages.length)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isDark = mounted ? resolvedTheme === 'dark' : false
  const isDarkRef = useRef(isDark)
  useEffect(() => {
    isDarkRef.current = isDark
  }, [isDark])

  // Setup Three.js scene & animation
  useEffect(() => {
    let disposed = false
    let animId: number
    let cleanupResize: () => void
    let loadedTextures: any[] = []

    loadThreeJs()
      .then((THREE) => {
        if (disposed) return

        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        // 1. Fallback procedural gradient texture
        function fallback(i: number) {
          const c = document.createElement('canvas')
          c.width = 1024
          c.height = 768
          const g = c.getContext('2d')!
          const gr = g.createLinearGradient(0, 0, 1024, 768)
          gr.addColorStop(0, `hsl(${i * 57},70%,60%)`)
          gr.addColorStop(1, `hsl(${i * 57 + 60},70%,30%)`)
          g.fillStyle = gr
          g.fillRect(0, 0, 1024, 768)
          const t = new THREE.CanvasTexture(c)
          t.minFilter = THREE.LinearFilter
          t.generateMipmaps = false
          t.userData = { crop: new THREE.Vector4(0, 0, 1, 1) }
          return t
        }

        // 2. Texture loader with exact viewport / card cover-crop
        function loadTexture(url: string, i: number, targetAspect: number): Promise<any> {
          return new Promise((res) => {
            const loader = new THREE.TextureLoader()
            loader.setCrossOrigin('anonymous')
            loader.load(
              url,
              (t: any) => {
                t.minFilter = t.magFilter = THREE.LinearFilter
                t.generateMipmaps = false
                const a = t.image.width / t.image.height
                const ca = targetAspect || 16 / 9
                const rx = a > ca ? ca / a : 1
                const ry = a > ca ? 1 : a / ca
                t.userData = { crop: new THREE.Vector4((1 - rx) / 2, (1 - ry) / 2, rx, ry) }
                res(t)
              },
              undefined,
              () => res(fallback(i))
            )
          })
        }

        // 3. Renderer & Perspective Camera
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

        // Helper to calculate camera Z based on current size mode
        function getTargetCameraZ(aspect: number, mode: SizeModeKey): number {
          if (mode === 'card') {
            const need = Math.max(CARD_H * 1.22, (CARD_W * 1.12) / aspect)
            return need / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
          }
          // Full cover mode
          return H / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
        }

        camera.position.z = getTargetCameraZ(1, sizeModeRef.current)

        // 4. Dynamic GLSL Shader Material supporting live variant + size mode updates
        const mat = new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            A: { value: null },
            B: { value: null },
            cA: { value: new THREE.Vector4(0, 0, 1, 1) },
            cB: { value: new THREE.Vector4(0, 0, 1, 1) },
            seam: { value: -1 },
            wo: { value: 0 },
            wn: { value: 0 },
            uLift: { value: variantRef.current.lift },
            uBlur: { value: variantRef.current.blur },
            uSqueeze: { value: variantRef.current.squeeze },
            uWOld: { value: variantRef.current.wOld },
            uWNew: { value: variantRef.current.wNew },
            uDark: { value: isDarkRef.current ? 1.0 : 0.0 },
            uCardMode: { value: sizeModeRef.current === 'card' ? 1.0 : 0.0 },
          },
          vertexShader: `
            uniform float seam, wo, wn;
            uniform float uLift, uWOld, uWNew;
            varying vec2 vUv;
            varying float vLift;
            void main(){
              vUv = uv;
              float dd = uv.x - seam;
              // Lift is highest AT the straight seam and falls off with distance (concave, steep at the seam).
              float l = dd >= 0.0 ? wo * pow(1.0 - clamp( dd / uWOld, 0.0, 1.0), 2.0)
                                  : wn * pow(1.0 - clamp(-dd / uWNew, 0.0, 1.0), 2.0);
              vLift = l;
              vec3 p = position;
              p.z += l * uLift;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }`,
          fragmentShader: `
            uniform sampler2D A, B;
            uniform vec4 cA, cB;
            uniform float seam, wo, wn, uDark;
            uniform float uBlur, uSqueeze, uCardMode;
            varying vec2 vUv;
            varying float vLift;

            vec3 smp(bool n, float x){
              float u = clamp(x, 0.0, 1.0);
              return n ? texture2D(B, cB.xy + vec2(u, vUv.y) * cB.zw).rgb
                       : texture2D(A, cA.xy + vec2(u, vUv.y) * cA.zw).rgb;
            }

            void main(){
              bool isNew = vUv.x < seam; // crisp straight seam: chosen per pixel
              float lw = isNew ? wn : wo;
              float r = uBlur * vLift;
              float x0 = vUv.x + (isNew ? uSqueeze * vLift : 0.0);
              vec3 col = vec3(0.0);
              float ws = 0.0;
              for (int i = -7; i <= 7; i++){
                float f = float(i) / 7.0, w = exp(-f * f * 2.5), o = r * f;
                col += w * vec3(smp(isNew, x0 + o * 1.2).r, smp(isNew, x0 + o).g, smp(isNew, x0 + o * 0.8).b);
                ws += w;
              }
              col /= ws;

              // Faint veil on the lifted strip: adaptive to dark/light theme
              vec3 veilCol = mix(vec3(1.0), vec3(0.85, 0.88, 0.95), uDark);
              col = mix(col, veilCol, 0.15 * vLift);

              float dist = abs(vUv.x - seam);
              col *= 1.0 - 0.25 * exp(-dist / 0.05) * lw; // soft shade toward the edge
              float rim = (1.0 - smoothstep(0.0, 0.022, dist)) * lw; // grey rim along the edge
              vec3 rimCol = mix(vec3(0.28, 0.29, 0.33), vec3(0.50, 0.52, 0.60), uDark);
              col = mix(col, rimCol, 0.6 * rim);

              // Smoothly blend between centered card SDF rounded corners and full-bleed coverage
              if (uCardMode > 0.01) {
                vec2 p = (vUv - 0.5) * vec2(4.0, 3.0);
                vec2 q = abs(p) - vec2(2.0, 1.5) + 0.09;
                float sdf = length(max(q, 0.0)) - 0.09;
                float alpha = 1.0 - smoothstep(-0.004, 0.004, sdf);
                gl_FragColor = vec4(col, mix(1.0, alpha, uCardMode));
              } else {
                gl_FragColor = vec4(col, 1.0);
              }
            }`,
        })

        // 5. Plane Mesh
        const initialAspect =
          (container.clientWidth || window.innerWidth) / (container.clientHeight || window.innerHeight)
        const scene = new THREE.Scene()

        function createGeometry(aspect: number, mode: SizeModeKey) {
          if (mode === 'card') {
            return new THREE.PlaneGeometry(CARD_W, CARD_H, 400, 24)
          }
          return new THREE.PlaneGeometry(H * aspect * 1.01, H * 1.01, 400, 24)
        }

        const mesh = new THREE.Mesh(createGeometry(initialAspect, sizeModeRef.current), mat)
        scene.add(mesh)

        function updateTextureCrops() {
          const isCard = sizeModeRef.current === 'card'
          const ca = isCard ? CARD_W / CARD_H : camera.aspect
          loadedTextures.forEach((t) => {
            if (!t?.image) return
            const a = t.image.width / t.image.height
            const rx = a > ca ? ca / a : 1
            const ry = a > ca ? 1 : a / ca
            if (t.userData?.crop) {
              t.userData.crop.set((1 - rx) / 2, (1 - ry) / 2, rx, ry)
            }
          })
        }

        function updateMeshAndCamera() {
          const mode = sizeModeRef.current
          mesh.geometry.dispose()
          mesh.geometry = createGeometry(camera.aspect, mode)
          updateTextureCrops()
        }

        function resize() {
          if (!container) return
          const w = container.clientWidth || window.innerWidth
          const h = container.clientHeight || window.innerHeight
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          camera.updateProjectionMatrix()
          updateMeshAndCamera()
        }

        window.addEventListener('resize', resize)
        cleanupResize = () => window.removeEventListener('resize', resize)
        resize()

        // 6. Load textures and start continuous timeline loop
        setLoading(true)
        const initialCropAspect = sizeModeRef.current === 'card' ? CARD_W / CARD_H : camera.aspect || 16 / 9
        Promise.all(currentImages.map((src, i) => loadTexture(src, i, initialCropAspect))).then((tex) => {
          if (disposed) return
          loadedTextures = tex
          setLoading(false)
          setCount(tex.length)
          updateTextureCrops()

          let lastTime = performance.now()
          let progress = 0

          function loop() {
            if (disposed) return

            const now = performance.now()
            const dt = Math.min((now - lastTime) / 1000, 0.1)
            lastTime = now

            const currentCfg = variantRef.current
            const currentMode = sizeModeRef.current

            // Dynamically lerp shader uniforms
            const lerpSpeed = 0.08
            mat.uniforms.uLift.value += (currentCfg.lift - mat.uniforms.uLift.value) * lerpSpeed
            mat.uniforms.uBlur.value += (currentCfg.blur - mat.uniforms.uBlur.value) * lerpSpeed
            mat.uniforms.uSqueeze.value += (currentCfg.squeeze - mat.uniforms.uSqueeze.value) * lerpSpeed
            mat.uniforms.uWOld.value += (currentCfg.wOld - mat.uniforms.uWOld.value) * lerpSpeed
            mat.uniforms.uWNew.value += (currentCfg.wNew - mat.uniforms.uWNew.value) * lerpSpeed
            mat.uniforms.uDark.value = isDarkRef.current ? 1.0 : 0.0

            // Smoothly lerp card mode shader uniform (1.0 for card, 0.0 for full)
            const targetCardMode = currentMode === 'card' ? 1.0 : 0.0
            mat.uniforms.uCardMode.value += (targetCardMode - mat.uniforms.uCardMode.value) * 0.12

            // Smoothly lerp camera position Z toward target distance
            const targetCameraZ = getTargetCameraZ(camera.aspect, currentMode)
            camera.position.z += (targetCameraZ - camera.position.z) * 0.1

            // Advance progress continuously based on the current period
            progress += dt / currentCfg.period
            const idx = Math.floor(progress)
            const c = (progress - idx) * currentCfg.period
            const tr = Math.min(1, Math.max(0, (c - (currentCfg.period - currentCfg.trans)) / currentCfg.trans))
            const e = tr * tr * (3 - 2 * tr)

            if (!tex || tex.length === 0) return
            const A = tex[idx % tex.length]
            const B = tex[(idx + 1) % tex.length]
            if (!A || !B) return

            mat.uniforms.A.value = A
            mat.uniforms.B.value = B
            mat.uniforms.cA.value = A.userData?.crop || new THREE.Vector4(0, 0, 1, 1)
            mat.uniforms.cB.value = B.userData?.crop || new THREE.Vector4(0, 0, 1, 1)
            mat.uniforms.seam.value = -0.1 + 1.2 * e
            mat.uniforms.wo.value = ss(0, 0.2, tr) * (1 - ss(0.5, 0.65, tr))
            mat.uniforms.wn.value = ss(0.1, 0.35, tr) * (1 - ss(0.9, 1, tr))

            renderer.render(scene, camera)
            animId = requestAnimationFrame(loop)
          }

          animId = requestAnimationFrame(loop)
        })
      })
      .catch((err) => {
        if (!disposed) {
          setError(err?.message || 'Error initializing WebGL')
          setLoading(false)
        }
      })

    return () => {
      disposed = true
      if (animId) cancelAnimationFrame(animId)
      if (cleanupResize) cleanupResize()
    }
  }, [currentImages, sizeMode])

  /* ---------- User Image Upload ---------- */
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((file) => file.type.startsWith('image/'))
    e.target.value = ''
    if (files.length === 0) return
    const urls = files.map((file) => URL.createObjectURL(file))
    setCustomImages(urls)
    setSourceKey('custom')
  }

  const [minimized, setMinimized] = useState(false)

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-screen overflow-hidden select-none transition-colors duration-500 ${
        sizeMode === 'card'
          ? 'bg-[radial-gradient(ellipse_at_50%_40%,#f6f6f6,#dcdcde)] dark:bg-[radial-gradient(ellipse_at_50%_40%,#2b2b30,#101013)]'
          : 'bg-black'
      } ${className}`}
    >
      {/* Background WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none z-0" />

      {/* Top-Left Floating Back Pill */}
      <div className="fixed top-5 left-5 z-30">
        <Link
          href="/"
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 backdrop-blur-xl text-xs font-medium shadow-lg hover:bg-white dark:hover:bg-zinc-900 transition-all cursor-pointer select-none"
        >
          <span>←</span>
          <span>Components</span>
        </Link>
      </div>

      {/* Subtle backdrop vignette in full cover mode for depth and readability */}
      {sizeMode === 'full' && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none z-[1]" />
      )}

      {/* Optional Overlay Content Slot (for Hero, text, badges, etc.) */}
      {children && (
        <div className="relative z-10 w-full h-full min-h-screen flex flex-col pointer-events-auto">
          {children}
        </div>
      )}

      {/* Loading state indicator */}
      {loading && !error && (
        <div className="absolute inset-0 grid place-items-center font-sans text-sm text-white/80 backdrop-blur-sm bg-black/20 pointer-events-none z-20 transition-all duration-300">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 border border-white/10 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Loading {sourceKey === 'unsplash' ? 'Unsplash' : 'background'} images…</span>
          </div>
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="absolute inset-0 grid place-items-center font-sans text-sm text-red-400 pointer-events-none z-20">
          <div className="px-4 py-2 rounded-xl bg-red-950/80 border border-red-500/30 shadow-xl">
            {error}
          </div>
        </div>
      )}

      {/* Floating Bottom Control Bar */}
      {showControls && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 transition-all duration-300 max-w-[94vw]">
          {minimized ? (
            <button
              type="button"
              onClick={() => setMinimized(false)}
              className="px-3.5 py-1.5 rounded-full border border-white/20 dark:border-zinc-800 bg-black/70 dark:bg-zinc-900/90 text-white backdrop-blur-xl text-xs font-medium shadow-2xl hover:bg-black/90 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>⚙️ Controls</span>
              <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-bold">
                {sizeMode === 'full' ? 'Full Cover' : 'Center Card'} · {variantKey}
              </span>
            </button>
          ) : (
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl md:rounded-full border border-white/20 dark:border-zinc-800/90 bg-white/85 dark:bg-zinc-950/85 text-zinc-900 dark:text-zinc-100 shadow-2xl backdrop-blur-2xl text-xs font-sans">
              {/* 1. SIZE MODE SELECTOR: Full Cover | Center Card */}
              <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-800/80 p-0.5 rounded-full">
                <button
                  type="button"
                  onClick={() => setSizeMode('full')}
                  title="Full-bleed background covering 100% of the screen"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    sizeMode === 'full'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Full Cover
                </button>
                <button
                  type="button"
                  onClick={() => setSizeMode('card')}
                  title="Original centered card in the middle of the page"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    sizeMode === 'card'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Center Card
                </button>
              </div>

              <span className="hidden sm:inline w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

              {/* 2. VARIANT SELECTOR: Slow | Drape | Fast */}
              <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-800/80 p-0.5 rounded-full">
                {(['slow', 'drape', 'fast'] as AnimationVariantKey[]).map((key) => {
                  const isActive = variantKey === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setVariantKey(key)}
                      title={VARIANTS[key].description}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                      }`}
                    >
                      {VARIANTS[key].label}
                    </button>
                  )
                })}
              </div>

              <span className="hidden sm:inline w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

              {/* 3. IMAGE COLLECTION SELECTOR: Unsplash | Local | Upload */}
              <div className="flex items-center bg-zinc-200/70 dark:bg-zinc-800/80 p-0.5 rounded-full">
                <button
                  type="button"
                  onClick={() => setSourceKey('unsplash')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    sourceKey === 'unsplash'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Unsplash
                </button>
                <button
                  type="button"
                  onClick={() => setSourceKey('local')}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    sourceKey === 'local'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Local WebP
                </button>
                <label
                  title="Upload your own custom images"
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                    sourceKey === 'custom'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 shadow-sm'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  Upload
                  <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
                </label>
              </div>

              {/* Image Count Badge */}
              <span className="text-zinc-400 dark:text-zinc-500 text-[11px] px-1 select-none whitespace-nowrap">
                {count} {count === 1 ? 'image' : 'images'}
              </span>

              <span className="hidden sm:inline w-px h-3.5 bg-zinc-300 dark:bg-zinc-700 mx-0.5" />

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={() => setTheme(isDark ? 'light' : 'dark')}
                className="px-2.5 py-1 rounded-full text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition cursor-pointer select-none font-medium text-xs whitespace-nowrap"
              >
                {mounted ? (isDark ? '☀️ Light' : '🌙 Dark') : 'Theme'}
              </button>

              {/* Minimize bar */}
              <button
                type="button"
                onClick={() => setMinimized(true)}
                title="Minimize control bar"
                className="p-1 rounded-full text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition cursor-pointer text-xs"
              >
                ✕
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}