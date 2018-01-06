
const { ioc } = use('Autoload')

io.singleton('Reposotory/Foo', function(app){
  const Foo = app.use('Reposotory/Foo')
  return new Foo()
})

io.alias('Reposotory/Foo', 'Foo')

const Foo = app.use('Foo')
Foo.save({
  name: 'foo 1',
  ball: 'ball 1'
});
