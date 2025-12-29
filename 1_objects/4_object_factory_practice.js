// Problem 1
// Each country has the same code to define its properties and singular method

// Problem 2
let makeCountry = function(name, continent) {
  return {
    name,
    continent,
    getDescription() { 
      return this.name + ' is located in ' + this.continent + '.' 
    },
  }
}

let chile = makeCountry('The Republic of Chile', 'South America');
let canada = makeCountry('Canada', 'North America');
let southAfrica = makeCountry('The Republic of South Africa', 'Africa');

console.log(chile.getDescription());       // "The Republic of Chile is located in South America."
console.log(canada.getDescription());      // "Canada is located in North America."
console.log(southAfrica.getDescription()); // "The Republic of South Africa is located in Africa."

// Problem 3
let makeCountry2 = function(name, continent) {
  return {
    name,
    continent,
    visited: false,
    getDescription() { 
      return this.name + ' is located in ' + this.continent + '.' 
    },
  }
}


// Problem 4

let makeCountry3 = function(name, continent, visited = false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      return `${this.name} is located in ${this.continent}.`
    },
  }
}

// Problem 5
makeCountry3.visitCountry = function() {
  this.visited = true;
}

// Problem 6
let makeCountry4 = function(name, continent, visited=false) {
  return {
    name,
    continent,
    visited,
    getDescription() {
      return `${this.name} is located in ${this.continent}. I ${this.visited ? 'have' : "haven't"} visited ${this.name}.`;
    },
    visitCountry() {
      this.visited = true;
    }
  }
}

canada = makeCountry4('Canada', 'North America');
console.log(canada.getDescription());
canada.visitCountry();
console.log(canada.getDescription());