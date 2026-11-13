import { useState, useRef, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logoWords from '../assets/icon_words.png'
import { useTranslation } from 'react-i18next'
import 'flag-icons/css/flag-icons.min.css'

// fi-xx uses ISO 3166-1 alpha-2 country codes
const languages = [
  { code: 'zh-HK', short: '繁體', label: '繁體中文', flagClass: 'fi fi-hk' },
  { code: 'zh-CN', short: '简体', label: '简体中文', flagClass: 'fi fi-cn' },
  { code: 'en',    short: 'EN', label: 'English',  flagClass: 'fi fi-us' },
]

function LanguageSelect({ currentLang, onChange }) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = languages.find((l) => l.code === currentLang) ?? languages[0]

  // Close on outside click or Escape
  useEffect(() => {
    if (!open) return undefined
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    function handleKeyDown(e) {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  return (
    <div ref={ref} className="relative">
      {/* Trigger — reads like the nav links, not like a form control */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${t('nav.language')}: ${current.label}`}
        className="flex min-h-[44px] min-w-[44px] items-center justify-end gap-1.5 text-sm font-medium text-white/85 transition-colors duration-200 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        <span className="tracking-wider">{current.short}</span>
        <span
          className={`material-symbols-outlined transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          style={{ fontSize: '1.1rem', lineHeight: 1 }}
          aria-hidden="true"
        >expand_more</span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          aria-label={t('nav.language')}
          className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-md border border-border bg-background-primary py-1 shadow-xl"
        >
          {languages.map((lang) => {
            const active = lang.code === currentLang
            return (
              <li key={lang.code}>
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => { onChange(lang.code); setOpen(false); }}
                  className={`flex min-h-[44px] w-full items-center gap-3 px-3 py-2.5 text-left text-sm transition-colors duration-150 ${
                    active
                      ? 'bg-brand-primary/10 font-semibold text-brand-primaryDark'
                      : 'text-text-primary hover:bg-background-secondary'
                  }`}
                >
                  <span className={`${lang.flagClass} rounded-sm`} aria-hidden="true" />
                  <span className="flex-1">{lang.label}</span>
                  {active && (
                    <span className="material-symbols-outlined text-brand-primary" style={{ fontSize: '1.1rem', lineHeight: 1 }} aria-hidden="true">check</span>
                  )}
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

function Navbar() {
  const { i18n, t } = useTranslation()
  const { pathname, hash } = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Home and GDSense open with a photo hero, so the bar starts transparent there.
  const hasPhotoHero = pathname === '/' || pathname === '/gdsense'
  const solid = !hasPhotoHero || scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname, hash])

  const handleLanguageChange = (locale) => {
    i18n.changeLanguage(locale)
  }

  const navLinks = [
    { to: '/',          label: t('nav.home') },
    { to: '/gdsense',   label: t('nav.gdsense') },
    { to: '/gdsmart',   label: t('nav.gdsmart') },
    { to: '/about',     label: t('nav.about') },
    { to: '/#contact',  label: t('nav.contact') },
  ]

  const isActive = (to) => {
    if (to === '/#contact') return pathname === '/' && hash === '#contact'
    if (to === '/') return pathname === '/' && hash !== '#contact'
    return pathname === to
  }

  const handleHashLink = (event, to) => {
    const targetHash = to.split('#')[1]
    if (!targetHash || pathname !== '/' || hash !== `#${targetHash}`) return

    event.preventDefault()
    const target = document.getElementById(targetHash)
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView()
    }
  }

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
        solid ? 'bg-footer/95 shadow-md backdrop-blur-sm' : 'bg-gradient-to-b from-black/60 to-transparent'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Three equal columns on desktop keep the links centred no matter how
            wide the logo or the language label happens to be. */}
        <div className="flex h-16 items-center justify-between gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">

          {/* Logo */}
          <Link to="/" className="flex-shrink-0 md:justify-self-start" aria-label="Gradisen">
            <img src={logoWords} alt="Gradisen" className="h-6 w-auto" />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-6 md:flex md:justify-self-center lg:gap-8">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  onClick={(event) => handleHashLink(event, link.to)}
                  className={`text-base font-medium transition-colors duration-300 ${
                    active ? 'text-brand-primary' : 'text-white/85 hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Desktop language switcher */}
          <div className="hidden items-center md:flex md:justify-self-end">
            <LanguageSelect currentLang={i18n.language} onChange={handleLanguageChange} />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white transition-colors duration-300 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              aria-label={t('nav.menu')}
              aria-expanded={isMenuOpen}
            >
              <span
                className="material-symbols-outlined"
                style={{ fontSize: '1.5rem', lineHeight: 1 }}
                aria-hidden="true"
              >{isMenuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="bg-footer border-t border-white/10 md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {navLinks.map((link) => {
              const active = isActive(link.to)
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  aria-current={active ? 'page' : undefined}
                  onClick={(event) => {
                    handleHashLink(event, link.to)
                    setIsMenuOpen(false)
                  }}
                  className={`flex min-h-[44px] items-center px-3 text-base font-medium transition-colors duration-300 ${
                    active ? 'text-brand-primary' : 'text-white/85 hover:bg-white/5 hover:text-brand-primary'
                  }`}
                >
                  {link.label}
                </Link>
              )
            })}
          </div>

          {/* Mobile language switcher */}
          <div className="border-t border-white/10 px-3 pb-4 pt-3">
            <LanguageSelect currentLang={i18n.language} onChange={handleLanguageChange} />
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
