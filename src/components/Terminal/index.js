import React, {Component} from "react"

import s from "./Terminal.sass"

export default class Terminal extends Component {
  state = {
    logs: ["$ Hello World!"],
    term: ""
  }

  handleTerm = e => {
    if (e.key === "Enter") {
      this.setState({
        logs: [this.state.term, ...this.state.logs]
      })
    }
  }

  onChange = e => this.setState({term: e.target.value})

  render = () => (
    <div className={s.wrapper}>
      <div className={s.console}>
        {this.state.logs.map(item => (
          <div className={s.log} key={item}>
            {item}
          </div>
        ))}
      </div>
      <input
        className={s.term}
        onKeyPress={this.handleTerm}
        onChange={this.onChange}
      />
    </div>
  )
}
