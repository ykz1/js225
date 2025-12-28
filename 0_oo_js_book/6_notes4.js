class Dog {
  constructor() {}

  speak() {
    console.log('Bark');
  }
}

function Cat() {}
Cat.prototype.speak = function() {
  console.log('Bark');
}


let Mouse = {
  speak() {
    console.log('Bark');
  }
};

let Rat = () => {
  return {
    speak() {
      console.log('Bark');
    }
  }
};

console.log(Dog.prototype);
console.log(Cat.prototype);
console.log(Mouse.prototype); // no function prototype for object literals
console.log(Rat.prototype); // no function prototype for arrow functions