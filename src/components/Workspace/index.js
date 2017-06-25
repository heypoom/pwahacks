import React from "react"
import {connect} from "react-redux"
import {withRouter, Route, Redirect, Switch} from "react-router-dom"

import Tabs from "../Tabs"
import Terminal from "../Terminal"

import Create from "../Create"
import Diagram from "../Diagram"

import s from "./Workspace.sass"

const NotFound = () => (
  <div className={s.notfound}>
    <h1><b>Uh Oh.</b> How did you get here!?</h1>
  </div>
)

const Workspace = () => (
  <div className={s.root}>
    <div className={s.view}>
      <nav className={s.sidebar}>
        <div className={s.titlebar}>
          Packtastic
          <div className={s.buttons} />
        </div>
        <Terminal />
      </nav>
      <main className={s.main}>
        <div className={s.topbar}>
          <h1>Pack=><b>tastic</b><small>make webpack fantastic again!</small></h1>
        </div>
        <section className={s.workspace}>
          <Tabs />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/new" />} />
            <Route path="/new" component={Create} />
            <Route path="/diagram" component={Diagram} />
            <Route path="/code" component={() => <div>Code</div>} />
            <Route component={NotFound} />
          </Switch>
        </section>
      </main>
    </div>
  </div>
)

const mapStateToProps = state => ({file: state.app.file})

export default withRouter(connect(mapStateToProps)(Workspace))
