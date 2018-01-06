
const _list = []
let _id = 1
const fooDefaul = {
  name: '',
  ball: ''
}
class Foo {
  constructor (foo) {
    this._foo = foo
  }
  static find (id) {
    if (_list[id] == null) {
      throw new Error('not found foo')
    }
    return _list[id]
  }
  save () {
    const foo = _list[_id] = Object.assign({ id: _id }, fooDefaul, this._foo)
    _id += 1
    return foo
  }
  static update (id, data) {
    const foo = Foo.find(id)
    _list[_id] = Object.assign({ id: _id }, foo, data)
  }
  static delete (id) {
    Foo.find(id)
    _list[_id] = null
  }
}

module.exports = Foo
