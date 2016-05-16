var testsContext = require.context('./', true, /\.spec\.js$/)
testsContext.keys().forEach(testsContext)

const testsToRun = testsContext.keys()
;(testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext)
