const tabletWidth = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--tablet'))
const duration = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--t-duration'))

function debounce(func, ms = 250) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

export {tabletWidth, duration, debounce}
