import Mock from 'mock'
describe('Mock', function () {
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
        mock.onerror = function () {
          onerror()
          done.fail('call onerror')
        }
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
      it(`onload with status ${response.status}`, createIt(response))
    })
  })

  it('Abort, call onerror', function (done) {
    const mock = new Mock(200, 'it not work', 1000)
    const onload = jasmine.createSpy('onload')
    const onerror = jasmine.createSpy('onerror')
    mock.open()

    mock.onload = function () {
      onload()
      done.fail('call onload')
    }
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
  it('Abort Before Send, do nothing', function () {
    const mock = new Mock(200, 'it not work', 1000)
    mock.abort()
  })
})
