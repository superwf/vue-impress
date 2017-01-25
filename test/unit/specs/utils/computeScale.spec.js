import expect from 'expect'
import computeScale from '../../../../src/utils/computeScale'

describe('utils/computeScale', () => {
  it('computeScale', () => {
    const container = {
      innerWidth: 200,
      innerHeight: 500,
    }
    const config = {
      width: 400,
      height: 800,
    }

    const scale = computeScale(container, config)
    expect(scale).toBe(container.innerWidth / config.width)

    const container1 = {
      innerWidth: 300,
      innerHeight: 500,
    }
    const config1 = {
      width: 400,
      height: 800,
    }

    const scale1 = computeScale(container1, config1)
    expect(scale1).toBe(container1.innerHeight / config1.height)
  })
})
