import { useTranslation } from 'react-i18next'
import valuePropErrorCheck from '../assets/ValuePropsErrorCheck.png'

// Placeholder label and icon for each value prop — swap src with real images later
const propMeta = [
  {
    key: 'safety',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80',
    textRight: true,
    placeholderLabel: 'Safety Patrol / Camera Feed View',
    placeholderIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M32 4L8 14v18c0 13 10.5 22.5 24 26 13.5-3.5 24-13 24-26V14L32 4z" strokeLinejoin="round" />
        <path d="M22 32l7 7 13-13" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    key: 'damage',
    image: valuePropErrorCheck,
    reverse: true,
    placeholderLabel: 'Cargo Scan / Damage Detection Feed',
    placeholderIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="10" y="18" width="44" height="32" rx="3" />
        <path d="M10 28h44M24 18v32M40 18v32" strokeLinecap="round" />
        <circle cx="49" cy="15" r="6" className="fill-brand-primary stroke-none" />
        <path d="M49 12v3l2 2" strokeLinecap="round" strokeLinejoin="round" stroke="white" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    key: 'misplacement',
    image: 'https://images.pexels.com/photos/12935075/pexels-photo-12935075.jpeg',
    textRight: true,
    placeholderLabel: 'WMS Cross-Check / Inventory Overlay',
    placeholderIcon: (
      <svg viewBox="0 0 64 64" className="w-12 h-12 text-brand-primary" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="8" y="8" width="20" height="20" rx="2" />
        <rect x="36" y="8" width="20" height="20" rx="2" />
        <rect x="8" y="36" width="20" height="20" rx="2" />
        <rect x="36" y="36" width="20" height="20" rx="2" />
        <path d="M28 18h8M18 28v8M46 28v8M36 46h8" strokeLinecap="round" />
        <circle cx="46" cy="46" r="5" className="fill-brand-primary stroke-none" />
        <path d="M43 46l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

function ValuePropRow({ propKey, placeholderLabel, placeholderIcon, image, reverse, textRight, index }) {
  const { t } = useTranslation()

  return (
    <div className={`flex flex-col md:flex-row items-stretch gap-0 md:gap-16 ${reverse ? 'md:flex-row-reverse' : ''}`}>

      {/* Left — image or placeholder with horizontal fade mask */}
      <div className="relative w-full md:w-1/2 min-h-[260px] flex-shrink-0 overflow-hidden rounded-xl">

        {image ? (
          <img
            src={image}
            alt={t(`valueProp.${propKey}.title`)}
            className="absolute inset-0 w-full h-full object-cover object-center"
          />
        ) : (
          /* Placeholder — replace with <img> when real asset is ready */
          <div className="absolute inset-0 bg-background-secondary flex flex-col items-center justify-center gap-4 text-text-muted">
            {placeholderIcon}
            <span className="text-xs font-mono text-center px-6 leading-relaxed opacity-60">
              {placeholderLabel}
            </span>
            <div className="absolute inset-x-0 h-px bg-brand-primary/40 animate-scanline"
              style={{ top: '50%' }} />
          </div>
        )}

        {/* Horizontal fade mask — blends edges into section background (#f3f4f6) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #f3f4f6 0%, transparent 10%, transparent 90%, #f3f4f6 100%)',
          }}
        />
      </div>

      {/* Right — text content */}
      <div className={`flex flex-col justify-center w-full md:w-1/2 py-6 md:py-0 px-2 md:px-0 ${textRight ? 'md:text-right' : ''}`}>
        {/* Index number — subtle tech detail */}
        {/*
        <span className="text-xl font-mono text-brand-primary/60 mb-2 tracking-widest uppercase">
          {String(index + 1).padStart(2, '0')}
        </span>
        */}

        <h3 className="text-2xl md:text-3xl font-bold text-brand-primary mb-4 leading-tight">
          {t(`valueProp.${propKey}.title`)}
        </h3>

        <p className="text-base md:text-lg text-text-secondary leading-relaxed">
          {t(`valueProp.${propKey}.description`)}
        </p>
      </div>
    </div>
  )
}

function ValueProp() {
  const { t } = useTranslation()

  return (
    <section id="value-props" className="py-20 px-4 bg-background-tertiary">
      <div className="max-w-6xl mx-auto">

        {/* Section title */}
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
          {t('valueProp.title')}
        </h2>

        {/* Vertically stacked rows with dividers */}
        <div className="flex flex-col gap-16">
          {propMeta.map((prop, i) => (
            <div key={prop.key}>
              <ValuePropRow
                propKey={prop.key}
                placeholderLabel={prop.placeholderLabel}
                placeholderIcon={prop.placeholderIcon}
                image={prop.image}
                reverse={prop.reverse}
                textRight={prop.textRight}
                index={i}
              />
              {/* Divider between rows, not after last */}
              {i < propMeta.length - 1 && (
                <div className="mt-16 border-t border-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValueProp
