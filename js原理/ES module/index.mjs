// node --experimental-modules index.mjs

// index.mjs
import * as mod from './lib'

// 此处输出值？3
console.log(mod.counter)

mod.incCounter()

// 此处输出值？4
console.log(mod.counter)
