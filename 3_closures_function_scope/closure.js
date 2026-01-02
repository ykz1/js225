// 1

function makeCounterLogger(a) {
  return function(b) {
    let increment = (a < b ? 1 : -1);
    for (let i = a; i !== b; i += increment) {
      console.log(i);
    }
    console.log(b);
  }
}

let countlog = makeCounterLogger(5);
countlog(8);
countlog(2);

// 2
function makeList() {
  let list = [];
  
  function process(str) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === str) {
        list.splice(i, 1);
        console.log(`${str} removed!`);
        return;
      }
    }
    list.push(str);
    console.log(`${str} added!`);
  }

  function log() {
    if (list.length === 0) {
      console.log(`The list is empty.`);
    } else {
      list.forEach(item => console.log(item));
    }
  }

  return function(str) {
    if (str) {
      process(str);
    } else {
      log();
    }
  }
}

let list = makeList();
list();
list('make breakfast');
list('read book');
list();
list('make breakfast');
list();