import React from "react"

import Diagram from "../Diagram"

import s from "./App.sass"

export default () => (
  <div>
    <div className={s.header}>
      Hello World
    </div>
    <main>
      <Diagram />
    </main>
  </div>
)
