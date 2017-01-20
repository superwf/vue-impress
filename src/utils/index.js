export const pfx = (function prefix() {
  const style = document.createElement('dummy').style
  const prefixes = 'Webkit Moz O ms Khtml'.split(' ')
  const memory = {}

  return function withPrefix(prop) {
    if (typeof memory[prop] === 'undefined') {
      const ucProp = prop.charAt(0).toUpperCase() + prop.substr(1)
      const props = (`${prop} ${prefixes.join(`${ucProp} `)}${ucProp}`).split(' ')

      memory[prop] = null
      for (let i = 0; i < props.length; i += 1) {
        if (style[props[i]] !== undefined) {
          memory[prop] = props[i]
          break
        }
      }
    }

    return memory[prop]
  }
}())

// `arrayify` takes an array-like object and turns it into real Array
// to make all the Array.prototype goodness available.
export function arrayify(a) {
  return [].slice.call(a)
}

    // `css` function applies the styles given in `props` object to the element
    // given as `el`. It runs all property names through `pfx` function to make
    // sure proper prefixed version of the property is used.
export function css(el, props) {
  let pkey
  const hasOwn = Object.prototype.hasOwnProperty
  Object.keys(props).forEach((key) => {
    if (hasOwn.call(props, key)) {
      pkey = pfx(key)
      if (pkey !== null) {
        el.style[pkey] = props[key]
      }
    }
  })
  return el
}

// `toNumber` takes a value given as `numeric` parameter and tries to turn
// it into a number. If it is not possible it returns 0 (or other value
// given as `fallback`).
export function toNumber(numeric, fallback) {
  return isNaN(numeric) ? (fallback || 0) : Number(numeric)
}

// `byId` returns element with given `id` - you probably have guessed that ;)
export function byId(id) {
  return document.getElementById(id)
}

// `$` returns first element for given CSS `selector` in the `context` of
// the given element or whole document.
export function $(selector, context) {
  context = context || document
  return context.querySelector(selector)
}

// `$$` return an array of elements for given CSS `selector` in the `context` of
// the given element or whole document.
export function $$(selector, context) {
  context = context || document
  return arrayify(context.querySelectorAll(selector))
}

// `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
// and triggers it on element given as `el`.
export function triggerEvent(el, eventName, detail) {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, true, true, detail)
  el.dispatchEvent(event)
}

// `translate` builds a translate transform string for given data.
export function translate(t) {
  const z = t.z || 0
  return ` translate3d(${t.x}px,${t.y}px,${z}px) `
}

// `rotate` builds a rotate transform string for given data.
// By default the rotations are in X Y Z order that can be reverted by passing `true`
// as second parameter.
export function rotate(r, revert) {
  if (!r) {
    return ''
  }
  const rX = r.x ? ` rotateX(${r.x}deg) ` : ''
  const rY = r.y ? ` rotateY(${r.y}deg) ` : ''
  const rZ = r.z ? ` rotateZ(${r.z}deg) ` : ''

  return revert ? rZ + rY + rX : rX + rY + rZ
}

// `scale` builds a scale transform string for given data.
export function scale(s) {
  if (!s) {
    return ' scale(1) '
  }
  return ` scale(${s}) `
}

// `getElementFromHash` returns an element located by id from hash part of
// window location.
export function getElementFromHash() {
  // Get id from url # by removing `#` or `#/` from the beginning,
  // so both "fallback" `#slide-id` and "enhanced" `#/slide-id` will work
  return byId(window.location.hash.replace(/^#\/?/, ''))
}

// `computeWindowScale` counts the scale factor between window size and size
// defined for the presentation in the config.
export function computeWindowScale(config) {
  const hScale = window.innerHeight / config.height
  const wScale = window.innerWidth / config.width
  let containScale = hScale > wScale ? wScale : hScale

  if (config.maxScale && scale > config.maxScale) {
    containScale = config.maxScale
  }

  if (config.minScale && scale < config.minScale) {
    containScale = config.minScale
  }

  return containScale
}

// CHECK SUPPORT
const dummy = document.createElement('dummy')

const ua = navigator.userAgent.toLowerCase()
export const impressSupported =

  // Browser should support CSS 3D transtorms
  (pfx('perspective') !== null) &&

  // Browser should support `classList` and `dataset` APIs
  (dummy.classList) &&
  (dummy.dataset) &&

  // But some mobile devices need to be blacklisted,
  // because their CSS 3D support or hardware is not
  // good enough to run impress.js properly, sorry...
  (ua.search(/(iphone)|(ipod)|(android)/) === -1)
