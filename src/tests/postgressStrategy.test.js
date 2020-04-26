const assert = require('assert')
const Postgres = require('../db/strategies/postgres')
const Context = require('../db/strategies/base/contextStrategy')

const context = new Context(new Postgres())
const MOCK_HERO_CREATE = {
  name: 'SuperMan',
  power: 'Strong'
}

const MOCK_HERO_UPDATE = {
  name: 'Batman',
  power: 'Money'
}

describe('Postegres Strategy', function () {
  this.timeout(Infinity)
  this.beforeAll(async function () {
    await context.connect()
    await context.create(MOCK_HERO_UPDATE)
  })

  it('PostgresSql Connection', async function () {
    const result = await context.isConnected()
    assert.equal(result, true)
  })

  it('Create', async function () {
    const result = await context.create(MOCK_HERO_CREATE)
    delete result.id

    assert.deepEqual(result, MOCK_HERO_CREATE)
  })

  it('Read', async function () {
    const [result] = await context.read({ name: MOCK_HERO_CREATE.name })

    delete result.id
    assert.deepEqual(result, MOCK_HERO_CREATE)
  })

  it('Update', async function () {
    const [updateItem] = await context.read({ name: MOCK_HERO_UPDATE.name });
    const newItem = { ...MOCK_HERO_UPDATE, name: 'IronMan' }

    const [result] = await context.update(updateItem.id, newItem);
    const [updatedItem] = await context.read({ id: updateItem.id })

    assert.deepEqual(result, 1);
    assert.deepEqual(updatedItem.name, newItem.name)
  })

})