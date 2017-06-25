import React, {Component} from "react"
import {connect} from "react-redux"
import Dropzone from "react-dropzone"

import parser from "../../core/parser"
import {setFile} from "../../ducks/app"

import s from "./FileReader.sass"

const mapStateToProps = state => ({file: state.app.file})

@connect(mapStateToProps, {setFile})
export default class FileReader extends Component {
  drop = e => {
    e.forEach(file => {
      const reader = new window.FileReader()
      reader.onload = () => this.props.setFile(reader.result)
      reader.readAsText(file)
    })
  }

  render = () => (
    <Dropzone className={s.root} onDrop={this.drop}>
      <img src="/magnet.png" alt="" className={s.middleimg} />
      {this.props.file ? (
        <div className={s.code}>
          {this.props.file}
        </div>
      ) : (
        <h1>Upload your <b>webpack.config.js</b> here.</h1>
      )}
    </Dropzone>
  )
}
