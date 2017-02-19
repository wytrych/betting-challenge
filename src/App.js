import React, { Component } from 'react'
import './App.css'
import { Calculator } from './components/calculator'
import { ResultInput } from './components/result-input'
import { BetsInput } from './components/bets-input'

class App extends Component {

    constructor (props) {
        super(props)
        this.state = {
            bets: {
                W: [],
                P: [],
                Q: [],
                E: [],
            },
            result: '',
        }

        this.updateBets = this.updateBets.bind(this)
        this.updateResult = this.updateResult.bind(this)
    }

    updateBets (bets) {
        this.setState({bets })
    }

    updateResult (result) {
        this.setState({result })
    }

    render () {
        return (
            <div>
                <div className='row dividend-block col-md-12'>
                    <Calculator type='W' bets={this.state.bets} result={this.state.result}>Win</Calculator>
                    <Calculator type='P' bets={this.state.bets} result={this.state.result} showKey={true}>Place</Calculator>
                    <Calculator type='Q' bets={this.state.bets} result={this.state.result}>Quinella</Calculator>
                    <Calculator type='E' bets={this.state.bets} result={this.state.result}>Exact</Calculator>
                    <div className={'result-overlay ' + (this.state.result ? 'not-shown' : '')}>
                        <h2>No result provided</h2>
                    </div>
                </div>
                <div className='row col-md-12'>
                   <BetsInput onChange={this.updateBets} />
                </div>
                <div className='row col-md-12'>
                    <ResultInput onChange={this.updateResult} />
                </div>

                <div className='row col-md-12'>
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
