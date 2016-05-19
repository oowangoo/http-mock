// XMLHttpRequest mock
function nextTick (fn, delay) {
  const timer = setTimeout(fn, delay || 0)
  return function clearTimer () {
    clearTimeout(timer)
  }
}

/** *
  props: {
    private:
       _response: object
      timer: function stop timerOut

    public:
      readyState : link XMLHttpRequest.readyState
      status: response.status, default 0
  }
***/
export default class Mock {
  constructor (status, response, delay) {
    this._response = {
      status,
      body: response,
    }
    this.delay = delay || 0
    this.status = 0
  }

  open () {
    // do nothing
  }

  send () {
    this.timer = this.syncWithThis(this._sendResponse, this.delay)
  }

  abort () {
    // stop timer
    if (this.timer) {
      this.timer()
    }
    this.status = 0
    this.syncWithThis(this.onerror)
  }
  // default callback
  onload () {}
  onerror () {}

  // private
  syncWithThis (fn, delay) {
    const bfn = fn.bind(this)
    return nextTick(bfn, delay || 0)
  }
  _sendResponse () {
    this.status = this._response.status
    this.response = this.responseText = this._response.body
    this.onload()
  }
}
