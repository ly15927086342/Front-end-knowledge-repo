/*
** author: Yu Li
** date: 2020/04/21
** flat(depth)，可以把数组拍平depth层，默认是1层
** 例如：[1,2,[1,2,3]].flat(1) => [1,2,1,2,3]
** 注意empty的元素，要忽略，该算法还不完备
** 即[1,,2,3]需要转为[1,2,3]
*/

Array.prototype.flat = function(depth) {
	let num = depth === undefined ? 1 : depth;
	if (!Number(num) || Number(num) < 0) {
		return this;
	}
	let arr = [];
	this.forEach(item => {
		if (Array.isArray(item)) {
			arr = arr.concat(item.flat(num-1));
		} else {
			arr.push(item);
		}
	});
	return arr;
};