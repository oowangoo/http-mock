import Rules from 'rules'

const RulesArray = []
function createRules (hostname) {
  const rs = new Rules(hostname)
  RulesArray.push(rs)
  return rs
}

function getAllRules () {
  return RulesArray
}

function reset () {
  RulesArray.length = 0
}

function findRule (httpConfig) {
  let r
  RulesArray.some(function (rs) {
    r = rs.findMatchRule(httpConfig)
    return !!r
  })
  return r
}

const manage = {
  createRules,
  getAllRules,
  reset,
  findRule,
}
export default manage
