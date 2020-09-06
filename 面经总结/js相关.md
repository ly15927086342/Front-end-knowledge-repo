Author: _Yu Li_  
date: _2020/04/17_  
  
# js相关总结  
  
## 题目  
  
1. typeof、instanceof、isPropertyof区别  
详见[/js原理/typeof_instanceof_isprototypeof.js](/js原理/typeof_instanceof_isprototypeof.js)  
  
2. === 表示恒等，不会类型转换  
由于js是弱语言，表达式运算符会导致类型转换，如  
true == 1 == '1'  
true !== 1  
  
3. 查询自有属性的方法  
详见<a href="/js原理/原型链的属性遍历.js">/js原理/原型链的属性遍历.js</a>  
  
4. 数据类型包括：基本类型和引用类型  
基本类型包括：null、undefined、boolean、string、symbol、number、object  
引用类型包括：Object、Function、Date、RegExp、Array等  
  
5. 基本类型和引用类型区别  
基本类型-》栈（stack）  
引用类型-》堆（heap）  
一、内存分配方式；二、复制；三、传参  
  
6. call()、apply()、bind()区别  
执行：call()和apply()是立即执行，而bind()是返回一个函数  
参数：  
call(this[,arg1,...,argn])  
apply(this[,[arg1,...,argn]])  
bind(this[,arg1,...,argn])，和call参数一致  
**bind的作用是可以使一个函数拥有预设的初始参数** _函数柯里化_  
例如：  
```javascript  
function list() {
	return Array.prototype.slice.call(arguments);
}
var leadingThirtysevenList = list.bind(null, 37);
var list2 = leadingThirtysevenList(); 
// [37]
var list3 = leadingThirtysevenList(1, 2, 3); 
// [37, 1, 2, 3]
```
  
7. apply妙用  
Math.max.apply(null,Attay)  
等价于Math.max(...Array)  
  
8. this指向  
new调用 > 显示调用 > 隐式调用 > 默认调用  
详见<a href="/js原理/this理解.js">/js原理/this理解.js</a>  
`箭头函数的this指向`，是在定义时决定的，不是执行时决定的
  
9. 原生对象和宿主对象  
原生对象：引用类型=》Array\Date\RegExp  
宿主对象：宿主环境规定的对象，如Document\Location\Navigator  
  
10. 深浅拷贝  
详见<a href="/js原理/js对象的深浅拷贝(克隆).js">/js原理/js对象的深浅拷贝(克隆).js</a>  
  
11. IIFE(立即执行函数表达式)  
写法(function(...arg){})(arg1,..,argn)  
  
12. ES6有六种变量声明的方法：var、function、 let、const、 class、import  
其中，var和function声明的全局变量，会作为顶层对象（window）的属性，而let、const和import声明的全局变量，不属于顶层对象的属性。也就是说，从ES6开始，全局变量将逐步与顶层对象的属性脱钩。

let、const和var的区别：  
（1）var可以变量（声明）提升，但是let和const不行  
（2）var可以重复声明，但是let和const不行  
（3）var的作用域是全局作用域和函数作用域，而let和const是块级作用域  
（4）块级作用域中let、const声明的变量，会出现“暂时性死区”，如果提前使用声明的变量，Cannot access 'a' before initialization，外层定义过该变量也会失效。  
  
13. 三元表达式  
表达式？A:B  
  
14. arguments  
函数内部的实参列表，类数组对象，用下标访问参数  
  
15. 严格模式"use strict"优劣  
优：1.减少不合理 2.更安全 3.更快  
劣：1.运行结果不同 2.不能运行  
  
16. 闭包：读取函数内部变量的函数  
作用：1.公有变量（函数累加器） 2.缓存 3. 属性私有化 4.模块化开发  
缺点：内存泄漏  
  
17. async/await 和 promise  
await 后本质是一个promise函数，不管是同步还是异步函数，都会先跳到async函数外面先把同步代码执行完后，再执行剩余代码  

