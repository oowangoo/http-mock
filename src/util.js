const toString = Object.prototype.toString

export function isFunction (value) { return typeof value === 'function' }
export function isRegExp (value) {
  return toString.call(value) === '[object RegExp]'
}
export function isString (value) { return typeof value === 'string' }
export function isObject (value) {
  return value !== null && typeof value === 'object'
}
export const isArray = Array.isArray

export function getQuery (url) {
  const s = url.split('?')
  if (s.length === 1) {
    return null
  }
  const qs = s[1].split('&')
  return qs.reduce((obj, q) => {
    const ks = q.split('=')
    obj[ks[0]] = ks[1]
    return obj
  }, {})
}

export function formatUrl (url) {
  const reg = /((\w+:)?\/\/)([^\/\s]+)(\/[^\?\s]*)?/
  const m = url.match(reg)

  const protocol = m[1]
  const hostname = m[3]
  let pathname = m[4]

  if (!hostname) {
    throw new Error('bad url')
  }
  if (!pathname) {
    pathname = '/'
  } else if (pathname[pathname.length - 1] === '/') {
    // 移除末尾 /
    pathname = pathname.substr(0, pathname.length - 1)
  }

  return {
    href: url,
    hostname: protocol + hostname,
    pathname,
    query: getQuery(url),
  }
}

export default {
  isFunction,
  isRegExp,
  isString,
  isObject,
  isArray,
  getQuery,
  formatUrl,
}
