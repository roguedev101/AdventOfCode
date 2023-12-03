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

    let firstDigit = null
    let lastDigit = null
    
    regexPatterns.forEach((pattern, index) => {let match
        while ((match = pattern.exec(line)) !== null) {
            const matchInfo = {
                number: match[0],
                position: match.index
            }
            lineMatches.push(matchInfo)
        }
    })

    lineMatches.sort((a, b) => a.position - b.position).forEach((match, i) => {
        let digit = match.number
        if (speltNumbers.has(match.number)) {
            digit = speltNumbers.get(match.number)
        }

        if (!firstDigit) {
            firstDigit = digit
        }
        lastDigit = digit
    })

    if (!isNaN(firstDigit) && !isNaN(firstDigit)) {
        total += parseInt(firstDigit + lastDigit)
    }
})

rl.on('close', () => {
    console.log(total)
})
