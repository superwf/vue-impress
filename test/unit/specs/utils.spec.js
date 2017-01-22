import expect from 'expect'
import toNumber from '../../../src/utils/toNumber'
import initStepData from '../../../src/utils/initStepData'
import reverseData from '../../../src/utils/reverseData'

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

  it('initStepData and reverseData', () => {
    const data = {
      x: 10,
      y: 20,
      rotateX: 30,
      rotateY: 40,
    }
    const stepData = initStepData(data)
    expect(stepData.translate).toEqual({
      x: data.x,
      y: data.y,
      z: 0,
    })

    expect(stepData.rotate).toEqual({
      x: data.rotateX,
      y: data.rotateY,
      z: 0,
    })
    expect(stepData.scale).toBe(1)

    expect(reverseData(stepData)).toEqual({
      translate: {
        x: -10,
        y: -20,
        z: 0,
      },
      rotate: {
        x: -30,
        y: -40,
        z: 0,
      },
      scale: 1,
    })

    const data1 = {
      z: 30,
      rotate: 30,
      scale: 5,
    }
    const stepData1 = initStepData(data1)
    expect(stepData1.translate).toEqual({
      x: 0,
      y: 0,
      z: 30,
    })

    expect(stepData1.rotate).toEqual({
      x: 0,
      y: 0,
      z: 30,
    })
    expect(stepData1.scale).toEqual(data1.scale)
    expect(reverseData(stepData1)).toEqual({
      translate: {
        x: 0,
        y: 0,
        z: -30,
      },
      rotate: {
        x: 0,
        y: 0,
        z: -30,
      },
      scale: 0.2,
    })
  })
})
