import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import logoWords from '../assets/icon_words.png'

function Footer() {
  const { t } = useTranslation()
  const { pathname, hash } = useLocation()

  const handleHashLink = (event, to) => {
    const targetHash = to.split('#')[1]
    if (!targetHash || pathname !== '/' || hash !== `#${targetHash}`) return

    event.preventDefault()
    const target = document.getElementById(targetHash)
    if (target && typeof target.scrollIntoView === 'function') {
      target.scrollIntoView()
    }
  }

  const productLinks = [
    { to: '/gdsense', label: t('nav.gdsense') },
    { to: '/gdsmart', label: t('nav.gdsmart') },
  ]

  const companyLinks = [
    { to: '/',        label: t('nav.home') },
    { to: '/about',   label: t('nav.about') },
    { to: '/#contact', label: t('nav.contact') },
  ]

  return (
    <footer className="bg-footer text-white/70">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <img src={logoWords} alt="Gradisen" className="h-7 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed">{t('footer.tagline')}</p>
            <a
              href="mailto:team@gradisen.com"
              className="mt-4 inline-block break-all text-sm transition-colors duration-200 hover:text-brand-primary"
            >
              team@gradisen.com
            </a>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.productsTitle')}
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              {productLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="transition-colors duration-200 hover:text-brand-primary">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.companyTitle')}
            </h3>
            <ul className="mt-4 space-y-3  text-sm">
              {companyLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    onClick={(event) => handleHashLink(event, link.to)}
                    className="transition-colors duration-200 hover:text-brand-primary"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-center text-xs">
          {t('footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </div>
    </footer>
  )
}

export default Footer
