// 1 ~ 4

let account = {
  transactions: [],
  balance: 0,
  deposit(amount) {
    this.balance += amount;
    this.transactions.push({
      type: 'deposit',
      amount,
    });
    return amount;
  },
  withdraw(amount) {
    amount = Math.min(amount, this.balance);
    this.balance -= amount;
    this.transactions.push({
      type: 'deposit',
      amount,
    });
    return amount;
  }
};
console.log(account.balance);
// 0
console.log(account.deposit(12));
// 12
console.log(account.balance);
// 12
console.log(account.deposit(10));
// 10
console.log(account.balance);
// 22

account.balance = 100;
console.log(account.balance);
// 100
console.log(account.withdraw(19));
// 19
console.log(account.balance);
// 81
console.log(account.balance);
// 81
console.log(account.withdraw(91));
// 81
console.log(account.balance);
// 0

account.balance = 0;
account.transactions = [];
console.log(account.deposit(23));
// 23
console.log(account.transactions);
// [{...}]
console.log(account.transactions[0]);
// {type: "deposit", amount: 23}

function makeAccount() {
  return {
    transactions: [],
    balance: 0,
    deposit(amount) {
      this.balance += amount;
      this.transactions.push({
        type: 'deposit',
        amount,
      });
      return amount;
    },
    withdraw(amount) {
      amount = Math.min(amount, this.balance);
      this.balance -= amount;
      this.transactions.push({
        type: 'deposit',
        amount,
      });
      return amount;
    },
  }
}
let account2 = makeAccount();
console.log(account2.deposit(15));
// 15
console.log(account2.balance);
// 15
let otherAccount = makeAccount();
console.log(otherAccount.balance);
// 0

function makeBank() {
  return {
    accounts: [],
    nextId: 101,
    openAccount() {
      let account = makeAccount();
      account.number = this.nextId++;
      this.accounts.push(account);
      return account;
    },
    transfer(source, destination, amount) {
      amount = source.withdraw(amount);
      destination.deposit(amount);
      return amount;
    },
  }
}
let bank = makeBank();
console.log(bank.accounts);
// []

let bank2 = makeBank();
let account3 = bank2.openAccount();
console.log(account3.number);
// 101
console.log(bank2.accounts);
// [{...}]
console.log(bank2.accounts[0]);
// {
//  number: 101,
//  balance: 0,
//  transactions: [],
//  deposit: [Function: deposit],
//  withdraw: [Function: withdraw]
// }
let secondAccount = bank2.openAccount();
console.log(secondAccount.number);
// 102

// Question 8
let bank5 = makeBank();
let source = bank5.openAccount();
console.log(source.deposit(10));
// 10
let destination = bank5.openAccount();
console.log(bank5.transfer(source, destination, 7));
// 7
console.log(source.balance);
// 3
console.log(destination.balance);
// 7

// Question 9 and 10
function makeAccount2(id) {
  let transactions = [];
  let balance = 0;
  let number = id;
  return {
    deposit(amount) {
      balance += amount;
      transactions.push({
        type: 'deposit',
        amount,
      });
      return amount;
    },
    withdraw(amount) {
      amount = Math.min(amount, balance);
      balance -= amount;
      transactions.push({
        type: 'deposit',
        amount,
      });
      return amount;
    },
    balance() {
      return balance;
    },
    number() {
      return number;
    },
    transactions() {
      return transactions;
    }
  }
}

function makeBank2() {
  let accounts = [];
  let nextId = 101;
  return {
    openAccount() {
      let account = makeAccount2(nextId++);
      accounts.push(account);
      return account;
    },
    transfer(source, destination, amount) {
      amount = source.withdraw(amount);
      destination.deposit(amount);
      return amount;
    },
  }
}

let bank9 = makeBank2();
let account9 = bank9.openAccount();
console.log(account9.balance());
// 0
console.log(account9.deposit(17));
// 17
let secondAccount9 = bank9.openAccount();
console.log(secondAccount9.number());
// 102
console.log(account9.transactions());
// [{...}]

let bank10 = makeBank2();
console.log(bank10.accounts);