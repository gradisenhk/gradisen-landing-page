import { useTranslation } from 'react-i18next'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import usePageMeta from '../hooks/usePageMeta'

function Layout({ children }) {
  const { t } = useTranslation()
  usePageMeta()

  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-md focus:bg-brand-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        {t('a11y.skip')}
      </a>
      <Navbar />
      <main id="main">{children}</main>
      <Footer />
      <ScrollToTop />
    </div>
  )
}

export default Layout
