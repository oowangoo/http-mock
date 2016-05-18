import HttpMock from 'index'
describe('index', function () {
  const DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL
  // 设置超时时间为0.1s
  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100
  })

  afterAll(function (){
    jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL
  })

  it('base', function (done) {

    function checkXhr (config) {
      const onload = jasmine.createSpy('onload')
      const onerror = jasmine.createSpy('onerror')

      const xhr = new window.XMLHttpRequest()
      xhr.open('get', config.url)
      xhr.onerror = onerror
      xhr.onload = function () {
        onload()
        const status = xhr.status
        const text = xhr.response
        function checkDone () {
          expect(status).toEqual(config.status)
          expect(status).toEqual(config.text)

          expect(onload.calls.count()).toEqual(1)
          expect(onerror).not.toHaveBeenCalled()
        }
        setTimeout(checkDone, 0)
      }
      xhr.send()
      expect(onload).not.toHaveBeenCalled()
      expect(onerror).not.toHaveBeenCalled()
    }

    const m = {
      status: 200,
      text: 'demo',
      url: 'http://example.com/demo',
      host: 'http://example.com',
      path: '/demo'
    }
    HttpMock(m.host)
      .when('get', m.path).respond(m.status, m.text)
      .get('/demo2').respond(200, 'demo2')
    checkXhr(m)
  })
})
