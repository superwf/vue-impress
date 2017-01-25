// `computeScale` counts the scale factor between container size and size
// defined for the presentation in the config.
function computeScale(container, config) {
  const hScale = container.height / config.height
  const wScale = container.width / config.width
  return hScale > wScale ? wScale : hScale
}

export default computeScale
