import React, { Component } from 'react'
import { parseBetsList } from '../utils/parsers'
import { markErroredLines, stripErrorMarks } from '../utils/utils'

export class BetsInput extends Component {
    constructor (props) {
        super(props)

        this.state = {
            input: '',
            error: '',
            success: '',
        }

        this.parseForm = this.parseForm.bind(this)
        this.update = this.update.bind(this)
    }

    parseForm (e) {
        e.preventDefault()
        this.setState((prevState) => {
            let error = ''
            let success = ''
            let input = stripErrorMarks(prevState.input).replace(/ /g, '\n')

            try {
                const bets = parseBetsList(input.split('\n'))
                this.props.onChange(bets)
                success = 'Success!'
            } catch (e) {
                error = e.message
                input = markErroredLines(input, e.erroredLines)
            }

            return {
                error,
                success,
                input,
            }
        })
    }

    update (e) {
        this.setState({input: e.target.value})
    }

    render () {
        return (
            <form onSubmit={this.parseForm} className={this.state.error ? 'has-error' : ''}>
                <div className='form-group'>
                    <label className='control-label' htmlFor='bets'>Bets</label>
                    <textarea id='bets' className='form-control' rows='10' value={this.state.input} onChange={this.update}></textarea>
                </div>
                <button className='btn btn-primary' disabled={!this.state.input}>Submit bets</button>

                <div className='help-block'>
                    {this.state.error.split('\n').map((errorLine, i) => (
                        <div key={i}>{errorLine}</div>
                    ))}
                    {this.state.success}
                </div>
            </form>
        )
    }
}
