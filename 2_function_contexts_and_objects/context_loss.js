// 1
// `this` resolves to the global object because of how the function is ultimately invoked, which is as a function call. This is an example of a method losing its context when taken out of their object

// 2
let turk = {
  firstName: 'Christopher',
  lastName: 'Turk',
  occupation: 'Surgeon',
  getDescription() {
    return this.firstName + ' ' + this.lastName + ' is a ' + this.occupation + '.';
  }
};

function logReturnVal(func, context) {
  let returnVal = func.call(context);
  console.log(returnVal);
}

logReturnVal(turk.getDescription, turk);

// 3
let getTurkDescription = turk.getDescription.bind(turk);
console.log(getTurkDescription());

// 4
// No, this code will not log our desired outcome, because each invocation of the callback function passed to `forEach` will be executed as a function call, and so the execution context will be the global object, and `this.SeriesTitle` will resolve to `undefined`
// This is an example of functions losing their surrounding context when passed as an argument

// 5
// This works because arrow functions have their execution context set by their surrounding function, which in this case is `listGames` which was invoked as a method with `TESgames` as `this`
let TESgames = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(title => console.log(this.seriesTitle + ' ' + title));
  }
};

TESgames.listGames();

// 6
// Here, we lock in the execution context of `listGames`'s invocation to `self`, in this case it is `TESgames` because `listGames` was invoked as a method.
// We then use `self` within the callback function passed to `forEach`, and `self` is in scope there because of lexical scoping rules, resolving to `TESgames` each time the anonymous callback function is called

let TESgames2 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    let self = this;
    this.titles.forEach(function(title) {
      console.log(self.seriesTitle + ' ' + title);
    });
  }
};

TESgames2.listGames();

// 7
// `forEach` takes an optional `thisArg` argument, which can be used to pass on execution context to each invocation of the callback function it is called

let TESgames3 = {
  titles: ['Arena', 'Daggerfall', 'Morrowind', 'Oblivion', 'Skyrim'],
  seriesTitle: 'The Elder Scrolls',
  listGames() {
    this.titles.forEach(function(title) {
      console.log(this.seriesTitle + ' ' + title);
    }, this);
  }
};

TESgames3.listGames();

// 8
// It will be 0 because `this` on line 5 will have execution context of global object, since `increment` was invoked as a function on line 8
// This is an example of internal functions losing their method context

// 9

let foo = {
  a: 0,
  incrementA() {
    function increment() {
      this.a += 1;
    }

    increment.call(this);
  }
};

foo.incrementA();
foo.incrementA();
foo.incrementA();

console.log(foo.a);

// 10
let foo2 = {
  a: 0,
  incrementA() {
    let increment = function() {
      this.a += 1;
    }.bind(this);

    increment();
    increment();
    increment();
  }
};

foo2.incrementA();
console.log(foo2.a);