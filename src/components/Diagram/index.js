import React from "react"

import Block from "../Block"

import s from "./Diagram.sass"

export default () => (
  <div className={s.root}>
    <div className={s.top} />
    {
      [...Array(9)].map(() => (
        <Block />
      ))
    }
  </div>
)
