let generateID = (function() {
  let nextID = 1;
  return function() {
    return nextID++;
  }
})();

let idGenerator = function() {
  let nextID = 1;
  return function() {
    return nextID++;
  }
}

let generateID2 = idGenerator();

console.log(generateID());
console.log(generateID());
console.log(generateID());
console.log(generateID2());
console.log(generateID2());
console.log(generateID2());