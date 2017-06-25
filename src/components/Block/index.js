import React from "react"
import Draggable from "react-draggable"

import s from "./Block.sass"

export default props => (
  <Draggable>
    <div className={s.root}>
      Blocky Component
    </div>
  </Draggable>
)
