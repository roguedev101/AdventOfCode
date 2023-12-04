const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let sumOfCubePowers = 0
rl.on('line', (line) => {
    let [gameID, gameData] = line.split(': ')
    let revealedSubjects = gameData.split('; ')

    let revealedSubjectsDetails = revealedSubjects.map((revealedSubject) => {
        return revealedSubject.split(', ')
    })

    let lowestCube = {
        'red': 0,
        'green': 0,
        'blue': 0
    }

    revealedSubjectsDetails.map((details) => {
        details.forEach((revealedItem, i) => {
            let [count, color] = revealedItem.split(' ')
            if (lowestCube[color] < count) {
                lowestCube[color] = parseInt(count)
            }
        })
    })

    sumOfCubePowers += lowestCube.red * lowestCube.green * lowestCube.blue
})

rl.on('close', () => {
    console.log(sumOfCubePowers)
})
