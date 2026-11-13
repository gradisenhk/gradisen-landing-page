import { useTranslation } from 'react-i18next'
import SectionTitle from './SectionTitle'

const teamKeys = ['wong', 'cheng', 'fong', 'lam']

function Team() {
  const { t } = useTranslation()

  return (
    <section id="team" className="bg-band px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('team.title')} />

        <div className="mt-12 border-t border-border">
          {teamKeys.map((key) => (
            <div
              key={key}
              className="grid gap-2 border-b border-border py-6 md:grid-cols-[1.2fr_1fr_1fr] md:items-baseline md:gap-8"
            >
              <div>
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`team.${key}.name`)}
                </h3>
                <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand-primary">
                  {t(`team.${key}.role`)}
                </p>
              </div>

              <p className="text-sm leading-relaxed text-text-secondary">
                {t(`team.${key}.background`)}
              </p>
              <p className="text-sm leading-relaxed text-text-muted">
                {t(`team.${key}.expertise`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
