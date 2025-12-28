class Bar {}
class Foo extends Bar {}

let myFoo = new Foo;

console.log(Object.getPrototypeOf(myFoo) === Foo.prototype);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(myFoo)) === Bar.prototype);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(myFoo))) === Object.prototype);

function Baz() {}
console.log(Baz.prototype);
console.log(Object.getPrototypeOf(Bar.prototype) === Object.getPrototypeOf(Baz.prototype));

// Objects created from arrow functions, object literals, or object factories that return object literals all do not have a .prototype property (i.e. a function prototype). But they do have an internal property `[[Prototype]]` which points to either `Function.prototype` or `Object.prototype`
let Qux = () => {};
console.log(Qux.prototype); // undefined
console.log(Object.getPrototypeOf(Qux) === Function.prototype); // undefined

let Thud = {};
console.log(Thud.prototype); // undefined
console.log(Object.getPrototypeOf(Thud) === Object.prototype); // undefined