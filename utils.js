const lerp = (a,b, x) => 
    (1-x)*a + x*b

const dirvec3 = (rotx, roty) => {
    rotx = dtr(rotx)
    roty = dtr(roty)

    return [
        Math.cos(roty) * Math.cos(rotx),
        Math.sin(roty) * Math.cos(rotx),
        Math.sin(rotx)
    ]
}

const vecdir2 = vec =>
    angle_sanitize(rtd(Math.atan2(-vec[1], vec[0])))

// degrees to radians
const dtr = x => 
    x / 180 * Math.PI
    
// radians to degrees
const rtd = x => 
    x * 180 / Math.PI

const angle_sanitize = x => {
    while(x < 0)
        x += 360

    x = x % 360

    return x
}

const cross = (u,v) => 
[
    u[1]*v[2] - u[2]*v[1],
    u[2]*v[0] - u[0]*v[2],
    u[0]*v[1] - u[1]*v[0]
]

const zip = (a, b) => {
    let length = Math.min(a.length, b.length)
    return [...Array(length).keys()].map(i => [a[i], b[i]])
}

const range = n => 
    [...Array(n).keys()]

const dot = (a, b) => 
    zip(a,b)
        .map(v => v[0]*v[1])
        .reduce((x,y) => x+y)

const veclen = vec => 
    Math.sqrt(dot(vec, vec))

const vecdst = (a,b) => 
    veclen(zip(a,b).map(p => p[1]-p[0]))

const normalize = vec => 
    vec.map(v => v / veclen(vec))

module.exports = {
    lerp, 
    dtr,
    rtd,
    angle_sanitize,
    cross,
    dirvec3,
    dot,
    veclen,
    vecdst,
    normalize,
    vecdir2,
    zip,
    range
}