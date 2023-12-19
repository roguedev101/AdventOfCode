const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let times = []
let bestDistances = []
rl.on('line', (line) => {
    if (line.includes('Time')) {
        let [name, numbers] = line.split(/:\s+/)
        numbers.trim().split(/\s+/).map((number) => {
            times.push(parseInt(number))
        })
    }

    if (line.includes('Distance')) {
        let [name, numbers] = line.split(/:\s+/)
        numbers.trim().split(/\s+/).map((number) => {
            bestDistances.push(parseInt(number))
        })
    }
})

rl.on('close', () => {
    console.log('Result (Part 1): ' + part1())
    console.log('Result (Part 2): ' + part2())
})

function getRaceDistance (pressTime, raceTime) {
    return (raceTime - (raceTime - pressTime)) * (raceTime - pressTime)
}

function part1 () {
    let allFasterWays = []
    times.forEach((time, i) => {
        let fasterWays = 0
        for (var j = 1; j < time; j++) {
            if (getRaceDistance(j, time) > bestDistances[i]) {
                fasterWays++
            }
        }
        allFasterWays.push(fasterWays)
    })
    return allFasterWays.reduce((accumulator, val) => accumulator * val, 1)
}

function part2 () {
    let fasterWays = 0
    let combinedTime = parseInt(times.join(''))
    let combinedDistance = parseInt(bestDistances.join(''))
    for (var j = 1; j < combinedTime; j++) {
        if (getRaceDistance(j, combinedTime) > combinedDistance) {
            fasterWays++
        }
    }
    return fasterWays
}
