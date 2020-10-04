### pdd一面

### 时间
9.19下午4点

### 提问
1. 部门？A端，admin，内部系统
2. 工作时间？11点-晚10点

### 面试题
1. nextTick作用（本轮事件循环所有微队列执行完毕执行该回调，主要用于dom视图更新）
2. keep-alive作用（缓存组件，用于没有数据改动的组件）
3. vue ssr服务端的接口是什么
4. 用过什么图表库？echarts和D3
5. D3的enter和exit含义（不知道）
6. git的reset revert rebase含义

reset:撤销之前的commit  
revert:通过提交新的commit来达到撤销之前commit的效果  
rebase:合并commit为新的commit  

7. css transform作用，平移旋转缩放
8. flex: 0 1 auto含义，分开解释
9. koa的中间件写法：app.use((ctx,next)=>{})
10. webpack用过吗？说一些常用的中间件：cleanupplugin、htmlwebpackplugin、autoprefixer
11. nuxt.js有用过吗？没有(貌似这个部门很多应用都是ssr的？)

### 笔试题
`{"name":"'dd'","age":"25","hh":"'dd'"}`=>{"name":"dd","age":25,"hh":"dd"}

```javascript
function stringToObj(str){
	let obj = JSON.parse(str)
	for(let key of Object.keys(obj)){
		if(typeof obj[key] == 'string'){
			if(obj[key][0]=="'"&&obj[key][obj[key].length-1]=="'"){
				obj[key] = obj[key].slice(1,-1)
			}else{
				if(!Number.isNaN(obj[key])){
					obj[key] = Number(obj[key])
				}
			}
		}
	}
	return obj
}
```