// P1~4
class Cat {
  constructor(name='Kitty') {
    this.name = name
  }
  
  greet() {
    console.log(`I'm ${this.name}!`);
  }

  rename(name) {
    this.name = name
  }

  static genericGreeting() {
    console.log(`Hello! I'm a cat!`);
  }
}

let kitty = new Cat();
kitty.greet();

let jax = new Cat('Jax');
jax.greet();

jax.rename('Jackson');
jax.greet();

Cat.genericGreeting();

// P5~6

class Rectangle {
  constructor(width, length) {
    this.width = width;
    this.length = length;
  }

  getWidth() {
    return this.width;
  }

  getLength() {
    return this.length;
  }

  getArea() {
    return this.width * this.length;
  }
}

let rect = new Rectangle(4, 5);

console.log(rect.getWidth()); // 4
console.log(rect.getLength()); // 5
console.log(rect.getArea()); // 20

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
  }
}

let square = new Square(5);
console.log(`area of square = ${square.getArea()}`); // area of square = 25


// P7

class Cat2 {
  constructor(name) {
    this.name = name;
  }
  speaks() {
    return `${this.name} says meowwww.`;
  }
}

let fakeCat = Object.create(Cat2.prototype)// your implementation
console.log(fakeCat instanceof Cat2); // logs true
console.log(fakeCat.hasOwnProperty('name')); // logs false
console.log(fakeCat.speaks()); // logs undefined says meowwww.

// P8
class Pet {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}

class Cat3 extends Pet {
  constructor(name, age, color) {
    super(name, age);
    this.color = color;
  }

  info() {
    console.log(`My cat ${this.name} is ${this.age} years old and has ${this.color} fur.`);
  }
}

let pudding = new Cat3('Pudding', 7, 'black and white');
let butterscotch = new Cat3('Butterscotch', 10, 'tan and white');

console.log(pudding.info());
console.log(butterscotch.info());

// P9
class Animal {
  constructor(name, age, legs, species, status) {
    this.name = name;
    this.age = age;
    this.legs = legs;
    this.species = species;
    this.status = status;
  }
  introduce() {
    return `Hello, my name is ${this.name} and I am ${this.age} years old and ${this.status}.`;
  }
}

class Cat4 extends Animal {
  constructor(name, age, status) {
    super(name, age, 4, 'cat', status);
  }
  introduce() {
    return super.introduce() + ' Meow meow!';
  }
}

let cat = new Cat4("Pepe", 2, "happy");
console.log(cat.introduce() === "Hello, my name is Pepe and I am 2 years old and happy. Meow meow!");
// logs true

class Dog extends Animal {
  constructor(name, age, status, master) {
    super(name, age, 4, 'dog', status);
    this.master = master;
  }
  greetMaster() {
    return `Hello ${this.master}! Woof, woof!`;
  }
}

let dog = new Dog("Indie", 5, 'sleepy', 'Self');
console.log(dog.greetMaster());

// P10
class Vehicle {
  constructor(make, model, wheels) {
    this.make = make;
    this.model = model;
    this.wheels = wheels;
  }

  getWheels() {
    return this.wheels;
  }

  info() {
    return `${this.make} ${this.model}`
  }
}

class Car extends Vehicle {
  constructor(make, model) {
    super(make, model, 4);
  }
}

class Motorcycle extends Vehicle {
  constructor(make, model) {
    super(make, model, 2);
  }
}

class Truck extends Vehicle {
  constructor(make, model, payload) {
    super(make, model, 6);
    this.payload = payload;
  }
}

let myCar = new Car('Mazda', 'MX-5');
console.log(myCar.info());
console.log(myCar.getWheels());

let myBike = new Motorcycle('Suzuki', 'Hayabusa');
console.log(myBike.info());
console.log(myBike.getWheels());

let myTruck = new Truck('Ford', 'F-150 Raptor', 'A lot');
console.log(myTruck.info());
console.log(myTruck.getWheels());

