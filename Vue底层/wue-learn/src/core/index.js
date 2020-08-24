/**
 * @author monkeywang
 * Date: 2018/4/8
 */

import proxy from './instance/proxy'
import initOptions from './instance/init'
import Compiler from "./compile";
import Watcher from "./observer/Watcher"
import {callHook} from "./instance/lifecycle"

export default class Wue {
  constructor (options) {
    let vm = this
    // 获取实例化的各种参数，el、data、created、mounted、methods等
    vm.$options = options
    // 监听函数绑到全局对象上
    vm.$watch = function (key, cb) {
      new Watcher(vm, key, cb)
    }
    // 监听data每个属性的setter和getter，观察者模式
    initOptions(vm)
    // 把vm._data上的元素代理到vm上
    for (let key in vm._data) {
      proxy(vm, '_data', key)
    }
    callHook(vm, 'created')
    // 解析html文档，构建virtual dom，同时根据data重新渲染html，把
    new Compiler(vm.$options.el, vm)
    callHook(vm, 'mounted')
  }
}