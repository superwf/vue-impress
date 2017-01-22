import toNumber from './toNumber'

/* when receive steps from vue props
 * init the steps data for computing
 * transform empty number to default
 * */

const initStepData = data => ({
  translate: {
    x: toNumber(data.x),
    y: toNumber(data.y),
    z: toNumber(data.z),
  },
  rotate: {
    x: toNumber(data.rotateX),
    y: toNumber(data.rotateY),
    z: toNumber(data.rotateZ || data.rotate),
  },
  scale: toNumber(data.scale, 1),
})

export default initStepData
