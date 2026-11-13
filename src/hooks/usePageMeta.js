import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

const routeKeys = {
  '/': 'home',
  '/gdsense': 'gdsense',
  '/gdsmart': 'gdsmart',
  '/about': 'about',
}

const htmlLang = {
  en: 'en',
  'zh-HK': 'zh-HK',
  'zh-CN': 'zh-CN',
}

export default function usePageMeta() {
  const { pathname } = useLocation()
  const { t, i18n } = useTranslation()
  const language = i18n.language

  useEffect(() => {
    const key = routeKeys[pathname] ?? 'notFound'

    document.title = t(`meta.${key}.title`)

    const description = document.querySelector('meta[name="description"]')
    if (description) description.setAttribute('content', t(`meta.${key}.description`))

    document.documentElement.lang = htmlLang[language] ?? 'en'
  }, [pathname, language, t])
}
