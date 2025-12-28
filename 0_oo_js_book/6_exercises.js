// Exercise 1

function Smartphone(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.battery = 75;
}

Smartphone.prototype.checkBattery = function() {
  console.log(`Battery at ${this.battery}%.`);
}

Smartphone.prototype.getInfo = function() {
  console.log(`${this.year} ${this.brand} ${this.model}.`)
}

let iPhone12 = new Smartphone('Apple', 'iPhone12', 2020);
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', 2021);

iPhone12.checkBattery();
iPhone12.getInfo();
galaxyS21.checkBattery();
galaxyS21.getInfo();


// Exercise 2
function Vehicle(color, weight) {
  this.color = color;
  this.weight = weight;
}
Vehicle.prototype.accelerate = function() {console.log('Sleeping up!')};
Vehicle.prototype.decelerate = function() {console.log('Slowing down...')};

function Car(color, weight, license) {
  Vehicle.call(this, color, weight);
  this.license = license;
}
Car.prototype = Object.create(Vehicle.prototype);
Car.prototype.constructor = Car
Car.prototype.honk = function() {console.log('Beep beep!')};

function Boat(color, weight, port) {
  Vehicle.call(this, color, weight);
  this.port = port
}
Boat.prototype = Object.create(Vehicle.prototype);
Boat.prototype.constructor = Boat;
Boat.prototype.dropAnchor = function() {console.log('Dropping anchor!')};

function Plane(color, weight, airline) {
  Vehicle.call(this, color, weight);
  this.airline = airline
}
Plane.prototype = Object.create(Vehicle.prototype);
Plane.prototype.constructor = Plane
Plane.prototype.takeOff = function() {console.log('Taking off!')};
Plane.prototype.land = function() {console.log('Landing...')};

let myCar = new Car('White', 2500, 'C997');
let myBoat = new Boat('Red', 9999, 'Toronto');
let myPlane = new Plane('Yellow', 8000, 'YKZ');

console.log();
console.log(myCar.color, myCar.license, myCar.weight);
myCar.accelerate();
myCar.decelerate();
myCar.honk();

console.log();
console.log(myBoat.color, myBoat.port, myBoat.weight);
myBoat.accelerate();
myBoat.decelerate();
myBoat.dropAnchor();

console.log();
console.log(myPlane.color, myPlane.airline, myPlane.weight);
myPlane.accelerate();
myPlane.decelerate();
myPlane.takeOff();
myPlane.land();