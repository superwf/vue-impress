import { translate, rotate, scale } from '../../utils'

export default {
  props: ['step', 'index', 'active', 'present'],

  methods: {
    click() {
      this.$parent.$emit('impress:goto', this.index)
    },
  },

  computed: {
    style() {
      const { step } = this
      const transform = `${translate(step.translate)}
        ${rotate(step.rotate)} ${scale(step.scale)}`
      return { transform }
    },
  },

  render(h) {
    const { step, style, click, active, present } = this
    const content = step.component ?
      <step.component { ...{ props: step.props } }></step.component> : step.content
    return <div style={style} onClick={click} class={ { active, present, 'impress-step': true } }>
      { content }
    </div>
  }
}
