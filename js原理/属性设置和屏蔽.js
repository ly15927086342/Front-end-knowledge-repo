// 属性屏蔽有三种情况
myObject.foo = "bar" 

// 1. myObject原型链上有foo属性，且不是只读的（writable: true），
// 此时会给myObject对象添加foo属性，即产生属性屏蔽

// 2. myObject原型链上有foo属性，但是只读的（writable: false），
// 此时无法给myObject底层添加foo属性，也无法修改原型的foo属性

// 3. myObject原型链上有foo属性，但是一个setter，此时会直接调用
// 该setter，不会给myObject对象添加foo属性

// 注意隐式屏蔽

var mm = {
	a:1
}

var myObject = Object.create(mm) // 以mm为原型创建一个对象

mm.a = 2 
console.log(myObject.__proto__.a) // 2

console.log(myObject.a) // 2

myObject.hasOwnProperty('a') // false, a不属于myObject对象本身

'a' in myObject // true

// 关键点！！！
myObject.a++ 
// 隐式屏蔽，该式子等价于 myObject.a = myObject.a + 1
// 等号右边的myObject.a为原型链的a值，即2
// 等号左边的myObject.a触发第一条隐式屏蔽规则，给myObject对象添加了a属性，并赋值3

myObject.hasOwnProperty('a') // true, 此时myObject对象已经具有一个a属性，形成了属性屏蔽