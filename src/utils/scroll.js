import { css } from './dom.js'

export function getScrollTarget (el) {
  return el.closest('.scroll,.scroll-y,.overflow-auto') || window
}

export function getScrollHeight (el) {
  return (el === window ? document.body : el).scrollHeight
}

export function getScrollPosition (scrollTarget) {
  if (scrollTarget === window) {
    return window.pageYOffset || window.scrollY || document.body.scrollTop || 0
  }
  return scrollTarget.scrollTop
}

export function getHorizontalScrollPosition (scrollTarget) {
  if (scrollTarget === window) {
    return window.pageXOffset || window.scrollX || document.body.scrollLeft || 0
  }
  return scrollTarget.scrollLeft
}

export function animScrollTo (el, to, duration, axis) {
  if (duration <= 0) {
    return
  }

  const pos = axis ? axis === 'x' ? getHorizontalScrollPosition(el) : getScrollPosition(el) : getScrollPosition(el)

  requestAnimationFrame(() => {
    setScroll(el, pos + (to - pos) / Math.max(16, duration) * 16)
    if (el.scrollTop !== to) {
      animScrollTo(el, to, duration - 16)
    }
  })
}

function setScroll (scrollTarget, offset, axis) {
  if (scrollTarget === window) {
    document.documentElement.scrollTop = offset
    document.body.scrollTop = offset
    return
  }
  const pos = axis ? axis === 'x' ? 'scrollLeft' : 'scrollTop' : 'scrollTop';

  scrollTarget[pos] = offset
}

export function setScrollPosition (scrollTarget, offset, duration, axis) {
  if (duration) {
    animScrollTo(scrollTarget, offset, duration, axis)
    return
  }
  setScroll(scrollTarget, offset, axis)
}

let size
export function getScrollbarWidth () {
  if (size !== undefined) {
    return size
  }

  const
    inner = document.createElement('p'),
    outer = document.createElement('div')

  css(inner, {
    width: '100%',
    height: '200px'
  })
  css(outer, {
    position: 'absolute',
    top: '0px',
    left: '0px',
    visibility: 'hidden',
    width: '200px',
    height: '150px',
    overflow: 'hidden'
  })

  outer.appendChild(inner)

  document.body.appendChild(outer)

  let w1 = inner.offsetWidth
  outer.style.overflow = 'scroll'
  let w2 = inner.offsetWidth

  if (w1 === w2) {
    w2 = outer.clientWidth
  }

  outer.remove()
  size = w1 - w2

  return size
}

export function hasScrollbar (el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false
  }

  return onY
    ? (
      el.scrollHeight > el.clientHeight && (
        el.classList.contains('scroll') ||
        el.classList.contains('overflow-auto') ||
        ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-y'])
      )
    )
    : (
      el.scrollWidth > el.clientWidth && (
        el.classList.contains('scroll') ||
        el.classList.contains('overflow-auto') ||
        ['auto', 'scroll'].includes(window.getComputedStyle(el)['overflow-x'])
      )
    )
}

export default {
  getScrollTarget,
  getScrollHeight,
  getScrollPosition,
  animScrollTo,
  setScrollPosition,
  getScrollbarWidth,
  hasScrollbar
}
