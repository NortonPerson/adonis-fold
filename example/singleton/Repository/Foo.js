
class Foo {
  constructor () {
    this._list = []
    this._id = 1
    this.fooDefaul = {
      name: '',
      ball: ''
    }
  }

  find (id) {
    if (this._list[id] == null) {
      throw new Error('not found foo')
    }
    return this._list[id]
  }
  save () {
    const foo = this._list[this._id] = Object.assign({ id: this._id }, this.fooDefaul, this._foo)
    this._id += 1
    return foo
  }
  update (id, data) {
    const foo = this.find(id)
    this._list[id] = Object.assign({ id }, foo, data)
  }
  delete (id) {
    this.find(id)
    this._list[id] = null
  }
}

module.exports = Foo
