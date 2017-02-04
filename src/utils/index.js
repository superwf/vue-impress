/* `translate` builds a translate transform string for given data. */
export function translate(t) {
  return ` translate3d(${t.x}px, ${t.y}px, ${t.z}px)`
}

/* `rotate` builds a rotate transform string for given data.
 * By default the rotations are in X Y Z order that can be reverted by passing `true`
 * as second parameter.
 * 我没明白revert有什么用，但是还是加上了
 */
export function rotate(r) {
  const r1 = {
    x: ` rotateX(${r.x}deg)`,
    y: ` rotateY(${r.y}deg)`,
    z: ` rotateZ(${r.z}deg)`,
  }
  const order = r.order
  return r1[order[0]] + r1[order[1]] + r1[order[2]]
}

/* `scale` builds a scale transform string for given data. */
export function scale(s) {
  return ` scale(${s})`
}

const dummy = document.createElement('dummy')

/* add css prefix, copy from impress.js'
 * 只在验证浏览器支持中用一下，vue本身会管css的前缀问题
 **/
export const pfx = (function prefix() {
  const style = dummy.style
  const prefixes = 'webkit moz O ms Khtml'.split(' ')
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

/* from time unit `ms` to `s` for transition-duration
 * when revert is false transform 1000 to 1s
 * when revert is true transform 1s to 1000
 * */
export const transitionDuration = (duration, revert = false) => (revert ? duration.slice(0, duration.length - 1) * 1000 : `${duration / 1000}s`)


// CHECK SUPPORT
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
