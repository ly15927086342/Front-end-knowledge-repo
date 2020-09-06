//call->apply

Function.prototype.newApply = function(obj,arg){
	obj = obj || window
	if(!arg){
		return this.call(obj)
	}
	if(Array.isArray(arg)){
		return this.call(obj,...arg)
	}else{
		throw new Error('arguments type wrong') 
	}	
}

//apply->call
//怎么验证参数正确？
Function.prototype.newCall = function(obj,...arg){
	obj = obj || window
	return this.apply(obj,arg)
}

//bind->apply
Function.prototype.newApply = function(){
	let self = this,
	context = [].shift.call(arguments),//绑定this的上下文
	args = [].shift.call(arguments);

	let func = self.bind(context,...args)//一次性把参数执行完
	return func()
}


//bind->call
Function.prototype.newCall = function(){
	return this.bind(...arguments)()//一次性把参数执行完
}
