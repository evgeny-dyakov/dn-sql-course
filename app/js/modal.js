import {duration} from './util.js'

const askButtons = document.querySelectorAll('.ask-button')
const modalAsk = document.querySelector('.modal-ask')
const modalAskForm = modalAsk.querySelector('.modal-ask__form')
const modalSent = document.querySelector('.modal-sent')
const overlay = document.querySelector('.modal-overlay')

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
  modalAskForm.addEventListener('submit', openModalSent)
}

function openModalSent(event) {
  event.preventDefault()

  hide(modalAsk)
  modalAskForm.removeEventListener('submit', openModalSent)

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
    modalAskForm.removeEventListener('submit', openModalSent)
  }
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
