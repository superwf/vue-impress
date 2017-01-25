import expect, { spyOn, createSpy } from 'expect'
import Vue from 'vue'
import VueImpress from '../../../../src/index'
import App from '../../../../example/App.vue'
import { pfx, scale, rotate, translate, transitionDuration } from '../../../../src/utils'
import reverseData from '../../../../src/utils/reverseData'
import computeScale from '../../../../src/utils/computeScale'


describe('vue-impress', () => {
  Vue.use(VueImpress)

  let div
  let instance

  beforeEach(() => {
    div = document.createElement('div')
    const inner = document.createElement('div')
    div.appendChild(inner)
    document.body.appendChild(div)
    instance = new Vue(App).$mount(inner)
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
    const viewport = instance.$refs.app
    viewport.gotoStep(2)
    Vue.nextTick(() => {
      const steps = document.querySelectorAll('.impress-step')
      expect(steps[2].classList.contains('active')).toBe(true)

      const viewportStyle = document.querySelector('.impress-viewport').style

      const duration = transitionDuration(instance.config.transitionDuration)
      expect(viewportStyle.transitionDuration).toBe(duration)

      /* in phantomjs is webkitPerspective
       * phantomjs中的还是webkitPerspective */
      const viewportPerspective = viewportStyle[pfx('perspective')]
      const containerScale = computeScale(window, viewport.config)
      const containerPerspective = viewport.config.perspective / containerScale
      expect(viewportPerspective).toBe(`${containerPerspective}px`)
      const currentData = instance.$refs.app.stepsData[2]
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
    const viewport = instance.$refs.app
    spyOn(viewport, 'gotoStep')
    viewport.$emit('impress:goto', 1)
    expect(viewport.gotoStep).toHaveBeenCalledWith(1)
  })

  it('test events impress:stepenter, impress:stepleave', (done) => {
    const viewport = instance.$refs.app
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
      done()
    }, instance.config.transitionDuration)
  })
})
