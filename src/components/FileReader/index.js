import React, {Component} from "react"

import s from "./FileReader.sass"

export default class FileReader extends Component {
  state = {
    file: ""
  }

  render = () => (
    <div className={s.root}>
      <img src="/magnet.png" alt="" />
      <h1>Upload your <b>webpack.config.js</b> here.</h1>
    </div>
  )
}
