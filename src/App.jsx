import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import './i18n'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Product from './components/Product'
import ValueProp from './components/ValueProp'
import Roadmap from './components/Roadmap'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'

function App() {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.title = t('pageTitle')
  }, [i18n.language, t])
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      <Navbar />
      <main>
        <section id="hero">
          <Hero />
        </section>
        <section id="product">
          <Product />
        </section>
        <section id="value-props">
          <ValueProp />
        </section>
        <section id="roadmap">
          <Roadmap />
        </section>
        <section id="team">
          <Team />
        </section>
        <section id="contact">
          <Contact />
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default App
