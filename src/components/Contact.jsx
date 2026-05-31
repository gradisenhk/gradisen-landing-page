import { useTranslation } from 'react-i18next'

function Contact() {
  const { t } = useTranslation()

  return (
    <section id="contact" className="py-16 px-4 bg-background-tertiary">
      <div className="max-w-5xl mx-auto">

        <div className="flex flex-col md:flex-row gap-8 md:items-stretch">

          {/* Left — title + tagline */}
          <div className="md:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-text-secondary">
              {t('contact.tagline')}
            </p>
          </div>

          {/* Right — contact info card */}
          <div className="md:w-1/2 bg-surface border border-border rounded-lg p-8 flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-text-primary">
              {t('contact.infoTitle')}
            </h3>

            {/* Email */}
            <div className="flex items-stretch gap-4">
              <svg className="w-6 self-stretch text-brand-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M2 7l10 7 10-7" />
              </svg>
              <div>
                <p className="text-xs font-mono text-brand-primary/60 tracking-widest uppercase mb-1">
                  {t('contact.emailLabel')}
                </p>
                <a
                  href="mailto:team@gradisen.com"
                  className="text-text-primary font-medium hover:text-brand-primary transition-colors duration-200 break-all"
                >
                  team@gradisen.com
                </a>
              </div>
            </div>

            {/* Address — uncomment when available
            <div className="flex items-stretch gap-4">
              <svg className="w-6 self-stretch text-brand-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
              <div>
                <p className="text-xs font-mono text-brand-primary/60 tracking-widest uppercase mb-1">
                  {t('contact.addressLabel')}
                </p>
                <p className="text-text-primary font-medium">Your address here</p>
              </div>
            </div>
            */}

            {/* Phone — uncomment when available
            <div className="flex items-stretch gap-4">
              <svg className="w-6 self-stretch text-brand-primary flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.1 1.18 2 2 0 012.08 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
              <div>
                <p className="text-xs font-mono text-brand-primary/60 tracking-widest uppercase mb-1">
                  {t('contact.phoneLabel')}
                </p>
                <a href="tel:+85200000000" className="text-text-primary font-medium hover:text-brand-primary transition-colors duration-200">
                  +852 0000 0000
                </a>
              </div>
            </div>
            */}
          </div>

        </div>
      </div>
    </section>
  )
}

export default Contact
