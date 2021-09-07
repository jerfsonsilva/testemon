'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompanyPhone extends Model {
    static table() {
        return 'company_phones'
    }
}

module.exports = CompanyPhone
