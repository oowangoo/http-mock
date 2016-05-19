function getQuery (url) {
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

function formatUrl (url) {
  const reg = /\/\/([^\/\s]+)(\/[^\?\s]*)?/
  const m = url.match(reg)

  const hostname = m[1]
  let pathname = m[2]
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
    hostname,
    pathname,
    query: getQuery(url),
  }
}

/**
  config = {
    method,
    location: {
      pathname,
      href,
      hostname
    },
    params,
    headrs
  }
**/
const queryWithParams = ['get', 'patch']
export function createHttpConfig (method, href, params, headers) {
  const config = {
    method,
    location: formatUrl(href),
    headers,
  }
  if (queryWithParams.includes(method)) {
    config.params = config.location.query
  } else {
    config.params = params
  }
  return config
}
