const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

const line_counter = ((i = -1) => () => ++i)()

let seedsToPlant = []
let almanacData = {}
let almanacPointer = ''

rl.on('line', (line, i = line_counter()) => {
    if (i == 0) {
        seedsToPlant = line.split(': ')[1].trim().split(' ').map((number) => parseInt(number))
    } else {
        if (line.includes(' map:')) {
            almanacPointer = line.split(' ')[0]
            almanacData[almanacPointer] = []
        } else if (line !== '') {
            let numbers = line.trim().split(' ').map((number) => parseInt(number))
            almanacData[almanacPointer].push(numbers)
        }
    }
})

rl.on('close', () => {
    console.log('Result (Part 1): ' + part1())
    console.log('Result (Part 2): ' + part2())
})

function part1 () {
    let minLocation = Number.MAX_VALUE
    seedsToPlant.forEach((seed) => {
        let currentVal = seed
        let path = [currentVal]
        Object.keys(almanacData).forEach((map) => {
            let remapped = false
            almanacData[map].forEach((mapArray, i) => {
                if (!remapped && currentVal >= mapArray[1] && currentVal < mapArray[1] + mapArray[2]) {
                    currentVal += (mapArray[0] - mapArray[1])
                    remapped = true
                }
            })
        })
        if (currentVal < minLocation) {
            minLocation = currentVal
        }
    })
    return minLocation
}

function part2 () {
    let minLocation = Infinity
    for (var i = 0; i < seedsToPlant.length; i+=2) {
        for (var j = seedsToPlant[i]; j < (seedsToPlant[i] + seedsToPlant[i+1] - 1); j++) {
            let currentVal = j
            Object.keys(almanacData).forEach((map) => {
                let remapped = false
                almanacData[map].forEach((mapArray, i) => {
                    if (!remapped && currentVal >= mapArray[1] && currentVal < mapArray[1] + mapArray[2]) {
                        currentVal += (mapArray[0] - mapArray[1])
                        remapped = true
                    }
                })
            })
            if (currentVal < minLocation) {
                minLocation = currentVal
            }
        }
    }
    return minLocation
}
