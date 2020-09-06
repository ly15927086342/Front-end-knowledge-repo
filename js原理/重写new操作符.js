// new的作用是：1调用构造函数 2对象私域[[prototype]]指向构造函数的原型对象
// Object.setPrototypeOf和Object.create应该是等价的，后者效率比前者高

// 方法一，setPrototypeOf
function newOne(funcName,...parm){
	let res = {}
	Object.setPrototypeOf(res,funcName.prototype)
	let a = funcName.call(res,...parm)
	//如果构造函数返回的是对象，那么就要返回该对象，函数的原型也无法继承了
	if(typeof a == 'object' && a!=null){
		return a
	}
	return res
}

// 方法二，调用Object.create方法
function newOne_2(funcName,...parm){
	let res = Object.create(funcName.prototype)//等价于给res.__proto__赋值funcName.prototype
	let a = funcName.call(res,...parm)
	if(typeof a == 'object' && a!=null){
		return a
	}
	return res
}
