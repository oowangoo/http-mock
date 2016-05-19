import util from 'util'

function defaultTest () {
  return true
}

function isObjectEqual (a, b) {
  if (util.isArray(a)) {
    return a.length === b.length ? a.every(function (v, i) {
      return v === b[i]
    }) : false
  } else {
    const akeys = Object.keys(a)
    const bkeys = Object.keys(b)
    return akeys.length === bkeys.length ? akeys.every(function (k) {
      return akeys[k] === bkeys[k]
    }) : false
  }
}

function createMatchFn (f) {
  if (util.isFunction(f)) {
    return f
  } else if (util.isRegExp(f)) {
    return function (v) {
      return f.test(v)
    }
  } else if (util.isString(f)) {
    return function (v) {
      return f === v
    }
  } else if (util.isObject(f)) {
    return function (v) {
      return isObjectEqual(f, v)
    }
  } else {
    throw new Error('unabled create match function with' + Object.toString(f))
  }
}

function createGetResponseText (t) {
  if (util.isFunction(t)) {
    return t
  } else {
    return function () {
      return t
    }
  }
}

export class Rule {
  constructor (method, pathname, params, header) {
    this.method = method
    this.pathMatch = pathname ? createMatchFn(pathname) : defaultTest
    this.paramsMatch = params ? createMatchFn(params) : defaultTest
    this.headerMatch = header ? createMatchFn(header) : defaultTest
  }

  /**
    httpConfig
  **/
  isMatch (config) {
    const { method, location, params, headers } = config
    const pathname = location ? location.pathname : undefined
    return ((this.method === 'all' || this.method === method) &&
      this.pathMatch(pathname) &&
      this.paramsMatch(params) &&
      this.headerMatch(headers)
    )
  }

  respond (status, text) {
    this._response = {
      status,
      getText: createGetResponseText(text),
    }
    return this.$parent
  }

  getResponse (config) {
    return {
      status: this._response.status,
      text: this._response.getText(config),
    }
  }
}
export const HttpMethod = ['get', 'post', 'delete', 'put', 'patch']

export class Rules {
  rules = []
  constructor (prevHref) {
    HttpMethod.forEach((m) => {
      this[m] = this.when.bind(this, m)
    })
    this.matchFn = createMatchFn(prevHref)
  }
  // is prev match
  isMatch (config) {
    return this.matchFn(config.location.hostname)
  }

  findMatchRule (config) {
    if (!this.isMatch(config)) {
      return
    }
    const rule = this.rules.find((r) => {
      return r.isMatch(config)
    })
    return rule
  }

  when (method, urlFn, paramsFn, headerFn) {
    // new Rule
    const rule = new Rule(method, urlFn, paramsFn, headerFn)
    rule.$parent = this
    this.rules.push(rule)
    return rule
  }
}
export default Rules
