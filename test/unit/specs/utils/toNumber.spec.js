import expect from 'expect'
import toNumber from '../../../../src/utils/toNumber'

describe('test utils', () => {
  it('toNumber', () => {
    let n = toNumber('100')
    expect(n).toBe(100)

    n = toNumber('a', 10)
    expect(n).toBe(10)

    n = toNumber('a')
    expect(n).toBe(0)

    n = toNumber('a')
    expect(n).toBe(0)

    n = toNumber(Number.NaN, 11)
    expect(n).toBe(11)

    n = toNumber(12, 12)
    expect(n).toBe(12)
  })
})
