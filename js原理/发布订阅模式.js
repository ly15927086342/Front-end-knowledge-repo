//题目
实现一个EventEmitter类，这个类包含以下方法：
- on（监听事件，该事件可以被触发多次）
- once（也是监听事件，但只能被触发一次）
- fire（触发指定的事件）
- off（移除指定事件的某个回调方法或者所有回调方法）

class EventEmitter {
  /**请补充你的代码***/
}
const event = new EventEmitter()
const drank = (person) => {
  console.log(person + '喝水')
}
event.on('drank', drank)
event.on('eat', (person) => {
  console.log(person + '吃东西')
})
event.once('buy', (person) => {
  console.log(person + '买东西')
})
event.fire('drank', '我')   // 我喝水  
event.fire('drank', '我')   // 我喝水  
event.fire('eat', '其它人')   // 其它人吃东西
event.fire('eat', '其它人')   // 其它人吃东西
event.fire('buy', '其它人')  //其它人买东西
event.fire('buy', '其它人')  //这里不会再次触发buy事件，因为once只能触发一次
event.off('eat')  //移除eat事件
event.fire('eat', '其它人')  //这里不会触发eat事件，因为已经移除了


// 解答
class EventEmitter {
	constructor() {
        this.queue = {} //可触发多次的事件 
        this.onceQueue = {} //只能触发一次的事件
    }
    //订阅
    on(event, fn) {  //监听事件，可以触发多次 
    	if (!this.queue[event]) this.queue[event] = []
    		this.queue[event].push(fn)
    }
    //订阅一次
    once(event, fn) {   //监听事件，只能触发一次 
    	if (!this.onceQueue[event]) {
    		this.onceQueue[event] = {
    			fns: [],
    			hasFired: false
    		}
    	}
    	this.onceQueue[event].fns.push(fn)
    }
    //发布
    fire() {  //触发指定的事件 
        const event = [].shift.call(arguments), //取得事件名称
        fns = this.queue[event],  //取得该事件里所有的回调函数（可以触发多次的事件）
        onceFns = this.onceQueue[event];  //取得该事件里所有的回调函数（只能触发一次的事件） 
        if (fns && fns.length != 0) {
            let i = 0,fn
            while (fn = fns[i++]) {
                fn.apply(this, arguments)
            }
        }
        if (onceFns && !onceFns.hasFired) {
            let i = 0,fn
            while (fn = onceFns.fns[i++]) {
                fn.apply(this, arguments)
            }
            this.onceQueue[event].hasFired = true
        }
    }
    // 注销
    // fn有函数名时可以筛选出，但是没有名称不行
    off(event, fn = null) { //可移除特定事件里的某个回调函数或者所有回调函数 
    	const fns = this.queue[event]
        if (!fns || fns.length == 0) return 
        if (fn) { //移除该事件特定的回调
        	this.queue[event] = fns.filter(item => {
        		return item !== fn
        	})
        } else { //移除该事件所有的回调
        	this.queue[event] = []
        }
    }
}