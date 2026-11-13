import { useTranslation } from 'react-i18next'
import SectionTitle from './SectionTitle'

const phases = [
  {
    key: 'lite',
    phase: 1,
    isCurrent: true,
    features: ['autonomousSafety', 'fixedRoute', 'objectDetection'],
  },
  {
    key: 'pro',
    phase: 2,
    isCurrent: false,
    features: ['dynamicNav', 'wmsSync', 'fleetCoord'],
  },
  {
    key: 'platform',
    phase: 3,
    isCurrent: false,
    features: ['autoSorting', 'smartRacking', 'endToEnd'],
  },
]

function Roadmap() {
  const { t } = useTranslation()

  return (
    <section id="roadmap" className="bg-background-primary px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('roadmap.title')} />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {phases.map((phase) => (
            <div
              key={phase.key}
              className={`flex flex-col rounded-lg border bg-surface p-6 shadow-sm ${
                phase.isCurrent
                  ? 'border-brand-primary ring-1 ring-brand-primary/20'
                  : 'border-border'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full text-base font-bold ${
                    phase.isCurrent
                      ? 'bg-brand-primary text-white'
                      : 'bg-background-tertiary text-text-secondary'
                  }`}
                >
                  {phase.phase}
                </span>

                {phase.isCurrent && (
                  <span className="rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white">
                    {t('roadmap.currentPhase')}
                  </span>
                )}
              </div>

              <h3 className="mt-6 text-xl font-semibold text-text-primary">
                {t(`roadmap.${phase.key}.name`)}
              </h3>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-text-secondary">
                {phase.features.map((feature) => (
                  <li key={feature} className="flex items-start">
                    <span aria-hidden="true" className="mr-2 text-brand-primary">•</span>
                    {t(`roadmap.${phase.key}.features.${feature}`)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Roadmap
