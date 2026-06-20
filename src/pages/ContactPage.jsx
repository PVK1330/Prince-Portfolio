import { profile, status } from '../data.js'
import { Reveal, PageHero } from '../shared.jsx'
import useTilt from '../useTilt.js'
import { useSEO } from '../useSEO.js'

const METHODS = [
  {
    label: 'Email',
    value: profile.email,
    href: `mailto:${profile.email}`,
    icon: (
      <>
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </>
    ),
  },
  {
    label: 'Phone / WhatsApp',
    value: profile.phone,
    href: `tel:${profile.phoneHref}`,
    icon: (
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.14 12 19.79 19.79 0 0 1 1.07 3.18 2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    ),
  },
  {
    label: 'GitHub',
    value: 'github.com/PVK1330',
    href: profile.github,
    icon: (
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    ),
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/kanoujiya-prince',
    href: profile.linkedin,
    icon: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
  },
]

export default function ContactPage() {
  useSEO({
    title: 'Contact',
    description: 'Get in touch with Prince Kanoujiya — available for remote full-stack developer roles, SaaS contracts, and API/WhatsApp integration projects. Email or WhatsApp directly.',
  })
  const statusTilt = useTilt()

  return (
    <main className="page-anim">
      <PageHero
        eyebrow="get in touch"
        title="Let's Build Something"
        sub="Open to remote roles, relocation, and full-time opportunities. SaaS, APIs, WhatsApp automation — I'd like to hear about it."
      />

      <section>
        <div className="wrap">
          <div className="contact-page-grid">
            {/* Left: contact methods */}
            <div>
              <Reveal>
                <div className="eyebrow">reach out</div>
                <h2 className="sec-title" style={{ fontSize: '1.5rem', marginBottom: 24 }}>Contact info</h2>
              </Reveal>
              <Reveal className="contact-methods reveal-stagger">
                {METHODS.map((m) => (
                  <a
                    key={m.label}
                    href={m.href}
                    target={m.href.startsWith('http') ? '_blank' : undefined}
                    rel={m.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="contact-method-card"
                  >
                    <div className="contact-method-icon">
                      <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor"
                        strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        {m.icon}
                      </svg>
                    </div>
                    <div>
                      <div className="contact-method-label">{m.label}</div>
                      <div className="contact-method-value">{m.value}</div>
                    </div>
                    <svg className="contact-method-arrow" viewBox="0 0 24 24" width="14" height="14"
                      stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                    </svg>
                  </a>
                ))}
              </Reveal>
            </div>

            {/* Right: status panel + statement */}
            <div className="contact-status-panel">
              <Reveal>
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
              <Reveal>
                <div className="contact-statement">
                  <p>I reply to all serious enquiries within 24 hours. If you're shipping a SaaS product, an API, or a WhatsApp integration — let's talk scope and timeline.</p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
