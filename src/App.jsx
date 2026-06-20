import { useEffect, useRef, useState, lazy, Suspense } from 'react'
import { Routes, Route, Navigate, Link, useLocation } from 'react-router-dom'
import { profile } from './data.js'
import { useTheme } from './useTheme.js'
import BlogDetail from './BlogDetail.jsx'

const Scene3D  = lazy(() => import('./Scene3D.jsx'))
const HomePage = lazy(() => import('./pages/HomePage.jsx'))
const AboutPage    = lazy(() => import('./pages/AboutPage.jsx'))
const ServicesPage = lazy(() => import('./pages/ServicesPage.jsx'))
const ProjectsPage = lazy(() => import('./pages/ProjectsPage.jsx'))
const BlogPage     = lazy(() => import('./pages/BlogPage.jsx'))
const ContactPage  = lazy(() => import('./pages/ContactPage.jsx'))
const ResumePage   = lazy(() => import('./pages/ResumePage.jsx'))

// Scrolls to the top of the page on every route change.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

// ─── NAV ──────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)
  const { pathname }            = useLocation()
  const isBlogDetail            = /^\/blog\/.+/.test(pathname)
  const { theme, toggle }       = useTheme()

  const isActive = (path) => {
    if (path === '/blog') return pathname === '/blog' || isBlogDetail
    return pathname === path
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const close = () => setOpen(false)

  return (
    <header className={`nav${scrolled ? ' scrolled' : ''}`} id="nav">
      <div className="wrap nav-inner">
        <Link to="/" className="brand" onClick={close}>
          <img src="/logo.png" alt="PK Logo" className="brand-logo" />
          <span className="brand-name">{profile.brand}</span>
          <span className="dot" />
        </Link>

        {isBlogDetail ? (
          <Link to="/blog" className="nav-back-link">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor"
              strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12" /><polyline points="12 19 5 12 12 5" />
            </svg>
            Back to Blog
          </Link>
        ) : (
          <>
            <nav className={`nav-links${open ? ' open' : ''}`} aria-label="Site navigation">
              <Link to="/about"    className={isActive('/about')    ? 'active' : ''} onClick={close}>About</Link>
              <Link to="/services" className={isActive('/services') ? 'active' : ''} onClick={close}>Services</Link>
              <Link to="/projects" className={isActive('/projects') ? 'active' : ''} onClick={close}>Projects</Link>
              <Link to="/blog"     className={isActive('/blog')     ? 'active' : ''} onClick={close}>Blog</Link>
              <Link to="/contact"  className={`nav-cta${isActive('/contact') ? ' active' : ''}`} onClick={close}>Contact</Link>
            </nav>

            <button
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              onClick={toggle}
            >
              {theme === 'dark' ? (
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"/>
                  <line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                  <line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2"
                  fill="none" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
              )}
            </button>

            <button
              className={`nav-toggle${open ? ' open' : ''}`}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <span /><span /><span />
            </button>

            {open && <div className="nav-overlay" onClick={close} aria-hidden="true" />}
          </>
        )}
      </div>
    </header>
  )
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer>
      <div className="wrap foot-inner">
        <span className="mono">© 2026 {profile.name} · {profile.region}</span>
        <div className="foot-links">
          <a href={profile.github}   target="_blank" rel="noopener noreferrer">github ↗</a>
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
        { label: '🛠️ Core Stack',             action: 'stack'      },
        { label: '🚀 WhatsApp SaaS Platform', action: 'whatsapp'   },
        { label: '📬 Get in touch',           action: 'contact'    },
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
      let replyText  = ''
      let nextButtons = []

      if (action === 'stack') {
        replyText   = "Prince specializes in backend systems built on PHP (Laravel, CodeIgniter 4) and JavaScript (Node.js, React.js). Expert in REST API design, RBAC, database optimization, and secure token authentication."
        nextButtons = [{ label: '💼 Experience', action: 'experience' }, { label: '📂 Selected Work', action: 'work' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'whatsapp') {
        replyText   = "He's architected complete WhatsApp automation platforms: custom template managers, live webhook broadcast systems, chatbot flow logic, and Meta Business verification configs."
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'experience') {
        replyText   = "Prince has 3.5 years of full-stack developer experience: leading teams at Anantkamal, building custom web engines at Techflux, and developing the Campus360 ERP system at Hiray Media."
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'work') {
        replyText   = "He's built the Nahata Sports Booking platform, leaving certificate PDF tools, DreamsToFly listings search, WhatsApp SaaS, and client websites across 3 countries. View /projects for all."
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '📬 Get in touch', action: 'contact' }, { label: '🏡 Main Menu', action: 'menu' }]
      } else if (action === 'contact') {
        replyText   = `Reach Prince at ${profile.email} or call ${profile.phone}. He is ready for remote roles or relocation.`
        nextButtons = [{ label: '🏡 Main Menu', action: 'menu' }]
      } else {
        replyText   = "How else can I assist you?"
        nextButtons = [{ label: '🛠️ Core Stack', action: 'stack' }, { label: '🚀 WhatsApp SaaS Platform', action: 'whatsapp' }, { label: '📬 Get in touch', action: 'contact' }]
      }

      addMessage({ sender: 'bot', text: replyText,        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) })
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

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <Suspense fallback={null}><Scene3D /></Suspense>
      <Nav />
      <ScrollToTop />
      <Suspense fallback={<div className="page-loading" />}>
        <Routes>
          <Route path="/"          element={<HomePage />} />
          <Route path="/about"     element={<AboutPage />} />
          <Route path="/services"  element={<ServicesPage />} />
          <Route path="/projects"  element={<ProjectsPage />} />
          <Route path="/blog"      element={<BlogPage />} />
          <Route path="/blog/:id"  element={<BlogDetail />} />
          <Route path="/contact"   element={<ContactPage />} />
          <Route path="/resume"    element={<ResumePage />} />
          <Route path="*"          element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
      <Footer />
      <WhatsAppWidget />
    </>
  )
}
