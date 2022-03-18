import { nanoid } from 'nanoid'
import { Modal } from 'bootstrap'
import { resetForm } from './helpers'
class Form {
  baseUrl = '/api/posts'
  constructor(formElement) {
    this.formElement = formElement
    this.buttonCreatePostModal = document.querySelector('#buttonCreatePost')
    this.instanceModal = Modal.getOrCreateInstance(document.querySelector('#formModal'))

    this.init()
  }

  init() {
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this))
    this.buttonCreatePostModal.addEventListener('click', this.handleClickButtonCreatePost.bind(this))
    window.addEventListener('post.edit', this.handlePostEdit.bind(this))
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const post = {
      id: nanoid(),
      createAt: new Date()
    }
    const formData = new FormData(this.formElement)

    for(const [name, value] of formData) {
      if(value) {
        post[name] = value
      }
    }

    this.sendData(post)
    this.instanceModal.hide()
    resetForm(this.formElement)
  }

  handleClickButtonCreatePost() {
    resetForm(this.formElement)
    this.instanceModal.show()
    this.formElement.setAttribute('data-method', 'POST')
  }

  handlePostEdit(event) {
    resetForm(this.formElement)
    this.instanceModal.show()
    this.formElement.setAttribute('data-method', 'PUT')
    const { data } = event.detail

    for(let key in data) {
      this.formElement.querySelector(`[name="${key}"]`).value = data[key]
    }
  }

//   sendData(post) {
//     const json = JSON.stringify(post)
//     const { method } = this.formElement.dataset
//     let url = this.baseUrl

//     if(method == 'PUT') {
//       url = `${url}/${post.id}`
//     }

//     fetch(`http://localhost:8080${url}`, {
//       method,
//       body: json,
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     })
//       .then(response => response.json())
//       .then(data => {
//         const event = new CustomEvent('form.sent', {
//           detail: { data }
//         })
//         window.dispatchEvent(event)

//         resetForm(this.formElement)
//       })
//   }
// }

async sendData(post) {
  const json = JSON.stringify(post)
  const { method } = this.formElement.dataset
  let url = this.baseUrl

  if(method == 'PUT') {
    url = `${url}/${post.id}`
  }

  const response = await fetch(`http://localhost:8080${url}`, {
    method,
    body: json,
    headers: {
      'Content-Type': 'application/json',
    }
  })
  const data = await response.json()
  const event = new CustomEvent('form.sent', {
    detail: { data }
  })
  window.dispatchEvent(event)

  resetForm(this.formElement)
}
}

export { Form }
