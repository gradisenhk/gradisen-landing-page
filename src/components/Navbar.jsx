import { useState, useRef, useEffect } from 'react';
import logoIcon from '../assets/icon_proto_yellow.png';
import { useTranslation } from 'react-i18next';
import 'flag-icons/css/flag-icons.min.css';

// fi-xx uses ISO 3166-1 alpha-2 country codes
const languages = [
  { code: 'zh-HK', label: '繁體中文', flagClass: 'fi fi-hk' },
  { code: 'zh-CN', label: '简体中文', flagClass: 'fi fi-cn' },
  { code: 'en',    label: 'English',  flagClass: 'fi fi-us' },
];

function LanguageSelect({ currentLang, onChange }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const current = languages.find((l) => l.code === currentLang) ?? languages[0];

  // Close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      {/* Trigger — looks like a select */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-border bg-background-primary text-text-secondary text-sm font-medium hover:border-brand-primary hover:text-brand-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${current.flagClass} rounded-sm`} style={{ fontSize: '1.1em' }} />
        <span className="flex-1 text-right">{current.label}</span>
        {/* Chevron */}
        <svg
          className={`w-3 h-3 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 8L1 3h10L6 8z" />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <ul
          role="listbox"
          className="absolute right-0 mt-1 min-w-full rounded-md border border-border bg-background-primary shadow-lg z-50 overflow-hidden"
        >
          {languages.map((lang) => (
            <li
              key={lang.code}
              role="option"
              aria-selected={lang.code === currentLang}
              onClick={() => { onChange(lang.code); setOpen(false); }}
              className={`flex items-center gap-2 px-3 py-2 text-sm cursor-pointer transition-colors duration-150 ${
                lang.code === currentLang
                  ? 'bg-brand-primary text-white'
                  : 'text-text-secondary hover:bg-background-secondary hover:text-brand-primary'
              }`}
            >
              <span className={`${lang.flagClass} rounded-sm flex-shrink-0`} style={{ fontSize: '1.1em' }} />
              <span className="font-medium ml-auto">{lang.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Navbar() {
  const { i18n, t } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLanguageChange = (locale) => {
    i18n.changeLanguage(locale);
  };

  const scrollToSection = (sectionId) => {
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setIsMenuOpen(false);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navbarHeight = 64;
      const top = element.getBoundingClientRect().top + window.scrollY - navbarHeight;
      window.scrollTo({ top, behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 'home',        label: t('nav.home') },
    { id: 'value-props', label: t('nav.valueProps') },
    { id: 'roadmap',     label: t('nav.roadmap') },
    { id: 'team',        label: t('nav.team') },
    { id: 'contact',     label: t('nav.contact') },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-background-primary/95 backdrop-blur-sm border-b border-border shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo/Brand */}
          <div className="flex-shrink-0 flex items-center gap-x-3">
            <img src={logoIcon} alt="Gradisen logo" className="h-6 w-auto" />
            <span className="text-2xl font-bold text-brand-primary">Gradisen</span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-text-secondary hover:text-brand-primary transition-colors duration-300 font-medium"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Language Switcher */}
          <div className="hidden md:flex items-center">
            <LanguageSelect currentLang={i18n.language} onChange={handleLanguageChange} />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-text-secondary hover:text-brand-primary focus:outline-none focus:text-brand-primary transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background-primary border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-text-secondary hover:text-brand-primary hover:bg-background-secondary transition-colors duration-300"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Mobile Language Switcher */}
          <div className="px-3 pt-2 pb-4 border-t border-border">
            <LanguageSelect currentLang={i18n.language} onChange={handleLanguageChange} />
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
