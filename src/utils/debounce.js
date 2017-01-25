/* debounce function calls within delay */
function debounce(fn, delay) {
  let timer = null
  return function debounced(...args) {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default debounce
