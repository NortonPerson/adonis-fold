const Foo = use('Model/Foo')

module.exports = {
  find (id) {
    const foo = Foo.find(id)
    console.log(`find foo with id = ${id} :`, foo)
  }
}
