/*
** Author: Yu Li
** date: 2020/04/18
*/

// 浅拷贝
var obj2 = Object.assign({},obj1)

// 深拷贝
// 1. JSON
var obj2 = JSON.parse(JSON.stringify(obj1))

// 2. 递归，深拷贝基本类型+object，不包括函数、Date等特殊对象
// 该方法过于复杂，考虑也不全面
// const deepClone = obj => {
// 	if(obj === null) return null; // Object.assign({},null)会转化为{}
// 	//基本类型
// 	let basic = ['number','string','boolean','symbol','undefined'];
// 	if((typeof obj).includes())return obj
// 	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
// 	Reflect.ownKeys(clone).forEach(key=>(
// 		clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
// 	);
// 	if(Array.isArray(obj)){
// 		clone.length = obj.length
// 		return Array.from(clone)
// 	}
// 	return clone
// }
//tip: Array.from()如果是对象转数组，需要有length属性

// 2. 非常全面的深拷贝
// 考虑几点：1.基本类型直接返回 2.循环引用存储在weakmap中 3.特殊对象 4.对象原型继承 5.遍历key，迭代

const isObject = obj => {
	return typeof obj === "object" && obj != null
}

const cloneDeep = (obj, hash = new WeakMap()) => {
	if (!isObject(obj)) {// 基本类型直接返回
		return obj
	}

  	if (hash.has(obj)) { // 避免循环引用
  		return hash.get(obj)
  	}

  	//几种特殊的对象，通过实例化来深拷贝
  	const type = [Date, RegExp, Set, Map, WeakMap, WeakSet]
  	if (type.includes(obj.constructor)) {
  		return new obj.constructor(obj)
  	}

  	//继承对象的原型，因为Reflect.ownKeys只能遍历当前对象的所有属性，不包括__proto__
  	const allDesc = Object.getOwnPropertyDescriptors(obj) // 遍历传入参数所有键的特性
  	const cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc) // 继承原型
  	//weakmap记录属性
  	hash.set(obj, cloneObj)

  	//这里是深拷贝
  	for (let key of Reflect.ownKeys(obj)) {
	    // Reflect.ownKeys(obj)可以拷贝不可枚举属性和Symbol类型
	    // 注意：writable 为 false 的属性会赋值失败，因此 writable 为 false 的属性是浅拷贝
	    cloneObj[key] = isObject(obj[key]) ? cloneDeep(obj[key], hash) : obj[key]
	}

	return cloneObj
}

// 衍生数组的深拷贝
const deepCloneArr = obj => {
	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
	Reflect.ownKeys(clone).forEach(key=>(
		clone[key] = typeof obj[key] === 'object'&&obj[key]!=null ? deepCloneArr(obj[key]) : obj[key])
	);
	clone.length = obj.length
	return Array.from(clone);
}

