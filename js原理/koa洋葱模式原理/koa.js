// 本质是递归调用了dispatch函数+promise，实现洋葱圈模型，即栈的执行顺序
// 如果部分中间件适用async（异步），部分没有（同步），那么执行结果有差异，具体表现在
// 可以直接用下一个中间件的回调函数来替换next函数，然后判断执行顺序
// 参考这篇博文https://ayase.moe/2018/11/26/why-not-use-common-middleware-in-koa2/

// 个人认为，选择返回Promise，有两点：
// 一是最后所有middleware执行完毕，可以有个整体回调then
// 二是可以控制next后的事件顺序是正确的，即next().then(callback)

// 当然直接同步执行，只要外面都包一层Promise.resolve()可以起到同样的效果

class App{
	constructor(){
		this.middleware = []
	}
	use(fn){
		if (fn && typeof fn !== "function") throw new Error('入参必须是函数');
		this.middleware.push(fn)
	}
	listen(...arg) {
        /**
        * 源码，this.callbakck() 作为请求处理函数，本处省略该过程
        * const server = http.createServer(this.callback());
        * return server.listen(...args);
        */
        this.callback();
    }
    callback() {
    	const fn = compose(this.middleware);
    	return this.handleRequest(fn);
    }
    handleRequest(fnMiddleware) {
    	return fnMiddleware()
    	.then(() => { console.log('over'); })
    	.catch((err) => { console.log(err); });
    }
}

// compose源码
function compose(middleware) {
	if (!Array.isArray(middleware)){
		throw new TypeError('Middleware stack must be an array!')
	}
	for (const fn of middleware) {
		if (typeof fn !== 'function') throw new TypeError('Middleware must be composed of functions!')
	}

  	/**
	 * @param {Object} context
	 * @return {Promise}
	 * @api public
	 */
	 return function (context, next) {
    	// last called middleware #
    	let index = -1
    	return dispatch(0)

    	function dispatch (i) {
    		if (i <= index){
    			return Promise.reject(new Error('next() called multiple times'))
    		}
    		index = i
    		let fn = middleware[i]
    		if (i === middleware.length){
    			fn = next
    		}
    		// 超过数组索引（i===middleware.length）
    		if (!fn){
    			return Promise.resolve()
    		}
    		try {
    			return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
    			// 等价于
    			// return Promise.resolve(fn(context, function(){
    			// 	dispatch(i+1);
    			// }));
    		} catch (err) {
    			return Promise.reject(err)
    		}
    	}
    }
}

// 调用
let app = new App()
app.use((ctx,next)=>{
	console.log(1)
	next()
	console.log(1,1)
})
app.use(async(ctx,next)=>{
	console.log(2)
	await next()
	console.log(2,2)
})
app.use((ctx,next)=>{
	console.log(3)
	next()
	console.log(3,3)
})
app.listen()

// 1 2 3 3 3 1 1 2 2
// 因为