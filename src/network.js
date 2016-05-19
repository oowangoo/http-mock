import RulesManage from './rulesManage'
import Calls from './calls'
import { createHttpConfig } from 'stuct'
import Mock from 'mock'

const XMLHttpRequest = window.XMLHttpRequest

// XMLHttpRequest proxy
export class NetWork {
  readyState = 0
  status = 0
  // XMLHttpRequest method
  getAllResponseHeaders () {
    return this.headers
  }
  getResponseHeader (key) {
    return this.headers ? this.headers[key] : undefined
  }
  setRequestHeader (key, value) {
    this.headers = this.headers || {}
    this.headers[key] = value
  }

  open (method, url) {
    if (this.readyState > 0) {
      // maybe throw error
      return
    }
    this.method = method
    this.url = url
    this.setReadyState(1)
  }

  send (data) {
    if (this.readyState > 1) {
      // maybe throw error
      return
    }
    this.setReadyState(2)
    this.data = data
    try {
      this.params = JSON.parse(data)
    } catch (e) {
      this.params = data
    }

    this.xhr = this._sendAjax()
  }

  abort () {
    if (this.readyState < 2) {
      // maybe throw error
      return
    }
    if (this.xhr) {
      this.xhr.abort()
    }
  }

  // noop function
  onload () {}
  onerror () {}

  // protected
  _callSuccess () {
    this._finishXhr()
    const fn = this.onload.bind(this)
    fn()
  }
  _callError () {
    this._finishXhr()
    const fn = this.onerror.bind(this)
    fn()
  }
  _finishXhr () {
    this.status = this.xhr.status
    this.response = this.xhr.response
    this.responseText = this.xhr.responseText
  }

  _sendAjax () {
    const httpConfig = createHttpConfig(this.method, this.url, this.params, this.headers)
    const rule = RulesManage.findRule(httpConfig)
    let xhr;
    if (!rule && NetWork.enabled) {
      xhr = new XMLHttpRequest()
    } else {
      const response = rule ? rule.getResponse(httpConfig) : {}
      xhr = new Mock(response.status, response.text, 5)
    }
    xhr.open(this.method, this.url)
    this.bindCallback(xhr)
    xhr.send(this.data)
    // can't send xmlhttprequest
    if (!rule && !NetWork.enabled) {
      xhr.abort()
    }
    return xhr
  }
  // private
  bindCallback (xhr) {
    xhr.onerror = () => { this._callError() }
    xhr.onerror = () => { this._callSuccess() }
  }
  setReadyState (v) {
    this.readyState = v
  }
  // static
  static enabled = true

  static init () {
    window.XMLHttpRequest = NetWork
  }

  static destroy () {
    window.XMLHttpRequest = XMLHttpRequest
  }
}
export default NetWork
