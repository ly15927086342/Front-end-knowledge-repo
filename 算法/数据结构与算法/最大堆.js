/* writed by Li Yu
** date:2020.4.9
** 最大堆实现
** 原理：最大堆可用于快速取出一组数的最大值，可以插入，删除
** 插入：插入到最后一个元素，比较子节点和父节点大小，若父节点小于子节点，交换
** 删除：仅删除根节点，删除其他节点会打乱顺序。最后一个元素赋值给根节点，比较
** 父节点和子节点大小，若父节点小于子节点，交换
*/

class MaxHeap{
	constructor(array){
		this.arr = []
		this.arr.push(0)
		array.forEach(item=>{
			this.insert(item)
		})
	}
	//插入任意节点
	insert(num){
		this.arr.push(num)//推到数组最末
		let child = this.arr.length-1//子节点索引
		let parent = parseInt(child/2)//父节点索引
		while(parent>=1 && this.compare(this.arr[parent],num)<0){//父节点比插入值小
			this.arr[child]=this.arr[parent];//子节点和父节点交换
			this.arr[parent]=num;
			child = parent;
			parent = parseInt(child/2);//继续往上搜索
		}
	}
	//比大小
	compare(a,b){
		return a-b
	}
	//删除根节点
	delete(){
		let value = this.arr.pop();//堆尾元素推出
		this.arr[1] = value;
		for(let parent = 1;parent*2<=this.arr.length-1;){
			let childMax = parent*2;
			if(parent*2+1<=this.arr.length-1){//存在右子树
				childMax = this.compare(this.arr[childMax],this.arr[parent*2+1])>0?childMax:parent*2+1
			}
			if(this.compare(value,this.arr[childMax])<0){//父节点比子节点小
				this.arr[parent]=this.arr[childMax];
				this.arr[childMax]=value;
			}
			parent=childMax
		}
	}
	Max(){
		return this.arr[1]
	}
}