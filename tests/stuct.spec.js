import { createHttpConfig } from 'stuct'

describe('HttpConfig', function () {
  it('method toLower()', function () {
    const config = createHttpConfig('GET', 'http://flow.ci/projects')
    expect(config.method).toEqual('get')
  })
  describe('Property Location', function () {
    describe('pathname', function () {
      it('defalut value / ', function () {
        const config1 = createHttpConfig('get', 'http://flow.ci')
        expect(config1.location.pathname).toEqual('/')

        const config2 = createHttpConfig('get', 'http://flow.ci/')
        expect(config2.location.pathname).toEqual('/')
      })
      it('has pathname, must remove last /', function () {
        const config1 = createHttpConfig('get', 'http://flow.ci/projects/')
        const config2 = createHttpConfig('get', 'http://flow.ci/projects')
        expect(config1.location.pathname).toEqual('/projects')
        expect(config1.location.pathname).toEqual(config2.location.pathname)
      })
    })
    describe('hostname', function () {
      it('must with protocol', function () {
        const config1 = createHttpConfig('get', 'http://flow.ci/projects/')
        expect(config1.location.hostname).toEqual('http://flow.ci')

        const config2 = createHttpConfig('get', 'https://flow.ci/projects/')
        expect(config2.location.hostname).toEqual('https://flow.ci')
      })
      it('must with port', function () {
        const config1 = createHttpConfig('get', 'http://flow.ci:8080/projects/')
        expect(config1.location.hostname).toEqual('http://flow.ci:8080')
      })
    })
    describe('query', function () {
      it('format', function () {
        const config = createHttpConfig('get', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })
        expect(config.location.query).toEqual({ jobId: '1111', build_id: '222' })
      })
    })
  })
  describe('Property Params', function () {
    it('method get, params is query', function () {
      const config = createHttpConfig('get', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })
      expect(config.location.query).toEqual(config.params)
      expect(config.params).toEqual({ jobId: '1111', build_id: '222' })
    })
    it('other method, params is data', function () {
      const config = createHttpConfig('post', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })
      expect(config.params).toEqual({ jobId: 1 })
    })
  })
  it('headers', function () {
    const config = createHttpConfig('post', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 }, { key: 1 })
    expect(config.headers).toEqual({ key: 1 })
  })
  // other test
})
