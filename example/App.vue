<template>
  <div>
    <div class="app1" @click="app1NextStep">
      <viewport ref="app1" :steps="steps" />
    </div>
    <div class="app2" @click="app2NextStep">
      <viewport ref="app2" :steps="steps" />
    </div>
  </div>
</template>

<script>
import Viewport from '../src/components/Viewport'

export default {

  components: {
    Viewport,
  },

  methods: {
    app1NextStep() {
      this.$refs.app1.nextStep()
    },
    app2NextStep() {
      this.$refs.app2.nextStep()
    },
  },

  data() {
    return {
      steps: [{
        id: 'step-1',
        x: -1000,
        y: -1500,
        content: 'first step',
      }, {
        id: 'step-2',
        x: 0,
        y: -1500,
        content: 'step 2',
      }, {
        id: 'step-3',
        x: 850,
        y: 3000,
        scale: 5,
        rotate: 90,
        content: 'step 3',
      }],
    }
  },
}
</script>

<style scoped>
.app1 {
  width: 500px;
  height: 300px;
  border: 1px solid;
  position: absolute;
  overflow: hidden;
  left: 0;
  top: 0;
}

.app2 {
  width: 500px;
  height: 300px;
  border: 1px solid;
  position: absolute;
  overflow: hidden;
  left: 600px;
  top: 0;
}
</style>
