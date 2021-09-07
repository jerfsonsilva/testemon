'use strict'

const CompanyAdress = use('App/Models/CompanyAdress')
const CompanyPhone = use('App/Models/CompanyPhone')
const CompanyTag = use('App/Models/CompanyTag')
const Database = use('Database')
/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Company extends Model {

    static table() {
        return 'companies'
    }

    /**
      * Create a company.
      *
      * @param {Array} data
      */
    static async new(data) {
        try {

            const trx = await Database.beginTransaction()//Inicio da transação

            let company_id = await Database //Salvar Company
                .table(Company.table())
                .insert({
                    symbol: data.symbol,
                    exchange: data.exchange,
                    industry: data.industry,
                    website: data.website,
                    description: data.description,
                    CEO: data.CEO,
                    latestPrice: data.latestPrice,
                });

            await Database //Salvar o endereço
                .table(CompanyAdress.table())
                .insert({
                    address: data.address,
                    address2: data.address2,
                    state: data.state,
                    city: data.city,
                    zip: data.zip,
                    country: data.country,
                    company_id: company_id
                });

            await Database //Salvar o telefone
                .table(CompanyPhone.table())
                .insert({
                    phone: data.phone,
                    company_id: company_id
                });

            data.tags.forEach(async tag => {

                await Database //Salvar o tags
                    .table(CompanyTag.table())
                    .insert({
                        description: tag,
                        company_id: company_id
                    });

            });

            await trx.commit() 
            return { status: true }
        } catch (error) {
            await trx.rollback()
            return { err: error.sqlMessage, code: 500, status: false };
        }
    }

    /**
        * Search a company for symbol.
        *
        * @param {String} symbol
    */
    static async findBySymbol(symbol) {
        try {
            let obj = await Database //Buscar Company pela paramentro symbol
                .from(Company.table())
                .select('*')
                .innerJoin(CompanyAdress.table(), Company.table() + '.id', CompanyAdress.table() + '.company_id')
                .innerJoin(CompanyPhone.table(), Company.table() + '.id', CompanyPhone.table() + '.company_id')
                .where(Company.table() + '.symbol', '=', symbol)
                .first();

            if (obj != undefined) {
                //Get Tags company
                var tags = await CompanyTag.findByCompany(obj.id);

                return { status: true, objeto: { ...obj, tags: tags } }

            } else
                return { err: 'Company não encontrada', status: false, code: 404 }

        } catch (error) {
            return { err: error, code: 500, status: false };
        }
    }


}


module.exports = Company
