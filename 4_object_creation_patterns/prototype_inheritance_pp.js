// P1
function getDefiningObject(object, propKey) {
  let testObj = object;
  while (testObj && !testObj.hasOwnProperty(propKey)) {
    testObj = Object.getPrototypeOf(testObj);
  }
  return testObj;
}

let foo = {
  a: 1,
  b: 2,
};

let bar = Object.create(foo);
let baz = Object.create(bar);
let qux = Object.create(baz);

bar.c = 3;

console.log(getDefiningObject(qux, 'c') === bar);     // => true
console.log(getDefiningObject(qux, 'e'));             // => null

// P2
function shallowCopy(object) {
  let newObj = Object.create(Object.getPrototypeOf(object));
  Object.assign(newObj, object);
  return newObj;
}

let par = {
  a: 1,
  b: 2,
};

let moo = Object.create(par);
moo.c = 3;
moo.say = function() {
  console.log('c is ' + this.c);
};

let boz = shallowCopy(moo);
console.log(boz.a);       // => 1
boz.say();                // => c is 3
console.log(boz.hasOwnProperty('a'));  // false
console.log(boz.hasOwnProperty('b'));  // false
console.log(boz.hasOwnProperty('c'));  // true

// P3
// A few design decisions:
// - extend will only extend destination object with contents from source objects themselves, and not contents up the source objects' prototype chains
// - extend will only add a property to destination if it doesn't already exist
function extend(destination, ...sources) {
  sources.forEach(source => {
    for (let prop in source) {
      if (Object.hasOwn(source, prop) && !Object.hasOwn(destination, prop)) {
        destination[prop] = source[prop];
      }
    }
  });
  return destination;
}

let poo = {
  a: 0,
  b: {
    x: 1,
    y: 2,
  },
};

let moe = {
  name: 'Moe'
};

let funcs = {
  sayHello() {
    console.log('Hello, ' + this.name);
  },

  sayGoodBye() {
    console.log('Goodbye, ' + this.name);
  },
};

let object = extend({}, poo, moe, funcs);

console.log(object.b.x);          // => 1
object.sayHello();                // => Hello, Moe