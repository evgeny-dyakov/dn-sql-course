const tabletWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tablet'))
const duration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--t-duration'))


function debounce(func, ms = 250) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

window.addEventListener('resize', getScrollBarWidth)
window.addEventListener('DOMContentLoaded', getScrollBarWidth)

let scrollBarWidth

function getScrollBarWidth() {
  const widthWithScrollBar = document.documentElement.clientWidth
  const widthWithoutScrollBar = window.innerWidth

  scrollBarWidth = widthWithoutScrollBar - widthWithScrollBar
}


export {tabletWidth, duration, debounce, scrollBarWidth}
