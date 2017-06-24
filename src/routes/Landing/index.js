import React from "react"

import Diagram from "../../components/Diagram"
import FileReader from "../../components/FileReader"

import s from "./Landing.sass"

export default () => (
  <div className={s.root}>
    <div className={s.topbar}>
      <h1>Pack<b>tastic</b><small>make webpack fantastic again!</small></h1>
    </div>
    <main>
      <FileReader />
      <Diagram />
    </main>
  </div>
)
