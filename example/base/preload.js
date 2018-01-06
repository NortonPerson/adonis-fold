const { ioc } = use('Autoload')
const Foo = use('Model/Foo')

ioc.alias('Model/Foo', 'Foo')

const foo = new Foo({
  name: 'foo 1',
  ball: 'ball 1'
})
foo.save()
