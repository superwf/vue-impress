# vue-impress

* * *

Inspired by [impress.js](https://github.com/impress/impress.js), thanks for it so much.

At the end of impress.js, the words *use the source, Luke!* really encouraged me! Thanks *star wars* too. I read the source with the power and made this vue component.

## [demo](http://superwf.github.io/vue-impress-demo.html)

## install

```
npm install vue-impress
```

## usage

Define a Vue component file, then mount it.
Do not forget the css file.
```javascript

<template lang="pug">
  .app(tabindex="1", ref="app", @keyup.right.space="impressNextStep", @keyup.left="impressPrevStep")
    impress-viewport(ref="impress", :steps="steps", :config="config")
</template>

<script>
import Vue from 'vue'
import VueImpress from 'vue-impress'
import 'vue-impress/dist/vue-impress.css'

Vue.use(VueImpress)
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
        width: 1000, // required
        height: 600, // required
        transitionDuration: 1200, default 1000
        perspective: 800, // default 1000

        /* in fullscreen, only first viewport instance work, others are meaningless
         * 若全屏模式，则只有第一个viewport的实例可以正常工作，大概...
         * 全屏的话，第一个实例会占满窗口，就像impress.js的例子一样，他实例也没有意义 */
        fullscreen: true, // default true
      },
      steps: [{
        x: 500,
        y: 0,
        /* string content
        * 可以传入普通文本
        */
        content: 'Hint: press space, right key to next step, left to prev step',
        id: 'firstStep'
      }, {
        x: 0,
        y: -300,
        scale: 2,
        /* content could be vue component
        * 可以传入vue组件
        */
        component: CustomCom,
        /* props is optional
        * props按需传，没有可不写
        */
        props: {
          myname: 'abc',
        },
        transitionDuration: 1000,
        // transitionTimingFunction: 'linear', // default 'ease'
      }, {
        x: 1000,
        y: -200,
        z: 200,
        rotateX: 80,
        scale: 3,
        content: 'X axis rotate',
        id: 'xRotateStep',
      }, {
        x: 0,
        y: 0,
        rotate: 720,
        content: 'z rotate step',
        id: 'zRotateStep',
      }, {
        x: 0,
        y: 1000,
        z: 900,
        scale: 5,
        content: 'overview',
        id: 'overview',
      }],
    }
  },
}
</script>

<style>
  body {
    overflow: hidden;
    height: 100%;
  }
  .app {
    width: 100%;
    height: 100%;
    position: absolute;
    overflow: hidden;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
  }
  .impress-step {
    width: 500px;
    border: solid 1px;
    text-align: center;
    cursor: pointer;
  }
  .impress-viewport.overview .impress-step:not(.active) {
    opacity: 0;
  }
  .impress-step.active {
    cursor: auto;
  }
</style>

```

## API

### vue component

only one component `impress-viewport`

normally impress-viewport has no child
but it can contain other component
Check the [ball example](https://github.com/superwf/vue-impress/blob/master/example/Ball.vue)

### Props

| name | type |
| ---- | ---- |
| config | Object |
| steps | [Object] |

#### the `config` prop

| key | type | description |
| --- | ---- | ---- |
| width | Number | required, use for compute scale ratio |
| height | Number | required, use for compute scale ratio|
| transitionDuration | Number | optional, default 1000, unit ms, duration time between step animation |
| transitionTimingFunction | String | optional, default 'ease', css3 transition-timing-function used when change step |
| perspective | Number | optional, default 1000, the distance to generate 3d style |
| fullscreen | Boolean | optional, default true |

When `fullscreen` is true, it means that there should be only one instance in current page. vue-impress will use config width and height and window innerWidth, innerHeight to compute scale.
When `fullscreen` is false, the vue-impress parent element should has has a absolute or relative position, and has a explicit width and height


#### the object in `steps` array prop

| key | type | description |
| --- | ---- | ---- |
| x | Number | optional, default 0, translate x position |
| y | Number | optional, default 0, translate y position |
| z | Number | optional, default 0, translate z position |
| rotateX | Number | optional, default 0, rotate deg by x axis |
| rotateY | Number | optional, default 0, rotate deg by y axis |
| rotateZ | Number | optional, default 0, rotate deg by z axis |
| rotate | Number | optional, default 0, the same as rotateZ |
| rotateOrder | [String] | optional, default ['x', 'y', 'z'] the rotate order, it matters when rotate more than one direction |
| scale | Number | default 1 |
| transitionDuration | Number | optional, unit ms, if this exists in step, it will overwrite `transitionDuration` in config prop, just for this step |
| transitionTimingFunction | String |  optional, default use the property in config, you can define it in each step |
| content | String | optional, string content to show |
| component | Object | optional, your custom component, when component exists, content is needless |
| props | Object | optional, the props your component will use |
| id | String | optional, step identity, when step is active, the outer wrapper will add this id to classList. if not provided, `step-${stepIndex}` will be used. it is useful when some step is active and need a special css. For example .impress-viewport.step-0, or .impress-viewport.overview |

### Events

| name | description |
| --- | ---- |
| `impress:stepenter` | triggered when the step is in active, with param step index |
| `impress:stepleave` | triggered when step leave active, with param step index |

### instance methods

| name | param| description |
| --- | ---- | ---- |
| gotoStep | index | when the step is in active |
| nextStep | | goto next step, same as gotoStep( index + 1 ), goto first step when current is last step |
| prevStep | | goto prev step, same as gotoStep( index - 1 ), goto last step when current is first step |

## element class, used for css style

| name | description |
| --- | --- |
| impress-viewport | first wrapper, for 3d perspective |
| impress-canvas | second wrapper, fly to active step when step changes |
| impress-step | each step class, the default font-size is 30px, you can overwrite it by your css |


Check the [example](https://github.com/superwf/vue-impress/blob/master/example/Fullscreen.vue) and read the comment there

```
git clone git@github.com:superwf/vue-impress.git

cd vue-impress

yarn install

npm run dev
```

fullscreen example http://127.0.0.1:8080
multiple instance http://127.0.0.1:8080/multiple.html
dna instance http://127.0.0.1:8080/dna.html
ball instance http://127.0.0.1:8080/ball.html
