// P1
let prot = {};
let foo = Object.create(prot);

// P2
console.log(Object.getPrototypeOf(foo) === prot); // should be true

// P3
console.log(prot.isPrototypeOf(foo)); // should be true

// P4
// Both of these should be true, because foo inherits from prot, which in turn inherits from Object.prototype.
console.log(prot.isPrototypeOf(foo));
console.log(Object.prototype.isPrototypeOf(foo));