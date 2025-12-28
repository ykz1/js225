// Exercise 1



class Person {
  #name;
  #age;

  constructor(name, age) {
    this.#name = name;
    this.age = age;
  }

  set age(value) {
    if (typeof value === 'number' && value > 0) {
      this.#age = value;
    } else {
      throw new RangeError("Value must be positive");
    }
  }

  showAge() {
    console.log(this.#age);
  }
}

let person = new Person('John', 30);
person.showAge(); // 30
person.age = 31;
person.showAge(); // 31

try {
  // This line should raise a RangeError,
  // but does not.
  person.age = -5;
  person.showAge(); // -5
} catch (e) {
  // The following line should run, but won't
  console.log('RangeError: Age must be positive');
}

// Exercise 2
class Book {
  #title;
  #author;
  #year;

  constructor(title, author, year) {
    this.#title = title;
    this.#author = author;
    this.year = year;
  }

  get title()   { return this.#title; }
  get author()  { return this.#author; }
  get year()    { return this.#year; }

  set year(year) {
    if (typeof year === 'number' && year > 1900) {
      this.#year = year;
    } else {
      throw new RangeError('Invalid year, must be greater than 1900');
    }
  }

}

let book = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 1925);
console.log(book.title);  // The Great Gatsby
console.log(book.author); // F. Scott Fitzgerald
console.log(book.year);   // 1925

book.year = 1932;         // Changing year
console.log(book.year);   // 1932

try {
  book.year = 1825;
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

try {
  let book2 = new Book('A Tale of Two Cities', 'Charles Dickens', 1859);
} catch (e) {
  console.log(e);   // RangeError: Invalid year
}

// Exercise 3

class BankAccount {
  #balance;

  constructor() {
    this.#balance = 0;
  }

  deposit(amount) {
    this.#balance += amount;
    console.log(`${amount} deposited. New balance: ${this.#balance}`)
  }
  
  withdraw(amount) {
    if (amount <= this.#balance) {
      this.#balance -= amount;
      console.log(`${amount} withdrawn. New balance: ${this.#balance}`);
    } else {
      throw new RangeError('Insufficient funds');
    }
  }

  #checkBalance() {
    console.log(`Balance: ${this.#balance}`);
  }
}

let account = new BankAccount();
account.deposit(100);
account.withdraw(50);
try {
  account.withdraw(100); // RangeError: Insufficient funds
} catch (e) {
  console.log(e);
}

// Exercise 4
class Rectangle {
  #width;
  #height;

  constructor(w, h) {
    this.width = w;
    this.height = h;
  }

  get area() {
    return this.width * this.height;
  }

  get width() { 
    return this.#width;
  }

  set width(value) {
    if (typeof value === 'number' && value > 0) {
      this.#width = value;
    } else {
      throw new RangeError('width must be positive');
    }
  }

  get height() { 
    return this.#height;
  }

  set height(value) {
    if (typeof value === 'number' && value > 0) {
      this.#height = value;
    } else {
      throw new RangeError('height must be positive');
    }
  }

}

let rect = new Rectangle(10, 5);
console.log(rect.area); // 50

rect.width = 20;
console.log(rect.area); // 100

rect.height = 12;
console.log(rect.area); // 240

try {
  rect.width = 0;
} catch (e) {
  console.log(e); // RangeError: width must be positive
}

try {
  rect.height = -10;
} catch (e) {
  console.log(e); // RangeError: height must be positive
}

// Exercise 5
class MathUtils {
  static add(a, b)        { return a + b; }
  static subtract(a, b)   { return a - b; }
  static multiply(a, b)   { return a * b; }
  static divide(a, b) { 
    if (b !== 0) {
      return a / b;
    } else {
      throw new RangeError('Division by zero');
    }
  }
}

console.log(MathUtils.add(5, 3));       // 8
console.log(MathUtils.subtract(10, 4)); // 6
console.log(MathUtils.multiply(6, 7));  // 42
console.log(MathUtils.divide(20, 5));   // 4
try{
  console.log(MathUtils.divide(10, 0));   // RangeError: Division by zero
} catch (e) {
  console.log(e);
}