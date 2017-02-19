/* eslint-env jest */

import React from 'react'
import renderer from 'react-test-renderer'
import { BetsInput } from './bets-input'
import { Calculator } from './calculator'
import { ResultInput } from './result-input'

describe('bets-input', () => {

    it('should render', () => {
        const tree = renderer.create(<BetsInput />)
        expect(tree).toMatchSnapshot()
    })

})

describe('Calculator', () => {

    it('should render', () => {
        const bets = {W: [] }
        const tree = renderer.create(<Calculator bets={bets} type='W' />)
        expect(tree).toMatchSnapshot()
    })

})

describe('ResultInput', () => {

    it('should render', () => {
        const tree = renderer.create(<ResultInput />)
        expect(tree).toMatchSnapshot()
    })

})
