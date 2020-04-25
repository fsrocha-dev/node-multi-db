const interfaceCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends interfaceCrud {
  constructor() {
    super()
    this._driver = null
    this._heroes = null
  }
  isConnected() {

  }
  _connect() {
    this._driver = new Sequelize(
      'heroes',
      'root',
      'root', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: false
    })
  }
  create(item) {
    console.log("item salvo em postgres")
  }
}

module.exports = Postgres
