// 参考Promise A+ 规范
// 来源：https://www.zhihu.com/people/lj201314-40/posts

// 三个状态
const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
}

class myPromise{
	constructor(executor){
		//初始化参数
		this._status = STATUS.PENDING // 初始状态
		this._value = undefined // then默认回调
		this._resolveQueue = [] // resolve时触发的成功队列
		this._rejectQueue = [] // reject时触发的失败队列

		const resolve = value=>{
			const run = ()=>{
				//Promise状态只能从pending触发
				if(this._status === STATUS.PENDING){
					this._status = STATUS.FULFILLED
					this._value = value

					//resolve回调(then)
					while(this._resolveQueue.length){
						const callback = this._resolveQueue.shift()
						callback(value)
					}
				}
			}
			//这里用宏任务代替微任务
			setTimeout(run)
		}

		//同resolve
		const reject = value=>{
			const run = ()=>{
				if(this._status === STATUS.PENDING){
					this._status = STATUS.REJECTED
					this._value = value

					//resolve回调(then)
					while(this._rejectQueue.length){
						const callback = this._rejectQueue.shift()
						callback(value)
					}
				}
			}
			setTimeout(run)
		}

		//new Promise时立即执行executor
		executor(resolve,reject)
	}

	then(onFulfilled,onRejected){
		//如果不是函数，则忽略它，让值继续往下传递，如果是函数就不做处理
		typeof onFulfilled === 'function' ? null : onFulfilled = value=>value
		typeof onRejected === 'function' ? null : onRejected = error=>error

		return new myPromise((resolve,reject)=>{
			const resolveFn = value => {
				try{
					const x = onFulfilled(value)
					x instanceof myPromise ? x.then(resolve,reject) : resolve(x)
				}catch(error){
					reject(error)
				}
			}

			const rejectFn = error => {
				try{
					const x = onRejected(error)
					x instanceof myPromise ? x.then(resolve,reject) : resolve(x)
				}catch(error){
					reject(error)
				}
			}

			switch(this._status){
				case STATUS.PENDING:
				this._resolveQueue.push(resolveFn)
				this._rejectQueue.push(rejectFn)
				break
				case STATUS.FULFILLED:
				resolveFn(this._value)
				break
				case STATUS.REJECTED:
				rejectFn(this._value)
				break
				default: break
			}
		})
	}

	catch(rejectFn){
		return this.then(undefined,rejectFn)
	}

	finally(callback){
		// 所有回调执行完后，执行callback回调，再把上一步的值传递到后面
		return this.then(
			value => myPromise.resolve(callback()).then(()=>value),
			error => myPromise.resolve(callback()).then(()=>error))
	}

	// 静态方法

	static resolve(value){
		return value instanceof myPromise ? value : new myPromise(resolve => resolve(value))
	}

	static reject(error){
		return error instanceof myPromise ? error : new myPromise((resolve,reject) => reject(error))
	}

	static all(promiseArr){
		let count = 0
		let result = []
		return new myPromise((resolve,reject)=>{
			promiseArr.forEach((p,i)=>{
				// p可能不是promise，所以要用resolve处理
				myPromise.resolve(p).then(val => {
					result[i] = val
					count++
					if(count == promiseArr.length){
						resolve(result)
					}
				},err => {
					reject(err)
				})
			})
		})
	}

	static race(promiseArr){
		return new myPromise((resolve,reject)=>{
			promiseArr.forEach(p => {
				myPromise.resolve(p).then(val => {
					resolve(result)
				},err => {
					reject(err)
				})
			})
		})
	}

	static allSettled(promiseArr){
		let count = 0
		let result = []
		return new myPromise((resolve,reject)=>{
			promiseArr.forEach((p,i)=>{
				// p可能不是promise，所以要用resolve处理
				myPromise.resolve(p).then(val => {
					result[i] = val
					count++
				},err => {
					result[i] = err
					count++
				}).finally(()=>{
					if(count == promiseArr.length){
						resolve(result)
					}
				})
			})
		})
	}

	// 还在草案中，部分浏览器没实现
	static any(promiseArr){
		let count = 0
		let result = []
		return new myPromise((resolve,reject)=>{
			promiseArr.forEach((p,i) => {
				myPromise.resolve(p).then(val => {
					resolve(result)
				},err => {
					result[i] = err
					count++
				}).finally(()=>{
					if(count == promiseArr.length){
						reject(new AggregateError(result))
					}
				})
			})
		})
	}
}