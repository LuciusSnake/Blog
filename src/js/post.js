class Post {
  constructor(containerElement) {
    this.containerElement = containerElement
    this.templateElement = document.querySelector('#postTemplate')

    this.init()
  }

  init() {
    this.buildTemplate()
  }

  buildTemplate(data) {
    const template = this.templateElement.innerHTML

    // template = template
    //   .replaceAll('{{title}}', data.title)
    //   .replaceAll('{{createAt}}', data.createAt)
    //   .replaceAll('{{content}}', data.content)

    for(const key of data) {
      template = template.replaceAll(`{{${key}}}`, data[key])
    }

    return template
  }
}

export { Post }
