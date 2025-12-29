// Problem 1
let invoices = {
  unpaid: [],
}
console.log(invoices);

// Problem 2
invoices.add = function(client, owing) {
  let invoice = {
    client,
    owing,
  }
  this.unpaid.push(invoice);
}

invoices.add('Starbucks', 300);
console.log(invoices);

// Problem 3
invoices.totalDue = function() {
  return this.unpaid.reduce((acc, invoice) => acc + invoice.owing, 0)
}

console.log(invoices.totalDue());

// Problem 4
invoices.add('Due North Development', 250);
invoices.add('Moonbeam Interactive', 187.50);
invoices.add('Slough Digital', 300);

console.log(invoices.totalDue());

// Problem 5
invoices.paid = []
invoices.payInvoice = function(client) {
  let newUnpaid = [];
  this.unpaid.forEach(invoice => {
    if (invoice.client === client) {
      this.paid.push(invoice);
    } else {
      newUnpaid.push(invoice);
    }
  });
  this.unpaid = newUnpaid;
}
invoices.add('Starbucks', 200);
console.log(invoices);
invoices.payInvoice('Starbucks');
console.log(invoices.totalDue());
console.log(invoices);

// Problem 6
invoices.totalPaid = function() {
  return this.paid.reduce((acc, invoice) => acc + invoice.owing, 0);
}
console.log(invoices.totalPaid());

// Problem 7
invoices.payInvoice('Due North Development');
invoices.payInvoice('Slough Digital');
console.log(invoices.totalPaid());
console.log(invoices.totalDue());