import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslations from './locales/en.json';
import zhHKTranslations from './locales/zh-HK.json';
import zhCNTranslations from './locales/zh-CN.json';

// Map any browser locale to one of our three supported codes
function resolveLanguage(browserLang) {
  if (!browserLang) return 'en';
  const lang = browserLang.toLowerCase();
  if (lang === 'zh-cn' || lang === 'zh-hans') return 'zh-CN';
  if (lang.startsWith('zh')) return 'zh-HK'; // zh-TW, zh-HK, zh, etc.
  return 'en';
}

const detectedLang = resolveLanguage(
  localStorage.getItem('i18nextLng') || navigator.language || navigator.languages?.[0]
);

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: enTranslations },
      'zh-HK': { translation: zhHKTranslations },
      'zh-CN': { translation: zhCNTranslations }
    },
    lng: detectedLang,
    fallbackLng: 'en',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      convertDetectedLanguage: resolveLanguage,
    },
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
