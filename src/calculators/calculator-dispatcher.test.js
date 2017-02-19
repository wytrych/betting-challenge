/* eslint-env jest */

import { calculateDividends } from './calculator-dispatcher'
import { win, place, quinella, exact } from './calculators'

jest.mock('./calculators', () => ({
    win: jest.fn(),
    place: jest.fn(),
    quinella: jest.fn(),
    exact: jest.fn(),
}))

describe('calculator dispatcher', () => {

    it('should error if type is not valid', () => {
        expect(() => {
            calculateDividends('D')
        }).toThrow('Type "D" is invalid')
    })

    it('should call the appropriate functions with right arguments when type is valid', () => {
        const bets = {
            W: [],
            Q: [],
            P: [],
            E: [],
        }
        const result = []

        expect(win).not.toHaveBeenCalled()
        calculateDividends('W', bets, result)
        expect(win).toHaveBeenCalledWith(bets.W, result, 0.1)

        expect(place).not.toHaveBeenCalled()
        calculateDividends('P', bets, result)
        expect(place).toHaveBeenCalledWith(bets.P, result, 0.1)

        expect(quinella).not.toHaveBeenCalled()
        calculateDividends('Q', bets, result)
        expect(quinella).toHaveBeenCalledWith(bets.Q, result, 0.1)

        expect(exact).not.toHaveBeenCalled()
        calculateDividends('E', bets, result)
        expect(exact).toHaveBeenCalledWith(bets.E, result, 0.1)
    })

})
