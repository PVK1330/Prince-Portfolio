import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const ACCENT = 0x2dd4bf

function makeDotTexture(size = 64) {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const cx = size / 2
  const g = ctx.createRadialGradient(cx, cx, 0, cx, cx, cx)
  g.addColorStop(0,    'rgba(45,212,191,1)')
  g.addColorStop(0.35, 'rgba(45,212,191,0.65)')
  g.addColorStop(1,    'rgba(45,212,191,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

export default function Scene3D() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const isMobile  = window.matchMedia('(max-width: 880px)').matches
    const NODE_COUNT = isMobile ? 54 : 110   // main foreground nodes
    const BG_COUNT   = isMobile ? 20 : 44    // background depth layer
    const LINK_DIST  = isMobile ? 3.5 : 3.2  // connection threshold
    const BOX        = { x: 16, y: 11, z: 9 }

    // ── Renderer ────────────────────────────────────────────────
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) }
    catch (_) { return }
    if (!renderer) return

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene    = new THREE.Scene()
    const camera   = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 140)
    const baseCamZ = 26
    camera.position.set(0, 0, baseCamZ)

    const group = new THREE.Group()
    scene.add(group)

    const dotTex = makeDotTexture()

    // ── Main foreground nodes ────────────────────────────────────
    const positions  = new Float32Array(NODE_COUNT * 3)
    const velocities = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3
      positions[i3]     = (Math.random() * 2 - 1) * BOX.x
      positions[i3 + 1] = (Math.random() * 2 - 1) * BOX.y
      positions[i3 + 2] = (Math.random() * 2 - 1) * BOX.z
      velocities[i3]     = (Math.random() * 2 - 1) * 0.011
      velocities[i3 + 1] = (Math.random() * 2 - 1) * 0.011
      velocities[i3 + 2] = (Math.random() * 2 - 1) * 0.011
    }
    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const pointsMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: isMobile ? 0.50 : 0.42,
      map: dotTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    group.add(points)

    // ── Background (depth) nodes — smaller, dimmer, further back ─
    const bgPositions  = new Float32Array(BG_COUNT * 3)
    const bgVelocities = new Float32Array(BG_COUNT * 3)
    for (let i = 0; i < BG_COUNT; i++) {
      const i3 = i * 3
      bgPositions[i3]     = (Math.random() * 2 - 1) * BOX.x * 1.4
      bgPositions[i3 + 1] = (Math.random() * 2 - 1) * BOX.y * 1.4
      bgPositions[i3 + 2] = -(Math.random() * BOX.z * 2) - 2 // always further back
      bgVelocities[i3]     = (Math.random() * 2 - 1) * 0.006
      bgVelocities[i3 + 1] = (Math.random() * 2 - 1) * 0.006
      bgVelocities[i3 + 2] = (Math.random() * 2 - 1) * 0.003
    }
    const bgGeo = new THREE.BufferGeometry()
    bgGeo.setAttribute('position', new THREE.BufferAttribute(bgPositions, 3))
    const bgMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: isMobile ? 0.26 : 0.20,
      map: dotTex,
      transparent: true,
      opacity: 0.28,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    const bgPoints = new THREE.Points(bgGeo, bgMat)
    group.add(bgPoints)

    // ── Links (preallocated — main nodes only) ───────────────────
    const MAX_LINKS   = NODE_COUNT * 10
    const linkPositions = new Float32Array(MAX_LINKS * 2 * 3)
    const linkColors    = new Float32Array(MAX_LINKS * 2 * 3)
    const linkGeo       = new THREE.BufferGeometry()
    const linkPosAttr   = new THREE.BufferAttribute(linkPositions, 3)
    const linkColAttr   = new THREE.BufferAttribute(linkColors, 3)
    linkPosAttr.setUsage(THREE.DynamicDrawUsage)
    linkColAttr.setUsage(THREE.DynamicDrawUsage)
    linkGeo.setAttribute('position', linkPosAttr)
    linkGeo.setAttribute('color', linkColAttr)
    const linkMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(linkGeo, linkMat)
    group.add(lines)

    const accentColor = new THREE.Color(ACCENT)
    const linkDistSq  = LINK_DIST * LINK_DIST

    // ── Theme-aware materials (light vs dark mode) ───────────────
    let isLight = document.documentElement.getAttribute('data-theme') === 'light'

    const applyTheme = () => {
      isLight = document.documentElement.getAttribute('data-theme') === 'light'
      const col = new THREE.Color(isLight ? 0x0D9488 : ACCENT)
      pointsMat.color.copy(col)
      bgMat.color.copy(col)
      accentColor.copy(col)
      pointsMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      bgMat.blending     = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      linkMat.blending   = isLight ? THREE.NormalBlending : THREE.AdditiveBlending
      pointsMat.needsUpdate = true
      bgMat.needsUpdate     = true
      linkMat.needsUpdate   = true
    }
    const themeObserver = new MutationObserver(applyTheme)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] })
    applyTheme()

    function rebuildLinks() {
      let v = 0
      const maxVerts = MAX_LINKS * 2
      for (let i = 0; i < NODE_COUNT; i++) {
        const ai = i * 3
        const ax = positions[ai], ay = positions[ai + 1], az = positions[ai + 2]
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const bj = j * 3
          const dx = ax - positions[bj]
          const dy = ay - positions[bj + 1]
          const dz = az - positions[bj + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 > linkDistSq) continue
          if (v + 2 > maxVerts) break

          const t = 1 - Math.sqrt(d2) / LINK_DIST
          const c = t * 0.88
          const p = v * 3
          linkPositions[p]     = ax; linkPositions[p + 1] = ay; linkPositions[p + 2] = az
          linkPositions[p + 3] = positions[bj]; linkPositions[p + 4] = positions[bj + 1]; linkPositions[p + 5] = positions[bj + 2]
          linkColors[p]     = accentColor.r * c; linkColors[p + 1] = accentColor.g * c; linkColors[p + 2] = accentColor.b * c
          linkColors[p + 3] = accentColor.r * c; linkColors[p + 4] = accentColor.g * c; linkColors[p + 5] = accentColor.b * c
          v += 2
        }
        if (v + 2 > maxVerts) break
      }
      linkPosAttr.needsUpdate = true
      linkColAttr.needsUpdate = true
      linkGeo.setDrawRange(0, v)
    }

    // ── Pointer parallax + auto-rotation ────────────────────────
    const pointer = { x: 0, y: 0 }
    const target  = { x: 0, y: 0 }
    let scrollN   = 0, scrollEased = 0
    let autoRotY  = 0
    let isIdle    = true // start idle so scene auto-rotates until cursor moves
    let idleTimer = null

    const onPointerMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
      isIdle   = false
      clearTimeout(idleTimer)
      idleTimer = setTimeout(() => { isIdle = true }, 3500)
    }
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      scrollN   = Math.min(1, Math.max(0, window.scrollY / max))
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll',      onScroll,      { passive: true })
    onScroll()

    let time   = 0
    let frameId = null

    function renderFrame() {
      time += 0.007

      // ── Drift main nodes ──
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3
        positions[i3]     += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        if (positions[i3]     >  BOX.x || positions[i3]     < -BOX.x) velocities[i3]     *= -1
        if (positions[i3 + 1] >  BOX.y || positions[i3 + 1] < -BOX.y) velocities[i3 + 1] *= -1
        if (positions[i3 + 2] >  BOX.z || positions[i3 + 2] < -BOX.z) velocities[i3 + 2] *= -1
      }
      pointsGeo.attributes.position.needsUpdate = true

      // ── Drift background nodes ──
      for (let i = 0; i < BG_COUNT; i++) {
        const i3 = i * 3
        bgPositions[i3]     += bgVelocities[i3]
        bgPositions[i3 + 1] += bgVelocities[i3 + 1]
        bgPositions[i3 + 2] += bgVelocities[i3 + 2]
        if (bgPositions[i3]     >  BOX.x * 1.5 || bgPositions[i3]     < -BOX.x * 1.5) bgVelocities[i3]     *= -1
        if (bgPositions[i3 + 1] >  BOX.y * 1.5 || bgPositions[i3 + 1] < -BOX.y * 1.5) bgVelocities[i3 + 1] *= -1
        if (bgPositions[i3 + 2] >  0            || bgPositions[i3 + 2] < -BOX.z * 2.5) bgVelocities[i3 + 2] *= -1
      }
      bgGeo.attributes.position.needsUpdate = true

      rebuildLinks()

      // ── Breathing / pulsing (mode-aware) ──
      if (isLight) {
        pointsMat.opacity = 0.52 + Math.sin(time * 1.8) * 0.08
        bgMat.opacity     = 0.14 + Math.sin(time * 1.1 + 1.4) * 0.04
        linkMat.opacity   = 0.22 + Math.sin(time * 1.4 + 0.7) * 0.07
      } else {
        pointsMat.opacity = 0.80 + Math.sin(time * 1.8) * 0.11
        bgMat.opacity     = 0.26 + Math.sin(time * 1.1 + 1.4) * 0.07
        linkMat.opacity   = 0.55 + Math.sin(time * 1.4 + 0.7) * 0.12
      }

      // ── Auto-rotation: spins slowly when cursor is idle ──
      autoRotY += isIdle ? 0.0015 : 0.0002

      // ── Eased camera + group motion ──
      pointer.x   += (target.x - pointer.x) * 0.04
      pointer.y   += (target.y - pointer.y) * 0.04
      scrollEased += (scrollN  - scrollEased) * 0.06

      group.rotation.y = pointer.x * 0.35 + autoRotY
      group.rotation.x = pointer.y * 0.22 + Math.sin(time * 0.38) * 0.018 // gentle pitch wobble
      group.position.y = scrollEased * 6

      camera.position.x += (pointer.x * 3   - camera.position.x) * 0.05
      camera.position.y += (-pointer.y * 2  - camera.position.y) * 0.05
      camera.position.z = baseCamZ + scrollEased * 10
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    const loop = () => {
      frameId = requestAnimationFrame(loop)
      if (document.hidden) return
      renderFrame()
    }

    if (reduceMotion) {
      rebuildLinks()
      renderer.render(scene, camera)
    } else {
      // Start idle — lets the scene spin from the very first frame
      isIdle = true
      loop()
    }

    const onResize = () => {
      const w = mount.clientWidth, h = mount.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduceMotion) renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      clearTimeout(idleTimer)
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll',      onScroll)
      window.removeEventListener('resize',      onResize)
      pointsGeo.dispose(); bgGeo.dispose(); linkGeo.dispose()
      pointsMat.dispose(); bgMat.dispose(); linkMat.dispose()
      dotTex.dispose()
      renderer.dispose()
      if (renderer.domElement?.parentNode === mount) mount.removeChild(renderer.domElement)
    }
  }, [])

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />
}
