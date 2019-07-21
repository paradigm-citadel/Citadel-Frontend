export class DeleteAccount {
  url = `/api/account/`

  constructor(data) {
    this.__data = data
  }

  getUrl() {
    return this.url
  }

  release(network) {
    return network.delete(this.getUrl())
  }
}
