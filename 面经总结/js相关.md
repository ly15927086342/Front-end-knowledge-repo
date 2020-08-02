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
  
9. 原生对象和宿主对象  
原生对象：引用类型=》Array\Date\RegExp  
宿主对象：宿主环境规定的对象，如Document\Location\Navigator  
  
10. 深浅拷贝  
详见<a href="/js原理/js对象的深浅拷贝(克隆).js">/js原理/js对象的深浅拷贝(克隆).js</a>  
  
11. IIFE(立即执行函数表达式)  
写法(function(...arg){})(arg1,..,argn)  
  
12. var变量声明提升，至作用域顶端  
  
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
		r(id)
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
<!-- var g = Gen();
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
  
30. 排序方法  
冒泡、选择、插入、快排、归并、哈希  
详见<a href="/数据结构与算法/算法/排序">/数据结构与算法/算法/排序</a>  
  
31. 对象属性不可修改（优先级如下）  
Object.freeze->Object.seal->preventExtensions->writable\configurable  
  
32. Event Loop 事件循环  
<a href="https://juejin.im/post/5c947bca5188257de704121d">参考这篇博文，讲的非常清楚</a>  
![./event_loop.svg](./event_loop.svg)

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
then()函数内部不管是同步还是异步代码，都是在一次事件循环内执行，即同步代码直接执行，异步代码推入任务队列。这和async的await效果不太一样，await后面的函数中，同步代码会先执行，然后在then函数中的同步代码会和await后面的同步代码先执行，异步代码依次推入任务队列。  

实际上队列还分`事件队列`和`消息队列`，前者总是优于后者执行，例如addEventListener('click',callback)会优先promise执行回调，前提是同一层循环内。详见[https://juejin.im/post/6844903556084924423](https://juejin.im/post/6844903556084924423)

33. Proxy比defineProperty优劣：  
（1）Proxy可以直接监听对象而不是属性  
（2）Proxy可以监听数组变化，会触发方法名和length的变化  
（3）Proxy有13种拦截方法  
（4）Proxy返回新对象操作，defineProperty只能遍历对象属性修改  
缺点：  
（1）Proxy兼容性不好，不兼容IE浏览器  

34. 


