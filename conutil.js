reset = () => 
    process.stdout.write('\033c')

repos = () =>
    process.stdout.write('\x1B[0f')

apply = console => {
    console.reset = reset
    console.repos = repos
}

module.exports = {
    apply: apply
}