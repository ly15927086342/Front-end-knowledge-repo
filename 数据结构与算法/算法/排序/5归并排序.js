/* writed by Li Yu
** 归并排序
** 原理：先将数组递归拆分为长度为一的子数组，然后将数组递归有序合并
** 时间复杂度： O(nlogn)
*/

function merge_sort(arr){
	let left = 0,right = arr.length-1;
	split(arr,left,right)
}

function split(arr,l,r){
	let mid = parseInt((l+r)/2)
	if(l<r){
		split(arr,l,mid)
		split(arr,mid+1,r)
		merge(arr,l,mid,r)
	}
}

function merge(arr,l,m,r){
	let arr_l = arr.slice(l,m+1)
	let arr_r = arr.slice(m+1,r+1)
	let i=0,j=0,cur=l;
	while(i<m+1-l && j<r-m){
		if(arr_l[i]<arr_r[j]){
			arr[cur]=arr_l[i]
			i++
		}else{
			arr[cur]=arr_r[j]
			j++
		}
		cur++
	}
	for(;i<m+1-l;i++){
		arr.splice(cur,1,arr_l[i])
		cur++
	}
	for(;j<r-m;j++){
		arr.splice(cur,1,arr_r[j])
		cur++
	}
}