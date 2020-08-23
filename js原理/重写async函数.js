// 利用generator和promise来实现async函数
// generator是一个可控的状态机，可以暂停，这里要让它自动执行下去
// async返回promise，所以不管generator函数里有没有异步操作，都要返回promise


////////////////////////////////////////////
// 这段代码我认为比下面那段更好理解
function autoRun(gen,arg){
	const it = gen(arg)
	//递归调用go
	function go(res){
		if(res.done){
			//跳出迭代
			return Promise.resolve(res.value)
		}else{
			//不管是不是异步代码，都用异步来执行
			//如果是同步，则result是undefined
			return Promise.resolve(res.value).then(result=>{
				return go(it.next(result))
			},error=>{
				return go(it.throw(error))
			})
		}
	}
	//在启动执行的时候，需要做一下异常捕获
	try{
		return go(it.next(undefined))
	}catch(e){
		return Promise.reject(e)
	}
}

// generator函数，等价于await写法
function* func(x){
	console.log(yield test(x))
	console.log(yield test(2))
	console.log(yield 3)
	console.log(yield test(4))
}

// 自动执行
/*
** func: generator function
** 1: argument
*/
autoRun(func,1)
//////////////////////////////////////////////

///////////////////////////////////
//对比async
async function funcAsync(x){
	console.log(await test(x))
	console.log(await test(2))
	console.log(await 3)
	console.log(await test(4))
}

//直接执行
funcAsync(1)
////////////////////////////////////


//////
//异步函数
function test(a){
	return new Promise(res=>{
		setTimeout(res,1000,a)
	})
}
//////



///es6阮一峰教程中的自动执行器如下
function spawn(genF) {
	return new Promise(function(resolve, reject) {
		const gen = genF();
		function step(nextF) {
			let next;
			try {
				next = nextF();
			} catch(e) {
				return reject(e);
			}

			if(next.done) {
				return resolve(next.value);
			}
			Promise.resolve(next.value).then(function(v) {
				step(function() { return gen.next(v); });
			}, function(e) {
				step(function() { return gen.throw(e); });
			});
		}
		step(function() { return gen.next(undefined); });
	});
}