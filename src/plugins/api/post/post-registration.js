export class PostRegistration {
  url = `/api/register/`

  constructor(data) {
    this.__data = data
  }

  getUrl() {
    return this.url
  }

  release(network) {
    return network.post(this.getUrl(), this.__data)
  }
}
