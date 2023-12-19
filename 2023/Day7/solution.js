const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let hands = []
rl.on('line', (line) => {
    let [hand, bid] = line.split(' ')
    hands.push({
        bid: parseInt(bid),
        hand: hand.split(''),
        value: 0
    })
})

rl.on('close', () => {
    console.log('Result (Part 1): ' + part1())
    console.log('Result (Part 2): ' + part2())
})

function part1() {
    hands.forEach((hand, i) => {
        let countedHand = countCard(hand.hand)
        hand.value = handEval(countedHand)
    })

    hands.sort((a, b) => {
        if (a.value == b.value) {
            for (var i = 0; i < 5; i++) {
                if (getCardValue(a.hand[i]) != getCardValue(b.hand[i])) {
                    return getCardValue(a.hand[i]) - getCardValue(b.hand[i])
                }
            }
        } else {
            return a.value - b.value
        }
    })

    let result = 0
    for (var i = 0; i < hands.length; i++) {
        result += (i+1) * hands[i].bid
    }
    return result
}

function part2() {
    hands.forEach((hand, i) => {
        let countedHand = countCard(hand.hand)
        let jCount = countedHand.find((cHand) => cHand.number == 'J')
        if (jCount) {
            let highestCounted = -1
            let highestCountedIndex = -1
            countedHand.forEach((card, i) => {
                if (card.count > highestCounted && card.number != 'J') {
                    highestCounted = card.count
                    highestCountedIndex = i
                }
            })
            if (highestCountedIndex > -1) {
                countedHand[highestCountedIndex].count += jCount.count
                countedHand = countedHand.filter((card) => card.number != 'J')
            }
        }
        hand.value = handEval(countedHand)
    })

    hands.sort((a, b) => {
        if (a.value == b.value) {
            for (var i = 0; i < 5; i++) {
                if (getCardValue(a.hand[i], 'J23456789TQKA') != getCardValue(b.hand[i]), 'J23456789TQKA') {
                    return getCardValue(a.hand[i], 'J23456789TQKA') - getCardValue(b.hand[i], 'J23456789TQKA')
                }
            }
        } else {
            return a.value - b.value
        }
    })

    let result = 0
    for (var i = 0; i < hands.length; i++) {
        result += (i+1) * hands[i].bid
    }
    return result
}

function countCard(hand) {
    let cardCounts = []
    hand.forEach((card) => {
        let cardCount = cardCounts.find((cardCount) => cardCount.number == card)
        if (cardCount) {
            cardCount.count++
        } else {
            cardCounts.push({
                number: card,
                count: 1
            })
        }
    })
    return cardCounts
}


function handEval(hand) {
    let countArray = hand.sort((a, b) => a.count - b.count).reverse()
    if (countArray[0].count == 5) {
        return 6
    } else if (countArray[0].count == 4) {
        return 5
    } else if (countArray[0].count == 3 && countArray[1].count == 2) {
        return 4
    } else if (countArray[0].count == 3) {
        return 3
    } else if (countArray[0].count == 2 && countArray[1].count == 2) {
        return 2
    } else if (countArray[0].count == 2) {
        return 1
    } else {
        return 0
    }
}

function getCardValue(card, cardStrength = '23456789TJQKA') {
    let cardValue = -1
    cardStrength.split('').forEach((cardStrengthItem, i) => {
        if (card == cardStrengthItem) {
            cardValue = i
        }
    })
    return cardValue
}
