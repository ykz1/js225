// ============================================================================
function attempt(fn) {
  try {
    fn();
  } catch (error) {
    console.error(error.message);
  }
}

// ============================================================================
// EXPENSE CLASS
class Expense {
  static #nextId = 1;
  #id;
  #amount;
  #date;
  #category;

  constructor(amount, date, category) {
    this.#validateDate(date);
    this.#validateAmount(amount);
    this.#validateCategory(category);

    this.#amount = amount;
    this.#date = new Date(date);
    this.#category = category;
    this.#id = Expense.#nextId++;
  }

  get id() { return this.#id; }
  get amount() { return this.#amount; }
  get dateRaw() { return this.#date; }
  get date() { return this.#date.toISOString().slice(0, 10); }
  get category() { return this.#category; }
  get info() {return `<ID: ${this.id} | Amount: ${this.amount} | Date: ${this.date} | Category: ${this.category}>`}

  #validateAmount(amount) {
    // is number greater than 0
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error(`Amount must be positive number. Entered: ${typeof amount} ${amount}`);
    }
  }
  #validateDate(date) {
    // date must be in the past
    date = new Date(date);
    if (isNaN(date) || date > new Date()) {
      throw new Error(`Date must be a valid date in the past. Entered: ${date}`);
    }
  }
  #validateCategory(category) {
    if (!category || typeof category !== 'string' || category === '') {
      throw new Error(`Category must be a non-empty string. Entered: ${typeof category} ${category}`);
    }
  }
}

// ----------------------------------------------------------------------------
// Expense Test Cases:

// Checking happy path cases and ID increment:
let e1 = new Expense(1, '2026-01-08', 'Health');
console.log(e1.info);                                      // expected: successfully logged
let e2 = new Expense(2, '2026-01-07', 'Health');
console.log(e2.info);                                      // expected: successfully logged with id 2

// Checking that returned objects are immutable
console.log(e1.amount);                               // expected '1'
console.log(e1.date);                                 // expected '2026'
console.log(e1.id);                                   // expected '1'
console.log(e1.category);                             // expected 'Health'

e1.amount = 99;
e1.date = 99;
e1.id = 99;
e1.category = 99;

console.log(e1.amount);                               // expected '1'
console.log(e1.date);                                 // expected '2026'
console.log(e1.id);                                   // expected '1'
console.log(e1.category);                             // expected 'Health'

// Checking invalid amounts
attempt(()=> {                                        // expected: logs error message
  let e = new Expense('1', '2026-01-08', 'Health');
});
attempt(()=> {                                        // expected: logs error message
  let e = new Expense(-1, '2026-01-08', 'Health');
});
attempt(()=> {                                        // expected: logs error message
  let e = new Expense(0, '2026-01-08', 'Health');
});

// Checking valid dates (all should log correctly):
let e3 = new Expense(1, '2026', 'Health');
let e4 = new Expense(1, '2026-01', 'Health');
let e5 = new Expense(1, '2026-01-01T12:34', 'Health');
let e6 = new Expense(1, 'January 2, 2026', 'Health');
let e7 = new Expense(1, 'Jan 2, 2026', 'Health');
let e8 = new Expense(1, '12/31/25', 'Health'); // accepted in US despite ambiguity of format
let e9 = new Expense(1, '1-2-26', 'Health'); // accepted in US despite ambiguity of format
console.log(e3);
console.log(e4);
console.log(e5);
console.log(e6);
console.log(e7);
console.log(e8);
console.log(e9);

// Checking invalid dates (all should log error);
attempt(() => {
  let e = new Expense(1, 'Ja 2, 2026');
})
attempt(() => {
  let e = new Expense(1, '2025-25-12');
})
attempt(() => {
  let e = new Expense(1, '31/12/2026'); 
})
attempt(() => {
  let e = new Expense(1, '2026-12-25'); // future date
})

// Checking invalid categoryes (all should log error):
attempt(() => {
  let e = new Expense(1, '2025-12-25',); // empty
})

attempt(() => {
  let e = new Expense(1, '2025-12-25', ''); // empty
})

attempt(() => {
  let e = new Expense(1, '2025-12-25', 123); // empty
})

attempt(() => {
  let e = new Expense(1, '2025-12-25', ['Category']); // empty
})

// ============================================================================
// EXPENSE MANAGER CLASS

// Internal notes:

// To do:

// - Format number outputs
// - Format summarize into table
// - Write test cases for filtered reports

// Done:
// - Retrieve the current list of allowed categories.
// - Add a new allowed category.
// - Add a new expense.
// - Summarize expenses (total spent, average amount, and count).
// - Remove an expense by id.
// - Filter expenses by a date range.
// - Filter expenses by category.

class ExpenseManager {
  constructor() {
    this.expenses =[];
    this.categories = ['Food', 'Housing', 'Transportation', 'Entertainment', 'Health']
  }

  addCategory(category) {
    if (this.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())) {
      throw new Error(`${category} already exists.`)
    } else if (typeof category !== 'string' || category === '' ) {
      throw new Error(`Category must be a non-blank string. Entered: ${typeof category} ${category}`)
    } else {
      this.categories.push(category);
    }
  }

  listCategories() {
    console.log(`Allowed categories: ${this.categories.join(', ')}.`);
  }

