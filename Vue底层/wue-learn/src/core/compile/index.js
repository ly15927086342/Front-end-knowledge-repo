/**
 * @author monkeywang
 * Date: 2018/4/8
 */
export default class compiler {
  constructor (el, vm) {
    vm.$el = document.querySelector(el)//获取根节点
    let fragment = document.createDocumentFragment();//在这里的代码没有实际用途，应该用在操作dom节点的地方，比如添加或删除dom节点
    this.replace(vm.$el, vm)
  }
  // 这里只考虑了简单的{{}}模板和v-model监测
  replace (frag, vm) {
    Array.from(frag.childNodes).forEach(node => {
      let txt = node.textContent;
      let reg = /\{\{(.*?)\}\}/g;   // 正则匹配{{}}

      if (node.nodeType === Node.TEXT_NODE && reg.test(txt)) { // 即是文本节点(3)又有大括号的情况{{}}
        let arr = RegExp.$1.split('.');
        let val = vm;
        arr.forEach(key => {
          val = val[key];
        });
        // 用trim方法去除一下首尾空格
        node.textContent = txt.replace(reg, val).trim();
        // 监听RegExp.$1变化，触发Setter，执行notify()，执行update()，执行回调，更新node.textContent
        vm.$watch(RegExp.$1, function (newVal) {
          node.textContent = txt.replace(reg, newVal).trim();
        })
      }

      if (node.nodeType === Node.ELEMENT_NODE) {  // 元素节点(1)
        let nodeAttr = node.attributes; // 获取dom上的所有属性,是个类数组
        Array.from(nodeAttr).forEach(attr => {
          let name = attr.name;// 属性名
          let exp = attr.value;// 属性值
          // 检测是否是模板
          if (name.includes('v-')){
            node.value = vm[exp];
          }

          // 给exp绑定Watcher，触发defineReactive的Setter，触发Dep.notify()，触发回调，更新input的value
          vm.$watch(exp, function(newVal) {
            node.value = newVal;
          });

          // 监听input的输入值变化，
          node.addEventListener('input', e => {
            let newVal = e.target.value;
            let arr = exp.split('.')
            let val = vm;
            arr.forEach((key, i)=> {
              // 循环到最后一层的属性再赋值
              if (i === arr.length - 1) {
                val[key] = newVal
                return
              }
              // 获取最后一层的对象
              val = val[key];
            });
          });
        });
      }

      // 如果还有子节点，继续递归replace
      if (node.childNodes && node.childNodes.length) {
        this.replace(node, vm);
      }
    })
  }
}