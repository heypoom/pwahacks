import React from "react"
import {withRouter, NavLink} from "react-router-dom"

import s from "./Tab.sass"

const Tabs = () => (
  <div className={s.tabs}>
    {["/new", "/visual", "/code", "/test"].map(route => (
      <NavLink to={route} key={route} className={s.tab} activeClassName={s.active}>
        {route.substring(1)}
      </NavLink>
    ))}
  </div>
)

export default Tabs
