import React, { Component } from 'react'
import { addSpareLines, limit } from '../utils/utils'
import { DEFAULT_COMISSIONS } from '../calculators/calculators'
import { calculateDividends } from '../calculators/calculator-dispatcher'

export class Calculator extends Component {
    constructor (props) {
        super(props)
        this.state = {
            comission: DEFAULT_COMISSIONS[props.type] * 100,
        }

        this.counter = this.counter.bind(this)
        this.updateComission = this.updateComission.bind(this)
    }

    updateComission (e) {
        this.setState({
            comission: limit(e.target.value, 0, 100)
        })
    }

    currencySign (dividend) {
        return isFinite(parseFloat(dividend)) ? '$ ' : ''
    }

    counter (i) {
        return this.props.showKey ? `${i + 1}: ` : ''
    }

    render () {
        const dividends = calculateDividends(this.props.type, this.props.bets, this.props.result, this.state.comission / 100)
        const paddedDividends = addSpareLines(dividends)
        return (
            <div className='dividend col-md-3 col-xs-6'>
                <h3>{this.props.children}</h3>
                <div className='well'>
                    {paddedDividends.map((dividend, i) => (
                        <div key={i}><h4><strong>{this.counter(i)}{this.currencySign(dividend)}{dividend}</strong></h4></div>
                    ))}
                </div>
                <div className='form-group'>
                    <label>Comission rate (%):
                        <input value={this.state.comission} onChange={this.updateComission} type='range' min='0' max='100' />
                        <input className='form-control' value={this.state.comission} onChange={this.updateComission} type='number' min='0' max='100' />
                    </label>
                </div>
            </div>
        )
    }
}
