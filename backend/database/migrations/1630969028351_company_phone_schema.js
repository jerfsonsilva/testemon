'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyPhoneSchema extends Schema {
  up () {
    this.create('company_phones', (table) => {
      table.increments()
      table.string('phone', 11).notNullable()
      table.integer('company_id').unsigned().unique().references('id').inTable('companies')
      table.timestamps()
    })
  }

  down () {
    this.drop('company_phones')
  }
}

module.exports = CompanyPhoneSchema
