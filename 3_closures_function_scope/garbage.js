// Problem 1
// [1] becomes eligible for GC once `add()` is invoked and `a` is reassigned to another object
// [2] becomes eligible for GC after `run()`'s invocation; because it is only referenced by `c` within the function scope created by `run()`, and `c` only exists for the duration of `run()`'s invocation
// [1, 2] is the array object that global variable `a` points to by the end of the code, and so does not get garbage collected

// Problem 2
// Not until the program finishes running, because `names` continues to reference `['Steve', 'Eddie']` and remains a referenced variable within `helloSteveAndEddie`, which is a function object on the global scope