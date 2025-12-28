class Foo{}
function Bar() {}

console.log(Object.getPrototypeOf(Foo) === Function.prototype); // true
console.log(Object.getPrototypeOf(Bar) === Function.prototype); // true

let myFoo = new Foo;
let myFooPrototype = Object.getPrototypeOf(myFoo);
console.log(myFooPrototype === Foo.prototype); // true because this instance of Foo has [[Prototype]] internal property pointing to the its object prototype which is shared with the function prototype of the class (i.e. Foo) that it was created from

let myFooPrototype2 = Object.getPrototypeOf(myFooPrototype);
let FooPrototype = Object.getPrototypeOf(Foo);

console.log(myFooPrototype2 === FooPrototype);
console.log(myFooPrototype2 === Object.prototype);
console.log(FooPrototype === Function.prototype);

console.log()
console.log(Object.getPrototypeOf(Foo.prototype) === Object.prototype);

console.log(myFoo.prototype);

console.log(Object.getPrototypeOf(Foo.prototype) === Object.prototype);
console.log(Object.getPrototypeOf(Foo) === Function.prototype);

console.log(Object)