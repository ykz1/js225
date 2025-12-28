// Exercise 1

let Cessna152 = {
  fuelCapacity:   '24.5 gallons',
  cruisingSpeed:  '111 knots',
  takeOff()       {console.log('Taking off...')},
  land()          {console.log('Landing!')},
}

let kylesCessna = Object.assign({}, Cessna152);
kylesCessna.takeOff();
console.log(kylesCessna.cruisingSpeed);
kylesCessna.land();

// Exercise 2

// Using a factory function:
function Book(title, author, year) {
  return {
    title,
    author,
    year,
  }
}

// Using a constructor function:
function Book2(title, author, year) {
  this.title = title;
  this.author = author;
  this.year = year;
}

let bookNeuromancer = Book('Neuromancer', 'William Gibson', 1984);
let bookDoomsdayBook = Book('Doomsday Book', 'Connie Willis', 1992);

let bookNeuromancer2 = new Book2('Neuromancer', 'William Gibson', 1984);
let bookDoomsdayBook2 = new Book2('Doomsday Book', 'Connie Willis', 1992);

console.log(bookNeuromancer);
console.log(bookDoomsdayBook);
console.log(bookNeuromancer2);
console.log(bookDoomsdayBook2);

// Here, Book2 is the type of object created, function Book2(title, author, year) {} is the construction function, and bookNeuromancer2 and bookDoomsdayBook2 are the instance objects.

// Exercise 3

function MusicalAlbum(title, artist, year) {
  this.title = title;
  this.artist = artist;
  this.year = year;
}

let thriller = new MusicalAlbum('Thriller', 'Michael Jackson', 1982);
let darSideOfTheMoon = new MusicalAlbum('Thriller', 'Michael Jackson', 1982)

console.log(thriller);
console.log(darSideOfTheMoon);

// Here, `MusicalAlbum` is the type of object created. Line 48 is the constructor function. `thriller` and `dardSideOfTheMoon` are the two instance objects.

// Exercise 4

function Smartphone(brand, model, year) {
  this.brand = brand;
  this.model = model;
  this.year = year;
  this.checkBattery = function() {console.log('Checking battery...')};
  this.displayInfo = () => console.log(`Your ${this.year} ${this.brand} ${this.model}`)
}

let iPhone12 = new Smartphone('Apple', 'iPhone 12', 2020);
let galaxyS21 = new Smartphone('Samsung', 'Galaxy S21', 2021);

console.log(iPhone12);
iPhone12.checkBattery();
iPhone12.displayInfo();

console.log(galaxyS21);
galaxyS21.checkBattery();
galaxyS21.displayInfo();