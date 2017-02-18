import { Win, Place, Quinella, Exact } from './calculators'

export function calculate (type, bets, result) {
    const calculators = {
        'W': Win,
        'P': Place,
        'Q': Quinella,
        'E': Exact,
    }

    if (!Object.keys(calculators).includes(type))
        throw new Error(`Type "${type}" is invalid`)

    return calculators[type](bets[type], result)
}

export function parseResult (rawResult) {
    const resultRegex = /R:\d+:\d+:\d+/

    if (!rawResult.match(resultRegex))
        throw new Error('Malformed result')

    return rawResult.split(':').slice(1).map((result) => parseInt(result, 10))
}

export function parseBet (bet) {
    const winPlaceRegex = /([WP]):(\d+):(\d+)/
    const quinellaExactRegex = /([QE]):(\d+,\d+):(\d+)/
    const winPlaceMatch = bet.match(winPlaceRegex)
    const quinellaExactMatch = bet.match(quinellaExactRegex)

    if (!winPlaceMatch && !quinellaExactMatch)
        throw new Error(`Malformed bet: ${bet}`)

    const match = winPlaceMatch || quinellaExactMatch

    return {
        type: match[1],
        amount: parseInt(match[3], 10),
        horses: match[2].split(',').map((horse) => parseInt(horse, 10))
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

    bets.forEach((bet) => {
        try {
            const parsedBet = parseBet(bet)
            betsBuckets[parsedBet.type].push({
                horses: parsedBet.horses,
                amount: parsedBet.amount,
            })
        } catch (e) {
            errors.push(e.message)
        }
    })

    if (errors.length)
        throw new Error('Errors were found:\n' + errors.join('\n'))
    
    return betsBuckets
}
