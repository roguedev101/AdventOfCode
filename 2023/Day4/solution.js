const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let allCardData = []
rl.on('line', (line) => {
    let [cardID, cardData] = line.split(': ')
    let [winningNumbersString, chosenNumbersString] = cardData.trim().split(' | ')

    allCardData.push({
        'cardID': cardID,
        'winningNumbers': winningNumbersString.trim().split(/\s+/),
        'chosenNumbers': chosenNumbersString.trim().split(/\s+/)
    })
})

rl.on('close', () => {
    console.log('Result (Part 1): ' + part1())
    console.log('Result (Part 2): ' + part2())
})

function part1 () {
    let totalPoints = 0
    allCardData.forEach((card) => {
        let cardPoints = 0
        card.chosenNumbers.forEach((number) => {
            if (card.winningNumbers.includes(number)) {
                cardPoints = (cardPoints == 0) ? 1 : cardPoints * 2
            }
        })
        totalPoints += cardPoints
    })
    return totalPoints
}

function part2 () {
    let cardInstances = Array(allCardData.length).fill(1)
    allCardData.forEach((card, i) => {
        let numberOfMatches = 0
        card.chosenNumbers.forEach((number) => {
            if (card.winningNumbers.includes(number)) {
                numberOfMatches++
            }
        })
        for (var j = 0; j < numberOfMatches + 1; j++) {
            cardInstances[i+j] += (j == 0) ? 0 : cardInstances[i]
        }
    })
    return cardInstances.reduce((accumulator, val) => accumulator + val, 0)
}
