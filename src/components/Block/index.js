import React from "react"
import Draggable from "react-draggable"

import s from "./Block.sass"

const getStyle = (text) => {
  let color

  if (text === "VariableDeclaration") {
    color = "#1abc9c"
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

export default ({x = 0, y = 0, text}) => (
  <Draggable bounds="parent" defaultPosition={{x, y}} onStart={handleStart}>
    <div className={s.root} style={getStyle(text)}>
      {text}
    </div>
  </Draggable>
)
