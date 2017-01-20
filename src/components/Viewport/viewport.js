import Step from '../Step'
import * as utils from '../../utils'

export default {
  props: {
    steps: {
      type: Array,
      required: true,
    },
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
      const currentStep = this.steps[this.stepIndex]
      const target = {
        rotate: {
          // x: -currentStep.rotate.x,
          // y: -currentStep.rotate.y,
          // z: -currentStep.rotate.z,
        },
        translate: {
          x: -currentStep.x,
          y: -currentStep.y,
          z: -currentStep.z,
          // x: -currentStep.translate.x,
          // y: -currentStep.translate.y,
          // z: -currentStep.translate.z,
        },
        scale: currentStep.scale ? 1 / currentStep.scale : 1,
      }
      console.log(target);
      this.initialRootStyle = {
        perspective: '1000px',
        transform: utils.scale(target.scale),
      }
      this.initialCanvasStyle = {
        transform: utils.rotate(target.rotate, true) + utils.translate(target.translate),
      }
    },
  },

  beforeMount() {
    this.impressSupported = utils.impressSupported
    const currentStep = this.steps[0]
    const target = {
      rotate: {
        // x: -currentStep.rotate.x,
        // y: -currentStep.rotate.y,
        // z: -currentStep.rotate.z,
      },
      translate: {
        x: -currentStep.x,
        y: -currentStep.y,
        z: -currentStep.z,
        // x: -currentStep.translate.x,
        // y: -currentStep.translate.y,
        // z: -currentStep.translate.z,
      },
      scale: 1 / currentStep.scale,
    }
    console.log(target);
    this.initialRootStyle = {
      perspective: '1000px',
      transform: utils.scale(target.scale),
    }
    this.initialCanvasStyle = {
      transform: utils.rotate(target.rotate, true) + utils.translate(target.translate),
    }
  },

  mounted() {
    const parent = this.$refs.root.offsetParent
    console.log(parent)
  },

  data() {
    return {
      impressSupported: true,
      initialRootStyle: '',
      initialCanvasStyle: '',
      stepIndex: 1,
    }
  },
}
