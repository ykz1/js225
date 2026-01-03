function myBind(func, thisArg) {
  return function() {
    return func.call(thisArg, ...arguments);
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
