const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

let total = 0
rl.on('line', (line) => {
    let firstNumber = null
    let lastNumber = null
    line.split("").forEach((char, i) => {
        if (!isNaN(char)) {
            if (!firstNumber) {
                firstNumber = char
            }
            lastNumber = char
        }
    })
    total += parseInt(firstNumber + lastNumber)
})

rl.on('close', () => {
    console.log(total);
})
