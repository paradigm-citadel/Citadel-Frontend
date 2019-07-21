const BATCHER_RELEASE_INTERVAL = 50

export class ApiGetBatcher {
  __batchUrl = '/api/bulk-requests/bulk-get/'
  __queue = []

  constructor(network) {
    setInterval(this.__release, BATCHER_RELEASE_INTERVAL)
    this.__network = network
  }

  add(releaser, callback) {
    this.__queue.push({
      releaser,
      callback
    })
  }

  __release = () => {
    const queueLength = this.__queue.length

    if (queueLength > 1) this.__releaseWithBatch()
    else if (queueLength === 1) this.__releaseOne()

    this.__queue = []
  }

  __releaseWithBatch = async () => {
    const queue = [...this.__queue]
    const endpoints = queue.map(item => ({ url: item.releaser.getUrl() }))
    try {
      const response = await this.__network.post(this.__batchUrl, { endpoints })

      response.endpoints.forEach((data, index) => {
        if (data.http_code === 200) {
          queue[index].callback(undefined, data.response_body)
        } else {
          queue[index].callback(data)
        }
      })
    } catch (error) {
      queue.forEach(({ callback }) => {
        callback(error)
      })
    }
  }

  __releaseOne = () => {
    const callback = this.__queue[0].callback
    this.__queue[0].releaser
      .release(this.__network)
      .then(data => callback(undefined, data))
      .catch(err => callback(err))
  }
}
