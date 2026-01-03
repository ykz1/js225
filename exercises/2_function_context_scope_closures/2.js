// The method initially did not return the desired object because `this` within the callback function did not have explicit execution context, and so `this` resolved to the global object, resulting in `this.name` resolving to `undefined`.

// There are a few ways to fix this, the most direct being using `map`'s ability to pass a context argument to its callback function:

const franchise = {
  name: 'How to Train Your Dragon',
  allMovies() {
    return [1, 2, 3].map(function(number) {
      return `${this.name} ${number}`;
    }, this);
  },
};

console.log(franchise.allMovies());