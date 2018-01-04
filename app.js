const Buffer = require('./buffer.js')
const keypress = require('keypress')
const conutil = require('./conutil.js')

// Setup console
conutil.apply(console)

// Setup keypress
keypress(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (ch, key) => {
    console.log(ch, key)
    
    if(key.name == 'escape')
        process.exit(0)
})