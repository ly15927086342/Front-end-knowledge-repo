### 腾讯数据平台部一面

### 时间
8.27下午2点30分  

### 准备问的问题
1. 属于哪个事业部？TEG
2. 详细介绍下你们部门？大数据、移动推送
3. 前端主要维护什么产品？数据生产平台
4. 业务量？一般一周一个需求

### 面试题
1. 说下美团做了哪些业务？具体做了什么
2. 遇到过什么问题？怎么解决，说的图片自旋问题
3. 你的需求是写代码还是包括打包发布完整的？完整地解释了整个开发流程，包括CI工具等
4. 美团的项目用的什么技术栈？我部门这边是vue
5. 项目怎么分层？视图层（各个组件）+逻辑层（各种功能）
6. 用的什么请求？fetch/axios
7. http和https区别？http + ssl
8. 如何部署https？加一个ssl证书,iis中好布
9. 用过打包工具嘛？webpack和vue-cli（也是webpack）
10. webpack有哪些常用的配置？entry\output\mode\modules\plugins\devserver
11. 常用的plugins有哪些？CleanWebpackPlugin\HtmlWebpackPlugin
12. es6了解嘛？let和const和var有啥区别，这里const的对象属性为什么能赋值，不知道，实际上const不能改变的是对象的指针，只要指针不改变就可以。对象属性改变不会改变对象本身的存储位置。
13. promise了解嘛？说下promise，这里all和allsettled方法没说好，前者是所有都fulfilled或有一个reject就返回，后者是所有状态都改变了，才返回。
14. 说下登录的架构？我说的session存储登录态
15. 前端如何跨域？CORS、jsonp和iframe。
16. 美团开发过程怎么解决跨域问题？一般用mock数据，或者通过chrome插件
17. 为什么实际开发过程不用CORS解决跨域？成本有点高，另外有时候后端接口没有开发出来。