export class PutChangePassword {
  url = `/api/account/change-password/`

  constructor(data) {
    this.__data = data
  }

  getUrl() {
    return this.url
  }

  release(network) {
    return network.put(this.getUrl(), this.__data)
  }
}
