import * as utils from '../../utils'

export default {
  props: ['step', 'click', 'index'],

  computed: {
    style() {
      const { step } = this
      const transform = `translate(-50%, -50%) ${utils.translate(step.translate)}
        ${utils.rotate(step.rotate)} ${utils.scale(step.scale)}`
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
