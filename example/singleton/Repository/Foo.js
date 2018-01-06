

class Foo {

  constructor(){
    this._list = []
    this._id = 1
    this.fooDefaul = {
      name: '',
      ball: ''
    }
  }

  static find (id){
    if (this._list[id] == null){
      throw new Error('not found foo')
    }
    return this._list[id]
  }
  static save () {
    this._list[this._id] = Object.assign({ id: this._id }, this.fooDefaul, this._foo)
    this._id += 1
    return this._list[_id]
  }
  static update(id, data) {
    const foo = this.find(id)
    this._list[_id] = Object.assign({ id }, foo, data)
  }
  static delete(id) {
    this.find(id)
    this._list[_id] = null
  }
}

module.exports = Foo