// 爬楼梯是经典的排列问题，可以用动态规划来实现
// 状态转移方程为：dp[i] = dp[i-step1] + dp[i-step2] + ...

/*
* @{num:number}:总台阶数
* @{step:Array}:一步可跨的台阶组合数
*/
function floorSolution(num,step) {
	let dp = new Array(num+1)
	dp.fill(0)
	dp[0] = 1
	for(let coin of step){
		dp[coin] = 1
	}
	for(let i=1;i<=num;i++){
		for(let coin of step){
			if(i-coin>0){
				dp[i] += dp[i-coin]
			}			
		}
	}
	return dp[num]
}