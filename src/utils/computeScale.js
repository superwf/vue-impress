// `computeWindowScale` counts the scale factor between container size and size
// defined for the presentation in the config.
function computeScale(container, config) {
  const hScale = container.innerHeight / config.height
  const wScale = container.innerWidth / config.width
  return hScale > wScale ? wScale : hScale
}

export default computeScale
