'use strict'

const axios = require('axios')

const Env = use('Env')

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with companies
 */
class CompanyController {

  /**
 * Display welcome
 * GET /
 *
 * @param {Request} ctx.request
 * @param {Response} ctx.response
 */
  async welcome({ request, response }) {
    response.json({ 'welcome': 'Bem vindo(a)' });
  }

  /**
   * Display a single company.
   * GET companies/:id
   *
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async show({ params, request, response }) {

    const symbol = params.symbol;

    if (symbol == undefined) {
      response.status(403);//Requisição invalida
      response.json({ err: "O parametro symbol é obrigatorio" });
      return;
    }

    let token = Env.get('API_IEXAPIS_TOKEN');
    let urlAPI = Env.get('API_IEXAPIS_URL');

    const Company = use('App/Models/Company')

    //Verificar se a Company existe
    const companyObj = await Company.findBySymbol(symbol)

    if (companyObj.status == true) {
      response.json(companyObj.objeto);
      return;
    }

    // Comsumir API para buscar company
    await axios.get(urlAPI + '/stock/' + symbol + '/company?token=' + token)
      .then(async function (resp) { //Buscar dados da empresa

        if (resp.data.symbol != undefined) {
          try {

            var latestPrice = null;
            //buscar valor do latestPrice 
            await axios.get(urlAPI + '/stock/' + symbol + '/quote/latestPrice?token=' + token).then((respId) => {
              latestPrice = respId.data;
            })

            let company = await Company.new({ ...resp.data, latestPrice: latestPrice }) //Cadastrar nova Company 

            if (company.status == false) {//Erro na requisição
              response.status(company.code)
              response.json({ err: company.err })
              return;
            } else {
              response.json({ ...resp.data, latestPrice: latestPrice });
              return;
            }

          } catch (error) {
            response.status(500)
            response.json({ err: 'Erro interno ao salvar no banco' })
            return;
          }

        }

        response.status(404);//Item não localizado
        response.json({ err: "Company não encontrada" });
        return;

      })
      .catch(async function (error) {
        // handle error
        response.status(404);//Item não localizado
        response.json({ err: "Company não encontrada" });
        return;
      })

  }

}

module.exports = CompanyController
