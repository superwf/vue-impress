import * as utils from '../../utils'

export default {
  props: ['step'],

  computed: {
    style() {
      const { step } = this
      const transform = utils.translate(step) +
        utils.rotate(step.rotate) + utils.scale(step.scale)
      return {
        transform,
      }
    },
  },

  data() {
    return {
      name: 'abc',
    }
  },
}
