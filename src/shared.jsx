import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import useTilt from './useTilt.js'

// ─── Reveal ──────────────────────────────────────────────────────────────────
export function Reveal({ children, className = '', ...rest }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div ref={ref} className={`reveal ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

// ─── Text helpers ─────────────────────────────────────────────────────────────
// Wraps §text§ delimiters in accent <span>.
export function highlight(text) {
  return text.split('§').map((part, i) =>
    i % 2 === 1 ? <span key={i}>{part}</span> : part
  )
}

// Wraps §text§ delimiters in <b>.
export function bold(text) {
  return text.split('§').map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : part
  )
}

// ─── PageHero ────────────────────────────────────────────────────────────────
export function PageHero({ eyebrow, title, sub }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        <Reveal>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1 className="page-hero-title">{title}</h1>
          {sub && <p className="page-hero-sub">{sub}</p>}
        </Reveal>
      </div>
    </section>
  )
}

// ─── SvcIcon ─────────────────────────────────────────────────────────────────
export function SvcIcon({ name }) {
  const icons = {
    api:       <><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></>,
    saas:      <><rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" /></>,
    whatsapp:  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />,
    db:        <><ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /></>,
    fullstack: <><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></>,
    team:      <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></>,
  }
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor"
      strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
      {icons[name]}
    </svg>
  )
}

// ─── ProjectCard ─────────────────────────────────────────────────────────────
export function ProjectCard({ p, selectedSkill }) {
  const tiltRef = useTilt()
  const hasSkill = selectedSkill
    ? p.stack.some((s) =>
        s.toLowerCase() === selectedSkill.toLowerCase() ||
        selectedSkill.toLowerCase().includes(s.toLowerCase())
      )
    : true
  const isDimmed = selectedSkill && !hasSkill

  return (
    <article ref={tiltRef} className={`card${p.featured ? ' featured' : ''}${isDimmed ? ' dimmed' : ''}`}>
      <div className="card-top">
        <span className="card-id">PROJECT // {p.id}</span>
        {p.flag && <span className="flag">{p.flag}</span>}
      </div>
      <h3>{p.title}</h3>
      <p>{p.desc}</p>
      <div className="card-bottom">
        <div className="stackline">
          {p.stack.map((s) => {
            const isMatched = selectedSkill && (
              s.toLowerCase() === selectedSkill.toLowerCase() ||
              selectedSkill.toLowerCase().includes(s.toLowerCase())
            )
            return <span key={s} className={isMatched ? 'highlighted-tag' : ''}>{s}</span>
          })}
        </div>
        {(p.github || p.demo) && (
          <div className="card-links">
            {p.github && (
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-link" aria-label="GitHub">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5"
                  fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
                </svg>
                <span>code</span>
              </a>
            )}
            {p.demo && (
              <a href={p.demo} target="_blank" rel="noopener noreferrer" className="card-link" aria-label="Live Demo">
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5"
                  fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
                </svg>
                <span>live</span>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

// ─── BlogCard ────────────────────────────────────────────────────────────────
export function BlogCard({ b }) {
  const tiltRef = useTilt({ max: 4 })
  return (
    <article ref={tiltRef} className="blog-card">
      {b.image && (
        <div className="blog-thumb">
          <img src={b.image} alt={b.title} loading="lazy" />
          <span className="blog-thumb-tag">{b.tag}</span>
        </div>
      )}
      <div className="blog-card-body">
        <div className="blog-meta">
          {!b.image && <span className="blog-tag">{b.tag}</span>}
          <span className="blog-date">{b.date} · {b.readTime}</span>
        </div>
        <h3 className="blog-title">{b.title}</h3>
        <p className="blog-excerpt">{b.excerpt}</p>
        <Link to={`/blog/${b.id}`} className="blog-link">
          Read post
          <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor"
            strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>
    </article>
  )
}
