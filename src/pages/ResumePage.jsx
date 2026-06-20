import { useSEO } from '../useSEO.js'
import { profile, about, experience, education, certs, stack, projects } from '../data.js'

const strip = (s) => s.replace(/§/g, '')

export default function ResumePage() {
  useSEO({
    title: 'Resume',
    description: `Resume of ${profile.name} — ${profile.role} with ${profile.experienceYears} of full-stack experience.`,
  })

  return (
    <main className="resume-page page-anim">
      <div className="resume-actions">
        <button className="btn btn-ghost" onClick={() => window.print()}>
          <svg viewBox="0 0 24 24" width="15" height="15" stroke="currentColor" strokeWidth="2"
            fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: 7 }}>
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print / Save as PDF
        </button>
      </div>

      <article className="resume">
        {/* ── Header ── */}
        <header className="resume-header">
          <div>
            <h1 className="resume-name">{profile.name}</h1>
            <div className="resume-role">{profile.role}</div>
          </div>
          <div className="resume-contact">
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <span className="resume-sep">·</span>
            <a href={`tel:${profile.phoneHref}`}>{profile.phone}</a>
            <span className="resume-sep">·</span>
            <a href={profile.github} target="_blank" rel="noopener noreferrer">github.com/PVK1330</a>
            <span className="resume-sep">·</span>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <span className="resume-sep">·</span>
            <span>{profile.region}</span>
          </div>
        </header>

        <div className="resume-rule" />

        {/* ── Summary ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Summary</h2>
          <p className="resume-summary">{strip(about)}</p>
        </section>

        {/* ── Experience ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Experience</h2>
          {experience.map((job) => (
            <div className="resume-job" key={job.company}>
              <div className="resume-job-header">
                <div>
                  <span className="resume-job-role">{job.role}</span>
                  <span className="resume-job-co"> · {job.company}</span>
                  {job.badge && <span className="resume-badge">{job.badge}</span>}
                </div>
                <span className="resume-job-when">{job.when}</span>
              </div>
              <div className="resume-job-meta">{job.meta}</div>
              <ul className="resume-job-points">
                {job.points.map((pt, i) => <li key={i}>{strip(pt)}</li>)}
              </ul>
            </div>
          ))}
        </section>

        {/* ── Skills ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Technical Skills</h2>
          <div className="resume-skills">
            {stack.map((g) => (
              <div className="resume-skill-row" key={g.lbl}>
                <span className="resume-skill-lbl">{g.lbl}</span>
                <span className="resume-skill-items">{g.items.join(', ')}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Key Projects ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Key Projects</h2>
          {projects.slice(0, 6).map((p) => (
            <div className="resume-project" key={p.id}>
              <div className="resume-project-header">
                <span className="resume-project-title">{p.title}</span>
                {p.demo && (
                  <a href={p.demo} className="resume-project-link" target="_blank" rel="noopener noreferrer">↗ live</a>
                )}
              </div>
              <div className="resume-project-desc">{p.desc}</div>
              <div className="resume-project-stack">{p.stack.join(' · ')}</div>
            </div>
          ))}
        </section>

        {/* ── Education ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Education</h2>
          {education.map((e) => (
            <div className="resume-edu" key={e.title}>
              <div className="resume-edu-title">{e.title}</div>
              <div className="resume-edu-sub">{e.sub} · {e.yr}</div>
            </div>
          ))}
        </section>

        {/* ── Certifications ── */}
        <section className="resume-section">
          <h2 className="resume-section-title">Certifications</h2>
          <div className="resume-certs">{certs.join(' · ')}</div>
        </section>
      </article>
    </main>
  )
}
