/* writed by Li Yu
** date: 2020.4.9
** 原理：以第一个数为基准，将数组中比基准大的数和小的数放在基数两边，迭代至结束
** 时间复杂度：O(nlog(n))
*/ 
function quick_sort(arr,start,end){
	let key = arr[start]
	let left = start
	let right = end
	if(left >= right){
		return
	}
	while(left < right){
		// 等号很关键，少了等号直接死循环
		// 因为如何arr[left]==arr[right]，会陷入循环
		// 只要有一个等号即可，两个等号也行
		if(left < right && key <= arr[right]){
			right--
		}
		arr[left] = arr[right]
		if(left < right && key > arr[left]){
			left++
		}
		arr[right] = arr[left]
	}
	arr[left] = key
	quick_sort(arr,start,left-1)
	quick_sort(arr,left+1,end)
}