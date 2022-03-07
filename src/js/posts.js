class Posts {
  baseUrl = '/api/posts'
  constructor(containerElement) {
    this.containerElement = containerElement

    this.init()
  }

  init() {
    document.addEventListener('DOMContentLoaded', this.handleDOMReady.bind(this))
    window.addEventListener('form.sent', this.handleDataSent.bind(this))
  }

  handleDOMReady() {
    fetch("http://localhost:8080/api/posts")
      .then(response => response.json())
      .then(data => {
        const { list } = data
        this.render(list)
      })
  }

  handleDataSent({ detail }) {
    const { data } = detail

    this.render(data.list)
  }

  buildTemplate(data) {
    return `
      <div class="island__item" data-id="${data.id}">
        <h4>${data.title}</h4>
        <time class="text-muted">${data.createAt}</time>
      </div>
    `
  }

  render(data) {
    const templates = data.map(item => {
      return this.buildTemplate(item)
    })
     this.containerElement.innerHTML = templates.join('')
  }
}

export { Posts }
