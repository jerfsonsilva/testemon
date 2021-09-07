'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CompanyTagSchema extends Schema {
  up () {
    this.create('company_tags', (table) => {
      table.increments()
      table.string('description', 100).notNullable()

      table.integer('company_id').unsigned().references('id').inTable('companies')
      table.timestamps()
    })
  }

  down () {
    this.drop('company_tags')
  }
}

module.exports = CompanyTagSchema
