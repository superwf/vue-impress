import toNumber from './toNumber'

export { toNumber }

// `triggerEvent` builds a custom DOM event with given `eventName` and `detail` data
// and triggers it on element given as `el`.
export function triggerEvent(el, eventName, detail) {
  const event = document.createEvent('CustomEvent')
  event.initCustomEvent(eventName, true, true, detail)
  el.dispatchEvent(event)
}

// `translate` builds a translate transform string for given data.
export function translate(t) {
  const z = toNumber(t.z, 0)
  return ` translate3d(${t.x}px,${t.y}px,${z}px) `
}

// `rotate` builds a rotate transform string for given data.
// By default the rotations are in X Y Z order that can be reverted by passing `true`
// as second parameter.
export function rotate(r, revert) {
  const rX = r.x ? ` rotateX(${r.x}deg) ` : ''
  const rY = r.y ? ` rotateY(${r.y}deg) ` : ''
  const rZ = r.z ? ` rotateZ(${r.z}deg) ` : ''

  return revert ? rZ + rY + rX : rX + rY + rZ
}

// `scale` builds a scale transform string for given data.
export function scale(s) {
  return ` scale(${s}) `
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
