// P1
// Yes, JS is a GC language: it will automatically manage memory for the programmer. Specifically, JS will allocate memory when needed, make values held in memory available when needed, and then attempt to guess when memory is no longer needed and free up that memory.

// P2
let myNum = 1;

function foo() {
  let myArr = ['this is an array'];
  // neither `1` nor `['this is an array']` are eligible for GC here because both are still referenced, by `myNum` and `myArr`, respectively, both of which are variables still in scope within `foo()`'s function definition here
}

foo();

// ['this is an array'] is available for GC here once `foo()` finishes executing, since `myArr` is no longer in scope

// more code

// P3
function makeGreeting() {
  let foo = { greeting: 'hello' };
  return function(name) {
    foo.name = name;
    return foo;
  };
}

let greeting = makeGreeting();

// No, the object referenced by `foo` is not eligible for for GC here, because it is part of the closure that encloses the function object referenced by `greeting`.

// However, if the object were not referenced outside the function definition, the object would not be reachable outside of the function object and therefore be eligible for GC. See below:

function makeGreeting2() {
  return function(name) {
    return { greeting: 'hello', name };
  }
}

let greeting2 = makeGreeting2();