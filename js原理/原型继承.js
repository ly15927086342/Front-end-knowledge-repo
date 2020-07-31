// 演示了原型链的继承原理
// 如果funcA要继承funcB的原型链，需要如下操作
// funcA.prototype = Object.create(funcB.prototype)
// 或者 funcA.prototype.__proto__ = funcB.prototype
// 或者 Object.setPrototypeOf( funcA.prototype, funcB.prototype );

/*
** js继承有两部分：
** 属性继承（在构造函数内部调用另一个构造函数）
** 方法继承（Object.create()）
*/

function Foo(name) {      
	this.name = name; 
} 
 
Foo.prototype.myName = function() {      
	return this.name; 
}; 

// 属性继承
function Bar(name,label) {      
	Foo.call( this, name ); //this取决于谁调用了Bar，由下文知new 调用，this指向new的实例 
	this.label = label; 
} 

// 方法继承
// 我们创建了一个新的 Bar.prototype 对象并关联到 Foo.prototype 
// 注意，这里不是给Bar创建一个原型，而是给Bar的原型创建一个原型（关联）
// 因此 Bar.prototype没有myName方法，但是Bar.prototype.__proto__有myName的方法
Bar.prototype = Object.create( Foo.prototype ); 

// 注意！现在没有 Bar.prototype.constructor 了 
// 如果你需要这个属性的话可能需要手动修复一下它 

Bar.prototype.constructor = Bar
 
Bar.prototype.myLabel = function() {      
	return this.label; 
}; 
 
var a = new Bar( "a", "obj a" ); 
 
a.myName(); // "a"  
a.myLabel(); // "obj a"


// 创建关联，Object.create()方法的等价写法
function createAndLinkObject(o) {      
	function F(){}     // 创空函数
	F.prototype = o;     // 给这个函数的原型赋对象o
	return new F();		// 新建函数实例并返回
}

var anotherObject = {      
	a:2 
}; 
 
var myObject = createAndLinkObject( anotherObject ); 
 
myObject.a; // 2