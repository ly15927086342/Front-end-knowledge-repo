Function.prototype.bind = function(){
	let self = this,//保存原函数
	context = [].shift.call(arguments),//绑定this的上下文
	args = [].slice.call(arguments);//剩余参数转数组
	return function(){
		return self.apply(context, [].concat.call(args,[].slice.call(arguments)))
	}
}