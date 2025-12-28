class Animal {}
let indie = new Animal();

console.log(Object.getPrototypeOf(indie));
console.log(indie.__proto__);
console.log(Object.getPrototypeOf(indie) === indie.__proto__);