`理解这段代码`
```javascript
function promise(id){
	let p =new Promise((r,j)=>{
		console.log(id);
		r(id);
	})
	p.then(res=>{console.log('then:'+res)})
	return p;
}
async function asyncFun(){
	await promise(1);
	promise(2);
	await promise(3);
	console.log(4);
}
// asyncFun函数等价于以下promiseFun函数
function promiseFun(){
	promise(1)
	.then((res)=>{
		promise(2);
		promise(3);
	})
	.then((res)=>{
		console.log(4)
	})
}
// Generator函数写法
function* Gen(){
	yield promise(1)
	promise(2)
	yield promise(3)
	console.log(4)
	return
}
asyncFun();
<!-- promiseFun(); -->
<!-- let g = Gen();
g.next().value.then(res=>{// 执行promise(1);
	return g.next().value
}).then(res2=>{// 执行promise(2);promise(3);
	 g.next();// 执行console.log(4);
});  -->
promise(5);
```
`输出结果`
```javascript
1
5
then:1
2
3
then:5
then:2
then:3
4
```
`解析`  
执行promise(1)同步部分，并把resolve(1)推入微任务队列，阻塞async函数中后面的代码  
执行promise(5)同步部分，并把resolve(5)推入微任务队列，同步代码执行完毕  
遍历微任务队列，执行resolve(1)，async函数中剩余同步代码开始执行，执行promise(2)同步代码，并把resolve(2)推入微任务队列，执行promise(3)同步代码，并把resolve(3)推入微任务队列  
执行resolve(5)  
执行resolve(2)  
执行resolve(3)，async函数中剩余同步代码开始执行，执行console.log(4)  
`async比Generator优势`  
（1）内置执行器  
（2）更好的语义  
（3）更广的适用性  
（4）返回值是 Promise  
详见<a href="https://es6.ruanyifeng.com/#docs/async">async 函数</a>

`async比promise好在哪里`  
（1）代码简洁  
（2）错误处理（promise外部不能自定义try/catch，async可以）  
（3）条件语句（async可在外部使用）  
（4）中间值（promise需要链式调用then）  
（5）错误栈（promise无法定位错误位置）  
  
18. Object.defineProperty(obj,key,{})，参数有enumerable\configurable\writable\set\get  
  
19. 数组去重的方法  
法一：Array.from(new Set(arr))或者[...(new Set(arr))]  
法二：obj[key] = 1;res.push(key)  
  
20. Node.js特点 1.单线程（主线程） 2.异步/非阻塞I/O 3.事件驱动和回调函数 4.child-process子进程和H5的WebWorker类似  
  
21. Proxy对象代理，有13种属性，get\set\defineProperty\has\ownkeys\apply\construct...可以触发代理  
  
22. Reflect 与Proxy对象的方法一一对应，提供进一步操作空间  
把属于内部属性的方法从Object对象提取出，set如果不传receiver，不会触发defineProperty拦截  
  
23. 观察者模式实现  
详见<a href="/js原理/观察者模式.js">/js原理/观察者模式.js</a>  
  
24. 判断变量是数组  
1.arr instanceof Array  
2.Array.prototype.isPrototypeOf(arr)  
3.Array.isArray(arr)  
4.arr.constructor === Array  
5.Object.prototype.toString.call(arr) === '[object Array]'
  
25. String()和new String() Number()和new Number()区别  
前者是方法，后者是实例化  
  
26. toString()和valueOf()区别  

|method|Number|String|Boolean|Date|Array|Object|function|  
|:--|:--|:--|:--|:--|:--|:--|:--|  
|toString|"123"|一致|"false"|打印日期|"1,2,3"|[object Object]|源代码字符串|  
|valueOf|123|一致|false|时间戳|[1,2,3]|{...}|函数本身|  
  
27. class  
ES6 class中的方法不可枚举 Object.keys(ClassA)为[]  
ES5 可枚举  
  
