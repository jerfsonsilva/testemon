'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyAdressSchema extends Schema {
  up () {
    this.create('company_adresses', (table) => {
      table.increments()
      table.string('address', 100).notNullable()
      table.string('address2', 100)
      table.string('state', 58).notNullable()
      table.string('city', 58).notNullable()
      table.string('zip', 10).notNullable()
      table.string('country', 58).notNullable()

      table.integer('company_id').unsigned().unique().references('id').inTable('companies')

      table.timestamps()
    })
  }

  down () {
    this.drop('company_adresses')
  }
}

module.exports = CompanyAdressSchema
