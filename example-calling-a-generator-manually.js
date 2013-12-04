// vim:ts=4:sts=4:sw=4:

function* generator() {
    var result = yield 'hello';
    yield result + '!'; 
}

var iterator = generator();
console.log(iterator.next()); // prints { value: 'hello', done: false }
console.log(iterator.next('world')); // prints { value: 'world !', done: false }
console.log(iterator.next()); // prints { value: undefined, done: true }
