class Posts {
  baseUrl = '/api/posts'
  constructor(containerElement) {
    this.containerElement = containerElement
    this.activeElement = null

    this.init()
  }

  init() {
    document.addEventListener('DOMContentLoaded', this.handleDOMReady.bind(this))
    window.addEventListener('form.sent', this.handleDataSent.bind(this))
    window.addEventListener('post.remove', this.handlePostRemoved.bind(this))
    this.containerElement.addEventListener('click', this.handleClickListItem.bind(this))
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

  handleClickListItem(event) {
    const listItemElement = event.target.closest('.island__item')

    if(listItemElement) {
      const {id} = listItemElement.dataset

      this.toggleActiveListItem(listItemElement)

      listItemElement.classList.add('island__item_active')
      this.activeElement = listItemElement

      const customEvent = new CustomEvent('post.click', {
        detail: { id }
      })
      window.dispatchEvent(customEvent)
    }
  }

  handlePostRemoved(event) {
    const { data } = event.detail
    this.render(data.list)
  }

  toggleActiveListItem(listItemElement) {
    if(this.activeElement) {
      this.activeElement.classList.remove('island__item_active')
    }
  }

  buildTemplate(data) {
    return `
      <div class="island__item island__item_clickable" data-id="${data.id}">
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
