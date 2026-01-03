// P1
// An exception will be thrown because JS is unsure whether {} is an expression or a function definition code body

// P2
(function() {
  console.log("Sometimes, syntax isn't intuitive!")
})();

// P3
// The error that occurs is due to hoisting: the function `sum()` is hoisted above the `var` declaration for the same name. As a result, by the time we attempt to call `sum(numbers)`, the name `sum` points to the number variable and not the function object.


let sum = 0;
let numbers;

sum += 10;
sum += 31;

numbers = [1, 7, -3, 3];

sum += (function sum(arr) {
  return arr.reduce((sum, num) => sum + num, 0);
})(numbers);

console.log(sum);

// P4
// What's the point of this IIFE?

function countdown(n) {
  (function(n) {
    for (let i = n; i >= 0; i--) {
      console.log(i)
    }
    console.log('Done!');
  })(n);
}

countdown(7);

// P5
// No, because it is immediately invoked and the name `foo` does not exist outside of the parentheses

// P6
function countdown2(n) {
  (function count() {
    console.log(n--);
    if (n < 0) {
      console.log('Done!');
    } else {
      count();
    }
  })();
}

countdown2(7);