28. 模块加载  
CommonJS 服务器   
AMD 浏览器  
被ES6模块取代，编译时确定依赖关系  
ES6模块不是对象，通过export显式指定输出代码 import导入  
原理：编译时从目标加载方法，其他不加载  
ES6模块的好处  
1.无需UMD模块格式  
2.浏览器API无需全局化  
3.不需要对象作为命名空间（例如Math）  
4.局部引用  
CommonJS require的变量是缓存，不能修改，而ES6模块变量值是动态变化的，但建议不要改写  
  
29. ES6模块和CommonJS模块差异  
1.CommonJS输出值拷贝，ES6输出值引用  
2.CommonJS运行时加载，ES6编译时加载  

AMD和CMD的区别？  
AMD 推崇依赖前置、提前执行，CMD推崇依赖就近、延迟执行。  

AMD优缺点：

优点：

适合在浏览器环境中异步加载模块  
可以并行加载多个模块   

缺点：

提高了开发成本，代码的阅读和书写比较困难，模块定义方式的语义不顺畅  
不符合通用的模块化思维方式，是一种妥协的实现  

CMD优缺点：

优点：

依赖就近，延迟执行  
可以很容易在 Node.js 中运行  

缺点：

依赖 SPM 打包，模块的加载逻辑偏重  

