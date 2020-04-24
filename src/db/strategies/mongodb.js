const interfaceCrud = require('./interfaces/interfaceCrud')
class MongoDB extends interfaceCrud {
  constructor() {
    super()
  }

  create(item) {
    console.log("item salvo em mongodb")
  }
}

module.exports = MongoDB