/* writed by Li Yu
** date: 2020.4.9
** 原理：以第一个数为基准，将数组中比基准大的数和小的数放在基数两边，迭代至结束
*/ 
function sort(arr,start,end){
	let key = arr[start]
	let left = start
	let right = end
	if(left >= right){
		return
	}
	while(start < end){
		if(start < end && key <= arr[end]){
			end--
		}
		arr[start] = arr[end]
		if(start < end && key > arr[start]){
			start++
		}
		arr[end] = arr[start]
	}
	arr[start] = key
	sort(arr,left,start-1)
	sort(arr,start+1,right)
}