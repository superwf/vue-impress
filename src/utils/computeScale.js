// `computeWindowScale` counts the scale factor between container size and size
// defined for the presentation in the config.
function computeScale(container, config) {
  const hScale = container.innerHeight / config.height
  const wScale = container.innerWidth / config.width
  let scale = hScale > wScale ? wScale : hScale

  if (config.maxScale && scale > config.maxScale) {
    scale = config.maxScale
  }

  if (config.minScale && scale < config.minScale) {
    scale = config.minScale
  }

  return scale
}


export default computeScale
