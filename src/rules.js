function defaultTest () {
  return true
}

export class Rule {
  constructor (method, pathname, params, header) {}

  /***
    config = {
      method,
      location: {
        pathname,
        href,
        host
      },
      params,
      headrs
    }
  ***/
  isMatch (config) {}

  respond () {}

  getResponse (config) {}
}
export const HttpMethod = ['get', 'post', 'delete', 'put', 'patch']

export class Rules {
  constructor (prevHref) {
    HttpMethod.forEach((m) => {
      this[m] = this.when.bind(this, m)
    })
  }
  // is prev match
  isMatch (config) {}

  findMatchRule (config) {}

  createRule (method, urlFn, paramsFn, headerFn) {
    // new Rule
    return new Rule(method, urlFn, paramsFn, headerFn)
  }

  when () {
    // call createRule
  }

}
export default Rules
