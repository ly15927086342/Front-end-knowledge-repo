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
bar( 2 ); 
console.log( obj1.a ); // 2 
var baz = new bar(3);  
console.log( obj1.a ); // 2  
console.log( baz.a ); // 3

