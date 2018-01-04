const Buffer = require('./buffer.js')
const keypress = require('keypress')
const conutil = require('./conutil.js')
const {Board, Snake} = require('./snake.js')
const {zip, arrayEquals} = require('./utils.js')

const terminalSize = () => 
    process.stdout.isTTY ? 
        [process.stdout.columns, process.stdout.rows] : 
        [80, 24]

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
    food: null,

    buffer: null
}

const placeFood = board => {
    return [
        (Math.random()*board.width)|0,
        (Math.random()*board.height)|0
    ]
}

const setup = state => {
    let size = terminalSize().map(x => x-2)
    let middle = size.map(x => (x/2)|0)

    state.board = new Board(...size)
    state.snake = new Snake(middle, [1,0], 3)
    state.food = placeFood(state.board)
    state.buffer = new Buffer(...size.map(x => x+2))

    console.reset()
}

const update = state => {
    const {board, snake, food} = state
    
    snake.step()

    if(!board.isValidAt(...snake.at)) {
        // Reset snake
        state.snake = new Snake([
            board.width/2, board.height/2
        ], [1,0], 1)
    }

    if(arrayEquals(snake.at, food)) {
        ++snake.length
        state.food = placeFood(board)
    }
}

const render = state => {
    const {buffer, snake, food} = state

    let width = buffer.width-1
    let height = buffer.height-1

    buffer.clear()

    // Draw walls
    let block = '█'
    buffer.line([0,0], [width,0], block)
    buffer.line([0,0], [0,height], block)
    buffer.line([0,height], [width,height], block)
    buffer.line([width,0], [width,height], block)

    // Draw snake
    let body = [...snake.history, snake.at]
        .map(at => [at[0]+1, at[1]+1])
        .forEach(at => {
            buffer.set(...at, '+')
        })

    // Draw food
    buffer.set(food[0]+1, food[1]+1, '*')

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