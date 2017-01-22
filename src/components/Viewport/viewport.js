import Step from '../Step'
import * as utils from '../../utils'
import initStepData from '../../utils/initStepData'
import reverseData from '../../utils/reverseData'

export default {
  props: {
    /* 各动画的位置参数 */
    steps: {
      type: Array,
      required: true,
    },

    /* 若全屏模式，则只有第一个viewport的实例可以正常工作，大概...
     * 全屏的话，第一个实例会占满窗口，就像impress.js的例子一样，这样其他实例也没有意义 */
    fullscreen: Boolean,

  },

  components: {
    Step,
  },

  methods: {
    nextStep() {
      if (this.stepIndex >= this.steps.length - 1) {
        this.stepIndex = 0
      } else {
        this.stepIndex += 1
      }
      this.gotoStep(this.stepIndex)
    },
    prevStep() {
      if (this.stepIndex <= 0) {
        this.stepIndex = this.steps.length - 1
      } else {
        this.stepIndex -= 1
      }
      this.gotoStep(this.stepIndex)
    },

    gotoStep(stepIndex) {
      // console.log(stepIndex);
      // console.log(this.stepIndex);
      // if (stepIndex === this.stepIndex) {
      //   return
      // }
      const currentData = this.stepsData[stepIndex]
      const target = reverseData(currentData)
      this.initialRootStyle = {
        perspective: '1000px',
        transform: utils.scale(target.scale),
      }
      this.canvasStyle = {
        transform: utils.rotate(target.rotate, true) + utils.translate(target.translate),
      }
    },
  },

  beforeMount() {
    this.impressSupported = utils.impressSupported
    this.stepsData = this.steps.map((data) => {
      const stepData = initStepData(data)
      stepData.content = data.content
      return stepData
    })
  },

  mounted() {
    // const parent = this.$refs.root.offsetParent
    this.gotoStep(0)
  },

  data() {
    return {
      impressSupported: true,
      initialRootStyle: '',
      canvasStyle: '',
      stepIndex: null,
      stepsData: [],
    }
  },
}
