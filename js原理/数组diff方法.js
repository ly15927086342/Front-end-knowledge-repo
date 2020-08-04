/** 
 * author: Yu Li
 * date: 2020/04/21
 * 写一个 diff 方法，用于比较两个数组，返回两数组中不同的部分，
 * 要求考虑算法性能，使用 es2015 / es2016 语法，不能使用第三方类库；
 *
 * usage:
 * 
 * console.log(diff([1, 2],[2, 1])); // => []
 * console.log(diff([1, 2, 1],[2, 1, 1, 2])); // => []
 * console.log(diff([1, 2, 3], [4, 3, 1])); // => [2,4]
 * console.log(diff([1, [2, 3], 4], [[1, 2], [2, 3], 3, 4])); // =>[1, [1, 2], 3]
 * console.log(diff([[1, 2, 3],[3, 2, 1], 1, 2, 3], [2, 3, 1])); // => [[1, 2, 3], [3, 2, 1]]
 * console.log(diff([1, [2, 3]], [1, [3, 2]])); => [[2, 3], [3, 2]]
 */

 function diff(arr1,arr2){
 	let cur = arr1.concat(arr2)
 	let mp = new Map()
 	cur.forEach(item=>{
 		let key = Array.isArray(item)?JSON.stringify(item):item
 		mp.set(key,mp.has(key) ? mp.get(key)+1 : 1)
 	})
 	let res = []
 	mp.forEach((val,key)=>{
 		if(val===1){
 			res.push(typeof key === 'string'?JSON.parse(key):key)
 		}
 	})
 	return res
 }