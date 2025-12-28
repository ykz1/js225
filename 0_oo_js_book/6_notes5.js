function Animal() {}
function Dog() {}

console.log(Object.getPrototypeOf(Dog.prototype));

Dog.prototype = Object.create(Animal.prototype);
// define Dog's methods after reassigning its function prototype above
console.log(Object.getPrototypeOf(Dog.prototype));

console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);

let obj = Object.create({
  foo() {console.log('foo')},
  bar() {console.log('bar')},
})

obj.foo = function() { console.log('FOO') }

obj.foo();