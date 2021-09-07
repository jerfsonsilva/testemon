'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
//https://monetusdev.notion.site/Teste-de-Back-end-Monetus-87054b9f7fa944fc98b8057ca29f946c#42c84927dbfc403e854f6999cf7062dd
Route.get('/','CompanyController.welcome')

Route.get('/company/:symbol', 'CompanyController.show')
Route.get('/company', 'CompanyController.show')


