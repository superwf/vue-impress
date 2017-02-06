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
const size = 12
const degreeStep = 360 / size

for (let i = 0; i < size; i += 1) {
  // const rotateX = i * 10
  // const xRadius = (rotateX * Math.PI) / 180
  // const rotateZ = (Math.random() * 720) - 360
  // const zRadius = (rotateZ * Math.PI) / 180
  // const zRadius = (90 * Math.PI) / 180
  // console.log(Math.sin(zRadius))
  const degree = (degreeStep * i * Math.PI) / 180
  steps.push({
    // x: Math.cos(xRadius) * (Math.sin(zRadius) * radius),
    // y: Math.sin(xRadius) * (Math.sin(zRadius) * radius),
    // z: Math.cos(zRadius) * radius,
    // rotateY: rotateZ,
    // rotateX: 90 - rotateX,
    x: Math.cos(degree) * radius,
    y: 0,
    z: Math.sin(degree) * radius,
    rotateY: 90 - (degreeStep * i),
    content: 'center'
  })
}

/* 上扬30度 */
const rotateOrder = ['y', 'x', 'z']
const yUp30 = Math.sin((30 * Math.PI) / 180) * radius
const xRadius30 = Math.cos((30 * Math.PI) / 180) * radius
for (let i = 0; i < size; i += 1) {
  const degree = (degreeStep * i * Math.PI) / 180
  steps.push({
    x: Math.cos(degree) * xRadius30,
    y: -yUp30,
    z: Math.sin(degree) * xRadius30,
    rotateY: 90 - (degreeStep * i),
    rotateX: 30,
    rotateOrder,
    content: 'up30'
  })
}

/* 下30度 */
for (let i = 0; i < size; i += 1) {
  const degree = (degreeStep * i * Math.PI) / 180
  steps.push({
    x: Math.cos(degree) * xRadius30,
    y: yUp30,
    z: Math.sin(degree) * xRadius30,
    rotateY: 90 - (degreeStep * i),
    rotateX: -30,
    rotateOrder,
    content: 'down30'
  })
}

/* 上60度 */
const yUp60 = Math.sin((60 * Math.PI) / 180) * radius
const xRadius60 = Math.cos((60 * Math.PI) / 180) * radius
for (let i = 0; i < size; i += 1) {
  const degree = (degreeStep * i * Math.PI) / 180
  steps.push({
    x: Math.cos(degree) * xRadius60,
    y: -yUp60,
    z: Math.sin(degree) * xRadius60,
    rotateY: 90 - (degreeStep * i),
    rotateX: 60,
    rotateOrder,
    content: 'up'
  })
}

/* 下60度 */
for (let i = 0; i < size; i += 1) {
  const degree = (degreeStep * i * Math.PI) / 180
  steps.push({
    x: Math.cos(degree) * xRadius60,
    y: yUp60,
    z: Math.sin(degree) * xRadius60,
    rotateY: 90 - (degreeStep * i),
    rotateX: -60,
    rotateOrder,
    content: 'down60'
  })
}

/* bottom */
steps.push({
  x: 0,
  y: -radius,
  z: 0,
  rotateX: 90,
  content: 'top'
})
steps.push({
  x: 0,
  y: radius,
  z: 0,
  rotateX: -90,
  content: 'bottom'
})

steps.unshift({
  x: 0,
  content: '',
  scale: 2,
  rotateX: 30,
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
    cursor: pointer;
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
