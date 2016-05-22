import HttpMock from 'index'

function checkCallbackEvent (mock, onload, onerror) {
  const spyOnload = jasmine.createSpy('spyOnload')
  const spyOnerror = jasmine.createSpy('spyOnerror')
  mock.onload = function () {
    spyOnload()

    expect(spyOnload.calls.count()).toEqual(1)
    expect(spyOnerror).not.toHaveBeenCalled()
    expect(mock).toBe(this)

    onload && setTimeout(onload.bind(this), 5)
  }
  mock.onerror = function () {
    spyOnerror()

    expect(spyOnerror.calls.count()).toEqual(1)
    expect(spyOnload).not.toHaveBeenCalled()

    expect(mock).toBe(this)
    onerror && setTimeout(onerror.bind(this), 5)
  }
  mock.send()
  expect(spyOnload).not.toHaveBeenCalled()
  expect(spyOnerror).not.toHaveBeenCalled()
}

function http (config, onload, onerror) {
  const xhr = new window.XMLHttpRequest()
  xhr.open('get', config.url)
  checkCallbackEvent(xhr, onload, onerror)
  return xhr
}
describe('index', function () {
  const m = {
    status: 200,
    text: 'demo',
    url: 'http://example.com/demo',
    host: 'http://example.com',
    path: '/demo',
  }
  it('base', function (done) {
    HttpMock(m.host)
      .when('get', m.path).respond(m.status, m.text)
      .get('/demo').respond(200, 'demo2')

    http(m, function () {
      const xhr = this
      const { status, response: text } = xhr
      expect(status).toEqual(m.status)
      expect(text).toEqual(m.text)
      done()
    }, done.fail)
  })

  it('dynamic response', function (done) {
    HttpMock(m.host).when('get', m.path).respond(m.status, function (httpConfig) {
      return httpConfig.url
    })

    http(m, function () {
      const xhr = this
      const { status, response: text } = xhr
      expect(status).toEqual(m.status)
      expect(text).toEqual(m.url)
      done()
    }, done.fail)
  })
})
