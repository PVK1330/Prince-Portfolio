import { useState } from 'react'
import { blogs } from '../data.js'
import { Reveal, PageHero, BlogCard } from '../shared.jsx'
import { useSEO } from '../useSEO.js'

const TAGS = ['All', ...Array.from(new Set(blogs.map((b) => b.tag)))]

export default function BlogPage() {
  useSEO({
    title: 'Blog',
    description: 'Technical articles on multi-tenant SaaS with Laravel, WhatsApp Cloud API integration, REST API design patterns, and production backend engineering by Prince Kanoujiya.',
  })
  const [activeTag, setActiveTag] = useState(null)
  const filtered = activeTag ? blogs.filter((b) => b.tag === activeTag) : blogs

  return (
    <main className="page-anim">
      <PageHero
        eyebrow="writing"
        title="From the Blog"
        sub="Notes on backend architecture, API design, and the things I've learned shipping production systems."
      />

      <section>
        <div className="wrap">
          <Reveal>
            <div className="blog-filters">
              {TAGS.map((tag) => (
                <button
                  key={tag}
                  className={`blog-filter-btn${(tag === 'All' && !activeTag) || activeTag === tag ? ' active' : ''}`}
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
    </main>
  )
}
