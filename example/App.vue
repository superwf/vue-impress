<template>
  <div>
    <div class="app1" @click="app1NextStep">
      <impress-viewport ref="app1" :steps="steps" />
    </div>
    <!-- <div class="app2" @click="app2NextStep"> -->
    <!--   <impress-viewport ref="app2" :steps="steps" /> -->
    <!-- </div> -->
  </div>
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'
import { getOffset } from './utils'

Vue.use(VueImpress)

export default {

  // mounted() {
  //   setInterval(() => {
  //     this.$refs.app1.nextStep()
  //   }, 2000)
  // },

  methods: {
    app1NextStep(e) {
      if (e) {
        const div = e.currentTarget
        if (div) {
          const offset = getOffset(div)
          if (e.clientX < offset.left + (div.clientWidth * 0.2)) {
            this.$refs.app1.prevStep()
          }
          if (e.clientX > offset.left + (div.clientWidth * 0.8)) {
            this.$refs.app1.nextStep()
          }
        }
      }
    },
    // app2NextStep() {
    //   this.$refs.app2.nextStep()
    // },
  },

  data() {
    return {
      width: 500,
      height: 300,
      steps: [{
        x: -1000,
        y: -300,
        content: 'first step',
      }, {
        x: -500,
        y: -300,
        rotate: 60,
        content: 'step 2',
      }, {
        x: 0,
        y: -300,
        scale: 5,
        rotate: 90,
        content: 'step 3',
      }, {
        x: 1500,
        y: 600,
        scale: 10,
        content: 'overview',
      }],
    }
  },
}
</script>

<style scoped>
  .app1, .app2 {
    width: 500px;
    height: 300px;
    border: 1px solid;
    position: absolute;
    overflow: hidden;
  }
  .app1 {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }

  .app2 {
    left: 600px;
  }
</style>
