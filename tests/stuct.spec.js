import { createHttpConfig } from 'stuct'

describe('Create Http Config', function () {
  it('path with /', function () {
    const config1 = createHttpConfig('get', 'http://flow.ci/projects/')
    const config2 = createHttpConfig('get', 'http://flow.ci/projects')
    expect(config1.pathname).toEqual(config2.pathname)
  })
  it('get', function () {
    const config = createHttpConfig('get', 'http://flow.ci/projects?jobId=1111&build_id=222', { jobId: 1 })

    expect(config.params).toEqual({ jobId: '111', build_id: '222' })
  })
  it('Method toLowerCase', function () {
    const config = createHttpConfig('GET', 'http://flow.ci/projects')
    expect(config.method).toEqual('get')
  })
})
