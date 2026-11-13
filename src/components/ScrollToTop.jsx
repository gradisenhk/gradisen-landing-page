import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  const previous = useRef({ pathname, hash })

  useEffect(() => {
    const changed = previous.current.pathname !== pathname || previous.current.hash !== hash
    previous.current = { pathname, hash }

    const scrollToHash = (value) => {
      const target = document.querySelector(value)
      if (target && typeof target.scrollIntoView === 'function') {
        target.scrollIntoView()
      }
    }

    // On the first render, keep the browser position but honour a deep link hash.
    if (!changed) {
      if (hash) scrollToHash(hash)
      return
    }

    if (hash) {
      scrollToHash(hash)
      return
    }

    window.scrollTo(0, 0)

    // Move focus to the page heading so keyboard and screen reader users start at the top.
    const heading = document.querySelector('main h1')
    if (heading) {
      heading.setAttribute('tabindex', '-1')
      heading.focus({ preventScroll: true })
    }
  }, [pathname, hash])

  return null
}

export default ScrollToTop
