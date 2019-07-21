export class PostRestore {
  url = `/api/restore/`

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
