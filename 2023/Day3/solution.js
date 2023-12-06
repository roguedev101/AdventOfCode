const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let dataGrid = []
rl.on('line', (line) => {
    dataGrid.push(line.trim().split(''))
})

rl.on('close', () => {
    console.log('Result (Part 1): ' + part1())
    console.log('Result (Part 2): ' + part2())
})

// Start Here
function part1() {
    let partNumbers = []
    let currentPartNumber = ''
    let validPartNumber = false
    dataGrid.forEach((row, i) => {
        row.forEach((char, j) => {
            if (!validPartNumber && !isNaN(char) && nextToPart(dataGrid, i, j)) {
                validPartNumber = true
            }

            if (!isNaN(char)) {
                currentPartNumber += char
            } else if (validPartNumber) {
                partNumbers.push(parseInt(currentPartNumber))
                currentPartNumber = ''
                validPartNumber = false
            } else {
                currentPartNumber = ''
                validPartNumber = false
            }
        })
    })

    let total = 0
    partNumbers.forEach((number) => {total += number})
    return total
}

function part2() {
    let partNumbers = new Map()
    let currentPartNumber = ''
    let currentGearPos = null
    let validPartNumber = false

    dataGrid.forEach((row, i) => {
        row.forEach((char, j) => {
            if (!validPartNumber && !isNaN(char) && nextToPart(dataGrid, i, j)) {
                validPartNumber = true
            }

            if (!currentGearPos) {
                let pos = nextToPart(dataGrid, i, j, '*')
                currentGearPos = pos ? pos.join('-') : pos
            }

            if (!isNaN(char)) {
                currentPartNumber += char
            } else if (validPartNumber && currentGearPos) {
                if (partNumbers.has(currentGearPos)) {
                    partNumbers.set(currentGearPos, {
                        'number': parseInt(currentPartNumber) * partNumbers.get(currentGearPos).number,
                        'count': partNumbers.get(currentGearPos).count + 1
                    })
                } else {
                    partNumbers.set(currentGearPos, {
                        'number': parseInt(currentPartNumber),
                        'count': 1
                    })
                }
                currentPartNumber = ''
                currentGearPos = null
                validPartNumber = false
            } else {
                currentPartNumber = ''
                currentGearPos = null
                validPartNumber = false
            }
        })
    })

    let total = 0
    partNumbers.forEach((part) => {
        if (part.count > 1) {
            total += part.number
        }
    })
    return total
}


// Helpers
function nextToPart(data, x, y, specificPart = null) {
    const dirs = [
        [1, 1],
        [1, 0],
        [1, -1],
        [0, 1],
        [0, -1],
        [-1, 1],
        [-1, 0],
        [-1, -1],
    ]

    const neighbors = []
    const numRows = data.length
    const numCols = data[0].length

    for (const [dx, dy] of dirs) {
        const newX = x + dx
        const newY = y + dy

        if (newX >= 0 && newX < numRows && newY >= 0 && newY < numCols) {
            let char = data[newX][newY]
            if (char === specificPart) {
                return [newX, newY]
            } else if (isNaN(char) && char !== '.') {
                return [newX, newY]
            }
        }
    }

    return null
}
