<template lang="pug">
  .app(@click="appNextStep")
    impress-viewport(ref="app", :steps="steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'
import Com from './Com.vue'

Vue.use(VueImpress)

export default {

  // mounted() {
  //   setInterval(() => {
  //     this.$refs.app.nextStep()
  //   }, 3000)
  // },

  components: {
    Com,
  },

  methods: {
    appNextStep(e) {
      if (e) {
        const div = e.currentTarget
        if (div === e.target) {
          if (e.offsetX < div.clientWidth * 0.2) {
            this.$refs.app.prevStep()
          }
          if (e.offsetX > div.clientWidth * 0.8) {
            this.$refs.app.nextStep()
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
      config: {
        width: 500,
        height: 300,
        transitionDuration: 1200,
        perspective: 800,
        fullscreen: true,
      },
      steps: [{
        x: -1000,
        y: -300,
        /* content could be vue instance
        * 可以传入vue实例
        */
        content: new Vue({
          propsData: {
            myname: 'abc',
          },
          ...Com,
        }),
      }, {
        x: -500,
        y: -300,
        rotate: 60,
        /* content could be vue component
        * 可以传入vue组件
        */
        content: Com,
        transitionDuration: 1000,
      }, {
        x: 0,
        y: -300,
        z: 900,
        scale: 5,
        rotate: 50,
        /* text content
        * 可以传入普通文本
        */
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
  .app {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
