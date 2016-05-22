import NetWork from 'network'
import HttpMock from 'index'

const SuceessURL = 'http://api.fir.im'

function checkCallbackEvent (network, onload, onerror) {
  const spyOnload = jasmine.createSpy('spyOnload')
  const spyOnerror = jasmine.createSpy('spyOnerror')
  network.onload = function () {
    spyOnload()

    expect(spyOnload.calls.count()).toEqual(1)
    expect(spyOnerror).not.toHaveBeenCalled()
    expect(network).toBe(this)

    onload && setTimeout(onload, 5)
  }
  network.onerror = function () {
    spyOnerror()

    expect(spyOnerror.calls.count()).toEqual(1)
    expect(spyOnload).not.toHaveBeenCalled()

    expect(network).toBe(this)
    onerror && setTimeout(onerror, 5)
  }
  network.send()
  expect(spyOnload).not.toHaveBeenCalled()
  expect(spyOnerror).not.toHaveBeenCalled()
}

describe('Network', function () {
  beforeEach(function () {
    HttpMock.reset()
    NetWork.enabled = false
  })

  it('Enabled/Disabled Network', function (done) {
    const network = new NetWork()
    network.open('get', SuceessURL)
    network.send()
    checkCallbackEvent(network, done.fail, done)
  })

  describe('Headers', function () {
    it('Set & not throw error', function () {
      const network = new NetWork()

      network.setRequestHeader('key', 'value')
      network.setRequestHeader('key2', 'value2')

      expect(network.headers).toEqual({
        key: 'value',
        key2: 'value2',
      })
    })
    // 没想好怎么测
    // xit('Send With headers', function () {
    // })
  })

  describe('Method open ', function () {
    it('only can call once', function () {
      const network = new NetWork()
      // open
      network.open('get', 'some')
      network.open('post', 'other')
      expect(network.method).toEqual('get')
      expect(network.url).toEqual('some')
    })
  })

  describe('Method send', function () {
    it('call twice, only first can send', function () {
      const network = new NetWork()
      network.open('get', 'http://example.com')
      network.send('is string')
      network.send('other is string')
      expect(network.params).toEqual('is string')
      expect(network.data).toEqual('is string')
    })
    // xit('send with data', function () {
    //   // 没想好怎么测 0.0
    // })
    it('sync call onload', function (done) {
      NetWork.enabled = true
      const network = new NetWork()
      network.open('get', SuceessURL)
      checkCallbackEvent(network, function () {
        expect(network.status).toBeGreaterThan(199) // >= 200
        expect(network.response).toBeDefined()
        done()
      }, done.fail)
    })
    it('sync call onerror', function (done) {
      // can't send xhr, NetWork.enabled = false
      const network = new NetWork()
      network.open('get', SuceessURL)
      checkCallbackEvent(network, done.fail, done)
    })
    it('sync with rule', function (done) {
      HttpMock(SuceessURL).when('get', '/').respond(200, 'this is response')
      const network = new NetWork()
      network.open('get', SuceessURL)
      checkCallbackEvent(network, function () {
        expect(network.status).toEqual(200) // >= 200
        expect(network.response).toEqual('this is response')
        done()
      }, done.fail)
    })
  })

  describe('Method abort', function () {
    it('not throw error before call send', function () {
      const network = new NetWork()
      network.abort()
      network.open('get', 'http://example.com')
      network.abort()
    })
    it('sync call onerror', function (done) {
      NetWork.enabled = true
      const network = new NetWork()
      network.open('get', SuceessURL)
      checkCallbackEvent(network, done.faild, done)
      network.abort()
    })
  })

  describe('Compatible', function () {
    const CompatibleList = [
      'getAllResponseHeaders',
      'getResponseHeader',
    ]
    const network = new NetWork()
    CompatibleList.forEach(function (c) {
      it(c, function () {
        expect(network[c]).not.toThrow()
      })
    })
  })

  it('readyState', function () {
    const network = new NetWork()
    expect(network.readyState).toEqual(0)
    network.open('get', SuceessURL)
    expect(network.readyState).toEqual(1)
    network.send()
    expect(network.readyState).toEqual(2)
    network.abort()
    // expect(network.readyState).toEqual(4)
  })
})
