
const _list = []
let _id = 1
let fooDefaul = {
  name: '',
  ball: ''
}
class Foo {
  constructor(foo){
    this._foo = foo
  }
  static find (id){
    if (_list[_id] == null){
      throw new Error('not found foo')
    }
    return _list[id]
  }
  save () {
    _list[_id] = Object.assign({ id: _id }, fooDefaul, this._foo)
    _id += 1
    return _list[_id]
  }
  static update(id, data) {
    const foo = find(id)
    _list[_id] = Object.assign({ id: _id }, foo, data)
  }
  static delete(id) {
    find(id)
    _list[_id] = null
  }
}

module.exports = Foo