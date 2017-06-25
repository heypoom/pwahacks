import React from "react"
import {Link} from "react-router-dom"

import s from "./Tab.sass"

const Tabs = ({tab}) => (
  <div className={s.tabs}>
    {["create", "diagram", "code", "visualize"].map(route => (
      <Link to={route} key={route} className={s.tab}>
        {route}
      </Link>
    ))}
  </div>
)

export default Tabs
