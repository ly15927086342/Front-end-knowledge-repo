// Object.create(o)作用，返回以o为原型的对象
// 创建关联，Object.create()方法的等价写法
function createAndLinkObject(o) {      
	function F(){}     // 创空函数
	F.prototype = o;     // 给这个函数的原型赋对象o
	return new F();		// 新建函数实例并返回
}

// 用setPrototypeOf替代
function createAndLinkObject(o) {      
	let a = {}
	Object.setPrototypeOf(a,o)
	return a
}

var anotherObject = {      
	a:2 
}; 
 
var myObject = createAndLinkObject( anotherObject ); 
 
myObject.a; // 2