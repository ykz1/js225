class Cat {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }

  whoAmI() {
    console.log(`${this.name} is a ${this.color} cat.`);
  }
}

function Cat2(name, color) {
  this.name = name;
  this.color = color;
}

Cat2.prototype.whoAmI = function() {
  console.log(`${this.name} is a ${this.color} cat.`);
}

let meowth = new Cat2('meowth', 'beige');
let persian = new Cat2('persian', 'beige');
console.log(Cat2.prototype);
console.log(meowth.prototype);
console.log(Object.getPrototypeOf(meowth));
console.log(meowth.prototype === persian.prototype);
console.log();

let chedder = new Cat('Cheddar', 'white');
let cheddarProto = Object.getPrototypeOf(chedder)
console.log(cheddarProto === Cat.prototype); // true because same object
console.log(cheddarProto); // {} empty object because properties are non-enumerable
console.log(Object.getOwnPropertyNames(cheddarProto)); // ['constructor', 'whoAmI'] returns an array of the property names i.e. method names
console.log(cheddarProto.constructor); // [class Cat] every function prototype has a constructor property that points back to the constructor function or class it belongs to
console.log(cheddarProto.whoAmI); // [Function: whoAmI]

console.log();
console.log(Cat.prototype.constructor); // constructor is a special property on a prototype which points back to the constructor function
console.log(Cat.prototype.whoAmI); // returns the function defined in the prototype

class Tabby extends Cat {};

let maomao = new Tabby();

console.log(Object.getPrototypeOf(maomao).constructor);
console.log(Object.getPrototypeOf(Object.getPrototypeOf(maomao)).constructor); // Can chain getPrototype to get parent classes
console.log(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(Object.getPrototypeOf(maomao))))); // Eventually get to prototype of Object, which is null
class BlueTabby extends Tabby {};
console.log(BlueTabby.prototype.constructor);
console.log(BlueTabby.prototype);
console.log(Tabby.prototype);
console.log(Cat.prototype);


