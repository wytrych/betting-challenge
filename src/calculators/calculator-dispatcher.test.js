import { calculate, parseBet, parseBetsList, parseResult } from './calculator-dispatcher'
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
            calculate('D')
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
        calculate('W', bets, result)
        expect(Win).toHaveBeenCalledWith(bets.W, result)

        expect(Place).not.toHaveBeenCalled()
        calculate('P', bets, result)
        expect(Place).toHaveBeenCalledWith(bets.P, result)

        expect(Quinella).not.toHaveBeenCalled()
        calculate('Q', bets, result)
        expect(Quinella).toHaveBeenCalledWith(bets.Q, result)

        expect(Exact).not.toHaveBeenCalled()
        calculate('E', bets, result)
        expect(Exact).toHaveBeenCalledWith(bets.E, result)
    })

})

describe('parseBet', () => {

    it('should take a single bet and transform it into an object', () => {

        expect(parseBet('W:3:5')).toEqual({
            type: 'W',
            horses: [3],
            amount: 5,
        })

        expect(parseBet('P:1:55')).toEqual({
            type: 'P',
            horses: [1],
            amount: 55,
        })

        expect(parseBet('Q:3,9:20')).toEqual({
            type: 'Q',
            horses: [3, 9],
            amount: 20,
        })

        expect(parseBet('E:1,3:15')).toEqual({
            type: 'E',
            horses: [1, 3],
            amount: 15,
        })

    })

    it('should error when the bet is malformed', () => {
        
        expect(() => {
            parseBet('W:2,1:2')
        }).toThrow('Malformed bet: W:2,1:2')
        
        expect(() => {
            parseBet('Z:1:2')
        }).toThrow('Malformed bet: Z:1:2')
        
        expect(() => {
            parseBet('foo')
        }).toThrow('Malformed bet: foo')
        
    })
    
})

describe('parseBetsList', () => {
    
    it('should parse the list and create separate bet lists for each product', () => {
        const bets = [
            'W:1:2',
            'W:2:4',
            'Q:3,2:10',
            'P:3:13',
            'E:3,4:9',
        ]

        const expectedResult = {
            W: [{horses: [1], amount: 2}, {horses: [2], amount: 4}],
            Q: [{horses: [3, 2], amount: 10}],
            P: [{horses: [3], amount: 13}],
            E: [{horses: [3, 4], amount: 9}],
        }

        expect(parseBetsList(bets)).toEqual(expectedResult)
    })

    it('should error when wrong bets were found', () => {
        const bets = [
            'foo',
            'W:2:4',
            'bar',
        ]

        const errorMessage = 'Errors were found:\n' +
            'Malformed bet: foo\n' +
            'Malformed bet: bar'

        expect(() => {
            parseBetsList(bets)
        }).toThrow(errorMessage)
        
    })
    
})

describe('parseResult', () => {
    
    it('should process a correct result', () => {
        expect(parseResult('R:1:2:3')).toEqual([1, 2, 3])
    })

    it('should error when the result is malformed', () => {

        expect(() => {
            parseResult('R:1:3')
        }).toThrow('Malformed result')
        
        expect(() => {
            parseResult('R:a:3:1')
        }).toThrow('Malformed result')
        
        expect(() => {
            parseResult('foo')
        }).toThrow('Malformed result')
        
    })
    
    
})

