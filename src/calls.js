export class Calls {
  // matched = []
  // unmatched = []

  constructor () {
    this.reset()
  }

  addMatched (m) {
    this.matched.push(m)
  }
  addUnMatched (m) {
    this.unmatched.push(m)
  }

  reset () {
    this.matched = []
    this.unmatched = []
  }
}

const instance = new Calls()
export default instance
