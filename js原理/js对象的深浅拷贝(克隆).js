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
	if(obj === null) return null; // Object.assign({},null)会转化为{}，明显不对，此处不考虑undefined？
	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
	Object.keys(clone).forEach(key=>(
		clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key])
	);
	// return Array.isArray(obj) && obj.length	? 
	// (clone.length = obj.length) && Array.from(clone) : // obj是数组且非空，clone对象转数组
	// Array.isArray(obj) ? Array.from(obj) : clone; // obj是空数组，直接返回，否则返回clone对象
	return Array.isArray(obj) ? (clone.length = obj.length) && Array.from(clone) : clone;
}
//tip: Array.from()如果是对象转数组，需要有length属性

// 衍生数组的深拷贝
const deepCloneArr = obj => {
	let clone = Object.assign({},obj); // 不管是不是数组，都转对象
	Object.keys(clone).forEach(key=>(
		clone[key] = typeof obj[key] === 'object' ? deepCloneArr(obj[key]) : obj[key])
	);
	return (clone.length = obj.length) && Array.from(clone);
}