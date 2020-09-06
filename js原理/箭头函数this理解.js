// 箭头函数在定义时，this指向就确定了，而且是外层this一致
// 箭头函数本身没有自己的this
// 箭头函数不能用在new构造函数和generator函数

function foo() {
	let this_1 = this
	return () => {
		let this_2 = this
		return () => {
			let this_3 = this
			return () => {
				let this_4 = this
				console.log('id:', this.id);
				console.log(this_1===this_2&&this_2===this_3&&this_3===this_4)
			};
		};
	};
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: 1; true
var t2 = f().call({id: 3})(); // id: 1; true
var t3 = f()().call({id: 4}); // id: 1; true

// 因此this.id的this就是foo中的this

//例二
function foo() {
	let this_1 = this// 与foo的this一致
	return () => {
		let this_2 = this// 和this_1相等
		return function(){// 改为普通函数
			let this_3 = this// 与function的this一致
			return () => {
				let this_4 = this// 与function的this一致
				console.log('id:', this.id);
				console.log(this_1===this_2&&this_3===this_4)
			};
		};
	};
}

var f = foo.call({id: 1});

var t1 = f.call({id: 2})()(); // id: undefined; true
var t2 = f().call({id: 3})(); // id: 3; true
var t3 = f()().call({id: 4}); // id: undefined; true