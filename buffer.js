const process = require('process')
const { lerp, zip, normalize, vecdir2, vecdst } = require('./utils.js')

class Buffer {
    constructor(width, height) {
        this.width = width
        this.height = height
        this.buffer = Array(width*height).fill(' ')
    }

    _at(x, y) {
        return y*this.width + x
    }

    clear(c = ' ') {
        this.buffer.fill(c)
    }

    set(x, y, c) {
        x = x|0
        y = y|0

        this.buffer[this._at(x,y)] = c
    }

    text(x,y, text) {
        text.toString().split('').forEach(c => 
            this.set(x++,y, c)
        )
    }

    line(from, to, c) {
        let manhattan_length = vecdst(from, to)

        if(c == undefined) {
            let dir = zip(from, to).map(p => p[1]-p[0])
            dir = normalize(dir)
            dir = vecdir2(dir)

            let d = "─╱│╲─╱│╲─".split('')
            let i = Math.round(dir/45)
            c = d[i]
        }

        for(let i = 0; i < manhattan_length; ++i) {
            let f = i / manhattan_length
            let px = lerp(from[0], to[0], f)
            let py = lerp(from[1], to[1], f)

            this.set(px, py, c)
        }
    }

    present() {
        let begins = [...Array(this.height)].map((v,i) => i*this.width)
        let ends = begins.map(v => v+this.width)
        let rows = zip(begins, ends).map(r => this.buffer.slice(r[0],r[1]).join(''))
        process.stdout.write(rows.join('\n'))
    }
}

module.exports = Buffer