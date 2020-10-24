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

`应用场景`：图片预加载（图片下载完之前用本地文件替代）、虚拟代理（例如合并HTTP请求，统一发送，即节流）、缓存代理（例如计算器缓存之前的计算结果）

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

### 迭代器模式

`定义`：提供一种方法顺序访问一个聚合对象中的各个元素，而不需要暴露该对象的内部表示。

```javascript
// 内部迭代器
function each(arr,callback){
	for(let i=0;i<arr.length;i++){
		callback.call(arr[i],i,arr[i])
	}
}

each([1,2,3],function(key,val){
	console.log(key,val)
})
```

```javascript
// 外部迭代器
function Iterator(arr){
	var current = 0
	var isDone = function(){
		return current>=arr.length
	}
	var next = function(){
		current++
	}
	var getCurrent = function(){
		return arr[current]
	}
	return {
		next,
		isDone,
		getCurrent
	}
}

var iter = Iterator([1,2,3])
while(!iter.isDone()){
	console.log(iter.getCurrent())
	iter.next()
}
```

`核心思想`：迭代过程中对当前对象进行判断，可控地中止迭代并返回结果

### 发布-订阅模式

`定义`：又叫观察者模式，定义对象间一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都将得到通知。在js开发中，我们一般用事件模型来替代传统的发布-订阅模式。

`优势`：
1. 可以应用在异步编程中，这是一种可替代回调函数的方案（时间解耦）
2. 可以取代对象之间的硬编码的通知机制，一个对象不再显式地调用另一个对象的某个接口（对象解耦）

`缺点`：
1. 创建订阅者本身消耗时间和内存，且可能消息都没发生
2. 对象间的必要联系弱化，程序难以跟踪维护和理解

`场景`：
1. DOM事件
2. 自定义事件

`示例`：[/js原理/发布订阅模式.js](/js原理/发布订阅模式.js)

### 命令模式

`定义`：命令模式的命令（command）指的是一个执行某些特定事情的指令。

`场景`：发送者和接收者的弱耦合关系，如餐厅的客人和厨师之间是弱耦合，彼此不知道对方是谁，通过订单（命令），维系彼此的关系。此外，命令模式还支持撤销、排队等操作。

`基本模式`：命令对象接收一个receiver对象，在execute方法内调用receiver的方法；用一个方法(setCommand)接收发送者对象和命令对象，在方法内部，发送者的发送事件的回调函数调用命令对象的execute方法。

`example`：
```javascript
// sender
var button1 = document.getElementById( 'button1' );

// 保存命令的堆栈
var commandStack = [];

// receiver
var MenuBar = {
	refresh: function(){
		console.log( '刷新菜单界面' );
	}
};

// 用于包装sender和command
var setCommand = function(button, command){
	button.onclick = function(){
		command.execute();
		commandStack.push(command);
	}
}

// 用于返回commond对象，处理receiver
var RefreshMenuBarCommand = function(receiver){
	return {
		// 执行命令
		execute:function(){
			receiver.refresh()
		},
		// 撤销命令
		undo:function(){
			// to do ...
		}
	}
}

// command对象
var refreshMenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshMenuBarCommand);

// 重做
var command;
while( command = commandStack.shift() ){ // 从堆栈里依次取出命令并执行
	command.execute();
}
```

`撤销`：缓存上一步的命令对象，调用命令对象的undo方法

`重做`：利用命令堆栈存储历史命令，然后依次执行命令

`宏命令`：一组命令的集合，通过执行宏命令，可以一次执行一批命令。（比如github actions，其实就是一个宏命令：workflow）

如何控制宏命令前一个结束再执行后一个？

1可以用自动执行的生成器generator函数，本质就是写一个async/await。

2可以用发布-订阅模式来实现，前一个命令结束后通知后一个命令执行，即每次调用队首的命令对象执行。

### 组合模式

`定义`：用小的子对象构建更大的对象，而这些小的子对象也是由更小的孙对象构成。

`何时使用组合模式？`：

1表示对象的部分-整体层次结构。

2客户希望统一对待树中的所有对象。

`缺点`：

1系统中每个对象看起来和其他对象都差不多，区别只有在运行时才会显现。

2创建太多对象，会让系统负担不起。

`注意点`：

1组合模式不是父子关系。父子节点能合作的关键在于又相同的接口

2对叶对象操作的一致性。

3双向映射关系。

4用职责链模式提高组合模式性能。

`example`

```javascript
// 文件系统

// Folder
var Folder = function(name){
	this.name = name;
	this.parent = null;
	this.files = [];
}
// 添加文件
Folder.prototype.add = function(file){
	file.parent = this; //设置父对象
	this.files.push( file );
}
// 扫描文件
Folder.prototype.scan = function(){
	console.log( '开始扫描文件夹: ' + this.name );
	for ( var i = 0, file, files = this.files; file = files[ i++ ]; ){
		file.scan();
	}
};
// 移除文件
Folder.prototype.remove = function(){
	if ( !this.parent ){ //根节点或者树外的游离节点
		return;
	}
	for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
		var file = files[ l ];
		if ( file === this ){
			files.splice( l, 1 );
		}
	}
};

// File，类似
var File = function( name ){
	this.name = name;
	this.parent = null;
};
File.prototype.add = function(){
	throw new Error( '不能添加在文件下面' );
};
File.prototype.scan = function(){
	console.log( '开始扫描文件: ' + this.name );
};
File.prototype.remove = function(){
	if ( !this.parent ){ //根节点或者树外的游离节点
		return;
	}
	for ( var files = this.parent.files, l = files.length - 1; l >=0; l-- ){
		var file = files[ l ];
		if ( file === this ){
			files.splice( l, 1 );
		}
	}
};

// test
var folder = new Folder( '学习资料' );
var folder1 = new Folder( 'JavaScript' );
var file1 = new Folder ( '深入浅出Node.js' );

folder1.add( new File( 'JavaScript 设计模式与开发实践' ) );
folder.add( folder1 );
folder.add( file1 );
folder.scan();
folder1.remove(); //移除文件夹
folder.scan();
```

