import { Link } from 'react-router-dom'
import { profile, about, aboutStats, experience, education, certs } from '../data.js'
import { Reveal, PageHero, highlight, bold } from '../shared.jsx'
import { useSEO } from '../useSEO.js'

export default function AboutPage() {
  useSEO({
    title: 'About',
    description: '3.5 years of full-stack experience building production-grade SaaS platforms, REST APIs, and WhatsApp automation. Team lead with PHP (Laravel, CodeIgniter), Node.js, and React expertise.',
  })
  return (
    <main className="page-anim">
      <PageHero
        eyebrow="about me"
        title="Who I Am"
        sub="Full-stack developer from Maharashtra building production-grade SaaS, APIs, and automation systems."
      />

      {/* Bio + Stats */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">background</div>
            <h2 className="sec-title">The short version</h2>
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

      <div className="divider" />

      {/* Experience timeline */}
      <section>
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
                    {job.points.map((p, i) => <li key={i}>{bold(p)}</li>)}
                  </ul>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* Education + Certs */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">academic</div>
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
              <Link to="/resume" className="btn btn-ghost resume-dl-about">
                ↓ View / print resume
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* CTA */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="home-cta-box">
              <div className="eyebrow">get in touch</div>
              <h2>Want to work together?</h2>
              <p>Open to remote roles and full-time opportunities. Let's see if it's a fit.</p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Contact me →</Link>
                <Link to="/services" className="btn btn-ghost">See services</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
