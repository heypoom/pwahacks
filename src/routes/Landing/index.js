import React from "react"

import FileReader from "../../components/FileReader"
import Initiate from "../../components/Initiate"
import Terminal from "../../components/Terminal"

import s from "./Landing.sass"

export default () => (
  <div className={s.root}>
    <div className={s.topbar}>
      <h1>Pack<b>tastic</b><small>make webpack fantastic again!</small></h1>
    </div>
    <div className={s.view}>
      <nav className={s.sidebar}>
        <Terminal />
      </nav>
      <main className={s.main}>
        <FileReader />
      </main>
    </div>
  </div>
)