[https://juejin.im/post/6844903759009595405](https://juejin.im/post/6844903759009595405)

```javascript
/** AMD写法 **/
define(["a", "b", "c", "d", "e", "f"], function(a, b, c, d, e, f) { 
     // 等于在最前面声明并初始化了要用到的所有模块
    a.doSomething();
    if (false) {
        // 即便没用到某个模块 b，但 b 还是提前执行了
        b.doSomething()
    }
});

/** CMD写法 **/
define(function(require, exports, module) {
    var a = require('./a'); // 在需要时申明
    a.doSomething();
    if (false) {
        var b = require('./b');
        b.doSomething();
    }
});
```

30. 排序方法（十大经典排序）  
冒泡、选择、插入、希尔、归并、快排、堆、计数、桶、基数  
详见<a href="/数据结构与算法/算法/排序">/数据结构与算法/算法/排序</a>  
  
31. 对象属性不可修改（优先级如下）  
Object.freeze->Object.seal->preventExtensions->writable\configurable  
  
32. Event Loop 事件循环  
<a href="https://juejin.im/post/5c947bca5188257de704121d">参考这篇博文，讲的非常清楚</a>  
![/static/imgs/event_loop.svg](/static/imgs/event_loop.svg)

理解：  
浏览器的JS运行只有一个主线程，主线程中有个执行栈，按顺序执行  
另外有一个任务队列，用于存异步的事件  
异步事件有两种，一种是宏任务，一种是微任务  
宏任务包括：script（整体代码）, setTimeout, setInterval, setImmediate, I/O, UI rendering  
微任务包括：process.nextTick（Nodejs）, Promises, Object.observe, MutationObserver  
一个事件循环中，微任务总是在宏任务之前执行，只有当微任务为空，才会执行宏任务中的下一个事件。  
  
所以可以这样理解：  
队列是一种先进先出的数据结构，先被压入队列的事件先执行。  
当一段代码顺序执行时，遇到异步事件，会先压入宏/微任务，待同步代码执行完，开始遍历微任务，在微任务事件中新生成的微任务，会推到微队列中，按顺序执行。当微任务队列为空，则开始遍历执行宏任务队列。  
当宏任务中新生成微/宏任务，会推入相应队列，并在当前宏任务执行完毕之后，跳入下一次事件循环，重新遍历微任务队列，如果不为空，会依次执行，完毕后遍历宏任务队列。  
  
示例代码：  
```javascript
console.log('script start');

setTimeout(function () {
    console.log('setTimeout---0');
}, 0);

setTimeout(function () {
    console.log('setTimeout---200');
    setTimeout(function () {
        console.log('inner-setTimeout---0');
    });
    Promise.resolve().then(function () {
        console.log('promise5');
    });
}, 200);

Promise.resolve().then(function () {
    console.log('promise1');
}).then(function () {
    console.log('promise2');
});

Promise.resolve().then(function () {
    console.log('promise3');
});
console.log('script end');
```
输出结果
```javascript
script start
script end
promise1
promise3
promise2
setTimeout---0
setTimeout---200
promise5
inner-setTimeout---0
```
~~then()函数内部不管是同步还是异步代码，都是在一次事件循环内执行，即同步代码直接执行，异步代码推入任务队列。这和async的await效果不太一样，await后面的函数中，同步代码会先执行，然后在then函数中的同步代码会和await后面的同步代码先执行，异步代码依次推入任务队列。~~  

实际上队列还分`事件队列`和`消息队列`，前者总是优于后者执行，例如addEventListener('click',callback)会优先promise执行回调，前提是同一层循环内。详见[https://juejin.im/post/6844903556084924423](https://juejin.im/post/6844903556084924423)、[https://github.com/dwqs/blog/issues/61](https://github.com/dwqs/blog/issues/61)

33. Proxy比defineProperty优劣：  
（1）Proxy可以直接监听对象而不是属性  
（2）Proxy可以监听数组变化，会触发方法名和length的变化  
（3）Proxy有13种拦截方法  
（4）Proxy返回新对象操作，defineProperty只能遍历对象属性修改  
缺点：  
（1）Proxy兼容性不好，不兼容IE浏览器  

34. ES6引入的class和原有的JavaScript原型继承有什么区别呢？  
实际上它们没有任何区别，class的作用就是让JavaScript引擎去实现原来需要我们自己编写的原型链代码。简而言之，用class的好处就是极大地简化了原型链代码。

~~35. 标记-清除算法~~

[移动到计算机原理相关](./计算机原理相关.md)

36. performance  
[资源加载的各个阶段耗时计算](https://developer.mozilla.org/zh-CN/docs/Web/API/Resource_Timing_API/Using_the_Resource_Timing_API)

![/static/imgs/ResourceTiming.jpg](/static/imgs/ResourceTiming.jpg)

	performance.mark("mark-A"); //标记
	// to do ...
	performance.mark("mark-B"); //标记
	performance.measure("measure-1", "mark-A", "mark-B");//测量
	entries = performance.getEntriesByName("measure-1","measure");//获取测量对象
	performance.clearMeasures();//清除测量对象

	var THRESHOLD = 1500;
	var observe_frame = new PerformanceObserver(function(list) {//监听performance
		var perfEntries = list.getEntriesByType("frame");
	  	for (var i=0; i < perfEntries.length; i++) {
	    	if (perfEntries[i].duration > THRESHOLD) {//时长超过临界值，过久
		      	console.log("Warning: frame '" + THRESHOLD + "' exceeded!");
		    }
	  	}
	});
	observe_frame.observe({entryTypes: ['frame']});

参考标准[High Resolution Time Level 2](https://www.w3.org/TR/hr-time/)

37. ASCII码和整数互转  

		let num = 65
		let asc = String.fromCharCode(num) // asc = 'A'
		let asc_num = asc.charCodeAt() // asc_num = 65

38. 十进制转其他进制

		let a = 10
		a.toString(2) // '1010'
		a.toString(8) // '12'
		a.toString(16) // 'a'

其他进制转十进制

		// 十进制以内的进制可用，大于十进制，对应关系就改变了，不适用
		function everyToTen(num,str){
			let len = str.length
			let res = 0
			for(let i=len-1;i>=0;i--){
				res += Math.pow(num,len-1-i)*parseInt(str[i])
			}
			return res
		}
		everyToTen(2,'1010') // 10

39. 二进制、八进制和十六进制表达

二进制：0b，例如0b110
八进制：0o，例如0o236
十六进制：0x，例如0x15e

40. 判断两个小数相等

		Math.abs(a-b) < Number.EPSILON

41. 大数运算，可以将数字转为字符串再处理

整数的安全范围是[-2^53 + 1, 2^53 - 1]，即[Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER]

42. setTimeout(callback,time,...arg) 可以把callback的参数写在...arg处

43. Promise

```javascript
new Promise((resolve,reject)=>{
	if(/*success*/){
		resolve(...arg)
	}else{
		reject(new Error('...'))
	}
}).then(res=>{
	//resolve...
}[,err=>{
	//reject...
}]).catch(err=>{
	//reject...如果then第二个参数不写，err就会传到这里
})
```

Promise内部的参数函数会先执行同步代码，然后执行resolve()或reject()，正常来说resolve()和reject()之后的代码不应该继续执行，所以可以写成

```javascript
new Promise((res,rej)=>{
	return res()
	//这里的同步代码不再执行
})
```

如果resolve()中的参数是另一个promise，那么就会等待该promise状态改变，才会调用resolve()

Promise 内部的错误不会影响到 Promise 外部的代码，通俗的说法就是`“Promise 会吃掉错误”`。如以下代码

```javascript
const someAsyncThing = function() {
  return new Promise(function(resolve, reject) {
    // 下面一行会报错，因为x没有声明
    resolve(x + 2);
  });
};

someAsyncThing().then(function() {
  console.log('everything is great');
});

setTimeout(() => { console.log(123) }, 2000);
// Uncaught (in promise) ReferenceError: x is not defined
// 123
```

如何不使用catch捕获promise内部的错误？  
（1）利用window.onerror=function(err){console.log(err);return true;}
在promise内部使用setTimeout，改变作用域，错误可以被监听到  
（2）使用then的第二个参数进行捕获（本质上也就是catch）因为catch(err=>{})等价于then(null,err=>{})

Promise.all([p1,p2,p3]).then(res=>{})执行情况：  
（1）三个都fulfilled，返回值组成数组，传给p的回调函数  
（2）有一个rejected，就返回第一rejected的返回值，给p的回调函数  

如果参数promise自己定义了catch，就不会触发p的回调函数

Promise.race([p1,p2,p3])执行情况：  
（1）有一个promise改变状态，就执行p回调函数  
场景：给某些链接设定请求时长，例

```javascript
const p = Promise.race([
  fetch('/resource-that-may-take-a-while'),
  new Promise(function (resolve, reject) {
    setTimeout(reject, 5000, new Error('request timeout'))
  })
]);

p
.then(console.log)
.catch(console.error);
```

Promise.allSettled([p1,p2,p3]).then(res=>{})执行情况：  
（1）所有promise都执行完，不管是fulfilled还是rejected，都会传入p的回调函数then

该方法对比Promise.all()，优势在于可以确保所有promise都执行完毕，而all()方法只有全fulfilled才then，而一旦有一个rejected，就catch

Promise.any([p1,p2,p3])执行情况：  
（1）有一个promise状态改为了fulfilled就调用p的回调函数

和Promise.race()区别就是race()只要状态改变就回调，any()只有状态改为fulfilled才回调

`如果传入的空数组`：  
all和allSettled会resolve([])  
而race和any不会触发回调，一直处于pending状态

总结如下：

|Promise方法|作用|传参|传入空数组|
|:--|:--|:--|:--|
|all|所有promise都fulfilled或有一个rejected|数组|resolve([])|
|allSettled|所有promise都改变状态|数组|resolve([])|
|race|有一个promise改变状态|值|pending|
|any|有一个promise改为fulfilled|值|pending|

44. 如何实现async/await？见[/js原理/重写async函数.js](/js原理/重写async函数.js)  

官方的_asyncToGenerator函数如图：
![/static/imgs/asyncToGenerator.png](/static/imgs/asyncToGenerator.png)  
参考文章[https://hackernoon.com/async-await-generators-promises-51f1a6ceede2](https://hackernoon.com/async-await-generators-promises-51f1a6ceede2)

45. 箭头函数和普通函数的区别？

（1）语法更简洁  
（2）箭头函数不会创建this，this指向定义上下文的上一层  
（3）call、bind、apply无法改变箭头函数的this指向  
（4）箭头函数不能作为构造函数，(没有constructor)    
（5）箭头函数自身没有arguments，如果上一层是函数，则会是函数的arguments  
（6）箭头函数没有原型prototype，但是有__proto__，指向Function.prototype  
（7）箭头函数不能用作Generator函数，但是可以用作async函数  

46. 