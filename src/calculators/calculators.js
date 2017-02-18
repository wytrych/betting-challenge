export function calculate () {
    Win([])
}

export function Quinella (bets, result, comission = 0.18) {
    const numOfPlaces = 1

    function mapFunction () {
        return calculateBetsGrossPool(bets, (bet) => {
            const winningPair = result.slice(0, 2)
            return winningPair.includes(bet.horses[0]) && winningPair.includes(bet.horses[1])
        }) 
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, mapFunction)[0]
}

export function Exact (bets, result, comission = 0.18) {
    const numOfPlaces = 1

    function mapFunction () {
        return calculateBetsGrossPool(bets, (bet) => bet.horses[0] === result[0] && bet.horses[1] === result[1]) 
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, mapFunction)[0]
}

export function Win (bets, result, comission = 0.15) {
    const numOfPlaces = 1

    function mapFunction (horse) {
        return calculateBetsGrossPool(bets, (bet) => bet.horses[0] === horse)
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, mapFunction)[0]
}

export function Place (bets, result, comission = 0.12) {
    const numOfPlaces = 3

    function mapFunction (horse) {
        return calculateBetsGrossPool(bets, (bet) => bet.horses[0] === horse)
    }

    return dividendsPerPlace(numOfPlaces, comission, bets, result, mapFunction)
}

function calculateBetsGrossPool (bets, filterFunction) {
    const betsForThisHorse = bets.filter(filterFunction)
    return betsForThisHorse.reduce(sumBets, 0)
}

function dividendsPerPlace (numOfPlaces, comission, bets, result, mapFunction) {
    if (!bets || !bets.length || !result || !result.length)
        return ['0.00', '0.00', '0.00']

    const netBets = bets.map((bet) => ({
        ...bet,
        amount: bet.amount * (1 - comission),
    }))
    const netPool = netBets.reduce(sumBets, 0)
    const netPoolPerPlace = netPool / numOfPlaces
    const grossPools = result.slice(0, numOfPlaces).map(mapFunction)

    return grossPools.map((grossPool) => calculateDividend(netPoolPerPlace, grossPool))
}

function sumBets (sum, bet) {
    return sum += bet.amount
}

function calculateDividend (netPool, grossPool) {
    return (netPool / grossPool).toFixed(2)
}
