import expect from 'expect'
import computeScale from '../../../../src/utils/computeScale'

describe('utils/computeScale', () => {
  it('computeScale use window as container', () => {
    const container = {
      width: 200,
      height: 500,
    }
    const config = {
      width: 400,
      height: 800,
    }

    const scale = computeScale(container, config)
    expect(scale).toBe(container.width / config.width)

    const container1 = {
      width: 300,
      height: 500,
    }
    const config1 = {
      width: 400,
      height: 800,
    }

    const scale1 = computeScale(container1, config1)
    expect(scale1).toBe(container1.height / config1.height)
  })
})
