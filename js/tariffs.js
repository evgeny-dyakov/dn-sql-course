import {debounce} from './util.js'

const fixClass = 'tariffs__advantages-item--fix'

setMargins()

window.addEventListener('resize', debounce(setMargins))

function setMargins() {
  const lists = getLists()

  lists.forEach(list => {
    const lh = getLineHeight(list[0])

    let previous
    let current

    for (let i = 0; i < list.length; i++) {
      previous = current

      current = getLines(list[i], lh)

      const hasFix = list[i].classList.contains(fixClass)

      if (previous < 2 && current > 1) {
        list[i - 1].classList.add(fixClass)
      }

      if (i === list.length - 1) break

      if (current > 1 && !hasFix) {
        list[i].classList.add(fixClass)
      }

      if (current < 2 && hasFix) {
        list[i].classList.remove(fixClass)
      }
    }
  })
}

function getLists() {
  const result = []

  const ulLists = document.querySelectorAll('.tariffs__advantages-list')

  ulLists.forEach(el => {
    result.push(el.querySelectorAll('.tariffs__advantages-item'))
  })

  return result
}

function getLineHeight(el) {
  let lh = getComputedStyle(el).lineHeight

  if (lh === 'normal') {
    const fs = getComputedStyle(el).fontSize
    lh = parseInt(fs) / 0.8
  } else {
    lh = parseInt(lh)
  }

  return Math.round(lh)
}

function getLines(el, lh) {
  const height = el.offsetHeight

  return Math.round(height / lh)
}
