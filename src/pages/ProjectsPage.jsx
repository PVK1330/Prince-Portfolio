import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data.js'
import { Reveal, PageHero, ProjectCard } from '../shared.jsx'
import { useSEO } from '../useSEO.js'

// Unique tech tags from all projects (preserving order of first appearance).
const ALL_TECHS = [...new Set(projects.flatMap((p) => p.stack))]

export default function ProjectsPage() {
  useSEO({
    title: 'Projects',
    description: 'Portfolio of full-stack work: WhatsApp automation SaaS, sports booking platforms, study-abroad portals, ERP systems, and live client websites across the UK, Netherlands, and Australia.',
  })
  const [selectedSkill, setSelectedSkill] = useState(null)

  const toggle = (tech) => setSelectedSkill((prev) => prev === tech ? null : tech)

  return (
    <main className="page-anim">
      <PageHero
        eyebrow="selected work"
        title="Things I've Built"
        sub="APIs, SaaS platforms, booking systems, client websites, and automation — delivered across PHP, Node.js, and React."
      />

      <section>
        <div className="wrap">
          {/* Tech filter chips */}
          <Reveal>
            <div className="blog-filters" style={{ marginBottom: 0 }}>
              <button
                className={`blog-filter-btn${!selectedSkill ? ' active' : ''}`}
                onClick={() => setSelectedSkill(null)}
              >
                All
                <span className="blog-filter-count">{projects.length}</span>
              </button>
              {ALL_TECHS.map((tech) => {
                const count = projects.filter((p) =>
                  p.stack.some((s) => s.toLowerCase() === tech.toLowerCase())
                ).length
                return (
                  <button
                    key={tech}
                    className={`blog-filter-btn${selectedSkill === tech ? ' active' : ''}`}
                    onClick={() => toggle(tech)}
                  >
                    {tech}
                    <span className="blog-filter-count">{count}</span>
                  </button>
                )
              })}
            </div>
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

      <div className="divider" />

      <section>
        <div className="wrap">
          <Reveal>
            <div className="home-cta-box">
              <div className="eyebrow">hire me</div>
              <h2>Want something built?</h2>
              <p>Open to remote roles and contracts. Ready to work on your next project.</p>
              <Link to="/contact" className="btn btn-primary">Let's talk →</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
