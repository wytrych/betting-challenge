import { win, place, quinella, exact } from './calculators'

export function calculateDividends (type, bets, result, comission = 0.10) {
    const calculators = {
        W: win,
        P: place,
        Q: quinella,
        E: exact,
    }

    if (!Object.keys(calculators).includes(type))
        throw new Error(`Type "${type}" is invalid`)

    return calculators[type](bets[type], result, comission)
}
