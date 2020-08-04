/*
** 以递归方式求树的高度
** author: Yu Li
*/

class Tree{
	constructor(value){
		this.child = null;
		this.value = value;
	}
	static example(){
		let tree = new Tree(1)
		tree.child = []
		tree.child.push(new Tree(2))
		tree.child.push(new Tree(3))
		tree.child[0].child = []
		tree.child[0].child.push(new Tree(4))
		tree.child[0].child.push(new Tree(5))
		tree.child[1].child = []
		tree.child[1].child.push(new Tree(6))
		tree.child[0].child[0].child = []
		tree.child[0].child[0].child.push(new Tree(7))
		return tree
	}
	/*
	** 打印树节点，因为树本身是递归结构，所以需要用递归的方法打印
	*/
	static printHere(node){
		console.log(node.value)
		if(node.child == null){
			return
		}
		for(let i = 0;i<node.child.length;i++){
			let nodeChild = node.child[i]
			this.printHere(nodeChild)
		}
	}
	/*
	** 递归获取树的高度
	** 比较子树的高度，返回高度+1(节点本身)
	*/
	static getHeight(node){
		//没有子节点，则当前节点高度为1
		if(node.child == null){
			return 1
		} else {
			let max = 0
			for(let i =0;i<node.child.length;i++){
				let h = this.getHeight(node.child[i])
				max = h > max ? h : max;
			}			
			return max + 1
		}
	}
}
