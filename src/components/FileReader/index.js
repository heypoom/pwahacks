import React, {Component} from "react"

import s from "./FileReader.sass"

export default class FileReader extends Component {
  state = {
    file: ""
  }

  render = () => (
    <div className={s.root}>
      <h1>Upload your webpack.config.js here.</h1>
      <code>
        <pre>
          {this.state.file}
        </pre>
      </code>
    </div>
  )
}
