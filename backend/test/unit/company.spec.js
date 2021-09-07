'use strict'
const Company = use('App/Models/Company')
const { test } = use('Test/Suite')('Example')
const Database = use('Database')

test('Acesso a tabela Company', async ({ assert }) => {
  var company = await Database
  .from(Company.table())
  .select('*')
  .first();

  assert.isNotNull(company,"Não é possivel acessar a tabela Company")
})
