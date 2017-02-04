import expect from 'expect'
import { translate, rotate, scale, impressSupported, transitionDuration } from '../../../src/utils'

describe('test utils', () => {
  it('translate', () => {
    const t = {
      x: 100,
      y: 200,
      z: 300,
    }
    expect(translate(t)).toEqual(` translate3d(${t.x}px, ${t.y}px, ${t.z}px)`)
  })

  it('rotate', () => {
    const t = {
      x: 100,
      y: 200,
      z: 300,
      order: ['x', 'y', 'z'],
    }
    expect(rotate(t)).toEqual(' rotateX(100deg) rotateY(200deg) rotateZ(300deg)')
    t.order = ['y', 'x', 'z']
    expect(rotate(t)).toEqual(' rotateY(200deg) rotateX(100deg) rotateZ(300deg)')
    t.order = ['z', 'y', 'x']
    expect(rotate(t)).toEqual(' rotateZ(300deg) rotateY(200deg) rotateX(100deg)')
  })

  it('scale', () => {
    const s = 6
    expect(scale(s)).toBe(` scale(${s})`)
  })

  /* in test env, phantomjs or chrome or firefox test env, it is sure to be true */
  it('impressSupported', () => {
    expect(impressSupported).toBe(true)
  })

  it('transitionDuration', () => {
    expect(transitionDuration(2000)).toBe('2s')

    expect(transitionDuration('1.4s', true)).toBe(1400)
  })
})
