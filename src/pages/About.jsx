import { useTranslation } from 'react-i18next'
import PageHeader from '../components/PageHeader'
import SectionTitle from '../components/SectionTitle'
import Team from '../components/Team'
import CtaBand from '../components/CtaBand'

const approachKeys = ['deploy', 'fit', 'data']

function About() {
  const { t } = useTranslation()

  return (
    <>
      <PageHeader
        title={t('about.hero.title')}
        subtitle={t('about.hero.subline')}
      />

      <section className="bg-background-primary px-4 py-20">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-text-primary md:text-4xl">
            {t('about.story.title')}
          </h2>
          <span aria-hidden="true" className="mt-4 block h-1 w-12 rounded-full bg-brand-primary" />

          <p className="mt-8 text-base leading-relaxed text-text-secondary md:text-lg">
            {t('about.story.p1')}
          </p>
          <p className="mt-5 text-base leading-relaxed text-text-secondary md:text-lg">
            {t('about.story.p2')}
          </p>
        </div>
      </section>

      <section className="bg-background-primary px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title={t('about.approach.title')} />

          <div className="mt-12 border-t border-border">
            {approachKeys.map((key) => (
              <div
                key={key}
                className="grid gap-3 border-b border-border py-8 md:grid-cols-[14rem_1fr] md:items-baseline md:gap-8"
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`about.approach.${key}.title`)}
                </h3>
                <p className="text-base leading-relaxed text-text-secondary">
                  {t(`about.approach.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Team />

      <CtaBand
        title={t('about.cta.title')}
        text={t('about.cta.text')}
        button={t('about.cta.button')}
      />
    </>
  )
}

export default About
