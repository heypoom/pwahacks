import React from "react"
import Draggable from "react-draggable"

import s from "./Block.sass"

const bg = "linear-gradient(to left, rgb(71, 118, 230), rgb(142, 84, 233))"

const getStyle = (color = "rgb(124, 77, 255)", background = bg) => ({
  background,
  filter: `drop-shadow(0 0 12px ${color})`,
  webkitFilter: `drop-shadow(0 0 12px ${color})`
})

const handleStart = e => e.stopPropagation()

export default ({x = 0, y = 0, color, bg}) => (
  <Draggable defaultPosition={{x, y}} onStart={handleStart}>
    <div className={s.root} style={getStyle(color, bg)}>
      Blocky Component
    </div>
  </Draggable>
)
