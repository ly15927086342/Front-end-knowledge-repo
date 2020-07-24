Author: _Yu Li_  
date: _2020/04/17_

# CSS相关总结

## 题目

1. CSS权重 important > 行内 > id选择器 > 类、伪类、属性 > 元素

2. 盒模型：box-sizing  
content-box：宽度仅代表内容  
border-box：宽度包括内容、内边距、边框  

3. BFC是什么？  
BFC是块级格式上下文，其内容是成块堆叠的  
如何形成BFC：1.根 2.float不为none 3.display为inline-block、table-cell、table-capture 4.overflow不为visible 5.display为flex或inline-flex 6.position为absolute或fixed

作用：1.消除margin重叠 2.消除float导致高度塌陷 3.阻止元素被浮动元素覆盖

4. 消除浮动

```css
	.clear:after, .clear:before{
		content:'';
		display:table;
	}
	.clear:after{
		clear:both;
	}
```
5. em和rem  
em:相对父，1em相等  
rem:相对html

6. 1px的线  
浏览器：1. border 2. hr size='1' 3. height=1px  
移动端：border-shadow

7. position有几个属性  
relative:相对自身  
absolute:相对最近的父节点relative，脱离文档流  
fixed:相对窗口，脱离文档流

8. 垂直水平居中方式  
text-align:center;line-height:height;  
绝对定位 left:50%; top:50%; transform:translate(-50%);  
绝地定位 top left right bottom 0;margin:auto;宽高固定  
flex  
grid align-self:center; justify-self:center;

9. 宽高固定，中间自适应

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

10. 三个圆形水平自适应  
难度在高度自适应  
三种方法详见<a href="/css/三个圆自适应.html" target="_blank">/css/三个圆自适应.html</a>

11. flex的用法  
flex-direction  
justify-content  
align-items  
align-content：轴线对齐  
flex-wrap  
flex-flow:<direction>|<warp>

12. css变量  
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