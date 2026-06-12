import { useEffect, useRef, useState } from 'react'
import {
  profile,
  status,
  about,
  stack,
  experience,
  projects,
  education,
  certs,
} from './data.js'

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
    if (!('IntersectionObserver' in window)) {
      el.classList.add('in')
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
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

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-inner">
        <a href="#top" className="brand" onClick={close}>
          <span className="dot" />
          {profile.brand}
        </a>
        <nav className={`nav-links${open ? ' open' : ''}`}>
          <a href="#stack" onClick={close}>stack</a>
          <a href="#experience" onClick={close}>experience</a>
          <a href="#work" onClick={close}>work</a>
          <a href="#contact" className="nav-cta" onClick={close}>Contact</a>
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

function Hero() {
  return (
    <section className="hero">
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
                typeof line === 'string' ? (
                  <span key={i}>{line} </span>
                ) : (
                  <b key={i}>{line.strong} </b>
                )
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

          <Reveal className="status" aria-label="Availability status">
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
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about">
      <Reveal className="wrap">
        <div className="eyebrow">about</div>
        <p className="about-body">{highlight(about)}</p>
      </Reveal>
    </section>
  )
}

function Stack() {
  return (
    <section id="stack">
      <Reveal className="wrap">
        <div className="eyebrow">stack</div>
        <h2 className="sec-title">Tools I reach for</h2>
        <p className="sec-lead">
          A backend-leaning toolkit built around API design, secure access control, and
          multi-tenant architecture — with the frontend to match.
        </p>
        <div className="stack-grid">
          {stack.map((group) => (
            <div className="stack-cell" key={group.lbl}>
              <div className="lbl">{group.lbl}</div>
              <div className="chips">
                {group.items.map((item) => (
                  <span className="chip" key={item}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience">
      <Reveal className="wrap">
        <div className="eyebrow">experience</div>
        <h2 className="sec-title">Where I've shipped</h2>
        <div className="xp">
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
        </div>
      </Reveal>
    </section>
  )
}

function Work() {
  return (
    <section id="work">
      <Reveal className="wrap">
        <div className="eyebrow">selected work</div>
        <h2 className="sec-title">Things I've built</h2>
        <div className="proj-grid">
          {projects.map((p) => (
            <article className={`card${p.featured ? ' featured' : ''}`} key={p.id}>
              <div className="card-top">
                <span className="card-id">PROJECT // {p.id}</span>
                {p.flag && <span className="flag">{p.flag}</span>}
              </div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <div className="stackline">
                {p.stack.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </Reveal>
    </section>
  )
}

function Education() {
  return (
    <section id="education">
      <Reveal className="wrap">
        <div className="eyebrow">background</div>
        <h2 className="sec-title">Education & certifications</h2>
        <div className="two-col">
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
        </div>
      </Reveal>
    </section>
  )
}

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
        </div>
      </Reveal>
    </section>
  )
}

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

export default function App() {
  return (
    <>
      <Nav />
      <a id="top" />
      <Hero />
      <div className="divider" />
      <About />
      <div className="divider" />
      <Stack />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Work />
      <div className="divider" />
      <Education />
      <Contact />
      <Footer />
    </>
  )
}
