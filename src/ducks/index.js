import {createStore, applyMiddleware} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"

import reducer from "./reducers"

export const configureStore = initialState => {
  const middlewares = []
  const enhancers = [
    applyMiddleware(...middlewares)
  ]
  const store = createStore(reducer, initialState, composeWithDevTools(...enhancers))
  if (module.hot) {
    module.hot.accept("./reducers", () => store.replaceReducer(reducer))
  }
  return store
}

export default configureStore({})
