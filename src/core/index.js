/**
  * @func createReducer
  * @desc Creates a reducer
  * @param initialState
  * @param handlers: handling function which returns an object
  * @example state => ({ SET_NAME: name => ({...state, name}) })
**/

export const createReducer = (initialState, handlers) => (
  (state = initialState, action) => (
    handlers(state)[action.type] ?
      handlers(state)[action.type](action.payload) : state
  )
)
/**
  * @func makeAction
  * @desc Creates an action creator.
  *       Will also put each arguments into the payload, if any.
  * @param type: action type
  * @param ...argNames: action argument names
**/

export const makeAction = (type, ...argNames) => {
  if (argNames.length > 0) {
    return (...args) => {
      const payload = {}
      argNames.forEach((arg, index) => {
        payload[argNames[index]] = args[index]
      })
      return {type, payload}
    }
  }
  return payload => (payload ? ({type, payload}) : ({type}))
}
