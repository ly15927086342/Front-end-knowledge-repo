/* writed by Li Yu
** 题目：求一个数的开根号
** 原理：利用二分法查找，直至左右两边的差值小于精度要求
** 分治+递归
** 递归上属于求解方法是递归的
*/

function doIt(precise,left,right,target){
	let mid = (right + left)/2
	if(Math.abs(target-mid*mid)<precise){
		return mid
	}
	if(mid*mid > target){
		return doIt(precise,left,mid,target)
	}else{
		return doIt(precise,mid,right,target)
	}
}

function begin(target){
	let mm = target
	if(target<1){
		mm = 1
	}
	let res = doIt(0.001,0,mm,target)
	console.log(res)
}

begin(10)