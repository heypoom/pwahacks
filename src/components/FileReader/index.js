import React, {Component} from "react"
import Dropzone from "react-dropzone"

import parser from "../../core/parser"

import s from "./FileReader.sass"

export default class FileReader extends Component {
  state = {file: ""}

  drop = e => {
    e.forEach(file => {
      const reader = new window.FileReader()
      reader.onload = () => {
        this.setState({file: reader.result})
        const tree = parser(reader.result)
      }
      reader.readAsText(file)
    })
  }

  render = () => (
    <Dropzone className={s.root} onDrop={this.drop}>
      <img src="/magnet.png" alt="" className={s.middleimg} />
      <h1>Upload your <b>webpack.config.js</b> here.</h1>
      <div className={s.code}>
        {this.state.file}
      </div>
    </Dropzone>
  )
}
