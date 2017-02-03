<template lang="pug">
  .app(tabindex="1", ref="app", @keyup.right.space="impressNextStep", @keyup.left="impressPrevStep")
    impress-viewport(ref="impress", :steps="steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'
import CustomCom from './CustomCom.vue'


Vue.use(VueImpress)

const steps = []
const radius = 100

let initDegree = 0
const zStep = 15
const degreeStep = 10

for (let i = 0; i < 100; i += 1) {
  if (i % 2 === 0) {
    steps.push({
      rotateX: 45,
      x: Math.sin((initDegree * Math.PI) / 180) * radius,
      y: Math.cos((initDegree * Math.PI) / 180) * radius,
      z: i * zStep,
      content: 'x'
    })
  } else {
    steps.push({
      rotateX: 45,
      x: -Math.sin((initDegree * Math.PI) / 180) * radius,
      y: -Math.cos((initDegree * Math.PI) / 180) * radius,
      z: (i - 1) * zStep,
      content: 'y'
    })
  }

  initDegree += degreeStep
}
steps.unshift({
  x: 0,
  z: 800,
  content: '',
  rotateX: 90,
  rotateZ: -60,
})

export default {

  components: {
    CustomCom,
  },

  methods: {
    impressPrevStep() {
      this.$refs.impress.prevStep()
    },
    impressNextStep() {
      this.$refs.impress.nextStep()
      this.$refs.impress.nextStep()
    },
  },

  mounted() {
    this.$refs.app.focus()
  },

  data() {
    return {
      config: {
        width: 800,
        height: 800,
      },
      steps,
    }
  },
}
</script>

<style>
  html, body {
    overflow: hidden;
    height: 100%;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
  .impress-step {
    text-align: center;
    cursor: pointer;
    border-radius: 50%;
  }
  .impress-step.active {
    cursor: auto;
  }
  .impress-step:nth-of-type(even) {
    color: red;
  }
  .impress-step:nth-of-type(odd) {
    color: blue;
  }
</style>
