import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionTitle from '../components/SectionTitle'
import Contact from '../components/Contact'

const heroImage = 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80'

const products = [
  {
    key: 'gdsense',
    to: '/gdsense',
    image: 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1200',
  },
  {
    key: 'gdsmart',
    to: '/gdsmart',
    image: 'https://images.pexels.com/photos/12935075/pexels-photo-12935075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    reverse: true,
  },
]

const strengthKeys = ['fit', 'team', 'support']

function Home() {
  const { t } = useTranslation()

  return (
    <>
      <Hero
        image={heroImage}
        headline={t('home.hero.headline')}
        subheadline={t('home.hero.subheadline')}
        primary={{ label: t('home.hero.ctaPrimary'), href: '/gdsense' }}
        secondary={{ label: t('home.hero.ctaSecondary'), to: '/gdsmart' }}
        scrollTo="#products"
        scrollLabel={t('home.scroll')}
      />

      <section id="products" className="bg-background-primary px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title={t('home.products.title')} subtitle={t('home.products.subtitle')} />

          <div className="mt-16 space-y-20 md:mt-20 md:space-y-28">
            {products.map(({ key, to, image, reverse }) => (
              <div
                key={key}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <img
                  src={image}
                  alt={t(`home.products.${key}.imageAlt`)}
                  loading="lazy"
                  decoding="async"
                  className={`aspect-[4/3] w-full object-cover md:max-w-[440px] md:justify-self-center ${
                    reverse ? 'md:order-2' : ''
                  }`}
                />

                <div className={reverse ? 'md:order-1' : ''}>
                  <h3 className="text-3xl font-semibold tracking-tight text-text-primary md:text-4xl">
                    {t(`home.products.${key}.name`)}
                  </h3>

                  <p className="mt-5 max-w-md text-base leading-relaxed text-text-secondary">
                    {t(`home.products.${key}.line`)}
                  </p>

                  <Link
                    to={to}
                    className="mt-8 inline-flex items-center gap-2 rounded-md border border-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors duration-200 hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
                  >
                    {t(`home.products.${key}.link`)}
                    <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">arrow_forward</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-band px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <SectionTitle title={t('home.strengths.title')} />

          <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-0 md:divide-x md:divide-border md:border-t md:border-border md:pt-8">
            {strengthKeys.map((key) => (
              <div
                key={key}
                className="border-t border-border pt-6 md:border-t-0 md:px-8 md:pt-0 md:first:pl-0 md:last:pr-0"
              >
                <h3 className="text-lg font-semibold text-text-primary">
                  {t(`home.strengths.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                  {t(`home.strengths.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
    </>
  )
}

export default Home
