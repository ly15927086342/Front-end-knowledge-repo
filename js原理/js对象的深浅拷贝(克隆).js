/*
** Author: Yu Li
** date: 2020/04/18
*/

// 浅拷贝
var obj2 = Object.assign({},obj1)

// 深拷贝
// 1. JSON
var obj2 = JSON.parse(JSON.stringify(obj1))

// 2. 递归
const deepClone = obj => {
	if(obj === null) return null; // Object.assign({},null)会转化为{}
	if(obj === undefined) return undefined; // Object.assign({},undefined)会转化为{}
	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
	Reflect.ownKeys(clone).forEach(key=>(
		clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
	);
	if(Array.isArray(obj)){
		clone.length = obj.length
		return Array.from(clone)
	}
	return clone
}
//tip: Array.from()如果是对象转数组，需要有length属性

// 衍生数组的深拷贝
const deepCloneArr = obj => {
	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
	Reflect.ownKeys(clone).forEach(key=>(
		clone[key] = typeof obj[key] === 'object' ? deepCloneArr(obj[key]) : obj[key])
	);
	clone.length = obj.length
	return Array.from(clone);
}

