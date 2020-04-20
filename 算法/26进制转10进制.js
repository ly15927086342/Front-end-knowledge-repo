/*
** 题目
** B）, “Write a function that accepts an Excel column name and returns the corresponding column number.” And give the test cases.
** they go like this:
** A B C ... Z AA AB AC . . . AZ BA BB BC . . . BZ CA CB ...  ZZZ
** 本质是26进制转10进制！
** 考虑1 2 3 4 5 6 7 8 9 10 11 ... 21 ... 111
*/

function turn26to10(str){
	let len = str.length;
	let arr = [];
	let res = 0;
	for(let i=65;i<65+26;i++){
		arr.push(String.fromCharCode(i));
	}
	for(let i = len-1;i >= 0;i--){
		let index = arr.indexOf(str[i])
		res = res + (index+1) * Math.pow(26,len-1-i);
	}
	return res;
}

/*
** 二进制转十进制
*/
function turn2to10(str){
	let len = str.length;
	let res = 0;
	for(let i = len-1;i >= 0;i--){
		res = res + parseInt(str[i]) * Math.pow(2,len-1-i);
	}
	return res;
}

/*
** 十进制转二进制
*/
function turn10to2(num){
	let res = '';
	let cur = num;
	while(cur != 0){
		res = cur % 2 + res;
		cur = parseInt(cur / 2);
	}
	return res;
}

/*法二*/
function turn10to2(str){
	return parseInt(str,2);
}
//其他进制转十进制，第二个参数是前面字符串的进制数