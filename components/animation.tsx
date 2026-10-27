'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useTheme } from 'next-themes'
import { cn } from '@/lib/utils'

/* ============================== PRESET DECKS ============================== */
const ACC_IMAGES = [
  '/acc-1.webp',
  '/acc-2.webp',
  '/acc-3.webp',
  '/acc-4.webp',
  '/acc-5.webp',
]

const UNSPLASH_IDS = [
  '1506744038136-46273834b3fb',
  '1470071459604-3b5ec3a7fe05',
  '1441974231531-c6227db76b6e',
  '1469474968028-56623f02e42e',
  '1501785888041-af3ef285b470',
  '1519681393784-d120267933ba',
]
const getUnsplashUrl = (id: string) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=1600&q=80`

const UNSPLASH_IMAGES = UNSPLASH_IDS.map((id) => getUnsplashUrl(id))

/* ============================== LIVE DIALKIT PROPS ============================== */
export interface DialKitProps {
  // Dynamics
  period: number      // Seconds per page (measured default: 2.03)
  trans: number       // Seconds of curl (measured default: 0.80)
  // 3D Geometry
  lift: number        // Max lift toward camera -> top/bottom flare (default: 0.90)
  wOld: number        // Lifted OLD page extends right of seam (default: 0.45)
  wNew: number        // Lifted NEW page extends left of seam (default: 0.25)
  // Optics & Post
  blur: number        // Max horizontal blur (default: 0.07)
  squeeze: number     // New page content wrap/squeeze (default: 0.10)
  cornerRadius: number// Rounded corners SDF (default: 0.09)
}

const DEFAULT_DIALKIT: DialKitProps = {
  period: 2.03,
  trans: 0.80,
  lift: 0.90,
  wOld: 0.45,
  wNew: 0.25,
  blur: 0.07,
  squeeze: 0.10,
  cornerRadius: 0.09,
}

const PRESETS: Record<string, { label: string; props: DialKitProps }> = {
  duo: {
    label: 'Duo Default',
    props: { ...DEFAULT_DIALKIT },
  },
  slow: {
    label: 'Slow Drama',
    props: {
      period: 3.20,
      trans: 1.40,
      lift: 1.25,
      wOld: 0.55,
      wNew: 0.35,
      blur: 0.10,
      squeeze: 0.14,
      cornerRadius: 0.10,
    },
  },
  snappy: {
    label: 'Snappy Flip',
    props: {
      period: 1.40,
      trans: 0.45,
      lift: 0.65,
      wOld: 0.35,
      wNew: 0.18,
      blur: 0.04,
      squeeze: 0.06,
      cornerRadius: 0.08,
    },
  },
  flare: {
    label: 'Deep Flare',
    props: {
      period: 2.40,
      trans: 0.95,
      lift: 1.60,
      wOld: 0.60,
      wNew: 0.38,
      blur: 0.12,
      squeeze: 0.18,
      cornerRadius: 0.12,
    },
  },
}

const W = 4
const H = 3 // 4:3 card geometry

// Smoothstep utility from duo.html
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

export default function PageCurlTransition() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(ACC_IMAGES.length)
  const [error, setError] = useState<string | null>(null)

  // Current image deck
  const [deckType, setDeckType] = useState<'acc' | 'unsplash' | 'custom'>('acc')
  const [imageUrls, setImageUrls] = useState<string[]>(ACC_IMAGES)

  // Live DialKit adjustment state
  const [dials, setDials] = useState<DialKitProps>({ ...DEFAULT_DIALKIT })
  const [activePreset, setActivePreset] = useState<string>('duo')
  const [dialKitOpen, setDialKitOpen] = useState(true)
  const [activeTab, setActiveTab] = useState<'all' | 'dynamics' | 'geometry' | 'optics'>('all')

  // Real-time ref so animation loop reads new values on EVERY frame with zero stutter
  const dialsRef = useRef<DialKitProps>(dials)
  useEffect(() => {
    dialsRef.current = dials
  }, [dials])

  useEffect(() => {
    setMounted(true)
  }, [])

  const updateDial = (key: keyof DialKitProps, val: number) => {
    setDials((prev) => ({ ...prev, [key]: val }))
    setActivePreset('')
  }

  const applyPreset = (key: string) => {
    if (PRESETS[key]) {
      setDials({ ...PRESETS[key].props })
      setActivePreset(key)
    }
  }

  const resetDials = () => {
    setDials({ ...DEFAULT_DIALKIT })
    setActivePreset('duo')
  }

  /* ---------- Switch Predefined Deck ---------- */
  const selectDeck = (type: 'acc' | 'unsplash') => {
    setDeckType(type)
    if (type === 'acc') setImageUrls(ACC_IMAGES)
    if (type === 'unsplash') setImageUrls(UNSPLASH_IMAGES)
  }

  /* ---------- User Image Upload ---------- */
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((file) => file.type.startsWith('image/'))
    e.target.value = ''
    if (files.length === 0) return
    setDeckType('custom')
    setImageUrls(files.map((file) => URL.createObjectURL(file)))
  }

  useEffect(() => {
    let disposed = false
    let animId: number
    let cleanupResize: () => void

    loadThreeJs()
      .then((THREE) => {
        if (disposed) return

        const canvas = canvasRef.current
        const container = containerRef.current
        if (!canvas || !container) return

        // 1. Fallback texture generator (matching duo.html)
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

        // 2. Texture loader with exact 4:3 cover crop (matching duo.html)
        function loadTexture(u: string, i: number): Promise<any> {
          return new Promise((res) => {
            const loader = new THREE.TextureLoader()
            loader.setCrossOrigin('anonymous')
            loader.load(
              u,
              (t: any) => {
                t.minFilter = t.magFilter = THREE.LinearFilter
                t.generateMipmaps = false
                const a = t.image.width / t.image.height
                const ca = W / H // "cover" crop to 4:3
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

        // 3. Renderer & Perspective Camera (matching duo.html)
        const renderer = new THREE.WebGLRenderer({
          canvas,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        })
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100)

        function resize() {
          if (!container) return
          const w = container.clientWidth || window.innerWidth
          const h = container.clientHeight || window.innerHeight
          renderer.setSize(w, h, false)
          camera.aspect = w / h
          const need = Math.max(H * 1.22, (W * 1.12) / camera.aspect)
          camera.position.z = need / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)))
          camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', resize)
        cleanupResize = () => window.removeEventListener('resize', resize)
        resize()

        // 4. Shader Material with LIVE Uniforms for DialKit Adjustments
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
            // DialKit Live Uniforms (Dynamic injection)
            uWOld: { value: dialsRef.current.wOld },
            uWNew: { value: dialsRef.current.wNew },
            uLift: { value: dialsRef.current.lift },
            uBlur: { value: dialsRef.current.blur },
            uSqueeze: { value: dialsRef.current.squeeze },
            uCorner: { value: dialsRef.current.cornerRadius },
          },
          vertexShader: `
            uniform float seam, wo, wn;
            uniform float uWOld, uWNew, uLift;
            varying vec2 vUv; varying float vLift;
            void main(){
              vUv = uv;
              float dd = uv.x - seam;
              // Lift is highest AT the straight seam and falls off with distance (concave, steep at the seam).
              float l = dd >= 0.0 ? wo * pow(1.0 - clamp( dd / uWOld, 0.0, 1.0), 2.0)
                                  : wn * pow(1.0 - clamp(-dd / uWNew, 0.0, 1.0), 2.0);
              vLift = l;
              vec3 p = position; p.z += l * uLift;
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }`,
          fragmentShader: `
            uniform sampler2D A, B; uniform vec4 cA, cB; uniform float seam, wo, wn;
            uniform float uBlur, uSqueeze, uCorner;
            varying vec2 vUv; varying float vLift;
            vec3 smp(bool n, float x){
              float u = clamp(x, 0.0, 1.0);
              return n ? texture2D(B, cB.xy + vec2(u, vUv.y) * cB.zw).rgb
                       : texture2D(A, cA.xy + vec2(u, vUv.y) * cA.zw).rgb;
            }
            void main(){
              bool isNew = vUv.x < seam;                       // crisp straight seam: chosen per pixel
              float lw = isNew ? wn : wo;
              float r = uBlur * vLift;
              float x0 = vUv.x + (isNew ? uSqueeze * vLift : 0.0);
              vec3 col = vec3(0.0); float ws = 0.0;
              for (int i = -7; i <= 7; i++){
                float f = float(i) / 7.0, w = exp(-f*f*2.5), o = r * f;
                col += w * vec3(smp(isNew, x0 + o*1.2).r, smp(isNew, x0 + o).g, smp(isNew, x0 + o*0.8).b);
                ws += w;
              }
              col /= ws;
              col = mix(col, vec3(1.0), 0.15 * vLift);                         // faint veil on the lifted strip
              float dist = abs(vUv.x - seam);
              col *= 1.0 - 0.25 * exp(-dist / 0.05) * lw;                      // soft shade toward the edge
              float rim = (1.0 - smoothstep(0.0, 0.022, dist)) * lw;           // grey rim along the edge
              col = mix(col, vec3(0.28, 0.29, 0.33), 0.6 * rim);
              vec2 p = (vUv - 0.5) * vec2(${W.toFixed(1)}, ${H.toFixed(1)});
              vec2 q = abs(p) - vec2(${(W / 2).toFixed(1)}, ${(H / 2).toFixed(1)}) + uCorner;
              float sdf = length(max(q, 0.0)) - uCorner;                       // rounded corners
              gl_FragColor = vec4(col, 1.0 - smoothstep(-0.004, 0.004, sdf));
            }`,
        })

        // 5. Plane Mesh (400x24 segments as in duo.html)
        const scene = new THREE.Scene()
        const geometry = new THREE.PlaneGeometry(W, H, 400, 24)
        const mesh = new THREE.Mesh(geometry, mat)
        scene.add(mesh)

        // 6. Load all textures and initiate loop
        setLoading(true)
        Promise.all(imageUrls.map((src, i) => loadTexture(src, i))).then((tex) => {
          if (disposed) return
          setLoading(false)
          setCount(tex.length)

          const t0 = performance.now()

          function loop() {
            if (disposed) return
            const currentDials = dialsRef.current

            // Live-sync uniforms to current DialKit sliders every frame
            mat.uniforms.uWOld.value = currentDials.wOld
            mat.uniforms.uWNew.value = currentDials.wNew
            mat.uniforms.uLift.value = currentDials.lift
            mat.uniforms.uBlur.value = currentDials.blur
            mat.uniforms.uSqueeze.value = currentDials.squeeze
            mat.uniforms.uCorner.value = currentDials.cornerRadius

            const PERIOD = currentDials.period
            const TRANS = Math.min(currentDials.trans, PERIOD * 0.95)

            const t = (performance.now() - t0) / 1000
            const idx = Math.floor(t / PERIOD)
            const c = t % PERIOD
            const tr = Math.min(1, Math.max(0, (c - (PERIOD - TRANS)) / TRANS))
            const e = tr * tr * (3 - 2 * tr)

            const A = tex[idx % tex.length]
            const B = tex[(idx + 1) % tex.length]

            mat.uniforms.A.value = A
            mat.uniforms.B.value = B
            mat.uniforms.cA.value = A.userData.crop
            mat.uniforms.cB.value = B.userData.crop
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
  }, [imageUrls])

  const isDark = mounted ? resolvedTheme === 'dark' : false

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-screen w-full overflow-hidden select-none transition-colors duration-500',
        /* Pure theme-responsive radial gradient matching duo.html exactly */
        'bg-[radial-gradient(ellipse_at_50%_40%,#f6f6f6,#dcdcde)] dark:bg-[radial-gradient(ellipse_at_50%_40%,#2b2b30,#101013)]'
      )}
    >
      <canvas ref={canvasRef} className="block h-full w-full" />

      {loading && !error && (
        <div className="absolute inset-0 grid place-items-center font-sans text-sm text-[#555] dark:text-[#aaa] pointer-events-none">
          Loading images…
        </div>
      )}

      {error && (
        <div className="absolute inset-0 grid place-items-center font-sans text-sm text-red-500 pointer-events-none">
          {error}
        </div>
      )}

      {/* =========================================================================
          DIALKIT LIVE ADJUSTMENT STUDIO DOCK (Floats gracefully in the corner)
         ========================================================================= */}
      <div className="fixed top-4 right-4 z-40 flex flex-col items-end gap-2 pointer-events-none font-sans">
        {/* Toggle Pill Button */}
        <button
          type="button"
          onClick={() => setDialKitOpen((prev) => !prev)}
          className={cn(
            'pointer-events-auto inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide backdrop-blur-xl transition-all cursor-pointer shadow-lg border',
            dialKitOpen
              ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-black/10 dark:border-white/10'
              : 'bg-white/90 text-zinc-900 dark:bg-zinc-900/90 dark:text-zinc-100 hover:scale-105 border-black/10 dark:border-white/15'
          )}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>DialKit Live Studio</span>
          <span className="text-[10px] opacity-70">({dialKitOpen ? 'Hide' : 'Open'})</span>
        </button>

        {/* Collapsible Adjustment Glassmorphism Panel */}
        {dialKitOpen && (
          <div className="pointer-events-auto w-[330px] max-h-[calc(100vh-80px)] overflow-y-auto p-4 rounded-2xl border border-black/10 dark:border-white/10 bg-white/90 dark:bg-zinc-950/85 backdrop-blur-2xl shadow-2xl text-zinc-900 dark:text-zinc-100 flex flex-col gap-3.5 text-xs">
            {/* Header: Presets & Theme */}
            <div className="flex items-center justify-between pb-2 border-b border-black/5 dark:border-white/10">
              <div className="flex flex-col">
                <span className="font-bold text-[13px] tracking-tight">Duo Page-Curl Dials</span>
                <span className="text-[10px] text-zinc-500 dark:text-zinc-400">Live WebGL Shader Adjustments</span>
              </div>
              <div className="flex items-center gap-1.5">
                {/* Theme Toggle Button */}
                <button
                  type="button"
                  title="Toggle Light/Dark Theme"
                  onClick={() => setTheme(isDark ? 'light' : 'dark')}
                  className="px-2 py-1 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-xs transition-colors cursor-pointer"
                >
                  {isDark ? '🌙 Dark' : '☀️ Light'}
                </button>
                {/* Reset All */}
                <button
                  type="button"
                  title="Reset to Measured Duo Defaults"
                  onClick={resetDials}
                  className="px-2 py-1 rounded-lg border border-black/10 dark:border-white/15 hover:bg-black/5 dark:hover:bg-white/10 text-[10px] text-zinc-600 dark:text-zinc-400 transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                Quick Presets
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {Object.entries(PRESETS).map(([key, item]) => {
                  const active = activePreset === key
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => applyPreset(key)}
                      className={cn(
                        'py-1.5 px-2 rounded-lg text-left transition-all border cursor-pointer flex flex-col',
                        active
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 font-semibold border-transparent shadow-sm'
                          : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-black/10 dark:hover:bg-white/10'
                      )}
                    >
                      <span className="text-[11px] leading-tight">{item.label}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center p-0.5 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/10">
              {(['all', 'dynamics', 'geometry', 'optics'] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    'flex-1 py-1 text-[10px] font-semibold capitalize rounded-md transition-all cursor-pointer',
                    activeTab === tab
                      ? 'bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
                  )}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Live Sliders List */}
            <div className="flex flex-col gap-3 pt-1">
              {/* --- DYNAMICS --- */}
              {(activeTab === 'all' || activeTab === 'dynamics') && (
                <>
                  {/* Period Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Page Interval (PERIOD)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.period.toFixed(2)}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={1.0}
                      max={5.0}
                      step={0.05}
                      value={dials.period}
                      onChange={(e) => updateDial('period', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>

                  {/* Trans Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Curl Duration (TRANS)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.trans.toFixed(2)}s
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.3}
                      max={2.0}
                      step={0.05}
                      value={dials.trans}
                      onChange={(e) => updateDial('trans', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>
                </>
              )}

              {/* --- 3D GEOMETRY --- */}
              {(activeTab === 'all' || activeTab === 'geometry') && (
                <>
                  {/* Lift Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Curl Lift / Flare (LIFT)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.lift.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={2.2}
                      step={0.05}
                      value={dials.lift}
                      onChange={(e) => updateDial('lift', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>

                  {/* W_OLD Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Old Lift Span (W_OLD)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.wOld.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.1}
                      max={0.8}
                      step={0.01}
                      value={dials.wOld}
                      onChange={(e) => updateDial('wOld', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>

                  {/* W_NEW Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">New Lift Span (W_NEW)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.wNew.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.05}
                      max={0.6}
                      step={0.01}
                      value={dials.wNew}
                      onChange={(e) => updateDial('wNew', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>
                </>
              )}

              {/* --- OPTICS & SHADERS --- */}
              {(activeTab === 'all' || activeTab === 'optics') && (
                <>
                  {/* Blur Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Gaussian Blur (BLUR)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.blur.toFixed(3)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.0}
                      max={0.2}
                      step={0.005}
                      value={dials.blur}
                      onChange={(e) => updateDial('blur', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>

                  {/* Squeeze Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Wrap Squeeze (SQUEEZE)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.squeeze.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.0}
                      max={0.3}
                      step={0.01}
                      value={dials.squeeze}
                      onChange={(e) => updateDial('squeeze', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>

                  {/* Corner Radius Slider */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-medium text-zinc-600 dark:text-zinc-400">Corner Radius (SDF)</span>
                      <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">
                        {dials.cornerRadius.toFixed(2)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.0}
                      max={0.3}
                      step={0.01}
                      value={dials.cornerRadius}
                      onChange={(e) => updateDial('cornerRadius', parseFloat(e.target.value))}
                      className="w-full accent-zinc-900 dark:accent-white cursor-pointer h-1.5 rounded-lg bg-black/10 dark:bg-white/15"
                    />
                  </div>
                </>
              )}
            </div>

            {/* Image Deck Selector */}
            <div className="pt-2 border-t border-black/5 dark:border-white/10 flex flex-col gap-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                Image Deck
              </span>
              <div className="grid grid-cols-3 gap-1">
                <button
                  type="button"
                  onClick={() => selectDeck('acc')}
                  className={cn(
                    'py-1 px-1.5 rounded-md text-[10px] font-semibold transition-all border cursor-pointer text-center',
                    deckType === 'acc'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-transparent shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                  )}
                >
                  acc-1..5
                </button>
                <button
                  type="button"
                  onClick={() => selectDeck('unsplash')}
                  className={cn(
                    'py-1 px-1.5 rounded-md text-[10px] font-semibold transition-all border cursor-pointer text-center',
                    deckType === 'unsplash'
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 border-transparent shadow-xs'
                      : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                  )}
                >
                  Unsplash
                </button>
                <label className="py-1 px-1.5 rounded-md text-[10px] font-semibold transition-all border cursor-pointer text-center bg-black/5 dark:bg-white/5 border-black/5 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:bg-black/10 dark:hover:bg-white/10">
                  Upload…
                  <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bottom Minimal Dock: Quick Upload & Card Count */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-white/90 dark:bg-zinc-900/90 border border-black/10 dark:border-white/15 px-4 py-2 text-xs text-zinc-900 dark:text-zinc-100 backdrop-blur-xl shadow-xl z-30 font-sans">
        <label className="cursor-pointer rounded-full bg-zinc-900 text-white dark:bg-white dark:text-zinc-950 px-3 py-1 font-semibold transition hover:opacity-90">
          Upload images
          <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
        </label>
        <span className="text-zinc-500 dark:text-zinc-400">
          Deck: <strong className="text-zinc-900 dark:text-zinc-100 font-medium">{deckType}</strong> ({count} images)
        </span>
      </div>
    </div>
  )
}