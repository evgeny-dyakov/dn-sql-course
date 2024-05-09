import {tabletWidth, duration, debounce} from './util.js'

const header = document.querySelector('.header')
const logo = header.querySelector('.logo')
const menu = header.querySelector('.header__menu')
const nav = header.querySelector('.header__navigation')
const burger = header.querySelector('.header__burger')
const overlay = header.querySelector('.header__overlay')

const isTablet = () => window.innerWidth <= tabletWidth

burger.addEventListener('click', onBurgerClick)

logo.addEventListener('click', onLogoClick)
nav.addEventListener('click', onNavClick)

window.addEventListener('click', onOverlayClick)
window.addEventListener('resize', debounce(onHeaderResize))

function onLogoClick() {
  if (isTablet() && menu.classList.contains('header__menu--open')) closeMenu()
}

function onNavClick(event) {
  if (isTablet() && event.target.closest('.header__navigation-link')) closeMenu()
}

function onBurgerClick() {
  menu.classList.contains('header__menu--open') ? closeMenu() : openMenu()
}

function openMenu() {
  animateBurger()
  showMenu()
  showOverlay()
  toggleBodyScroll()
}

function closeMenu() {
  animateBurger()
  hideMenu()
  hideOverlay()
  toggleBodyScroll()
}

function showMenu() {
  menu.classList.toggle('header__menu--block')
  setTimeout(() => menu.classList.toggle('header__menu--open'))
}

function hideMenu() {
  menu.classList.toggle('header__menu--open')
  setTimeout(() => menu.classList.toggle('header__menu--block'), duration)
}

function showOverlay() {
  overlay.classList.toggle('header__overlay--none')
  setTimeout(() => overlay.classList.toggle('header__overlay--transparent'))
}

function hideOverlay() {
  overlay.classList.toggle('header__overlay--transparent')
  setTimeout(() => overlay.classList.toggle('header__overlay--none'), duration)
}

function animateBurger() {
  const isBurgerCross = burger.classList.contains('header__burger--cross')
  const isBurgerLines = burger.classList.contains('header__burger--lines')

  if (!isBurgerCross && !isBurgerLines) {
    burger.classList.add('header__burger--cross')
  }

  if (isBurgerCross) {
    burger.classList.remove('header__burger--cross')
    burger.classList.add('header__burger--lines')
  }

  if (isBurgerLines) {
    burger.classList.remove('header__burger--lines')
    burger.classList.add('header__burger--cross')
  }
}

function toggleBodyScroll() {
  document.body.classList.toggle('body--no-scroll')
}

function onOverlayClick(event) {
  if (event.target === overlay) closeMenu()
}

function onHeaderResize() {
  if (!isTablet() && menu.classList.contains('header__menu--open')) closeMenu()
}
