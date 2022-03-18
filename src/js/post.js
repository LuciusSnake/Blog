class Post {
  constructor(containerElement) {
    this.containerElement = containerElement
    this.templateElement = document.querySelector('#postTemplate')
    this.baseUrl = 'http://localhost:8080/api/posts'
    this.currentPost = {}
    this.url = ''

    this.init()
  }

  init() {
    window.addEventListener('post.click', this.handlePostsClick.bind(this))
    this.containerElement.addEventListener('click', this.handleClickButtonRemove.bind(this))
    this.containerElement.addEventListener('click', this.handleClickButtonEdit.bind(this))
  }

  handlePostsClick(event) {
    const { id } = event.detail
    const url = `${this.baseUrl}/${id}`
    this.url = url

    fetch(`http://localhost:8080/api/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        this.currentPost = data
        const template = this.buildTemplate(data)
        this.render(template)
      })
  }

  handleClickButtonRemove(event) {
    const { role } = event.target.dataset

    if(role == 'remove') {
      fetch(this.url, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          const customEvent = new CustomEvent('post.remove', {
            detail: { data }
          })
          window.dispatchEvent(customEvent)
          this.containerElement.innerHTML = ''
        })
    }
  }

  handleClickButtonEdit(event) {
    const { role } = event.target.dataset

    if(role == 'edit') {
     const customEvent = new CustomEvent('post.edit', {
       detail: { data: this.currentPost }
     })
     window.dispatchEvent(customEvent)
    }
  }

  buildTemplate(data) {
    let template = this.templateElement.innerHTML

    // template = template
    //   .replaceAll('{{title}}', data.title)
    //   .replaceAll('{{createAt}}', data.createAt)
    //   .replaceAll('{{content}}', data.content)

    for(const key in data) {
      template = template.replaceAll(`{{${key}}}`, data[key])
    }

    return template
  }

  render(html) {
    this.containerElement.innerHTML = html
  }
}

export { Post }
