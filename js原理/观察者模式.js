// proxy实现
const queue = new Set()
const observe = fn=>{queue.add(fn)}
const observable = obj=>new Proxy(obj,{set,get})

var people = observable({name:'liyu',age:24})
observe(printName)
observe(printAge)

function set(target,key,value,receiver){
	queue.forEach(obs=>obs.call(target))
	return Reflect.set(target,key,value,receiver)
}

function get(target,key,receiver){
	console.log(target[key])
	return Reflect.get(target,key,receiver)
}

function printName(){
	console.log(this.name)
}

function printAge(){
	console.log(this.age)
}

// defineProperty实现
function observe(obj,key){
	let old = obj[key]
	// 此处应该是一个闭包，因为Object.defineProperty是可以全局触发的
	// 而old在函数内调用，所以old并不会被立即释放，而是被缓存
	Object.defineProperty(obj,key,{
		enumerable:true,
		configurable:true,
		set:function(newValue){
			if(old != newValue){
				console.log('set:',newValue)
			}
			old = newValue
		},
		get:function(){
			console.log('get:',old)
			return old
		}
	})
	//闭包
	return function(){
		return old;
	}
}
var people = {name:'liyu',age:23}
var _name = observe(people,'name')
var _age = observe(people,'age')