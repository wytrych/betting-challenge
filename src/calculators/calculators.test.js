/* eslint-env jest */

import { win, place, exact, quinella, EMPTY_MESSAGE } from './calculators'

describe('calculators', () => {

    describe('win', () => {

        it('should work fine with no arguments', () => {
            expect(win()).toEqual([EMPTY_MESSAGE])
        })

        it('should work fine on an empty list of bets', () => {
            expect(win([])).toEqual([EMPTY_MESSAGE])
        })

        it('should work fine with an empty result', () => {
            expect(win([{amount: 1, horses: [1]}], null)).toEqual([EMPTY_MESSAGE])
            expect(win([{amount: 1, horses: [1]}], [])).toEqual([EMPTY_MESSAGE])
        })


        it('should return a dividend of 0.85 (1 - 15% comission) if all bets win', () => {
            const bets = [
                {
                    amount: 2,
                    horses: [1],
                },
                {
                    amount: 4,
                    horses: [1],
                },
                {
                    amount: 6,
                    horses: [1],
                },
            ]

            const result = [1]

            expect(win(bets, result)).toEqual(['0.85'])
        })

        it('should allow to pass a different comission rate', () => {
            const bets = [
                {
                    amount: 2,
                    horses: [1],
                },
                {
                    amount: 4,
                    horses: [1],
                },
                {
                    amount: 6,
                    horses: [1],
                },
            ]

            const result = [1]
            const comission = 0.10

            expect(win(bets, result, comission)).toEqual(['0.90'])
        })

        it('should only count winning bets', () => {
            const bets = [
                {
                    amount: 85,
                    horses: [2],
                },
                {
                    amount: 15,
                    horses: [3],
                },
                {
                    amount: 100,
                    horses: [1],
                },
            ]

            const result = [2]

            expect(win(bets, result)).toEqual(['2.00'])
        })

        it('should count properly more than one winner', () => {
            const bets = [
                {
                    amount: 19.25,
                    horses: [3],
                },
                {
                    amount: 23.25,
                    horses: [3],
                },
                {
                    amount: 42.5,
                    horses: [4],
                },
                {
                    amount: 30,
                    horses: [2],
                },
                {
                    amount: 85,
                    horses: [1],
                },
            ]

            const result = [3]

            expect(win(bets, result)).toEqual(['4.00'])
        })

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 3,
                    horses: [1],
                },
                {
                    amount: 4,
                    horses: [2],
                },
                {
                    amount: 5,
                    horses: [3],
                },
                {
                    amount: 5,
                    horses: [4],
                },
                {
                    amount: 16,
                    horses: [1],
                },
                {
                    amount: 8,
                    horses: [2],
                },
                {
                    amount: 22,
                    horses: [3],
                },
                {
                    amount: 57,
                    horses: [4],
                },
                {
                    amount: 42,
                    horses: [1],
                },
                {
                    amount: 98,
                    horses: [2],
                },
                {
                    amount: 63,
                    horses: [3],
                },
                {
                    amount: 15,
                    horses: [4],
                },
            ]

            const results = [2, 3, 1]

            expect(win(bets, results)).toEqual(['2.61'])
        })
    })

    describe('place', () => {

        it('should work fine on an empty list of bets', () => {
            expect(place([])).toEqual([EMPTY_MESSAGE, EMPTY_MESSAGE, EMPTY_MESSAGE])
        })

        it('should work fine with one voter', () => {
            const bets = [
                {
                    amount: 10,
                    horses: [1],
                },
            ]

            const results = [1, 2, 3]

            expect(place(bets, results)).toEqual(['0.29', 'No winning bets', 'No winning bets'])
        })

        it('should work fine with two voters', () => {
            const bets = [
                {
                    amount: 10,
                    horses: [1],
                },
                {
                    amount: 10,
                    horses: [2],
                },
            ]

            const results = [1, 2, 3]

            expect(place(bets, results)).toEqual(['0.59', '0.59', 'No winning bets'])
        })

        it('should work fine with three voter, one that lost', () => {
            const bets = [
                {
                    amount: 10,
                    horses: [1],
                },
                {
                    amount: 10,
                    horses: [2],
                },
                {
                    amount: 10,
                    horses: [3],
                },
            ]

            const results = [1, 2, 4, 3]

            expect(place(bets, results)).toEqual(['0.88', '0.88', 'No winning bets'])
        })

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 31,
                    horses: [1],
                },
                {
                    amount: 89,
                    horses: [2],
                },
                {
                    amount: 28,
                    horses: [3],
                },
                {
                    amount: 72,
                    horses: [4],
                },
                {
                    amount: 40,
                    horses: [1],
                },
                {
                    amount: 16,
                    horses: [2],
                },
                {
                    amount: 82,
                    horses: [3],
                },
                {
                    amount: 52,
                    horses: [4],
                },
                {
                    amount: 18,
                    horses: [1],
                },
                {
                    amount: 74,
                    horses: [2],
                },
                {
                    amount: 39,
                    horses: [3],
                },
                {
                    amount: 105,
                    horses: [4],
                },
            ]

            const results = [2, 3, 1]

            expect(place(bets, results)).toEqual(['1.06', '1.27', '2.13'])

        })

    })

    describe('exact', () => {

        it('should work on an empty list', () => {
            expect(exact([])).toEqual([EMPTY_MESSAGE])
        })

        it('should work with one voter', () => {
            const bets = [
                {
                    amount: 10,
                    horses: [1, 2],
                },
            ]

            const results = [1, 2]

            expect(exact(bets, results)).toEqual(['0.82'])
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

            expect(exact(bets, result)).toEqual(['2.43'])
        })
    })

    describe('quinella', () => {

        it('should calculate the example correctly', () => {
            const bets = [
                {
                    amount: 19,
                    horses: [1, 2],
                },
                {
                    amount: 77,
                    horses: [2, 3],
                },
                {
                    amount: 26,
                    horses: [1, 3],
                },
                {
                    amount: 63,
                    horses: [2, 4],
                },
                {
                    amount: 66,
                    horses: [1, 2],
                },
                {
                    amount: 82,
                    horses: [2, 3],
                },
                {
                    amount: 90,
                    horses: [1, 3],
                },
                {
                    amount: 48,
                    horses: [2, 4],
                },
                {
                    amount: 18,
                    horses: [1, 2],
                },
                {
                    amount: 93,
                    horses: [2, 3],
                },
                {
                    amount: 62,
                    horses: [1, 3],
                },
                {
                    amount: 25,
                    horses: [2, 4],
                },
            ]

            const results = [2, 3, 1]

            expect(quinella(bets, results)).toEqual(['2.18'])
        })
    })

})
