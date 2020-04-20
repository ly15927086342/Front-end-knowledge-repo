// 三种类型判断探讨

// 1. typeof 判断基本类型
typeof 1 // 'number'
typeof true // 'boolean'
typeof undefined // 'undefined'
typeof Symbol // 'function'
typeof 'ddd' // 'string'
typeof {} // 'object'
typeof null // 'object'，因为null二进制全是0，而只要前三位是0就判断为object


// 2. instanceof
// 前一个对象是不是后一个函数的实例
function A(){}
function B(){}

A.prototype = Object.create(B.prototype) // 以B函数的原型作为A函数的原型，实现原型继承

var a = new A()
var b = new B()

a instanceof A // true
a instanceof B // true

b instanceof A // false
b instanceof B // true

// 3. isPrototypeOf 前一个对象是不是在后一个对象原型链上
// 沿用上述的代码

A.isPrototypeOf(a) // false
A.prototype.isPrototypeOf(a) // true

B.isPrototypeOf(a) // false
B.prototype.isPrototypeOf(a) // true

A.isPrototypeOf(b) // false
A.prototype.isPrototypeOf(b) // false

B.isPrototypeOf(b) // false
B.prototype.isPrototypeOf(b) // true

// 4. 如果此时改一下背景，情况会变得有趣

function A(){}
function B(){}

A.prototype = Object.create(B) // 以B函数作为A函数的原型，不存在原型继承

var a = new A()
var b = new B()

a instanceof A // true
a instanceof B // false(不是原型继承，所以没法在a的原型链中找到B的原型)
A.prototype.__proto__ === B // true

b instanceof A // false
b instanceof B // true

A.isPrototypeOf(a) // false
A.prototype.isPrototypeOf(a) // true

B.isPrototypeOf(a) // true(因为 B === a.__proto__.__proto__ === A.prototype.__proto__)
B.prototype.isPrototypeOf(a) // false

A.isPrototypeOf(b) // false
A.prototype.isPrototypeOf(b) // false

B.isPrototypeOf(b) // false
B.prototype.isPrototypeOf(b) // true

// 我们探讨以下a的原型链

a.__proto__ === A.prototype // 指向A函数prototype属性，是一个包含contructor和__proto__的对象
a.__proto__.__proto__ === B // 指向B函数，原本指向对象的原型Object，强行改为了B函数
a.__proto__.__proto__.__proto__ === B.__proto__ // 指向B函数的原型，也是函数的原型Function
a.__proto__.__proto__.__proto__.__proto__ // 指向对象的原型，函数继承了对象Object
a.__proto__.__proto__.__proto__.__proto__.__proto__ // null