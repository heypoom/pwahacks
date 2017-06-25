import React from "react"

import FileReader from "../FileReader"

import s from "./Initiate.sass"

export default () => (
  <div className={s.initial}>
    <section className={s.welcome}>
      <h1>Welcome to Pack=>Tastic!</h1>
      <p>
        Webpack is scary? Fear no more! We're here to help you with the agony of webpack.
      </p>
    </section>
    <section className={s.upload}>
      <div className={s.container}>
        <FileReader />
      </div>
    </section>
    <section className={s.template}>
      <button>Or, start from the template.</button>
    </section>
  </div>
)
