"use strict"

let me = {
  firstName: 'Yikai',
  lastName: 'Zhao',
}

let boss = {
  firstName: 'Jeny',
  lastName: 'He',
}

let floorCleaner = {
  firstName: 'Indie',
  lastName: 'Zhao',
}

let entropyMachine = {
  firstName: 'Adrian',
  lastName: 'Zhao',
}

let peoples = {
  nextId: 1,
  collection: [],
  
  isInvalidPerson: function(person) {
    return !(typeof person.firstName === 'string' && typeof person.lastName === 'string');
  },

  add: function(person) {
    if (this.isInvalidPerson(person)) return `Invalid person`;
    person = {id: this.nextId++, ...person}; // create new object containing person being added, along with an ID for this new person
    this.collection.push(person);
  },

  getId: function(person) {
    let id = -1;
    this.collection.forEach(comparator => {
      if (comparator.firstName === person.firstName && comparator.lastName === person.lastName) {
        id = comparator.id;
      }
    });
    return id;
  },
  
  logFullName: function(person) {
    console.log(person.firstName + ' ' + person.lastName);
  }, 
  
  get: function(person) {
    if (this.isInvalidPerson(person)) return `Invalid person.`;

    let match = this.collection.find(comparator => {
      return comparator.firstName === person.firstName && comparator.lastName === person.lastName;
    });

    return match || `Person not found.`;
  },
  
  rollCall: function() {
    this.collection.forEach(this.logFullName);
  },
  
  update: function(person) {
    if (this.isInvalidPerson(person)) return `Invalid person.`;
    
    let id = this.getId(person);
    if (id === -1) return `Person not found.`;

    this.updateById(id, person);
  },

  getIndexById: function(id) {
    let index = -1;
    this.collection.forEach( (person, i) => {
      if (person.id === id) {
        index = i;
      }
    });
    return index;
  },
  
  updateById: function(id, person) {
    let index = this.getIndexById(id);
    this.collection[index] = {id: id, ...person};
  },

  remove: function(person) {
    if (this.isInvalidPerson(person)) return `Invalid person.`;
    
    let id = this.getId(person);
    if (id === -1) return `Person not found.`;

    let index = this.getIndexById(id);
    this.collection.splice(index, 1);
    return `Person removed.`;
  },
  
}

peoples.add(me);
peoples.add(boss);
peoples.add(floorCleaner);
peoples.add(entropyMachine);

console.log('First roll call');
peoples.rollCall();

console.log();
console.log('Getting me');
console.log(peoples.get(me));

console.log();
console.log('Updating me with a nickname');
me.alias = 'Kyle';
peoples.update(me);
console.log(peoples);

console.log();
console.log('Removing me');
console.log(peoples.remove(me));
peoples.rollCall();

console.log();
console.log('Re-adding me');
peoples.add(me);
peoples.rollCall();
console.log(peoples);