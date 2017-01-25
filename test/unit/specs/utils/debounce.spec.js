import expect, { createSpy } from 'expect'
import debounce from '../../../../src/utils/debounce'

describe('utils', () => {
  it('debounce function with param', (done) => {
    const spy = createSpy()
    const fn = debounce(spy, 10)

    fn(123)
    expect(spy).toNotHaveBeenCalled()

    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(123)
      done()
    }, 11)
  })

  it('debounce many times', (done) => {
    const spy = createSpy()
    const fn = debounce(spy, 10)

    fn()
    expect(spy).toNotHaveBeenCalled()

    setTimeout(() => {
      expect(spy).toNotHaveBeenCalled()
      setTimeout(() => {
        expect(spy).toHaveBeenCalled()
        done()
      }, 10)
    }, 9)
  })
})
