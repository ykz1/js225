// P1
// 2 will be logged 6 times
// 1. from line 13 -> line 10 when `Foo` is called as a constructor function with `new`. The 2 that is logged is evaluated as the value of `foo`'s property `a`
// 2. from line 15, when `bar` is invoked as a method of `foo`. The 2 that is logged again comes from `foo`'s property `a`
// 3. from line 16 -> line 10, when `Foo` is called again but without `new`. This is a function invocation, and so `this` within `Foo` has implicit context of the global object. `a` and `bar` are created as properties of the global object, and the 2 that is logged comes from the global object's `a`.
// 4. from line 19 -> line 10, when `Foo` is called with execution context set to `obj`. The 2 that is logged here comes from `obj`'s property `a`
// 5. from line 20, similar to line 15, `bar` is invoked as a method of `obj`, and the 2 logged comes from `obj`'s `a` property
// 6. finally, 2 is logged from line 22 as the value of global object's property `a`


// P2
// NaN will be logged twice, because `this` within constant RECTANGLE refers to the global object, which does not have properties `width` or `height`.
// The problem is that when we assign values to `rect1`'s `area` and `perimeter` properties, we are invoking `area()` and `perimeter()` as methods of `RECTANGLE`, and both perform arithmetic operations on `undefined`, resulting in `NaN`.
// There are a few ways to fix this, one is to define methods `area` and `perimeter` as methods of `Rectangle`'s function prototype object, which is also the object prototype for all instances of `Rectangle` created with `new`. Then, when we log area and perimeter, we can call the methods `area()` and `perimeter()`, rather than access properties with those names.

function Rectangle(width, height) {
  this.width = width;
  this.height = height;
}

Rectangle.prototype.area = function() {
  return this.width * this.height;
}

Rectangle.prototype.perimeter = function() {
  return 2 * (this.width + this.height);
}

let rect1 = new Rectangle(2, 3);
console.log(rect1.area());
console.log(rect1.perimeter());

// P3
function Circle(radius) {
  this.radius = radius;
}
Circle.prototype.area = function() {
  return Math.PI * this.radius**2;
}
let a = new Circle(3);
let b = new Circle(4);

console.log(a.area().toFixed(2)); // => 28.27
console.log(b.area().toFixed(2)); // => 50.27

// P4
// `true` will be logged. `ninja` is created as an instance of `Ninja`, with its object prototype i.e. `[[Prototype]]` set to the function prototype of `Ninja`, which is also referenced by its `prototype` property. When we add the method `swingSword` to `Ninja`'s function prototype, all instances of `Ninja` "inherit" this method through prototypal inheritance. When `swingSword` is invoked as a method of `ninja`, its execution context `this` is the calling object `ninja`.

// P5
// An exception will be thrown, because `ninja` does not have a `swingSword` property in its prototype chain. This is because line 8 is a reassignment of `Ninja`'s function prototype from the one that all of `Ninja`'s instances points to, to a new object which has a method called `swingSword`. This reassignment is only for `Ninja`'s function prototype, but it does not reassign the object prototype of `Ninja`'s instances, such as `ninja`. As a result, `ninja` does not inherit this new method we are defining, because it is defined on a different object than `ninja`'s object prototype.

// P6
let ninjaA;
let ninjaB;
function Ninja() {
  this.swung = false;
}

ninjaA = new Ninja();
ninjaB = new Ninja();

Ninja.prototype.swing = function() {
  this.swung = true;
  return this;
}
// Add a swing method to the Ninja prototype which
// returns the calling object and modifies swung

console.log(ninjaA.swing().swung);      // must log true
console.log(ninjaB.swing().swung);      // must log true

// P7
let ninjaC = (function() {
  function Ninja(){};
  return new Ninja();
})();

let ninjaD = Object.create(Object.getPrototypeOf(ninjaC));

console.log(ninjaD.constructor === ninjaC.constructor);    // should log true