import RulesManage from './rulesManage'
import Calls from './calls'

const XMLHttpRequest = window.XMLHttpRequest

// XMLHttpRequest proxy
export class NetWork {
  // XMLHttpRequest method
  getAllResponseHeaders () {}
  getResponseHeader () {}
  setRequestHeader () {}

  open () {}
  send () {}
  abort () {}

  // noop function
  onload () {}
  onerror () {}

  // protected
  _callSuccess () {
    this._finishXhr()
    const fn = this.onload.bind(this.xhr)
    fn()
  }
  _callError () {
    this._finishXhr()
    const fn = this.onerror.bind(this.xhr)
    fn()
  }
  _finishXhr () {

  }
  // private
  bindCallback () {}

  // static
  static enabled = true

  static init () {
    //
  }

  static destroy () {

  }
}
export default NetWork
