import { useEffect, useRef } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { blogs } from './data.js'

// Scroll-reveal (same as main app Reveal, but simpler for the detail page).
function Reveal({ children, className = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('in'); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el) } },
      { threshold: 0.1 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${className}`.trim()}>{children}</div>
}

// Renders a single content block from blog.body.
function Block({ block }) {
  switch (block.type) {
    case 'lead':
      return <p className="bd-lead">{block.text}</p>
    case 'h2':
      return <h2 className="bd-h2">{block.text}</h2>
    case 'h3':
      return <h3 className="bd-h3">{block.text}</h3>
    case 'p':
      return <p className="bd-p">{block.text}</p>
    case 'code':
      return (
        <div className="bd-code-wrap">
          {block.lang && <span className="bd-code-lang">{block.lang}</span>}
          <pre className="bd-code"><code>{block.text}</code></pre>
        </div>
      )
    case 'callout':
      return (
        <div className="bd-callout">
          <span className="bd-callout-icon">→</span>
          <p>{block.text}</p>
        </div>
      )
    case 'ul':
      return (
        <ul className="bd-list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      )
    default:
      return null
  }
}

export default function BlogDetail() {
  const { id } = useParams()
  const post = blogs.find((b) => b.id === id)

  // Scroll to top when navigating to a post.
  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!post) return <Navigate to="/" replace />

  const postIndex = blogs.findIndex((b) => b.id === id)
  const prev = blogs[postIndex - 1] ?? null
  const next = blogs[postIndex + 1] ?? null

  return (
    <main className="bd-page">
      <div className="bd-container">
        {/* Breadcrumb */}
        <Reveal>
          <nav className="bd-breadcrumb" aria-label="breadcrumb">
            <Link to="/" className="bd-back">
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor"
                strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to portfolio
            </Link>
            <span className="bd-sep">/</span>
            <span className="bd-crumb">blog</span>
          </nav>
        </Reveal>

        {/* Post header */}
        <Reveal>
          <header className="bd-header">
            <div className="bd-meta">
              <span className="bd-tag">{post.tag}</span>
              <span className="bd-date">{post.date}</span>
              <span className="bd-dot" />
              <span className="bd-read">{post.readTime}</span>
            </div>
            <h1 className="bd-title">{post.title}</h1>
          </header>
        </Reveal>

        {/* Post body */}
        <Reveal className="bd-body">
          {(post.body ?? []).map((block, i) => (
            <Block key={i} block={block} />
          ))}
        </Reveal>

        {/* Prev / Next navigation */}
        <Reveal>
          <div className="bd-nav">
            {prev ? (
              <Link to={`/blog/${prev.id}`} className="bd-nav-link bd-nav-prev">
                <span className="bd-nav-dir">← Previous</span>
                <span className="bd-nav-ptitle">{prev.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link to={`/blog/${next.id}`} className="bd-nav-link bd-nav-next">
                <span className="bd-nav-dir">Next →</span>
                <span className="bd-nav-ptitle">{next.title}</span>
              </Link>
            ) : <span />}
          </div>
        </Reveal>
      </div>
    </main>
  )
}
