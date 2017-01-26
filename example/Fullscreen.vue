<template lang="pug">
  .app(tabindex="1", ref="app", @keyup.right.space="impressNextStep", @keyup.left="impressPrevStep")
    impress-viewport(ref="impress", :steps="steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from '../src'
// import VueImpress from '../dist/vue-impress'
import CustomCom from './CustomCom.vue'

// require('../dist/vue-impress.css')

Vue.use(VueImpress)

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
    },
  },

  mounted() {
    this.$refs.app.focus()
  },

  data() {
    return {
      config: {
        width: 1000,
        height: 600,
        transitionDuration: 1200,
        perspective: 800,

        /* in fullscreen, only first viewport instance work, others are meaningless
         * 若全屏模式，则只有第一个viewport的实例可以正常工作，大概...
         * 全屏的话，第一个实例会占满窗口，就像impress.js的例子一样，他实例也没有意义 */
        // fullscreen: true,
      },
      steps: [{
        x: 500,
        y: 0,
        /* text content
        * 可以传入普通文本
        */
        content: 'Hint: press space, right key to next step, left to prev step',
      }, {
        x: 0,
        y: -300,
        scale: 2,
        /* content could be vue component
        * 可以传入vue组件
        */
        content: CustomCom,
        transitionDuration: 1000,
      }, {
        x: 1500,
        y: -300,
        z: 200,
        rotate: 90,
        scale: 3,
        /* content could be vue instance
        * 可以传入vue实例
        */
        content: new Vue({
          propsData: {
            myname: 'abc',
          },
          ...CustomCom,
        }),
      }, {
        x: 1500,
        y: -300,
        z: 200,
        rotateX: 90,
        scale: 3,
        content: 'X axis rotate',
      }, {
        x: 0,
        y: 0,
        rotate: 3600,
        content: 'rotate step',
      }, {
        x: 0,
        y: 1000,
        z: 900,
        scale: 5,
        content: 'overview',
      }],
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
    width: 500px;
    border: solid 1px;
    text-align: center;
    cursor: pointer;
  }
  .impress-step.active {
    cursor: auto;
  }
</style>
