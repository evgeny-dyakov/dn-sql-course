document.addEventListener('keydown', event => {
  if (event.code === 'Enter' && event.ctrlKey) {
    const title = document.querySelector('title')

    switch (title.textContent) {
      case 'login':
        getLoginError()
        break
      case 'signup':
        getSignUpError()
        break
    }

  }
})

function getLoginError() {
  const form = document.querySelector('form')

  form.classList.add('has-danger')
}

function getSignUpError() {
  const fields = document.querySelectorAll('.form-field')
  const checkboxs = document.querySelectorAll('.form-checkbox')

  fields.forEach(field => {
    field.insertAdjacentHTML('beforeend', '<div class="text-help">текст ошибки</div>')
    field.classList.add('has-danger')
  })

  checkboxs.forEach(checkbox => {
    checkbox.insertAdjacentHTML('beforeend', '<div class="text-help">текст ошибки</div>')
    checkbox.classList.add('has-danger')
  })
}
