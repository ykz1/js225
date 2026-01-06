// P1
// 1 will be logged. JS will look in `bar` for property `a`, not find it, then move up its prototype chain to `foo` and find it there.

// P2
// 2 will be logged. JS will look for property `a` within `bar`, find it pointing to value 2, then log that value. 

// P3
// We can use hasOwnProperty to test whether myProp is far's method

let boo = {};
boo.myProp = 1;

let far = Object.create(boo);

// lots of code

far.myProp;       // 1
console.log(far.hasOwnProperty('myProp'));
console.log(boo.hasOwnProperty('myProp'));