import network from 'network'
import calls from 'calls'
import Manage from 'rulesManage'

describe('Network', function () {
  const DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL

  beforeEach(function () {
    calls.reset()
    Manage.reset()
    NetWork.enabled = true
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100
  })
  afterAll(function () {
    NetWork.enabled = true
    jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL
  })

  it('Get/Set Headers', function () {
    const network = new NetWork()
    expect(network.getResponseHeader('key')).toBeUndefined()

    network.setRequestHeader('key', 'value')
    expect(network.getResponseHeader('key')).toEqual('value')

    network.setRequestHeader('key2', 'value2')
    expect(network.getAllResponseHeaders).toEqual({
      key: 'value',
      key2: 'value2'
    })
  })

  it('Enabled/Disabled Network', function (done) {
    const network = new NetWork()
    NetWork.enabled = false

    const onload = jasmine.createSpy('onload')
    const onerror = jasmine.createSpy('onerror')

    network.open('get', 'http://example.com')
    network.onload = onload
    network.onerror = function () {
      onerror()
      function checkDone () {
        // unmatched count
        expect(calls.unmatched.length).toBe(1)
        expect(calls.matched.length).toBe(0)

        // call onerror once
        expect(onerror.calls.count()).toEqual(1)
        expect(onload).not.toHaveBeenCalled()
        done()
      }
      setTimeout(checkDone, 0)
    }
    network.send()
    expect(onload).not.toHaveBeenCalled()
    expect(onerror).not.toHaveBeenCalled()
  })

  it('Match Rule', function (done) {
    const onerror = jasmine.createSpy('onerror')
    const onload = jasmine.createSpy('onload')
    const method = 'get'
    const domain = 'http://example.com'

    const response = {
      status: 400,
      text: 'word'
    }
    const rules = Manage.createRules('http://example.com')
    const r = rules.createRule('get', '/demo')
    r.respond(response.status, response.text)

    const network = new NetWork()

    network.onerror = onerror
    network.onload = function () {
      onload()
      const xhr = this

      function checkDone () {
        const status = xhr.status
        const responseText = xhr.response

        expect(calls.unmatched.length).toBe(0)
        expect(calls.matched.length).toBe(1)

        expect(status).toEqual(response.status)
        expect(responseText).toEqual(response.text)

        expect(onload.calls.count()).toEqual(1)
        expect(onerror).not.toHaveBeenCalled()
      }
      setTimeout(checkDone, 0)
    }

    network.open('get', 'http://example.com/demo')
    network.send()

    expect(onload).not.toHaveBeenCalled()
    expect(onerror).not.toHaveBeenCalled()
  })
})
