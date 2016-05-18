// XMLHttpRequest mock
export default class Mock () {
  constructor (status, response, delay) {}

  open () {
    // do nothing
  }
  send () {}
  abort () {
    // stop timer
  }

  // default callback
  onload () {}
  onerror () {}
}
