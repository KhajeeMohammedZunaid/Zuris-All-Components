'use client'

import React, { useEffect, useRef, useState, useMemo } from 'react'
import Link from 'next/link'

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
  squeeze: number  // incoming-page content wrap near the seam
  wNew: number     // lifted NEW page extent left of seam
}

// Measured exact parameters from duo.html
export const VARIANTS: Record<AnimationVariantKey, VariantSettings> = {
  slow: {
    label: 'Slow',
    description: 'Gentle, leisurely, cinematic flow',
    period: 3.80,
    trans: 1.50,
    lift: 0.90,
    blur: 0.07,
    squeeze: 0.10,
    wNew: 0.28,
  },
  drape: {
    label: 'Drape',
    description: 'Graceful physical cloth drape with smooth curling and closing',
    period: 2.60,
    trans: 1.10,
    lift: 0.90,
    blur: 0.07,
    squeeze: 0.10,
    wNew: 0.30,
  },
  fast: {
    label: 'Fast',
    description: 'Crisp, brisk, snappy page turn',
    period: 1.35,
    trans: 0.45,
    lift: 0.85,
    blur: 0.06,
    squeeze: 0.08,
    wNew: 0.24,
  },
}

const CARD_W = 4.0
const CARD_H = 3.0
const H = 3.0 // reference height in 3D world coordinates

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

        // 4. Dynamic GLSL Shader Material
        // Physics:
        // - Old page (dd >= 0.0) stays completely still and flat at z=0 with zero translation.
        // - New page (dd < 0.0) curls in from the left over the old page, and flattens/closes cleanly at the end.
        const mat = new THREE.ShaderMaterial({
          transparent: true,
          uniforms: {
            A: { value: null },
            B: { value: null },
            cA: { value: new THREE.Vector4(0, 0, 1, 1) },
            cB: { value: new THREE.Vector4(0, 0, 1, 1) },
            seam: { value: -1 },
            wn: { value: 0 },
            uLift: { value: variantRef.current.lift },
            uBlur: { value: variantRef.current.blur },
            uSqueeze: { value: variantRef.current.squeeze },
            uWNew: { value: variantRef.current.wNew },
            uCardMode: { value: sizeModeRef.current === 'card' ? 1.0 : 0.0 },
          },
          vertexShader: `
            uniform float seam, wn;
            uniform float uLift, uWNew;
            varying vec2 vUv;
            varying float vLift;
            void main(){
              vUv = uv;
              float dd = uv.x - seam;
              // Old page (dd >= 0.0) stays completely flat and still at z=0.
              // New page (dd < 0.0) curls in from the left, lifting toward camera with flare.
              float l = dd < 0.0 ? wn * pow(1.0 - clamp(-dd / uWNew, 0.0, 1.0), 2.0) : 0.0;
              vLift = l;
              vec3 p = position;
              p.z += l * uLift;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }`,
          fragmentShader: `
            uniform sampler2D A, B;
            uniform vec4 cA, cB;
            uniform float seam, wn;
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
              
              // Motion blur applies only to the curling new page near the seam
              float r = isNew ? uBlur * vLift : 0.0;
              // Squeeze applies only to incoming new page; old page stays right there itself with zero translation
              float x0 = vUv.x + (isNew ? uSqueeze * vLift : 0.0);
              
              vec3 col = vec3(0.0);
              float ws = 0.0;
              for (int i = -7; i <= 7; i++){
                float f = float(i) / 7.0, w = exp(-f * f * 2.5), o = r * f;
                col += w * vec3(smp(isNew, x0 + o * 1.2).r, smp(isNew, x0 + o).g, smp(isNew, x0 + o * 0.8).b);
                ws += w;
              }
              col /= ws;

              // Faint veil/paper sheen on the lifted curling strip of the new page
              if (isNew) {
                col = mix(col, vec3(1.0), 0.15 * vLift);
              }

              float dist = abs(vUv.x - seam);

              // Soft physical drop shadow cast by the curling new page onto the stationary old page underneath
              if (!isNew) {
                float shadow = 0.28 * exp(-dist / 0.05) * wn;
                col *= 1.0 - shadow;
              } else {
                float edgeShade = 0.15 * exp(-dist / 0.04) * wn;
                col *= 1.0 - edgeShade;
              }

              // Crisp fine edge highlight along the seam
              float rim = (1.0 - smoothstep(0.0, 0.022, dist)) * wn;
              vec3 rimCol = vec3(0.28, 0.29, 0.33);
              col = mix(col, rimCol, 0.6 * rim);

              // Card mode SDF rounded corners vs full-bleed coverage
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
            mat.uniforms.uWNew.value += (currentCfg.wNew - mat.uniforms.uWNew.value) * lerpSpeed

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

            // wn: rises smoothly as new page enters from left, stays lifted, and flattens/closes cleanly onto the surface at the end (tr -> 1.0)
            mat.uniforms.wn.value = ss(0.06, 0.28, tr) * (1 - ss(0.85, 1.0, tr))

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

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-screen overflow-hidden select-none transition-colors duration-500 ${
        sizeMode === 'card'
          ? 'bg-[radial-gradient(ellipse_at_50%_40%,#26262b,#0f0f12)]'
          : 'bg-black'
      } ${className}`}
    >
      {/* Background WebGL Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 block h-full w-full pointer-events-none z-0" />

      {/* Top-Left Floating Back Pill */}
      <div className="fixed top-5 left-5 z-30">
        <Link
          href="/"
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 bg-black/60 text-white/90 backdrop-blur-xl text-xs font-medium shadow-lg hover:bg-black/85 hover:text-white transition-all cursor-pointer select-none"
        >
          <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Components</span>
        </Link>
      </div>

      {/* Subtle backdrop vignette in full cover mode for depth and contrast */}
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
          <div className="flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl md:rounded-full border border-white/20 bg-zinc-950/90 text-zinc-100 shadow-2xl backdrop-blur-2xl text-xs font-sans">
            {/* 1. SIZE MODE SELECTOR: Full Cover | Center Card */}
            <div className="flex items-center bg-zinc-800/80 p-0.5 rounded-full">
              <button
                type="button"
                onClick={() => setSizeMode('full')}
                title="Full-bleed background covering 100% of the screen"
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  sizeMode === 'full'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
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
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Center Card
              </button>
            </div>

            <span className="hidden sm:inline w-px h-3.5 bg-zinc-700 mx-0.5" />

            {/* 2. VARIANT SELECTOR: Slow | Drape | Fast */}
            <div className="flex items-center bg-zinc-800/80 p-0.5 rounded-full">
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
                        ? 'bg-white text-zinc-950 shadow-sm'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    {VARIANTS[key].label}
                  </button>
                )
              })}
            </div>

            <span className="hidden sm:inline w-px h-3.5 bg-zinc-700 mx-0.5" />

            {/* 3. IMAGE COLLECTION SELECTOR: Unsplash | Local | Upload */}
            <div className="flex items-center bg-zinc-800/80 p-0.5 rounded-full">
              <button
                type="button"
                onClick={() => setSourceKey('unsplash')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  sourceKey === 'unsplash'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Unsplash
              </button>
              <button
                type="button"
                onClick={() => setSourceKey('local')}
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  sourceKey === 'local'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Local WebP
              </button>
              <label
                title="Upload your own custom images"
                className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                  sourceKey === 'custom'
                    ? 'bg-white text-zinc-950 shadow-sm'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                Upload
                <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}