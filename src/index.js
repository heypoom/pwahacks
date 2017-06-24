import React from "react"
import ReactDOM from "react-dom"

import App from "./components/App"
import sw from "./core/sw"

import "./assets/main.sass"

ReactDOM.render(<App />, document.getElementById("root"))

sw()
