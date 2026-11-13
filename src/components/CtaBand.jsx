import { Link } from 'react-router-dom'
import SectionTitle from './SectionTitle'

function CtaBand({ title, text, button, to = '/#contact', tone = 'white' }) {
  return (
    <section className={`px-4 py-20 ${tone === 'band' ? 'bg-band' : 'bg-background-primary'}`}>
      <div className="mx-auto max-w-3xl text-center">
        <SectionTitle title={title} subtitle={text} />

        <Link
          to={to}
          className="mt-10 inline-flex items-center justify-center gap-2 rounded-md bg-brand-primary px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-brand-primaryDark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:text-base"
        >
          {button}
          <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">arrow_forward</span>
        </Link>
      </div>
    </section>
  )
}

export default CtaBand
