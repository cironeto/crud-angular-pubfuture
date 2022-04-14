![GitHub top language](https://img.shields.io/github/languages/top/cironeto/crud-angular-pubfuture?style=flat-square)

## Sobre
Aplicação front-end criada para atividade de avaliação do Programa de Formação Pública Tecnologia.
O projeto consiste em um CRUD de pessoas, consumindo a API do IBGE para listagem de estados e cidades do Brasil.
Os dados são enviados para o back-end através de uma API em Node criada com o plugin JSON-server.
Todos os campos do cadastro são obrigatório e validados de acordo com o dado esperado, além do nome não poder existir repetido na base de dados.
Exisite também um contador total de pessoas cadastradas para cada estado.


Funcionalidades:

    • CRUD de pessoas.
    • Estatísticas de total de pessoas cadastradas em cada estado.


## Ferramentas utilizadas
- Angular 13.3.2
- Node JS 16.13.1
- JSON-server

## Requisitos
Para execução deste projeto é necessário ter instalado:
- Angular
- Node

## Execução
Abra o terminal em '.../crud-angular-pubfuture/frontend' e execute o comando para instalar os pacotes do projeto:
```sh
npm install
```
Depois execute para iniciar o servidor do Angular:
```sh
ng s
```

Em outra janela do terminal, abra em '.../crud-angular-pubfuture/backend' e instale o JSON Server
```sh
npm i json-server
```

Em seguida, inicie o servidor Backend com o banco de dados.
```sh
npx json-server pessoas.json
```

A aplicação estará disponível em: **http://localhost:4200**

O endpoint com os dados do Backend estará disponível em: **http://localhost:3000/pessoas**



