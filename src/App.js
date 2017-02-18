import React, { Component } from 'react'
import './App.css'
import { parseBetsList, parseResult, calculateDividends } from './calculators/calculator-dispatcher'
import { DEFAULT_COMISSIONS } from './calculators/calculators'
import { markErroredLines, stripErrorMarks } from './utils/utils'

class Calculator extends Component {
    constructor (props) {
        super(props)
        this.state = {
            comission: DEFAULT_COMISSIONS[props.type] * 100,
        }
    }

    updateComission (e) {
        this.setState({
            comission: Math.min(Math.max(e.target.value, 0), 100),
        })
    }

    currencySign (dividend) {
        return isFinite(parseFloat(dividend)) ? '$ ' : ''
    }

    render () {
        const dividends = calculateDividends(this.props.type, this.props.bets, this.props.result, this.state.comission / 100)
        return (
            <div className='dividend'>
                {dividends.map((dividend, i) => (
                    <div key={i}>{this.currencySign(dividend)}{dividend}</div>
                ))}
                <input value={this.state.comission} onChange={this.updateComission.bind(this)} type='range' min='0' max='100' />
                <input value={this.state.comission} onChange={this.updateComission.bind(this)} type='number' min='0' max='100' />
            </div>
        )
    }
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
            resultError: '',
            resultSuccess: '',
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
          let input = stripErrorMarks(prevState.input)
          try {
              bets = parseBetsList(input.split('\n'))
              success = 'Success!'
          } catch (e) {
              error = e.message
              input = markErroredLines(input, e.erroredLines)
          }

          return {
              error,
              success,
              bets,
              input,
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
      let error = ''

      try {
          const result = parseResult(this.state.rawResult)
          this.setState({
              result,
              resultError: error,
              resultSuccess: 'Success',
          })
      } catch (e) {
          error = e.message
          this.setState({
              resultError: error,
              resultSuccess: '',
          })
      }
  }

  clearBets () {
      this.setState({
          rawResult: '',
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
                <button type='button' onClick={this.clearBets.bind(this)}>Clear bets</button>
            </form>

            {this.state.error}
            {this.state.success}
            <form onSubmit={this.addResult.bind(this)}>
                <input type='text' value={this.state.rawResult} onChange={this.updateResult.bind(this)} />
                <button>Update result</button>
            </form>
            {this.state.resultError}
            {this.state.resultSuccess}

            <div>
                <p>Write the bets in the text area separating with new lines. Errors will be highlighted with a "[***]" mark.</p>
                <p>Write the test results in the separate text input. Errors will be shown underneath.</p>
                <p>Drag the sliders or type in the boxes to change the comission rate for each product.</p>
            </div>
        </div>
    )
  }
}

export default App
