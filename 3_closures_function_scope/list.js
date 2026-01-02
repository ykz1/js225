function makeList() {
  let items = [];
  return {

    list() {
      if (items.length === 0) {
        console.log(`The list is empty.`);
      } else {
        items.forEach(item => console.log(item));
      }
    },

    add(item) {
      items.push(item);
      console.log(`${item} added!`);
    },

    remove(item) {
      for (let i = 0; i < items.length; i++) {
        if (items[i] === item) {
          items.splice(i, 1);
          console.log(`${item} removed!`);
          return;
        }
      }
      console.log(`${item} not found.`);
    },
  }
}

let list = makeList();
console.log(list);
list.add('peas');
list.list();
list.add('corn');
list.list();
list.remove('peas');
list.list();
console.log(list.items); // undefined because `items` is a private variable in `makeList()`