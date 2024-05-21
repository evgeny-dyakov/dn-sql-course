import './header.js'
import './tariffs.js'
import './modal.js'

import {Accordion} from './accordion.js'
import {programAccordionData, faqAccordionData} from './accordion-data.js'

const programTitle = document.querySelector('.program .title--h2')
const faqTitle = document.querySelector('.faq .title--h2')

const programAccordion = new Accordion(programAccordionData)
const faqAccordion = new Accordion(faqAccordionData)

programTitle.after(programAccordion.element)
faqTitle.after(faqAccordion.element)
