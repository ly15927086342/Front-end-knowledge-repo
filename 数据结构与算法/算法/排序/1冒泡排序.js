/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(n^2)
** 原理：每轮迭代把最大的沉到最末
*/ 

function bubble_sort(arr){
	for(let i=0;i<arr.length-1;i++){
		for(let j=1;j<arr.length-i;j++){
			if(arr[j-1]>arr[j]){
				arr[j] += arr[j-1]
				arr[j-1] = arr[j] - arr[j-1]
				arr[j] = arr[j] - arr[j-1]
			}
		}
	}
	return arr
}