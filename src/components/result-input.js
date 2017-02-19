import React, { Component } from 'react'
import { parseResult } from '../utils/parsers'

export class ResultInput extends Component {
    constructor (props) {
        super(props)
        this.state = {
            result: '',
            error: '',
            success: '',
        }

        this.addResult = this.addResult.bind(this)
        this.updateResult = this.updateResult.bind(this)
    }

    updateResult (e) {
        this.setState({result: e.target.value })
    }

    addResult (e) {
        e.preventDefault()
        let error = ''
        let success = ''

        try {
            const result = parseResult(this.state.result)
            this.props.onChange(result)
            success = 'Success'
        } catch (e) {
            error = e.message
        }

        this.setState({
            error,
            success,
        })
    }

    render () {
        return (
            <form className={'form-inline ' + (this.state.error ? 'has-error' : '')} onSubmit={this.addResult}>
                <div className='form-group'>
                    <label className='control-label' htmlFor='result'>Result:</label>
                    <input id='result' className='form-control' type='text' value={this.state.result} onChange={this.updateResult} />
                </div>
                <button className='btn btn-info' disabled={!this.state.result}>Update result</button>
                <div className='help-block'>{this.state.error}{this.state.success}</div>
            </form>
        )
    }
}
