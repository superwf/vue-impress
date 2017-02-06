import expect from 'expect'
import initStepData, { defaultRotateOrder } from '../../../../src/utils/initStepData'
import reverseData from '../../../../src/utils/reverseData'

describe('test utils', () => {
  it('initStepData and reverseData', () => {
    const data = {
      x: 10,
      y: 20,
      rotateX: 30,
      rotateY: 40,
      transitionTimingFunction: 'linear',
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
      order: defaultRotateOrder,
    })
    expect(stepData.scale).toBe(1)
    expect(stepData.transitionDuration).toBe(null)
    expect(stepData.transitionTimingFunction).toBe('linear')

    const order = Object.assign([], defaultRotateOrder)
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
        order: order.reverse(),
      },
      scale: 1,
    })

    const data1 = {
      z: 30,
      rotate: 30,
      scale: 0,
      transitionDuration: 3000,
      rotateOrder: ['y', 'z', 'x']
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
      order: ['y', 'z', 'x'],
    })
    expect(stepData1.scale).toEqual(data1.scale)
    expect(stepData1.transitionDuration).toBe('3s')
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
        order: ['x', 'z', 'y'],
      },
      scale: 1,
    })
  })
})
