import React, { Component } from 'react'
import './App.css'
import { parseBetsList, parseResult, calculate } from './calculators/calculator-dispatcher'

function Calculator (props) {
    return <span>{calculate(props.type, props.bets, props.result)}</span>
}

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            input: '',
            error: '',
            success: '',
            bets: {
                W: [],
                P: [],
                Q: [],
                E: [],
            },
            rawResult: '',
        }
    }

  update (e) {
      this.setState({
          input: e.target.value
      })
  }

  parseForm (e) {
      e.preventDefault()
      this.setState((prevState) => {
          let error = ''
          let success = ''
          let bets = prevState.bets
          try {
              bets = parseBetsList(prevState.input.split('\n'))
              success = 'Success!'
          } catch (e) {
              error = e.message
          }

          return {
              error,
              success,
              bets,
          }
      })
  }

  updateResult (e) {
      e.preventDefault()
      this.setState({
          rawResult: e.target.value,
      })
  }

  addResult (e) {
      e.preventDefault()
      const result = parseResult(this.state.rawResult)
      this.setState({
          result
      })
  }

  render() {
    return (
        <div>
            <Calculator type='W' bets={this.state.bets} result={this.state.result} /><br />
            <Calculator type='P' bets={this.state.bets} result={this.state.result} /><br />
            <Calculator type='Q' bets={this.state.bets} result={this.state.result} /><br />
            <Calculator type='E' bets={this.state.bets} result={this.state.result} /><br />
            <form onSubmit={this.parseForm.bind(this)}>
                <textarea value={this.state.input} onChange={this.update.bind(this)}></textarea>
                <button>Add bets</button>
            </form>

            <form onSubmit={this.addResult.bind(this)}>
                <input type='text' value={this.state.rawResult} onChange={this.updateResult.bind(this)} />
                <button>Update result</button>
            </form>
            {this.state.error}
            {this.state.success}
        </div>
    )
  }
}

export default App
