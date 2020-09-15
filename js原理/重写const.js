
// 以下写法作用域是全局作用域，不是块级作用域

// 如果是writable:false，没法报错
// 配置了get和set，就不能配writable
// 配置了set，就要把get也配上
var newConst = function (data,value) {
	window[data] = value
	Object.defineProperty(window,data,{
		enumerable:false,//const声明的变量，是window对象不可枚举出来的
		configurable:false,
		get:function(){
			// 此处如果value是对象，是可以返回修改后的对象的，因为对象的地址不改变
			return value
		},
		set:function(val){
			throw new TypeError('无法赋值')
		}
	})
}

// 结合let，可实现块级作用域
let _const = {}
function newConst(data,value) {
	_const[data] = value
	Object.defineProperty(_const, data, {
		enumerable:false,//const声明的变量，是window对象不可枚举出来的
		configurable:false,
		get:function(){
			// 此处如果value是对象，是可以返回修改后的对象的，因为对象的地址不改变
			return value
		},
		set:function(val){
			throw new TypeError('无法赋值')
		}
	})
}