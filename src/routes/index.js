import React from "react"
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

import Landing from "./Landing"

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={Landing} />
    </div>
  </Router>
)