// P11
class Something {
  constructor() {
    this.data = "Hello";
  }

  dupData() {
    return this.data + this.data;
  }

  static dupData() {
    return "ByeBye";
  }
}

let thing = new Something();
console.log(Something.dupData()); // logs 'ByeBye'
console.log(thing.dupData()); // logs 'HelloHello'

// P12
class Person {
  constructor(name) {
    this.name = name;
  }

  greeting() {
    return `Hello, I'm ${this.name}. It's very nice to meet you.`;
  }
}

class Shouter extends Person {
  greeting() {
    return super.greeting().toUpperCase();
  }
}

let person = new Person('Jane');
let shouter = new Shouter('Bob');

console.log(person.greeting());
console.log(shouter.greeting());

// P13
class Pet2 {
  constructor(kind, name) {
    this._kind = kind;
    this._name = name;
  }
  get kind() {
    return this._kind;
  }
  get name() {
    return this._name;
  }
}

class Owner {
  constructor(name) {
    this._name = name;
    this.pets = [];
  }

  adopt(pet) {
    this.pets.push(pet);
  }

  numberOfPets() {
    return this.pets.length;
  }

  get name() {
    return this._name;
  }
}

class Shelter {
  // This implementation tracks the owner-pet adoptions that each shelter instance conducts, leaving the possibility for owners to have pets which were not adopted at this shelter.

  constructor() {
    this.adoptions = new Map();
  }

  adopt(owner, pet) {
    owner.adopt(pet);
    if (this.adoptions.has(owner)) {
      let existingPets = this.adoptions.get(owner);
      this.adoptions.set(owner, [...existingPets, pet]);
    } else {
      this.adoptions.set(owner, [pet]);
    }
    return `yay!`
  }

  printAdoptions() {
    for (let [owner, pets] of this.adoptions) {
      console.log(`${owner.name} has adopted the following pets:`);
      for (let pet of pets) {
        console.log(`a ${pet.kind} named ${pet.name}`);
      }
    }
  }
}

let butterscotch2 = new Pet2('cat', 'Butterscotch');
let pudding2      = new Pet2('cat', 'Pudding');
let darwin       = new Pet2('bearded dragon', 'Darwin');
let kennedy      = new Pet2('dog', 'Kennedy');
let sweetie      = new Pet2('parakeet', 'Sweetie Pie');
let molly        = new Pet2('dog', 'Molly');
let chester      = new Pet2('fish', 'Chester');

let phanson = new Owner('P Hanson');
let bholmes = new Owner('B Holmes');

let shelter = new Shelter();
shelter.adopt(phanson, butterscotch2);
shelter.adopt(phanson, pudding2);
shelter.adopt(phanson, darwin);
shelter.adopt(bholmes, kennedy);
shelter.adopt(bholmes, sweetie);
shelter.adopt(bholmes, molly);
shelter.adopt(bholmes, chester);
shelter.printAdoptions();
console.log(`${phanson.name} has ${phanson.numberOfPets()} adopted pets.`);
console.log(`${bholmes.name} has ${bholmes.numberOfPets()} adopted pets.`);

// P14
class Banner {
  constructor(message) {
    this.message = message;
    this.width = message.length + 2;
  }

  displayBanner() {
    console.log([this.horizontalRule(), this.emptyLine(), this.messageLine(), this.emptyLine(), this.horizontalRule()].join("\n"));
  }

  horizontalRule() {
    return `+${'-'.repeat(this.width)}+`;
  }
  
  emptyLine() {
    return `|${' '.repeat(this.width)}|`;
  }

  messageLine() {
    return `| ${this.message} |`
  }
}

let banner1 = new Banner('To boldly go where no one has gone before.');
banner1.displayBanner();
// +--------------------------------------------+
// |                                            |
// | To boldly go where no one has gone before. |
// |                                            |
// +--------------------------------------------+

let banner2 = new Banner('');
banner2.displayBanner();
// +--+
// |  |
// |  |
// |  |
// +--+