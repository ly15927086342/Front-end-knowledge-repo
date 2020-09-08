/*
** author: Yu Li
** date: 2020/04/21
** flat(depth)，可以把数组拍平depth层，默认是1层
** 例如：[1,,,2,,,[1,2,3]].flat(1) => [1,2,1,2,3]
*/

Array.prototype.newFlat = function(depth = 1) {
	return depth > 0 ? 
	this.reduce((res,cur)=>res.concat(Array.isArray(cur)?cur.newFlat(depth-1):cur),[])
	:
	this.filter(item=>item)//过滤空值
};

// 如果是把数组完全拍平，写法如下
function arrayFlatten(arr){
	return arr.reduce((res,item)=>res.concat(Array.isArray(item)?arrayFlatten(item):item),[])
}

// 数组深度
function arrDeep(arr){
	let res = 1
	arr.forEach(item=>{
		if(Array.isArray(item)){
			res = Math.max(res,res+arrDeep(item))
		}
	})
	return res
}