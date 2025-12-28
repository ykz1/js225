// Some notes

class Rectangle {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }

  area() {
    return this.height * this.width;
  }
}

class Square extends Rectangle {
  constructor(side) {
    super(side, side);
    this.side = side;
  }
}

let mySquare = new Square(5);
console.log(mySquare.area());
console.log(typeof mySquare);
console.log(mySquare instanceof Square);
console.log(mySquare instanceof Rectangle);


// Exercise 1
class Smartphone {
  constructor(brand, model, year) {
    this.brand = brand;
    this.model = model;
    this.year = year;
    this.batteryLevel = 75;
  }
  checkBattery()  { return `Battery level at ${this.batteryLevel}` }
  getInfo()       { return `${this.year} ${this.brand} ${this.model}` }
}

let iPhone12 = new Smartphone('Apple', 'iPhone12', '2020');
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', '2021');

console.log(iPhone12.getInfo());
console.log(iPhone12.checkBattery());
console.log(galaxyS21.getInfo());
console.log(galaxyS21.checkBattery());

// Exercise 2
class Dog { };
let boo = new Dog();
let boosPhone = new Smartphone();
console.log(boo instanceof Dog);
console.log(boo);
console.log(boosPhone instanceof Dog);

// Exercise 3
class Vehicle {
  constructor(color, weight) {
    this.color = color;
    this.weight = weight;
  }
  accelerate() { return `Speeding up!` }
  decelerate() { return `Slowing down...` }
}

class Car extends Vehicle {
  constructor(color, weight, license) {
    super(color, weight);
    this.license = license;
  }
  honk()    { return `Beep beep!` }
}

class Boat extends Vehicle {
  constructor(color, weight, port) {
    super(color, weight);
    this.port = port;
  }
  dropAnchor()  { return `Dropping anchor!` }
}

class Plane extends Vehicle {
  constructor(color, weight, airline) {
    super(color, weight);
    this.airline = airline;
  }
  takeOff() { return `Lifting off!` }
  land()    { return 'Landing...'}
}

let myCar = new Car('White', 1234, 'C997');
let myBoat = new Boat('Red', 4321, 'Port of Toronto');
let myPlane = new Plane('Yellow', 3333, 'YKZ');

console.log();

console.log(myCar);
console.log(myCar.accelerate());
console.log(myCar.honk());
console.log(myCar.decelerate());

console.log();

console.log(myBoat);
console.log(myBoat.accelerate());
console.log(myBoat.dropAnchor());
console.log(myBoat.decelerate());

console.log();

console.log(myPlane);
console.log(myPlane.takeOff());
console.log(myPlane.accelerate());
console.log(myPlane.decelerate());
console.log(myPlane.land());

// Exercise 4
console.log(myCar instanceof Vehicle);
console.log(myBoat instanceof Vehicle);
console.log(myCar instanceof Car);
console.log(myBoat instanceof Car);