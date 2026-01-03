/*
There are several ways to solve this:
1. pass a `thisArg` argument to `map` to be passed as the explicit execution context for the callback function passed to `map`
2. set a variable, such as `self`, to "lock down" the execution context and then, within the callback function passed to `map`, instead of `this`, use `self`, which is in scope because of lexical scoping rules.
3. use an arrow function to pass a callback function to `map` instead of a function expression. The key difference is that `this` within arrow functions have their execution context set to the execution function of their surrounding function
4. pass an anonymous function hard-bound to our desired context as the callback function to `map`
*/

// 1. pass context through `map`'s `thisArg`
const franchise1 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};

console.log(franchise1.allMovies());

// 2. use a variable `self`

const franchise2 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    let self = this;
    return [1, 2, 3].map(function(number) {
      return `${self.name} ${number}`;
    });
  },
};

console.log(franchise2.allMovies());

// 3. use an arrow function as the callback function

const franchise3 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(number => {
      return `${this.name} ${number}`;
    });
  },
};

console.log(franchise3.allMovies());

// 4. hard-bind the function passed as callback to `map`

const franchise4 = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }.bind(this));
  },
};

console.log(franchise4.allMovies());