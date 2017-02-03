<template lang="pug">
  .app(tabindex="1", ref="app", @keyup.right.space="impressNextStep", @keyup.left="impressPrevStep")
    impress-viewport(ref="impress", :steps="steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'

Vue.use(VueImpress)

const steps = []
const radius = 500

// const initDegree = 0
// const zStep = 15
// const degreeStep = 10

for (let i = 0; i < 36; i += 1) {
  const rotateX = i * 10
  const xRadius = (rotateX * Math.PI) / 180
  // const rotateZ = (Math.random() * 720) - 360
  // const zRadius = (rotateZ * Math.PI) / 180
  const zRadius = (90 * Math.PI) / 180
  // console.log(Math.sin(zRadius))
  steps.push({
    // x: Math.cos(xRadius) * (Math.sin(zRadius) * radius),
    // y: Math.sin(xRadius) * (Math.sin(zRadius) * radius),
    // z: Math.cos(zRadius) * radius,
    // rotateY: rotateZ,
    // rotateX: 90 - rotateX,
    x: Math.cos(xRadius) * (Math.sin(zRadius) * radius),
    y: Math.sin(xRadius) * (Math.sin(zRadius) * radius),
    rotateY: 90,
    // rotateY: 0,
    rotateZ: rotateX,
    content: 'x'
  })
}
steps.unshift({
  x: 0,
  z: 100,
  content: '',
  scale: 1.2,
})

export default {

  methods: {
    impressPrevStep() {
      this.$refs.impress.prevStep()
    },
    impressNextStep() {
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
    width: 50px;
    cursor: pointer;
    border: solid 1px;
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
