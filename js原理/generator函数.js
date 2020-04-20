/*
** Generator
** 返回一个迭代器对象，通过next函数执行yield
*/

function* Gen(){
	console.log(1)
	yield console.log(2)
	console.log(3)
	yield console.log(4)
	console.log(5)
	return 6
}

var g = Gen();
g.next();// 1 2
g.next();// 3 4
g.next();// 5

// 案例

function promise(id){
	let p =new Promise((r,j)=>{
		console.log(id);
		r(id)
	})
	p.then(res=>{console.log('then:'+res)})
	return p;
}

function* Gen(){
	yield promise(1)
	promise(2)
	yield promise(3)
	promise(4)
	return 6
}

var g = Gen();
g.next();// 1
g.next();// 2 3
g.next();// 4
// then:1
// then:2
// then:3
// then:4
// then:5