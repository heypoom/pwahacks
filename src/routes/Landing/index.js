import React from "react"

import FileReader from "../../components/FileReader"
import Initiate from "../../components/Initiate"
import Terminal from "../../components/Terminal"

import s from "./Landing.sass"

// {/* <img src="/rocket.png" alt="" className={s.middleimg} /> */}

export default () => (
  <div className={s.root}>
    <div className={s.topbar}>
      <h1>Pack<b>tastic</b><small>make webpack fantastic again!</small></h1>
    </div>
    <main>
      <Terminal />
    </main>
  </div>
)
