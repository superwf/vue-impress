import expect, { spyOn, createSpy } from 'expect'
import Vue from 'vue'
import lolex from 'lolex'
import VueImpress from '../../../../src/index'
import Fullscreen from '../../../../example/Fullscreen.vue'
import { pfx, scale, rotate, translate, transitionDuration } from '../../../../src/utils'
import reverseData from '../../../../src/utils/reverseData'
import computeScale from '../../../../src/utils/computeScale'


describe('vue-impress fullscreen mode', () => {
  Vue.use(VueImpress)

  let div
  let instance

  beforeEach(() => {
    div = document.createElement('div')
    const inner = document.createElement('div')
    div.appendChild(inner)
    document.body.appendChild(div)
    instance = new Vue(Fullscreen).$mount(inner)
  })

  afterEach(() => {
    instance.$destroy()
    document.body.removeChild(div)
  })


  it('first step( steps[0] ) is default active', (done) => {
    const steps = document.querySelectorAll('.impress-step')
    Vue.nextTick(() => {
      expect(steps[0].classList.contains('active')).toBe(true)
      done()
    })
  })

  it('viewport instance gotoStep method', (done) => {
    const viewport = instance.$refs.impress
    viewport.gotoStep(2)
    Vue.nextTick(() => {
      expect(typeof viewport.resize).toBe('function')
      const steps = document.querySelectorAll('.impress-step')
      expect(steps[2].classList.contains('active')).toBe(true)

      const viewportStyle = document.querySelector('.impress-viewport').style

      const duration = transitionDuration(instance.config.transitionDuration)
      expect(viewportStyle.transitionDuration).toBe(duration)

      /* in phantomjs is webkitPerspective
       * phantomjs中的还是webkitPerspective */
      const viewportPerspective = viewportStyle[pfx('perspective')]
      const containerScale = viewport.containerScale
      const containerPerspective = viewport.config.perspective / containerScale
      expect(viewportPerspective).toBe(`${containerPerspective}px`)
      const currentData = viewport.stepsData[2]
      const target = reverseData(currentData)

      /* in phantomjs is webkitTransform
       * phantomjs中的还是webkitTransform */
      const viewportTransform = viewportStyle[pfx('transform')]
      expect(viewportTransform).toBe(scale(target.scale * containerScale).trim())

      const canvasStyle = document.querySelector('.impress-canvas').style
      const canvasTransitionDuration = canvasStyle[pfx('transitionDuration')]
      expect(canvasTransitionDuration).toBe(duration)

      const canvasTransform = canvasStyle[pfx('transform')]
      expect(canvasTransform).toBe((rotate(target.rotate, true) +
        translate(target.translate)).trim())

      done()
    })
  })

  it('test events impress:goto', () => {
    const viewport = instance.$refs.impress
    spyOn(viewport, 'gotoStep')
    viewport.$emit('impress:goto', 1)
    expect(viewport.gotoStep).toHaveBeenCalledWith(1)
  })

  it('test events impress:stepenter, impress:stepleave', (done) => {
    const clock = lolex.install()
    const viewport = instance.$refs.impress
    const stepEnterSpy = createSpy()
    const stepLeaveSpy = createSpy()
    viewport.$on('impress:stepenter', stepEnterSpy)
    viewport.$on('impress:stepleave', stepLeaveSpy)
    expect(stepEnterSpy).toNotHaveBeenCalled()
    expect(stepLeaveSpy).toNotHaveBeenCalled()
    viewport.gotoStep(2)
    expect(stepLeaveSpy).toHaveBeenCalledWith(0)
    setTimeout(() => {
      expect(stepEnterSpy).toHaveBeenCalledWith(2)
      clock.uninstall()
      done()
    }, instance.config.transitionDuration)
    clock.tick(instance.config.transitionDuration)
  })

  it('click step to goto that step', () => {
    const viewport = instance.$refs.impress
    const spy = spyOn(viewport, 'gotoStep')
    const e = document.createEvent('HTMLEvents')
    e.initEvent('click', false, true)
    const steps = document.querySelectorAll('.impress-step')
    expect(spy).toNotHaveBeenCalled()
    steps[1].dispatchEvent(e)
    expect(spy).toHaveBeenCalled()
  })

  it('nextStep', () => {
    const viewport = instance.$refs.impress
    expect(viewport.stepIndex).toBe(0)
    viewport.nextStep()
    expect(viewport.stepIndex).toBe(1)

    viewport.gotoStep(viewport.stepsData.length - 1)
    viewport.nextStep()
    expect(viewport.stepIndex).toBe(0)
  })

  it('prevStep', () => {
    const viewport = instance.$refs.impress
    expect(viewport.stepIndex).toBe(0)
    viewport.prevStep()
    expect(viewport.stepIndex).toBe(viewport.stepsData.length - 1)

    viewport.prevStep()
    expect(viewport.stepIndex).toBe(viewport.stepsData.length - 2)
  })

  it('when step active, wrapper should has this step id in classList', (done) => {
    const viewport = instance.$refs.impress
    expect(viewport.stepClass).toBe('firstStep')
    const viewportDom = document.querySelector('.impress-viewport')
    console.log(viewport.$data);
    Vue.nextTick(() => {
      expect(viewportDom.classList.contains(viewport.stepClass)).toBe(true)
      viewport.gotoStep(viewport.$data.stepsData.length - 1)
      Vue.nextTick(() => {
        expect(viewportDom.classList.contains('overview')).toBe(true)
        done()
      })
    })
  })
})

describe('vue-impress none fullscreen mode', () => {
  Vue.use(VueImpress)

  let div
  let instance

  beforeEach(() => {
    div = document.createElement('div')
    div.style.position = 'absolute'
    div.style.width = '800px'
    div.style.height = '400px'

    const inner = document.createElement('div')
    div.appendChild(inner)
    document.body.appendChild(div)
    const data = Fullscreen.data()
    data.config.fullscreen = false
    const NoneFullscreen = Object.assign({}, Fullscreen, {
      data() {
        return data
      },
    })
    instance = new Vue(NoneFullscreen).$mount(inner)
  })

  afterEach(() => {
    instance.$destroy()
    document.body.removeChild(div)
  })


  it('viewport will scale by the container size', (done) => {
    const viewport = instance.$refs.impress
    Vue.nextTick(() => {
      expect(typeof viewport.resize).toBe('undefined')
      const containerScale = computeScale({
        width: div.clientWidth,
        height: div.clientHeight,
      }, viewport.config)
      expect(viewport.containerScale).toEqual(containerScale)
      done()
    })
  })
})

describe('vue-impress slot insert element', () => {
  Vue.use(VueImpress)

  let div
  let instance

  beforeEach(() => {
    div = document.createElement('div')
    const inner = document.createElement('div')
    div.appendChild(inner)
    document.body.appendChild(div)
    instance = new Vue({
      template: '<impress-viewport ref="impress" :steps="steps" :config="config"><a class="a-element"></a></impress-viewport>',
      data() {
        return {
          config: {
            width: 100,
            height: 100
          },
          steps: [{
            x: 0,
            content: 'a',
          }]
        }
      }
    }).$mount(inner)
  })

  afterEach(() => {
    instance.$destroy()
    document.body.removeChild(div)
  })


  it('viewport insert element', (done) => {
    Vue.nextTick(() => {
      const viewport = document.querySelector('.impress-viewport')
      const a = viewport.querySelector('a')
      expect(a.classList.contains('a-element')).toBe(true)
      done()
    })
  })
})
