// var testsContext = require.context('./', true, /\.spec\.js$/)
// testsContext.keys().forEach(testsContext)

const files = [
  './calls.spec.js',
  './mock.spec.js',
  './stuct.spec.js',
  './rules.spec.js',
  './rulesManage.spec.js',
  './network.spec.js',
]
files.forEach((f) => {
  require(f)
})
// require other
// var testsContext = require.context('./', true, /\.spec\.js$/)
// testsContext.keys().forEach((k) => {
//   console.log(k)
// })