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
    let numbers = line.split("").filter((char) => !isNaN(char))
    total += parseInt(numbers[0] + numbers[numbers.length - 1])
})

rl.on('close', () => {
    console.log(total);
})
