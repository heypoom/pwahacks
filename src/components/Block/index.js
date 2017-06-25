import React from "react"
import Draggable from "react-draggable"

import s from "./Block.sass"

const getStyle = (color = "rgb(124, 77, 255)", background = color) => ({
  background,
  filter: `drop-shadow(0 0 12px ${color})`,
  WebKitFilter: `drop-shadow(0 0 12px ${color})`
})

const handleStart = e => e.stopPropagation()

export default ({x = 0, y = 0, color, bg}) => (
  <Draggable bounds="parent" defaultPosition={{x, y}} onStart={handleStart}>
    <div className={s.root} style={getStyle(color, bg)}>
      Blocky Component
    </div>
  </Draggable>
)
