// Dot grid that swells near the pointer. Static when the visitor prefers reduced motion.
const SPACING = 36, BASE_R = 1.2, MAX_R = 5.5, INFLUENCE = 140
const ACCENT = [160, 114, 74]

export function initBackground() {
  const canvas = document.getElementById('bg-canvas')
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  const still = matchMedia('(prefers-reduced-motion: reduce)').matches
  const mouse = { x: -9999, y: -9999 }
  let dots = [], W = 0, H = 0, raf = 0, tick = 0

  const lerp = (a, b, t) => a + (b - a) * t

  function resize() {
    W = canvas.width = innerWidth
    H = canvas.height = innerHeight
    dots = []
    for (let r = 0; r <= Math.ceil(H / SPACING); r++)
      for (let c = 0; c <= Math.ceil(W / SPACING); c++)
        dots.push({ x: c * SPACING, y: r * SPACING, phase: Math.random() * Math.PI * 2 })
  }

  function draw() {
    ctx.clearRect(0, 0, W, H)
    tick += 0.008
    for (const d of dots) {
      const dist = Math.hypot(d.x - mouse.x, d.y - mouse.y)
      const prox = Math.max(0, 1 - dist / INFLUENCE)
      const idle = still ? 0.7 : Math.sin(tick + d.phase) * 0.3 + 0.7
      const radius = BASE_R * idle + prox * (MAX_R - BASE_R)
      const gv = Math.round(lerp(218, 195, idle * 0.12))
      const a = lerp(0.28, 1, prox * 0.9 + idle * 0.08)
      const [r, g, b] = ACCENT.map(c => Math.round(lerp(gv, c, prox)))
      ctx.beginPath()
      ctx.arc(d.x, d.y, radius, 0, Math.PI * 2)
      ctx.fillStyle = `rgba(${r},${g},${b},${a.toFixed(2)})`
      ctx.fill()
    }
    if (!still) raf = requestAnimationFrame(draw)
  }

  addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; if (still) draw() })
  addEventListener('mouseleave', () => { mouse.x = mouse.y = -9999 })
  addEventListener('resize', () => { cancelAnimationFrame(raf); resize(); draw() })
  resize(); draw()
}
