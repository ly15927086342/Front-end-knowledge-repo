/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(nlog(n))
** 也称递减增量排序算法，是插入排序的一种更高效的改进版本。但希尔排序是非稳定排序算法。
*/ 

function shell_sort(arr,num){
	let gap = 1,
	len = arr.length
	while(gap < len/num){
		gap = gap*num+1
	}
	for(;gap>=1;gap=Math.floor(gap/num)){
		for(let i=gap;i<len;i++){
			let j = i-gap
			let tmp = arr[i]
			for(;j>=0&&tmp<arr[j];j-=gap){
				arr[j+gap] = arr[j]
			}
			arr[j+gap] = tmp
		}
	}
	return arr
}