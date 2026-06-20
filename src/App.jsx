import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import {
  profile,
  status,
  about,
  aboutStats,
  stack,
  services,
  experience,
  projects,
  blogs,
  education,
  certs,
} from './data.js'
import useTilt from './useTilt.js'
import BlogDetail from './BlogDetail.jsx'

// Three.js scene — code-split into its own chunk so the page paints fast.
const Scene3D = lazy(() => import('./Scene3D.jsx'))

// Renders text where §...§ wraps an accent-highlighted span.
function highlight(text) {
  return text.split('§').map((part, i) =>
    i % 2 === 1 ? <span key={i}>{part}</span> : part
  )
}
// Same, but bold (used in experience bullet points).
function bold(text) {
  return text.split('§').map((part, i) =>
    i % 2 === 1 ? <b key={i}>{part}</b> : part
  )
}

// Adds the `in` class to a `.reveal` element when it scrolls into view.
function Reveal({ children, className = '', ...rest }) {
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

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav({ activeSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const isBlogDetail = pathname.startsWith('/blog/')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on route change.
  useEffect(() => { setOpen(false) }, [pathname])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-inner">
        {/* Brand — Link so it works from the blog detail page too. */}
        <Link to="/" className="brand" onClick={close}>
          <img src="/logo.png" alt="PK Logo" className="brand-logo" />
          <span className="brand-name">{profile.brand}</span>
          <span className="dot" />
        </Link>

        <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Site navigation">
          {isBlogDetail ? (
            /* On blog detail: single back link */
            <Link to="/" className="nav-back-link" onClick={close}>
              ← back to portfolio
            </Link>
          ) : (
            /* On portfolio: section anchor links */
            <>
              <a href="#about"    className={activeSection === 'about'    ? 'active' : ''} onClick={close}>about</a>
              <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={close}>services</a>
              <a href="#work"     className={activeSection === 'work'     ? 'active' : ''} onClick={close}>projects</a>
              <a href="#blog"     className={activeSection === 'blog'     ? 'active' : ''} onClick={close}>blog</a>
              <a href="#contact"  className={`nav-cta ${activeSection === 'contact' ? 'active' : ''}`} onClick={close}>Contact</a>
            </>
          )}
        </nav>

        <button
          className={`nav-toggle${open ? ' open' : ''}`}
          aria-label="Toggle menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>
    </header>
  )
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const statusTilt = useTilt()
  return (
    <section id="top" className="hero">
      <div className="wrap">
        <div className="hero-grid">
          <Reveal>
            <div className="eyebrow">{profile.role}</div>
            <h1>
              {profile.first}
              <br />
              <span className="last">{profile.last}</span>
            </h1>
            <p className="thesis">
              {profile.thesisLines.map((line, i) =>
                typeof line === 'string'
                  ? <span key={i}>{line} </span>
                  : <b key={i}>{line.strong} </b>
              )}
            </p>
            <p className="role">
              {profile.roleLines.map((line, i) => (
                <span key={i}>
                  {line}
                  {i < profile.roleLines.length - 1 && <br />}
                </span>
              ))}
            </p>
            <div className="hero-cta">
              <a href="#contact" className="btn btn-primary">Get in touch →</a>
              <a href="#work" className="btn btn-ghost">View work</a>
            </div>
          </Reveal>

          <Reveal aria-label="Availability status">
            <div className="status" ref={statusTilt}>
              <div className="status-bar">
                <span className="lights"><i className="l1" /><i className="l2" /><i className="l3" /></span>
                ~ /status — developer.service
              </div>
              <div className="status-rows">
                {status.map((row) => (
                  <div className="srow" key={row.k}>
                    <span className="k">{row.k}</span>
                    <span className="v">
                      {row.live && <span className="live-dot" />}
                      <span className={row.live ? 'tag-live' : undefined}>{row.v}</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">about me</div>
          <h2 className="sec-title">Who I am</h2>
          <p className="about-body">{highlight(about)}</p>
          <div className="about-stats">
            {aboutStats.map((s) => (
              <div className="stat-item" key={s.label}>
                <span className="stat-n">{s.n}</span>
                <span className="stat-label">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function SvcIcon({ name }) {
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

function ServiceCard({ s }) {
  const tiltRef = useTilt({ max: 5 })
  return (
    <div ref={tiltRef} className="svc-card">
      <div className="svc-head">
        <div className="svc-icon"><SvcIcon name={s.icon} /></div>
        <span className="svc-num">// {s.id}</span>
      </div>
      <h3 className="svc-title">{s.title}</h3>
      <p className="svc-desc">{s.desc}</p>
      <div className="svc-tags">
        {s.tags.map((t) => <span key={t}>{t}</span>)}
      </div>
    </div>
  )
}

function Services() {
  return (
    <section id="services">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">what I do</div>
          <h2 className="sec-title">Services</h2>
          <p className="sec-lead">
            From a single API endpoint to a complete multi-tenant SaaS — here's where I add the
            most value.
          </p>
        </Reveal>
        <Reveal className="svc-grid reveal-stagger">
          {services.map((s) => <ServiceCard key={s.id} s={s} />)}
        </Reveal>
      </div>
    </section>
  )
}

// ─── STACK ────────────────────────────────────────────────────────────────────
function Stack({ selectedSkill, setSelectedSkill }) {
  return (
    <section id="stack">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">stack</div>
          <h2 className="sec-title">Tools I reach for</h2>
          <p className="sec-lead">
            A backend-leaning toolkit built around API design, secure access control, and
            multi-tenant architecture. Click any tech chip to filter projects.
          </p>
          {selectedSkill && (
            <button className="clear-filter-btn" onClick={() => setSelectedSkill(null)}>
              filtering by: <b>{selectedSkill}</b> <span className="close-x">×</span>
            </button>
          )}
        </Reveal>
        <Reveal className="stack-grid reveal-stagger">
          {stack.map((group) => (
            <div className="stack-cell" key={group.lbl}>
              <div className="lbl">{group.lbl}</div>
              <div className="chips">
                {group.items.map((item) => (
                  <button
                    key={item}
                    className={`chip-btn${selectedSkill === item ? ' active' : ''}`}
                    onClick={() => setSelectedSkill((prev) => prev === item ? null : item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

// ─── EXPERIENCE ───────────────────────────────────────────────────────────────
function Experience() {
  return (
    <section id="experience">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">experience</div>
          <h2 className="sec-title">Where I've shipped</h2>
        </Reveal>
        <Reveal className="xp reveal-stagger">
          {experience.map((job) => (
            <div className="xp-item" key={job.company}>
              <div className="xp-when">
                {job.when}
                {job.badge && <div className="badge">{job.badge}</div>}
              </div>
              <div>
                <div className="xp-role">
                  {job.role} <span className="xp-co">· {job.company}</span>
                </div>
                <div className="xp-meta">{job.meta}</div>
                <ul className="xp-list">
                  {job.points.map((p, i) => (
                    <li key={i}>{bold(p)}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
function ProjectCard({ p, selectedSkill }) {
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
              <a href={p.github} target="_blank" rel="noopener noreferrer" className="card-link" aria-label="GitHub Repository">
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

function Work({ selectedSkill, setSelectedSkill }) {
  return (
    <section id="work">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">selected work</div>
          <h2 className="sec-title">Things I've built</h2>
          <p className="sec-lead">
            A backend-leaning toolkit built around API design, secure access control, and
            multi-tenant architecture. Click any tech chip in the Stack section to filter.
          </p>
          {selectedSkill && (
            <button className="clear-filter-btn" onClick={() => setSelectedSkill(null)}>
              filtering by: <b>{selectedSkill}</b> <span className="close-x">×</span>
            </button>
          )}
        </Reveal>
        <Reveal className="proj-grid reveal-stagger">
          {projects.map((p) => (
            <ProjectCard key={p.id} p={p} selectedSkill={selectedSkill} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}

// ─── BLOG ─────────────────────────────────────────────────────────────────────
const BLOG_TAGS = ['All', ...Array.from(new Set(blogs.map((b) => b.tag)))]

function BlogCard({ b }) {
  const tiltRef = useTilt({ max: 4 })
  return (
    <article ref={tiltRef} className="blog-card">
      <div className="blog-meta">
        <span className="blog-tag">{b.tag}</span>
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
    </article>
  )
}

function Blog() {
  const [activeTag, setActiveTag] = useState(null) // null = All
  const filtered = activeTag ? blogs.filter((b) => b.tag === activeTag) : blogs

  return (
    <section id="blog">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">writing</div>
          <h2 className="sec-title">From the blog</h2>
          <p className="sec-lead">
            Notes on backend architecture, API design, and the things I've learned shipping
            production systems.
          </p>
          {/* Category filters */}
          <div className="blog-filters">
            {BLOG_TAGS.map((tag) => (
              <button
                key={tag}
                className={`blog-filter-btn${
                  (tag === 'All' && !activeTag) || activeTag === tag ? ' active' : ''
                }`}
                onClick={() => setActiveTag(tag === 'All' ? null : tag)}
              >
                {tag}
                {tag !== 'All' && (
                  <span className="blog-filter-count">
                    {blogs.filter((b) => b.tag === tag).length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </Reveal>

        {filtered.length > 0 ? (
          <Reveal className="blog-grid reveal-stagger">
            {filtered.map((b) => <BlogCard key={b.id} b={b} />)}
          </Reveal>
        ) : (
          <p className="blog-empty">No posts in this category yet.</p>
        )}
      </div>
    </section>
  )
}

// ─── EDUCATION ────────────────────────────────────────────────────────────────
function Education() {
  return (
    <section id="education">
      <div className="wrap">
        <Reveal>
          <div className="eyebrow">background</div>
          <h2 className="sec-title">Education & certifications</h2>
        </Reveal>
        <Reveal className="two-col reveal-stagger">
          <div>
            {education.map((e) => (
              <div className="edu-item" key={e.title}>
                <h4>{e.title}</h4>
                <div className="sub">{e.sub}</div>
                <div className="yr">{e.yr}</div>
              </div>
            ))}
          </div>
          <div className="cert-list">
            {certs.map((c) => (
              <div className="cert" key={c}>
                <span className="mark">✓</span>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  return (
    <section id="contact">
      <Reveal className="wrap">
        <div className="contact">
          <div className="eyebrow" style={{ justifyContent: 'center' }}>
            accepting connections
          </div>
          <h2>Let's build something reliable.</h2>
          <p>
            Open to remote roles and relocation. If you're shipping a SaaS product, an API,
            or a WhatsApp/automation integration — I'd like to hear about it.
          </p>
          <div className="contact-links">
            <a href={`mailto:${profile.email}`} className="btn btn-primary">{profile.email}</a>
            <a href={`tel:${profile.phoneHref}`} className="btn btn-ghost">{profile.phone}</a>
          </div>
          <div className="contact-social">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2"
                fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2"
                fill="none" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" />
              </svg>
              LinkedIn
            </a>
          </div>
        </div>
      </Reveal>
    </section>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <span className="mono">© 2026 {profile.name} · {profile.region}</span>
        <div className="foot-links">
          <a href={profile.github} target="_blank" rel="noopener noreferrer">github ↗</a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">linkedin ↗</a>
          <a href={`mailto:${profile.email}`}>email ↗</a>
        </div>
      </div>
    </footer>
  )
}

// ─── WHATSAPP WIDGET ──────────────────────────────────────────────────────────
function WhatsAppWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hi there! 👋 I'm Prince's virtual assistant. Ask me anything about his experience, stack, or projects!",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
    {
      sender: 'bot',
      text: "What would you like to explore?",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isButtonList: true,
      buttons: [
        { label: '🛠️ Core Stack', action: 'stack' },
        { label: '🚀 WhatsApp SaaS Platform', action: 'whatsapp' },
        { label: '📬 Get in touch', action: 'contact' },
      ],
    },
  ])
  const [isTyping, setIsTyping] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (chatEndRef.current) chatEndRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const addMessage = (msg) => setMessages((prev) => [...prev, msg])

  const handleAction = (action, label) => {
    addMessage({
      sender: 'user',
      text: label,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    })
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      let replyText = ''
      let nextButtons = []

      if (action === 'stack') {
        replyText = "Prince specializes in backend systems built on PHP (Laravel, CodeIgniter 4) and JavaScript (Node.js, React.js). He is an expert in REST API design, RBAC, database optimization, and secure token authentication."
        nextButtons = [{ label: '💼 Experience', action: 'experience' }, { label: '📂 Selected Work', action: 'work' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'whatsapp') {
        replyText = "He's architected complete WhatsApp automation platforms: custom template managers, live webhook broadcast systems, chatbot flow logic, and Meta Business verification configs."
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'experience') {
        replyText = "Prince has 5 years of full-stack developer history: Leading teams at Anantkamal, building custom web engines at Techflux, and developing the Campus360 ERP system at Hiray Media."
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'work') {
        replyText = "He's built the Nahata Sports Booking platform, leaving certificate PDF tools, DreamsToFly listings search, and a WhatsApp broadcast platform. Click matching stack buttons to filter!"
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'contact') {
        replyText = "Reach Prince at pkk22722@gmail.com or call +91 84849 44381. He is ready for remote roles or relocation."
        nextButtons = [{ label: '🏡 Main Menu', action: 'menu' }]
      } else {
        replyText = "How else can I assist you?"
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '🚀 WhatsApp SaaS Platform', action: 'whatsapp' }, { label: '📬 Get in touch', action: 'contact' }]
      }

      addMessage({ sender: 'bot', text: replyText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
      addMessage({ sender: 'bot', text: "Select an option:", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), isButtonList: true, buttons: nextButtons })
    }, 1200)
  }

  return (
    <div className={`wa-widget${isOpen ? ' open' : ''}`}>
      <button className="wa-fab" onClick={() => setIsOpen(!isOpen)} aria-label="Chat with Prince's Bot">
        <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.725 1.45 5.535 0 10.026-4.437 10.029-9.897.002-2.643-1.018-5.129-2.872-6.99C16.68 1.855 14.198.835 11.565.834c-5.541 0-10.03 4.439-10.033 9.9.001 1.637.472 3.23 1.365 4.62l-.993 3.626 3.708-.962c1.378.807 2.768 1.17 4.342 1.17z" />
        </svg>
        <span className="wa-badge" />
      </button>
      {isOpen && (
        <div className="wa-chat">
          <div className="wa-header">
            <img src="/logo.png" alt="Avatar" className="wa-avatar" />
            <div>
              <div className="wa-name">Prince's Assistant</div>
              <div className="wa-status"><span className="wa-dot" /> Online</div>
            </div>
            <button className="wa-close" onClick={() => setIsOpen(false)} aria-label="Close Chat">×</button>
          </div>
          <div className="wa-body">
            {messages.map((msg, i) => (
              <div className={`wa-bubble-wrapper ${msg.sender}`} key={i}>
                {!msg.isButtonList ? (
                  <div className="wa-bubble">
                    <p>{msg.text}</p>
                    <span className="wa-time">{msg.time}</span>
                  </div>
                ) : (
                  <div className="wa-options-container">
                    {msg.buttons.map((btn, j) => (
                      <button className="wa-option-btn" key={j} onClick={() => handleAction(btn.action, btn.label)}>
                        {btn.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="wa-bubble-wrapper bot">
                <div className="wa-bubble typing">
                  <div className="dot-pulse"><span /><span /><span /></div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
        </div>
      )}
    </div>
  )
}

// ─── PORTFOLIO PAGE (route "/") ────────────────────────────────────────────────
function PortfolioPage({ setActiveSection, selectedSkill, setSelectedSkill }) {
  useEffect(() => {
    const ids = ['top', 'about', 'services', 'stack', 'experience', 'work', 'blog', 'contact']
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) setActiveSection(entry.target.id) })
      },
      { rootMargin: '-25% 0px -55% 0px', threshold: 0 }
    )
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el) })
    return () => observer.disconnect()
  }, [setActiveSection])

  return (
    <>
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Services />
      <div className="divider" />
      <Stack selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Work selectedSkill={selectedSkill} setSelectedSkill={setSelectedSkill} />
      <div className="divider" />
      <Blog />
      <div className="divider" />
      <Education />
      <Contact />
      <Footer />
      <WhatsAppWidget />
    </>
  )
}

// ─── APP (router root) ────────────────────────────────────────────────────────
export default function App() {
  const [activeSection, setActiveSection] = useState('top')
  const [selectedSkill, setSelectedSkill] = useState(null)

  return (
    <>
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>

      {/* Nav is always mounted so the sticky header persists across routes. */}
      <Nav activeSection={activeSection} />

      <Routes>
        <Route
          path="/"
          element={
            <PortfolioPage
              setActiveSection={setActiveSection}
              selectedSkill={selectedSkill}
              setSelectedSkill={setSelectedSkill}
            />
          }
        />
        <Route path="/blog/:id" element={<BlogDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
