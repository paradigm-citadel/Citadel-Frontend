export class GetRewards {
  url = `/api/transaction/transaction/reward/`

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
