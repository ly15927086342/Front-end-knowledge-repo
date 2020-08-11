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