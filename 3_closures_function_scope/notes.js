function funcyTime(func) {
  return function() {
    let start = new Date();
    func();
    let stop = new Date();
    console.log(`Elapsed time: ${(stop - start).toString()} ms.`);
  };
}

let hiTime = funcyTime(() => console.log('Hi'));
hiTime();

let loopyTime = funcyTime(() => {
  let sum = 0;
  for (let i = 1; i <= 1000000000; i++) {
    sum += i;
  }
  console.log(sum);
});
loopyTime();