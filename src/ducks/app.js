import {createReducer, makeAction} from "../core"

export const setCode = makeAction("SET_CODE")
export const toggleSidebar = makeAction("TOGGLE_SIDEBAR")

const initial = {
  code: "",
  sidebar: false
}

export default createReducer(initial, state => ({
  SET_CODE: code => ({...state, code}),
  TOGGLE_SIDEBAR: () => ({...state, sidebar: !state.sidebar})
}))
