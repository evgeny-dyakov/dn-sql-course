import {tabletWidth, duration, debounce} from './util.js'

let counter = 0

class Accordion {
  constructor(data) {
    this.element = this.createAccordion(data)
  }

  createAccordion(data) {
    const accordion = createElement('div', 'accordion')
    accordion.classList.add(`accordion--${data.length}`)

    data.forEach(el => {
      const item = createElement('div', 'accordion__item')

      const question = createElement('button', 'accordion__question')
      question.textContent = el.question

      const answer = createElement('div', 'accordion__answer')
      const answerInner = createElement('div', 'accordion__answer-inner')
      const answerTitle = createElement('p', 'accordion__answer-title title title--h3')
      answerTitle.textContent = el.title

      const imgWrapper = createElement('div', 'accordion__answer-img')
      const img = createElement('img')
      img.src = el.img
      img.alt = el.alt
      img.loading = 'lazy'
      imgWrapper.append(img)

      const answerText = createElement('div', 'accordion__answer-text')
      el.text.forEach(el => {
        const paragraph = createElement('p', 'accordion__answer-paragraph main-text')
        paragraph.textContent = el
        answerText.append(paragraph)
      })

      answerInner.append(answerTitle)
      answerInner.append(imgWrapper)
      answerInner.append(answerText)

      answer.append(answerInner)

      item.append(question)
      item.append(answer)

      accordion.append(item)
    })

    setActive()
    setGradient()
    setEventListeners()

    function setEventListeners() {
      const questions = accordion.querySelectorAll('.accordion__question')
      const answers = accordion.querySelectorAll('.accordion__answer')
      const inners = accordion.querySelectorAll('.accordion__answer-inner')

      let screen = 'desktop'

      window.addEventListener('DOMContentLoaded', () => {
        if (window.innerWidth <= tabletWidth) {
          screen = 'mobile'
          setHeight()
        }
      })

      accordion.addEventListener('click', event => {
        const question = event.target.closest('.accordion__question')

        if (!question) return

        if (!question.classList.contains('accordion__question--active')) {
          let current
          let target

          for (let i = 0; i < questions.length; i++) {
            if (questions[i].classList.contains('accordion__question--active')) {
              current = i
            }

            if (questions[i] === question) {
              target = i
            }
          }

          questions[current].classList.remove('accordion__question--active')
          questions[current].disabled = false

          questions[target].classList.add('accordion__question--active')
          questions[target].disabled = true

          if (window.innerWidth <= tabletWidth) {
            answers[current].style.height = `${inners[current].offsetHeight}px`
            setTimeout(() => answers[current].style.height = '0px')

            answers[target].style.height = `${inners[target].offsetHeight}px`
            setTimeout(() => answers[target].removeAttribute('style'), duration)
          }
        }
      })

      window.addEventListener('resize', debounce(onAccordionResize))

      function onAccordionResize() {
        if (window.innerWidth <= tabletWidth && screen === 'desktop') {
          screen = 'mobile'
          setHeight()
        }

        if (window.innerWidth > tabletWidth && screen === 'mobile') {
          screen = 'desktop'
          answers.forEach(answer => answer.removeAttribute('style'))
        }
      }

      function setHeight () {
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].classList.contains('accordion__question--active')) {
            continue
          }
          answers[i].style.height = '0px'
        }
      }
    }

    function createElement(tagName, className) {
      const element = document.createElement(tagName)
      if (className) {
        element.className = className
      }
      return element
    }

    function setActive() {
      const firstQuestion = accordion.querySelector('.accordion__question')
      firstQuestion.classList.add('accordion__question--active')
      firstQuestion.disabled = true
    }

    function setGradient() {
      if (counter % 2) {
        accordion.classList.add('accordion--right-gradient')
      }
      counter++
    }

    return accordion
  }
}

export {Accordion}
