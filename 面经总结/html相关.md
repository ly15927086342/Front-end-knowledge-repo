Author: _Yu Li_    
date: _2020/04/17_    
    
# html相关总结    
    
## 题目    
    
1. 事件冒泡/捕获    
事件冒泡是由内到外    
事件捕获是由外到内    
W3C标准规定，domNode.addEventListener(event,fn,usecapture)//事件，回调，是否开启捕获，true为捕获，false为冒泡    
IE标准规定，attachEvent    
详见<a href="/css/事件捕获和冒泡.html" target="_blank">/css/事件捕获和冒泡.html</a>    
    
2. 阻止冒泡的方法    
W3C e.stopPropagation()//此方法为阻止事件传递，包括捕获和冒泡    
IE e.CancelBubble() = true    
也可以在回调中 return false    
    
3. 阻止默认事件    
W3C e.preventDefault()    
IE e.returnValue = false    
也可以在回调中 return false    
    
4. document.onload和document.ready区别    
ready 是文档结构加载完（图片、静态资源没有）    
load 是所有元素都加载完    
    
5. URL查询参数    
```javascript    
let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');  
window.location.search.substr(1).match(reg) //返回数组  
```  
6. 节流：短时间避免多次调用同一函数，适用多次请求（降低事件的触发频率，例如计算滚动条位置、动画等）  
  
7. 防抖：多次操作取最后一次之后定时执行，（适用撤回、输入字符串匹配） 
  
8. XSS攻击和CSRF攻击  
XSS(Cross Site Scripting，跨站脚本攻击）插入Script脚本攻击，预防：1.不用innerHTML，用innerText2.对innerHTML做过滤  
CSRF(Cross-Site Request Forgery，跨站点请求伪造)预防：1.后台Http Referer验证 2.token验证、后台拦截器验证  
  
9. 浏览器渲染过程  
解析HTML生成DOM树  
解析CSS生成CSSOM树  
合并生成渲染树  
遍历渲染树布局  
每个节点绘制屏幕上  
  
渲染阻塞：遇到Script标签，会执行完再构建  
位置原则：CSS优先，JS置后  
解析html会把新节点插入DOM树，同时查CSS规则，从右往左查  
渲染树内所有节点可见  
  
10. html标签化，就是标签有语义，如  
```html  
<header></header><footer></footer><main></main>  
```  

作用：使用语义恰当的标签，使页面有良好的结构，让页面元素有含义，便于被浏览器、搜索引擎解析、利于SEO。

html语义化标签包括body, article, nav, aside, section, header, footer, hgroup, 还有 h1-h6 address等
  
11. defer和async  
```html  
<script defer></script><!-- 异步加载，渲染完再执行，可保证执行顺序 -->  
<script async></script><!-- 异步加载，下载完就执行，无法保证执行顺序 -->  
<script type="module"></script><!-- 效果相当于defer -->  
```  
![](/static/imgs/defer_async.jpg)
  
12. 路由hash和history区别  
hash：#开头，利用window.onhashchange事件进行监听，不会刷新页面，通过location.hash获取  
history：利用html5中pushState()和replaceState()方法，在back\forward\go基础上，点刷新会重新向后端发请求，浏览器连接修改会触发popstate事件  
区别一：history比hash更美观  
区别二：hash#之前的URL才会发后端，history的URL需要后端有该URL的响应，否则会返回错误码  
history优势：  
1.pushState()修改任何同源URL，而hash只能在同文档URL#后面加值  
2.pushState()url是否一致都会入栈，hash只有不同的才入栈  
3.pushState()可添加任何类型（stateObject），hash只能添加短字符串  
4.可额外设置title属性  

`history和hash的个人理解`：

hash在地址栏输入是不会重新发请求的，但是history的话是会重新发请求，那么如果vue-router选择history的话，如果在地址栏输入一个地址，后端如果没有处理该路由，就会返回404。因此history模式要求后端路由对前端所有路由做个重定向，然后前端路由对定向后的地址做一个组件进行匹配，统一展示页面。  
如果是在页面内修改history（go\forward\back\pushstate\replacestate），是不会触发页面刷新的，因此只需要前端路由匹配到组件就可以根据路由进行渲染。`这一点要和地址栏输入做个区分`。

13. [Web性能](https://developer.mozilla.org/zh-CN/docs/Web/Performance)  

14. `dns-prefetch`可以解决DNS解析延迟问题，使用方法如下：

```html
<link rel="dns-prefetch" href="https://fonts.googleapis.com/">
```　　
只有在跨域的资源才使用`dns-prefetch`，非跨域的没有效果，因为IP已经被解析。　　
可以搭配`preconnect`使用，`preconnect`会建立与服务器的连接，将两者结合起来可提供机会，进一步减少跨源请求的感知延迟。

```html
<link rel="preconnect" href="https://fonts.googleapis.com/" crossorigin>
<link rel="dns-prefetch" href="https://fonts.googleapis.com/">
```  
类似的rel属性还有`prefetch`、`prerender`、`preloading`，具体参考[https://css-tricks.com/prefetching-preloading-prebrowsing/](https://css-tricks.com/prefetching-preloading-prebrowsing/)

16. 关键渲染路径CRP（Critical rendering path）优化  
（1）异步下载资源，减小请求数量，  
（2）优化请求数量和请求的文件体积，  
（3）区分资源的优先级来优化加载顺序，缩短关键路径长度。  

15. 输入网址，回车之后的一系列过程描述？

参考[https://zhuanlan.zhihu.com/p/38240894](https://zhuanlan.zhihu.com/p/38240894)

首先浏览器判断有没有文件是强制缓存，且没有超时的，满足条件直接使用缓存文件；
没有缓存则需要和服务器建立TCP连接，通过DNS，解析域名找IP，直到找到目标服务器的IP；  
建立TCP连接（三次握手）；  
发送HTTP请求；  
响应请求，返回资源；  
解析HTML，遇到资源文件继续发请求；  
WebCore构建DOM和CSSOM，组合成一颗渲染树；  
遇到js会阻塞后面的资源下载，如果css在js后面，则渲染被阻塞；  
js资源下载完立即执行（JSCore）；  
直到页面渲染完毕。  

![/static/imgs/网络传输流程.png](/static/imgs/网络传输流程.png)

16. otherWindow.postMessage(message,targetOrigin)对页面的要求是，必须能够拿到窗口对象的引用，有以下四种：

otherWindow是window对象的引用：

（1）window.open/window.opener  
（2）HTMLIFrameElement.contentWindow  
（3）window.parent  
（4）window.frames  

message(Object):要传输的数据对象  
targetOrigin(String):目标origin

接受消息用的是window.addEventListener(message,receiveMessage,getSource)

message(Object):接收的data对象，无需序列化  
receiveMessage(Function):回调函数，参数是event，包含origin、source等属性  
getSource(Boolean):是否接收source（原窗口对象的引用）

17. XSS跨站点脚本攻击

本质是用户无意中执行了攻击脚本

解决方案：对于一些插入dom节点的文本做过滤、转义处理。例如appendChild()、document.write()

18. CSRF跨站点请求伪造

本质是同域的情况下获取了用户身份标识（主要是cookie），并伪造成用户发出请求，获得数据

解决方案：后端可以检查Referer（有些情况下referer也可以被修改）；也可以通过token来验证用户身份，例如后端生成一个随机数，通过加密，传给前端，前端在每一个请求参数中加入该字符串，或者用自定义的响应头，发送给后端进行验证，验证通过表明是正常用户。