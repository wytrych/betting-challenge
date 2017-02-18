import { Win, Place, Quinella, Exact } from './calculators'

export function calculateDividends (type, bets, result, comission = 0.10) {
    const calculators = {
        'W': Win,
        'P': Place,
        'Q': Quinella,
        'E': Exact,
    }

    if (!Object.keys(calculators).includes(type))
        throw new Error(`Type "${type}" is invalid`)

    return calculators[type](bets[type], result, comission)
}

export function parseResult (rawResult) {
    const resultRegex = /R:\d+:\d+:\d+/

    if (!rawResult.match(resultRegex))
        throw new Error('Malformed result')

    const result = rawResult.split(':').slice(1).map((result) => parseInt(result, 10))
    const resultSet = new Set(result)

    if (resultSet.size !== result.length)
        throw new Error('Horse numbers must be different')

    return result
}

export function parseBet (bet) {
    const winPlaceRegex = /^([WP]):(\d+):(\d+)$/
    const quinellaExactRegex = /^([QE]):(\d+,\d+):(\d+)$/
    const winPlaceMatch = bet.match(winPlaceRegex)
    const quinellaExactMatch = bet.match(quinellaExactRegex)

    if (!winPlaceMatch && !quinellaExactMatch)
        throw new Error(`Malformed bet: ${bet}`)

    const match = winPlaceMatch || quinellaExactMatch
    const horses = match[2].split(',').map((horse) => parseInt(horse, 10))

    if (quinellaExactMatch && horses[0] === horses[1])
        throw new Error(`Horse numbers must be different: ${bet}`)

    return {
        type: match[1],
        amount: parseInt(match[3], 10),
        horses, 
    }
}

class BetsListError extends Error {
    constructor (message, erroredLines) {
        super(message)
        this.erroredLines = erroredLines
    }
}

export function parseBetsList (bets) {
    const betsBuckets = {
        W: [],
        P: [],
        Q: [],
        E: [],
    }

    const errors = []
    const erroredLines = []

    bets
        .filter((bet) => bet !== '')
        .forEach((bet, i) => {
            try {
                const parsedBet = parseBet(bet)
                betsBuckets[parsedBet.type].push({
                    horses: parsedBet.horses,
                    amount: parsedBet.amount,
                })
            } catch (e) {
                errors.push(e.message)
                erroredLines.push(i)
            }
    })

    if (errors.length) {
        const errorMessage = 'Errors were found:\n' + errors.join('\n')
        throw new BetsListError(errorMessage, erroredLines)
    }
    
    return betsBuckets
}
