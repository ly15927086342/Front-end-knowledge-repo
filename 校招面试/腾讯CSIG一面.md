### CSIG金融一面

### 时间
9.23早上10.30

### 提问
1. 几轮技术面？三轮
2. 部门介绍

### 面试题
1. 小程序的页面栈有没有大小限制？不清楚
2. wxxs和js有什么区别？不清楚，没用原生开发
3. tabbar页面和普通页面区别？（这个得查一下）
4. 页面跳转用什么？navigateTo
5. 跳转到tabbar呢？记错了，应该是switchTab
6. 有哪些原生组件？canvas、map

camera  
canvas  
input（仅在focus时表现为原生组件）  
live-player  
live-pusher  
map  
textarea  
video  

7. 原生组件和普通组件的区别？原生组件显示层级最高

普通组件是在webview中渲染，原生组件是在原生客户端渲染的。

8. 如果要在canvas上面放一个点，如何实现？用cover-view和cover-image
9. 小程序的包有哪几个阶段？发布前测试包和上线后的包
10. 在哪里调试小程序？微信开发工具
11. 真机和ide里调试表现不一致如何解决？真机调试
12. es6了解吗？了解哪些
13. 怎么用es5实现const
14. 箭头函数和普通函数区别？没用this、arguments、this不可动态修改
15. 原生实现插入100个子节点？

遍历调用appendChild//会渲染100次

promise//还有呢

createDocumentFragment

16. 如果插入10000个节点呢？页面死了怎么办？没有思路
17. 比如一个页面要显示所有腾讯员工，不止10000个，怎么实现？（应该用分页，当时没说出来）
18. css水平垂直居中实现
19. transform和translate区别

### 笔试
1、 请使用原生js实现一个防抖函数
```javascript
function debounce(fn,timeout){
	let st = null
	return function(){
		if(st){
			clearTimeout(st)
		}
		st = setTimeout(fn,timeout,arguments)
	}
}

const newFn = debounce(fn,2000)
newFn(1,2)
newFn(3,4)
```

2、请写出以下代码执行的结果
```javascript
async function async1(){
	console.log("async1 start")
	await async2()
	console.log("async1 end")
}

async function async2(){
	console.log("async2")
}

console.log("script start")

setTimeout(function(){
	console.log("settimeout")
}, 0)

async1()

new Promise(function(resolve){
	console.log("promise1")
	resolve()
}).then(function(){
	console.log("promise2")
})

console.log("script end")

//script start
//async1 start
//async2
//promise1
//script end
//async1 end
//promise2
//settimeout
```

3、以下代码有什么问题？如何进行优化？
```javascript
function report(url){
	var img = new Image()
	img.src = url
}

report('https://www.tencent.com/log?tag=123')

//缺少图片加载成功的回调函数，和错误回调
function report(url,callback,errCallback){
	var img = new Image()
	img.onload = callback
	img.onerror = errCallback
	img.src = url
}
```

4、请实现一个深拷贝函数
```javascript
const isObject = obj=>typeof obj =='object' && obj!=null

const deepClone = function(obj, hash = new WeekMap()){
	if(!isObject(obj))return obj;

	if(hash.get(obj))return hash.get(obj);

	if(['Set','Map','WeekSet','WeekMap','Date','RegExp'].includes(obj.constructor)){//不是字符串，应改为[Set,Map,WeekSet,WeekMap,Date,RegExp]
		return new obj.constructor(obj)
	}

	const descriptor = Object.getDescriptorOf(obj)// getOwnPropertyDescriptors()
	const cloneObj = Object.create(Object.getPrototypeOf(obj),descriptor)

	hash.set(obj,cloneObj)

	for(let key of Reflect.ownkeys(obj)){
		cloneObj[key] = isObject(obj) ? deepClone(obj,hash) : obj//obj[key]
	}

	return cloneObj
}

```

5、一个数组par中存放有多个人员的信息，每个人员的信息由年龄age和姓名name组成，如 { age:2, name:'xx' }。不使用sort，请写一段JS程序，对这个数组按年龄从小到大进行排序。
```javascript
// 快排
function sortAge(arr,start,end){
	let key = arr[start]
	if(start>=end)return;
	let l = start,r = end
	while(l<r){
		while(l<r&&arr[r].age>=key.age){
			r--
		}
		arr[l] = arr[r]
		while(l<r&&arr[l].age<=key.age){
			l++
		}
		arr[r] = arr[l]
	}
	arr[l] = key
	sortAge(arr,start,l-1)
	sortAge(arr,l+1,end)
}

sortAge(par,0,par.length-1)
```

6、请使用es5实现promise


7、
```javascript
function Animal(params){
	this.hasTail = true
	return params
}

//new Animal 、 new Animal() 、new Animal({}) 的执行结果有什么区别

new Animal//等价于new Animal()
new Animal()//会返回一个具有hasTail=true属性的对象
new Animal({})//会直接返回{}，没有hasTail属性
new Animal('')//会返回一个具有hasTail=true属性的对象
```

8、请使用html、css实现一个员工名片页面，页面布局如下：

