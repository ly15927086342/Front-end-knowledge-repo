Author: _Yu Li_  
date: _2020/04/17_

# CSS相关总结

<!-- TOC -->

- [CSS相关总结](#css相关总结)
  - [1. CSS权重 important > 行内 > id选择器 > 类、伪类、属性 > 元素 > 通配符](#1-css权重-important--行内--id选择器--类伪类属性--元素--通配符)
  - [2. 盒模型：box-sizing](#2-盒模型box-sizing)
  - [3. BFC是什么？](#3-bfc是什么)
  - [4. 消除浮动](#4-消除浮动)
  - [5. em和rem](#5-em和rem)
  - [6. 1px的线](#6-1px的线)
  - [7. position有几个属性](#7-position有几个属性)
  - [8. 垂直水平居中方式](#8-垂直水平居中方式)
  - [9. 左右宽高固定，中间自适应](#9-左右宽高固定中间自适应)
  - [10. 三个圆形水平自适应](#10-三个圆形水平自适应)
  - [11. flex的用法](#11-flex的用法)
  - [12. css变量](#12-css变量)
  - [13. css文件加载](#13-css文件加载)
  - [14. 外边距重叠的三种情况](#14-外边距重叠的三种情况)
  - [15. 如果两个margin一正一负，那么就会最大的正+最小的负，有可能会重叠。](#15-如果两个margin一正一负那么就会最大的正最小的负有可能会重叠)
  - [16. 伪类和伪元素作用？](#16-伪类和伪元素作用)
  - [17. 盒模型](#17-盒模型)
  - [18. inline-block和inline和block区别？](#18-inline-block和inline和block区别)
  - [19. flex属性，是哪几个属性合并而成的？](#19-flex属性是哪几个属性合并而成的)
  - [20. css的height、max-height、min-height优先级](#20-css的heightmax-heightmin-height优先级)
  - [21. 响应式布局解决方案](#21-响应式布局解决方案)
  - [22. visibility:hidden和display:none区别](#22-visibilityhidden和displaynone区别)

<!-- /TOC -->

## 1. CSS权重 important > 行内 > id选择器 > 类、伪类、属性 > 元素 > 通配符

## 2. 盒模型：box-sizing  
content-box：宽度仅代表内容  
border-box：宽度包括内容、内边距、边框  

## 3. BFC是什么？  
BFC是块级格式上下文（Block Formatting Context），其内容是成块堆叠的  
如何形成BFC：1.根 2.float不为none 3.display为inline-block、table-cell、table-capture 4.overflow不为visible 5.display为flex或inline-flex 6.position为absolute或fixed  
[https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context)

作用：1.消除margin重叠 2.消除float导致高度塌陷 3.阻止元素被浮动元素覆盖

## 4. 消除浮动

```css
	.clear:after, .clear:before{
		content:'';
		display:table;
	}
	.clear:after{
		clear:both;
	}
```

## 5. em和rem  
都是字体长度单位  
em:相对父，1em相等  
rem:相对html

## 6. 1px的线  
浏览器：1. border 2. hr size='1' 3. height=1px  
移动端：border-shadow

## 7. position有几个属性  
static:默认
relative:相对自身原本的位置  
absolute:相对最近的非static祖先，脱离文档流  
fixed:相对屏幕视口（viewport），脱离文档流
sticky:按正常文档流定位，然后相对最近的滚动祖先偏移

## 8. 垂直水平居中方式  
text-align:center;line-height:height;  
绝对定位 left:50%; top:50%; transform:translate(-50%);  
绝对定位 top left right bottom 0;margin:auto;宽高固定  
flex  
grid align-self:center; justify-self:center;

## 9. 左右宽高固定，中间自适应

```css
	.parent{overflow:hidden;}//BFC
	.left{float:left;width:...}
	.right{float:right;width:...}
	.center{}

	.parent{position:relative;}
	.child{position:absolute;}
	.left{left:0;width:...}
	.right{right:0;width:...}
	.center{left:width;right:right;}

	.parent{position:relative;}
	.left{width:...}
	.right{width:...}
	.center{margin: 0 width;}

	.parent{display:table;width:100%;}
	.child{display:table-cell;}
	.left, .right{width:...}

	.parent{display:flex;flex-direction:row;justify-content:space-between;}
	.left,.right{width:...}
	.center{flex:1;}

	.parent{display:grid;width:100%;grid-template-rows:width;grid-template-columns:width auto width;}
```

## 10. 三个圆形水平自适应  
难度在高度自适应  
三种方法详见<a href="/css/三个圆自适应.html" target="_blank">/css/三个圆自适应.html</a>

## 11. flex的用法  
flex-direction  
justify-content  
align-items  
align-content：轴线对齐  
flex-wrap  
flex-flow:<direction>|<warp>

## 12. css变量  
用法：  
```css
:root{
	--someProp: value;
}
.aClass{
	color: var(--someProp);
}
```
作用：替代sass/less中变量的方案，以--开头，使用通过var()

## 13. css文件加载

css加载不会阻塞DOM树的解析（因为HTML parser和CSS parser是异步的，或者说静态资源加载都是异步的）  
css加载会阻塞DOM树的渲染（Render Tree需要CSSOM Tree和DOM Tree结合才行，必须等到CSS文件加载完毕）  
css加载会阻塞后面js语句的执行（因为js可以修改DOM和CSS，所以需要保证DOM和CSS都已经解析完毕，否则会出问题）  

为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:  

使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)  
对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)  
合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)  
减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)  

## 14. 外边距重叠的三种情况  
（1）同一层相邻元素之间  
（2）没有内容将父元素和后代元素分开  
（3）空的块级元素（块级元素没有border、padding和height）  

## 15. 如果两个margin一正一负，那么就会最大的正+最小的负，有可能会重叠。

## 16. 伪类和伪元素作用？  
（1）伪类和伪元素都是用来表示文档树以外的"元素"。  
（2）伪类和伪元素分别用单冒号:和双冒号::来表示。  
（3）伪类和伪元素的区别，最关键的点在于如果没有伪元素(或伪类)，是否需要添加元素才能达到目的，如果是则是伪元素，反之则是伪类。

## 17. 盒模型

margin:可以为负数  
padding:只能大于等于0

## 18. inline-block和inline和block区别？

inline:行内元素  
block:块级元素  
inline-block:有块级属性的行内元素，区别在于width和height有效，margin\padding和border在垂直方向上也会推开其他元素。

## 19. flex属性，是哪几个属性合并而成的？  
`flex-grow`：扩展比例
`flex-shrink`：收缩比例
`flex-basis`：基准长度

## 20. css的height、max-height、min-height优先级

见[/css/height_maxheight_minheight.html](/css/height_maxheight_minheight.html)

width、min-width、max-width优先级同理，见[/css/width_minwidth_maxwidth.html](/css/width_minwidth_maxwidth.html)

## 21. 响应式布局解决方案

1. 媒体查询（Media Query）
2. 百分比布局
3. rem字体
4. 视口单位（vw\vh）
5. 图片响应（srcset）

## 22. visibility:hidden和display:none区别
（1）display:none，子元素无法显示（非继承）；但是visibility子元素如果设置了visiable，还是可见的（继承属性）
（2）display不占空间（不出现在渲染树中），和节点不存在效果一致；visibility占空间（出现在渲染树中）
（3）visibility:hidden只会重绘；display:none会回流重绘
