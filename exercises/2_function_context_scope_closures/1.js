// An object literal {} does not create a new scope, and so the `this` within the object referenced by `person` will resolve to the global object, which does not have properties `firstName` or `lastName`, and so `undefined` + `undefined` will resolve to `NaN`

const person = {
  firstName: 'Rick ',
  lastName: 'Sanchez',
  fullName: this.firstName + this.lastName,
  whatIs: this,
};

console.log(person.fullName);
console.log(this);