Object.prototype.ancestors = function() {
  let that = Object.getPrototypeOf(this);
  let ancestors = [];
  while (Object.getPrototypeOf(that)) {
    ancestors.push(that.name);
    that = Object.getPrototypeOf(that);
  }
  ancestors.push('Object.prototype');
  return ancestors;
}

// name property added to make objects easier to identify
const foo = {name: 'foo'};
const bar = Object.create(foo);
bar.name = 'bar';
const baz = Object.create(bar);
baz.name = 'baz';
const qux = Object.create(baz);
qux.name = 'qux';

console.log(qux.ancestors());  // returns ['baz', 'bar', 'foo', 'Object.prototype']
console.log(baz.ancestors());  // returns ['bar', 'foo', 'Object.prototype']
console.log(bar.ancestors());  // returns ['foo', 'Object.prototype']
console.log(foo.ancestors());  // returns ['Object.prototype']