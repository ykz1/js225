function objectsEqual2(a, b) {
  if (a === b) return true;
  return keysMatch(a, b) && valuesMatch(a, b);
}

function keysMatch(a, b) {
  a = Object.keys(a);
  b = Object.keys(b);
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (!b.includes(a[i])) return false;
  }
  return true;}

function valuesMatch(a, b) {
  keys = Object.keys(a);
  for (let i = 0; i < keys.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

let objectsEqual1 = function(a, b) {
  if (a === b) return true;
  if (a.length !== b.length) return false;
  const bKeys = Object.keys(b);
  for (const key in a) {
    if (!bKeys.includes(key)) return false;
    if (a[key] !== b[key]) return false;
  }
  return true;
}

console.log(objectsEqual1({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual1({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual1({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual1({}, {}));                                      // true
console.log(objectsEqual1({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false

console.log();
console.log(objectsEqual2({a: 'foo'}, {a: 'foo'}));                      // true
console.log(objectsEqual2({a: 'foo', b: 'bar'}, {a: 'foo'}));            // false
console.log(objectsEqual2({a: 'foo', b: 'bar'}, {b: "bar", a: 'foo'}));  // true
console.log(objectsEqual2({}, {}));                                      // true
console.log(objectsEqual2({a: 'foo', b: undefined}, {a: 'foo', c: 1}));  // false