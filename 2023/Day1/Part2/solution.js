const fs = require('fs')
const readline = require('readline')

const args = process.argv.slice(2)
const fileStream = fs.createReadStream(args[0])
const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
})

const speltNumbers = new Map([
    ['one', '1'],
    ['two', '2'],
    ['three', '3'],
    ['four', '4'],
    ['five', '5'],
    ['six', '6'],
    ['seven', '7'],
    ['eight', '8'],
    ['nine', '9'],
    ['[0-9]', '0']
])

const regexPatterns = []
speltNumbers.forEach((value, key, map) => {
    regexPatterns.push( new RegExp(key, 'gi'))
})

let total = 0
rl.on('line', (line) => {
    const lineMatches = []

    regexPatterns.forEach((pattern, index) => {let match
        while ((match = pattern.exec(line)) !== null) {
            const matchInfo = {
                number: isNaN(match[0]) ? speltNumbers.get(match[0]) : match[0],
                position: match.index
            }
            lineMatches.push(matchInfo)
        }
    })

    let sorted = lineMatches.sort((a, b) => a.position - b.position)
    total += parseInt(sorted[0].number + sorted[sorted.length - 1].number)
})

rl.on('close', () => {
    console.log(total)
})
