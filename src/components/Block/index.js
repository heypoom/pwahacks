import React from "react"
import Draggable from "react-draggable"

import s from "./Block.sass"

const getStyle = (text) => {
  let color

  if (text) {
    if (text.indexOf("Declaration") > -1) {
      color = "#1abc9c"
    } else if (text.indexOf("Expression") > -1) {
      color = "#e74c3c"
    } else if (text.indexOf("Literal") > -1) {
      color = "#3498db"
    } else {
      color = "rgb(124, 77, 255)"
    }
  } else {
    color = "rgb(124, 77, 255)"
  }

  return {
    background: color,
    filter: `drop-shadow(0 0 12px ${color})`,
    WebKitFilter: `drop-shadow(0 0 12px ${color})`
  }
}

const handleStart = e => e.stopPropagation()

export default ({x = 0, y = 0, text, g}) => g ? (
  <div className={s.root} style={getStyle(text)}>
    {text}
  </div>
) : (
  <Draggable bounds="parent" defaultPosition={{x, y}} onStart={handleStart}>
    <div className={s.root} style={getStyle(text)}>
      {text}
    </div>
  </Draggable>
)
