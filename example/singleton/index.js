require('../../index')

const Foo = use('Foo')
const foo = Foo.find(1)
console.log('find foo with id = 1 :', foo)
