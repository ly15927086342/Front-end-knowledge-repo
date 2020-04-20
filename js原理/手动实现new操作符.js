// 方法一，给__proto__赋值

function newOne(funcName,...parm){
	let res = {}
	funcName.call(res,...parm)
	// 等价于funcName.apply(res,parm)
	res.__proto__ = funcName.prototype
	return res
}

// 方法二，调用Object.create方法

function newOne_2(funcName,...parm){
	let res = Object.create(funcName.prototype)//等价于给res.__proto__赋值funcName.prototype
	funcName.call(res,...parm)
	return res
}