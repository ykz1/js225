function add(a, b) {
	return a + b;
}

function makeAdder(a) {
	return function(b) {
		return add(a, b);
	}
}

console.log(add(1, 2));      // 3
let add1 = makeAdder(1);
console.log(add1(2));        // 3

const add2 = add.bind(null, 2);
console.log(add2(1));        // 3
