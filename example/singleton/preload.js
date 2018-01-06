
const { ioc } = use('Autoload')

ioc.singleton('Reposotory/Foo', function (app) {
  const Foo = require('./Repository/Foo.js')
  return new Foo()
})

ioc.alias('Reposotory/Foo', 'Foo')

const Foo = use('Foo')
Foo.save({
  name: 'foo 1',
  ball: 'ball 1'
})
