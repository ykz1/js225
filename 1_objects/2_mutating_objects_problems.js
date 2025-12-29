// Problem 1
let message = 'Hello from the global scope!';

function func(message) {
  message = 'Hello from the function scope!'; // re-assigns local variable to a new string
  console.log(message); // logs 'Hello from the function scope!'
}

func(message);
console.log(message); // logs 'Hello from the global scope' because global variable `messages` remains pointing to original string

// Problem 2
let myObj = { message: 'Greetings from the global scope!' };

function func2(obj) {
  obj.message = 'Greetings from the function scope!'; // Re-assignment of a property in an object will mutate that object
  console.log(obj.message); // logs 'Greetings from the function scope!'
}

func2(myObj);

console.log(myObj.message); // logs 'Greetings from the function scope!'

// Problem 3
// 'Hello from the function scope!' will be logged twice, because there is only one `message` variable here, the one in the global scope
message = 'Hello from the global scope!';

function func3() {
  message = 'Hello from the function scope!'; // js looks in func3's function scope and doesn't find name message, so it looks in the global scope and finds the variable there; and so this is a reassignment of the global variable `message`
  console.log(message); 
}

func3();
console.log(message);

// Problem 4
let a = 10;
let obj = {
  a
}

let newObj = obj; // both obj and newObj point to the same underlying object
newObj.a += 10; // reassigns property a to a new number, this change mutates the object, which obj and newObj both still point to

console.log(obj.a === a); // false, because global variable a still points to 10
console.log(newObj.a === obj.a); // true, because obj and newObj point to the same object


// Problem 5
let animal = {
  name: 'Pumbaa',
  species: 'Phacochoerus africanus',
};

let menagerie = {
  warthog: animal, // menagerie.warthog and animal point to the same object
};

animal = { // animal now points to a new object
  name: 'Timon',
  species: 'Suricata suricatta',
};

menagerie.meerkat = animal; // creates a new property meerkat in menagerie to point to the same object that animal now points to i.e. the second object

menagerie.warthog === animal; // false because animal now points to a different animal
menagerie.meerkat === animal; // true because meerkat was defined to point to the same object that animal points to

//to answer the question, the second to last line returns false because the reassignment of animal on line 10 does not mutate the object it previously points to and that menagerie.warthog points to