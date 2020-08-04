class Node {
  constructor(value = null) {
    this.data = value;
    this.LNode = null;
    this.RNode = null;
  }
}

class BTree {
  constructor(value) {
    this.root = this.createBTNode(value);
  }
  /*
   ** 根据字符串创建树
   ** str格式：A(B(D(,G)),C(E,F))
   */
  createBTNode(str) {
    let stack = [],
      curNode = null,
      index = 0,
      isLeft = true;
    for (; index < str.length; index++) {
      if (str[index] === "(") {
        isLeft = true;
        stack.push(curNode);
      } else if (str[index] === ")") {
        // 确保根节点不出栈
        if (index < str.length - 1) {
          stack.pop();
        }
      } else if (str[index] === ",") {
        isLeft = false;
      } else {
        curNode = new Node(str[index]);
        if (index > 0) {
          if (isLeft) {
            stack[stack.length - 1].LNode = curNode;
          } else {
            stack[stack.length - 1].RNode = curNode;
          }
        }
      }
    }
    return stack[0];
  }
  /*
   ** 查找节点
   */
  findNode(node, value, height) {
    if (node === null) {
      return null;
    } else if (node.data === value) {
      console.log(height);
      return node;
    } else {
      let p = this.findNode(node.LNode, value, height + 1);
      if (p) {
        return p;
      } else {
        return this.findNode(node.RNode, value, height + 1);
      }
    }
  }
  /**
   * 输出二叉树
   */
  printBTree(node) {
    if (node) {
      console.log(node.data);
      if (!node.LNode && !node.RNode) {
        return;
      }
      console.log("(");
      if (node.LNode) {
        this.printBTree(node.LNode);
      }
      if (node.RNode) {
        console.log(",");
        this.printBTree(node.RNode);
      }
      console.log(")");
    }
  }
  /**
   * 先序遍历
   */
  preOrder(node) {
    if (node) {
      console.log(node.data);
      this.preOrder(node.LNode);
      this.preOrder(node.RNode);
    }
  }
  /**
   * 中序遍历
   */
  inOrder(node) {
    if (node) {
      this.inOrder(node.LNode);
      console.log(node.data);
      this.inOrder(node.RNode);
    }
  }
  /**
   * 后序遍历
   */
  postOrder(node) {
    if (node) {
      this.postOrder(node.LNode);
      this.postOrder(node.RNode);
      console.log(node.data);
    }
  }
  /**
   * 两棵树是否相似（结构）
   * 相似的定义：都为空
   * 或者 根结点相似，且左右子树相似
   */
  like(n1, n2) {
    if (!n1 && !n2) return true;
    else if (!n1 || !n2) return false;
    else {
      let res = this.like(n1.LNode, n2.LNode);
      if (res) {
        return this.like(n1.RNode, n2.RNode);
      } else {
        return false;
      }
    }
  }
  /**
   * 输出节点的所有祖先
   */
  ancestor(node, value, arr) {
    if (!node) {
      return false;
    }
    if (node.data == value) {
      return arr;
    } else {
      let res = this.ancestor(node.LNode, value, arr.concat([node]));
      if (!res) {
        return this.ancestor(node.RNode, value, arr.concat([node]));
      } else return res;
    }
  }
}
