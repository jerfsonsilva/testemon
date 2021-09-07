'use strict'

const { test, trait } = use('Test/Suite')('Search/Create Company')

trait("Test/ApiClient")

test('Buscar/Cadastrar company', async ({ client }) => {

    const response = await client.get('/company/BAC').end();

    response.assertStatus(200)
    response.assertJSONSubset({//No minimo, esses dados vão ser retornados
        symbol: 'BAC'
    })

})

test('Buscar/Cadastrar company - sem parametro', async ({ client }) => {

    const response = await client.get('/company').end();

    response.assertStatus(403)

})


test('Buscar/Cadastrar company - symbol invalido', async ({ client }) => {

    const response = await client.get('/company/123').end();

    response.assertStatus(404) //Não encontrado

})