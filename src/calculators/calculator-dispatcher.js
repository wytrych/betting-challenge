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
