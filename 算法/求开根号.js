/* writed by Li Yu
** 题目：求一个数的开根号
** 原理：利用二分法查找，直至左右两边的差值小于精度要求
*/

function doIt(left,right,target){
	if(right-left<0.001){
		return (right + left)/2
	}
	let mid = (left + right) / 2
	if(mid*mid > target){
		return doIt(left,mid,target)
	}else{
		return doIt(mid,right,target)
	}
}

function begin(target){
	let mm = target
	if(target<1){
		mm = 1
	}
	let res = doIt(0,mm,target)
	console.log(res)
}

begin(10)