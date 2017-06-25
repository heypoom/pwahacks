import React from "react"
import Draggable from "react-draggable"

import Block from "../Block"

import s from "./Diagram.sass"

const rand = (min, max) => Math.floor((Math.random() * (max - min)))

const blocks = [...Array(1)]

export default () => (
  <div className={s.root}>
    <Draggable>
      <div className={s.inner}>
        {
          blocks.map((block, i) => (
            <Block x={rand(0, 700)} y={rand(0, 500)} key={i} {...block} />
          ))
        }
      </div>
    </Draggable>
  </div>
)
