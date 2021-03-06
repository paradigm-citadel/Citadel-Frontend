export class PostAddNewWallet {
  url = `/api/wallet/wallet/`

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
