import { Link } from 'react-router-dom'

function PageHeader({ title, subtitle, cta, descriptor }) {
  return (
    <header className="bg-footer px-4 pb-20 pt-32">
      <div className="mx-auto max-w-6xl">
        <h1 className="max-w-4xl text-[2.25rem]/[1.35] font-medium tracking-tight text-white sm:text-[3rem]/[1.35]">
          {title}
        </h1>

        {descriptor && (
          <p className="mt-2 max-w-3xl text-lg leading-snug text-white/70">
            {descriptor}
          </p>
        )}

        {subtitle && (
          <p className="mt-10 max-w-2xl text-lg leading-relaxed text-white/75">
            {subtitle}
          </p>
        )}

        {cta && (
          <Link
            to={cta.to}
            className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-footer sm:text-base"
          >
            {cta.label}
            <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">arrow_forward</span>
          </Link>
        )}
      </div>
    </header>
  )
}

export default PageHeader
