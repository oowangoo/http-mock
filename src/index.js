import thunk from 'redux-thunk'
import { applyMiddleware, compose, createStore } from 'redux'

let middleware = applyMiddleware(thunk)
if (__DEBUG__) {
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    middleware = compose(middleware, devToolsExtension())
  }
}
const store = middleware(createStore)({}, {})

store()
