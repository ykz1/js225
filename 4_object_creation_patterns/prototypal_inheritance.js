let foo = {
  name: 'bob',
  hello() {
    console.log('hello ' + this.name);
  },
};

let bar = Object.create(foo);
bar.hello();          // logs hello bob

bar.name = 'world';
bar.hello();          // logs hello world

// P1
// 