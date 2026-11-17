import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import zhHKTranslations from './locales/zh-HK.json';
import zhCNTranslations from './locales/zh-CN.json';

// Map browser locales to the three supported site languages.
// Leave other languages untouched so the detector can move on to the next
// entry in the visitor's preference list instead of stopping at the first
// unsupported language.
export function normalizeLanguage(lang) {
  if (!lang) return lang;

  const code = lang.toLowerCase();

  if (
    code === 'zh-cn' ||
    code === 'zh-sg' ||
    code === 'zh-my' ||
    code.startsWith('zh-hans')
  ) {
    return 'zh-CN';
  }

  // Taiwan is not a target market, so other Chinese locales fall back to
  // Hong Kong Traditional Chinese for now.
  if (code.startsWith('zh')) return 'zh-HK';

  if (code === 'en' || code.startsWith('en-')) return 'en';

  return lang;
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      'zh-HK': { translation: zhHKTranslations },
      'zh-CN': { translation: zhCNTranslations }
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh-HK', 'zh-CN'],
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      convertDetectedLanguage: normalizeLanguage,
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
