class Post {
  constructor(containerElement) {
    this.containerElement = containerElement
    this.templateElement = document.querySelector('#postTemplate')
    this.baseUrl = 'api/posts'

    this.init()
  }

  init() {
    window.addEventListener('post.click', this.handlePostsClick.bind(this))
  }

  // handlePostsClick(event) {
  //   const { id } = event.detail
  //   // const url = `${this.baseUrl}/${id}`

  //   fetch(`http://localhost:8080/api/posts/${id}`)
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const template = this.buildTemplate(data)
  //       this.render(template)
  //     })
  // }

  async handlePostsClick(event) {
    const { id } = event.detail
    // const url = `${this.baseUrl}/${id}`

    const response = await fetch(`http://localhost:8080/api/posts/${id}`)
    const data = await response.json()

    const template = this.buildTemplate(data)

    this.render(template)
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
