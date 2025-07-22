import readline from 'node:readline'

const count = process.stdout.rows - 2

const blank = count > 0 ? '\n'.repeat(count) : ''

console.log(blank)

readline.cursorTo(process.stdout, 0, 0)

readline.clearScreenDown(process.stdout)
