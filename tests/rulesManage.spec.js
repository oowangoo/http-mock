import Manage from 'rulesManage'

describe('rulesManage', function () {
  // reset rulesManage
  beforeEach(function () {
    Manage.reset()
    expect(Manage.getAllRules().length).toBe(0)
  })

  it('createRules', function () {
    const rules = Manage.createRules('http://example.com')
    const rs = Manage.getAllRules()
    expect(rs.length).toBe(1)
    expect(rs[0]).toBe(rules)
    Manage.reset()
    expect(Manage.getAllRules().length).toBe(0)
  })
  it('findRule', function () {
    const rules = Manage.createRules('http://example.com')
    rules.when('get', '/demo')
    const httpConfig = {
      method: 'get',
      location: {
        href: 'http://example.com/demo',
        hostname: 'http://example.com',
        pathname: '/demo',
      },
    }
    const rule = Manage.findRule(httpConfig)
    expect(rule).toBeDefined()
  })
})
