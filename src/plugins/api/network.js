import { QueryParser } from '@/helpers/query-parser'
import { ApiGetBatcher } from '@/plugins/api/api-get-batcher'

export class Network {
  constructor(axios) {
    this.__axios = axios
    this.__apiGetBatcher = new ApiGetBatcher(axios)
  }

  get = (ApiClass, params, immediately) => {
    const queryParser = new QueryParser()
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        queryParser.append(key, value)
      }
    }

    const releaser = new ApiClass(queryParser.build())
    if (immediately) return releaser.release(this.__axios)

    return new Promise((resolve, reject) => {
      this.__apiGetBatcher.add(releaser, (err, data) => {
        if (err) reject(err)
        resolve(data)
      })
    })
  }

  post(ApiClass, data) {
    const releaser = new ApiClass(data)
    return releaser.release(this.__axios)
  }

  put(ApiClass, data) {
    const releaser = new ApiClass(data)
    return releaser.release(this.__axios)
  }

  delete(ApiClass, data) {
    const releaser = new ApiClass(data)
    return releaser.release(this.__axios)
  }
}
