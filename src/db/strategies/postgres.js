const interfaceCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends interfaceCrud {
  constructor() {
    super()
    this._driver = null
    this._heroes = null
    this._connect()
  }

  async isConnected() {
    try {
      await this._driver.authenticate()
      return true
    } catch (error) {
      console.error('fail!', error)
      return false
    }
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

  async defineModel() {
    this._heroes = this._driver.define('heroes', {
      id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.STRING,
        required: true
      },
      power: {
        type: Sequelize.STRING,
        required: true
      }
    })
    await this._heroes.sync()
  }

  create(item) {
    console.log("item salvo em postgres")
  }
}

module.exports = Postgres
