import { useTranslation } from 'react-i18next'

const teamKeys = ['wong', 'cheng', 'fong', 'lam']

// When you have photos, import them here and add to the map:
// import wongPhoto from '../assets/team/wong.jpg'
const teamPhotos = {
  wong: null,
  cheng: null,
  fong: null,
  lam: null,
}

function Team() {
  const { t } = useTranslation()

  return (
    <section id="team" className="py-16 px-4 bg-background-primary">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <h2 className="text-4xl md:text-5xl font-bold text-text-primary text-center mb-12">
          {t('team.title')}
        </h2>

        {/* Team Member Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamKeys.map((key) => (
            <div
              key={key}
              className="bg-surface rounded-lg p-6 flex flex-col items-center text-center h-full"
            >
              {/* Avatar — hidden until photo is available */}
              {teamPhotos[key] ? (
                <img
                  src={teamPhotos[key]}
                  alt={t(`team.${key}.name`)}
                  className="w-24 h-24 rounded-full object-cover object-center mb-4 border-2 border-border"
                />
              ) : (
                <div className="hidden w-24 h-24 rounded-full border-2 border-border mb-4" aria-hidden="true" />
              )}

              {/* Name */}
              <h3 className="text-xl md:text-2xl font-semibold text-text-primary mb-1">
                {t(`team.${key}.name`)}
              </h3>

              {/* Role */}
              <p className="text-base md:text-lg text-brand-secondary font-medium mb-8">
                {t(`team.${key}.role`)}
              </p>

              {/* Background */}
              <p className="text-sm md:text-base text-text-secondary mb-2">
                {t(`team.${key}.background`)}
              </p>

              {/* Expertise */}
              <p className="text-sm md:text-base text-text-muted mt-auto">
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
