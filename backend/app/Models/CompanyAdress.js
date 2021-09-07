'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class CompanyAdress extends Model {
    static table() {
        return 'company_adresses'
    }
}

module.exports = CompanyAdress
