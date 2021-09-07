# Teste MON

## Bem vindo(a)

## Este projeto foi dividido em três etapas

## 1º) etapa - banco de dados localizado na pasta "/database" contendo o script mysql e diagrama uml da aplicação

```
cd /database
```

### basta importar o testeMon.sql para a sua maquina local


## 2º) etapa - O backend localizado na pasta "/backend" construido utilizando o node js junto ao framework adonis js, https://adonisjs.com/, (muito semelhante ao Laravel) e conceitos de RestAPI

```
cd /backend
```

### As dependencias estão localizadas no arquivo package.json

```
"dependencies": { "@adonisjs/ace": "^5.0.8",
    "@adonisjs/auth": "^3.0.7",
    "@adonisjs/bodyparser": "~2.0.9",
    "@adonisjs/cors": "^1.0.7",
    "@adonisjs/fold": "^4.0.9",
    "@adonisjs/framework": "^5.0.9",
    "@adonisjs/ignitor": "^2.0.8",
    "@adonisjs/lucid": "^6.1.3",
    "@adonisjs/session": "^1.0.27",
    "@adonisjs/shield": "^1.0.8",
    "@adonisjs/vow": "^1.0.17",
    "axios": "^0.21.4",
    "mysql": "^2.18.1",
    "mysql2": "^2.3.0"
  }
```

### para instalar basta rodar o comando
```
    npm install
```

### O arquivo ".env" é responsavel pelas variaveis de ambientes sendo necessario configurar informações como o banco de dados e a porta em que o servidor do backend ira rodar

```
PORT = 3333

DB_CONNECTION=mysql

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=link
DB_DATABASE=testeMonetus
```

### apos a configuração basta rodar o comando:

```
adonis serve --dev 

ou

npm start serve

```

## 3º) etapa - O frontend localizado na pasta "/frontend"

```
cd /frontend
```

### As dependencias estão localizadas no arquivo package.json

```
    "axios": "^0.21.4",
    "bulma": "^0.9.3",
    "core-js": "^3.6.5",
    "vue": "^2.6.11",
    "vue-alertify": "^1.1.0",
    "vue-router": "^3.2.0"
```
### para instalar basta rodar o comando
```
    npm install
```

### No arquivo env.js podemos configurar informações sobre o acesso ao backend como a HOST_BACKEND, que se refere a url em que o servidor do backend esta rodando a aplicação
```
module.exports = {//Variaveis de ambiente
    HOST_BACKEND:"http://localhost:3333",//Link servidor backend
}
```
### apos a configuração basta rodar o comando:

```
npm run serve
```

### e então será apresentado o link para acessar a aplicação

```
App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.0.109:8080/
```

## Testes BACKEND

### Para executar os teste basta rodar o comando:

```
cd backend

adonis test

```

Exemplo de resposta:

```
 Example
    ✓ Acesso a tabela Company (86ms)

  Search/Create Company
    ✓ Buscar/Cadastrar company (276ms)
    ✓ Buscar/Cadastrar company - sem parametro (5ms)
    ✓ Buscar/Cadastrar company - symbol invalido (1s)

   PASSED 

  total       : 4
  passed      : 4
  time        : 1s
```

## Rotas da API BACKEND

### GET /company/{symbol}
Esse endpoint é responsável por retornar as informações sobre a company e seu latestPrice

#### Parametros
symbol: symbol da company desejada

### Respostas

#### OK! 200
Caso essa resposta aconteça é disponibilizado uma serie de informações a respeito a company

Exemplo de resposta:
```
{
    "id": 1,
    "symbol": "BAC",
    "exchange": "NEW YORK STOCK EXCHANGE INC.",
    "industry": "Commercial Banking ",
    "website": "www.bankofamerica.com",
    "description": "Bank of America is one of the world’s leading financial institutions, serving individual consumers, small and middle-market businesses and large corporations with a full range of banking, investing, asset management and other financial and risk management products and services. The company provides unmatched convenience in the United States, serving approximately 66 million consumer and small business clients with approximately 4,300 retail financial centers, including approximately 2,900 lending centers, 2,500 financial centers with a Consumer Investment Financial Solutions Advisor and approximately 2,300 business centers; approximately 17,000 ATMs; and award-winning digital banking with approximately 39 million active users, including approximately 31 million mobile users. Bank of America is a global leader in wealth management, corporate and investment banking and trading across a broad range of asset classes, serving corporations, governments, institutions and individuals around the world. Bank of America offers industry-leading support to approximately 3 million small business owners through a suite of innovative, easy-to-use online products and services. The company serves clients through operations across the United States, its territories and approximately 35 countries. Bank of America Corporation stock (NYSE: BAC) is listed on the New York Stock Exchange.",
    "CEO": "Brian Moynihan",
    "latestPrice": 41.05,
    "created_at": null,
    "updated_at": null,
    "address": "Bank of America Corporate Center",
    "address2": "100 N Tryon St",
    "state": "North Carolina",
    "city": "Charlotte",
    "zip": "28255-0001",
    "country": "United States",
    "company_id": 1,
    "phone": "17043865681",
    "tags": [
        "Finance",
        "Major Banks",
        "Finance and Insurance",
        "Commercial Banking "
    ]
}

```

#### Requisição invalida! 403
Caso essa resposta aconteça significa que o parametro symbol é obrigatorio na rota

Exemplo de resposta:
```
{
    "err": "O paramentro symbol é obrigatorio"
}
```
#### Requisição invalida! 404
Caso essa resposta aconteça significa a company não foi encontrada na API

Exemplo de resposta:
```
{
    "err": "Company não encontrada"
}
```


#### Requisição invalida! 500
Caso essa resposta aconteça significa que ocorreu um erro ao salvar a informação no banco de dados

Exemplo de resposta:
```
{
    "err": "Erro interno ao salvar no banco"
}
```

## Fim ;)