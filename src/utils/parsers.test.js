import { calculateDividends, parseBet, parseBetsList, parseResult } from './parsers'

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
        
        expect(() => {
            parseBet('XX W:1:2')
        }).toThrow('Malformed bet: XX W:1:2')
        
        expect(() => {
            parseBet('W:1:2 XX')
        }).toThrow('Malformed bet: W:1:2 XX')
        
        expect(() => {
            parseBet('XX Q:1,2:2')
        }).toThrow('Malformed bet: XX Q:1,2:2')
        
        expect(() => {
            parseBet('Q:1,2:2 XX')
        }).toThrow('Malformed bet: Q:1,2:2 XX')
        
    })

    it('should error when Quinella or Exact have the same numbers', () => {
        
        expect(() => {
            parseBet('Q:1,1:2')
        }).toThrow('Horse numbers must be different: Q:1,1:2')
        
        expect(() => {
            parseBet('E:1,1:2')
        }).toThrow('Horse numbers must be different: E:1,1:2')
        
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

    it('should ignore empty entries', () => {
        const bets = [
            'W:1:4',
            '',
            'P:2:3',
        ]

        const expectedResult = {
            W: [{horses: [1], amount: 4}],
            P: [{horses: [2], amount: 3}],
            Q: [],
            E: [],
        }

        expect(parseBetsList(bets)).toEqual(expectedResult)
    })
    
    it('should return lineNumbers property on the Error object', () => {
        const bets = [
            'W:1:4',
            'foo',
            'bar',
        ]

        try {
            parseBetsList(bets)
        } catch (e) {
            expect(e.erroredLines).toEqual([1, 2])
        }
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
            parseResult('R:1:3:2sdsd')
        }).toThrow('Malformed result')
        
        expect(() => {
            parseResult('asdsaR:1:3:2')
        }).toThrow('Malformed result')
        
        expect(() => {
            parseResult('R:a:3:1')
        }).toThrow('Malformed result')
        
        expect(() => {
            parseResult('foo')
        }).toThrow('Malformed result')
        
    })
    
    it('should error when the horse numbers are not different', () => {

        expect(() => {
            parseResult('R:1:1:1')
        }).toThrow('Horse numbers must be different')
        
        expect(() => {
            parseResult('R:1:2:1')
        }).toThrow('Horse numbers must be different')
        
    })
    
})
