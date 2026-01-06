// P1
// 1. Every object has a copy of the methods and properties defined in the "template". This redundancy means memory inefficiency but also there is no way to distribute changes to these methods / properties to all existing objects created from a factory
// 2. Lack of origin: when a user encounters and object created from an object factory, there is no way for them to know whether it was created from an object factory or which it was created from

// P2
const makeObj = function() {
  return {
    propA: 10,
    propB: 20,
  }
}

let myObj = makeObj();
console.log(myObj);

// P3

function createInvoice(services={}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    total() {return this.phone + this.internet;},
  }
}

function invoiceTotal(invoices) {
  let total = 0;
  let i;

  for (i = 0; i < invoices.length; i += 1) {
    total += invoices[i].total();
  }

  return total;
}

let invoices = [];
invoices.push(createInvoice());
invoices.push(createInvoice({
  internet: 6500,
}));

invoices.push(createInvoice({
  phone: 2000,
}));

invoices.push(createInvoice({
  phone: 1000,
  internet: 4500,
}));

console.log(invoiceTotal(invoices));             // => 31000

// P4

function createPayment(services={}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || 0,
    total() {
      return this.amount || this.phone + this.internet;
    },
  }
}

function paymentTotal(payments) {
  let total = 0;
  let i;

  for (i = 0; i < payments.length; i += 1) {
    total += payments[i].total();
  }

  return total;
}

let payments = [];
payments.push(createPayment());
payments.push(createPayment({
  internet: 6500,
}));

payments.push(createPayment({
  phone: 2000,
}));

payments.push(createPayment({
  phone: 1000,
  internet: 4500,
}));

payments.push(createPayment({
  amount: 10000,
}));

console.log(paymentTotal(payments));      // => 24000

// P5
function createInvoice2(services={}) {
  return {
    phone: services.phone || 3000,
    internet: services.internet || 5500,
    paid: 0,
    
    total() {return this.phone + this.internet;},
    addPayment(payment) {
      this.paid += payment.total();
    },
    addPayments(payments) {
      this.paid += payments.reduce((sum, pmt) => sum + pmt.total(), 0);
    },
    amountDue() {
      return this.total() - this.paid;
    },
  }
}

function createPayment2(services={}) {
  return {
    phone: services.phone || 0,
    internet: services.internet || 0,
    amount: services.amount || 0,
    total() {
      return this.amount || this.phone + this.internet;
    },
  }
}

let invoice = createInvoice2({
  phone: 1200,
  internet: 4000,
});

let payment1 = createPayment2({
  amount: 2000,
});

let payment2 = createPayment2({
  phone: 1000,
  internet: 1200,
});

let payment3 = createPayment2({
  phone: 1000,
});

invoice.addPayment(payment1);
invoice.addPayments([payment2, payment3]);
console.log(invoice.amountDue());       // this should return 0