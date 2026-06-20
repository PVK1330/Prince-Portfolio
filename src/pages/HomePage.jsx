import { Link } from 'react-router-dom'
import { profile, status, services, projects, blogs } from '../data.js'
import { Reveal, SvcIcon, ProjectCard, BlogCard } from '../shared.jsx'
import useTilt from '../useTilt.js'
import { useSEO } from '../useSEO.js'

function HeroSection() {
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
              <Link to="/contact" className="btn btn-primary">Get in touch →</Link>
              <Link to="/projects" className="btn btn-ghost">View work</Link>
            </div>
            <Link to="/resume" className="resume-dl">↓ View / print resume</Link>
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

export default function HomePage() {
  useSEO()
  return (
    <main className="page-anim">
      <HeroSection />

      {/* Service highlight strip */}
      <div className="home-highlights">
        <div className="wrap">
          <Reveal className="home-highlights-grid reveal-stagger">
            {services.slice(0, 3).map((s) => (
              <div className="home-highlight" key={s.id}>
                <div className="home-highlight-icon"><SvcIcon name={s.icon} /></div>
                <div>
                  <div className="home-highlight-title">{s.title}</div>
                  <div className="home-highlight-tags">{s.tags.slice(0, 3).join(' · ')}</div>
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </div>

      {/* Featured work */}
      <section className="home-section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">selected work</div>
            <h2 className="sec-title">Things I've built</h2>
          </Reveal>
          <Reveal className="proj-grid reveal-stagger">
            {projects.slice(0, 4).map((p) => (
              <ProjectCard key={p.id} p={p} selectedSkill={null} />
            ))}
          </Reveal>
          <Reveal>
            <Link to="/projects" className="btn btn-ghost home-view-all">View all projects →</Link>
          </Reveal>
        </div>
      </section>

      {/* Latest blog */}
      <section className="home-section">
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">writing</div>
            <h2 className="sec-title">From the blog</h2>
          </Reveal>
          <Reveal className="home-blog-grid reveal-stagger">
            {blogs.slice(0, 2).map((b) => (
              <BlogCard key={b.id} b={b} />
            ))}
          </Reveal>
          <Reveal>
            <Link to="/blog" className="btn btn-ghost home-view-all">All posts →</Link>
          </Reveal>
        </div>
      </section>

      {/* CTA */}
      <div className="home-cta">
        <div className="wrap">
          <Reveal>
            <div className="home-cta-box">
              <div className="eyebrow">open to opportunities</div>
              <h2>Ready to build something?</h2>
              <p>Open to remote roles and relocation. SaaS, APIs, automation — let's talk.</p>
              <Link to="/contact" className="btn btn-primary">Let's talk →</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </main>
  )
}
