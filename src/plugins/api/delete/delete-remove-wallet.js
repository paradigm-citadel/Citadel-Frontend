export class DeleteRemoveWallet {
  url = `/api/wallet/wallet`

  constructor(data) {
    this.__data = data
  }

  getUrl() {
    return `${this.url}/${this.__data.id}/`
  }

  release(network) {
    return network.delete(this.getUrl())
  }
}
