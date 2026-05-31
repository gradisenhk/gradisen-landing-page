import { useTranslation } from 'react-i18next'

const featureKeys = ['base', 'edge', 'camera']

const featureIcons = {
  base: (
    <svg viewBox="0 0 24 24" className="w-5 self-stretch text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
      <rect x="3" y="11" width="18" height="8" rx="2" />
      <path d="M7 11V7a5 5 0 0110 0v4" />
      <circle cx="8" cy="19" r="1.5" className="fill-brand-primary stroke-none" />
      <circle cx="16" cy="19" r="1.5" className="fill-brand-primary stroke-none" />
    </svg>
  ),
  edge: (
    <svg viewBox="0 0 24 24" className="w-5 self-stretch text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M9 9h6M9 12h6M9 15h4" />
    </svg>
  ),
  camera: (
    <svg viewBox="0 0 24 24" className="w-5 self-stretch text-brand-primary flex-shrink-0" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" preserveAspectRatio="xMidYMid meet">
      <path d="M23 7l-7 5 7 5V7z" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  ),
}

function Product() {
  const { t } = useTranslation()

  return (
    <section id="product" className="py-20 px-4 bg-background-tertiary">
      <div className="max-w-5xl mx-auto">

        {/* Section header */}
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          {t('product.title')}
        </h2>
        <p className="text-text-secondary text-lg mb-16 max-w-2xl">
          {t('product.subtitle')}
        </p>

        {/* Two-column body */}
        <div className="flex flex-col md:flex-row gap-16">

          {/* Left — hardware */}
          <div className="md:w-1/2 flex flex-col gap-8">
            <h3 className="text-xl font-bold text-brand-primary">
              {t('product.hardwareTitle')}
            </h3>

            {/* Robot photo — hidden until available
            <img src={robotPhoto} alt="GDSense robot" className="rounded-xl w-full object-cover" />
            */}

            {/* Feature list — no boxes, just icon + text like a timeline */}
            <div className="flex flex-col gap-8">
              {featureKeys.map((key) => (
                <div key={key} className="flex items-stretch gap-3">
                  {featureIcons[key]}
                  <div>
                    <p className="font-semibold text-text-primary leading-tight">
                      {t(`product.features.${key}.title`)}
                    </p>
                    <p className="text-sm text-text-secondary mt-1">
                      {t(`product.features.${key}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — how it works */}
          <div className="md:w-1/2 flex flex-col gap-8">
            <h3 className="text-xl font-bold text-brand-primary">
              {t('product.howTitle')}
            </h3>

            <div className="flex flex-col gap-0">
              {['1', '2', '3'].map((step, i) => (
                <div key={step} className="flex gap-4">
                  {/* Dot + connector line */}
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-brand-primary flex-shrink-0 mt-1.5" />
                    {i < 2 && <div className="w-px flex-1 bg-border my-1" />}
                  </div>

                  {/* Step content */}
                  <div className={`${i < 2 ? 'pb-8' : ''}`}>
                    <p className="font-semibold text-text-primary leading-tight mb-1">
                      {t(`product.steps.${step}.label`)}
                    </p>
                    <p className="text-sm text-text-secondary leading-relaxed">
                      {t(`product.steps.${step}.desc`)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

export default Product
