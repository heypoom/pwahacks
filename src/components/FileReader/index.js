import React, {Component} from "react"
import Dropzone from "react-dropzone"

import s from "./FileReader.sass"

export default class FileReader extends Component {
  state = {file: ""}

  render = () => (
    <div className={s.root}>
      <img src="/magnet.png" alt="" className={s.middleimg} />
      <h1>Upload your <b>webpack.config.js</b> here.</h1>
      <div className={s.code}>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit,
        sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </div>
    </div>
  )
}
