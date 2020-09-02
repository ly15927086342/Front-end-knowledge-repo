// new的作用是：1调用构造函数 2对象私域[[prototype]]指向构造函数的原型对象
// Object.setPrototypeOf和Object.create应该是等价的，后者效率比前者高

// 方法一，setPrototypeOf
function newOne(funcName,...parm){
	let res = {}
	Object.setPrototypeOf(res,funcName.prototype)
	funcName.call(res,...parm)
	return res
}

// 方法二，调用Object.create方法
function newOne_2(funcName,...parm){
	let res = Object.create(funcName.prototype)//等价于给res.__proto__赋值funcName.prototype
	funcName.call(res,...parm)
	return res
}
