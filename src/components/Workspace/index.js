import React from "react"
import {connect} from "react-redux"
import {withRouter, Route, Redirect} from "react-router-dom"

import FileReader from "../../components/FileReader"
import Terminal from "../../components/Terminal"
import Tabs from "../../components/Tabs"

import Diagram from "../../components/Diagram"

import s from "./Workspace.sass"

const Workspace = ({file}) => (
  <div className={s.root}>
    <div className={s.topbar}>
      <h1>Pack=><b>tastic</b><small>make webpack fantastic again!</small></h1>
    </div>
    <div className={s.view}>
      <nav className={s.sidebar}>
        <Terminal />
      </nav>
      <main className={s.main}>
        <section className={s.workspace}>
          <Tabs />
          <div>
            <Route exact path="/" render={() => <Redirect to="/upload" />} />
            <Route path="/create" component={() => (
              <div className={s.initial}>
                <div className={s.contain}>
                  <FileReader />
                </div>
              </div>
            )} />
            <Route path="/diagram" component={Diagram} />
            <Route path="/code" component={() => <div>Code</div>} />
          </div>
        </section>
      </main>
    </div>
  </div>
)

const mapStateToProps = state => ({file: state.app.file})

export default withRouter(connect(mapStateToProps)(Workspace))
