import { calculateDividends } from './calculator-dispatcher'
import { Win, Place, Quinella, Exact } from './calculators'

jest.mock('./calculators', () => ({
    Win: jest.fn(),
    Place: jest.fn(),
    Quinella: jest.fn(),
    Exact: jest.fn(),
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

        expect(Win).not.toHaveBeenCalled()
        calculateDividends('W', bets, result)
        expect(Win).toHaveBeenCalledWith(bets.W, result, 0.1)

        expect(Place).not.toHaveBeenCalled()
        calculateDividends('P', bets, result)
        expect(Place).toHaveBeenCalledWith(bets.P, result, 0.1)

        expect(Quinella).not.toHaveBeenCalled()
        calculateDividends('Q', bets, result)
        expect(Quinella).toHaveBeenCalledWith(bets.Q, result, 0.1)

        expect(Exact).not.toHaveBeenCalled()
        calculateDividends('E', bets, result)
        expect(Exact).toHaveBeenCalledWith(bets.E, result, 0.1)
    })

})
