console.log('main starting')
const a = require('./a.js')
const b = require('./b.js')
console.log('in main, a.done = %j, b.done = %j', a.done, b.done)

// main starting
// a starting
// b starting
// in b, a.done = false
// b done
// in a, b.done = true
// a done
// in main, a.done = true, b.done = true