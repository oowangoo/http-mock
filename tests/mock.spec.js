import Mock from 'mock'

function checkCallbackEvent (mock, onload, onerror) {
  const spyOnload = jasmine.createSpy('spyOnload')
  const spyOnerror = jasmine.createSpy('spyOnerror')
  mock.onload = function () {
    spyOnload()

    expect(spyOnload.calls.count()).toEqual(1)
    expect(spyOnerror).not.toHaveBeenCalled()
    expect(mock).toBe(this)

    onload && setTimeout(onload, 5)
  }
  mock.onerror = function () {
    spyOnerror()

    expect(spyOnerror.calls.count()).toEqual(1)
    expect(spyOnload).not.toHaveBeenCalled()

    expect(mock).toBe(this)
    onerror && setTimeout(onerror, 5)
  }
  mock.send()
  expect(spyOnload).not.toHaveBeenCalled()
  expect(spyOnerror).not.toHaveBeenCalled()
}

function isResponseToEqual ({ status, text }, mock) {
  expect(status).toEqual(mock.status)
  expect(text).toEqual(mock.response)
}

describe('Mock', function () {
  describe('Send', function () {
    function createIt (response) {
      return function (done) {
        const mock = new Mock(response.status, response.text)
        mock.open()

        checkCallbackEvent(mock, function () {
          isResponseToEqual(response, mock)
          done()
        }, done.fail)
      }
    }

    const responses = [
      { text: 'this is 200', status: '200' },
      { text: 'this is 400', status: 400 },
    ]

    responses.forEach((response) => {
      it(`onload with status ${response.status}`, createIt(response))
    })
  })

  it('Abort, call onerror', function (done) {
    const mock = new Mock(200, 'it not work', 1000)
    mock.open()
    checkCallbackEvent(mock, done.fail, done)
    mock.abort()
  })
  it('Abort Before Send, do nothing', function () {
    const mock = new Mock(200, 'it not work', 1000)
    mock.abort()
  })
})
