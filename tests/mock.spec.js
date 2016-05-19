import Mock from 'mock'
describe('Mock', function () {
  const DEFAULT_TIMEOUT_INTERVAL = jasmine.DEFAULT_TIMEOUT_INTERVAL

  // it('Open', function () {
  //   // do nothing
  // })

  // 设置超时时间为0.1s
  beforeEach(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 100
  })

  afterAll(function () {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = DEFAULT_TIMEOUT_INTERVAL
  })

  describe('Send', function () {
    function isResponseToEqual ({ status, text }, mock) {
      expect(status).toEqual(mock.status)
      expect(text).toEqual(mock.response)
    }

    function createIt (response) {
      return function (done) {
        const mock = new Mock(response.status, response.text)
        const onload = jasmine.createSpy('onload')
        const onerror = jasmine.createSpy('onerror')

        mock.open()

        mock.onload = function () {
          onload()
          const m = this

          function checkDone () {
            expect(m).toBe(mock)
            expect(onload.calls.count()).toEqual(1)
            expect(onerror).not.toHaveBeenCalled()
            isResponseToEqual(response, m)
            done()
          }
          // sync done
          setTimeout(checkDone, 0)
        }
        mock.onerror = onerror
        mock.send()
        expect(onload).not.toHaveBeenCalled()
        expect(onerror).not.toHaveBeenCalled()
      }
    }

    const responses = [
      { text: 'this is 200', status: '200' },
      { text: 'this is 400', status: 400 },
    ]

    responses.forEach((response) => {
      it(`${response.status}`, createIt(response))
    })
  })

  it('Abort', function (done) {
    const mock = new Mock(200, 'it not work', 1000)
    const onload = jasmine.createSpy('onload')
    const onerror = jasmine.createSpy('onerror')
    mock.open()

    mock.onload = onload
    mock.onerror = function () {
      onerror()
      function checkDone () {
        expect(onerror.calls.count()).toEqual(1)
        expect(onload).not.toHaveBeenCalled()
        done()
      }
      setTimeout(checkDone, 0)
    }

    mock.send()

    // abort
    // setTimeout(function () {
    mock.abort()
    // }, 0)

    expect(onload).not.toHaveBeenCalled()
    expect(onerror).not.toHaveBeenCalled()
  })
})
