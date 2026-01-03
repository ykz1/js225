// 1
function greet(a, b) {
  console.log(`${a[0].toUpperCase()}${a.slice(1)}, ${b}!`);
}
greet('howdy', 'Joe');
greet('good morning', 'Sue');

function partial(a) {
  return function(b) {
    greet(a, b);
  }
}
const sayHello = partial('hello');
const sayHi = partial('hi');

sayHello('Brandon');
sayHi('Sarah');