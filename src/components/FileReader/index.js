import React from "react"
import {connect} from "react-redux"
import Dropzone from "react-dropzone"

import parser from "../../core/parser"
import {setFile} from "../../ducks/app"

import s from "./FileReader.sass"

const mapStateToProps = state => ({file: state.app.file})

const drop = (e, set) => {
  e.forEach(file => {
    const reader = new window.FileReader()
    reader.onload = () => set(reader.result)
    reader.readAsText(file)
  })
}

const ph = (
  <h1>Upload your <b>webpack.config.js</b> here!</h1>
)

const FileReader = ({placeholder = ph, file, setFile: set}) => (
  <Dropzone className={s.root} onDrop={e => drop(e, set)}>
    <img src="/magnet.png" alt="" className={s.middleimg} />
    {!file && placeholder}
  </Dropzone>
)

export default connect(mapStateToProps, {setFile})(FileReader)
