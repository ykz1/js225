function myBind(func, thisArg, ...boundArgs) {
  return function(...additionalArgs) {
    return func.call(thisArg, ...boundArgs, ...additionalArgs);
  }
}

function myFunc(str1, str2) {
  console.log(`${this.a} ${this.b} ${str1} ${str2}`);
}

let myObj = {
  a: 'hello',
  b: 'world',
  myMethod(str1, str2) {
    console.log(`${this.a} ${this.b} ${str1} ${str2}`);
  }
}
myObj.myMethod('from', 'kyle'); // hello world from kyle
myFunc('from', 'kyle'); // undefined undefined from kyle

let myBoundFunc = myBind(myFunc, myObj);
myBoundFunc('from', 'kyle'); // hello world from kyle

function list(...args) {
  return args;
}

function addArgs(arg1, arg2) {
  return arg1 + arg2;
}

console.log(list(1, 2, 3, 4, 5)); // [1, 2, 3, 4, 5]
let leading123List = myBind(list, null, 1, 2, 3);
console.log(leading123List()); // [1, 2, 3]
console.log(leading123List(4, 5)); // [1, 2, 3, 4, 5]

console.log(addArgs(1, 2)); // 3
let addFortyTwo = myBind(addArgs, null, 42);
console.log(addFortyTwo(5)); // 47
console.log(addFortyTwo(5, 10)); // 57...last arg 10 is ignored, similar to `bind()`'s implementation