// 1
function makeMultipleLister(n) {
  return function() {
    for (let i = n; i < 100; i += n) {
      console.log(i);
    }
  }
}

let lister = makeMultipleLister(13);
lister();

// 2
function makeAdder() {
  let n = 0;
  return function(i) {
    console.log(n += i);
  }
}

let adder = makeAdder();
let add = (i) => adder(i);
let subtract = (i) => adder(-i);

add(1);
add(42);
subtract(39);
add(6);

// 3
// No can do because `status` is private to `startup`, and even though it is included in the closure around `ready`, we cannot access the variable outside of `startup`'s definition.