export class QueryParser {
  constructor(string) {
    if (process.client) {
      this.__parser = new QueryParserClient(string)
    } else {
      this.__parser = new QueryParserServer(string)
    }
  }

  append(key, value) {
    if (value === undefined || value === null) return
    return this.__parser.append(key, value)
  }

  set(key, value) {
    if (!value) return
    return this.__parser.set(key, value)
  }

  build() {
    return this.__parser.build()
  }

  get(key) {
    return this.__parser.get(key)
  }

  has(key) {
    return this.__parser.has(key)
  }
}

class QueryParserServer {
  querystring = require('querystring')
  __temp = {}

  constructor(string) {
    this.__temp = this.querystring.parse(string)
  }

  append(key, value) {
    if (Array.isArray(this.__temp[key])) this.__temp[key].push(value)
    else this.__temp[key] = [value]
  }

  set(key, value) {
    this.__temp[key] = value
  }

  build() {
    return this.querystring.stringify(this.__temp)
  }

  get(key) {
    if (!this.__temp.hasOwnProperty(key)) return null
    return this.__temp[key]
  }

  has(key) {
    return this.__temp.hasOwnProperty(key) && !!this.__temp[key]
  }
}

class QueryParserClient {
  constructor(string) {
    this.params = new URLSearchParams(string)
  }

  append(key, value) {
    this.params.append(key, value)
  }

  set(key, value) {
    this.params.set(key, value)
  }

  build() {
    return this.params.toString()
  }

  get(key) {
    return this.params.get(key)
  }

  has(key) {
    return this.params.has(key)
  }
}
