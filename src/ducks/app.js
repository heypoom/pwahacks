import {createReducer, makeAction} from "../core"

export const setCode = makeAction("SET_CODE")

const initial = {
  code: ""
}

export default createReducer(initial, state => ({
  SET_CODE: code => ({...state, code})
}))
