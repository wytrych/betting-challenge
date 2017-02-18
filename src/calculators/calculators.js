export const EMPTY_MESSAGE = 'No winning bets'
export const DEFAULT_COMISSIONS = {
    Q: 0.18,
    E: 0.18,
    W: 0.15,
    P: 0.12,
}

export function Quinella (bets, result, comission = DEFAULT_COMISSIONS.Q) {
    function winningCondition (bet) {
        const winningPair = result.slice(0, 2)
        return winningPair.includes(bet.horses[0]) && winningPair.includes(bet.horses[1])
    }

    return Order(bets, result, comission, winningCondition)
}

export function Exact (bets, result, comission = DEFAULT_COMISSIONS.E) {
    function winningCondition (bet) {
        return bet.horses[0] === result[0] && bet.horses[1] === result[1]
    }

    return Order(bets, result, comission, winningCondition)
}

export function Win (bets, result, comission = DEFAULT_COMISSIONS.W) {
    const numOfPlaces = 1
    return Places(numOfPlaces, bets, result, comission)
}

export function Place (bets, result, comission = DEFAULT_COMISSIONS.P) {
    const numOfPlaces = 3
    return Places(numOfPlaces, bets, result, comission)
}

function Order (bets, result, comission, winningCondition) {
    const numOfPlaces = 1

    function winningPoolCalculation () {
        return calculateWinningPool(bets, winningCondition)
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, winningPoolCalculation)
}

function Places (numOfPlaces, bets, result, comission) {
    function winningPoolCalculation (place) {
        function winningCondition (bet) {
            return bet.horses[0] === place
        }

        return calculateWinningPool(bets, winningCondition)
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, winningPoolCalculation)
}

function calculateWinningPool (bets, winningCondition) {
    const winningBets = bets.filter(winningCondition)
    return winningBets.reduce(sumBets, 0)
}

function dividendsPerPlace (numOfPlaces, comission, bets, result, winningPoolCalculation) {
    if (!bets || !bets.length || !result || !result.length)
        return [EMPTY_MESSAGE, EMPTY_MESSAGE, EMPTY_MESSAGE].slice(0, numOfPlaces)

    const netBets = bets.map((bet) => ({
        ...bet,
        amount: bet.amount * (1 - comission),
    }))
    const netPool = netBets.reduce(sumBets, 0)
    const netPoolPerPlace = netPool / numOfPlaces
    const winningPoolPerPlace = result.slice(0, numOfPlaces).map(winningPoolCalculation)

    return winningPoolPerPlace.map((winningPool) => calculateDividend(netPoolPerPlace, winningPool))
}

function calculateDividend (netPool, winningPool) {
    const dividend = (netPool / winningPool).toFixed(2)
    if (isFinite(dividend))
        return dividend

    return EMPTY_MESSAGE
}

function sumBets (sum, bet) {
    return sum += bet.amount
}

