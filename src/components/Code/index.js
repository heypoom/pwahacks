import React from "react"
import AceEditor from "react-ace"
import {connect} from "react-redux"

import "brace/ext/language_tools"
import "brace/theme/twilight"

import "brace/mode/javascript"

import {setCode} from "../../ducks/app"

import s from "./Code.sass"

const CodeEditor = ({code, setCode: onChange}) => (
  <div className={s.root}>
    {code ? (
      <AceEditor
        mode="javascript"
        theme="twilight"
        name="codeeditor"
        fontSize="1.05em"
        className={s.code}
        editorProps={{$blockScrolling: Infinity}}
        value={code}
        onChange={onChange}
        enableBasicAutocompletion
        enableLiveAutocompletion
      />
    ) : (
      <div className={s.emptyCode}>
        <h1>The code is not loaded or it is empty.</h1>
        <h2>Please upload the code or pick a template on the "new" tab.</h2>
      </div>
    )}
  </div>
)

const mapStateToProps = state => ({
  code: state.app.code
})

export default connect(mapStateToProps, {setCode})(CodeEditor)
