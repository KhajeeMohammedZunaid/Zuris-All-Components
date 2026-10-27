'use client'

import React, { useEffect, useRef, useState } from 'react'

/* ============================== CONFIG ============================== */
// Measured exact parameters from duo.html
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

const PERIOD = 2.03 // seconds per page (measured)
const TRANS = 0.80  // seconds of curl (measured)
const W_OLD = 0.45  // lifted OLD page extends this far right of the seam (fraction of card width)
const W_NEW = 0.25  // lifted NEW page extends this far left of the seam
const LIFT = 0.9    // max lift toward the camera -> top/bottom flare
const BLUR = 0.07   // max horizontal blur (uv), strongest at the seam
const SQUEEZE = 0.10 // new-page content wraps in from the right near the seam
const W = 4
const H = 3         // card size (4:3)

const f2 = (n: number) => n.toFixed(3)

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
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [loading, setLoading] = useState(true)
  const [count, setCount] = useState(UNSPLASH_IDS.length)
  const [error, setError] = useState<string | null>(null)

  // Current image URLs (defaults to Unsplash, or user uploaded)
  const [imageUrls, setImageUrls] = useState<string[]>(() =>
    UNSPLASH_IDS.map((id) => getUnsplashUrl(id))
  )

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

        // 4. Shader Material with exact GLSL from duo.html
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
          },
          vertexShader: `
            uniform float seam, wo, wn;
            varying vec2 vUv; varying float vLift;
            void main(){
              vUv = uv;
              float dd = uv.x - seam;
              // Lift is highest AT the straight seam and falls off with distance (concave, steep at the seam).
              float l = dd >= 0.0 ? wo * pow(1.0 - clamp( dd / ${f2(W_OLD)}, 0.0, 1.0), 2.0)
                                  : wn * pow(1.0 - clamp(-dd / ${f2(W_NEW)}, 0.0, 1.0), 2.0);
              vLift = l;
              vec3 p = position; p.z += l * ${f2(LIFT)};
              gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
            }`,
          fragmentShader: `
            uniform sampler2D A, B; uniform vec4 cA, cB; uniform float seam, wo, wn;
            varying vec2 vUv; varying float vLift;
            vec3 smp(bool n, float x){
              float u = clamp(x, 0.0, 1.0);
              return n ? texture2D(B, cB.xy + vec2(u, vUv.y) * cB.zw).rgb
                       : texture2D(A, cA.xy + vec2(u, vUv.y) * cA.zw).rgb;
            }
            void main(){
              bool isNew = vUv.x < seam;                       // crisp straight seam: chosen per pixel
              float lw = isNew ? wn : wo;
              float r = ${f2(BLUR)} * vLift;
              float x0 = vUv.x + (isNew ? ${f2(SQUEEZE)} * vLift : 0.0);
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
              vec2 q = abs(p) - vec2(${(W / 2).toFixed(1)}, ${(H / 2).toFixed(1)}) + 0.09;
              float sdf = length(max(q, 0.0)) - 0.09;                          // rounded corners
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

  /* ---------- User Image Upload ---------- */
  const onFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []).filter((file) => file.type.startsWith('image/'))
    e.target.value = ''
    if (files.length === 0) return
    setImageUrls(files.map((file) => URL.createObjectURL(file)))
  }

  const onReset = () => {
    setImageUrls(UNSPLASH_IDS.map((id) => getUnsplashUrl(id)))
  }

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden bg-[radial-gradient(ellipse_at_50%_40%,#f6f6f6,#dcdcde)] dark:bg-[radial-gradient(ellipse_at_50%_40%,#2b2b30,#101013)] select-none"
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

      {/* Floating Bottom Upload & Reset Bar */}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3 rounded-full bg-black/80 px-4 py-2 text-sm text-white backdrop-blur shadow-2xl z-30">
        <label className="cursor-pointer rounded-full bg-white px-3 py-1 font-medium text-black transition hover:bg-neutral-200">
          Upload images
          <input type="file" accept="image/*" multiple className="hidden" onChange={onFiles} />
        </label>
        <button
          type="button"
          onClick={onReset}
          className="rounded-full px-3 py-1 text-white/80 transition hover:text-white cursor-pointer"
        >
          Reset
        </button>
        <span className="text-white/60">
          {count} {count === 1 ? 'image' : 'images'}
        </span>
      </div>
    </div>
  )
}