export class Calls {
  matched = 0
  unmatched = 0

  constructor () {
    reset()
  }

  addMatched () {
    this.matched++
  }
  addUnMatched () {
    this.unmatched++
  }

  reset () {
    this.matched = 0
    this.unmatched = 0
  }
}

const instance = new Calls()
export default instance
