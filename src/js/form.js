import { nanoid } from 'nanoid'
class Form {
  baseUrl = '/api/posts'
  constructor(formElement) {
    this.formElement = formElement

    this.init()
  }

  init() {
    console.log(this.formElement);
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
    console.log(post);
    this.sendData()
  }

  sendData(post) {
    fetch("http://localhost:8080/api/posts", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => console.log(response))
  }

  logger() {
    console.log(this.formElement)
  }


};

export { Form }