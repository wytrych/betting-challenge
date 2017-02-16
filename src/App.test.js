import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { Win, Place, Exact, Quinella } from './calculators/win'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

describe('calculators', () => {

    describe('Win', () => {

        it('should work fine on an empty list of bets', () => {
            expect(Win([])).toBe('0.00')
        })

        it('should return a dividend of 0.85 (1 - 15% comission) if all bets win', () => {
            const bets = [
                {
                    amount: 2,
                    horse: 1,
                },
                {
                    amount: 4,
                    horse: 1,
                },
                {
                    amount: 6,
                    horse: 1,
                },
            ]

            const result = [1]

            expect(Win(bets, result)).toBe('0.85')
        })

        it('should only count winning bets', () => {
            const bets = [
                {
                    amount: 85,
                    horse: 2,
                },
                {
                    amount: 15,
                    horse: 3,
                },
                {
                    amount: 100,
                    horse: 1,
                },
            ]

            const result = [2]

            expect(Win(bets, result)).toBe('2.00')
        })

        it('should count properly more than one winner', () => {
            const bets = [
                {
                    amount: 19.25,
                    horse: 3,
                },
                {
                    amount: 23.25,
                    horse: 3,
                },
                {
                    amount: 42.5,
                    horse: 4,
                },
                {
                    amount: 30,
                    horse: 2,
                },
                {
                    amount: 85,
                    horse: 1,
                },
            ]

            const result = [3]

            expect(Win(bets, result)).toBe('4.00')
        })

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 3,
                    horse: 1,
                },
                {
                    amount: 4,
                    horse: 2,
                },
                {
                    amount: 5,
                    horse: 3,
                },
                {
                    amount: 4,
                    horse: 4,
                },
                {
                    amount: 16,
                    horse: 1,
                },
                {
                    amount: 8,
                    horse: 2,
                },
                {
                    amount: 22,
                    horse: 3,
                },
                {
                    amount: 57,
                    horse: 4,
                },
                {
                    amount: 42,
                    horse: 1,
                },
                {
                    amount: 98,
                    horse: 2,
                },
                {
                    amount: 63,
                    horse: 3,
                },
                {
                    amount: 15,
                    horse: 4,
                },
            ]

            const results = [2, 3, 1]

            expect(Win(bets, results)).toBe('2.60')
        })
    })

    describe('Place', () => {

        it('should work fine on an empty list of bets', () => {
            expect(Place([])).toEqual(['0.00', '0.00', '0.00'])
        })

        it('should work fine with one voter', () => {
            const bets = [
                {
                    amount: 10,
                    horse: 1,
                },
            ]

            const results = [1, 2, 3]

            expect(Place(bets, results)).toEqual(['0.29', 'Infinity', 'Infinity'])
        })

        it('should work fine with two voters', () => {
            const bets = [
                {
                    amount: 10,
                    horse: 1,
                },
                {
                    amount: 10,
                    horse: 2,
                },
            ]

            const results = [1, 2, 3]

            expect(Place(bets, results)).toEqual(['0.59', '0.59', 'Infinity'])
        })

        it('should work fine with three voter, one that lost', () => {
            const bets = [
                {
                    amount: 10,
                    horse: 1,
                },
                {
                    amount: 10,
                    horse: 2,
                },
                {
                    amount: 10,
                    horse: 3,
                },
            ]

            const results = [1, 2, 4, 3]

            expect(Place(bets, results)).toEqual(['0.88', '0.88', 'Infinity'])
        })

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 31,
                    horse: 1,
                },
                {
                    amount: 89,
                    horse: 2,
                },
                {
                    amount: 28,
                    horse: 3,
                },
                {
                    amount: 72,
                    horse: 4,
                },
                {
                    amount: 40,
                    horse: 1,
                },
                {
                    amount: 16,
                    horse: 2,
                },
                {
                    amount: 82,
                    horse: 3,
                },
                {
                    amount: 52,
                    horse: 4,
                },
                {
                    amount: 18,
                    horse: 1,
                },
                {
                    amount: 74,
                    horse: 2,
                },
                {
                    amount: 39,
                    horse: 3,
                },
                {
                    amount: 105,
                    horse: 4,
                },
            ]

            const results = [2, 3, 1]

            expect(Place(bets, results)).toEqual(['1.06', '1.27', '2.13'])

        })
        
    })

    describe('Exact', () => {

        it('should work on an empty list', () => {
            expect(Exact([])).toEqual('0.00')
        })

        it('should work with one voter', () => {
            const bets = [
                {
                    amount: 10,
                    horses: [1, 2]
                }
            ]

            const results = [1, 2]

            expect(Exact(bets, results)).toBe('0.82')
        })

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 13,
                    horses: [1, 2],
                },
                {
                    amount: 98,
                    horses: [2, 3],
                },
                {
                    amount: 82,
                    horses: [1, 3],
                },
                {
                    amount: 27,
                    horses: [3, 2],
                },
                {
                    amount: 5,
                    horses: [1, 2],
                },
                {
                    amount: 61,
                    horses: [2, 3],
                },
                {
                    amount: 28,
                    horses: [1, 3],
                },
                {
                    amount: 25,
                    horses: [3, 2],
                },
                {
                    amount: 81,
                    horses: [1, 2],
                },
                {
                    amount: 47,
                    horses: [2, 3],
                },
                {
                    amount: 93,
                    horses: [1, 3],
                },
                {
                    amount: 51,
                    horses: [3, 2],
                },
            ]

            const result = [2, 3, 1]

            expect(Exact(bets, result)).toBe('2.43')
        })
    })

    describe('Quinella', () => {

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 19,
                    horses: [1, 2]
                },
                {
                    amount: 77,
                    horses: [2, 3]
                },
                {
                    amount: 26,
                    horses: [1, 3]
                },
                {
                    amount: 63,
                    horses: [2, 4]
                },
                {
                    amount: 66,
                    horses: [1, 2]
                },
                {
                    amount: 82,
                    horses: [2, 3]
                },
                {
                    amount: 90,
                    horses: [1, 3]
                },
                {
                    amount: 48,
                    horses: [2, 4]
                },
                {
                    amount: 18,
                    horses: [1, 2]
                },
                {
                    amount: 93,
                    horses: [2, 3]
                },
                {
                    amount: 62,
                    horses: [1, 3]
                },
                {
                    amount: 25,
                    horses: [2, 4]
                },
            ]

            const results = [2, 3, 1]

            expect(Quinella(bets, results)).toBe('2.18')
        })
    })

})
