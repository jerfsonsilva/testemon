'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Database = use('Database')

class CompanyTag extends Model {
    static table() {
        return 'company_tags'
    }
    /**
        * Search a CompanyTag for companyId.
        *
        * @param {Int} companyId
    */
    static async findByCompany(companyId) {
        try {
            //Get companytag pelo company_id 
            let obj = await Database
                .from(CompanyTag.table())
                .select('description')
                .where('company_id', '=', companyId)

            if (obj != undefined) {

                var lista = [];

                obj.forEach((el) => {//Tornar array unidimensional
                    lista.push(el.description);
                });

                return lista
            } else
                return {}

        } catch (error) {
            return {};
        }
    }

}

module.exports = CompanyTag
