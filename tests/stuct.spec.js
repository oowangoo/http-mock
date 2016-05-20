import { createHttpConfig } from 'stuct'

describe('CreateHttpConfig', function () {
  it('Method ToLower', function () {
    const config = createHttpConfig('GET', 'http://flow.ci/projects')
    expect(config.method).toEqual('get')
  })
  describe('Property Location', function () {
    it('empty pathname', function () {
      const config1 = createHttpConfig('get', 'http://flow.ci')
      expect(config1.location.pathname).toEqual('/')
    })
    it('end with /', function () {
      const config1 = createHttpConfig('get', 'http://flow.ci/projects/')
      const config2 = createHttpConfig('get', 'http://flow.ci/projects')
      expect(config1.location.pathname).toEqual('/projects')
      expect(config1.location.pathname).toEqual(config2.location.pathname)
    })
    it('hostname with protocol', function () {
      const config1 = createHttpConfig('get', 'http://flow.ci/projects/')
      expect(config1.location.hostname).toEqual('http://flow.ci')

      const config2 = createHttpConfig('get', 'https://flow.ci/projects/')
      expect(config2.location.hostname).toEqual('https://flow.ci')
    })
    it('query', function () {
      const config = createHttpConfig('get', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })
      expect(config.location.query).toEqual({ jobId: '1111', build_id: '222' })
    })
  })
  it('Property Params', function () {
    it('get query', function () {
      const config = createHttpConfig('get', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })
      expect(config.location.query).toEqual(config.params)
    })
  })
})
