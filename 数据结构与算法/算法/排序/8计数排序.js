/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(n+k)
** 原理：对一个数组区间内的所有数进行统计，然后根据统计结果依次输出
** 适合区间范围小的数组
*/ 

function counting_sort(arr){
	let list = []
	let res = []
	let min = Math.min(...arr)
	let max = Math.max(...arr)
	for(let i=0;i<arr.length;i++){
		if(list[arr[i]]==undefined){
			list[arr[i]]=1
		}else{
			list[arr[i]]++
		}
	}
	for(let i=min;i<=max;i++){
		if(list[i]==undefined){
			continue
		}else{
			while(list[i]>0){
				res.push(i)	
				list[i]--
			}
		}
	}
	return res
}