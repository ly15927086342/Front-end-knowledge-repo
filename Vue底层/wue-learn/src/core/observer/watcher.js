import {popTarget, pushTarget} from './dep'
export default class Watcher {
  constructor (vm, expression, cb) {
    this.vm = vm
    this.cb = cb
    this.expression = expression
    this.value = this.getVal()
  }
  getVal () {
    // 这一步使得Dep.target == 该Watcher实例
    pushTarget(this)
    let val = this.vm
    // 这个get的过程会触发defineReactive中的val[key]的Getter，addDepend会往data的Dep的sub推入该Watcher实例
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    // Dep.target设置为targetStack栈顶的Watcher实例，弹出栈顶实例
    popTarget()
    return val
  }
  addDep (dep) {
    dep.addSub(this)
  }
  update () {
    let val = this.vm
    this.expression.split('.').forEach((key) => {
      val = val[key]
    })
    this.cb.call(this.vm, val, this.value)
  }
}