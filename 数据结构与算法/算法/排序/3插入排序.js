/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(n^2)
** 原理：迭代排序最前面的那部分
*/ 

function insert_sort(arr){
	for(let i=1;i<arr.length;i++){
		let tmp = arr[i]
		let j = i-1
		for(;j>=0&&tmp<arr[j];j--){
			arr[j+1] = arr[j]
		}
		arr[j+1] = tmp
	}
	return arr
}