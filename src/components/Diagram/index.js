import React from "react"
import {connect} from "react-redux"
import Draggable from "react-draggable"

import parse from "../../core/parser"

import Block from "../Block"

import s from "./Diagram.sass"

const rand = (min, max) => Math.floor((Math.random() * (max - min)))

const Diagram = ({code}) => {
  const parsed = parse(code)

  if (parsed instanceof Error) {
    return (
      <div className={s.parserError}>
        <h1>Parser Error at line {parsed.lineNumber}, column {parsed.column}</h1>
        <h2>{parsed.description}</h2>
      </div>
    )
  }

  if (parsed.length === 0) {
    return (
      <div className={s.emptyBlock}>
        <h1>The code is not loaded or it is empty.</h1>
        <h2>Please upload the code or pick a template on the "new" tab.</h2>
      </div>
    )
  }

  console.log(parsed)

  return (
    <div className={s.root}>
      {
        parsed.map((block, i) => {
          if (block.length > 1) {
            return (
              <Draggable defaultPosition={{x: 0, y: i * 15}} key={i} >
                <div className={s.group}>
                  {block.map((item, index) => (
                    <Block g y={0} text={item} key={index} />
                  ))}
                </div>
              </Draggable>
            )
          }

          return (
            <Block x={0} y={i * 15} text={block[0].type} key={i} />
          )
        })
      }
    </div>
  )
}

const mapStateToProps = state => ({
  code: state.app.code
})

export default connect(mapStateToProps)(Diagram)
