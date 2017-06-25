import React from "react"
import AceEditor from "react-ace"
import {connect} from "react-redux"

import "brace/ext/language_tools"
import "brace/theme/twilight"

import "brace/mode/javascript"
import "brace/snippets/javascript"

import {setCode} from "../../ducks/app"

import s from "./Code.sass"

const CodeEditor = ({code, setCode: onChange}) => (
  <div className={s.root}>
    <AceEditor
      mode="javascript"
      theme="twilight"
      name="codeeditor"
      fontSize="1.1em"
      className={s.code}
      setOptions={{enableSnippets: true}}
      editorProps={{$blockScrolling: Infinity}}
      value={code}
      onChange={onChange}
      enableBasicAutocompletion
      enableLiveAutocompletion
    />
  </div>
)

const mapStateToProps = state => ({
  code: state.app.code
})

export default connect(mapStateToProps, {setCode})(CodeEditor)
