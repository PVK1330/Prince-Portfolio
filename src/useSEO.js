import { useEffect } from 'react'

const SITE_TITLE = 'Prince Kanoujiya — Full-Stack Developer & SaaS Architect'
const BASE_DESC  = 'Full-stack web developer specializing in secure multi-tenant SaaS, REST APIs, and WhatsApp Cloud API automation using PHP (Laravel, CodeIgniter) and JavaScript (Node.js, React).'

function setMeta(selector, content) {
  const el = document.querySelector(selector)
  if (el) el.setAttribute('content', content)
}

export function useSEO({ title, description } = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — Prince Kanoujiya` : SITE_TITLE
    const fullDesc  = description || BASE_DESC

    document.title = fullTitle
    setMeta('meta[name="description"]',        fullDesc)
    setMeta('meta[property="og:title"]',       fullTitle)
    setMeta('meta[property="og:description"]', fullDesc)
    setMeta('meta[property="og:url"]',         window.location.href)
    setMeta('meta[name="twitter:title"]',      fullTitle)
    setMeta('meta[name="twitter:description"]',fullDesc)

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', window.location.origin + window.location.pathname)
  }, [title, description])
}
