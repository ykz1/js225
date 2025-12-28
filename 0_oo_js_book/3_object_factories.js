// Exercise 1

function createFruit(name, color) {
  return {
    name,
    color,
    isRipe() {return `This ${this.name} is ripe.`},
    describe() {return `This ${this.name} is ${this.color}`},
  }
}

let apple = createFruit('Apple', 'Red');
let banana = createFruit('Banana', 'Yellow');
let blackberry = createFruit('Blackberry', 'Black');

console.log(apple);
console.log(apple.describe());
console.log(apple.isRipe());
console.log(banana);
console.log(banana.describe());
console.log(banana.isRipe());
console.log(blackberry);
console.log(blackberry.describe());
console.log(blackberry.isRipe());

// Exercise 2
function createSmartphone(brand, model, year) {
  return {
    brand,
    model,
    year,
    batteryLevel() {return `Battery is full`},
    showInfo() {return `${this.year} ${this.brand} ${this.model}`},
  }
}

let iPhone12 = createSmartphone('Apple', 'iPhone 12', '2020');
let galaxyS21 = createSmartphone('Samsung', 'Galaxy S21', '2021');

console.log(iPhone12);
console.log(iPhone12.showInfo());
console.log(galaxyS21);
console.log(galaxyS21.showInfo());


// Exercise 3

function createInstrument(name, type) {
  return {
    name,
    type,
    play() {console.log(`We are playing a tune on this ${this.name}`)},
    showType() {console.log(`This ${this.name} is a ${this.type} instrument`)},
  }
}

let violin = createInstrument('violin', 'string');
violin.play();     // We are playing a tune on this violin
violin.showType(); // This violin is a string instrument

let flute = createInstrument('flute', 'wind');
flute.play();      // We are playing a tune on this flute
flute.showType();  // This flute is a wind instrument

let drum = createInstrument('drum', 'percussion');
drum.play();       // We are playing a tune on this drum
drum.showType();   // This drum is a percussion instrument