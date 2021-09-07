'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanySchema extends Schema {
  up () {
    this.create('companies', (table) => {
      table.increments()
      table.string('symbol', 20).unique().notNullable()
      table.string('exchange', 100).notNullable()
      table.string('industry', 100).notNullable()
      table.string('website', 100).notNullable()
      table.text('description').notNullable()
      table.string('CEO', 80).notNullable()
      table.float('latestPrice')
      
      table.timestamps()
    })
  }

  down () {
    this.drop('companies')
  }
}

module.exports = CompanySchema
