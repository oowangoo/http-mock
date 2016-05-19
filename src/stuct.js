import { formatUrl } from 'util'

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
    method: method.toLowerCase(),
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
