import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import CtaBand from '../components/CtaBand'

const outcomeKeys = ['requests', 'visibility', 'stock']

const partKeys = ['mobile', 'web']

const partPoints = {
  mobile: ['raise', 'work', 'parts', 'offline'],
  web: ['see', 'approve', 'stock', 'reports'],
}

const recordKeys = ['job', 'stock', 'access']

function Gdsmart() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        title={t('gdsmart.hero.title')}
        descriptor={t('gdsmart.hero.descriptor')}
        subtitle={t('gdsmart.hero.subline')}
        cta={{ label: t('gdsmart.hero.cta'), to: '/#contact' }}
      />

      {/* What changes */}
      <section className="bg-background-primary px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title={t('gdsmart.outcomes.title')}
            subtitle={t('gdsmart.outcomes.text')}
          />

          <div className="mt-12 border-t border-border">
            {outcomeKeys.map((key) => (
              <div
                key={key}
                className="grid gap-3 border-b border-border py-8 md:grid-cols-[16rem_1fr] md:items-baseline md:gap-8"
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`gdsmart.outcomes.${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {t(`gdsmart.outcomes.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile app and web backend */}
      <section className="bg-band px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title={t('gdsmart.parts.title')}
            subtitle={t('gdsmart.parts.subtitle')}
          />

          <div className="mt-12 grid md:grid-cols-2 md:divide-x md:divide-border">
            {partKeys.map((key, index) => (
              <div
                key={key}
                className={
                  index === 0
                    ? 'pb-12 md:pb-0 md:pr-12'
                    : 'border-t border-border pt-8 md:border-t-0 md:pl-12 md:pt-0'
                }
              >
                <p className="text-sm font-semibold uppercase tracking-wide text-brand-primary">
                  {t(`gdsmart.parts.${key}.kicker`)}
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-text-primary">
                  {t(`gdsmart.parts.${key}.title`)}
                </h3>

                <p className="mt-4 max-w-md text-base leading-relaxed text-text-secondary">
                  {t(`gdsmart.parts.${key}.lead`)}
                </p>

                <ul className="mt-8 border-t border-border">
                  {partPoints[key].map((point) => (
                    <li
                      key={point}
                      className="border-b border-border py-4 text-sm leading-relaxed text-text-secondary md:text-base"
                    >
                      {t(`gdsmart.parts.${key}.points.${point}`)}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* One record */}
      <section className="bg-background-primary px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle
            title={t('gdsmart.record.title')}
            subtitle={t('gdsmart.record.text')}
          />

          <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border md:border-t md:border-border md:pt-8">
            {recordKeys.map((key) => (
              <div
                key={key}
                className="border-t border-border pt-6 md:border-t-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0"
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`gdsmart.record.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {t(`gdsmart.record.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-12 max-w-4xl border-t border-border pt-8 text-sm leading-relaxed text-text-secondary md:text-base">
            {t('gdsmart.record.server')}
          </p>
        </div>
      </section>

      <CtaBand
        title={t('gdsmart.cta.title')}
        text={t('gdsmart.cta.text')}
        button={t('gdsmart.cta.button')}
        tone="band"
      />
    </>
  )
}

export default Gdsmart
