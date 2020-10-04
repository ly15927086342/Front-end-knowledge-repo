// 凑零钱是一种组合问题（完全背包）,可用动态规划实现
// 状态转移方程为：
// i<coin => dp[i] = dp[i]
// i>=coin => dp[i] += dp[i-coin]
// 其中，dp表示只用前n个coin，凑成金额i，共有dp[i]种组合

// 可分解为二维状态转移方程：
// dp[i][j] = dp[i-1][j] + dp[i][j-coin]
// i表示使用的硬币数量，j表示凑成的总金额
// dp[0][0] = 0, dp[n][0] = 1

function coinSolution(num,coins){
	let dp = new Array(num+1)
	dp.fill(0)
	dp[0] = 1
	for(let coin of coins){
		for(let i=1;i<=num;i++){
			if(i<coin){
				continue
			}
			dp[i] += dp[i-coin]
		}
	}
	return dp[num]
}