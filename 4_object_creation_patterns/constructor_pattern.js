// P1
// Constructor functions are to be named with a capital first letter

// P2
// 'undefined' will be logged because `Lizard` was called without `new`, and as a result `this` within `Lizard` refers to the global object. `scamper` was set as a property of the global object rather than `lizzy`, and so `lizzy.scamper` resolves to undefined.

// P3
function Lizard() {
  this.scamper = function() {
    console.log("I'm scampering!");
  };
}

let lizzy = new Lizard();
lizzy.scamper(); // ?