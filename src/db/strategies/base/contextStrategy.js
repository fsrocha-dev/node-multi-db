const interfaceCrud = require('./../interfaces/interfaceCrud')
class ContextStrategy extends interfaceCrud {
  constructor(strategy) {
    this._database = strategy
  }

  create(item) {
    return this._database.create(item)
  }

  read(item) {
    return this._database.read(item)
  }
  update(id, item) {

  }
  delete(id) {
    return this._database.delete(id)
  }
}

module.exports = ContextStrategy