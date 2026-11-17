import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import SectionTitle from './SectionTitle'

const PHONE_PATTERN = /^\+?[0-9\s()-]{7,20}$/

function isValidPhone(value) {
  return PHONE_PATTERN.test(value) && value.replace(/\D/g, '').length >= 8
}

const emptyValues = {
  name: '',
  company: '',
  contactNumber: '',
  message: '',
}

function Field({ id, label, value, onChange, error, type = 'text', autoComplete, hint, multiline = false }) {
  const errorId = `${id}-error`
  const shared = {
    id,
    name: id,
    value,
    onChange,
    autoComplete,
    'aria-invalid': error ? true : undefined,
    'aria-describedby': error ? errorId : undefined,
    className:
      'block w-full rounded-md border border-border-dark bg-background-primary px-4 py-3 text-text-primary transition-colors duration-200 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/25',
  }

  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className="text-sm font-medium text-text-primary">
          {label}
        </label>
        {hint}
      </div>

      {multiline ? <textarea {...shared} rows={4} /> : <input {...shared} type={type} />}

      {error && (
        <p id={errorId} role="alert" className="mt-2 text-xs text-red-600">
          {error}
        </p>
      )}
    </div>
  )
}

export function buildMailto(values, t, language = 'en') {
  const colon = language.startsWith('zh') ? '：' : ': '
  const subject = `${t('contact.title')} - ${values.name.trim()}`
  const body = [
    `${t('contact.form.name')}${colon}${values.name.trim()}`,
    `${t('contact.form.company')}${colon}${values.company.trim()}`,
    `${t('contact.form.contactNumber')}${colon}${values.contactNumber.trim()}`,
    '',
    `${t('contact.form.message')}${colon}`,
    values.message.trim(),
  ].join('\r\n')

  return `mailto:team@gradisen.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Contact() {
  const { t, i18n } = useTranslation()
  const [values, setValues] = useState(emptyValues)
  const [errors, setErrors] = useState({})

  const updateField = (field) => (event) => {
    const { value } = event.target
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => (current[field] ? { ...current, [field]: undefined } : current))
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const nextErrors = {}
    if (!values.name.trim()) nextErrors.name = t('contact.errors.nameRequired')
    if (!values.company.trim()) nextErrors.company = t('contact.errors.companyRequired')
    if (!values.contactNumber.trim()) {
      nextErrors.contactNumber = t('contact.errors.contactRequired')
    } else if (!isValidPhone(values.contactNumber.trim())) {
      nextErrors.contactNumber = t('contact.errors.contactInvalid')
    }

    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const link = document.createElement('a')
    link.href = buildMailto(values, t, i18n.language)
    link.rel = 'noopener'
    document.body.appendChild(link)
    link.click()
    link.remove()
  }

  return (
    <section id="contact" className="bg-background-primary px-4 py-20">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title={t('contact.title')} subtitle={t('contact.tagline')} />

        <div className="mt-14 grid gap-10 md:grid-cols-2 lg:gap-16">
          {/* Contact information */}
          <div className="flex flex-col border-t border-border pt-8">
            <h3 className="text-xl font-semibold text-text-primary">
              {t('contact.infoTitle')}
            </h3>

            <div className="mt-8 flex items-center gap-4">
              <span className="material-symbols-outlined text-brand-primary" style={{ fontSize: '1.5rem', lineHeight: 1 }} aria-hidden="true">mail</span>
              <a
                href="mailto:team@gradisen.com"
                className="break-all text-lg font-semibold text-text-primary transition-colors duration-200 hover:text-brand-primary"
              >
                team@gradisen.com
              </a>
            </div>

            <p className="mt-10 max-w-sm text-sm leading-relaxed text-text-secondary">
              {t('contact.responseNote')}
            </p>

            <a
              href="https://forms.gle/zurn76xtQXupTg9x9"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex w-fit items-center gap-2 rounded-md border border-brand-primary px-5 py-2.5 text-sm font-semibold text-brand-primary transition-colors duration-300 hover:bg-brand-primary hover:text-white"
            >
              {t('hero.ctaPrimary')}
              <span className="material-symbols-outlined" style={{ fontSize: '1.1em', lineHeight: 1 }} aria-hidden="true">open_in_new</span>
            </a>
          </div>

          {/* Message form */}
          <form
            noValidate
            onSubmit={handleSubmit}
            aria-labelledby="contact-form-title"
            className="border-t border-border pt-8"
          >
            <h3 id="contact-form-title" className="text-lg font-semibold text-text-primary">
              {t('contact.formTitle')}
            </h3>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field
                id="contact-name"
                label={t('contact.form.name')}
                value={values.name}
                onChange={updateField('name')}
                error={errors.name}
                autoComplete="name"
              />
              <Field
                id="contact-company"
                label={t('contact.form.company')}
                value={values.company}
                onChange={updateField('company')}
                error={errors.company}
                autoComplete="organization"
              />
              <div className="sm:col-span-2">
                <Field
                  id="contact-number"
                  label={t('contact.form.contactNumber')}
                  value={values.contactNumber}
                  onChange={updateField('contactNumber')}
                  error={errors.contactNumber}
                  type="tel"
                  autoComplete="tel"
                />
              </div>
              <div className="sm:col-span-2">
                <Field
                  id="contact-message"
                  label={t('contact.form.message')}
                  value={values.message}
                  onChange={updateField('message')}
                  multiline
                  hint={<span className="text-xs text-text-muted">{t('contact.form.optional')}</span>}
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 w-full rounded-md bg-brand-primary px-6 py-3 font-semibold text-white shadow-sm transition-colors duration-300 hover:bg-brand-primaryDark sm:w-auto"
            >
              {t('contact.form.submit')}
            </button>

          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
