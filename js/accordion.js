import {tabletWidth, duration, debounce} from './util.js'

let counter = 0

class Accordion {
  constructor(data) {
    this.element = this.createAccordion(data)
  }

  createAccordion(data) {
    const active = 'accordion__question--active'
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

      window.addEventListener('DOMContentLoaded', DOMContentLoadedHandler)
      window.addEventListener('resize', debounce(onAccordionResize))
      accordion.addEventListener('click', onQuestionClick)

      function DOMContentLoadedHandler() {
        if (window.innerWidth <= tabletWidth) {
          screen = 'mobile'
          setHeight()
        }
      }

      function onQuestionClick(event) {
        const question = event.target.closest('.accordion__question')

        if (!question) return

        let current
        let target

        for (let i = 0; i < questions.length; i++) {
          if (questions[i].classList.contains(active)) {
            current = i
          }

          if (questions[i] === question) {
            target = i
          }
        }

        if (screen === 'desktop') {
          if (!question.classList.contains(active)) {
            questions[current].classList.remove(active)
            questions[target].classList.add(active)
          }
        }

        if (screen === 'mobile') {
          if (question.classList.contains(active)) {
            question.classList.remove(active)
            answers[target].style.height = `${inners[target].offsetHeight}px`
            setTimeout(() => answers[target].style.height = '0px')
          } else {
            question.disabled = true
            question.classList.add(active)
            answers[target].style.height = `${inners[target].offsetHeight}px`
            setTimeout(() => {
              answers[target].removeAttribute('style')
              question.disabled = false
            }, duration)
          }
        }
      }

      function onAccordionResize() {
        if (window.innerWidth <= tabletWidth && screen === 'desktop') {
          screen = 'mobile'
          setHeight()
        }

        if (window.innerWidth > tabletWidth && screen === 'mobile') {
          screen = 'desktop'
          answers.forEach(answer => answer.removeAttribute('style'))

          questions[0].classList = `accordion__question ${active}`
          for (let i = 1; i < questions.length; i++) {
            questions[i].classList = 'accordion__question'
          }
        }
      }

      function setHeight () {
        for (let i = 0; i < questions.length; i++) {
          if (questions[i].classList.contains(active)) {
            continue
          }
          answers[i].style.height = '0px'
        }
      }
    }

    function setActive() {
      const firstQuestion = accordion.querySelector('.accordion__question')
      firstQuestion.classList.add(active)
    }

    function setGradient() {
      if (counter % 2) {
        accordion.classList.add('accordion--right-gradient')
      }
      counter++
    }

    function createElement(tagName, className) {
      const element = document.createElement(tagName)
      if (className) {
        element.className = className
      }
      return element
    }

    return accordion
  }
}

export {Accordion}
