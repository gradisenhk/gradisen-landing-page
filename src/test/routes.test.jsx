import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import '../i18n'
import App from '../App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>
  )
}

describe('routes', () => {
  test.each([
    ['/', 'We build warehouse robots and property maintenance software.'],
    ['/gdsense', 'Plug-and-play edge AI for small and medium warehouses, live within 24 hours.'],
    ['/gdsmart', 'Gradisen SMART'],
    ['/about', 'About Gradisen'],
  ])('%s renders its page heading', (path, heading) => {
    renderAt(path)
    expect(screen.getByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
  })

  test('the contact path redirects to the contact section on home', () => {
    renderAt('/contact')
    expect(screen.getByRole('heading', { level: 1, name: 'We build warehouse robots and property maintenance software.' })).toBeInTheDocument()
    expect(document.querySelector('#contact')).not.toBeNull()
  })

  test('an unknown route renders the not found page', () => {
    renderAt('/does-not-exist')
    expect(screen.getByRole('heading', { level: 1, name: 'Page not found' })).toBeInTheDocument()
  })

  test('the nav marks the current page', () => {
    renderAt('/gdsmart')
    const links = screen.getAllByRole('link', { name: 'GDSmart' })
    expect(links.some((link) => link.getAttribute('aria-current') === 'page')).toBe(true)
  })
})
