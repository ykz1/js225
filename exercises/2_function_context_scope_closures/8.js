function newStack() {
  const stack = [];
  return {
    push(item) {
      stack.push(item);
      return item
    },
    pop() {
      return stack.pop();
    },
    printStack() {
      stack.forEach(item => console.log(item));
    },
  }
}

let myStack = newStack();

myStack.printStack();

console.log();
myStack.push('123');
myStack.printStack();

console.log();
myStack.push(456);
myStack.printStack();

console.log();
myStack.pop();
myStack.printStack();

console.log(myStack.stack) // undefined