import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Contact, { buildMailto } from '../components/Contact'

// Mock react-i18next — returns the key as the translation value
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key,
    i18n: { language: 'en', changeLanguage: vi.fn() },
  }),
}))

let mailtoHref = ''

beforeEach(() => {
  mailtoHref = ''
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function () {
    mailtoHref = this.href
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

// Helper: render and return the submit button and field accessors
function setup() {
  render(<Contact />)
  return {
    nameInput:          () => screen.getByLabelText('contact.form.name'),
    companyInput:       () => screen.getByLabelText('contact.form.company'),
    contactNumberInput: () => screen.getByLabelText('contact.form.contactNumber'),
    messageInput:       () => screen.getByLabelText('contact.form.message'),
    submitButton:       () => screen.getByRole('button', { name: 'contact.form.submit' }),
  }
}

// Fill all required fields with valid data
async function fillValidForm(fields, user, overrides = {}) {
  const name          = 'name'          in overrides ? overrides.name          : 'John Doe'
  const company       = 'company'       in overrides ? overrides.company       : 'Acme Ltd'
  const contactNumber = 'contactNumber' in overrides ? overrides.contactNumber : '+852 9123 4567'

  if (name)          await user.type(fields.nameInput(),          name)
  if (company)       await user.type(fields.companyInput(),       company)
  if (contactNumber) await user.type(fields.contactNumberInput(), contactNumber)
}

// ─── Valid submission ────────────────────────────────────────────────────────

describe('valid form submission', () => {
  it('opens the mail client with the entered details', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user)
    await user.type(fields.messageInput(), 'Please arrange a demo.')
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(mailtoHref).toContain('mailto:team@gradisen.com')
    })

    const decoded = decodeURIComponent(mailtoHref)
    expect(decoded).toContain('John Doe')
    expect(decoded).toContain('Acme Ltd')
    expect(decoded).toContain('+852 9123 4567')
    expect(decoded).toContain('Please arrange a demo.')
  })

  it('builds a localized mailto link', () => {
    const href = buildMailto(
      {
        name: '陳大文',
        company: '甲公司',
        contactNumber: '91234567',
        message: '想安排示範。',
      },
      (key) => key,
      'zh-HK'
    )

    const decoded = decodeURIComponent(href)
    expect(decoded).toContain('contact.form.name：陳大文')
    expect(decoded).toContain('contact.form.company：甲公司')
    expect(decoded).toContain('contact.form.contactNumber：91234567')
    expect(decoded).toContain('contact.form.message：')
    expect(decoded).toContain('想安排示範。')
  })

  it('does not show any field errors on valid submission', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user)
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.queryByText('contact.errors.nameRequired')).not.toBeInTheDocument()
      expect(screen.queryByText('contact.errors.companyRequired')).not.toBeInTheDocument()
      expect(screen.queryByText('contact.errors.contactRequired')).not.toBeInTheDocument()
      expect(screen.queryByText('contact.errors.contactInvalid')).not.toBeInTheDocument()
    })
  })
})

// ─── Empty field errors ──────────────────────────────────────────────────────

describe('empty required fields', () => {
  it('shows name required error when name is empty', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { name: '' })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.nameRequired')).toBeInTheDocument()
    })
  })

  it('shows company required error when company is empty', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { company: '' })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.companyRequired')).toBeInTheDocument()
    })
  })

  it('shows contact required error when contact number is empty', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { contactNumber: '' })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.contactRequired')).toBeInTheDocument()
    })
  })

  it('shows all errors when all required fields are empty', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole('button', { name: 'contact.form.submit' }))

    await waitFor(() => {
      expect(screen.getByText('contact.errors.nameRequired')).toBeInTheDocument()
      expect(screen.getByText('contact.errors.companyRequired')).toBeInTheDocument()
      expect(screen.getByText('contact.errors.contactRequired')).toBeInTheDocument()
    })
  })

  it('does not open the mail client when required fields are empty', async () => {
    const user = userEvent.setup()
    setup()

    await user.click(screen.getByRole('button', { name: 'contact.form.submit' }))

    await waitFor(() => {
      expect(screen.getByText('contact.errors.nameRequired')).toBeInTheDocument()
    })
    expect(mailtoHref).toBe('')
  })
})

// ─── Phone number validation ─────────────────────────────────────────────────

describe('phone number validation', () => {
  const validNumbers = [
    // HK formats
    ['+852 9123 4567', 'HK mobile with country code'],
    ['91234567',       'HK mobile 8-digit'],
    ['(852) 9123-4567','HK with parentheses and dash'],
    // China formats
    ['+86 138 0013 8000', 'CN mobile with country code'],
    ['13800138000',       'CN mobile 11-digit'],
    ['010-12345678',      'CN landline with area code'],
    ['400 123 4567',      'CN toll-free'],
  ]

  it.each(validNumbers)('accepts valid number: %s (%s)', async (number) => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { contactNumber: number })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.queryByText('contact.errors.contactInvalid')).not.toBeInTheDocument()
      expect(screen.queryByText('contact.errors.contactRequired')).not.toBeInTheDocument()
    })
  })

  const invalidNumbers = [
    ['abc-defg',      'letters only'],
    ['9123@4567',     'contains @'],
    ['9123#4567',     'contains #'],
    ['hello world',   'plain text'],
  ]

  it.each(invalidNumbers)('rejects invalid number: %s (%s)', async (number) => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { contactNumber: number })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.contactInvalid')).toBeInTheDocument()
    })
  })
})

// ─── Error clearing behaviour ────────────────────────────────────────────────

describe('error clearing', () => {
  it('clears name error when user starts typing after failed submission', async () => {
    const user = userEvent.setup()
    const fields = setup()

    // Submit empty to trigger error
    await user.click(fields.submitButton())
    await waitFor(() => {
      expect(screen.getByText('contact.errors.nameRequired')).toBeInTheDocument()
    })

    // Start typing — error should clear
    await user.type(fields.nameInput(), 'J')
    await waitFor(() => {
      expect(screen.queryByText('contact.errors.nameRequired')).not.toBeInTheDocument()
    })
  })

})

// ─── Whitespace trimming ─────────────────────────────────────────────────────

describe('whitespace trimming', () => {
  it('treats whitespace-only name as empty', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { name: '   ' })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.nameRequired')).toBeInTheDocument()
    })
  })

  it('treats whitespace-only company as empty', async () => {
    const user = userEvent.setup()
    const fields = setup()

    await fillValidForm(fields, user, { company: '   ' })
    await user.click(fields.submitButton())

    await waitFor(() => {
      expect(screen.getByText('contact.errors.companyRequired')).toBeInTheDocument()
    })
  })
})
