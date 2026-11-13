import { useTranslation } from 'react-i18next'
import SectionTitle from './SectionTitle'

const featureKeys = ['base', 'edge', 'camera']
const stepKeys = ['1', '2', '3']

const featureIcons = {
  base: 'precision_manufacturing',
  edge: 'memory',
  camera: 'videocam',
}

function Product() {
  const { t } = useTranslation()

  return (
    <section id="product" className="bg-background-primary px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('product.title')} subtitle={t('product.subtitle')} />

        {/* Hardware */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-text-primary md:text-2xl">
            {t('product.hardwareTitle')}
          </h3>

          <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border">
            {featureKeys.map((key) => (
              <div
                key={key}
                className="border-t border-border pt-6 md:border-t-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0"
              >
                <span className="material-symbols-outlined text-brand-primary" style={{ fontSize: '1.75rem', lineHeight: 1 }} aria-hidden="true">
                  {featureIcons[key]}
                </span>
                <p className="mt-4 font-semibold text-text-primary">
                  {t(`product.features.${key}.title`)}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                  {t(`product.features.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* How it works */}
        <div className="mt-16">
          <h3 className="text-center text-xl font-bold text-text-primary md:text-2xl">
            {t('product.howTitle')}
          </h3>

          <div className="mt-10 border-t border-border">
            {stepKeys.map((step) => (
              <div
                key={step}
                className="grid gap-3 border-b border-border py-8 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
              >
                <p className="text-lg font-semibold text-text-primary">
                  {t(`product.steps.${step}.label`)}
                </p>
                <p className="text-sm leading-relaxed text-text-secondary">
                  {t(`product.steps.${step}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Product
