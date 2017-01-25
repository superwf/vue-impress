<template lang="pug">
  div
    .app1(@click="app1NextStep")
      impress-viewport(ref="app1", :steps="app1Steps", :config="config")
    .app2
      impress-viewport(ref="app2", :steps="app2Steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'

Vue.use(VueImpress)

export default {

  mounted() {
    setInterval(() => {
      this.$refs.app2.nextStep()
    }, 3000)
  },

  methods: {
    app1NextStep(e) {
      if (e) {
        const div = e.currentTarget
        if (div === e.target) {
          if (e.offsetX < div.clientWidth * 0.2) {
            this.$refs.app1.prevStep()
          }
          if (e.offsetX > div.clientWidth * 0.8) {
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
      config: {
        width: 500,
        height: 300,
        transitionDuration: 1000,
        perspective: 1500,
      },
      app1Steps: [{
        x: -1000,
        y: -300,
        content: 'app1 step 1',
      }, {
        x: -500,
        y: -300,
        rotate: 60,
        transitionDuration: 1000,
        content: 'app1 step 2',
      }, {
        x: 0,
        y: -300,
        z: 900,
        scale: 5,
        rotate: 50,
        content: 'app1 step 3',
      }],
      app2Steps: [{
        x: -1000,
        y: -300,
        content: 'app2 step 1',
      }, {
        x: -500,
        y: -300,
        rotate: 60,
        transitionDuration: 1000,
        content: 'app2 step 2',
      }, {
        x: 0,
        y: -300,
        z: 900,
        scale: 5,
        rotate: 50,
        content: 'app2 step 3',
      }],
    }
  },
}
</script>

<style>
  .app1, .app2 {
    width: 500px;
    height: 300px;
    position: absolute;
    overflow: hidden;
    top: 50px;
    border: 1px solid;
  }
  .app1 {
    left: 50px;
  }
  .app2 {
    left: 650px;
  }
  .impress-step {
    width: 200px;
    text-align: center;
  }
</style>
