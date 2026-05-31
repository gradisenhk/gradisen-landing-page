import React from 'react'
import { useTranslation } from 'react-i18next'

function Roadmap() {
  const { t } = useTranslation()

  const phases = [
    {
      key: 'lite',
      phase: 1,
      isCurrent: true,
      features: ['autonomousSafety', 'fixedRoute', 'objectDetection']
    },
    {
      key: 'pro',
      phase: 2,
      isCurrent: false,
      features: ['dynamicNav', 'wmsSync', 'fleetCoord']
    },
    {
      key: 'platform',
      phase: 3,
      isCurrent: false,
      features: ['autoSorting', 'smartRacking', 'endToEnd']
    }
  ]

  return (
    <section id="roadmap" className="py-16 px-4 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-16">
          {t('roadmap.title')}
        </h2>

        {/* Timeline Container - Vertical on mobile, Horizontal on desktop */}
        <div className="relative">
          {/* Desktop: Horizontal Timeline */}
          <div className="hidden lg:flex lg:justify-between lg:items-start lg:gap-8">
            {phases.map((phase, index) => (
              <div key={phase.key} className="flex-1 relative">
                {/* Connecting Line */}
                {index < phases.length - 1 && (
                  <div className="absolute top-8 left-1/2 w-full h-0.5 bg-border z-0" />
                )}

                {/* Phase Card */}
                <div className="relative z-10">
                  {/* Phase Number Circle */}
                  <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl font-bold border-4 ${
                    phase.isCurrent
                      ? 'bg-brand-primary text-white border-brand-primary shadow-md'
                      : 'bg-surface text-text-muted border-border'
                  }`}>
                    {phase.phase}
                  </div>

                  {/* Phase Content */}
                  <div className={`bg-surface border-2 rounded-lg p-6 shadow-sm ${
                    phase.isCurrent
                      ? 'border-brand-primary shadow-md'
                      : 'border-border'
                  }`}>
                    {/* Phase Name */}
                    <h3 className={`text-xl font-semibold mb-2 ${
                      phase.isCurrent ? 'text-brand-primary' : 'text-text-secondary'
                    }`}>
                      {t(`roadmap.${phase.key}.name`)}
                    </h3>

                    {/* Current Phase Badge */}
                    {phase.isCurrent && (
                      <div className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        {t('roadmap.currentPhase')}
                      </div>
                    )}

                    {/* Features List */}
                    <ul className="space-y-2 mt-4">
                      {phase.features.map((feature) => (
                        <li key={feature} className={`text-sm flex items-start ${
                          phase.isCurrent ? 'text-text-secondary' : 'text-text-muted'
                        }`}>
                          <span className={`mr-2 ${
                            phase.isCurrent ? 'text-brand-primary' : 'text-text-disabled'
                          }`}>
                            •
                          </span>
                          {t(`roadmap.${phase.key}.features.${feature}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile/Tablet: Vertical Timeline */}
          <div className="lg:hidden space-y-8">
            {phases.map((phase, index) => (
              <div key={phase.key} className="relative flex gap-6">
                {/* Timeline Line and Circle */}
                <div className="flex flex-col items-center">
                  {/* Phase Number Circle */}
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-4 flex-shrink-0 ${
                    phase.isCurrent
                      ? 'bg-brand-primary text-white border-brand-primary shadow-md'
                      : 'bg-surface text-text-muted border-border'
                  }`}>
                    {phase.phase}
                  </div>

                  {/* Connecting Line */}
                  {index < phases.length - 1 && (
                    <div className="w-0.5 h-full bg-border flex-grow mt-2" />
                  )}
                </div>

                {/* Phase Content */}
                <div className="flex-1 pb-8">
                  <div className={`bg-surface border-2 rounded-lg p-6 shadow-sm ${
                    phase.isCurrent
                      ? 'border-brand-primary shadow-md'
                      : 'border-border'
                  }`}>
                    {/* Phase Name */}
                    <h3 className={`text-xl font-semibold mb-2 ${
                      phase.isCurrent ? 'text-brand-primary' : 'text-text-secondary'
                    }`}>
                      {t(`roadmap.${phase.key}.name`)}
                    </h3>

                    {/* Current Phase Badge */}
                    {phase.isCurrent && (
                      <div className="inline-block bg-brand-primary text-white text-xs font-bold px-3 py-1 rounded-full mb-4">
                        {t('roadmap.currentPhase')}
                      </div>
                    )}

                    {/* Features List */}
                    <ul className="space-y-2 mt-4">
                      {phase.features.map((feature) => (
                        <li key={feature} className={`text-sm flex items-start ${
                          phase.isCurrent ? 'text-text-secondary' : 'text-text-muted'
                        }`}>
                          <span className={`mr-2 ${
                            phase.isCurrent ? 'text-brand-primary' : 'text-text-disabled'
                          }`}>
                            •
                          </span>
                          {t(`roadmap.${phase.key}.features.${feature}`)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Roadmap
