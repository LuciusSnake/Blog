import { nanoid } from 'nanoid'
import { Modal } from 'bootstrap'
class Form {
  baseUrl = '/api/posts'
  constructor(formElement) {
    this.formElement = formElement
    this.instanceModal = Modal.getOrCreateInstance(document.querySelector('#formModal'))

    this.init()
  }

  init() {
    this.formElement.addEventListener('submit', this.handleFormSubmit.bind(this))
  }

  handleFormSubmit(event) {
    event.preventDefault()

    const post = {
      id: nanoid(),
      createAt: new Date()
    }
    const formData = new FormData(this.formElement)

    for(const [name, value] of formData) {
      post[name] = value
    }

    this.sendData(post)
    this.instanceModal.hide()
    this.formElement.reset()
  }

  // sendData(post) {
  //   const json = JSON.stringify(post)
  //   fetch("http://localhost:8080/api/posts", {
  //     method: 'POST',
  //     body: json,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     }
  //   })
  //     .then(response => console.log(response))
  //     .then(data => {
  //       const event = new CustomEvent('form.sent', {
  //         detail: { data }
  //       })
  //       window.dispatchEvent(event)
  //     })
  // }

  async sendData(post) {
    const json = JSON.stringify(post)
    const response = await fetch("http://localhost:8080/api/posts", {
      method: 'POST',
      body: json,
      headers: {
        'Content-Type': 'application/json',
      }
    })

    const event = new CustomEvent('form.sent', {
      detail: { data: response }
    })
    window.dispatchEvent(event)
  }


};

export { Form }
