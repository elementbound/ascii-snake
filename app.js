const Buffer = require('./buffer.js')
const keypress = require('keypress')
const conutil = require('./conutil.js')
const {Board, Snake} = require('./snake.js')

// Setup console
conutil.apply(console)

// Setup keypress
keypress(process.stdin)
process.stdin.setRawMode(true)

process.stdin.on('keypress', (ch, key) => {
    if(key.name == 'escape')
        process.exit(0)
})

// Game
const state = {
    board: null,
    snake: null,
    buffer: null
}

const setup = state => {
    let width = 40
    let height = 30

    state.board = new Board(width, height)
    state.snake = new Snake([width/2, height/2], [1,0], 3)
    state.buffer = new Buffer(width, height)

    console.reset()
}

const update = state => {
    const {board, snake} = state
    
    if(!snake.step(board)) {
        // Reset snake
        state.snake = new Snake([
            board.width/2, board.height/2
        ], [1,0], 1)
    }
}

const render = state => {
    const {buffer, snake} = state

    buffer.clear();

    // Draw snake
    [...snake.history, snake.at].forEach(at => {
        buffer.set(...at, '+')
    })

    console.repos()
    buffer.present()
}

// Control
process.stdin.on('keypress', (ch, key) => {
    if(key.name == 'up')    state.snake.v = [ 0,-1]
    if(key.name == 'down')  state.snake.v = [ 0,+1]
    if(key.name == 'left')  state.snake.v = [-1, 0]
    if(key.name == 'right') state.snake.v = [+1, 0]
})

setup(state)
setInterval(() => {
    update(state)
    render(state)
}, 1000/12)