/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(n^2)
** 原理：每次选择迭代部分的最小值，和当前索引交换
*/ 

function selection_sort(arr){
	for(let i=0;i<arr.length-1;i++){
		let min = i
		for(let j=i+1;j<arr.length;j++){
			if(arr[j]<arr[min]){
				min = j
			}
		}
		let tmp = arr[min]
		arr[min] = arr[i]
		arr[i] = tmp
	}
	return arr
}