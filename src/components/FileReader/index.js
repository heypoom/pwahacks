import React from "react"
import {connect} from "react-redux"
import Dropzone from "react-dropzone"

import parser from "../../core/parser"
import {setCode} from "../../ducks/app"

import s from "./FileReader.sass"

const mapStateToProps = state => ({file: state.app.code})

const drop = (e, set) => {
  e.forEach(file => {
    const reader = new window.FileReader()
    reader.onload = () => set(reader.result)
    reader.readAsText(file)
  })
}

const ph = (
  <h1>Upload your <b>JavaScript</b> file here!</h1>
)

const sp = (
  <h1>Great! Go to other tabs and Explore.</h1>
)

const FileReader = ({success = sp, prompt = ph, file, setCode: set}) => (
  <Dropzone className={s.root} onDrop={e => drop(e, set)}>
    <img src="/magnet.png" alt="" className={s.middleimg} />
    {file ? success : prompt}
  </Dropzone>
)

export default connect(mapStateToProps, {setCode})(FileReader)
