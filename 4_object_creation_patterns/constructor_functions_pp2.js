// P1
let shape = {
  getType() {
    return this.type;
  },
}

function Triangle(a, b, c, type) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.type = 'triangle';
};
Triangle.prototype = shape;
Triangle.prototype.getPerimeter = function() {
  return this.a + this.b + this.c
}
Triangle.prototype.constructor = Triangle;

let t = new Triangle(3, 4, 5);
console.log(t.constructor);                 // Triangle(a, b, c)
console.log(shape.isPrototypeOf(t));        // true
console.log(t.getPerimeter());              // 12
console.log(t.getType());                   // "triangle"


// P2
console.log("Hello".constructor.name);
console.log([1,2,3].constructor.name);
console.log({name: 'Srdjan'}.constructor.name);

// P3
// Below is an implementation which does not rely on the `new` keyword

function User(first, last) {
  if (this instanceof User) {
    this.name = `${first} ${last}`;
  } else {
    let newObj = {};
    Object.setPrototypeOf(newObj, User.prototype);
    User.call(newObj, first, last);
    return newObj;
  }
  return this;
}

let name = 'Jane Doe';
let user1 = new User('John', 'Doe');
let user2 = User('John', 'Doe');

console.log(name);         // => Jane Doe
console.log(user1.name);   // => John Doe
console.log(user2.name);   // => John Doe

// P4
function createObject(obj) {
  let newObj = {};
  Object.setPrototypeOf(newObj, obj);
  return newObj;
}

let foo = {
  a: 1
};

let bar = createObject(foo);
console.log(foo.isPrototypeOf(bar));         // true

// P5

Object.prototype.begetObject = function() {
  function F() {};
  F.prototype = this;
  return new F();
}

let poo = {
  a: 1,
};

let par = poo.begetObject();
console.log(poo.isPrototypeOf(par));         // true

// P6

function neww(constructor, args) {
  let newObj = Object.create(constructor.prototype);
  constructor.apply(newObj,args);
  return newObj;
}

function Person(firstName, lastName) {
  this.firstName = firstName;
  this.lastName = lastName;
}

Person.prototype.greeting = function() {
  console.log('Hello, ' + this.firstName + ' ' + this.lastName);
};

let john = neww(Person, ['John', 'Doe']);
john.greeting();          // => Hello, John Doe
console.log(john.constructor);         // Person(firstName, lastName) {...}