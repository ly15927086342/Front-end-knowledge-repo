// this调用有四种方法：默认调用，隐式调用，显式调用，new调用
// 优先级如下：
// new调用 > 显示调用 > 隐式调用 > 默认调用

// 默认调用: 严格模式绑定undefined，非严格模式绑定全局对象
function foo(something) { this.a = something; } 
var bar = foo(1);
console.log(bar.a) //报错，undefined
console.log(a) // 严格模式 1 ， 非严格模式 报错，this undefined

// 隐式调用
function foo(something) { this.a = something; } 
var bar = {
	a:2,
	foo:foo
}
bar.foo(3)
console.log(bar.a) // 3

// 要注意以下情况
let a = bar.foo
a(4)
console.log(bar.a) // 3，这里bar.a没有被修改，是因为bar.foo赋给a，实际不是隐式调用，而是等价于let a = function(something){this.a = something}，这里有点奇怪，就是执行后a!==this.a；a还是函数，而this.a==4；如果改的是this.b，则b === this.b === 4

// 显式调用
function foo(something) { this.a = something; } 
var bar = {
	a:2,
}
foo.call(bar,3)
//foo.apply(bar,[3])
//var bb = foo.bind(bar)
//var m = bb(4);
//console.log(bar.a) // 4
console.log(bar.a) // 3

// new调用
function foo(something) { this.a = something; } 
var ss = new foo(5)
console.log(ss.a) // 5

// new调用和显式调用优先级比较
function foo(something) { this.a = something; }  
var obj1 = {}; 
var bar = foo.bind( obj1 );  
bar(2); 
console.log( obj1.a ); // 2 
var baz = new bar(3);  
console.log( obj1.a ); // 2  
console.log( baz.a ); // 3

// new的this始终指向内部创建的对象，不会指向全局
let obj = {
	a:1,
	b:function(){
		console.log(this.a)
	}
}

let c = new obj.b() //undefined
//因为在new内部调用构造函数时，this指向新建对象，所以this.a==undefined，其后返回该对象的引用赋值给c

let obj = {
	a:1,
	b:function(){
		this.a = 2
		console.log(this.a)
	}
}

let c = new obj.b() // 2，这里在打印前给this.a赋值2
console.log(c.a) // 2，c已经获得了a属性

// 题二
var length = 10;
function fn() {
    console.log(this.length);
}
 
var obj = {
  length: 5,
  method: function(fn) {
    fn();
    arguments[0]();
  }
};
 
obj.method(fn, 1);
// 10
// 2