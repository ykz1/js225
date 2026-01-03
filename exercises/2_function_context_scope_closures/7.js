function makeArrays() {
  let array = []; // 2. array object created in memory

  return () => { // 3. `makeArrays` returns an anonymous function which references the array object
    array.push(''); // 5. empty string element added to end of array object
    return array; // 6. array object returned
  };
}

const pushIt = makeArrays(); // 1. `makeArrays` invoked, and returned function assigned to `pushIt`
pushIt(); // 4. `pushIt` invoked, array object returned but nothing is done with it
// more code

// After line 11, the array assigned to `array` is not eligible for GC because it is contained within the closure of the function object that remains assigned to `pushIt`