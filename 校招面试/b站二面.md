### b站二面

### 时间
9.11下午6点

### 提问
1. 在b站工作感觉怎么样？

### 面试题

1. 说下约球online的项目
2. 有没有做用户鉴权？没有
3. 小程序里怎么实现左右滑动？(touchstart/move/end，貌似不是原生的事件)
4. v-for中为什么要用key，什么情况下用什么样的key。（保证唯一性即可，dom diff可提效）

### 笔试题

1. 写一个返回包含固定宽度150和随机高度150-300，保留一位小数的函数
2. 写一个返回数组随机项的函数
3. 写一个生成固定列数，100个瀑布流卡片的定位对象的函数，包含top和left

```javascript
function returnObj(){
	return {
		width: 150,
		height: parseFloat((Math.random()*150+150).toFixed(1))
	}
}

//console.log(returnObj().height)

function returnRandom(){
	let arr = ['#000000','#ffeeaa','#ffbbaa','#11eeaa','#22eeaa']
	let index = Math.floor(Math.random()*arr.length)
	return arr[index]
}

//console.log(returnRandom())

function cards(total,col){
	let res = []
	let heightAcc = new Array(col)
	heightAcc.fill(0)
	for(let cur=0;cur<total;cur++){
		let inner = returnObj()
		inner.color = returnRandom()
		inner.left = cur%col*150
		if(cur<col){
			inner.top = 0
			heightAcc[cur] = inner.height
		}else{
			inner.top = heightAcc[cur%4]
			heightAcc[cur%4] = parseFloat((heightAcc[cur%4] + inner.height).toFixed(1))
		}
		res.push(inner)
	}
	return res
}

let card = cards(100,4)
console.log(JSON.stringify(card))
```