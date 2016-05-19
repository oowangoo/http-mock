import calls from 'calls'

describe('Calls', function () {
  beforeEach(function () {
    calls.reset()
    expect(calls.matched.length).toBe(0)
    expect(calls.unmatched.length).toBe(0)
  })

  it('addMatched', function () {
    calls.addMatched()
    expect(calls.matched.length).toBe(1)
  })

  it('addUnMatched', function () {
    calls.addUnMatched()
    expect(calls.unmatched.length).toBe(1)
  })
})
