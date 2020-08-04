/*
** author: Yu Li
** date: 2020/04/21
** flat(depth)，可以把数组拍平depth层，默认是1层
** 例如：[1,,,2,,,[1,2,3]].flat(1) => [1,2,1,2,3]
*/

Array.prototype.newFlat = function(depth) {
	let num = depth === undefined ? 1 : depth;
	if (!num || Number(num) <= 0) {
		return this;
	}
	let arr = [];
	//这里必须用for循环，如果用empty，会自动跳过
	for(let i=0;i<this.length;i++){
		let item = this[i]
		if(!item) continue
		if (Array.isArray(item)) {
			arr = arr.concat(item.newFlat(num-1));
		} else {
			arr.push(item);
		}
	}
	return arr;
};