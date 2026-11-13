import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

function NotFound() {
  const { t } = useTranslation()

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold text-text-primary md:text-5xl">
        {t('notFound.title')}
      </h1>
      <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
        {t('notFound.text')}
      </p>
      <Link
        to="/"
        className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:text-base"
      >
        {t('notFound.button')}
        <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">arrow_forward</span>
      </Link>
    </section>
  )
}

export default NotFound
