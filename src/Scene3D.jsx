import { useEffect, useRef } from 'react'
import * as THREE from 'three'

// Accent colour pulled from the design system (--accent: #2DD4BF).
const ACCENT = 0x2dd4bf

// Builds a soft round dot sprite via a canvas radial-gradient so PointsMaterial
// draws glowing circles instead of hard squares.
function makeDotTexture() {
  const size = 64
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(45,212,191,1)')
  g.addColorStop(0.35, 'rgba(45,212,191,0.65)')
  g.addColorStop(1, 'rgba(45,212,191,0)')
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

    const isMobile = window.matchMedia('(max-width: 880px)').matches
    const NODE_COUNT = isMobile ? 46 : 92
    const LINK_DIST = isMobile ? 3.4 : 3.0 // connection threshold distance
    const BOX = { x: 16, y: 11, z: 9 } // half-extents of the drift box

    // ---- Renderer (guarded: skip silently if WebGL is unavailable) ----
    let renderer
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    } catch (err) {
      return
    }
    if (!renderer) return

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      120
    )
    const baseCamZ = 26
    camera.position.set(0, 0, baseCamZ)

    const group = new THREE.Group()
    scene.add(group)

    // ---- Nodes ----
    const positions = new Float32Array(NODE_COUNT * 3)
    const velocities = new Float32Array(NODE_COUNT * 3)
    for (let i = 0; i < NODE_COUNT; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() * 2 - 1) * BOX.x
      positions[i3 + 1] = (Math.random() * 2 - 1) * BOX.y
      positions[i3 + 2] = (Math.random() * 2 - 1) * BOX.z
      velocities[i3] = (Math.random() * 2 - 1) * 0.012
      velocities[i3 + 1] = (Math.random() * 2 - 1) * 0.012
      velocities[i3 + 2] = (Math.random() * 2 - 1) * 0.012
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const dotTex = makeDotTexture()
    const pointsMat = new THREE.PointsMaterial({
      color: ACCENT,
      size: isMobile ? 0.5 : 0.42,
      map: dotTex,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      sizeAttenuation: true,
      blending: THREE.AdditiveBlending,
    })
    const points = new THREE.Points(pointsGeo, pointsMat)
    group.add(points)

    // ---- Links (preallocated buffer, redrawn each frame with setDrawRange) ----
    // Worst case is every pair connected; cap the buffer at a generous fraction.
    const MAX_LINKS = NODE_COUNT * 10
    const linkPositions = new Float32Array(MAX_LINKS * 2 * 3)
    const linkColors = new Float32Array(MAX_LINKS * 2 * 3)
    const linkGeo = new THREE.BufferGeometry()
    const linkPosAttr = new THREE.BufferAttribute(linkPositions, 3)
    const linkColAttr = new THREE.BufferAttribute(linkColors, 3)
    linkPosAttr.setUsage(THREE.DynamicDrawUsage)
    linkColAttr.setUsage(THREE.DynamicDrawUsage)
    linkGeo.setAttribute('position', linkPosAttr)
    linkGeo.setAttribute('color', linkColAttr)
    const linkMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })
    const lines = new THREE.LineSegments(linkGeo, linkMat)
    group.add(lines)

    const accent = new THREE.Color(ACCENT)
    const linkDistSq = LINK_DIST * LINK_DIST

    function rebuildLinks() {
      let v = 0 // vertex index into the link buffers
      const maxVerts = MAX_LINKS * 2
      for (let i = 0; i < NODE_COUNT; i++) {
        const ai = i * 3
        const ax = positions[ai]
        const ay = positions[ai + 1]
        const az = positions[ai + 2]
        for (let j = i + 1; j < NODE_COUNT; j++) {
          const bj = j * 3
          const dx = ax - positions[bj]
          const dy = ay - positions[bj + 1]
          const dz = az - positions[bj + 2]
          const d2 = dx * dx + dy * dy + dz * dz
          if (d2 > linkDistSq) continue
          if (v + 2 > maxVerts) break

          // Opacity fades with distance.
          const t = 1 - Math.sqrt(d2) / LINK_DIST
          const c = t * 0.85

          const p = v * 3
          linkPositions[p] = ax
          linkPositions[p + 1] = ay
          linkPositions[p + 2] = az
          linkPositions[p + 3] = positions[bj]
          linkPositions[p + 4] = positions[bj + 1]
          linkPositions[p + 5] = positions[bj + 2]

          linkColors[p] = accent.r * c
          linkColors[p + 1] = accent.g * c
          linkColors[p + 2] = accent.b * c
          linkColors[p + 3] = accent.r * c
          linkColors[p + 4] = accent.g * c
          linkColors[p + 5] = accent.b * c

          v += 2
        }
        if (v + 2 > maxVerts) break
      }
      linkPosAttr.needsUpdate = true
      linkColAttr.needsUpdate = true
      linkGeo.setDrawRange(0, v)
    }

    // ---- Pointer parallax + scroll depth (eased) ----
    const pointer = { x: 0, y: 0 }
    const target = { x: 0, y: 0 }
    let scrollN = 0 // 0..1 normalized scroll
    let scrollEased = 0

    const onPointerMove = (e) => {
      target.x = (e.clientX / window.innerWidth) * 2 - 1
      target.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      )
      scrollN = Math.min(1, Math.max(0, window.scrollY / max))
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    function renderFrame() {
      // Drift nodes and bounce them inside the box.
      for (let i = 0; i < NODE_COUNT; i++) {
        const i3 = i * 3
        positions[i3] += velocities[i3]
        positions[i3 + 1] += velocities[i3 + 1]
        positions[i3 + 2] += velocities[i3 + 2]
        if (positions[i3] > BOX.x || positions[i3] < -BOX.x) velocities[i3] *= -1
        if (positions[i3 + 1] > BOX.y || positions[i3 + 1] < -BOX.y)
          velocities[i3 + 1] *= -1
        if (positions[i3 + 2] > BOX.z || positions[i3 + 2] < -BOX.z)
          velocities[i3 + 2] *= -1
      }
      pointsGeo.attributes.position.needsUpdate = true
      rebuildLinks()

      // Eased pointer parallax.
      pointer.x += (target.x - pointer.x) * 0.04
      pointer.y += (target.y - pointer.y) * 0.04
      scrollEased += (scrollN - scrollEased) * 0.06

      group.rotation.y = pointer.x * 0.35
      group.rotation.x = pointer.y * 0.22
      group.position.y = scrollEased * 6 // scroll-driven group offset

      camera.position.x += (pointer.x * 3 - camera.position.x) * 0.05
      camera.position.y += (-pointer.y * 2 - camera.position.y) * 0.05
      camera.position.z = baseCamZ + scrollEased * 10 // scroll-driven depth
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
    }

    let frameId = null
    const loop = () => {
      frameId = requestAnimationFrame(loop)
      if (document.hidden) return // pause when tab is hidden
      renderFrame()
    }

    if (reduceMotion) {
      // Render a single static frame; no animation loop.
      rebuildLinks()
      renderer.render(scene, camera)
    } else {
      loop()
    }

    // ---- Resize ----
    const onResize = () => {
      const w = mount.clientWidth
      const h = mount.clientHeight
      if (!w || !h) return
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
      if (reduceMotion) renderer.render(scene, camera)
    }
    window.addEventListener('resize', onResize)

    // ---- Cleanup: fully dispose everything ----
    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      pointsGeo.dispose()
      linkGeo.dispose()
      pointsMat.dispose()
      linkMat.dispose()
      dotTex.dispose()
      renderer.dispose()
      if (renderer.domElement && renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div className="scene3d" ref={mountRef} aria-hidden="true" />
}
