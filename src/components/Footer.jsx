import { useTranslation } from 'react-i18next'
import logoIcon from '../assets/icon_proto_yellow.png'

function Footer() {
  const { t } = useTranslation()

  return (
    <footer className="bg-background-primary border-t border-border">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-text-muted">

        {/* Logo + email — left */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 flex-shrink-0">
            <img src={logoIcon} alt="Gradisen logo" className="h-5 w-auto" />
            <span className="font-bold text-brand-primary">Gradisen</span>
          </div>
          <a
            href="mailto:team@gradisen.com"
            className="hover:text-brand-primary transition-colors duration-200"
          >
            team@gradisen.com
          </a>
        </div>

        {/* Copyright — right */}
        <span>{t('footer.copyright', { year: new Date().getFullYear() })}</span>

      </div>
    </footer>
  )
}

export default Footer
