import { useEffect, useRef } from 'react'

// Returns a ref. The referenced element gets a cursor-tracking perspective tilt
// (rotateX/rotateY eased toward target via rAF, written straight to the node —
// no React state) plus a moving radial teal "glare" overlay.
// Disabled on coarse pointers and when prefers-reduced-motion is set.
export default function useTilt({ max = 6 } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const disabled =
      typeof window.matchMedia === 'function' &&
      (window.matchMedia('(pointer: coarse)').matches ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches)
    if (disabled) return

    el.classList.add('tilt')

    // Moving radial glare appended inside the element.
    const glare = document.createElement('span')
    glare.className = 'tilt-glare'
    glare.setAttribute('aria-hidden', 'true')
    el.appendChild(glare)

    const target = { rx: 0, ry: 0, gx: 50, gy: 50, g: 0 }
    const cur = { rx: 0, ry: 0, gx: 50, gy: 50, g: 0 }
    let frameId = null
    let hovering = false

    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width // 0..1
      const py = (e.clientY - r.top) / r.height // 0..1
      target.ry = (px - 0.5) * 2 * max // rotateY from horizontal position
      target.rx = -(py - 0.5) * 2 * max // rotateX from vertical position
      target.gx = px * 100
      target.gy = py * 100
      target.g = 1
    }

    const onEnter = () => {
      hovering = true
      if (frameId === null) frameId = requestAnimationFrame(tick)
    }

    const onLeave = () => {
      hovering = false
      target.rx = 0
      target.ry = 0
      target.g = 0
    }

    function tick() {
      cur.rx += (target.rx - cur.rx) * 0.12
      cur.ry += (target.ry - cur.ry) * 0.12
      cur.gx += (target.gx - cur.gx) * 0.12
      cur.gy += (target.gy - cur.gy) * 0.12
      cur.g += (target.g - cur.g) * 0.12

      el.style.transform = `perspective(900px) rotateX(${cur.rx.toFixed(
        2
      )}deg) rotateY(${cur.ry.toFixed(2)}deg)`
      glare.style.background = `radial-gradient(circle at ${cur.gx.toFixed(
        1
      )}% ${cur.gy.toFixed(1)}%, rgba(45,212,191,${(cur.g * 0.18).toFixed(
        3
      )}), transparent 60%)`

      // Keep animating until everything has settled back to rest.
      const settled =
        !hovering &&
        Math.abs(cur.rx) < 0.02 &&
        Math.abs(cur.ry) < 0.02 &&
        cur.g < 0.01
      if (settled) {
        el.style.transform = ''
        glare.style.background = ''
        frameId = null
        return
      }
      frameId = requestAnimationFrame(tick)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerenter', onEnter)
      el.removeEventListener('pointerleave', onLeave)
      el.classList.remove('tilt')
      el.style.transform = ''
      if (glare.parentNode === el) el.removeChild(glare)
    }
  }, [max])

  return ref
}
