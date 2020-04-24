const interfaceCrud = require('./interfaces/interfaceCrud')
class Postgres extends interfaceCrud {
  constructor() {
    super()
  }

  create(item) {
    console.log("item salvo em postgres")
  }
}

module.exports = Postgres
