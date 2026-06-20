import { Link } from 'react-router-dom'
import { services, stack } from '../data.js'
import { Reveal, PageHero, SvcIcon } from '../shared.jsx'
import useTilt from '../useTilt.js'
import { useSEO } from '../useSEO.js'

const PROCESS = [
  {
    num: '01',
    title: 'Understand',
    desc: 'Dig into requirements, constraints, and the existing system before a single line of code is written.',
  },
  {
    num: '02',
    title: 'Design',
    desc: 'Schema, API contracts, auth model, and data flows mapped out — so build time is spent building, not rethinking.',
  },
  {
    num: '03',
    title: 'Build',
    desc: 'Incremental, tested delivery across REST endpoints, multi-tenant config, UI, and third-party integrations.',
  },
  {
    num: '04',
    title: 'Ship',
    desc: 'Deployment, server config, monitoring handoff, and docs. Production-ready, not "works on my machine".',
  },
]

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

export default function ServicesPage() {
  useSEO({
    title: 'Services',
    description: 'Backend API development, multi-tenant SaaS architecture, WhatsApp Cloud API integration, database optimization, and full-stack web development. See what Prince can build for you.',
  })
  return (
    <main className="page-anim">
      <PageHero
        eyebrow="what I do"
        title="Services"
        sub="From a single API endpoint to a complete multi-tenant SaaS — here's where I add the most value."
      />

      {/* Service cards */}
      <section>
        <div className="wrap">
          <Reveal className="svc-grid reveal-stagger">
            {services.map((s) => <ServiceCard key={s.id} s={s} />)}
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* How I work */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">process</div>
            <h2 className="sec-title">How I work</h2>
            <p className="sec-lead">A repeatable approach that keeps projects on-track and reduces surprises at every handoff.</p>
          </Reveal>
          <Reveal className="process-grid reveal-stagger">
            {PROCESS.map((step) => (
              <div className="process-step" key={step.num}>
                <div className="process-num">{step.num}</div>
                <div className="process-title">{step.title}</div>
                <div className="process-desc">{step.desc}</div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      {/* Stack */}
      <section>
        <div className="wrap">
          <Reveal>
            <div className="eyebrow">stack</div>
            <h2 className="sec-title">Tools I reach for</h2>
            <p className="sec-lead">A backend-leaning toolkit built around API design, secure access control, and multi-tenant architecture.</p>
          </Reveal>
          <Reveal className="stack-grid reveal-stagger">
            {stack.map((group) => (
              <div className="stack-cell" key={group.lbl}>
                <div className="lbl">{group.lbl}</div>
                <div className="chips">
                  {group.items.map((item) => <span key={item} className="chip">{item}</span>)}
                </div>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <div className="divider" />

      <section>
        <div className="wrap">
          <Reveal>
            <div className="home-cta-box">
              <div className="eyebrow">start a project</div>
              <h2>Need something built?</h2>
              <p>Open for new contracts and full-time roles. Tell me what you're building.</p>
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/contact" className="btn btn-primary">Get in touch →</Link>
                <Link to="/projects" className="btn btn-ghost">See projects</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  )
}
