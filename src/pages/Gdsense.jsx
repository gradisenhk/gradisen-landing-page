import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'
import Product from '../components/Product'
import ValueProp from '../components/ValueProp'
import CtaBand from '../components/CtaBand'

const heroImage = 'https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1920'

function Gdsense() {
  const { t } = useTranslation()

  return (
    <>
      <Hero
        image={heroImage}
        headline={t('hero.headline')}
        subheadline={t('hero.subheadline')}
        primary={{
          label: t('hero.ctaPrimary'),
          href: 'https://forms.gle/zurn76xtQXupTg9x9',
          external: true,
        }}
        secondary={{ label: t('hero.ctaSecondary'), to: '/#contact' }}
        scrollTo="#product"
        scrollLabel={t('hero.scroll')}
        compact
      />

      <Product />
      <ValueProp />

      <CtaBand
        title={t('gdsense.cta.title')}
        text={t('gdsense.cta.text')}
        button={t('gdsense.cta.button')}
      />
    </>
  )
}

export default Gdsense
