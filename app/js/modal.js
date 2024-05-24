import {duration, scrollBarWidth} from './util.js'

const askButtons = document.querySelectorAll('.ask-button')
const modalAsk = document.querySelector('.modal-ask')
const form = modalAsk.querySelector('.modal-ask__form')
const modalSent = document.querySelector('.modal-sent')
const overlay = document.querySelector('.modal-overlay')
const content = document.querySelector('.content')
const nameField = document.getElementById('name')

window.addEventListener('DOMContentLoaded', addAskButtonsHandlers)

function addAskButtonsHandlers() {
  askButtons.forEach(el => el.addEventListener('click', openModalAsk))
}

function removeAskButtonsHandlers() {
  askButtons.forEach(el => el.removeEventListener('click', openModalAsk))
}

function openModalAsk() {
  show(modalAsk)
  show(overlay)

  removeAskButtonsHandlers()

  addModalCloseHandlers()
  form.addEventListener('submit', openModalSent)

  nameField.focus()
  freezeBody()
  content.setAttribute('inert', '')
}

function openModalSent(event) {
  event.preventDefault()

  hide(modalAsk)
  form.removeEventListener('submit', openModalSent)
  setTimeout(() => form.reset(), duration)

  show(modalSent)
}

function addModalCloseHandlers() {
  window.addEventListener('click', closeModal)
  window.addEventListener('keydown', closeModal)
}

function removeModalCloseHandlers() {
  window.removeEventListener('click', closeModal)
  window.removeEventListener('keydown', closeModal)
}

function closeModal(event) {
  let modal = modalAsk

  if (modalAsk.classList.contains('modal-ask--none')) {
    modal = modalSent
  }

  const baseClass = modal.classList[0]

  if (event.type === 'click') {
    const close = event.target.closest(`.${baseClass}__close`)
    const overlay = event.target.closest('.modal-overlay')

    if (!close && !overlay) return
  }

  if (event.type === 'keydown') {
    const isEscape = (event.code === 'Escape')

    if (!isEscape) return
  }

  hide(modal)
  hide(overlay)

  addAskButtonsHandlers()
  removeModalCloseHandlers()

  if (modal === modalAsk) {
    form.removeEventListener('submit', openModalSent)
  }

  unfreezeBody()
  content.removeAttribute('inert')
}

function show(el) {
  const baseClass = el.classList[0]

  el.classList.toggle(`${baseClass}--none`)
  setTimeout(() => el.classList.toggle(`${baseClass}--transparent`))
}

function hide(el) {
  const baseClass = el.classList[0]

  el.classList.toggle(`${baseClass}--transparent`)
  setTimeout(() => el.classList.toggle(`${baseClass}--none`), duration)
}

function freezeBody() {
  document.body.classList.add('body--no-scroll')
  document.body.style = `padding-right: ${scrollBarWidth}px`
}

function unfreezeBody() {
  setTimeout(() => {
    document.body.classList.remove('body--no-scroll')
    document.body.removeAttribute('style')
  }, duration)
}
