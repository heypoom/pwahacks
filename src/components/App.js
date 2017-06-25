import React from "react"
import {Provider} from "react-redux"
import {BrowserRouter as Router} from "react-router-dom"

import Workspace from "./Workspace"
import store from "../ducks"

export default () => (
  <Provider store={store}>
    <Router>
      <Workspace />
    </Router>
  </Provider>
)
