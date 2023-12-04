const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

const allowedColorCounts = {
    'red': 12,
    'green': 13,
    'blue': 14
}

let totalSumID = 0
rl.on('line', (line) => {
    let gameStillPossible = true

    let [gameID, gameData] = line.split(': ')
    let revealedSubjects = gameData.split('; ')

    let revealedSubjectsDetails = revealedSubjects.map((revealedSubject) => {
        return revealedSubject.split(', ')
    })

    revealedSubjectsDetails.map((details) => {
        details.forEach((revealedItem, i) => {
            let [count, color] = revealedItem.split(' ')
            if (gameStillPossible && count > allowedColorCounts[color]) {
                gameStillPossible = false
            }
        })
    })

    if (gameStillPossible) {
        totalSumID += parseInt(gameID.split(' ')[1])
    }
})

rl.on('close', () => {
    console.log(totalSumID)
})
