import {duration, scrollBarWidth} from './util.js'

const askButtons = document.querySelectorAll('.ask-button')
const modalAsk = document.querySelector('.modal-ask')
const form = modalAsk.querySelector('.modal-ask__form')
const modalSent = document.querySelector('.modal-sent')
const overlay = document.querySelector('.modal-overlay')
const loader = document.querySelector('.modal-overlay__loader')
const content = document.querySelector('.content')
const nameField = document.getElementById('name')

window.addEventListener('DOMContentLoaded', addAskButtonsHandlers)

function addAskButtonsHandlers() {
  askButtons.forEach(el => el.addEventListener('click', openModalAsk))
}

function removeAskButtonsHandlers() {
  askButtons.forEach(el => el.removeEventListener('click', openModalAsk))
}

function openModalAsk(event) {
  let timeout = event.target.closest('header') ? duration : 0

  setTimeout(() => {
    show(modalAsk)
    show(overlay)

    removeAskButtonsHandlers()

    addModalCloseHandlers()
    form.addEventListener('submit', validateForm)

    nameField.focus()
    freezeBody()
    content.setAttribute('inert', '')
  }, timeout)
}

function openModalSent() {
  form.removeEventListener('submit', validateForm)
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
    form.removeEventListener('submit', validateForm)
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

// validation

const pristineConfig = {
  classTo: 'form-validation',
  errorClass: 'has-danger',
  successClass: 'has-success',
  errorTextParent: 'form-validation',
  errorTextTag: 'div',
  errorTextClass: 'text-help'
}

const pristine = new Pristine(form, pristineConfig, false)
const telegramNickField = document.getElementById('telegram')

pristine.addValidator(telegramNickField, (value) => {
  const regex = /^@[a-zA-Z0-9_]{5,}$/
  return regex.test(value);
}, 'с @ не менее 5: a-z, 0-9 и _')

function validateForm(evt) {
  evt.preventDefault()

  const valid = pristine.validate()

  if (valid) {
    hide(modalAsk)
    show(loader)

    setTimeout(() => {
      hide(loader)
      openModalSent()
    }, 1500)
  }
}
