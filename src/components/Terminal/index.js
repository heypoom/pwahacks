import React, {Component} from "react"

import s from "./Terminal.sass"

export default class Terminal extends Component {
  state = {
    logs: [{text: "$ I'm a Terminal! You can execute JS code here."}],
    term: ""
  }

  onChange = e => this.setState({term: e.target.value})

  handleTerm = e => {
    if (e.key === "Enter") {
      /* eslint no-eval: 0 */
      let text
      let level

      try {
        text = eval(this.state.term)
      } catch (err) {
        text = err
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
          <div className={s.log} key={i}>
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
