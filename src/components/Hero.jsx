import { Link } from 'react-router-dom'

function Hero({ image, headline, subheadline, primary, secondary, scrollTo, scrollLabel, compact = false }) {
  return (
    <section
      className={`relative flex items-center overflow-hidden ${
        compact ? 'min-h-[75vh]' : 'min-h-screen'
      }`}
    >
      {/* Background photo */}
      <img
        src={image}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

      {/* Content */}
      <div
        className={`relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${
          compact ? 'pb-20 pt-24 md:pb-24 md:pt-24' : 'pb-28 pt-32 md:pb-36 md:pt-40'
        }`}
      >
        <div className={compact ? 'max-w-5xl' : 'max-w-4xl'}>
          <h1 className="text-[2.25rem]/[1.35] font-medium tracking-tight text-white sm:text-[3rem]/[1.35] lg:[word-break:keep-all]">
            {headline}
          </h1>

          {subheadline && (
            <p
              className={`max-w-2xl text-lg leading-relaxed text-white/80 md:text-xl ${
                compact ? 'mt-6' : 'mt-8'
              }`}
            >
              {subheadline}
            </p>
          )}

          <div
            className={`flex flex-wrap items-center gap-x-8 gap-y-5 ${
              compact ? 'mt-8' : 'mt-12'
            }`}
          >
            {primary.external ? (
              <a
                href={primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:bg-brand-primaryDark sm:w-auto sm:text-base"
              >
                {primary.label}
                <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">open_in_new</span>
              </a>
            ) : (
              <Link
                to={primary.href}
                className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-md transition-colors duration-300 hover:bg-brand-primaryDark sm:w-auto sm:text-base"
              >
                {primary.label}
                <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">arrow_forward</span>
              </Link>
            )}

            {secondary && (
              <Link
                to={secondary.to}
                className="group inline-flex items-center gap-2 text-sm font-semibold text-white/85 transition-colors duration-200 hover:text-brand-primary"
              >
                {secondary.label}
                <span
                  className="material-symbols-outlined transition-transform duration-200 group-hover:translate-x-0.5"
                  style={{ fontSize: '1.1em', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  arrow_forward
                </span>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      {scrollTo && (
        <a
          href={scrollTo}
          aria-label={scrollLabel}
          className={`absolute left-1/2 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full text-white/80 transition-colors duration-200 hover:text-brand-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary ${
            compact ? 'bottom-5' : 'bottom-8'
          }`}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '1.5rem', lineHeight: 1 }} aria-hidden="true">keyboard_arrow_down</span>
        </a>
      )}
    </section>
  )
}

export default Hero
