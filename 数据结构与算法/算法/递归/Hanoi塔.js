/*
** Hanoi塔属于求解方法是递归的一类问题
** 假设有A、B、C三个塔，1,2,...,n在A塔，要移动到C塔，规定小的在大的上面，
** 问题转化为把n从A移到C，需要先把n-1从A移到B，然后把n从A移到C，然后把n-1从B移到C
** 算法时间复杂度O(2*n-1)
*/

function Hanoi(n,A,B,C){
	if(n==1){
		console.log(`${n}：${A}--->${C}`)
	}
	else{
		Hanoi(n-1,A,C,B)
		console.log(`${n}：${A}--->${C}`)
		Hanoi(n-1,B,A,C)
	}
}