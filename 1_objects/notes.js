let obj = {
  foo: 'foo',
  bar: 'bar',
  qux: 42,
}

let {qux: myQux, foo, bar} = obj;

console.log(obj);
console.log(myQux, foo, bar);

let baz = [1, 2, 3, 4, 5]
let [first, second, ...rest] = [...baz];
console.log(baz);
console.log(first);
console.log(second);
console.log(rest);