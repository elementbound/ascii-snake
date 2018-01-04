const {zip} = require('./utils.js')

class Board {
    constructor(width, height) {
        this.width = width
        this.height = height
    }

    isValidAt(x, y) {
        if(x < 0 || y < 0)
            return false

        if(x >= this.width || y >= this.height)
            return false

        // TODO: Obstacles
        return true
    }
}

class Snake {
    constructor(at, velocity, length) {
        this.length = length
        this.v = velocity
        this.at = at
        this.history = []
    }

    step(board) {
        this.history.push(this.at)

        while(this.history.length > this.length) 
            this.history.shift()

        this.at = zip(this.at, this.v)
                .map(p => p[0] + p[1])
    }
}

module.exports = {
    Board,
    Snake
}