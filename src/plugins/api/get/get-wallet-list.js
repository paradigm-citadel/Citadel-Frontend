export class GetWalletList {
  url = `/api/wallet/wallet/`

  constructor(queryString) {
    if (queryString.trim()) this.url += `?${queryString}`
  }

  getUrl() {
    return this.url
  }

  release(network) {
    return network.get(this.getUrl())
  }
}
