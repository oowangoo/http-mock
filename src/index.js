import Network from 'Network'
import RulesManage from 'RulesManage'
import calls from 'calls'


function httpMock (hostname) {
  return RulesManage.createRules(hostname)
}
// static props
httpMock.calls = calls

// static function
httpMock.reset = function () {
  RulesManage.reset()
  calls.reset()
}

// lisnter XMLHttpRequest Call
Network.init()

export default httpMock
