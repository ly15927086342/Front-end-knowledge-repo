/* Brute-Force算法
** 时间复杂度O(mn)
** 原理：完全遍历，不相同则模式串从下标0重新开始匹配
** writed by Yu Li
** on 2020/04/16
*/

/*
** @params
** {s:目标串}
** {t:模式串}
*/
function BF(s,t){
	let i=0,j=0;
	while(i<s.length && j<t.length){
		if(s[i] == t[j]){
			i++
			j++
		}else{
			j=0
			i++
		}
	}
	if(j == t.length){
		return (i-t.length)//匹配首字母下标
	}else{
		return false
	}
}


/* KMP算法
** 算法复杂度O(n+m)
** 原理：算出next表，然后不相同j=next[j]（回溯），而不是从0开始
** writed by Yu Li
** on 2020/04/16
*/
class KMP{
	constructor(){

	}
	/*
	** 获取next数组（部分匹配信息）
	*/
	getNext(t){
		let j = 0,
		k = -1,
		next = new Array(t.length);
		next[0] = -1;
		while(j < t.length-1){//注意是len-1不是len，否则数组多一位
			if(k == -1 || t[j] == t[k]){//算出后一位的next值
				j++;
				k++;
				next[j] = k;
			}else{
				k = next[k]
			}
		}
		return next;
	}
	/*
	** 运行KMP算法
	*/ 
	runKMP(s,t){
		let i = 0, j = 0;
		let next = this.getNext(t);//获取next数组
		while(i < s.length && j < t.length){
			if(j == -1 || s[i] == t[j]){
				i++;
				j++;
			}else{
				j = next[j];			
			}
		}
		if(j == t.length){
			return (i - t.length)
		}else{
			return false
		}
	}
}