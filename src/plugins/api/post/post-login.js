export class PostLogin {
  url = `/api/auth/`

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
