import React, { Component } from 'react'
import './App.css'
import { parseBetsList, parseResult, calculateDividends } from './calculators/calculator-dispatcher'
import { DEFAULT_COMISSIONS } from './calculators/calculators'
import { markErroredLines, stripErrorMarks } from './utils/utils'

function addSpareLines (line) {
    if (line.length === 3)
        return line

    line.push('\u00a0')
    line.unshift('\u00a0')

    return line
}

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
            <div className='dividend col-md-3 col-xs-6'>
                <h3>{this.props.children}</h3>
                <div className='well'>
                    {addSpareLines(dividends).map((dividend, i) => (
                        <div key={i}><h4><strong>{this.currencySign(dividend)}{dividend}</strong></h4></div>
                    ))}
                </div>
                <div className='form-group'>
                    <label>Comission rate (%):
                        <input value={this.state.comission} onChange={this.updateComission.bind(this)} type='range' min='0' max='100' />
                        <input className='form-control' value={this.state.comission} onChange={this.updateComission.bind(this)} type='number' min='0' max='100' />
                    </label>
                </div>
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
          let input = stripErrorMarks(prevState.input).replace(/ /g, '\n')
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
            <div className='row dividend-block'>
                <Calculator type='W' bets={this.state.bets} result={this.state.result}>Win</Calculator>
                <Calculator type='P' bets={this.state.bets} result={this.state.result}>Place</Calculator>
                <Calculator type='Q' bets={this.state.bets} result={this.state.result}>Quinella</Calculator>
                <Calculator type='E' bets={this.state.bets} result={this.state.result}>Exact</Calculator>
                <div className={'result-overlay ' + (this.state.result ? 'not-shown' : '')}>
                    <h2>No result provided</h2>
                </div>
            </div>
            <div className='row'>
                <form onSubmit={this.parseForm.bind(this)} className={this.state.error ? 'has-error' : ''}>
                    <div className='form-group'>
                        <label className='control-label' htmlFor='bets'>Bets</label>
                        <textarea id='bets' className='form-control' rows='10' value={this.state.input} onChange={this.update.bind(this)}></textarea>
                    </div>
                    <button className='btn btn-primary' disabled={!this.state.input}>Submit bets</button>

                    <div className='help-block'>
                        {this.state.error.split('\n').map((errorLine, i) => (
                            <div key={i}>{errorLine}</div>
                        ))}
                        {this.state.success}
                    </div>
                </form>
            </div>
            <div className='row'>
                <form className={'form-inline ' + (this.state.resultError ? 'has-error' : '')} onSubmit={this.addResult.bind(this)}>
                    <div className='form-group'>
                        <label className='control-label' htmlFor='result'>Result:</label>
                        <input id='result' className='form-control' type='text' value={this.state.rawResult} onChange={this.updateResult.bind(this)} />
                    </div>
                    <button className='btn btn-info' disabled={!this.state.rawResult}>Update result</button>
                    <div className='help-block'>{this.state.resultError}{this.state.resultSuccess}</div>
                </form>
            </div>

            <div className='row'>
                <div className='well'>
                    <p>Write the bets in the text area separating with new lines or spaces. The list will be converted to a one bet per line list and any errors will be highlighted with a <strong>[***]</strong> mark.</p>
                    <p>Write the test results in the separate text input. Errors will be shown underneath.</p>
                    <p>Drag the sliders or type in the boxes to change the comission rate for each product.</p>
                </div>
            </div>
        </div>
    )
  }
}

export default App
