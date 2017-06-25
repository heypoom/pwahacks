import {createReducer, makeAction} from "../core"

export const setFile = makeAction("SET_FILE")

const initial = {
  file: ""
}

export default createReducer(initial, state => ({
  SET_FILE: file => ({...state, file})
}))
