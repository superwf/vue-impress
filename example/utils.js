function getOffset(element) {
  let actualTop = element.offsetTop
  let actualLeft = element.offsetLeft
  let current = element.offsetParent
  while (current !== null) {
    actualTop += current.offsetTop
    actualLeft += current.offsetLeft
    current = current.offsetParent
  }
  const elementScrollTop = document.documentElement.scrollTop
  const elementScrollLeft = document.documentElement.scrollLeft

  return {
    top: actualTop - elementScrollTop,
    left: actualLeft - elementScrollLeft,
  }
}

export { getOffset }
