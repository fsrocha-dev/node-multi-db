const interfaceCrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')

class Postgres extends interfaceCrud {
  constructor() {
    super()
    this._driver = null
    this._heroes = null
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

  async connect() {
    this._driver = new Sequelize(
      'heroes',
      'root',
      'root', {
      host: 'localhost',
      dialect: 'postgres',
      quoteIdentifiers: false,
      operatorsAliases: '1'
    })
    await this.defineModel()
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
    }, {
      tableName: 'TB_HEROES',
      freezeTableName: false,
      timestamps: false
    })
    await this._heroes.sync()
  }

  read(query = {}) {
    return this._heroes.findAll({ where: query, raw: true })
  }

  async create(item) {
    const { dataValues } = await this._heroes.create(item)
    return dataValues
  }

  async update(id, item) {
    const result = await this._heroes.update(item, {
      where: { id }
    })
    return result;
  }

  async delete(id) {
    const query = id ? { id } : {}
    return this._heroes.destroy({ where: query })
  }
}

module.exports = Postgres
