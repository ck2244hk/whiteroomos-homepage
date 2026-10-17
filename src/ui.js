export function initTabs() {
  document.querySelectorAll('[data-tabs]').forEach(box => {
    const tabs = [...box.querySelectorAll('.tab')], panels = [...box.querySelectorAll('.panel')]
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => x.setAttribute('aria-selected', String(i === j)))
      panels.forEach((p, j) => { p.hidden = i !== j })
    }))
  })
}

export function initCopy() {
  document.querySelectorAll('.copy').forEach(btn => btn.addEventListener('click', async () => {
    const pre = btn.closest('.term').querySelector('pre')
    const cmds = pre.innerText.split('\n').filter(l => l.startsWith('$')).map(l => l.replace(/^\$\s?/, ''))
    const text = cmds.length ? cmds.join('\n') : pre.innerText
    const flash = label => { btn.textContent = label; setTimeout(() => { btn.textContent = 'Copy' }, 1400) }
    try { await navigator.clipboard.writeText(text); flash('Copied') } catch { flash('Press Ctrl+C') }
  }))
}

export function initScrollSpy() {
  const links = [...document.querySelectorAll('.side a')]
  if (!links.length) return
  const map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]))
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return
    links.forEach(l => l.classList.remove('on'))
    map.get(e.target.id)?.classList.add('on')
  }), { rootMargin: '-20% 0px -70% 0px' })
  map.forEach((_, id) => { const el = document.getElementById(id); if (el) io.observe(el) })
}

// Mark the top-nav link of the current page.
export function initNav() {
  const here = location.pathname.split('/').pop() || 'index.html'
  document.querySelectorAll('header.top nav a').forEach(a => {
    const [file, hash] = a.getAttribute('href').split('#')
    if (!hash && file === here) a.setAttribute('aria-current', 'page')
  })
}

// Welcome screen: plays once per session, any click or key skips it.
export function initIntro() {
  const el = document.getElementById('intro')
  if (!el || document.documentElement.classList.contains('no-intro')) return
  try { sessionStorage.setItem('wros-intro', '1') } catch {}
  const done = () => el.remove()
  el.addEventListener('animationend', e => { if (e.animationName === 'introOut') done() })
  const skip = () => el.classList.add('skip')
  el.addEventListener('click', skip)
  addEventListener('keydown', skip, { once: true })
}

// Reveal the page once the stylesheet and fonts are in, so nothing shows unstyled or in a fallback font.
export function initReady() {
  const root = document.documentElement
  const reveal = () => root.classList.remove('loading')
  const whenFonts = () => (document.fonts ? document.fonts.ready : Promise.resolve()).then(reveal, reveal)
  if (document.readyState === 'complete') whenFonts()
  else addEventListener('load', whenFonts, { once: true })
}
