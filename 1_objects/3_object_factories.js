// Problem 1
let makeCar = function(rate) {
  return {
    speed: 0,
    rate,
    accelerate() {this.speed += this.rate},
  }
}

let sedan = makeCar(8);
sedan.accelerate();
console.log(sedan.speed);

let coupe = makeCar(12);
coupe.accelerate();
console.log(coupe.speed);

// Problem 2
let hatchback = makeCar(9);

// Problem 3
let makeCar2 = function(accelerateRate, brakingRate) {
  return {
    speed: 0,
    accelerateRate,
    brakingRate,
    accelerate() {this.speed += this.accelerateRate},
    brake() {this.speed -= Math.min(this.brakingRate, this.speed)}
  }
}

let sedan2 = makeCar2(8, 6);
sedan2.accelerate();
console.log(sedan2.speed);

sedan2.brake();
console.log(sedan2.speed);

sedan2.brake();
console.log(sedan2.speed);
