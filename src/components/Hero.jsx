import { useTranslation } from 'react-i18next'

function Hero() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">

      {/* Background image — replace src with your actual image */}
      <img
        src="https://images.pexels.com/photos/4160390/pexels-photo-4160390.jpeg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, rgba(0,10,30,0.82) 0%, rgba(0,30,50,0.72) 50%, rgba(10,5,20,0.85) 100%)',
          mixBlendMode: 'multiply',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at 70% 50%, rgba(0,180,200,0.12) 0%, transparent 65%)',
        }}
      />

      {/* Content — sits above overlays */}
      <div className="relative z-10 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight md:leading-tight mb-6 drop-shadow-lg">
          {t('hero.headline')}
        </h1>

        <p className="leading-relaxed text-sm md:text-xl text-white/75 mb-10 max-w-4xl mx-auto drop-shadow">
          {t('hero.subheadline')}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://forms.gle/zurn76xtQXupTg9x9"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 w-full sm:w-auto shadow-md justify-center"
          >
            {t('hero.ctaPrimary')}
            <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }}>open_in_new</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Hero
