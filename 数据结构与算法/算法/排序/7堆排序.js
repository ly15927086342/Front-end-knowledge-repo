/* writed by Li Yu
** date: 2020.7.27
** 时间复杂度：O(nlog(n))
** 原理：先构成一个大顶堆，然后从len-1开始和0互换，每次换后要重新调整大顶堆，直到结束
*/ 

function heap_sort(arr){
	// let res = []
	res = arr
	//change函数遍历到的最后的节点索引
	let len = arr.length
	// 实际上用change也可以构成大顶堆
	// function insert(res,num){
	// 	res.push(num)
	// 	let child = res.length-1
	// 	let parent = parseInt((child-1)/2)
	// 	while(parent>=0&&res[child]>res[parent]){
	// 		res[child] = res[parent]
	// 		res[parent] = num
	// 		child = parent
	// 		parent = parseInt((child-1)/2)
	// 	}
	// }
	// 保证顶点以下顺序正确
	function change(res,num){
		let left = 2*num+1
		let right = 2*num+2
		let max = num
		if(left<len&&res[left]>res[max]){
			max = left
		}
		if(right<len&&res[right]>res[max]){
			max = right
		}
		if(max!=num){
			let tmp = res[max]
			res[max] = res[num]
			res[num] = tmp
			change(res,max)
		}
	}
	// for(let i=0;i<arr.length;i++){
	// 	insert(res,arr[i])
	// }
	for(let i=len-1;i>=0;i--){
		change(res,i)
	}
	for(let i=res.length-1;i>0;i--){
		let tmp = res[i]
		res[i] = res[0]
		res[0] = tmp
		len--
		change(res,0)
	}
	return res
}