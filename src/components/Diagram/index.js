import React from "react"
import Draggable from "react-draggable"

import Block from "../Block"

import s from "./Diagram.sass"

const rand = (min, max) => Math.floor((Math.random() * (max - min)))

// if (!visualViewport) {
//   visualViewport = {}
// }
//
// const w = visualViewport.clientWidth || document.documentElement.clientWidth || 0
// const h = visualViewport.clientHeight || document.documentElement.clientHeight || 0

const blocks = [...Array(10)]

export default () => (
  <div className={s.root}>
    <Draggable>
      <div className={s.container}>
        {
          blocks.map((block, i) => (
            <Block x={rand(0, 700)} y={rand(0, 500)} key={i} {...block} />
          ))
        }
      </div>
    </Draggable>
  </div>
)
