import { translate, rotate, scale } from '../../utils'

export default {
  props: ['step', 'index', 'active', 'present'],

  methods: {
    click(index) {
      this.$parent.$emit('impress:goto', index)
    },
  },

  computed: {
    style() {
      const { step } = this
      const transform = `translate(-50%, -50%) ${translate(step.translate)}
        ${rotate(step.rotate)} ${scale(step.scale)}`
      return {
        transform,
      }
    },
    /* if content is string, use slog, else use component
     * 本以为直接把vue实例放进模板里应该能直接渲染，没想到没有jsx那么方便啊
     * 但我理解这应该算是一种提高运行效率的，如果像jsx中那样统统都方便的render
     * 那每个render的对象可能都需要多加一层这样的判断
     * */
    contentIsString() {
      return typeof this.step.content === 'string'
    },

    contentIsVue() {
      const { content } = this.step
      /* eslint-disable no-underscore-dangle */
      return !!(content && content._isVue)
      /* eslint-enable no-underscore-dangle */
    },
  },

  mounted() {
    if (this.contentIsVue) {
      this.step.content.$mount(this.$refs.mountPoint)
    }
  },
}
