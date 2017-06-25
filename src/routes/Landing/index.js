import React from "react"

import FileReader from "../../components/FileReader"
import Terminal from "../../components/Terminal"

import Diagram from "../../components/Diagram"
import Block from "../../components/Block"

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
        <section className={s.center}>
          <FileReader />
        </section>
        <section>
          <Diagram>
            <Block />
          </Diagram>
        </section>
      </main>
    </div>
  </div>
)
