import React from "react"
import {connect} from "react-redux"

import FileReader from "../FileReader"

import {setCode} from "../../ducks/app"
import tmpl from "../../core/template"

import s from "./Create.sass"

const Create = ({setCode: set}) => (
  <div className={s.initial}>
    <section className={s.welcome}>
      <h1>{"Welcome to Pack=>Tastic!"}</h1>
      <p>
        {"JavaScript is scary? Fear no more! We're here to make it Fantastic again!"}
      </p>
    </section>
    <section className={s.upload}>
      <div className={s.container}>
        <FileReader />
      </div>
    </section>
    <section className={s.template}>
      <button onClick={() => set(tmpl)}>
        Or, start from the template.
      </button>
    </section>
  </div>
)

export default connect(null, {setCode})(Create)
