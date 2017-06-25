import React from "react"
import {connect} from "react-redux"

import FileReader from "../../components/FileReader"
import Terminal from "../../components/Terminal"

import Diagram from "../../components/Diagram"
import Block from "../../components/Block"

import s from "./Landing.sass"

const Landing = ({file}) => (
  <div className={s.root}>
    <div className={s.topbar}>
      <h1>Pack=><b>tastic</b><small>make webpack fantastic again!</small></h1>
    </div>
    <div className={s.view}>
      <nav className={s.sidebar}>
        <Terminal />
      </nav>
      <main className={s.main}>
        {(file || true) ? (
          <section>
            <Diagram />
          </section>
        ) : (
          <section className={s.initial}>
            <div className={s.contain}>
              <FileReader />
            </div>
          </section>
        )}
      </main>
    </div>
  </div>
)

const mapStateToProps = state => ({file: state.app.file})

export default connect(mapStateToProps)(Landing)
