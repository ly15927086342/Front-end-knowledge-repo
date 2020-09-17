Author: _Yu Li_  
date: _2020/09/03_

# 《JavaScript设计模式与开发实践》总结

- PART 1 < 介绍JS在面向对象和函数式编程方面的知识
- PART 2 < 核心部分，由浅入深讲解16个设计模式
- PART 3 < 面向对象的设计原则及其在设计模式中的体现

`Design Pattern`定义是：在面向对象软件设计过程中针对特定问题的简介而优雅的解决方案。

作用是：让人们写出可复用的和可维护性高的程序。

### 单例模式

`定义`：保证一个类只有一个实例，并提供一个访问它的全局访问点。

`应用场景`：线程池、全局缓存、浏览器的window对象、登录窗口等

```javascript
// 函数写法
function singleTon(name){
	this.name = name
	this.instance = null//实例存在函数内部
}

singleTon.prototype.getName = function(){
	return this.name
}

singleTon.getInstance = function(name){//通过静态方法来获取唯一实例
	if(!this.instance){
		this.instance = new singleTon(name)
	}
	return this.instance
}

let a = singleTon.getInstance('liyu')
let b = singleTon.getInstance('guo')
console.log(a===b)

// class写法
let instance = null//全局实例
class singleTon{
	constructor(name){
		if(!instance){
			this.name = name
			instance = this
		}
		//构造函数返回对象，new操作符是可以直接返回该对象的
		return instance
	}
	getName(){
		return this.name
	}
}
let a = new singleTon(1)
let b = new singleTon(2)
console.log(a===b)//true

//代理模式
var proxySingleTon = (function(){
	let instance = null //用闭包把实例持久化
	return function(arg){
		if(!instance){
			instance = new singleTon(arg)
		}
		return instance
	}
})();

function singleTon(name){
	this.name = name
}

singleTon.prototype.getName = function(){
	return this.name
}

let a = new proxySingleTon(1)
let b = new proxySingleTon(2)
console.log(a===b)//true
```

### 策略模式

`定义`：定义一系列的算法，把它们一个个封装起来，并且使它们可以相互替换。

`应用场景`：计算奖金、缓动动画、表单检验

`优点`：

1. 避免多重条件选择语句
2. 符合开放-封闭原则，策略易于扩展
3. 策略可复用
4. 利用组合和委托让context拥有执行算法能力，算是继承的一种更轻便的替代方案

`缺点`：

1. 会有很多策略对象
2. 策略（strategy）要向客户暴露它的所有实现，违反最少知识原则

```javascript
// 策略统一到一个对象中
let strategies = {
	"S":function(salary){
		return salary*4
	},
	"A":function(salary){
		return salary*3
	},
	"B":function(salary){
		return salary*2
	}
}

// 使用策略放到一个函数中
let calculateBonus = function(level,salary){
	return strategies[level](salary)
}

console.log(calculateBonus('A',2000))//6000
console.log(calculateBonus('S',2000))//8000
```

### 代理模式

`定义`：为一个对象提供一个替代品或占位符，以便控制对它的访问。

`应用场景`：图片预加载（图片下载完之前用本地文件替代）、

```javascript
// 本体
var myImage = (function(){
	let imgNode = document.createElement('img')
	document.body.appendChild(imgNode)

	return function(src){
		imgNode.src = src
	}
})()

// 代理
var proxyImage = (function(){
	let img = new Image()
	img.onload = function(){
		myImage(this.src)
	}

	return function(src){
		myImage(src)
		img.src = src
	}
})()
```

**要保证代理和本体接口的一致性。代理和本体要符合单一职责原则（即各自拥有独立的功能）和开放-封闭原则（扩展开放，修改封闭，即本体不做改动，只对代理进行扩展）。**