  add(expense, date, category) {
    if (arguments.length === 1 && expense instanceof Expense) {
      this.#validateCategory(expense.category);
      this.#hasExistingID(expense);
    } else {
      this.#validateCategory(category);
      expense = new Expense(expense, date, category); // rely on Expense's validations
    }

    this.expenses.push(expense); // if we get here, then all validations have passed and we can add our expense
  }

  #validateCategory(category) {
    if (!this.categories.map(c => c.toLowerCase()).includes(category.toLowerCase())) {
      throw new Error(`${category} is not in allowed categories.`);
    }
  }

  #hasExistingID(expense) {
    const ids = this.expenses.map(e => e.id);
    if (ids.includes(expense.id)) {
      throw new Error(`This expense has already been added.`);
    }
  }

  remove(id) {
    for (let i = 0; i < this.expenses.length; i++) {
      if (this.expenses[i].id === id) {
        this.expenses.splice(i, 1);
        console.log(`Expense deleted.`);
        return;
      }
    }
    throw new Error(`ID ${id} not found.`);
  }

  summarize() {
    this.#report(this.expenses);
  }
  #report(list) {
    const total = list.reduce((sum, expense) => sum + expense.amount, 0);
    const count = list.length;
    const average = count > 0 ? total / count : 0
    console.log(`===================================================================`);
    console.log(`Summary Report`);
    console.log(` Total: ${total}\n Count: ${count}\n Average: ${average}`)
    console.log();
    console.log(list.forEach(e => console.log(e.info)));
  }

  filterDate(start, end) {
    this.#validateDate(start, end);
    start = new Date(start);
    end = new Date(end);
    const list = this.expenses.filter(e => e.dateRaw >= start && e.dateRaw <= end)
    this.#report(list);
  }

  #validateDate(...args) {
    args.forEach(date => {
      date = new Date(date);
      if (isNaN(date)) {
        throw new Error(`Not a valid date. Entered: ${date}`);
      }
    });
  }

  filterCategory(category) {
    const list = this.expenses.filter(e => e.category === category);
    this.#report(list);
  }

}
// ----------------------------------------------------------------------------
// Expense Manager Test Cases

// happy path
let em = new ExpenseManager();


// Listing and adding valid categories:
em.listCategories();
em.addCategory('Fitness');
em.listCategories(); // expected: 'Fitness' added

// Adding invalid categories:
attempt(() => {
  em.addCategory();
});
attempt(() => {
  em.addCategory('');
});
attempt(() => {
  em.addCategory(123);
});
attempt(() => {
  em.addCategory(null);
});
attempt(() => {
  em.addCategory('Health');
});
attempt(() => {
  em.addCategory('health');
});

// Adding  and removing valid expenses
em.add(e1);
em.add(e2);
em.add(e3);
em.add(new Expense(9, '2026-01-03', 'Fitness'));
em.add(9, '2026-01-03', 'Fitness');
em.summarize();
em.remove(1);
em.summarize();

// Adding invalid expenses
attempt(() => {
  em.add({});
});
attempt(() => {
  em.add(new Expense(9, '2026-01-03'));
});
attempt(() => {
  em.add(new Expense());
});
attempt(() => {
  em.add(e2); // duplicate expense
});
attempt(() => {
  em.add(3, '2026-01-01', 'Not a category'); 
});
attempt(() => {
  em.add(3, '2026-01-01', 'fitness   '); //maybe we should trim for users
});

em.summarize(); // output should be unchanged from previous invocation

// Removing by invalid id
attempt(() => {
  em.summarize();
  em.remove(1);
});
attempt(() => {
  em.summarize();
  em.remove();
});
attempt(() => {
  em.summarize();
  em.remove('2');
});

// summarize report based on category
em.filterCategory('Health');
em.filterCategory('Fitness');

// summarize report based on date
em.filterDate('2020-01-01', '2026-12-12');
em.filterDate('2020-01-01', '2026-01-04');
// ============================================================================
// BUDGET MANAGER CLASS

class BudgetExpenseManager extends ExpenseManager {
  constructor(budget) {
    super();
    this.#validateAmount(budget);
    this.budget = budget;
  }

  #validateAmount(amount) {
    // is number greater than 0
    if (typeof amount !== 'number' || amount <= 0) {
      throw new Error(`Budget amount must be positive number. Entered: ${typeof amount} ${amount}`);
    }
  }
  setBudget(amount) {
    this.#validateAmount(amount);
    this.budget = amount;
  }

  add(expense, date, category) {
    const total = this.#total();
    let amount = (arguments.length === 1 && expense instanceof Expense) ? expense.amount : expense
    if (total + amount > this.budget) {
      console.log(`Your total spend is at ${total}, and this ${amount} expense would put you over your budget of ${this.budget}`);
    } else {
      super.add(...arguments);
    }
  }
  #total() {
    return this.expenses.reduce((sum, expense) => sum + expense.amount, 0);
  }

  summarize() {
    console.log(`===================================================================`);
    console.log(`Currently at ${this.#total() / this.budget * 100}% of ${this.budget} budget.`)
    super.summarize()
  }
}

let bem = new BudgetExpenseManager(100);
bem.add(e1);
bem.add(e2);
bem.add(e3);
bem.add(e4);
bem.summarize();
bem.setBudget(50);
bem.summarize();
bem.add(46, new Date(), 'Health'); // should log that we cannot add
bem.add(45, new Date(), 'Health');
bem.summarize();