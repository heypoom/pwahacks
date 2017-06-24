import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"
import sw from "./core/sw"

import "./assets/styles.css"

ReactDOM.render(<App />, document.getElementById("root"))

sw()
