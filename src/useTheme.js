import { useState, useEffect } from 'react'

// Persists in localStorage under 'pk-theme'. Detects system preference on first visit.
// The index.html inline script reads localStorage early (before React mounts) to
// avoid a flash of the wrong theme.
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    if (typeof localStorage === 'undefined') return 'dark'
    const saved = localStorage.getItem('pk-theme')
    if (saved === 'light' || saved === 'dark') return saved
    return typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: light)').matches
      ? 'light'
      : 'dark'
  })

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('pk-theme', theme)
    // Update browser chrome colour to match
    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.content = theme === 'light' ? '#F8FAFC' : '#0E1116'
  }, [theme])

  return { theme, toggle: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')) }
}
