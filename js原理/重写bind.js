Function.prototype.bind = function(){
	let self = this,//保存原函数
	context = [].shift.call(arguments),//绑定this的上下文
	args = [].slice.call(arguments);//剩余参数转数组
	return function(){
		return self.apply(context, [].concat.call(args,[].slice.call(arguments)))
	}
}

//如果是多个bind连用，this指向哪里？指向第一次调用传入的对象

function A(a,b,c){
	console.log(this)
}

A.bind({a:1},1).bind({b:1},2).bind({c:1},3)() // {a:1}