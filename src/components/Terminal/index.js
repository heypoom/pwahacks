import React, {Component} from "react"
import c from "classnames"

import s from "./Terminal.sass"

export default class Terminal extends Component {
  state = {
    logs: [{text: "$ I'm a Terminal! You can execute JS code here.", level: "info"}],
    term: ""
  }

  componentDidMount() {
    window._termlog = (...args) => {
      setTimeout(() => {
        this.setState({
          logs: [{text: args.join(" "), level: "info"}, ...this.state.logs]
        })
      }, 0)
    }
  }

  onChange = e => this.setState({term: e.target.value})

  handleTerm = e => {
    if (e.key === "Enter") {
      /* eslint no-eval: 0 */
      let input = this.state.term
      let level = "return"
      let text = ""

      try {
        input = input.replace("console.log", "_termlog")
        console.log(input)
        text = `> ${eval(input)}`
      } catch (err) {
        text = `! ${err.toString()}`
        level = "error"
      }

      this.setState({
        logs: [{text, level}, ...this.state.logs]
      })
    }
  }


  render = () => (
    <div className={s.wrapper}>
      <div className={s.console}>
        {this.state.logs.map((item, i) => (
          <div className={c(s.log, s[item.level])} key={i}>
            {item.text}
          </div>
        ))}
      </div>
      <input
        className={s.term}
        aria-label="terminal"
        onKeyPress={this.handleTerm}
        onChange={this.onChange}
      />
    </div>
  )
}
