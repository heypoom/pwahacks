import React from "react"

import FileReader from "../FileReader"

import s from "./Initiate.sass"

export default () => (
  <div className={s.initial}>
    <div className={s.contain}>
      <FileReader />
    </div>
  </div>
)
